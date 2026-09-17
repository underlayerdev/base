import { Component, input, signal } from '@angular/core';

import { Meta, StoryObj } from '../../../.storybook/types';

import { AvatarComponent } from '../avatar/avatar';
import { ButtonComponent } from '../button/button';

import { ImageCropperComponent } from './image-cropper';

@Component({
  selector: 'ul-image-cropper-story',
  imports: [AvatarComponent, ImageCropperComponent, ButtonComponent],
  template: `
    <div
      style="padding: 24px; display: flex; flex-direction: column; gap: 16px; align-items: flex-start;"
    >
      @if (mode() === 'avatar') {
        <ul-avatar size="xl" [src]="resultUrl()" />
      } @else if (resultUrl(); as url) {
        <img [src]="url" alt="" style="max-width: 320px; border-radius: 8px;" />
      }

      <input #fileInput type="file" accept="image/*" hidden (change)="onFileSelected($event)" />
      <ul-button theme="fill-purple" (buttonClick)="fileInput.click()">Choose photo</ul-button>

      <ul-image-cropper
        [(open)]="showCropper"
        [imageFile]="selectedFile()"
        [shape]="mode() === 'avatar' ? 'round' : 'rectangle'"
        [aspectRatio]="mode() === 'avatar' ? 1 : null"
        [maxOutputSize]="mode() === 'avatar' ? 512 : 1920"
        [title]="mode() === 'avatar' ? 'Adjust photo' : 'Trim photo'"
        confirmLabel="Save"
        (cropped)="onCropped($event)"
      />
    </div>
  `,
})
class ImageCropperStoryComponent {
  readonly mode = input<'avatar' | 'listing'>('avatar');

  readonly selectedFile = signal<File | null>(null);
  readonly resultUrl = signal<string | undefined>(undefined);
  showCropper = false;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;

    this.selectedFile.set(file);
    this.showCropper = true;
  }

  onCropped(file: File): void {
    this.resultUrl.set(URL.createObjectURL(file));
  }
}

const meta: Meta<ImageCropperStoryComponent> = {
  title: 'Components/Data Display/Image Cropper',
  component: ImageCropperStoryComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Modal flow for cropping/resizing a photo, wrapping ngx-image-cropper so consumers never import it directly. The frame always does the moving/resizing (bounds-checked by the library) — the photo itself is never dragged, since ngx-image-cropper does not clamp that path. `aspectRatio` just decides whether the frame is **locked** to a ratio (e.g. avatars) or **free-form** (no ratio imposed — for listing photos, which keep their own shape today). Only a single confirm button is shown; dismiss via the modal’s own close button, backdrop, or Escape. Pick a file with any trigger (hidden input, `ul-file-input`, etc.), pass it to `[imageFile]`, and listen for `(cropped)` to get back a resized File ready to upload.',
      },
    },
  },
  argTypes: {
    mode: {
      options: ['avatar', 'listing'],
      control: { type: 'radio' },
      description: 'Which preset this story demonstrates — not a real component input.',
    },
  },
};

export default meta;
type Story = StoryObj<ImageCropperStoryComponent>;

/**
 * Locked 1:1 round crop, as used for an avatar: pick a photo to open the
 * cropper, drag/resize the circular frame over it, then confirm.
 */
export const Avatar: Story = {
  args: { mode: 'avatar' },
};

/**
 * Free-form rectangular crop, as used for a listing photo: pick a photo to
 * open the cropper, drag the frame's corners to trim it, then confirm — no
 * aspect ratio is imposed.
 */
export const ListingPhoto: Story = {
  args: { mode: 'listing' },
};
