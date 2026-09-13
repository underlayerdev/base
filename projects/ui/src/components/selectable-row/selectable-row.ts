import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, computed, inject, input, output } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

import { CheckboxComponent } from '../checkbox/checkbox';
import { LongPressDirective } from '../long-press/long-press.directive';

/**
 * Makes any row of projected content (thumbnail/media + label content, plus
 * anything else — a status pill, actions) selectable in a bulk-select list,
 * without the consumer having to hand-roll device detection or gesture
 * wiring themselves:
 *
 * - Fine-pointer/real-hover devices (desktop): a checkbox is always present
 *   but invisible until the row is hovered, keyboard-focused, or already
 *   checked — Gmail-list style.
 * - Coarse-pointer/no-hover devices (touch): long-press a row to select it;
 *   every row then swaps its projected `[ul-selectable-row-media]` content
 *   for a large checkbox — there's rarely room for both a thumbnail and an
 *   easy-to-hit checkbox on a small card.
 *
 * This component only decides what to *show* and detects the long-press
 * gesture — it doesn't know about routing, so a consumer whose media/content
 * slots contain a routerLink-driven anchor still needs to null that binding
 * out itself while `selectionActive` (see ul-selectable-row's own usage in
 * undermarket's profile-listings for the pattern).
 *
 * @example
 * ```html
 * <ul-selectable-row
 *   [selected]="isSelected(item.id)"
 *   [selectionActive]="hasSelection()"
 *   [ariaLabel]="'Select ' + item.title"
 *   (selectedChange)="toggleSelect(item.id, $event)"
 *   (longPress)="onRowLongPress(item.id)"
 * >
 *   <img ul-selectable-row-media [src]="item.imageUrl" alt="" />
 *   <div ul-selectable-row-content>{{ item.title }}</div>
 *   <ul-pill>{{ item.status }}</ul-pill>
 * </ul-selectable-row>
 * ```
 */
@Component({
  selector: 'ul-selectable-row',
  imports: [CheckboxComponent],
  hostDirectives: [LongPressDirective],
  host: {
    '[class.ul-selectable-row]': 'selected()',
    '(click)': 'onHostClick($event)',
  },
  template: `
    @if (selectable() && isCompact() && selectionActive()) {
      <ul-checkbox
        size="lg"
        [checked]="selected()"
        [attr.aria-label]="ariaLabel()"
        (checkedChange)="selectedChange.emit($event)"
      />
    } @else {
      <ng-content select="[ul-selectable-row-media]" />
    }
    @if (selectable() && !isCompact()) {
      <ul-checkbox
        class="ul-selectable-row__hover-checkbox"
        [checked]="selected()"
        [attr.aria-label]="ariaLabel()"
        (checkedChange)="selectedChange.emit($event)"
      />
    }
    <ng-content select="[ul-selectable-row-content]" />
    <ng-content />
  `,
  styleUrls: ['./selectable-row.scss'],
})
export class SelectableRowComponent {
  /** Whether this row is currently selected. */
  selected = input<boolean>(false);
  /**
   * Whether the list is in selection mode (something, anywhere, is
   * selected) — drives the compact-mode media-for-checkbox swap.
   */
  selectionActive = input<boolean>(false);
  /**
   * Whether this row supports selection at all. False renders it as a plain
   * row — no checkbox (hover or compact), no long-press, no click-to-toggle
   * — for a list that doesn't offer bulk actions right now.
   */
  selectable = input<boolean>(true);
  /** Accessible label for this row's checkbox(es). */
  ariaLabel = input<string | null>(null);

  selectedChange = output<boolean>();
  longPress = output<void>();

  /**
   * Same distinction the hover-reveal CSS relies on — a width breakpoint
   * alone would misclassify a wide tablet in landscape, which has no real
   * hover, as "desktop".
   */
  private readonly hasFinePointer = toSignal(
    inject(BreakpointObserver)
      .observe('(hover: hover) and (pointer: fine)')
      .pipe(map((state) => state.matches)),
    { initialValue: true },
  );
  readonly isCompact = computed(() => !this.hasFinePointer());

  // Set for the click that immediately follows a successful long-press, so
  // that trailing click doesn't also toggle the row straight back off via
  // onHostClick below (see the same problem/fix in undermarket's
  // profile-listings for the version of this before it moved into here).
  private justLongPressed = false;

  constructor() {
    inject(LongPressDirective).ulLongPress.subscribe(() => {
      if (!this.selectable()) return;
      this.justLongPressed = true;
      this.longPress.emit();
    });
  }

  /**
   * While selecting, a tap anywhere in the row toggles it — not just on the
   * checkbox. This applies on every device, not only once the checkbox has
   * replaced the media (compact): otherwise the row's content on
   * fine-pointer devices would only be togglable by precisely hitting the
   * small hover-revealed checkbox, which is inconsistent with how compact
   * mode behaves and isn't how Gmail/Photos-style bulk-select works even on
   * desktop web. It's safe to do unconditionally (regardless of what's
   * projected) because a consumer whose content contains a routerLink is
   * already expected to have nulled that binding out while
   * `selectionActive` — so there's no competing navigation to accidentally
   * trigger.
   */
  onHostClick(event: MouseEvent): void {
    if (this.justLongPressed) {
      this.justLongPressed = false;
      return;
    }
    if (!this.selectable() || !this.selectionActive()) return;
    // The checkbox already has its own (checkedChange) handler — without
    // this, a tap on it would toggle twice (once from checkedChange, once
    // from this handler catching the same click as it bubbles up).
    if ((event.target as HTMLElement).closest('ul-checkbox')) return;
    this.selectedChange.emit(!this.selected());
  }
}
