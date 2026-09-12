import { moduleMetadata } from '@storybook/angular';
import { Meta, StoryObj } from '../../../.storybook/types';

import { ButtonComponent } from '../button/button';
import { ModalComponent, ModalVariant } from './modal';

const meta: Meta<ModalComponent> = {
  title: 'Components/Feedback/Modal',
  component: ModalComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Dialog overlay with optional title, close button, and backdrop. Variants: default, success, error, custom, bottom-sheet, confirmation. Use [(open)] for two-way binding. Content is projected; optional confirm/cancel labels for confirmation variant. Can close on backdrop click. `fullScreenInMobile` composes with any variant to make it fill the entire viewport edge-to-edge below the phone breakpoint instead of the default bottom-pinned sheet.',
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [ButtonComponent],
    }),
  ],
  argTypes: {
    variant: {
      options: ['default', 'success', 'error', 'custom', 'bottom-sheet', 'confirmation'],
      control: { type: 'select' },
    },
    open: {
      control: { type: 'boolean' },
    },
    title: {
      control: { type: 'text' },
    },
    closeOnBackdropClick: {
      control: { type: 'boolean' },
    },
    showCloseButton: {
      control: { type: 'boolean' },
    },
    confirmLabel: {
      control: { type: 'text' },
    },
    cancelLabel: {
      control: { type: 'text' },
    },
    fullScreenInMobile: {
      control: { type: 'boolean' },
    },
  },
  args: {
    variant: 'default',
    open: false,
    title: 'Modal title',
    closeOnBackdropClick: true,
    showCloseButton: true,
    confirmLabel: 'Confirm',
    cancelLabel: 'Cancel',
    fullScreenInMobile: false,
  },
};

export default meta;

type Story = StoryObj<ModalComponent>;

export const Default: Story = {
  args: {
    variant: 'default',
    open: false,
    title: 'Default modal',
  },
  render: (args) => ({
    props: {
      ...args,
      isOpen: args.open,
    },
    template: `
    <div style="width: 512px; height: 512px;">
      <ul-button theme="transparent-white" type="button" (click)="isOpen = true">Open modal</ul-button>
      <ul-modal
        [(open)]="isOpen"
        [variant]="variant"
        [title]="title"
        [closeOnBackdropClick]="closeOnBackdropClick"
        [showCloseButton]="showCloseButton"
        (closed)="isOpen = false">
        <p>This is the default modal variant. Use it for generic dialogs and confirmations.</p>
      </ul-modal>
    </div>
    `,
  }),
};

export const Success: Story = {
  args: {
    variant: 'success',
    open: false,
    title: 'Success',
  },
  render: (args) => ({
    props: {
      ...args,
      isOpen: args.open,
    },
    template: `
    <div style="width: 512px; height: 512px;">
      <ul-button theme="transparent-white"   (click)="isOpen = true">Show success</ul-button>
      <ul-modal
        [(open)]="isOpen"
        [variant]="variant"
        [title]="title"
        [closeOnBackdropClick]="closeOnBackdropClick"
        [showCloseButton]="showCloseButton"
        (closed)="isOpen = false">
        <p>Your changes have been saved successfully.</p>
      </ul-modal>
    </div>
    `,
  }),
};

export const Error: Story = {
  args: {
    variant: 'error',
    open: false,
    title: 'Error',
  },
  render: (args) => ({
    props: {
      ...args,
      isOpen: args.open,
    },
    template: `
    <div style="width: 512px; height: 512px;">
      <ul-button theme="transparent-white" (click)="isOpen = true">Show error</ul-button>
      <ul-modal
        [(open)]="isOpen"
        [variant]="variant"
        [title]="title"
        [closeOnBackdropClick]="closeOnBackdropClick"
        [showCloseButton]="showCloseButton"
        (closed)="isOpen = false">
        <p>Something went wrong. Please try again later.</p>
      </ul-modal>
    </div>
    `,
  }),
};

export const Custom: Story = {
  args: {
    variant: 'custom',
    open: false,
    title: 'Custom content',
  },
  render: (args) => ({
    props: {
      ...args,
      isOpen: args.open,
    },
    template: `
    <div style="width: 512px; height: 512px;">
      <ul-button theme="transparent-white" (click)="isOpen = true">Open custom modal</ul-button>
      <ul-modal
        [(open)]="isOpen"
        [variant]="variant"
        [title]="title"
        [closeOnBackdropClick]="closeOnBackdropClick"
        [showCloseButton]="showCloseButton"
        (closed)="isOpen = false">
        <p>Custom variant with no extra styling. Add your own content and optional <code>customClass</code> for overrides.</p>
      </ul-modal>
    </div>
    `,
  }),
};

export const BottomSheet: Story = {
  args: {
    variant: 'bottom-sheet',
    open: false,
    title: 'Bottom sheet',
  },
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
  render: (args) => ({
    props: {
      ...args,
      isOpen: args.open,
    },
    template: `
    <div style="width: 512px; height: 512px;">
      <ul-button theme="transparent-white" (click)="isOpen = true">Open bottom sheet</ul-button>
      <ul-modal
        [(open)]="isOpen"
        [variant]="variant"
        [title]="title"
        [closeOnBackdropClick]="closeOnBackdropClick"
        [showCloseButton]="showCloseButton"
        (closed)="isOpen = false">
        <p>On viewports below the <code>sm</code> breakpoint, this variant appears as a bottom sheet (anchored to the bottom, rounded top corners).</p>
      </ul-modal>
    </div>
    `,
  }),
};

