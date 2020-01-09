$(document).ready(function() {

	//分割当前网页链接
	var windowUrl = window.location.href; //获取当前url链接
	var arr = windowUrl.split("?", 2); //分割url		
	var arr_1 = arr[1]; //瞎起变量		
	var arr_2 = arr_1.split('=', 2);
	var arr_3 = arr_2[1];
	//console.log(arr_3);

	//测试http://127.0.0.1:8848/particulars/index.html?userGuid=4f47e8c7e40541d4a2f03c3c72304252

	//导航
	$(".nav ul li").click(function() {
		$(this).siblings('li').removeClass('on');
		$(this).addClass('on');
		var order = $(".nav ul li").index(this);
		$("#main" + order).show().siblings("div").hide();
	});

	//讲师 咨询师切换
	$(".tab ul li").click(function() {
		$(this).siblings('li').removeClass('tab_1');
		$(this).addClass('tab_1');
		var sel = $(".tab ul li").index(this);
		$("#tab_p" + sel).show().siblings("div").hide();
	});

	//获取个人信息
	function Card() {
		setTimeout(function() {
			$.post('http://47.94.173.253:8008/Com/User_BusinessCard.ashx', {
				'userGuid': arr_3
			}, function(data) {
				var data = JSON.parse(data);
				var str = '<img src="' + data.items.photo + '"/><p style="padding-top: 12px;">' + data.items.upname +
					'</p><p style="padding-top: 5px;">' + data.items.Signature + '</p>';
				$('.img').append(str);
			})
		}, 100);
	}
	Card();

	//获取讲师信息
	function Creater() {
		setTimeout(function() {
			$.ajax({
				url: 'http://47.94.173.253:8008/Lectures/Get_Lecture_ByCreater.ashx', //你请求的接口
				type: 'POST', //类型
				data: {
					'userGuid': arr_3,
				}, //数据有则传，没有可以不写
				success: function(data) {
					data = JSON.parse(data);
					//请求成功后的返回
					//console.log(data)
					$('#address').text(data.items.address);
					$('#ResearchField').text(data.items.ResearchField);
					$('#CooperativePrice').text(data.items.CooperativePrice);

					$('#courses').append(data.items.courses);
					$('#CustCase').append(data.items.CustCase);

					$('#TeachStyle').append(data.items.TeachStyle);
					$('#LecturerBackground').text(data.items.LecturerBackground);
				}
			})
		}, 200);
	}
	Creater();


	//获取咨询师信息
	function guid() {
		setTimeout(function() {
			$.ajax({
				url: 'http://47.94.173.253:8008/Advisers/get_advisersByUserguid.ashx', //你请求的接口
				type: 'POST', //类型
				data: {
					'userGuid': arr_3,
				}, //数据有则传，没有可以不写
				success: function(data) {
					data = JSON.parse(data)
					//请求成功后的返回
					//console.log(data)
					$('#A_costTemp').text(data.items.A_costTemp);
					$('#A_lingYuDetail').text(data.items.A_lingYuDetail);
					$('#A_industry').text(data.items.A_industry);
					$('#A_depart').text(data.items.A_depart);
					$('#A_mode').text(data.items.A_mode);
					$('#A_workBg').text(data.items.A_workBg);
					$('#A_costAll').text(data.items.A_costAll);
				}
			})
		}, 300);
	}
	guid();

	//获取底部信息
	function MenuCount() {
		setTimeout(function() {
			$.ajax({
				url: 'http://47.94.173.253:8008/Makerspacey/Get_MakerMenuCount.ashx', //你请求的接口
				type: 'POST', //类型
				data: {
					'userGuid': arr_3,
				}, //数据有则传，没有可以不写
				success: function(data) {
					data = JSON.parse(data)
					//请求成功后的返回
					//console.log(data);
					$('#rzcount').text(data.items.rzcount);
					$('#fkcount').text(data.items.fkcount);
					$('#lycount').text(data.items.lycount);
					$('#cpcount').text(data.items.cpcount);
				}
			})
		}, 400);
	}
	MenuCount();


	var page = 0;
	//日志详情
	function Article() {
		setTimeout(function() {
			$.post('http://47.94.173.253:8008/Articles/Get_MyArticle.ashx', {
				'userGuid': arr_3,
				'page': page
			}, function(data) {
				var data = JSON.parse(data);
				//console.log(data.items.rows);
				for (var i = 0; i < data.items.rows.length; i++) {
					if (data.items.rows[i].image == "") {
						var str = '<li data-Id="' + data.items.rows[i].Id + '" data-userId="' + data.items.rows[i].userGuid +
							'"><div class="main1_p0"><p class="main1_p1">' + data.items.rows[i].title +
							'</p><p class="main1_p2">' + data.items.rows[i].content +
							'</p><p class="main1_p3"><span id="main1_p3_span1">阅读量：<i>' + data.items.rows[i].browseCount +
							'</i></span><span class="iconfont icon-pinglun" id="main1_p3_span3"><i>' + data.items.rows[i].commentCount +
							'</span><span class="iconfont icon-dianzan11" id="main1_p3_span2"><i>' + data.items.rows[i].zanCount +
							'</i></span></p></div></li>';
						$('#main1 ul').append(str);
					} else {
						var str = '<li data-Id="' + data.items.rows[i].Id + '" data-userId="' + data.items.rows[i].userGuid +
							'"><img src="' + data.items.rows[i].image + '"/><p class="main1_p1">' + data.items.rows[i].title +
							'</p><p class="main1_p2">' + data.items.rows[i].content +
							'</p><p class="main1_p3"><span id="main1_p3_span1">阅读量：<i>' + data.items.rows[i].browseCount +
							'</i></span><span class="iconfont icon-pinglun" id="main1_p3_span3"><i>' + data.items.rows[i].commentCount +
							'</span><span class="iconfont icon-dianzan11" id="main1_p3_span2"><i>' + data.items.rows[i].zanCount +
							'</i></span></p></li>';
						$('#main1 ul').append(str);
					}
				}
				$('#main1 ul li').click(function() {
					var userGuid = $(this).attr("data-userId");
					var Id = $(this).attr("data-Id");
					window.open("rzxq.html?userGuid=" + userGuid + "&companyId=" + Id + ""); //兼容
				})
			})
		}, 500);
	}
	Article();


	//相册
	function Menu() {
		setTimeout(function() {
			$.post('http://47.94.173.253:8008/Lectures/Get_LecturePhoto_Menu.ashx', {
				'lectureGuid': arr_3,
				'page': page
			}, function(data) {
				var data = JSON.parse(data);
				var datas = data.items.rows;
				var imageUrl;
				//console.log(datas);
				for (var i = 0; i < datas.length; i++) {
					if (datas[i].imageUrl == "") {
						imageUrl = $('#main2_imd').attr('src');
					} else {
						imageUrl = datas[i].imageUrl;
					}
					var str = '<li data-Id="' + datas[i].Id + '"><img src="' + imageUrl +
						'" ><span></span><div class="main2_p"><p>' + datas[i].title + '</p></div></li>';
					$('#main2 ul').append(str);
				};

				$('#main2 ul li').click(function() {
					var menuId = $(this).attr('data-Id');
					window.open("xcxq.html?menuId=" + menuId + ""); //兼容
				})
			})
		}, 600);
	}
	Menu();


	//视频
	function Lecture() {
		setTimeout(function() {
			$.post('http://47.94.173.253:8008/Lectures/Get_LectureVideo_ByLecture.ashx', {
				'lectureGuid': arr_3,
				'page': page
			}, function(data) {
				var data = JSON.parse(data);
				//console.log(data.items.rows);
				var dats = data.items.rows;
				for (var i = 0; i < dats.length; i++) {
					var videoTime = dats[i].videoTime.split(':')[0] + ':' + dats[i].videoTime.split(':')[1];
					var createTime1 = dats[i].createTime;
					var createTime2 = createTime1.split('T')[0];
					var createTime3 = createTime1.split('T')[1];
					var createTime4 = createTime3.split(':')[0] + ':' + createTime3.split(':')[1] + ':' + createTime3.split(':')[
						2].split('.')[0];
					var createTime = createTime2 + ' ' + createTime4;
					var str = '<li><img src="' + dats[i].videoImage + '"/><p class="main3_p1"><span class="main3_p1_span_1">' +
						dats[i].videoTitle +
						'</span><span class="main3_p1_span_2">时长：<i>' + videoTime +
						'</i></span></p><p class="main3_p2">视频类型：<span>' + dats[i].label +
						'</span></p><p class="main3_p3">上传时间：<span>' + createTime + '</span></p></li>';
					$('#main3 ul').append(str);
				}
			})
		}, 700);
	}
	Lecture();


	//产品介绍
	function Course() {
		setTimeout(function() {
			$.post('http://47.94.173.253:8008/Lectures/course/Get_MyCourse.ashx', {
				'userGuid': arr_3,
				'page': page
			}, function(data) {
				var data = JSON.parse(data);
				//console.log(data.items.rows);
				var dats = data.items.rows;
				for (var i = 0; i < dats.length; i++) {
					var createTime = dats[i].createTime.split('T')[0];
					var seImages = 'http://47.94.173.253:8008' + dats[i].courseImages;
					var Images = seImages.split(';')[0];
					if (dats[i].courseImages == "") {
						var str = '<li><div class="main4_p0"><p class="main4_p4"><span class="main4_p1_span_1">' + dats[i].courseTheme +
							'</span><span class="main4_p1_span_3"><i>' + createTime + '</i></span></p><p class="main4_p2">课程类别：<span>' +
							dats[i].courseType +
							'</span></p><p class="main4_p3">授课背景：<span>' + dats[i].courseBackground + '</span></p></div></li>';
					} else {
						var str = '<li><img src="' + Images + '" ><p class="main4_p1"><span class="main4_p1_span_1">' + dats[i].courseTheme +
							'</span><span class="main4_p1_span_2">' + createTime +
							'</span></p><p class="main4_p2">课程类别：<span>' + dats[i].courseType +
							'</span></p><p class="main4_p3">授课背景：<span>' + dats[i].courseBackground +
							'</span></p></li>';
					}
					$('#main4 ul').append(str);
				}
			})
		}, 800);
	}
	Course();


	//活动
	function tivity() {
		setTimeout(function() {
			$.post('http://47.94.173.253:8008/Activity/Get_ActiveByCreater.ashx', {
				'userGuid': arr_3,
				'page': page,
				'type': 1
			}, function(data) {
				var data = JSON.parse(data);
				//console.log(data);
				for (var i = 0; i < data.items.length; i++) {
					var state;
					var createTime = data.items[i].createTime.split(' ')[0];
					var oldTime = new Date().getTime(); //得到当前毫秒数			
					var starttime = data.items[i].activeEndTime.replace(new RegExp("-", "gm"), "/");
					var starttimeHaoMiao = (new Date(starttime)).getTime(); //得到结束时期毫秒数
					if (oldTime <= starttimeHaoMiao) {
						state = '报名中'
					} else {
						state = '已结束'
					}
					var str = '<li><img src="' + data.items[i].activeImg +
						'" ><p class="main5_p1"><span class="main5_p1_span_1">' + data.items[i].activeTitle +
						'</span><span class="main5_p1_span_2">' + state + '</span></p><p class="main5_p2">城市：' + data.items[i].activeCity +
						'<span>时间：' + createTime + '</span></p><p class="main5_p3">阅读量：<i>' + data.items[i].pageView +
						'</i><span>报名人数：<i>' + data.items[i].regCount + '</i></span></p></li>';
					$('#main5 ul').append(str);
				}

			})
		}, 900);
	}
	tivity();
	

       
	//留言查看
	function LeaveMsg() {
		setTimeout(function() {
			$.post('http://47.94.173.253:8008/Makerspacey/MakerLeaveMsg/Get_MakerLeaveMsg.ashx', {
				'makerGuid': arr_3,
				'page': page
			}, function(data) {
				var data = JSON.parse(data);
				console.log(data.items);
				for (var i = 0; i < data.items.length; i++) {
					var Meage;
					var datas = data.items[i];
					var createTime = datas.createTime.split('T')[0];
					var director = datas.upname;
					var str = '<li><div class="box"><img src="' + datas.iphoto +
						'" ><p class="main6_p1"><span class="main6_p1_span_1">' + director +
						'</span><span class="main6_p1_span_2">' + createTime +
						'</span></p><div class="main6_p0"><p class="main6_p2">' + datas.Message + '</p>';
					if (datas.childList == "") {
						Meage = '</div></div></li>';
					} else {
						for (var j = 0; j < datas.childList.length; j++) {
							Meage = '<p class="main6_p2"><i>' + datas.childList[j].upname + ':</i><b>回复</b><i>' + director + '：</i>' + datas.childList[j].Message +
							'</p></div></div></li>';
						}
					}
					var machine = str + Meage;
					$('#main6 ul').append(machine);
				}
			})
		}, 1000);
	}
	LeaveMsg();


	//访客
	function Visitor() {
		setTimeout(function() {
			$.post('http://47.94.173.253:8008/Makerspacey/MakerVisitor/Get_MakerVisitor.ashx', {
				'makerGuid': arr_3,
				'page': page
			}, function(data) {
				var data = JSON.parse(data);
				//console.log(data);
				for (var i = 0; i < data.items.length; i++) {
					var createTime = data.items[i].createTime.split('T')[0];
					var str = '<li><img src="' + data.items[i].iphoto + '" ><p class="main7_p1"><span class="main7_p1_span_1">' +
						data.items[i].upname +
						'</span><span class="main7_p1_span_2">' + createTime + '</span></p><p class="main7_p2">' + data.items[i].useroption +
						'</p></li>';
					$('#main7 ul').append(str);
				}
			})
		}, 1100);
	}
	Visitor();


                 //转发
				var _hmt = _hmt || [];
				(function () {
				    var hm = document.createElement("script");
				    hm.src = "https://hm.baidu.com/hm.js?d69321757dcfbfbe09dbddd4dca87b28";
				    var s = document.getElementsByTagName("script")[0];
				    s.parentNode.insertBefore(hm, s);
				})();				
				 var nativeShare = new NativeShare()
				 var shareData = {
				     title: '易企学',
				     desc: '打造中国最领先的工业互联网,让天下企业互联互通',
				     // 如果是微信该link的域名必须要在微信后台配置的安全域名之内的。
				     link: 'http://www.eqidd.com/changke/index_start.html?userGuid='+ arr_3 +'',
				     icon: 'http://zz.semtuandui.com/logo.png',
				     // 不要过于依赖以下两个回调，很多浏览器是不支持的
				     success: function() {
						 
				     },
				     fail: function() {
				     }
				 }
				 nativeShare.setShareData(shareData);
				  $('#transmit').click(function(){
				 	call()
				 })
				 
				 function call(command) {
				     try {
				         nativeShare.call(command);
				     } catch (err) {
				         // 如果不支持，你可以在这里做降级处理
				         alert(err.message)
				     }
				 }
				 
				 function setTitle(title) {
				     nativeShare.setShareData({
				         title: title,
				     })
				 }//结束










});
