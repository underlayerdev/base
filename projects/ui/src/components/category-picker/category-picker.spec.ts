import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { CategoryPickerComponent, type CategoryPickerNode } from './category-picker';

const nodes: CategoryPickerNode[] = [
  { id: 'electronics', parentId: null, label: 'Electronics', isLeaf: false },
  { id: 'computing', parentId: 'electronics', label: 'Computing', isLeaf: false },
  { id: 'laptops', parentId: 'computing', label: 'Laptops', isLeaf: true },
  { id: 'phones', parentId: 'computing', label: 'Phones', isLeaf: true },
  { id: 'other', parentId: null, label: 'Other', isLeaf: true },
];

@Component({
  imports: [CategoryPickerComponent],
  template: ` <ul-category-picker [(value)]="value" [nodes]="nodes" /> `,
})
class HostComponent {
  value: string | null = null;
  nodes = nodes;
}

function setup(initialValue: string | null = null) {
  TestBed.configureTestingModule({ imports: [HostComponent] });
  const fixture: ComponentFixture<HostComponent> = TestBed.createComponent(HostComponent);
  fixture.componentInstance.value = initialValue;
  fixture.detectChanges();
  return fixture;
}

function openPicker(fixture: ComponentFixture<HostComponent>): void {
  const control: HTMLElement = fixture.nativeElement.querySelector('.ul-category-picker__control');
  control.click();
  fixture.detectChanges();
}

function rowByText(fixture: ComponentFixture<HostComponent>, text: string): HTMLElement {
  const rows: HTMLElement[] = Array.from(fixture.nativeElement.querySelectorAll('ul-list-item'));
  const row = rows.find((el) => el.textContent?.includes(text));
  if (!row) throw new Error(`No row found for "${text}"`);
  return row;
}

describe('CategoryPickerComponent', () => {
  it('shows the placeholder when nothing is selected', () => {
    const fixture = setup();

    const text = fixture.nativeElement.querySelector('.ul-category-picker__control-text');
    expect(text.textContent).toContain('Select a category');
  });

  it('shows the full breadcrumb of the selected leaf in the closed field', () => {
    const fixture = setup('laptops');

    const text = fixture.nativeElement.querySelector('.ul-category-picker__control-text');
    expect(text.textContent).toContain('Electronics › Computing › Laptops');
  });

  it('opens the modal showing root-level nodes', () => {
    const fixture = setup();
    openPicker(fixture);

    expect(fixture.nativeElement.querySelector('.ul-category-picker__modal')).toBeTruthy();
    expect(rowByText(fixture, 'Electronics')).toBeTruthy();
    expect(rowByText(fixture, 'Other')).toBeTruthy();
  });

  it('drills into a non-leaf node and shows its children with a breadcrumb', () => {
    const fixture = setup();
    openPicker(fixture);

    rowByText(fixture, 'Electronics').click();
    fixture.detectChanges();

    expect(rowByText(fixture, 'Computing')).toBeTruthy();
    const breadcrumb = fixture.nativeElement.querySelector('.ul-category-picker__breadcrumb');
    expect(breadcrumb.textContent).toContain('Electronics');
  });

  it('navigates back to the root level via the breadcrumb', () => {
    const fixture = setup();
    openPicker(fixture);
    rowByText(fixture, 'Electronics').click();
    fixture.detectChanges();

    const rootCrumb: HTMLElement = fixture.nativeElement.querySelector(
      '.ul-category-picker__breadcrumb-item',
    );
    rootCrumb.click();
    fixture.detectChanges();

    expect(rowByText(fixture, 'Electronics')).toBeTruthy();
    expect(rowByText(fixture, 'Other')).toBeTruthy();
  });

  it('selects a leaf node and closes the modal', () => {
    const fixture = setup();
    openPicker(fixture);
    rowByText(fixture, 'Electronics').click();
    fixture.detectChanges();
    rowByText(fixture, 'Computing').click();
    fixture.detectChanges();
    rowByText(fixture, 'Laptops').click();
    fixture.detectChanges();

    expect(fixture.componentInstance.value).toBe('laptops');
    expect(fixture.nativeElement.querySelector('.ul-category-picker__modal')).toBeFalsy();
  });

  it('filters to matching leaves across the whole tree when searching, with a breadcrumb subtitle', () => {
    const fixture = setup();
    openPicker(fixture);

    const searchInput: HTMLInputElement = fixture.nativeElement.querySelector('input');
    searchInput.value = 'phone';
    searchInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const row = rowByText(fixture, 'Phones');
    expect(row.textContent).toContain('Electronics › Computing');
    expect(fixture.nativeElement.querySelector('.ul-category-picker__breadcrumb')).toBeFalsy();
  });

  it('shows a no-results state when the search matches nothing', () => {
    const fixture = setup();
    openPicker(fixture);

    const searchInput: HTMLInputElement = fixture.nativeElement.querySelector('input');
    searchInput.value = 'zzz-not-a-category';
    searchInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.ul-category-picker__empty')).toBeTruthy();
  });
});
