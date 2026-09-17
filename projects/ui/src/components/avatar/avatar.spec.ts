import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { AvatarComponent } from './avatar';

function setup() {
  TestBed.configureTestingModule({ imports: [AvatarComponent] });
  const fixture: ComponentFixture<AvatarComponent> = TestBed.createComponent(AvatarComponent);
  return fixture;
}

describe('AvatarComponent', () => {
  it('creates', () => {
    const fixture = setup();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('defaults to the md size', () => {
    const fixture = setup();
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement.querySelector('.ul-avatar');
    expect(el.classList.contains('ul-avatar--md')).toBe(true);
  });

  it('renders the 2xl size for onboarding-style hero avatars', () => {
    const fixture = setup();
    fixture.componentRef.setInput('size', '2xl');
    fixture.componentRef.setInput('initials', 'JD');
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement.querySelector('.ul-avatar');
    expect(el.classList.contains('ul-avatar--2xl')).toBe(true);
    expect(fixture.nativeElement.querySelector('.ul-avatar__initials')?.textContent).toBe('JD');
  });

  it('falls back from image to initials on load error', () => {
    const fixture = setup();
    fixture.componentRef.setInput('src', 'https://example.com/broken.jpg');
    fixture.componentRef.setInput('initials', 'AB');
    fixture.detectChanges();

    const img: HTMLImageElement = fixture.nativeElement.querySelector('.ul-avatar__image');
    img.dispatchEvent(new Event('error'));
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.ul-avatar__image')).toBeNull();
    expect(fixture.nativeElement.querySelector('.ul-avatar__initials')?.textContent).toBe('AB');
  });

  describe('editable', () => {
    it('shows a default person icon and the photo-icon overlay when nothing is set', () => {
      const fixture = setup();
      fixture.componentRef.setInput('editable', true);
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.ul-icon-user')).toBeTruthy();
      expect(
        fixture.nativeElement.querySelector('.ul-avatar__edit-overlay .ul-icon-photo'),
      ).toBeTruthy();
    });

    it('layers the overlay on top of initials when there is no photo yet', () => {
      const fixture = setup();
      fixture.componentRef.setInput('editable', true);
      fixture.componentRef.setInput('initials', 'JD');
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.ul-avatar__initials')?.textContent).toBe('JD');
      expect(fixture.nativeElement.querySelector('.ul-avatar__edit-overlay')).toBeTruthy();
    });

    it('keeps showing the overlay once a photo is set, so the user can tell they can change it', () => {
      const fixture = setup();
      fixture.componentRef.setInput('editable', true);
      fixture.componentRef.setInput('src', 'https://example.com/photo.jpg');
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.ul-avatar__image')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.ul-avatar__edit-overlay')).toBeTruthy();
    });

    it('keeps showing the overlay if the photo fails to load', () => {
      const fixture = setup();
      fixture.componentRef.setInput('editable', true);
      fixture.componentRef.setInput('src', 'https://example.com/broken.jpg');
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.ul-avatar__edit-overlay')).toBeTruthy();

      const img: HTMLImageElement = fixture.nativeElement.querySelector('.ul-avatar__image');
      img.dispatchEvent(new Event('error'));
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.ul-avatar__edit-overlay')).toBeTruthy();
    });

    it('does not show the overlay or default icon when not editable', () => {
      const fixture = setup();
      fixture.componentRef.setInput('src', 'https://example.com/photo.jpg');
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.ul-avatar__edit-overlay')).toBeNull();
      expect(fixture.nativeElement.querySelector('.ul-icon-user')).toBeNull();
    });
  });
});
