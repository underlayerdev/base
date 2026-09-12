import { signal } from '@angular/core';

/**
 * Open/focus/highlight state and keyboard navigation shared by combobox-
 * style inputs (a text field paired with a listbox of options) —
 * `ul-search-select` (closed list, one selection) and `ul-search-input`
 * (free text plus suggestions/results) need identical open/close timing and
 * arrow-key/Escape mechanics despite having different value semantics. This
 * holds only that shared mechanics; each consumer still owns its own list,
 * selection, and what Enter does when nothing is highlighted.
 */
export class ComboboxState {
  readonly isOpen = signal(false);
  readonly isFocused = signal(false);
  readonly highlightedIndex = signal(0);

  private closeTimeout: ReturnType<typeof setTimeout> | null = null;

  /** Cancels any pending blur-close and opens immediately — for focus/typing. */
  open(): void {
    this.cancelScheduledClose();
    this.isFocused.set(true);
    this.isOpen.set(true);
  }

  /**
   * Closes after a short delay instead of immediately, so a mousedown on an
   * option (which fires before the field's blur) can still register before
   * the panel disappears. `onClosed` runs once the delay elapses, unless a
   * subsequent `open()`/`close()` cancels it first.
   */
  scheduleClose(onClosed?: () => void, delay = 150): void {
    this.isFocused.set(false);
    this.closeTimeout = setTimeout(() => {
      this.closeTimeout = null;
      this.isOpen.set(false);
      onClosed?.();
    }, delay);
  }

  /** Closes immediately — for selecting an option, submitting, or Escape. */
  close(): void {
    this.cancelScheduledClose();
    this.isOpen.set(false);
  }

  cancelScheduledClose(): void {
    if (this.closeTimeout != null) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = null;
    }
  }

  resetHighlight(): void {
    this.highlightedIndex.set(0);
  }

  /**
   * Handles ArrowDown/ArrowUp (cycling over `listLength`) and Escape
   * (closes). Returns whether it handled the key, so the caller's own
   * keydown handler knows whether to fall through to its own Enter logic —
   * Enter is deliberately not handled here, since selecting the highlighted
   * option vs. falling back to something else (e.g. `ul-search-input`'s
   * free-text submit) is caller-specific.
   */
  handleNavigationKey(event: KeyboardEvent, listLength: number): boolean {
    switch (event.key) {
      case 'ArrowDown':
        if (listLength === 0) return false;
        event.preventDefault();
        this.highlightedIndex.set((this.highlightedIndex() + 1) % listLength);
        return true;
      case 'ArrowUp':
        if (listLength === 0) return false;
        event.preventDefault();
        this.highlightedIndex.set(
          this.highlightedIndex() <= 0 ? listLength - 1 : this.highlightedIndex() - 1,
        );
        return true;
      case 'Escape':
        event.preventDefault();
        this.close();
        return true;
      default:
        return false;
    }
  }
}

/** DOM id for the option at `index` inside the listbox owned by `controlId`. */
export function comboboxOptionId(controlId: string, index: number): string {
  return `${controlId}-option-${index}`;
}

/**
 * `aria-activedescendant` value for a combobox's current highlight, or
 * `undefined` when there's nothing to point at (empty list).
 */
export function comboboxActiveDescendantId(
  controlId: string,
  listLength: number,
  highlightedIndex: number,
): string | undefined {
  if (listLength === 0) return undefined;
  const safeIndex = Math.min(Math.max(0, highlightedIndex), listLength - 1);
  return comboboxOptionId(controlId, safeIndex);
}
