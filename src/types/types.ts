export interface IInputs {
  name: string;
  age: number;
  email: string;
  password: string;
  repeatPassword: string;
  gender: string;
  country: string;
  agreement?: string | undefined;
}

export interface IErrors {
  [key: string]: string;
}
