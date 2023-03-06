// 윤년과 평년을 체크하는 함수
function checkLeapYear(year){
    if(year%400 == 0){ // 윤년일 경우
        return true;
    } else if(year%100 == 0){ // 평년의 경우   
        return false;
    } else if(year%4 == 0){ // 윤년일 경우
        return true;
    } else{  // 평년의 경우   
        return false;
    }
}

//해당 월의 1일이 무슨요일인지 찾기 
function getFirstDayOfWeek(year, month) {
    if (month < 10) { // month가 10 미만일 때, 앞에 "0"을 붙입니다.
      month = "0" + month;
    }
    return (new Date(year + "-" + month + "-" + "01")).getDay();
  }

// 사용자에 의해 년,월이 변경되었을 때  
function changeYearMonth(year, month){
    let month_day = [31,28,31,30,31,30,31,31,30,31,30,31]; // 월별 마지막 날짜
    if(month == 2){ //해당 월이 2월일 때 
        if (checkLeapYear(year)) { // 윤년이경우를 체크 
            month_day[1] = 29;
          }
    }

    let first_day_of_week = getFirstDayOfWeek(year,month) // 일요일 0 월요일 1 ... 
    let arr_calendar = [ ]; 
    for(let i = 0; i < first_day_of_week; i++){ // 1일 이전의 요일들은 빈칸으로 push
        arr_calendar.push(""); 
    }
    for(let i = 1; i<=month_day[month-1]; i++){ //해당 월의 1일부터 마지막 날짜까지 push
        arr_calendar.push(String(i));
    }

    // 해당 월의 마지막 날 이후로 요일들은 빈킨으로 push
    let remain_day = 7 - (arr_calendar.length%7); 
    if (remain_day < 7) {
        for (let i = 0; i < remain_day; i++) {
            arr_calendar.push("");      
        }
    }
    renderCalendar(arr_calendar); // 호출 
    setSelectedDateText(year, month);
}

// 실제 tbody안에 들어갈 html 
function renderCalendar(data){
    let h =[];
    for (let i = 0; i < data.length; i++) {
        if (i == 0) {
            h.push('<tr>');
        } else if (i%7 == 0){
            h.push('</tr>');
            h.push('<tr>');
        }

        h.push('<td>'+data[i]+'</td>');
    }
    h.push('</tr>');
    $("#tb_body").html(h.join(""));

    // td 요소에 클릭 이벤트 추가 (임시 클릭하면 상세 내용 표시로 변경 될 예정 )
    $('td').on('click', onDateClick);
}

// 현재 선택된 날짜 (기본값은 오늘)
let selectedDate = new Date();

// 현재 선택된 날짜를 span 태그 안에 표시
function setSelectedDateText(year, month) {
    // 클릭한 날짜의 년, 월, 일 정보는 이벤트 핸들러 onDateClick 내부에서 직접 추출
    const day = selectedDate.getDate();
    $('#selected_date').text(`${year}년 ${month}월 ${day}일`);  // 내용 추가에 표시 
    $('#calDetailsDate').text(`${year}년 ${month}월 ${day}일 내역입니다.`); // 상세보기에 표시
  }
// 클릭한 날짜를 선택된 날짜로 설정
function onDateClick(e) {
    const day = parseInt($(e.target).text());
    if (day !== NaN) {
      // 클릭한 날짜의 연도, 월, 일 정보 추출
      const year = $('#year').val();
      const month = $('#month').val();
      const date = new Date(year, month - 1, day);
  
      // 선택된 날짜 정보 업데이트
      selectedDate = date;
  
      // 선택된 날짜 정보를 표시하는 span 엘리먼트 업데이트
      setSelectedDateText(year, month);
    }
  }
  
  

  

// 초기 로딩 시에도 setSelectedDateText() 함수 호출
window.onload = function() {
    const currentYear = (new Date()).getFullYear();
    const currentMonth = (new Date()).getMonth() + 1;
    document.getElementById("year").value = currentYear;
    document.getElementById("month").value = currentMonth;
    changeYearMonth(currentYear, currentMonth);
    setSelectedDateText(currentYear, currentMonth); // 초기값으로 현재 날짜의 년, 월을 전달해줍니다.

    // +버튼 누르면 나타나게 하기 
    const addButton = document.getElementById('add-button');
    const inputForm = document.getElementById('input-form');
    const closeButton = document.getElementById('close-input-form');
    //  + 버튼을 누르면 나타나게 처리 
    addButton.addEventListener('click', () => {
      inputForm.style.display = 'block';
    });
    // 닫기 버튼을 누르면 숨김처리 
    closeButton.addEventListener('click',() => {
        inputForm.style.display = 'none';
    });

  };
  


$(function() {
    // 좌측 버튼 클릭 시
    $('#chevron-double-left').on('click', function() {
      // 현재 선택된 월 가져오기
      var currentMonth = Number($('#month').val());
      // 이전 월로 변경
      if (currentMonth > 1) {
        $('#month').val(currentMonth - 1);
      } else {
        // 1월인 경우, 12월로 변경
        $('#year').val(Number($('#year').val()) - 1);
        $('#month').val(12);
      }
      // 달력 갱신
      changeYearMonth(Number($('#year').val()), Number($('#month').val()));
    });
  
    // 우측 버튼 클릭 시
    $('#chevron-double-right').on('click', function() {
      // 현재 선택된 월 가져오기
      var currentMonth = Number($('#month').val());
      // 다음 월로 변경
      if (currentMonth < 12) {
        $('#month').val(currentMonth + 1);
      } else {
        // 12월인 경우, 1월로 변경
        $('#year').val(Number($('#year').val()) + 1);
        $('#month').val(1);
      }
      // 달력 갱신
      changeYearMonth(Number($('#year').val()), Number($('#month').val()));
    });
  });
  
 // year 혹은 month 입력 필드 값 변경 시
$('#year, #month').on('change', function () {
    const year = Number($('#year').val());
    const month = Number($('#month').val());
    changeYearMonth(year, month);
    setSelectedDateText(year, month); // year, month가 변경되면 span 태그도 함께 변경
  });


//   입력받은 값 원형태로 출력하기 