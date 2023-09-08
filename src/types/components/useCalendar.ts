import { MonthlyDays } from '../../components/common/Calendar/date-utils.type';

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
  view: {
    changeWeekStart: (day: number) => void;
    movePrevMonth: () => void;
    moveNextMonth: () => void;
  };
};