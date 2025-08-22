export type InputProps = {
  id?: string;
  name: string;
  type?: string;
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  autocomplete?: string;
  onInput?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: () => void;
  errorMessage?: string;
};
