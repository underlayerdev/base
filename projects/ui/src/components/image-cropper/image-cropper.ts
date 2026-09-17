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
import { ImageCropperComponent as NgxImageCropperComponent } from 'ngx-image-cropper';

import { ButtonComponent } from '../button/button';
import { ModalComponent } from '../modal/modal';

// Matches $spacing-spacing-60 (240px) — the longer side of the fixed crop
// frame used in locked-aspect-ratio mode. Kept as a plain constant since
// ngx-image-cropper's inputs take numbers, not Sass tokens.
const FRAME_MAX_DIMENSION = 240;
const DEFAULT_MAX_OUTPUT_SIZE = 1024;
const MIN_ZOOM = 1;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.01;

/** Visual shape of the crop mask/frame — purely cosmetic, doesn't affect the exported file. */
export type ImageCropperShape = 'rectangle' | 'round';

/**
 * Modal flow for cropping/resizing a photo. Wraps ngx-image-cropper so the
 * third-party crop mechanics never leak outside the design system —
 * consumers only ever see `ul-image-cropper`.
 *
 * Two interaction modes, chosen by whether `aspectRatio` is set:
 * - **Locked** (`aspectRatio` given, e.g. `1` for an avatar): a fixed-size
 *   frame; the user drags/zooms the photo underneath it. Best when every
 *   output needs the same ratio (avatars, thumbnails).
 * - **Free-form** (`aspectRatio` omitted, the default): a resizable frame
 *   over a static photo; the user drags its corners to trim/straighten with
 *   no ratio imposed. Best for listing photos, which keep their own shape
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

  /** Label for the cancel button. */
  readonly cancelLabel = input<string>('Cancel');

  /** Label next to the zoom slider (locked-aspect mode only). */
  readonly zoomLabel = input<string>('Zoom');

  /** Accessible label for the crop frame. */
  readonly frameAriaLabel = input<string>('Crop frame');

  /** Emitted with the cropped, resized photo once the user confirms. */
  readonly cropped = output<File>();

  /** Emitted when the user cancels or dismisses the modal without cropping. */
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
  protected readonly transform = computed(() => ({ scale: this.zoom() }));
  protected readonly cropperReady = signal(false);

  constructor() {
    // A fresh file (new selection, or re-opening for a retry) always starts
    // from a neutral zoom rather than carrying over the previous session's,
    // and isn't croppable again until ngx-image-cropper reports it loaded.
    effect(() => {
      this.imageFile();
      this.zoom.set(MIN_ZOOM);
      this.cropperReady.set(false);
    });
  }

  protected onZoomInput(event: Event): void {
    this.zoom.set((event.target as HTMLInputElement).valueAsNumber);
  }

  protected async onConfirm(): Promise<void> {
    const croppedEvent = await this.cropperRef()?.crop('blob');
    const blob = croppedEvent?.blob;
    if (!blob) return;
    this.cropped.emit(new File([blob], 'photo.jpg', { type: blob.type }));
    this.open.set(false);
  }

  protected onCancel(): void {
    this.cancelled.emit();
    this.open.set(false);
  }
}
