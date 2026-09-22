import { moduleMetadata } from '@storybook/angular';
import { Meta, StoryObj } from '@storybook/angular';

import { ImageNotFoundComponent, ImageNotFoundDirective } from './image-not-found';

// Two ways of getting to the same placeholder, kept in one file because
// they're the same concept split by which case applies: the directive reacts
// to an <img> that fails to load; the component is for when there's no URL to
// even try — no <img>, so nothing to attach the directive to. `meta.component`
// points at the directive since that's the older, more broadly used side, but
// ImageNotFoundComponent gets its own stories below all the same.
const meta: Meta<ImageNotFoundDirective> = {
  title: 'Components/Media/ImageNotFound',
  component: ImageNotFoundDirective,
  decorators: [moduleMetadata({ imports: [ImageNotFoundComponent] })],
  tags: ['autodocs'],
  argTypes: {
    showPlaceholder: {
      description: 'Controls whether to show a placeholder image when the source image fails to load',
      control: 'boolean',
      defaultValue: true,
    },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A directive that handles image loading failures by displaying a placeholder or hiding the broken image.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<ImageNotFoundDirective>;

export const ValidImage: Story = {
  render: () => ({
    template: `
    <div style="height: 300px; width: 200px;">  
        <img 
            ulCatchImageNotFound 
            src="https://picsum.photos/200/300" 
            alt="Valid image example"
            width="200"
            height="300"
        />
    </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Example of the directive with a valid image URL that loads successfully.',
      },
    },
  },
};

export const InvalidImage: Story = {
  render: () => ({
    template: `
    <div class="ul-background-white-light" style="height: 300px; width: 200px;">  
        <img 
            ulCatchImageNotFound 
            src="invalid-image-url.jpg" 
            alt="Invalid image example"
            width="200"
            height="300"
        />
    </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Shows how the directive handles a broken image URL by displaying the default placeholder.',
      },
    },
  },
};

export const WithoutPlaceholder: Story = {
  render: () => ({
    template: `
    <div class="ul-background-white-light" style="height: 300px; width: 200px;">  
        <img 
            ulCatchImageNotFound
            [showPlaceholder]="false"
            src="invalid-image-url.jpg" 
            alt="Invalid image without placeholder"
            width="200"
            height="300"
        />
    </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates the behavior when showPlaceholder is set to false - the image will be hidden instead of showing a placeholder.',
      },
    },
  },
};

export const NoImage: Story = {
  render: () => ({
    template: `
    <div class="ul-background-white-light" style="position: relative; height: 300px; width: 200px;">
        <ul-image-not-found />
    </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'ImageNotFoundComponent (`ul-image-not-found`): for a listing with no photo at all, rather than a photo that failed to load. Fills its nearest `position: relative` ancestor, the same way the directive\'s own placeholder fills the `<img>` it replaces.',
      },
    },
  },
};

export const NoImageLargeIcon: Story = {
  render: () => ({
    template: `
    <div class="ul-background-white-light" style="position: relative; height: 480px; width: 100%;">
        <ul-image-not-found iconSize="16" />
    </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '`iconSize` scales the glyph for a larger slot, e.g. a full-width empty gallery.',
      },
    },
  },
};
