$(function(){
	
	//获取图形验证码
		$.getJSON("../../index.json",function(data){
		var yzm = data.yzm[parseInt(randomInt(14,0))];
		console.log(data);
		$('#from-yzm-btn').append("<img src=" + yzm.img + ">");
		$('#from-centent-loginbtn').click(function(){
			var str = $('#from-yzm').val().toLowerCase();
			var re = yzm.content;
			var cookieStr = $.cookie('user') ? $.cookie('user') : '';
			var cookieObj = convertCookieStrToCookieObj(cookieStr);
			var loginUser = $('#login-user').val();
			if(loginUser === '' && $('#login-password').val() == ''){
				$('#login-erro').css('display','block').html('用户名密码必须填写');
			}else{
				if(str !== re){
				$('#login-erro').css('display','block').html('验证码不正确。');
				yzm = data.yzm[parseInt(randomInt(14,0))];
				$('#from-yzm-btn').children('img').attr('src',yzm.img);
				}else if(str == re){
					if(loginUser in cookieObj){
						//有  ，账号验证
						if(loginUser != cookieObj[loginUser].id){
							//账号错误
							$('#login-erro').css('display','block').html('账号有误请重新输入');
						}else if(loginUser == cookieObj[loginUser].id){
								//账号正确，密码验证
							if($('#login-password').val() != cookieObj[loginUser].password){
								$('#login-erro').css('display','block').html('密码有误请重新输入');
							}else if($('#login-password').val() == cookieObj[loginUser].password){
								location.href = '../pages/index.html?name=' + loginUser;
							}
						}
					}else{
						//账号不存在
						$('#login-erro').css('display','block').html('账号不存在');
						yzm = data.yzm[parseInt(randomInt(14,0))];
						$('#from-yzm-btn').children('img').attr('src',yzm.img);
					}
				}
			}

		})
		$('#from-yzm-btn').click(function(){
			yzm = data.yzm[parseInt(randomInt(14,0))];
			$('#from-yzm-btn').children('img').attr('src',yzm.img);			
		})
	})
})