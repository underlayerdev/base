import { Meta, StoryObj } from '../../../.storybook/types';

import { RichTextComponent, type RichTextSize } from './rich-text';

const sampleHtml = `
  <h2>Heading</h2>
  <p>This is a paragraph with <strong>bold</strong> and <em>italic</em> text. You can also add <a href="#">links</a>.</p>
  <ul>
    <li>First item</li>
    <li>Second item</li>
    <li>Third item</li>
  </ul>
  <p>Another paragraph with <code>inline code</code> for emphasis.</p>
  <blockquote>A blockquote for highlights or citations.</blockquote>
`;

const meta: Meta<RichTextComponent> = {
  title: 'Components/Content/Rich Text',
  component: RichTextComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Display-only rich text component. Renders HTML from the API or editor with consistent typography. HTML is sanitized before rendering (no Quill). Use [content] for HTML strings, or project markup via ng-content when content is empty.',
      },
    },
  },
  argTypes: {
    content: {
      control: { type: 'text' },
      description: 'HTML string to render. Sanitized before rendering.',
    },
    size: {
      options: ['body-m', 'body-l'] as RichTextSize[],
      control: { type: 'select' },
      description: 'Base body size for paragraphs and text.',
    },
  },
  args: {
    content: sampleHtml.trim(),
    size: 'body-l',
  },
};

export default meta;

type Story = StoryObj<RichTextComponent>;

export const Default: Story = {
  args: {
    content: sampleHtml.trim(),
    size: 'body-l',
  },
};

export const BodyM: Story = {
  args: {
    content: '<p>Smaller body size (body-m) for compact content.</p>',
    size: 'body-m',
  },
};

export const CompactExample: Story = {
  args: {
    content: '<h3>Short content</h3><p>Use <code>pe-rich-text</code> with <code>content</code> for HTML from CMS or editor, or project markup with <code>ng-content</code> when content is empty.</p>',
    size: 'body-m',
  },
};
