interface Validation {
  require?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (param: any) => any;
}

type ValidationType =
  | 'require'
  | 'minLength'
  | 'maxLength'
  | 'pattern'
  | 'custom';

interface UseFormProp {
  [name: string]: {
    validation: Validation;
  };
}

type Error = ValidationType[];

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

export {
  Validation,
  ValidationType,
  UseFormProp,
  Error,
  Errors,
  Field,
  Fields,
};
