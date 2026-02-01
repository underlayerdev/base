import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { IconComponent, IconName } from '../icon/icon';
import { RadialComponent } from '../radial/radial';

export type Status = 'confirm' | 'alert' | 'error' | 'pending' | 'info';

@Component({
  selector: 'pe-status',
  standalone: true,
  imports: [IconComponent, RadialComponent],
  templateUrl: './status.html',
  styleUrl: './status.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusComponent {
  status = input<Status>('info');
  customIcon = input<IconName>();
  loadingAnimation = input<boolean>(false);

  get icon(): IconName {
    const customIcon = this.customIcon();
    if (customIcon) {
      return customIcon;
    }

    const statusIcons: Record<Status, IconName> = {
      confirm: 'check',
      alert: 'alert',
      error: 'cross',
      pending: 'hourglass',
      info: 'info',
    };

    return statusIcons[this.status()] || 'info';
  }

  computedClasses = computed(() => ({
    'pe-status': true,
    'pe-status--confirm': this.status() === 'confirm',
    'pe-status--alert': this.status() === 'alert',
    'pe-status--error': this.status() === 'error',
    'pe-status--pending': this.status() === 'pending',
    'pe-status--info': this.status() === 'info',
  }));
}
