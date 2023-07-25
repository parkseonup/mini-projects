import { ErrorBoundary } from 'react-error-boundary';
import ButtonsToChangeCount from '../components/counter/buttonToChangeCount';
import useTimer from '../hooks/useTimer';
import FallbackCountError from '../components/counter/fallbackCountError';

export default function SimpleCounter() {
  const { count, setCount, isRunning, toggleRunning, resetRunning } =
    useTimer();
  const amountToChange = [-1, -10, '-100', '+100', '+10', '+1'];

  return (
    <section>
      <h2>Simple Counter</h2>

      <dl>
        <dt>현재 카운트</dt>
        <dd>
          <output>{count}</output>
        </dd>
      </dl>

      <div>
        <button type='button' onClick={toggleRunning}>
          {isRunning ? 'Stop' : 'Start'}
        </button>
        <button type='button' onClick={resetRunning}>
          Reset
        </button>
      </div>

      <div>
        <ErrorBoundary fallbackRender={FallbackCountError}>
          <ButtonsToChangeCount
            amountToChange={amountToChange}
            setCount={setCount}
          />
        </ErrorBoundary>
      </div>
    </section>
  );
}
