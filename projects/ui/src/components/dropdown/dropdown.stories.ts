import { moduleMetadata } from '@storybook/angular';

import { Meta, StoryObj } from '../../../.storybook/types';
import { IconComponent } from '../icon/icon';
import { ListItemComponent } from '../list-item/list-item';

import { DropdownComponent, DropdownItem } from './dropdown';

const meta: Meta<DropdownComponent> = {
  title: 'Components/Actions/Dropdown',
  component: DropdownComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Trigger-based dropdown menu. Pass `items` (label, value, optional leftIcons, rightIcons, disabled) and bind `[(selectedIndex)]` for the chosen item. Themes: ghost-white, transparent-white. Used by pe-select; can be used standalone for custom menus.',
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [ListItemComponent, IconComponent],
    }),
  ],
  argTypes: {
    theme: {
      options: ['ghost-white', 'transparent-white'],
      control: 'select',
    },
    menuTriggerIcons: {
      control: 'object',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<DropdownComponent>;

// Create a comprehensive fake list of dropdown items
const dropdownItems: DropdownItem[] = [
  {
    label: 'Most recent first',
    value: 'recent_desc',
    leftIcons: ['sort'],
    rightIcons: ['activity'],
  },
  {
    label: 'Most old first',
    value: 'recent_asc',
    leftIcons: ['sort'],
    rightIcons: ['admin'],
  },
  {
    label: 'Lower price first',
    value: 'price_asc',
    leftIcons: ['dollar'],
    rightIcons: ['apple'],
    disabled: true,
  },
  {
    label: 'Higher price first',
    value: 'price_desc',
    leftIcons: ['dollar'],
    rightIcons: ['application'],
  },
  {
    label: 'Alphabetical order A - Z',
    value: 'alpha_asc',
    leftIcons: ['type'],
    rightIcons: ['archive'],
  },
  {
    label: 'Alphabetical order Z - A',
    value: 'alpha_desc',
    leftIcons: ['type'],
    rightIcons: ['award'],
  },
  {
    label: 'Popular games',
    value: 'popular',
    leftIcons: ['star_filled'],
    rightIcons: ['flame'],
  },
  {
    label: 'New releases',
    value: 'new',
    leftIcons: ['star'],
    rightIcons: ['plus'],
  },
  {
    label: 'On sale',
    value: 'sale',
    leftIcons: ['tag'],
    rightIcons: ['percent'],
  },
  {
    label: 'Free games',
    value: 'free',
    leftIcons: ['gift'],
    rightIcons: ['check'],
  },
  {
    label: 'Premium games',
    value: 'premium',
    leftIcons: ['crown'],
    rightIcons: ['diamond'],
  },
  {
    label: 'Categories',
    value: 'categories',
    leftIcons: ['apps_grid'],
    rightIcons: ['chevron_right'],
  },
];

/**
 * This story demonstrates a dropdown component with a list of items using the new DropdownItem type.
 * Each item can have left and right icons, and a disabled state.
 * The component accepts items as an input property.
 */
export const Basic: Story = {
  args: {
    theme: 'transparent-white',
    items: dropdownItems,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width: 400px">
        <pe-dropdown 
          [theme]="theme" 
          [items]="items"
          [menuTriggerIcons]="menuTriggerIcons"
          [disabled]="disabled">
        </pe-dropdown>
      </div>
    `,
  }),
};

/**
 * This story demonstrates overriding only the left icons in the menu trigger.
 */
export const WithLeftMenuTriggerIcons: Story = {
  args: {
    theme: 'ghost-white',
    items: dropdownItems,
    menuTriggerIcons: {
      leftIcons: ['filter'],
      rightIcons: [],
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width: 400px">
        <pe-dropdown 
          [theme]="theme" 
          [items]="items"
          [menuTriggerIcons]="menuTriggerIcons">
        </pe-dropdown>
      </div>
    `,
  }),
};

/**
 * This story demonstrates overriding only the right icons in the menu trigger.
 */
export const WithRightMenuTriggerIcons: Story = {
  args: {
    theme: 'transparent-white',
    items: dropdownItems,
    menuTriggerIcons: {
      leftIcons: [],
      rightIcons: ['plus'],
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width: 400px">
        <pe-dropdown 
          [theme]="theme" 
          [items]="items"
          [menuTriggerIcons]="menuTriggerIcons">
        </pe-dropdown>
      </div>
    `,
  }),
};

/**
 * This story demonstrates a common use case where triggerIconOnly is used
 * with "more_options" to create a simple menu button that doesn't show the selected item.
 * This is useful for action menus where the trigger should always look the same.
 */
export const WithTriggerIconOnly: Story = {
  args: {
    theme: 'transparent-white',
    items: [
      {
        label: 'Edit',
        value: 'edit',
        leftIcons: ['edit'],
      },
      {
        label: 'Delete',
        value: 'delete',
        leftIcons: ['trash'],
      },
      {
        label: 'Share',
        value: 'share',
        leftIcons: ['share'],
      },
      {
        label: 'Settings',
        value: 'settings',
        leftIcons: ['settings'],
      },
    ],
    triggerIconOnly: 'more_options',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width: 400px">
        <pe-dropdown 
          [theme]="theme" 
          [items]="items"
          [triggerIconOnly]="triggerIconOnly">
        </pe-dropdown>
      </div>
    `,
  }),
};
