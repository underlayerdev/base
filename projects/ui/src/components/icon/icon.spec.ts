import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { IconComponent, type IconSize, type IconWeight } from './icon';

function render(weight?: IconWeight | null): HTMLElement {
  const fixture = TestBed.createComponent(IconComponent);
  fixture.componentRef.setInput('icon', 'user');
  if (weight !== undefined) fixture.componentRef.setInput('weight', weight);
  fixture.detectChanges();
  return fixture.nativeElement;
}

describe('IconComponent weight', () => {
  it('defaults to the medium weight', () => {
    expect(render().classList.contains('ul-icon-weight-medium')).toBe(true);
  });

  it('applies the requested weight', () => {
    const el = render('bold');

    expect(el.classList.contains('ul-icon-weight-bold')).toBe(true);
    expect(el.classList.contains('ul-icon-weight-medium')).toBe(false);
  });

  it('leaves the weight out entirely when set to null, so it inherits', () => {
    const el = render(null);

    expect(Array.from(el.classList).some((name) => name.startsWith('ul-icon-weight-'))).toBe(false);
    expect(el.classList.contains('ul-icon')).toBe(true);
    expect(el.classList.contains('ul-icon-user')).toBe(true);
  });
});

describe('IconComponent size', () => {
  function renderSize(size?: IconSize): HTMLElement {
    const fixture = TestBed.createComponent(IconComponent);
    fixture.componentRef.setInput('icon', 'user');
    if (size !== undefined) fixture.componentRef.setInput('size', size);
    fixture.detectChanges();
    return fixture.nativeElement;
  }

  it('renders at the default size and marks it as one a container may resize', () => {
    const el = renderSize();

    expect(el.classList.contains('ul-icon-size-8')).toBe(true);
    expect(el.classList.contains('ul-icon--default-size')).toBe(true);
  });

  it('applies an explicit size without the default marker, so containers keep it', () => {
    const el = renderSize('4');

    expect(el.classList.contains('ul-icon-size-4')).toBe(true);
    expect(el.classList.contains('ul-icon-size-8')).toBe(false);
    expect(el.classList.contains('ul-icon--default-size')).toBe(false);
  });
});
