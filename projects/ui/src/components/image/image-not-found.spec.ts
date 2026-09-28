import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { ImageNotFoundComponent } from './image-not-found';

function setup() {
  TestBed.configureTestingModule({ imports: [ImageNotFoundComponent] });
  const fixture: ComponentFixture<ImageNotFoundComponent> =
    TestBed.createComponent(ImageNotFoundComponent);
  return fixture;
}

describe('ImageNotFoundComponent', () => {
  it('creates', () => {
    const fixture = setup();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders the image_dashed glyph at the default size', () => {
    const fixture = setup();
    fixture.detectChanges();

    const icon = fixture.nativeElement.querySelector('ul-icon');
    expect(icon.classList.contains('ul-icon-image_dashed')).toBe(true);
    expect(icon.classList.contains('ul-icon-size-12')).toBe(true);
  });

  it('reflects a custom iconSize onto the icon', () => {
    const fixture = setup();
    fixture.componentRef.setInput('iconSize', '8');
    fixture.detectChanges();

    const icon = fixture.nativeElement.querySelector('ul-icon');
    expect(icon.classList.contains('ul-icon-size-8')).toBe(true);
    expect(icon.classList.contains('ul-icon-size-12')).toBe(false);
  });
});
