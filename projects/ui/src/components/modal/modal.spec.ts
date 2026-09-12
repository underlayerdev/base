import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { ModalComponent } from './modal';

@Component({
  imports: [ModalComponent],
  template: ` <ul-modal [open]="open" [fullScreenInMobile]="isFsm"><p>Content</p></ul-modal> `,
})
class HostComponent {
  open = true;
  isFsm = false;
}

function setup(isFsm: boolean) {
  TestBed.configureTestingModule({ imports: [HostComponent] });
  const fixture: ComponentFixture<HostComponent> = TestBed.createComponent(HostComponent);
  fixture.componentInstance.isFsm = isFsm;
  fixture.detectChanges();
  return fixture;
}

describe('ModalComponent', () => {
  it('does not add the fullscreen-mobile class by default', () => {
    const fixture = setup(false);

    const panel: HTMLElement = fixture.nativeElement.querySelector('.ul-modal__panel');
    expect(panel.classList.contains('ul-modal__panel--fullscreen-mobile')).toBe(false);
  });

  it('adds the fullscreen-mobile class when fullScreenInMobile is true', () => {
    const fixture = setup(true);

    const panel: HTMLElement = fixture.nativeElement.querySelector('.ul-modal__panel');
    expect(panel.classList.contains('ul-modal__panel--fullscreen-mobile')).toBe(true);
  });

  it('composes with a variant instead of replacing it', () => {
    const fixture = setup(true);

    const panel: HTMLElement = fixture.nativeElement.querySelector('.ul-modal__panel');
    expect(panel.classList.contains('ul-modal__panel--default')).toBe(true);
    expect(panel.classList.contains('ul-modal__panel--fullscreen-mobile')).toBe(true);
  });
});
