import { Meta, StoryObj } from '../../../.storybook/types';

import { SearchInputComponent, type SearchSuggestion } from './search-input';

const recentSearches: SearchSuggestion[] = [
  { value: 'porsche-911', label: 'Porsche 911', icon: 'clock' },
  { value: 'bmw-m3', label: 'BMW M3', icon: 'clock' },
  { value: 'audi-rs6', label: 'Audi RS6', icon: 'clock' },
];

const liveResults: SearchSuggestion[] = [
  { value: 'porsche-911-turbo', label: 'Porsche 911 Turbo' },
  { value: 'porsche-911-gt3', label: 'Porsche 911 GT3' },
  { value: 'porsche-cayman', label: 'Porsche Cayman' },
];

const meta: Meta<SearchInputComponent> = {
  title: 'Components/Form Elements/SearchInput',
  component: SearchInputComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '`suggestions` (e.g. recent searches) show while the query is empty, and are replaced by `results` (e.g. live search results) as soon as the user types — the consumer supplies both lists, this component only decides which to render. On desktop the panel is an anchored dropdown; below the phone breakpoint, tapping the field opens a full-screen search takeover instead (the X/Twitter, Google pattern) — a back button and the real field pinned to the top, results filling the rest of the screen. Implements `FormValueControl<string>` for Signal Forms. Use `[(value)]` for two-way binding.',
      },
    },
    layout: 'centered',
  },
  decorators: [
    (story) => ({
      ...story(),
      template: `<div style="min-height: 400px; min-width: 400px;">${story().template}</div>`,
    }),
  ],
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg', 'xl'],
      control: { type: 'radio' },
    },
    error: { control: { type: 'boolean' } },
    disabled: { control: { type: 'boolean' } },
    label: { control: { type: 'text' } },
    helperText: { control: { type: 'text' } },
    errorText: { control: { type: 'text' } },
    placeholder: { control: { type: 'text' } },
    suggestionsLabel: { control: { type: 'text' } },
  },
  args: {
    size: 'md',
    error: false,
    disabled: false,
    label: 'Search',
    helperText: 'Type anything — recent searches are replaced by (mock) live results.',
    errorText: 'Something went wrong',
    placeholder: 'Search listings...',
    suggestionsLabel: 'Recent searches',
    suggestions: recentSearches,
    results: liveResults,
    value: '',
  },
};

export default meta;
type Story = StoryObj<SearchInputComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ul-search-input
        [size]="size"
        [label]="label"
        [helperText]="helperText"
        [placeholder]="placeholder"
        [suggestions]="suggestions"
        [suggestionsLabel]="suggestionsLabel"
        [results]="results"
        [(value)]="value"
      />
    `,
  }),
};

export const CustomResults: Story = {
  args: {
    helperText: 'Type to swap the plain-text rows for a projected results template.',
  },
  render: (args) => ({
    props: args,
    template: `
      <ul-search-input
        [size]="size"
        [label]="label"
        [helperText]="helperText"
        [placeholder]="placeholder"
        [suggestions]="suggestions"
        [suggestionsLabel]="suggestionsLabel"
        [resultsTemplate]="customResults"
        [(value)]="value"
      />
      <ng-template #customResults>
        <div style="display: flex; flex-direction: column; gap: 8px; padding: 8px;">
          @for (car of ['Porsche 911 Turbo', 'Porsche 911 GT3', 'Porsche Cayman']; track car) {
            <div
              style="display: flex; align-items: center; gap: 8px; padding: 8px; border-radius: 8px; background: rgba(255, 255, 255, 0.05);"
            >
              <div style="width: 40px; height: 40px; border-radius: 6px; background: #333;"></div>
              <div class="ul-typography-body-m-regular">{{ car }}</div>
            </div>
          }
        </div>
      </ng-template>
    `,
  }),
};

export const NoSuggestions: Story = {
  args: {
    suggestions: [],
    helperText: 'No recent searches yet',
  },
  render: (args) => ({
    props: args,
    template: `
      <ul-search-input
        [size]="size"
        [label]="label"
        [helperText]="helperText"
        [placeholder]="placeholder"
        [suggestions]="suggestions"
        [results]="results"
        [(value)]="value"
      />
    `,
  }),
};

export const WithError: Story = {
  args: {
    error: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <ul-search-input
        [size]="size"
        [label]="label"
        [errorText]="errorText"
        [error]="error"
        [placeholder]="placeholder"
        [suggestions]="suggestions"
        [suggestionsLabel]="suggestionsLabel"
        [results]="results"
        [(value)]="value"
      />
    `,
  }),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <ul-search-input
        [size]="size"
        [label]="label"
        [placeholder]="placeholder"
        [disabled]="disabled"
        [suggestions]="suggestions"
        [(value)]="value"
      />
    `,
  }),
};

export const Responsive: Story = {
  args: {
    label: 'Search (responsive)',
    helperText: 'Tap the field on a phone-sized viewport — it opens as a full-screen takeover.',
  },
  parameters: {
    viewport: { defaultViewport: 'responsive' },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 100%; max-width: 480px; padding: 1rem;">
        <ul-search-input
          [size]="size"
          [label]="label"
          [helperText]="helperText"
          [placeholder]="placeholder"
          [suggestions]="suggestions"
          [suggestionsLabel]="suggestionsLabel"
          [results]="results"
          [(value)]="value"
        />
      </div>
    `,
  }),
};
