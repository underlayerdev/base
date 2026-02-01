import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
  ],
  framework: '@storybook/angular',
  staticDirs: ['../src/lib/fonts'],
  webpackFinal: async (config, { configType }) => {
    // Resolve "Conflicting values for 'process.env.NODE_ENV'" by replacing only
    // DefinePlugins that set process.env, and keep others (e.g. STORYBOOK_ANGULAR_OPTIONS).
    const webpack = (await import('webpack')).default;
    const plugins = config.plugins ?? [];
    const filteredPlugins = plugins.filter((plugin) => {
      if (!plugin || typeof plugin !== 'object' || !('definitions' in plugin)) return true;
      const defs = (plugin as { definitions?: Record<string, unknown> }).definitions;
      if (!defs || typeof defs !== 'object') return true;
      const hasProcessEnv = Object.keys(defs).some(
        (k) => k === 'process.env' || k.startsWith('process.env.')
      );
      return !hasProcessEnv;
    });
    config.plugins = [
      ...filteredPlugins,
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(
          configType === 'DEVELOPMENT' ? 'development' : 'production'
        ),
        'process.env.NODE_PATH': JSON.stringify([]),
        'process.env.STORYBOOK': JSON.stringify('true'),
        'process.env.PUBLIC_PATH': JSON.stringify('.'),
      }),
    ];
    return config;
  },
};
export default config;