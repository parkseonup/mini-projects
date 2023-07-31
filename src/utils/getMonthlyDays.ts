export type MonthlyDays = {
  value: {
    // key: number; // NOTE: 삭제한 거: 필요성을 못 느끼겠음...
    value: Date;
    status: 'thisMonth' | 'otherMonth';
  }[];
  key: number;
}[];

export const getMonthlyDays = (currentFullDate: Date): MonthlyDays => {
  const ONE_WEEK = 7;
  const currentYear = currentFullDate.getFullYear();
  const currentMonth = currentFullDate.getMonth();
  const firstDay = currentFullDate.getDay(); // 현재 달의 첫날 요일. 일 ~ 토: 0 ~ 6
  const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate(); // 현재 달의 마지막 날짜
  const numberOfWeeks = Math.ceil((firstDay + lastDate) / ONE_WEEK); // 현재 달의 주 수

  // 이전/현재/다음 달 날짜 배열
  const daysOfPrevMonth = Array.from({ length: firstDay }, (_, i) => ({
    value: new Date(currentYear, currentMonth, i - firstDay + 1),
    status: 'otherMonth' as const,
  }));
  const daysOfCurrentMonth = Array.from({ length: lastDate }, (_, i) => ({
    value: new Date(currentYear, currentMonth, i + 1),
    status: 'thisMonth' as const,
  }));
  const daysOfNextMonth = Array.from(
    { length: numberOfWeeks * ONE_WEEK - firstDay - firstDay - 1 },
    (_, i) => ({
      value: new Date(currentYear, currentMonth + 1, i + 1),
      status: 'otherMonth' as const,
    })
  );

  const daysOfTotal = [
    ...daysOfPrevMonth,
    ...daysOfCurrentMonth,
    ...daysOfNextMonth,
  ];

  // 이전/현재/다음 달 날짜 배열을 2*2 배열로 변환해서 반환
  return Array.from({ length: numberOfWeeks }, (_, i) => ({
    key: i,
    value: [],
  })).map((weeklyDate) => ({
    ...weeklyDate,
    value: daysOfTotal.splice(0, 7),
  }));
};
