import { Meta, StoryObj } from '../../../.storybook/types';

import { AreaCodeComponent } from './area-code';

const meta: Meta<AreaCodeComponent> = {
  title: 'Components/Data Display/AreaCode',
  component: AreaCodeComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Code block display with optional line numbers and max height. Pass `content` (code string); supports `showLineNumbers` and `maxHeight` for scrollable blocks. Use for documentation or code snippets.',
      },
    },
  },
  argTypes: {
    content: {
      control: { type: 'text' },
    },
    showLineNumbers: {
      control: { type: 'boolean' },
    },
    maxHeight: {
      control: { type: 'text' },
    },
  },
  args: {
    content: `function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

const message = greet('World');
console.log(message);`,
    showLineNumbers: true,
    maxHeight: null,
  },
};

export default meta;
type Story = StoryObj<AreaCodeComponent>;

/**
 * Default area code story that demonstrates the basic code display component.
 * Shows TypeScript code with line numbers.
 */
export const Default: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <pe-area-code
        [content]="content"
        [showLineNumbers]="showLineNumbers"
        [maxHeight]="maxHeight"
      />
    `,
  }),
};

/**
 * Demonstrates JSON data formatting.
 */
export const JSONCode: Story = {
  args: {
    content: `{
  "name": "area-code-component",
  "version": "1.0.0",
  "description": "A reusable code display component",
  "author": "UDS Team",
  "dependencies": {
    "@angular/core": "^17.0.0",
    "@angular/common": "^17.0.0"
  },
  "features": [
    "Automatic line numbering",
    "Clean layout",
    "Responsive design"
  ]
}`,
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-area-code
        [content]="content"
        [showLineNumbers]="showLineNumbers"
      />
    `,
  }),
};

/**
 * Shows area code without line numbers.
 */
export const WithoutLineNumbers: Story = {
  args: {
    showLineNumbers: false,
    content: `const greeting = 'Hello, World!';
console.log(greeting);`,
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-area-code
        [content]="content"
        [showLineNumbers]="showLineNumbers"
      />
    `,
  }),
};

/**
 * Shows area code with limited height and scrolling.
 */
export const WithMaxHeight: Story = {
  args: {
    maxHeight: '200px',
    content: `// This is a longer code example to demonstrate scrolling
function fibonacci(n: number): number {
  if (n <= 1) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}

function optimizedFibonacci(n: number): number {
  const memo: { [key: number]: number } = {};
  
  function fib(num: number): number {
    if (num <= 1) {
      return num;
    }
    
    if (memo[num] !== undefined) {
      return memo[num];
    }
    
    memo[num] = fib(num - 1) + fib(num - 2);
    return memo[num];
  }
  
  return fib(n);
}

// Usage examples
console.log('Fibonacci sequence:');
for (let i = 0; i <= 10; i++) {
  console.log(\`F(\${i}) = \${optimizedFibonacci(i)}\`);
}

// Performance comparison
const start = performance.now();
const result = optimizedFibonacci(40);
const end = performance.now();
console.log(\`Result: \${result}, Time: \${end - start}ms\`);`,
  },
  render: (args) => ({
    props: args,
    template: `
      <pe-area-code
        [content]="content"
        [showLineNumbers]="showLineNumbers"
        [maxHeight]="maxHeight"
      />
    `,
  }),
};
