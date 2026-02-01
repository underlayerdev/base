import { moduleMetadata } from '@storybook/angular';

import { Meta, StoryObj } from '../../../.storybook/types';
import { ButtonComponent } from '../../components/button/button';
import { SkeletonComponent } from '../../components/skeleton/skeleton';

import { ActionsDistribution, CardCaptionSize, CardComponent, CardDirection, MediaAspectRatio } from './card';

const meta: Meta<CardComponent> = {
  title: 'Components/Data Display/Card',
  component: CardComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Card container with optional media, caption, title, content, and footer. Supports horizontal/vertical direction, aspect ratios (default, square, portrait), footer distribution, and focused/disabled states. Content is projected via slots.',
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [ButtonComponent, SkeletonComponent],
    }),
    (story) => ({
      ...story(),
      template: `<div style="max-width: 300px; margin: 2rem auto;">${story().template}</div>`,
    }),
  ],
  argTypes: {
    // State controls
    focused: {
      control: 'boolean',
      description: 'Whether the card is focused',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the card is disabled',
    },
    // Layout controls
    cardDirection: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Card layout direction',
    },
    cardCaptionSize: {
      control: 'select',
      options: ['default', 'sm'],
      description: 'Size of the caption text',
    },
    footerDist: {
      control: 'select',
      options: ['default', 'equal'],
      description: 'Footer actions distribution',
    },
    // Media controls
    mediaAspectRatio: {
      control: 'select',
      options: ['default', 'square', 'portrait'],
      description: 'Media aspect ratio',
    },
    mediaBlur: {
      control: 'boolean',
      description: 'Whether to apply blur effect to media',
    },
    mediaGrayscale: {
      control: 'boolean',
      description: 'Whether to apply grayscale effect to media',
    },
    // Content controls
    cardCaption: {
      control: 'text',
      description: 'Card caption text',
    },
    cardTitle: {
      control: 'text',
      description: 'Card title text',
    },
    cardTitleSingleLine: {
      control: 'boolean',
      description: 'Whether to limit title to a single line',
    },
    cardSubtitle: {
      control: 'text',
      description: 'Card subtitle text',
    },
    cardSubtitleSingleLine: {
      control: 'boolean',
      description: 'Whether to limit subtitle to a single line',
    },
    loading: {
      control: 'boolean',
      description: 'Show skeleton overlay instead of card content while loading',
    },
  },
};

export default meta;
type Story = StoryObj<CardComponent>;

// Base args for all stories
const baseArgs = {
  cardDirection: 'vertical' as CardDirection,
  footerDist: 'default' as ActionsDistribution,
  focused: false,
  disabled: false,
  cardCaptionSize: 'default' as CardCaptionSize,
  mediaAspectRatio: 'square' as MediaAspectRatio,
  mediaBlur: false,
  mediaGrayscale: false,
  cardCaption: 'Caption',
  cardTitle: 'Title',
  cardTitleSingleLine: false,
  cardSubtitle: 'Subtitle',
  cardSubtitleSingleLine: false,
  loading: false,
};

// Base template for card stories - using any to bypass complex type conversion
const cardTemplate = (args: any) => ({
  props: args,
  template: `
    <pe-card
      [cardDirection]="cardDirection"
      [focused]="focused"
      [disabled]="disabled"
      [cardCaptionSize]="cardCaptionSize"
      [footerDist]="footerDist"
      [mediaAspectRatio]="mediaAspectRatio"
      [mediaBlur]="mediaBlur"
      [mediaGrayscale]="mediaGrayscale"
      [cardCaption]="cardCaption"
      [cardTitle]="cardTitle"
      [cardSubtitle]="cardSubtitle"
      [cardTitleSingleLine]="cardTitleSingleLine"
      [cardSubtitleSingleLine]="cardSubtitleSingleLine"
      [loading]="loading"
    >
      <img
        udsCardMedia
        src="https://picsum.photos/1080/720"
        alt="Sample image"
      />
      <div udsCardMediaAction>
        <pe-button [iconOnly]="true" theme="transparent-black">
          <i class="pe-icon pe-icon-heart"></i>
        </pe-button>
      </div>
      <ng-container udsCardFooter>
        <pe-button theme="fill-purple">Action</pe-button>
      </ng-container>
    </pe-card>
  `,
});

export const Default: Story = {
  args: baseArgs,
  render: cardTemplate,
};

export const Horizontal: Story = {
  args: {
    ...baseArgs,
    cardDirection: 'horizontal' as CardDirection,
  },
  render: cardTemplate,
};

export const EqualFooter: Story = {
  args: {
    ...baseArgs,
    footerDist: 'equal' as ActionsDistribution,
  },
  render: cardTemplate,
};

export const Focused: Story = {
  args: {
    ...baseArgs,
    focused: true,
  },
  render: cardTemplate,
};

export const Disabled: Story = {
  args: {
    ...baseArgs,
    disabled: true,
  },
  render: cardTemplate,
};

export const Loading: Story = {
  args: {
    ...baseArgs,
    loading: true,
  },
  render: cardTemplate,
};

export const MediaOverlay: Story = {
  args: {
    ...baseArgs,
    mediaBlur: true,
    mediaGrayscale: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-card
        [mediaAspectRatio]="'portrait'"
        [mediaBlur]="mediaBlur"
        [mediaGrayscale]="mediaGrayscale"
        [cardCaption]="cardCaption"
        [cardTitle]="cardTitle"
        [cardSubtitle]="cardSubtitle"
      >
        <img
          udsCardMedia
          src="https://picsum.photos/1080/720"
          alt="Sample image"
        />
        <div udsCardMediaAction>
          <pe-button [iconOnly]="true" theme="transparent-black">
            <i class="pe-icon pe-icon-heart"></i>
          </pe-button>
        </div>
        <div udsCardMediaOverlay class="pe-gap-2">
          <div class="pe-icon pe-icon-size-12 pe-icon-uninstall"></div>
          Game missing
        </div>
        <ng-container udsCardFooter>
          <pe-button theme="fill-purple">Action</pe-button>
        </ng-container>
      </pe-card>
    `,
  }),
};
