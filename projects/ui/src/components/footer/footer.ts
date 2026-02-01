import { Component, input } from '@angular/core';
import { ButtonComponent } from '../button/button';
import { IconComponent, IconName } from '../icon/icon';

@Component({
  selector: 'pe-footer',
  templateUrl: 'footer.html',
  styleUrls: ['./footer.scss'],
  imports: [ButtonComponent, IconComponent],
  standalone: true,
})
export class FooterComponent {
  copyrightText = input('');
  socialLinks = input<{ url: string; icon: IconName }[]>([]);
  links = input<{ url: string; text: string }[]>([]);
}
