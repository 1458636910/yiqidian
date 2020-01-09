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
	var week = GetRequest().week;
	var weekId = GetRequest().weekId;


	//获取公司信息
	$.post('http://47.94.173.253:8008/Com_regiInfo.ashx', {
		comId: arr_4
	}, function(data) {
		var data = JSON.parse(data);
		//console.log(data)
		$('.title_p').text(data.items.name)
	});

	var date = new Date();
	var Amonth = date.getMonth() + 1; //获取当前月份(0-11,0代表1月)
	//获取个人信息
	$.post('http://47.94.173.253:8008/Com/User_BusinessCard.ashx', {
		myGuid: arr_3,
		userGuid: arr_3
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

	function Areporting() {
		setTimeout(function() {
			$.post('http://47.94.173.253:8008/WeekPlan/zhibiao/getZhibiaoList.ashx', {
				userGuid: arr_3
			}, function(data) {
				var data = JSON.parse(data);
				//console.log(data.items);
				$("#reporting").bootstrapTable({
					data: data.items,
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
						}, {
							field: 'jihua_2',
							title: '计划值'
						}, {
							field: 'mubiao_2',
							title: '实际值'
						}, {
							field: 'dacheng_2',
							title: '达成率'
						}, {
							field: 'jihua_3',
							title: '计划值'
						}, {
							field: 'mubiao_3',
							title: '实际值'
						}, {
							field: 'dacheng_3',
							title: '达成率'
						}, {
							field: 'jihua_4',
							title: '计划值'
						}, {
							field: 'mubiao_4',
							title: '实际值'
						}, {
							field: 'dacheng_4',
							title: '达成率'
						}, {
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
		}, 400);
	}

	/************************  不达标指标开始  ****************************/
	Atarget();

	function Atarget() {
		setTimeout(function() {
			$('#target').bootstrapTable({
				url: 'http://47.94.173.253:8008/WeekPlan/WeekPlan_SubQuery.ashx',
				method: 'post',
				contentType: "application/x-www-form-urlencoded", //post请求的话就加上这个句话				
				queryParams: function(params) {
					params.companyId = arr_4;
					params.weekId = weekId;
					return params
				},
				responseHandler: function(res) {
					page = 1;
					return res.items
				},
				onLoadSuccess: function(data) {
					console.log(data)
					var data1 = $('#target').bootstrapTable('getData', true);
					mergeCells($('#target'), data1, "substandard", ["subReason", "subimprove", "executorName"], 1);
				},
				columns: [{
					title: '序号',
					formatter: function(value, row, index) {
						console.log(row)
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
			});
		}, 700);

		/**
			合并单元格
			@param target 目标表格对象
			@param data 原始数据（在服务端完成排序）
			@param fieldName 合并参照的属性名称
			@param fieldList 要合并的字段集合[不含fieldName]![]
			@param colspan 合并开始列
			*/
		function mergeCells(target, data, fieldName, fieldList, colspan) {
			// 声明一个map计算相同属性值在data对象出现的次数和
			var sortMap = {};
			var index = 0;
			var begini = 0;
			var endi = 0;
			// 统计fieldName长度
			getCount(target, data, 0, data.length, fieldName, index, sortMap);
			for (var prop in sortMap) {
				endi = index + sortMap[prop];
				if (sortMap[prop] > 1) {
					for (var i = 0; i < fieldList.length; i++) {
						getCount(target, data, begini, endi, fieldList[i], index, null);
					}
				}
				index = begini = endi;
			}
		}

		/**计算合并*/
		function getCount(target, data, begini, endi, fieldName, index, sortMap) {
			// console.log('fieldName:' + fieldName);
			// console.log(begini,endi);
			if (sortMap == null) {
				sortMap = {};
			}
			for (var i = begini; i < endi; i++) {
				for (var prop in data[i]) {
					if (prop == fieldName) {
						var key = data[i][prop];
						if (sortMap.hasOwnProperty(key)) {
							sortMap[key] = sortMap[key] * 1 + 1;
						} else {
							sortMap[key] = 1;
						}
						break;
					}
				}
			}
			for (var p in sortMap) {
				var count = sortMap[p] * 1;
				$(target).bootstrapTable('mergeCells', {
					index: index,
					field: fieldName,
					colspan: 1,
					rowspan: count
				});
				index += count;
			}
		}
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
				weeknum: +week + 1
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
		}, 1000)
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
				$(".uploadImg").append("<div class='Editimg'><img src=" + data.items[i].images + "></div>")
			};
		})
	};

	$('.timg').click(function() {
		layer.open({
			type: 1,
			area: ['300px', '200px'],
			shade: 0,
			title: ['添加倒计时时间', 'font-size:14px;text-align: center;'],
			content: $(".Ctime"),
		})
	})
	/************    领导批示   批评与评价等   **********/
	function AeditText() {
		$.post('http://47.94.173.253:8008/WeekPlan/getWeekDetail.ashx', {
			weekId: weekId
		}, function(data) {
			var data = JSON.parse(data);
			//console.log(data)
			if (data.status == 200) {
				$('#EditText_1').val(data.items.buZu);
				$('#EditText_2').val(data.items.youDian);
				$('#EditText_3').val(data.items.ganWu);
				$('#EditText_4').val(data.items.piShi);
			} else {
				layer.msg(data.msg, {
					time: 1000,
				});
			}

		})
	};
});
