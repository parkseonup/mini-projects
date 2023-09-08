import { MonthSatus } from './date-utils.type';

export const ONE_WEEK = 7;
export const weekDays = ['SUN', 'MON', 'TUE', 'WEN', 'THU', 'FRI', 'SAT'];
export const weekStartByCountry: { [key: string]: number } = {
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
export const THIS_MONTH: MonthSatus = 'thisMonth';
export const OTHER_MONTH: MonthSatus = 'otherMonth';

/**
 * 날짜 객체에서 년을 구하는 함수
 *
 * @param {Date} date
 * @returns {number}
 */
export const getYear = (date: Date) => {
  if (date instanceof Date) {
    return date.getFullYear();
  }

  throw new Error(`Failed to get year from date: ${date}`);
};

/**
 * 날짜 객체에서 달을 구하는 함수
 *
 * @param {Date} date
 * @returns {number} 0 ~ 11
 */
export const getMonth = (date: Date) => {
  if (date instanceof Date) {
    return date.getMonth();
  }

  throw new Error(`Failed to get month from date: ${date}`);
};

/**
 * 날짜 객체에서 일자를 구하는 함수
 *
 * @param {Date} date
 * @returns {number} 1 ~ 31
 */
export const getDate = (date: Date) => {
  if (date instanceof Date) {
    return date.getDate();
  }

  throw new Error(`Failed to get date from date: ${date}`);
};

/**
 * 날짜 객체에서 요일을 구하는 함수
 *
 * @param {Date} date
 * @returns {number} 0 ~ 6
 */
export const getDay = (date: Date) => {
  if (date instanceof Date) {
    return date.getDay();
  }

  throw new Error(`Failed to get day from date: ${date}`);
};

/**
 * 특정 달의 요일을 구하는 함수
 *
 * @param {Date} date
 * @returns {number} 0 ~ 6
 */
export const getMonthFirstDay = (date: Date) => {
  if (date instanceof Date) {
    return getDay(new Date(getYear(date), getMonth(date), 1));
  }

  throw new Error(`Failed to get start day from date: ${date}`);
};

/**
 * 특정 달의 마지막 날짜를 구하는 함수
 *
 * @param {Date} date
 * @returns {Date}
 */
export const getMonthEndDate = (date: Date) => {
  if (date instanceof Date) {
    return getDate(new Date(getYear(date), getMonth(date) + 1, 0));
  }

  throw new Error(`Failed to get end date from date: ${date}`);
};

/**
 * 한 주의 시작 요일을 기준으로 특정 달이 시작하는 날짜의 index를 구하는 함수
 *
 * @param {Date} date
 * @param {number} weekStartDay 한 주의 시작 요일(0 ~ 6)
 * @returns {number} 0 ~ 6
 */
export const getMonthStartIndex = (date: Date, weekStartDay: number = 0) => {
  const startDay = getMonthFirstDay(date);

  return weekStartDay - startDay > 0
    ? 7 - (weekStartDay - startDay)
    : -(weekStartDay - startDay);
};

/**
 * 특정 달의 주 수를 구하는 함수
 *
 * @param {Date} date
 * @param {number} weekStartDay 한 주의 시작 요일(0 ~ 6)
 * @returns {number}
 */
export const getNumberOfWeeks = (date: Date, weekStartDay: number = 0) => {
  return Math.ceil(
    (getMonthStartIndex(date, weekStartDay) + getMonthEndDate(date)) / ONE_WEEK
  );
};

/**
 * 날짜를 YY-mm-dd 형태의 문자열로 변환하는 함수
 *
 * @param {Date} date
 * @returns {string} YY-mm-dd 형태의 문자열
 */
export const getDateToString = (date: Date) => {
  if (date instanceof Date) {
    return `${getYear(date)}-${(getMonth(date) + 1 + '').padStart(2, '0')}-${(
      getDate(date) + ''
    ).padStart(2, '0')}`;
  }

  throw new Error(`Failed to get date string from date: ${date}`);
};

/**
 * 주 단위의 날짜 데이터를 구하는 함수
 *
 * @param {Date} startDate 한 주의 시작날짜
 * @param {number} currentMonth 현재 달
 * @returns {{key: string, value: Date, status: MonthSatus}[]}
 */
export const getWeeklyDays = (startDate: Date, currentMonth: number) =>
  Array.from({ length: ONE_WEEK }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(getDate(startDate) + i);

    return {
      key: `${date}`,
      value: date,
      status: currentMonth === getMonth(date) ? THIS_MONTH : OTHER_MONTH,
    };
  });

/**
 * 달력에 출력될 요일 목록을 구하는 함수
 *
 * @param {number} weekStartDay 한 주의 시작 요일(0 ~ 6)
 * @returns {{ key: number, value: string }[]}
 */
export const getWeekDays = (weekStartDay: number) => {
  let newWeekDays: { key: number; value: string }[] = [];

  weekDays.forEach((day, i) => {
    const index =
      i - weekStartDay >= 0
        ? i - weekStartDay
        : weekDays.length + (i - weekStartDay);

    newWeekDays[index] = { key: i, value: day };
  });

  return newWeekDays;
};

/**
 * 특정 달의 1일 날짜를 구하는 함수
 *
 * @param {Date} date
 * @returns {Date}
 */
export const setFirstDate = (date: Date) => {
  date.setDate(1);
  return date;
};
