export type FormDataValues = {
  name: string;
  age: number;
  email: string;
  avatar: File;
  gender: string;
  country: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
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

export type FormProps = {
  onClose?: () => void;
};
