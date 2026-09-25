import { Component, signal } from '@angular/core';
import { moduleMetadata } from '@storybook/angular';

import { Meta, StoryObj } from '../.storybook/types';
import { ButtonComponent } from '../src/components/button/button';

import { CarouselComponent } from './carousel';
import { CarouselItemComponent } from './carousel';

/**
 * Slides for the stories. Plain `<img>`s so the stories stay about the carousel
 * rather than about whatever is projected into it.
 *
 * The explicit height is not decoration: the track takes its height from the
 * slides, so without one each photo's natural aspect ratio decides how tall the
 * carousel ends up — which is exactly the reflow consumers hit first.
 */
const slides = (count: number, height = 400): string =>
  Array.from(
    { length: count },
    (_, i) => `
        <ul-carousel-item>
          <img
            src="https://picsum.photos/800/400?random=${i + 1}"
            alt="Slide ${i + 1}"
            style="width: 100%; height: ${height}px; object-fit: cover;"
          >
        </ul-carousel-item>`,
  ).join('');

/**
 * Backs the DynamicSlides story: the carousel refreshes itself when its
 * projected items change, which only shows up if something adds or removes
 * them at runtime.
 */
@Component({
  selector: 'ul-carousel-dynamic-demo',
  imports: [CarouselComponent, CarouselItemComponent, ButtonComponent],
  template: `
    <ul-carousel [options]="{ perPage: 2, gap: '16px', arrows: true, autoplay: false }">
      @for (id of ids(); track id) {
        <ul-carousel-item>
          <img
            [src]="'https://picsum.photos/800/400?random=' + id"
            [alt]="'Slide ' + id"
            style="width: 100%; height: 240px; object-fit: cover;"
          />
        </ul-carousel-item>
      }
    </ul-carousel>

    <div style="display: flex; gap: 8px; justify-content: center; margin-top: 1rem;">
      <ul-button theme="outline-purple" (buttonClick)="add()">Add slide</ul-button>
      <ul-button theme="outline-purple" [disabled]="ids().length <= 1" (buttonClick)="remove()">
        Remove slide
      </ul-button>
    </div>
  `,
})
class CarouselDynamicDemoComponent {
  readonly ids = signal([1, 2, 3]);

  add(): void {
    this.ids.update((current) => [...current, (current.at(-1) ?? 0) + 1]);
  }

  remove(): void {
    this.ids.update((current) => current.slice(0, -1));
  }
}

const meta: Meta<CarouselComponent> = {
  title: 'Components/Data Display/Carousel',
  component: CarouselComponent,
  decorators: [
    moduleMetadata({
      imports: [CarouselItemComponent, ButtonComponent, CarouselDynamicDemoComponent],
    }),
    (story) => ({
      ...story(),
      template: `<div style="max-width: 800px;">${story().template}</div>`,
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Carousel/slider powered by Splide. Add `ul-carousel-item` children; pass Splide `options` and optional `autoMount`. Emits `mounted` with the Splide instance for custom configuration. Note that the component overrides two Splide defaults: `arrows` is off unless asked for, and pagination dots are themed through an extra class.',
      },
    },
  },
  argTypes: {
    options: {
      description: 'Splide carousel options https://splidejs.com/guides/options/',
    },
    autoMount: {
      description: 'Whether to automatically mount the carousel on initialization',
      control: 'boolean',
    },
    mounted: {
      description: 'Event emitted when the carousel is mounted, providing the Splide instance',
    },
  },
};

export default meta;
type Story = StoryObj<CarouselComponent>;

// Storybook unwraps the component's InputSignals into plain values for args, so
// the shape a render function receives is not CarouselComponent itself.
type StoryArgs = Parameters<NonNullable<Story['render']>>[0];

// Every story below differs only in the options it passes, so the markup is
// built once here and the slide count/height are the only knobs.
const imageCarousel =
  (count = 3, height = 400) =>
  (args: StoryArgs) => ({
    props: args,
    template: `
      <ul-carousel [options]="options" [autoMount]="autoMount">${slides(count, height)}
      </ul-carousel>
    `,
  });

