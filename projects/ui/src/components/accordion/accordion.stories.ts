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
          'Vertical list of expandable panels. Use `pe-accordion-item` children with projected icon, label, status, and content. `multi` allows multiple panels open; `showDivider` adds separators between items.',
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
      <pe-accordion [multi]="multi" [showDivider]="showDivider">
        <pe-accordion-item>
          <ng-container pe-accordion-icon>
            <i class="pe-icon pe-icon-ultra_games"></i>
          </ng-container>
          <ng-container pe-accordion-label>Accordion Item 1</ng-container>
          <ng-container pe-accordion-status>
            <i class="pe-icon pe-icon-hourglass"></i>
            <i class="pe-icon pe-icon-history"></i>
          </ng-container>
          <ng-container pe-accordion-content>
            <p>Accordion Item 1 Content</p>
          </ng-container>
        </pe-accordion-item>
        <pe-accordion-item>
          <ng-container pe-accordion-icon>
            <i class="pe-icon pe-icon-ultra_marketplace"></i>
          </ng-container>
          <ng-container pe-accordion-label>Accordion Item 2</ng-container>
          <ng-container pe-accordion-content>
            <p>Accordion Item 2 Content</p>
          </ng-container>
        </pe-accordion-item>
        <pe-accordion-item [disabled]="true">
          <ng-container pe-accordion-label>Disabled Item</ng-container>
          <ng-container pe-accordion-content>
            <p>This accordion item is disabled.</p>
          </ng-container>
        </pe-accordion-item>
      </pe-accordion>
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
      <pe-accordion [multi]="multi" [showDivider]="showDivider">
        <pe-accordion-item>
          <ng-container pe-accordion-label>First Item</ng-container>
          <ng-container pe-accordion-content>
            <p>You can expand multiple items at once in multi mode.</p>
          </ng-container>
        </pe-accordion-item>
        <pe-accordion-item>
          <ng-container pe-accordion-label>Second Item</ng-container>
          <ng-container pe-accordion-content>
            <p>This item can be expanded alongside the first one.</p>
          </ng-container>
        </pe-accordion-item>
        <pe-accordion-item>
          <ng-container pe-accordion-label>Third Item</ng-container>
          <ng-container pe-accordion-content>
            <p>All items can be expanded simultaneously.</p>
          </ng-container>
        </pe-accordion-item>
      </pe-accordion>
    `,
  }),
};
