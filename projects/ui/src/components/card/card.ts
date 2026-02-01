import { booleanAttribute, ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';

import { SkeletonComponent } from '../skeleton/skeleton';

// Card types
export type CardDirection = 'horizontal' | 'vertical';
export type CardCaptionSize = 'default' | 'sm';
export type ActionsDistribution = 'default' | 'equal';
export type MediaAspectRatio = 'default' | 'square' | 'portrait';

@Component({
  selector: 'pe-card',
  standalone: true,
  imports: [SkeletonComponent],
  templateUrl: './card.html',
  styleUrls: ['./card.scss'],
  host: {
    class: 'pe-card',
    '[attr.aria-disabled]': 'disabled() ? "true" : null',
    '[class.pe-card--focused]': 'focused()',
    '[class.pe-card--disabled]': 'disabled()',
    '[class.pe-card--horizontal]': 'cardDirection() === "horizontal"',
    '[class.pe-card--caption-sm]': 'cardCaptionSize() === "sm"',
    '[class.pe-card--footer-equal]': 'footerDist() === "equal"',
    '[class.pe-card--media-square]': 'mediaAspectRatio() === "square"',
    '[class.pe-card--media-portrait]': 'mediaAspectRatio() === "portrait"',
    '[class.pe-card--media-grayscale]': 'mediaGrayscale()',
    '[class.pe-card--loading]': 'loading()',
    '[class.pe-card--media-blurred]': 'mediaBlur()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  // State inputs
  focused = input<boolean, boolean>(false, { transform: booleanAttribute });
  disabled = input<boolean, boolean>(false, { transform: booleanAttribute });

  // Layout inputs
  cardDirection = input<CardDirection>('vertical');
  cardCaptionSize = input<CardCaptionSize>('default');
  footerDist = input<ActionsDistribution>('default');

  // Media inputs
  mediaAspectRatio = input<MediaAspectRatio>('default');
  mediaBlur = input<boolean, boolean>(false, { transform: booleanAttribute });
  mediaGrayscale = input<boolean, boolean>(false, {
    transform: booleanAttribute,
  });

  // Content inputs
  cardCaption = input<string>('');
  cardTitle = input<string>('');
  cardTitleSingleLine = input<boolean, boolean>(false, {
    transform: booleanAttribute,
  });
  cardSubtitle = input<string>('');
  cardSubtitleSingleLine = input<boolean, boolean>(false, {
    transform: booleanAttribute,
  });

  // Loading state
  loading = input<boolean, boolean>(false, {
    transform: booleanAttribute,
  });
}
