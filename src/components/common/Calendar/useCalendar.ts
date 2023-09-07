import { useMemo, useRef, useState } from 'react';
import {
  getWeekDays,
  getDate,
  getMonth,
  getMonthlyDays,
  getYear,
  weekStartByCountry,
} from './date-utils';
import { CalendarData } from '../../../types/components/useCalendar';

export default function uesCalendar({
  showFixedNumberOfWeeks,
  locale,
}: {
  showFixedNumberOfWeeks?: number;
  locale?: string;
}): CalendarData & {
  movePrevMonth: () => void;
  moveNextMonth: () => void;
  changeWeekStart: (day: number) => void;
} {
  const today = useRef(new Date());
  const [weekStart, setWeekStart] = useState(
    weekStartByCountry[locale ?? navigator.language]
  );
  const [currentFullDate, setCurrentFullDate] = useState(today.current);
  const currentYear = getYear(currentFullDate);
  const currentMonth = getMonth(currentFullDate);
  const currentDate = getDate(currentFullDate);

  const monthlydata = useMemo<CalendarData>(
    () => ({
      headers: {
        current: {
          year: currentYear,
          month: currentMonth,
        },
        weekStart,
        weekDays: getWeekDays(weekStart),
      },
      body: {
        value: getMonthlyDays(
          currentFullDate,
          weekStart,
          showFixedNumberOfWeeks
        ),
        today: today.current,
      },
    }),
    [currentFullDate, weekStart]
  );

  const movePrevMonth = () => {
    setCurrentFullDate(new Date(currentYear, currentMonth - 1, currentDate));
  };

  const moveNextMonth = () => {
    setCurrentFullDate(new Date(currentYear, currentMonth + 1, currentDate));
  };

  const changeWeekStart = (day: number) => {
    setWeekStart(day);
  };

  return { ...monthlydata, movePrevMonth, moveNextMonth, changeWeekStart };
}
