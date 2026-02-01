/**
 * Generates unique IDs for form field elements (control, helper, error).
 * Use this so label `for`, helper `id`, and `aria-describedby` stay in sync.
 */
export function createFormFieldIds(prefix: string): {
  controlId: string;
  helperId: string;
  errorId: string;
} {
  const id = `${prefix}-${Math.random().toString(36).slice(2, 11)}`;
  return {
    controlId: id,
    helperId: `${id}-helper`,
    errorId: `${id}-error`,
  };
}

/**
 * Builds the value for `aria-describedby` from helper and error IDs.
 */
export function getFormFieldDescribedBy(
  helperId: string,
  errorId: string,
  hasHelperText: boolean,
  hasError: boolean,
  hasErrorText: boolean
): string | undefined {
  const ids: string[] = [];
  if (hasHelperText) ids.push(helperId);
  if (hasError && hasErrorText) ids.push(errorId);
  return ids.length > 0 ? ids.join(' ') : undefined;
}
