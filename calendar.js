// 달력 생성 메서드, 초기에 한번 실행되고, changeCalendar 함수 내부에서도 실행
function createCalendar(){
	// 선택 날짜에서 년, 월 데이터만 추출
	const year = selectDay.getFullYear();
	const month = selectDay.getMonth();
	
	// 날짜 제목 바꿔주는 부분
	document.getElementById('calendarTitle').innerHTML = year + '년 ' + ( (month <= 8) ? '0' : '') + (month+1) + '월';
	
	// 달력 초기화(년, 월을 바꾸었을 때 이전 달력을 지워주는 역할)
	Calendar.innerHTML = '';
	
	// 주, 0번째로 초기화, 달력 제작시 토요일을 마지막으로 1씩 증가하는 필드
	let week = 0;
	
	// week div를 생성
	pushWeekDiv();
	
	// 제목 필드 추가)
	pushDayDiv('name', 'SUN', week);
	pushDayDiv('name', 'MON', week);
	pushDayDiv('name', 'TUE', week);
	pushDayDiv('name', 'WED', week);
	pushDayDiv('name', 'THU', week);
	pushDayDiv('name', 'FRI', week);
	pushDayDiv('name', 'SAT', week++);
	// 토요일 뒤엔 1번째 week에 추가해야하기 때문에 후위연산으로 1 증가
	
	// 선택된 년,월의 1일을 Date 형식으로 변환
	const firstDate = new Date(year, month, 1);
	
	// 선택된 년,월의 마지막날을 Date 형식으로 변환
	const lastDate = new Date(year, month+1, 0);
	
	// 마지막 날짜의 일 데이터
	const lastDateNum = lastDate.getDate();
	
	// 지난달 데이트(이번달 1일 전엔 지난달 데이터가 들어가야 해서 추출)
	const lastMonth = new Date(year, month, 0);
	
	// {0 : 일, 1 : 월, 2: 화, 3 : 수, 4 : 목, 5 : 금, 6 : 토}
	const firstDay = firstDate.getDay();	// 이달의 1일 요일 정보
	const lastDay = lastDate.getDay();		// 이달의 말일 요일 정보
	
	// 이번달 달력에 들어갈 지난달 시작일 (지난달 날짜 - 이번달 첫쨋날 요일 -1)
	let lastMonthLastDay = lastMonth.getDate() - (firstDay - 1);
	
	// 요일 데이터, 수시로 바뀌는 필드
	let index = firstDay;
	
	// week 생성
	pushWeekDiv();
	
	// 달력에 지난달 데이터 넣는 부분
	for(let i = 0; i < firstDay; i++){
		pushDayDiv('beforeDay', lastMonthLastDay++, week);
	}
	
	// 달력에 이번달 데이터 넣는 부분
	for(let day = 1; day <= lastDateNum; day++){
		// 달력 날
		if(index === 0){
			pushWeekDiv();
			week++;
		}
		pushDayDiv('activeDay', day, week);
		index = index === 6 ? 0 : index + 1;
	}
	
	// 다음달 1일 데이터
	let afterDay = 1;

	// 달력에 다음달 데이터 넣는 부분	
	for(let i = (lastDay + 1); i <= 6; i++){
		// 끝
		pushDayDiv('afterDay', afterDay++, week);
	}
	
	// 이번달 날짜 클릭 이벤트
	createSelectFunc();
	changeDivColor(startDay, endDay);
}

// week div를 생성해주는 함수, createCalendar 내부에서 사용
function pushWeekDiv(){
	let weekBox = document.createElement('div');
	weekBox.setAttribute('class', 'week');
	Calendar.appendChild(weekBox);
}

// 날짜 하나의 div를 생성해주는 함수, week 인덱스 번호가 필요하고, createCalendar 내부에서만 사용
function pushDayDiv(className, text, week){
	let dayBox = document.createElement('div');
	dayBox.setAttribute('class', className);
	dayBox.innerHTML = '<span>' + text + '</span>';
	Calendar.children[week].appendChild(dayBox);
	
}

// ◀ ▶ 를 눌렀을 때 달력을 바꿔주는 함수, 버튼에 onclick으로 지정되어있음 
function changeCalendar(where){
	selectDay = new Date(selectDay.setMonth(selectDay.getMonth() + where));
	createCalendar();
}