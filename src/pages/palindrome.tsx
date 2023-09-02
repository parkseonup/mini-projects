import { SyntheticEvent, useEffect, useRef, useState } from 'react';

export default function Palindrome() {
  const [validationValue, setValidationValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    setValidationValue(
      `${new FormData(e.target as HTMLFormElement).get('palindromeText')}`
    );
  };

  useEffect(() => {
    if (!inputRef.current) return;

    inputRef.current.value = '';
  }, [validationValue]);

  return (
    <>
      <h2>Valid Palindrome</h2>

      <form onSubmit={(e) => onSubmit(e)}>
        <input
          type='text'
          name='palindromeText'
          id='palindromeText'
          placeholder='Enter a word to check'
          ref={inputRef}
        />
        <button type='submit'>Check</button>

        <output htmlFor='palindromeText'>
          {validationValue !== ''
            ? validationValue === [...validationValue].reverse().join('')
              ? `${validationValue} is a palindrome`
              : `${validationValue} is not a palindrome`
            : ''}
        </output>
      </form>
    </>
  );
}
