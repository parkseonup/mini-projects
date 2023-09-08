import { useCallback, useState } from 'react';
import {
  getWeekDays,
  getDate,
  getMonth,
  getYear,
  weekStartByCountry,
  setFirstDate,
  getNumberOfWeeks,
  getMonthStartIndex,
  getWeeklyDays,
} from './date-utils';
import {
  CalendarData,
  MonthlyDays,
  UseCalendarProps,
} from '../../../types/components/useCalendar';

export default function uesCalendar({
  showFixedNumberOfWeeks,
  selectedMonth,
  locale,
}: UseCalendarProps): CalendarData {
  const today = new Date();
  const [currentFullDate, setCurrentFullDate] = useState(
    selectedMonth ? new Date(selectedMonth) : setFirstDate(today)
  );
  const [weekStart, setWeekStart] = useState(
    weekStartByCountry[locale ?? navigator.language]
  );

  const currentYear = getYear(currentFullDate);
  const currentMonth = getMonth(currentFullDate);
  const currentDate = getDate(currentFullDate);

  /**
   * 2*2 배열로 날짜 데이터를 구하는 함수
   * @return {MonthlyDays}
   */
  const getMonthlyDays = useCallback((): MonthlyDays => {
    const numberOfWeeks =
      showFixedNumberOfWeeks ?? getNumberOfWeeks(currentFullDate, weekStart); // 출력될 달의 주 수

    // 달력에 출력될 첫번째 날짜를 구한다. (이전/현재/다음 달 상관없이)
    const monthStartDate = new Date(currentFullDate);
    monthStartDate.setDate(1 - getMonthStartIndex(currentFullDate, weekStart));

    return Array.from({ length: numberOfWeeks }, (_, i) => {
      const date = new Date(monthStartDate);
      date.setDate(getDate(monthStartDate) + 7 * i);

      return {
        key: currentYear * currentMonth * weekStart + i,
        value: getWeeklyDays(date, currentMonth),
      };
    });
  }, [showFixedNumberOfWeeks, currentFullDate, weekStart]);

  const movePrevMonth = () => {
    setCurrentFullDate(new Date(currentYear, currentMonth - 1, currentDate));
  };

  const moveNextMonth = () => {
    setCurrentFullDate(new Date(currentYear, currentMonth + 1, currentDate));
  };

  const changeWeekStart = (day: number) => {
    setWeekStart(day);
  };

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
      value: getMonthlyDays(),
      today,
    },
    view: {
      changeWeekStart,
      movePrevMonth,
      moveNextMonth,
    },
  };
}
