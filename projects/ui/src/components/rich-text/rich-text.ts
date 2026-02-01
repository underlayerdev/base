import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  SecurityContext,
  ViewEncapsulation,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

export type RichTextTone = 'default' | 'muted' | 'inverse';
export type RichTextSize = 'body-m' | 'body-l';

/**
 * Display-only rich text component. Renders sanitized HTML from the API (or from
 * pe-rich-text-editor) with no Quill dependency. HTML is sanitized before rendering.
 *
 * Use [content] for HTML strings (e.g. from API or editor), or project markup via
 * ng-content when content is empty.
 */
@Component({
  selector: 'pe-rich-text',
  template: `
    @if (content()) {
      <div
        class="pe-rich-text"
        [class.pe-rich-text--body-m]="size() === 'body-m'"
        [innerHTML]="sanitizedContent()"
      ></div>
    } @else {
      <div
        class="pe-rich-text"
        [class.pe-rich-text--body-m]="size() === 'body-m'"
      >
        <ng-content />
      </div>
    }`,
  host: {
    class: 'pe-rich-text-host',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RichTextComponent {
  readonly content = input<string | null>(null);
  readonly size = input<RichTextSize>('body-l');

  private readonly domSanitizer = inject(DomSanitizer);

  protected readonly sanitizedContent = computed(() => {
    const html = this.content() ?? '';
    return this.domSanitizer.sanitize(SecurityContext.HTML, html) ?? '';
  });
}
