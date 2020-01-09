$(document).ready(function() {
     //http://127.0.0.1:8848/summary/detil.html?userGuid=4f47e8c7e40541d4a2f03c3c72304252&companyId=46
	//获取携带值:
	function GetRequest() {
	    var url = location.search; //获取url中"?"符后的字串
	    var theRequest = new Object();
	    if (url.indexOf("?") != -1) { //判断是否含有'?'
	        var str = url.substr(1); //从字符中index为1开始抽取
	        strs = str.split("&"); //字符串分割成字符串数组
	        for (var i = 0; i < strs.length; i++) {
	            theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
	        }
	    }
	    return theRequest;
	}
	
	var arr_3 = GetRequest().userGuid;
	var arr_4 = GetRequest().companyId;
	var arr_5 = '';
	var dataC = localStorage.getItem("GHY_Mlogin");
	if (dataC != null) {
		var dataInfo = JSON.parse(dataC);
		var arr_5 = dataInfo.Guid;
	}else{
		layer.msg('请登录创客空间！', {
			time: 1000,
		});
	}
	
	layui.use('form', function() {
		var form = layui.form;
	});
	
	
	//获取公司信息
	$.post('http://47.94.173.253:8008/Com_regiInfo.ashx', {
		comId: arr_4
	}, function(data) {
		var data = JSON.parse(data);
		console.log(data)
		$('.header-img').append('<img src="'+ data.items.logo +'"></img>')
		$('.title_p').text(data.items.name)
		});
	//获取个人信息
	$.post('http://47.94.173.253:8008/Com/User_BusinessCard.ashx', {
		myGuid: arr_5,
		userGuid:arr_3
	}, function(data) {
		var data = JSON.parse(data);
		$('#upname').text(data.items.upname);
		});
		
			/************************  我协助的事项   ****************************/
			
			function consta(e, value, index, row) {
				return value.createTime.split(' ')[0];
			}

			function constb(e, value, index, row) {
				return value.createTime.split(' ')[0];
			}

			function constc(e, value, index, row) {
				return '<div class="Noesult">待执行</div>'
			}
			
			Atable();
			var isCheck = false;
			function Atable() {
				setTimeout(function() {
				$.post('http://47.94.173.253:8008/MyTask/Get_Task_ByOther.ashx', {
					userGuid: arr_3,
					page: 0,
					isCheck:isCheck
				}, function(data) {
					var data = JSON.parse(data);
					//console.log(data.items)
					$("#table").bootstrapTable({
						data: data.items,
						columns: [{
							field: 'createTime',
							title: '发布时间',
							formatter: consta
						}, {
							field: 'InitiatorName',
							title: '发布人'
						}, {
							field: 'EndTime',
							title: '完成时间',
							formatter: constb
						}, {
							field: 'IsCheck',
							title: '结果',
							formatter: constc
						}]
					})
					$("#table").bootstrapTable("load", data.items)
				});
				},400);
			}

			/************************  我执行的   ****************************/
			Atarget();
			function Atarget() {
				setTimeout(function() {
				$.post('http://47.94.173.253:8008/MyTask/Get_Task_ByRecipient.ashx', {
					userGuid: arr_3,
					page: 0,
					isCheck:isCheck
				}, function(data) {
					var data = JSON.parse(data);
					//console.log(data)
					$("#target").bootstrapTable({
						data: data.items,
						columns: [{
							field: 'createTime',
							title: '发布时间',
							formatter: consta
						}, {
							field: 'InitiatorName',
							title: '发布人'
						}, {
							field: 'EndTime',
							title: '完成时间',
							formatter: constb
						}, {
							field: 'IsCheck',
							title: '结果',
							formatter: constc
						}]
					})
					$("#target").bootstrapTable("load", data.items)
				})
				},700);
			}
			
			
			/**************************   我验证的事项    *******************************/
			Aschedule();
			function Aschedule() {
				setTimeout(function() {
				$.post('http://47.94.173.253:8008/MyTask/Get_Task_ByChecker.ashx', {
					userGuid: arr_3,
					page: 0,
					isCheck:isCheck
				}, function(data) {
					var data = JSON.parse(data);
					//console.log(data.items)
					$("#schedule").bootstrapTable({
						data: data.items,
						columns: [{
							field: 'createTime',
							title: '发布时间',
							formatter: consta
						}, {
							field: 'InitiatorName',
							title: '发布人'
						}, {
							field: 'EndTime',
							title: '完成时间',
							formatter: constb
						}, {
							field: 'IsCheck',
							title: '结果',
							formatter: constc
						}]
					})
					$("#schedule").bootstrapTable("load", data.items)
				});
				},1000)
			};
});
