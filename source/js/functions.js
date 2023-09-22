// 숫자가 10보다 작을 경우 앞에 0을 추가
const addZero = num =>  num < 10 ? '0' + num : num;

//날짜 형식 변경 함수 (날짜데이터, 구분자)
const formatDate = (pDateString, pDelimiter) => {
  let delimiter = pDelimiter ? pDelimiter : '-';
  let formattedDate = "";
  if (!pDateString) {
    console.error('Date data is empty.');
    formattedDate = `0000${delimiter}00${delimiter}00`;
  } else {
    let dateObj = new Date(pDateString);
    let year = dateObj.getFullYear();
    let month = dateObj.getMonth() + 1;
    let day = dateObj.getDate();
    
    formattedDate = `${year}${delimiter}${addZero(month)}${delimiter}${addZero(day)}`;
  }

  return formattedDate;
}

//Tab버튼
const tabAddOnClass = (element, callback) => {
  const buttons = element.closest(".tabs").querySelectorAll('.tabs-btn');

  buttons.forEach(button => {
    button.classList.remove('on');
  });

  element.classList.add('on');

  if (typeof callback === 'function') {
    callback();
  }
}

/* > tabAddOnClass 예시 : 탭버튼 클릭시 data-id와 동일한 id를 가진 태그에 on 클래스 추가
const tabButtons = document.querySelectorAll('.tab-btn');
tabButtons.forEach(button => {
  button.addEventListener('click', function() {
    let contentID = button.getAttribute("data-id");
    
    tabAddOnClass(this, function(){
      $(`#${contentID}`).addClass('on').siblings().removeClass('on');
    });
  });
});
*/

// [plugin-lenis] scroll animation
/* 
  - 홈페이지 전체 부드러운 스크롤 적용하려면 주석 해제
  - 기본 스크롤에 영향을 미치므로 따로 스크롤이 있는 요소는 data-lenis-prevent 속성 추가
const lenis = new Lenis()
function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)
*/

// [plugin-mCustomScrollbar]
const mcScrollbar = (target_id) => {
  let $target = $(`#${target_id}`);
  if($target.length > 0){
    $target.mCustomScrollbar({
      theme:"minimal",
      setTop: 0,
      axis: "y",
      alwaysShowScrollbar: 1
    });
  }
}

$(document).ready(function(){
  // [plugin-Match Height]
  if($(".match-height").length > 0){
    $(".match-height > *").matchHeight();
  }

  // [plugin-NiceSelect]
  if($(".nc-sel").length > 0){
    const $ncSelect = $(".nc-sel");

    $ncSelect.each(function(){
      $(this).niceSelect();
    })
  }

  // [plugin-AOS]
  AOS.init();
}); //End Document