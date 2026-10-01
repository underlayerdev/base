import { moduleMetadata } from '@storybook/angular';

import { Meta, StoryObj } from '../../../.storybook/types';

import { AccordionComponent, AccordionItemComponent } from './accordion';

const meta: Meta<AccordionComponent> = {
  title: 'Components/Data Display/Accordion',
  component: AccordionComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Vertical list of expandable panels. Use `ul-accordion-item` children with projected icon, label, status, and content. `multi` allows multiple panels open; `showDivider` adds separators between items.',
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [AccordionItemComponent],
    }),
  ],
  argTypes: {
    multi: {
      control: 'boolean',
      defaultValue: false,
    },
    showDivider: {
      control: 'boolean',
      defaultValue: false,
    },
  },
  args: {
    multi: false,
    showDivider: false,
  },
};

export default meta;

type Story = StoryObj<AccordionComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ul-accordion [multi]="multi" [showDivider]="showDivider">
        <ul-accordion-item>
          <ng-container ul-accordion-icon>
            <i class="ul-icon ul-icon-games"></i>
          </ng-container>
          <ng-container ul-accordion-label>Accordion Item 1</ng-container>
          <ng-container ul-accordion-status>
            <i class="ul-icon ul-icon-hourglass"></i>
            <i class="ul-icon ul-icon-history"></i>
          </ng-container>
          <ng-container ul-accordion-content>
            <p>Accordion Item 1 Content</p>
          </ng-container>
        </ul-accordion-item>
        <ul-accordion-item>
          <ng-container ul-accordion-icon>
            <i class="ul-icon ul-icon-store"></i>
          </ng-container>
          <ng-container ul-accordion-label>Accordion Item 2</ng-container>
          <ng-container ul-accordion-content>
            <p>Accordion Item 2 Content</p>
          </ng-container>
        </ul-accordion-item>
        <ul-accordion-item [disabled]="true">
          <ng-container ul-accordion-label>Disabled Item</ng-container>
          <ng-container ul-accordion-content>
            <p>This accordion item is disabled.</p>
          </ng-container>
        </ul-accordion-item>
      </ul-accordion>
    `,
  }),
};

export const MultiExpand: Story = {
  args: {
    multi: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <ul-accordion [multi]="multi" [showDivider]="showDivider">
        <ul-accordion-item>
          <ng-container ul-accordion-label>First Item</ng-container>
          <ng-container ul-accordion-content>
            <p>You can expand multiple items at once in multi mode.</p>
          </ng-container>
        </ul-accordion-item>
        <ul-accordion-item>
          <ng-container ul-accordion-label>Second Item</ng-container>
          <ng-container ul-accordion-content>
            <p>This item can be expanded alongside the first one.</p>
          </ng-container>
        </ul-accordion-item>
        <ul-accordion-item>
          <ng-container ul-accordion-label>Third Item</ng-container>
          <ng-container ul-accordion-content>
            <p>All items can be expanded simultaneously.</p>
          </ng-container>
        </ul-accordion-item>
      </ul-accordion>
    `,
  }),
};
