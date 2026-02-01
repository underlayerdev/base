import { CdkAccordion, CdkAccordionItem } from '@angular/cdk/accordion';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  DestroyRef,
  ElementRef,
  inject,
  input,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/**
 * AccordionItemComponent is a standalone Angular component that extends CdkAccordionItem.
 * It represents an item within an accordion, providing configurable expansion behavior
 * and accessibility features.
 */
@Component({
  selector: 'pe-accordion-item',
  standalone: true,
  template: `
    <div
      class="pe-accordion__item"
      [class.pe-accordion__item--expanded]="cdkAccordionItem.expanded"
      [class.pe-accordion__item--disabled]="cdkAccordionItem.disabled">
      <button
        (click)="onToggle()"
        class="pe-accordion__trigger"
        [id]="triggerId"
        [attr.aria-expanded]="cdkAccordionItem.expanded"
        [attr.aria-controls]="contentId"
        [attr.aria-disabled]="cdkAccordionItem.disabled ? 'true' : null"
        [disabled]="cdkAccordionItem.disabled"
        (keydown)="onKeydown($event)"
        type="button">
        <div class="pe-accordion__icon">
          <ng-content select="[pe-accordion-icon]"></ng-content>
        </div>
        <div class="pe-accordion__label">
          <ng-content select="[pe-accordion-label]"></ng-content>
        </div>
        <div class="pe-accordion__status">
          <ng-content select="[pe-accordion-status]"></ng-content>
        </div>
        <span class="pe-accordion__indicator">
          <i class="pe-icon pe-icon-size-8 pe-icon-weight-bold pe-icon-chevron_down"></i>
        </span>
      </button>
      <div
        role="region"
        class="pe-accordion__content"
        [id]="contentId"
        [attr.aria-labelledby]="triggerId"
        [attr.aria-hidden]="!cdkAccordionItem.expanded">
        <ng-content select="[pe-accordion-content]"></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['./accordion.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: CdkAccordionItem,
      inputs: ['expanded', 'disabled'],
      outputs: ['closed', 'opened', 'destroyed', 'expandedChange'],
    },
  ],
})
export class AccordionItemComponent {
  cdkAccordionItem = inject(CdkAccordionItem);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  /**
   * Stable ID for the content region, used for aria-controls linkage.
   */
  readonly contentId = `pe-accordion-content-${Math.random().toString(36).slice(2, 11)}`;

  /**
   * Stable ID for the trigger button, used for aria-labelledby linkage.
   */
  readonly triggerId = `pe-accordion-trigger-${Math.random().toString(36).slice(2, 11)}`;

  onToggle(): void {
    if (this.cdkAccordionItem.disabled) {
      return;
    }
    this.cdkAccordionItem.toggle();
  }

  onKeydown(event: KeyboardEvent): void {
    if (this.cdkAccordionItem.disabled) {
      return;
    }

    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.onToggle();
      return;
    }

    // Handle Arrow keys, Home, and End for navigation between accordion items
    const accordion = this.elementRef.nativeElement.closest('.pe-accordion');
    if (!accordion) {
      return;
    }

    const triggers = Array.from(
      accordion.querySelectorAll('.pe-accordion__trigger:not([disabled])'),
    ) as HTMLButtonElement[];
    const currentIndex = triggers.findIndex((t) => t.id === this.triggerId);

    if (currentIndex === -1) {
      return;
    }

    let targetIndex: number | null = null;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        targetIndex = currentIndex < triggers.length - 1 ? currentIndex + 1 : 0;
        break;
      case 'ArrowUp':
        event.preventDefault();
        targetIndex = currentIndex > 0 ? currentIndex - 1 : triggers.length - 1;
        break;
      case 'Home':
        event.preventDefault();
        targetIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        targetIndex = triggers.length - 1;
        break;
    }

    if (targetIndex !== null && triggers[targetIndex]) {
      triggers[targetIndex].focus();
    }
  }
}

/**
 * AccordionComponent is a standalone Angular component that acts as a container
 * for multiple AccordionItemComponents. It provides configuration options for
 * multi-expansion behavior and manages the state of its child accordion items.
 */
@Component({
  selector: 'pe-accordion',
  standalone: true,
  template: `
    <cdk-accordion #accordion [multi]="multi()" class="pe-accordion" [class.pe-accordion--divider]="showDivider()">
      <ng-content />
    </cdk-accordion>
  `,
  styleUrls: ['./accordion.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CdkAccordion],
})
export class AccordionComponent implements AfterViewInit {
  readonly showDivider = input<boolean>(false);
  readonly multi = input<boolean>(false);

  private readonly destroyRef = inject(DestroyRef);
  private readonly accordionItems = contentChildren<AccordionItemComponent, CdkAccordionItem>(AccordionItemComponent, {
    read: CdkAccordionItem,
  });

  ngAfterViewInit(): void {
    this.setupSingleExpansionLogic();
  }

  /**
   * Sets up the single expansion logic to ensure only one item is expanded at a time
   * when multi mode is disabled.
   */
  private setupSingleExpansionLogic(): void {
    const items = this.accordionItems();

    // Early return if no items or multi mode is enabled
    if (!items.length || this.multi()) {
      return;
    }

    // Subscribe to expansion changes for all items
    items.forEach((item) => {
      item.expandedChange.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((expanded) => {
        this.handleExpansionChange(item, expanded, items);
      });
    });
  }

  /**
   * Handles expansion changes and manages single-expansion behavior.
   * @param changedItem - The accordion item that changed
   * @param expanded - Whether the item is now expanded
   * @param allItems - Array of all accordion items
   */
  private handleExpansionChange(
    changedItem: CdkAccordionItem,
    expanded: boolean,
    allItems: readonly CdkAccordionItem[],
  ): void {
    // Only handle expansion (not collapse) and only when multi mode is disabled
    if (!expanded || this.multi()) {
      return;
    }

    // Collapse all other items except the one that was just expanded
    allItems.forEach((item) => {
      if (item !== changedItem && item.expanded) {
        item.expanded = false;
      }
    });
  }
}
