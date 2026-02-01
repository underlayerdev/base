import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import type { UiSize, UiTheme } from '../shared/ui-types';
import { ButtonComponent } from '../button/button';
import { IconComponent } from '../icon/icon';
import { PillComponent } from '../pill/pill';

import {
  PeHeroActionsSlotDirective,
  PeHeroBadgesSlotDirective,
  PeHeroContentSlotDirective,
  PeHeroSubtitleSlotDirective,
  PeHeroTitleSlotDirective,
} from './hero-slot.directive';

export interface HeroAction {
  label: string;
  href?: string;
  routerLink?: string | string[];
  icon?: string;
  theme?: UiTheme;
  size?: UiSize;
}

export type HeroAlignment = 'left' | 'center' | 'right';
export type HeroSize = 'sm' | 'md' | 'lg';

/**
 * Hero component for displaying prominent hero sections with title, description,
 * call-to-action buttons, optional badges, and background image support.
 * Fully responsive across mobile, tablet, and desktop.
 *
 * When slots are not projected, inputs are used (title, subtitle, badges, primaryAction, secondaryAction).
 * Content projection slots: pe-hero-badges, pe-hero-title, pe-hero-subtitle, pe-hero-actions, pe-hero-content.
 *
 * @example
 * ```html
 * <pe-hero
 *   title="Welcome"
 *   subtitle="Build amazing experiences"
 *   [primaryAction]="{ label: 'Get Started', href: '/signup' }"
 *   [badges]="['New', 'Featured']"
 * />
 * ```
 */
@Component({
  selector: 'pe-hero',
  standalone: true,
  imports: [ButtonComponent, IconComponent, PillComponent, RouterLink],
  templateUrl: './hero.html',
  styleUrls: ['./hero.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class HeroComponent {
  /** Main headline text */
  title = input.required<string>();

  /** Supporting description text */
  subtitle = input<string | undefined>(undefined);

  /** Primary call-to-action button */
  primaryAction = input<HeroAction | undefined>(undefined);

  /** Secondary call-to-action button */
  secondaryAction = input<HeroAction | undefined>(undefined);

  /** Badge/pill labels to display above the title */
  badges = input<string[]>([]);

  /** Background image URL */
  backgroundImage = input<string | undefined>(undefined);

  /**
   * CSS gradient or color for the overlay on top of the background image.
   * E.g. "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.7) 100%)" or "rgba(0,0,0,0.5)".
   * When unset, a default dark overlay is used when a background image is present.
   */
  backgroundOverlayGradient = input<string | undefined>(undefined);

  /**
   * CSS filter applied to the background image (e.g. "brightness(0.8)", "blur(2px)", "grayscale(0.3)").
   * Combine multiple: "brightness(0.7) contrast(1.1)".
   */
  backgroundFilter = input<string | undefined>(undefined);

  /** Text and content alignment */
  alignment = input<HeroAlignment>('center');

  /** Hero section size variant */
  size = input<HeroSize>('md');

  /** Whether hero takes full viewport height */
  fullHeight = input<boolean>(false);

  readonly badgesSlot = contentChild(PeHeroBadgesSlotDirective);
  readonly titleSlot = contentChild(PeHeroTitleSlotDirective);
  readonly subtitleSlot = contentChild(PeHeroSubtitleSlotDirective);
  readonly actionsSlot = contentChild(PeHeroActionsSlotDirective);
  readonly contentSlot = contentChild(PeHeroContentSlotDirective);

  readonly hasBadgesSlot = computed(() => !!this.badgesSlot());
  readonly hasTitleSlot = computed(() => !!this.titleSlot());
  readonly hasSubtitleSlot = computed(() => !!this.subtitleSlot());
  readonly hasActionsSlot = computed(() => !!this.actionsSlot());
  readonly hasContentSlot = computed(() => !!this.contentSlot());
}
