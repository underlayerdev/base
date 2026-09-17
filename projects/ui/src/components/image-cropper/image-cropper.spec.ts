import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  ImageCropperComponent as NgxImageCropperComponent,
  type ImageCroppedEvent,
} from 'ngx-image-cropper';
import { describe, expect, it, vi } from 'vitest';

import { ImageCropperComponent, type ImageCropperShape } from './image-cropper';

@Component({
  imports: [ImageCropperComponent],
  template: `
    <ul-image-cropper
      [(open)]="open"
      [imageFile]="file()"
      [shape]="shape()"
      [aspectRatio]="aspectRatio()"
      confirmLabel="Save"
      (cropped)="croppedFile = $event"
      (cancelled)="cancelledCount = cancelledCount + 1"
    />
  `,
})
class HostComponent {
  open = true;
  file = signal<File | null>(new File(['x'], 'photo.png', { type: 'image/png' }));
  shape = signal<ImageCropperShape>('rectangle');
  aspectRatio = signal<number | null>(null);
  croppedFile: File | null = null;
  cancelledCount = 0;
}

function setup() {
  TestBed.configureTestingModule({ imports: [HostComponent] });
  const fixture: ComponentFixture<HostComponent> = TestBed.createComponent(HostComponent);
  fixture.detectChanges();
  return fixture;
}

function findButtonByText(
  fixture: ComponentFixture<HostComponent>,
  text: string,
): HTMLButtonElement {
  const buttons: HTMLButtonElement[] = Array.from(fixture.nativeElement.querySelectorAll('button'));
  const button = buttons.find((candidate) => candidate.textContent?.includes(text));
  if (!button) throw new Error(`No button found with text "${text}"`);
  return button;
}

function queryCropper(fixture: ComponentFixture<HostComponent>): NgxImageCropperComponent {
  return fixture.debugElement.query(By.directive(NgxImageCropperComponent))
    .componentInstance as NgxImageCropperComponent;
}

describe('ImageCropperComponent', () => {
  it('renders the modal open when [open] is true', () => {
    const fixture = setup();
    const panel = fixture.nativeElement.querySelector('.ul-modal__panel');
    expect(panel).toBeTruthy();
  });

  it('renders a single confirm button — no redundant cancel button next to the modal close icon', () => {
    const fixture = setup();
    const footer = fixture.nativeElement.querySelector('[ul-modal-footer]') as HTMLElement;

    expect(footer.querySelectorAll('button').length).toBe(1);
  });

  it('emits cancelled when the modal is dismissed via its own close button', () => {
    const fixture = setup();
    const closeButton: HTMLButtonElement = fixture.nativeElement.querySelector(
      'button[aria-label="Close"]',
    );

    closeButton.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.cancelledCount).toBe(1);
    expect(fixture.componentInstance.open).toBe(false);
  });

  it('disables the confirm button until the cropper reports it is ready', () => {
    const fixture = setup();
    expect(findButtonByText(fixture, 'Save').disabled).toBe(true);
  });

  it('enables the confirm button once the cropper reports it is ready', () => {
    const fixture = setup();
    queryCropper(fixture).cropperReady.emit({ width: 512, height: 512 });
    fixture.detectChanges();

    expect(findButtonByText(fixture, 'Save').disabled).toBe(false);
  });

  it('emits the cropped file and closes the modal when confirm succeeds', async () => {
    const fixture = setup();
    const cropper = queryCropper(fixture);
    const croppedEvent: ImageCroppedEvent = {
      blob: new Blob(['cropped'], { type: 'image/jpeg' }),
      width: 512,
      height: 512,
      cropperPosition: { x1: 0, y1: 0, x2: 512, y2: 512 },
      imagePosition: { x1: 0, y1: 0, x2: 512, y2: 512 },
    };
    vi.spyOn(cropper, 'crop').mockResolvedValue(croppedEvent);
    cropper.cropperReady.emit({ width: 512, height: 512 });
    fixture.detectChanges();

    findButtonByText(fixture, 'Save').click();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.componentInstance.croppedFile).toBeInstanceOf(File);
    expect(fixture.componentInstance.croppedFile?.type).toBe('image/jpeg');
    expect(fixture.componentInstance.open).toBe(false);
    // Confirming must not also fire cancelled (open closes via a direct
    // signal write here, not via the modal's own close(), which is what
    // emits closed/cancelled).
    expect(fixture.componentInstance.cancelledCount).toBe(0);
  });

  describe('locked aspect ratio mode (e.g. avatar)', () => {
    it('locks the frame to the given ratio and shape — the photo is never dragged, only the frame moves', () => {
      const fixture = setup();
      fixture.componentInstance.shape.set('round');
      fixture.componentInstance.aspectRatio.set(1);
      fixture.detectChanges();

      const cropper = queryCropper(fixture);
      expect(cropper.roundCropper).toBe(true);
      expect(cropper.maintainAspectRatio).toBe(true);
      expect(cropper.aspectRatio).toBe(1);
      // No cropperStaticWidth/Height and no allowMoveImage: dragging always
      // moves/resizes the frame within the photo (bounds-checked by
      // ngx-image-cropper), never the photo within a fixed frame (which
      // ngx-image-cropper does not bounds-check at all).
      expect(cropper.cropperStaticWidth).toBeUndefined();
      expect(cropper.cropperStaticHeight).toBeUndefined();
      expect(cropper.allowMoveImage).toBe(false);
    });

    it('derives a proportional frame for a non-square locked ratio', () => {
      const fixture = setup();
      fixture.componentInstance.aspectRatio.set(4 / 3);
      fixture.detectChanges();

      expect(queryCropper(fixture).aspectRatio).toBe(4 / 3);
    });
  });

  describe('free-form mode (e.g. listing photos)', () => {
    it('leaves the frame fully resizable with no ratio imposed', () => {
      const fixture = setup();
      const cropper = queryCropper(fixture);

      expect(cropper.maintainAspectRatio).toBe(false);
      expect(cropper.allowMoveImage).toBe(false);
    });
  });
});
