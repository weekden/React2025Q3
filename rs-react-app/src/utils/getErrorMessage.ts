import type { FieldErrors } from 'react-hook-form';
import type { FormName } from '../types/elements/input';
import type { FormErrors } from '../types/zod';
import type { FormDataValues } from '../types/forms';

export function getErrorMessage(
  name: FormName,
  customErrors?: FormErrors,
  hookFormErrors?: FieldErrors<FormDataValues>
): string | undefined {
  if (customErrors) return customErrors[name];
  if (hookFormErrors) return hookFormErrors[name]?.message;
  return undefined;
}
