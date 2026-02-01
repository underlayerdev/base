import { Meta, StoryObj } from '../../../.storybook/types';

import { CollapseComponent } from './collapse';

const meta: Meta<CollapseComponent> = {
  title: 'Components/Data Display/Collapse',
  component: CollapseComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Expandable/collapsible region with optional max height. Variants: text (inline expand/collapse trigger) or icon (icon-only trigger). Bind `[(collapsed)]` to control state. Content is projected.',
      },
    },
  },
  argTypes: {
    variant: {
      options: ['text', 'icon'],
      control: { type: 'radio' },
    },
    maxHeight: {
      control: { type: 'number' },
    },
    collapsed: {
      control: { type: 'boolean' },
    },
  },
  args: {
    variant: 'text',
    maxHeight: 100,
    collapsed: true,
  },
};

export default meta;
type Story = StoryObj<CollapseComponent>;

/**
 * Default collapse story that demonstrates the basic collapse component with text variant.
 */
export const Default: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <pe-collapse
        [variant]="variant"
        [maxHeight]="maxHeight"
        [collapsed]="collapsed"
      >
        <div style="padding: 16px;">
          <h3>Sample Content</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <p>Vestibulum euismod, nunc ut fermentum elementum, augue nunc laoreet justo.</p>
          <p>Curabitur sagittis velit ac velit fermentum, non rhoncus lectus tincidunt.</p>
          <p>Integer ultricies diam eget augue molestie, sit amet dapibus elit varius.</p>
          <p>Donec sodales orci eget nisl fermentum, a gravida lacus tristique.</p>
          <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames.</p>
          <p>Maecenas eget eros nec libero aliquet pretium id nec ipsum.</p>
          <p>Nam tincidunt nunc in mauris ultrices, et scelerisque lacus fermentum.</p>
          <p>Fusce facilisis erat id magna varius, nec sodales ex congue.</p>
          <p>Sed eget turpis nec mi bibendum vehicula ut nec velit.</p>
        </div>
      </pe-collapse>
    `,
  }),
};

export const InitiallyExpanded: Story = {
  args: {
    variant: 'text',
    maxHeight: 150,
    collapsed: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-collapse
        [variant]="variant"
        [maxHeight]="maxHeight"
        [collapsed]="collapsed"
      >
        <div style="padding: 16px;">
          <h3>Initially Expanded Content</h3>
          <p>This collapse starts expanded and can be collapsed by the user.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <p>Vestibulum euismod, nunc ut fermentum elementum, augue nunc laoreet justo.</p>
        </div>
      </pe-collapse>
    `,
  }),
};

/**
 * Demonstrates the collapse component with icon variant.
 */
export const IconVariant: Story = {
  args: {
    variant: 'icon',
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-collapse
        [variant]="variant"
        [maxHeight]="maxHeight"
        [collapsed]="collapsed"
      >
        <div style="padding: 16px;">
          <h3>Content with Icon Toggle</h3>
          <p>This variant uses an icon button to toggle the collapse state instead of text.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </div>
      </pe-collapse>
    `,
  }),
};
