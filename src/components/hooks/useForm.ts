import { useCallback, useState } from 'react';
import {
  Errors,
  Fields,
  UseFormProp,
  ValidationType,
} from '../../types/components/useForm';

export default function useForm(initialInfo: UseFormProp) {
  const initailFields: Fields = {};

  Object.entries(initialInfo).forEach(([name]) => {
    initailFields[name] = {
      isDirty: false,
      value: '',
    };
  });

  const [fields, setFields] = useState<Fields>(initailFields);
  const [errors, setErrors] = useState<Errors>({});

  // TODO: checkPassword가 dirty일 때 password를 작성하면 checkPassword도 같이 유효성 검사해줘야 함.
  const validate = useCallback((name: string, value: string) => {
    const { validation } = initialInfo[name];
    const newErrors = (
      Object.keys(validation) as (keyof typeof validation)[]
    ).filter((type) => {
      const condition = validation[type];
      return getOwnErrors(value, type, condition);
    });

    setFields((fields) => ({
      ...fields,
      [name]: {
        value,
        isDirty: true,
      },
    }));
    setErrors((errors) => ({
      ...errors,
      [name]: newErrors,
    }));
  }, []);

  return {
    fields: fields,
    validate,
    errors,
    setErrors,
  };
}

/**
 * 유효성 검사를 하기위한 validation 속성들의 error 조건
 *
 * @param {string} value 입력폼의 값
 * @param {string} type validation 타입
 * @param condition
 * @returns
 */
const getOwnErrors = (value: string, type: ValidationType, condition: any) => {
  const result = {
    require: () => (value.length === 0 ? true : false),
    minLength: () => (value.length < condition ? true : false),
    maxLength: () => (value.length > condition ? true : false),
    pattern: () => {
      if (condition instanceof RegExp) return !condition.test(value);

      throw new Error(`${condition}은 RegExp의 인스턴스가 아닙니다.`);
    },
    custom: () => {
      if (condition instanceof Function) {
        return condition(value);
      }

      throw new Error(`${condition}은 function이 아닙니다.`);
    },
  };

  return result[type]();
};
