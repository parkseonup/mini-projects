# mini-projects

React로 하는 미니 프로젝트

## 프로젝트 구성

- [Simple Counter](###_Simple_Counter)
- [Valid Palindrome](###_Valid_Palindrome)
- [Calendar](###_Calendar)
- Date Picker (예정)
- Login/Join (예정)

### Simple Counter

1초에 1점씩 올라가고, 원하는 값(1, 10, 100)만큼 추가하고 뺄 수 있는 카운터

### Valid Palindrome

입력된 문자가 펠린드롬인지 체크해주는 폼

### Calendar

[토스ㅣSLASH 22 - Effective Component 지속 가능한 성장과 컴포넌트](https://www.youtube.com/watch?v=fR8tsJ2r7Eg) 영상에서 아래 사진을 보고 내부 소스를 유추 및 응요하여 만들어본 calendar

![image](https://github.com/all-practice/mini-projects/assets/76897813/362d4473-71d3-47ca-92ed-14cea197063f)

#### `useCalendar()` 참고 조건

- 2\*2 배열로 데이터를 반환할 것 (date 객체)
- 특정 달의 데이터를 보여줘야 하기 때문에 오늘 날짜를 함께 추상화할 것
