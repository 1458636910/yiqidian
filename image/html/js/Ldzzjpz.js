$(document).ready(function() {
     //http://127.0.0.1:8848/summary/detil.html?userGuid=4f47e8c7e40541d4a2f03c3c72304252&companyId=46&week=48&weekId=4
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
	var week = GetRequest().week;
	var weekId = GetRequest().weekId;
	var date = new Date();
	var Amonth = date.getMonth() + 1; //获取当前月份(0-11,0代表1月)
	
	var dataC = localStorage.getItem("GHY_Mlogin");
	if (dataC != null) {
		var dataInfo = JSON.parse(dataC);
		var arr_5 = dataInfo.Guid;
	}else{
		layer.msg('请登录创客空间！', {
			time: 1000,
		});
	}
	
	//获取公司信息
	$.post('http://47.94.173.253:8008/Com_regiInfo.ashx', {
		comId: arr_4
	}, function(data) {
		var data = JSON.parse(data);
		//console.log(data)
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
	
		layui.use('form', function() {
			var form = layui.form;
		});
			
			$('#week').text(week);
			 AeditText();
			 AImages();
			 /***********     本月指标       ******/
			 Areporting()
			 function Areporting(){
			 setTimeout(function() {
			 $.post('http://47.94.173.253:8008/WeekPlan/zhibiao/getZhibiaoList.ashx', {
			 	userGuid: arr_3
			 }, function(data) {
			 	var data = JSON.parse(data);
			 	//console.log(data.items);
			 $("#reporting").bootstrapTable({
			 	data:data.items,
			 	columns: [
			 		[{
			 		title: '序号',
			 		rowspan: 2,
			 		formatter: function(value, row, index) {
			 		//获取每页显示的数量
			 		var pageSize = $('#table').bootstrapTable('getOptions').pageSize;
			 		//获取当前是第几页
			 		var pageNumber = $('#table').bootstrapTable('getOptions').pageNumber;
			 		//返回序号，注意index是从0开始的，所以要加上1
			 		return pageSize * (pageNumber - 1) + index + 1;
			 		}
			 	}, {
			 		field: 'zhibiao',
			 		title: '指标名称',
			 		rowspan: 2
			 	}, {
			 		field: 'availValueYear',
			 		title: '上年平均值',
			 		rowspan: 2
			 	}, {
			 		field: 'availValueMonth',
			 		title: '上月平均值',
			 		rowspan: 2
			 	}, {
			 		field: 'mubiao_month',
			 		title: Amonth + '月 目标值',
			 		rowspan: 2
			 	}, {
			 		title: '第一周',
			 		colspan: 3
			 	}, {
			 		title: '第二周',
			 		colspan: 3
			 	}, {
			 		title: '第三周',
			 		colspan: 3
			 	}, {
			 		title: '第四周',
			 		colspan: 3
			 	}, {
			 		title: Amonth + '月',
			 		colspan: 2
			 	}],
			 	[{
			 		field: 'jihua_1',
			 	  	title: '计划值'
			 	  }, {
			 		field: 'mubiao_1',
			 	  	title: '实际值'
			 	  }, {
			 		field: 'dacheng_1',
			 	  	title: '达成率'
			 		},{
			 		field: 'jihua_2',
			 		title: '计划值'
			 	    }, {
			 		field: 'mubiao_2',
			 		title: '实际值'
			 	    }, {
			 		field: 'dacheng_2',
			 		title: '达成率'
			 	    },{
			 		field: 'jihua_3',
			 		title: '计划值'
			 	    }, {
			 		field: 'mubiao_3',
			 		title: '实际值'
			 	    }, {
			 		field: 'dacheng_3',
			 		title: '达成率'
			 	    },{
			 		field: 'jihua_4',
			 		title: '计划值'
			 	    }, {
			 		field: 'mubiao_4',
			 		title: '实际值'
			 	    }, {
			 		field: 'dacheng_4',
			 		title: '达成率'
			 		},{
			 		field: 'jihua_month',
			 	  	title: '实际值'
			 	    }, {
			 		field: 'dahcheng_month',
			 	  	title: '达成率'
			 	}]
			 	]
			 })
			 $("#reporting").bootstrapTable("load", data.items)
			 });
			 	}, 100);
			 }
			 
			/************************  上周任务总结开始   ****************************/
			//字符串分割时间段 2019-06-04 19:00:00
			function consta(e, value, index, row) {
				//console.log(value.endTime)
				var endTime = value.endTime.split(' ')[0] + ' ';
				var endTime1 = value.endTime.split(' ')[1].split(':')[0] + ':' + value.endTime.split(' ')[1].split(':')[1];
				var endTime2 = endTime + endTime1;
				return endTime2
			}

			//字符串分割时间段 2019-06-04 19:00:00
			function constb(e, value, index, row) {
				//console.log(value.startTime)
				var startTime = value.startTime.split(' ')[0] + ' ';
				var startTime1 = value.startTime.split(' ')[1].split(':')[0] + ':' + value.startTime.split(' ')[1].split(':')[1];
				var startTime2 = startTime + startTime1;
				return startTime2
			}

			//下次完成时间
			function conste(e, value, index, row) {
				if (value.nextTime == '1900-01-01 00:00:00') {
					return ''
				} else {
					return value.nextTime
				}
			}
			
			Atable();
			function Atable() {
				setTimeout(function() {
				$.post('http://47.94.173.253:8008/WeekPlan/WeekPlan_Query.ashx', {
					companyId: arr_4,
					weeknum: week
				}, function(data) {
					var data = JSON.parse(data);
					//console.log(data.items)
					$("#table").bootstrapTable({
						data: data.items,
						columns: [{
							title: '序号',
							formatter: function(value, row, index) {
								//获取每页显示的数量
								var pageSize = $('#table').bootstrapTable('getOptions').pageSize;
								//获取当前是第几页
								var pageNumber = $('#table').bootstrapTable('getOptions').pageNumber;
								//返回序号，注意index是从0开始的，所以要加上1
								return pageSize * (pageNumber - 1) + index + 1;
							}
						}, {
							field: 'workPlan',
							title: '上周工作任务',
							width: '230px'
						}, {
							field: 'endTime',
							title: '计划完成',
							width: '145px',
							formatter: consta
						}, {
							field: 'startTime',
							title: '实际时间',
							width: '145px',
							formatter: constb
						}, {
							field: 'executorName',
							title: '执行人',
							width: '70px'
						}, {
							title: '关联执行人',
							width: '70px',
							formatter: relatenum
						}, {
							field: 'verifierName',
							title: '验证人',
							width: '70px'
						}, {
							field: 'decisionOutcomes',
							title: '判定结果',
							width: '70px'
						}, {
						    field: 'reason',
							title: '成原因说明',
							width: '110px'
						}, {
							field: 'improve',
							title: '改善措施',
							width: '110px'
						}, {
							title: '下次完成时间',
							width: '145px',
							formatter: conste
						}]
					})
					$("#table").bootstrapTable("load", data.items)
				});
				},100);
			}

			/************************  不达标指标开始   ****************************/
			Atarget();
			function Atarget() {
				setTimeout(function() {
				$.post('http://47.94.173.253:8008/WeekPlan/WeekPlan_SubQuery.ashx', {
					companyId: arr_4,
					weekId: weekId
				}, function(data) {
					var data = JSON.parse(data);
					//console.log(data)
					$("#target").bootstrapTable({
						data: data.items,
						columns: [{
							title: '序号',
							formatter: function(value, row, index) {
								//获取每页显示的数量
								var pageSize = $('#target').bootstrapTable('getOptions').pageSize;
								//获取当前是第几页
								var pageNumber = $('#target').bootstrapTable('getOptions').pageNumber;
								//返回序号，注意index是从0开始的，所以要加上1
								return pageSize * (pageNumber - 1) + index + 1;
							}
						}, {
							field: 'substandard',
							title: '不达标项',
							width: '250px'
						}, {
							field: 'subReason',
							title: '不达标项原因',
							width: '250px'
						}, {
							field: 'subimprove',
							title: '不达标项改进措施',
							width: '289px'
						}, {
							field: 'executorName',
							title: '执行人',
							width: '70px'
						}, {
							title: '关联执行人',
							formatter: relateNum,
							width: '70px'
						}, {
							title: '计划完成时间',
							formatter: finallyTime,
							width: '145px'
						}, {
							field: 'verifierName',
							title: '验证人',
							width: '70px'
						}]
					})
					$("#target").bootstrapTable("load", data.items)
				})
				},400);
			}
			
            function relatenum(value, row, index) {
            	return row.relatenum + '人'
            }

            function relateNum(value, row, index) {
            	return row.relateNum + '人'
            }
             
			function finallyTime(value, row, index) {
				var finallyTime = row.finallyTime.split(' ')[0] + ' ';
				var finallyTime1 = row.finallyTime.split(' ')[1].split(':')[0] + ':' + row.finallyTime.split(' ')[1].split(':')[1];
				var finallyTime2 = finallyTime + finallyTime1;
				return finallyTime2
			}


			/**************************   下周计划    *******************************/
			Aschedule();
			function Aschedule() {
				setTimeout(function() {
				$.post('http://47.94.173.253:8008/WeekPlan/WeekPlan_Query.ashx', {
					companyId: arr_4,
					weeknum: + week +1
				}, function(data) {
					var data = JSON.parse(data);
					//console.log(data.items)
					$("#schedule").bootstrapTable({
						data: data.items,
						columns: [{
							title: '序号',
							formatter: function(value, row, index) {
								//获取每页显示的数量
								var pageSize = $('#schedule').bootstrapTable('getOptions').pageSize;
								//获取当前是第几页
								var pageNumber = $('#schedule').bootstrapTable('getOptions').pageNumber;
								//返回序号，注意index是从0开始的，所以要加上1
								return pageSize * (pageNumber - 1) + index + 1;
							}
						}, {
							field: 'workPlan',
							title: '本周工作事项',
							width: '344px'
						}, {
							field: 'startTime',
							title: '计划开始时间',
							formatter: consta,
							width: '145px'
						}, {
							field: 'endTime',
							title: '计划结束时间',
							formatter: constb,
							width: '145px'
						}, {
							field: 'executorName',
							title: '执行人',
							width: '70px'
						}, {
							title: '关联执行人',
							formatter: relatenum,
							width: '70px'
						}, {
							field: 'verifierName',
							title: '验证人',
							width: '70px'
						}, {
							field: 'standard',
							title: '验证标准',
							width: '300px'
						}]
					})
					$("#schedule").bootstrapTable("load", data.items)
				});
				},700)
			};
		
	
	
	/***************    图片上传     *************/
	function AImages() {
		$.post('http://47.94.173.253:8008/WeekPlan/weekImages_get.ashx', {
			weekId: weekId,
			companyId: arr_4
		}, function(data) {
			var data = JSON.parse(data);
			//console.log(data);
	       for (let i = 0; i < data.items.length; i++) {
	       	$(".uploadImg").append("<div class='Editimg'><img src="+ data.items[i].images +"></div>")
	       };
		})
	};
	
	/************    领导批示   批评与评价等   **********/
	function AeditText() {
		$.post('http://47.94.173.253:8008/WeekPlan/getWeekDetail.ashx', {
			weekId: weekId
		}, function(data) {
			var data = JSON.parse(data);
			//console.log(data)
			if(data.status == 200){
				$('#EditText_1').val(data.items.buZu);
				$('#EditText_2').val(data.items.youDian);
				$('#EditText_3').val(data.items.ganWu);
				$('#EditText_4').val(data.items.piShi);
			}else{
				layer.msg(data.msg, {
					time: 1000,
				});
			}
			
		})
	};
	
	$('#ctions').click(function() {
		if ($('#EditText_4').val() == '') {
			layer.msg('请输入！', {
				time: 1000,
			});
		} else {
			$.post('http://47.94.173.253:8008/WeekPlan/piZhun_add.ashx', {
				userGuid: arr_5,
				companyId: arr_4,
				piShi: $('#EditText_4').val(),
				weekId: weekId
			}, function(data) {
				var data = JSON.parse(data);
				if (data.status == '200') {
					layer.msg('保存成功！', {
						time: 1000,
					});
				} else {
					layer.msg(data.msg, {
						time: 1000,
					});
				}
			})
		}
	}); //批示结束
	
});
