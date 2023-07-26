import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import useValidPalindrome from '../hooks/useVaildPalindrome';

export default function Palindrome() {
  const [validationValue, setValidationValue] = useState('');
  const validationResult = useValidPalindrome(validationValue);
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
          {validationResult
            ? `${validationValue} is a palindrome`
            : validationValue === ''
            ? ''
            : `${validationValue} is not a palindrome`}
        </output>
      </form>
    </>
  );
}
