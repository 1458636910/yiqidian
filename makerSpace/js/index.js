$(".load5").css({
	"height": $(document).height()
})
localStorage.removeItem("GHY_login");
let http_head = "http://47.94.173.253:8008/";
let href = window.location.href;
let userGuid = href.split("?")[1].split("&")[0].split("=")[1];
let companyId = href.split("?")[1].split("&")[1].split("=")[1];
var phone;
setTimeout(function() {
	$.post(http_head + 'loginRecord/GetLoginRecord.ashx', {
		"userGuid": userGuid
	}, function(data) {
		var data = JSON.parse(data);
		if (data.status == 202) {
			layer.msg(data.msg, {
				"time": 2000
			});
			setTimeout(function() {
				location.href = 'innerLogin.html?href=' + href
			}, 1000);
		}
	})
}, 200);

var userPhone;
var authon
$(document).ready(function() {
	let dataPage = 0;
	$(".hr").hide();
	setTimeout(function() {
		$.post('' + http_head + 'Makerspacey/Get_MakerMenuCount.ashx?rand=' + Math.random(), {
			"userGuid": userGuid
		}, function(result) {
			result = JSON.parse(result);
			if (result.status == 200) {
				var cpcount = result.items.cpcount;
				var fkcount = result.items.fkcount;
				var lycount = result.items.lycount;
				var rzcount = result.items.rzcount;
				$('.rzcount').text(rzcount);
				$('.fkcount').text(fkcount);
				$('.lycount').text(lycount);
				$('.cpcount').text(cpcount);
			}
		});
	}, 230);
	setTimeout(function() {
		$.post('' + http_head + 'Com/User_BusinessCard.ashx?rand=' + Math.random(), {
			"userGuid": userGuid
		}, function(data) {

			var data = JSON.parse(data);
			var localObj = JSON.stringify(data.items);
			localStorage.setItem("GHY_login", localObj)
			console.log("用户", data)
			var username = data.items.upname;
			authon=data.items.authon
			var headImg;
			userPhone = data.items.uname;
			if (data.items.photo.indexOf(".jpg") > 0 || data.items.photo.indexOf(".png") > 0 || data.items.photo.indexOf(
					".jpeg") > 0) {
				// headImg ="http://47.94.173.253:8008"+data.items.photo.split("http://47.94.173.253:8008")[2];
				headImg = data.items.photo;

			} else {
				headImg = 'img/touxiang.png'
			}
			$(".uName").text(username);
			$(".yourName").val(username);
			$(".headImg").attr("src", headImg);
		})
	}, 200);
	$(function() {
		// nav收缩展开
		$('.navMenu li a').on('click', function() {
			var parent = $(this).parent().parent(); //获取当前页签的父级的父级
			var labeul = $(this).parent("li").find(">ul")
			if ($(this).parent().hasClass('open') == false) {
				//展开未展开
				parent.find('ul').slideUp(300);
				parent.find("li").removeClass("open")
				parent.find('li a').removeClass("active").find(".arrow").removeClass("open")
				$(this).parent("li").addClass("open").find(labeul).slideDown(300);
				$(this).addClass("active").find(".arrow").addClass("open")
			} else {
				$(this).parent("li").removeClass("open").find(labeul).slideUp(300);
				if ($(this).parent().find("ul").length > 0) {
					$(this).removeClass("active").find(".arrow").removeClass("open")
				} else {
					$(this).addClass("active")
				}
			}
		});
	});

	function loaddemandTable(data) {
		$('#demandTable').bootstrapTable({
			data: data,
			columns: [{
				field: 'thetheme',
				title: '主题',
				align: 'center',
				valign: 'middle',
			}, {
				field: 'theplace',
				title: '地址',
				align: 'center',
				valign: 'middle'
			}, {
				field: 'time',
				title: '时间',
				align: 'center',
				valign: 'middle',
				formatter: optiondemandFormatter
			}]
		});
		$("#demandTable").bootstrapTable('load', data);

		function optiondemandFormatter(e, value, row, index) {
			var yourtime = value.thedateEnd;
			var addSpan;
			yourtime = yourtime.replace("-", "/"); //替换字符，变成标准格式
			var d2 = new Date(); //取今天的日期
			var d1 = new Date(Date.parse(yourtime));
			if (d1 < d2) {
				addSpan = '<p><span class="adjustShow1">已结束</span></p>'
			} else {
				addSpan = '<p><span class="adjustShow">进行中</span></p>'
			}
			return ['<div class="demandsecond" id="' + value.Id + '">' + addSpan + '</div>', ].join('');
		};
	};
	$("#demandTable").on('click-row.bs.table', function(e, row, $element) {
		window.open("http://www.jinshiku.com/html/needDetails.html?id=" + row.Id + "")
	});

	// 退出
	$(".loginOut").on("click", function() {
		location.href = "innerLogin.html?href=" + href;
		localStorage.removeItem("GHY_login");
	});
	$("#dataTable").load("main.html");

	$(".main").on("click", function() {
		var html = 'main.html?v=' + Math.random();
		$("#dataTable").replaceWith('<div id="dataTable"></div>');
		$("#dataTable").load(html);

	});
	$(".xc").on("click", function() {
		var html = 'pPhotos.html?v=' + Math.random();
		$("#dataTable").replaceWith('<div id="dataTable"></div>');
		$("#dataTable").load(html);
	});
	$(".log").on("click", function() {
		var html = 'log.html?v=' + Math.random();
		$("#dataTable").replaceWith('<div id="dataTable"></div>');
		$("#dataTable").load(html);

	});
	$(".product").on("click", function() {
		var html = 'product.html?v=' + Math.random();
		$("#dataTable").replaceWith('<div id="dataTable"></div>');
		$("#dataTable").load(html);
	});
	$(".pInfo").on("click", function() {
		var html = 'pInfo2.html?v=' + Math.random();
		$("#dataTable").replaceWith('<div id="dataTable"></div>');
		$("#dataTable").load(html);

	});
	$(".pOdds").on("click", function() {
		var html = 'pOdds.html?v=' + Math.random()
		$("#dataTable").replaceWith('<div id="dataTable"></div>');
		$("#dataTable").load(html);

	});
	$(".pTrade").on("click", function() {
		var html = 'pTrade.html?v=' + Math.random()
		$("#dataTable").replaceWith('<div id="dataTable"></div>');
		$("#dataTable").load(html);

	});
	
	$(".zh").on("click", function() {
		var html = 'eb.html?v=' + Math.random()
		$("#dataTable").replaceWith('<div id="dataTable"></div>');
		$("#dataTable").load(html)
	});
	$(".pChange").on("click", function() {
		$(document).ready(function() {
			$("#dataTable").replaceWith('<div id="dataTable"></div>');
			window.open('rePassword.html?userGuid=' + userGuid + "&phone=" + userPhone + "&companyId=" + companyId);
		})
	});
	$(".changePhone").on("click", function() {
		$(document).ready(function() {
			$("#dataTable").replaceWith('<div id="dataTable"></div>');
			window.open('rePhone.html?userGuid=' + userGuid + "&phone=" + userPhone + "%companyId=" + companyId);
		})
	});
	$(".realName").on("click", function() {
		$(document).ready(function() {
			$("#dataTable").replaceWith('<div id="dataTable"></div>');
//			console.log(authon)
			if(authon==1){
				layer.msg('您已实名认证')
			}else{
				window.open('realName.html?userGuid=' + userGuid );
			}
		})
	});
	$(".leaveMsg").on("click", function() {
		var html = 'message.html?v=' + Math.random()
		$("#dataTable").replaceWith('<div id="dataTable"></div>');
		$("#dataTable").load(html)

	});
	$(".visitor").on("click", function() {
		var html = 'visitor.html?v=' + Math.random()
		$("#dataTable").replaceWith('<div id="dataTable"></div>');
		$("#dataTable").load(html)

	});
	$(".actPublish").on("click", function() {
		var html = 'active.html?v=' + Math.random()
		$("#dataTable").replaceWith('<div id="dataTable"></div>');
		$("#dataTable").load(html)

	});
	$(".actSign").on("click", function() {
		var html = 'activing.html?v=' + Math.random()
		$("#dataTable").replaceWith('<div id="dataTable"></div>');
		$("#dataTable").load(html)

	});
	$(".actSigned").on("click", function() {
		var html = 'actived.html?v=' + Math.random()
		$("#dataTable").replaceWith('<div id="dataTable"></div>');
		$("#dataTable").load(html)

	});
	$(".cltCom").on("click", function() {
		var html = 'actived.html?v=' + Math.random()
		$("#dataTable").replaceWith('<div id="dataTable"></div>');
		$("#dataTable").load(html)

	});
	$(".cltPdt").on("click", function() {
		var html = 'collectPdt.html?v=' + Math.random()
		$("#dataTable").replaceWith('<div id="dataTable"></div>');
		$("#dataTable").load(html)

	});
	$(".cltCourse").on("click", function() {
		var html = 'collectCourse.html?v=' + Math.random()
		$("#dataTable").replaceWith('<div id="dataTable"></div>');
		$("#dataTable").load(html)

	});
	$(".cltCk").on("click", function() {
		var html = 'collectCk.html?v=' + Math.random()
		$("#dataTable").replaceWith('<div id="dataTable"></div>');
		$("#dataTable").load(html)
	});
	$(".approve").on("click", function() {
		window.open("approve.html?userGuid=" + userGuid + "&companyId=" + companyId)
	});
	$(".advisory").on("click", function() {
		window.open("advisory.html?userGuid=" + userGuid)
	});
	$(".tg").on("click", function() {
		window.open("http://www.eqidd.com/tuiguang.html")
	});
	$(".sc").on("click", function() {
		var html = 'collectPdt.html?v=' + Math.random()
		$("#dataTable").replaceWith('<div id="dataTable"></div>');
		$("#dataTable").load(html)
	});
	$(".msq").on("click", function() {
		var html = 'msq.html?v=' + Math.random()
		$("#dataTable").replaceWith('<div id="dataTable"></div>');
		$("#dataTable").load(html)

	});
	$(".mpz").on("click", function() {
		$(document).ready(function() {
			$("#dataTable").replaceWith('<div id="dataTable"></div>');
			$("#dataTable").load('mpz.html')
		})
	});
	$(".mkq").on("click", function() {
		$(document).ready(function() {
			$("#dataTable").replaceWith('<div id="dataTable"></div>');
			$("#dataTable").load('mkq.html')
		})
	});
	$(".oneself").on("click", function() {
		$(document).ready(function() {
			$("#dataTable").replaceWith('<div id="dataTable"></div>');
			$("#dataTable").load('oneself.html')
		})
	});
	$(".myrz").on("click", function() {
		$(document).ready(function() {
			$("#dataTable").replaceWith('<div id="dataTable"></div>');
			$("#dataTable").load('myrz.html')
		})
	});
	$(".rzdt").on("click", function() {
		$(document).ready(function() {
			$("#dataTable").replaceWith('<div id="dataTable"></div>');
			$("#dataTable").load('rzdt.html')
		})
	});
	$(".myfb").on("click", function() {
		$(document).ready(function() {
			$("#dataTable").replaceWith('<div id="dataTable"></div>');
			$("#dataTable").load('myfb.html')
		})
	});
	$(".myzx").on("click", function() {
		$(document).ready(function() {
			$("#dataTable").replaceWith('<div id="dataTable"></div>');
			$("#dataTable").load('myzx.html')
		})
	});
	$(".myxz").on("click", function() {
		$(document).ready(function() {
			$("#dataTable").replaceWith('<div id="dataTable"></div>');
			$("#dataTable").load('myxz.html')
		})
	});
	
	$(".myyz").on("click", function() {
		$(document).ready(function() {
			$("#dataTable").replaceWith('<div id="dataTable"></div>');
			$("#dataTable").load('myyz.html')
		})
	});
	
	$(".video").on("click", function() {
		$(document).ready(function() {
			$("#dataTable").replaceWith('<div id="dataTable"></div>');
			$("#dataTable").load('video.html?v='+ Math.random())
		})
	});
	$(".wait").on("click", function() {
		layer.msg("正在开发中")
	});
	var haveArt = localStorage.getItem("article");
	if (haveArt) {
		$(".log").children("a").addClass("active").parent("li").siblings("li").children("a").removeClass("active");
		$(document).ready(function() {
			$(".main").children('a').children('img').attr("src", "img/zhuye.png");
			$("#dataTable").replaceWith('<div id="dataTable"></div>');
			$("#dataTable").load("log.html");
		})
	}
	// menu-Icon
	$(".navMenu li").on("click", function() {
		var index = $(this).index();
		localStorage.removeItem("article")
		if (index == 0) {
			$(".zz").children('a').children('img').attr("src", "img/gernedang.png");
			$(".xc").children('a').children('img').attr("src", "img/xc.png");
			$(".product").children('a').children('img').attr("src", "img/chanpin.png");
			$(".log").children('a').children('img').attr("src", "img/rihzi.png");
			$(".personal").children('a').children('img').attr("src", "img/guanli.png");
			$(".hd").children('a').children('img').attr("src", "img/huodong.png");
			$(".leaveMsg").children('a').children('img').attr("src", "img/liuyan.png");
			$(".visitor").children('a').children('img').attr("src", "img/fangke.png");
			$(".zh").children('a').children('img').attr("src", "img/gernedang.png");
			$(".tg").children('a').children('img').attr("src", "img/tuiguangfuwu.png");
			$(".sc").children('a').children('img').attr("src", "img/shoucang.png");
			$(".center").children('a').children('img').attr("src", "img/gzzx.png");
			$(".video").children('a').children('img').attr("src", "img/video.png");
			$(".ddzx").children('a').children('img').attr("src", "img/ddzx.png");
			$(this).children('a').children('img').attr("src", "img/zhuye-w.png");
		} else if (index == 1) {
			$(".zz").children('a').children('img').attr("src", "img/gernedang.png");
			$(".main").children('a').children('img').attr("src", "img/zhuye.png");
			$(".log").children('a').children('img').attr("src", "img/rihzi.png");
			$(".personal").children('a').children('img').attr("src", "img/guanli.png");
			$(".hd").children('a').children('img').attr("src", "img/huodong.png");
			$(".leaveMsg").children('a').children('img').attr("src", "img/liuyan.png");
			$(".visitor").children('a').children('img').attr("src", "img/fangke.png");
			$(".zh").children('a').children('img').attr("src", "img/gernedang.png");
			$(".tg").children('a').children('img').attr("src", "img/tuiguangfuwu.png");
			$(".sc").children('a').children('img').attr("src", "img/shoucang.png");
			$(".center").children('a').children('img').attr("src", "img/gzzx.png");
			$(".video").children('a').children('img').attr("src", "img/video.png");
			$(".ddzx").children('a').children('img').attr("src", "img/ddzx.png");
			$(".xc").children('a').children('img').attr("src", "img/xc.png");
			$(this).children('a').children('img').attr("src", "img/chanpin-w.png");
		} else if (index == 2) {
			$(".zz").children('a').children('img').attr("src", "img/gernedang.png");
			$(".main").children('a').children('img').attr("src", "img/zhuye.png");
			$(".product").children('a').children('img').attr("src", "img/chanpin.png");
			$(".personal").children('a').children('img').attr("src", "img/guanli.png");
			$(".hd").children('a').children('img').attr("src", "img/huodong.png");
			$(".leaveMsg").children('a').children('img').attr("src", "img/liuyan.png");
			$(".visitor").children('a').children('img').attr("src", "img/fangke.png");
			$(".zh").children('a').children('img').attr("src", "img/gernedang.png");
			$(".tg").children('a').children('img').attr("src", "img/tuiguangfuwu.png");
			$(".sc").children('a').children('img').attr("src", "img/shoucang.png");
			$(".center").children('a').children('img').attr("src", "img/gzzx.png");
			$(".video").children('a').children('img').attr("src", "img/video.png");
			$(".ddzx").children('a').children('img').attr("src", "img/ddzx.png");
			$(".xc").children('a').children('img').attr("src", "img/xc.png");
			$(this).children('a').children('img').attr("src", "img/rihzi-w.png");
		} else if (index == 3) {
			$(".zz").children('a').children('img').attr("src", "img/gernedang.png");
			$(".main").children('a').children('img').attr("src", "img/zhuye.png");
			$(".product").children('a').children('img').attr("src", "img/chanpin.png");
			$(".personal").children('a').children('img').attr("src", "img/guanli.png");
			$(".hd").children('a').children('img').attr("src", "img/huodong.png");
			$(".leaveMsg").children('a').children('img').attr("src", "img/liuyan.png");
			$(".visitor").children('a').children('img').attr("src", "img/fangke.png");
			$(".zh").children('a').children('img').attr("src", "img/gernedang.png");
			$(".tg").children('a').children('img').attr("src", "img/tuiguangfuwu.png");
			$(".sc").children('a').children('img').attr("src", "img/shoucang.png");
			$(".center").children('a').children('img').attr("src", "img/gzzx.png");
			$(".video").children('a').children('img').attr("src", "img/video.png");
			$(".ddzx").children('a').children('img').attr("src", "img/ddzx.png");
			$(".log").children('a').children('img').attr("src", "img/rihzi.png");
			$(this).children('a').children('img').attr("src", "img/xc-w.png");
		} else if (index == 4) {
			$(".zz").children('a').children('img').attr("src", "img/gernedang.png");
			$(".xc").children('a').children('img').attr("src", "img/xc.png");
			$(".main").children('a').children('img').attr("src", "img/zhuye.png");
			$(".product").children('a').children('img').attr("src", "img/chanpin.png");
			$(".log").children('a').children('img').attr("src", "img/rihzi.png");
			$(".personal").children('a').children('img').attr("src", "img/guanli.png");
			$(".leaveMsg").children('a').children('img').attr("src", "img/liuyan.png");
			$(".visitor").children('a').children('img').attr("src", "img/fangke.png");
			$(".zh").children('a').children('img').attr("src", "img/gernedang.png");
			$(".tg").children('a').children('img').attr("src", "img/tuiguangfuwu.png");
			$(".sc").children('a').children('img').attr("src", "img/shoucang.png");
			$(".center").children('a').children('img').attr("src", "img/gzzx.png");
			$(".video").children('a').children('img').attr("src", "img/video.png");
			$(".ddzx").children('a').children('img').attr("src", "img/ddzx.png");
			if ($(this).hasClass("open")) {
				$(this).children('a').children('img').attr("src", "img/huodong-w.png");
			} else {
				$(this).children('a').children('img').attr("src", "img/huodong.png");
			}
		} else if (index == 5) {
			$(".zz").children('a').children('img').attr("src", "img/gernedang.png");
			$(".xc").children('a').children('img').attr("src", "img/xc.png");
			$(".main").children('a').children('img').attr("src", "img/zhuye.png");
			$(".product").children('a').children('img').attr("src", "img/chanpin.png");
			$(".personal").children('a').children('img').attr("src", "img/guanli.png");
			$(".log").children('a').children('img').attr("src", "img/rihzi.png");
			$(".visitor").children('a').children('img').attr("src", "img/fangke.png");
			$(".zh").children('a').children('img').attr("src", "img/gernedang.png");
			$(".tg").children('a').children('img').attr("src", "img/tuiguangfuwu.png");
			$(".sc").children('a').children('img').attr("src", "img/shoucang.png");
			$(".hd").children('a').children('img').attr("src", "img/huodong.png");
			$(".leaveMsg").children('a').children('img').attr("src", "img/liuyan.png");
			$(".center").children('a').children('img').attr("src", "img/gzzx.png");
			$(".ddzx").children('a').children('img').attr("src", "img/ddzx.png");
			$(this).children('a').children('img').attr("src", "img/video-w.png");
		} else if (index == 6) {
			$(".zz").children('a').children('img').attr("src", "img/gernedang.png");
			$(".xc").children('a').children('img').attr("src", "img/xc.png");
			$(".main").children('a').children('img').attr("src", "img/zhuye.png");
			$(".product").children('a').children('img').attr("src", "img/chanpin.png");
			$(".personal").children('a').children('img').attr("src", "img/guanli.png");
			$(".log").children('a').children('img').attr("src", "img/rihzi.png");
			$(".visitor").children('a').children('img').attr("src", "img/fangke.png");
			$(".zh").children('a').children('img').attr("src", "img/gernedang.png");
			$(".tg").children('a').children('img').attr("src", "img/tuiguangfuwu.png");
			$(".sc").children('a').children('img').attr("src", "img/shoucang.png");
			$(".hd").children('a').children('img').attr("src", "img/huodong.png");
			$(".center").children('a').children('img').attr("src", "img/gzzx.png");
			$(".video").children('a').children('img').attr("src", "img/video.png");
			$(".ddzx").children('a').children('img').attr("src", "img/ddzx.png");
			$(this).children('a').children('img').attr("src", "img/liuyan-w.png");
		} else if (index == 7) {
			$(".zz").children('a').children('img').attr("src", "img/gernedang.png");
			$(".xc").children('a').children('img').attr("src", "img/xc.png");
			$(".main").children('a').children('img').attr("src", "img/zhuye.png");
			$(".product").children('a').children('img').attr("src", "img/chanpin.png");
			$(".personal").children('a').children('img').attr("src", "img/guanli.png");
			$(".log").children('a').children('img').attr("src", "img/rihzi.png");
			$(".hd").children('a').children('img').attr("src", "img/huodong.png");
			$(".zh").children('a').children('img').attr("src", "img/gernedang.png");
			$(".tg").children('a').children('img').attr("src", "img/tuiguangfuwu.png");
			$(".sc").children('a').children('img').attr("src", "img/shoucang.png");
			$(".leaveMsg").children('a').children('img').attr("src", "img/liuyan.png");
			$(".center").children('a').children('img').attr("src", "img/gzzx.png");
			$(".video").children('a').children('img').attr("src", "img/video.png");
			$(".ddzx").children('a').children('img').attr("src", "img/ddzx.png");
			$(this).children('a').children('img').attr("src", "img/fangke-w.png");
		} else if (index == 8) {
			$(".zz").children('a').children('img').attr("src", "img/gernedang.png");
			$(".xc").children('a').children('img').attr("src", "img/xc.png");
			$(".main").children('a').children('img').attr("src", "img/zhuye.png");
			$(".product").children('a').children('img').attr("src", "img/chanpin.png");
			$(".personal").children('a').children('img').attr("src", "img/guanli.png");
			$(".log").children('a').children('img').attr("src", "img/rihzi.png");
			$(".hd").children('a').children('img').attr("src", "img/huodong.png");
			$(".leaveMsg").children('a').children('img').attr("src", "img/liuyan.png");
			$(".tg").children('a').children('img').attr("src", "img/tuiguangfuwu.png");
			$(".sc").children('a').children('img').attr("src", "img/shoucang.png");
			$(".visitor").children('a').children('img').attr("src", "img/fangke.png");
			$(".center").children('a').children('img').attr("src", "img/gzzx.png");
			$(".video").children('a').children('img').attr("src", "img/video.png");
			$(".ddzx").children('a').children('img').attr("src", "img/ddzx.png");
			if ($(this).hasClass("open")) {
				$(this).children('a').children('img').attr("src", "img/gernedang-w.png");
			} else {
				$(this).children('a').children('img').attr("src", "img/gernedang.png");
			}
		} else if (index == 9) {
			$(".zz").children('a').children('img').attr("src", "img/gernedang.png");
			$(".xc").children('a').children('img').attr("src", "img/xc.png");
			$(".main").children('a').children('img').attr("src", "img/zhuye.png");
			$(".product").children('a').children('img').attr("src", "img/chanpin.png");
			$(".personal").children('a').children('img').attr("src", "img/guanli.png");
			$(".log").children('a').children('img').attr("src", "img/rihzi.png");
			$(".hd").children('a').children('img').attr("src", "img/huodong.png");
			$(".leaveMsg").children('a').children('img').attr("src", "img/liuyan.png");
			$(".visitor").children('a').children('img').attr("src", "img/fangke.png");
			$(".sc").children('a').children('img').attr("src", "img/shoucang.png");
			$(".zh").children('a').children('img').attr("src", "img/gernedang.png");
			$(".center").children('a').children('img').attr("src", "img/gzzx.png");
			$(".video").children('a').children('img').attr("src", "img/video.png");
			$(".ddzx").children('a').children('img').attr("src", "img/ddzx.png");
			$(this).children('a').children('img').attr("src", "img/tuiguangfuwu-w.png");
		} else if (index == 10) {
			$(".zz").children('a').children('img').attr("src", "img/gernedang.png");
			$(".xc").children('a').children('img').attr("src", "img/xc.png");
			$(".main").children('a').children('img').attr("src", "img/zhuye.png");
			$(".product").children('a').children('img').attr("src", "img/chanpin.png");
			$(".personal").children('a').children('img').attr("src", "img/guanli.png");
			$(".log").children('a').children('img').attr("src", "img/rihzi.png");
			$(".hd").children('a').children('img').attr("src", "img/huodong.png");
			$(".leaveMsg").children('a').children('img').attr("src", "img/liuyan.png");
			$(".visitor").children('a').children('img').attr("src", "img/fangke.png");
			$(".zh").children('a').children('img').attr("src", "img/gernedang.png");
			$(".tg").children('a').children('img').attr("src", "img/tuiguangfuwu.png");
			$(".center").children('a').children('img').attr("src", "img/gzzx.png");
			$(".video").children('a').children('img').attr("src", "img/video.png");
			$(".ddzx").children('a').children('img').attr("src", "img/ddzx.png");
			if ($(this).hasClass("open")) {
				$(this).children('a').children('img').attr("src", "img/shoucang-w.png");
			} else {
				$(this).children('a').children('img').attr("src", "img/shoucang.png");
			}
		} else if (index == 11) {
			$(".zz").children('a').children('img').attr("src", "img/gernedang.png");
			$(".xc").children('a').children('img').attr("src", "img/xc.png");
			$(".main").children('a').children('img').attr("src", "img/zhuye.png");
			$(".product").children('a').children('img').attr("src", "img/chanpin.png");
			$(".log").children('a').children('img').attr("src", "img/rihzi.png");
			$(".hd").children('a').children('img').attr("src", "img/huodong.png");
			$(".leaveMsg").children('a').children('img').attr("src", "img/liuyan.png");
			$(".visitor").children('a').children('img').attr("src", "img/fangke.png");
			$(".zh").children('a').children('img').attr("src", "img/gernedang.png");
			$(".tg").children('a').children('img').attr("src", "img/tuiguangfuwu.png");
			$(".sc").children('a').children('img').attr("src", "img/shoucang.png");
			$(".center").children('a').children('img').attr("src", "img/gzzx.png");
			$(".video").children('a').children('img').attr("src", "img/video.png");
			$(".ddzx").children('a').children('img').attr("src", "img/ddzx.png");
			if ($(this).hasClass("open")) {
				$(this).children('a').children('img').attr("src", "img/guanli-w.png");
			} else {
				$(this).children('a').children('img').attr("src", "img/guanli.png");
			}
		} else if (index == 12) {
			$(".zz").children('a').children('img').attr("src", "img/gernedang.png");
			$(".xc").children('a').children('img').attr("src", "img/xc.png");
			$(".main").children('a').children('img').attr("src", "img/zhuye.png");
			$(".product").children('a').children('img').attr("src", "img/chanpin.png");
			$(".personal").children('a').children('img').attr("src", "img/guanli.png");
			$(".log").children('a').children('img').attr("src", "img/rihzi.png");
			$(".hd").children('a').children('img').attr("src", "img/huodong.png");
			$(".leaveMsg").children('a').children('img').attr("src", "img/liuyan.png");
			$(".visitor").children('a').children('img').attr("src", "img/fangke.png");
			$(".zh").children('a').children('img').attr("src", "img/gernedang.png");
			$(".tg").children('a').children('img').attr("src", "img/tuiguangfuwu.png");
			$(".sc").children('a').children('img').attr("src", "img/shoucang.png");
			$(".center").children('a').children('img').attr("src", "img/gzzx.png");
			$(".video").children('a').children('img').attr("src", "img/video.png");
			$(".ddzx").children('a').children('img').attr("src", "img/ddzx.png");
			if ($(this).hasClass("open")) {
				$(this).children('a').children('img').attr("src", "img/ddzx-w.png");
			} else {
				$(this).children('a').children('img').attr("src", "img/ddzx.png");
			}
		} else if (index == 13) {
			$(".zz").children('a').children('img').attr("src", "img/gernedang.png");
			$(".xc").children('a').children('img').attr("src", "img/xc.png");
			$(".main").children('a').children('img').attr("src", "img/zhuye.png");
			$(".product").children('a').children('img').attr("src", "img/chanpin.png");
			$(".personal").children('a').children('img').attr("src", "img/guanli.png");
			$(".log").children('a').children('img').attr("src", "img/rihzi.png");
			$(".visitor").children('a').children('img').attr("src", "img/fangke.png");
			$(".zh").children('a').children('img').attr("src", "img/gernedang.png");
			$(".tg").children('a').children('img').attr("src", "img/tuiguangfuwu.png");
			$(".sc").children('a').children('img').attr("src", "img/shoucang.png");
			$(".hd").children('a').children('img').attr("src", "img/huodong.png");
			$(".leaveMsg").children('a').children('img').attr("src", "img/liuyan.png");
			$(".ddzx").children('a').children('img').attr("src", "img/ddzx.png");
			if ($(this).hasClass("open")) {
				$(this).children('a').children('img').attr("src", "img/gzzx-w.png"); 
			} else {
				$(this).children('a').children('img').attr("src", "img/gzzx.png");
			}
		} else if (index == 14) {
			$(".zz").children('a').children('img').attr("src", "img/gernedang.png");
			$(".xc").children('a').children('img').attr("src", "img/xc.png");
			$(".main").children('a').children('img').attr("src", "img/zhuye.png");
			$(".product").children('a').children('img').attr("src", "img/chanpin.png");
			$(".personal").children('a').children('img').attr("src", "img/guanli.png");
			$(".log").children('a').children('img').attr("src", "img/rihzi.png");
			$(".visitor").children('a').children('img').attr("src", "img/fangke.png");
			$(".zh").children('a').children('img').attr("src", "img/gernedang.png");
			$(".tg").children('a').children('img').attr("src", "img/tuiguangfuwu.png");
			$(".sc").children('a').children('img').attr("src", "img/shoucang.png");
			$(".hd").children('a').children('img').attr("src", "img/huodong.png");
			$(".leaveMsg").children('a').children('img').attr("src", "img/liuyan.png");
			$(".ddzx").children('a').children('img').attr("src", "img/ddzx.png");
			$(".center").children('a').children('img').attr("src", "img/gzzx.png");
			$(".yprise").children('a').children('img').attr("src", "img/qiye.png");
			if ($(this).hasClass("open")) {
				$(this).children('a').children('img').attr("src", "img/qiye.png"); 
			} else {
				$(this).children('a').children('img').attr("src", "img/qiye.png");
			}
		}
	});
	//侧边
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
		layer.tips('<img src="img/downQRcode.jpg" alt="" id="weChatImg"><p id="fouceWechat">关注公众号</p>', ".publicNum", {
			tips: [4, "black"],
			area: ["108px", "110px"]
		})
	}, function() {
		layer.closeAll("tips")
	});
	$(".leaveMsg2").hover(function() {
		layer.tips("QQ121772720<br/>QQ1647522268", ".leaveMsg2", {
			tips: [4, "black"]
		})
	}, function() {
		layer.closeAll("tips")
	});
	$(".contact").hover(function() {
		layer.tips("手机150-9313-5492", ".contact", {
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
	// 上传头像
	$(".headImg").on("click", function() {
		var thisImg = $(this)
		$(".uploadImg").click();
		$(".uploadImg").on("change", function() {
			var imgFile = this.files[0];
			uploadImg(imgFile, thisImg)
		});
	})

	function uploadImg(file, imgdx) {
		var imgData = new FormData();
		imgData.append('user', userPhone);
		imgData.append('file', file);
		imgData.append('userGuid', userGuid);
		$.ajax({
			type: 'post',
			url: 'http://47.94.173.253:8008/User_Update_Headimage.ashx',
			data: imgData,
			cache: false,
			processData: false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
			contentType: false, // 不设置Content-type请求头
			success: function(data) {
				var data = JSON.parse(data);
				if (data.status == 200) {
					layer.msg(data.msg, {
						time: 1000,
					});
					var szz = data.items.split(";")[0];
					arr_imgHref = 'http://47.94.173.253:8008' + data.items.split(";")[0];
					imgdx.attr("src", arr_imgHref);

				}
			}
		});
	};
	$(".uName").on("click", function() {
		layer.open({
			type: 1,
			area: ['400px', '200px'],
			title: ['修改昵称', 'font-size:18px;text-align: center;'],
			content: $('.changeName'),
			btn: ['确认'],
			yes: function(index, layero) {
				if ($(".yourName").val()) {
					$.post(http_head + "userashx/Update_upname.ashx", {
						"userGuid": userGuid,
						"upname": $(".yourName").val()
					}, function(data) {
						var data = JSON.parse(data)
						if (data.status == 200) {
							layer.msg(data.msg, {
								time: 1200
							})
							setTimeout(function() {
								layer.closeAll();
								window.location.reload()
							}, 2000)

						} else {
							layer.msg(data.msg, {
								time: 1200
							})
						}
					})
				} else {
					layer.msg("请输入昵称", {
						time: 1200
					})
				}

			}
		})
	})
})
