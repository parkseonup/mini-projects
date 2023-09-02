import { useEffect, useState } from 'react';

interface UseTimer {
  /** Timer의 현재 count 상태값을 나타냅니다. */
  count: number;
  /** setCount(number): 호출시 Timer의 현재 count 상태값을 변경할 수 있습니다. */
  setCount: React.Dispatch<React.SetStateAction<number>>;
  /** Timer의 count가 변경되고 있는지의 상태를 나타냅니다. */
  isRunning: boolean;
  /** 호출시 isRunning는 true로 변경하고, Timer의 count를 1초에 +1씩 변경합니다. */
  startRunning(): void;
  /** 호출시 isRunning는 false로 변경하고, Timer의 count가 변경되는 것을 멈춥니다. */
  stopRunning(): void;
  /** 호출시 isRunning의 boolean 값을 변경하고, Timer의 count 값이 1초에 +1씩 변경되는 것을 시작하거나 멈춥니다. */
  toggleRunning(): void;
  /** Timer의 count 값을 0으로 변경합니다. */
  resetRunning(): void;
}

export default function useTimer(): UseTimer {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalCount: NodeJS.Timer;

    if (isRunning) {
      intervalCount = setInterval(() => {
        setCount((count) => count + 1);
      }, 100);
    }

    return () => clearInterval(intervalCount);
  }, [isRunning]);

  return {
    count,
    setCount,
    isRunning,
    startRunning() {
      setIsRunning(true);
    },
    stopRunning() {
      setIsRunning(false);
    },
    toggleRunning() {
      setIsRunning(!isRunning);
    },
    resetRunning() {
      setCount(0);
    },
  };
}
