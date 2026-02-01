import { Directive } from '@angular/core';

/** Place on the element projected into [pe-navbar-logo] so the navbar can detect logo content. */
@Directive({
  selector: '[pe-navbar-logo]',
  standalone: true,
})
export class NavbarLogoSlotDirective {}

/** Place on the element projected into [pe-navbar-search] so the navbar can show the mobile search toggle. */
@Directive({
  selector: '[pe-navbar-search]',
  standalone: true,
})
export class NavbarSearchSlotDirective {}

/** Place on the element projected into [pe-navbar-avatar] so the navbar can detect avatar content. */
@Directive({
  selector: '[pe-navbar-avatar]',
  standalone: true,
})
export class NavbarAvatarSlotDirective {}
