import { moduleMetadata } from '@storybook/angular';

import { Meta, StoryObj } from '../../../.storybook/types';

import { CarouselComponent } from './carousel';
import { CarouselItemComponent } from './carousel';

const meta: Meta<CarouselComponent> = {
  title: 'Components/Data Display/Carousel',
  component: CarouselComponent,
  decorators: [
    moduleMetadata({
      imports: [CarouselItemComponent],
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
          'Carousel/slider powered by Splide. Add `pe-carousel-item` children; pass Splide `options` and optional `autoMount`. Emits `mounted` with the Splide instance for custom configuration.',
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

// Basic carousel with images
export const Basic: Story = {
  render: (args) => ({
    props: args,
    template: `
      <pe-carousel [options]="options" [autoMount]="autoMount">
        <pe-carousel-item>
          <img src="https://picsum.photos/800/400?random=1" alt="Slide 1" style="width: 100%; height: 400px; object-fit: cover;">
        </pe-carousel-item>
        <pe-carousel-item>
          <img src="https://picsum.photos/800/400?random=2" alt="Slide 2" style="width: 100%; height: 400px; object-fit: cover;">
        </pe-carousel-item>
        <pe-carousel-item>
          <img src="https://picsum.photos/800/400?random=3" alt="Slide 3" style="width: 100%; height: 400px; object-fit: cover;">
        </pe-carousel-item>
      </pe-carousel>
    `,
  }),
  args: {
    options: {
      autoplay: true,
      interval: 3000,
      rewind: true,
    },
    autoMount: true,
  },
};
