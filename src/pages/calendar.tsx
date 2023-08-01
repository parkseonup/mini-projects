import useCalendar from '../hooks/useCalendar';

export default function Calendar() {
  const { headers, body, movePrevMonth, moveNextMonth, changeWeekStart } =
    useCalendar();

  return (
    <>
      <h2>Calendar</h2>

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
            <option value='0'>Sun</option>
            <option value='1'>Mon</option>
            <option value='2'>Tue</option>
            <option value='3'>Wed</option>
            <option value='4'>Thu</option>
            <option value='5'>Fri</option>
            <option value='6'>Sat</option>
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
                <td key={key}>{value.getDate()}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
