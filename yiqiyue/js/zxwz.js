$(document).ready(function() {
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
	
	//搜索
	
	var page = 0;
	var time = 365;
	
	
	
	//企业文章
	$.post("http://47.94.173.253:8008/Articles/Get_Article_ByTime.ashx", {
		page: page,
		time: time
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
			if(value.image == ""){
				return '<li style="margin-top: 30px;"><div class="title"><p>'+ value.title +
				'</p></div><p class="lited">'+ value.content +
				'</p><i class="name">'+ value.upname +'</i></li>'
			}else{
				return '<li style="margin-top: 30px;"><div class="title"><p>'+ value.title +
				'</p></div><p class="lited liteds">'+ value.content +
				'</p><img src="'+ value.image +'"/class="imged"><i class="name">'+ value.upname +'</i></li>'
			}
		};
	});
	
	window.viewtable = {
		"click .lited,.imged,.liteds": function(e, value, row, index) {
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
		$.post("http://47.94.173.253:8008/Articles/Get_Article_ByTime.ashx", {
			page: page,
			time: time
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