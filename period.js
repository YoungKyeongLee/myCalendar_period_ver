var startDay = '';
var endDay = '';
// 클릭 함수 생성
function createSelectFunc(){
	// 이번달 날짜 데이터 div만 가져오기
	let dateBunch = document.querySelectorAll('.week .activeDay');
	
	// click 이벤트 입히기
	for(let i = 0; i < dateBunch.length; i++)
		dateBunch[i].addEventListener('click', clickDate);
	
}

// 선택 날짜
function clickDate(event){
	// 클릭한 부분이 div 박스인지 숫자가 적힌 span 박스인지 구분하여 select에 넣어주기
	let select = ''
	if(event.target.className !== 'activeDay') select = event.target;
	else select = event.target.children[0];
	
	// selectDay는 현재 달력날짜 전역변수
	const year = selectDay.getFullYear();
	const month = selectDay.getMonth();
	
	// 사용자가 클릭한 날짜
	const day = select.innerHTML;
	
	// 시작날짜와 끝날짜 둘 다 값이 있을 때
	if(startDay !== '' && endDay === ''){
		// 사용자가 클릭한 날짜를 date형식으로 바꾸어줌
		let tmp = new Date(year, month, day);
		
		// 선택날짜가 시작 날보다 크다면 끝 날짜에 선택한 날짜 바로 대입
		if(tmp >= startDay) endDay = tmp;
		else { // 그렇지 않다면 시작날짜 값을 끝 날짜에 옮겨주고, 선택날짜를 시작날짜로 대입
			endDay = startDay;
			startDay = tmp;
		}
	} else{ // 둘 중하나라도 값이 없거나 초기상태일 때
		// 시작날짜에 먼저 값을 넣고 끝 날짜는 빈값으로 만들어준다.
		startDay = new Date(year, month, day)
		endDay = '';
	}
	
	// 선택날짜를 글로 나타내는 부분
	createSelectDiv();
}

// 전역으로 선택되어있는 시작날짜와 끝날짜를 글로 나타내주는 함수
function createSelectDiv(){
	let period = document.getElementById('period');
	period.children[0].innerHTML = startDay !== '' ? formatDate(startDay) : '';
	period.children[2].innerHTML = endDay !== '' ? formatDate(endDay) : '';
	
	// 글로 나타낸 후, 범위 안의 날짜에 해당하는 div 박스의 색상을 바꾸어주는 함수
	changeDivColor(startDay, endDay);
}

// 날짜 범위 안의 div 박스의 색상을 바꾸어주는 함수
function changeDivColor(startDay, endDay){
	// 이달의 날짜 div들을 가지고 온다.
	let dateBunch = document.querySelectorAll('.week .activeDay');
	// 시작날이 체크되어있는지 확인
	let checkSday = startDay !== '';
	// 끝 날이 체크되어있는지 확인
	let checkEday = endDay !== '';
	
	// 현재 달력 날짜의 년, 월
	let selectYear = selectDay.getFullYear();
	let selectMonth = selectDay.getMonth();
	
	// 시작 날짜의 년, 월
	let startYear = checkSday ? startDay.getFullYear() : '';
	let startMonth = checkSday ? startDay.getMonth() : '';
	
	// 끝 날짜의 년, 월
	let endYear = checkEday ? endDay.getFullYear() : '';
	let endMonth = checkEday ? endDay.getMonth() : '';
	
	// 시작 날짜가 이달 날짜인지 확인
	let checkSthisMonth = checkSday && (selectYear === startYear) && (selectMonth === startMonth);
	// 끝 날짜가 이달 날짜인지 확인
	let checkEthisMonth = checkEday && (selectYear === endYear) && (selectMonth === endMonth);
	// 현재 범위 안에 들어가는 지
	let checkPeriod = checkSday && checkEday && (selectYear >= startYear) && (selectYear <= endYear) && (selectMonth >= startMonth) && (selectMonth <= endMonth);
	
	// 달력 날짜의 마지막 일
	let curentLastDay = new Date(selectYear, selectMonth + 1, 0).getDate();
	// 색상 입히기 시작하는 박스 번호, 달력의 날짜가 시작날짜와 년,월이 같다면 오늘 일, 달력 년,월이 시작~끝 날짜 범위에 해당한다면 1일, 아니면 0
	let startNum = checkSthisMonth ? startDay.getDate() : (checkPeriod ? 1 : 0);
	// 색상 입히기 시작하는 박스 번호, 달력의 날짜가 끝날짜와 년,월이 같다면 오늘 일, 달력 년,월이 시작~끝 날짜 범위에 해당한다면 마지막날, 아니면 0
	let endNum = checkEthisMonth ? endDay.getDate() : (checkPeriod ? curentLastDay : 0);
	
	// 달력의 시작일부터 마지막 날까지 반복문
	for(let i = 1; i <= curentLastDay; i++){
		// 날짜가 시작 또는 끝 날짜 하나만 선택되어있거나, 범위 안에 들어간다면 색상 바꾸어준다.
		if(i == startNum || i == endNum || (i >= startNum && i <= endNum)){
			dateBunch[i-1].style.backgroundColor = 'red';
		} else { // 그렇지 않다면 원래 색상으로
			dateBunch[i-1].style.backgroundColor = '#F6F6F6';
		}
	}
		
}

// 날짜 함수를 YYYY-MM-DD 형식으로 바꾸어준다.
function formatDate(thisDate){
	const year = thisDate.getFullYear();
	const month = 1 + thisDate.getMonth();
	const day = thisDate.getDate();
	
	return year + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;
}