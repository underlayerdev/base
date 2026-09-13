import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { SelectableRowComponent } from './selectable-row';

function mockMatchMedia(matches: boolean): void {
  // jsdom doesn't implement matchMedia at all, so there's nothing to spy on
  // — it must be assigned outright, not mocked via vi.spyOn.
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    onchange: null,
    dispatchEvent: () => false,
  }));
}

@Component({
  imports: [SelectableRowComponent],
  template: `
    <ul-selectable-row
      [selected]="selected"
      [selectionActive]="selectionActive"
      [selectable]="selectable"
      [ariaLabel]="'Select item'"
      (selectedChange)="selectedChanges.push($event)"
      (longPress)="longPresses.push(undefined)"
    >
      <img ul-selectable-row-media src="thumb.png" alt="" />
      <div ul-selectable-row-content>Item label</div>
    </ul-selectable-row>
  `,
})
class HostComponent {
  selected = false;
  selectionActive = false;
  selectable = true;
  readonly selectedChanges: boolean[] = [];
  readonly longPresses: undefined[] = [];
}

function setup(options: {
  hasFinePointer: boolean;
  selected?: boolean;
  selectionActive?: boolean;
  selectable?: boolean;
}) {
  mockMatchMedia(options.hasFinePointer);
  TestBed.configureTestingModule({ imports: [HostComponent] });
  const fixture: ComponentFixture<HostComponent> = TestBed.createComponent(HostComponent);
  fixture.componentInstance.selected = options.selected ?? false;
  fixture.componentInstance.selectionActive = options.selectionActive ?? false;
  fixture.componentInstance.selectable = options.selectable ?? true;
  fixture.detectChanges();
  return fixture;
}

function pointerEvent(type: string, x = 0, y = 0): PointerEvent {
  return new PointerEvent(type, { clientX: x, clientY: y, pointerType: 'touch', bubbles: true });
}

describe('SelectableRowComponent', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('renders the projected media and a hover checkbox on fine-pointer devices', () => {
    const fixture = setup({ hasFinePointer: true });

    expect(fixture.nativeElement.querySelector('img')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.ul-selectable-row__hover-checkbox')).toBeTruthy();
  });

  it('swaps the media for a large checkbox on coarse-pointer devices once selection is active', () => {
    const fixture = setup({ hasFinePointer: false, selectionActive: true });

    expect(fixture.nativeElement.querySelector('img')).toBeFalsy();
    expect(fixture.nativeElement.querySelector('.ul-selectable-row__hover-checkbox')).toBeFalsy();
    const checkbox = fixture.nativeElement.querySelector('ul-checkbox');
    expect(checkbox?.querySelector('.ul-checkbox--lg')).toBeTruthy();
  });

  it('keeps showing the media on coarse-pointer devices when nothing is selected yet', () => {
    const fixture = setup({ hasFinePointer: false, selectionActive: false });

    expect(fixture.nativeElement.querySelector('img')).toBeTruthy();
  });

  it('emits selectedChange when the checkbox is toggled', () => {
    const fixture = setup({ hasFinePointer: true });

    const input: HTMLInputElement = fixture.nativeElement.querySelector('.ul-checkbox__input');
    input.click();

    expect(fixture.componentInstance.selectedChanges).toEqual([true]);
  });

  it('emits longPress after a sustained press', () => {
    const fixture = setup({ hasFinePointer: true });
    const host: HTMLElement = fixture.nativeElement.querySelector('ul-selectable-row');

    host.dispatchEvent(pointerEvent('pointerdown'));
    vi.advanceTimersByTime(500);

    expect(fixture.componentInstance.longPresses.length).toBe(1);
  });

  it('toggles on a plain tap anywhere in the row once the checkbox has replaced the media', () => {
    const fixture = setup({ hasFinePointer: false, selectionActive: true, selected: false });

    const content: HTMLElement = fixture.nativeElement.querySelector('[ul-selectable-row-content]');
    content.click();

    expect(fixture.componentInstance.selectedChanges).toEqual([true]);
  });

  it('does not toggle on a plain tap when nothing is selected yet (media is still shown)', () => {
    const fixture = setup({ hasFinePointer: false, selectionActive: false });

    const media: HTMLElement = fixture.nativeElement.querySelector('img');
    media.click();

    expect(fixture.componentInstance.selectedChanges).toEqual([]);
  });

  it('toggles on a plain tap on fine-pointer devices too, once selecting', () => {
    const fixture = setup({ hasFinePointer: true, selectionActive: true, selected: false });

    const content: HTMLElement = fixture.nativeElement.querySelector('[ul-selectable-row-content]');
    content.click();

    expect(fixture.componentInstance.selectedChanges).toEqual([true]);
  });

  it('does not toggle on a plain tap on fine-pointer devices when nothing is selected yet', () => {
    const fixture = setup({ hasFinePointer: true, selectionActive: false });

    const content: HTMLElement = fixture.nativeElement.querySelector('[ul-selectable-row-content]');
    content.click();

    expect(fixture.componentInstance.selectedChanges).toEqual([]);
  });

  it('does not double-toggle when the tap lands on the compact-mode checkbox itself', () => {
    const fixture = setup({ hasFinePointer: false, selectionActive: true, selected: false });

    const input: HTMLInputElement = fixture.nativeElement.querySelector('.ul-checkbox__input');
    input.click();

    expect(fixture.componentInstance.selectedChanges).toEqual([true]);
  });

  it('does not double-toggle when the tap lands on the desktop hover checkbox itself', () => {
    const fixture = setup({ hasFinePointer: true, selectionActive: true, selected: false });

    const input: HTMLInputElement = fixture.nativeElement.querySelector('.ul-checkbox__input');
    input.click();

    expect(fixture.componentInstance.selectedChanges).toEqual([true]);
  });

  it('does not toggle from the click that follows a triggering long-press', () => {
    const fixture = setup({ hasFinePointer: false, selectionActive: true, selected: false });
    const host: HTMLElement = fixture.nativeElement.querySelector('ul-selectable-row');

    host.dispatchEvent(pointerEvent('pointerdown'));
    vi.advanceTimersByTime(500);
    host.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));

    expect(fixture.componentInstance.longPresses.length).toBe(1);
    expect(fixture.componentInstance.selectedChanges).toEqual([]);
  });

  it('renders no hover checkbox on fine-pointer devices when not selectable', () => {
    const fixture = setup({ hasFinePointer: true, selectable: false });

    expect(fixture.nativeElement.querySelector('img')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.ul-selectable-row__hover-checkbox')).toBeFalsy();
  });

  it('keeps showing the media on coarse-pointer devices when not selectable, even once selectionActive', () => {
    const fixture = setup({ hasFinePointer: false, selectionActive: true, selectable: false });

    expect(fixture.nativeElement.querySelector('img')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('ul-checkbox')).toBeFalsy();
  });

  it('does not emit longPress when not selectable', () => {
    const fixture = setup({ hasFinePointer: false, selectable: false });
    const host: HTMLElement = fixture.nativeElement.querySelector('ul-selectable-row');

    host.dispatchEvent(pointerEvent('pointerdown'));
    vi.advanceTimersByTime(500);

    expect(fixture.componentInstance.longPresses.length).toBe(0);
  });

  it('does not toggle on a plain tap when not selectable, even if selectionActive is somehow true', () => {
    const fixture = setup({ hasFinePointer: true, selectionActive: true, selectable: false });

    const content: HTMLElement = fixture.nativeElement.querySelector('[ul-selectable-row-content]');
    content.click();

    expect(fixture.componentInstance.selectedChanges).toEqual([]);
  });
});
