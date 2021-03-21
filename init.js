// 선택된 날짜, 초기값은 오늘 날짜고 수시로 바뀌는 데이터
var selectDay = new Date();

// 달력이 생성되는 위치
var Calendar = document.getElementById('calendar');

// 초기 달력 생성하는 메서드
createCalendar();