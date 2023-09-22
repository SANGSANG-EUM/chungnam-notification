/**
 * [공통] 모바일 브라우저 100vh 해결
 */
const mobileHeight = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });
}

/**
 * [메인] 풀페이지
 */
const mainFullPage = () => {
  $('#main').fullpage({
    anchors: ['page1', 'page2', 'page3', 'page4', 'page5'],
    autoScrolling:true,
    //navigation: true,
    showActiveTooltip: false,
    responsiveWidth: 1025,
    onLeave: function(anchorLink, index){
      let winW = $(window).outerWidth();

      $(window).on('resize',function(){
        winW = $(window).outerWidth();
      });

      if(winW >= 1025){ // 1025 이상일 떄
        if(index == 2 || index == 4 || index == 5){
          $('#header').addClass('white');
        }else{
          $('#header').removeClass('white');
        }
      }else{ // 1025 미만일 때
        $(window).scroll(function(){
          var scroll = $(window).scrollTop();
          if (scroll > 1) {
            $('#header').addClass('white mo');
          }
          else{
            $('#header').removeClass('white mo');
          }
        });    
      }
    }
  });
}

  // [plugin-Swiper] main visual
  const mainVisualTimebar = (state) => {
    if (state == 'init') {
      $(".main_visual_time .bar span").stop().css({"width":"0"});
    } else if (state == 'ing') {
      $(".main_visual_time .bar span").stop().animate({width: "100%"}, 5000);
    } else {
      $(".main_visual_time .bar span").stop().css({"width":"0"});
    }
  }

/**
 * [메인] 메인 비주얼 슬라이드
 */
const mainVisualSlide = () => {
  let mvSwiper = new Swiper('.main_visual',{
    slidesPerView : 1, // 한 슬라이드에 보여줄 갯수
    loop : true,   // 슬라이드 반복 여부
    loopAdditionalSlides : 1,
    autoplay: {     //자동슬라이드 (false-비활성화)
      delay: 5000, // 시간 설정
      disableOnInteraction: false, // false-스와이프 후 자동 재생
    },
    pagination: {
      el: ".main_slide_control .swiper-pagination",
      type: "fraction",
    },
    on: {
      init: function () {
        mainVisualTimebar('ing')
      },
      slideChangeTransitionEnd: function () {
        mainVisualTimebar('init')
        mainVisualTimebar('ing')
      },
    },
  });

  let mainVisualStopBtn = $(".mv_stop");

  mainVisualStopBtn.on("click", function(){
    if($(this).hasClass('on')){
      $(this).removeClass('on');
      mainVisualTimebar('ing');
      mvSwiper.autoplay.start();
      $(this).find('img').attr('src','/source/img/icon-stop.png');
    }else{
      $(this).addClass('on');
      mainVisualTimebar('init')
      mvSwiper.autoplay.stop();
      $(this).find('img').attr('src','/source/img/icon-play.png');
    }
  });
}

/**
 * [메인] 컨텐츠 영역 마우스 오버
 */
const mainContentList = () => {
  let item = $('.main_contents_list_item ');
  let itemImg = $('.main_contents_img');

  item.on('mouseover',function(){
    item.removeClass('active');
    $(this).addClass('active');
    let th = $(this).index();
    itemImg.hide();
    itemImg.eq(th).show();
  });
}

/**
 * [푸터] 관련 사이트 슬라이드
 */
const ftRelationSlide = () => {
  let ftSwiper = new Swiper('.relation_slide_list',{
    slidesPerView : 1, // 한 슬라이드에 보여줄 갯수
    loop : true,   // 슬라이드 반복 여부
    loopAdditionalSlides : 1,
    autoplay: {     //자동슬라이드 (false-비활성화)
      delay: 3000, // 시간 설정
      disableOnInteraction: false, // false-스와이프 후 자동 재생
    },
    navigation: {
      nextEl: ".relation_slide_next",
      prevEl: ".relation_slide_prev",
    },
    breakpoints: {
      420: {
        slidesPerView : 2,
      },
      767: {
        slidesPerView : 4,
      },
      1023: {
        slidesPerView : 5,
      },
      1290: {
        slidesPerView : 7,
      },
    },
  });
}

/**
 * [공통] 탑버튼 위로가기
 */
const topBtnFunc = () => {
  $('.top-btn').on('click',function(){
    $('html, body').animate({
      scrollTop : 0
    }, 400);
  });
}

const allMenuBtn = () => {
  let menuBtn = $('.menu-btn');
  menuBtn.on('click',function(){
    if($(this).hasClass('open')){
      $(this).removeClass('open');
    }else{
      $(this).addClass('open');
    }
  });
}

const moPlusBtn = () => {
  let moBtn = $('.mo_bottom_plus');
  let hiddenMenu = $('.mo_bottom_hide_menu');
  let moTopBtn = $('.mo_top_btn');

  //moTopBtn.css({'opacity':'0'});
  //$(window).scroll(function(){
  //  let scroll = $(window).scrollTop();
  //  if (scroll > 1) {
  //    moTopBtn.css({'opacity':'1'});
  //  }
  //  else{
  //    moTopBtn.css({'opacity':'0'});
  //  }
  //});

  moBtn.on('click',function(){
    if($(this).hasClass('open')){
      $(this).removeClass('open');
      hiddenMenu.removeClass('open');
      moTopBtn.removeClass('hide');
    }else{
      $(this).addClass('open');
      hiddenMenu.addClass('open');
      moTopBtn.addClass('hide');
    }
  });
}

// document ready
$(document).ready(function(){
  mobileHeight();
  mainFullPage();
  mainVisualSlide();
  mainContentList();
  ftRelationSlide();
  topBtnFunc();
  allMenuBtn();
  moPlusBtn();
}); // document ready end