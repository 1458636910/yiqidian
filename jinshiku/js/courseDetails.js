$(document).ready(function() {
	var href = location.href;
	var dataC = localStorage.getItem("GHY_login");
	if (dataC != null) {
		var dataInfo = JSON.parse(dataC);
		$('.loginName').text(dataInfo.username)
	} else {

	}
     //登陆退出
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
    }
	$(".mainFountion li a").eq(4).unbind('mouseenter').unbind('mouseleave');
	// 获取文章ID
	if (href.indexOf("=") < 0) {
		layer.msg('此网页不能直接访问,请关闭', {
			time: 50000,
			shade: 0.5
		});
	} else {
		var thisID = href.split("=")[1];
	}
	var dataCircle
	$.post('' + http_head + '/Lectures/course/Get_LectureCourse_ById.ashx', {
		"courseId": thisID
	}, function(data) {
		dataCircle = JSON.parse(data);
		console.log(dataCircle)
		loadMateTeacher("引导技术")
		loadMateCourse("开门红")
		$('.courseTitle').text(dataCircle.items.courseTheme);
		$('.writer').text(dataCircle.items.lectureName);
		$('.courseObjecter').text(dataCircle.items.courseObjecter);
		$('.writer span').attr('id', dataCircle.items.userGuid);
		var cTime = (dataCircle.items.createTime).split("T")[0];
		$('.writeTime span').text(cTime);
		$('.courseTarget span').text(dataCircle.items.courseTarget);
		$('.courseBackground').text(dataCircle.items.courseBackground);
		$('#coursePrice').text(dataCircle.items.coursePrice);
		$('#courseDay').text(dataCircle.items.courseTimes);
		$('.hours').text((dataCircle.items.courseTimes) * 6);
		$(".outLineDetails").html(dataCircle.items.courseOutlint);
		for (var i = 0; i < dataCircle.items.courseImage.length; i++) {
			$('.imgShow').append('<li class="pull-left"><img src="' + dataCircle.items.courseImage[i] + '" alt="" id="' + i +
				'"></li>')
		}
		$('.imgShow>li img').click(function() {
			layer.photos({
				photos: {
					"title": "大图",
					"id": 4,
					"start": 0,
					"data": [{
						"alt": "原图",
						"pid": 1,
						"src": $(this).attr('src'),
						"thumb": $(this).attr('src')
					}, ]
				},
				anim: 5
			});
		});
		// 作者详情
		$('.writer span').click(function() {
			var teacherGuid = $(this).attr('id');
			sessionStorage.removeItem("GHY_teaInfo");
			sessionStorage.setItem("GHY_teaInfo", teacherGuid);
			window.open("../html/infoIndex.html");
		});
		var str_label;
		str_label = (dataCircle.items.courseType).split(",");
		for (var i = 0; i < str_label.length; i++) {
			$('.clabel').append('《' + str_label[i] + '》');
		}
	});
	// 加载相关视频
	$('#videoBtn').click(function() {
		$(this).addClass('activeLi').siblings('li').removeClass('activeLi');
		$('.courseVideoDiv').show().siblings('.courseCommentDiv').hide()
	});
	// 相关评价
	$('#commentBtn').click(function() {
		$(this).addClass('activeLi').siblings('li').removeClass('activeLi');
		$('.courseCommentDiv').show().siblings('.courseVideoDiv').hide()
	});
	$.post('' + http_head + '/Lectures/course/Get_CourseVideo.ashx', {
		"courseId": thisID,
		"page": 0
	}, function(data) {
		var dataVideo = JSON.parse(data);
		var videoUrl = [];
		var oursId;
		for (var i = 0; i < dataVideo.items.rows.length; i++) {
			videoUrl.push(((dataVideo.items.rows[i].videoUrl).split("id_")[1]).split("==")[0])
			$('.relateVideo').append('<div class="pull-left" id="' + videoUrl[i] + '"><img src="' + dataVideo.items.rows[i].videoImage +
				'" alt="" id="' + videoUrl[i] + '" name="' + i + '"><p class="videoTime">' + dataVideo.items.rows[i].videoTime +
				'</p><div><p class="videoName">' + dataVideo.items.rows[i].videoTitle + '</p><p class="videoType">' +
				dataVideo.items.rows[i].label + '</p></div></div>')
			// 判断是否有可删除的权限
			//  if ( dataCircle.items.userGuid == dataInfo.Guid  ) {
			//   oursId =  videoUrl[i]
			//     $('#'+oursId+'').append('<p class="deleteArea"><button id="'+dataVideo.items.rows[i].Id+'">解除关联</button></p>')
			// }
		}
		// 点击播放视频
		$('.relateVideo>div img').click(function() {
			var num = $(this).attr('name')
			var str = JSON.stringify(dataVideo.items.rows[num]); // 将对象转换为字符串
			sessionStorage.removeItem("GHY_video");
			sessionStorage.setItem("GHY_video", str);
			window.open("../html/videoPlay.html?id=" + $(this).attr('id') + "");
		});
		// 解除关联视频
		$('.deleteArea button').click(function() {
			var videoDeleteId = $(this).attr('id');
			var parentId = $(this).parent('p').parent('div').attr('id');
			layer.open({
				type: 1,
				area: '300px',
				title: ['删除视频', 'font-size:18px;text-align: center;'],
				content: $(".deleteVideo"),
				btn: '确定',
			});
			$('.layui-layer-btn0').click(function() {
				$.post('' + http_head + '/Lectures/course/Delet_LectureVideo.ashx', {
					"userGuid": dataInfo.Guid,
					"courseId": thisID,
					"videoId": videoDeleteId
				}, function(data) {
					var dataDelete = JSON.parse(data)
					if (dataDelete.status == 200) {
						layer.msg(dataDelete.msg, {
							time: 500,
						});
						setTimeout(function() {
							$("div[id=" + parentId + "]").hide()
						}, 1000)
					}
				});
			});
		});
	});
	// 匹配的课程
	function loadMateCourse(type) {
		$.post('' + http_head + '/Training/TrainingMatch/Get_courseFromType.ashx', {
			"type": type,
			"page": 0
		}, function(data) {
			var dataJson = JSON.parse(data)
			for (var itemValue of dataJson.items) {
				var str = '<li class="clearfix" id="' + itemValue.Id + '"><p>' + itemValue.courseTheme +
					'</p><p class="clearfix"><span class="pull-left">讲师姓名 : </span><span class="pull-left">' + itemValue.lectureName +
					'</span></p></li>';
				$('#tuijianCourse').append(str);
			}
			$('#tuijianCourse li').click(function() {
				console.log($(this).attr('id'))
				location.href = "../html/courseDetails.html?id=" + $(this).attr('id') + ""
			});
		});
	}
	var $this4 = $(".tuijianCourseDiv");
	var scrollTimer4;
	$this4.hover(function() {
		clearInterval(scrollTimer4);
	}, function() {
		scrollTimer4 = setInterval(function() {
			scrollNews4($this4);
		}, 2000);

		function scrollNews4(obj) {
			var $self = obj.find("ul");
			var lineHeight = $self.find("li:first").height();
			$self.animate({
				"marginTop": -85 + "px"
			}, 600, function() {
				$self.css({
					marginTop: 0
				}).find("li:first").appendTo($self);
			})
		}
	}).trigger("mouseleave");
	// 最新的课程
	loadNewCourse()

	function loadNewCourse() {
		$.post('' + http_head + '/Lectures/course/Get_CourseByTime.ashx', {
			"page": 0
		}, function(data) {
			var dataNewCourse = JSON.parse(data);
			for (var itemValue of dataNewCourse.items) {
				var str = '<li class="clearfix" id="' + itemValue.Id + '"><p>' + itemValue.courseTheme +
					'</p><p class="clearfix"><span class="pull-left">讲师姓名 : </span><span class="pull-left">' + itemValue.lectureName +
					'</span></p></li>';
				$('#newCourseUl').append(str);
			}
			$('#newCourseUl li').click(function() {
				console.log($(this).attr('id'))
				location.href = "../html/courseDetails.html?id=" + $(this).attr('id') + ""
			});
		});
	}
	var $this3 = $(".newCourseShowdiv");
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
				"marginTop": -85 + "px"
			}, 600, function() {
				$self.css({
					marginTop: 0
				}).find("li:first").appendTo($self);
			})
		}
	}).trigger("mouseleave");
	// 相关讲师
	function loadMateTeacher(type) {
		$.post('' + http_head + '/Training/TrainingMatch/Get_teachersFromType.ashx', {
			"type": type,
			"page": 0
		}, function(data) {
			var dataMeta = JSON.parse(data);
			for (var itemValue of dataMeta.items) {
				var imgURLmin = itemValue.headimage.replace(/.png/, "min.png")
				var array_label = [];
				var str_label = '';
				str_label = itemValue.ResearchField.split(",")
				for (var i = 0; i < str_label.length; i++) {
					array_label.push('《<span class="">' + str_label[i] + '</span>》')
				}
				var str = '<li class="clearfix" id="' + itemValue.userGuid + '" alt="' + itemValue.realname + '"><img src="' +
					imgURLmin + '" alt="" class="pull-left"><div class="pull-left"><p class="lectureName">' + itemValue.realname +
					'</p><p class="lectureLabel">' + array_label + '</p></div></li>';
				$('#mateLecturer').append(str);
			}
		});
	}
	// 相关讲师滚动
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
				"marginTop": -91 + "px"
			}, 600, function() {
				$self.css({
					marginTop: 0
				}).find("li:first").appendTo($self);
			})
		}
	}).trigger("mouseleave");
})
