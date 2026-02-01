import { Meta, StoryObj } from '../../../.storybook/types';

const meta: Meta = {
  title: 'Foundations/Utilities',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Additional utility classes built on top of the design tokens: line clamp, size helpers, and transform/position helpers.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const LineClamp: Story = {
  render: () => ({
    template: `
      <div class="pe-p-4 pe-gap-6" style="display: flex; flex-direction: column; max-width: 600px;">
        <h2 class="pe-typography-headline-l-regular pe-mb-4">Line clamp</h2>
        <p class="pe-typography-body-m-regular pe-mb-4">
          Use <code>.pe-line-clamp-*</code> to truncate multi-line text with an ellipsis.
        </p>

        <div class="pe-gap-4" style="display: flex; flex-direction: column;">
          <div>
            <h3 class="pe-typography-body-l-regular pe-mb-2">Clamp to 1 line</h3>
            <p class="pe-typography-body-m-regular pe-line-clamp-1 pe-bg-grey-lvl-1 pe-p-3 pe-rounded-2">
              This is a long piece of text that will be truncated after a single line using the .pe-line-clamp-1 utility class.
            </p>
            <code>.pe-line-clamp-1</code>
          </div>

          <div>
            <h3 class="pe-typography-body-l-regular pe-mb-2">Clamp to 2 lines</h3>
            <p class="pe-typography-body-m-regular pe-line-clamp-2 pe-bg-grey-lvl-1 pe-p-3 pe-rounded-2">
              This is a long piece of text that will be truncated after two lines using the .pe-line-clamp-2 utility class. It is useful for cards and list items where you want consistent heights.
            </p>
            <code>.pe-line-clamp-2</code>
          </div>

          <div>
            <h3 class="pe-typography-body-l-regular pe-mb-2">Clamp to 3 lines</h3>
            <p class="pe-typography-body-m-regular pe-line-clamp-3 pe-bg-grey-lvl-1 pe-p-3 pe-rounded-2">
              This is a long piece of text that will be truncated after three lines using the .pe-line-clamp-3 utility class. Ideal for richer descriptions while still preserving layout stability across cards.
            </p>
            <code>.pe-line-clamp-3</code>
          </div>
        </div>
      </div>
    `,
  }),
};

export const SizeUtilities: Story = {
  render: () => ({
    template: `
      <div class="pe-p-4 pe-gap-6" style="display: flex; flex-direction: column;">
        <h2 class="pe-typography-headline-l-regular pe-mb-4">Width & height utilities</h2>
        <p class="pe-typography-body-m-regular pe-mb-4">
          Use <code>.pe-w-*</code> and <code>.pe-h-*</code> to size elements using the spacing scale.
        </p>

        <div class="pe-gap-4" style="display: flex; flex-wrap: wrap; align-items: flex-end;">
          <div class="pe-p-4 pe-bg-grey-lvl-1 pe-rounded-2">
            <div class="pe-bg-purple pe-w-16 pe-h-8 pe-rounded-2"></div>
            <p class="pe-typography-body-m-regular pe-mt-2">.pe-w-16 .pe-h-8</p>
          </div>

          <div class="pe-p-4 pe-bg-grey-lvl-1 pe-rounded-2">
            <div class="pe-bg-purple pe-w-24 pe-h-12 pe-rounded-2"></div>
            <p class="pe-typography-body-m-regular pe-mt-2">.pe-w-24 .pe-h-12</p>
          </div>

          <div class="pe-p-4 pe-bg-grey-lvl-1 pe-rounded-2">
            <div class="pe-bg-purple pe-w-32 pe-h-16 pe-rounded-2"></div>
            <p class="pe-typography-body-m-regular pe-mt-2">.pe-w-32 .pe-h-16</p>
          </div>
        </div>
      </div>
    `,
  }),
};

export const TransformAndPosition: Story = {
  render: () => ({
    template: `
      <div class="pe-p-4 pe-gap-6" style="display: flex; flex-direction: column; max-width: 640px;">
        <h2 class="pe-typography-headline-l-regular pe-mb-4">Transform & position helpers</h2>
        <p class="pe-typography-body-m-regular pe-mb-4">
          Translate and offset elements using the spacing scale with <code>.pe-translate-x-*</code>, <code>.pe-translate-y-*</code>,
          and positional utilities like <code>.pe-top-*</code>.
        </p>

        <div class="pe-bg-grey-lvl-1 pe-rounded-2 pe-p-6" style="position: relative; height: 160px; overflow: hidden;">
          <div
            class="pe-bg-purple pe-w-16 pe-h-8 pe-rounded-2 pe-translate-x-8"
            style="transform: translateY(0);"
          ></div>

          <div
            class="pe-bg-purple pe-w-16 pe-h-8 pe-rounded-2 pe-translate-y-8"
            style="transform: translateX(0); margin-top: 24px;"
          ></div>

          <div
            class="pe-bg-purple pe-w-16 pe-h-8 pe-rounded-2 pe-top-8"
            style="position: absolute; right: 16px;"
          ></div>
        </div>

        <div class="pe-gap-2" style="display: flex; flex-direction: column;">
          <code>.pe-translate-x-8</code>
          <code>.pe-translate-y-8</code>
          <code>.pe-top-8</code>
        </div>
      </div>
    `,
  }),
};

