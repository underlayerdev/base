import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleComponent } from './toggle';

describe('ToggleComponent', () => {
  let component: ToggleComponent;
  let fixture: ComponentFixture<ToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('defaults to unchecked with role="switch"', () => {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('.ul-toggle__input');

    expect(input.checked).toBe(false);
    expect(input.getAttribute('role')).toBe('switch');
  });

  it('toggles checked on change and keeps aria-checked in sync', () => {
    fixture.componentRef.setInput('checked', false);
    fixture.detectChanges();

    const input: HTMLInputElement = fixture.nativeElement.querySelector('.ul-toggle__input');
    input.checked = true;
    input.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component.checked()).toBe(true);
    expect(input.getAttribute('aria-checked')).toBe('true');
  });

  it('toggles on Enter but ignores it while disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const input: HTMLInputElement = fixture.nativeElement.querySelector('.ul-toggle__input');
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    fixture.detectChanges();

    expect(component.checked()).toBe(false);
  });

  it('renders the label inline in the same row as the switch, not stacked above it', () => {
    fixture.componentRef.setInput('label', 'Enable notifications');
    fixture.detectChanges();

    const row: HTMLElement = fixture.nativeElement.querySelector('.ul-toggle__row');
    expect(row.querySelector('.ul-toggle__input')).toBeTruthy();
    expect(row.querySelector('.ul-toggle__label')?.textContent?.trim()).toBe(
      'Enable notifications',
    );
  });
});
