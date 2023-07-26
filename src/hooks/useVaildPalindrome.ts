import { useEffect, useState } from 'react';

export default function useValidPalindrome(validationValue: string): boolean {
  const [validationResult, setValidationResult] = useState(false);

  useEffect(() => {
    if (validationValue === '') return;

    setValidationResult(
      validationValue === [...validationValue].reverse().join('')
    );
  }, [validationValue]);

  return validationResult;
}
