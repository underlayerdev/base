import { Meta, StoryObj } from '../../../.storybook/types';

import { StatusComponent } from './status';

const meta: Meta<StatusComponent> = {
  title: 'Components/Feedback/Status',
  component: StatusComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Status message block with icon, title, subtitle, and description. Status types: confirm, alert, error, pending, info. Optional custom icon and loading animation. Content is projected via pe-status-title, pe-status-subtitle, pe-status-description.',
      },
    },
  },
  argTypes: {
    status: {
      control: 'select',
      options: ['confirm', 'alert', 'error', 'pending', 'info'],
      description: 'The status type that determines the icon and styling',
    },
    customIcon: {
      control: 'text',
      description: 'Optional custom icon to override the default status icon',
    },
    loadingAnimation: {
      control: 'boolean',
      description: 'Whether to show the loading animation',
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-status [status]="status" [customIcon]="customIcon" [loadingAnimation]="loadingAnimation">
        <div pe-status-title>Status Title</div>
        <div pe-status-subtitle>Status Subtitle</div>
        <div pe-status-description>Korem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis..</div>
      </pe-status>
    `,
  }),
};

export default meta;
type Story = StoryObj<StatusComponent>;

export const Confirm: Story = {
  args: {
    status: 'confirm',
  },
};

export const Alert: Story = {
  args: {
    status: 'alert',
  },
};

export const Error: Story = {
  args: {
    status: 'error',
  },
};

export const Pending: Story = {
  args: {
    status: 'pending',
    loadingAnimation: true,
  },
};

export const Info: Story = {
  args: {
    status: 'info',
  },
};

export const WithCustomIcon: Story = {
  args: {
    status: 'info',
    customIcon: 'star',
  },
};
