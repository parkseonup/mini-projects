import { MonthSatus } from '../../components/common/Calendar/date-utils.type';

interface UseCalendarProps {
  showDate?: string;
  showFixedNumberOfWeeks?: number;
  locale?: string;
}

interface DailyDate {
  key: string;
  value: Date;
  status: MonthSatus;
}

type WeeklyDate = DailyDate[];

type MonthlyDate = {
  key: number;
  value: WeeklyDate;
}[];

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
    value: MonthlyDate;
    today: Date;
  };
  view: {
    changeWeekStart: (day: number) => void;
    movePrevMonth: () => void;
    moveNextMonth: () => void;
  };
}

export { UseCalendarProps, DailyDate, WeeklyDate, MonthlyDate, CalendarData };
