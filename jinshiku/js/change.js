var http_head = "http://47.94.173.253:8008";
// 发布需求
var dataC = localStorage.getItem("GHY_login");
// 易企购易企聘
$(".hold").on("click", function() {
	layer.msg("正在开发中，敬请期待。")
});
var user = localStorage.getItem("GHY_login");
if(dataC!=null){
	var flag2 = 0;
	$("#loginBtn").on("click", function () {
			if (flag2 == 0) {
				$(".userOption").show("500");
				$(".userOption1").show("500");
				flag2 = 1;
			} else {
				$(".userOption").hide("500");
				$(".userOption1").hide("500");
				flag2 = 0;
			}
		});
		$(".userOption").on("click", function () {
			var this_userGuid = JSON.parse(user).Guid;
			var this_companyId = JSON.parse(user).companyId;
			window.open("http://www.eqidd.com/makerSpace/index.html?userGuid=" + this_userGuid + "&companyId=" + this_companyId);
		});
		$(".userOption1").on("click", function () {
			var this_userGuid = JSON.parse(user).Guid;
			var this_companyId = JSON.parse(user).companyId;
			window.open("http://www.eqidd.com/html/M_index.html");
		});
}
// 创客空间跳转
$(".gock").on("click", function() {
	if (dataC) {
		var this_userGuid = JSON.parse(dataC).Guid;
		var this_companyId = JSON.parse(dataC).companyId;
		window.open("http://www.eqidd.com/makerSpace/index.html?userGuid=" + this_userGuid + "&companyId=" + this_companyId);
		localStorage.setItem("GHY_maker", dataC)
	} else {
		layer.msg("请登录", {
			time: 1200
		})
	}
});
// 易企购易企聘
$(".hold").on("click", function() {
	layer.msg("正在开发中，敬请期待。")
})
$("#demandBtn").on("click", function() {
	if (dataC) {
		window.open("addDemand.html")
	} else {
		layer.msg("请登录", {
			time: 1200
		})
	}
})
$(".demandBtn2").on("click", function() {
	if (dataC) {
		window.open("addDemand.html")
	} else {
		layer.msg("请登录", {
			time: 1200
		})
	}
})
$("#sendDemand").on("click", function() {
	if (dataC) {
		window.open("addDemand.html")
	} else {
		layer.msg("请登录", {
			time: 1200
		})
	}
});
$("#sendAdDemand").on("click", function() {
	if (dataC) {
		window.open("addAdDemand.html")
	} else {
		layer.msg("请登录", {
			time: 1200
		})
	}
});
$("#sendCourse").on("click", function() {
	if (dataC) {
		var this_userGuid = JSON.parse(dataC).Guid;
		var this_companyId = JSON.parse(dataC).companyId;
		window.open("http://www.eqidd.com/makerSpace/addTeacherCourse.html?userGuid=" + this_userGuid + "&companyId=" + this_companyId);
	} else {
		layer.msg("请登录", {
			time: 1200
		})
	}
});
$(document).ready(function() {
	
	$("#download1").hover(function() {
		$('.downloadImg').slideDown(300)
	}, function() {
		$('.downloadImg').slideUp(300)
	});
	// 底部样式和右侧
    $(".foot").load("http://www.eqidd.com/footer.html?v=" + Math.random());
	// 鼠标移入移出
	$(".mainFountion li a").wrapInner('<span class="out"></span>');
	$(".mainFountion li a").each(function() {
		$('<span class="over">' + $(this).text() + '</span>').appendTo(this);
	});

	$(".mainFountion li a").hover(function() {
		$(".out", this).stop().animate({
			'top': '40px'
		}, 300);
		$(".over", this).stop().animate({
			'top': '0px',
		}, 300);

	}, function() {
		$(".out", this).stop().animate({
			'top': '0px'
		}, 300);
		$(".over", this).stop().animate({
			'top': '-40px',
		}, 300);
	});
	// 搜索条件
	$(".more").on("click", function() {
		flag = $(this).attr("flag");
		if (flag == 0) {
			$(this).parent("dl").parent("li").animate({
				height: "75px"
			}, "slow", "swing", function() {
				$(this).children("dl").children("span").text("收起>>")
			}).show();

			$(this).attr("flag", "1")
		} else {
			$(this).parent("dl").parent("li").animate({
				height: "40px"
			}, "slow", "swing", function() {
				$(this).children("dl").children("span").text("更多>>")
			});
			$(this).attr("flag", "0")
		}
	});
	// 搜索条件
	$(".moresp").on("click", function() {
		flag = $(this).attr("flag");
		if (flag == 0) {
			$(this).parent("dl").parent("li").animate({
				height: "136px"
			}, "slow", "swing", function() {
				$(this).children("dl").children("span").text("收起>>")
			}).show();
	
			$(this).attr("flag", "1")
		} else {
			$(this).parent("dl").parent("li").animate({
				height: "40px"
			}, "slow", "swing", function() {
				$(this).children("dl").children("span").text("更多>>")
			});
			$(this).attr("flag", "0")
		}
	});
	
	

})
