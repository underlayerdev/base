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
        <button
          type="button"
          style="padding: 0; border: 0; background: none; cursor: pointer; border-radius: 4096px;"
          aria-label="Change photo"
          (click)="fileInput.click()"
        >
          <ul-avatar size="2xl" [editable]="true" [src]="resultUrl()" />
        </button>
      } @else {
        @if (resultUrl(); as url) {
          <img [src]="url" alt="" style="max-width: 320px; border-radius: 8px;" />
        }
        <ul-button theme="fill-purple" (buttonClick)="fileInput.click()">Choose photo</ul-button>
      }

      <input #fileInput type="file" accept="image/*" hidden (change)="onFileSelected($event)" />

      <ul-image-cropper
        [(open)]="showCropper"
        [imageFile]="selectedFile()"
        [shape]="mode() === 'avatar' ? 'round' : 'rectangle'"
        [aspectRatio]="mode() === 'avatar' ? 1 : null"
        [maxOutputSize]="mode() === 'avatar' ? 512 : 1920"
        [title]="mode() === 'avatar' ? 'Adjust photo' : 'Trim photo'"
        confirmLabel="Save"
        zoomLabel="Zoom"
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
          'Modal flow for cropping/resizing a photo, wrapping ngx-image-cropper so consumers never import it directly. Two modes depending on whether `aspectRatio` is set: **locked** (fixed frame, drag/zoom the photo underneath — for avatars and anything needing a consistent ratio) or **free-form** (resizable frame over a static photo, no ratio imposed — for listing photos, which keep their own shape today). In locked mode, dragging the photo is clamped so it can never uncover the frame — ngx-image-cropper itself only bounds-checks its frame-resize path, not this one, so this component re-implements that clamping for pan and zoom together. Only a single confirm button is shown; dismiss via the modal’s own close button, backdrop, or Escape. Pick a file with any trigger (hidden input, `ul-file-input`, etc.), pass it to `[imageFile]`, and listen for `(cropped)` to get back a resized File ready to upload.',
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
 * Locked 1:1 round crop, as used for an avatar: click the editable avatar
 * itself (hover to see the camera affordance) to pick a photo, drag/zoom
 * it within the fixed circle in the cropper that opens, then confirm.
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
