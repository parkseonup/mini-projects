import useCalendar from './useCalendar';
import { getDate, weekDays } from './date-utils';

export default function Calendar({
  onSelect,
  selectedDate,
  startDate,
  endDate,
}: {
  onSelect?: (date: Date) => any;
  selectedDate?: Date;
  startDate?: Date;
  endDate?: Date;
}) {
  const { headers, body, movePrevMonth, moveNextMonth, changeWeekStart } =
    useCalendar({});

  const getIsAvailableDate = (date: Date) => {
    const dateString = date.toDateString();

    return (
      (startDate
        ? dateString === startDate?.toDateString() || date > startDate
        : true) &&
      (endDate
        ? dateString === endDate?.toDateString() || date < endDate
        : true)
    );
  };

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
              {days.map(({ key, value }) => {
                const isAvailable = getIsAvailableDate(value);

                return (
                  <td
                    key={key}
                    className={
                      (isAvailable ? 'available' : 'unavailable') +
                      ' ' +
                      (selectedDate === value ? 'selected' : '')
                    }
                    onClick={() =>
                      isAvailable ? onSelect && onSelect(value) : null
                    }
                    tabIndex={isAvailable ? 0 : -1}
                  >
                    {getDate(value)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
