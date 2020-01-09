$(document).ready(function() {
	$(".mainFountion li a").eq(6).unbind('mouseenter').unbind('mouseleave');
	setTimeout(function() {
		$('#footer').load("../html/footer2.html");
	}, 500);
	$(".train").on("click", function() {
		$("#advisoryTable").hide();
		$("#demandListTable").show();
		$(".nextpageBtn2").hide();
		$(".nextpageBtn").show();
		$('#inputSearch').show()
		$('#searchBtn').show()
		$('#inputSearch1').hide()
		$('#searchBtn1').hide()
	})
	$(".advisory").on("click", function() {
		$("#demandListTable").hide();
		$("#advisoryTable").show();
		$(".nextpageBtn").hide();
		$(".nextpageBtn2").show();
		$(".nextpageBtn2").attr("style", "display:inline-block!important")
		$('#inputSearch1').show()
		$('#inputSearch').hide()
		$('#searchBtn1').show()
		$('#searchBtn').hide()
	})
	// 培训需求
	
	var trainPage = 0; //页码
	var para = ''; //搜索关键字
	var m1 = 0;
	var m2 = 50001; //需求预算
	var a1 = 0; //年龄
	var sexVal = -1; //性别
	var daysVal = 365; //几天前
	var addressVal = ''; //地址
	var sortVal = ''; //需求分类
	var workBgVal = ''; //工作背景
	var jobOldVal = ''; //曾任职
	var isauthen = -1; //是否认证
	//咨询需求
	var advisoryPage = 0; //页码
	var para2 = ''; //搜索关键字
	var wcm1 = 0;
	var wcm2 = 1000000000; //预算
	var cm1 = 0;
	var cm2 = 50000; //师资费
	var a21 = 0;
	var a22 = 200; //年龄
	var modeVal = 0; //模式
	var fieldVal = ''; //领域
	var tradeVal = ''; //行业
	var areaVal = ''; //地址
	var sex2Val = 2; //性别
	var workBg2Val = ''; //背景
	var jobOld2Val = ''; //曾任职
	var days2Val = 365; //几天前
	var isauthen2 = 0; //是否认证

	var href = location.href;
	var hrefDetails = decodeURIComponent(href);
	//登陆退出
	var href = location.href;
	var dataC = localStorage.getItem("GHY_login");
	if (dataC != null) {
		var dataInfo = JSON.parse(dataC);
		$('#loginBtn').text(dataInfo.username);
		$("#regBtn").on("click", function() {
			localStorage.removeItem("GHY_login");
			window.location.reload();
		}).text("退出")

	} else {
		$('#loginBtn').click(function() {
			location.href = "./innerLogin.html?href=" + href + "";
		}).text("登录");
		$("#regBtn").on("click", function() {
			location.href = "http://www.eqidd.com/html/reg.html?href=" + href + "";
		}).text("注册")
	}	
	var dataC = localStorage.getItem("GHY_login");
	///////////////////////////////////////////////////////////////////////////////////////////////
	//搜索培训需求结果表
	function loadTrainTabel(data) {
		$('#demandListTable').bootstrapTable({
			columns: [{
				field: 'teacherDetails',
				align: 'center',
				valign: 'middle',
				formatter: searchFormatter,
				events: searchEvents
			}, ],
			data: data
		});

		function searchFormatter(e, value, row, index) {
			var yourtime = value.thedateEnd;
			var addSpan;
			var d2 = new Date(); //取今天的日期
			var d1 = new Date(Date.parse(yourtime));
			if (d1 < d2) {
				addSpan = '已结束'
			} else {
				addSpan = '进行中'
			}
			
			return '<div class="clearfix demandDetailsDiv"> <div class="userInfor"><p><span>' + value.theTheme + '</span><span>需求预算：' + value.budgetedExpense + '</span> </p><p> <span> 所属类别：' + value.type + '</span>  </p> <div class="information"><p><img src="../image/flocation.png">举办城市：' + value.theplace + ' </p> <p><img src="../image/time2.png">活动时间：' + value.createTime.split("T")[0] + '</p>  </div> </div> <p class="authen">' + addSpan + '</p>   </div>'
		}
	}
	window.searchEvents = {
		'click .demandDetailsDiv': function(e, value, row, index) {
			window.open("http://www.eqidd.com/changke/html/needDetail.html?id=" + row.Id + "")
		}
	}
	//搜索咨询需求结果表
	function loadAdvisoryTabel(data) {
		$('#advisoryTable').bootstrapTable({
			columns: [{
				field: 'advisoryDetails',
				align: 'center',
				valign: 'middle',
				formatter: searchFormatter2,
				events: searchEvents2
			}, ],
			data: data
		});

		function searchFormatter2(e, value, row, index) {
			var yourtime = value.B_endTime;
			var addSpan;
			var d2 = new Date(); //取今天的日期
			var d1 = new Date(Date.parse(yourtime));
			if (d1 < d2) {
				addSpan = '<span id="adjustShow1">已结束</span>'
			} else {
				addSpan = '<span id="adjustShow">进行中</span>'
			}
			var time = value.createTime.split("T")[0];
			return '<div class="clearfix demandDetailsDiv"> <div class="userInfor"><p><span>' + value.B_theme + '</span><span>需求预算：' + value.B_cost + '</span> </p><p> <span> 所属类别：' + value.B_industry + '</span>  </p> <div class="information"><p><img src="../image/flocation.png">举办城市：' + value.B_area + ' </p> <p><img src="../image/time2.png">活动时间：' + time + '</p>  </div> </div> <p class="authen">' + addSpan + '</p>   </div>'
		}
	}
	window.searchEvents2 = {
		'click .demandDetailsDiv': function(e, value, row, index) {
			window.open("http://www.eqidd.com/changke/html/needsAdDetails.html?id=" + row.Id + "")
		}
	}
	/////////////////////////////////////////////////////////////////////////////////////////////////////// 

	//查询培训需求
	function searchTrain(page, para, a1, m1, m2, sexVal, workBgVal, jobOldVal, sortVal, addressVal, days, isauthen) {
		$('.typeArea').show();
		$(".nextpageBtn2").hide();
		$.post('' + http_head + '/Training/searchDemadTraining.ashx', {
			"page": page,
			"para": para,
			"priceMin": m1,
			"priceMax": m2,
			"ageMin": a1,
			"sex": sexVal,
			"workBg": workBgVal,
			"post": jobOldVal,
			"type": sortVal,
			"place": addressVal,
			"days": days,
			"isauthen": isauthen
		}, function(data) {
			var data = JSON.parse(data);
//			console.log(data)
			loadTrainTabel(data.items);
			if (data.items.length > 0) {
				layer.msg('搜索成功', {
					time: 1000,
				});
			} else {
				layer.msg('暂无搜索结果', {
					time: 1000,
				});
			}
			$("#demandListTable").bootstrapTable("load", data.items);
			trainPage = data.page;
			if (trainPage < 1) {

				if (data.items.length >= 12) {
					$('.nextpageBtn').show()
				} else {

					$('.nextpageBtn').hide()
				}
			} else {
				if (data.items.length >= 12) {
					$('.nextpageBtn').show()
				} else {
					$('.nextpageBtn').hide()
				}
			}
		})
	}
	//查询咨询需求
	function searchAdvisory(page2, para2, wcm1, wcm2, cm1, cm2, a21, a22, sex2Val, workBg2Val, jobOld2Val, areaVal,
		modeVal, fieldVal, tradeVal, days2Val, isauthen2) {
		$('.typeArea').show();
		$(".nextpageBtn").hide();
		console.log(para2)
		$.post('' + http_head + '/Advisers/NeedOfAdvisers/search_needOfAdvisers.ashx', {
			"page": page2,
			"para": para2,
			"B_costMin": wcm1,
			"B_costMax": wcm2,
			"B_costForAdviserMin": cm1,
			"B_costForAdviserMax": cm2,
			"ageMin": a21,
			"ageMax": a22,
			"B_mode": modeVal,
			"sex": sex2Val,
			"C_workBg": workBg2Val,
			"C_post": jobOld2Val,
			"B_industry": tradeVal,
			"B_lingyu": fieldVal,
			"B_area": areaVal,
			"days": days2Val,
			"authen": isauthen2
		}, function(data) {
			var data = JSON.parse(data);
			console.log(data)
			loadAdvisoryTabel(data.items);
			if (data.items.length > 0) {
				layer.msg('搜索成功', {
					time: 1000,
				});
			} else {
				layer.msg('暂无搜索结果', {
					time: 1000,
				});
			}
			$("#advisoryTable").bootstrapTable("load", data.items);
			advisoryPage = data.page;
			if (advisoryPage < 1) {

				if (data.items.length >= 10) {
					$('.nextpageBtn2').show()
				} else {

					$('.nextpageBtn2').hide()
				}
			} else {
				if (data.items.length >= 10) {
					$('.nextpageBtn2').show()
				} else {
					$('.nextpageBtn2').hide()
				}
			}
		})
	}
	// 加载培训需求下一页
	function searchTrainNext(page, para, a1, m1, m2, sexVal, workBgVal, jobOldVal, sortVal, addressVal, days,
		isauthen) {
		$('.typeArea').show();
		$(".nextpageBtn2").hide();
		$.post('' + http_head + '/Training/searchDemadTraining.ashx', {
			"page": page,
			"para": para,
			"priceMin": m1,
			"priceMax": m2,
			"ageMin": a1,
			"sex": sexVal,
			"workBg": workBgVal,
			"post": jobOldVal,
			"type": sortVal,
			"place": addressVal,
			"days": days,
			"isauthen": isauthen
		}, function(data) {
			var data = JSON.parse(data);
			loadTrainTabel(data.items);
			if (data.items.length > 0) {
				layer.msg('搜索成功', {
					time: 1000,
				});
			} else {
				layer.msg('暂无搜索结果', {
					time: 1000,
				});
			}
			$("#demandListTable").bootstrapTable("append", data.items);
			trainPage = data.page;
			if (trainPage < 1) {

				if (data.items.length >= 10) {
					$('.nextpageBtn').show()
				} else {

					$('.nextpageBtn').hide()
				}
			} else {
				if (data.items.length >= 10) {
					$('.nextpageBtn').show()

				} else {
					$('.nextpageBtn').hide()

				}
			}
		})
	}
	$('.nextpageBtn').click(function() {
		searchTrainNext(trainPage, para, a1, m1, m2, sexVal, workBgVal, jobOldVal, sortVal, addressVal, daysVal, isauthen);
	});
	//咨询需求下一页
	function searchAdvisoryNext(page2, para2, wcm1, wcm2, cm1, cm2, a21, a22, sex2Val, workBg2Val, jobOld2Val, areaVal,
		modeVal, fieldVal, tradeVal, days2Val, isauthen2) {
		$('.typeArea').show();
		$(".nextpageBtn").hide();
		$.post('' + http_head + '/Advisers/NeedOfAdvisers/search_needOfAdvisers.ashx', {
			"page": page2,
			"para": para2,
			"B_costMin": wcm1,
			"B_costMax": wcm2,
			"B_costForAdviserMin": cm1,
			"B_costForAdviserMax": cm2,
			"ageMin": a21,
			"ageMax": a22,
			"B_mode": modeVal,
			"sex": sex2Val,
			"C_workBg": workBg2Val,
			"C_post": jobOld2Val,
			"B_industry": tradeVal,
			"B_lingyu": fieldVal,
			"B_area": areaVal,
			"days": days2Val,
			"authen": isauthen2
		}, function(data) {
			var data = JSON.parse(data);
			loadAdvisoryTabel(data.items);
			if (data.items.length > 0) {
				layer.msg('搜索成功', {
					time: 1000,
				});
			} else {
				layer.msg('暂无搜索结果', {
					time: 1000,
				});
			}
			$("#advisoryTable").bootstrapTable("append", data.items);
			advisoryPage = data.page;
			if (advisoryPage < 1) {

				if (data.items.length >= 10) {
					$('.nextpageBtn2').show()
				} else {

					$('.nextpageBtn2').hide()
				}
			} else {
				if (data.items.length >= 10) {
					$('.nextpageBtn2').show()
				} else {
					$('.nextpageBtn2').hide()
				}
			}
		})
	}
	$('.nextpageBtn2').click(function() {
		searchAdvisoryNext(advisoryPage, para2, wcm1, wcm2, cm1, cm2, a21, a22, modeVal, fieldVal, tradeVal, areaVal,
			sex2Val, workBg2Val, jobOld2Val, days2Val, isauthen2);
	});
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 培训需求地址
	var chinaObj = JSON.parse(chinaArea);
	//获取所有省份的数组
	var province = chinaObj.china.province;
	// 城市变量
	var cities;
	for (var i = 0; i < province.length; i++) {
		// 循环显示省份
		$("#select2").append("<dd><a value='" + province[i]["-code"] + "'>" + province[i]["-name"] + "</a></dd>")
	}
	$("#select2 dd").on("click", function() {
		var index = $(this).index();
		if ($('#inputSearch').val().length != 0) {
			para = $('#inputSearch').val()
		}
		if (index == 1) {
			// $("#city").replaceWith("<dl id='city'></dl>");
			addressVal = "";			
		} else {
			// $("#city").replaceWith("<dl id='city'><dt>市区：</dt></dl>");
			addressVal = $(this).text().trim()
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
		trainPage = 0;
		searchTrain(trainPage, para, a1, m1, m2, sexVal, workBgVal, jobOldVal, sortVal, addressVal, daysVal,
			isauthen);
		// 省份点击事件
		// $(this).addClass("selected").siblings().removeClass("selected");
		// 每次点击省清空城市列表
// 		$("#selectB").remove();
// 
// 		for (var i = 0; i < province.length; i++) {
// 			if (province[i]["-code"] == $(this).children("a").attr("value")) {
// 				cities = province[i].city;
// 				for (var j = 0; j < cities.length; j++) {
// 					// 循环显示城市
// 					if (i == 0 || i == 1 || i == 8 || i == 21) {
// 						var county = cities[j].county;
// 						for (var n = 0; n < county.length; n++) {
// 							$("#city").append("<dd><a >" + county[n]["-name"] + "</a></dd>")
// 						}
// 					} else if (i != 0 & i != 1 & i != 8 & i != 21) {
// 						$("#city").append("<dd><a >" + cities[j]["-name"] + "</a></dd>")
// 					}
// 				}
// 			}
// 		}
// 
// 		$("#city dd").on("click", function() {
// 			// 城市点击事件
// 			// 搜索						
// 			addressVal = $(this).text();
// 			trainPage = 0;
// 			searchTrain(trainPage, para, a1, m1, m2, sexVal, workBgVal, jobOldVal, sortVal, addressVal, daysVal,
// 				isauthen);
// 
// 			$(this).addClass("selected").siblings().removeClass("selected");
// 
// 			// 复制标签
// 			var copyThisB = $(this).clone();
// 
// 			if ($("#selectB").length > 0) {
// 				// 填充标签
// 				$("#selectB a").html($(this).text());
// 			} else {
// 				$(".select-result dl").append(copyThisB.attr("id", "selectB"));
// 			}
// 
// 		})
	})
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 咨询需求地址
	for (var i = 0; i < province.length; i++) {
		// 循环显示省份
		$("#select9").append("<dd><a value='" + province[i]["-code"] + "'>" + province[i]["-name"] + "</a></dd>")
	}
	$("#select9 dd").on("click", function() {
		var index = $(this).index();
		if ($('#inputSearch').val().length != 0) {
			para2 = $('#inputSearch').val()
		}
		if (index == 1) {
			// $("#city").replaceWith("<dl id='city'></dl>");
			areaVal = "";			
		} else {
			// $("#city").replaceWith("<dl id='city'><dt>市区：</dt></dl>");
			areaVal = $(this).text().trim()
		}
		$(this).addClass("selected").siblings().removeClass("selected");
		if ($(this).hasClass("select-all")) {
			$("#selectJ").remove();
		} else {
			var copyThisJ = $(this).clone();
			if ($("#selectJ").length > 0) {
				// 填充标签				
				$("#selectJ a").html($(this).text());
			} else {
				$(".select-result2 dl").append(copyThisJ.attr("id", "selectJ"));
			}
		}
		advisoryPage = 0;
		searchAdvisory(advisoryPage, para2, wcm1, wcm2, cm1, cm2, a21, a22, sex2Val, workBg2Val, jobOld2Val, areaVal,
			modeVal, fieldVal, tradeVal, days2Val, isauthen2);
		// 省份点击事件
		// $(this).addClass("selected").siblings().removeClass("selected");
		// 每次点击省清空城市列表
// 		$("#selectJ").remove();
// 		for (var i = 0; i < province.length; i++) {
// 			if (province[i]["-code"] == $(this).children("a").attr("value")) {
// 				cities = province[i].city;
// 				for (var j = 0; j < cities.length; j++) {
// 					// 循环显示城市
// 					if (i == 0 || i == 1 || i == 8 || i == 21) {
// 						var county = cities[j].county;
// 						for (var n = 0; n < county.length; n++) {
// 							$("#city2").append("<dd><a >" + county[n]["-name"] + "</a></dd>")
// 						}
// 					} else if (i != 0 & i != 1 & i != 8 & i != 21) {
// 						$("#city2").append("<dd><a >" + cities[j]["-name"] + "</a></dd>")
// 					}
// 				}
// 			}
// 		}
// 		$("#city2 dd").on("click", function() {
// 			// 城市点击事件
// 			// 搜索						
// 			areaVal = $(this).text();
// 			advisoryPage = 0;
// 			searchAdvisory(advisoryPage, para2, wcm1, wcm2, cm1, cm2, a21, a22, sex2Val, workBg2Val, jobOld2Val, areaVal,
// 				modeVal, fieldVal, tradeVal, days2Val, isauthen2);
// 
// 			$(this).addClass("selected").siblings().removeClass("selected");
// 
// 			// 复制标签
// 			var copyThisJ = $(this).clone();
// 
// 			if ($("#selectJ").length > 0) {
// 				// 填充标签
// 				$("#selectJ a").html($(this).text());
// 			} else {
// 				$(".select-result2 dl").append(copyThisJ.attr("id", "selectJ"));
// 			}
// 
// 		})
	})
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 咨询模式
	var modeArr = [1, 2];
	$("#select10 dd").on("click", function() {
		var index = $(this).index();
		if (index >= 2) {
			modeVal = modeArr[index - 2];
		} else {
			modeVal = 0;		
		}
		advisoryPage = 0;
		searchAdvisory(advisoryPage, para2, wcm1, wcm2, cm1, cm2, a21, a22, sex2Val, workBg2Val, jobOld2Val, areaVal,
			modeVal, fieldVal, tradeVal, days2Val, isauthen2);
		$(this).addClass("selected").siblings().removeClass("selected");
		if ($(this).hasClass("select-all")) {
			$("#selectK").remove();
		} else {
			var copyThisK = $(this).clone();
			if ($("#selectK").length > 0) {
				$("#selectK a").html($(this).text());
			} else {
				$(".select-result2 dl").append(copyThisK.attr("id", "selectK"));
			}
		}
	})
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//咨询类型
	var fieldArr = ["战略与商业模式咨询", "人力资源管理咨询", "猎头服务", "业务流程咨询", "供应链管理咨询", "市场营销咨询", "生产制造咨询", "会计与税务咨询",
		"风险投资咨询", "风险与危机管理", "市场调查咨询", "投资咨询", "认证咨询", "IT咨询", "工程咨询", "法律咨询", "房地产咨询", "出口及报关咨询", "广告策划咨询", "心理健康咨询",
		"旅游咨询", "保险咨询", "节能咨询", "环境评估咨询", "翻译服务", "其它咨询"
	];
	for (var i = 0; i < fieldArr.length; i++) {
		$("#select11").append("<dd><a >" + fieldArr[i] + "</a></dd>")
	}
	$("#select11 dd").click(function() {
		var index = $(this).index();
		advisoryPage = 0;
		if (index >= 2) {
			fieldVal = $(this).text();
		} else {
			fieldVal = '';
		}
		searchAdvisory(advisoryPage, para2, wcm1, wcm2, cm1, cm2, a21, a22, sex2Val, workBg2Val, jobOld2Val, areaVal,
			modeVal, fieldVal, tradeVal, days2Val, isauthen2);

		$(this).addClass("selected").siblings().removeClass("selected");
		if ($(this).hasClass("select-all")) {
			$("#selectL").remove();
		} else {
			var copyThisL = $(this).clone();
			if ($("#selectL").length > 0) {
				$("#selectL a").html($(this).text());
			} else {
				$(".select-result2 dl").append(copyThisL.attr("id", "selectL"));
			}
		}
	});

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///咨询行业
	var industryList = ["机械设备、通用零部件", "旅游、餐饮、住宿、娱乐、休闲、购物", "生活服务", "纺织 皮革 服装 鞋帽", "家具 生活用品 食品", "通信 邮政 计算机 网络", "医疗保健 社会福利", "电子电器 仪器仪表", "金融 保险 证券 投资", "交通物流 运输设备", "城建 房产 建材 装潢", "石油/化工/煤炭/橡胶塑料", "钟表眼镜/工艺品/礼品", "造纸/纸品/印刷/包装", "新闻/出版/科研/教育", "农/林/牧/渔", "广告/会展/商务办公 咨询培训业", "冶金冶炼/金属及非金属制品", "贸易/批发/市场","党政机关/社会团体/非盈利机构"];
	for (var i = 0; i < industryList.length; i++) {
		$("#select12 ").append("<dd><a >" + industryList[i] + "</a></dd>")
	}
	$("#select12 dd").on("click", function() {
		tradeVal = $(this).text().trim();
		advisoryPage = 0;
		searchAdvisory(advisoryPage, para2, wcm1, wcm2, cm1, cm2, a21, a22, sex2Val, workBg2Val, jobOld2Val, areaVal,
			modeVal, fieldVal, tradeVal, days2Val, isauthen2);
		$(this).addClass("selected").siblings().removeClass("selected");
		if ($(this).hasClass("select-all")) {
			$("#selectM").remove();
		} else {
			var copyThisM = $(this).clone();
			if ($("#selectM").length > 0) {
				$("#selectM a").html($(this).text());
			} else {
				$(".select-result2 dl").append(copyThisM.attr("id", "selectM"));
			}
		}
	})

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////培训需求几天前
	var timeVal = ["0.5天", "1天", "1.5天", "2天", "2.5天", "3天", "4天", "5天", "6天", "6-9天", "9-15天", "15天以上"];
	var timeList = ["0~0.5", "0.5~1", "1.0~1.5", "1.5~2", "2.0~2.5", "2.5~3", "3.0~4", "4.0~5", "5.0~6",
		"6.0~9", "9.0~15", "15.0~1000","16.0~1000"
	];
	for (var i = 0; i < timeVal.length; i++) {
		$("#select2-1 ").append("<dd><a >" + timeVal[i] + "</a></dd>")
	}
	$("#select2-1 dd").click(function() {
		var index = $(this).index();
		if (index >= 2) {
			var timestr = timeList[index - 1];
			daysVal = timestr.split("~")[0];
		} else {
			daysVal = 365;
		}
		trainPage = 0;
		searchTrain(trainPage, para, a1, m1, m2, sexVal, workBgVal, jobOldVal, sortVal, addressVal, daysVal,
			isauthen);

		$(this).addClass("selected").siblings().removeClass("selected");
		if ($(this).hasClass("select-all")) {
			$("#selectI").remove();
		} else {
			var copyThisI = $(this).clone();
			if ($("#selectI").length > 0) {
				$("#selectI a").html($(this).text());
			} else {
				$(".select-result dl").append(copyThisI.attr("id", "selectI"));
			}
		}
	});
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////咨询需求几天前
	for (var i = 0; i < timeVal.length; i++) {
		$("#select14 ").append("<dd><a >" + timeVal[i] + "</a></dd>")
	}
	$("#select14 dd").click(function() {
		var index = $(this).index();

		if (index >= 2) {
			var timestr = timeList[index - 2];
			days2Val = timestr.split("~")[0];
		} else {
			days2Val = 365;
		}
		advisoryPage = 0;
		searchAdvisory(advisoryPage, para2, wcm1, wcm2, cm1, cm2, a21, a22, sex2Val, workBg2Val, jobOld2Val, areaVal,
			modeVal, fieldVal, tradeVal, days2Val, isauthen2);

		$(this).addClass("selected").siblings().removeClass("selected");
		if ($(this).hasClass("select-all")) {
			$("#selectN").remove();
		} else {
			var copyThisN = $(this).clone();
			if ($("#selectN").length > 0) {
				$("#selectN a").html($(this).text());
			} else {
				$(".select-result2 dl").append(copyThisN.attr("id", "selectN"));
			}
		}
	});
	///////////////////////////////////////////////////////////////////////////////////////////
	// 培训需求预算

	var statusList = ["0.5K以下", "0.5K-1K", "1K-1.5K", "1.5K-2K", "2K-3K", "3K-4K", "4K-5K", "5K-6K", "6K-7K", "7K-8K",
		"8K-10K", "10K-12K", "12K-15K", "15K-20K", "20K-30K", "30K-50K", "50K以上"
	]
	var moneyList = ["0-500", "500-1000", "1000-1500", "1500-2000", "2000-3000", "3000-4000", "4000-5000", "5000-6000",
		"6000-7000", "7000-8000",
		"8000-10000", "10000-12000", "12000-15000", "15000-20000", "20000-30000", "30000-50000", "50000-1000000"
	]

	for (var i = 0; i < statusList.length; i++) {
		$("#select3 ").append("<dd><a >" + statusList[i] + "</a></dd>")
	}

	$("#select3 dd").click(function() {
		var index = $(this).index();
		if (index >= 2) {
			var moneystr = moneyList[index - 3];
			m1 = moneystr.split("-")[0];
			m2 = moneystr.split("-")[1];
		} else {
			m1 = 0;
			m2 = 50001;		
		}
		trainPage = 0;
		searchTrain(trainPage, para, a1, m1, m2, sexVal, workBgVal, jobOldVal, sortVal, addressVal, daysVal,
			isauthen);
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
	///////////////////////////////////////////////////////////////////////////////////////////
	// 咨询需求项目预算

	var statusArr = ["3万以下", "3万-5万", "5万-8万", "8万-10万", "10万-15万", "15万-20万", "20万-30万", "30万-40万", "40万-50万",
		"50万-80万",
		"80万-100万", "100万-150万", "150万-200万", "200万-300万", "300万-500万", "500万-800万", "800万-1000万", "1000万以上", "面议"
	]
	var moneyArr = ["0-30000", "30000-50000", "50000-80000", "80000-10000", "10000-150000", "150000-200000",
		"200000-300000", "300000-400000",
		"400000-500000", "500000-800000",
		"800000-1000000", "1000000-1500000", "1500000-2000000", "2000000-3000000", "3000000-5000000", "5000000-8000000",
		"8000000-10000000", "10000000-1000000000", "0-1000000000"
	]

	for (var i = 0; i < statusArr.length; i++) {
		$("#select13 ").append("<dd><a >" + statusArr[i] + "</a></dd>")
	}

	$("#select13 dd").click(function() {
		var index = $(this).index();
		advisoryPage = 0;
		if (index >= 2) {
			var moneystr = moneyArr[index - 3];
			wcm1 = moneystr.split("-")[0];
			wcm2 = moneystr.split("-")[1];
		} else {
			wcm1 = 0;
			wcm2 = 1000000000;		
		}
		searchAdvisory(advisoryPage, para2, wcm1, wcm2, cm1, cm2, a21, a22, sex2Val, workBg2Val, jobOld2Val, areaVal,
			modeVal, fieldVal, tradeVal, days2Val, isauthen2);
		$(this).addClass("selected").siblings().removeClass("selected");

		if ($(this).hasClass("select-all")) {
			$("#selectO").remove();
		} else {
			var copyThisO = $(this).clone();
			if ($("#selectO").length > 0) {
				$("#selectO a").html($(this).text());
			} else {
				$(".select-result2 dl").append(copyThisO.attr("id", "selectO"));
			}
		}
	});
	////////////////////////////////////////////////////////////////////////
	// 培训需求性别
	$("#select4 dd").on("click", function() {
		var index = $(this).index();
		if (index == 1) {
			sexVal = -1;
		} else if(index == 2) {
			sexVal = 0;	
		}else if(index == 3){
			sexVal = 1;	
		}
	
        trainPage = 0;
		searchTrain(trainPage, para, a1, m1, m2, sexVal, workBgVal, jobOldVal, sortVal, addressVal, daysVal,
				isauthen);
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
	})
	////////////////////////////////////////////////////////////////////////
	// 咨询需求性别
	var ageArr = [0, 1];
	$("#select15 dd").on("click", function() {
		var index = $(this).index();
		advisoryPage = 0;
		if (index == 1) {
			sex2Val = -1;
		} else if(index == 2) {
			sex2Val = 0;	
		}else if(index == 3){
			sex2Val = 1;	
		}
        searchAdvisory(advisoryPage, para2, wcm1, wcm2, cm1, cm2, a21, a22, sex2Val, workBg2Val, jobOld2Val, areaVal,
        	modeVal, fieldVal, tradeVal, days2Val, isauthen2);
		$(this).addClass("selected").siblings().removeClass("selected");
		if ($(this).hasClass("select-all")) {
			$("#selectP").remove();
		} else {
			var copyThisP = $(this).clone();
			if ($("#selectP").length > 0) {
				$("#selectP a").html($(this).text());
			} else {
				$(".select-result2 dl").append(copyThisP.attr("id", "selectP"));
			}
		}
	})
	///////////////////////////////////////////////////////////////////////
	// 培训需求年龄
	var ageList = ["20以下", "20-25", "25-30", "30-35", "35-40", "40-50", "50-60", "60以上"];
	var ageList2 = ["0-20", "20-25", "25-30", "30-35", "35-40", "40-50", "50-60", "60-100"];
	for (var i = 0; i < ageList.length; i++) {
		$("#select5 ").append("<dd><a >" + ageList[i] + "</a></dd>")
	}
	$("#select5 dd").click(function() {
		var index = $(this).index();
		if (index >= 2) {
			var agestr = ageList2[index - 2];
			a1 = agestr.split("-")[0];		
		} else {
			a1 = 0;
		}
		trainPage = 0;
		searchTrain(trainPage, para, a1, m1, m2, sexVal, workBgVal, jobOldVal, sortVal, addressVal, daysVal,
			isauthen);

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
	///////////////////////////////////////////////////////////////////////
	// 咨询需求年龄
	for (var i = 0; i < ageList.length; i++) {
		$("#select16 ").append("<dd><a >" + ageList[i] + "</a></dd>")
	}
	$("#select16 dd").click(function() {
		var index = $(this).index();
		advisoryPage = 0;
		if (index >= 2) {
			var agestr = ageList2[index - 2];
			a21 = agestr.split("-")[0];
			a22 = agestr.split("-")[1];
		} else {
			a21 = 0;
			a22 = 200;	
		}
		console.log($(this).text(),a21,a22)
		searchAdvisory(advisoryPage, para2, wcm1, wcm2, cm1, cm2, a21, a22, sex2Val, workBg2Val, jobOld2Val, areaVal,
			modeVal, fieldVal, tradeVal, days2Val, isauthen2);

		$(this).addClass("selected").siblings().removeClass("selected");

		if ($(this).hasClass("select-all")) {
			$("#selectQ").remove();
		} else {
			var copyThisQ = $(this).clone();
			if ($("#selectQ").length > 0) {
				$("#selectQ a").html($(this).text());
			} else {
				$(".select-result2 dl").append(copyThisQ.attr("id", "selectQ"));
			}
		}
	});
	//////////////////////////////////////////////////////////////////////////////////////////
	// 培训需求工作背景

	var jobList = ["世界500强", "中国500强", "大型国企", "大型民企", "知名日韩企业", "港澳台企业", "欧美外企", "其他"]
	for (var i = 0; i < jobList.length; i++) {
		$("#select6 ").append("<dd><a >" + jobList[i] + "</a></dd>")
	}
	$("#select6 dd").click(function() {
		var index = $(this).index();
		if (index >= 2) {
			workBgVal = $(this).text().trim();
			trainPage = 0;
		} else {
			workBgVal = '';
			trainPage = 0;	
		}
		searchTrain(trainPage, para, a1, m1, m2, sexVal, workBgVal, jobOldVal, sortVal, addressVal, daysVal,
			isauthen);

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
	//////////////////////////////////////////////////////////////////////////////////////////
	// 咨询需求工作背景

	for (var i = 0; i < jobList.length; i++) {
		$("#select17 ").append("<dd><a >" + jobList[i] + "</a></dd>")
	}
	$("#select17 dd").click(function() {
		var index = $(this).index();
		advisoryPage = 0;
		if (index >= 2) {
			workBg2Val = $(this).text().trim();
		} else {
			workBg2Val = '';	
		}
        searchAdvisory(advisoryPage, para2, wcm1, wcm2, cm1, cm2, a21, a22, sex2Val, workBg2Val, jobOld2Val, areaVal,
        	modeVal, fieldVal, tradeVal, days2Val, isauthen2);
		$(this).addClass("selected").siblings().removeClass("selected");

		if ($(this).hasClass("select-all")) {
			$("#selectR").remove();
		} else {
			var copyThisR = $(this).clone();
			if ($("#selectR").length > 0) {
				$("#selectR a").html($(this).text());
			} else {
				$(".select-result2 dl").append(copyThisR.attr("id", "selectR"));
			}
		}
	});
	///////////////////////////////////////////////////////////////////////////////////////////
	// 培训需求曾担任职位

	var jobOldList = ["总经理", "副总", "总监", "部门经理/主管", "高级工程师", "一般管理人员", "其他"];
	for (var i = 0; i < jobOldList.length; i++) {
		$("#select7").append("<dd><a >" + jobOldList[i] + "</a></dd>")
	}
	$("#select7 dd").click(function() {
		var index = $(this).index();
		if (index >= 2) {
			jobOldVal = $(this).text().trim();
		} else {
			jobOldVal = '';	
		}
		trainPage = 0;
		searchTrain(trainPage, para, a1, m1, m2, sexVal, workBgVal, jobOldVal, sortVal, addressVal, daysVal,
			isauthen);
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
	///////////////////////////////////////////////////////////////////////////////////////////
	// 咨询需求曾担任职位

	for (var i = 0; i < jobOldList.length; i++) {
		$("#select18").append("<dd><a >" + jobOldList[i] + "</a></dd>")
	}
	$("#select18 dd").click(function() {
		var index = $(this).index();
		advisoryPage = 0;
		if (index >= 2) {
			jobOld2Val = $(this).text().trim();
		} else {
			jobOld2Val = '';		
		}
		searchAdvisory(advisoryPage, para2, wcm1, wcm2, cm1, cm2, a21, a22, sex2Val, workBg2Val, jobOld2Val, areaVal,
			modeVal, fieldVal, tradeVal, days2Val, isauthen2);
		$(this).addClass("selected").siblings().removeClass("selected");

		if ($(this).hasClass("select-all")) {
			$("#selectS").remove();
		} else {
			var copyThisS = $(this).clone();
			if ($("#selectS").length > 0) {
				$("#selectS a").html($(this).text());
			} else {
				$(".select-result2 dl").append(copyThisS.attr("id", "selectS"));
			}
		}
	});
	//////////////////////////////////////////////////////////////////////////////////////////
	// 培训需求实名认证
	var approveList = ["1", "0"];
	$("#select8 dd").click(function() {
		var index = $(this).index();
		if (index == 1) {
			isauthen = -1;
		} else if(index == 2){
			isauthen = 1;	
		} else if(index == 3){
			isauthen = 0;	
		}
        trainPage = 0;
        searchTrain(trainPage, para, a1, m1, m2, sexVal, workBgVal, jobOldVal, sortVal, addressVal, daysVal,
        	isauthen);
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
	// 咨询需求实名认证
	var approveList2 = ["1", "-1"];
	$("#select19 dd").click(function() {
		var index = $(this).index();
		advisoryPage = 0;
		if (index == 1) {
			isauthen2 = 0;
		} else if(index == 2){
			isauthen2 = 1;		
		} else if(index == 3){
			isauthen2 = -1;
		}
		searchAdvisory(advisoryPage, para2, wcm1, wcm2, cm1, cm2, a21, a22, sex2Val, workBg2Val, jobOld2Val, areaVal,
			modeVal, fieldVal, tradeVal, days2Val, isauthen2);

		$(this).addClass("selected").siblings().removeClass("selected");

		if ($(this).hasClass("select-all")) {
			$("#selectT").remove();
		} else {
			var copyThisT = $(this).clone();
			if ($("#selectT").length > 0) {
				$("#selectT a").html($(this).text());
			} else {
				$(".select-result2 dl").append(copyThisT.attr("id", "selectT"));
			}
		}
	});

	//////////////////////////////////////////////////////////////////////////////////////////////////////////
	//需求分类

	$.post('' + http_head + '/Option_AreasAnd.ashx', {
		"type": 45
	}, function(data) {
		for (var i = 0; i < data.length; i++) {
			$('#select1').append('<dd id="' + i + '"><a>' + data[i].name + '</a></dd>')
		}
		$("#select1 dd").eq(0).click(function() {
			$(this).addClass("selected").siblings().removeClass("selected");
			$("#selectA").remove();
			$('#secondType').hide()
			// 全部
			sortVal = "";
			trainPage = 0;
			searchTrain(trainPage, para, a1, m1, m2, sexVal, workBgVal, jobOldVal, sortVal, addressVal, daysVal,
				isauthen);
		})
		$("#select1 dd:gt(0)").click(function() {
			$('#secondType').show()
			$(this).addClass("selected").siblings().removeClass("selected");
			$('#select1Min dd').remove()
			for (var j = 0; j < data[$(this).attr('id')].sub.length; j++) {
				// items项
				$('#select1Min').append('<dd><a>' + data[$(this).attr('id')].sub[j].name + '</a></dd>')
			}

			$("#select1Min dd").click(function() {
				var index = $(this).index();
				sortVal = $(this).text().trim();
				trainPage = 0;
				searchTrain(trainPage, para, a1, m1, m2, sexVal, workBgVal, jobOldVal, sortVal, addressVal, daysVal,
					isauthen);
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
		})
	});
	//////////////////////////////////////////////////////////////////////////////////////////////
	// 已选条件1
	$(document).on("click", "#selectA", function() {
		$(this).remove();
		$('#secondType').hide()
		$("#select1 .select-all").addClass("selected").siblings().removeClass("selected");
		$("#select1Min dd").addClass("selected").siblings().removeClass("selected");
		addressVal = "";
		trainPage = 0;
		searchTrain(trainPage, para, a1, m1, m2, sexVal, workBgVal, jobOldVal, sortVal, addressVal, daysVal, isauthen);
	});
	$(document).on("click", "#selectB", function() {
		// 地址
		$(this).remove();
		$("#city").replaceWith("<dl id='city'></dl>");
		$("#select2 .select-all").addClass("selected").siblings().removeClass("selected");
		$("#city dd").removeClass("selected")
		addressVal = "";
		trainPage = 0;
		searchTrain(trainPage, para, a1, m1, m2, sexVal, workBgVal, jobOldVal, sortVal, addressVal, daysVal, isauthen);
	});
	$(document).on("click", "#selectC", function() {
		$(this).remove();
		$("#select3 .select-all").addClass("selected").siblings().removeClass("selected");
		m1 = 0,
			m2 = 1000000;
		trainPage = 0;
		searchTrain(trainPage, para, a1, m1, m2, sexVal, workBgVal, jobOldVal, sortVal, addressVal, daysVal, isauthen);
	});
	$(document).on("click", "#selectD", function() {
		$(this).remove();
		$("#select4 .select-all").addClass("selected").siblings().removeClass("selected");
		sexVal = -1;
		trainPage = 0;
		searchTrain(trainPage, para, a1, m1, m2, sexVal, workBgVal, jobOldVal, sortVal, addressVal, daysVal, isauthen);
	});
	$(document).on("click", "#selectE", function() {
		$(this).remove();
		$("#select5 .select-all").addClass("selected").siblings().removeClass("selected");
		a1 = 0,
			trainPage = 0;
		searchTrain(trainPage, para, a1, m1, m2, sexVal, workBgVal, jobOldVal, sortVal, addressVal, daysVal, isauthen);
	});
	$(document).on("click", "#selectF", function() {
		$(this).remove();
		$("#select6 .select-all").addClass("selected").siblings().removeClass("selected");
		workBgVal = "";
		trainPage = 0;
		searchTrain(trainPage, para, a1, m1, m2, sexVal, workBgVal, jobOldVal, sortVal, addressVal, daysVal, isauthen);
	});
	$(document).on("click", "#selectG", function() {
		$(this).remove();
		$("#select7 .select-all").addClass("selected").siblings().removeClass("selected");
		jobOldVal = "";
		trainPage = 0;
		searchTrain(trainPage, para, a1, m1, m2, sexVal, workBgVal, jobOldVal, sortVal, addressVal, daysVal, isauthen);
	});
	$(document).on("click", "#selectH", function() {
		$(this).remove();
		$("#select8 .select-all").addClass("selected").siblings().removeClass("selected");
		isauthen = -1;
		trainPage = 0;
		searchTrain(trainPage, para, a1, m1, m2, sexVal, workBgVal, jobOldVal, sortVal, addressVal, daysVal, isauthen);
	});
	$(document).on("click", "#selectI", function() {
		$(this).remove();
		$("#select2-1 .select-all").addClass("selected").siblings().removeClass("selected");
		// 搜搜
		days = 365;
		trainPage = 0;
		searchTrain(trainPage, para, a1, m1, m2, sexVal, workBgVal, jobOldVal, sortVal, addressVal, daysVal, isauthen);
	});
	$(document).on("click", ".select dd", function() {
		if ($(".select-result dd").length > 1) {
			$(".select-no").hide();
		} else {
			$(".select-no").show();
		}
	});
	$(document).on("click", ".select2 dd", function() {
		if ($(".select-result dd").length > 1) {
			$(".select-no").hide();
		} else {
			$(".select-no").show();
		}
	});
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 咨询已选条件
	$(document).on("click", "#selectJ", function() {
		$(this).remove();
		$("#city2").replaceWith("<dl id='city2'></dl>");
		$("#select9 .select-all").addClass("selected").siblings().removeClass("selected");
		$("#city2 dd").removeClass("selected")
		areaVal = "";
		advisoryPage = 0;
		searchAdvisory(advisoryPage, para2, wcm1, wcm2, cm1, cm2, a21, a22, sex2Val, workBg2Val, jobOld2Val, areaVal,
			modeVal, fieldVal, tradeVal, days2Val, isauthen2);
	});
	$(document).on("click", "#selectK", function() {
		$(this).remove();
		$("#select10 .select-all").addClass("selected").siblings().removeClass("selected");
		// 搜搜
		modeVal = 0;
		advisoryPage = 0;
		searchAdvisory(advisoryPage, para2, wcm1, wcm2, cm1, cm2, a21, a22, sex2Val, workBg2Val, jobOld2Val, areaVal,
			modeVal, fieldVal, tradeVal, days2Val, isauthen2);
	});
	$(document).on("click", "#selectL", function() {
		$(this).remove();
		$("#select11 .select-all").addClass("selected").siblings().removeClass("selected");
		// 搜搜
		fieldVal = '';
		advisoryPage = 0;
		searchAdvisory(advisoryPage, para2, wcm1, wcm2, cm1, cm2, a21, a22, sex2Val, workBg2Val, jobOld2Val, areaVal,
			modeVal, fieldVal, tradeVal, days2Val, isauthen2);
	});
	$(document).on("click", "#selectM", function() {
		// 行业
		$(this).remove();
		$("#select12 .select-all").addClass("selected").siblings().removeClass("selected");
		tradeVal = "";
		advisoryPage = 0;
		searchAdvisory(advisoryPage, para2, wcm1, wcm2, cm1, cm2, a21, a22, sex2Val, workBg2Val, jobOld2Val, areaVal,
			modeVal, fieldVal, tradeVal, days2Val, isauthen2);
	});
	$(document).on("click", "#selectN", function() {
		$(this).remove();
		$("#select14 .select-all").addClass("selected").siblings().removeClass("selected");
		// 搜搜
		days2Val = '';
		advisoryPage = 0;
		searchAdvisory(advisoryPage, para2, wcm1, wcm2, cm1, cm2, a21, a22, sex2Val, workBg2Val, jobOld2Val, areaVal,
			modeVal, fieldVal, tradeVal, days2Val, isauthen2);
	});
	$(document).on("click", "#selectO", function() {
		$(this).remove();
		$("#select13 .select-all").addClass("selected").siblings().removeClass("selected");
		// 搜搜
		wcm1 = 0;
		wcm2 = 1000000000;
		advisoryPage = 0;
		searchAdvisory(advisoryPage, para2, wcm1, wcm2, cm1, cm2, a21, a22, sex2Val, workBg2Val, jobOld2Val, areaVal,
			modeVal, fieldVal, tradeVal, days2Val, isauthen2);
	});
	$(document).on("click", "#selectP", function() {
		$(this).remove();
		$("#select15 .select-all").addClass("selected").siblings().removeClass("selected");
		// 搜搜
		sex2Val = 2;
		advisoryPage = 0;
		searchAdvisory(advisoryPage, para2, wcm1, wcm2, cm1, cm2, a21, a22, sex2Val, workBg2Val, jobOld2Val, areaVal,
			modeVal, fieldVal, tradeVal, days2Val, isauthen2);
	});
	$(document).on("click", "#selectQ", function() {
		$(this).remove();
		$("#select16 .select-all").addClass("selected").siblings().removeClass("selected");
		// 搜搜
		a21 = 0;
		a22 = 200;
		advisoryPage = 0;
		searchAdvisory(advisoryPage, para2, wcm1, wcm2, cm1, cm2, a21, a22, sex2Val, workBg2Val, jobOld2Val, areaVal,
			modeVal, fieldVal, tradeVal, days2Val, isauthen2);
	});
	$(document).on("click", "#selectR", function() {
		$(this).remove();
		$("#select17 .select-all").addClass("selected").siblings().removeClass("selected");
		// 搜搜
		workBg2Val = '';
		advisoryPage = 0;
		searchAdvisory(advisoryPage, para2, wcm1, wcm2, cm1, cm2, a21, a22, sex2Val, workBg2Val, jobOld2Val, areaVal,
			modeVal, fieldVal, tradeVal, days2Val, isauthen2);
	});
	$(document).on("click", "#selectS", function() {
		$(this).remove();
		$("#select18 .select-all").addClass("selected").siblings().removeClass("selected");
		// 搜搜
		jobOld2Val = '';
		advisoryPage = 0;
		searchAdvisory(advisoryPage, para2, wcm1, wcm2, cm1, cm2, a21, a22, sex2Val, workBg2Val, jobOld2Val, areaVal,
			modeVal, fieldVal, tradeVal, days2Val, isauthen2);
	});
	$(document).on("click", "#selectT", function() {
		$(this).remove();
		$("#select19 .select-all").addClass("selected").siblings().removeClass("selected");
		// 搜搜
		isauthen2 = '';
		advisoryPage = 0;
		searchAdvisory(advisoryPage, para2, wcm1, wcm2, cm1, cm2, a21, a22, sex2Val, workBg2Val, jobOld2Val, areaVal,
			modeVal, fieldVal, tradeVal, days2Val, isauthen2);
	});
	$(document).on("click", ".select2 dd", function() {
		if ($(".select-result2 dd").length > 1) {
			$(".select-no").hide();
		} else {
			$(".select-no").show();
		}
	});
	//////////////////////////////////////////////////////////////////////////////////////////////
	// 搜索框
	$('#searchBtn').click(function(e) {
		if ($('#inputSearch').val().length == 0) {
			layer.msg('搜索关键字不能为空', {
				time: 1000,
			});
		} else {
			trainPage = 0;
			paraTrain = $('#inputSearch').val()
			searchTrain(trainPage, paraTrain, a1, m1, m2, sexVal, workBgVal, jobOldVal, sortVal, addressVal, daysVal,
				isauthen);
		}
	});
	$('#inputSearch').keydown(function(event) {
		if (event.keyCode === 13) {
			if ($('#inputSearch').val().length == 0) {
				layer.msg('搜索关键字不能为空', {
					time: 1000,
				});
			} else {
				trainPage = 0;
				paraTrain = $('#inputSearch').val()
				searchTrain(trainPage, paraTrain, a1, m1, m2, sexVal, workBgVal, jobOldVal, sortVal, addressVal, daysVal,
					isauthen);
			}
		}
	});
	$('#searchBtn1').click(function(e) {
		if ($('#inputSearch1').val().length == 0) {
			layer.msg('搜索关键字不能为空', {
				time: 1000,
			});
		} else {
			para2 = $('#inputSearch1').val()
			advisoryPage = 0;
			searchAdvisory(advisoryPage, para2, wcm1, wcm2, cm1, cm2, a21, a22, sex2Val, workBg2Val, jobOld2Val, areaVal,
			modeVal, fieldVal, tradeVal, days2Val, isauthen2);
		}
	});
	$('#inputSearch1').keydown(function(event) {
		if (event.keyCode === 13) {
			if ($('#inputSearch1').val().length == 0) {
				layer.msg('搜索关键字不能为空', {
					time: 1000,
				});
			} else {
				advisoryPage = 0;
				para2 = $('#inputSearch1').val()
				searchAdvisory(advisoryPage, para2, wcm1, wcm2, cm1, cm2, a21, a22, sex2Val, workBg2Val, jobOld2Val, areaVal,
				modeVal, fieldVal, tradeVal, days2Val, isauthen2);
			}
		}
	});
	$('#searchBtn').click(function() {
	    if ($('#inputSearch').val().length == 0) {
	        layer.msg('搜索关键字不能为空', {
	            time: 1000,
	        });
	    } else {
	        if ($('#selectType').val() == "1") {
	            window.open("./teacherIndex.html?searchVal=" + $('#inputSearch').val() + "");

	        } else if ($('#selectType').val() == "2") {
	            window.open("./advisory.html?advName=" + $('#inputSearch').val() + "")
	        } else if ($('#selectType').val() == "3") {
//	            window.open("./lookDemandList.html?demandName=" + $('#inputSearch').val() + "")
//				$("#advisoryTable").load(location.href+" #advisoryTable");
	        } else if ($('#selectType').val() == "4") {
	            window.open("http://www.eqidd.com/yqy/search.html?searchKey=" + $('#inputSearch').val() + "")
	        } else if ($('#selectType').val() == "5") {
	            window.open("./lookActivity.html?activityName=" + $('#inputSearch').val() + "")
	        } else if($('#selectType').val() == "6"){
				window.open("./organization.html?orgName=" + $('#inputSearch').val() + "")
			}else if($('#selectType').val() == "7"){
				window.open("./lookCourseList.html?couName=" + $('#inputSearch').val() + "")
			}
	    }
	});
	$('#inputSearch').keydown(function(event) {
	    if (event.keyCode === 13) {
	        if ($('#inputSearch').val().length == 0) {
	            layer.msg('搜索关键字不能为空', {
	                time: 1000,
	            });
	        } else {
	            if ($('#selectType').val() == "1") {
	                window.open("./teacherIndex.html?searchVal=" + $('#inputSearch').val() + "");
	            } else if ($('#selectType').val() == "2") {
	                 window.open("./advisory.html?advName=" + $('#inputSearch').val() + "")
	            } else if ($('#selectType').val() == "3") {
//	                window.open("./lookDemandList.html?demandName=" + $('#inputSearch').val() + "")
	            } else if ($('#selectType').val() == "4") {
	                 window.open("http://www.eqidd.com/yqy/search.html?searchKey=" + $('#inputSearch').val() + "")
	            } else if ($('#selectType').val() == "5") {
	                window.open("./lookActivity.html?activityName=" + $('#inputSearch').val() + "")
	            } else if($('#selectType').val() == "6"){
					window.open("./organization.html?orgName=" + $('#inputSearch').val() + "")
				}else if($('#selectType').val() == "7"){
					window.open("./lookCourseList.html?couName=" + $('#inputSearch').val() + "")
				}
	        }
	    }
	});
	var schUrlPara;
	if (href.indexOf("?")>0 && href.indexOf("demandName")>0) {
		var demandDetails = hrefDetails.split("=")[1];
		// 首页搜索
	    schUrlPara =decodeURI(href.split("=")[1],"UTF-8");
		searchTrain(trainPage, schUrlPara, a1, m1, m2, sexVal, workBgVal, jobOldVal, sortVal, addressVal, daysVal, isauthen);
	
		searchAdvisory(advisoryPage, schUrlPara, wcm1, wcm2, cm1, cm2, a21, a22, sex2Val, workBg2Val, jobOld2Val, areaVal,
			modeVal, fieldVal, tradeVal, days2Val, isauthen2);
	} else {
		searchTrain(trainPage, para, a1, m1, m2, sexVal, workBgVal, jobOldVal, sortVal, addressVal, daysVal, isauthen);
	
		searchAdvisory(advisoryPage, para2, wcm1, wcm2, cm1, cm2, a21, a22, sex2Val, workBg2Val, jobOld2Val, areaVal,
			modeVal, fieldVal, tradeVal, days2Val, isauthen2);
	}
	///////////////////////////////////////////////////////////////////////////////////////////////
	// 推荐培训需求/////////////////////////////////////////////////////////////////////////////////
	setTimeout(function() {
		tjDemand1()
	}, 200)
	// 滚动
	var $this1 = $("#trDemand");
	var scrollTimer1;
	$this1.hover(function() {
		clearInterval(scrollTimer1);
	}, function() {
		scrollTimer1 = setInterval(function() {
			scrollNews($this1);
		}, 2000);
	
		function scrollNews(obj) {
			var $self = obj.find("ul");
			var lineHeight = $self.find("li:first").height();
			$self.animate({
				"marginTop": -81 +"px"
			}, 600, function() {
				$self.css({
					marginTop: 0
				}).find("li:first").appendTo($self);
			})
		}
	}).trigger("mouseleave");
	   
	function tjDemand1() {
		$.post('' + http_head + '/Admin/side/NeedTrain_sideGetList.ashx', {
			page: 0
		}, function(data) {
			var dataTj = JSON.parse(data);
			for (var itemValue of dataTj.items) {
				var str = '<li class="clearfix" id="' + itemValue.TrainNeedId + '"><p>' + itemValue.theTheme + '</p><p><span>' +
					itemValue.thedateStart.split(" ")[0] + '</span>~<span>' + itemValue.thedateEnd.split(" ")[0] +
					'</span></p></li>';
				$('#trDemandList').append(str);
			}
			$('#trDemandList li').click(function() {
				window.open("http://www.eqidd.com/changke/html/needDetail.html?id=" + $(this).attr('id') + "")
			});
		})
	};
	
	// 推荐咨询需求/////////////////////////////////////////////////////////////////////////////////

	setTimeout(function() {
		tjDemand()
	}, 200)
	// 滚动
	var $this2 = $("#tjDemand");
	var scrollTimer2;
	$this2.hover(function() {
		clearInterval(scrollTimer2);
	}, function() {
		scrollTimer2 = setInterval(function() {
			scrollNews($this2);
		}, 2000);
	
		function scrollNews(obj) {
			var $self = obj.find("ul");
			var lineHeight = $self.find("li:first").height();
			$self.animate({
				"marginTop": -81 +"px"
			}, 600, function() {
				$self.css({
					marginTop: 0
				}).find("li:first").appendTo($self);
			})
		}
	}).trigger("mouseleave");
	   
	function tjDemand() {
		$.post('' + http_head + '/Admin/side/NeedAdviser_sideGetList.ashx', {
			page: 0
		}, function(data) {
			var dataTj = JSON.parse(data);
			
			for (var itemValue of dataTj.items) {
				var str = '<li class="clearfix" id="' + itemValue.AdviserNeedId + '"><p>' + itemValue.B_theme + '</p></li>';
				$('#tjDemandList').append(str);
			}
			$('#tjDemandList li').click(function() {
				window.open("http://www.eqidd.com/changke/html/needDetail.html?id=" + $(this).attr('id') + "");
			});
		})
	};
	
	
	// 最新需求///////////////////////////////////////////////////////////
	setTimeout(function() {
		newDemand()
	}, 200)
	// 滚动
	var $this = $("#newsDemand");
	var scrollTimer;
	$this.hover(function() {
		clearInterval(scrollTimer);
	}, function() {
		scrollTimer = setInterval(function() {
			scrollNews($this);
		}, 2000);

		function scrollNews(obj) {
			var $self = obj.find("ul");
			var lineHeight = $self.find("li:first").height();
			$self.animate({
				"marginTop": -82 +"px"
			}, 600, function() {
				$self.css({
					marginTop: 0
				}).find("li:first").appendTo($self);
			})
		}
	}).trigger("mouseleave");
   
	function newDemand() {
		$.post('' + http_head + '/Training/Trains/Get_TrainingByTime.ashx', {
			page: 0
		}, function(data) {
			var dataTuijain = JSON.parse(data);
			for (var itemValue of dataTuijain.items) {
				var str = '<li class="clearfix" id="' + itemValue.Id + '"><p>' + itemValue.thetheme + '</p><p><span>' +
					itemValue.thedateStart.replace(/\//g, "-") + '</span>~<span>' + itemValue.thedateEnd.replace(/\//g, "-") +
					'</span></p></li>';
				$('#newsDemandList').append(str);
			}
			$('#newsDemandList li').click(function() {
				window.open("http://www.eqidd.com/changke/html/needDetail.html?id=" + $(this).attr('id') + "")
			});
		})
	};
	//////////////////////////////////////////////////////////////////////////////////////
	var flag = 0;
	$("#showMore").on("click", function() {
		if (flag == 0) {
			$("#pick").animate({
				height: "200px"
			}, "slow", "swing", function() {
				$("#showMore a").text("收起>>")
			}).show();
			flag = 1;
		} else {
			$("#pick").animate({
				height: 0
			}, "slow", "swing", function() {
				$("#showMore a").text("更多选项>>")
			});
			flag = 0
		}
	});

	var flag2 = 0;
	$("#showMore2").on("click", function() {
		if (flag2 == 0) {
			$("#pick2").animate({
				height: "200px"
			}, "slow", "swing", function() {
				$("#showMore2 a").text("收起>>")
			}).show();
			flag2 = 1;
		} else {
			$("#pick2").animate({
				height: 0
			}, "slow", "swing", function() {
				$("#showMore2 a").text("更多选项>>")
			});
			flag2 = 0
		}
	});	
	$(".promotion").on("click", function() {
		window.open("http://www.eqidd.com/tuiguang.html")
	});
	
})
