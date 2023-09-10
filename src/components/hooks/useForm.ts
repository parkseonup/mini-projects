import { useRef, useState } from 'react';
import {
  Values,
  Errors,
  GetOwnErrorsResult,
  Validation,
} from '../../types/components/useForm';

export default function useForm() {
  const [errors, setErrors] = useState<Errors>({});
  const valuesRef = useRef<Values>({});

  /**
   * input value값을 반환하는 함수
   *
   * @param {string} name input name값
   * @returns {string} input 입력값
   */
  const getValue = (name: string) => {
    if (valuesRef.current[name] !== undefined) return valuesRef.current[name];

    throw new Error(`[name: ${name}]가 없습니다.`);
  };

  /**
   * input 입력값을 변경하는 함수
   *
   * @param {string} name input name값
   * @param {string} value 새롭게 전달된 입력값
   * @returns {{ [name: string]: string }} 변경된 value
   */
  const setValue = (name: string, value: string) => {
    if (valuesRef.current[name] !== undefined) {
      valuesRef.current[name] = value;
      return { [name]: valuesRef.current[name] };
    }

    throw new Error(`변경할 [name: ${name}]가 없습니다.`);
  };

  /**
   * 유효성 검사를 실행하는 함수
   *
   * @param {string} name input name값
   * @param {string} value input value값
   * @param {Validation} validation 유효성 검사 조건
   */
  const validate = (name: string, value: string, validation: Validation) => {
    const newErrors = Object.keys(validation).filter((type) =>
      getOwnErrors(value, type, validation[type])
    );

    setErrors((errors) => ({
      ...errors,
      [name]: newErrors,
    }));
  };

  return {
    errors,
    getValue,
    setValue,
    validate,
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
