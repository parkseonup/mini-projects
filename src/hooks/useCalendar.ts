import { useMemo, useState } from 'react';
import { MonthlyDays, getMonthlyDays } from '../utils/getMonthlyDays';

/**
 * 자료에서 내부 소스 추측하기
 * @returns headers, body
 *
 * headers: {
 *  weekDays: [{ key, value }] // NOTE: 삭제. 사용자가 직접 작성하도록 만듦
 *  current: {
 *    year,
 *    month: 0 ~ 11
 *  }
 * }
 * body: {
 *  value: [ // 월별 주 구성
 *    {
 *      key: Index,
 *      value: [ // 주별 날짜 구성 (일 ~ 토)
 *        {
 *          key: string, // NOTE: 삭제. 필요성을 못 느낌.
 *          value: Date,
 *          status: 'thisMonth' | 'otherMonth'
 *        },
 *      ]
 *    },
 *  ],
 *  today: Date
 * }
 */

export type CalendarData = {
  headers: {
    current: {
      year: number;
      month: number;
    };
  };
  body: {
    value: MonthlyDays;
    today: Date;
  };
};

export default function uesCalendar(): CalendarData & {
  movePrevMonth: () => void;
  moveNextMonth: () => void;
} {
  const today = useMemo(() => new Date(), []);
  const [currentFullDate, setCurrentFullDate] = useState(
    new Date(today.setDate(1))
  );
  const currentYear = currentFullDate.getFullYear();
  const currentMonth = currentFullDate.getMonth();
  const currentDate = currentFullDate.getDate();

  const monthlydata = useMemo<CalendarData>(
    () => ({
      headers: {
        current: {
          year: currentYear,
          month: currentMonth,
        },
      },
      body: {
        value: getMonthlyDays(currentFullDate),
        today,
      },
    }),
    [currentFullDate]
  );

  const movePrevMonth = () => {
    setCurrentFullDate(new Date(currentYear, currentMonth - 1, currentDate));
  };

  const moveNextMonth = () => {
    setCurrentFullDate(new Date(currentYear, currentMonth + 1, currentDate));
  };

  return { ...monthlydata, movePrevMonth, moveNextMonth };
}
