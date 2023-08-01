type MonthSatus = 'thisMonth' | 'otherMonth';

export type MonthlyDays = {
  value: {
    key: string;
    value: Date;
    status: MonthSatus;
  }[];
  key: number;
}[];

const THIS_MONTH: MonthSatus = 'thisMonth';
const OTHER_MONTH: MonthSatus = 'otherMonth';

export const getMonthlyDays = (
  currentFullDate: Date,
  weekStart: number
): MonthlyDays => {
  const ONE_WEEK = 7;
  const currentYear = currentFullDate.getFullYear();
  const currentMonth = currentFullDate.getMonth();
  const firstDay = currentFullDate.getDay(); // 현재 달의 첫날 요일. 일 ~ 토: 0 ~ 6
  const weekStartIndex =
    weekStart - firstDay > 0
      ? ONE_WEEK - (weekStart - firstDay)
      : -(weekStart - firstDay); // 한 주의 시작 요일로 재설정한 현재 달의 시작 인덱스
  const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate(); // 현재 달의 마지막 날짜
  const numberOfWeeks = Math.ceil((weekStartIndex + lastDate) / ONE_WEEK); // 현재 달의 주 수

  // 이전/현재/다음 달 날짜 배열
  const daysOfPrevMonth = Array.from({ length: weekStartIndex }, (_, i) => {
    const date = new Date(currentYear, currentMonth, i - weekStartIndex + 1);
    return {
      key: `${date}`,
      value: date,
      status: OTHER_MONTH,
    };
  });
  const daysOfCurrentMonth = Array.from({ length: lastDate }, (_, i) => {
    const date = new Date(currentYear, currentMonth, i + 1);
    return {
      key: `${date}`,
      value: date,
      status: THIS_MONTH,
    };
  });
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
