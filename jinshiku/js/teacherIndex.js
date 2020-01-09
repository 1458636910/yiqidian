//'use strict';

$(document).ready(function () {
	var http_head = "http://47.94.173.253:8008";
	
	var pageType = 0; //页码
	var para = ''; //搜索关键字
	var sortVal = ''; //讲师分类
	var addressVal = ""; //活动区域
	var m1 = 0,
	    m2 = 50001; //师资费
	var sexVal = ""; //性别
	var a1 = 0,
	    a2 = 200; //年龄
	var jobVal = ""; //工作背景
	var approveVal = -1; //是否认证
	var jobOldVal = ""; //曾担任职位
	//登陆退出
	var href = location.href;
	var dataC = localStorage.getItem("GHY_login");
	if (dataC != null) {
		var dataInfo = JSON.parse(dataC);
		$('#loginBtn').text(dataInfo.username);
		$("#regBtn").on("click", function () {
			localStorage.removeItem("GHY_login");
			window.location.reload();
		}).text("退出");
		var flag2 = 0;
		var user = localStorage.getItem("GHY_login");
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
	} else {
		$('#loginBtn').click(function () {
			location.href = "./innerLogin.html?href=" + href + "";
		}).text("登录");
		$("#regBtn").on("click", function () {
			location.href = "http://www.eqidd.com/html/reg.html?href=" + href + "";
		}).text("注册");
	};
	if (href.indexOf("?") > 0) {
		// 如果首页点击轮播左侧分类 不执行默认搜索函数
	} else {
		// 如果首页没有点击轮播左侧分类 执行默认搜索函数
		setTimeout(function () {
			accordingType(pageType, sortVal, para, addressVal, sexVal, approveVal, jobVal, jobOldVal, m1, m2, a1, a2);
		}, 350);
	};
	// 加载尾部
	setTimeout(function () {
		$('#footer').load("../html/footer2.html");
	}, 500);
	$(".mainFountion li a").eq(1).unbind('mouseenter').unbind('mouseleave');
	//////////////////////////////////////////////////////////////////////
	// 搜索结果显示表
	function searchTeacherTabel(data) {
		$('#teacherListTable').bootstrapTable({
			onPostBody: function onPostBody(name, args) {
				$(".teaBox").hover(function () {
					$(this).children("#imgDiv").children("div").children("img").css({
						"transform": "scale(1.1,1.1)",
						"transition": "all 0.5s"
					});
				}, function () {
					$(this).children("#imgDiv").children("div").children("img").css({
						"transform": "scale(1,1)"
					});
				});
				$('.tjField').ellipsis();
				$("img.lazyTeach").lazyload({
					effect: "fadeIn"
				});
			},
			columns: [{
				field: 'teacherDetails',
				align: 'center',
				valign: 'middle',
				formatter: searchFormatter,
				events: viewTeacherDetails
			}],
			data: data
		});

		function searchFormatter(e, value, row, index) {
			var courses = value.ResearchField;
			var headImg;
			// var imgStr = "http://47.94.173.253:8008" + value.headimage.split("http://47.94.173.253:8008")[2];
			if (value.headimage.indexOf(".png") > 0 || value.headimage.indexOf(".jpg") > 0 || value.headimage.indexOf(".jpeg") > 0) {
				if (value.headimage.indexOf(".png") > 0) {
					headImg = value.headimage.split(".png")[0] + "min.png";
				} else if (value.headimage.indexOf(".jpg") > 0) {
					headImg = value.headimage.split(".jpg")[0] + "min.jpg";
				} else if (value.headimage.indexOf(".jpeg") > 0) {
					headImg = value.headimage.split(".jpeg")[0] + "min.jpeg";
				}
			} else {
				headImg = "../image/touxiang.png";
			}
			return '<div class="clearfix" id="singleDetails" viewId="' + value.userGuid + '" alt="' + value.realName + '">   <div id="imgDiv"><img class="lazyTeach" data-original="' + headImg + '" alt="" /> </div>   <div class="userInfor"><p><span><label>' + value.realName + '</label></span>  </p><p><span>擅长领域：' + value.ResearchField + '</span></p> <div class="information"><p><img src="../image/location.png">' + value.address + ' </p>  <p><img src="../image/see.png">' + value.browCount + '</p><p> <img src="../image/complete.png">' + value.TradeCount + '</p>   </div> </div> <p class="authen">' + value.CooperativePrice + '元/天</p>   </div>';
		}
	};
	window.viewTeacherDetails = {
		'click #singleDetails': function clickSingleDetails(e, value, row, index) {
			window.open("http://www.eqidd.com/changke/index_start.html?userGuid=" + row.userGuid + "&piece=1");
		}
	};
	// 查看讲师详情
	// /////////////////////////////////////////////////////////////////////////////////////////////////
	// 根据类别搜索讲师
	function accordingType(page, type, para, area, sex, isAuthen, workBg, post, moneyMin, moneyMax, ageMin, ageMax) {
		// 搜索函数
		$('.searchArea').hide();
		$('.typeArea').show();
		$.post('' + http_head + '/Lectures/searchTeachers.ashx', {
			"page": page,
			"moneyMin": moneyMin,
			"moneyMax": moneyMax,
			"type": type,
			"area": area,
			"sex": sex,
			"isAuthen": isAuthen,
			"ageMin": ageMin,
			"ageMax": ageMax,
			"workBg": workBg,
			"post": post,
			"para": para
		}, function (data) {
			var dataAccordingType = JSON.parse(data);
			console.log("讲师List", dataAccordingType);
			if (dataAccordingType.status == 200) {
				searchTeacherTabel(dataAccordingType.items);
				if (dataAccordingType.items.length > 0) {
					layer.msg('搜索成功', {
						time: 1000
					});
				} else {
					layer.msg('暂无搜索结果', {
						time: 1000
					});
				}
				$("#teacherListTable").bootstrapTable('load', dataAccordingType.items);
				pageType = dataAccordingType.page;
				$('.prvepageBtn').hide();
				if (dataAccordingType.items.length >= 10) {
					$('.nextpageBtn').show();
				} else {
					$('.nextpageBtn').hide();
				}
			}
		});
	};

	function accordingTypeNext(page, type, para, area, sex, isAuthen, workBg, post, moneyMin, moneyMax, ageMin, ageMax) {
		// 搜索函数
		$('.searchArea').hide();
		$('.typeArea').show();
		$.post('' + http_head + '/Lectures/searchTeachers.ashx', {
			"page": page,
			"moneyMin": moneyMin,
			"moneyMax": moneyMax,
			"type": type,
			"area": area,
			"sex": sex,
			"isAuthen": isAuthen,
			"ageMin": ageMin,
			"ageMax": ageMax,
			"workBg": workBg,
			"post": post,
			"para": para
		}, function (data) {
			var dataAccordingType = JSON.parse(data);
			if (dataAccordingType.items.length > 0) {
				layer.msg('搜索成功', {
					time: 1000
				});
				$("#teacherListTable").bootstrapTable('append', dataAccordingType.items);
			} else {
				layer.msg('暂无搜索结果', {
					time: 1000
				});
			}
			pageType = dataAccordingType.page;
			if (dataAccordingType.items.length >= 10) {
				$('.nextpageBtn').show();
			} else {
				$('.nextpageBtn').hide();
			}
		});
	};
	$('.nextpageBtn').click(function () {
		if ($('#inputSearch').val().length != 0) {
			paraVal = $('#inputSearch').val();
		}
		accordingTypeNext(pageType, sortVal, para, addressVal, sexVal, approveVal, jobVal, jobOldVal, m1, m2, a1, a2);
	});
	// //////////////////////////////////////////////////////////////////////////////
	var parentId;
	var childId;
	var p, c;
	if (href.indexOf("searchVal") < 0 && href.indexOf("?") > 0) {
		parentId = href.split("&")[1].split("%")[0].split("=")[1];
		childId = href.split("&")[1].split("%")[1].split("=")[1];
		p = "#" + parentId;
		c = "#" + childId;
	};
	//加载课程分类
	$.post('' + http_head + '/Option_AreasAnd.ashx', {
		"type": 45
	}, function (data) {
		// 如果首页点击轮播左侧分类 ///////////////////////////////////////////////
		if (href.indexOf("?") > 0 && href.indexOf("searchVal") < 0) {
			// 子级
			$('#secondType').fadeIn();
			for (var k = 0; k < data[parentId].sub.length; k++) {
				$('#select1Min').append('<dd id="' + k + '"><a>' + data[parentId].sub[k].name + '</a></dd>');
			}
			$('#select1Min').children(c).addClass("selected").siblings().removeClass("selected");
			var copyThisA_this = $('#select1Min').children(".selected").clone();
			$(".select-result dl").append(copyThisA_this.attr("id", "selectA"));
			$(".select-no").hide();
			sortVal = data[parentId].sub[childId].name;
			accordingType(pageType, sortVal, para, addressVal, sexVal, approveVal, jobVal, jobOldVal, m1, m2, a1, a2);
			$("#select1Min dd").click(function () {
				var index = $(this).index();
				sortVal = $(this).text();
				pageType = 0;
				if ($('#inputSearch').val().length != 0) {
					paraVal = $('#inputSearch').val();
				}
				accordingType(pageType, sortVal, para, addressVal, sexVal, approveVal, jobVal, jobOldVal, m1, m2, a1, a2);
				$(this).addClass("selected").siblings().removeClass("selected");
				if ($(this).hasClass("select-all")) {
					$("#selectA").remove();
				} else {
					var copyThisA = $(this).clone();
					if ($("#selectA").length > 0) {
						$("#selectA a").html($(this).text());
					} else {
						$(".select-result dl").append(copyThisA.attr("id", "selectA"));
					}
				}
			});
		}
		///////////////////////////////////////////////////////////////////////
		for (var i = 0; i < data.length; i++) {
			// 讲师分类
			$('#select1').append('<dd id="' + i + '"><a>' + data[i].name + '</a></dd>');
			// 如果首页点击轮播左侧分类 
			if (href.indexOf("?") > 0) {
				// 父级
				$('#select1').children(p).addClass("selected").siblings().removeClass("selected");
			}
		};
		$("#select1 dd").eq(0).addClass("selected");
		$("#select1 dd").eq(0).click(function () {
			$(this).addClass("selected").siblings().removeClass("selected");
			$("#selectA").remove();
			$('#secondType').hide();
			// 全部
			sortVal = "";
			pageType = 0;
			if ($('#inputSearch').val().length != 0) {
				paraVal = $('#inputSearch').val();
			}
			accordingType(pageType, sortVal, para, addressVal, sexVal, approveVal, jobVal, jobOldVal, m1, m2, a1, a2);
		});
		// $("#select1 dd:gt(0)").click(function() {
		// 	$('#secondType').show()
		// 	$(this).addClass("selected").siblings().removeClass("selected");
		// 	$('#select1Min dd').remove()
		// 	for (var j = 0; j < data[$(this).attr('id')].sub.length; j++) {
		// 		// items项
		// 		$('#select1Min').append('<dd id="' + j + '"><a>' + data[$(this).attr('id')].sub[j].name + '</a></dd>');
		// 	}
		$("#select1 dd").click(function () {
			var index = $(this).index();
			sortVal = $(this).text().trim();
			pageType = 0;
			if ($('#inputSearch').val().length != 0) {
				paraVal = $('#inputSearch').val();
			}
			accordingType(pageType, sortVal, para, addressVal, sexVal, approveVal, jobVal, jobOldVal, m1, m2, a1, a2);
			$(this).addClass("selected").siblings().removeClass("selected");
			if ($(this).hasClass("select-all")) {
				$("#selectA").remove();
			} else {
				var copyThisA = $(this).clone();
				if ($("#selectA").length > 0) {
					$("#selectA a").html($(this).text());
				} else {
					$(".select-result dl").append(copyThisA.attr("id", "selectA"));
				}
			}
		});
		// })
	});
	//////////////////////////////////////////////////////////////////////////
	// 地址
	var chinaObj = JSON.parse(chinaArea);
	//获取所有省份的数组
	var province = chinaObj.china.province;
	// 城市变量
	var cities;
	for (var i = 0; i < province.length; i++) {
		// 循环显示省份
		$("#select2").append("<dd><a value='" + province[i]["-code"] + "'>" + province[i]["-name"] + "</a></dd>");
	}
	$("#select2 dd").on("click", function () {
		var index = $(this).index();
		if (index == 1) {
			$("#city").replaceWith("<dl id='city'></dl>");
			addressVal = "";
			if ($('#inputSearch').val().length != 0) {
				paraVal = $('#inputSearch').val();
			}
		} else {
			// $("#city").replaceWith("<dl id='city'><dt>市区：</dt></dl>");
			addressVal = $(this).text().trim();
		}
		$(this).addClass("selected").siblings().removeClass("selected");
		if ($(this).hasClass("select-all")) {
			$("#selectB").remove();
		} else {
			var copyThisB = $(this).clone();
			if ($("#selectB").length > 0) {
				// 填充标签				
				$("#selectB a").html($(this).text());
			} else {
				$(".select-result dl").append(copyThisB.attr("id", "selectB"));
			}
		}
		pageType = 0;
		accordingType(pageType, sortVal, para, addressVal, sexVal, approveVal, jobVal, jobOldVal, m1, m2, a1, a2);
		// 省份点击事件
		// $(this).addClass("selected").siblings().removeClass("selected");
		// 每次点击省清空城市列表
		// $("#selectB").remove();
		// for (var i = 0; i < province.length; i++) {
		//     if (province[i]["-code"] == $(this).children("a").attr("value")) {
		//         cities = province[i].city;
		//         for (var j = 0; j < cities.length; j++) {
		//             // 循环显示城市
		//             if (i == 0 || i == 1 || i == 8 || i == 21) {
		//                 var county = cities[j].county;
		//                 for (var n = 0; n < county.length; n++) {
		//                     $("#city").append("<dd><a >" + county[n]["-name"] + "</a></dd>")
		//                 }
		//             } else if (i != 0 & i != 1 & i != 8 & i != 21) {
		//                 $("#city").append("<dd><a >" + cities[j]["-name"] + "</a></dd>")
		//             }
		//         }
		//     }
		// }
		// $("#city dd").on("click", function() {
		//     // 城市点击事件
		//     // 搜索                       
		//     addressVal = $(this).text();
		//     pageType = 0;
		//     if ($('#inputSearch').val().length != 0) {
		//         paraVal = $('#inputSearch').val()
		//     }
		//     accordingType(pageType, sortVal, para, addressVal, sexVal, approveVal, jobVal, jobOldVal, m1, m2, a1, a2);
		//     $(this).addClass("selected").siblings().removeClass("selected");
		//     // 复制标签
		//     var copyThisB = $(this).clone();
		//     if ($("#selectB").length > 0) {
		//         // 填充标签
		//         $("#selectB a").html($(this).text());
		//     } else {
		//         $(".select-result dl").append(copyThisB.attr("id", "selectB"));
		//     }
		// })
	});
	///////////////////////////////////////////////////////////////////////
	// 师资费
	var statusList = ["0.5K以下", "0.5K-1K", "1K-1.5K", "1.5K-2K", "2K-3K", "3K-4K", "4K-5K", "5K-6K", "6K-7K", "7K-8K", "8K-10K", "10K-12K", "12K-15K", "15K-20K", "20K-30K", "30K-50K", "50K以上"];
	var moneyList = ["0-501", "501-1001", "1001-1501", "1501-2001", "2001-3001", "3001-4001", "4001-5001", "5001-6001", "6001-7001", "7001-8001", "8001-10001", "10001-12001", "12001-15001", "15001-20001", "20001-30001", "30001-50001", "50001-1000000"];
	for (var i = 0; i < statusList.length; i++) {
		$("#select3 ").append("<dd><a >" + statusList[i] + "</a></dd>");
	};
	$("#select3 dd").click(function () {
		var index = $(this).index();
		if ($('#inputSearch').val().length != 0) {
			paraVal = $('#inputSearch').val();
		}
		if (index >= 2) {
			var moneystr = moneyList[index - 3];
			m1 = moneystr.split("-")[0];
			m2 = moneystr.split("-")[1];
		} else {
			m1 = 0;
			m2 = 50001;
		}
		pageType = 0;
		accordingType(pageType, sortVal, para, addressVal, sexVal, approveVal, jobVal, jobOldVal, m1, m2, a1, a2);
		$(this).addClass("selected").siblings().removeClass("selected");
		if ($(this).hasClass("select-all")) {
			$("#selectC").remove();
		} else {
			var copyThisC = $(this).clone();
			if ($("#selectC").length > 0) {
				$("#selectC a").html($(this).text());
			} else {
				$(".select-result dl").append(copyThisC.attr("id", "selectC"));
			}
		}
	});
	////////////////////////////////////////////////////////////////////////
	// 性别
	$("#select4 dd").on("click", function () {
		var index = $(this).index();
		if ($('#inputSearch').val().length != 0) {
			paraVal = $('#inputSearch').val();
		}
		pageType = 0;
		if (index == 1) {
			sexVal = '';
		} else if (index == 2) {
			sexVal = "男";
		} else if (index == 3) {
			sexVal = "女";
		}
		accordingType(pageType, sortVal, para, addressVal, sexVal, approveVal, jobVal, jobOldVal, m1, m2, a1, a2);
		$(this).addClass("selected").siblings().removeClass("selected");
		if ($(this).hasClass("select-all")) {
			$("#selectD").remove();
		} else {
			var copyThisD = $(this).clone();
			if ($("#selectD").length > 0) {
				$("#selectD a").html($(this).text());
			} else {
				$(".select-result dl").append(copyThisD.attr("id", "selectD"));
			}
		}
	});
	///////////////////////////////////////////////////////////////////////
	// 已选条件
	$(document).on("click", "#selectA", function () {
		$(this).remove();
		$('#secondType').hide();
		$("#select1 .select-all").addClass("selected").siblings().removeClass("selected");
		$("#select1Min dd").addClass("selected").siblings().removeClass("selected");
		sortVal = "";
		pageType = 0;
		if ($('#inputSearch').val().length != 0) {
			paraVal = $('#inputSearch').val();
		}
		accordingType(pageType, sortVal, para, addressVal, sexVal, approveVal, jobVal, jobOldVal, m1, m2, a1, a2);
	});
	$(document).on("click", "#selectB", function () {
		$(this).remove();
		// $("#city").replaceWith("<dl id='city'></dl>");
		$("#select2 .select-all").addClass("selected").siblings().removeClass("selected");
		// $("#city dd").removeClass("selected")
		addressVal = "";
		pageType = 0;
		if ($('#inputSearch').val().length != 0) {
			paraVal = $('#inputSearch').val();
		}
		accordingType(pageType, sortVal, para, addressVal, sexVal, approveVal, jobVal, jobOldVal, m1, m2, a1, a2);
	});
	$(document).on("click", "#selectC", function () {
		$(this).remove();
		$("#select3 .select-all").addClass("selected").siblings().removeClass("selected");
		m1 = 0, m2 = 1000000;
		pageType = 0;
		if ($('#inputSearch').val().length != 0) {
			paraVal = $('#inputSearch').val();
		}
		accordingType(pageType, sortVal, para, addressVal, sexVal, approveVal, jobVal, jobOldVal, m1, m2, a1, a2);
	});
	$(document).on("click", "#selectD", function () {
		$(this).remove();
		$("#select4 .select-all").addClass("selected").siblings().removeClass("selected");
		sexVal = "";
		pageType = 0;
		if ($('#inputSearch').val().length != 0) {
			paraVal = $('#inputSearch').val();
		}
		accordingType(pageType, sortVal, para, addressVal, sexVal, approveVal, jobVal, jobOldVal, m1, m2, a1, a2);
	});
	$(document).on("click", "#selectE", function () {
		$(this).remove();
		$("#select5 .select-all").addClass("selected").siblings().removeClass("selected");
		a1 = 0, a2 = 200;
		pageType = 0;
		if ($('#inputSearch').val().length != 0) {
			paraVal = $('#inputSearch').val();
		}
		accordingType(pageType, sortVal, para, addressVal, sexVal, approveVal, jobVal, jobOldVal, m1, m2, a1, a2);
	});
	$(document).on("click", "#selectF", function () {
		$(this).remove();
		$("#select6 .select-all").addClass("selected").siblings().removeClass("selected");
		jobVal = "";
		pageType = 0;
		if ($('#inputSearch').val().length != 0) {
			paraVal = $('#inputSearch').val();
		}
		accordingType(pageType, sortVal, para, addressVal, sexVal, approveVal, jobVal, jobOldVal, m1, m2, a1, a2);
	});
	$(document).on("click", "#selectG", function () {
		$(this).remove();
		$("#select7 .select-all").addClass("selected").siblings().removeClass("selected");
		jobOldVal = "";
		pageType = 0;
		if ($('#inputSearch').val().length != 0) {
			paraVal = $('#inputSearch').val();
		}
		accordingType(pageType, sortVal, para, addressVal, sexVal, approveVal, jobVal, jobOldVal, m1, m2, a1, a2);
	});
	$(document).on("click", "#selectH", function () {
		$(this).remove();
		$("#select8 .select-all").addClass("selected").siblings().removeClass("selected");
		approveVal = -1;
		pageType = 0;
		if ($('#inputSearch').val().length != 0) {
			paraVal = $('#inputSearch').val();
		}
		accordingType(pageType, sortVal, para, addressVal, sexVal, approveVal, jobVal, jobOldVal, m1, m2, a1, a2);
	});
	$(document).on("click", ".select dd", function () {
		if ($(".select-result dd").length > 1) {
			$(".select-no").hide();
		} else {
			$(".select-no").show();
		}
	});
	// ///////////////////////////////////////////////////////////////////////////////////////
	// 年龄
	var ageList = ["20以下", "20-25", "25-30", "30-35", "35-40", "40-50", "50-60", "60以上"];
	var ageList2 = ["0-20", "20-25", "25-30", "30-35", "35-40", "40-50", "50-60", "60-100"];
	for (var i = 0; i < ageList.length; i++) {
		$("#select5 ").append("<dd><a >" + ageList[i] + "</a></dd>");
	};
	$("#select5 dd").click(function () {
		var index = $(this).index();
		if ($('#inputSearch').val().length != 0) {
			paraVal = $('#inputSearch').val();
		}
		pageType = 0;
		if (index >= 2) {
			var agestr = ageList2[index - 2];
			a1 = agestr.split("-")[0];
			a2 = agestr.split("-")[1];
		} else {
			a1 = 0;
			a2 = 200;
		}
		accordingType(pageType, sortVal, para, addressVal, sexVal, approveVal, jobVal, jobOldVal, m1, m2, a1, a2);
		$(this).addClass("selected").siblings().removeClass("selected");
		if ($(this).hasClass("select-all")) {
			$("#selectE").remove();
		} else {
			var copyThisE = $(this).clone();
			if ($("#selectE").length > 0) {
				$("#selectE a").html($(this).text());
			} else {
				$(".select-result dl").append(copyThisE.attr("id", "selectE"));
			}
		}
	});
	//////////////////////////////////////////////////////////////////////////////////////////
	// 工作背景
	var jobList = ["世界500强", "中国500强", "大型国企", "大型民企", "知名日韩企业", "港澳台企业", "欧美外企", "其他"];
	for (var i = 0; i < jobList.length; i++) {
		$("#select6 ").append("<dd><a >" + jobList[i] + "</a></dd>");
	};
	$("#select6 dd").click(function () {
		var index = $(this).index();
		if ($('#inputSearch').val().length != 0) {
			paraVal = $('#inputSearch').val();
		}
		pageType = 0;
		if (index >= 2) {
			jobVal = $(this).text().trim();
		} else {
			jobVal = '';
		}
		accordingType(pageType, sortVal, para, addressVal, sexVal, approveVal, jobVal, jobOldVal, m1, m2, a1, a2);
		$(this).addClass("selected").siblings().removeClass("selected");
		if ($(this).hasClass("select-all")) {
			$("#selectF").remove();
		} else {
			var copyThisF = $(this).clone();
			if ($("#selectF").length > 0) {
				$("#selectF a").html($(this).text());
			} else {
				$(".select-result dl").append(copyThisF.attr("id", "selectF"));
			}
		}
	});
	///////////////////////////////////////////////////////////////////////////////////////////
	// 曾担任职位
	var jobOldList = ["总经理", "副总", "总监", "部门经理/主管", "高级工程师", "一般管理人员", "其他"];
	for (var i = 0; i < jobOldList.length; i++) {
		$("#select7").append("<dd><a >" + jobOldList[i] + "</a></dd>");
	};
	$("#select7 dd").click(function () {
		var index = $(this).index();
		if ($('#inputSearch').val().length != 0) {
			paraVal = $('#inputSearch').val();
		}
		pageType = 0;
		if (index >= 2) {
			jobOldVal = $(this).text();
		} else {
			jobOldVal = '';
		}
		accordingType(pageType, sortVal, para, addressVal, sexVal, approveVal, jobVal, jobOldVal, m1, m2, a1, a2);
		$(this).addClass("selected").siblings().removeClass("selected");
		if ($(this).hasClass("select-all")) {
			$("#selectG").remove();
		} else {
			var copyThisG = $(this).clone();
			if ($("#selectG").length > 0) {
				$("#selectG a").html($(this).text());
			} else {
				$(".select-result dl").append(copyThisG.attr("id", "selectG"));
			}
		}
	});
	//////////////////////////////////////////////////////////////////////////////////////////
	// 实名认证
	var approveList = ["1", "0"];
	$("#select8 dd").click(function () {
		var index = $(this).index();
		if ($('#inputSearch').val().length != 0) {
			paraVal = $('#inputSearch').val();
		}
		pageType = 0;
		if (index == 1) {
			approveVal = -1;
		} else if (index == 2) {
			approveVal = 1;
		} else if (index == 3) {
			approveVal = 0;
		}
		accordingType(pageType, sortVal, para, addressVal, sexVal, approveVal, jobVal, jobOldVal, m1, m2, a1, a2);
		$(this).addClass("selected").siblings().removeClass("selected");
		if ($(this).hasClass("select-all")) {
			$("#selectH").remove();
		} else {
			var copyThisH = $(this).clone();
			if ($("#selectH").length > 0) {
				$("#selectH a").html($(this).text());
			} else {
				$(".select-result dl").append(copyThisH.attr("id", "selectH"));
			}
		}
	});
	//////////////////////////////////////////////////////////////////////////////////////////
	// 搜索框
	$('#searchBtn').click(function () {
		if ($('#inputSearch').val().length == 0) {
			layer.msg('搜索关键字不能为空', {
				time: 1000
			});
		} else {
			para2 = $('#inputSearch').val();
			pageType = 0;
			accordingType(pageType, sortVal, para2, addressVal, sexVal, approveVal, jobVal, jobOldVal, m1, m2, a1, a2);
		}
	});
	$('#inputSearch').keydown(function (event) {
		if (event.keyCode === 13) {
			if ($('#inputSearch').val().length == 0) {
				layer.msg('搜索关键字不能为空', {
					time: 1000
				});
			} else {
				para2 = $('#inputSearch').val();
				pageType = 0;
				accordingType(pageType, sortVal, para2, addressVal, sexVal, approveVal, jobVal, jobOldVal, m1, m2, a1, a2);
			}
		}
	});
	$('#searchBtn').click(function () {
		if ($('#inputSearch').val().length == 0) {
			layer.msg('搜索关键字不能为空', {
				time: 1000
			});
		} else {
			if ($('#selectType').val() == "2") {
				window.open("./advisory.html?advName=" + $('#inputSearch').val() + "");
			} else if ($('#selectType').val() == "3") {
				window.open("./lookDemandList.html?demandName=" + $('#inputSearch').val() + "");
			} else if ($('#selectType').val() == "4") {
				window.open("http://www.eqidd.com/yqy/search.html?searchKey=" + $('#inputSearch').val() + "");
			} else if ($('#selectType').val() == "5") {
				window.open("./lookActivity.html?activityName=" + $('#inputSearch').val() + "");
			} else if ($('#selectType').val() == "6") {
				window.open("./organization.html?orgName=" + $('#inputSearch').val() + "");
			} else if ($('#selectType').val() == "7") {
				window.open("./lookCourseList.html?couName=" + $('#inputSearch').val() + "");
			}
		}
	});
	$('#inputSearch').keydown(function (event) {
		if (event.keyCode === 13) {
			if ($('#inputSearch').val().length == 0) {
				layer.msg('搜索关键字不能为空', {
					time: 1000
				});
			} else {
				if ($('#selectType').val() == "2") {
					window.open("./advisory.html?advName=" + $('#inputSearch').val() + "");
				} else if ($('#selectType').val() == "3") {
					window.open("./lookDemandList.html?demandName=" + $('#inputSearch').val() + "");
				} else if ($('#selectType').val() == "4") {
					window.open("http://www.eqidd.com/yqy/search.html?searchKey=" + $('#inputSearch').val() + "");
				} else if ($('#selectType').val() == "5") {
					window.open("./lookActivity.html?activityName=" + $('#inputSearch').val() + "");
				} else if ($('#selectType').val() == "6") {
					window.open("./organization.html?orgName=" + $('#inputSearch').val() + "");
				} else if ($('#selectType').val() == "7") {
					window.open("./lookCourseList.html?couName=" + $('#inputSearch').val() + "");
				}
			}
		}
	});
	var schUrlPara;
	if (href.indexOf("?") > 0 && href.indexOf("searchVal") > 0) {
		schUrlPara = decodeURI(href.split("=")[1], "UTF-8");
		accordingType(pageType, sortVal, schUrlPara, addressVal, sexVal, approveVal, jobVal, jobOldVal, m1, m2, a1, a2);
	};
	// 获取讲师
	var teaPage;

	function loadTuijianteacher(para, ResearchField, page) {
		$('.typeArea').hide();
		$('.searchArea').show();
		$.post('' + http_head + '/Lectures/Get_Lecture_BySearch.ashx', {
			"para": para,
			"page": page,
			"type": "html",
			"ResearchField": ResearchField
		}, function (data) {
			var dataSearch = JSON.parse(data);
			teaPage = dataSearch.items.page;
			if (teaPage <= 1) {
				$('.prvepageBtn2').hide();
				if (dataSearch.items.rows.length > 9) {
					$('.nextpageBtn2').show();
				} else {
					$('.prvepageBtn2').hide();
					$('.nextpageBtn2').hide();
				}
			} else {
				if (dataSearch.items.rows.length > 9) {
					$('.nextpageBtn2').show();
					$('.prvepageBtn2').show();
				} else {
					$('.nextpageBtn2').hide();
					$('.prvepageBtn2').show();
				}
			}
			searchTeacherTabel(dataSearch.items.rows);
		});
	};
	$('.nextpageBtn2').click(function () {
		accordingType($('#inputSearch').val(), "", teaPage);
	});
	$('.prvepageBtn2').click(function () {
		accordingType($('#inputSearch').val(), "", Number(teaPage) - 2);
	});
	// 推荐讲师
	setTimeout(function () {
		tuijainTeacher();
	}, 200);
	// 推荐讲师滚动
	var $this2 = $("#tuijianTeacherDiv");
	var scrollTimer2;
	$this2.hover(function () {
		clearInterval(scrollTimer2);
	}, function () {
		scrollTimer2 = setInterval(function () {
			scrollNews2($this2);
		}, 2000);

		function scrollNews2(obj) {
			var $self = obj.find("ul");
			var lineHeight = $self.find("li:first").height();
			$self.animate({
				"marginTop": -81 + "px"
			}, 600, function () {
				$self.css({
					marginTop: 0
				}).find("li:first").appendTo($self);
			});
		}
	}).trigger("mouseleave");

	function tuijainTeacher() {
		$.post('' + http_head + '/Admin/Home/get_homeTeacher.ashx', {
			page: 0
		}, function (data) {
			var dataTuijain = JSON.parse(data);
			console.log("tj", dataTuijain);
			var imgURLmin;
			var array_label = [];
			var str_label = '';
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = dataTuijain.items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var itemValue = _step.value;

					if (itemValue.userImage) {
						imgURLmin = itemValue.userImage.replace(/.png/, "min.png");
					} else {
						imgURLmin = "../image/touxiang.png";
					};
					str_label = itemValue.ResearchField.split(",");
					for (var i = 0; i < str_label.length; i++) {
						array_label.push('《<span class="">' + str_label[i] + '</span>》');
					};
					str = '<li class="clearfix" id="' + itemValue.userGuid + '" alt="' + itemValue.userName + '"><img class="lazytj" data-original="' + imgURLmin + '" alt="" class="pull-left"><div class="pull-left"><p class="lectureName">' + itemValue.userName + '</p><p class="lectureLabel">' + itemValue.post + '</p></div></li>';
					$('#tuijianTeacher').append(str);
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			;
			$("img.lazytj").lazyload({
				effect: "fadeIn"
			});
			$('#tuijianTeacher li').click(function () {
				var this_guid = $(this).attr("id");
				window.open("http://www.eqidd.com/changke/index_start.html?userGuid=" + this_guid + "&piece=1");
			});
		});
	};

	// 活跃讲师
	setTimeout(function () {
		activeTeacher();
	}, 200);
	// 活跃讲师滚动
	var $this4 = $("#activeTeacherDiv");
	var scrollTimer4;
	$this4.hover(function () {
		clearInterval(scrollTimer4);
	}, function () {
		scrollTimer4 = setInterval(function () {
			scrollNews4($this4);
		}, 2000);

		function scrollNews4(obj) {
			var $self = obj.find("ul");
			var lineHeight = $self.find("li:first").height();
			$self.animate({
				"marginTop": -81 + "px"
			}, 600, function () {
				$self.css({
					marginTop: 0
				}).find("li:first").appendTo($self);
			});
		}
	}).trigger("mouseleave");

	function activeTeacher() {
		$.post('' + http_head + '/Makerspacey/MakerArticle/Get_ActiveMaker.ashx', {
			page: 0
		}, function (data) {
			var dataTuijain = JSON.parse(data);
			console.log('hy', dataTuijain);
			var imgURLmin;
			var array_label = [];
			var str_label = '';
			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = dataTuijain.items[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var itemValue = _step2.value;

					if (itemValue.headimage) {
						imgURLmin = itemValue.headimage;
					} else {
						imgURLmin = "../image/touxiang.png";
					};
					str_label = itemValue.ResearchField.split(",");
					for (var i = 0; i < str_label.length; i++) {
						array_label.push('《<span class="">' + str_label[i] + '</span>》');
					};
					str = '<li class="clearfix" id="' + itemValue.userGuid + '" alt="' + itemValue.realname + '"><img class="lazyac" data-original="' + imgURLmin + '" alt="" class="pull-left"><div class="pull-left"><p class="lectureName">' + itemValue.realname + '</p><p class="lectureLabel">' + array_label + '</p></div></li>';
					$('#activeTeacher').append(str);
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}

			;
			$("img.lazyac").lazyload({
				event: "scroll",
				effect: "fadeIn",
				threshold: 180
			});
			$('#activeTeacher li').click(function () {
				var this_guid = $(this).attr("id");
				window.open("http://www.eqidd.com/changke/index_start.html?userGuid=" + this_guid + "&piece=1");
			});
		});
	};
	if (href.indexOf("?") > 0) {
		var flag = 0;
		$("#showMore").on("click", function () {
			if (flag == 0) {
				$("#pick").animate({
					height: "200px"
				}, "slow", "swing", function () {
					$("#showMore a").text("收起>>");
				}).show();
				flag = 1;
			} else {
				$("#pick").animate({
					height: 0
				}, "slow", "swing", function () {
					$("#showMore a").text("更多选项>>");
				});
				flag = 0;
			}
		});
	} else {
		var flag = 0;
		$("#showMore").on("click", function () {
			if (flag == 0) {
				$("#pick").animate({
					height: "200px"
				}, "slow", "swing", function () {
					$("#showMore a").text("收起>>");
				}).show();
				flag = 1;
			} else {
				$("#pick").animate({
					height: 0
				}, "slow", "swing", function () {
					$("#showMore a").text("更多选项>>");
				});
				flag = 0;
			}
		});
	};
	$(".promotion").on("click", function () {
		window.open("http://www.eqidd.com/tuiguang.html");
	});
});