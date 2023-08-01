const weekDays = ['SUN', 'MON', 'TUE', 'WEN', 'THU', 'FRI', 'SAT'];

export const getAllWeekDays = (weekStart: number) => {
  let newWeekDays: { key: number; value: string }[] = [];

  weekDays.forEach((day, i) => {
    const index =
      i - weekStart >= 0 ? i - weekStart : weekDays.length + (i - weekStart);
    newWeekDays[index] = { key: i, value: day };
  });

  return newWeekDays;
};
