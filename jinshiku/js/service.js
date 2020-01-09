$(document).ready(function(){
	//登陆退出
	var href = location.href;
	var dataC = localStorage.getItem("GHY_login");
	if (dataC != null) {
		var dataInfo = JSON.parse(dataC);
		$('#loginBtn').text(dataInfo.username);
		$("#regBtn").on("click",function(){
			localStorage.removeItem("GHY_login");
			window.location.reload();
		}).text("退出")
		
	} else {
		$('#loginBtn').click(function() {
			location.href = "./innerLogin.html?href=" + href + "";
		}).text("登录");
		$("#regBtn").on("click",function(){
			location.href = "http://www.eqidd.com/html/reg.html?href=" + href + "";
		}).text("注册")
	}
	// 加载尾部
	setTimeout(function() {
		$('#footer').load("../html/footer.html");
	}, 500);
	
})