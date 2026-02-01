import { moduleMetadata } from '@storybook/angular';

import { Meta, StoryObj } from '../../../.storybook/types';
import { CheckboxComponent } from '../checkbox/checkbox';
import { IconComponent } from '../icon/icon';

import { ListItemComponent } from './list-item';

const meta: Meta<ListItemComponent> = {
  title: 'Components/Data Display/List Item',
  component: ListItemComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Single row item for lists and menus. Project label and optional before/after content (icons, checkboxes). Themes: ghost-white, transparent-white, outline-white, outline-purple. Used inside pe-dropdown and pe-select.',
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [IconComponent, CheckboxComponent],
    }),
  ],
  argTypes: {
    theme: {
      control: 'select',
      options: ['ghost-white', 'transparent-white', 'outline-white', 'outline-purple'],
    },
    disabled: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
      description: 'Show skeleton overlay while loading',
    },
  },
};

export default meta;
type Story = StoryObj<ListItemComponent>;

export const Basic: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width: 400px">
        <pe-list-item [theme]="theme" [disabled]="disabled" [loading]="loading">
          <ng-container pe-list-item-label>Basic List Item</ng-container>
        </pe-list-item>
      </div>
    `,
  }),
};

export const WithBeforeAndAfterContent: Story = {
  render: () => ({
    template: `
    <div style="max-width: 400px">
      <pe-list-item>
        <ng-container pe-list-item-before-label>
          <pe-checkbox />
          <pe-icon size="5" icon="placeholder" />
          <pe-icon size="5" icon="ultra_games" />
        </ng-container>
        <ng-container pe-list-item-label>Basic List Item</ng-container>
        <ng-container pe-list-item-after-label>
          <span>+80</span>
          <pe-icon size="5" icon="ultra_marketplace" />
          <pe-icon size="5" icon="placeholder" />
        </ng-container>
      </pe-list-item>
    </div>
    `,
  }),
};

export const Loading: Story = {
  args: {
    theme: 'ghost-white',
    disabled: false,
    loading: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width: 400px">
        <pe-list-item [theme]="theme" [disabled]="disabled" [loading]="loading">
          <ng-container pe-list-item-label>Loading list item</ng-container>
        </pe-list-item>
      </div>
    `,
  }),
};
