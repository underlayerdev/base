import { addons } from 'storybook/manager-api';
import { libTheme } from './theme';

addons.setConfig({
  theme: libTheme,
});
