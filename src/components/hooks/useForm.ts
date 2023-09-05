import { useCallback, useRef, useState } from 'react';
import {
  Errors,
  Fields,
  GetOwnErrorsResult,
  Validation,
} from '../../types/components/useForm';

export default function useForm() {
  const [fields, setFields] = useState<Fields>();
  const [errors, setErrors] = useState<Errors>({});
  const validations = useRef<Validation>({});
  const formRef = useRef({});

  // TODO: checkPassword가 dirty일 때 password를 작성하면 checkPassword도 같이 유효성 검사해줘야 함.
  const validate = useCallback((name: string, value: string) => {
    if (!validations.current) return;

    const validation = validations.current[name];

    if (!validation) return;

    const newErrors = Object.keys(validation).filter((type) => {
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

  /**
   * 유효성 검사를 할 입력폼을 등록하는 함수
   *
   * @param {string} name 입력폼의 name 값으로 할당될 값
   * @param {Validation} validation 입력폼의 유효성 검증 조건
   * @returns
   */
  const register = (name: string, validation: Validation) => {
    if (!formRef.current) return;
    if (!validations.current) return;

    const ref = useRef<HTMLInputElement>(null);

    validations.current = {
      ...validations.current,
      [name]: validation,
    };

    formRef.current = {
      ...formRef.current,
      [name]: ref.current,
    };

    return validation.required
      ? {
          name,
          ref,
          required: true,
        }
      : { name, ref };
  };

  return {
    fields,
    errors,
    validate,
    register,
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
const getOwnErrors = (value: string, type: string, condition: any) => {
  const result: GetOwnErrorsResult = {
    required: () => (value.length === 0 ? true : false),
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
    undefined: () => {
      throw new Error(`존재하지 않는 ${type}입니다.`);
    },
  };

  return result[type] ? result[type]() : result.undefined();
};
