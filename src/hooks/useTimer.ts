import { useEffect, useState } from 'react';

export default function useTimer() {
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
