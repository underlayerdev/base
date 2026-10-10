import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { SidebarComponent } from './sidebar';

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
