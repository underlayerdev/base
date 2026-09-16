import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperComponent } from './stepper';

describe('StepperComponent', () => {
  let component: StepperComponent;
  let fixture: ComponentFixture<StepperComponent>;

  function setup(totalSteps: number, currentStep: number) {
    TestBed.configureTestingModule({
      imports: [StepperComponent],
    });

    fixture = TestBed.createComponent(StepperComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('totalSteps', totalSteps);
    fixture.componentRef.setInput('currentStep', currentStep);
    fixture.detectChanges();
  }

  it('should create', () => {
    setup(3, 1);
    expect(component).toBeTruthy();
  });

  it('renders one item per step', () => {
    setup(4, 2);

    expect(fixture.nativeElement.querySelectorAll('.ul-stepper__item').length).toBe(4);
  });

  it('marks steps before currentStep as completed and the rest as upcoming', () => {
    setup(4, 3);

    const items = fixture.nativeElement.querySelectorAll('.ul-stepper__item');
    expect(items[0].classList).toContain('ul-stepper__item--completed');
    expect(items[1].classList).toContain('ul-stepper__item--completed');
    expect(items[2].classList).toContain('ul-stepper__item--current');
    expect(items[3].classList).not.toContain('ul-stepper__item--completed');
    expect(items[3].classList).not.toContain('ul-stepper__item--current');
  });

  it('sets aria-current="step" only on the current item', () => {
    setup(3, 2);

    const items = fixture.nativeElement.querySelectorAll('.ul-stepper__item');
    expect(items[0].getAttribute('aria-current')).toBeNull();
    expect(items[1].getAttribute('aria-current')).toBe('step');
    expect(items[2].getAttribute('aria-current')).toBeNull();
  });

  it('renders labels when provided', () => {
    setup(2, 1);
    fixture.componentRef.setInput('labels', ['Name', 'Photo']);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Name');
    expect(fixture.nativeElement.textContent).toContain('Photo');
  });
});
