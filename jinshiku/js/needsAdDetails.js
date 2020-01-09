$(document).ready(function() {
	$(".mainFountion li a").eq(6).unbind('mouseenter').unbind('mouseleave');
	var href = location.href;
	var advisersId = href.split("=")[1];
	var s = href.indexOf("=");
	if (s < 0) {
		// location.href = "../html/personInfo.html"
	} else {
		var videoDetails = href.split("=")[1];
	}
	//登陆退出
	var href = location.href;
	var dataC = localStorage.getItem("GHY_login");
	if (dataC != null) {
		var dataInfo = JSON.parse(dataC);
		$('#loginBtn').text(dataInfo.username);
		$("#regBtn").on("click", function() {
			localStorage.removeItem("GHY_login");
			window.location.reload();
		}).text("退出");
		var flag2 = 0;
		$("#loginBtn").on("click", function() {
			if (flag2 == 0) {
				$(".userOption").show("500");
				flag2 = 1;
			} else {
				$(".userOption").hide("500");
				flag2 = 0;
			}
		});
		$(".userOption").on("click", function() {
			window.open("http://www.eqidd.com/createrSpace/html/personInfo.html");
		})
	} else {
		$('#loginBtn').click(function() {
			location.href = "./html/innerLogin.html?href=" + href + "";
		}).text("登录");
		$("#regBtn").on("click", function() {
			location.href = "http://www.eqidd.com/html/reg.html?href=" + href + "";
		}).text("注册")
	};
	// 加载尾部
	setTimeout(function() {
		$('#footer').load("../html/footer2.html");
	}, 500);
	var dataDemDetails, teaSex
	$.post('' + http_head + '/Advisers/NeedOfAdvisers/getAdvisersById.ashx', {
		"Id": advisersId
	}, function(data) {
		dataDemDetails = JSON.parse(data);
		console.log("咨询讲师详情", dataDemDetails)
		// 判断是否结束
		var yourtime = dataDemDetails.items.B_endTimeForNeed;
		var addSpan;
		yourtime = yourtime.replace("-", "/"); //替换字符，变成标准格式
		var d2 = new Date(); //取今天的日期
		var d1 = new Date(Date.parse(yourtime));
		if (d1 < d2) {
			addSpan = '<span id="adjustShow1">已结束</span>'
		} else {
			addSpan = '<span id="adjustShow">进行中</span>'
		}
		$('.isfinnished').append(addSpan)
		$('.needTitle').text(dataDemDetails.items.B_theme);
		$('.demandTime').text(dataDemDetails.items.B_startTime + "~" + dataDemDetails.items.B_endTime);
		$('.needLabel').text(dataDemDetails.items.B_lingyuDetail);
		$('.creatTime').text(dataDemDetails.items.createTime.split("T")[0]);
		$('.keywords').text(dataDemDetails.items.keywords);
		$('.budgetedExpense').text(dataDemDetails.items.B_cost);
		$('#otherDemand').text(dataDemDetails.items.otherDemand);
		if (dataDemDetails.items.lecturerSex == 0) {
			teaSex = "男"
		} else if (dataDemDetails.items.lecturerSex == 1) {
			teaSex = "女"
		} else {
			teaSex = "不限"
		}
		$('.lecturerSex').text(teaSex);
		$('.lecturerAge').text(dataDemDetails.items.C_ageMin + '~' + dataDemDetails.items.C_ageMax + '岁');
		$('.lecturerShuXiang').text(dataDemDetails.items.C_shuXiang);
		$('.lecturerJinJIShuXiang').text(dataDemDetails.items.C_shuXiangNo);
		$('.lecturerAddress').text(dataDemDetails.items.C_city);
		$('.lecturerEducation').text(dataDemDetails.items.C_edu);
		$('.lecturerMagor').text(dataDemDetails.items.C_zhuanYe);
		$('.lecturerZhiCheng').text(dataDemDetails.items.C_depart);
		$('.lecturerLanguages').text(dataDemDetails.items.C_english);
		$('.lecturerWorkBackground').text(dataDemDetails.items.C_workBg);
		$('.lecturerPost').text(dataDemDetails.items.C_post);
		var time1 = dataDemDetails.items.B_startTime;
		var time2 = dataDemDetails.items.B_endTime;
		var cTime = (dataDemDetails.items.createTime).split("T")[0];
		$('.time').text(time1 + '~' + time2)
		$('.lanchTime').text(cTime)
		// 本类其他需求
		loadSameDemand(dataDemDetails.items.B_type)

		function loadSameDemand(type) {
			$.post('' + http_head + '/Training/Trains/Get_TrainBySearch.ashx', {
				"para": '',
				"page": 0,
				"type": type,
				"minBudget": 0,
				"maxBudget": 100000
			}, function(data) {
				var dataMate = JSON.parse(data)
				console.log("数据", dataMate)
				if (dataMate.status == 200) {
					for (var itemValue of dataMate.items) {
						var str = '<li class="clearfix" id="' + itemValue.Id + '"><p>' + itemValue.thetheme + '</p><p><span>' +
							itemValue.thedateStart.replace(/\//g, "-") + '</span>~<span>' + itemValue.thedateEnd.replace(/\//g, "-") +
							'</span></p></li>';
						$('#otherdemand').append(str);
					}
					$('#otherdemand li').click(function() {
						location.href = "../html/needDetails.html?id=" + $(this).attr('id') + ""
					});
				} else {
					$('#otherdemand').append('<li style="text-align:center;line-height:60px">暂无相关数据</li>');
				}

			});
		}
	})
	var $this3 = $("#otherdemandArea");
	var scrollTimer3;
	$this3.hover(function() {
		clearInterval(scrollTimer3);
	}, function() {
		scrollTimer3 = setInterval(function() {
			scrollNews3($this3);
		}, 2000);

		function scrollNews3(obj) {
			var $self = obj.find("ul");
			var lineHeight = $self.find("li:first").height();
			$self.animate({
				"marginTop": -lineHeight + "px"
			}, 600, function() {
				$self.css({
					marginTop: 0
				}).find("li:first").appendTo($self);
			})
		}
	}).trigger("mouseleave");
	$('.getNumberBtn').click(function() {
		if (dataC == null) {
			layer.msg('请登录', {
				time: 1000,
			});
		} else {
			$.post('' + http_head + '/Training/Get_TrainDemandCTW.ashx', {
				"userGuid": dataInfo.Guid,
				"tdid": videoDetails
			}, function(data) {
				var dataWriterInfo = JSON.parse(data);
				if (dataWriterInfo.status == 200) {
					layer.open({
						type: 1,
						area: '600px',
						title: ['客户联系方式', 'font-size:18px;text-align:center;'],
						content: $('.infoDiv'),
					});
					$('.contactsName').text(dataWriterInfo.items.contactsName)
					$('.phone').text(dataWriterInfo.items.phone)
					$('.handset').text(dataWriterInfo.items.handset)
					$('.qq').text(dataWriterInfo.items.qq);
				} else {
					layer.msg('你没有权限', {
						time: 1000,
					});
				}
			});
		}
	});
	// 发送需求
	$('#sendDemand').click(function() {
		if (dataC == null) {
			layer.msg('请登录', {
				time: 1000,
			});
		} else {
			var str = JSON.stringify(dataC); // 将对象转换为字符串;
			localStorage.removeItem("GHY_Mlogin");
			localStorage.setItem("GHY_Mlogin", str);
			window.open("../../71guangwang/html/addDemand.html")
		}
	});
	// 匹配的讲师
	$.post('' + http_head + '/Training/TrainingMatch/Get_LectureMatch.ashx', {
		"trainingDemandId": videoDetails,
		"page": 0
	}, function(data) {
		var dataTeacher = JSON.parse(data);
		if (dataTeacher.items == 200) {
			for (var itemValue of dataTeacher.items) {
				var imgURLmin = itemValue.headimage.replace(/.png/, "min.png")
				var array_label = [];
				var str_label = '';
				str_label = itemValue.ResearchField.split(",")
				for (var i = 0; i < str_label.length; i++) {
					array_label.push('《<span class="">' + str_label[i] + '</span>》')
				}
				var str = '<li class="clearfix" id="' + itemValue.userGuid + '" alt="' + itemValue.lectureName + '"><img src="' +
					imgURLmin + '" alt="" class="pull-left"><div class="pull-left"><p class="lectureName">' + itemValue.realname +
					'</p><p class="lectureLabel">' + array_label + '</p></div></li>';
				$('#mateLecturer').append(str);
			}
			$('#mateLecturer li').click(function() {
				sessionStorage.removeItem("GHY_makerGuid");
				sessionStorage.setItem("GHY_makerGuid", $(this).attr('id'));
				window.open("../../createrSpace/html/visitCreaterInfo.html")
			});
		} else {
			$('#mateLecturer').append('<li style="text-align:center;line-height:60px">暂无相关数据</li>');
		}

	});
	var $thisDemand = $("#matelecturerDiv");
	var scrollTimerDemand;
	$thisDemand.hover(function() {
		clearInterval(scrollTimerDemand);
	}, function() {
		scrollTimerDemand = setInterval(function() {
			scrollNewsDemand($thisDemand);
		}, 2000);

		function scrollNewsDemand(obj) {
			var $self = obj.find("ul");
			var lineHeight = $self.find("li:first").height();
			$self.animate({
				"marginTop": -81 + "px"
			}, 600, function() {
				$self.css({
					marginTop: 0
				}).find("li:first").appendTo($self);
			})
		}
	}).trigger("mouseleave");
	// 匹配的课程
	$.post('' + http_head + '/Training/TrainingMatch/Get_CourseMatch.ashx', {
		"trainingDemandId": videoDetails,
		"page": 0
	}, function(data) {
		var dataCourse = JSON.parse(data);
		if (dataCourse.status == 200) {
			for (var itemValue of dataCourse.items) {
				var str = '<li class="clearfix" id="' + itemValue.Id + '"><p>' + itemValue.courseTheme +
					'</p><p class="clearfix"><span class="pull-left">研究领域 : </span><span class="pull-left">' + itemValue.courseType +
					'</span></p></li>';
				$('#mateCourse').append(str);
			}
			$('#mateCourse li').click(function() {
				window.open("../html/courseDetails.html?id=" + $(this).attr('id') + "")
			});
		} else {
			$('#mateCourse').append('<li style="text-align:center;line-height:60px">暂无相关数据</li>');
		}

	});
	var $this2 = $("#matecourseDiv");
	var scrollTimer2;
	$this2.hover(function() {
		clearInterval(scrollTimer2);
	}, function() {
		scrollTimer2 = setInterval(function() {
			scrollNews2($this2);
		}, 2000);

		function scrollNews2(obj) {
			var $self = obj.find("ul");
			var lineHeight = $self.find("li:first").height();
			$self.animate({
				"marginTop": -87 + "px"
			}, 600, function() {
				$self.css({
					marginTop: 0
				}).find("li:first").appendTo($self);
			})
		}
	}).trigger("mouseleave");
	// 搜索
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
	            window.open("./lookDemandList.html?demandName=" + $('#inputSearch').val() + "")
	        } else if ($('#selectType').val() == "4") {
	            window.open("http://www.eqidd.com/yqy/search.html?searchKey=" + $('#inputSearch').val() + "")
	        } else if ($('#selectType').val() == "5") {
	            window.open("./lookActivity.html?activityName=" + $('#inputSearch').val() + "")
	        } else {}
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
	                window.open("./lookDemandList.html?demandName=" + $('#inputSearch').val() + "")
	            } else if ($('#selectType').val() == "4") {
	                 window.open("http://www.eqidd.com/yqy/search.html?searchKey=" + $('#inputSearch').val() + "")
	            } else if ($('#selectType').val() == "5") {
	                window.open("./lookActivity.html?activityName=" + $('#inputSearch').val() + "")
	            } else {}
	        }
	    }
	});
})
