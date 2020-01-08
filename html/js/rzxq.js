$(document).ready(function() {
				//分割当前网页链接
				var windowUrl = window.location.href; //获取当前url链接		
				//http://127.0.0.1:8848/phone/rzxq.html?userGuid=4f3eaceb7ea0439ab2428c6ac0fc8c69&companyId=359
				var arr = windowUrl.split("?", 2); //分割url	
				var arr_1 = arr[1]; //瞎起变量
				var arr_2 = arr_1.split('&', 2);
				var arr_3 = (arr_2[0].split('=', 2))[1];
				var arr_4 = (arr_2[1].split('=', 2))[1];
				var std;
				//console.log(arr_3) 
				

                 
				var http_head = "http://47.94.173.253:8008";
				var page = 0;
				var promise = new Promise(function(resolve, reject) {
				$.post('' + http_head + '/Articles/Get_Article_ById.ashx', {
					userGuid: arr_3,
					articleId: arr_4
				}, function(data) {
					var data = JSON.parse(data);
					console.log(data.items)
					let arr = []
					arr.push(data.items);
					std = data.items.Label;
					$("#table").bootstrapTable({
						data: arr,
						locale: "zh-CN",
						columns: [{
							formatter: table,
						}]
					})
					function table(e, value, index, row) {
						//console.log(value)
						document.title = value.title;
						return '<div class="titles">'+ value.title +'</div><div class="img clearfix"><img src="'+ value.iphoto +
						'" /><p style="padding-top:0;line-height: 64px;">'+ value.upname +
						'</p></div><div class="record"><p>'+ value.content +
						'</p><div class="limit"><a href="http://www.eqidd.com/html/adjust.html"><div class="btnd">打开APP，查看全部评论</div></a></div></div>'
					}
					resolve(std)
				})
				});
			
			promise.then(function(value) {
                //第二部分
				$.post('' + http_head + '/Articles/Get_Article_ByLable.ashx', {
					lable: value,
					page: page
				}, function(data) { 
					var data = JSON.parse(data);
					//console.log(data.items)
					$("#conmifor").bootstrapTable({
						data: data.items.rows,
						locale: "zh-CN",
						columns: [{
							formatter: conmifor,
						}],
						onClickCell:function(field, value, row, $element){							
							console.log(row.Id);
							window.open ("rzxq.html?userGuid="+ row.userGuid +"&companyId=" + row.Id + ""); //兼容
							},
					})

					function conmifor(e, value, index, row) {
						console.log(value)
						if (value.images == "") {
							return '<div class="tabulon"><p class="online">'+ value.content +'</p></div>'
						} else {
							return '<div class="tabulon"><p class="onlined">'+ value.content +
							'</p><div class="image_text"><img src="'+ value.image +'" class="clearfix"/></div></div>'
						}
					}
				})
				});
			})