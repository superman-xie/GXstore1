$(function(){
  var mySwiper = new Swiper ('.swiper-container', {
    loop: true, // 循环模式选项
    effect : 'fade',
    fadeEffect: {
    crossFade: false,
    },
    autoplay: {
    delay: 4000,
    stopOnLastSlide: false,
    disableOnInteraction: true,
    },
    // 如果需要分页器
    pagination: {
		el: '.swiper-pagination',
		clickable :true,
	},
    
    // 如果需要前进后退按钮
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
      hideOnClick : true,
    },
  })
  mySwiper.el.onmouseover = function(){
	mySwiper.navigation.$nextEl.removeClass('hide');
	mySwiper.navigation.$prevEl.removeClass('hide');
  	mySwiper.autoplay.stop();
  }
  mySwiper.el.onmouseout = function(){
	mySwiper.navigation.$nextEl.addClass('hide');
	mySwiper.navigation.$prevEl.addClass('hide');
  	mySwiper.autoplay.start();
  }
  $('.swiper_btn').children().css({color : '#323232'});
})
