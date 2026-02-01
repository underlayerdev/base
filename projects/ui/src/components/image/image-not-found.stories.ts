import { Meta, StoryObj } from '@storybook/angular';

import { ImageNotFoundDirective } from './image-not-found';

const meta: Meta<ImageNotFoundDirective> = {
  title: 'Components/Media/ImageNotFound',
  component: ImageNotFoundDirective,
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
            peCatchImageNotFound 
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
    <div class="pe-background-white-light" style="height: 300px; width: 200px;">  
        <img 
            peCatchImageNotFound 
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
    <div class="pe-background-white-light" style="height: 300px; width: 200px;">  
        <img 
            peCatchImageNotFound
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
