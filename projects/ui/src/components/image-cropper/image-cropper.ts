import {
  Component,
  computed,
  effect,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';
import type { Dimensions, ImageTransform } from 'ngx-image-cropper';
import { ImageCropperComponent as NgxImageCropperComponent } from 'ngx-image-cropper';

import { ButtonComponent } from '../button/button';
import { ModalComponent } from '../modal/modal';

const DEFAULT_MAX_OUTPUT_SIZE = 1024;
// Matches $spacing-spacing-60 (240px) — the longer side of the fixed crop
// frame used in locked-aspect-ratio mode. Kept as a plain constant since
// ngx-image-cropper's inputs take numbers, not Sass tokens.
const FRAME_MAX_DIMENSION = 240;
const MIN_ZOOM = 1;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.01;

/** Visual shape of the crop mask/frame — purely cosmetic, doesn't affect the exported file. */
export type ImageCropperShape = 'rectangle' | 'round';

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Modal flow for cropping/resizing a photo. Wraps ngx-image-cropper so the
 * third-party crop mechanics never leak outside the design system —
 * consumers only ever see `ul-image-cropper`.
 *
 * Two interaction modes, chosen by whether `aspectRatio` is set:
 * - **Locked** (`aspectRatio` given, e.g. `1` for an avatar): a fixed-size
 *   frame; the user drags/zooms the photo underneath it. ngx-image-cropper
 *   applies that pan with *no bounds checking at all* (unlike its
 *   frame-resize path, which does call `checkCropperWithinMaxSizeBounds`),
 *   so this component clamps translateH/translateV itself — see
 *   `clampPan()` — snapping the photo back to fully cover the frame the
 *   moment a drag would otherwise leave a gap.
 * - **Free-form** (`aspectRatio` omitted, the default): a resizable frame
 *   over a static photo; the user drags its corners to trim/straighten
 *   with no ratio imposed. This path is already bounds-checked by the
 *   library itself. Best for listing photos, which keep their own shape
 *   today (see `um-image-upload`'s auto-width carousel).
 *
 * Emits a resized `File`, ready to hand to any upload call that accepts
 * one — this component only produces the file, it never uploads it.
 *
 * @example Locked 1:1 round (avatar)
 * <ul-image-cropper
 *   [(open)]="showCropper"
 *   [imageFile]="selectedFile"
 *   shape="round"
 *   [aspectRatio]="1"
 *   [maxOutputSize]="512"
 *   (cropped)="onCropped($event)"
 * />
 *
 * @example Free-form rectangle (listing photo)
 * <ul-image-cropper
 *   [(open)]="showCropper"
 *   [imageFile]="selectedFile"
 *   [maxOutputSize]="1920"
 *   (cropped)="onCropped($event)"
 * />
 */
@Component({
  selector: 'ul-image-cropper',
  imports: [NgxImageCropperComponent, ModalComponent, ButtonComponent],
  templateUrl: './image-cropper.html',
  styleUrl: './image-cropper.scss',
})
export class ImageCropperComponent {
  /** Whether the crop modal is open. Supports two-way binding with [(open)]. */
  readonly open = model<boolean>(false);

  /** The source photo to crop. Required for the modal to render its content. */
  readonly imageFile = input<File | null>(null);

  /** Visual shape of the crop mask. */
  readonly shape = input<ImageCropperShape>('rectangle');

  /**
   * Locks the crop frame to this width/height ratio and switches to
   * pan-and-zoom mode. Omit (or pass null) for a free-form resizable frame
   * with no ratio imposed.
   */
  readonly aspectRatio = input<number | null>(null);

  /** Longest side (px) of the final output image; scales down without distorting. */
  readonly maxOutputSize = input<number>(DEFAULT_MAX_OUTPUT_SIZE);

  /** Title shown in the modal header. */
  readonly title = input<string>('Adjust photo');

  /** Label for the confirm button. */
  readonly confirmLabel = input<string>('Save');

  /** Label next to the zoom slider (locked-aspect mode only). */
  readonly zoomLabel = input<string>('Zoom');

  /** Accessible label for the crop frame. */
  readonly frameAriaLabel = input<string>('Crop frame');

  /** Emitted with the cropped, resized photo once the user confirms. */
  readonly cropped = output<File>();

  /** Emitted when the user dismisses the modal (backdrop, Escape, close button) without cropping. */
  readonly cancelled = output<void>();

  /** Emitted when the source photo fails to load in the cropper. */
  readonly loadFailed = output<void>();

  private readonly cropperRef = viewChild(NgxImageCropperComponent);

  protected readonly cropperImageFile = computed(() => this.imageFile() ?? undefined);
  protected readonly isRound = computed(() => this.shape() === 'round');
  protected readonly isLocked = computed(() => this.aspectRatio() != null);

  /** ngx-image-cropper always wants a number here; unused while isLocked() is false. */
  protected readonly effectiveAspectRatio = computed(() => this.aspectRatio() ?? 1);

  // Longer side stays at FRAME_MAX_DIMENSION; the other side is derived from
  // the ratio, so non-square locked ratios (e.g. 4:3) get a proportional
  // frame instead of a squashed 240x240 one.
  protected readonly frameWidth = computed(() => {
    if (!this.isLocked()) return undefined;
    const ratio = this.effectiveAspectRatio();
    return ratio >= 1 ? FRAME_MAX_DIMENSION : FRAME_MAX_DIMENSION * ratio;
  });

  protected readonly frameHeight = computed(() => {
    if (!this.isLocked()) return undefined;
    const ratio = this.effectiveAspectRatio();
    return ratio >= 1 ? FRAME_MAX_DIMENSION / ratio : FRAME_MAX_DIMENSION;
  });

  protected readonly minZoom = MIN_ZOOM;
  protected readonly maxZoom = MAX_ZOOM;
  protected readonly zoomStep = ZOOM_STEP;

  protected readonly zoom = signal(MIN_ZOOM);
  protected readonly cropperReady = signal(false);

  // The photo's own rendered size (at zoom 1, before any pan), reported by
  // ngx-image-cropper once it has fit the photo to cover the frame — the
  // basis for clampPan()'s bounds. `pan` is what the user's drag *asked*
  // for; `clampedPan` is what actually reaches the child, corrected to
  // never uncover the frame.
  private readonly baseImageSize = signal<Dimensions | null>(null);
  private readonly pan = signal({ h: 0, v: 0 });

  protected readonly clampedPan = computed(() => this.clampPan(this.pan(), this.zoom()));
  protected readonly transform = computed<ImageTransform>(() => ({
    scale: this.zoom(),
    translateH: this.clampedPan().h,
    translateV: this.clampedPan().v,
  }));

  constructor() {
    // A fresh file (new selection, or re-opening for a retry) always starts
    // from a neutral zoom/pan rather than carrying over the previous
    // session's, and isn't croppable again until ngx-image-cropper reports
    // it loaded.
    effect(() => {
      this.imageFile();
      this.zoom.set(MIN_ZOOM);
      this.pan.set({ h: 0, v: 0 });
      this.baseImageSize.set(null);
      this.cropperReady.set(false);
    });
  }

  // ngx-image-cropper only bounds-checks its frame-resize path; dragging the
  // photo itself (locked mode) applies translateH/V with no clamping and
  // reports the result here on release. Re-deriving from `pan` (rather than
  // trusting the event's translate values outright) keeps this the single
  // source of truth clampedPan reads from.
  protected onTransformChange(event: ImageTransform): void {
    this.pan.set({ h: event.translateH ?? 0, v: event.translateV ?? 0 });
  }

  protected onZoomInput(event: Event): void {
    this.zoom.set((event.target as HTMLInputElement).valueAsNumber);
  }

  protected onCropperReady(size: Dimensions): void {
    this.baseImageSize.set(size);
    this.cropperReady.set(true);
  }

  protected async onConfirm(): Promise<void> {
    const croppedEvent = await this.cropperRef()?.crop('blob');
    const blob = croppedEvent?.blob;
    if (!blob) return;
    this.cropped.emit(new File([blob], 'photo.jpg', { type: blob.type }));
    this.open.set(false);
  }

  protected onClosed(): void {
    this.cancelled.emit();
  }

  // translateH/V are percentages of the photo's own (unscaled) box, per
  // ngx-image-cropper's default translateUnit — so the on-screen pixel
  // shift is (percent/100 * baseSize) * scale (CSS applies scale() *after*
  // translate() in the same transform, magnifying it). Solving
  // |shift| <= (baseSize*scale - frameSize) / 2 for the percent gives the
  // bound below; it comes out to exactly 0 on whichever axis the photo was
  // fit tightest to the frame (no slack to pan there without zooming in
  // first), and the true remaining slack on the other axis.
  private clampPan(pan: { h: number; v: number }, scale: number): { h: number; v: number } {
    const base = this.baseImageSize();
    const frameWidth = this.frameWidth();
    const frameHeight = this.frameHeight();
    if (!base || !frameWidth || !frameHeight || base.width <= 0 || base.height <= 0) {
      return { h: 0, v: 0 };
    }

    const maxH = Math.max(50 * (1 - frameWidth / (base.width * scale)), 0);
    const maxV = Math.max(50 * (1 - frameHeight / (base.height * scale)), 0);
    return {
      h: clamp(pan.h, -maxH, maxH),
      v: clamp(pan.v, -maxV, maxV),
    };
  }
}
