interface Validation {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  observer?: string;
  custom?: (param: any) => any;
  [index: string]: any;
}

interface Validations {
  [name: string]: Validation;
}

type Error = (keyof Validation)[];

interface Errors {
  [name: string]: Error;
}

interface Values {
  [name: string]: string;
}

interface GetOwnErrorsResult {
  [name: string]: any;
}

export { Values, Validation, Validations, Error, Errors, GetOwnErrorsResult };
