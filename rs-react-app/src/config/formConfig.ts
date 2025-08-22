import type { InputProps } from '../types/elements/input';

type FormConfig = InputProps & {
  gender?: string[];
};

export const formConfig: FormConfig[] = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    placeholder: 'Enter name',
    autocomplete: 'on',
  },
  {
    name: 'age',
    label: 'Age',
    type: 'number',
    placeholder: 'Enter age',
  },
  {
    name: 'email',
    label: 'E-mail',
    type: 'email',
    placeholder: 'example@mail.com',
  },
  {
    name: 'country',
    label: 'Country',
    type: 'search',
    placeholder: 'Enter your country',
    autocomplete: 'on',
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    autocomplete: 'on',
  },
  {
    name: 'confirm-password',
    label: 'Confirm Password',
    type: 'password',
    placeholder: 'Confirm password',
    autocomplete: 'on',
  },
  {
    name: 'gender',
    label: 'Gender',
    type: 'radio',
    gender: ['Male', 'Female', 'Indeterminate'],
  },
  {
    name: 'avatar',
    label: 'Choose a profile picture',
    type: 'file',
    accept: '.jpeg, .png',
  },
  {
    name: 'terms',
    label: 'Accept Terms and Conditions ',
    type: 'checkbox',
  },
];
