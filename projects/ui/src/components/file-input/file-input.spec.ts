import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { FileInputComponent } from './file-input';

describe('FileInputComponent', () => {
  let component: FileInputComponent;
  let fixture: ComponentFixture<FileInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FileInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have native file input with type="file"', () => {
    const el = fixture.nativeElement as HTMLElement;
    const input = el.querySelector<HTMLInputElement>('input[type="file"]');
    expect(input).toBeTruthy();
    expect(input?.id).toBeTruthy();
  });

  it('should have trigger button that opens file dialog when clicked', () => {
    const el = fixture.nativeElement as HTMLElement;
    const trigger = el.querySelector<HTMLButtonElement>('.pe-file-input__trigger');
    const nativeInput = el.querySelector<HTMLInputElement>('input[type="file"]');
    expect(trigger).toBeTruthy();
    expect(nativeInput).toBeTruthy();
    const clickSpy = vi.spyOn(nativeInput!, 'click');
    trigger!.click();
    expect(clickSpy).toHaveBeenCalled();
  });

  it('should not open file dialog when disabled and trigger is clicked', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const trigger = el.querySelector<HTMLButtonElement>('.pe-file-input__trigger');
    const nativeInput = el.querySelector<HTMLInputElement>('input[type="file"]');
    const clickSpy = vi.spyOn(nativeInput!, 'click');
    trigger!.click();
    expect(clickSpy).not.toHaveBeenCalled();
  });

  it('should set touched on blur', () => {
    expect(component.touched()).toBe(false);
    const el = fixture.nativeElement as HTMLElement;
    const nativeInput = el.querySelector<HTMLInputElement>('input[type="file"]');
    nativeInput?.dispatchEvent(new FocusEvent('blur', { bubbles: true }));
    fixture.detectChanges();
    expect(component.touched()).toBe(true);
  });

  it('should update value and displayed label when file input fires change', () => {
    const el = fixture.nativeElement as HTMLElement;
    const nativeInput = el.querySelector<HTMLInputElement>('input[type="file"]');
    expect(nativeInput).toBeTruthy();
    const file = new File(['content'], 'test.txt', { type: 'text/plain' });
    const fileList = { length: 1, item: (i: number) => (i === 0 ? file : null), 0: file } as unknown as FileList;
    Object.defineProperty(nativeInput!, 'files', { value: fileList, configurable: true });
    nativeInput!.dispatchEvent(new Event('change', { bubbles: true }));
    fixture.detectChanges();
    expect(component.value()).toBeTruthy();
    expect(component.value()?.length).toBe(1);
    const labelEl = el.querySelector('.pe-file-input__label');
    expect(labelEl?.textContent?.trim()).toBe('test.txt');
  });

  it('should set aria-invalid when hasError', () => {
    fixture.componentRef.setInput('error', true);
    fixture.detectChanges();
    const wrapper = fixture.nativeElement as HTMLElement;
    const firstDiv = wrapper.querySelector('div');
    expect(firstDiv?.getAttribute('aria-invalid')).toBe('true');
  });

  it('should set aria-required when required', () => {
    fixture.componentRef.setInput('required', true);
    fixture.detectChanges();
    const wrapper = fixture.nativeElement as HTMLElement;
    const firstDiv = wrapper.querySelector('div');
    expect(firstDiv?.getAttribute('aria-required')).toBe('true');
  });

  it('focus() should focus the native input', () => {
    const el = fixture.nativeElement as HTMLElement;
    const nativeInput = el.querySelector<HTMLInputElement>('input[type="file"]');
    const focusSpy = vi.spyOn(nativeInput!, 'focus');
    component.focus();
    expect(focusSpy).toHaveBeenCalled();
  });

  it('should expose valueChange output', () => {
    const emitted: (FileList | null)[] = [];
    component.valueChange.subscribe((v) => emitted.push(v));
    expect(component.valueChange).toBeDefined();
  });
});
