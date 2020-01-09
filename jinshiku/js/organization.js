$(document).ready(function() {
	var orgPage = 0; //页码
	var para = ""; //搜索关键字
	var approveVal = -1; //是否认证
	var postVal = ""; //岗位
	var adressVal = ""; //地址
	var hangyeVal = ""; //行业
	var href = location.href;
	var hrefDetails = decodeURIComponent(href);
	var dataCircle = localStorage.getItem("GHY_login");
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
    };
	var s = href.indexOf("?");
	if (s >= 0) {
		var videoName = hrefDetails.split("=")[1];
		$('#inputSearch').val(videoName)
		
	} else {
		searchOrg(orgPage, para, hangyeVal, postVal, adressVal, approveVal);
	};
	// 加载尾部
	setTimeout(function() {
		$('#footer').load("../html/footer2.html");
	}, 500);

	$(".mainFountion li a").eq(3).unbind('mouseenter').unbind('mouseleave');

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 搜索结果表格
	function loadTableOrg(data) {
		$('#orgListTable').bootstrapTable({
			onPostBody: function(name, args) {
                $("img.comlogo").lazyload({
                    effect:"fadeIn",
                });
            },
			columns: [{
				field: 'orgDetails',
				formatter: optionFormatter,
                events:ViewDetails
			}],
			data: data,
		});
		function optionFormatter(e, value, row, index) {
			var logosrc = value.com_logo;
			var noLogo = "../image/o2null.png";

			if (logosrc.indexOf(".png", ".jpg", ".jpeg") != -1) {
				return '<div class="combox"><div class="logobox"><img class="comlogo" data-original="' + value.com_logo +
					'"/></div>  <div class="cominfo"> <p class="comname">' +
					value.com_name + ' </p> <p class="cominf"><span>' + value.com_type + '</span><span>' + value.staffnum +
					'</span> </p><p class="comhy">' +
					value.com_hangye + '</p><p class="comadr">' + value.com_adress + '</p> </div></div>'
			} else {
				return '<div class="combox"><div class="logobox"><img class="comlogo" data-original="' + noLogo +
					'"/></div>  <div class="cominfo"> <p class="comname">' +
					value.com_name + ' </p> <p class="cominf"><span>' + value.com_type + '</span><span>' + value.staffnum +
					'</span> </p><p class="comhy">' +
					value.com_hangye + '</p><p class="comadr">' + value.com_adress + '</p> </div></div>'
			}
		}
	};
    window.ViewDetails={
		"click .combox":function(e, value, row, index) {
			window.open("http://www.eqidd.com/comSpace/index.html?conpanyId=" + row.Id )
		}
	};

	// 搜索
	function searchOrg(page, para, hangye, post, adress, approve) {
		$('.typeArea').show()
		$.post('' + http_head + '/Com/searchCom.ashx', {
			"page": page,
			"para": para,
			"hangye": hangye,
			"post": post,
			"isAuthen": approve,
			"adress": adress
		}, function(data) {
			var data = JSON.parse(data);			
			loadTableOrg(data.items);
			if (data.items.length > 0) {
				layer.msg('搜索成功', {
					time: 1000,
				});

			} else {
				layer.msg('暂无搜索结果', {
					time: 1000,
				});
			}
			$("#orgListTable").bootstrapTable('load', data.items);
			orgPage = data.page;

			if (data.items.length >= 12) {
				$('.nextpageBtn').show()
			} else {

				$('.nextpageBtn').hide()
			}
		});
	};
	//加载下一页
	function searchOrgnext(page, para, hangye, post, adress, approve) {
		$('.typeArea').show()
		$.post('' + http_head + '/Com/searchCom.ashx', {
			"page": page,
			"para": para,
			"hangye": hangye,
			"post": post,
			"isAuthen": approve,
			"adress": adress
		}, function(data) {
			var data = JSON.parse(data);
			if (data.items.length > 0) {
				layer.msg('搜索成功', {
					time: 1000,
				});

				$("#orgListTable").bootstrapTable('append', data.items);

			} else {
				layer.msg('暂无搜索结果', {
					time: 1000,
				});
			}
			orgPage = data.page;

			if (data.items.length >= 12) {
				$('.nextpageBtn').show()
			} else {

				$('.nextpageBtn').hide()
			}
		});
	};
	$('.nextpageBtn').click(function() {
		searchOrgnext(orgPage, para, hangyeVal, postVal, adressVal, approveVal);
	});
	// 地址
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
		orgPage = 0;
		searchOrg(orgPage, para, hangyeVal, postVal, adressVal, approveVal);
		// 省份点击事件	
		// 每次点击省清空城市列表和已选
		// $(this).addClass("selected").siblings().removeClass("selected");
// 		$("#selectB").remove();
// 		for (var i = 0; i < province.length; i++) {
// 			if (province[i]["-code"] == $(this).children("a").attr("value")) {
// 				cities = province[i].city;
// 				for (var j = 0; j < cities.length; j++) {
// 					// 循环显示城市
// 					if (i == 0 || i == 1 || i == 8 || i == 21) {
// 						var county = cities[j].county;
// 						for (var n = 0; n < county.length; n++) {
// 
// 							$("#city").append("<dd><a >" + county[n]["-name"] + "</a></dd>")
// 						}
// 					} else if (i != 0 & i != 1 & i != 8 & i != 21) {
// 						$("#city").append("<dd><a >" + cities[j]["-name"] + "</a></dd>")
// 					}
// 				}
// 			}
// 		};
// 
// 		$("#city dd").on("click", function() {
// 			// 城市点击事件
// 			// 搜索						
// 			adressVal = $(this).text();
// 			orgPage = 0;
// 			searchOrg(orgPage, para, hangyeVal, postVal, adressVal, approveVal);
// 
// 			$(this).addClass("selected").siblings().removeClass("selected");
// 
// 			if ($(this).hasClass("select-all")) {
// 				// 点击全部时移除所选
// 				$("#selectB").remove();
// 			} else {
// 				// 复制标签
// 				var copyThisB = $(this).clone();
// 
// 				if ($("#selectB").length > 0) {
// 					// 填充标签
// 					$("#selectB a").html($(this).text());
// 				} else {
// 					$(".select-result dl").append(copyThisB.attr("id", "selectB"));
// 				}
// 			}
// 		})
	});
	//行业
	$.post(http_head+'/Option_AreasAnd.ashx',{
		type:52
	},function(data){
		for (var i = 0; i < data.length; i++) {
		    $("#select4 ").append("<dd><a >" + data[i].industry + "</a></dd>")
		};
		$("#select4 dd").on("click", function() {
			var index = $(this).index();
			if(index==1){
				hangyeVal = " ";
			}else{
				hangyeVal = $(this).text();
			}
			orgPage = 0;
			searchOrg(orgPage, para, hangyeVal, postVal, adressVal, approveVal);
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
	});
	
	//岗位类别
	$.post('' + http_head + '/Option_AreasAnd.ashx', {
		"type": 58
	}, function(data) {
		for (var i = 0; i < data.length; i++) {
			// 岗位分类
			$('#select5').append('<dd id="' + i + '"><a>' + data[i].name + '</a></dd>')
		}
		$("#select5 dd").eq(0).click(function() {
			$(this).addClass("selected").siblings().removeClass("selected");
			$("#selectE").remove();
			$('#secondType2').hide()
			// 全部
			postVal = "";
			orgPage = 0;
			searchOrg(orgPage, para, hangyeVal, postVal, adressVal, approveVal);
		})
		$("#select5 dd:gt(0)").click(function() {
			$('#secondType2').show()
			$(this).addClass("selected").siblings().removeClass("selected");
			$('#select5Min dd').remove();
			for (var j = 0; j < data[$(this).attr('id')].sub.length; j++) {
				// items项
				$('#select5Min').append('<dd><a>' + data[$(this).attr('id')].sub[j].name + '</a></dd>');
			};

			$("#select5Min dd").click(function() {
				var index = $(this).index();
				postVal = $(this).text().trim();
				orgPage = 0;
				searchOrg(orgPage, para, hangyeVal, postVal, adressVal, approveVal);
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
		})
	});

	/////////////////////////////////////////////////////////////////////////////////////////////
	//实名认证
	var approveList = ["1", "0"];
	$("#select10 dd").click(function() {
		var index = $(this).index();
		orgPage = 0;
		if (index >= 2) {
			approveVal = approveList[index - 2];
		} else {
			approveVal = -1;
		}
		searchOrg(orgPage, para, hangyeVal, postVal, adressVal, approveVal);
		$(this).addClass("selected").siblings().removeClass("selected");

		if ($(this).hasClass("select-all")) {
			$("#selectJ").remove();
		} else {
			var copyThisJ = $(this).clone();
			if ($("#selectJ").length > 0) {
				$("#selectJ a").html($(this).text());
			} else {
				$(".select-result dl").append(copyThisJ.attr("id", "selectJ"));
			}
		}
	});
	// 已选条件
	$(document).on("click", "#selectB", function() {
		$(this).remove();
		$("#city").replaceWith("<dl id='city'></dl>");
		$("#select2 .select-all").addClass("selected").siblings().removeClass("selected");
		$("#city dd").removeClass("selected")
		adressVal = "";
		orgPage = 0;
		searchOrg(orgPage, para, hangyeVal, postVal, adressVal, approveVal);
	});
	$(document).on("click", "#selectD", function() {
		// 行业
		$(this).remove();		
		$("#select4 .select-all").addClass("selected").siblings().removeClass("selected");
		hangyeVal = ""
		orgPage = 0;
		searchOrg(orgPage, para, hangyeVal, postVal, adressVal, approveVal);
	});
	$(document).on("click", "#selectE", function() {
		$(this).remove();
		$('#secondType2').hide();
		$("#select5 .select-all").addClass("selected").siblings().removeClass("selected");
		$("#select5Min dd").addClass("selected").siblings().removeClass("selected");
		// 搜搜
		postVal = "";
		orgPage = 0;
		searchOrg(orgPage, para, hangyeVal, postVal, adressVal, approveVal);
	});

	$(document).on("click", "#selectJ", function() {
		$(this).remove();
		$("#select10 .select-all").addClass("selected").siblings().removeClass("selected");
		// 搜搜
		approveVal = -1;
		orgPage = 0;
		searchOrg(orgPage, para, hangyeVal, postVal, adressVal, approveVal);
	});
	$(document).on("click", ".select dd", function() {
		if ($(".select-result dd").length > 1) {
			$(".select-no").hide();
		} else {
			$(".select-no").show();
		}
	});
	// 搜索框
	$('#searchBtn').click(function() {
		if ($('#inputSearch').val().length == 0) {
			layer.msg('搜索关键字不能为空', {
				time: 1000,
			});
		} else {
			para2 = $('#inputSearch').val();
			orgPage = 0;
			searchOrg(orgPage, para2, hangyeVal, postVal, adressVal, approveVal);
		}
	});
	$('#inputSearch').keydown(function(event) {
		if (event.keyCode === 13) {
			if ($('#inputSearch').val().length == 0) {
				layer.msg('搜索关键字不能为空', {
					time: 1000,
				});
			} else {
				para2 = $('#inputSearch').val();
				orgPage = 0;
				searchOrg(orgPage, para2, hangyeVal, postVal, adressVal, approveVal);
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
	            window.open("./lookDemandList.html?demandName=" + $('#inputSearch').val() + "")
	        } else if ($('#selectType').val() == "4") {
	            window.open("http://www.eqidd.com/yqy/search.html?searchKey=" + $('#inputSearch').val() + "")
	        } else if ($('#selectType').val() == "5") {
	            window.open("./lookActivity.html?activityName=" + $('#inputSearch').val() + "")
	        } else if($('#selectType').val() == "7"){
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
	                window.open("./lookDemandList.html?demandName=" + $('#inputSearch').val() + "")
	            } else if ($('#selectType').val() == "4") {
	                 window.open("http://www.eqidd.com/yqy/search.html?searchKey=" + $('#inputSearch').val() + "")
	            } else if ($('#selectType').val() == "5") {
	                window.open("./lookActivity.html?activityName=" + $('#inputSearch').val() + "")
	            } else if($('#selectType').val() == "7"){
					window.open("./lookCourseList.html?couName=" + $('#inputSearch').val() + "")
				}
	        }
	    }
	});
	var schUrlPara;
	if (href.indexOf("?") > 0 && href.indexOf("orgName") > 0) {
		schUrlPara = decodeURI(href.split("=")[1], "UTF-8");
		searchOrg(orgPage, schUrlPara, hangyeVal, postVal, adressVal, approveVal);
	};
	// 最新的课程
	loadNewCourse();

	function loadNewCourse() {
		$.post('' + http_head + '/Lectures/course/Get_CourseByTime.ashx', {
			"page": 0
		}, function(data) {
			var dataNewCourse = JSON.parse(data);
			for (var itemValue of dataNewCourse.items) {
				var str = '<li class="clearfix" id="' + itemValue.Id + '" style="height: 50px!important;line-height: 30px;"><p style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">' + itemValue.courseTheme +
					'</p></li>';
				$('#newCourseUl').append(str);
			}
			$('#newCourseUl li').click(function() {
				window.open("http://www.eqidd.com/changke/html/courseDetails.html?id=" + $(this).attr('id') + "")
			});
		});
	};

	// 滚动
	var $thisDemand = $(".newCourseShowdiv");
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
				"marginTop": -50 + "px"
			}, 600, function() {
				$self.css({
					marginTop: 0
				}).find("li:first").appendTo($self);
			})
		}
	}).trigger("mouseleave");
	/////////////////////////////////////////////////////////////////////////////////////
	//推荐的讲师
	tuijainTeacher();

	function tuijainTeacher() {
		$.post('' + http_head + '/Admin/Home/get_homeTeacher.ashx', {
			page: 0
		}, function(data) {
			var dataTuijain = JSON.parse(data);
			var imgURLmin;
			var array_label = [];
			var str_label = '';
			for (var itemValue of dataTuijain.items) {
				if (itemValue.userImage) {
					imgURLmin = itemValue.userImage.replace(/.png/, "min.png")
				} else {
					imgURLmin = "../image/touxiang.png"
				};
				str_label = itemValue.ResearchField.split(",");
				for (var i = 0; i < str_label.length; i++) {
					array_label.push('《<span class="">' + str_label[i] + '</span>》')
				};
				str = '<li class="clearfix" id="' + itemValue.lectureGuid + '" alt="' + itemValue.userName +
					'"><img class="lazytj" data-original="' + imgURLmin +
					'" alt="" class="pull-left"><div class="pull-right"><p class="lectureName">' + itemValue.userName +
					'</p><p class="lectureLabel">' + array_label + '</p></div></li>';
				$('#mateLecturer').append(str);
			};
			$("img.lazytj").lazyload({
				effect: "fadeIn",
			});
			$('#mateLecturer li').click(function() {
				var this_guid = $(this).attr("id");
				window.open("http://www.eqidd.com/changke/index_start.html?userGuid=" + this_guid + "&piece=1");
			});
		})
	};
	// 推荐讲师滚动
	var $this2 = $("#matelecturerDiv");
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
				"marginTop": -81 + "px"
			}, 600, function() {
				$self.css({
					marginTop: 0
				}).find("li:first").appendTo($self);
			})
		}
	}).trigger("mouseleave");
	$(".promotion").on("click", function() {
		window.open("http://www.eqidd.com/tuiguang.html")
	});
	
})