// Basic carousel with images
export const Basic: Story = {
  render: imageCarousel(),
  args: {
    options: {
      autoplay: true,
      interval: 3000,
      rewind: true,
    },
    autoMount: true,
  },
};

export const WithArrows: Story = {
  render: imageCarousel(),
  args: {
    options: {
      arrows: true,
      pagination: false,
      autoplay: false,
    },
    autoMount: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Arrows are off by default, so they have to be asked for. The design system styles them as circular overlays on top of the slides rather than as a row above them, so turning them on does not change the carousel\'s height. Without `type: "loop"` Splide disables the arrow at whichever end the carousel is sitting on — it stays in place, faded, so the other one does not jump across.',
      },
    },
  },
};

export const WithPagination: Story = {
  render: imageCarousel(),
  args: {
    options: {
      arrows: false,
      pagination: true,
      autoplay: false,
    },
    autoMount: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Dots instead of arrows — the better affordance on touch, where there is no cursor to hover an arrow with. Pagination is Splide's own, but the component adds a class to each dot so it picks up the design system's colours.",
      },
    },
  },
};

export const MultiplePerPage: Story = {
  render: imageCarousel(8, 200),
  args: {
    options: {
      perPage: 4,
      gap: '16px',
      arrows: true,
      pagination: false,
      autoplay: false,
      // Splide's `breakpoints` keys are max-widths, so this reads bottom-up:
      // 3 per page at 1279px and below, 2 at 1023px, 1 at 767px.
      breakpoints: {
        1279: { perPage: 3 },
        1023: { perPage: 2 },
        767: { perPage: 1 },
      },
    },
    autoMount: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'The shelf-of-cards case: several slides visible at once, with a gap between them, stepping down as the viewport narrows. Resize the preview (or use the device toolbar) to see the breakpoints take effect.',
      },
    },
  },
};

export const Loop: Story = {
  render: imageCarousel(),
  args: {
    options: {
      type: 'loop',
      arrows: true,
      pagination: false,
      autoplay: false,
    },
    autoMount: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Wraps around instead of stopping at the ends, which means neither arrow is ever disabled. Splide clones slides to do this, so keep it for short, cheap slides.',
      },
    },
  },
};

export const Fade: Story = {
  render: imageCarousel(),
  args: {
    options: {
      type: 'fade',
      rewind: true,
      arrows: true,
      pagination: false,
      autoplay: false,
    },
    autoMount: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Cross-fades between slides rather than sliding them. Splide requires `rewind: true` with this type, and it only supports one slide per page.',
      },
    },
  },
};

export const ExternalControls: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ul-carousel #carousel [options]="options" [autoMount]="autoMount">${slides(4, 280)}
      </ul-carousel>

      <div style="display: flex; gap: 8px; justify-content: center; margin-top: 1rem;">
        <ul-button theme="outline-purple" (buttonClick)="carousel.goPrev()">Previous</ul-button>
        <ul-button theme="outline-purple" (buttonClick)="carousel.goTo(0)">First</ul-button>
        <ul-button theme="outline-purple" (buttonClick)="carousel.goNext()">Next</ul-button>
      </div>
    `,
  }),
  args: {
    options: {
      type: 'loop',
      arrows: false,
      pagination: false,
      autoplay: false,
    },
    autoMount: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'For controls that belong to the surrounding layout rather than to the carousel. A template reference gives access to `goPrev()`, `goNext()` and `goTo(index)`; `getInstance()` returns the Splide object itself for anything those three do not cover.',
      },
    },
  },
};

export const DynamicSlides: Story = {
  render: () => ({
    template: `<ul-carousel-dynamic-demo />`,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Slides can be added or removed after mounting — the carousel watches its projected items and refreshes Splide itself, so consumers do not have to reach for the instance to do it.',
      },
    },
  },
};
