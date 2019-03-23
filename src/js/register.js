$(function(){

	//手机号码正则
	$('#gx-input').children().eq(0).children('input').blur(function(){
		var str = $(this).val();
		var re = /^1(3|5|7|8|9)\d{9}$/;
		var that = $(this);
		if(!re.test(str) && str !== ''){
			$(this).next().css({color : '#C8000A'}).html('请输入正确的手机号码');
		}else if(str == ''){
			$(this).next().css({color : '#C8000A'}).html('手机号码不能为空');
		}else{
			$(this).next().css({color : '#C8000A'}).html('');
		}
	})
	//图形验证码正则
	$.getJSON("../../index.json",function(data){
		var yzm = data.yzm[parseInt(randomInt(14,0))];
		$('#yzm-btn').append("<img src=" + yzm.img + ">");
		$('#gx-input').children().eq(1).children('input').blur(function(){
			var str = $(this).val().toLowerCase();
			var re = yzm.content;
			if(str !== re && str !== ''){
				$(this).next().next().css({color : '#C8000A'}).html('图形验证码错误，请重新输入');
			}else if(str == ''){
				$(this).next().next().css({color : '#C8000A'}).html('图形验证码不能为空');
			}else{
				$(this).next().next().html('');
			}
		})
		$('#gx-input').children().eq(1).children('div').click(function(){
			yzm = data.yzm[parseInt(randomInt(14,0))];
			$('#yzm-btn').children('img').attr('src',yzm.img);			
		})

	})
	//短信验证码正则
	dxYzm();
	function dxYzm(){
		var yzm = randomInt(9999,1000);
		$('#gx-input').children().eq(2).children('button').click(function(){
			alert("您的短信验证码为：" + yzm);
		})
		$('#gx-input').children().eq(2).children('input').blur(function(){
			var str = $(this).val();
			var re = /^\d{4}$/;
			if(!re.test(str) && str !== yzm && str !== ''){
				$(this).next().next().css({color : '#C8000A'}).html('手机校验码有误，请重新输入');
			}else if(str == yzm){
				$(this).next().next().html('');
			}else{
				$(this).next().next().css({color : '#C8000A'}).html('请输入手机效验码');
			}
		})

	}
	//注册密码正则
	$('#gx-input').children().eq(3).children('input').blur(function(){
		var str = $(this).val();
		var re = /^.{6,12}$/;
		if(!re.test(str) && str !== ''){
			$(this).next().css({color : '#C8000A'}).html('请输入6-12位由字母和数字组合成的登录密码');
		}else if(str == ''){
			$(this).next().css({color : '#C8000A'}).html('请输入密码');
		}else{
			$(this).next().css({color : '#C8000A'}).html('');
		}
	})
	//注册按钮事件
	function submit(){
		$('#gx-input').children().eq(6).children('input').on('click',function(){
			var user = $('#gx-input').children().eq(0).children('input').val();
			var photoYZM = $('#gx-input').children().eq(1).children('input').val();
			var DXYZM = $('#gx-input').children().eq(2).children('input').val();
			var passWord = $('#gx-input').children().eq(3).children('input').val();
			//i选项
			var userI = $('#gx-input')
			if($('#user-i').html() == '' && user != ''){
				if($('#PYZM-i').html() == '' && photoYZM != ''){
					if($('#DXYZM-i').html() == '' && DXYZM != ''){
						if($('#password-i').html() == '' && passWord != ''){
							if($('#input-checkbox').prop('checked') == true){
								var cookieStr = $.cookie('user') ? $.cookie('user') : '';
								var cookieObj = convertCookieStrToCookieObj(cookieStr);
								if(user in cookieObj){
									//有
									$('#gx-input').children().eq(0).children('i').css({color : '#C8000A'}).html('手机号码已注册，请换个号码再试');
								}else{
									//没有，则将商品加入对象中
									cookieObj[user] = {
										"id" : user,
										"password" : passWord
									}
									$.cookie('user',JSON.stringify(cookieObj),{expires : 7,path : '/'});
									location.href = '../pages/reigster.sucess.html?name=' + user;
								}
							}else{
								$('#agree-xy').css('display','inline-block');
							}
						}else{
							$('#gx-input').children().eq(3).children('i').css({color : '#C8000A'}).html('请输入密码');
						}
					}else{
						$('#gx-input').children().eq(2).children('i').css({color : '#C8000A'}).html('请输入手机效验码');
					}
				}else{
					$('#gx-input').children().eq(1).children('i').css({color : '#C8000A'}).html('图形验证码不能为空');
				}
			}else{
				$('#gx-input').children().eq(0).children('i').css({color : '#C8000A'}).html('手机号码不能为空');
			}


		})		
	}
	submit();
})

//随机数字
function randomInt(max,min){
	return Math.floor(Math.random() * (max - min + 1) + min);
}
//将cookie字符串转成cookie对象
function convertCookieStrToCookieObj(cookieStr){
	if(!cookieStr){
		return {};
	}
	return JSON.parse(cookieStr);
}
