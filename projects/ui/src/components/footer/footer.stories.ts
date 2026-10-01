import { moduleMetadata, StoryFn } from '@storybook/angular';

import { FooterComponent } from './footer';

export default {
  title: 'Components/Layout/Footer',
  component: FooterComponent,
  parameters: {
    docs: {
      description: {
        component:
          'Page footer with copyright text, optional social links (with icons), and optional link list. Project copyright content via `[ul-copyright]`, and pass `socialLinks` (url + icon) and `links` (url + text).',
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
    <ul-footer [socialLinks]="socialLinks" [links]="links">
      <ng-container ul-copyright>
        &copy; {{ currentYear }} Underlayer. All rights reserved. All trademarks or product names are the property of their respective owners.
      </ng-container>
    </ul-footer>`,
  props: {
    currentYear: new Date().getFullYear(),
    socialLinks: [
      { url: 'https://www.facebook.com/example', icon: 'facebook' },
      { url: 'https://twitter.com/example', icon: 'twitter' },
      { url: 'https://discord.gg/kwm49BnAqN', icon: 'discord' },
      { url: 'https://t.me/example', icon: 'telegram' },
    ],
    links: [{ url: 'https://example.com/legal', text: 'Legal' }],
  },
});
export const Overview: StoryFn<{
  currentYear: number;
  socialLinks: { url: string; icon: string }[];
  links: { url: string; text: string }[];
}> = OverviewTemplate.bind({});
