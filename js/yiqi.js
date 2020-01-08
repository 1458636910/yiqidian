
$(document).ready(function() {
	$(".footerpage").load("http://www.eqidd.com/footer.html");
		
	$('.ckkj').click(function(){
		window.open("http://www.eqidd.com/makerSpace/innerLogin.html?href=http://www.eqidd.com/makerSpace/index.html");
	});
	$('#regBtn').click(function(){
		window.open("http://www.eqidd.com/html/reg.html?href=http://yiqixue.eqidd.com/");
	});
	
	//登陆退出
	// 	var href = location.href;
	// 	var dataC = localStorage.getItem("GHY_login");
	// 	if (dataC != null) {
	// 		var dataInfo = JSON.parse(dataC);
	// 		//console.log(dataInfo);
	// 		$('.listd').text(dataInfo.username);
	// 		 $('.publish').click(function(){
	// 			window.open("http://www.eqidd.com/makerSpace/writeCircle.html?source=0%userGuid" + dataInfo.Guid + "&companyId=" + dataInfo.companyId);
	// 		});
	// 		if (dataInfo.iphoto == "http://47.94.173.253:8008") {
	// 
	// 		} else {
	// 			$('#pics').attr("src", dataInfo.iphoto);
	// 		};
	// 		$('#loginBtn').text(dataInfo.username);
	// 		$("#regBtn").on("click", function() {
	// 			localStorage.removeItem("GHY_login");
	// 			window.location.reload();
	// 		}).text("退出");
	// 		var flag2 = 0;
	// 		$("#loginBtn").on("click", function() {
	// 			if (flag2 == 0) {
	// 				$(".userOption").show("500");
	// 				flag2 = 1;
	// 			} else {
	// 				$(".userOption").hide("500");
	// 				flag2 = 0;
	// 			}
	// 		});
	// 		$(".userOption").on("click", function() {
	// 			window.open("http://www.eqidd.com/createrSpace/html/personInfo.html");
	// 		})
	// 	} else {
	// 		$('#loginBtn').click(function() {
	// 			location.href = "./innerLogin.html?href=" + href + "";
	// 		}).text("登录");
	// 		$("#regBtn").on("click", function() {
	// 			location.href = "http://www.eqidd.com/html/reg.html?href=" + href + "";
	// 		}).text("注册")
	// 	};
		
		//右侧导航栏
		$(".downLoad").hover(function() {
			layer.tips("点我进入APP下载页", ".downLoad", {
				tips: [4, "black"]
			})
		}, function() {
			layer.closeAll("tips")
		});
		
		$(".callBack").hover(function() {
			layer.tips("点我进行反馈", ".callBack", {
				tips: [4, "black"]
			})
		}, function() {
			layer.closeAll("tips")
		});
		
		$(".publicNum").hover(function() {
			layer.tips('<img src="img/10.jpg" alt="" id="weChatImg"><p id="fouceWechat">关注公众号</p>', ".publicNum", {
				tips: [4, "black"],
				area: ["108px", "110px"]
			})
		}, function() {
			layer.closeAll("tips")
		});
		
		
		$(".leaveMsg").hover(function() {
			layer.tips("QQ727024586<br/>QQ906091920<br/>QQ24961158", ".leaveMsg", {
				tips: [4, "black"]
			})
		}, function() {
			layer.closeAll("tips")
		});
		$(".contact").hover(function() {
			layer.tips("150-9313-5492", ".contact", {
				tips: [4, "black"]
			})
		}, function() {
			layer.closeAll("tips")
		});
		
		$('.goTop').hover(function() {
			layer.tips('回到顶部', '.goTop', {
				tips: [4, 'black']
			});
		}, function() {
			layer.closeAll('tips')
		});
		
		$(window).scroll(function() {
			if ($(window).scrollTop() > 0) {
				$('.goTop').fadeIn()
			} else {
				$('.goTop').fadeOut()
			}
		})
		
		$(".goTop").on("click", function() {
			$('body,html').animate({
				scrollTop: 0
			}, 500);
		});

 
    var navLi = $('.nav ul li'); //导航html对象
  var windowUrl  = window.location.href; //获取当前url链接
  var sa = windowUrl.split("/", 5);//分割url
  var scs = sa[3];//瞎起变量
  navLi.each(function() {
	var t = $(this).find('a').attr('href');
	if (t == scs) {			
	$(this).find('a').addClass('on'); //添加当前位置样式  
	}
  });
	  

//Demo
layui.use('form', function() {
	var form = layui.form;
	//监听提交
	form.on('submit(formDemo)', function(data) {
		return false;
	});
});
// $('#station_1').css('color', '#F29954');
$(".look").each(function() {
	$(this).bind("click", function() {
		// 处理逻辑
		if ($(this).val() == '查看') {
			$(this).css('color', '#F29954').val('收起');
			$(this).parent().next().show(300);
		} else {
			$(this).css('color', '#000').val('查看');
			$(this).parent().next().hide(300);
		}
	});
});
		//导航部分弹框
		$('.develop').click(function(){
			layer.msg('正在开发中,敬请期待...', {
				time: 1000,
			});
		});
    });
