import { Dispatch, SetStateAction, useEffect } from 'react';

export default function ButtonsToChangeCount({
  amountToChange,
  setCount,
}: {
  amountToChange: (string | number)[];
  setCount: Dispatch<SetStateAction<number>>;
}) {
  const onChangeCount = (amount: string | number) => {
    setCount((count: number) => (count + +amount < 0 ? 0 : count + +amount));
  };

  return amountToChange.map((amount) => {
    if (isNaN(+amount)) {
      throw new Error(
        `${amount}는 숫자로 형 변환이 될 수 있는 문자열이나 숫자 값이어야 합니다.`
      );
    }

    return (
      <button
        type='button'
        onClick={() => onChangeCount(amount)}
        aria-label={`현재 카운트를 ${amount}만큼 변경`}
        key={amount}
      >
        {amount}
      </button>
    );
  });
}
