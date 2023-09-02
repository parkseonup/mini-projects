import { FormEvent } from 'react';
import useForm from '../components/hooks/useForm';

// TODO: register로 등록하는게 나아보일까? 아니면 useForm에 전달하는게 나아보일까?
export default function SignUp() {
  const { fields, errors, register, validate } = useForm({
    name: '',
    email: '',
    password: '',
    checkPassword: '',
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    Object.values(errors).every((error) => error.length === 0)
      ? console.log('성공')
      : console.log('실패!');
  };

  return (
    <>
      <h2>회원가입</h2>

      <form onSubmit={onSubmit}>
        <div>
          <label>
            이름:
            <input
              type='text'
              {...register('name', { require: true, minLength: 2 })}
              onBlur={(e) => validate('name', e.target.value)}
            />
          </label>

          {errors.name?.includes('minLength') ? (
            <p>두자리 이상의 이름을 입력해주세요.</p>
          ) : null}
        </div>

        <div>
          <label>
            이메일:
            <input
              type='email'
              {...register('email', {
                require: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              })}
              onBlur={(e) => validate('email', e.target.value)}
            />
          </label>

          {errors.email?.includes('require') ? (
            <p>이메일을 입력해주세요.</p>
          ) : errors.email?.includes('pattern') ? (
            <p>올바른 이메일 형식이 아닙니다.</p>
          ) : null}
        </div>

        <div>
          <label>
            비밀번호:
            <input
              type='password'
              {...register('password', {
                require: true,
                pattern: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/,
              })}
              onBlur={(e) => validate('password', e.target.value)}
            />
          </label>

          {errors.password?.includes('require') ? (
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
              {...register('checkPassword', {
                require: true,
                check: fields.password,
              })}
              onBlur={(e) => validate('checkPassword', e.target.value)}
            />
          </label>

          {errors.checkPassword?.includes('require') ? (
            <p>비밀번호를 한번 더 입력해주세요.</p>
          ) : errors.checkPassword?.includes('check') ? (
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
