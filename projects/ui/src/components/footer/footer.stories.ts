import { moduleMetadata, StoryFn } from '@storybook/angular';

import { FooterComponent } from './footer';

export default {
  title: 'Components/Layout/Footer',
  component: FooterComponent,
  parameters: {
    docs: {
      description: {
        component:
          'Page footer with copyright text, optional social links (with icons), and optional link list. Pass `copyrightText`, `socialLinks` (url + icon), and `links` (url + text).',
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [FooterComponent],
    }),
    (story: any) => {
      const templateStory = story();
      return {
        ...templateStory,
        template: `<div>${templateStory.template}</div>`,
      };
    },
  ],
};

// ******************************** Overview *********************************

const OverviewTemplate = () => ({
  template: `
    <pe-footer
      copyrightText="&copy; {{ currentYear }} Player Eleven. All rights reserved. All trademarks or product names are the property of their respective owners."
      [socialLinks]="socialLinks"
      [links]="links"/>`,
  props: {
    currentYear: new Date().getFullYear(),
    socialLinks: [
      { url: 'https://www.facebook.com/ultra.platform', icon: 'facebook' },
      { url: 'https://twitter.com/ultra_io', icon: 'twitter' },
      { url: 'https://discord.gg/kwm49BnAqN', icon: 'discord' },
      { url: 'https://t.me/ultra_io', icon: 'telegram' },
    ],
    links: [{ url: 'https://settings.app.ultra.io/en/profile/legal', text: 'Legal' }],
  },
});
export const Overview: StoryFn<{
  currentYear: number;
  socialLinks: { url: string; icon: string }[];
  links: { url: string; text: string }[];
}> = OverviewTemplate.bind({});
