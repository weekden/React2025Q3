export type FormDataValues = {
  name: string;
  age: number;
  email: string;
  avatar?: File;
  gender: string;
  country: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
};

export type FormDataInputs = {
  name: HTMLInputElement;
  age: HTMLInputElement;
  email: HTMLInputElement;
  password: HTMLInputElement;
  confirmPassword: HTMLInputElement;
  avatar: HTMLInputElement;
  gender: HTMLInputElement;
  country: HTMLInputElement;
  terms: HTMLInputElement;
};

export type FormDataStore = {
  name: string;
  age: number;
  email: string;
  avatar: string;
  gender: string;
  country: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
};
