import { Meta, StoryObj } from '../../../.storybook/types';
import variables from '../../design-tokens/variables';

import { IconComponent } from './icon';

const meta: Meta<IconComponent> = {
  title: 'Components/Media/Icon',
  component: IconComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Icon from the design system icon set. Pass `icon` (glyph name), `size`, and optional `weight`. Uses design tokens for sizes and weights. Use for actions, status, or decorative icons.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: Object.keys(variables.iconography.font.size),
      description: 'Size of the icon',
    },
    weight: {
      control: 'select',
      options: Object.keys(variables.iconography.font.weight),
      description: 'Weight/thickness of the icon',
    },
    icon: {
      control: 'select',
      options: Object.keys(variables.content['icon-glyph']),
      description: 'Icon name/glyph to display',
    },
  },
};

export default meta;
type Story = StoryObj<IconComponent>;

export const Default: Story = {
  args: {
    size: '8',
    weight: 'medium',
    icon: 'ultra_games',
  },
};

export const AllIcons: Story = {
  render: () => {
    const icons = Object.keys(variables.content['icon-glyph']);

    return {
      props: {
        icons,
        copy: (name: string) => {
          if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(name);
          }
        },
      },
      template: `
        <div
          style="
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
            gap: 16px;
            padding: 16px;
          "
        >
          <div
            *ngFor="let icon of icons"
            style="
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 8px;
              padding: 12px;
              border-radius: 8px;
              background: rgba(255, 255, 255, 0.03);
            "
          >
            <pe-icon [icon]="icon" size="8"></pe-icon>
            <span style="font-size: 12px; text-align: center; word-break: break-all;" class="pe-text-tertiary">
              {{ icon }}
            </span>
            <button
              type="button"
              (click)="copy(icon)"
              style="
                margin-top: 4px;
                padding: 4px 8px;
                font-size: 12px;
                border-radius: 999px;
                border: 1px solid rgba(255, 255, 255, 0.2);
                background: transparent;
                color: inherit;
                cursor: pointer;
              "
            >
              Copy name
            </button>
          </div>
        </div>
      `,
    };
  },
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; min-height: 100vh; gap: 16px; align-items: center; flex-wrap: wrap;">
        ${Object.keys(variables.iconography.font.size)
          .map((size) => `<pe-icon [size]="'${size}'" [weight]="'medium'" [icon]="'ultra_games'"></pe-icon>`)
          .join('\n')}
      </div>
    `,
  }),
};

export const AllWeights: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; align-items: center;">
        ${Object.keys(variables.iconography.font.weight)
          .map((weight) => `<pe-icon [size]="'8'" [weight]="'${weight}'" [icon]="'ultra_games'"></pe-icon>`)
          .join('\n')}
      </div>
    `,
  }),
};
