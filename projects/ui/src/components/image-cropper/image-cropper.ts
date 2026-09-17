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

const DEFAULT_MAX_OUTPUT_SIZE = 1024;
// A floor on the crop frame's resizability — without one, ngx-image-cropper
// happily lets it shrink to a few pixels, which is never a useful crop.
const MIN_FRAME_DIMENSION = 40;

/** Visual shape of the crop mask/frame — purely cosmetic, doesn't affect the exported file. */
export type ImageCropperShape = 'rectangle' | 'round';

/**
 * Modal flow for cropping/resizing a photo. Wraps ngx-image-cropper so the
 * third-party crop mechanics never leak outside the design system —
 * consumers only ever see `ul-image-cropper`.
 *
 * The frame is always what moves/resizes, never the photo: ngx-image-cropper
 * only bounds-checks that path (`checkCropperWithinMaxSizeBounds`) — its
 * alternative "drag the photo within a fixed frame" mode applies pan
 * offsets with no clamping at all, so the photo could be dragged clean out
 * of the frame. `aspectRatio` just decides whether that frame is locked to
 * a ratio (e.g. `1` for an avatar) or freely resizable (the default — for
 * listing photos, which keep their own shape today, see `um-image-upload`'s
 * auto-width carousel).
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

  /** Locks the crop frame to this width/height ratio. Omit (or pass null) for a free-form frame. */
  readonly aspectRatio = input<number | null>(null);

  /** Longest side (px) of the final output image; scales down without distorting. */
  readonly maxOutputSize = input<number>(DEFAULT_MAX_OUTPUT_SIZE);

  /** Title shown in the modal header. */
  readonly title = input<string>('Adjust photo');

  /** Label for the confirm button. */
  readonly confirmLabel = input<string>('Save');

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

  protected readonly minFrameDimension = MIN_FRAME_DIMENSION;
  protected readonly cropperReady = signal(false);

  constructor() {
    // A fresh file (new selection, or re-opening for a retry) isn't
    // croppable again until ngx-image-cropper reports it loaded.
    effect(() => {
      this.imageFile();
      this.cropperReady.set(false);
    });
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
}
