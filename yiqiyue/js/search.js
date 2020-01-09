$(document).ready(function() {
	
	//分割当前网页链接
	var windowUrl = window.location.href; //获取当前url链接
	var arr = windowUrl.split("?", 2); //分割url		
	var arr_1 = arr[1]; //瞎起变量		
	var arr_2 = arr_1.split('=', 2);
	var arr_3 = arr_2[1];
	var page =0;
	var type ='html';
var mySwiper = new Swiper('.swiper-container', {
		loop: true, // 循环模式选项
        autoplay:true,		
		// 如果需要分页器
		pagination: {
			el: '.swiper-pagination',
		},
		// 如果需要滚动条
		scrollbar: {
			el: '.swiper-scrollbar',
		},
		 autoplay: {
		//触碰后接着滚动
          disableOnInteraction: false,
      },
	});
	
	
	
	var page = 0;
	var type = 'html';
	//关键词
	$.post("http://47.94.173.253:8008/Articles/Get_Article_BySearch.ashx", {
		para:arr_3,
		page: 0,
		type:type
	}, function(data) {
		var data = JSON.parse(data);
		//console.log(data.items.rows)
		page = data.items.page;
		$("#table").bootstrapTable({
			classes: "table-no-bordered",
			locale: "zh-CN",
			columns: [{
				formatter: table,
				events: viewtable
			}]
		});
	
		$("#table").bootstrapTable("load", data.items.rows);
	    
		function table(e, value, index, row) {
			 var createTime = value.createTime.split('T')[0];
			return '<li style="height: 110px;"><div class="title" style="width:100%;"><p style="width:80%;">'+ value.title +'</p><span style="padding-top: 4px;">'+ createTime +
			'</span></div><p class="contents_left_p">'+ value.content +
			'</p></li>'
		};
	});
	
	window.viewtable = {
		"click .contents_left_p": function(e, value, row, index) {
			console.log(row)
			var this_Id = row.Id;
			var this_userGuid = row.userGuid;
			window.open("http://www.eqidd.com/changke/html/logDetail2.html?useruid=" + this_userGuid + "&id=" + this_Id);
		}
	}
	
	//下一步点击事件
	$("#pageBtn").on("click", function() {
		nextPage();
	})
	
	function nextPage() {
		$.post("http://47.94.173.253:8008/Articles/Get_Article_BySearch.ashx", {
			para:arr_3,
			page: page,
			type:type
		}, function(data) {
			var data = JSON.parse(data);
			if(data.items.rows.length > 0){
				page = data.items.page;
			}
			if (data.items.rows=='') {
				$('#pageBtn').html('没有更多数据了')
			} else {
				$("#table").bootstrapTable({						
					columns: [{
						formatter: table,
					}]
				})					 
			    $("#table").bootstrapTable("append", data.items.rows);
			}
		})
	};
	
	var page = 0;
	//推荐创客轮播
	$.post("http://47.94.173.253:8008/Makerspacey/Get_LectureByCheckTime.ashx", {
		page:page
	}, function(data) {
		var data = JSON.parse(data);
		//console.log(data)
		$("#maker").bootstrapTable({
			columns: [{
				formatter: maker,
				events: viewmaker
			}]
		})
	
		$("#maker").bootstrapTable("load", data.items); //加载数据
		
		function maker(e, value, row, index) {
			return '<li class="aaa"><img src="' + value.headimage + '"/><p>'+ value.realname +
			'</p><span>'+ value.ResearchField +'</span></li>'
		}
	});
	
	window.viewmaker = {
		"click .aaa": function(e, value, row, index) {
			var userGuid = row.userGuid;			
			window.open("http://www.eqidd.com/changke/index_start.html?userGuid=" + userGuid + ""); //兼容
		}
	}
	
	
	});