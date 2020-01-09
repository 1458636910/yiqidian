$(document).ready(function() {
	
	window.addEventListener('scroll', function(){
	 	let t = $('body, html').scrollTop();   // 目前监听的是整个body的滚动条距离
	 	if(t>26){
			$('.nav').addClass('nav-active')
		}else{
			$('.nav').removeClass('nav-active')
		}
	 })

	//Demo
	layui.use('form', function() {
		var form = layui.form;

	});
		
	var http_head = "http://47.94.173.253:8008/";
	var time = 365;
    var page = 0;
	//首页轮播图
	function Slide() {
		setTimeout(function() {
		$.post("" + http_head + "yiqixue/Get_Yiqixue_Slide.ashx", {}, function(data) {
			var data = JSON.parse(data);
			//console.log(data.items)
			for (let i = 0; i < data.items.length; i++) {
				$("#swiper_1").append('<div class="swiper-slide"><a href="' + data.items[i].contentUrl +
					'" target="_blank"><img src="' + data.items[i].imageUrl + '"/></a></div>')
				
			};
			var mySwiper = new Swiper('#contents1', {
				loop: true, // 循环模式选项
				autoplay: true,
				mousewheel:true,
				// 如果需要分页器
				pagination: {
					el: '.swiper-pagination',
					clickable :true
				},
				 //如果需要滚动条
	//			scrollbar: {
	//				el: '.swiper-scrollbar',
	//			},
				autoplay: {
					//触碰后接着滚蛋
					disableOnInteraction: false,
				},
				 navigation: {
			      nextEl: '.swiper-button-next',
			      prevEl: '.swiper-button-prev',
			    },
			});
			for(i=0;i<mySwiper.pagination.bullets.length;i++){
			  mySwiper.pagination.bullets[i].onmouseover=function(){
			    this.click();
			  };
			} 
			mySwiper.params.pagination.clickable = true ;
			//此外还需要重新初始化pagination
			mySwiper.pagination.destroy()
			mySwiper.pagination.init()
			mySwiper.pagination.bullets.eq(0).addClass('swiper-pagination-bullet-active');
		}) 
		},100);
	}

  
	//十大热门
//	function hot10(){
//		$.post('http://47.94.173.253:8008/Articles/Get_Hot_Article.ashx',function(res){
//			console.log(res)
//		})
////		for(var i=0;i<10;i++){
////			$('.hot10 ul').append('<li><span></span>喜迎2019</li>')
////		}
//		
//	}
//	var time1=setTimeout(function(){
//		hot10()
//		clearTimeout(time1)
//	},200)
	
	
	
	
	
	
	
	
	//时政
	function politics() {
		
			$.post("" + http_head + "Articles/Get_RecentlyUser.ashx", {}, function(data) {
			var data = JSON.parse(data);
			//console.log(data)
			for (let i = 0; i < data.items.length; i++) {
				if(data.items[i].iphoto==''){
					var azc='./img/tx.png'
				}else{
					var azc = "http://47.94.173.253:8008" + data.items[i].iphoto;
				}
				$("#aaa").append('<li ><img src="'+ azc +'" width="22" height="22" alt="" /><a  href="http://www.eqidd.com/changke/index_start.html?userGuid='+ data.items[i].userGuid+'" target="_blank" >'+ data.items[i].upname +'</a></li>');
			};
				bbb.innerHTML = aaa.innerHTML;
			}) 
		
	}	
	
	
	var aaa = document.getElementById('aaa');
	var one = document.getElementById('one');
	var speed = 50;
	var timer = null;
	one.scrollTop = 0;
	
	function axad() {
		if (one.scrollTop >= aaa.scrollHeight) {
			one.scrollTop = 0;
		} else {
			one.scrollTop++;
		}
	}
	function auto() {
		timer = setInterval(axad, speed);
		one.scrollTop++;
	}
	
	auto();
	one.onmouseover = function() {
		clearInterval(timer);
	}
		
	one.onmouseout = function() {
		timer = setInterval(axad, speed);
	}
	
	
	
	//平台专栏
	function ComList() {
		$.post('' + http_head + 'Articles/Get_RecentlyUser.ashx', {}, function(data) {
			var data = JSON.parse(data);
			//console.log(data)
			if (data.status == 200) {
//				for (var itemValue of data.items) {
					for(var i=0;i<data.items.length;i++){
						var azc = "http://47.94.173.253:8008" + data.items[i].iphoto;
						var str = '<li class="swiper-slide wow flipInY animated" data-userGuid="'+ data.items[i].userGuid +'"><img src="'+ azc +
						 '" alt=""><p>' + data.items[i].upname + '</p></li>';
						$('#forward').append(str);
					}
					
//				};
				var mySwiperd = new Swiper('#advers', {
					pagination: '.swiper-paginationn',
					paginationClickable: true,
					slidesPerView: 6,
					loop: true,
					// 如果需要前进后退按钮
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					},
				});
				$("#forward li").on("click", function() {
					var userGuid = $(this).attr("data-userGuid");
					window.open("http://www.eqidd.com/changke/index_start.html?userGuid=" + userGuid);
				})
			}
		})
	}
//   ComList();
	 
	 
	//热门文章
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
				
	function hotTitle(){
//		setTimeout(function(){
			$.post("" + http_head + "Articles/getArticleByHome.ashx", {
			page: page
			}, function(data) {
				var data = JSON.parse(data);
				console.log(data)
				for(var i=0;i<data.items.length;i++){
					data.items[i].optionTime=getTime(data.items[i].optionTime)
				}
				
				 
		//		page = data.items.page;
				$("#table").bootstrapTable({
					classes: "table-no-bordered",
					locale: "zh-CN",
					columns: [{
						formatter: table,
						events: viewtable
					}]
				});
				
				$("#table").bootstrapTable("load", data.items);
				if(IsPC()){
					
				}else{
					window.addEventListener('scroll', function(){
					 	let t = $('body, html').scrollTop();   // 目前监听的是整个body的滚动条距离
					 	if(t>40){
							$('.nav').addClass('nav-active')
						}else{
							$('.nav').removeClass('nav-active')
						}
					 })
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
				}
			})
			
//		},400)
	}
	 Slide();
	hotTitle()
	var time1=setTimeout(function(){
		politics();
		clearTimeout(time1)
	},400)
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
		function table(e, value, index, row) {
			if (value.homeImage == "http://47.94.173.253:8008") {
				return '<div class="essay_p"><div class="essay_p1">' + value.title +
					'</div><p class="essay_p2">' + value.textContent+
					'</p><p class="essay_p3" id="essay_p3_"><span class="browseCount"><img src="img/阅读量图标.png"/>' + value.browseCount+ 
					'</span><span class="zanCount"><img src="img/点赞图标.png"/>' + value.zanCount+ '</span><span class="commentCount"><img src="img/评论图标.png"/>' + value.commentCount+ 
					'</span><span class="time">' + value.optionTime+ '</span></p></div>'
			} else {
				return '<div class="essay_p"><div class="essay_p1">' + value.title +
					'</div><img src="' + value.homeImage +
					'" class="imgone"/><p class="essay_p4">' + value.textContent + '</p><p class="essay_p3" id="essay_p3__"><span class="browseCount"><img src="img/阅读量图标.png"/>' + value.browseCount+ 
					'</span><span class="zanCount"><img src="img/点赞图标.png"/>' + value.zanCount+ '</span><span class="commentCount"><img src="img/评论图标.png"/>' + value.commentCount+ 
					'</span><span class="time">' + value.optionTime+ '</span></p></div>'
			}
		};
	$('.readMore').on('click',function(){
		page=page+1
		$.post("" + http_head + "Articles/getArticleByHome.ashx", {
			page: page
		}, function(data) {
			var data = JSON.parse(data);
			for(var i=0;i<data.items.length;i++){
				data.items[i].optionTime=getTime(data.items[i].optionTime)
			}
			$("#table").bootstrapTable("append", data.items);
			if(IsPC()){
					$('.article .essay .essay_p h1').addClass('h1Pc')
				}else{
					$('.essay_p').addClass('essay_pp')
					$('.essay_p1').addClass('essay_p11')
					$('.essay_p2').addClass('essay_p22')
					$('.essay_p4').addClass('essay_p44')
					$('.essay_p3').addClass('essay_p33')
					$('#essay_p3_ .time').addClass('time1')
					$('#essay_p3_').addClass('essay_p33')
					$('.essay_p3 .time').addClass('time1')
					$('.imgone').addClass('img1')
					$('#essay_p3_ img').addClass('img2')
					$('.readMore').addClass('.readMore1')
					$('.article .essay .essay_p h1').addClass('essay_p33')
					$('.article .essay .essay_p h1 img').addClass('img2')
					$('.article .essay .essay_p3 img').addClass('img2')
					$('.article .essay .essay_p3 img').addClass('img2')
					$('.article .essay .essay_p h1 .time').addClass('time1')
				}
		})
	})
	//热门文章点击跳转  
	window.viewtable = {
		"click .essay_p1,.imged,.essay_p4,.essay_p2": function(e, value, row, index) {
			console.log(row)
			var this_Id = row.Id;
			var this_userGuid = row.userGuid;
			window.open("http://www.eqidd.com/changke/html/logDetail2.html?useruid=" + this_userGuid + "&id=" + this_Id);
		}
	}
	$('#remen').click(function() {
		window.open("rmwz.html");
	});

	//精选文章  Articles/Get_Article_ByBoutique.ashx 精选接口目前没数据 暂时用下面热门接口
//	$.post("" + http_head + "Articles/Get_Article.ashx", {
//		page: page
//	}, function(data) {
//		var data = JSON.parse(data);
//		//console.log(data.items)
//		page = data.items.page;
//		$("#choice").bootstrapTable({
//			classes: "table-no-bordered",
//			locale: "zh-CN",
//			columns: [{
//				formatter: choice,
//				events: viewchoice
//			}]
//		});
//		$("#choice").bootstrapTable("load", data.items.rows);
//
//		function choice(e, value, index, row) {
//			var timed = value.createTime.split("T")[0];
//			if (value.image == "") {
//				return '<div class="essay_p"><div class="essay_p1">' + value.title +
//					'</div><p class="essay_p2">' + value.content +
//					'</p><p class="essay_p3"><span class="time">' + timed + '</span><span class="company">' + value.upname +
//					'</span></p></div>'
//			} else {
//				return '<div class="essay_p"><div class="imged"><img src="' + value.image +
//					'"/></div><div class="essay_p1">' + value.title +
//					'</div><p class="essay_p4">' + value.content + '</p><p class="essay_p3"><span class="time">' + timed +
//					'</span><span class="company">' + value.upname + '</span></p></div>'
//			}
//		};
//	});
	//精选文章点击跳转
	window.viewchoice = {
		"click .essay_p1,.imged,.essay_p4,.essay_p2": function(e, value, row, index) {
			var this_Id = row.Id;
			var this_userGuid = row.userGuid;
			window.open("http://www.eqidd.com/changke/html/logDetail2.html?useruid=" + this_userGuid + "&id=" + this_Id);
		}
	};
	$('#jx').click(function() {
		window.open("jxwz.html");
	})



	//精品师资
	function ckTime() {
	setTimeout(function() {
	$.post('' + http_head + 'Makerspacey/Get_LectureByCheckTime.ashx', {
		page: page
	}, function(data) {
		var data = JSON.parse(data)
		if (data.status == 200) {
//			for (var itemValue of data.items) {
				for(var i=0;i<data.items.length;i++){
					var b = itemValue.headimage;
					var n = b.split(".");
					var headpic = n[0] + '.' + n[1] + '.' + n[2] + '.' + n[3] + 'min.' + n[4];
					var str = '<li class="swiper-slide" data-id="' + data.items[i].userGuid + '"><img src="' + headpic +
						'" alt=""><p>' +  data.items[i].realName + '</p><p class="name">' +  data.items[i].ResearchField + '</p></li>';
					$('#maker').append(str);
				}
				
//			};
			var mySwiperds = new Swiper('#figure', {
				paginationClickable: true,
				slidesPerView: 6,
				loop: true,
				// 如果需要前进后退按钮
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
			});
			$("#maker li").on("click", function() {
				var userGuid = $(this).attr("data-id");
				window.open("http://www.eqidd.com/changke/index_start.html?userGuid=" + userGuid + ""); //兼容
			})
		}
	})
	},1000);
	};
//	ckTime()

	//企业文章
	setTimeout(function() {
		function loadTable() {
	$.post("" + http_head + "Articles/Get_ArticleByCompany.ashx", {
		page: page
	}, function(data) {
		var data = JSON.parse(data);		
		var listx = [data.items.rows[0],data.items.rows[1],data.items.rows[2],data.items.rows[3],data.items.rows[4],data.items.rows[5]];
		$("#comsinfor").bootstrapTable({
			classes: "table-no-bordered",
			locale: "zh-CN",
			columns: [{
				formatter: comsinfor,
				events: viewcomsinfor
			}]
		});

		$("#comsinfor").bootstrapTable("load", listx);

		function comsinfor(e, value, index, row) {
			var timestr = value.createTime;
			var timehead = timestr.split("T")[0];
			var timetail1 = timestr.split("T")[1].split(":")[0];
			var timetail2 = timestr.split("T")[1].split(":")[1];
			var timetail = timetail1 + ":" + timetail2;
			var timed = timehead + " " + timetail;
			var b = value.image;
			var n = b.split(".");
			var headpic = n[0] + '.' + n[1] + '.' + n[2] + '.' + n[3] + 'min.' + n[4];
			if (value.image == "") {
				return '<div class="Enterprise_title"><div class="Enterprise_title_1"><p>' + value.title +
					'</p></div><div class="Enterprise_title_2"><p>' + value.content +
					'</p></div><span class="Enterprise_title_span1">' + value.upname +
					'</span><span class="Enterprise_title_span2">' + timed +
					'</span></div>'
			} else {
				return '<div class="Enterprise_titles"><div class="Enterprise_title_1"><p>' + value.title +
					'</p></div><img src="' + headpic +
					'"/><p class="Enterprise_titles_1">' + value.content + '</p><span class="Enterprise_title_span1">' + value.upname +
					'</span><span class="Enterprise_title_span2">' + timed +
					'</span></div>'
			}
		};
	});
	}
//		loadTable()
	}, 1300);

	//企业文章点击跳转
	window.viewcomsinfor = {
		"click .Enterprise_title_1,.Enterprise_titles_1,.Enterprise_title_2": function(e, value, row, index) {
			window.open("http://www.eqidd.com/changke/html/logDetail2.html?useruid=" + row.userGuid + "&id=" + row.Id);
		}
	}
	$('#qywz').click(function(){
		window.open("qywz.html");
	})


	//最新文章
	setTimeout(function() {
		function ByTime() {
	$.post("" + http_head + "Articles/Get_Article_ByTime.ashx", {
		page: page,
		time: time
	}, function(data) {
		var data = JSON.parse(data);
		//console.log(data.items)
		var listx = [data.items.rows[0],data.items.rows[1],data.items.rows[2],data.items.rows[3],data.items.rows[4],data.items.rows[5]];
		$("#news").bootstrapTable({
			classes: "table-no-bordered",
			locale: "zh-CN",
			columns: [{
				formatter: news,
				events: viewnews
			}]
		});

		$("#news").bootstrapTable("load", listx);

		function news(e, value, index, row) {
			//console.log(value.content)
			var timestr = value.createTime;
			var timehead = timestr.split("T")[0];
			var timetail1 = timestr.split("T")[1].split(":")[0];
			var timetail2 = timestr.split("T")[1].split(":")[1];
			var timetail = timetail1 + ":" + timetail2;
			var timed = timehead + " " + timetail;
			var b = value.image;
			var n = b.split(".");
			var headpic = n[0] + '.' + n[1] + '.' + n[2] + '.' + n[3] + 'min.' + n[4];
			if (value.image == "") {
				return '<div class="Enterprise_title"><div class="Enterprise_title_1"><p>' + value.title +
					'</p></div><div class="Enterprise_title_2"><p></p></div><span class="Enterprise_title_span1">' + value.upname +
					'</span><span class="Enterprise_title_span2">' + timed +
					'</span></div>'
			} else {
				return '<div class="Enterprise_titles"><div class="Enterprise_title_1"><p>' + value.title +
					'</p></div><img src="' + headpic +
					'"/><p class="Enterprise_titles_1">' + value.content + '</p><span class="Enterprise_title_span1">' + value.upname +
					'</span><span class="Enterprise_title_span2">' + timed +
					'</span></div>'
			}
		};
	});
}
//			ByTime()
		}, 1600);
	//最新文章点击跳转
	window.viewnews = {
		"click .Enterprise_title_1,.Enterprise_titles_1,.Enterprise_title_2": function(e, value, row, index) {
			window.open("http://www.eqidd.com/changke/html/logDetail2.html?useruid=" + row.userGuid + "&id=" + row.Id);
		}
	}
	
	$('#zxwz').click(function(){
		window.open("zxwz.html");
	});
	
	
	//广告板块
	function tiset() {
	setTimeout(function() {
	$.post("" + http_head + "Articles/Advertisement/Get_Advertisement.ashx", {}, function(data) {
		var data = JSON.parse(data);
		for(var x = 0; x < data.items.length; x++){
			var item = data.items[x];
			var txx = item.lists;			
			if(item.type == '书籍'){
				$('#poster_type_1').text('书籍');
				if(txx.length <= 1){
					var str = txx[0].headpic;
					var n = str.split(".");
					var headpic = n[0] + '.' + n[1] + '.' + n[2] + '.' + n[3] + 'min.' + n[4];
				$("#poster_1").append('<div><div class="tailor"><a href="'+ txx[0].advurl +'" target="_blank"><img src="img/a.jpg" data-src="'+ headpic +
				'" data-sizes="auto" class="lazyload" alt="" /></a></div><div class="lkm"><p id="poster_title_1">'+ txx[0].title +'</p></div></div>');
				$('#poster_title_1').text(txx[0].title);
				}else{
					for(var i = 0; i < txx.length; i++){
						//console.log(item.lists[i])
						var str = txx[i].headpic;
						var n = str.split(".");
						var headpic = n[0] + '.' + n[1] + '.' + n[2] + '.' + n[3] + 'min.' + n[4];
						 $("#poster_1").append('<div class="swiper-slide"><div class="tailor"><a href="'+ txx[i].advurl +'" target="_blank"><img src="img/a.jpg" data-src="'+ headpic +
						 '" data-sizes="auto" class="lazyload" alt="" /></a></div><div class="lkm"><p id="poster_title_1">'+ txx[i].title +'</p></div></div>');
					}
				}
			} else if(item.type == '课程'){
				$('#poster_type_2').text('课程');
				if(txx.length <= 1){
					var str = txx[0].headpic;
					var n = str.split(".");
					var headpic = n[0] + '.' + n[1] + '.' + n[2] + '.' + n[3] + 'min.' + n[4];
				$("#poster_2").append('<div><div class="tailor"><a href="'+ txx[0].advurl +'" target="_blank"><img src="img/a.jpg" data-src="'+ headpic +
				'" data-sizes="auto" class="lazyload" alt="" /></a></div><div class="lkm"><p id="poster_title_2">'+ txx[0].title +'</p></div></div>');	
				$('#poster_title_2').text(txx[0].title);
				}else{
					for(var b = 0; b < txx.length; b++){
						var str = txx[b].headpic;
						var n = str.split(".");
						var headpic = n[0] + '.' + n[1] + '.' + n[2] + '.' + n[3] + 'min.' + n[4];
						 $("#poster_2").append('<div class="swiper-slide"><div class="tailor"><a href="'+ txx[b].advurl +'" target="_blank"><img src="img/a.jpg" data-src="'+ headpic +
						 '" data-sizes="auto" class="lazyload" alt="" /></a></div><div class="lkm"><p id="poster_title_2">'+ txx[b].title +'</p></div></div>');
					}
				}
			} else if(item.type == '精品师资'){
				if(txx.length <= 1){
					var str = txx[0].headpic;
					var n = str.split(".");
					var headpic = n[0] + '.' + n[1] + '.' + n[2] + '.' + n[3] + 'min.' + n[4];
				$("#poster_3").append('<div><div class="tailorx"><div class="namx"><p id="poster_title_3">'+ txx[0].title +'</p></div><div class="imgsx"><a href="'+ txx[0].advurl +'" target="_blank"><img src="img/a.jpg" data-src="'+ headpic +
				'" data-sizes="auto" class="lazyload" alt="" /></a></div></div></div>');
				}else{
					for(var c = 0; c < txx.length; c++){
						var str = txx[c].headpic;
						var n = str.split(".");
						var headpic = n[0] + '.' + n[1] + '.' + n[2] + '.' + n[3] + 'min.' + n[4];
						 $("#poster_3").append('<div class="swiper-slide"><div class="tailorx"><div class="namx"><p id="poster_title_3">'+ txx[c].title +'</p></div><div class="imgsx"><a href="'+ txx[c].advurl +'" target="_blank"><img src="img/a.jpg" data-src="'+ headpic +
						 '" data-sizes="auto" class="lazyload" alt="" /></a></div></div></div>');
					}
				}
			} else if(item.type == '活动'){
				$('#poster_type_4').text('活动');
				if(txx.length <= 1){
					var str = txx[0].headpic;
					var n = str.split(".");
					var headpic = n[0] + '.' + n[1] + '.' + n[2] + '.' + n[3] + 'min.' + n[4];
				$("#poster_4").append('<div><div class="tailor"><a href="'+ txx[0].advurl +'" target="_blank"><img src="img/a.jpg" data-src="'+ headpic +
				'" data-sizes="auto" class="lazyload" alt="" /></a></div><div class="lkm"><p id="poster_title_4">'+ txx[0].title +'</p></div></div>');
				$('#poster_title_4').text(txx[0].title);
				}else{
					for(var d = 0; d < txx.length; d++){
						var str = txx[d].headpic;
						var n = str.split(".");
						var headpic = n[0] + '.' + n[1] + '.' + n[2] + '.' + n[3] + 'min.' + n[4];
						 $("#poster_4").append('<div class="swiper-slide"><div class="tailor"><a href="'+ txx[d].advurl +'" target="_blank"><img src="img/a.jpg" data-src="'+ headpic +
						 '" data-sizes="auto" class="lazyload" alt="" /></a></div><div class="lkm"><p id="poster_title_4">'+ txx[d].title +'</p></div></div>');
					}
				}
			}
			
			}
		
		var mySwiper = new Swiper('.swiper-container', {
			loop: true, // 循环模式选项
			autoplay: true,
			// 如果需要分页器
			pagination: {
				el: '.swiper-pagination',
			},
			// 如果需要滚动条
			scrollbar: {
				el: '.swiper-scrollbar',
			},
			autoplay: {
				disableOnInteraction: false,
			},
		});
	}) 
	},2000);
	}
//	tiset();
//	function wordlimit(cname,wordlength){
//		var cname=document.getElementsByClassName(cname);
//		for(var i=0;i<cname.length;i++){
//			var nowhtml=cname[i].innerHTML;
//			var nowlength=cname[i].innerHTML.length;
//			if(nowlength>wordlength){
//				cname[i].innerHTML=nowhtml.substr(0,wordlength)+'…';
//			}
//		}
//	}
//	wordlimit("essay_p2",100);
});
