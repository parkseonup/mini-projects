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
import { MonthlyDays } from './date-utils.type';

export default function uesCalendar({
  showFixedNumberOfWeeks,
  locale,
}: {
  showFixedNumberOfWeeks?: number;
  locale?: string;
}): CalendarData {
  const today = useRef(new Date());
  const [weekStart, setWeekStart] = useState(
    weekStartByCountry[locale ?? navigator.language]
  );
  const [currentFullDate, setCurrentFullDate] = useState(today.current);
  const currentYear = getYear(currentFullDate);
  const currentMonth = getMonth(currentFullDate);
  const currentDate = getDate(currentFullDate);

  const movePrevMonth = () => {
    setCurrentFullDate(new Date(currentYear, currentMonth - 1, currentDate));
  };

  const moveNextMonth = () => {
    setCurrentFullDate(new Date(currentYear, currentMonth + 1, currentDate));
  };

  const changeWeekStart = (day: number) => {
    setWeekStart(day);
  };

  const monthlyDays = useMemo<MonthlyDays>(
    () => getMonthlyDays(currentFullDate, weekStart, showFixedNumberOfWeeks),
    [currentFullDate, weekStart]
  );

  return {
    headers: {
      current: {
        year: currentYear,
        month: currentMonth,
      },
      weekStart,
      weekDays: getWeekDays(weekStart),
    },
    body: {
      value: monthlyDays,
      today: today.current,
    },
    view: {
      movePrevMonth,
      moveNextMonth,
      changeWeekStart,
    },
  };
}
