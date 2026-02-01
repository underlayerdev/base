import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * A code display component that shows code with automatic line numbering.
 * Features a clean two-column layout following PE design guidelines.
 *
 * @example
 * <pe-area-code
 *   [content]="codeContent"
 *   [showLineNumbers]="true"
 * />
 */
@Component({
  selector: 'pe-area-code',
  standalone: true,
  templateUrl: './area-code.html',
  styleUrls: ['./area-code.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AreaCodeComponent {
  // Core inputs
  readonly content = input<string>('');
  readonly showLineNumbers = input<boolean>(true);
  readonly maxHeight = input<string | null>(null);

  // Computed properties
  readonly lines = computed(() => {
    const content = this.content();
    if (!content) return [''];
    return content.split('\n');
  });

  readonly lineCount = computed(() => this.lines().length);

  readonly lineNumbers = computed(() => {
    const count = this.lineCount();
    return Array.from({ length: count }, (_, i) => i + 1);
  });

  // Component properties
  readonly codeId = `pe-area-code-${Math.random().toString(36).slice(2, 11)}`;
}