export const FullScreenInMobile: Story = {
  args: {
    variant: 'default',
    open: false,
    title: 'Full-screen on mobile',
    fullScreenInMobile: true,
  },
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
  render: (args) => ({
    props: {
      ...args,
      isOpen: args.open,
    },
    template: `
    <div style="width: 512px; height: 512px;">
      <ul-button theme="transparent-white" (click)="isOpen = true">Open full-screen modal</ul-button>
      <ul-modal
        [(open)]="isOpen"
        [variant]="variant"
        [title]="title"
        [closeOnBackdropClick]="closeOnBackdropClick"
        [showCloseButton]="showCloseButton"
        [fullScreenInMobile]="fullScreenInMobile"
        (closed)="isOpen = false">
        <p>Below the phone breakpoint, this fills the entire viewport edge-to-edge — no margin, no rounded corners, no visible backdrop — instead of the default bottom-pinned sheet. Composes with any variant.</p>
      </ul-modal>
    </div>
    `,
  }),
};

export const Confirmation: Story = {
  args: {
    variant: 'confirmation',
    open: false,
    title: 'Confirm action',
    confirmLabel: 'Confirm',
    cancelLabel: 'Cancel',
  },
  render: (args) => ({
    props: {
      ...args,
      isOpen: args.open,
    },
    template: `
    <div style="width: 512px; height: 512px;">
      <ul-button #trigger theme="transparent-white" (click)="isOpen = true">Open confirmation</ul-button>
      <ul-modal
        [(open)]="isOpen"
        [variant]="variant"
        [title]="title"
        [confirmLabel]="confirmLabel"
        [cancelLabel]="cancelLabel"
        [closeOnBackdropClick]="closeOnBackdropClick"
        [showCloseButton]="showCloseButton"
        (confirmed)="isOpen = false; trigger.focus()"
        (cancelled)="isOpen = false; trigger.focus()">
        <p>Use the confirmation variant when you need the user to explicitly confirm or cancel an important action.</p>
      </ul-modal>
    </div>
    `,
  }),
};

export const SuccessConfirmation: Story = {
  args: {
    variant: 'confirmation',
    open: false,
    title: 'Changes saved',
    confirmLabel: 'Got it',
    cancelLabel: 'Undo',
  },
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
  render: (args) => ({
    props: {
      ...args,
      isOpen: args.open,
    },
    template: `
    <div style="width: 512px; height: 512px;">
      <ul-button theme="transparent-white" (click)="isOpen = true">Show success confirmation</ul-button>
      <ul-modal
        [(open)]="isOpen"
        [variant]="variant"
        [title]="title"
        [confirmLabel]="confirmLabel"
        [cancelLabel]="cancelLabel"
        [closeOnBackdropClick]="closeOnBackdropClick"
        [showCloseButton]="showCloseButton"
        (confirmed)="isOpen = false"
        (cancelled)="isOpen = false">
        <p>Your changes have been saved successfully. You can undo if this was a mistake.</p>
      </ul-modal>
    </div>
    `,
  }),
};

export const ErrorConfirmation: Story = {
  args: {
    variant: 'confirmation',
    open: false,
    title: 'Something went wrong',
    confirmLabel: 'Retry',
    cancelLabel: 'Cancel',
  },
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
  render: (args) => ({
    props: {
      ...args,
      isOpen: args.open,
    },
    template: `
    <div style="width: 512px; height: 512px;">
      <ul-button theme="transparent-white" (click)="isOpen = true">Show error confirmation</ul-button>
      <ul-modal
        [(open)]="isOpen"
        [variant]="variant"
        [title]="title"
        [confirmLabel]="confirmLabel"
        [cancelLabel]="cancelLabel"
        [closeOnBackdropClick]="closeOnBackdropClick"
        [showCloseButton]="showCloseButton"
        (confirmed)="isOpen = false"
        (cancelled)="isOpen = false">
        <p>We couldn&apos;t complete your request. You can try again or cancel and come back later.</p>
      </ul-modal>
    </div>
    `,
  }),
};

export const WithFooter: Story = {
  args: {
    variant: 'default',
    open: false,
    title: 'Confirm action',
  },
  render: (args) => ({
    props: {
      ...args,
      isOpen: args.open,
    },
    template: `
    <div style="width: 512px; height: 512px;">
      <ul-button theme="transparent-white" (click)="isOpen = true">Open modal with footer</ul-button>
      <ul-modal
        [(open)]="isOpen"
        [variant]="variant"
        [title]="title"
        [closeOnBackdropClick]="closeOnBackdropClick"
        [showCloseButton]="showCloseButton"
        (closed)="isOpen = false">
        <p>Do you want to proceed with this action?</p>
        <ng-container ul-modal-footer>
          <ul-button theme="ghost-white" (buttonClick)="isOpen = false">Cancel</ul-button>
          <ul-button theme="fill-purple" (buttonClick)="isOpen = false">Confirm</ul-button>
        </ng-container>
      </ul-modal>
    </div>
    `,
  }),
};
