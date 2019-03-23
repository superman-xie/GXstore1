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
//获取get
function GetQueryString(name)
{
	 var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	 var r = window.location.search.substr(1).match(reg);
	 if(r!=null)return  unescape(r[2]); return null;
}
//获取头部登录信息
function headerUser(){
	var user = GetQueryString('name');
	if(user !== null){
		$('#header-user-p').html('Hi ，').append('<i>' + user + '</i>');
	$('#header-user-p').next().html('消息 0');
	$('#header-user-p').next().next().html('退出');		
	}
}