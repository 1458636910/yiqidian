$(document).ready(function() {

	//分割当前网页链接
	var windowUrl = window.location.href; //获取当前url链接
	//http://127.0.0.1:8848/summary/summary.html?userGuid=4f47e8c7e40541d4a2f03c3c72304252&companyId=46
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
	var arr_6 = GetRequest().Id;
	var weekId;
	var week;
	
	var dataC = localStorage.getItem("GHY_Mlogin");
	if (dataC != null) {
		var dataInfo = JSON.parse(dataC);
		var arr_5 = dataInfo.Guid;
	}else{
		layer.msg('请登录企业后台！', {
			time: 1000,
		});
	}
	//获取公司信息
	$.post('http://47.94.173.253:8008/Com_regiInfo.ashx', {
		comId: arr_4
	}, function(data) {
		var data = JSON.parse(data);
		// console.log(data)
		$('.title_p').text(data.items.name)
	});

	//获取个人信息
	$.post('http://47.94.173.253:8008/Com/User_BusinessCard.ashx', {
		myGuid: arr_3,
		userGuid: arr_3
	}, function(data) {
		var data = JSON.parse(data);
		//console.log(data)
		$('#upname').text(data.items.upname);
	});
	
	var date = new Date();
	var Amonth = date.getMonth() + 1; //获取当前月份(0-11,0代表1月)
	$.post('http://47.94.173.253:8008/WeekPlan/weekId/get_weekIdAuto.ashx', {
		userGuid: arr_3,
		companyId: arr_4
	}, function(data) {
		var data = JSON.parse(data);
		if (data.status == '200') {
			weekId = data.items.weekId;
			week = data.items.week;
			//0 操作人可以编辑   1 待领导批示  2  人事修改   -1 人事确定后谁都不可以编辑  
			if(data.items.status == -1){
				window.location = "http://www.eqidd.com/html/detil.html?userGuid="+ arr_3 +"&companyId=" + arr_4 + "&week=" + week + "&weekId=" + weekId + ""
			}
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
					rowspan: 2,
					editable: {
                    validate: function (v) {
                        if (!v) return '不能为空';
                    },
					}
				}, {
					field: 'availValueYear',
					title: '上年平均值',
					rowspan: 2,
					editable:true
				}, {
					field: 'availValueMonth',
					title: '上月平均值',
					rowspan: 2,
					editable:true
				}, {
					field: 'mubiao_month',
					title: Amonth + '月 目标值',
					rowspan: 2,
					editable:true
				}, {
					title: '第一周',
					colspan: 3,
					editable:true
				}, {
					title: '第二周',
					colspan: 3,
					editable:true
				}, {
					title: '第三周',
					colspan: 3,
					editable:true
				}, {
					title: '第四周',
					colspan: 3,
					editable:true
				}, {
					title: Amonth + '月',
					colspan: 2,
					editable:true
				}],
				[{
					field: 'jihua_1',
				  	title: '计划值',
					editable:true
				  }, {
					field: 'mubiao_1',
				  	title: '实际值',
					editable:true
				  }, {
					field: 'dacheng_1',
				  	title: '达成率',
					editable:true
					},{
					field: 'jihua_2',
					title: '计划值',
					editable:true
				    }, {
					field: 'mubiao_2',
					title: '实际值',
					editable:true
				    }, {
					field: 'dacheng_2',
					title: '达成率',
					editable:true
				    },{
					field: 'jihua_3',
					title: '计划值',
					editable:true
				    }, {
					field: 'mubiao_3',
					title: '实际值',
					editable:true
				    }, {
					field: 'dacheng_3',
					title: '达成率',
					editable:true
				    },{
					field: 'jihua_4',
					title: '计划值',
					editable:true
				    }, {
					field: 'mubiao_4',
					title: '实际值',
					editable:true
				    }, {
					field: 'dacheng_4',
					title: '达成率',
					editable:true
					},{
					field: 'jihua_month',
				  	title: '实际值',
					editable:true
				    }, {
					field: 'dahcheng_month',
				  	title: '达成率',
					editable:true
				}]
				],
				onEditableSave: function (field, row, oldValue, $el) {
				$.ajax({
					type: "post",
					url: "http://47.94.173.253:8008/WeekPlan/zhibiao/update_zhibiao.ashx",
					data:{userGuid:arr_5,key:field,value:row[field],Id:row.Id},
					dataType: 'JSON',
					success: function (data, status) {
						layer.msg('添加成功！', {
							time: 1000,
						});
					},
					error: function () {
						layer.msg('添加失败！', {
							time: 1000,
						});
					},
	 
				});
			}
			})
			$("#reporting").bootstrapTable("load", data.items)
			});
				}, 100);
			}
			
			 $('#report').click(function(){
				$.post('http://47.94.173.253:8008/WeekPlan/zhibiao/weekPlan_zhibiaoAdd.ashx', {
					userGuid: arr_3
				}, function(data) {
					var data = JSON.parse(data);
					console.log(data)
					if (data.status == 200) {
						layer.msg('添加成功！', {
							time: 1000,
						});
						Areporting();
					} else {
						layer.msg(data.msg, {
							time: 1000,
						});
					}
				})
			})
			
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

			//成原因说明
			function constc(e, value, index, row) {
				if (value.reason == '') {
					return '<div class=Reason>请输入原因说明</div>'
				} else {
					return '<div class="Reason black">' + value.reason + '</div>'
				}
			}

			//改善措施
			function constd(e, value, index, row) {
				if (value.improve == '') {
					return '<div class=Measures>请输入改善措施</div>'
				} else {
					return '<div class="Measures black">' + value.improve + '</div>'
				}
			}

			//下次完成时间
			function conste(e, value, index, row) {
				if (value.nextTime == '1900-01-01 00:00:00') {
					return '<div class=Result>请输入下次完成时间</div>'
				} else {
					return '<div class="Result black">' + value.nextTime + '</div>'
				}
			}

			//判定结果
			function constf(e, value, index, row) {
				if (value.decisionOutcomes == '') {
					return '<div class=determine>点击判定结果</div>'
				} else {
					return '<div class="determine black">' + value.decisionOutcomes + '</div>'
				}
			}

			window.ReasonEvents = {
				'click .Reason': function(e, value, row, index) {
					$('#abb').modal();
					$('#affirm1').click(function() {
						console.log(row.Id)
						$.post('http://47.94.173.253:8008/WeekPlan/weekReason_add.ashx', {
							Id: row.Id,
							userGuid: arr_5,
							reason: $('#regard1').val()
						}, function(data) {
							data = JSON.parse(data)
							console.log(data)
							if (data.status == 200) {
								Atable();
							} else {
								layer.msg(data.msg, {
									time: 1000,
								});
							}
						});

					});
				}
			}
			window.MeasuresEvents = {
				'click .Measures': function(e, value, row, index) {
					$('#abc').modal();
					$('#affirm2').click(function() {
						$.post('http://47.94.173.253:8008/WeekPlan/weekimprov_Add.ashx', {
							Id: row.Id,
							userGuid: arr_5,
							improve: $('#regard2').val()
						}, function(data) {
							data = JSON.parse(data)
							//console.log(data)
							if (data.status == 200) {
								Atable();
							} else {
								layer.msg(data.msg, {
									time: 1000,
								});
							}
						});

					});
				}
			}

			//判定结果
			window.decisionEvents = {
				'click .determine': function(e, value, row, index) {
					layer.open({
						type: 1,
						area: ['500px', '300px'],
						title: ['选择判定结果', 'font-size:18px;'],
						shadeClose: true, //点击遮罩关闭
						content: $('.Decision'),
						btn: '确定',
						yes: function(index, layero) {
							layer.closeAll();
							$.post('http://47.94.173.253:8008/WeekPlan/result_update.ashx', {
								"result": Decision,
								"userGuid": arr_5,
								"Id": row.Id
							}, function(data) {
								var dataMeet = JSON.parse(data);
								//console.log(dataMeet)
								if (dataMeet.status == 200) {
									Atable();
									Aschedule();
								} else {
									layer.msg(dataMeet.msg, {
										time: 1000,
									});
								}
							});
						}
					});
				}
			}


			window.ResultEvents = {
				'click .Result': function(e, value, row, index) {
					$('#abd').modal();
					$('#affirm3').click(function() {
						$.post('http://47.94.173.253:8008/WeekPlan/weekNextTime_add.ashx', {
							nextTime: $('#time4').val(),
							userGuid: arr_5,
							Id: row.Id
						}, function(data) {
							data = JSON.parse(data)
							//console.log(data)
							if (data.status == 200) {
								Atable();
							} else {
								layer.msg(data.msg, {
									time: 1000,
								});
							}
						});

					});
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
							disabled: true,
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
								width: '70px',
								events: window.decisionEvents,
								formatter: constf
							}, {
								title: '成原因说明',
								events: window.ReasonEvents,
								formatter: constc,
								width: '110px'
							}, {
								title: '改善措施',
								events: window.MeasuresEvents,
								formatter: constd,
								width: '110px'
							}, {
								title: '下次完成时间',
								width: '145px',
								events: window.ResultEvents,
								formatter: conste
							}]
						})
						$("#table").bootstrapTable("load", data.items)
					});
				}, 400);
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
								width: '250px'
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
							}, {
								title: '操作',
								events: window.verifierEvents,
								formatter: verifierFormatter,
								width: '70px'
							}]
						})
						$("#target").bootstrapTable("load", data.items)
					})
				}, 700);
			}

			function verifierFormatter(value, row, index) {
				return '<div class=agree>删除</div>'
			}

			function relatenum(value, row, index) {
				return row.relatenum + '人'
			}

			function relateNum(value, row, index) {
				return row.relateNum + '人'
			}

			function finallyTime(value, row, index) {
				var finallyTime = row.finallyTime.split(' ')[0] + ' ';
				var finallyTime1 = row.finallyTime.split(' ')[1].split(':')[0] + ':' + row.finallyTime.split(' ')[1].split(':')[
					1];
				var finallyTime2 = finallyTime + finallyTime1;
				return finallyTime2
			}




			window.verifierEvents = {
				'click .agree': function(e, value, row, index) {
					layer.open({
						title: ['不达标指标', 'font-size:16px;text-align: center;'],
						content: '确定删除吗?',
						shadeClose: true, //点击遮罩关闭
						btn: '确定',
						yes: function(index, layero) {
							layer.closeAll();
							$.post('http://47.94.173.253:8008/WeekPlan/weekPlan_subdelete.ashx', {
								Id: row.Id,
								userGuid: arr_3
							}, function(data) {
								data = JSON.parse(data);
								console.log(data)
								if (data.status == 200) {
									$('#target').bootstrapTable('remove', {
										field: 'Id',
										values: [row.Id]
									})
								} else {
									layer.msg(data.msg, {
										time: 1000,
									});
								}
							})
						}
					});
				}
			}

			$('#Addtarget').click(function(event) {
				layer.open({
					type: 1,
					area: ['800px', '500px'],
					title: ['原因分析改善对策', 'font-size:18px;'],
					shadeClose: true, //点击遮罩关闭
					content: $('.targetFrom'),
					btn: '确定',
					yes: function(index, layero) {
						layer.closeAll();
						$('#demo1-getValue').click();
						$.post('http://47.94.173.253:8008/WeekPlan/WeekPlan_SubAdd.ashx', {
							"sub": $('#sub').val(),
							"subReason": $('#subReason').val(),
							"subimprove": $('#subimprove').val(),
							"executor": ParentTaskId,
							"relatedExecutor": nameArr,
							"verifier": ParentTaskId2,
							"finallyTime": $('#time1').val(),
							"companyId": arr_4,
							"weekId": weekId,
							"userGuid": arr_3,
						}, function(data) {
							var dataMeet = JSON.parse(data);
							//console.log(dataMeet)
							if (dataMeet.status == 200) {
								layer.msg('添加成功！', {
									time: 1000,
								});
								$(".targetFrom form input").each(function() {
									$(this).val('');
								});
								$(".targetFrom form textarea").each(function() {
									$(this).val('');
								});
								$('.toolbar-tag').click()
								Atarget();
							} else {
								layer.msg(dataMeet.msg, {
									time: 1000,
								});
							}
						});
					}
				});
			});


			/**************************   下周计划    *******************************/
			Aschedule();

			function Aschedule() {
				setTimeout(function() {
					$.post('http://47.94.173.253:8008/WeekPlan/WeekPlan_Query.ashx', {
						companyId: arr_4,
						weeknum: week + 1
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
								width: '300px'
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
							}, {
								title: '操作',
								events: window.scheduleEvents,
								formatter: scheduleformatter,
								width: '70px'
							}]
						})
						$("#schedule").bootstrapTable("load", data.items)
					});
				}, 1000)
			};

			function scheduleformatter(value, row, index) {
				return '<div class=agree>删除</div>'
			}

			window.scheduleEvents = {
				'click .agree': function(e, value, row, index) {
					layer.open({
						title: ['下周工作计划', 'font-size:16px;text-align: center;'],
						content: '确定删除吗?',
						shadeClose: true, //点击遮罩关闭
						btn: '确定',
						yes: function(index, layero) {
							layer.closeAll();
							$.post('http://47.94.173.253:8008/WeekPlan/WeekPlan_Delete.ashx', {
								Id: row.Id,
								userGuid: arr_3
							}, function(data) {
								data = JSON.parse(data);
								console.log(data)
								if (data.status == 200) {
									$('#schedule').bootstrapTable('remove', {
										field: 'Id',
										values: [row.Id]
									})
								} else {
									layer.msg(data.msg, {
										time: 1000,
									});
								}
							})
						}
					});
				}
			}

			$('#Addschedule').click(function(event) {
				layer.open({
					type: 1,
					area: ['800px', '500px'],
					title: ['下周工作计划', 'font-size:18px;'],
					shadeClose: true, //点击遮罩关闭
					content: $('.scheduletFrom'),
					btn: '确定',
					yes: function(index, layero) {
						layer.closeAll();
						$('#demo2-getValue').click();
						console.log(nameArr2)
						$.post('http://47.94.173.253:8008/WeekPlan/WeekPlan_AddOrUpdate.ashx', {
							"startTime": $('#time2').val(),
							"endTime": $('#time3').val(),
							"executor": ParentTaskId4,
							"relatedExecutor": nameArr2,
							"verifier": ParentTaskId5,
							"standard": $('#standard').val(),
							"workPlan": $('#workPlan').val(),
							"creater": arr_3,
							"weekId": weekId,
							"companyId": arr_4,
							"weeknum": week + 1
						}, function(data) {
							var dataMeet = JSON.parse(data);
							//console.log(dataMeet)
							if (dataMeet.status == 200) {
								layer.msg('添加成功！', {
									time: 1000,
								});
								$(".scheduletFrom form input").each(function() {
									$(this).val('');
								});
								$(".scheduletFrom form textarea").each(function() {
									$(this).val('');
								});
								$('.toolbar-tag').click()
								Aschedule();
							} else {
								layer.msg(data.msg, {
									time: 1000,
								});
							}
						});
					}
				});
			});
		} else {
			layer.msg('网络错误请刷新', {
				time: 1000,
			});
		}
	}); //开头post请求结束


	/***********   不达标项和下周计划添加人员搜索     ***********/
	var ParentTaskId;
	var ParentTaskId2;
	var ParentTaskId4;
	var ParentTaskId5;
	var para = ' ';
	var Decision = '已完成';
	layui.use('form', function() {
		var form = layui.form;
		form.on('select(ParentTask)', function(data) {
			ParentTaskId = $("option[value=" + data.value + "]").attr('userGuid');
		});
		form.on('select(ParentTask2)', function(data) {
			ParentTaskId2 = $("option[value=" + data.value + "]").attr('userGuid');
		});
		form.on('select(ParentTask4)', function(data) {
			ParentTaskId4 = $("option[value=" + data.value + "]").attr('userGuid');
		});
		form.on('select(ParentTask5)', function(data) {
			ParentTaskId5 = $("option[value=" + data.value + "]").attr('userGuid');
			//console.log(ParentTaskId5)
		});
		form.on('radio(filter)', function(data) {
			Decision = data.value;
		});
	});

	layui.use('laydate', function() {
		var laydate = layui.laydate;
		//执行一个laydate实例
		laydate.render({
			elem: '#time1',
			type: 'datetime'
		});
		laydate.render({
			elem: '#time2',
			type: 'datetime'
		});
		laydate.render({
			elem: '#time3',
			type: 'datetime'
		});
		laydate.render({
			elem: '#time4',
			format: 'yyyy-MM-dd HH:mm' //可任意组合
		});
	});
    
	var nameArr ='';
	var nameArr2 ='';
	var demo1 = '';
	var demo2 = '';
	$.post('http://47.94.173.253:8008/Com/User_Search_Info.ashx', {
		companyId: arr_4,
		para: para
	}, function(data) {
		var data = JSON.parse(data);
		var datas = data.items;
		for (let i = 0; i < datas.length; i++) {
			var html = "<option value='" + datas[i].upname + "' userGuid='" + datas[i].userGuid + "'>" + datas[i].upname +
				"</option>";
			$("#ParentTask").append(html);
			$("#ParentTask2").append(html);
			$("#ParentTask4").append(html);
			$("#ParentTask5").append(html);
		}
		
		var demo1 = xmSelect.render({ 
			el: '#ParentTask1',
			filterable: true,
			toolbar:{show: true},
			model: {
			label: {
				type: 'block',
				block: {
					//最大显示数量, 0:不限制
					showCount: 2,
					//是否显示删除图标
					showIcon: true,
				}
			}
		  },
			prop: {
				name: 'upname',
				value: 'userGuid',
			},
			data: data.items
		})
		document.getElementById('demo1-getValue').onclick = function(){
			//获取当前多选选中的值
			var selectArr = demo1.getValue();
			for(let i =0;i<selectArr.length;i++){
				if(i==selectArr.length-1)
				{
					nameArr += selectArr[i].userGuid
				}else
				{
				nameArr += selectArr[i].userGuid+";";
				}
			}
		}
		
		var demo2 = xmSelect.render({
			el: '#ParentTask3',
			filterable: true,
			toolbar:{show: true},
			model: {
			label: {
				type: 'block',
				block: {
					//最大显示数量, 0:不限制
					showCount: 2,
					//是否显示删除图标
					showIcon: true,
				}
			}
		  },
			prop: {
				name: 'upname',
				value: 'userGuid',
			},
			data: data.items
		})
		document.getElementById('demo2-getValue').onclick = function(){
			//获取当前多选选中的值
			var selectArr = demo2.getValue();
			for(let i =0;i<selectArr.length;i++){
				if(i==selectArr.length-1)
				{
					nameArr2 += selectArr[i].userGuid
				}else
				{
				nameArr2 += selectArr[i].userGuid+";";
				}
			}
		}
		
		layui.use('form', function() {
			var form = layui.form;
			form.render();
		})
	});



	/***************    图片上传     *************/
	function AImages() {
		$.post('http://47.94.173.253:8008/WeekPlan/weekImages_get.ashx', {
			weekId: weekId,
			companyId: arr_4
		}, function(data) {
			var data = JSON.parse(data);
			//console.log(data);
			$('.Editimg').remove();
			for (let i = 0; i < data.items.length; i++) {
				$(".uploadImg").append("<div class='Editimg' data-Id=" + data.items[i].Id + "><img src=" + data.items[i].images +
					"><div class='Edittion Adelbtn'><span class='iconfont icon-guanbi'></span></div></div>")
			};
			$('.Adelbtn').click(function() {
				var order = $('.Adelbtn').index(this);
				var Id = $(this).parents('.Editimg').attr("data-Id");
				$.post('http://47.94.173.253:8008/WeekPlan/weekimages_delete.ashx', {
					userGuid: arr_3,
					Id: Id
				}, function(data) {
					var data = JSON.parse(data);
					//console.log(data)
					if (data.status == 200) {
						layer.msg('删除成功', {
							time: 1200,
						});
						$('.Editimg').eq(order).remove();
					} else {
						layer.msg(data.msg, {
							time: 1200,
						});
					}
				})
			})
		})
	};

	var chooseImg;

	function xgtp() {
		var userAgent = navigator.userAgent; //用于判断浏览器类型
		var arr_img = [];
		var fileList;
		$('.addImages').click(function() {
			layer.open({
				type: 1,
				area: ['1300px', '600px'],
				title: ['上传照片', 'font-size:18px;text-align: center;'],
				content: $(".uploadImgDiv"),
				btn: '确定',
				yes: function(index, layero) {
					ajaxFileUpload();
				}
			});
		});


		$(".filex").change(function() {
			//获取选择图片的对象
			var docObj = $(this)[0];
			var picDiv = $(this).parents(".uploadImgDiv");
			//得到所有的图片文件
			fileList = docObj.files;
			for (var i = 0; i < fileList.length; i++) {
				arr_img.push(fileList[i])
				var picHtml = "<div class='Editimg'> <img id='img" + fileList[i].name +
					"'  /><div class='Edittion delbtn'><span class='iconfont icon-guanbi'></span></div></div>"
				picDiv.prepend(picHtml);
				var imgObjPreview = document.getElementById("img" + fileList[i].name);
				if (fileList && fileList[i]) {
					//图片属性
					imgObjPreview.style.display = 'block';
					imgObjPreview.style.width = '172px';
					imgObjPreview.style.height = '131px';
					//imgObjPreview.src = docObj.files[0].getAsDataURL();
					//火狐7以上版本不能用上面的getAsDataURL()方式获取，需要以下方式
					if (userAgent.indexOf('MSIE') == -1) { //IE以外浏览器
						imgObjPreview.src = window.URL.createObjectURL(docObj.files[i]); //获取上传图片文件的物理路径
					} else { //IE浏览器
						if (docObj.value.indexOf(",") != -1) {
							var srcArr = docObj.value.split(",");
							imgObjPreview.src = srcArr[i];
						} else {
							imgObjPreview.src = docObj.value;
						}
					}
				}

			}
		});

		/*删除功能*/
		$(document).on("click", ".delbtn", function() {
			var arr_img2 = [];
			var s = arr_img.indexOf(fileList[0]);
			var arrLength = Number(arr_img.length)
			arr_img2 = arr_img.splice(Number(arr_img.length) - s, 1)
			var _this = $(this);
			_this.parents(".Editimg").remove();
		});

		function ajaxFileUpload(file) {
			var imgData = new FormData();
			imgData.append('willcompress', "true");
			imgData.append('file', file);
			for (var i = 0; i < arr_img.length; i++) {
				imgData.append('file', arr_img[i]);
				//console.log(arr_img[i])
			}
			$.ajax({
				type: 'post',
				url: 'http://47.94.173.253:8008/Reimburse/Upload_Files.ashx',
				data: imgData,
				cache: false,
				processData: false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
				contentType: false, // 不设置Content-type请求头
				success: function(data) {
					var data2 = JSON.parse(data);
					//console.log(data2)
					if (data2.status == 200) {
						layer.msg('上传成功', {
							time: 1200,
						});
						arr_img = [];
						layer.closeAll();
						chooseImg = data2.items;
						//console.log(chooseImg)
						$.post('http://47.94.173.253:8008/WeekPlan/weekImage_add.ashx', {
							userGuid: arr_3,
							companyId: arr_4,
							images: chooseImg,
							weekId: weekId
						}, function(data) {
							var data = JSON.parse(data);
							if (data.status == '200') {
								layer.msg('保存成功！', {
									time: 1000,
								});
								AImages()
							} else {
								layer.msg(data.msg, {
									time: 1000,
								});
							}
						})
					} else if (data2.status == 201) {
						layer.msg("请选择相关图片", {
							time: 1200
						});
					}
				},
				error: function() {}
			});
		}

	}
	xgtp();


	/************    领导批示   批评与评价等   **********/

	function AeditText() {
		$.post('http://47.94.173.253:8008/WeekPlan/getWeekDetail.ashx', {
			weekId: arr_6
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
				weekId: arr_6
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

	$('.btnd').click(function(){
		layer.open({
			title: ['审评周总结', 'font-size:16px;text-align: center;'],
			content: '一旦确认将不可修改,确定吗?',
			shadeClose: true, //点击遮罩关闭
			btn: '确定',
			yes: function(index, layero) {
				layer.closeAll();
				$.post('http://47.94.173.253:8008/WeekPlan/weekId/weekEndbyAdmin.ashx', {
					userGuid: arr_5,
					Id: arr_6
				}, function(data) {
					data = JSON.parse(data);
					console.log(data)
					if (data.status == 200) {
						layer.msg('成功！', {
							time: 1000,
						});
						window.location = "http://www.eqidd.com/html/detil.html?userGuid="+ arr_3 +"&companyId=" + arr_4 + "&week=" + week + "&weekId=" + weekId + ""
					} else {
						layer.msg(data.msg, {
							time: 1000,
						});
					}
				})
			}
		});
	})


});
