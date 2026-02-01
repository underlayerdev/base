import { Meta, StoryObj } from '../../../.storybook/types';

import { TableComponent, type TableColumn } from './table';

const defaultColumns: TableColumn[] = [
  { id: 'name', label: 'Name', sortable: true },
  { id: 'email', label: 'Email', sortable: true },
  { id: 'role', label: 'Role', sortable: true },
];

const defaultData: Record<string, unknown>[] = [
  { name: 'Alice', email: 'alice@example.com', role: 'Admin' },
  { name: 'Bob', email: 'bob@example.com', role: 'Editor' },
  { name: 'Carol', email: 'carol@example.com', role: 'Viewer' },
  { name: 'Dave', email: 'dave@example.com', role: 'Editor' },
  { name: 'Eve', email: 'eve@example.com', role: 'Admin' },
];

const meta: Meta<TableComponent> = {
  title: 'Components/Data Display/Table',
  component: TableComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Table for tabular data with optional sort (per-column) and global filter. Responsive: horizontal scroll on mobile, full table on tablet/desktop. Uses semantic table markup and design tokens only.',
      },
    },
  },
  argTypes: {
    showGlobalFilter: { control: { type: 'boolean' } },
    filterPlaceholder: { control: { type: 'text' } },
    emptyMessage: { control: { type: 'text' } },
    loading: { control: { type: 'boolean' }, description: 'Show skeleton overlay instead of table content' },
  },
  args: {
    columns: defaultColumns,
    data: defaultData,
    showGlobalFilter: false,
    filterPlaceholder: 'Filter...',
    emptyMessage: 'No data',
    loading: false,
  },
};

export default meta;
type Story = StoryObj<TableComponent>;

export const Default: Story = {
  args: {
    columns: defaultColumns,
    data: defaultData,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 100%">
        <pe-table
          [columns]="columns"
          [data]="data"
          [filterPlaceholder]="filterPlaceholder"
          [showGlobalFilter]="showGlobalFilter"
          [emptyMessage]="emptyMessage"
          [loading]="loading"
        />
      </div>
    `,
  }),
};

export const WithSort: Story = {
  args: {
    columns: defaultColumns,
    data: defaultData,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 100%;">
        <pe-table
          [columns]="columns"
          [data]="data"
          [emptyMessage]="emptyMessage"
        />
      </div>
    `,
  }),
};

export const WithFilter: Story = {
  args: {
    columns: defaultColumns,
    data: defaultData,
    showGlobalFilter: true,
    filterPlaceholder: 'Search name, email, role...',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 100%;  ">
        <pe-table
          [columns]="columns"
          [data]="data"
          [showGlobalFilter]="showGlobalFilter"
          [filterPlaceholder]="filterPlaceholder"
          [emptyMessage]="emptyMessage"
        />
      </div>
    `,
  }),
};

export const WithSortAndFilter: Story = {
  args: {
    columns: defaultColumns,
    data: defaultData,
    showGlobalFilter: true,
    filterPlaceholder: 'Filter table...',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 100%">
        <pe-table
          [columns]="columns"
          [data]="data"
          [showGlobalFilter]="showGlobalFilter"
          [filterPlaceholder]="filterPlaceholder"
          [emptyMessage]="emptyMessage"
        />
      </div>
    `,
  }),
};

export const EmptyState: Story = {
  args: {
    columns: defaultColumns,
    data: [],
    emptyMessage: 'No users found.',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 100%">
        <pe-table
          [columns]="columns"
          [data]="data"
          [emptyMessage]="emptyMessage"
        />
      </div>
    `,
  }),
};

export const Responsive: Story = {
  args: {
    columns: defaultColumns,
    data: defaultData,
    showGlobalFilter: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Resize the viewport to see horizontal scroll on mobile and full table on tablet/desktop.',
      },
    },
    viewport: { defaultViewport: 'mobile1' },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 100%; padding: 1rem;">
        <pe-table
          [columns]="columns"
          [data]="data"
          [showGlobalFilter]="showGlobalFilter"
          [filterPlaceholder]="filterPlaceholder"
          [emptyMessage]="emptyMessage"
        />
      </div>
    `,
  }),
};

export const Loading: Story = {
  args: {
    columns: defaultColumns,
    data: defaultData,
    loading: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 100%">
        <pe-table
          [columns]="columns"
          [data]="data"
          [filterPlaceholder]="filterPlaceholder"
          [showGlobalFilter]="showGlobalFilter"
          [emptyMessage]="emptyMessage"
          [loading]="loading"
        />
      </div>
    `,
  }),
};
