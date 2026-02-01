import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  computed,
  input,
  signal,
  ViewEncapsulation,
  output,
} from '@angular/core';

import { AvatarComponent } from '../avatar/avatar';
import { ButtonComponent } from '../button/button';
import { IconComponent } from '../icon/icon';
import {
  NavbarAvatarSlotDirective,
  NavbarLogoSlotDirective,
  NavbarSearchSlotDirective,
} from './navbar-slot.directive';

@Component({
  selector: 'pe-navbar',
  standalone: true,
  imports: [AvatarComponent, ButtonComponent, IconComponent],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class NavbarComponent {
  /** Default logo link href when logo slot is not projected. */
  logoHref = input<string>('/');

  /** Default logo image src when logo slot is not projected. */
  logoSrc = input<string | undefined>(undefined);

  /** Default logo image alt when logo slot is not projected. */
  logoAlt = input<string>('');

  /** Default avatar image src when avatar slot is not projected. */
  avatarSrc = input<string | undefined>(undefined);

  /** Default avatar initials when avatar slot is not projected and no image. */
  avatarInitials = input<string | undefined>(undefined);

  /** Default avatar image alt when avatar slot is not projected. */
  avatarAlt = input<string>('');
  
  /** For aria-expanded on the toggle button */
  sidebarOpen = input<boolean>(false);

  /** When true, show the sidebar toggle button even when a logo slot is projected. */
  showSidebarToggle = input<boolean>(false);

  /** Emitted when the user clicks the sidebar toggle. Parent should flip the open state. */
  sidebarToggle = output<void>();

  readonly logoSlot = contentChild(NavbarLogoSlotDirective);
  readonly searchSlot = contentChild(NavbarSearchSlotDirective);
  readonly avatarSlot = contentChild(NavbarAvatarSlotDirective);

  readonly hasLogoSlot = computed(() => !!this.logoSlot());
  readonly hasSearchSlot = computed(() => !!this.searchSlot());
  readonly hasAvatarSlot = computed(() => !!this.avatarSlot());

  readonly showToggle = computed(() => !this.hasLogoSlot() || this.showSidebarToggle());

  readonly searchExpanded = signal(false);

  toggleSearch(): void {
    this.searchExpanded.update((v) => !v);
  }

  toggleSidebar(): void {
    this.sidebarToggle.emit();
  }
}
