import { CommonModule } from '@angular/common';
import { booleanAttribute, Component, computed, input, model, output, signal, ViewEncapsulation } from '@angular/core';

/**
 * Radio button for use inside a group. For Signal Forms use pe-radio-group with [formField].
 * Use [(checked)] when controlling each radio manually, or place inside pe-radio-group for [formField] binding.
 *
 * @example
 * <pe-radio value="option1" name="my-group" [checked]="isSelected">Option 1</pe-radio>
 */
@Component({
  selector: 'pe-radio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './radio.html',
  styleUrls: ['./radio.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RadioComponent {
  /**
   * The value associated with this radio button.
   * This value identifies the radio button within its group.
   */
  value = input.required<string>();

  /**
   * The name attribute for the radio button group.
   * All radio buttons in the same group should share the same name.
   */
  name = input.required<string>();

  /**
   * Whether the radio button is disabled.
   * @default false
   */
  disabled = input<boolean, boolean>(false, { transform: booleanAttribute });

  /**
   * Whether the radio button is currently checked/selected.
   * This is a two-way binding that can be used with [(checked)].
   */
  checked = model<boolean>(false);

  /**
   * Unique identifier for the radio button.
   * If not provided, one will be auto-generated.
   */
  id = input<string>();

  /**
   * Event emitted when the radio button is clicked.
   * Useful for additional click handling beyond the default radio behavior.
   */
  click = output<MouseEvent>();

  /**
   * Emitted when this radio is selected (checked becomes true).
   * Used by pe-radio-group to sync the group value.
   */
  selected = output<string>();

  /**
   * Internal signal for the unique ID
   */
  private readonly uniqueId = signal(`pe-radio-${Math.random().toString(36).substr(2, 9)}`);

  /**
   * Computed ID that uses provided ID or falls back to generated unique ID
   */
  readonly radioId = computed(() => this.id() || this.uniqueId());

  /**
   * Computed ARIA attributes for accessibility
   */
  readonly ariaAttributes = computed(() => ({
    'aria-checked': this.checked(),
    'aria-disabled': this.disabled(),
    role: 'radio' as const,
  }));

  /**
   * Handles the radio button change event.
   * Updates the checked state.
   *
   * @param event - The change event from the input element
   */
  onRadioChange(event: Event): void {
    if (this.disabled()) {
      return;
    }

    const input = event.target as HTMLInputElement;

    this.checked.set(input.checked);
    if (input.checked) {
      this.selected.emit(this.value());
    }
  }

  /**
   * Handles click events on the radio button.
   * Useful for additional click handling beyond the default radio behavior.
   *
   * @param event - The click event
   */
  onRadioClick(event: MouseEvent): void {
    if (this.disabled()) {
      event.preventDefault();
      return;
    }

    this.click.emit(event);
  }

  /**
   * Handles keyboard events for accessibility.
   * Supports Space and Enter keys for selection.
   *
   * @param event - The keyboard event
   */
  onKeyDown(event: KeyboardEvent): void {
    if (this.disabled()) {
      return;
    }

    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.checked.set(true);
    }
  }
}
