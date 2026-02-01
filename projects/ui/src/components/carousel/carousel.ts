import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  effect,
  ElementRef,
  input,
  OnDestroy,
  output,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import Splide, { Options } from '@splidejs/splide';

@Component({
  selector: 'pe-carousel-item',
  standalone: true,
  template: ` <ng-content /> `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'splide__slide pe-carousel__item',
  },
})
export class CarouselItemComponent {}

@Component({
  selector: 'pe-carousel',
  standalone: true,
  template: `
    <div class="splide pe-carousel" #carousel role="region" aria-roledescription="carousel">
      <div class="splide__track pe-carousel__track">
        <div class="splide__list">
          <ng-content />
        </div>
      </div>
    </div>
  `,
  styleUrl: './carousel.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselComponent implements AfterViewInit, OnDestroy {
  options = input<Options>({
    autoplay: true,
  });
  autoMount = input<boolean>(true);
  mounted = output<Splide>();

  private carousel = viewChild<ElementRef<HTMLElement>>('carousel');
  private items = contentChildren<CarouselItemComponent>(CarouselItemComponent);
  private instance: Splide | null = null;

  constructor() {
    effect(() => {
      this.items(); // trigger change detection
      this.updateCarouselOnItemsChange();
    });
  }

  ngAfterViewInit() {
    this.init();
  }

  ngOnDestroy() {
    this.instance?.destroy();
  }

  // Get the Splide instance
  getInstance() {
    return this.instance;
  }

  // Methods to control the carousel
  goNext() {
    this.instance?.go('>');
  }

  goPrev() {
    this.instance?.go('<');
  }

  goTo(index: number) {
    this.instance?.go(index);
  }

  // Mount the carousel
  mount() {
    if (!this.instance) {
      throw new Error('Carousel instance not found');
    }
    this.instance.mount();
    this.mounted.emit(this.instance);
  }

  private init() {
    const carousel = this.carousel();
    if (!carousel) {
      throw new Error('Carousel element not found');
    }
    // initialize the carousel
    this.instance = new Splide(carousel.nativeElement, {
      arrows: false,
      classes: {
        page: 'splide__pagination__page pe-carousel__pagination-dot',
      },
      ...this.options(),
    });
    // mount the carousel
    if (this.autoMount()) {
      this.mount();
    }
  }

  private updateCarouselOnItemsChange() {
    this.instance?.refresh();
  }
}
