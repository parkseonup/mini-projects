export type MonthSatus = 'thisMonth' | 'otherMonth';

export type MonthlyDays = {
  value: {
    key: string;
    value: Date;
    status: MonthSatus;
  }[];
  key: number;
}[];

export const ONE_WEEK = 7;
export const weekDays = ['SUN', 'MON', 'TUE', 'WEN', 'THU', 'FRI', 'SAT'];

export const getYear = (date: Date) => {
  if (date instanceof Date) {
    return date.getFullYear();
  }

  throw new Error(`Failed to get year from date: ${date}`);
};

export const getMonth = (date: Date) => {
  if (date instanceof Date) {
    return date.getMonth();
  }

  throw new Error(`Failed to get month from date: ${date}`);
};

export const getDate = (date: Date) => {
  if (date instanceof Date) {
    return date.getDate();
  }

  throw new Error(`Failed to get date from date: ${date}`);
};

export const getDay = (date: Date) => {
  if (date instanceof Date) {
    return date.getDay();
  }

  throw new Error(`Failed to get day from date: ${date}`);
};

export const getDateToString = (date: Date) => {
  if (date instanceof Date) {
    return `${getYear(date)}-${(getMonth(date) + '').padStart(2, '0')}-${(
      getDate(date) + ''
    ).padStart(2, '0')}`;
  }

  throw new Error(`Failed to get date string from date: ${date}`);
};

export const getMonthStartDay = (date: Date) => {
  if (date instanceof Date) {
    return getDay(new Date(getYear(date), getMonth(date), 1));
  }

  throw new Error(`Failed to get start day from date: ${date}`);
};

export const getMonthEnd = (date: Date) => {
  if (date instanceof Date) {
    return getDate(new Date(getYear(date), getMonth(date) + 1, 0));
  }

  throw new Error(`Failed to get end date from date: ${date}`);
};

export const getWeekStartIndex = (date: Date, weekStart: number = 0) => {
  const startDay = getMonthStartDay(date);

  return weekStart - startDay > 0
    ? 7 - (weekStart - startDay)
    : -(weekStart - startDay);
};

export const getNumberOfWeeks = (date: Date, weekStart: number = 0) => {
  return Math.ceil(
    (getWeekStartIndex(date, weekStart) + getMonthEnd(date)) / ONE_WEEK
  );
};

export const getWeekDays = (date: Date) => {};

export const getAllDays = (date: Date, weekStart: number) => {
  // return
};

// (i - ) % 7

export const getAllWeekDays = (weekStart: number) => {
  let newWeekDays: { key: number; value: string }[] = [];

  weekDays.forEach((day, i) => {
    const index =
      i - weekStart >= 0 ? i - weekStart : weekDays.length + (i - weekStart);

    newWeekDays[index] = { key: i, value: day };
  });

  return newWeekDays;
};

const THIS_MONTH: MonthSatus = 'thisMonth';
const OTHER_MONTH: MonthSatus = 'otherMonth';

export const getMonthlyDays = (
  currentFullDate: Date,
  weekStart: number
): MonthlyDays => {
  const currentYear = getYear(currentFullDate);
  const currentMonth = getMonth(currentFullDate);
  const weekStartIndex = getWeekStartIndex(currentFullDate, weekStart); // 한 주의 시작 요일로 재설정한 현재 달의 시작 인덱스
  const lastDate = getMonthEnd(currentFullDate); // 현재 달의 마지막 날짜
  const numberOfWeeks = getNumberOfWeeks(currentFullDate, weekStart); // 현재 달의 주 수

  // 이전 달 날짜 배열
  const daysOfPrevMonth = Array.from({ length: weekStartIndex }, (_, i) => {
    const date = new Date(currentYear, currentMonth, i - weekStartIndex + 1);

    return {
      key: `${date}`,
      value: date,
      status: OTHER_MONTH,
    };
  });

  // 현재 달 날짜 배열
  const daysOfCurrentMonth = Array.from({ length: lastDate }, (_, i) => {
    const date = new Date(currentYear, currentMonth, i + 1);

    return {
      key: `${date}`,
      value: date,
      status: THIS_MONTH,
    };
  });

  // 다음 달 날짜 배열
  const daysOfNextMonth = Array.from(
    { length: numberOfWeeks * ONE_WEEK - weekStartIndex - weekStartIndex - 1 },
    (_, i) => {
      const date = new Date(currentYear, currentMonth + 1, i + 1);

      return {
        key: `${date}`,
        value: date,
        status: OTHER_MONTH,
      };
    }
  );

  // 이전/현재/다음 달 날짜 배열의 합
  const daysOfTotal = [
    ...daysOfPrevMonth,
    ...daysOfCurrentMonth,
    ...daysOfNextMonth,
  ];

  // 이전/현재/다음 달 날짜 배열을 2*2 배열로 변환해서 반환
  return Array.from({ length: numberOfWeeks }, (_, i) => ({
    key: currentYear * currentMonth * weekStart + i,
    value: [],
  })).map((weeklyDate) => ({
    ...weeklyDate,
    value: daysOfTotal.splice(0, 7),
  }));
};
