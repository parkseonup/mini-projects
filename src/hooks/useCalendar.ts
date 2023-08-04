import { useMemo, useRef, useState } from 'react';
import { MonthlyDays, getAllWeekDays, getMonthlyDays } from '../utils/calendar';

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
};

export default function uesCalendar(
  locale = navigator.language
): CalendarData & {
  movePrevMonth: () => void;
  moveNextMonth: () => void;
  changeWeekStart: (day: number) => void;
} {
  const today = useRef(new Date());
  const [weekStart, setWeekStart] = useState(weekStartByCountry[locale]);
  const [currentFullDate, setCurrentFullDate] = useState(
    new Date(today.current.setDate(1))
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
        weekStart,
        weekDays: getAllWeekDays(weekStart),
      },
      body: {
        value: getMonthlyDays(currentFullDate, weekStart),
        today: today.current,
      },
    }),
    [currentFullDate, weekStart]
  );

  const movePrevMonth = () => {
    setCurrentFullDate(new Date(currentYear, currentMonth - 1, currentDate));
  };

  const moveNextMonth = () => {
    setCurrentFullDate(new Date(currentYear, currentMonth + 1, currentDate));
  };

  const changeWeekStart = (day: number) => {
    setWeekStart(day);
  };

  return { ...monthlydata, movePrevMonth, moveNextMonth, changeWeekStart };
}

const weekStartByCountry: { [key: string]: number } = {
  // 달력 표기를 일요일(0)부터 시작하는 국가
  'en-US': 0, // 미국 (US)
  'en-CA': 0, // 캐나다 (CA)
  'es-MX': 0, // 멕시코 (MX)
  'ja-JP': 0, // 일본 (JP)
  'ko-KR': 0, // 대한민국 (KR)
  'pt-BR': 0, // 브라질 (BR)
  'en-AU': 0, // 호주 (AU)
  // 달력 표기를 월요일(1)부터 시작하는 국가
  'en-GB': 1, // 영국 (GB)
  'fr-FR': 1, // 프랑스 (FR)
  'de-DE': 1, // 독일 (DE)
  'it-IT': 1, // 이탈리아 (IT)
  'es-ES': 1, // 스페인 (ES)
  'zh-CN': 1, // 중국 (CN)
  'ru-RU': 1, // 러시아 (RU)
  // 달력 표기를 토요일(6)부터 시작하는 국가
  'fa-IR': 6, // 이란 (IR)
  'ps-AF': 6, // 아프가니스탄 (AF)
};
