import { useMemo, useRef, useState } from 'react';
import {
  MonthlyDays,
  getAllWeekDays,
  getDate,
  getMonth,
  getMonthlyDays,
  getYear,
  weekStartByCountry,
} from '../utils/date-utils';

export type CalendarData = {
  headers: {
    current: {
      year: number;
      month: number;
    };
    weekStart: number;
    weekDays: { key: number; value: string }[];
  };
  body: {
    value: MonthlyDays;
    today: Date;
  };
};

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
  const [currentFullDate, setCurrentFullDate] = useState(
    new Date(today.current.setDate(1))
  );
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
        weekDays: getAllWeekDays(weekStart),
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
