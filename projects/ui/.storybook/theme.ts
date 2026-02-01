import { create, type ThemeVars } from 'storybook/theming';

const libTheme: ThemeVars = create({
  base: 'dark',

  // Brand
  brandTitle: 'Base UI',
  brandUrl: '/',
  // Use the regular UI font for Storybook chrome (not the brand display font)
  fontBase: '"Ultra Nunito Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',

  // Lib backgrounds
  appBg: '#0a0a0a',
  appContentBg: '#0a0a0a',
  appPreviewBg: '#0a0a0a',
  appHoverBg: '#3b3b3b',
  appBorderColor: '#3b3b3b',
  appBorderRadius: 4,

  // Lib primary / bar
  colorPrimary: '#6f3de0',
  colorSecondary: '#6f3de0',
  barBg: '#232323',
  barTextColor: 'rgba(255, 255, 255, 0.7)',
  barHoverColor: '#6f3de0',
  barSelectedColor: '#6f3de0',

  // Text
  textColor: '#ffffff',
  textInverseColor: '#0a0a0a',
  textMutedColor: 'rgba(255, 255, 255, 0.7)',

  // Form
  buttonBg: '#232323',
  buttonBorder: '#3b3b3b',
  booleanBg: '#232323',
  booleanSelectedBg: '#6f3de0',
  inputBg: '#232323',
  inputBorder: '#3b3b3b',
  inputTextColor: '#ffffff',
  inputBorderRadius: 4,
  
});

export { libTheme };
