export type MonthSatus = 'thisMonth' | 'otherMonth';

export type MonthlyDays = {
  value: {
    key: string;
    value: Date;
    status: MonthSatus;
  }[];
  key: number;
}[];
