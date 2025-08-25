import type { UseFormRegister } from 'react-hook-form';
import type { FormDataValues } from '../forms';

export type FormName =
  | 'name'
  | 'age'
  | 'email'
  | 'avatar'
  | 'gender'
  | 'country'
  | 'password'
  | 'confirmPassword'
  | 'terms';

export type InputProps = {
  id?: string;
  name: FormName;
  type?: string;
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  autocomplete?: string;
  list?: string;
  onInput?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: () => void;
  errorMessage?: string;
  register?: UseFormRegister<FormDataValues>;
};
