"use strict";

$(document).ready(function () {
	var http_head = "http://47.94.173.253:8008";
	$("#download1").hover(function() {
		$('.downloadImg').slideDown(300)
	}, function() {
		$('.downloadImg').slideUp(300)
	});
	$(".downLoad").hover(function() {
		layer.tips(
			'<img src="../img/adjust.png" style="margin-top:10px" id="weChatImg"><p style="height:20px"></p> <p style="height:20px"></p> <p style="height:20px"></p>',
			".downLoad", {
				tips: [4, "black"],
				area: ["108px", "120px"]
			})
	}, function() {
		layer.closeAll("tips")
	});
	
	// 鼠标移入移出
	$(".mainFountion li a").wrapInner('<span class="out"></span>');
	$(".mainFountion li a").each(function () {
		$('<span class="over">' + $(this).text() + '</span>').appendTo(this);
	});
	$(".mainFountion li a").hover(function () {
		$(".out", this).stop().animate({
			'top': '40px'
		}, 300);
		$(".over", this).stop().animate({
			'top': '0px'
		}, 300);
	}, function () {
		$(".out", this).stop().animate({
			'top': '0px'
		}, 300);
		$(".over", this).stop().animate({
			'top': '-40px'
		}, 300);
	});
	$(".mainFountion li a").eq(0).unbind('mouseenter').unbind('mouseleave');

	//登陆退出
	var href = location.href;
	var dataC = localStorage.getItem("GHY_login");
	if (dataC != null) {
		var dataInfo = JSON.parse(dataC);
		if (dataInfo.username != null) {
			$('#loginBtn').text(dataInfo.username);
		}

		$("#regBtn").on("click", function () {
			localStorage.removeItem("GHY_login");
			window.location.reload();
		}).text("退出");
		var flag2 = 0;
		$("#loginBtn").on("click", function () {
			if (flag2 == 0) {
				$(".userOption").show("500");
				$(".userOption1").show("400");
				flag2 = 1;
			} else {
				$(".userOption").hide("500");
				$(".userOption1").hide("400");
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
		$(".loginBtn2").on("click", function () {
			layer.msg("您已登录");
		});
		$(".regBtn2").on("click", function () {
			layer.msg("您已注册");
		});
	} else {
		$('#loginBtn').click(function () {
			location.href = "./html/innerLogin.html?href=" + href + "";
		}).text("登录");
		$("#regBtn").on("click", function () {
			location.href = "http://www.eqidd.com/html/reg.html?href=" + href + "";
		}).text("注册");
		// 轮播右侧登陆注册
		$(".loginBtn2").on("click", function () {
			location.href = "./html/innerLogin.html?href=" + href + "";
		});
		$(".regBtn2").on("click", function () {
			location.href = "http://www.eqidd.com/html/reg.html?href=" + href + "";
		});
	};
	var user = localStorage.getItem("GHY_login");
	$("#demandBtn").on("click", function () {
		if (user) {
			window.open("./html/addDemand.html");
		} else {
			layer.msg("请登录", {
				time: 1200
			});
		}
	});
	$(".demandBtn2").on("click", function () {
		if (user) {
			window.open("./html/addDemand.html");
		} else {
			layer.msg("请登录", {
				time: 1200
			});
		}
	});

	// 易企购易企聘
	$(".hold").on("click", function () {
		layer.msg("正在开发中，敬请期待。");
	});
	// 创客空间跳转
	$(".gock").on("click", function () {
		if (user) {
			var this_userGuid = JSON.parse(user).Guid;
			var this_companyId = JSON.parse(user).companyId;
			window.open("http://www.eqidd.com/makerSpace/index.html?userGuid=" + this_userGuid + "&companyId=" + this_companyId);
			localStorage.setItem("GHY_maker", dataC);
		} else {
			layer.msg("请登录", {
				time: 1200
			});
		}
	});

	// 流程
	$(".regPersonal").on("click", function () {
		window.open("http://www.eqidd.com/html/reg.html?href=" + href + "");
	});
	$(".regCompany").on("click", function () {
		window.open("http://www.jinshiku.com/html/registerCom.html?href=" + href + "");
	});
	// 获取金师库轮播图//////////////////////////////////////////////////////////////////////
	$.post('http://47.94.173.253:8008/yiqixue/Get_Yiqixue_Slide.ashx?rand=' + Math.random(), {}, function (data) {

		var dataImg = JSON.parse(data);
		console.log(dataImg);
		var imgLength = dataImg.items.length;
		for (var i = 0; i < imgLength; i++) {
			var imgUrl = dataImg.items[i].imageUrl;
			var altValue = dataImg.items[i].title;
			var imgLink = dataImg.items[i].contentUrl;
			$(".lunbo").append('<div class="item"><img src="' + imgUrl + '" alt="' + altValue + '"  id="' + imgLink + '"/>  </div>');
			$(".carousel-indicators").append('<li data-target="#myCarousel" data-slide-to="' + (i + 1) + '"> </li>');
			$(".lunbo div").eq(0).addClass("active");
			$(".carousel-indicators").eq(0).addClass("active");
		};

		$(".lunbo div").on("click", function () {
			var imgLinkStr = $(this).context.firstChild.id;
			if (imgLinkStr.indexOf("https") > 0) {
				var imgLink = "http:" + imgLinkStr.split(":")[1];
				window.open(imgLink);
			} else {
				window.open(imgLinkStr);
			}
		});
	});
	$('#myCarousel').carousel({
		interval: 2500
	});
	////////////main////////////////////////////////////////////////
	var dataNull = {
		items: []
	};
	// 推荐讲师
	// 表格
	function loadRecTeacher(data) {
		$(".teacherTypeList").bootstrapTable({
			onPostBody: function onPostBody(name, args) {
				$(".viewTeach").hover(function () {
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
				$("img.lazy-lecturer").lazyload({
					effect: "fadeIn"
				});
			},
			columns: [{
				align: 'center',
				valign: 'middle',
				formatter: teacherType,
				events: viewTeaDetail
			}],
			data: data,
			classes: "table-no-bordered"
		});

		function teacherType(e, value, row, index) {
			var headImg;
			if (value.userImage.indexOf(".png") > 0 || value.userImage.indexOf(".jpg") > 0 || value.userImage.indexOf(".jpeg") > 0) {
				if (value.userImage.indexOf(".png") > 0) {
					headImg = value.userImage.split(".png")[0] + "min.png";
				} else if (value.userImage.indexOf(".jpg") > 0) {
					headImg = value.userImage.split(".jpg")[0] + "min.jpg";
				} else if (value.userImage.indexOf(".jpeg") > 0) {
					headImg = value.userImage.split(".jpeg")[0] + "min.jpeg";
				}
			} else {
				headImg = "image/touxiang.png";
			}
			return '<div class="viewTeach"><div class="" id="imgDiv"><div><img class="lazy-lecturer"  data-original="' + headImg + '"  alt="" /></div></div> <div class="" id="detDiv"><p class="realname">' + value.userName + '</p><div class="clearfix"><p class="nth1p"> <span> <img src="image/flocation.png"/>' + value.city + '</span> <span><img class="moneyIcon" src="image/money.png"/>  ' + value.CooperativePrice + '元/天</span> </p><p class="nth2p"><img src="image/fsc.png"/><span class="tjField">' + value.ResearchField + '</span></p><p class="nth3p"><span><img src="image/fbrowse.png"/> ' + value.browCount + '</span> <span><img src="image/fcjl.png"/> ' + value.TradeCount + '</span>  </p></div></div></div>';
		};
	};
	window.viewTeaDetail = {
		'click .viewTeach': function clickViewTeach(e, value, row, index) {
			window.open("http://www.eqidd.com/changke/index_start.html?userGuid=" + row.userGuid + "&piece=1");
		}
	};

	function loadTeacherByType() {
		$.post(http_head + '/Admin/Home/get_homeTeacher.ashx?rand=' + Math.random(), {}, function (data) {
			var data = JSON.parse(data);
			if (data.items.length == 0) {
				layer.msg("该分类下暂无讲师", {
					time: 1200
				});
			} else {
				loadRecTeacher(data.items);
				$(".teacherTypeList").bootstrapTable("load", data.items);
			}
		});
	};
	loadTeacherByType();
	$(".rectitle p").on("click", function () {
		loadTeacherByType();
		$(".typebox ul li").removeClass("active");
		$(this).addClass("active");
	});
	//类别 
	var recType = ["生产管理", "销售管理", "人力资源", "通用管理", "总裁战略", "职业素养", "其他"];
	for (var i = 0; i < recType.length; i++) {
		$(".recommend").append('<li>' + recType[i] + '</li>');
	};
	var flag = 0;
	$(".openlist").on("click", function () {
		if (flag == 0) {
			$(".typebox").animate({
				height: "90px"
			}, "slow", "swing", function () {
				$(".openlist").text("收起");
			});
			flag = 1;
		} else {
			$(".typebox").animate({
				height: "30px"
			}, "slow", "swing", function () {
				$(".openlist").text("更多");
			});
			flag = 0;
		}
	});
	$(".typebox ul li").on("click", function () {
		var index = $(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		$(".rectitle p").removeClass("active");
		$.post(http_head + '/Admin/Home/GetTeacherByType.ashx?rand=' + Math.random(), {
			"type": $(this).text()
		}, function (data) {
			var data = JSON.parse(data);
			if (data.items.length == 0) {
				layer.msg("该分类下暂无讲师", {
					time: 1200
				});
				loadRecTeacher(dataNull.items);
				$(".teacherTypeList").bootstrapTable("load", dataNull.items);
			} else {
				loadRecTeacher(data.items);
				$(".teacherTypeList").bootstrapTable("load", data.items);
			}
		});
	});
	// 右侧新入住讲师
	setTimeout(function () {
		newTeacher(0);
	}, 600);
	var newInData = [];

	function newTeacher() {
		$.post('' + http_head + '/Makerspacey/Get_LectureByCheckTime.ashx?rand=' + Math.random(), {
			page: 0
		}, function (data) {
			var dataRegTeacher = JSON.parse(data);
			console.log("新入驻", dataRegTeacher);
			if (dataRegTeacher.length > 0) {
				tjPage = dataRegTeacher.page;
			}
			newInData = newInData.concat(dataRegTeacher.items);
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = newInData[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var itemValue = _step.value;

					var headImg;
					if (itemValue.headimage.indexOf(".png") > 0 || itemValue.headimage.indexOf(".jpg") > 0 || itemValue.headimage.indexOf(".jpeg") > 0) {
						if (itemValue.headimage.indexOf(".png") > 0) {
							headImg = itemValue.headimage.split(".png")[0] + "min.png";
						} else if (itemValue.headimage.indexOf(".jpg") > 0) {
							headImg = itemValue.headimage.split(".jpg")[0] + "min.jpg";
						} else if (itemValue.userImage.indexOf(".jpeg") > 0) {
							headImg = itemValue.headimage.split(".jpeg")[0] + "min.jpeg";
						}
					} else {
						headImg = "image/touxiang.png";
					};
					var array_label = [];
					var str_label = '';
					str_label = itemValue.ResearchField.split(",");
					for (var i = 0; i < str_label.length; i++) {
						array_label.push('《<span class="">' + str_label[i] + '</span>》');
					}
					var str = '<li class="clearfix" id="' + itemValue.userGuid + '" alt="' + itemValue.realName + '"><img class="lazy-NewLecturer" data-original="' + headImg + '" alt="" class="pull-left"><div class="pull-left"><p>' + itemValue.realName + '</p><p>' + itemValue.post + '</p></div></li>';
					$('#newregTeacher').append(str);
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
			$("img.lazy-NewLecturer").lazyload({
				effect: "fadeIn"
			});
			$('#newregTeacher li img').error(function () {
				var newImg = $(this).attr('src').replace(/min.png/, ".png");
				$(this).attr('src', newImg);
			});
			$('#newregTeacher li').click(function () {
				var this_guid = $(this).attr("id");
				console.log(this_guid);
				window.open("http://www.eqidd.com/changke/index_start.html?userGuid=" + $(this).attr('id') + "&piece=1");
			});
		});
	};
	// 新入住讲师滚动
	var $this = $("#news");
	var scrollTimer;
	$this.hover(function () {
		clearInterval(scrollTimer);
	}, function () {
		scrollTimer = setInterval(function () {
			scrollNews($this);
		}, 2000);
	}).trigger("mouseleave");

	function scrollNews(obj) {
		var $self = obj.find("ul");
		$self.animate({
			"marginTop": -81 + "px"
		}, 600, function () {
			$self.css({
				marginTop: 0
			}).find("li:first").appendTo($self);
		});
	};
	// 推荐咨询师
	// // 表格
	function loadAdvTeacher(data) {
		$(".advList").bootstrapTable({
			onPostBody: function onPostBody(name, args) {
				$(".viewAdv").hover(function () {
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
				$("img.lazy-Consultant").lazyload({
					event: "scroll",
					effect: "fadeIn",
					threshold: 180
				});
			},
			columns: [{
				align: 'center',
				valign: 'middle',
				formatter: teacherType,
				events: viewAdvDetail
			}],
			data: data,
			classes: "table-no-bordered"
		});

		function teacherType(e, value, row, index) {
			var headImg;
			if (value.userImage.indexOf(".png") > 0 || value.userImage.indexOf(".jpg") > 0 || value.userImage.indexOf(".jpeg") > 0) {
				if (value.userImage.indexOf(".png") > 0) {
					headImg = value.userImage.split(".png")[0] + "min.png";
				} else if (value.userImage.indexOf(".jpg") > 0) {
					headImg = value.userImage.split(".jpg")[0] + "min.jpg";
				} else if (value.userImage.indexOf(".jpeg") > 0) {
					headImg = value.userImage.split(".jpeg")[0] + "min.jpeg";
				}
			} else {
				headImg = "image/touxiang.png";
			}

			return '<div class="viewAdv"><div class="" id="imgDiv"><div><img class="lazy-Consultant"  data-original="' + headImg + '"  alt="" /></div></div> <div class="" id="detDiv"><p class="realname">' + value.userName + '</p><div class="clearfix"><p class="nth1p"> <span> <img src="image/flocation.png"/>' + value.A_city + '</span> <span><img class="moneyIcon" src="image/money.png"/>  ' + value.A_costTemp + '元/天</span> </p><p class="nth2p"><img src="image/fsc.png"/><span class="tjField">' + value.A_lingYu + '</span></p><p class="nth3p"><span><img src="image/fbrowse.png"/> ' + value.A_browses + '</span> <span><img src="image/fcjl.png"/> ' + value.A_volume + '</span>  </p></div></div></div>';
		};
	};
	window.viewAdvDetail = {
		'click .viewAdv': function clickViewAdv(e, value, row, index) {
			window.open("http://www.eqidd.com/changke/index_start.html?userGuid=" + row.userGuid + "&piece=1");
		}
	};

	function loadAdvByType() {
		$.post(http_head + '/Admin/Home/advisers_get.ashx?rand=' + Math.random(), {}, function (data) {
			var data = JSON.parse(data);
			if (data.items.length == 0) {
				layer.msg("该分类下暂无咨询师", {
					time: 1200
				});
			} else {
				loadAdvTeacher(data.items);
				$(".advList").bootstrapTable("load", data.items);
			}
		});
	};
	loadAdvByType();
	// 
	$(".rectitle4 p").on("click", function () {
		loadAdvByType();
		$(".typebox4 ul li").removeClass("active");
		$(this).addClass("active");
	});

	// 咨询师分类
	$(".typebox4 ul li").on("click", function () {
		var index = $(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		$(".rectitle4 p").removeClass("active");
		$.post(http_head + '/Admin/Home/advsierstype_get.ashx?rand=' + Math.random(), {
			"type": $(this).text()
		}, function (data) {
			var data = JSON.parse(data);
			if (data.items.length == 0) {
				layer.msg("该分类下暂无咨询师", {
					time: 1200
				});
				loadAdvTeacher(dataNull.items);
				$(".advList").bootstrapTable("load", dataNull.items);
			} else {
				loadAdvTeacher(data.items);
				$(".advList").bootstrapTable("load", data.items);
			}
		});
	});
	// 右侧新入住咨询师
	setTimeout(function () {
		newRecTeacher(0);
	}, 700);
	var newInData5 = [];

	function newRecTeacher() {
		$.post('' + http_head + '/Advisers/Get_Newadvisers.ashx?rand=' + Math.random(), {
			page: 0
		}, function (data) {
			var dataRegTeacher = JSON.parse(data);
			console.log(dataRegTeacher);
			if (dataRegTeacher.length > 0) {
				tjRecPage = dataRegTeacher.page;
			}
			newInData5 = newInData5.concat(dataRegTeacher.items);
			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = newInData5[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var itemValue = _step2.value;

					var headImg;
					if (itemValue.A_photo.indexOf(".png") > 0 || itemValue.A_photo.indexOf(".jpg") > 0 || itemValue.A_photo.indexOf(".jpeg") > 0) {
						if (itemValue.A_photo.indexOf(".png") > 0) {
							headImg = itemValue.A_photo.split(".png")[0] + "min.png";
						} else if (itemValue.A_photo.indexOf(".jpg") > 0) {
							headImg = itemValue.A_photo.split(".jpg")[0] + "min.jpg";
						} else if (itemValue.A_photo.indexOf(".jpeg") > 0) {
							headImg = itemValue.A_photo.split(".jpeg")[0] + "min.jpeg";
						}
					} else {
						headImg = "image/touxiang.png";
					};
					var array_label = [];
					var str_label = '';
					str_label = itemValue.A_postType.split("、");
					for (var i = 0; i < str_label.length; i++) {
						array_label.push('《<span class="">' + str_label[i] + '</span>》');
					}
					var str = '<li class="clearfix" id="' + itemValue.userGuid + '" alt="' + itemValue.upname + '"><img class="lazy-NewRec" data-original="' + headImg + '" alt="" class="pull-left"><div class="pull-left"><p>' + itemValue.upname + '</p><p>' + itemValue.A_depart + '</p></div></li>';
					$('#newRecTeacher').append(str);
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
			$("img.lazy-NewRec").lazyload({
				effect: "fadeIn"
			});
			$('#newRecTeacher li img').error(function () {
				var newImg = $(this).attr('src').replace(/min.png/, ".png");
				$(this).attr('src', newImg);
			});
			$('#newRecTeacher li').click(function () {
				var this_guid = $(this).attr("id");
				window.open("http://www.eqidd.com/changke/index_start.html?userGuid=" + $(this).attr('id') + "&piece=1");
			});
		});
	};
	// 新入住咨询师滚动
	var $this5 = $("#newRecs");
	var scrollTimer5;
	$this5.hover(function () {
		clearInterval(scrollTimer5);
	}, function () {
		scrollTimer5 = setInterval(function () {
			scrollNews5($this5);
		}, 2000);
	}).trigger("mouseleave");

	function scrollNews5(obj) {
		var $self = obj.find("ul");
		$self.animate({
			"marginTop": -81 + "px"
		}, 600, function () {
			$self.css({
				marginTop: 0
			}).find("li:first").appendTo($self);
		});
	};
	// main 活动、会议、展览、培训///////////////////////////////////////////////////////////////////////////////////////
	function loadActive(data) {
		$("#activity").bootstrapTable({
			onPostBody: function onPostBody(name, args) {
				$("img.lazy-activity").lazyload({
					event: "scroll",
					effect: "fadeIn",
					threshold: 180
				});
				$('.actTitle').ellipsis();
			},
			columns: [{
				align: 'center',
				valign: 'middle',
				formatter: active,
				events: viewActDetail
			}],
			data: data,
			classes: "table-no-bordered"
		});

		function active(e, value, row, index) {
			var actImg;
			if (value.activeImg.indexOf(".png") > 0 || value.activeImg.indexOf(".jpg") > 0 || value.activeImg.indexOf(".jpeg") > 0) {
				if (value.activeImg.indexOf(".png") > 0) {
					actImg = value.activeImg.split(".png")[0] + "min.png";
				} else if (value.activeImg.indexOf(".jpg") > 0) {
					actImg = value.activeImg.split(".jpg")[0] + "min.jpg";
				} else if (value.activeImg.indexOf(".jpeg") > 0) {
					actImg = value.activeImg.split(".jpeg")[0] + "min.jpeg";
				}
			} else {
				actImg = "image/a10null.jpg";
			};
			return '<div class="activityDiv"><img class="lazy-activity" data-original="' + actImg + '"/><div > <p class="actTitle">' + value.activeTitle + '</p>  <div><p> <span><img src="image/zb.png" />' + value.com_name + '</span></p><p> <span><img src="image/location.png" />' + value.activeCity + '</span><span><img src="image/money.png"/>' + value.price + '  </span>       </p> <p><span><img src="image/see2.png"/>' + value.pageView + '</span><span><img src="image/bm.png"/>' + value.activeNum + '  </span></p>  </div>  </div></div>  ';
		};
	};
	window.viewActDetail = {
		'click .activityDiv': function clickActivityDiv(e, value, row, index) {
			window.open("http://www.eqidd.com/changke/html/activityDetails.html?id=" + row.Id);
		}
	};

	function loadAct() {
		setTimeout(function () {
			$.post(http_head + '/Admin/Home/activity_getList.ashx?rand=' + Math.random(), {}, function (data) {
				var data = JSON.parse(data);
				console.log("推荐活动", data);
				loadActive(data.items);
				$("#activity").bootstrapTable("load", data.items);
			});
		}, 355);
	};
	loadAct();
	$(".rectitle2 p").on("click", function () {
		loadAct();
		$(".typebox2 ul li").removeClass("active");
		$(this).addClass("active");
	});
	$(".typebox2 ul li").on("click", function () {
		var index = $(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		$(".rectitle2 p").removeClass("active");
		$.post(http_head + '/Admin/Home/activity_getList.ashx', {
			"type": $(this).text()
		}, function (data) {
			var data = JSON.parse(data);
			console.log("推荐活动分类", data);
			if (data.items.length == 0) {
				layer.msg("该分类下暂无活动", {
					time: 1200
				});
				loadActive(dataNull.items);
				$("#activity").bootstrapTable("load", dataNull.items);
			} else {
				loadActive(data.items);
				$("#activity").bootstrapTable("load", data.items);
			}
		});
	});
	// 右侧最新发布活动
	setTimeout(function () {
		newActive();
	}, 800);

	function newActive() {
		$.post('' + http_head + '/Activity/Get_ActivityByTime.ashx?rand=' + Math.random(), {
			"page": 0,
			"city": ''
		}, function (data) {
			var dataNewActicity = JSON.parse(data);
			if (dataNewActicity.status == 200) {
				var _iteratorNormalCompletion3 = true;
				var _didIteratorError3 = false;
				var _iteratorError3 = undefined;

				try {
					for (var _iterator3 = dataNewActicity.items[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
						var itemValue = _step3.value;

						var str = '<li id="' + itemValue.Id + '"><div class="clearfix"><div class="pull-left"><p>' + itemValue.activeTitle + '</p></div></div></li>';
						$('#newActiveList').append(str);
					}
				} catch (err) {
					_didIteratorError3 = true;
					_iteratorError3 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion3 && _iterator3.return) {
							_iterator3.return();
						}
					} finally {
						if (_didIteratorError3) {
							throw _iteratorError3;
						}
					}
				}

				;
				$("img.lazy-NewActivity").lazyload({
					event: "scroll",
					effect: "fadeIn",
					threshold: 180
				});
				$("#newActiveList li").on("click", function () {
					var this_id = $(this).attr("id");
					window.open("http://www.eqidd.com/changke/html/activityDetails.html?id=" + this_id);
				});
			}
		});
	};
	// 最新发布活动滚动
	var $this4 = $("#newActive");
	var scrollTimer4;
	$this4.hover(function () {
		clearInterval(scrollTimer4);
	}, function () {
		scrollTimer4 = setInterval(function () {
			scrollNews($this4);
		}, 2000);
	}).trigger("mouseleave");

	function scrollNews4(obj) {
		var $self = obj.find("ul");
		$self.animate({
			"marginTop": -85 + "px"
		}, 600, function () {
			$self.css({
				marginTop: 0
			}).find("li:first").appendTo($self);
		});
	};
	// 热门机构///////////////////////////////////////////////////////////
	// 机构表格
	function loadOrg(data) {
		$("#organize").bootstrapTable({
			onPostBody: function onPostBody(name, args) {
				$("img.lazy-orgnize").lazyload({
					event: "scroll",
					effect: "fadeIn",
					threshold: 180
				});
			},
			columns: [{
				align: 'center',
				valign: 'middle',
				formatter: org,
				events: viewOrgDetail
			}],
			data: data,
			classes: "table-no-bordered"
		});

		function org(e, value, row, index) {
			var comImg;
			if (value.com_logo.indexOf(".png") > 0 || value.com_logo.indexOf(".jpg") > 0 || value.com_logo.indexOf(".jpeg") > 0) {
				comImg = value.com_logo;
			} else {
				comImg = "image/o1null.png";
			};
			return '<div class="combox"><img class="lazy-orgnize" data-original="' + comImg + '"/><div><p><label>机构：</label>' + value.com_name + '</p> <p><label>城市：</label>' + value.city + '</p> </div></div>';
		};
	};
	window.viewOrgDetail = {
		"click .combox": function clickCombox(e, value, row, index) {
			window.open("http://www.eqidd.com/comSpace/index.html?conpanyId=" + row.Id);
		}
	};

	function loadCom() {
		setTimeout(function () {
			$.post(http_head + '/Admin/Home/getHomeComList.ashx?rand=' + Math.random(), {}, function (data) {
				var data = JSON.parse(data);
				loadOrg(data.items);
				$("#organize").bootstrapTable("load", data.items);
			});
		}, 355);
	};
	loadCom();
	$(".rectitle3 p").on("click", function () {
		loadCom();
		$(".typebox3 ul li").removeClass("active");
		$(this).addClass("active");
	});
	$(".typebox3 ul li").on("click", function () {
		var index = $(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		$(".rectitle3 p").removeClass("active");
		$.post(http_head + '/Admin/Home/getHomeComList.ashx?rand=' + Math.random(), {
			"type": $(this).text()
		}, function (data) {
			var data = JSON.parse(data);
			if (data.items.length == 0) {
				layer.msg("加载完成", {
					time: 1200
				});
				loadOrg(dataNull.items);
				$("#organize").bootstrapTable("load", dataNull.items);
			} else {
				loadOrg(data.items);
				$("#organize").bootstrapTable("load", data.items);
			}
		});
	});
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var href = location.href;
	var protocol = window.location.protocol;
	if (protocol == "https:") {
		window.location.href = window.location.href.replace("https", "http");
	};
	var dataC = localStorage.getItem("GHY_login");
	// 加载尾部
	setTimeout(function () {
		$('#footer').load("html/footer.html");
	}, 1000);

	// 底部登陆注册操作
	if (dataC) {
		$(".gock2").on("click", function () {});
	} else {
		layer.msg("请登录", {
			time: 1200
		});
	};
	$('.loginPeo').click(function () {
		window.open("http://www.jinshiku.com/html/innerLogin.html?href=" + href + "");
	});
	$(".regPeo").on("click", function () {
		window.open("http://www.eqidd.com/html/reg.html?href=" + href + "");
	});
	$('.regCom').click(function () {
		window.open("http://www.jinshiku.com/html/registerCom.html?href=" + href + "");
	});
	$(".loginCom").on("click", function () {
		window.open("http://www.eqidd.com/html/M_login.html?href=http://www.eqidd.com/html/M_index.html");
	});
	/////////////////////////////////////////////////////////////////////////////////////
	$('.mainLeft>li').hover(function () {
		var index = $(this).index();
		$('.list').show();
		$('.list div').eq(index).show().siblings().hide();
		$('.list').hover(function () {
			$(this).show();
		}, function () {
			$(this).hide();
			$('.mainLeft>li').css({
				backgroundColor: '#fff',
				color: '#000',
				borderLeft: '5px solid #fff',
				border: 'none',
				zIndex: 0
			});
		});
		$(this).css({
			color: '#333',
			backgroundColor: '#fff',
			borderLeft: '5px solid #ffd600',
			borderRight: '5px solid #fff',
			borderTop: '1px solid orange',
			borderBottom: '1px solid orange',
			zIndex: 100
		}).siblings('li').css({
			backgroundColor: '#fff',
			color: '#000',
			borderLeft: '5px solid #fff',
			border: 'none',
			zIndex: 0
		});
		$('.list ul li').click(function () {
			// 如果首页点击轮播左侧分类 跳转传值
			var child = $(this).index();
			var parent = $(this).parent()[0].id;
			window.open("./html/teacherIndex.html?label=" + $(this).text() + "&parent=" + parent + "%child=" + child);
			window.event ? window.event.cancelBubble = true : e.stopPropagation();
		});
	}, function () {
		$('.list').hide();
	});
	// ///////////////////////////////////////////////////////////////////////////////////
	var dataList;
	setTimeout(function () {
		// loadType()
	}, 50);

	function loadType() {
		$.post('http://47.94.173.253:8008/Option_AreasAnd.ashx?rand=' + Math.random(), {
			"type": 45
		}, function (data) {
			dataList = data;
			for (var i = 0; i < dataList.length; i++) {
				$('.mainLeft').append('<li id="' + i + '" class="clearfix"><span>' + data[i].name + '</span><span class="pull-right"><img src="image/rightb.png" alt="" /></span></li>');
			}
			$('.mainLeft>li').hover(function () {
				var this_i = $(this)[0].id;
				$('.list').attr("id", this_i);
				var index = $(this).index();
				$(this).children("span").children().attr("src", "image/rightw.png");
				$(this).siblings().children("span").children().attr("src", "image/rightb.png");
				$('.list').show();
				$('.list').hover(function () {
					$(this).show();
				}, function () {
					$(this).hide();
				});
				$(this).css({
					color: '#fff',
					backgroundColor: '#0aa2e8',
					borderLeft: '5px solid #ffd600'
				}).siblings('li').css({
					backgroundColor: '#fff',
					color: '#000',
					borderLeft: '5px solid #fff'
				});
				var m = $(this).attr('id');
				$('.list span').remove();
				for (var j = 0; j < data[m].sub.length; j++) {
					$('.list').append('<span class="' + j + '">' + data[m].sub[j].name + '</span>');
				}
				$('.list span').click(function () {
					// 如果首页点击轮播左侧分类 跳转传值
					var child = $(this)[0].className;
					var parent = $(this).parent()[0].id;
					window.open("./html/teacherIndex.html?label=" + $(this).text() + "&parent=" + parent + "%child=" + child);
				});
			}, function () {
				$('.list').hide();
				// $(this).children("span").children().attr("src","image/rightb.png")
			});
		});
	};
	$('#searchBtn').click(function () {
		if ($('#inputSearch').val().length == 0) {
			layer.msg('搜索关键字不能为空', {
				time: 1000
			});
		} else {
			if ($('#selectType').val() == "1") {
				window.open("./html/teacherIndex.html?searchVal=" + $('#inputSearch').val() + "");
			} else if ($('#selectType').val() == "2") {
				window.open("./html/advisory.html?advName=" + $('#inputSearch').val() + "");
			} else if ($('#selectType').val() == "3") {
				window.open("./html/lookDemandList.html?demandName=" + $('#inputSearch').val() + "");
			} else if ($('#selectType').val() == "4") {
				window.open("http://www.eqidd.com/yqy/search.html?searchKey=" + $('#inputSearch').val() + "");
			} else if ($('#selectType').val() == "5") {
				window.open("./html/lookActivity.html?activityName=" + $('#inputSearch').val() + "");
			} else if ($('#selectType').val() == "6") {
				window.open("./html/organization.html?orgName=" + $('#inputSearch').val() + "");
			} else if ($('#selectType').val() == "7") {
				window.open("./html/lookCourseList.html?couName=" + $('#inputSearch').val() + "");
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
				if ($('#selectType').val() == "1") {
					window.open("./html/teacherIndex.html?searchVal=" + $('#inputSearch').val() + "");
				} else if ($('#selectType').val() == "2") {
					window.open("./html/advisory.html?advName=" + $('#inputSearch').val() + "");
				} else if ($('#selectType').val() == "3") {
					window.open("./html/lookDemandList.html?demandName=" + $('#inputSearch').val() + "");
				} else if ($('#selectType').val() == "4") {
					window.open("http://www.eqidd.com/yqy/search.html?searchKey=" + $('#inputSearch').val() + "");
				} else if ($('#selectType').val() == "5") {
					window.open("./html/lookActivity.html?activityName=" + $('#inputSearch').val() + "");
				} else if ($('#selectType').val() == "6") {
					window.open("./html/organization.html?orgName=" + $('#inputSearch').val() + "");
				} else if ($('#selectType').val() == "7") {
					window.open("./html/lookCourseList.html?couName=" + $('#inputSearch').val() + "");
				}
			}
		}
	});
	// 获取通知公告 ///////////////////////////////////////////////////////////////////////////////////
	setTimeout(function () {
		loadNotice();
	}, 350);

	function loadNotice() {
		$.post('http://47.94.173.253:8008/ComSpace/ComSpaceVisitor/get_dynamic.ashx?rand=' + Math.random(), {
			"page": 0
		}, function (data) {
			var dataNotice = JSON.parse(data);
			var _iteratorNormalCompletion4 = true;
			var _didIteratorError4 = false;
			var _iteratorError4 = undefined;

			try {
				for (var _iterator4 = dataNotice.items[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
					var itemValue = _step4.value;

					var str = '<a class="pull-left" id="' + itemValue.Id + '"><span id="' + itemValue.creater + '">【' + itemValue.staffName + '】</span><span>访问了【' + itemValue.com_name + '】的</span><span>【' + itemValue.mudularName + '】模块</span></span>';
					$('.str_move').append(str);
				}
			} catch (err) {
				_didIteratorError4 = true;
				_iteratorError4 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion4 && _iterator4.return) {
						_iterator4.return();
					}
				} finally {
					if (_didIteratorError4) {
						throw _iteratorError4;
					}
				}
			}
		});
	};
});

function courseList(e, value, row, index) {
	var time = value.createTime.split("T")[0];
	courseArr = value.courseType.split(",");
	var tstr;
	for (var _i = 0; _i < courseArr.length; _i++) {
		tstr = tstr + '<span>' + courseArr[_i] + '</span>';
	};
	return '<div class="courseBox"> <div class="couTop"> <p class="cout">《' + value.courseTheme + '》</p> <p class="ctime">' + time + '</p> </div>    <div class="courseM"> <p class="couType">' + tstr + '</p>  <p class="couDet"></p>     </div>  </div>';
}