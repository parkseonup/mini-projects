import { useState } from 'react';
import { getDateToString } from '../utils/date-utils';
import DatePicker from '../components/DatePicker';

export default function SelectDate() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isActive, setIsActive] = useState(false);

  const toggleDatePicker = () => {
    setIsActive(!isActive);
  };

  const handleClickDate = (date: Date) => {
    setSelectedDate(date);
    setIsActive(false);
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

        <DatePicker
          selectedDate={selectedDate}
          onSelect={handleClickDate}
          isActive={isActive}
        />
      </div>
    </div>
  );
}
