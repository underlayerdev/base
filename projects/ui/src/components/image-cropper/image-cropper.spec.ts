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
      cancelLabel="Cancel"
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

  it('emits cancelled and closes the modal when the cancel button is clicked', () => {
    const fixture = setup();

    findButtonByText(fixture, 'Cancel').click();
    fixture.detectChanges();

    expect(fixture.componentInstance.cancelledCount).toBe(1);
    expect(fixture.componentInstance.open).toBe(false);
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
  });

  describe('locked aspect ratio mode (e.g. avatar)', () => {
    function setupLocked() {
      const fixture = setup();
      fixture.componentInstance.shape.set('round');
      fixture.componentInstance.aspectRatio.set(1);
      fixture.detectChanges();
      return fixture;
    }

    it('configures a fixed round frame and forwards the zoom slider as a scale transform', () => {
      const fixture = setupLocked();
      const cropper = queryCropper(fixture);

      expect(cropper.roundCropper).toBe(true);
      expect(cropper.maintainAspectRatio).toBe(true);
      expect(cropper.cropperStaticWidth).toBe(240);
      expect(cropper.cropperStaticHeight).toBe(240);
      expect(cropper.allowMoveImage).toBe(true);

      const slider: HTMLInputElement = fixture.nativeElement.querySelector(
        '.ul-image-cropper__zoom-input',
      );
      expect(slider).toBeTruthy();
      slider.value = '2';
      slider.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(cropper.transform).toEqual({ scale: 2 });
    });

    it('derives a proportional frame for a non-square locked ratio', () => {
      const fixture = setup();
      fixture.componentInstance.aspectRatio.set(4 / 3);
      fixture.detectChanges();

      const cropper = queryCropper(fixture);
      expect(cropper.cropperStaticWidth).toBe(240);
      expect(cropper.cropperStaticHeight).toBe(180);
    });
  });

  describe('free-form mode (e.g. listing photos)', () => {
    it('leaves the frame resizable and hides the zoom slider', () => {
      const fixture = setup();
      const cropper = queryCropper(fixture);

      expect(cropper.maintainAspectRatio).toBe(false);
      expect(cropper.cropperStaticWidth).toBeUndefined();
      expect(cropper.cropperStaticHeight).toBeUndefined();
      expect(cropper.allowMoveImage).toBe(false);
      expect(fixture.nativeElement.querySelector('.ul-image-cropper__zoom-input')).toBeNull();
    });
  });
});
