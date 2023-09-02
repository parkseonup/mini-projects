import { useCallback, useEffect, useRef, useState } from 'react';

interface Validation {
  require?: true;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  check?: Field;
  [type: string]: any;
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

export default function useForm(initialValue: { [name: string]: string }) {
  const [fields, setFields] = useState<Fields>({});
  const [errors, setErrors] = useState<Errors>({});
  const validations = useRef<Validation>({});

  const getError = (value: string, type: string, condition: any) => {
    switch (type) {
      case 'require': {
        return value.length === 0 ? true : false;
      }
      case 'minLength': {
        return value.length < condition ? true : false;
      }
      case 'maxLength': {
        return value.length > condition ? true : false;
      }
      case 'pattern': {
        return !condition.test(value);
      }
      case 'check': {
        if (!condition.isDirty) return false;

        return value === condition.value ? false : true;
      }
    }
  };

  // TODO: checkPassword가 dirty일 때 password를 작성하면 checkPassword도 같이 유효성 검사해줘야 함.
  const validate = useCallback((name: string, value: string) => {
    const error = Object.keys(validations.current[name]).filter((type) => {
      const condition = validations.current[name][type];
      return getError(value, type, condition);
    });

    setFields((fields) => ({
      ...fields,
      [name]: {
        ...fields[name],
        value,
        isDirty: true,
      },
    }));

    setErrors((errors) => ({
      ...errors,
      [name]: error,
    }));
  }, []);

  /**
   * 유효성 검사를 할 입력폼을 등록하는 함수
   *
   * @param {string} name 입력폼의 name 값으로 할당될 값
   * @param {string} initialValue 입력폼의 defaultValue로 할당될 값
   * @param {Validation} validation 입력폼의 유효성 검증 조건
   * @returns
   */
  const register = (name: string, validation: Validation) => {
    validations.current = {
      ...validations.current,
      [name]: validation,
    };

    return validation.require
      ? {
          name,
          defaultValue: initialValue[name],
          required: true,
        }
      : { name, defaultValue: initialValue[name] };
  };

  /** 초기 fields 구성 */
  useEffect(() => {
    const fields: Fields = {};

    Object.entries(initialValue).forEach(([name, value]) => {
      fields[name] = {
        isDirty: false,
        value,
      };
    });

    setFields(fields);
  }, []);

  return {
    fields,
    register,
    validate,
    errors,
  };
}
