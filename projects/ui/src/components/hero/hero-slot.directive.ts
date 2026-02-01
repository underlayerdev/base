import { Directive } from '@angular/core';

/** Place on the element projected into [pe-hero-badges] so the hero can detect custom badges content. */
@Directive({
  selector: '[pe-hero-badges]',
  standalone: true,
})
export class PeHeroBadgesSlotDirective {}

/** Place on the element projected into [pe-hero-title] so the hero can detect custom title content. */
@Directive({
  selector: '[pe-hero-title]',
  standalone: true,
})
export class PeHeroTitleSlotDirective {}

/** Place on the element projected into [pe-hero-subtitle] so the hero can detect custom subtitle content. */
@Directive({
  selector: '[pe-hero-subtitle]',
  standalone: true,
})
export class PeHeroSubtitleSlotDirective {}

/** Place on the element projected into [pe-hero-actions] so the hero can detect custom actions content. */
@Directive({
  selector: '[pe-hero-actions]',
  standalone: true,
})
export class PeHeroActionsSlotDirective {}

/** Place on the element projected into [pe-hero-content] for optional extra content (e.g. between subtitle and actions). */
@Directive({
  selector: '[pe-hero-content]',
  standalone: true,
})
export class PeHeroContentSlotDirective {}
