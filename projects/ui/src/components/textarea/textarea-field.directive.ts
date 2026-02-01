import { Directive } from '@angular/core';

/**
 * When projected into pe-textarea, replaces the native textarea with custom content (e.g. Quill).
 * Use with [pe-textarea-field] on the element to project.
 */
@Directive({
  selector: '[pe-textarea-field]',
  standalone: true,
})
export class TextareaFieldDirective {}
