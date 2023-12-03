export interface IInputs {
  name: string;
  age: number;
  email: string;
  password: string;
  repeatPassword: string;
  gender: string;
  country: string;
  agreement: string;
}

export interface IErrors {
  [key: string]: string;
}
