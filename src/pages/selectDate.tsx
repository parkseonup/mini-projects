import { useState } from 'react';
import { getDateToString } from '../components/common/Calendar/date-utils';
import Calendar from '../components/common/Calendar/Calnedar';

export default function SelectDate() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isHiddenCalendar, setIsHiddenCalendar] = useState(true);

  const toggleDatePicker = () => {
    setIsHiddenCalendar(!isHiddenCalendar);
  };

  const handleClickDate = (date: Date) => {
    setSelectedDate(date);
    setIsHiddenCalendar(true);
  };

  return (
    <div>
      <h2>Date Picker</h2>

      <div>
        <input
          type='text'
          onClick={toggleDatePicker}
          value={getDateToString(selectedDate)}
          readOnly
        />
        <button type='button' onClick={toggleDatePicker}>
          Select Date
        </button>

        {isHiddenCalendar || (
          <div>
            <Calendar
              selectedDate={selectedDate}
              onSelect={handleClickDate}
              startDate={new Date()}
              endDate={new Date('2023-11-24')}
            />
          </div>
        )}
      </div>
    </div>
  );
}
