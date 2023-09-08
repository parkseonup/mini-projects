import { MonthSatus } from '../../components/common/Calendar/date-utils.type';

interface UseCalendarProps {
  showFixedNumberOfWeeks?: number;
  locale?: string;
}

interface MonthlyDay {
  value: {
    key: string;
    value: Date;
    status: MonthSatus;
  }[];
  key: number;
}

type MonthlyDays = MonthlyDay[];

interface CalendarData {
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
}

export { UseCalendarProps, MonthlyDay, MonthlyDays, CalendarData };
