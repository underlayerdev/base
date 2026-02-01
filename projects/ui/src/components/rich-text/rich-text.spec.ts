import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RichTextComponent } from './rich-text';

describe('RichTextComponent', () => {
  let component: RichTextComponent;
  let fixture: ComponentFixture<RichTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RichTextComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RichTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render sanitized HTML when content input is set', () => {
    fixture.componentRef.setInput('content', '<p>Hello</p>');
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const paragraph = el.querySelector('.pe-rich-text p');
    expect(paragraph).toBeTruthy();
    expect(paragraph?.textContent?.trim()).toBe('Hello');
  });

  it('should apply size variant class when size is body-m', () => {
    fixture.componentRef.setInput('size', 'body-m');
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.pe-rich-text--body-m')).toBeTruthy();
  });
});
