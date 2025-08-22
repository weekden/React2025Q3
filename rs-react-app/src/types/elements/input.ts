export type InputProps = {
  id?: string;
  name: string;
  type?: string;
  label?: string;
  placeholder?: string;
  accept?: string;
  value?: string;
  autocomplete?: string;
  onInput?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: () => void;
};
