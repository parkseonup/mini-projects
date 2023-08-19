import useCalendar from '../../hooks/useCalendar';
import { getDate, weekDays } from '../../utils/date-utils';

export default function Calendar({
  onSelect,
  selectedDate,
}: {
  onSelect?: (date: Date) => any;
  selectedDate?: Date;
}) {
  const { headers, body, movePrevMonth, moveNextMonth, changeWeekStart } =
    useCalendar({});

  return (
    <>
      <h3>
        {headers.current.year}.{headers.current.month + 1}
      </h3>

      <div>
        <button type='button' onClick={movePrevMonth}>
          이전 달
        </button>
        <button type='button' onClick={moveNextMonth}>
          다음 달
        </button>
      </div>

      <div>
        <label>
          한 주의 시작 요일:
          <select
            onChange={(e) => changeWeekStart(+e.target.value)}
            defaultValue={headers.weekStart}
          >
            {weekDays.map((day, i) => (
              <option key={i} value={i}>
                {day}
              </option>
            ))}
          </select>
        </label>
      </div>

      <table>
        <thead>
          <tr>
            {headers.weekDays.map(({ key, value }) => (
              <th scope='col' key={key}>
                {value}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.value.map(({ key, value: days }) => (
            <tr key={key}>
              {days.map(({ key, value }) => (
                <td
                  key={key}
                  className={selectedDate === value ? 'selected' : ''}
                  onClick={() => onSelect && onSelect(value)}
                >
                  {getDate(value)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
