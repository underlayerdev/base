import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { SearchInputComponent, type SearchSuggestion } from './search-input';

const suggestions: SearchSuggestion[] = [
  { value: 'a', label: 'Porsche 911' },
  { value: 'b', label: 'BMW M3' },
];

const results: SearchSuggestion[] = [{ value: 'c', label: 'Porsche 911 Turbo' }];

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
  imports: [SearchInputComponent],
  template: `
    <ul-search-input
      [(value)]="value"
      [suggestions]="suggestions"
      [results]="results"
      (suggestionSelected)="selected.push($event)"
      (searchSubmit)="submits.push($event)"
    />
  `,
})
class HostComponent {
  value = '';
  suggestions = suggestions;
  results = results;
  readonly selected: SearchSuggestion[] = [];
  readonly submits: string[] = [];
}

function setup(options: { isMobile?: boolean } = {}) {
  mockMatchMedia(!!options.isMobile);
  TestBed.configureTestingModule({ imports: [HostComponent] });
  const fixture: ComponentFixture<HostComponent> = TestBed.createComponent(HostComponent);
  fixture.detectChanges();
  return fixture;
}

function getInputEl(fixture: ComponentFixture<HostComponent>): HTMLInputElement {
  return fixture.nativeElement.querySelector('input');
}

describe('SearchInputComponent (desktop)', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('does not show the suggestions panel until the field is focused', () => {
    const fixture = setup();

    expect(fixture.nativeElement.querySelector('.ul-search-input__list')).toBeFalsy();
  });

  it('shows suggestions on focus', () => {
    const fixture = setup();

    getInputEl(fixture).dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();

    const options = fixture.nativeElement.querySelectorAll('.ul-search-input__option');
    expect(options.length).toBe(2);
  });

  it('closes the panel shortly after blur', () => {
    const fixture = setup();
    getInputEl(fixture).dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();

    getInputEl(fixture).dispatchEvent(new FocusEvent('blur'));
    vi.advanceTimersByTime(150);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.ul-search-input__list')).toBeFalsy();
  });

  it('selects a suggestion on mousedown and emits suggestionSelected', () => {
    const fixture = setup();
    getInputEl(fixture).dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();

    const option: HTMLElement = fixture.nativeElement.querySelectorAll(
      '.ul-search-input__option',
    )[1];
    option.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    fixture.detectChanges();

    expect(fixture.componentInstance.selected).toEqual([suggestions[1]]);
    expect(fixture.componentInstance.value).toBe('BMW M3');
    expect(fixture.nativeElement.querySelector('.ul-search-input__list')).toBeFalsy();
  });

  it('navigates suggestions with the arrow keys and selects the highlighted one on Enter', () => {
    const fixture = setup();
    getInputEl(fixture).dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();

    const combobox: HTMLElement = fixture.nativeElement.querySelector('.ul-search-input__combobox');
    combobox.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    combobox.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    fixture.detectChanges();

    expect(fixture.componentInstance.selected).toEqual([suggestions[1]]);
  });

  it('emits searchSubmit with the typed query on Enter when no suggestion is highlighted', () => {
    const fixture = setup();
    fixture.componentInstance.suggestions = [];
    fixture.componentInstance.results = [];
    fixture.detectChanges();

    getInputEl(fixture).value = 'convertible';
    getInputEl(fixture).dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const combobox: HTMLElement = fixture.nativeElement.querySelector('.ul-search-input__combobox');
    combobox.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));

    expect(fixture.componentInstance.submits).toEqual(['convertible']);
  });

  it('closes the panel on Escape', () => {
    const fixture = setup();
    getInputEl(fixture).dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();

    const combobox: HTMLElement = fixture.nativeElement.querySelector('.ul-search-input__combobox');
    combobox.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.ul-search-input__list')).toBeFalsy();
  });

  it('shows suggestions while the query is empty, and swaps to results once typing starts', () => {
    const fixture = setup();
    getInputEl(fixture).dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.ul-search-input__option').length).toBe(
      suggestions.length,
    );

    getInputEl(fixture).value = 'porsche';
    getInputEl(fixture).dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const options = fixture.nativeElement.querySelectorAll('.ul-search-input__option');
    expect(options.length).toBe(results.length);
    expect(options[0].textContent).toContain(results[0].label);
  });
});

