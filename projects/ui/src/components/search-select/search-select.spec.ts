import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { SearchSelectComponent, type SearchSelectOption } from './search-select';

const options: SearchSelectOption[] = [
  { label: 'Porsche 911', value: 'a' },
  { label: 'BMW M3', value: 'b' },
];

@Component({
  imports: [SearchSelectComponent],
  template: ` <ul-search-select [(value)]="value" [options]="options" /> `,
})
class HostComponent {
  value: string | null = null;
  options = options;
}

function setup(initialValue: string | null = null) {
  TestBed.configureTestingModule({ imports: [HostComponent] });
  const fixture: ComponentFixture<HostComponent> = TestBed.createComponent(HostComponent);
  fixture.componentInstance.value = initialValue;
  fixture.detectChanges();
  return fixture;
}

function getInputEl(fixture: ComponentFixture<HostComponent>): HTMLInputElement {
  return fixture.nativeElement.querySelector('input');
}

describe('SearchSelectComponent', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('does not show the options panel until the field is focused', () => {
    const fixture = setup();

    expect(fixture.nativeElement.querySelector('.ul-search-select__list')).toBeFalsy();
  });

  it('shows all options on focus and filters as the user types', () => {
    const fixture = setup();

    getInputEl(fixture).dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.ul-search-select__option').length).toBe(2);

    getInputEl(fixture).value = 'bmw';
    getInputEl(fixture).dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const remaining = fixture.nativeElement.querySelectorAll('.ul-search-select__option');
    expect(remaining.length).toBe(1);
    expect(remaining[0].textContent).toContain('BMW M3');
  });

  it('closes the panel shortly after blur', () => {
    const fixture = setup();
    getInputEl(fixture).dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();

    getInputEl(fixture).dispatchEvent(new FocusEvent('blur'));
    vi.advanceTimersByTime(150);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.ul-search-select__list')).toBeFalsy();
  });

  it('selects an option on mousedown and sets the value', () => {
    const fixture = setup();
    getInputEl(fixture).dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();

    const option: HTMLElement = fixture.nativeElement.querySelectorAll(
      '.ul-search-select__option',
    )[1];
    option.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    fixture.detectChanges();

    expect(fixture.componentInstance.value).toBe('b');
    expect(fixture.nativeElement.querySelector('.ul-search-select__list')).toBeFalsy();
  });

  it('navigates options with the arrow keys and selects the highlighted one on Enter', () => {
    const fixture = setup();
    getInputEl(fixture).dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();

    const control: HTMLElement = fixture.nativeElement.querySelector('.ul-search-select__control');
    control.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    control.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    fixture.detectChanges();

    expect(fixture.componentInstance.value).toBe('b');
  });

  it('resets the value once the typed text no longer matches the selected option', () => {
    const fixture = setup('a');

    getInputEl(fixture).dispatchEvent(new FocusEvent('focus'));
    getInputEl(fixture).value = 'something else';
    getInputEl(fixture).dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(fixture.componentInstance.value).toBeNull();
  });

  it('closes the panel on Escape', () => {
    const fixture = setup();
    getInputEl(fixture).dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();

    const control: HTMLElement = fixture.nativeElement.querySelector('.ul-search-select__control');
    control.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.ul-search-select__list')).toBeFalsy();
  });
});
