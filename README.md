# mini-projects

React로 하는 미니 프로젝트

## 프로젝트 구성

- [Simple Counter](#simple-counter)
- [Valid Palindrome](#valid-palindrome)
- [Calendar](#calendar)
- [Select Date](#select-date)
- [Sign Up](#sign-up)

### Simple Counter

1초에 1점씩 올라가고, 원하는 값(1, 10, 100)만큼 추가하고 뺄 수 있는 카운터

- [ ] 컴포넌트화 하기

### Valid Palindrome

입력된 문자가 펠린드롬인지 체크해주는 폼

- [ ] useForm 사용해서 체크해보기

### Calendar

[토스ㅣSLASH 22 - Effective Component 지속 가능한 성장과 컴포넌트](https://www.youtube.com/watch?v=fR8tsJ2r7Eg) 영상에서 아래 사진을 보고 내부 소스를 유추 및 응용하여 만들어본 calendar

![image](https://github.com/all-practice/mini-projects/assets/76897813/362d4473-71d3-47ca-92ed-14cea197063f)

- [ ] 보여주고자 하는 달을 사용자가 지정해서 전달하는 걸로 하기

### Select date

만들어둔 Calendar 컴포넌트를 사용하여 Date Picker 구현

- [ ] 여러개를 띄웠을 때 어떻게 상태관리하는지, 이걸 어떻게 추상화할지 고민해보기
- [ ] input에 직접 입력하면 달력에 그 날짜 선택되게

### Sign Up

useForm 커스텀 훅을 만들어서 Sign Up 구현

- [ ] checkPassword가 dirty일 때 password를 작성하면 checkPassword도 같이 유효성 검사

  1.  ref로 청취하기 (동등 관계로 보기)
      react-hook-form을 사용하는 사람들이 yup 라이브러리를 같이 사용해서

  2.  상속관계로 보기
      password > confirmPassword
      비밀번호 확인은 비밀번호가 있어야만 존재할 수 있음.
      때문에 수평적 관계가 아니라 자식관계로 표현되면?

- [ ] errors에 validations 속성 키가 배열로 전달되는 형태 -> 에러 메세지만 전달되는 형태로 변경. 단, 속성들간의 우선순위 설정이 필요함 (ex, require도 에러고 pattern도 에러일 때 require 메세지만 전달하는 등)