@Component({
  imports: [SearchInputComponent],
  template: `
    <ul-search-input
      [(value)]="value"
      [suggestions]="suggestions"
      [resultsTemplate]="customResults"
      (searchSubmit)="submits.push($event)"
    />
    <ng-template #customResults>
      <div class="custom-result">Custom row</div>
    </ng-template>
  `,
})
class CustomResultsHostComponent {
  value = '';
  suggestions = suggestions;
  readonly submits: string[] = [];
}

describe('SearchInputComponent (resultsTemplate)', () => {
  function setupCustomResults() {
    mockMatchMedia(false);
    TestBed.configureTestingModule({ imports: [CustomResultsHostComponent] });
    const fixture: ComponentFixture<CustomResultsHostComponent> = TestBed.createComponent(
      CustomResultsHostComponent,
    );
    fixture.detectChanges();
    return fixture;
  }

  it('still renders suggestions as plain rows while the query is empty', () => {
    const fixture = setupCustomResults();

    fixture.nativeElement.querySelector('input').dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.ul-search-input__option').length).toBe(
      suggestions.length,
    );
    expect(fixture.nativeElement.querySelector('.custom-result')).toBeFalsy();
  });

  it('renders the projected template instead of plain rows once the query is non-empty', () => {
    const fixture = setupCustomResults();
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    input.dispatchEvent(new FocusEvent('focus'));

    input.value = 'porsche';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.custom-result')).toBeTruthy();
    expect(fixture.nativeElement.querySelectorAll('.ul-search-input__option').length).toBe(0);
  });

  it('still emits searchSubmit on Enter since there are no options to highlight', () => {
    const fixture = setupCustomResults();
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    input.dispatchEvent(new FocusEvent('focus'));
    input.value = 'porsche';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const combobox: HTMLElement = fixture.nativeElement.querySelector('.ul-search-input__combobox');
    combobox.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));

    expect(fixture.componentInstance.submits).toEqual(['porsche']);
  });
});

describe('SearchInputComponent (mobile)', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('renders a read-only trigger field and no takeover until tapped', () => {
    const fixture = setup({ isMobile: true });

    expect(getInputEl(fixture).readOnly).toBe(true);
    expect(fixture.nativeElement.querySelector('.ul-modal--backdrop')).toBeFalsy();
  });

  it('opens the takeover and focuses its own field when the trigger is tapped', () => {
    const fixture = setup({ isMobile: true });

    getInputEl(fixture).dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();
    vi.runOnlyPendingTimers();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.ul-modal--backdrop')).toBeTruthy();
    const takeoverInput: HTMLInputElement = fixture.nativeElement.querySelector(
      '.ul-search-input__combobox--takeover input',
    );
    expect(document.activeElement).toBe(takeoverInput);
  });

  it('selects a suggestion from inside the takeover and closes it', () => {
    const fixture = setup({ isMobile: true });
    getInputEl(fixture).dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();

    const option: HTMLElement = fixture.nativeElement.querySelectorAll(
      '.ul-search-input__option',
    )[0];
    option.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    fixture.detectChanges();

    expect(fixture.componentInstance.selected).toEqual([suggestions[0]]);
    expect(fixture.nativeElement.querySelector('.ul-modal--backdrop')).toBeFalsy();
  });

  it('closes the takeover when the back button is clicked', () => {
    const fixture = setup({ isMobile: true });
    getInputEl(fixture).dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();

    const backButton: HTMLButtonElement = fixture.nativeElement.querySelector(
      '.ul-search-input__header button',
    );
    backButton.click();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.ul-modal--backdrop')).toBeFalsy();
  });
});
