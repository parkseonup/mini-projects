interface Validation {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  observer?: string;
  custom?: (param: any) => any;
  [index: string]: any;
}

type ValidationType =
  | 'required'
  | 'minLength'
  | 'maxLength'
  | 'pattern'
  | 'custom';

interface UseFormProp {
  [name: string]: {
    validation: Validation;
  };
}

type Error = (keyof Validation)[];

interface Errors {
  [name: string]: Error;
}

interface Field {
  value: string;
  isDirty: boolean;
}

interface Fields {
  [name: string]: Field;
}

interface GetOwnErrorsResult {
  [name: string]: any;
}

export {
  Validation,
  ValidationType,
  UseFormProp,
  Error,
  Errors,
  Field,
  Fields,
  GetOwnErrorsResult,
};
