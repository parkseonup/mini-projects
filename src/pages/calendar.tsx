import useCalendar from '../hooks/useCalendar.toss';

export default function Calendar() {
  const { headers, body, movePrevMonth, moveNextMonth } = useCalendar();
  const weekDays = ['SUN', 'MON', 'TUE', 'WEN', 'THU', 'FRI', 'SAT'];

  return (
    <>
      <h2>Calendar</h2>
      <h3>
        {headers.current.year}.{headers.current.month + 1}
      </h3>

      <table>
        <thead>
          <tr>
            {weekDays.map((day) => (
              <th scope='col' key={day}>
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.value.map(({ key, value: days }) => (
            <tr key={key}>
              {days.map(({ /* key, */ value }) => (
                <td key={value.getDate()}>{value.getDate()}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <button type='button' onClick={movePrevMonth}>
        이전
      </button>
      <button type='button' onClick={moveNextMonth}>
        다음
      </button>
    </>
  );
}
