import { ChangeEvent, FormEvent } from 'react';
import useForm from '../components/hooks/useForm';
import { Validations } from '../types/components/useForm';

export default function SignUp() {
  const { errors, validate } = useForm();

  const handleChangeValue = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    validate(target.name, target.value, validations[target.name]);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    Object.values(errors).every((error) => error.length === 0)
      ? console.log('성공')
      : console.log('실패!');
  };

  return (
    <>
      <h2>회원가입</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            이름:
            <input type='text' name='name' onBlur={handleChangeValue} />
          </label>

          {errors.name?.includes('minLength') ? (
            <p>두자리 이상의 이름을 입력해주세요.</p>
          ) : null}
        </div>

        <div>
          <label>
            이메일:
            <input type='email' name='email' onBlur={handleChangeValue} />
          </label>

          {errors.email?.includes('required') ? (
            <p>이메일을 입력해주세요.</p>
          ) : errors.email?.includes('pattern') ? (
            <p>올바른 이메일 형식이 아닙니다.</p>
          ) : null}
        </div>

        <div>
          <label>
            비밀번호:
            <input type='password' name='password' onBlur={handleChangeValue} />
          </label>

          {errors.password?.includes('required') ? (
            <p>비밀번호를 입력해주세요.</p>
          ) : errors.password?.includes('pattern') ? (
            <p>8~15자리의 영문, 숫자, 특수기호 조합으로 작성해주세요.</p>
          ) : null}
        </div>

        <div>
          <label>
            비밀번호 확인:
            <input
              type='password'
              name='confirmPassword'
              onBlur={handleChangeValue}
            />
          </label>

          {errors.confirmPassword?.includes('required') ? (
            <p>비밀번호를 입력해주세요.</p>
          ) : errors.confirmPassword?.includes('custom') ||
            errors.password?.includes('custom') ? (
            <p>비밀번호가 일치하지 않습니다.</p>
          ) : null}
        </div>

        <div>
          <button type='submit'>회원가입</button>
        </div>
      </form>
    </>
  );
}

const validations: Validations = {
  name: { required: true, minLength: 2 },
  email: {
    required: true,
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
  },
  password: {
    required: true,
    pattern: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/,
  },
  confirmPassword: {
    required: true,
    custom: () => {},
  },
};
