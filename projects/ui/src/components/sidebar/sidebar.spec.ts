import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { SidebarComponent, type SidebarAppearance } from './sidebar';

@Component({
  imports: [SidebarComponent],
  template: `<ul-sidebar [items]="[{ label: 'Account' }]" />`,
})
class WithoutFooterHostComponent {}

@Component({
  imports: [SidebarComponent],
  template: `
    <ul-sidebar [items]="[{ label: 'Account' }]">
      <button ul-sidebar-footer>Sign out</button>
    </ul-sidebar>
  `,
})
class WithFooterHostComponent {}

describe('SidebarComponent footer', () => {
  // The stylesheet hides the footer (and its top border) with `:empty`, which
  // only matches when no node at all — not even whitespace — is rendered.
  it('should render an empty footer element when nothing is projected', () => {
    const fixture = TestBed.createComponent(WithoutFooterHostComponent);
    fixture.detectChanges();

    const footer: HTMLElement = fixture.nativeElement.querySelector('.ul-sidebar__footer');
    expect(footer.matches(':empty')).toBe(true);
  });

  it('should keep the projected footer content', () => {
    const fixture = TestBed.createComponent(WithFooterHostComponent);
    fixture.detectChanges();

    const footer: HTMLElement = fixture.nativeElement.querySelector('.ul-sidebar__footer');
    expect(footer.matches(':empty')).toBe(false);
    expect(footer.textContent).toContain('Sign out');
  });
});

@Component({
  imports: [SidebarComponent],
  template: `<ul-sidebar
    [items]="[{ label: 'Account' }]"
    [(open)]="open"
    [appearance]="appearance"
  />`,
})
class StateHostComponent {
  open = true;
  appearance: SidebarAppearance = 'bordered';
}

describe('SidebarComponent escape key', () => {
  function setup(open: boolean) {
    const fixture = TestBed.createComponent(StateHostComponent);
    fixture.componentInstance.open = open;
    fixture.detectChanges();
    return fixture;
  }

  it('should close an open sidebar on Escape', () => {
    const fixture = setup(true);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();

    expect(fixture.componentInstance.open).toBe(false);
  });

  it('should leave a closed sidebar alone on Escape', () => {
    const fixture = setup(false);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();

    expect(fixture.componentInstance.open).toBe(false);
  });

  it('should ignore other keys', () => {
    const fixture = setup(true);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    fixture.detectChanges();

    expect(fixture.componentInstance.open).toBe(true);
  });
});

describe('SidebarComponent appearance', () => {
  function drawer(appearance: SidebarAppearance): HTMLElement {
    const fixture = TestBed.createComponent(StateHostComponent);
    fixture.componentInstance.appearance = appearance;
    fixture.detectChanges();
    return fixture.nativeElement.querySelector('.ul-sidebar__drawer');
  }

  it('should keep the right border when bordered', () => {
    expect(drawer('bordered').classList.contains('ul-sidebar__drawer--borderless')).toBe(false);
  });

  it('should drop the right border when borderless', () => {
    expect(drawer('borderless').classList.contains('ul-sidebar__drawer--borderless')).toBe(true);
  });
});
