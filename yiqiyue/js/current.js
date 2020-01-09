$(document).ready(function() {
//登陆退出 
   $(".foot").load("http://www.eqidd.com/footer.html");
   $(".nav2").load("nav.html?v=20190103");
   $(".foot1").load("foot1.html");
function isIE() { //ie?
	if(!!window.ActiveXObject || "ActiveXObject" in window){
	}else{
//		$(".contents_right ul #h150").attr("height","100px")
		console.log($(".contents_right ul #h150").text())
	}
   }
isIE()
function getTime(timeone){
		var mistiming = Math.round((Date.now() - Date.parse(timeone)) / 1000);
		   var arrr = [timeone, '个月前', '周前', '天前', '小时前', '分钟前', '秒前','刚刚'];
		   var arrn = [31536000, 2592000, 604800, 86400, 3600, 60, 10,1];
		   for (var i = 0; i < arrn.length; i++) {
			   var inm = Math.floor(mistiming / arrn[i]);
			   if (inm != 0) {
				   if(i==0){
					    console.log(inm + arrr[i]) 
					   return arrr[i] 
				   }else{
					    // console.log(inm + arrr[i]) 
					   return inm + arrr[i] 
				   }
			   }
		   }
	   }
   $(".content_left").load("contents_left.html?v=20190102");
	var href = location.href;
	var dataC = localStorage.getItem("GHY_login");
	if (dataC != null) {
		var dataInfo = JSON.parse(dataC);
		//console.log(dataInfo)
		$('.listd').text(dataInfo.username);
		 $('.publish').click(function(){
//			window.open("http://www.eqidd.com/makerSpace/writeCircle.html?source=0%userGuid" + dataInfo.Guid + "&companyId=" + dataInfo.companyId);
			window.open("http://www.eqidd.com/makerSpace/writing.html?source=0%userGuid="+dataInfo.Guid+"&companyId="+dataInfo.companyId)
//			http://www.eqidd.com/makerSpace/writing.html?source=0%userGuid=4f47e8c7e40541d4a2f03c3c72304252&companyId=46
		});
		$('.ckkj').click(function(){
			window.open("http://www.eqidd.com/makerSpace/innerLogin.html?href=http://www.eqidd.com/makerSpace/index.html");
		});
		if (dataInfo.iphoto == "http://47.94.173.253:8008") {

		} else {
			$('#pics').attr("src", dataInfo.iphoto);
		};
		$('#loginBtn').text(dataInfo.username);
		$("#regBtn").on("click", function() {
			localStorage.removeItem("GHY_login");
			window.location.reload();
		}).text("退出");
		var flag2 = 0;
		$("#loginBtn").on("click", function() {
			if (flag2 == 0) {
				$(".userOption").toggle("500");
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
			location.href = "./innerLogin.html?href=" + href + "";
		}).text("登录");
		$("#regBtn").on("click", function() {
			location.href = "http://www.eqidd.com/html/reg.html?href=" + href + "";
		}).text("注册")
		 $('.publish').click(function(){
		 	layer.msg('请先登录')
		 })
	};


	//导航
	$(".nav .nav_1 li").click(function() {
		$(this).siblings('li').removeClass('on');
		$(this).siblings('li').find('span').remove();
		$(this).addClass('on');
		$(this).append('<span></span>');
	});
	
	//十大热门内容
		function cles() {
			setTimeout(function() {
			$.post("http://47.94.173.253:8008/Articles/Get_Hot_Article.ashx", {}, function(data) {
				var data = JSON.parse(data);
//				console.log(data.items);
				if (data.status == 200) {
					let index = 0;
//					for (var itemValue of data.items){
								
						for(var i=0;i<data.items.length;i++){
							index++;
							var str = '<li data-id="'+ data.items[i].Id +'" data-useruid="'+ data.items[i].Guid +'" ><span>'+ index +'</span><p>' + data.items[i].title + '</p></li>';
							$('.hot10 ul').append(str);
						}
//					};
					$(".hot10 ul li").on("click", function() {
						var Id = $(this).attr("data-id");
						var useruid = $(this).attr("data-useruid");
						window.open("http://www.eqidd.com/changke/html/logDetail2.html?useruid=" + useruid + "&id=" + Id);
					})
				}
				//搜索键下拉数据
				$('.sreach_input').mouseover(function() {
//					$('.debate').show();
				});
				$('.sreach_input').mouseout(function() {
//					$('.debate').hide();
				});
				var debateLi = $('.debate ul li');	
				debateLi.mouseover(function() {
					$(this).siblings('li').find('span').removeClass('od');
					$(this).find('span').addClass('od')
				});
				debateLi.mouseout(function() {
					$(this).find('span').removeClass('od');
				});
			})
		},30);
	}
//	cles();
	
	
	//热门关键词
//	function query() {
//	setTimeout(function() {
//		$.post('http://47.94.173.253:8008/Articles/label/label_query.ashx', {}, function(data) {
//		var data = JSON.parse(data)
//		if (data.status == 200) {
////			for (var itemValue of data.items) {
//				for(var i=0;i<data.items.length;i++){
//					var str = '<a href="">'+ data.items[i].label +'</a>';
//					$('.keywords').append(str);
//				}
//				
////			};
//		}
//	})
//	},210);
//	};
//	query();
	
	
	//Demo
	layui.use('form', function() {
		var form = layui.form;
	
	});
		
	//搜索
	var type = 'html';
	var page = 0;
	$('.sreach_button').click(function() {
		if ($('#sreach_input').val().length == 0) {
			layer.msg('搜索关键字不能为空', {
				time: 1000,
			});
		} else {
			trade()
			$('.debate').hide();
		}
	});
	 
	$('#sreach_input').keydown(function(event) {
		if (event.keyCode === 13) {
			if ($('#sreach_input').val().length == 0) {
				layer.msg('搜索关键字不能为空', {
					time: 1000,
				});
			} else {
				trade()
				$('.debate').hide();
			}
		}
	});
	
	function trade(page) {
		   setTimeout(function() {
		$.post("http://47.94.173.253:8008/Articles/Get_Article_BySearch.ashx?", {
			para: $('#sreach_input').val(),
			type: type,
			page: page
		}, function(data) {
			var data = JSON.parse(data);
			console.log(data)
			window.open("search.html?searchKey=" + $('#sreach_input').val() + "");
		})
		},200);
	}
	
	//导航部分弹框
	
	$('.develop').click(function(){
		layer.msg('正在开发中,敬请期待...', {
			time: 1000,
		});
	});
	});
	
			function IsPC() {
				var userAgentInfo = navigator.userAgent;
				var Agents = ["Android", "iPhone","SymbianOS", "Windows Phone","iPad", "iPod"];
				var flag = true;
				for (var v = 0; v < Agents.length; v++) {
			        if (userAgentInfo.indexOf(Agents[v]) > 0) {
				        flag = false;
				        break;
			        }
				}
				     return flag;
			}
			setTimeout(function(){
				if(IsPC()){
				}else{
					$('.essay_p').addClass('essay_pp')
					$('.essay_p1').addClass('essay_p11')
					$('.essay_p2').addClass('essay_p22')
					$('.essay_p4').addClass('essay_p44')
					$('.essay_p3').addClass('essay_p33')
					$('#essay_p3_ .time').addClass('time1')
					$('.essay_p3 .time').addClass('time1')
					$('.imgone').addClass('img1')
					$('#essay_p3_ img').addClass('img2')
					$('#essay_p3__ img').addClass('img2')
					$('.readMore').addClass('readMore1')
					$('.header').addClass('header1')
					$('.welcome').addClass('welcome1')
					$('.register').addClass('register1')
					$('.register li').addClass('regli')
					$('.contents_right').addClass('contents_right1')
					$('.contents_right ul li').addClass('essay_pp')
					$('.contents_right ul li').addClass('contents_rightLi')
					$('.contents_right ul li .title').addClass('essay_p11') 
					$('.contents_right ul li').children('p').addClass('essay_p22') 
					$('.contents_right .liteds').addClass('essay_p44')
					$('.contents_right li img').addClass('contents_rightTextImg')
					$('.contents_right li .time').addClass('time1')
					$('.contents_right li .label1').addClass('essay_p33')
				}
			},800)