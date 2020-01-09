$(document).ready(function() {
	
	$("#shezhi").click(function() {
		$('.titlelist ul li').eq(2).addClass('active').siblings('li').removeClass('active');
		$('.shezhiOption').show();
		$('.maintext').hide();
		$('.qiyeOption').hide();
		$('.yuangongDangan').hide();
	})
	var E = window.wangEditor
	var editor = new E('#editor');
	// **************************************自动上传图片开始*********************************
	var dataImg;
	editor.customConfig.customUploadImg = function(files, insert) {
		var iformdata = new FormData();
		var imgU = files[0];
		iformdata.append('image', imgU);
		$.ajax({
			type: 'post',
			url: '' + EQD_url + '/Articles/CommitImage.ashx',
			data: iformdata,
			cache: false,
			processData: false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
			contentType: false, // 不设置Content-type请求头
			success: function(data) {
				dataImg = JSON.parse(data)
				var imgSrc = (dataImg.items).substring(25)
				imgUrl = imgSrc
				insert(dataImg.items)
			}
		});
	};
	// **************************************自动上传图片结束*********************************
	editor.create()
	var F = window.wangEditor
	var editor2 = new F('#editor2');
	// **************************************自动上传图片开始*********************************
	var dataImg2;
	editor2.customConfig.customUploadImg = function(files, insert) {
		var pformdata = new FormData();
		var imgU = files[0];
		pformdata.append('image', imgU);
		$.ajax({
			type: 'post',
			url: '' + EQD_url + '/Articles/CommitImage.ashx',
			data: pformdata,
			cache: false,
			processData: false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
			contentType: false, // 不设置Content-type请求头
			success: function(data) {
				dataImg2 = JSON.parse(data)
				var imgSrc = (dataImg2.items).substring(25)
				imgUrl = imgSrc
				insert(dataImg2.items)
			}
		});
	};
	// **************************************自动上传图片结束*********************************
	editor2.create()
	var G = window.wangEditor
	var editor3 = new F('#addCourseeditor');
	// **************************************自动上传图片开始*********************************
	var dataImg3;
	editor3.customConfig.customUploadImg = function(files, insert) {
		var gformdata = new FormData();
		var imgU2 = files[0];
		gformdata.append('image', imgU2);
		$.ajax({
			type: 'post',
			url: '' + EQD_url + '/Articles/CommitImage.ashx',
			data: gformdata,
			cache: false,
			processData: false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
			contentType: false, // 不设置Content-type请求头
			success: function(data) {
				dataImg3 = JSON.parse(data)
				var imgSrc = (dataImg3.items).substring(25);
				imgUrl = imgSrc
				insert(dataImg3.items)
			}
		});
	};
	// **************************************自动上传图片结束*********************************
	editor3.create()
	// *******************************************************系统设置*************************************************************
	// ********************************请假设置**********************************
	$('.kaoqinguanli').click(function() {
		$('.qingjiashezhi').slideToggle(200);
		$('.chuchaishezhi').slideToggle(200);
		$(".wifimng").slideToggle(200);
	});
	$('.qingjiashezhi').click(function() {
		$(this).addClass('pcheck').siblings('p').removeClass('pcheck');
		$('.qingjiaShezhi').show().siblings('div').hide();
		$('.addQingjia').click(function() {
			$('.cover').show();
			layer.open({
				type: 1,
				area: '800px',
				title: ['请假设置', 'font-size:18px;'],
				content: $('.addqingjiaTable'),
				btn: '确定',
				shade: false,
				yes: function(index, layero) {
					$.post('' + EQD_url + '/SetUp/Add_LeaveCheckTime.ashx', {
						"userGuid": data1.Guid,
						"minTime": $('.minTime input').val(),
						"maxTime": $('.maxTime input').val(),
						"companyId": data1.companyId,
						"approval": $('.shenpi select').val(),
						"type": '1'
					}, function(data) {
						var dataQingjia = JSON.parse(data);
						$('.cover').hide();
						layer.closeAll()
						if (dataQingjia.status == 200) {
							document.getElementById("qingjiashezhi").click();
						}
					});
				}
			});
			$('.layui-layer-close').click(function() {
				$('.cover').hide()
			});
		});
		var num1=0
		// $('.kaoqinguanli').click(function(){
			if(num1==0){
				num1++
				$.post('' + EQD_url + '/SetUp/Get_LeaveCheckTime.ashx', {
					"userGuid": data1.Guid,
					"companyId": data1.companyId,
					"type": '1'
				}, function(data) {
					var dataqingjiaChakan = JSON.parse(data);
					$('#qingjiaTable').bootstrapTable({
						data: dataqingjiaChakan.items,
						columns: [{
							field: 'qingjiafanwei',
							title: '请假天数范围',
							formatter: qingjiatimeFormatter
						}, {
							field: 'approvalLevel',
							title: '审批级别',
						}, {
							field: 'qingjiaOperate',
							title: '操作',
							events: qingjiaEvents,
							formatter: qingjiaFormatter
						}]
					});
					$("#qingjiaTable").bootstrapTable('load', dataqingjiaChakan.items);
				});
			}
			
		// })
		

		function qingjiaFormatter(e, value, row, index) {
			return ['<a class="qingjia"  title="Qingjia">', '<span id="qingjia">编辑</span>', '</a>  ',
				'<a class="removeQingjia" id="removeQingjia">', '<span id="qingjiaDelete">删除</span>', '</a>',
			].join('');
		};

		function qingjiatimeFormatter(e, value, row, index) {
			var qingjiaMin;
			var qingjiaMax;
			var qingjiafanwei;
			qingjiaMin = value.minTime;
			qingjiaMax = value.maxTime
			qingjiafanwei = qingjiaMin + "~" + qingjiaMax;
			return [
				qingjiafanwei
			].join('');
		};
		window.qingjiaEvents = {
			'click .removeQingjia': function(e, value, row, index) {
				layer.open({
					type: 1,
					area: '500px',
					title: ['删除请假设置', 'font-size:18px;'],
					shadeClose: true, //点击遮罩关闭
					content: $('.removeqingjiaTable'),
					btn: '确定'
				});
				$('.removeqingjiaTable div span').val()
				$('.layui-layer-btn0').click(function() {
					$.post('' + EQD_url + '/SetUp/Delete_LeaveCheckTime.ashx', {
						"userGuid": data1.Guid,
						"companyId": data1.companyId,
						"id": row.Id
					}, function(data) {
						var dataRemoveqingjia = JSON.parse(data);
						if (dataRemoveqingjia.status == 200) {
							layer.msg('删除成功', {
								time: 1000,
							});
							$("#qingjiaTable").bootstrapTable('remove', {
								field: 'Id',
								values: [row.Id],
							});
						}
					});
				});
			},
			'click .qingjia': function(e, value, row, index) {
				layer.open({
					type: 1,
					area: '800px',
					title: ['编辑请假设置', 'font-size:18px;'],
					shadeClose: true, //点击遮罩关闭
					content: $('.editqingjiaTable'),
					btn: '确定'
				});
				$('.minTime input').val(row.minTime);
				$('.maxTime input').val(row.maxTime);
				$('.shenpi select').val(row.approvalLevel);
				$('.layui-layer-btn0').click(function() {
					$.post('' + EQD_url + '/SetUp/Update_LeaveCheckTime.ashx', {
						"userGuid": data1.Guid,
						"minTime": $('.editqingjiaTable .minTime input').val(),
						"maxTime": $('.editqingjiaTable .maxTime input').val(),
						"companyId": data1.companyId,
						"approvalLevel": $('.editqingjiaTable .shenpi select').val(),
						"type": '1',
						"id": row.Id
					}, function(data) {
						var dataEdit = JSON.parse(data);
						if (dataEdit.status == 200) {
							document.getElementById("qingjiashezhi").click();
						}
					});
				});
			}
		};
	});
	// *****************************请假设置结束********************************
	// ****************************出差设置*************************************
	function loadchuchaiTable() {
		$.post('' + EQD_url + '/SetUp/Get_LeaveCheckTime.ashx', {
			"userGuid": data1.Guid,
			"companyId": data1.companyId,
			"type": '2'
		}, function(data) {
			var datachuchaiChakan = JSON.parse(data);
			$('#chuchaiTable').bootstrapTable({
				data: datachuchaiChakan.items,
				columns: [{
					field: 'chuchaiTime',
					title: '出差天数范围',
					formatter: chuchaitimeFormatter
				}, {
					field: 'approvalLevel',
					title: '审批级别',
				}, {
					field: 'chuchaiOperate',
					title: '操作',
					events: chuchaiEvents,
					formatter: chuchaiFormatter
				}]
			});
			$("#chuchaiTable").bootstrapTable('load', datachuchaiChakan.items);
		})

		function chuchaitimeFormatter(e, value, row, index) {
			var cminTime = value.minTime;
			var cmaxTime = value.maxTime;
			var callTime = cminTime + "~" + cmaxTime;
			return [
				callTime
			].join('');
		}
		window.chuchaiEvents = {
			'click .removeChuchai': function(e, value, row, index) {
				layer.open({
					type: 1,
					area: '500px',
					title: ['删除出差设置', 'font-size:18px;'],
					shadeClose: true, //点击遮罩关闭
					content: $('.removechuchaiTable'),
					btn: '确定'
				});
				$('.removechuchaiTable div span').val()
				$('.layui-layer-btn0').click(function() {
					$.post('' + EQD_url + '/SetUp/Delete_LeaveCheckTime.ashx', {
						"userGuid": data1.Guid,
						"companyId": data1.companyId,
						"id": row.Id
					}, function(data) {
						var dataRemovechuchai = JSON.parse(data);
						if (dataRemovechuchai.status == 200) {
							layer.msg('删除成功', {
								time: 1000,
							});
							$("#chuchaiTable").bootstrapTable('remove', {
								field: 'Id',
								values: [row.Id],
							});
						}
					});
				});
			},
			'click .chuchai': function(e, value, row, index) {
				layer.open({
					type: 1,
					area: '800px',
					title: ['编辑出差设置', 'font-size:18px;'],
					shadeClose: true, //点击遮罩关闭
					content: $('.editchuchaiTable'),
					btn: '确定'
				});
				$('.minTime input').val(row.minTime);
				$('.maxTime input').val(row.maxTime);
				$('.shenpi select').val(row.approvalLevel);
				$('.layui-layer-btn0').click(function() {
					$.post('' + EQD_url + '/SetUp/Update_LeaveCheckTime.ashx', {
						"userGuid": data1.Guid,
						"minTime": $('.editchuchaiTable .minTime input').val(),
						"maxTime": $('.editchuchaiTable .maxTime input').val(),
						"companyId": data1.companyId,
						"approvalLevel": $('.editchuchaiTable .shenpi select').val(),
						"type": '2',
						"id": row.Id
					}, function(data) {
						var datachuchaiEdit = JSON.parse(data);
						if (datachuchaiEdit.status == 200) {
							document.getElementById("chuchaishezhi").click();
						}
					});
				});
			}
		};

		function chuchaiFormatter(e, value, row, index) {
			return ['<a class="chuchai"  title="Chuchai">', '<span id="chuchai">编辑</span>', '</a>  ',
				'<a class="removeChuchai" id="removeChuchai">', '<span id="chuchaiDelete">删除</span>', '</a>',
			].join('');
		};
	}

	$('.chuchaishezhi').click(function() {
		$(this).addClass('pcheck').siblings('p').removeClass('pcheck');
		$('.chuchaiShezhi').show().siblings('div').hide();
		loadchuchaiTable()
		$('.addChuchai').click(function() {
			$('.cover').show();
			layer.open({
				type: 1,
				area: '800px',
				title: ['出差设置', 'font-size:18px;'],
				shadeClose: true, //点击遮罩关闭
				content: $('.addchuchaiTable'),
				btn: '确定',
				shade: false,
				yes: function(index, layero) {
					$.post('' + EQD_url + '/SetUp/Add_LeaveCheckTime.ashx', {
						"userGuid": data1.Guid,
						"minTime": $('.addchuchaiTable .minTime input').val(),
						"maxTime": $('.addchuchaiTable .maxTime input').val(),
						"companyId": data1.companyId,
						"approval": $('.addchuchaiTable .shenpi select').val(),
						"type": '2'
					}, function(data) {
						var dataChuchai = JSON.parse(data);
						$('.cover').hide();
						if (dataChuchai.status == 200) {
							loadchuchaiTable()
							layer.closeAll()
						}
					});
				}
			});
			$('.layui-layer-close').click(function() {
				$('.cover').hide();
			});
			$('.layui-layer-btn0').click(function() {
				layer.closeAll()
			});
		});
	});
	// =======================================wifi设置====================================
	var pageNext = 0;
			$('.wifimng').click(function() {
				$(this).addClass('pcheck').siblings('p').removeClass('pcheck');
				$('.setwifi').show().siblings('div').hide();
				$(".addwifi").on("click", function() {
					console.log(data1)
					layer.open({
						type: 1,
						area: ["400px", "260px"],
						content: $(".wifiBox"),
						skin: 'layui-layer-rim', //加上边框
						title: "增加打卡wifi",
						btn: ['确认'],
						yes: function(index, layero) {
							$.post(EQD_url + '/Clocks/Set_ClockWIFI.ashx', {
								"companyId": data1.companyId,
								"WIFI": $(".wifiName").val(),
								"userGuid": data1.Guid
							}, function(data) {
								var data = JSON.parse(data);						
								if (data.status === 200) {
									layer.msg("添加成功")
									setTimeout(function() {
										layer.close(index);
										loadFirst(pageNext);
									}, 500);
								}
							});
						}
					})
				})
		
				function loadTable(data) {
					$('.wifiTable').bootstrapTable({
						data: data,
						columns: [{
							title: 'wifi名字',
							field: 'WIFI',
							align: 'center',
							valign: 'middle',
						}, {
							title: '状态',
							field: 'isOpen',
							align: 'center',
							valign: 'middle',
							formatter: fun
						}, {
							title: '操作',
							align: 'center',
							valign: 'middle',
							formatter: fun2,
							events: wopt
						}]
					});
		
					function fun(e, value, row, index) {
						var statu = '';
						if (value.isOpen) {
							return '<span style="color:#81D842;">已开启</span>'
						} else {
							return '<span style="color:#ccc;">已关闭</span>'
						}
						
					}
		
					function fun2(e, value, row, index) {
						return '<span class="wopen" style="color:#29e;cursor:pointer;padding:0 15px">开启</span><span class="wclose" style="color:#29e;cursor:pointer;padding:0 15px">关闭</span><span class="delecty" style="color:#29e;cursor:pointer;padding:0 15px">删除</span>'
					}
				};
		
				function loadFirst(page) {
					$.post(EQD_url + '/Clocks/Get_WIFIlist.ashx', {
						"companyId": data1.companyId,
					}, function(data) {
						var data = JSON.parse(data);
						loadTable(data.items);
						$(".wifiTable").bootstrapTable('load', data.items);
						pageNext = data.page;
						if (data.items.length >= 10) {
							$('.pageArea').show()
						} else {
							$('.pageArea').hide()
						}
					});
				};
		
				function loadNext(page) {
					$.post(EQD_url + '/Clocks/Get_WIFIlist.ashx', {
						"companyId": data1.companyId,
					}, function(data) {
						var data = JSON.parse(data);
						loadTable(data.items);
						$(".wifiTable").bootstrapTable('append', data.items);
						pageNext = data.page;
						if (data.items.length >= 10) {
							$('.pageArea').hide()
						} else {
							$('.pageArea').hide()
						}
					});
				};
				loadFirst(pageNext);
				$('.pageNext').click(function() {
					loadNext(pageNext)
				});
		        function wifiOpt(num, id) {
		        	$.post(EQD_url + '/Clocks/OpenOrDown_ClockWIFI.ashx', {
		        		"companyId": data1.companyId,
		        		"type": num,
		        		"wifiId": id,
		        		"userGuid": data1.Guid
		        	}, function(data) {
		        		var data = JSON.parse(data);
		        		layer.msg(data.msg)
		        		loadFirst(pageNext);
		        	});
		        }
		        
		        window.wopt = {
		        	"click .wopen": function(e, value, row, index) {
		        		wifiOpt(1, row.wifiId)
		        	},
		        	"click .wclose": function(e, value, row, index) {
		        		wifiOpt(0, row.wifiId)
		        	},
		        	"click .delecty": function(e, value, row, index) {
		        		layer.open({
		        			type: 1,
		        			content: '<p style="width:200px;margin:20px;">确定删除吗?</p>',
		        			title: ['删除打卡wifi', 'text-align: center;'],
		        			btn: '确认',
		        			yes: function(index, layero) {
		        				$.post(EQD_url + '/Clocks/wificlock_delete.ashx', {
		        					"companyId": data1.companyId,
		        					"Id": row.wifiId,
		        					"userGuid": data1.Guid
		        				}, function(data) {
		        					var data = JSON.parse(data);
		        					if (data.status === 200) {
		        						layer.msg("删除成功")
		        						setTimeout(function() {
		        							layer.close(index);
		        							loadFirst(pageNext);
		        						}, 500);
		        					}
		        				});
		        			}
		        		})
		        	}
		        }
			});

	
	// =======================================wifi结束====================================
	// =======================================考勤报表====================================
	// ***************************************************考勤明细**********************************************************
	var day = 0;

	function tihuan(str) {
		var time = str.split(" ")[0]
		var timeA = time.replace("/", "-");
		var timeB = timeA.replace("/", "-");
		return timeB;
	}

	function tihuan2(str) {
		var time = str.split(" ")[1]
		var timeA = time.substring(0, 5)
		return timeA;
	}
	// 打卡明细表格数据式样处理封装函数
	function biaogemingxi(obj) {
		var datakaoqinMingxi = obj;
		var dateArr = [];
		for (var i = 0; i < datakaoqinMingxi.length; i++) {
			var dic = {
				"username": datakaoqinMingxi[i].username,
				"latetimes": datakaoqinMingxi[i].latetimes,
				"earlytimes": datakaoqinMingxi[i].earlytimes
			};
			for (var j = 0; j < datakaoqinMingxi[i].list.length; j++) {
				var date = "";
				for (var m = 0; m < datakaoqinMingxi[i].list[j].list.length; m++) {
					date += (datakaoqinMingxi[i].list[j].list[m].createTime + "<br>" + " ");
				}
				dic["date" + j] = date;
			}
			dic["list"] = datakaoqinMingxi[i].list;
			dateArr.push(dic);
		}
		var shuzu = [];
		// 时间处理
		var tem = "姓名";
		var dateString1 = new Date(Date.parse($('#test1').val())).getTime();
		var dateString2 = new Date(Date.parse($('#test2').val())).getTime();
		var days = Math.abs((dateString1 - dateString2)) / (1000 * 60 * 60 * 24) + 1
		for (var i = 0; i < days; i++) {
			var rizi = addDate($('#test1').val(), i).substring(5, 10);
			tem += rizi;
			shuzu.push(rizi)
		}

		function addDate(date, days) {
			var d = new Date(date);
			d.setDate(d.getDate() + days);
			var m = d.getMonth() + 1;
			return d.getFullYear() + '-' + m + '-' + d.getDate();
		}
		var thlist = "";
		var riqiArr = [];
		riqiArr.push({
			field: "username",
			title: "姓名"
		}, {
			field: "latetimes",
			title: "迟到"
		}, {
			field: "earlytimes",
			title: "早退"
		})
		for (var j = 0; j < datakaoqinMingxi[0].list.length; j++) {
			thlist += "<th data-field=status></th>";
			riqiArr.push({
				field: "date" + j,
				title: shuzu[j],
				cellStyle: cellstyle1,
			})
		}
		// 迟到早退 漏打卡表格数据处理
		$('#kaoqinMingxiTable').append(thlist)
		var exportType1;
		if ($('#sel_exportoption').val() == "basic") {
			exportType1 = "basic";
		} else if ($('#sel_exportoption').val() == "all") {
			exportType1 = "all";
		}
		for (var i = 0; i < datakaoqinMingxi.length; i++) {
			$('#kaoqinMingxiTable').bootstrapTable('destroy').bootstrapTable({
				data: dateArr,
				columns: riqiArr
			});
			$("#kaoqinMingxiTable").bootstrapTable('load', dateArr);
		}
		replaceNull();
		// 数据式样处理
		function replaceNull() {
			$("#kaoqinMingxiTable tr").each(function() {
				var td = $(this).find("td:gt(2)");
				$(td).each(function() {
					if ($(this).html() == 0) {
						$(this).html("漏");
						$(this).css({
							"background-color": "green",
							"color": "#fff",
							"font-size": "20px"
						});
						$(this).css('line-height', '70px');
					}
				});
				$("#kaoqinMingxiTable tr").find("td:eq(1)").css({
					'background-color': '#fff',
					"color": "#000"
				});
				$("#kaoqinMingxiTable tr").find("td:eq(0)").css({
					'background-color': '#fff',
					"color": "#000"
				});
				$("#kaoqinMingxiTable tr").find("td:eq(0)").css('min-width', '80px');
				$("#kaoqinMingxiTable tr").find("td:eq(2)").css({
					'background-color': '#fff',
					"color": "#000"
				});
			});
		}
		cellStyle: function cellstyle1(value, row, index) {
			var disAll = [];
			if (typeof(value) != "undefined") {
				var flag = 0;
				var tdic = row.list;
				for (var n = 0; n < tdic[day].list.length; n++) {
					disAll.push(tdic[day].list[n].status);
					if (tdic[day].list[n].status == 1 || tdic[day].list[n].status == 2) {
						flag = 2;
						// break;
					} else if (tdic[day].list[n].status == 0) {
						flar = 1
					}
				}
				if (day == days - 1) {
					day = 0;
				} else {
					day++;
				}
			}
			if (flag == 2) {
				return {
					css: {
						"background-color": "#f00",
						"color": "#fff"
					}
				};
			} else {
				return {
					"background-color": "#fff"
				};
			}
		}
	}

	function biaogetongji(obj) {
		var dataKaoqin2 = obj;
		console.log(dataKaoqin2.items)
		var sTime = new Date($('#test1').val()).getTime();
		var eTime = new Date($('#test2').val()).getTime();
		var exportType;
//		if ($('#sel_exportoption').val() == "basic") {
//			exportType = "basic";
//		} else if ($('#sel_exportoption').val() == "all") {
//			exportType = "all";
//		}
			function myTime1(date){
			   var arr=date.split("T");
			   var d=arr[0];
			   var darr = d.split('-');
			   var t=arr[1];
			   var tarr = t.split('.000');
			   var marr = tarr[0].split(':');
			   var dd = parseInt(darr[1])+"月"+parseInt(darr[2])+"日"+" "+parseInt(marr[0])+":"+parseInt(marr[1])+":"+parseInt(marr[2]);
			   return dd;
			}
			function myTime(date){
			   var arr=date.split("T");
			   var d=arr[0];
			   var darr = d.split('-');
			   var t=arr[1];
			   var tarr = t.split('.000');
			   var marr = tarr[0].split(':');
			   var dd = parseInt(marr[0]).toString().padStart(2,'0')+":"+parseInt(marr[1]).toString().padStart(2,'0')+":"+parseInt(marr[2]).toString().padStart(2,'0');
			   return dd;
			}
			function statusNum(status){
				if(status=='0'){
					return '<span>正常</span>'
				}else if(status=='1'){
					return '<span style="color:red">迟到</span>'
				}else{
					return '<span style="color:red">早退</span>'
				}
			}
			for(var i=0;i< dataKaoqin2.items.length;i++){
				dataKaoqin2.items[i].index=i+1
				var time1=dataKaoqin2.items[i].date
				var time2=myTime1(time1)
				var time3=time2.split(' ')
				dataKaoqin2.items[i].date=time3[0]
			}
			
		if (eTime - sTime >= 0) {
			$('#kaoqinmingxiTable').bootstrapTable({
				
				data: dataKaoqin2.items,
				 exportTypes: ['excel'],
				 search:true,
				 cache:true,
				responseHandler: function(res) {
					
					return res.clockId
				},
				columns: [{
					field: 'index',
					title: '序号',
				},{
					field: 'date',
					title: '日期',
				},{
					field: 'name',
					title: '姓名',
				},{
					field: 'department',
					title: '部门',
				},{
					field: 'post',
					title: '岗位',
				},{
					field: 'EQDnum',
					title: '工号'
				},{
					field: 'shift',
					title: '班次'
				},{
					field: 'clockNum',
					title: '打卡次数'
				},{
					field: 'clockTime1',
					title: '第一次'
				},{
					field: 'clockPlace1',
					title: '实际位置'
				},{
					field: 'status1',
					title: '状态'
				},{
					field: 'clockTime2',
					title: '第二次'
				},{
					field: 'clockPlace2',
					title: '实际位置'
				},{
					field: 'status2',
					title: '状态'
				},{
					field: 'clockTime3',
					title: '第三次'
				},{
					field: 'clockPlace3',
					title: '实际位置'
				},{
					field: 'status3',
					title: '状态'
				},{
					field: 'clockTime4',
					title: '第四次'
				},{
					field: 'clockPlace4',
					title: '实际位置'
				},{
					field: 'status4',
					title: '状态'
				},{
					field: 'clockTime5',
					title: '第五次'
				},{
					field: 'clockPlace5',
					title: '实际位置'
				},{
					field: 'status5',
					title: '状态'
				},{
					field: 'clockTime6',
					title: '第六次'
				},{
					field: 'clockPlace6',
					title: '实际位置'
				},{
					field: 'status6',
					title: '状态'
				}]
				
			});
			$('.fixed-table-toolbar .search').removeClass('pull-right').addClass('pull-left')
			function depanedNum(){
				var data1=dataKaoqin2.items
				var rows=[]
				for(var i=0;i<data1.length;i++){
					if(data1[i].clockId.length==1){
						var time1=data1[i].clockId[0].clockTime
						var time2=myTime(time1)
						data1[i].clockId[0].clockTime=time2
						var status1=statusNum(data1[i].clockId[0].status)
						data1[i].clockId[0].status=status1
						rows.push({
							index:data1[i].index,
							date:data1[i].date,
							name:data1[i].name,
							department:data1[i].department,
							post:data1[i].post,
							EQDnum:data1[i].EQDnum,
							shift:data1[i].shift,
							clockNum:data1[i].clockNum,							
							clockTime1:data1[i].clockId[0].clockTime,
							clockPlace1:data1[i].clockId[0].clockPlace,
							status1:data1[i].clockId[0].status
						})
					}else if(data1[i].clockId.length==2){
						var time1=data1[i].clockId[0].clockTime
						var time2=myTime(time1)
						data1[i].clockId[0].clockTime=time2
						var time3=data1[i].clockId[1].clockTime
						var time4=myTime(time3)
						data1[i].clockId[1].clockTime=time4
						var status1=statusNum(data1[i].clockId[0].status)
						data1[i].clockId[0].status=status1
						var status2=statusNum(data1[i].clockId[1].status)
						data1[i].clockId[1].status=status2
						rows.push({
							index:data1[i].index,
							date:data1[i].date,
							name:data1[i].name,
							department:data1[i].department,
							post:data1[i].post,
							EQDnum:data1[i].EQDnum,
							shift:data1[i].shift,
							clockNum:data1[i].clockNum,
							clockTime1:data1[i].clockId[0].clockTime,
							clockPlace1:data1[i].clockId[0].clockPlace,
							clockTime2:data1[i].clockId[1].clockTime,
							clockPlace2:data1[i].clockId[1].clockPlace,
							status1:data1[i].clockId[0].status,
							status2:data1[i].clockId[1].status,
						})
					}else if(data1[i].clockId.length==3){
						var time1=data1[i].clockId[0].clockTime
						var time2=myTime(time1)
						data1[i].clockId[0].clockTime=time2
						var time3=data1[i].clockId[1].clockTime
						var time4=myTime(time3)
						data1[i].clockId[1].clockTime=time4
						var time5=data1[i].clockId[2].clockTime
						var time6=myTime(time5)
						data1[i].clockId[2].clockTime=time6
						var status1=statusNum(data1[i].clockId[0].status)
						data1[i].clockId[0].status=status1
						var status2=statusNum(data1[i].clockId[1].status)
						data1[i].clockId[1].status=status2
						var status3=statusNum(data1[i].clockId[2].status)
						data1[i].clockId[2].status=status3
						rows.push({
							index:data1[i].index,
							date:data1[i].date,
							name:data1[i].name,
							department:data1[i].department,
							post:data1[i].post,
							EQDnum:data1[i].EQDnum,
							shift:data1[i].shift,
							clockNum:data1[i].clockNum,
							clockTime1:data1[i].clockId[0].clockTime,
							clockPlace1:data1[i].clockId[0].clockPlace,
							clockTime2:data1[i].clockId[1].clockTime,
							clockPlace2:data1[i].clockId[1].clockPlace,
							clockTime3:data1[i].clockId[2].clockTime,
							clockPlace3:data1[i].clockId[2].clockPlace,
							status1:data1[i].clockId[0].status,
							status2:data1[i].clockId[1].status,
							status3:data1[i].clockId[2].status
						})
					}else if(data1[i].clockId.length==4){
						var time1=data1[i].clockId[0].clockTime
						var time2=myTime(time1)
						data1[i].clockId[0].clockTime=time2
						var time3=data1[i].clockId[1].clockTime
						var time4=myTime(time3)
						data1[i].clockId[1].clockTime=time4
						var time5=data1[i].clockId[2].clockTime
						var time6=myTime(time5)
						data1[i].clockId[2].clockTime=time6
						var time7=data1[i].clockId[3].clockTime
						var time8=myTime(time7)
						data1[i].clockId[3].clockTime=time8
						var status1=statusNum(data1[i].clockId[0].status)
						data1[i].clockId[0].status=status1
						var status2=statusNum(data1[i].clockId[1].status)
						data1[i].clockId[1].status=status2
						var status3=statusNum(data1[i].clockId[2].status)
						data1[i].clockId[2].status=status3
						var status4=statusNum(data1[i].clockId[3].status)
						data1[i].clockId[3].status=status4
						rows.push({
							index:data1[i].index,
							date:data1[i].date,
							name:data1[i].name,
							department:data1[i].department,
							post:data1[i].post,
							EQDnum:data1[i].EQDnum,
							shift:data1[i].shift,
							clockNum:data1[i].clockNum,
							clockTime1:data1[i].clockId[0].clockTime,
							clockPlace1:data1[i].clockId[0].clockPlace,
							clockTime2:data1[i].clockId[1].clockTime,
							clockPlace2:data1[i].clockId[1].clockPlace,
							clockTime3:data1[i].clockId[2].clockTime,
							clockPlace3:data1[i].clockId[2].clockPlace,
							clockTime4:data1[i].clockId[3].clockTime,
							clockPlace4:data1[i].clockId[3].clockPlace,
							status1:data1[i].clockId[0].status,
							status2:data1[i].clockId[1].status,
							status3:data1[i].clockId[2].status,
							status4:data1[i].clockId[3].status
						})
					}else if(data1[i].clockId.length==5){
						var time1=data1[i].clockId[0].clockTime
						var time2=myTime(time1)
						data1[i].clockId[0].clockTime=time2
						var time3=data1[i].clockId[1].clockTime
						var time4=myTime(time3)
						data1[i].clockId[1].clockTime=time4
						var time5=data1[i].clockId[2].clockTime
						var time6=myTime(time5)
						data1[i].clockId[2].clockTime=time6
						var time7=data1[i].clockId[3].clockTime
						var time8=myTime(time7)
						data1[i].clockId[3].clockTime=time8
						var time9=data1[i].clockId[4].clockTime
						var time10=myTime(time9)
						data1[i].clockId[4].clockTime=time10
						var status1=statusNum(data1[i].clockId[0].status)
						data1[i].clockId[0].status=status1
						var status2=statusNum(data1[i].clockId[1].status)
						data1[i].clockId[1].status=status2
						var status3=statusNum(data1[i].clockId[2].status)
						data1[i].clockId[2].status=status3
						var status4=statusNum(data1[i].clockId[3].status)
						data1[i].clockId[3].status=status4
						var status5=statusNum(data1[i].clockId[4].status)
						data1[i].clockId[4].status=status5
						rows.push({
							index:data1[i].index,
							date:data1[i].date,
							name:data1[i].name,
							department:data1[i].department,
							post:data1[i].post,
							EQDnum:data1[i].EQDnum,
							shift:data1[i].shift,
							clockNum:data1[i].clockNum,
							clockTime1:data1[i].clockId[0].clockTime,
							clockPlace1:data1[i].clockId[0].clockPlace,
							clockTime2:data1[i].clockId[1].clockTime,
							clockPlace2:data1[i].clockId[1].clockPlace,
							clockTime3:data1[i].clockId[2].clockTime,
							clockPlace3:data1[i].clockId[2].clockPlace,
							clockTime4:data1[i].clockId[3].clockTime,
							clockPlace4:data1[i].clockId[3].clockPlace,
							clockTime5:data1[i].clockId[4].clockTime,
							clockPlace5:data1[i].clockId[4].clockPlace,
							status1:data1[i].clockId[0].status,
							status2:data1[i].clockId[1].status,
							status3:data1[i].clockId[2].status,
							status4:data1[i].clockId[3].status,
							status5:data1[i].clockId[4].status
						})
					}else{
						var time1=data1[i].clockId[0].clockTime
						var time2=myTime(time1)
						data1[i].clockId[0].clockTime=time2
						var time3=data1[i].clockId[1].clockTime
						var time4=myTime(time3)
						data1[i].clockId[1].clockTime=time4
						var time5=data1[i].clockId[2].clockTime
						var time6=myTime(time5)
						data1[i].clockId[2].clockTime=time6
						var time7=data1[i].clockId[3].clockTime
						var time8=myTime(time7)
						data1[i].clockId[3].clockTime=time8
						var time9=data1[i].clockId[4].clockTime
						var time10=myTime(time9)
						data1[i].clockId[4].clockTime=time10
						var time11=data1[i].clockId[5].clockTime
						var time12=myTime(time11)
						data1[i].clockId[5].clockTime=time12
						var status1=statusNum(data1[i].clockId[0].status)
						data1[i].clockId[0].status=status1
						var status2=statusNum(data1[i].clockId[1].status)
						data1[i].clockId[1].status=status2
						var status3=statusNum(data1[i].clockId[2].status)
						data1[i].clockId[2].status=status3
						var status4=statusNum(data1[i].clockId[3].status)
						data1[i].clockId[3].status=status4
						var status5=statusNum(data1[i].clockId[4].status)
						data1[i].clockId[4].status=status5
						var status6=statusNum(data1[i].clockId[5].status)
						data1[i].clockId[5].status=status6
						rows.push({
							index:data1[i].index,
							date:data1[i].date,
							name:data1[i].name,
							department:data1[i].department,
							post:data1[i].post,
							EQDnum:data1[i].EQDnum,
							shift:data1[i].shift,
							clockNum:data1[i].clockNum,
							clockTime1:data1[i].clockId[0].clockTime,
							clockPlace1:data1[i].clockId[0].clockPlace,
							clockTime2:data1[i].clockId[1].clockTime,
							clockPlace2:data1[i].clockId[1].clockPlace,
							clockTime3:data1[i].clockId[2].clockTime,
							clockPlace3:data1[i].clockId[2].clockPlace,
							clockTime4:data1[i].clockId[3].clockTime,
							clockPlace4:data1[i].clockId[3].clockPlace,
							clockTime5:data1[i].clockId[4].clockTime,
							clockPlace5:data1[i].clockId[4].clockPlace,
							clockTime6:data1[i].clockId[5].clockTime,
							clockPlace6:data1[i].clockId[5].clockPlace,
							status1:data1[i].clockId[0].status,
							status2:data1[i].clockId[1].status,
							status3:data1[i].clockId[2].status,
							status4:data1[i].clockId[3].status,
							status5:data1[i].clockId[4].status,
							status6:data1[i].clockId[5].status
						})
					}
					
					
				}
				return rows
		}
			$("#kaoqinmingxiTable").bootstrapTable('load', depanedNum());
			strong()
		} else {
			layer.msg('请输入正确的时间', {
				time: 1000,
			});
		}
	}

	function strong() {
		$("#kaoqinmingxiTable tr").each(function() {
			var td = $(this).find("td");
			$(td).each(function() {
				if ($(this).html() != "0") {
					$(this).css('color', "#000");
					// $("#kaoqinmingxiTable tr").find("td:eq(0)").css('color', '#000');
					// $("#kaoqinmingxiTable tr").find("td:eq(1)").css('color', '#000');
				}
			});
		});
	}

	function biaogetongjiAll(obj) {
		var dataKaoqin2 = obj;
		if ($('#sel_exportoption').val() == "basic") {
			exportType = "basic";
		} else if ($('#sel_exportoption').val() == "all") {
			exportType = "all";
		}
		$('#kaoqinmingxiAll').bootstrapTable({
			data: dataKaoqin2.items,
			columns: [{
				field: 'name',
				title: '姓名',
			}, {
				field: 'jobNumber',
				title: '工号'
			}, {
				field: 'overtimeTotal',
				title: '加班(小时)',
			}, {
				field: 'offTotal',
				title: '调班(小时)',
			}, {
				field: 'travelTotal',
				title: '出差(天)',
			}, {
				field: 'leaveTotal',
				title: '请假(天)',
			}]
		});
		$("#kaoqinmingxiAll").bootstrapTable('load', dataKaoqin2.items);
	}
	// 考勤明细
	$("#kaoqinMingxiTable").on('click-cell.bs.table', function(e, field, value, row, $element) {
		var M = tihuan(row.list[field.substring(4, 7)].date)
		var titleAll = row.username + "   " + M;
		$('.cover').show();
		layer.open({
			type: 1,
			area: '600px',
			title: [titleAll, 'font-size:18px;'],
			content: $('.kaoqinDetail'),
			shade: false,
		});
		// 填充打卡时间
		var valList = value.split("<br>");
		for (var i = 0; i < row.list[field.substring(4, 7)].list.length; i++) {
			$('.kaoqinDetail').append($('.dakaDetail '))
			$('.dakaDetail ').append("<p><span class='dakabanbie" + i + "'></span>" + "<span class='dakashijain'>" + "(" +
				row.list[field.substring(4, 7)].list[i].clockTime + ")" + "</span>" + "<span class='dakatime" + i + "'>" +
				valList[i] + "</span></p>");
			if ((row.list[field.substring(4, 7)].list[i].type) == 0) {
				$("span[class^='dakabanbie']").eq(i).text("上班");
			} else {
				$("span[class^='dakabanbie']").eq(i).text("下班");
			}
			// 判断时间颜色
			if (row.list[field.substring(4, 7)].list[i].status == 1 || row.list[field.substring(4, 7)].list[i].status == 2) {
				$("[class^='dakatime']").eq(i).css({
					'color': 'red',
					'font-size': '16px'
				});
			}
		}
		$('.layui-layer-close').click(function() {
			$('.dakaDetail p').remove();
			$('.cover').hide();
		});
	})
	// 打卡数据
	$("#kaoqinmingxiTable").on('click-cell.bs.table', function(e, field, value, row, $element) {
		if (field == "overtimeTotal") {
			$('.cover').show();
			field = "加班";
			var dakaTitle = row.name + field + "" + "详情";
			layer.open({
				type: 1,
				area: '600px',
				title: [dakaTitle, 'font-size:18px;'],
				content: $('.overtimeDetail'),
				shade: false,
			});
			var overtimeArr = row.overtimeTimes;
			$('.overtimeDetail').append($('.overtimeMin'));
			for (var i = 0; i < overtimeArr.length; i++) {
				var qingjiaBegin = (tihuan(overtimeArr[i].StartTime)) + " " + (tihuan2(overtimeArr[i].StartTime))
				var qingjiaEnd = (tihuan(overtimeArr[i].EndTime)) + " " + (tihuan2(overtimeArr[i].EndTime))
				$('.overtimeMin').append("<p>" + "开始时间" + "<span class='qingjiaStart'>" + qingjiaBegin + "</span></p>" + "<p>" +
					"结束时间" + "<span class='qingjiaEnd'>" + qingjiaEnd + "</span></p>" + "<p>" + "加班时长" +
					"<span class='qingjiaAll'>" + overtimeArr[i].times + "</span></p>");
			}
			$('.layui-layer-close').click(function() {
				$('.overtimeMin p').remove();
				$('.cover').hide();
			});
		} else if (field == "offTotal") {
			$('.cover').show();
			field = "调班";
			var dakaTitle = row.name + field + "" + "详情";
			layer.open({
				type: 1,
				area: '600px',
				title: [dakaTitle, 'font-size:18px;'],
				content: $('.offDetail'),
				shade: false,
			});
			var offtimeArr = row.offTimes;
			$('.offDetail').append($('.offMin'));
			for (var i = 0; i < offtimeArr.length; i++) {
				var tiaobanBegin = tihuan(offtimeArr[i].StartTime)
				var tiaobanEnd = tihuan(offtimeArr[i].EndTime)
				$('.offMin').append("<p>" + "开始时间" + "<span class='tiaobanStart'>" + tiaobanBegin + "</span></p>" + "<p>" +
					"结束时间" + "<span class='tiaobanEnd'>" + tiaobanEnd + "</span></p>" + "<p>" + "调班时长" +
					"<span class='tiaobanAll'>" + offtimeArr[i].times + "</span></p>")
			}
			$('.layui-layer-close').click(function() {
				$('.offMin p').remove();
				$('.cover').hide();
			});
		} else if (field == "travelTotal") {
			$('.cover').show();
			field = "出差";
			var dakaTitle = row.name + field + "" + "详情";
			layer.open({
				type: 1,
				area: '600px',
				title: [dakaTitle, 'font-size:18px;'],
				content: $('.travelDetail'),
				shade: false,
			});
			var traveltimeArr = row.travelTimes;
			$('.travelDetail').append($('.travelMin'));
			for (var i = 0; i < traveltimeArr.length; i++) {
				var chuchaiBegin = tihuan(traveltimeArr[i].StartTime)
				var chuchaiEnd = tihuan(traveltimeArr[i].EndTime)
				var chuchaiAdd = traveltimeArr[i].address
				$('.travelMin').append("<p>" + "出差地点" + "<span class='chuchaiAddress'>" + chuchaiAdd + "</span></p>" + "<p>" +
					"开始时间" + "<span class='chuchaiStart'>" + chuchaiBegin + "</span></p>" + "<p>" + "结束时间" +
					"<span class='chuchaiEnd'>" + chuchaiEnd + "</span></p>" + "<p>" + "出差天数" + "<span class='chuchaiAll'>" +
					traveltimeArr[i].times + "</span></p>")
			}
			$('.layui-layer-close').click(function() {
				$('.travelMin p').remove();
				$('.cover').hide();
			});
		} else if (field == "leaveTotal") {
			$('.cover').show();
			field = "请假";
			var dakaTitle = row.name + field + "" + "详情";
			layer.open({
				type: 1,
				area: '600px',
				title: [dakaTitle, 'font-size:18px;'],
				content: $('.leaveDetail'),
				shade: false,
			});
			var leavetimeArr = row.leaveTimes;
			$('.leaveDetail').append($('.leaveMin'))
			for (var i = 0; i < leavetimeArr.length; i++) {
				var jiaqiBegin = tihuan(leavetimeArr[i].StartTime)
				var jiaqiEnd = tihuan(leavetimeArr[i].EndTime)
				$('.leaveMin').append("<p>" + "假期类别" + "<span class='jiaqileibie'>" + leavetimeArr[i].Type + "</span></p>" +
					"<p>" + "开始时间" + "<span class='jiaqiStart'>" + jiaqiBegin + "</span></p>" + "<p>" + "结束时间" +
					"<span class='jiaqiEnd'>" + jiaqiEnd + "</span></p>" + "<p>" + "假期时长" + "<span class='jiaqiAll'>" +
					leavetimeArr[i].times + "</span></p>")
			}
			$('.layui-layer-close').click(function() {
				$('.leaveMin p').remove();
				$('.cover').hide();
			});
		} else {}
	})

	function kaoqin() {
		$('.chaxun').click(function() {
			$('.exampleKaoqin').show()
			$('#kaoqinmingxiTable').show();
			$('#kaoqinMingxiTable').hide();
			if($('#demo2 .xm-select-default').length>0){
				var arr=$('#demo2 .xm-select-default').val()
				var strGuid=arr.replace(/,/g,';')
			}
			var pageNum2 = 0;
			var sTime = new Date($('#test1').val()).getTime();
			var eTime = new Date($('#test2').val()).getTime();
			console.log($('.chooseDepartment input').val())
			if(sTime-eTime>0){
				layer.msg('请输入正确的时间')
			}else if($('#demo2 .xm-select-default').length<1){
				layer.msg('请选择需要查看员工')
			}else{
				if(strGuid.length>=32){
					var ii = layer.load(2, {
					  shade: [0.2,'#000'] //0.1透明度的白色背景
					});
					$.post('' + EQD_url + '/Clocks/GetClockByHr.ashx', {
						"startdate": $('#test1').val(),
						"enddate": $('#test2').val(),
						"userGuids": strGuid,
					}, function(data) {
						console.log(data)
						var dataKaoqin = JSON.parse(data);
						if (dataKaoqin.status == 200) {
							console.log(1111)
							if (dataKaoqin.items.length > 0) {
								layer.close(ii);
								biaogetongji(dataKaoqin)
								layer.msg('查询成功', {
									time: 1000,
								  });
							}else{
								layer.close(ii);
								layer.msg('查询失败')
							}
						}else{
							layer.close(ii);
							layer.msg('请选择需要查看员工')
						}
					});
				}else{
					layer.msg('请选择正确的员工')
				}
				
			}
		})
	}
	$('.kaoqinbaobiao').click(function() {
		$('.kaoqinmingxi').slideToggle(200);
		// $('.chaXun').slideToggle(200);
	});
	$('.kaoqinmingxi').click(function() {
		kaoqin()
		$('.daochu').click(function() {
			$('#kaoqinmingxiTable').tableExport({
				separator: ' ',
				fileName: data1.company + "全体人员考勤统计表",
				tableName: 'kaoqinmingxiTable',
				type: 'csv',
				escape: 'true',
				htmlContent: 'false',
				consoleLog: 'false',
			});
		});
		$(this).addClass('pcheck').siblings('p').removeClass('pcheck');
		$('.kaoqinMingxi').show().siblings('div').hide();
		var myDate = new Date();
		var yuefen = Number(myDate.getMonth()) + 1;
		var tianshu = myDate.getDate();
		if (yuefen < 10) {
			var yueFen = "0" + yuefen;
		} else {
			yueFen = yuefen;
		}
		if (tianshu < 10) {
			var tianshuNew = "0" + tianshu;
		} else {
			tianshuNew = tianshu;
		}
		var jintian = (myDate.getFullYear() + "-" + yueFen + "-" + tianshuNew);
		var yihao = (myDate.getFullYear() + "-" + yueFen + "-" + "01");
		$('#test1').val(yihao);
		$('#test2').val(jintian);
		laydate.render({
			elem: '#test1',
			max: 0
		});
		laydate.render({
			elem: '#test2',
			max: 0
		});
		$('.chooseDepartment input').click(function() {
			$(".cover").show();
			layer.open({
				type: 1,
				area: ['800px','600px'],
				title: ['选择部门', 'font-size:18px;'],
				content: $('.choosedepartmentTable'),
				shade: false,
				btn:'确定'
			});
			$.post('http://47.94.173.253:8008/Com/Get_Com_User.ashx',{
				companyId:data1.companyId,
				ParentId:0
			},function(res){
				var data=JSON.parse(res)
				console.log(data)
				var departName=[]
				var departNameChild=[]
				for(var i=0;i<data.items.length;i++){
						departName.push({name:data.items[i].departName,value:data.items[i].departId})
						if(data.items[i].UserInfo.length!==0){
							var departNameOnechild=[]
							for(var j=0;j<data.items[i].UserInfo.length;j++){
								departNameOnechild.push({name:data.items[i].UserInfo[j].username,value:data.items[i].UserInfo[j].userGuid})
								departName[i].children=departNameOnechild
							}
						}else if(data.items[i].childs.length!==0){
							for(var j=0;j<data.items[i].childs.length;j++){
								departNameChild.push({name:data.items[i].childs[j].departName,value:data.items[i].childs[j].departId})
								departName[i].children=departNameChild
								if(data.items[i].childs[j].childs.length!==0){
									var departNameChild1=[]
									for(var k=0;k<data.items[i].childs[j].childs.length;k++){
										departNameChild1.push({name:data.items[i].childs[j].childs[k].departName,value:data.items[i].childs[j].childs[k].departId})
										departName[i].children[j].children=departNameChild1
										if(data.items[i].childs[j].childs[k].UserInfo.length!==0){
											var departNameThreechild=[]
											for(var m=0;m<data.items[i].childs[j].childs[k].UserInfo.length;m++){
												departNameThreechild.push({name:data.items[i].childs[j].childs[k].UserInfo[m].username,value:data.items[i].childs[j].childs[k].UserInfo[m].userGuid})
												departName[i].children[j].children[k].children=departNameThreechild
											}
										}else if(data.items[i].childs[j].childs[k].childs.length!==0){
											var departNameChild2=[]
											for(var m=0;m<data.items[i].childs[j].childs[k].childs.length;m++){
												departNameChild2.push({name:data.items[i].childs[j].childs[k].childs[m].departName,value:data.items[i].childs[j].childs[k].childs[m].departId})
												departName[i].children[j].children[k].children=departNameChild2
												if(data.items[i].childs[j].childs[k].childs[m].UserInfo.length!==0){
													var departNameFourchild=[]
													for(var n=0;n<data.items[i].childs[j].childs[k].childs[m].UserInfo.length;n++){
														departNameFourchild.push({name:data.items[i].childs[j].childs[k].childs[m].UserInfo[n].username,value:data.items[i].childs[j].childs[k].childs[m].UserInfo[n].userGuid})
														departName[i].children[j].children[k].children[m].children=departNameFourchild
													}
													
												}else if(data.items[i].childs[j].childs[k].childs[m].childs.length!==0){
													var departNameChild3=[]
													for(var n=0;n<data.items[i].childs[j].childs[k].childs[m].childs.length;n++){
														departNameChild3.push({name:data.items[i].childs[j].childs[k].childs[m].childs[n].departName,value:data.items[i].childs[j].childs[k].childs[m].childs[n].departId})
														departName[i].children[j].children[k].children[m].children=departNameChild3
														if(data.items[i].childs[j].childs[k].childs[m].childs[n].UserInfo.length!==0){
															var departNameFivechild=[]
															for(var z=0;z<data.items[i].childs[j].childs[k].childs[m].childs[n].UserInfo.length;z++){
																departNameFivechild.push({name:data.items[i].childs[j].childs[k].childs[m].childs[n].UserInfo[z].username,value:data.items[i].childs[j].childs[k].childs[m].childs[n].UserInfo[z].userGuid})
																departName[i].children[j].children[k].children[m].children[n].children=departNameFivechild
															}
														}else if(data.items[i].childs[j].childs[k].childs[m].childs[n].childs.length!==0){
															var departNameChild4=[]
															for(var z=0;z<data.items[i].childs[j].childs[k].childs[m].childs[n].childs.length;z++){
																departNameChild4.push({name:data.items[i].childs[j].childs[k].childs[m].childs[n].childs[z].departName,value:data.items[i].childs[j].childs[k].childs[m].childs[n].childs[z].departId})
																departName[i].children[j].children[k].children[m].children[n].children=departNameChild4
																if(data.items[i].childs[j].childs[k].childs[m].childs[n].childs[z].UserInfo.length!==0){
																	var departNameSixchild=[]
																	for(var y=0;y<data.items[i].childs[j].childs[k].childs[m].childs[n].childs[z].UserInfo.length;y++){
																		departNameSixchild.push({name:data.items[i].childs[j].childs[k].childs[m].childs[n].childs[z].UserInfo[y].username,value:data.items[i].childs[j].childs[k].childs[m].childs[n].childs[z].UserInfo[y].userGuid})
																		departName[i].children[j].children[k].children[m].children[n].children[z].children=departNameSixchild
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}else if(data.items[i].childs[j].UserInfo.length!==0){
									var departNameTwochild=[]
									for(var k=0;k<data.items[i].childs[j].UserInfo.length;k++){
										departNameTwochild.push({name:data.items[i].childs[j].UserInfo[k].username,value:data.items[i].childs[j].UserInfo[k].userGuid})
										departName[i].children[j].children=departNameTwochild
									}
								}
							}
							
						}
					}
				layui.form.render();
				var demo1 = xmSelect.render({
						el: '#demo2', 
						autoRow: true,
						filterable: true,
						tree: {
							show: true,
							showFolderIcon: true,
							showLine: true,
							indent: 20,
							expandedKeys: [ -1 ],
							strict: true,
						},
						filterable: true,
						height: 'auto',
						data(){
							return  departName
						}
				})
				demo1.opened()
			})
			$('.layui-layer-btn0').click(function() {
				$('.cover').hide();
				var arr=$('#demo2 .xm-select-default').val()
				var strGuid=arr.replace(/,/g,';')
				if($('#demo2 .xm-select-default').length>0){
					$('.chooseDepartment input').val('已选择')
				}
			});
			$('.layui-layer-close').click(function() {
				$('.cover').hide();
			})
		});
		$('.kaoqinTongji').click(function() {
			$('.inner2').hide();
			$('.inner1').show();
			$('.daochu2').hide()
			$('.daochu').show()
			$('.chaxun').show();
			$('#chaxun').hide()
			kaoqin()
		})
		$('.dakaXiangqing').click(function() {
			$('.inner2').show();
			$('.inner1').hide();
			$('.daochu').hide()
			$('.daochu2').show()
			// 导出打卡数据
			function DoCellData(cell, row, col, data) {}

			function DoBeforeAutotable(table, headers, rows, AutotableSettings) {}
			$('.daochu2').click(function() {
				$('#kaoqinMingxiTable').tableExport({
					separator: '\t',
					fileName: data1.company + "全体人员打卡明细表",
					tableName: 'kaoqinMingxiTable',
					type: 'excel',
					escape: 'true',
					htmlContent: 'false',
					consoleLog: 'false',
					excelstyles: ['background-color', 'color', 'border-bottom-color', 'border-bottom-style',
						'border-bottom-width', 'border-top-color', 'border-top-style', 'border-top-width', 'border-left-color',
						'border-left-style', 'border-left-width', 'border-right-color', 'border-right-style',
						'border-right-width', 'text-algin', 'font-size', 'margin-left'
					],
					jspdf: {
						format: 'bestfit',
						margins: {
							left: 20,
							right: 10,
							top: 20,
							bottom: 20
						},
						autotable: {
							styles: {
								overflow: 'linebreak'
							},
							tableWidth: 'wrap',
							tableExport: {
								onBeforeAutotable: DoBeforeAutotable,
								onCellData: DoCellData
							}
						}
					}
				});
			});
			$('#chaxun').show();
			$('.chaxun').hide();
			$('#chaxun').click(function() {
				layer.load(2);
				//此处演示关闭
				$('.exampleKaoqin').hide()
				$('#kaoqinMingxiTable').show();
				$('#kaoqinmingxiTable').hide();
				if ($('.chooseDepartment input').val() == "全体员工") {
					$.post('' + EQD_url + '/ReportForm/userclass/Get_AllClock.ashx', {
						"companyId": data1.companyId,
						"userGuid": data1.Guid,
						"startTime": $('#test1').val(),
						"endTime": $('#test2').val(),
						"sort": $('.sort select').val(),
					}, function(data) {
						layer.closeAll('loading');
						var datakaoqinMingxi = JSON.parse(data).items
						// console.log( datakaoqinMingxi )
						if (datakaoqinMingxi.length > 0) {
							biaogemingxi(datakaoqinMingxi)
						}
					})
				} else {
					$.post('' + EQD_url + '/ReportForm/userclass/Get_AllClock.ashx', {
						"companyId": data1.companyId,
						"userGuid": data1.Guid,
						"departmentId": G_treeNode.departId,
						"startTime": $('#test1').val(),
						"endTime": $('#test2').val(),
						"sort": $('.sort select').val(),
					}, function(data) {
						layer.closeAll('loading');
						var datakaoqinMingxi = JSON.parse(data).items
						if (datakaoqinMingxi.length > 0) {
							biaogemingxi(datakaoqinMingxi)
						}
					});
				}
			});
		})
		$(".rilishow ul li").remove()
	});
	// **************************************************考勤明细结束******************************************************
	// **************************************************考勤查询开始******************************************************
	$('.chaXun').click(function() {
		$(this).addClass('pcheck').siblings('p').removeClass('pcheck');
		$('.ChaXun').show().siblings('div').hide();
		var myDate = new Date();
		var yuefen = Number(myDate.getMonth()) + 1;
		var tianshu2 = myDate.getDate();
		if (yuefen < 10) {
			var yueFen = "0" + yuefen;
		} else {
			yueFen = yuefen;
		}
		if (tianshu2 < 10) {
			var tianshuNew2 = "0" + tianshu2;
		} else {
			tianshuNew2 = tianshu2;
		}
		var jintian = (myDate.getFullYear() + "-" + yueFen + "-" + tianshuNew2);
		$('#test3').val(jintian);
		laydate.render({
			elem: '#test3',
			max: 0
		});
	})
	var perId, perGuid;

	function ChooseFun() {
		layer.open({
			type: 1,
			area: '700px',
			title: ['选择部门人员', 'font-size:18px;'],
			shadeClose: true, //点击遮罩关闭
			content: $('.chaxunTable'),
		});
		$('#treeDemo4  li').click(function() {
			$('#renyuanchooseTable2').bootstrapTable({
				data: data4.items,
				columns: [{
					field: 'username',
				}]
			});
			$("#renyuanchooseTable2").bootstrapTable('load', data4.items)
		});
		$("#renyuanchooseTable2").on('click-row.bs.table', function(e, row, $element) {
			perId = row.companyId;
			perGuid = row.userGuid;
			console.log(perId)
			console.log(perGuid)
			$('.chaxunDep').val(G_treeNode.departName);
			$('.chaxunPeo').val(row.username)
			layer.closeAll();
		})
	}
	$('.chaxunDep').click(function() {
		ChooseFun();
	});
	$('.chaxunPeo').click(function() {
		ChooseFun();
	});
	$('.chaxunBtn').click(function() {
		console.log(perId)
		console.log(perGuid)
		if ($('.chaxunDep').val().length == 0 || $('.chaxunPeo').length == 0) {
			layer.msg('请选择部门和人员', {
				time: 1000,
			});
		} else {
			$.post('' + EQD_url + '/Clocks/Get_Clock.ashx', {
				"companyId": perId,
				"userGuid": perGuid,
				"date": $('.chaxunDate').val(),
			}, function(data) {
				var dataChoose = JSON.parse(data);
				if (dataChoose.status == 200) {
					layer.msg(dataChoose.msg, {
						time: 1000,
					});
				}
				$('#dangtiandakaTable').bootstrapTable({
					data: dataChoose.items,
					columns: [{
						field: 'type',
						title: '上/下班',
						formatter: banTypeFormatter
					}, {
						field: 'createTime',
						title: '打卡时间',
						formatter: dakaFormatter,
						cellStyle: dakacellStyle,
					}, {
						field: 'clockTime',
						title: '规定时间',
						formatter: guidingFormatter,
					}, {
						field: 'place',
						title: '打卡地点',
						formatter: placeFormatter,
						events: placeEvents,
					}, {
						field: 'WIFIName',
						title: 'WIFI名字',
					}, {
						field: 'status',
						title: '状态',
						formatter: statusFormatter,
						cellStyle: statuscellStyle,
					}, ]
				});
				$("#dangtiandakaTable").bootstrapTable('load', dataChoose.items);
			});

			function guidingFormatter(value, row, index) {
				var timeRule = (row.clockTime).substring(0, 5);
				return [
					timeRule
				].join('');
			}

			function placeFormatter(value, row, index) {
				return ['<a class="place"  title="Place">', '<span id="place">地址详情</span>', '</a>  ', ].join('');
			}

			function banTypeFormatter(value, row, index) {
				var banType = row.type;
				if (Number(banType) == 1) {
					banType = "下班";
				} else {
					banType = "上班";
				}
				return [
					banType
				].join('');
			}

			function dakaFormatter(value, row, index) {
				var dakaVal = row.createTime;
				if (dakaVal == null) {
					dakaVal = "无";
				} else {
					dakaVal = dakaVal.substring(0, 5);
				}
				return [
					dakaVal
				].join('');
			}

			function statusFormatter(value, row, index) {
				var statusVal = row.status;
				if (statusVal == 0) {
					statusVal = "正常";
				} else if (statusVal == 1) {
					statusVal = "迟到";
				} else if (statusVal == 2) {
					statusVal = "早退";
				} else if (statusVal == -2) {
					statusVal = "漏打卡";
				} else if (statusVal == -3) {
					statusVal = "未开启打卡";
				} else if (statusVal == -1) {
					statusVal = "待打卡";
				}
				return [
					statusVal
				].join('');
			}
		}
	});
	cellStyle: function dakacellStyle(value, row, index) {
		if (row.status == 1 || row.status == 2) {
			return {
				css: {
					"color": "red"
				}
			};
		} else if (row.status == -2) {
			return {
				css: {
					"color": "green"
				}
			};
		} else {
			return {
				css: {
					"color": "#000"
				}
			};
		}
	}
	cellStyle: function statuscellStyle(value, row, index) {
		if (row.status == 1 || row.status == 2) {
			return {
				css: {
					"color": "red"
				}
			};
		} else if (row.status == -2) {
			return {
				css: {
					"color": "green"
				}
			};
		} else {
			return {
				css: {
					"color": "#000"
				}
			};
		}
	}
	window.placeEvents = {
		'click .place': function(e, value, row, index) {
			layer.open({
				type: 1,
				area: '800px',
				title: ['地址详情', 'font-size:18px;'],
				content: $('.addressDet'),
			});
			$('.addressDet').append("<p>" + row.place + "</p>");
			$('.layui-layer-close').click(function() {
				$('.addressDet p').remove();
			});
		}
	}
	// **************************************************考勤报表结束******************************************************
	// **************************************************企业文化设置开始******************************************************
	// *************************文化宣传**************************************************
	$('.qiyewenhua').click(function() {
		$('.wenhuaxuanchuan').slideToggle(200);
		$('.xiaolaba').slideToggle(200);
		$('.qiyegonggao').slideToggle(200);
		$('.qiyedream').slideToggle(200);
		looklaba()
	});
	$('.wenhuaxuanchuan').click(function() {
		lookPic()
		$(this).addClass('pcheck').siblings('p').removeClass('pcheck');
		$('.wenhuaXuanchuan').show().siblings('div').hide();
		picOption()
	});
	$('.btn-success').click(function() {
		$('.avatar-preview img').attr('class', 'pic');
		var titleInput = $('.pictitleInput').val();
		var urlInput = $('.pichttpInput').val();
		var sortInput = $('.picsortInput').val();
		var PGuid = data1.Guid;
		var comId = data1.companyId;
		var picDet = $('#c1 img')[1];
		var dataPic2 = $("#avatarInput")[0].files[0];
		var Picformdata = new FormData();
		Picformdata.append('title', titleInput);
		Picformdata.append('url', urlInput);
		Picformdata.append('sort', sortInput);
		Picformdata.append('userGuid', PGuid);
		Picformdata.append('file', dataPic2);
		Picformdata.append('companyId', comId);
		if ($('.pictitleInput').val().length == 0 || $('.pichttpInput').val().length == 0 || $('.picsortInput').val().length ==
			0) {
			layer.msg('标题、网址、排序必须填写', {
				time: 1000,
			});
		} else {
			$.ajax({
				type: 'post',
				url: '' + EQD_url + '/ComImage/Add_ComImage.ashx',
				data: Picformdata,
				cache: false,
				processData: false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
				contentType: false, // 不设置Content-type请求头
				success: function(data) {
					dataPic22 = JSON.parse(data)
					if (dataPic22.status == 200) {
						$('#avatar-modal').modal('hide');
						$('.pictitleInput').val(" ")
						$('.pichttpInput').val(" ")
						$('.picsortInput').val(" ")
						$('#c1 img').removeAttr('src')
						lookPic()
					} else {
						layer.msg(dataPic22.msg, {
							time: 1000,
						});
					}
				},
				error: function() {}
			});
		}
	});
	var dataPic;
	// 查看图片
	function formReset() {
		$('#avatar-modal').on('hidden.bs.modal', function() {
			$('.picsortInput').val('')
			$('.avatar-form').reset();
		})
	}

	function lookPic() {
		$.post('' + EQD_url + '/ComImage/Get_ComImage.ashx', {
			"companyId": data1.companyId
		}, function(data) {
			$('.piclist ul').find('li').remove();
			dataPic = JSON.parse(data);
			$('#PicTable').bootstrapTable({
				data: dataPic.items,
				columns: [{
					field: 'imageUrl',
					formatter: picFormatter
				}, {
					field: 'option',
					events: 'picEvents',
					formatter: picoptionFormatter
				}]
			});
			$("#PicTable").bootstrapTable('load', dataPic.items);
		});
	}

	function picFormatter(e, value, row, index) {
		var imgurl = value.imageUrl;
		return ['<img src=',
			imgurl, ' alt="暂无"/>',
		].join('');
	}

	function picoptionFormatter(e, value, row, index) {
		return ['<a class="removePic" id="removePic">', '<span id="PicDelete">删除</span>', '</a>',
			'<a class="picTihuan"  title="Picchange">', '<span id="picTihuan">编辑</span>', '</a>  ',
		].join('');
	};
	window.picEvents = {
		'click .removePic': function(e, value, row, index) {
			layer.open({
				type: 1,
				area: '800px',
				title: ['删除图片设置', 'font-size:18px;'],
				content: $('.detPicTable'),
				btn: '确定',
				// shade:false
			});
			$('.layui-layer-btn0').click(function() {
				$.post('' + EQD_url + '/ComImage/Delete_ComImage.ashx', {
					"userGuid": data1.Guid,
					"imageId": row.Id,
					"companyId": data1.companyId,
				}, function(data) {
					var dataDetpic = JSON.parse(data);
					if (dataDetpic.status == 200) {
						lookPic()
					}
				});
			});
		},
		'click .picTihuan': function(e, value, row, index) {
			$('#avatar-modal').modal('show');
			$('.avatar-save').hide();
			$('.picChange').show();
			$('.pictitleInput').val(row.title);
			$('.pichttpInput').val(row.Url);
			$('.picsortInput').val(row.sort);
			$('#c1 img').attr('src', row.imageUrl);
			$('.picChange').click(function() {
				var picChangetitle = $('.pictitleInput').val();
				var picChangehttp = $('.httpHead').val() + $('.pichttpInput').val();
				var picChangesort = $('.picsortInput').val();
				var PicGuid = row.creater;
				var comIdChange = row.companyId;
				var dataPicchange = $("#avatarInput")[0].files[0]
				var PicChangeformdata = new FormData();
				PicChangeformdata.append('title', picChangetitle);
				PicChangeformdata.append('url', picChangehttp);
				PicChangeformdata.append('sort', picChangesort);
				PicChangeformdata.append('userGuid', PicGuid);
				PicChangeformdata.append('file', dataPicchange);
				PicChangeformdata.append('companyId', comIdChange);
				PicChangeformdata.append('imageId', row.Id);
				if ($('.pictitleInput').val() == " " || $('.pichttpInput').val() == " " || $('.picsortInput').val() == " ") {
					layer.msg('标题、网址、排序必须填写', {
						time: 1000,
					});
				} else {
					$.ajax({
						type: 'post',
						url: '' + EQD_url + '/ComImage/Update_ComImage.ashx',
						data: PicChangeformdata,
						cache: false,
						processData: false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
						contentType: false, // 不设置Content-type请求头
						success: function(data) {
							datachange = JSON.parse(data)
							if (datachange.status == 200) {
								layer.msg("修改成功", {
									time: 1000,
								});
								lookPic()
								$('#avatar-modal').modal('hide');
								$('.pictitleInput').val(" ")
								$('.pichttpInput').val(" ")
								$('.picsortInput').val(" ")
							} else {
								layer.msg(datachange.msg, {
									time: 1000,
								});
							}
						}
					});
				}
			});
		}
	}
	var childPic;

	function removeChild() {
		childPic.remove();
	}

	function addChild() {
		childPic.append()
	}

	function picOption() {
		// 修改图片操作
		$('.addpicBtn').click(function() {
			$('#avatar-modal').modal('show');
			$('.picChange').hide();
			$('.avatar-save').show();
		});
		$('.httplink').click(function() {
			$(this).attr('href', $('.httpHead').val() + $('.pichttpInput').val());
		});
	}

	function loadPic() {
		setTimeout(function() {
			document.getElementById("wenhuaxuanchuan").click();
		}, 100);
	}
	// *************************文化宣传结束*********************************************
	// *************************小喇叭设置开始*********************************************
	$('.xiaolaba').click(function() {
		$(this).addClass('pcheck').siblings('p').removeClass('pcheck');
		$('.xiaolaBa').show().siblings('div').hide();
	});
	laydate.render({
		elem: '#testTime',
		min: 0,
	});
	$('#hourDetails').one('click', function() {
		$('#hourDetails option').remove()
		var myDate = new Date();
		var hours = myDate.getHours();
		for (var i = hours; i < 24; i++) {
			$('#hourDetails').append('<option value="' + i + '">' + i + '</option>')
		}
	});
	$('#minuteDetails').one('click', function() {
		$('#minuteDetails option').remove()
		var myDate2 = new Date();
		var minutes = myDate2.getMinutes();
		for (var i = minutes; i < 60; i++) {
			$('#minuteDetails').append('<option value="' + i + '">' + i + '</option>')
		}
	});
	$('.attention').click(function() {
		// $('.cover').show();
		$(this).attr('id', 'clicked').siblings('button').removeAttr('id');
		layer.open({
			type: 1,
			area: '600px',
			title: ['发布小喇叭', 'font-size:18px;'],
			content: $('.sendxiaolabaTable'),
			btn: '确定',
		});
		$('.layui-layer-close').click(function() {
			$('.sendxiaolabaTable textarea').val("")
		});
		$('.layui-layer-btn0').click(function() {
			if ($('.sendxiaolabaTable textarea').val().length > 0) {
				var setTime = $('#testTime').val() + " " + $('#hourDetails').val() + ":" + $('#minuteDetails').val();
				$('.cover').hide();
				$.post('' + EQD_url + '/trumpet/Push_trumpet.ashx', {
					"comid": data1.companyId,
					"userGuid": data1.Guid,
					"content": $('.sendxiaolabaTable textarea').val(),
					"pushTime": setTime,
					"lengthOfTime": $('#timeLimte').val()
				}, function(data) {
					var datalaBa = JSON.parse(data);
					if (datalaBa.status == 200) {
						$('.sendxiaolabaTable textarea').val("")
						$('#timeLimte').val(1)
						$('#testTime').val("")
						$('#hourDetails').val("")
						$('#minuteDetails').val("")
						looklaba()
						layer.msg('发布成功', {
							time: 1000,
						});
					}
				});
			} else {
				layer.msg('请输入小喇叭发布内容', {
					time: 1000,
				});
			}
		});
	});
	$('.lookxiaolaba').click(function() {
		$(this).attr('id', 'clicked').siblings('button').removeAttr('id');
		looklaba()
	});

	function looklaba() {
		$.post('' + EQD_url + '/trumpet/Get_Alltrumpet.ashx', {
			"comid": data1.companyId,
			"userGuid": data1.Guid,
		}, function(data) {
			var dataLaba = JSON.parse(data);
			$('#xiaolabashowTable').bootstrapTable({
				data: dataLaba.items,
				columns: [{
					field: 'createDate',
					title: '日期'
				}, {
					field: 'createTime',
					title: '时间',
					formatter: xiaolabaFormatter
				}, {
					field: 'content',
					title: '内容',
				}]
			});
			$("#xiaolabashowTable").bootstrapTable('load', dataLaba.items);
		});
	}

	function xiaolabaFormatter(e, value, row, index) {
		var arrT = value.createTime.split("T");
		var strT = arrT[1]
		var str2 = strT.split(".");
		var strlaba = str2[0];
		return [
			strlaba
		].join('');
	}
	// *************************小喇叭设置结束*********************************************
	// *************************企业公告设置开始*********************************************
	$('.qiyegonggao').click(function() {
		$(this).addClass('pcheck').siblings('p').removeClass('pcheck');
		$('.qiyeGonggao').show().siblings('div').hide();
		noticeLook(0, 0)
	});
	var noticeDepid = 0;
	var noticeObj2 = 0;
	laydate.render({
		elem: '#setTime2',
		type: 'datetime'
	});
	$('.notice').click(function() {
		$('.cover').show()
		noticeDepid = 0;
		noticeObj2 = 0;
		$('.noticeObj').val("全体员工")
		layer.open({
			type: 1,
			area: '900px',
			title: ['发布公告', 'font-size:18px;'],
			content: $('.sendnoticeTable'),
			shade: false
		});
		$('.layui-layer-close').click(function() {
			$(".cover").hide();
			$('.noticeUp input').val('');
			$('.noticeObj').val('全体员工');
			$('.noticeCycle').val('1小时之内');
			$('.noticeDetails').val('');
		});
		// 是否定时发送
		$('#setTime').click(function() {
			$('#setTime2').val("")
			if ($('#setTime').is(':checked')) {
				$('#setTime2').show()
			} else {
				$('#setTime2').hide()
			}
		});
	});
	$('.noticeObj').click(function() {
		layer.open({
			type: 1,
			area: ['250px', '500px'],
			title: ['选择部门', 'font-size:18px;'],
			content: $('.choosedepTable'),
			// shade:false,
			// zIndex:99999999,
		});
		$('span[id^=treeDemoChooseDep]').click(function() {
			console.log(G_treeNode)
			$('.noticeObj').val(G_treeNode.departName);
			noticeDepid = G_treeNode.departId;
			if ($('.noticeObj').val() == "全体员工") {
				noticeDepid = 0;
				noticeObj2 = 0;
			} else {
				noticeObj2 = 1;
			}
			layer.close(layer.index);
		});
	});
	$('.allWorker span').click(function() {
		$('.noticeObj').val($(this).text());
		noticeDepid = 0;
		noticeObj2 = 0;
		layer.close(layer.index);
	});
	var set = "false";
	var setTimeL;
	$('.subNotice').click(function() {
		if ($('.noticeTitle').val().length == 0 || $('.noticeTheme').val().length == 0 || $('.noticeDetails').val().length ==
			0) {
			layer.msg('请完善公告', {
				time: 1000,
			});
		} else {
			layer.closeAll()
			$(".cover").hide();
			if ($('#setTime').is(':checked')) {
				set = "true"
				setTimeL = $('#setTime2').val()
			} else {
				set = "false"
				setTimeL = ""
			}
			$.post('' + EQD_url + '/Notices/Add_Notice.ashx', {
				"companyId": data1.companyId,
				"isTimer": set,
				"noticeTime": setTimeL,
				"noticeName": $('.noticeTitle').val(),
				"objectType": noticeObj2,
				"objectDepartId": noticeDepid,
				"noticeTheme": $('.noticeTheme').val(),
				"noticeContent": $('.noticeDetails').val(),
				"userGuid": data1.Guid,
				"duty": " ",
				"noticeCycle": $('.noticeCycle').val(),
				"createDepartId": 0,
				"isAdmin": 1
			}, function(data) {
				var dataNotice = JSON.parse(data);
				if (dataNotice.status == 200) {
					noticeLook(0, 0)
					layer.msg('发布成功', {
						time: 1000,
					});
					$('.noticeUp input').val('');
					$('.noticeObj').val('全体员工');
					$('.noticeCycle').val('1小时之内');
					$('.noticeDetails').val('');
					$('.noticeTitle').val(0);
				}
			});
		}
	});
	var page

	function noticeLook(typezhi, page) {
		$.post('' + EQD_url + '/Notices/Get_Notice_ByCreater.ashx', {
			"userGuid": data1.Guid,
			"type": typezhi,
			"companyId": data1.companyId,
			"page": page,
			"notieName": $('#checkType').val()
		}, function(data) {
			// console.log( data )
			var dataNoticeList = JSON.parse(data);
			if (dataNoticeList.status == 200) {
				layer.msg('查看成功', {
					time: 1000,
				});
			}
			$('#noticelistTable').bootstrapTable({
				data: dataNoticeList.items.list,
				columns: [{
					field: 'name',
					title: '名称'
				}, {
					field: 'theme',
					title: '主题',
				}, {
					field: 'createTime',
					title: '创建时间',
				}, {
					field: 'noticeOption',
					title: '查看详情',
					formatter: noticeFormatter,
					events: noticeEvents
				}]
			});
			$("#noticelistTable").bootstrapTable('load', dataNoticeList.items.list);
		});
	}

	function noticeLook2(typezhi, page) {
		$.post('' + EQD_url + '/Notices/Get_Notice_ByCreater.ashx', {
			"userGuid": data1.Guid,
			"type": typezhi,
			"companyId": data1.companyId,
			"page": page,
			"notieName": $('#checkType').val()
		}, function(data) {
			var dataNoticeList = JSON.parse(data);
			if (dataNoticeList.status == 200) {
				layer.msg('查看成功', {
					time: 1000,
				});
			}
			$('#noticelistTable2').bootstrapTable({
				data: dataNoticeList.items.list,
				columns: [{
					field: 'name',
					title: '名称'
				}, {
					field: 'theme',
					title: '主题',
				}, {
					field: 'createTime',
					title: '创建时间',
				}, {
					field: 'noticeOption',
					title: '查看详情',
					formatter: noticeFormatter2,
					events: noticeEvents2
				}]
			});
			$("#noticelistTable2").bootstrapTable('load', dataNoticeList.items.list);
		});
	}

	$('.loadNotice').click(function() {
		$('#noticelistTable2').hide();
		$('#noticelistTable').show();
		$(this).attr('id', 'clicked').siblings('button').removeAttr('id');
		noticeLook(0, 0)
	});
	$('.agreeNotice').click(function() {
		$('#noticelistTable2').hide();
		$('#noticelistTable').show();
		$(this).attr('id', 'clicked').siblings('button').removeAttr('id');
		noticeLook(1, 0)
	});
	$('.refuseNotice').click(function() {
		$('#noticelistTable2').show();
		$('#noticelistTable').hide();
		$(this).attr('id', 'clicked').siblings('button').removeAttr('id');
		noticeLook2(2, 0)
	});

	function noticeFormatter(e, value, row, index) {
		return ['<a class="noticeMore"  title="Noticemore">', '<span id="noticeMore">查看详情</span>', '</a>  ', ].join('');
	}

	function noticeFormatter2(e, value, row, index) {
		return ['<a class="noticeMore"  title="Noticemore">', '<span id="noticeMore">查看详情</span>', '</a>  ', ].join('');
	}
	window.noticeEvents = {
		'click .noticeMore': function(e, value, row, index) {
//			layer.open({
//				type: 1,
//				area: '800px',
//				title: [' '],
//				content: $('.noticemoreTable'),
//			});
			window.open('./busDocument.html?noticeid='+row.id)
//			$.post('' + EQD_url + '/Notices/Get_Notice_ById.ashx', {
//				"noticeId": row.id,
//			}, function(data) {
//				// console.log( data )
//				var dataNoticed = JSON.parse(data)
//				var noticedyear = (dataNoticed.items.createTime).substring(0, 4);
//				var noticedyear2 = (dataNoticed.items.createTime).split("T")[0];
//				// var noticedLast = (dataNoticed.items.noticeCode).substring(4);
//				if (dataNoticed.items.objectType == 0) {
//					var noticedObj = "全体员工"
//				} else {
//					noticedObj = dataNoticed.items.department;
//				}
//				if (dataNoticed.items.noticeName == "公告") {
//					var thisType = "特此公告"
//				} else if (dataNoticed.items.noticeName == "通知") {
//					thisType = "特此通知"
//				} else {
//					thisType = "特此通告"
//				}
//				var NcreateTime = (noticedyear2).replace(/\//g, "-");
//				$('.noticemoreTable .noticedName').text(dataNoticed.items.noticeName);
//				$('.noticemoreTable .noticedCreater').text(dataNoticed.items.simpleCompanyName);
//				$('.noticemoreTable .noticedYear').text(noticedyear);
//				$('.noticemoreTable .noticedCode').text(dataNoticed.items.noticeCode);
//				$('.noticemoreTable .noticedTheme').text(dataNoticed.items.noticeTheme);
//				$('.noticemoreTable .noticedPeople').text(noticedObj);
//				$('.noticemoreTable .noticedContent').text(dataNoticed.items.noticeContent);
//				$('.noticemoreTable .signer').text(dataNoticed.items.checkerName);
//				$('.noticemoreTable .noticedcreateTime span').eq(1).text(NcreateTime);
//				$('.noticemoreTable .noticedcreateTime span').eq(0).text(thisType);
//			});
		}
	}
	window.noticeEvents2 = {
		'click .noticeMore': function(e, value, row, index) {
			layer.open({
				type: 1,
				area: '800px',
				title: [' '],
				content: $('.noticemoreTable2'),
			});
			$.post('' + EQD_url + '/Notices/Get_Notice_ById.ashx', {
				"noticeId": row.id,
			}, function(data) {
				// console.log( data )
				var dataNoticed = JSON.parse(data)
				var noticedyear = (dataNoticed.items.createTime).substring(0, 4);
				var noticedyear2 = (dataNoticed.items.createTime).split("T")[0];
				// var noticedLast = (dataNoticed.items.noticeCode).substring(4);
				if (dataNoticed.items.objectType == 0) {
					var noticedObj = "全体员工"
				} else {
					noticedObj = dataNoticed.items.department;
				}
				if (dataNoticed.items.noticeName == "公告") {
					var thisType = "特此公告"
				} else if (dataNoticed.items.noticeName == "通知") {
					thisType = "特此通知"
				} else {
					thisType = "特此通告"
				}
				var NcreateTime = (noticedyear2).replace(/\//g, "-");
				$('.noticemoreTable2 .noticedName').text(dataNoticed.items.noticeName);
				$('.noticemoreTable2 .noticedCreater').text(dataNoticed.items.simpleCompanyName);
				$('.noticemoreTable2 .noticedYear').text(noticedyear);
				$('.noticemoreTable2 .noticedCode').text(dataNoticed.items.noticeCode);
				$('.noticemoreTable2 .noticedTheme').text(dataNoticed.items.noticeTheme);
				$('.noticemoreTable2 .refuseAson').text(dataNoticed.items.checkMessage);
				$('.noticemoreTable2 .noticedPeople').text(noticedObj);
				$('.noticemoreTable2 .noticedContent').text(dataNoticed.items.noticeContent);
				$('.noticemoreTable2 .signer').text(dataNoticed.items.checkerName);
				$('.noticemoreTable2 .noticedcreateTime span').eq(1).text(NcreateTime);
				$('.noticemoreTable2 .noticedcreateTime span').eq(0).text(thisType);
			});
		}
	}
	// *************************企业公告设置结束*********************************************
	// *************************企业愿景设置开始*********************************************
	// *************************企业愿景设置结束*********************************************
	// **************************************************企业文化设置结束******************************************************// **************************************************培训管理设置开始******************************************************//
	$('.peixunManger').click(function() {
		$('.peixunPlan').slideToggle(200);
		$('.peixunAttention').slideToggle(200);
		$('.coursePlan').slideToggle(200);
		$('.peixunDemand').slideToggle(200);
	});
	// *************************培训需求设置开始***********
	$('.peixunDemand').click(function() {
		$(this).addClass('pcheck').siblings('p').removeClass('pcheck');
		$('.peiXunDemand').show().siblings('div').hide();
		loadDemand(0)
	});
	// 添加需求
	$('.addApplyBtn2').click(function() {
		window.open("../html/addDemand.html")
	});
	// 加载需求列表
	function loadDemand(page) {
		$.post('' + EQD_url + '/Training/Get_trainingDemands.ashx', {
			"userGuid": data1.Guid,
			"pageNumber": page,
			"comid": data1.companyId
		}, function(data) {
			var dataDemand = JSON.parse(data);
			loadDemandTable(dataDemand.items)
		});
	}
	// 加载需求表格
	function loadDemandTable(data) {
		$('#demandTable').bootstrapTable({
			data: data,
			columns: [{
				field: 'theTheme',
				title: '主题',
				align: 'center',
				valign: 'middle',
			}, {
				field: 'theCategory',
				title: '类别',
				align: 'center',
				valign: 'middle',
			}, {
				field: 'budgetedExpense',
				title: '预算(元)',
				align: 'center',
				valign: 'middle',
			}, {
				field: 'theplace',
				title: '地点',
				align: 'center',
				valign: 'middle',
			}, {
				field: 'createTime',
				title: '发起时间',
				align: 'center',
				valign: 'middle',
				formatter: demandTimeFormatter
			}, {
				field: 'option',
				title: '操作',
				align: 'center',
				valign: 'middle',
				formatter: demandOptionFormatter,
				events: demandOptionEvents
			}, ]
		});
		$("#demandTable").bootstrapTable('load', data);

		function demandTimeFormatter(e, value, row, index) {
			var time = value.createTime.split("T")[0]
			return [
				time
			].join('');
		}

		function demandOptionFormatter(e, value, row, index) {
			return ['<a class="demandDetails" title="查看详情">', '<span id="demandDetails">详情</span>', '</a>', ].join('');
		}
	}
	window.demandOptionEvents = {
		'click .demandDetails': function(e, value, row, index) {
			window.open("http://www.jinshiku.com/html/lookDemandList.html?id=" + row.id + "")
		}
	}
	// *************************培训需求设置结束***********
	// *************************课程计划设置开始***********
	// 删除课程类别操作
	function removeByValue(arr, val) {
		for (var i = 0; i < arr.length; i++) {
			if (arr[i] == val) {
				arr.splice(i, 1);
				break;
			}
		}
	}
	$('.coursePlan').click(function() {
		$(this).addClass('pcheck').siblings('p').removeClass('pcheck');
		$('.coursePlanDiv').show().siblings('div').hide();
		loadCourse(0)
	});
	// 查看课程
	function loadCourse(page) {
		$.post('' + EQD_url + '/Courses/Get_Course_ByUser.ashx', {
			"userGuid": data1.Guid,
			"pageNumber": page
		}, function(data) {
			var dataCourse = JSON.parse(data);
			console.log(dataCourse)
			loadcoursePlan(dataCourse)
		});
	}

	function loadcoursePlan(data) {
		var dataCourse = data;
		$('#lookCoursrTable').bootstrapTable({
			data: dataCourse.items.rows,
			columns: [{
				field: 'createName',
				title: '发起人',
				align: 'center',
				valign: 'middle',
			}, {
				field: 'courseTheme',
				title: '课程主题',
				align: 'center',
				valign: 'middle',
			}, {
				field: 'courseType',
				title: '课程类型',
				align: 'center',
				valign: 'middle',
			}, {
				field: 'lectureName',
				title: '讲师',
				align: 'center',
				valign: 'middle',
			}, {
				field: 'objecter',
				title: '课程对象',
				align: 'center',
				valign: 'middle',
			}, {
				field: 'courseTimes',
				title: '时长',
				align: 'center',
				valign: 'middle'
			}, {
				field: 'Costbudget',
				title: '预算(元/天)',
				align: 'center',
				valign: 'middle'
			}, {
				field: 'option',
				title: '详情',
				align: 'center',
				valign: 'middle',
				formatter: courseFormatter,
				events: courseDetEvents
			}]
		});
		$("#lookCoursrTable").bootstrapTable('load', dataCourse.items.rows);

		function courseFormatter(e, value, row, index) {
			return ['<a class="courseDelete" id="courseDelete">', '<span id="courseDelete">删除</span>', '</a>',
				'<a class="courseDet" id="courseDet">', '<span id="courseDet2">详情</span>', '</a>',
			].join('');
		}
	}
	// 查看课程计划详情
	window.courseDetEvents = {
		'click .courseDet': function(e, value, row, index) {
			layer.open({
				type: 1,
				area: ['800px', '500px'],
				title: ['查看课程详情', 'font-size:18px;'],
				content: $('.lookCourseDiv'),
			});
			$.post('' + EQD_url + '/Courses/Get_CourseById.ashx', {
				"courseId": row.Id
			}, function(data) {
				var dataCoursePlan = JSON.parse(data);
				$('.coursePlanTheme').text(dataCoursePlan.items.courseTheme)
				$('.coursePlanTeacher').text(dataCoursePlan.items.LectureRealName)
				$('.coursePlanTime').text(dataCoursePlan.items.courseTimes)
				$('.coursePlanCost').text(dataCoursePlan.items.Costbudget)
				$('.coursePlanType').text(dataCoursePlan.items.courseType)
				$('.coursePlanObj').text(dataCoursePlan.items.objecter)
				$('.coursePlanCreator').text(dataCoursePlan.items.createrName)
				$('#coursePlanTeaInfo').val(dataCoursePlan.items.LectureIntroduce)
				$('#courseLine').html(dataCoursePlan.items.courseOutlint)
			});
		},
		'click .courseDelete': function(e, value, row, index) {
			layer.open({
				type: 1,
				area: '400px',
				title: ['删除课程', 'font-size:18px;'],
				content: $('.courseDeleted'),
				btn: "确定",
			});
			$('.layui-layer-btn0').click(function() {
				$.post('' + EQD_url + '/Courses/Delete_Course.ashx', {
					"userGuid": data1.Guid,
					"courseId": row.Id
				}, function(data) {
					var dataCourseDel = JSON.parse(data);
					if (dataCourseDel.status == 200) {
						layer.msg('删除成功', {
							time: 1000,
						});
						loadCourse(0)
					}
				});
			});
		}
	}
	// 搜索课程计划
	function searchCoursePlan(page) {
		$.post('' + EQD_url + '/Courses/Get_Course_BySearch.ashx  ', {
			"para": $('#searchArea input').val(),
			"page": page
		}, function(data) {
			var dataCoursePlanSearch = JSON.parse(data)
			if (dataCoursePlanSearch.status == 200) {
				loadcoursePlan(dataCoursePlanSearch)
			}
		});
	}
	$('#searchArea input').keydown(function() {
		if (event.keyCode === 13) {
			if ($('#searchArea input').val().length == 0) {
				layer.msg('请输入搜索内容', {
					time: 1000,
				});
			} else {
				searchCoursePlan(0)
			}
		}
	});
	$('.searchCoursePlanBtn').click(function() {
		if ($('#searchArea input').val().length == 0) {
			layer.msg('请输入搜索内容', {
				time: 1000,
			});
		} else {
			searchCoursePlan(0)
		}
	});
	// 添加课程
	$('.addCourse').click(function() {
		layer.open({
			type: 1,
			area: ['1000px', '500px'],
			title: ['添加课程', 'font-size:18px;'],
			content: $('.addCourseDiv'),
			btn: '确定',
			yes: function(index, layero) {
				if ($('.courseChoose').val().length == 0 || $('.courseTheme').val().length == 0 || $('.courseTime').val().length ==
					0 || $('#LectureIntroduceInput').val() == "" || editor3.txt.text().length == 0 || $('#courseForm').val() ==
					"" || $('#teacherForm').val() == "" || $('.LectureRealName').val().length == 0 || $('.Costbudget').val().length ==
					0) {
					layer.msg('请完善信息', {
						time: 1000,
					});
				} else {
					ajaxFileUpload()
				}
			}
		});
	});
	var str_label2 = "";
	var arr_label2 = [];
	$('.courseChoose').click(function() {
		layer.open({
			type: 1,
			area: ['800px', '400px'],
			title: ['研究领域', 'font-size:18px;text-align: center;'],
			content: $('.videoLabelTable'),
			btn: '确定',
			yes: function(index, layero) {
				for (var i = 0; i < arr_label2.length; i++) {
					str_label2 += arr_label2[i] + ","
				}
				var labelArea = str_label2.substring(0, Number(str_label2.length) - 1)
				$('.courseChoose').val($('#labelInfo').val());
				arr_label2 = [];
				$('#labelInfo').val("");
				$("input:checkbox[name='label']").removeAttr('checked');
				layer.close(layer.index);
			}
		});
		$.post('' + EQD_url + '/Option_AreasAnd.ashx', {
			"type": 45
		}, function(data) {
			if ($('.videoLabelLeft p').length == 0) {
				for (var i = 0; i < data.length; i++) {
					$('.videoLabelLeft').append('<p class="' + i + '">' + data[i].name + '</p>');
					$('.videoLabelLeft').children('p').eq(0).attr('id', 'firstP');
					document.getElementById('firstP').click();
					$('.videoLabelLeft .' + i + '').click(function() {
						$(this).css('backgroundColor', 'red').siblings('p').css('backgroundColor', '#29e');
						var m = $(this).attr('class');
						$('.videoLabelRight span').remove();
						for (var j = 0; j < data[m].sub.length; j++) {
							$('.videoLabelRight').append('<span><input type="checkbox" value="' + data[m].sub[j].name +
								'" name="label">' + data[m].sub[j].name + '</span>')
						}
						$("input:checkbox[name='label']").click(function() {
							var aaa = $(this).prop("checked");
							if (aaa === true) {
								if (arr_label2.length > 4) {
									layer.msg('最多选择5个', {
										time: 1000,
									});
									$(this).removeAttr('checked')
									removeByValue(arr_label2, $(this).val());
								} else {
									arr_label2.push($(this).val())
									$('#labelInfo').val(arr_label2)
								}
							} else {
								removeByValue(arr_label2, $(this).val());
								$('#labelInfo').val(arr_label2)
							}
						});
					});
				}
			} else {}
			$('.layui-layer-close').click(function() {
				$("input:checkbox[name='label']").removeAttr('checked');
				arr_label2 = [];
				$('#labelInfo').val("");
			});
		})
	});
	//选择培训对象
	var depId, depName;
	$('.matchObjInput').click(function() {
		layer.open({
			type: 1,
			area: ['200px', '400px'],
			title: ['选择部门', 'font-size:18px;text-align: center;'],
			content: $('.departmentTable'),
			btn: '确定',
			// shade: false
		});
		$.post('' + EQD_url + '/User_getcompost.ashx', {
			"comid": data1.companyId,
			"userGuid": data1.Guid
		}, function(data) {
			var dataDepart = JSON.parse(data);
			$('#departmentTable').bootstrapTable({
				data: dataDepart.items,
				columns: [{
					check: 'checkbox',
					title: '请选择'
				}, {
					field: 'name',
					title: '部门名称',
				}]
			});
			$("#departmentTable").bootstrapTable('load', dataDepart.items);
		});
		$('.layui-layer-btn0').click(function(event) {
			$('.cover').hide();
			var arr_depname = "";
			var arr_depid = "";
			for (var i = 0; i < ($('#departmentTable').bootstrapTable('getAllSelections')).length; i++) {
				arr_depid += $('#departmentTable').bootstrapTable('getAllSelections')[i].id + ",";
				arr_depname += $('#departmentTable').bootstrapTable('getAllSelections')[i].name + ",";
			}
			depName = (arr_depname).substring(0, Number(arr_depname.length) - 1);
			depId = (arr_depid).substring(0, Number(arr_depid.length) - 1);
			$('.matchObjInput').val(depName)
		});
		$('.layui-layer-close').click(function() {
			$('.cover').hide();
		});
	});

	function ajaxFileUpload() {
		var Pformdata = new FormData();
		var dataFile = $("#file")[0].files;
		Pformdata.append('userGuid', data1.Guid);
		Pformdata.append('companyId', data1.companyId);
		Pformdata.append('courseType', $('.courseChoose').val());
		Pformdata.append('courseTheme', $('.courseTheme').val());
		Pformdata.append('courseTimes', $('.courseTime').val());
		Pformdata.append('LectureIntroduce', $('#LectureIntroduceInput').val());
		Pformdata.append('courseOutlint', editor3.txt.html());
		Pformdata.append('sourceCourse', 2);
		Pformdata.append('objecter', depName);
		Pformdata.append('Sourcelecturer', $('#teacherForm').val());
		Pformdata.append('Lecture', "");
		Pformdata.append('TrainingId', 0);
		Pformdata.append('MatchType', 1);
		Pformdata.append('MatchIds', depId);
		Pformdata.append('Costbudget', $('.Costbudget').val());
		Pformdata.append('LectureRealName', $('.LectureRealName').val());
		for (var i = 0; i < dataFile.length; i++) {
			Pformdata.append('Task', dataFile[i]);
		}
		$.ajax({
			type: 'post',
			url: '' + EQD_url + '/Courses/Add_Course.ashx',
			data: Pformdata,
			cache: false,
			processData: false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
			contentType: false, // 不设置Content-type请求头
			success: function(data) {
				var data2 = JSON.parse(data)
				if (data2.status == 200) {
					$('#addCourseForm input').val("");
					$('#LectureIntroduceInput').val("");
					$('#teacherForm').val(0);
					editor3.txt.clear()
					layer.closeAll();
					loadCourse(0)
				}
			},
			error: function() {}
		});
	}
	// **********************************添加课程*******************************************
	function lookPlan(Num) {
		var typeNum = Num;
		$.post('' + EQD_url + '/Training/Get_trainingPlanList.ashx', {
			"userGuid": data1.Guid,
			"comid": data1.companyId,
			"type": typeNum
		}, function(data) {
			var dataPlan = JSON.parse(data);
			layer.msg('查询成功', {
				time: 1000,
			});
			$('#peixunPlanTable').bootstrapTable({
				data: dataPlan.items,
				columns: [{
					field: 'theTheme',
					title: '主题',
				}, {
					field: 'theCategory',
					title: '种类',
				}, {
					field: 'publishTime',
					title: '开始时间',
					formatter: pubFormatter
				}, {
					field: 'completionRate',
					title: '完成率',
					formatter: beginFormatter
				}, {
					field: 'option',
					title: '详情',
					formatter: planOFormatter,
					events: planDetEvents
				}]
			});
			$("#peixunPlanTable").bootstrapTable('load', dataPlan.items);

			function pubFormatter(e, value, row, index) {
				if (value.publishTime == null) {
					var pubTime = "暂无"
				}
				return [
					pubTime
				].join('');
			}

			function beginFormatter(e, value, row, index) {
				if (value.completionRate == "") {
					var showTime = "暂无"
				}
				return [
					showTime
				].join('');
			}

			function planOFormatter(e, value, row, index) {
				return ['<a class="planDet" id="planDet">', '<span id="planDet2">详情</span>', '</a>', ].join('');
			}
		});
		window.planDetEvents = {
			'click .planDet': function(e, value, row, index) {
				layer.open({
					type: 1,
					area: '800px',
					title: ['查看培训计划列表详情', 'font-size:18px;'],
					content: $('.planMore'),
				});
				$.post('' + EQD_url + '//Training/Get_trainingPlanDetail.ashx', {
					"userGuid": data1.Guid,
					"comid": data1.companyId,
					"planId": row.id
				}, function(data) {
					var planDetails = JSON.parse(data);
					var Stime = (planDetails.items.theTrainTime).split("~")[0];
					var Etime = (planDetails.items.theTrainTime).split("~")[1];
					$('.theCategory').text(planDetails.items.theCategory)
					$('.theTheme').text(planDetails.items.theTheme)
					$('.trainees').text(planDetails.items.trainees)
					$('.teacherName').text(planDetails.items.teacherName)
					$('.budgetedExpense').text(planDetails.items.budgetedExpense)
					$('.learningModality').text(planDetails.items.learningModality)
					$('.receTrainDepName').text(planDetails.items.receTrainDepName)
					$('.TrainTimeS').text(Stime)
					$('.TrainTimeE').text(Etime)
				});
			}
		}
	}
	// *************************培训计划设置开始***********
	$('.peixunPlan').click(function() {
		$(this).addClass('pcheck').siblings('p').removeClass('pcheck');
		$('.peiXunPlan').show().siblings('div').hide();
		lookPlan(0);
	});
	$("#chooseDetail").change(function() {
		// 添加培训计划
		var lookType = $(this).val();
		lookPlan(lookType)
	});
	var choosePostId, chooseCourseId;
	$('.addPlan').click(function() {
		$('.shouxunObj').val("")
		layer.open({
			type: 1,
			area: '800px',
			title: ['添加培训计划', 'font-size:18px;'],
			content: $('.addplanTable'),
			btn: '确定',
			// shade:false
		});
		$('.layui-layer-btn0').click(function() {
			if ($('.teaName').val().length == 0) {
				tName = " "
			} else {
				tName = $('.teaName').val()
			}
			$.post('' + EQD_url + '/Training/Add_trainingPlan.ashx', {
				"userGuid": data1.Guid,
				"comid": data1.companyId,
				"theCategory": $('#getList1').val(),
				"theTheme": $('.shouxunTheme').val(),
				"trainees": $('.shouxunObj').val(),
				"personNumber": $('.shouxunNum').val(),
				"teacherName": tName,
				"teacherGuid": ' ',
				"budgetedExpense": $('.shouxunExperxe').val(),
				"theTrainTime": $('#testB').val() + "~" + $('#testE').val(),
				"betrainedPostId": choosePostId,
				"courseId": chooseCourseId,
				"learningModality": $('#typeshouxun').val()
			}, function(data) {
				var dataShouxun = JSON.parse(data);
				if (dataShouxun.status == 200) {
					$('#addPlan input').val("");
					$('#addPlan select').val(0);
					lookPlan(0)
				}
			});
		})
		$(".layui-layer-close").click(function() {
			$('#addPlan input').val("");
			$('#addPlan select').val(0);
		});
	});
	$('#getList1').click(function() {
		layer.open({
			type: 1,
			area: ['600px', '350px'],
			title: ['选择课程计划', 'font-size:18px;'],
			content: $('.choosePlanType'),
			btn: '确定',
		});
		loadcoursePlan2(0)
	});
	$('#searchMinval').keydown(function() {
		if (event.keyCode === 13) {
			if ($('#searchMinval').val().length == 0) {
				layer.msg('请输入搜索内容', {
					time: 1000,
				});
			} else {
				$.post('' + EQD_url + '/Courses/Get_Course_BySearch.ashx  ', {
					"page": 0,
					"para": $('#searchMinval').val(),
				}, function(data) {
					var dataMinSearch = JSON.parse(data)
					loadcoursePlanMin(dataMinSearch)
				});
			}
		}
	});
	$('.searchCoursePlanBtnMin').click(function() {
		if ($('#searchMinval').val().length == 0) {
			layer.msg('请输入搜索内容', {
				time: 1000,
			});
		} else {
			$.post('' + EQD_url + '/Courses/Get_Course_BySearch.ashx  ', {
				"page": 0,
				"para": $('#searchMinval').val(),
			}, function(data) {
				// console.log( data )
				var dataMinSearch2 = JSON.parse(data)
				loadcoursePlanMin(dataMinSearch2)
			});
		}
	});
	$("#chooseplanTable").on('click-row.bs.table', function(e, row, $element) {
		$('#getList1').val(row.courseType)
		$('.shouxunTheme').val(row.courseTheme)
		$('.teaName').val(row.lectureName)
		$('.shouxunObj').val(row.posts)
		$('.shouxunExperxe').val(row.Costbudget)
		choosePostId = row.postIds;
		chooseCourseId = row.Id
		layer.close(layer.index);
	})
	// 查看课程计划
	function loadcoursePlan2(page) {
		$.post('' + EQD_url + '/Courses/Get_Course_ByUser.ashx', {
			"userGuid": data1.Guid,
			"pageNumber": page
		}, function(data) {
			var dataCourse2 = JSON.parse(data);
			loadcoursePlanMin(dataCourse2)
		});
	}
	// 选择课程计划
	function loadcoursePlanMin(data) {
		var dataCourse = data;
		$('#chooseplanTable').bootstrapTable({
			data: dataCourse.items.rows,
			columns: [{
				field: 'courseTheme',
				title: '课程主题',
				align: 'center',
				valign: 'middle',
			}, {
				field: 'courseType',
				title: '课程类型',
				align: 'center',
				valign: 'middle',
			}]
		});
		$("#chooseplanTable").bootstrapTable('load', dataCourse.items.rows);
	}
	laydate.render({
		elem: '#testB',
		type: 'datetime'
	});
	laydate.render({
		elem: '#testE',
		type: 'datetime'
	});
	// ******************************************培训计划结束******************************************
	// ******************************************培训通知开始******************************************
	laydate.render({
		elem: '#testG',
		type: 'datetime'
	});
	$('.peixunAttention').click(function() {
		$(this).addClass('pcheck').siblings('p').removeClass('pcheck');
		$('.peiXunAttention').show().siblings('div').hide();
		loadpeixunAttention(0)
	});

	function loadpeixunAttention(page) {
		$.post('' + EQD_url + '//Training/Get_trainNoticeList.ashx', {
			"userGuid": data1.Guid,
			"type": 1,
			"page": page
		}, function(data) {
			var dataAttention = JSON.parse(data);
			$('#peixunAttentionTable').bootstrapTable({
				data: dataAttention.items,
				columns: [{
					field: 'theTheme',
					title: '主题',
					valign: 'middle',
					align: 'center',
				}, {
					field: 'teacherName',
					title: '讲师姓名',
					valign: 'middle',
					align: 'center',
				}, {
					field: 'receTrainDepName',
					title: '主办部门',
					valign: 'middle',
					align: 'center',
				}, {
					field: 'trainees',
					title: '受训职位',
					valign: 'middle',
					align: 'left',
				}, {
					field: 'theplace',
					title: '培训地点',
					valign: 'middle',
					align: 'center',
				}, {
					field: 'createTime',
					title: '开始时间',
					formatter: timeAttentionFormatter,
					valign: 'middle',
					align: 'center',
				}, {
					field: 'option',
					title: '详情',
					valign: 'middle',
					align: 'center',
					formatter: attentionFormatter,
					events: attentionDetEvents
				}]
			});
			$("#peixunAttentionTable").bootstrapTable('load', dataAttention.items);

			function timeAttentionFormatter(e, value, row, index) {
				var timeAttention = value.createTime.split("T")[0];
				return [
					timeAttention
				].join('');
			}

			function attentionFormatter(e, value, row, index) {
				return ['<a class="attentionDet" id="attentionDet">', '<span id="attentionDet2">详情</span>', '</a>', ].join('');
			}
		});
		window.attentionDetEvents = {
			'click .attentionDet': function(e, value, row, index) {
				layer.open({
					type: 1,
					area: ['800px', '500px'],
					title: ['查看培训通知列表详情', 'font-size:18px;'],
					content: $('.lookattentionTable'),
				});
				$.post('' + EQD_url + '//Training/Get_trainNoticeDetail.ashx', {
					"comid": data1.companyId,
					"userGuid": data1.Guid,
					"noticeId": row.id
				}, function(data) {
					var dataAttentionDet = JSON.parse(data)
					var lookCreataTime = dataAttentionDet.items.createTime.split("T")[0];
					$('.lookTheme').text(dataAttentionDet.items.theTheme)
					$('.lookcomName').text(dataAttentionDet.items.comName)
					$('.lookteaName').text(dataAttentionDet.items.teacherName)
					$('.lookPost').text(dataAttentionDet.items.trainees)
					$('.lookraceDepart').text(dataAttentionDet.items.receTrainDepName)
					$('.lookPerson').text(dataAttentionDet.items.respoPersonName)
					$('.lookAddress').text(dataAttentionDet.items.theplace)
					$('.lookTime').text(lookCreataTime)
					$('.teaInfo').html(dataAttentionDet.items.teacherInfo)
					$('.courseMain').html(dataAttentionDet.items.aSyllabus);
					// 通知时间显示
					$('#noticeTime div').remove();
					for (var i = 0; i < dataAttentionDet.items.theTrainTime.length; i++) {
						// var signBegin = dataAttentionDet.items.theTrainTime[i].signStartTime.replace('T', ' ');
						$('#noticeTime').append('<div class="pull-left"><p><span>培训时间</span><span>' + dataAttentionDet.items.theTrainTime[
								i].theTrainTime + '</span></p><p><span>签到时间</span><span>' + dataAttentionDet.items.theTrainTime[i].signStartTime +
							'</span></p><p><span>签退时间</span><span>' + dataAttentionDet.items.theTrainTime[i].signLaunchTime +
							'</span></p><p><span>上课时间</span><span>' + dataAttentionDet.items.theTrainTime[i].courseStartTime +
							'</span></p><p><span>下课时间</span><span>' + dataAttentionDet.items.theTrainTime[i].courseEndTime +
							'</span></p></div>');
					}
				});
			}
		}
	}
	// ******************************************培训通知结束******************************************
	// ******************************************添加培训通知开始******************************************
	var peixunManGuid, peixunDepaerId, teaGuid, newRow, dataPlanDet;
	$('.addAttention').click(function() {
		layer.open({
			type: 1,
			area: ['900px', '500px'],
			title: ['添加培训通知', 'font-size:18px;'],
			content: $('.addattentionTable'),
			btn: '确定',
		});
		$('.layui-layer-btn0').click(function() {
			if ($('.peixunAddress').val().length == 0 || $('.peixunTea').val().length == 0 || $('.lanchTime').val().length ==
				0 || $('.peixunTime').val().length == 0 || $('.peixunDepartment').val().length == 0 || $('.peixunMan').val().length ==
				0 || editor.txt.html().length == 0 || editor2.txt.html().length == 0) {
				layer.msg('请完善信息', {
					time: 1000,
				});
			} else {
				$.post('' + EQD_url + '/Training/Add_trainingNotice.ashx', {
					"userGuid": data1.Guid,
					"comid": data1.companyId,
					"thePlanId": newRow,
					"theplace": $('.peixunAddress').val(),
					"teacherGuid": teaGuid,
					"teacherName": $('.peixunTea').val(),
					"teacherInfo": editor.txt.html(),
					"aSyllabus": editor2.txt.html(),
					"presetReleaseTime": $('.lanchTime').val(),
					"theTrainTime": $('.peixunTime').val(),
					"hostdepId": peixunDepaerId,
					"hostdepName": $('.peixunDepartment').val(),
					"respoPerson": peixunManGuid,
					"respoPersonName": $('.peixunMan').val()
				}, function(data) {
					var addDataPeixun = JSON.parse(data);
					if (addDataPeixun.status == 200) {
						layer.msg('添加成功', {
							time: 1000,
						});
						$('#addAttention label input').val("");
						editor.txt.clear()
						editor2.txt.clear()
						loadpeixunAttention(0)
					} else {
						layer.msg(addDataPeixun.msg, {
							time: 1000,
						});
					}
				});
			}
		});
	});
	// 选择培训主题
	$('.peixunTitle').click(function() {
		layer.open({
			type: 1,
			area: ['400px', '280px'],
			title: ['培训题目', 'font-size:18px;'],
			content: $('.peixunThemeTable'),
			shade: false
		});
		$.post('' + EQD_url + '/Training/Get_trainingPlanList.ashx', {
			"userGuid": data1.Guid,
			"comid": data1.companyId,
			"type": 0
		}, function(data) {
			var dataLookPlan = JSON.parse(data)
			$('#minPlanTable').bootstrapTable({
				data: dataLookPlan.items,
				columns: [{
					field: 'theTheme',
					valign: 'middle',
					align: 'center',
				}]
			});
			$("#minPlanTable").bootstrapTable('load', dataLookPlan.items);
		});
	});
	$("#minPlanTable").on('click-row.bs.table', function(e, row, $element) {
		newRow = row.id;
		$.post('' + EQD_url + '/Training/Get_trainingPlanDetail.ashx', {
			"userGuid": data1.Guid,
			"comid": data1.companyId,
			"planId": newRow
		}, function(data) {
			dataPlanDet = JSON.parse(data);
			teaGuid = dataPlanDet.items.teacherGuid
			$('.peixunTitle').val(dataPlanDet.items.theTheme)
			$('.peixunNum').val(dataPlanDet.items.personNumber)
			$('.peixunTea').val(dataPlanDet.items.teacherName)
			$('.peixunObj').val(dataPlanDet.items.trainees)
			$('.peixunTheme').val(dataPlanDet.items.theCategory);
			$('.peixunTime').val(dataPlanDet.items.theTrainTime);
			// $('.peixunDepartment').val(dataPlanDet.items.theTrainTime);
			layer.close(layer.index);
		});
	})
	// 选择培训部门
	$('.peixunDepartment').click(function() {
		layer.open({
			type: 1,
			area: '250px',
			title: ['选择部门', 'font-size:18px;'],
			content: $('.choosedepartmentTable2'),
			shade: false
		});
		$('span[id^=peixunChooseDep]').click(function() {
			peixunDepaerId = G_treeNode.departId
			$('.peixunDepartment').val(G_treeNode.departName);
			layer.close(layer.index);
		})
	});
	// 选择培训负责人
	$('.peixunMan').click(function() {
		$.session.set('TGHY_set', '5');
		layer.open({
			type: 1,
			area: '800px',
			title: ['选择负责人', 'font-size:18px;'],
			content: $('.editNotice'),
			shade: false
		});
		renyuanLook();
	});
	// ******************************************添加培训通知结束******************************************
	// **************************************************培训管理设置结束******************************************************
	// *******************权限设置**************************
	var dataQuanxian, rowdets;
	var this_type;
	var this_id;
	var pagePeople = 0;
	// 权限设置（动态）
	var num9=0
	function setTable(data) {
		// 不包括最高领导和人事权限,
		// 页面显示表
		var num10=data.length
		$(".setApprove").bootstrapTable({
			data: data,
			classes: "table-no-bordered",
			columns: [{
				valign: 'middle',
				formatter: setApr
			}, {
				valign: 'middle',
				formatter: setPer
			}, {
				valign: 'middle',
				formatter: setOpt,
				events: setThis
			}]
		});
		function setApr(e, value, row, index) {
			return '<span>' + value.type + '审批人 </span>'
		};
		
		function setPer(e, value, row, index){
			if(num9<num10){
				$.post('' + EQD_url + '/Com/Com_User_ByCompany.ashx', {
					"companyId": data1.companyId,
					"page": "0"
				}, function(data) {
					var data1 =JSON.parse(data)
					var len=data1.items.BusinessCardList
					for(var i=0;i<len.length;i++){
						if(len[i].upname!==value.uname){
							var html = "<option value='" + len[i].upname + "' userGuid='" + len[i].userGuid + "' phoneNum='"+len[i].uname+"'>" + len[i].upname +"<span style='color:red'>("+len[i].uname+")</span>"
							"</option>";
							$('.leader'+(row+1)).append(html)
						}
					}
					layui.use('form', function(){
					  var form = layui.form;
					  form.render()
					});
					
				})
				num9++
			}
			return '<div class="layui-form"><select class="leader'+(row+1)+'" lay-filter="filter" lay-search><option value="请选择">'+value.uname+'</option></select></div>'
		
		}
		function setOpt(e, value, row, index) {
			return '<span class="setOpt">设置</span>'
		}
	};
	window.setThis = {
		'click .setOpt': function(e, value, row, index) {
			// 企业人员弹窗
			console.log(value)
			console.log(row)
			if (row.type == "通告") {
				this_type = 3;
			} else if (row.type == "公告") {
				this_type = 2;
			} else if (row.type == "通知") {
				this_type = 1;
			} else {
				this_type = row.type;
			}
			this_id = row.id;
			if($('.leader'+(index+1)+' option:selected').attr('userGuid')!==undefined){
				if (this_type == 1 || this_type == 2 || this_type == 3) {
					$.post('' + EQD_url + '/SetUp/Set_News_Approver.ashx', {
						"companyId": data1.companyId,
						"userGuid": data1.Guid,
						"approver": $('.leader'+(index+1)+' option:selected').attr('userGuid'),
						"Id": this_id,
						"type": this_type
					}, function(data) {
						var data = JSON.parse(data)
						if (data.status == 200) {
							layer.msg('设置成功', {
								time: 1000,
							});
							LookShen();
							layer.closeAll();
						}
					});
				} else {
					$.post('' + EQD_url + '/Com/Vehicle/Set_vehicleAdmin.ashx', {
						"comid": data1.companyId,
						"userGuid": data1.Guid,
						"adminGuid": $('.leader'+(index+1)+' option:selected').attr('userGuid'),
						"adminName": $('.leader'+(index+1)+' option:selected').val(),
						"type": this_type
					}, function(data) {
						var data = JSON.parse(data)
						if (data.status == 200) {
							layer.msg('设置成功', {
								time: 1000,
							});
							LookShen();
							layer.closeAll();
						}
					});
				}
			}else{
				layer.msg('请选择审批人')
			}
				
			
//			var layuiTitle = row.type + "审批人设置";
//			layer.open({
//				type: 1,
//				area: ['500px', '600px'],
//				title: [layuiTitle, 'font-size:18px;', ],
//				content: $('.editNotice'),
//				shade: false
//			});
//			console.log(row);
			
//			pagePeople = 0;
//			comPeople(pagePeople);
		}
	};
	function LookShen() {
		// 自身权限
		$.post('' + EQD_url + '/SetUp/Get_Approver_ByN.ashx', {
			"companyId": data1.companyId,
			"userGuid": data1.Guid
		}, function(data) {
			dataQuanxian = JSON.parse(data);
			console.log(dataQuanxian)
			if (dataQuanxian.status == 200) {
				num9=0
				setTable(dataQuanxian.items);
				$(".setApprove").bootstrapTable("load", dataQuanxian.items)
				
			}
		});
	};
//	LookShen();

	function HRS(data) {
		// 企业人员表
		$('#noticeTable').bootstrapTable({
			data: data,
			columns: [{
				field: 'imgSrc',
				title: '头像',
				formatter: leaderFormatter
			}, {
				field: 'username',
				title: '姓名',
			}, {
				field: 'uname',
				title: '电话',
			}],
			onClickRow: function(row) {
				console.log(row)
				// 进行设置
				if (this_type == 1 || this_type == 2 || this_type == 3) {
					$.post('' + EQD_url + '/SetUp/Set_News_Approver.ashx', {
						"companyId": data1.companyId,
						"userGuid": data1.Guid,
						"approver": row.userGuid,
						"Id": this_id,
						"type": this_type
					}, function(data) {
						var data = JSON.parse(data)
						if (data.status == 200) {
							layer.msg('设置成功', {
								time: 1000,
							});
							LookShen();
							layer.closeAll();
						}
					});
				} else {
					$.post('' + EQD_url + '/Com/Vehicle/Set_vehicleAdmin.ashx', {
						"comid": data1.companyId,
						"userGuid": data1.Guid,
						"adminGuid": row.userGuid,
						"adminName": row.username,
						"type": this_type
					}, function(data) {
						var data = JSON.parse(data)
						if (data.status == 200) {
							layer.msg('设置成功', {
								time: 1000,
							});
							LookShen();
							layer.closeAll();
						}
					});
				}
			},
		});

		function leaderFormatter(e, value, row, index) {
			var imgurlS;
			if (value.photo.indexOf(".png") > 0 || value.photo.indexOf(".jpg") > 0 || value.photo.indexOf(".jpeg") > 0) {
				imgurlS = value.photo;
			} else {
				imgurlS = '../img/touxiang.png'
			}
			return '<img src="' + imgurlS + '" />';
		}
	};

	function comPeople(page) {
		//加载企业人员第一页
		$.post('' + EQD_url + '/Com/Com_User_ByCompany.ashx', {
			"companyId": data1.companyId,
			"page": page
		}, function(data) {
			var data = JSON.parse(data);
			console.log(data)
			if (data.status == 200) {
				HRS(data.items.BusinessCardList);
				$('#noticeTable').bootstrapTable("load", data.items.BusinessCardList);
				pagePeople = data.items.page;
				if (data.items.BusinessCardList.length >= 10) {
					$(".notNext").show();
				} else {
					$(".notNext").hide()
				}
			}
		})
	};

	function comPeopleNext(page) {
		//加载企业人员下一页
		$.post('' + EQD_url + '/Com/Com_User_ByCompany.ashx', {
			"companyId": data1.companyId,
			"page": page
		}, function(data) {
			var data = JSON.parse(data);
			console.log(data)
			if (data.status == 200) {
				HRS(data.items.BusinessCardList);
				$('#noticeTable').bootstrapTable("append", data.items.BusinessCardList);
				pagePeople = data.items.page;
				if (data.items.BusinessCardList.length >= 12) {
					$(".notNext").show();
					layer.msg("加载完成", {
						time: 1200
					})
				} else {
					$(".notNext").hide();
					layer.msg("已无更多", {
						time: 1200
					})
				}
			}
		})
	};
	$(".notNext").on("click", function() {
		comPeopleNext(pagePeople)
	})

	function renyuanLook() {

		$.post('' + EQD_url + '/Com/Com_User_ByCompany.ashx', {
			"companyId": data1.companyId,
			"page": "0"
		}, function(data) {
			var dataNotice = JSON.parse(data);
			var dataLook = dataNotice.items.BusinessCardList;
			HRS(dataLook)
			$("#noticeTable").on('click-row.bs.table', function(e, row, $element) {
				console.log(row)
				rowdets = row;
				var option = $.session.get('TGHY_set');
				if (option == 3) {
					$.post('' + EQD_url + '/SetUp/Set_Admin_ByCompany.ashx', {
						"companyId": data1.companyId,
						"userGuid": data1.Guid,
						"objecter": row.userGuid
					}, function(data) {
						$.session.remove('TGHY_set');
						var dataHRC = JSON.parse(data);
						if (dataHRC.status == 200) {
							layer.msg('设置成功', {
								time: 1000,
							});
							HR();
							layer.closeAll();
						} else {
							layer.msg(dataHRC.msg, {
								time: 1000,
							});
						}
					});
				} else if (option == 4) {
					$('.checkName').val(row.uname)
					if ($('.checkName').val().length > 0) {
						layer.close(layer.index);
						$.session.remove('TGHY_set');
					}
				} else if (option == 5) {
					$('.peixunMan').val(row.uname);
					peixunManGuid = row.u1;
					$.session.remove('TGHY_set');
					layer.close(layer.index);
				} else if (option == 6) {
					$.post('' + EQD_url + '/SetUp/Set_TopLeaders.ashx', {
						"userGuid": data1.Guid,
						"companyId": data1.companyId,
						"topLeader": row.u1
					}, function(data) {
						var dataSetleader = JSON.parse(data);
						if (dataSetleader.status == 200) {
							 $('.showLeader').parent().children('div').children('div').children('input').val(dataSetleader.items)
							$('.topLeader .setTopleader').css({
								'display': 'none'
							});
						}
					});
					$.session.remove('TGHY_set');
					layer.close(layer.index);
				} else if (option == 8) {
					$.post('' + EQD_url + '/Com/Attorn_TopLeader.ashx', {
						"userGuid": data1.Guid,
						"theReper": rowdets.u1
					}, function(data) {
						var datachangeTop = JSON.parse(data)
						if (datachangeTop.status == 200) {
							layer.msg('设置成功', {
								time: 1000,
							});
							setTimeout(function() {
								localStorage.removeItem("GHY_Mlogin");
								location.href = "M_login.html";
							}, 1100);
						} else {
							layer.msg(datachangeTop.msg, {
								time: 1000,
							});
						}
					});
					$.session.remove('TGHY_set');
				} else if (option == 9) {
					console.log(row.u1)
					$('#chooseManger').val(row.uname);
					mangerGuid = row.u1;
					layer.close(layer.index);
					$.session.remove('TGHY_set');
				}
				$(".cover").hide();
			})
		});
	}

	function HRsearch() {
		console.log(data1.companyId, data1.Guid,$('.searchInput option:selected').attr('phoneNum'))
		$.post('' + EQD_url + '/Com/User_Search.ashx', {
			"companyId": data1.companyId,
			"userGuid": data1.Guid,
			"para": $('.searchInput option:selected').attr('phoneNum')
		}, function(data) {
			var dataHrs = JSON.parse(data);
			console.log(dataHrs)
			var dataHRsea = dataHrs.items
			HRS(dataHRsea)
			$('#noticeTable').bootstrapTable("load", dataHRsea);
		});
	}
	$('.setLeaderDiv  input').keydown(function(event) {
		if (event.keyCode === 13) {
			HRsearch()
		}
	});
	$('.setLeaderDiv  button').click(function() {
		console.log($('.searchInput option:selected').attr('phoneNum'))
		HRsearch()
	});

	function closeLayer() {
		$('.cover').hide()
	}

	function lookCheck() {
		$.post('' + EQD_url + '/SetUp/Get_QuitChecker.ashx', {
			"companyId": data1.companyId
		}, function(data) {
			var dataCheck = JSON.parse(data);
			$('#checkTable').bootstrapTable({
				data: dataCheck.items,
				columns: [{
					field: 'checker',
					title: '姓名',
				}, {
					field: 'departments',
					title: '审批部门',
					formatter: checkDepFormatter,
				}, {
					field: 'checkOption',
					title: '操作',
					formatter: checkFormatter,
					events: checkEvents
				}]
			});
			$("#checkTable").bootstrapTable('load', dataCheck.items);
		});

		function checkDepFormatter(e, value, row) {
			var depnArr = [];
			for (var i = 0; i < value.list.length; i++) {
				var depname = "";
				depname += value.list[i].department;
				depnArr.push(depname)
			}
			return [
				depnArr
			].join('');
		};

		function checkFormatter(e, value, row, index) {
			return ['<a class="removeCheck" id="removeCheck">', '<span id="checkDelete">删除</span>', '</a>', ].join('');
		};
		window.checkEvents = {
			// 修改审批人操作
			'click .check': function(e, value, row, index) {
				layer.open({
					type: 1,
					area: '800px',
					title: ['修改审批人设置', 'font-size:18px;'],
					// shadeClose: true, //点击遮罩关闭
					content: $('.editNotice'),
					btn: '确定',
					shade: false
				});
				renyuanLook();
				$('.layui-layer-btn0').click(function() {
					$.post('' + EQD_url + '/SetUp/Update_QuitUser.ashx', {
						"quitchekcId": row.quitcheckId,
						"userGuid": data1.Guid,
						"checker": $("#noticeTable").bootstrapTable('getSelections')[0].u1,
						"companyId": data1.companyId
					}, function(data) {
						var datacheckChange = JSON.parse(data);
						if (datacheckChange.status == 200) {
							layer.msg('修改离职审批人成功', {
								time: 1000,
							});
							lookCheck();
						}
					});
				});
			},
			// 修改审批部门
			'click .changeCheck': function(e, value, row, index) {
				layer.open({
					type: 1,
					area: '800px',
					title: ['修改审批部门设置', 'font-size:18px;'],
					// shadeClose: true, //点击遮罩关闭
					content: $('.checkdepChange'),
					btn: '确定',
					shade: false
				});
				var depid2, dataDeped2;
				$('.checkDepChange').click(function() {
					var depid2;
					layer.open({
						type: 1,
						area: '250px',
						title: ['选择部门', 'font-size:18px;'],
						content: $('.checkChooseDep'),
						btn: '确定',
						shade: false
					});
					$('.layui-layer-close').click(function() {
						$('.checkdepChange form input').val('');
					});
					$.post('' + EQD_url + '/SetUp/Get_Department_ByPower.ashx', {
						"companyId": data1.companyId
					}, function(data) {
						dataDeped2 = JSON.parse(data);
					});
					$('span[id^=treeDemoChooseCheck]').click(function() {
						var idList2 = [];
						for (var i = 0; i < dataDeped2.items.length; i++) {
							var ids2 = ""
							ids2 += dataDeped2.items[i].departId;
							idList2.push(ids2)
						}
						var checkDepsId2 = "";
						checkDepsId2 = G_treeNode.departId + ",";
						depid2 = checkDepsId2.substring(0, checkDepsId2.length - 1)
						var arr2 = idList2;
						if (arr2.indexOf(depid2) < 0) {
							var checkDeps2 = "";
							var checkDepsId2 = "";
							var str2 = $('.checkDepChange').val();
							var sear2 = new RegExp(G_treeNode.departName);
							if (sear2.test(str2)) {
								checkDeps2 = $('.checkDepChange').val();
								checkDepsId2 = $('.checkDepId2').val();
							} else {
								checkDeps2 = $('.checkDepChange').val() + " " + G_treeNode.departName;
								checkDepsId2 = G_treeNode.departId + "," + $('.checkDepId2').val();
							}
							$('.checkDepChange').val(checkDeps2);
							$('.checkDepId2').val(checkDepsId2);
						} else {
							layer.msg("此部门已被其他审批人管理", {
								time: 1000,
							});
						}
					});
				});
				$('.layui-layer-btn0').click(function() {
					var depid3;
					depid3 = ($('.checkDepId2').val()).substring(0, ($('.checkDepId2').val()).length - 1);
					$.post('' + EQD_url + '/SetUp/Update_QuitDpartmetns.ashx', {
						"quitchekcId": row.quitcheckId,
						"userGuid": data1.Guid,
						"departmentIds": depid3,
						"companyId": data1.companyId
					}, function(data) {
						var datadepC = JSON.parse(data);
						if (datadepC.status == 200) {
							lookCheck();
							$('.checkdepChange form input').val('');
						} else {
							layer.msg(datadepC.msg, {
								time: 1000,
							});
						}
					});
				});
			},
			// 删除审批操作
			'click .removeCheck': function(e, value, row, index) {
				layer.open({
					type: 1,
					area: '800px',
					title: ['删除审批操作', 'font-size:18px;'],
					content: $('.checkRemove'),
					btn: '确定',
					shade: false
				});
				$('.layui-layer-btn0').click(function() {
					$.post('' + EQD_url + '/SetUp/Delete_QuitChecker.ashx', {
						"companyId": data1.companyId,
						"userGUid": data1.Guid,
						"quitchekcId": row.quitcheckId
					}, function(data) {
						var dataRemoveCheck = JSON.parse(data);
						if (dataRemoveCheck.status == 200) {
							layer.msg('删除成功', {
								time: 1000,
							});
							lookCheck();
						} else {
							layer.msg(dataRemoveCheck.msg, {
								time: 1000,
							});
						}
					});
				});
			},
			// 查看审批部门
			'click .lookCheck': function(e, value, row, index) {
				layer.open({
					type: 1,
					area: '800px',
					title: ['查看审批部门', 'font-size:18px;'],
					content: $('.lookCheckTable'),
					btn: '确定',
					shade: false,
				});
				var rows = "";
				var rowArr = [];
				for (var i = 0; i < row.list.length; i++) {
					rows += row.list[i].id;
					rowArr.push(row.list[i].id)
				}
				var spanarr1 = rowArr;
				var spanarr2 = spanArr;
				var spanarr3 = [];
				for (var s in spanarr1) {
					for (var x in spanarr2) {
						if (spanarr1[s] == spanarr2[x]) {
							spanarr3.push(spanarr2[x]);
							break;
						}
					}
				}
				var treeObj2 = $.fn.zTree.getZTreeObj("treeDemoChooseCheck2");
				for (var i = 0; i < spanarr3.length; i++) {
					var spannode = treeObj2.getNodeByParam("departId", spanarr3[i], null);
				}
			}
		}
	};

	function HR() {
		if (data1.isAdmin == 2) {
			$.post('' + EQD_url + '/SetUp/Get_Company_Admin.ashx', {
				"companyId": data1.companyId
			}, function(data) {
				var dataHr = JSON.parse(data);
				$('.showHR').text(dataHr.items.name)
			});
		} else {
			$('.setHR').css('display', 'none');
		}
	}
	var num3=0
	$('.xitongguanli').click(function() {
		$('.quanxianshezhi').slideToggle(200);
		$('.gongzuoshezhi').slideToggle(200);
		if(num3==0){
			$.post('' + EQD_url + '/Com/Com_User_ByCompany.ashx', {
				"companyId": data1.companyId,
				"page": "0"
			}, function(data) {
				var data1 =JSON.parse(data)
				var len=data1.items.BusinessCardList
				for(var i=0;i<len.length;i++){
					var html = "<option value='" + len[i].upname + "' userGuid='" + len[i].userGuid + "' phoneNum='"+len[i].uname+"'>" + len[i].upname +
					"</option>";
					$('.showLeader').append(html)
				}
				layui.use('form', function(){
				  var form = layui.form;
				  form.render()
				});
			})
			num3++
		}
		
	});
	$('.caiwuguanli').click(function() {
		$('.baoxiaoshezhi').slideToggle(200);
	});
	var num5=0
	$('.huiyiguanli').click(function() {
		 $('#holdPerson').val("")
        $('#recordPerson').val("")
        $('#noticePerson').val("")
		$('.huiyishezhi').slideToggle(200);
		$('.huiyitongzhi').slideToggle(200);
		if(num5==0){
			$.post('http://47.94.173.253:8008/Com/User_Search_Info.ashx',{
				companyId:data1.companyId,
				para:' '
			},function(res){
				
					var data=JSON.parse(res)
					var data1=data.items
				    var len = data1.length;
				    num5++
				    for (let i = 0; i < data1.length; i++) {
						var html = "<option value='" + data1[i].upname + "' userGuid='" + data1[i].userGuid + "'>" + data1[i].upname +
							"</option>";
						$("#holdPerson3").append(html);
						$("#recordPerson3").append(html);
						$("#holdPerson").append(html);
						$("#recordPerson").append(html);
						$("#noticePerson").append(html);
						$("#holdPerson2").append(html);
						$("#recordPerson2").append(html);
						$("#noticePerson2").append(html);
						$("#preEcord_3").append(html);
						$("#preEcord_8").append(html);
					}
		    layui.use('form', function() {
					var form = layui.form;
//					form.on('select(holdPerson3)', function(data) {
//						holdPerson3 = $("option[value=" + data.value + "]").attr('userGuid');
//					});
//					form.on('select(recordPerson3)', function(data) {
//						recordPerson3 = $("option[value=" + data.value + "]").attr('userGuid');
//					});
//					form.on('select(holdPerson)', function(data) {
//						holdPerson = $("option[value=" + data.value + "]").attr('userGuid');
//					});
//					form.on('select(recordPerson)', function(data) {
//						recordPerson = $("option[value=" + data.value + "]").attr('userGuid');
//					});
//					form.on('select(noticePerson)', function(data) {
//						noticePerson = $("option[value=" + data.value + "]").attr('userGuid');
//					});
//					form.on('select(holdPerson2)', function(data) {
//						holdPerson2 = $("option[value=" + data.value + "]").attr('userGuid');
//					});
//					form.on('select(recordPerson2)', function(data) {
//						recordPerson2 = $("option[value=" + data.value + "]").attr('userGuid');
//					});
//					form.on('select(noticePerson2)', function(data) {
//						noticePerson2 = $("option[value=" + data.value + "]").attr('userGuid');
//					});
//					form.on('select(preEcord_3)', function(data) {
//						preEcord_3 = $("option[value=" + data.value + "]").attr('userGuid');
//					});
//					form.on('select(preEcord_8)', function(data) {
//						preEcord_8 = $("option[value=" + data.value + "]").attr('userGuid');
//					});
					form.render();
				})
			})
		}
		
	});
	$('.yiqiSpace').click(function() {
		$('.renyuanshezhi').slideToggle(200);
		$('.shoufeimokuai').slideToggle(200);
		$('.jiaofeijilv').tslideToggle(200);
	});
	$('.Work-plan').click(function() {
		$('.Yearwork').slideToggle(200);
		$('.Monthwork').slideToggle(200);
		$('.Weekwork').slideToggle(200);
		$('.Daywork').slideToggle(200);
		$('.Journalwork').slideToggle(200);
	});
	// -----------------------报销设置JS-----------------
	$('.baoxiaoshezhi').click(function() {
		$(this).addClass('pcheck').siblings('p').removeClass('pcheck');
		$('.baoxiaoShezhi').show().siblings('div').hide();
		loadapplyData();
	});
	var dataCheckPer;
	var arr_checkList = [];
	$('.addApplyBtn').click(function() {
		layer.open({
			type: 1,
			area: ['950px', '500px'],
			title: ['设置报销审批人', 'font-size:18px;'],
			shadeClose: true, //点击遮罩关闭
			content: $('.addApplyDiv'),
			btn: '确定',
		});
		$.post('' + EQD_url + '/User_getcompost.ashx', {
			"comid": data1.companyId,
			"userGuid": data1.Guid
		}, function(data) {
			dataCheckPer = JSON.parse(data);
			for (var i = 0; i < dataCheckPer.items.length; i++) {
				$('#checkPerson').append('<option value="' + dataCheckPer.items[i].id + '">' + dataCheckPer.items[i].name +
					'</option>')
			}
		})
		$('.layui-layer-btn0').click(function() {
			arr_checkList = []
			for (var j = 0; j < $('#applyTabel label').length; j++) {
				var dicCheck = {
					"minMoney": $('#applyTabel label').eq(j).children('input').eq(0).val(),
					"maxMoney": $('#applyTabel label').eq(j).children('input').eq(1).val(),
					"postId": $('#applyTabel label').eq(j).children('select').val(),
				}
				arr_checkList.push(dicCheck);
				var str_checkList = JSON.stringify(arr_checkList);
			}
			$.post('' + EQD_url + '/SetUp/Reimburse/Add_ReimburseChecker.ashx', {
				"userGuid": data1.Guid,
				"companyId": data1.companyId,
				"parameter": str_checkList
			}, function(data) {
				var dataAddCheck = JSON.parse(data);
				if (dataAddCheck.status == 200) {
					$('#applyTabel label input:gt(0)').val('');
					$('#applyTabel label:gt(0)').remove();
					$('#applyTabel label').eq(0).children('.secInput').removeAttr('disabled');
					$('#applyTabel label').children('.addLabel0').show();
					loadapplyData();
				} else {
					layer.msg(dataAddCheck.msg, {
						time: 500,
					});
				}
			});
		});
	});
	// 添加报销区间
	var labelNumber = 0;
	$('#addLabel').click(function() {
		if ($(this).siblings('.secInput').val() == "" || ($(this).siblings('.secInput').val() <= $('#applyTabel label').children(
				'input').eq(0).val())) {
			layer.msg('请正确填写完整输入框', {
				time: 500,
			});
		} else {
			var newMin = Number($(this).siblings('.secInput').val()) + 1;
			var newMax = Number($(this).siblings('.secInput').val()) + 1000;
			labelNumber++;
			$(this).siblings('.secInput').attr('disabled', 'disabled');
			$('#applyTabel').append('<label for=""><span>报销额度区间</span><input type="text" class="form-control" value="' +
				newMin + '" disabled="disabled">~<input type="text" class="form-control secInput" value="' + newMax +
				'"><select name="" id="checkPerson' + labelNumber +
				'" class="form-control"><option value="">部门</option></select><span class="deleteApplyinput">删除</span><span class="addLabel' +
				labelNumber + '" id="addLabel">添加额度区间</span></label>')
			if ($('#checkPerson' + labelNumber + ' option').length == 1) {
				for (var i = 0; i < dataCheckPer.items.length; i++) {
					$('#checkPerson' + labelNumber + '').append('<option value="' + dataCheckPer.items[i].id + '">' + dataCheckPer
						.items[i].name + '</option>')
				}
			}
			$(this).hide()
			loadInput()

			function loadInput() {
				$('#applyTabel label .addLabel' + labelNumber + '').one('click', function(event) {
					var newMin = Number($(this).siblings('.secInput').val()) + 1;
					var newMax = Number($(this).siblings('.secInput').val()) + 1000;
					$(this).siblings('.secInput').attr('disabled', 'disabled');
					labelNumber++;
					$('.deleteApplyinput').hide();
					$('#applyTabel').append('<label for=""><span>报销额度区间</span><input type="text" class="form-control" value="' +
						newMin + '" disabled="disabled">~<input type="text" class="form-control secInput" value="' + newMax +
						'"><select name="" id="checkPerson' + labelNumber +
						'" class="form-control"><option value="">部门</option></select><span class="deleteApplyinput">删除</span><span class="addLabel' +
						labelNumber + '" id="addLabel">添加额度区间</span></label>')
					if ($('#checkPerson' + labelNumber + ' option').length == 1) {
						for (var i = 0; i < dataCheckPer.items.length; i++) {
							$('#checkPerson' + labelNumber + '').append('<option value="' + dataCheckPer.items[i].id + '">' +
								dataCheckPer.items[i].name + '</option>')
						}
					}
					$(this).hide()
					loadInput()
				});
				$('.deleteApplyinput').click(function() {
					$(this).parent('label').prev('label').children('.deleteApplyinput').show()
					$(this).parent('label').prev('label').children('#addLabel').show();
					$(this).parent('label').prev('label').children('.secInput').removeAttr('disabled')
					$(this).parent('label').remove()
					labelNumber--;
					loadInput()
				})
			}
		}
	});
	// 删除报销区间
	$('.deleteApplyinput').click(function() {
		$(this).parent('label').remove()
		$('.addLabel0').show();
	})

	function loadapplyData() {
		$.post('' + EQD_url + '/SetUp/Reimburse/Get_ReimburseChecker.ashx', {
			"companyId": data1.companyId,
			"userGuid": data1.Guid,
		}, function(data) {
			var dataApply = JSON.parse(data)
			if (dataApply.status == 200) {
				layer.msg('查看成功', {
					time: 500,
				});
				loadApply(dataApply)
			}
		});
	}

	function loadApply(data) {
		var dataTime = data
		$('#lookApplyTable').bootstrapTable({
			data: dataTime.items,
			columns: [{
				field: 'checkName',
				title: '审核人',
				align: 'center',
				valign: 'middle',
			}, {
				field: 'postName',
				title: '职位',
				align: 'center',
				valign: 'middle',
			}, {
				field: 'createTime',
				title: '时间',
				align: 'center',
				valign: 'middle',
				formatter: applyFormatter
			}, {
				field: 'money',
				title: '报销金额区间',
				align: 'center',
				valign: 'middle',
				formatter: moneyFormatter
			}]
		});
		$("#lookApplyTable").bootstrapTable('load', dataTime.items);

		function applyFormatter(value, row, index) {
			var tApply = row.createTime.split("T")[0];
			return [
				tApply
			].join('');
		}

		function moneyFormatter(value, row, index) {
			var moneyAll = row.minMoney + '~' + row.maxMoney;
			return [
				moneyAll
			].join('');
		}
	}
	// -----------------------报销设置JS-----------------
	// ----------------------------------------------会议管理JS----------------------------------------
	// -----------------------会议设置-----------------------
	var dataMeetLook;
	    $('.huiyishezhi').click(function() {
	        $(this).addClass('pcheck').siblings('p').removeClass('pcheck');
	        $('.huiyiGuanli').show().siblings('div').hide();
	        loadMeeting()
	    });
	    // 查看会议设置
	    laydate.render({
	        elem: '#beginTime2',
	        type: 'time'
	    });
	    laydate.render({
	        elem: '#endTime2',
	        type: 'time'
	    });
	    function loadMeeting() {
	        $.post('' + EQD_url + '/Meeting/Get_Settings.ashx', {
	            "comid": data1.companyId,
	            "userGuid": data1.Guid
	        }, function(data) {
	            dataMeetLook = JSON.parse(data);
				console.log(dataMeetLook)
	            $('#meetingTable').bootstrapTable({
	                data: dataMeetLook.items,
	                columns: [{
	                    field: 'type',
	                    title: '会议类型',
	                    valign: 'middle',
	                    align: 'center',
	                }, {
	                    field: 'frequency',
	                    title: '会议频率',
	                    valign: 'middle',
	                    align: 'center',
	                    formatter: meetingRateFormatter
	                },{
	                    field: 'startTime',
	                    title: '开始时间',
	                    valign: 'middle',
	                    align: 'center'
	                },{
	                    field: 'endTime',
	                    title: '结束时间',
	                    valign: 'middle',
	                    align: 'center'
	                },{
	                    field: 'attendeesNum',
	                    title: '参加人员',
	                    valign: 'middle',
	                    align: 'center'
	                },{
	                    field: 'compereName',
	                    title: '主持人',
	                    valign: 'middle',
	                    align: 'center'
	                },{
	                    field: 'recoderName',
	                    title: '记录人',
	                    valign: 'middle',
	                    align: 'center'
	                },{
	                    field: 'adminName',
	                    title: '通知发布人',
	                    valign: 'middle',
	                    align: 'center'
	                }, {
	                    field: 'place',
	                    title: '会议地点',
	                    valign: 'middle',
	                    align: 'center'
	                },{
	                    field: 'aim',
	                    title: '会议目的',
	                    valign: 'middle',
	                    align: 'center'
	                }, {
	                    field: 'option',
	                    title: '操作',
	                    valign: 'middle',
	                    align: 'center',
						width : '100px',
	                    formatter: meetOptionFormatter,
	                    events: meetEvents
	                }]
	            });
	            $("#meetingTable").bootstrapTable('load', dataMeetLook.items);
	
	            function meetingRateFormatter(row, value, index) {
	                var meetTimes;
	                if (value.frequency == 1) {
	                    meetTimes = "每天"
	                } else if (value.frequency == 2) {
	                    meetTimes = "每周"
	                } else if (value.frequency == 3) {
	                    meetTimes = "每月"
	                } else if (value.frequency == 4) {
	                    meetTimes = "一次"
	                }
	                return [
	                    meetTimes
	                ].join('');
	            }
				
				function meetmotionFormatter(row, value, index) {
					var motion;
				    if(value.motion == false){
						motion = '否'
					}else{
						motion = '是'
					}
				    return [
				        motion
				    ].join('');
				}
	
	            function meetOptionFormatter(row, value, index) {
	                return ['<a class="deleteMeeting" title="删除设置">', '<span id="deleteMeeting">删除</span>', '</a>', '<a class="changeMeeting" title="修改设置">', '<span id="changeMeeting">修改</span>', '</a>', ].join('');
	            }
	        });
	    }
	    var holdGuid2, recordGuid2, noticeGuid2, arrGuid4, monthDay2, weekDay2, meetTime2, meetRate3;
	    window.meetEvents = {
	        'click .changeMeeting': function(e, value, row, index) {
	            var meetMoreData
	            var attendPerson = "";
	            var attendPersonGuid = "";
	            var attendPersonGuid2 = "";
	            $.post('' + EQD_url + '/Meeting/Get_MettingById.ashx', {
	                "companyId": row.comid,
	                "mettingId": row.Id
	            }, function(data) {
	                meetMoreData = JSON.parse(data)
	                $('.meetType2').val(meetMoreData.items.type)
	                $('#beginTime2').val(meetMoreData.items.startTime)
	                $('#endTime2').val(meetMoreData.items.endTime)
	                console.log( meetMoreData.items)
	                for (var i = 0; i < meetMoreData.items.attendees.length; i++) {
	                    attendPerson += meetMoreData.items.attendees[i].username + ","
	                    attendPersonGuid += meetMoreData.items.attendees[i].userGuid + ","
	                }
	                attendPersonGuid2 = attendPersonGuid.substring(0, Number(attendPersonGuid.length) - 1)
	                arrGuid4 = attendPersonGuid2
	                $('#attendPeople2').val(attendPerson)
	                $('#holdPerson2').val(meetMoreData.items.compere.username)
	                  $('#holdPerson2').parent().children('div').children('div').children('input').val(meetMoreData.items.compere.username)
	                holdGuid2 = meetMoreData.items.compere.userGuid
	                $('#recordPerson2').val(meetMoreData.items.recorder.username)
	                 $('#recordPerson2').parent().children('div').children('div').children('input').val(meetMoreData.items.recorder.username)
	                recordGuid2 = meetMoreData.items.recorder.userGuid
	                $('#noticePerson2').val(meetMoreData.items.admin.username)
	                $('#noticePerson2').parent().children('div').children('div').children('input').val(meetMoreData.items.admin.username)
	                noticeGuid2 = meetMoreData.items.admin.userGuid
	                $('.meetAddress2').val(meetMoreData.items.place)
	                $('.meetAin2').val(meetMoreData.items.aim)
	                $('#provideMore2').val("" + meetMoreData.items.motion + "")
	                $('#meetRate2').on('change',function() {
	                    if ($('#meetRate2').val() == 1) {
	                        $('.timeIntervalC3').show()
	                        $('.timeIntervalC2').hide()
	                        $('.timeIntervalC1').hide()
	                    } else if ($('#meetRate2').val() == 2) {
	                        $('.timeIntervalC2').show()
	                        $('.timeIntervalC1').hide()
	                        $('.timeIntervalC3').hide()
	                        meetTime2 = weekDay2;
	                    } else if ($('#meetRate2').val() == 3) {
	                        $('.timeIntervalC1').show()
	                        $('.timeIntervalC2').hide()
	                        $('.timeIntervalC3').hide()
	                        meetTime2 = monthDay2;
	                    } else if ($('#meetRate2').val() == 4) {
	                        $('.timeIntervalC1').hide()
	                        $('.timeIntervalC2').hide()
	                        $('.timeIntervalC3').hide()
	                    }
	                });
	            });
	            layer.open({
	                type: 1,
	                area: ['800px', '500px'],
	                title: ['会议详情', 'font-size:18px;'],
	                shadeClose: true, //点击遮罩关闭
	                content: $('.meetMoreTable'),
	                btn: '确定',
	                yes: function(index, layero) {
	                    layer.closeAll()
	                    if ($('#meetRate2').val() == 2) {
	                    	meetTime2=$('#usertype4').val()
	                    } else if ($('#meetRate2').val() == 3) {
	                    	meetTime2=$('#usertype1').val()
	                    } else if ($('#meetRate2').val() == 1) {
	                        meetTime2 = "一次"
	                    } else if ($('#meetRate2').val() == 4) {
	                        meetTime2 = "一次"
	                    } else if ($('#meetRate2').val() == "") {
	                        meetRate3 = meetMoreData.items.frequency
	                        meetTime2 = meetMoreData.items.timeInterval
	                    }
	                    $.post('' + EQD_url + '/Meeting/Update_MettingSetting.ashx', {
	                        "userGuid": data1.Guid,
	                        "companyId": data1.companyId,
	                        "mettingId": row.Id,
	                        "para": "type='" + $('.meetType2').val() + "'" + "," + "frequency='" + meetRate3 + "'" + "," + "timeInterval='" + meetTime2 + "'" + "," + "startTime='" + $('#beginTime2').val() + "'" + "," + "endTime='" + $('#endTime2').val() + "'" + "," + "place='" + $('.meetAddress2').val() + "'" + "," + "motion='" + $('#provideMore2').val() + "'" + "," + "attendees='" +$('xm-select .xm-select-default').val() + "'" + "," + "compere='" + $('#holdPerson2  option:selected').attr('userGuid') + "'" + "," + "recorder='" + $('#recordPerson2  option:selected').attr('userGuid') + "'" + "," + "admin='" + $('#noticePerson2  option:selected').attr('userGuid') + "'" + "," + "aim='" + $('.meetAin2').val() + "'"
	                    }, function(data) {
	                        console.log(data)
	                        var dataChanged = JSON.parse(data)
	                        if (dataChanged.status == 200) {
	                            loadMeeting()
	                            $('.choosedPerson p').remove()
	                            $('#renyuanchooseTable input').removeAttr('checked')
	                        }
	                    });
	                }
	            });
	        },
	        'click .deleteMeeting': function(e, value, row, index) {
	            layer.open({
	                type: 1,
	                area: '400px',
	                title: ['删除会议设置', 'font-size:18px;'],
	                // shadeClose: true, //点击遮罩关闭
	                content: $('.deleteMeetingDiv'),
	                btn: '确定',
	                yes: function(index, layero) {
	                    $.post('' + EQD_url + '/Meeting/Delete_setting.ashx', {
	                        "userGuid": data1.Guid,
	                        "companyId": data1.companyId,
	                        "settingId": row.Id
	                    }, function(data) {
	                        console.log(data)
	                        var dataMeetDel = JSON.parse(data)
	                        if (dataMeetDel.status == 200) {
	                            loadMeeting()
	                            layer.msg('删除成功')
	                        }
	                    });
	                    layer.closeAll()
	                }
	            })
	        }
	    }
	    $('#topPerson').click(function(){
	    	checkInput($('#topPerson'))
	    })
	    
	    function checkInput(data){
	    	var arrName=''
	    	$.post('http://47.94.173.253:8008/Com/Get_Com_User.ashx',{
					companyId:data1.companyId,
					ParentId:0
				},function(res){
					var data=JSON.parse(res)
					console.log(111,data.items)
					var departName=[]
					var departNameChild=[]
					for(var i=0;i<data.items.length;i++){
						departName.push({name:data.items[i].departName,value:data.items[i].departId})
						if(data.items[i].UserInfo.length!==0){
							var departNameOnechild=[]
							for(var j=0;j<data.items[i].UserInfo.length;j++){
								departNameOnechild.push({name:data.items[i].UserInfo[j].username,value:data.items[i].UserInfo[j].userGuid})
								departName[i].children=departNameOnechild
							}
						}else if(data.items[i].childs.length!==0){
							for(var j=0;j<data.items[i].childs.length;j++){
								departNameChild.push({name:data.items[i].childs[j].departName,value:data.items[i].childs[j].departId})
								departName[i].children=departNameChild
								if(data.items[i].childs[j].childs.length!==0){
									var departNameChild1=[]
									for(var k=0;k<data.items[i].childs[j].childs.length;k++){
										departNameChild1.push({name:data.items[i].childs[j].childs[k].departName,value:data.items[i].childs[j].childs[k].departId})
										departName[i].children[j].children=departNameChild1
										if(data.items[i].childs[j].childs[k].UserInfo.length!==0){
											var departNameThreechild=[]
											for(var m=0;m<data.items[i].childs[j].childs[k].UserInfo.length;m++){
												departNameThreechild.push({name:data.items[i].childs[j].childs[k].UserInfo[m].username,value:data.items[i].childs[j].childs[k].UserInfo[m].userGuid})
												departName[i].children[j].children[k].children=departNameThreechild
											}
										}else if(data.items[i].childs[j].childs[k].childs.length!==0){
											var departNameChild2=[]
											for(var m=0;m<data.items[i].childs[j].childs[k].childs.length;m++){
												departNameChild2.push({name:data.items[i].childs[j].childs[k].childs[m].departName,value:data.items[i].childs[j].childs[k].childs[m].departId})
												departName[i].children[j].children[k].children=departNameChild2
												if(data.items[i].childs[j].childs[k].childs[m].UserInfo.length!==0){
													var departNameFourchild=[]
													for(var n=0;n<data.items[i].childs[j].childs[k].childs[m].UserInfo.length;n++){
														departNameFourchild.push({name:data.items[i].childs[j].childs[k].childs[m].UserInfo[n].username,value:data.items[i].childs[j].childs[k].childs[m].UserInfo[n].userGuid})
														departName[i].children[j].children[k].children[m].children=departNameFourchild
													}
													
												}else if(data.items[i].childs[j].childs[k].childs[m].childs.length!==0){
													var departNameChild3=[]
													for(var n=0;n<data.items[i].childs[j].childs[k].childs[m].childs.length;n++){
														departNameChild3.push({name:data.items[i].childs[j].childs[k].childs[m].childs[n].departName,value:data.items[i].childs[j].childs[k].childs[m].childs[n].departId})
														departName[i].children[j].children[k].children[m].children=departNameChild3
														if(data.items[i].childs[j].childs[k].childs[m].childs[n].UserInfo.length!==0){
															var departNameFivechild=[]
															for(var z=0;z<data.items[i].childs[j].childs[k].childs[m].childs[n].UserInfo.length;z++){
																departNameFivechild.push({name:data.items[i].childs[j].childs[k].childs[m].childs[n].UserInfo[z].username,value:data.items[i].childs[j].childs[k].childs[m].childs[n].UserInfo[z].userGuid})
																departName[i].children[j].children[k].children[m].children[n].children=departNameFivechild
															}
														}else if(data.items[i].childs[j].childs[k].childs[m].childs[n].childs.length!==0){
															var departNameChild4=[]
															for(var z=0;z<data.items[i].childs[j].childs[k].childs[m].childs[n].childs.length;z++){
																departNameChild4.push({name:data.items[i].childs[j].childs[k].childs[m].childs[n].childs[z].departName,value:data.items[i].childs[j].childs[k].childs[m].childs[n].childs[z].departId})
																departName[i].children[j].children[k].children[m].children[n].children=departNameChild4
																if(data.items[i].childs[j].childs[k].childs[m].childs[n].childs[z].UserInfo.length!==0){
																	var departNameSixchild=[]
																	for(var y=0;y<data.items[i].childs[j].childs[k].childs[m].childs[n].childs[z].UserInfo.length;y++){
																		departNameSixchild.push({name:data.items[i].childs[j].childs[k].childs[m].childs[n].childs[z].UserInfo[y].username,value:data.items[i].childs[j].childs[k].childs[m].childs[n].childs[z].UserInfo[y].userGuid})
																		departName[i].children[j].children[k].children[m].children[n].children[z].children=departNameSixchild
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}else if(data.items[i].childs[j].UserInfo.length!==0){
									var departNameTwochild=[]
									for(var k=0;k<data.items[i].childs[j].UserInfo.length;k++){
										departNameTwochild.push({name:data.items[i].childs[j].UserInfo[k].username,value:data.items[i].childs[j].UserInfo[k].userGuid})
										departName[i].children[j].children=departNameTwochild
									}
								}
							}
							
						}
					}
					layui.form.render();
					var demo1 = xmSelect.render({
							el: '#demo1', 
							autoRow: true,
							filterable: true,
							tree: {
								show: true,
								showFolderIcon: true,
								showLine: true,
								indent: 20,
								expandedKeys: [ 1 ],
								strict: true,
							},
							filterable: true,
							height: 'auto',
							data(){
								return  departName
							}
					})
					demo1.opened();
				})
	        layer.open({
	            type: 1,
	            area: ['450px', '600px'],
	            title: ['选择人员', 'font-size:18px;'],
	            content: $('.chooserenyuanDiv'),
	            btn: '确定',
	        });
	        $('.layui-layer-btn0').click(function() {
			    var arrName = "";
		        var arrGuid = "";
		        for (var i = 0; i < $('.label-content .xm-label-block').length; i++) {
		            arrName += $('.label-content .xm-label-block').eq(i).text() + ","
		        }
		        console.log($('xm-select .xm-select-default').val())
		        data.val(arrName);
			});
	    }
	    
	     function checkInput2(data,type){
	    	var arrName=''
	    	console.log(data)
	    	console.log(type)
	    	$.post('http://47.94.173.253:8008/Com/Get_Com_User.ashx',{
					companyId:data1.companyId,
					ParentId:0
				},function(res){
					var data=JSON.parse(res)
					console.log(111,data.items)
					var departName=[]
					var departNameChild=[]
					for(var i=0;i<data.items.length;i++){
						departName.push({name:data.items[i].departName,value:data.items[i].departId})
						if(data.items[i].UserInfo.length!==0){
							var departNameOnechild=[]
							for(var j=0;j<data.items[i].UserInfo.length;j++){
								departNameOnechild.push({name:data.items[i].UserInfo[j].username,value:data.items[i].UserInfo[j].userGuid})
								departName[i].children=departNameOnechild
							}
						}else if(data.items[i].childs.length!==0){
							for(var j=0;j<data.items[i].childs.length;j++){
								departNameChild.push({name:data.items[i].childs[j].departName,value:data.items[i].childs[j].departId})
								departName[i].children=departNameChild
								if(data.items[i].childs[j].childs.length!==0){
									var departNameChild1=[]
									for(var k=0;k<data.items[i].childs[j].childs.length;k++){
										departNameChild1.push({name:data.items[i].childs[j].childs[k].departName,value:data.items[i].childs[j].childs[k].departId})
										departName[i].children[j].children=departNameChild1
										if(data.items[i].childs[j].childs[k].UserInfo.length!==0){
											var departNameThreechild=[]
											for(var m=0;m<data.items[i].childs[j].childs[k].UserInfo.length;m++){
												departNameThreechild.push({name:data.items[i].childs[j].childs[k].UserInfo[m].username,value:data.items[i].childs[j].childs[k].UserInfo[m].userGuid})
												departName[i].children[j].children[k].children=departNameThreechild
											}
										}else if(data.items[i].childs[j].childs[k].childs.length!==0){
											var departNameChild2=[]
											for(var m=0;m<data.items[i].childs[j].childs[k].childs.length;m++){
												departNameChild2.push({name:data.items[i].childs[j].childs[k].childs[m].departName,value:data.items[i].childs[j].childs[k].childs[m].departId})
												departName[i].children[j].children[k].children=departNameChild2
												if(data.items[i].childs[j].childs[k].childs[m].UserInfo.length!==0){
													var departNameFourchild=[]
													for(var n=0;n<data.items[i].childs[j].childs[k].childs[m].UserInfo.length;n++){
														departNameFourchild.push({name:data.items[i].childs[j].childs[k].childs[m].UserInfo[n].username,value:data.items[i].childs[j].childs[k].childs[m].UserInfo[n].userGuid})
														departName[i].children[j].children[k].children[m].children=departNameFourchild
													}
													
												}else if(data.items[i].childs[j].childs[k].childs[m].childs.length!==0){
													var departNameChild3=[]
													for(var n=0;n<data.items[i].childs[j].childs[k].childs[m].childs.length;n++){
														departNameChild3.push({name:data.items[i].childs[j].childs[k].childs[m].childs[n].departName,value:data.items[i].childs[j].childs[k].childs[m].childs[n].departId})
														departName[i].children[j].children[k].children[m].children=departNameChild3
														if(data.items[i].childs[j].childs[k].childs[m].childs[n].UserInfo.length!==0){
															var departNameFivechild=[]
															for(var z=0;z<data.items[i].childs[j].childs[k].childs[m].childs[n].UserInfo.length;z++){
																departNameFivechild.push({name:data.items[i].childs[j].childs[k].childs[m].childs[n].UserInfo[z].username,value:data.items[i].childs[j].childs[k].childs[m].childs[n].UserInfo[z].userGuid})
																departName[i].children[j].children[k].children[m].children[n].children=departNameFivechild
															}
														}else if(data.items[i].childs[j].childs[k].childs[m].childs[n].childs.length!==0){
															var departNameChild4=[]
															for(var z=0;z<data.items[i].childs[j].childs[k].childs[m].childs[n].childs.length;z++){
																departNameChild4.push({name:data.items[i].childs[j].childs[k].childs[m].childs[n].childs[z].departName,value:data.items[i].childs[j].childs[k].childs[m].childs[n].childs[z].departId})
																departName[i].children[j].children[k].children[m].children[n].children=departNameChild4
																if(data.items[i].childs[j].childs[k].childs[m].childs[n].childs[z].UserInfo.length!==0){
																	var departNameSixchild=[]
																	for(var y=0;y<data.items[i].childs[j].childs[k].childs[m].childs[n].childs[z].UserInfo.length;y++){
																		departNameSixchild.push({name:data.items[i].childs[j].childs[k].childs[m].childs[n].childs[z].UserInfo[y].username,value:data.items[i].childs[j].childs[k].childs[m].childs[n].childs[z].UserInfo[y].userGuid})
																		departName[i].children[j].children[k].children[m].children[n].children[z].children=departNameSixchild
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}else if(data.items[i].childs[j].UserInfo.length!==0){
									var departNameTwochild=[]
									for(var k=0;k<data.items[i].childs[j].UserInfo.length;k++){
										departNameTwochild.push({name:data.items[i].childs[j].UserInfo[k].username,value:data.items[i].childs[j].UserInfo[k].userGuid})
										departName[i].children[j].children=departNameTwochild
									}
								}
							}
							
						}
					}
					layui.form.render();
					var demo1 = xmSelect.render({
							el: '#demo1', 
							autoRow: true,
							filterable: true,
							tree: {
								show: true,
								showFolderIcon: true,
								showLine: true,
								indent: 20,
								expandedKeys: [ 1 ],
								strict: true,
							},
							filterable: true,
							height: 'auto',
							data(){
								return  departName
							}
					})
					demo1.opened();
				})
	        layer.open({
	            type: 1,
	            area: ['450px', '600px'],
	            title: ['选择人员', 'font-size:18px;'],
	            content: $('.chooserenyuanDiv'),
	            btn: '确定',
	        });
	        $('.layui-layer-btn0').click(function() {
			    var arrName = "";
		        var arrGuid = "";
//		        for (var i = 0; i < $('.label-content .xm-label-block').length; i++) {
//		            arrName += $('.label-content .xm-label-block').eq(i).text() + ","
//		        }
//		        data.val(arrName);
		       	var thisVal=$('xm-select .xm-select-default').val().replace(/,/g,';')
		        if(data.parent().parent().children('input').val()!=''){
		        	$.post('' + EQD_url + '/WorkPlan/Add_Workplan_power.ashx', {
						"companyId": data1.companyId,
						"creater": data1.Guid,
						'type':type,
						'userGuid':thisVal
					},function(data){
						var data=JSON.parse(data)
						if(data.status==200){
							layer.msg('添加成功')
							$.post('' + EQD_url + '/WorkPlan/Get_Workplan_powerBytype.ashx', {
									"companyId": data1.companyId,
									"creater": data1.Guid,
									'type':type
							},function(data){
								var dataRenyuan=JSON.parse(data)
								$("#renyuanchakanTable1").bootstrapTable('load', dataRenyuan.items);
							})
						}else if(data.status==203){
							layer.msg('人员已添加')
						}
					})
		        }
		        
			});
	    }
	     function checkInput1(data){
	    	var arrName=''
	    	var datas=data.val()
	    	datas=datas.split(',')
	    	$.post('http://47.94.173.253:8008/Com/Get_Com_User.ashx',{
					companyId:data1.companyId,
					ParentId:0
				},function(res){
					var data=JSON.parse(res)
					var departName=[]
					var departNameChild=[]
					for(var i=0;i<data.items.length;i++){
						departName.push({name:data.items[i].departName,value:data.items[i].departId})
						if(data.items[i].UserInfo.length!==0){
							var departNameOnechild=[]
							for(var j=0;j<data.items[i].UserInfo.length;j++){
								departNameOnechild.push({name:data.items[i].UserInfo[j].username,value:data.items[i].UserInfo[j].userGuid})
								departName[i].children=departNameOnechild
							}
						}else if(data.items[i].childs.length!==0){
							for(var j=0;j<data.items[i].childs.length;j++){
								departNameChild.push({name:data.items[i].childs[j].departName,value:data.items[i].childs[j].departId})
								departName[i].children=departNameChild
								if(data.items[i].childs[j].childs.length!==0){
									var departNameChild1=[]
									for(var k=0;k<data.items[i].childs[j].childs.length;k++){
										departNameChild1.push({name:data.items[i].childs[j].childs[k].departName,value:data.items[i].childs[j].childs[k].departId})
										departName[i].children[j].children=departNameChild1
										if(data.items[i].childs[j].childs[k].UserInfo.length!==0){
											var departNameThreechild=[]
											for(var m=0;m<data.items[i].childs[j].childs[k].UserInfo.length;m++){
												departNameThreechild.push({name:data.items[i].childs[j].childs[k].UserInfo[m].username,value:data.items[i].childs[j].childs[k].UserInfo[m].userGuid})
												departName[i].children[j].children[k].children=departNameThreechild
											}
										}else if(data.items[i].childs[j].childs[k].childs.length!==0){
											var departNameChild2=[]
											for(var m=0;m<data.items[i].childs[j].childs[k].childs.length;m++){
												departNameChild2.push({name:data.items[i].childs[j].childs[k].childs[m].departName,value:data.items[i].childs[j].childs[k].childs[m].departId})
												departName[i].children[j].children[k].children=departNameChild2
												if(data.items[i].childs[j].childs[k].childs[m].UserInfo.length!==0){
													var departNameFourchild=[]
													for(var n=0;n<data.items[i].childs[j].childs[k].childs[m].UserInfo.length;n++){
														departNameFourchild.push({name:data.items[i].childs[j].childs[k].childs[m].UserInfo[n].username,value:data.items[i].childs[j].childs[k].childs[m].UserInfo[n].userGuid})
														departName[i].children[j].children[k].children[m].children=departNameFourchild
													}
													
												}else if(data.items[i].childs[j].childs[k].childs[m].childs.length!==0){
													var departNameChild3=[]
													for(var n=0;n<data.items[i].childs[j].childs[k].childs[m].childs.length;n++){
														departNameChild3.push({name:data.items[i].childs[j].childs[k].childs[m].childs[n].departName,value:data.items[i].childs[j].childs[k].childs[m].childs[n].departId})
														departName[i].children[j].children[k].children[m].children=departNameChild3
														if(data.items[i].childs[j].childs[k].childs[m].childs[n].UserInfo.length!==0){
															var departNameFivechild=[]
															for(var z=0;z<data.items[i].childs[j].childs[k].childs[m].childs[n].UserInfo.length;z++){
																departNameFivechild.push({name:data.items[i].childs[j].childs[k].childs[m].childs[n].UserInfo[z].username,value:data.items[i].childs[j].childs[k].childs[m].childs[n].UserInfo[z].userGuid})
																departName[i].children[j].children[k].children[m].children[n].children=departNameFivechild
															}
														}else if(data.items[i].childs[j].childs[k].childs[m].childs[n].childs.length!==0){
															var departNameChild4=[]
															for(var z=0;z<data.items[i].childs[j].childs[k].childs[m].childs[n].childs.length;z++){
																departNameChild4.push({name:data.items[i].childs[j].childs[k].childs[m].childs[n].childs[z].departName,value:data.items[i].childs[j].childs[k].childs[m].childs[n].childs[z].departId})
																departName[i].children[j].children[k].children[m].children[n].children=departNameChild4
																if(data.items[i].childs[j].childs[k].childs[m].childs[n].childs[z].UserInfo.length!==0){
																	var departNameSixchild=[]
																	for(var y=0;y<data.items[i].childs[j].childs[k].childs[m].childs[n].childs[z].UserInfo.length;y++){
																		departNameSixchild.push({name:data.items[i].childs[j].childs[k].childs[m].childs[n].childs[z].UserInfo[y].username,value:data.items[i].childs[j].childs[k].childs[m].childs[n].childs[z].UserInfo[y].userGuid})
																		departName[i].children[j].children[k].children[m].children[n].children[z].children=departNameSixchild
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}else if(data.items[i].childs[j].UserInfo.length!==0){
									var departNameTwochild=[]
									for(var k=0;k<data.items[i].childs[j].UserInfo.length;k++){
										departNameTwochild.push({name:data.items[i].childs[j].UserInfo[k].username,value:data.items[i].childs[j].UserInfo[k].userGuid})
										departName[i].children[j].children=departNameTwochild
									}
								}
							}
							
						}
					}
					layui.form.render();
					var demo1 = xmSelect.render({
							el: '#demo1', 
							autoRow: true,
							filterable: true,
							tree: {
								show: true,
								showFolderIcon: true,
								showLine: true,
								indent: 20,
								expandedKeys: [ 1 ],
								strict: true,
							},
							filterable: true,
							height: 'auto',
							data(){
								return  departName
							}
					})
					demo1.opened();
				})
	        layer.open({
	            type: 1,
	            area: ['450px', '600px'],
	            title: ['选择人员', 'font-size:18px;'],
	            content: $('.chooserenyuanDiv'),
	            btn: '确定',
	        });
	        $('.layui-layer-btn0').click(function() {
			    var arrName = "";
		        var arrGuid = "";
		        var arrNum=[]
		        for (var i = 0; i < $('.label-content .xm-label-block').length; i++) {
		            arrName += $('.label-content .xm-label-block').eq(i).text() + ","
					
		        }
		        arrName=arrName.substring(0,arrName.length-1)
		        arrName=arrName.split(',')
		        if(datas[0]!=''){
		        	var datas1=datas.concat(arrName);
		        }else{
		        	var datas1=arrName
		        }
              	var datas2= uniq(datas1)
              	var datas3=''
                for(var i=0;i<datas2.length;i++){
                	datas3+=datas2[i]+','
                }
               	datas3=datas3.substring(0,datas3.length-1)
		       	data.val(datas3)
		       	var thisVal=$('xm-select .xm-select-default').val().replace(/,/g,';')
		        data.parent().parent().children('input').val(thisVal)
		        if(data.parent().parent().children('input').val()!=''){
		        	$.post('' + EQD_url + '/WorkPlan/Add_Workplan_power.ashx', {
						"companyId": data1.companyId,
						"creater": data1.Guid,
						'type':data.parent().parent().index()+1,
						'userGuid':data.parent().parent().children('input').val()
					},function(data){
						var data=JSON.parse(data)
						if(data.status==200){
							layer.msg('添加成功')
						}else if(data.status==203){
							layer.msg('人员已添加')
						}
					})
		        }
		        
			});
	    }
	     function uniq(array){
		    var temp = []; //一个新的临时数组
		    for(var i = 0; i < array.length; i++){
		        if(temp.indexOf(array[i]) == -1){
		            temp.push(array[i]);
		        }
		    }
		    return temp;
		}
	    $('#attendPeople2').click(function() {
	    	checkInput($('#attendPeople2'))
	    });
	    // 主持人修改
	    $('#holdPerson2').click(function() {
	        $.session.set('CPER_set', '4');
	    });
	    // 通知人修改
	    $('#noticePerson2').click(function() {
	        $.session.set('CPER_set', '5');
	    });
	    // 记录人修改
	    $('#recordPerson2').click(function() {
	        $.session.set('CPER_set', '6');
	    });
	    $('#usertype3').change(function() {
	        if ($(this).val() != null) {
	            monthDay2 = $(this).val().join(',');
	        }
	    });
	    $('#usertype4').change(function() {
	        if ($(this).val() != null) {
	            weekDay2 = $(this).val().join(',');
	        }
	    });
	    var holdGuid, recordGuid, noticeGuid, arrGuid2, weekDay, monthDay, meetTime;
	    				
	    $('.addNewrules').click(function(event) {
	        layer.open({
	            type: 1,
	            area: ['800px', '500px'],
	            title: ['添加新的会议设置', 'font-size:18px;'],
	            shadeClose: true, //点击遮罩关闭
	            content: $('.newRulesDiv'),
	            btn: '确定',
	            yes: function(index, layero) {
	                layer.closeAll()
	                if ($('#meetRate').val() == 2) {
	                    meetTime = weekDay;
	                } else if ($('#meetRate').val() == 3) {
	                    meetTime = monthDay;
	                } else if ($('#meetRate').val() == 1) {
	                    meetTime = $('#oneDay').val()
	                } else if ($('#meetRate').val() == 4) {
	                    meetTime = "一次"
	                }
	                $.post('' + EQD_url + '/Meeting/Add_setting.ashx', {
	                    "userGuid": data1.Guid,
	                    "comid": data1.companyId,
	                    "type": $('.meetType').val(),
	                    "frequency": $('#meetRate').val(),
	                    "timeInterval": meetTime,
	                    "startTime": $('#beginTime').val(),
	                    "endTime": $('#endTime').val(),
	                    "place": $('.meetAddress').val(),
	                    "attendees":$('xm-select .xm-select-default').val(),
	                    "compere":$('#holdPerson option:selected').attr('userGuid'),
	                    "recorder":$('#recordPerson option:selected').attr('userGuid'),
	                    "admin":$('#noticePerson option:selected').attr('userGuid'),
	                    "aim": $('.meetAin').val(),
	                    "motion": false
	                }, function(data) {
	                    var dataMeet = JSON.parse(data)
	                    console.log(data)
	                    if (dataMeet.status == 200) {
	                        arrGuid2 = "";
	                        holdGuid = "";
	                        recordGuid = "";
	                        noticeGuid = "";
	                        $('.meetType').val("");
	                        $('#meetRate').val("")
	                        $('#usertype ').val("")
	                         $('#usertype ').parent().children('div').children('button').children('span').text('')
	                          $('#usertype2 ').parent().children('div').children('button').children('span').text('')
	                        $('#usertype2 ').val("")
	                        $('#oneDay').val('')
	                        $('#usertype3').val("")
	                        $('#beginTime').val("")
	                        $('#endTime').val("")
	                        $('#attendPeople').val("")
	                        $('#holdPerson').val("")
	                        $('#recordPerson').val("")
	                        $('#noticePerson').val("")
	                        $('.meetAddress').val("")
	                        $('.meetAin').val("")
	                        $('#provideMore').val('')
	                        loadMeeting()
	                        $('.choosedPerson p').remove()
	                        $('#renyuanchooseTable input').removeAttr('checked')
	                        layer.msg('添加成功')
	                    }else{
	                    	layer.msg('添加失败')
	                    }
	                });
	            }
	        });
	        laydate.render({
	            elem: '#beginTime',
	            type: 'time'
	        });
	        laydate.render({
	            elem: '#endTime',
	            type: 'time'
	        });
	    });
	    // 会议频率
	    $('#meetRate').change(function() {
	        if ($(this).val() == 3) {
	            $('.timeInterval2').show()
	            $('.timeInterval3').hide()
	            $('.timeInterval4').hide()
	        } else if ($(this).val() == 2) {
	            $('.timeInterval3').show()
	            $('.timeInterval2').hide()
	            $('.timeInterval4').hide()
	        } else if ($(this).val() == 1) {
	            $('.timeInterval4').show()
	            $('.timeInterval3').hide()
	            $('.timeInterval2').hide()
	        } else if ($(this).val() == 4) {
	            $('.timeInterval4').hide()
	            $('.timeInterval3').hide()
	            $('.timeInterval2').hide()
	        }
	    });
	    $('#usertype2').change(function() {
	        if ($(this).val() != null) {
	            monthDay = $(this).val().join(',');
	        }
	    });
	    $('#usertype').change(function() {
	        if ($(this).val() != null) {
	            weekDay = $(this).val().join(',');
	        }
	    });
	    //
	    $('#attendPeople').click(function() {
	    	checkInput($('#attendPeople'))
	    });
		
		$('#attendPeople3').click(function() {
		    checkInput($('#attendPeople3'))
		});
		//会议记录协助人
		var assist;
		$('#preEcord_4').click(function() {
			checkInput($('#preEcord_4'))
		});
		
		
	    // 主持人
	    $('#holdPerson').click(function() {
//	        $.session.set('CPER_set', '1');
//	        ChooseFun3($('#holdPerson'),$('#compere4'))
	    });
	    // 通知人
	    $('#noticePerson').click(function() {
//	        $.session.set('CPER_set', '2');
//	        ChooseFun5($('#noticePerson'))
	    });
	    // 记录人
	    $('#recordPerson').click(function() {
//	        $.session.set('CPER_set', '3');
//	        ChooseFun4($('#recordPerson'))
	    });
		
		var holdPerson3;
		var recordPerson3;
		// 会议通知主持人
		$('#holdPerson3').click(function() {
		    $.session.set('CPER_set', '7');
		    console.log($('#holdPerson3').val())
		});
		
		// 会议通知书记员
		$('#recordPerson3').click(function() {
		    $.session.set('CPER_set', '8');
		});
		var preEcord_3;
		var preEcord_8;
		// 会议记录责任人
		$('#preEcord_3').click(function() {
		    $.session.set('CPER_set', '9');
		});
		
		// 会议记录验收人
		$('#preEcord_8').click(function() {
		    $.session.set('CPER_set', '10');
		});
//	    function ChooseFun2() {
//	        layer.open({
//	            type: 1,
//	            area: '700px',
//	            title: ['选择部门人员', 'font-size:18px;'],
//	            shadeClose: true, //点击遮罩关闭
//	            content: $('.chaxunTable')
//	        });
//	        $('#treeDemo4 li').click(function() {
//	            $('#renyuanchooseTable2').bootstrapTable({
//	                data: data4.items,
//	                columns: [{
//	                    field: 'username',
//	                }]
//	            });
//	            $("#renyuanchooseTable2").bootstrapTable('load', data4.items)
//	        });
//	        $("#renyuanchooseTable2").on('click-row.bs.table', function(e, row, $element) {
//	            var option2 = $.session.get('CPER_set');
//	            if (option2 == 1) {
//	                holdGuid = row.userGuid;
//	                $('#holdPerson').val(row.username)
//	                layer.close(layer.index);
//	                $.session.remove('CPER_set');
//	            } else if (option2 == 2) {
//	                noticeGuid = row.userGuid;
//	                $('#noticePerson').val(row.username)
//	                layer.close(layer.index);
//	                $.session.remove('CPER_set');
//	            } else if (option2 == 3) {
//	                recordGuid = row.userGuid;
//	                $('#recordPerson').val(row.username)
//	                layer.close(layer.index);
//	                $.session.remove('CPER_set');
//	            } else if (option2 == 4) {
//	                holdGuid2 = row.userGuid;
//	                $('#holdPerson2').val(row.username)
//	                layer.close(layer.index);
//	                $.session.remove('CPER_set');
//	            } else if (option2 == 5) {
//	                noticeGuid2 = row.userGuid;
//	                $('#noticePerson2').val(row.username)
//	                layer.close(layer.index);
//	                $.session.remove('CPER_set');
//	            } else if (option2 == 6) {
//	                recordGuid2 = row.userGuid;
//	                $('#recordPerson2').val(row.username)
//	                layer.close(layer.index);
//	                $.session.remove('CPER_set');
//	            } else if (option2 == 7) {
//					holdPerson3 = row.userGuid;
//	                $('#holdPerson3').val(row.username)
//	                layer.close(layer.index);
//	                $.session.remove('CPER_set');
//	            } else if (option2 == 8) {
//					recordPerson3 = row.userGuid;
//					console.log(recordPerson3);
//	                $('#recordPerson3').val(row.username)
//	                layer.close(layer.index);
//	                $.session.remove('CPER_set');
//	            } else if (option2 == 9) {
//					preEcord_3 = row.userGuid;
//	                $('#preEcord_3').val(row.username)
//	                layer.close(layer.index);
//	                $.session.remove('CPER_set');
//	            } else if (option2 == 10) {
//					preEcord_8 = row.userGuid;
//	                $('#preEcord_8').val(row.username)
//	                layer.close(layer.index);
//	                $.session.remove('CPER_set');
//	            }
//	        })
//	    }
	    // -----------------------会议设置-----------------------
	    // -----------------------会议通知-----------------------
	    var arr_Meet = []
	    var num6=0
	    $('.huiyitongzhi').click(function() {
	        arr_Meet = []
	        $(this).addClass('pcheck').siblings('p').removeClass('pcheck');
	        $('.huiyiNotice').show().siblings('div').hide();
	        loadMeetingNotice(page)
	        
	        
	    });
	    var meetingNoticedata;
		/*******************  添加新的会议通知 ***************************/
					var CircularId;
					var Circulars; 
					var Circular1; //开始时间
					var Circular2; //结束时间
					var Circular3; //会议地点
					var Circular4; //参会人员
					var Circular5; //主持人
					var Circular6; //书记员
					var Circular7; //要求
					var Circular8; //注意事项
					//Demo
					var Circulars1
					layui.use('form', function() {
						var form = layui.form;
						//监听选中会议Id
						form.on('select(filter)', function(data) {
							var index = $("option[value=" + data.value + "]");
							var index1 = $("option:selected");
							CircularId = index.attr('data-id');
							Circulars = index.attr('value');
							Circulars1=index.attr('Circular41');
							$('#beginTime3').val(index.attr('Circular1'));
							$('#endTime3').val(index.attr('Circular2'));
							$('.meetAddress3').val(index.attr('Circular3'));
							$('#attendPeople3').val(index.attr('Circular4'));
							$('#holdPerson3').val(index.attr('Circular5'));
							$('#holdPerson3').parent().children('div').children('div').children('input').val($('#holdPerson3').val())
							$('#recordPerson3').val(index.attr('Circular6'));
							$('#recordPerson3').parent().children('div').children('div').children('input').val($('#recordPerson3').val())
							$('#meetAin3').val(index.attr('Circular7'));
							$('#note').val(index.attr('Circular8'));
						});
						
					});
		
					
		
					layui.use('laydate', function() {
						var laydate = layui.laydate;
		
						//执行一个laydate实例
						laydate.render({
							elem: '#beginTime3',
							type: 'time'
						});
						laydate.render({
							elem: '#endTime3',
							type: 'time'
						});
						laydate.render({
							elem: '#preEcord_5',
							type: 'datetime'
						});
						laydate.render({
							elem: '#preEcord_6',
							type: 'datetime'
						});laydate.render({
							elem: '#preEcord_9',
							type: 'datetime'
						});
					});
					$('.addCircular').click(function(event) {
				        	$.ajax({
								url: 'http://47.94.173.253:8008/Meeting/Get_Settings.ashx', //你请求的接口
								type: 'POST', //类型
								data: {
									"comid": data1.companyId,
									"userGuid": data1.Guid
								}, //数据有则传，没有可以不写
								success: function(data) {
									CircularType = JSON.parse(data);
									var dates = CircularType.items;
									layer.msg('会议类型加载成功')
									if($("#prepara").html()!=='<option value="请选择" data-id="0">请选择</option>'){
										$("#prepara").html('<option value="请选择" data-id="0">请选择</option>')
									}
									for (let i = 0; i < dates.length; i++) {
										var html1 = "<option value='" + dates[i].type + "' Circular1='" + dates[i].startTime +
											"' data-id='" + dates[i].Id + "' Circular2='" + dates[i].endTime +
											"' Circular3='" + dates[i].place + "' Circular4='" + dates[i].attendeesNum +"' Circular41='" + dates[i].attendees +
											"' Circular5='" + dates[i].compereName + "' Circular6='" + dates[i].recoderName+
											"' Circular7='" + dates[i].aim + "' Circular8='" + dates[i].aim + "'>" + dates[i].type + "</option>";
										$("#prepara").append(html1);
									}
									layui.use('form', function() {
										var form = layui.form;
										form.render();
									})
									if($('#prepara').parent().children('div').children('dl').children('dd').eq(0).text()=='请选择'){
										$('#prepara').parent().children('div').children('dl').children('dd').eq(0).click()
									}
								}
							});
							
						if($('xm-select .xm-select-default').val()!==undefined){
							Circulars1=$('xm-select .xm-select-default').val()
						}
						layer.open({
							type: 1,
							area: ['800px', '500px'],
							title: ['添加新的会议通知', 'font-size:18px;'],
							shadeClose: true, //点击遮罩关闭
							content: $('.newCircular'),
							btn: '确定',
							yes: function(index, layero) {
								layer.closeAll();
								$.post('http://47.94.173.253:8008/Meeting/Add_meettingNotice.ashx', {
									"userGuid": data1.Guid,
									"comid": data1.companyId,
									"settingId": CircularId, //会议设置的Id
									"type": Circulars,
									"startTime": $('#beginTime3').val(),
									"endTime": $('#endTime3').val(),
									"place": $('.meetAddress3').val(),
									"attendees": Circulars1,
									"compere": $('#holdPerson3 option:selected').attr('userGuid'),
									"recorder":$('#recordPerson3 option:selected').attr('userGuid'),
									"aim": $('#meetAin3').val(),
									"note": $('#note').val()
								}, function(data) {
									var dataMeet = JSON.parse(data);
									if (dataMeet.status == 200) {
										layer.msg('添加成功')
										 $.post('' + EQD_url + '/Meeting/Get_metNotices_admin.ashx', {
								            "userGuid": data1.Guid,
								            "comid": data1.companyId,
								            "page": 0
								        }, function(data) {
								        	 meetingNoticedata = JSON.parse(data);
								        	 loadMeetTable(meetingNoticedata.items)
								        })
									}else{
										layer.msg('添加失败')
									}
								});
							}
						});
					});
	    
	    function loadMeetingNotice(page) {
	        $.post('' + EQD_url + '/Meeting/Get_metNotices_admin.ashx', {
	            "userGuid": data1.Guid,
	            "comid": data1.companyId,
	            "page": page
	        }, function(data) {
	            meetingNoticedata = JSON.parse(data);
	            for (var i = 0; i < meetingNoticedata.items.length; i++) {
	                arr_Meet.push(meetingNoticedata.items[i])
	            }
	            if (meetingNoticedata.items.length >= 10) {
	                $('.loadAllMeet').hide()
	                $('.loadMoreMeet').show()
	            } else {
	                $('.loadAllMeet').show()
	                $('.loadMoreMeet').hide()
	            }
	            loadMeetTable(arr_Meet)
	        });
	    }
	    $('.loadMoreMeet').click(function() {
	        loadMeetingNotice(meetingNoticedata.nextpage)
	    });
	
	    function loadMeetTable(data) {
	        $('#meetingNoticeTable').bootstrapTable({
	            data: data,
	            columns: [{
	                field: 'type',
	                title: '会议类型',
	                valign: 'middle',
	                align: 'center',
	            }, {
	                field: 'time',
	                title: '会议时间',
	                valign: 'middle',
	                align: 'center',
	                formatter: meetingTimeFormatter
	            }, {
	                field: 'place',
	                title: '会议地点',
	                valign: 'middle',
	                align: 'center',
	            }, {
	                field: 'option',
	                title: '操作',
	                valign: 'middle',
	                align: 'center',
	                formatter: meetNoticeOptionFormatter,
	                events: meetNoticeEvents
	            }]
	        });
	        $("#meetingNoticeTable").bootstrapTable('load', data);
	
	        function meetingTimeFormatter(row, value, index) {
	            var time1 = value.startTime.split("T")[0];
	            var time2 = value.startTime.split("T")[1].substring(0, 5)
	            var time3 = value.endTime.split("T")[1].substring(0, 5)
	            var time4 = time1 + " " + time2 + "~" + time3
	            return [
	                time4
	            ].join('');
	        }
	
	        function meetNoticeOptionFormatter(row, value, index) {
	           // return ['<a class="lookMeetingNotice" title="查看详情">', '<span id="lookMeetingNotice">查看</span>', '</a>', ].join('');
	            return '<div class="information"><a class="lookMeetingNotice" title="查看详情"><span id="lookMeetingNotice">详情</span></a><div id="click-lasti" title="查看二维码">二维码</div><div id="remember" title="会议纪要">会议纪要</div></div>'
			}
	    }
	    // 查看会议通知详情
	    var arr_meetSign = [];
	    var rowSign;
		var lasticId;
		var faEcord;
	    window.meetNoticeEvents = {
	        'click .lookMeetingNotice': function(e, value, row, index) {
//	            rowSign = row
//	            arr_meetSign = []
//	            layer.open({
//	                type: 1,
//	                area: ['800px', '500px'],
//	                title: ['会议通知详情', 'font-size:18px;'],
//	                shadeClose: true, //点击遮罩关闭
//	                content: $('.meetingNoticeDiv'),
//	            })
//	            $.post('' + EQD_url + '/Meeting/Get_metNoticeDe.ashx', {
//	                "userGuid": data1.Guid,
//	                "comid": data1.companyId,
//	                "noticeId": row.Id
//	            }, function(data) {
//	                // console.log( data )
//	                var dataDetailMeet = JSON.parse(data);
//	                var Mtime1 = dataDetailMeet.items.startTime.split("T")[0];
//	                var Mtime2 = dataDetailMeet.items.startTime.split("T")[1];
//	                var Mtime3 = dataDetailMeet.items.endTime.split("T")[1];
//	                var MtimeAll = Mtime1 + " " + Mtime2 + "~" + Mtime3
//	                $('.meetNoticeAddress').text(dataDetailMeet.items.place);
//	                $('.meetNoticeTime').text(MtimeAll)
//	                $('.meetNoticeHolder').text(dataDetailMeet.items.compere.realName)
//	            });
//	            signDetails(0)
//	            // 签到情况 
//	            var dataSign;
				window.open('../html/meetingm.html?userGuid='+data1.Guid+'&comid='+data1.companyId+'&noticeId='+row.Id)
	        },
			'click #click-lasti': function(e, value, row, index) {
				lasticId = row.Id;
				var lasti_2 = row.startTime.split('T')[0] + ' ' + row.startTime.split('T')[1].split(':')[0] + 
				':' + row.startTime.split('T')[1].split(':')[1];
				$('#lasti_1').text(row.type);
				$('#lasti_2').text(lasti_2);
				$('#lasti_3').text(row.place);
				qrcode.makeCode("http://www.eqidd.com/html/Sign.html?noticeId=" + lasticId + "&type=4");
				$('.Mask').show();
				$('.lasti').show()
			},
			'click #remember': function(e, value, row, index) {
				window.open('../html/Minutes.html?userGuid='+data1.Guid+'&comid='+row.comid+'&noticeId='+row.Id)
			}
	    }
		
		
		var qrcode = new QRCode(document.getElementById("QR_Code"), {
		text: "http://www.eqidd.com/html/Sign.html?noticeId=" + lasticId + "&type=4",
		width: "135",
		height: "135"
		});
		    // 将utf-16 转换成 utf-8【默认字符编码是utf-16】
		    function utf16to8(str) {
		        var out, i, len, c;
		        out = "";
		        len = str.length;
		        for (i = 0; i < len; i++) {
		            c = str.charCodeAt(i);
		            if ((c >= 0x0001) && (c <= 0x007F)) {
		                out += str.charAt(i);
		            } else if (c > 0x07FF) {
		                out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
		                out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
		                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
		            } else {
		                out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
		                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
		            }
		        }
		        return out;
		    }
			
			//点击关闭
			$('.lastic-header span').click(function(){
				$('.Mask').hide();
				$('.lasti').hide();
			});
			
		    // 按钮点击事件
			$('#lastic-button').click(function(){
				$(this).hide();
		          html2canvas($(".lastic"), {
		              allowTaint: true,
		              taintTest: false,
		              onrendered: function (canvas) {
		                  //canvas.id = "lastic";
		                  //document.body.appendChild(canvas);
		                  //生成base64图片数据
		                  var url = canvas.toDataURL();
		                  //以下代码为下载此图片功能
		                  var triggerDownload = $("<a>").attr("href", url).attr("download", (new Date()).getTime() + "girds.png").appendTo("body");
		                  triggerDownload[0].click();
		                  triggerDownload.remove();
		              }
		          })
				  $('#lastic-button').show();
		      })
	
	    function signDetails(page) {
	        $.post('' + EQD_url + '/Meeting/Get_signDetails_meet.ashx', {
	            "userGuid": data1.Guid,
	            "comid": data1.companyId,
	            "noticeId": rowSign.Id,
	            "page": page
	        }, function(data) {
	            dataSign = JSON.parse(data)
	            for (var i = 0; i < dataSign.items.length; i++) {
	                arr_meetSign.push(dataSign.items[i])
	            }
	            if (dataSign.items.length >= 10) {
	                $('.loadAllMeetSign').hide()
	                $('.loadMoreMeetSign').show()
	            } else if (dataSign.items.length < 10) {
	                $('.loadAllMeetSign').show()
	                $('.loadMoreMeetSign').hide()
	            }
	            addSign(arr_meetSign)
	        });
	    }
	    $('.loadMoreMeetSign').click(function() {
	        signDetails(dataSign.nextpage)
	    });
	
	    function addSign(data) {
	        $('#meetingSignTable').bootstrapTable({
	            data: data,
	            columns: [{
	                field: 'userName',
	                title: '姓名',
	                valign: 'middle',
	                align: 'center',
	            }, {
	                field: 'depName',
	                title: '部门',
	                valign: 'middle',
	                align: 'center',
	            }, {
	                field: 'postName',
	                title: '职位',
	                valign: 'middle',
	                align: 'center',
	            }, {
	                field: 'status',
	                title: '状态',
	                valign: 'middle',
	                align: 'center',
	                formatter: signFormatter,
	                cellStyle: signstatusStyle,
	            }, {
	                field: 'signInTime',
	                title: '签到时间',
	                valign: 'middle',
	                align: 'center',
	                formatter: meetingsignTimeFormatter,
	                cellStyle: signTimeStyle,
	            }]
	        });
	        $("#meetingSignTable").bootstrapTable('load', data);
	
	        function signFormatter(row, value, index) {
	            var zhuangtai;
	            if (value.status == -2) {
	                zhuangtai = "未签到"
	            } else if (value.status == -1) {
	                zhuangtai = "迟到";
	            } else if (value.status == 1) {
	                zhuangtai = "正常"
	            }
	            return [
	                zhuangtai
	            ].join('');
	        }
	
	        function meetingsignTimeFormatter(row, value, index) {
	            var signTime;
	            if (value.signInTime == null) {
	                signTime = "无"
	            } else {
	                var timeSign1 = value.signInTime.split("T")[1];
	                signTime = timeSign1.substring(0, 5)
	            }
	            return [
	                signTime
	            ].join('');
	        }
	    }
	    cellStyle: function signstatusStyle(value, row, index) {
	        if (row.status == -2) {
	            return {
	                css: {
	                    "color": "#000"
	                }
	            };
	        } else if (row.status == 1) {
	            return {
	                css: {
	                    "color": "green"
	                }
	            };
	        } else if (row.status == -1) {
	            return {
	                css: {
	                    "color": "#f00"
	                }
	            };
	        }
	    }
	    cellStyle: function signTimeStyle(value, row, index) {
	        if (row.status == -2) {
	            return {
	                css: {
	                    "color": "#000"
	                }
	            };
	        } else if (row.status == 1) {
	            return {
	                css: {
	                    "color": "green"
	                }
	            };
	        } else if (row.status == -1) {
	            return {
	                css: {
	                    "color": "#f00"
	                }
	            };
	        }
	    }
	// ----------------------------------------------会议管理结束JS----------------------------------------
	
	
	// -----------------------会议记录-----------------------	
	$('.Weekwork').click(function() {
	    $(this).addClass('pcheck').siblings('p').removeClass('pcheck');
	    $('.Weekplan').show().siblings('div').hide();
	    WeekplanTable();
	});
	function WeekplanTable() {
		
		//字符串分割申请时间 2019-11-18 09:00:57
		function consta(e, value, index, row) {
			var ar = value.createTime;
			var ar_1=ar.split(" ")[0];
			var ar_3=ar.split(" ")[1].split(':')[0]+':'+ar.split(" ")[1].split(':')[1];
			var ar_4=ar_1+ ' ' +ar_3;
			return ar_4
		}
		
		function operateFormatter(value, row, index) {
			return '<a class="agree" href="javascript:void(0)" title="agree">详情</a>'	
		}
		
		window.operateEvents = {
			'click .agree': function(e, value, row, index) {
				window.open ("http://www.eqidd.com/html/Personnel_summary.html?userGuid="+ row.creater +"&companyId=" + row.companyId + "&Id=" + row.Id + "");
			}
		}		
		$("#WeekplanTable").bootstrapTable({
			url:'http://47.94.173.253:8008/WeekPlan/weekId/weekPlan_listbyAdmin.ashx',
		    method:'post',
			contentType: "application/x-www-form-urlencoded",//post请求的话就加上这个句话				
			queryParams: function (params) {//自定义参数				
			  params.userGuid = data1.Guid;
			  params.page = 0;
			  return params
		    },
			responseHandler: function(res) {
				page = 1;
				return res.items
			},
			columns: [{
				field:'weekNum',
				title:'周数/第几周',
				align: 'center'
			},{
				field:'userName',
				title:'增加人',
				align: 'center'
			},{
				field:'createTime',
				title:'时间',
				align: 'center',
			    formatter: consta
				
			},{
				field: 'operate',
				title: '操作',
				align: 'center',
				events: window.operateEvents,
				formatter: operateFormatter
			}]				
		})
		
		
		// $('.apply').click(function(){
		// 	window.open ("http://www.eqidd.com/html/summary.html?userGuid="+ arr_3 +"&companyId=" + arr_4 + "");
		// })
		//下一步点击事件
		$("#pageBtn").on("click", function() {
			nextPage();
		})
		
		function nextPage() {			
			$.post("http://47.94.173.253:8008/WeekPlan/weekId/weekPlan_listbyAdmin.ashx", {
				userGuid: data1.Guid,
				page: page
			}, function(data) {
				var data = JSON.parse(data);
				if(data.items.length > 0){
					page = data.page;
				}
				if (data.items=='') {
					$('#pageBtn').html('没有更多数据了')
				} else {
					$("#WeekplanTable").bootstrapTable({						
						columns: [{
							formatter: WeekplanTable,
						}]
					})					 
				    $("#WeekplanTable").bootstrapTable("append", data.items);
				}
			})
		}
	}
	
	
	
	
	
	// ----------------------------------------------企业空间JS----------------------------------------
	var num7=0
	$('.renyuanshezhi').click(function() {
		$(this).addClass('pcheck').siblings('p').removeClass('pcheck');
		$('.renyuanShezhi').show().siblings('div').hide();
		loadingManger()
		if(num7==0){
			$.post('' + EQD_url + '/Admin/ComSpace/Get_ComSpaceModular.ashx', {}, function(data) {
				var dataModel = JSON.parse(data);
				for (var i = 0; i < dataModel.items.length; i++) {
					$('#chooseMangerArea').append('<option value="' + dataModel.items[i].ModularName + '">' + dataModel.items[i].ModularName +
						'</option>')
				}
			});
		}
		
	});

	function loadingManger() {
		$.post('' + EQD_url + '/Admin/ComSpaceModularPower/Get_ComSpaceModularPower.ashx', {
			"companyId": data1.companyId
		}, function(data) {
			console.log(data)
			var dataManger = JSON.parse(data)
			loadMangerTable(dataManger.items)
		});
	}

	function loadMangerTable(data) {
		$('#mangerTable').bootstrapTable({
			data: data,
			columns: [{
				field: 'ModularName',
				title: '模块名称',
				align: 'center',
				valign: 'middle',
			}, {
				field: 'staffName',
				title: '管理员名字',
				align: 'center',
				valign: 'middle',
			}, {
				field: 'uname',
				title: '电话',
				align: 'center',
				valign: 'middle',
			}, {
				field: 'option',
				title: '操作',
				align: 'center',
				valign: 'middle',
			}]
		});
		$("#mangerTable").bootstrapTable('load', data);
	}
	var mangerGuid;
	$('.addMangerBtn').click(function() {
		layer.open({
			type: 1,
			area: ['600px', '250px'],
			title: ['添加管理员设置', 'font-size:18px;'],
			content: $('.addMangerDiv'),
			btn: "确定",
			yes: function(index, layero) {
				$.post('' + EQD_url + '/Admin/ComSpaceModularPower/Add_ComSpaceModularPower.ashx', {
					"userGuid": data1.Guid,
					"companyId": data1.companyId,
					"objectGuid": mangerGuid,
					"ModularName": $('#chooseMangerArea').val()
				}, function(data) {
					console.log(data)
					var dataAddManger = JSON.parse(data);
					if (dataAddManger.status == 200) {
						loadingManger()
					}
				});
				layer.close(index);
			}
		});
	});
	$('#chooseManger').click(function() {
		$.session.set('TGHY_set', '9');
		layer.open({
			type: 1,
			area: '800px',
			title: ['选择管理人设置', 'font-size:18px;'],
			content: $('.editNotice'),
			shade: false,
		});
		renyuanLook();
	});
	// 选择模块
	
	// ----------------------------------------------企业空间JS----------------------------------------
	// ----------------------------------------------收费JS----------------------------------------
	$('.shoufeimokuai').click(function() {
		$(this).addClass('pcheck').siblings('p').removeClass('pcheck');
		$('.shoufeiMokuai').show().siblings('div').hide();
		loadingShoufei()
	});

	function loadingShoufei() {
		$.post('' + EQD_url + '/Com/Pay/Get_CompanyPay.ashx', {
			"companyId": data1.companyId
		}, function(data) {
			var dataManger2 = JSON.parse(data)
			loadShoufeiTable(dataManger2.items)
		});
	}

	function loadShoufeiTable(data) {
		$('#shoufeiTable').bootstrapTable({
			data: data,
			columns: [{
				field: 'ModularName',
				title: '模块名称',
				align: 'center',
				valign: 'middle',
			}, {
				field: 'ModularDescribe',
				title: '模块描述',
				align: 'left',
				valign: 'middle',
			}, {
				field: 'time',
				title: '起始时间',
				align: 'center',
				valign: 'middle',
				formatter: shouFeiFormatter
			}, {
				field: 'option',
				title: '操作',
				align: 'center',
				valign: 'middle',
				formatter: optionShoufeiFormatter,
				events: optionShoufeiEvents
			}]
		});
		$("#shoufeiTable").bootstrapTable('load', data);

		function shouFeiFormatter(e, value, row, index) {
			var timeShouFei
			if (value.Id != 0) {
				var time1 = value.powerStartTime.split(" ")[0];
				var time2 = value.powerEndTime.split(" ")[0];
				timeShouFei = time1 + "~" + time2;
			} else {
				timeShouFei = "未开通"
			}
			return [
				timeShouFei
			].join('');
		};

		function codeFormatter(e, value, row, index) {
			var codeShouFei
			if (value.Id != 0) {
				codeShouFei = value.OrderCode
			} else {
				codeShouFei = "未开通"
			}
			return [
				codeShouFei
			].join('');
		};

		function optionShoufeiFormatter(e, value, row, index) {
			var btnVal;
			if (value.Id != 0) {
				btnVal = '<a class="payBtn1"  title="续费按钮"><span id="payBtn1">续费</span></a>'
			} else {
				btnVal = '<a class="payBtn2"  title="开通按钮"><span id="payBtn2">开通</span></a>'
			}
			return [
				btnVal
			].join('');
		};
	}
	window.optionShoufeiEvents = {
		'click .payBtn1': function(e, value, row, index) {
			layer.open({
				type: 1,
				area: ['400px', '150px'],
				title: ['支付', 'font-size:18px;'],
				content: $('.jiaofeiDiv'),
			});
			$('#paySucceed').click(function() {
				loadingShoufei()
				layer.closeAll()
			});
			$('#pauError').click(function() {
				layer.closeAll()
			});
			window.open("../html/pay.html?name=" + row.ModularName + "")
		},
		'click .payBtn2': function(e, value, row, index) {
			layer.open({
				type: 1,
				area: ['400px', '150px'],
				title: ['支付', 'font-size:18px;'],
				content: $('.jiaofeiDiv'),
			});
			$('#paySucceed').click(function() {
				loadingShoufei()
				layer.closeAll()
			});
			$('#pauError').click(function() {
				layer.closeAll()
			});
			window.open("../html/pay.html?name=" + row.ModularName + "")
		}
	}
	// ----------------------------------------------收费JS----------------------------------------
	// ----------------------------------------------交易记录JS----------------------------------------
	var tradePage, type;
	var arr_trade = []
	$('.jiaofeijilv').click(function() {
		$(this).addClass('pcheck').siblings('p').removeClass('pcheck');
		$('.jiaofeijilvDiv').show().siblings('div').hide();
		arr_trade = []
		$('#tradeType').val(1)
		loadTrade(0, 1)
	});
	$('#tradeType').change(function() {
		arr_trade = []
		type = $(this).val()
		loadTrade(0, type)
	});

	function loadTrade(page, type) {
		$.post('' + EQD_url + '/ComSpace/ComSpacePayRecord/Get_ComSpacePayRecord.ashx', {
			"companyId": data1.companyId,
			"page": page,
			"orderType": type
		}, function(data) {
			var dataTable = JSON.parse(data);
			tradePage = dataTable.page;
			for (var i = 0; i < dataTable.items.length; i++) {
				arr_trade.push(dataTable.items[i])
			}
			loadTradeTable(arr_trade)
			if (dataTable.items.length > 9) {
				$('.loadMoreTrade').show()
				$('.loadAllTrade').hide()
			} else {
				$('.loadMoreTrade').hide()
				$('.loadAllTrade').show()
			}
		});
	}
	$('.loadMoreTrade').click(function() {
		loadTrade(tradePage, $('#tradeType').val());
	});

	function loadTradeTable(data) {
		$('#tradeTable').bootstrapTable({
			data: data,
			columns: [{
				field: 'OrderCode',
				title: '订单号',
				align: 'center',
				valign: 'middle',
			}, {
				field: 'amountMondy',
				title: '缴费金额(元)',
				align: 'center',
				valign: 'middle',
			}, {
				field: 'type',
				title: '付费方式',
				align: 'center',
				valign: 'middle',
			}, {
				field: 'funcType',
				title: '付费内容',
				align: 'center',
				valign: 'middle',
			}, {
				field: 'years',
				title: '付费时长(年)',
				align: 'center',
				valign: 'middle',
			}, {
				field: 'status',
				title: '是否付款',
				align: 'center',
				valign: 'middle',
				formatter: statusFormatter
			}, {
				field: 'createTime',
				title: '付费日期',
				align: 'center',
				valign: 'middle',
				formatter: payFormatter
			}]
		});
		$("#tradeTable").bootstrapTable('load', data);

		function payFormatter(e, value, row, index) {
			var timePay = value.createTime.split(" ")[0].replace(/\//g, '-')
			return [
				timePay
			].join('');
		};

		function statusFormatter(e, value, row, index) {
			var statusPay;
			if (value.status == 1) {
				statusPay = "已付款"
			} else if (value.status == -2) {
				statusPay = "未付款"
			}
			return [
				statusPay
			].join('');
		};
	}
	function setJurisdiction(){
		$.post('' + EQD_url + '/WorkPlan/Get_Workplan_power.ashx', {
			"companyId": data1.companyId,
			"creater": data1.Guid,
		}, function(data) {
			var data=JSON.parse(data)
			if (data.status == 200) {
				setAuthority(data.items)
			}
		});
	}
	
	var hidetext=''
	var num12=0
	
	function setAuthority(data) {
		// 不包括最高领导和人事权限,
		// 页面显示表
		var arr=['公司目标','公司级年度营业计划','部门级年度经营计划','部门级月度经营计划','部门级周计划','部门级日计划']
		var arr1=['如：董事长，总经理(一般为企业最高行政长官)','如：总经理，常务副总...','如：业务部经理，研发部经理，采购部经理...','如：业务部经理，研发部经理，采购部经理...','如：业务部经理，研发部经理，采购部经理...','如：业务部经理，研发部经理，采购部经理...']
		for(var i=0;i<data.length;i++){
			var uname1=''
			var li=$('<li><p>'+(i+1)+'.'+arr[i]+'：请选择负责制定"'+arr[i]+'"的人</p><input type="hidden" class="hideAuthor'+i+'"/><div><input type="text" id="topPerson" class="form-control authority" placeholder="'+arr1[i]+'"/><span class="setJurisdiction">操作</span></div></li>')
			if($('.gongzuoShezhi ul li').length<=data.length-1){
				$('.gongzuoShezhi ul').append(li)
			}
			for(var j=0;j<data[i].length;j++){
				hidetext+=data[i][j].obj_userGuid+';'
				uname1+=data[i][j].upname+','
				$('.gongzuoShezhi ul li').eq(i).children('input').val(hidetext)
			}
			uname1=uname1.substring(0,uname1.length-1)
			$('.gongzuoShezhi ul li').eq(i).children('div').children('input').val(uname1)
		}
		$(".authority").off("click").on("click",function() {
			checkInput1($(this))
		});
		$(".setJurisdiction").off("click").on("click",function(){
			var arr=['公司目标','公司级年度营业计划','部门级年度经营计划','部门级月度经营计划','部门级周计划','部门级日计划']
			var indexNum=$(this).parent().parent().index()+1
			$('.renyuanChakan1 p').text(arr[indexNum-1]+'权限人员设置')
				$('.renyuanChakan1').show()
				$('.gongzuoShezhi').hide()
				$.post('' + EQD_url + '/WorkPlan/Get_Workplan_powerBytype.ashx', {
						"companyId": data1.companyId,
						"creater": data1.Guid,
						'type':$(this).parent().parent().index()+1
				},function(data){
					var dataRenyuan=JSON.parse(data)
					$('#renyuanchakanTable1').bootstrapTable({
						data: dataRenyuan.items,
						onCheckAll:function(rows){
	      					$('.renyuanChakan1 .renyuancaozuo .deleteThis').prop('disabled',false)       
						},
						onUncheckAll:function(rows){
	      					$('.renyuanChakan1 .renyuancaozuo .deleteThis').prop('disabled',true)       
						},
						onCheck:function(row){
					      $('.renyuanChakan1 .renyuancaozuo .deleteThis').prop('disabled',false)     
					    },
					    onUncheck:function(row){
					      $('.renyuanChakan1 .renyuancaozuo .deleteThis').prop('disabled',true)         
					    },
						columns: [{
							title:'全选',
							checkbox:true,
							align:"center"
						},{
							field: 'upname',
							title: '名字',
							align:"center"
						},{
							title:'操作',
							align:"center",
							events: personEvents,
							formatter: personFormatter,
						}]
					});
					
					$("#renyuanchakanTable1").bootstrapTable('load', dataRenyuan.items);
					function personFormatter(value, row, index) {
						return ['<a class="removeAuthority" id="removeAuthority">', '<span id="authorityDelete">删除</span>', '</a>',
						].join('');
					}
					$('.renyuanChakan1 .renyuancaozuo .addThis').off("click").on("click",function(){
							checkInput2($(this),indexNum)
					})
					$('.renyuanChakan1 .renyuancaozuo .deleteThis').off("click").on("click",function(){
						 let rows = $("#renyuanchakanTable1").bootstrapTable('getSelections');
						  if(rows.length==0){
							 	layer.msg('请选择要删除的人员')
							 	return;
							 }else{
						 	let userid=''
						 	$(rows).each(function(){
						 		userid+=this.Id+';'
						 	})
						 	userid=userid.substring(0,userid.length-1)
							layer.confirm('您确定要删除该人员吗？', {
								  btn: ['确定','取消'] //按钮
								}, function(){
									 $.post('' + EQD_url + '/WorkPlan/Del_Workplan_power.ashx', {
										"companyId": data1.companyId,
										"creater": data1.Guid,
										'Id':userid
									},function(data){
										var data=JSON.parse(data)
										console.log(data)
										if(data.status==200){
											layer.msg('删除成功')
											$.post('' + EQD_url + '/WorkPlan/Get_Workplan_powerBytype.ashx', {
													"companyId": data1.companyId,
													"creater": data1.Guid,
													'type':indexNum
											},function(data){
												var dataRenyuan=JSON.parse(data)
												$("#renyuanchakanTable1").bootstrapTable('load', dataRenyuan.items);
											})
										}
									})
								}, function(){
									layer.msg('取消操作')
								});
							 }
						})
				})
				
				
			})
		window.personEvents={
			'click #authorityDelete':function(e,value,row,index){
				layer.confirm('您确定要删除该人员吗？', {
				  btn: ['确定','取消'] //按钮
				}, function(){
					 $.post('' + EQD_url + '/WorkPlan/Del_Workplan_power.ashx', {
						"companyId": data1.companyId,
						"creater": data1.Guid,
						'Id':row.Id
					},function(data){
						console.log()
						var data=JSON.parse(data)
						if(data.status==200){
							layer.msg('删除成功')
							$("#renyuanchakanTable1").bootstrapTable('remove', {
								field: 'Id',
								values: [row.Id],
							});
						}
						
					})
				}, function(){
					layer.msg('取消操作')
				});
				
				
				
			}
		}
//		var uname2=$('.gongzuoShezhi ul li').eq(i).children('div').children('input').val()
//		uname2=uname2.substring(0,uname2.length-1)
//		$('.gongzuoShezhi ul li').eq(i).children('div').children('input').val(uname2)
//		console.log(uname1)
	};
	
	var num11=0
	$(".gongzuoshezhi").off("click").on("click",function(){
		$(this).addClass('pcheck').siblings('p').removeClass('pcheck');
		$('.gongzuoShezhi').show().siblings('div').hide();
			setJurisdiction()
		
	})
	// ----------------------------------------------交易记录JS----------------------------------------
	$('.quanxianshezhi').click(function() {
		$(this).addClass('pcheck').siblings('p').removeClass('pcheck');
		$('.quanxianShezhi').show().siblings('div').hide();
		renyuanLook();
		LookShen()
		HR()
		
		// 最高领导人设置
		$.post('' + EQD_url + '/Com/Get_TopAdmin.ashx', {
			"companyId": data1.companyId
		}, function(data) {
			dataTopleader = JSON.parse(data);
			console.log(dataTopleader)
			if (data1.isAdmin != 2) {
				if (dataTopleader.items != "未设置") {
					$('.topLeader .setTopleader').hide()
					$('.topLeader .topLeaderBtn').hide()
					$('.topLeader .layui-form').hide()
					$('.topLeader .showLeader1').show()
					var time1=setTimeout(function(){
						$('.showLeader1').text(dataTopleader.items)
						clearTimeout(time1)
					},300)
				} else {
					$('.topLeader .showLeader1').hide()
					$('.topLeader .layui-form').show()
					$('.setTopleader').click(function() {
						http://47.94.173.253:8008/SetUp/Set_Admin_ByCompany.ashx
						$.post('' + EQD_url + '/SetUp/Set_TopLeaders.ashx', {
							"companyId": data1.companyId,
							"userGuid": data1.Guid,
							"topLeader": $('.showLeader option:selected').attr('userGuid')
						}, function(data) {
							$.session.remove('TGHY_set');
							var dataHRC = JSON.parse(data);
							if (dataHRC.status == 200) {
								layer.msg('设置成功', {
									time: 1000,
								});	
								HR();
								layer.closeAll();
							} else {
								layer.msg(dataHRC.msg, {
									time: 1000,
								});
							}
						});

//						$.session.set('TGHY_set', '6');
//						$('.cover').show();
//						layer.open({
//							type: 1,
//							area: ['500px','600px'],
//							title: ['最高领导设置', 'font-size:18px;'],
//							// shadeClose: true, //点击遮罩关闭
//							content: $('.editNotice'),
//							shade: false
//						});
						
						
//						$('.layui-layer-btn0').click(function() {
//							$('.cover').hide()
//						})
//						$('.layui-layer-close').click(function() {
//							closeLayer()
//						})
					})
				}
			}
		});
		// 最高领导人转让
		if (data1.isAdmin == 2) {
			$('.topLeaderBtn').show()
			$('.topLeader .setTopleader').hide()
			$('.topLeaderBtn').click(function() {
				$.session.set('TGHY_set', '8');
				$('.cover').show();
				layer.open({
					type: 1,
					area: '800px',
					title: ['最高领导设置', 'font-size:18px;'],
					content: $('.editNotice'),
					shade: false
				});
				renyuanLook();
				$('.layui-layer-btn0').click(function() {
					$('.cover').hide()
				})
				$('.layui-layer-close').click(function() {
					closeLayer()
				})
			})
		}
		// ***************增加审批人设置*******************************************
		$('.addcheckerBtn').click(function() {
			$('.cover').show()
			layer.open({
				type: 1,
				area: '800px',
				title: ['增加审批人设置', 'font-size:18px;'],
				content: $('.addcheck'),
				btn: '确定',
				shade: false
			});
			$('.layui-layer-close').click(function() {
				$('.addcheck form input').val('');
				$('.cover').hide()
			});
			$('.checkName').click(function() {
				$.session.set('TGHY_set', '4');
				layer.open({
					type: 1,
					area: '800px',
					title: ['选择审批人', 'font-size:18px;'],
					content: $('.editNotice'),
					shade: false
				});
				renyuanLook();
			});
			var sepIds = "";
			var sepments = "";
			$('.checkDep').click(function() {
				layer.open({
					type: 1,
					area: '520px',
					title: ['选择部门', 'font-size:18px;'],
					content: $('.checkChooseDep'),
					btn: '确定',
					shade: false
				});
				var dataDeped;
				$.post('' + EQD_url + '/SetUp/Get_Department.ashx', {
					"companyId": data1.companyId
				}, function(data) {
					dataDeped = JSON.parse(data);
					$('#checkAddTable').bootstrapTable({
						data: dataDeped.items,
						columns: [{
							checkbox: 'checkbox',
							title: '选择'
						}, {
							field: 'department',
							title: '审批部门',
						}]
					});
					$("#checkAddTable").bootstrapTable('load', dataDeped.items);
				});
				$('.layui-layer-btn0').click(function() {
					for (var i = 0; i < $("#checkAddTable").bootstrapTable('getAllSelections').length; i++) {
						sepIds += $("#checkAddTable").bootstrapTable('getAllSelections')[i].departId + ",";
						sepments += $("#checkAddTable").bootstrapTable('getAllSelections')[i].department + ",";
					}
					var depment1;
					depment1 = sepments.substring(0, sepments.length - 1);
					$('.checkDep').val(depment1)
				});
			});
			$('.layui-layer-btn0').click(function() {
				var depid4;
				depid4 = sepIds.substring(0, sepIds.length - 1);
				$.post('' + EQD_url + '/SetUp/Add_QuitChecker.ashx', {
					"companyId": data1.companyId,
					"userGUid": data1.Guid,
					"cheker": rowdets.u1,
					"departmentIds": depid4
				}, function(data) {
					var datacheckS = JSON.parse(data);
					if (datacheckS.status == 200) {
						layer.msg(datacheckS.msg, {
							time: 1000,
						});
						lookCheck();
						$('.addcheck form input').val('');
					} else {
						layer.msg(datacheckS.msg, {
							time: 1000,
						});
						$('.addcheck form input').val('');
					}
				});
			});
		});
		// ***************增加审批人设置结束*******************************************
		lookCheck();
		// 设置通告审批人
		$('.noticeBtn').click(function() {
			$.session.set('TGHY_set', '1')
			$('.cover').show();
			layer.open({
				type: 1,
				area: ['500px', '600px'],
				title: ['通告审批人设置', 'font-size:18px;', ],
				content: $('.editNotice'),
				shade: false
			});
			renyuanLook()
			$('.layui-layer-close').click(function() {
				closeLayer()
			})
		});
		//通知审批人设置JS
		$('.attentionBtn').click(function() {
			$.session.set('TGHY_set', '2')
			$('.cover').show();
			layer.open({
				type: 1,
				area: ['500px', '600px'],
				title: ['通知的审批人设置', 'font-size:18px;'],
				content: $('.editNotice'),
				shade: false
			});
			renyuanLook()
			$('.layui-layer-close').click(function() {
				closeLayer()
			})
		});
		// 设置通告审批人JS
		$('.attentionBtn2').click(function() {
			$.session.set('TGHY_set', '7')
			$('.cover').show();
			layer.open({
				type: 1,
				area: ['500px', '600px'],
				title: ['通告的审批人设置', 'font-size:18px;'],
				content: $('.editNotice'),
				shade: false
			});
			renyuanLook()
			$('.layui-layer-close').click(function() {
				closeLayer()
			})
		});
		// 企业人事设置JS
		$('.HRBtn').click(function() {
			$.session.set('TGHY_set', '3')
			$('.cover').show();
			layer.open({
				type: 1,
				area: ['500px', '600px'],
				title: ['企业人事审批人设置', 'font-size:18px;'],
				content: $('.editNotice'),
				shade: false
			});
			renyuanLook()
			$('.layui-layer-close').click(function() {
				closeLayer()
			})
		});
	});
	// ******************权限设置结束************************
	// **********************************************系统设置结束*************************************************************
	var dataTime;

	function loadBanci() {
		$.post('' + EQD_url + '/SetUp/Get_Shift_ByCompany.ashx', {
			"companyId": data1.companyId
		}, function(data) {
			dataTime = JSON.parse(data);
			$('#bancishezhiTable').bootstrapTable({
				data: dataTime.items,
				columns: [{
					field: 'shiftName',
					title: '班次名称'
				}, {
					field: 'startTime1',
					title: '考勤时间',
					formatter: timeFormatter
				}, {
					field: 'banciOperate',
					title: '操作',
					events: banciEvents,
					formatter: banciFormatter
				}]
			});
			$("#bancishezhiTable").bootstrapTable('load', dataTime.items);
		});

		function timeFormatter(value, row, index) {
			var time1;
			var time2;
			var time3;
			var time4;

			function shifen() {
				var myString1 = dataTime.items[index].startTime1;
				var myString3 = dataTime.items[index].startTime2;
				var myString5 = dataTime.items[index].startTime3;
				var myString7 = dataTime.items[index].startTime4;
				var myString2 = dataTime.items[index].endTime1;
				var myString4 = dataTime.items[index].endTime2;
				var myString6 = dataTime.items[index].endTime3;
				var myString8 = dataTime.items[index].endTime4;
				var a = myString1.substring(0, 5);
				var b = myString3.substring(0, 5);
				var c = myString5.substring(0, 5);
				var d = myString7.substring(0, 5);
				var A = myString2.substring(0, 5);
				var B = myString4.substring(0, 5);
				var C = myString6.substring(0, 5);
				var D = myString8.substring(0, 5);
				time1 = a + "~" + A;
				time2 = b + "~" + B;
				time3 = c + "~" + C;
				time4 = d + "~" + D;
			}
			shifen();
			if (dataTime.items[index].startTime2 == "00:00:00" && dataTime.items[index].endTime2 == "00:00:00") {
				time2 = " ";
			};
			if (dataTime.items[index].startTime3 == "00:00:00" && dataTime.items[index].endTime3 == "00:00:00") {
				time3 = " ";
			};
			if (dataTime.items[index].startTime4 == "00:00:00" && dataTime.items[index].endTime4 == "00:00:00") {
				time4 = " ";
			};
			var timeTotle = time1 + "&nbsp;&nbsp;&nbsp;&nbsp;" + time2 + "&nbsp;&nbsp;&nbsp;&nbsp;" + time3 +
				"&nbsp;&nbsp;&nbsp;&nbsp;" + time4;
			return [
				timeTotle
			].join('');
		};

		function banciFormatter(e, value, row, index) {
			return ['<a class="banci"  title="Banci">', '<span id="banci">编辑</span>', '</a>  ',
				'<a class="removeBanci" id="removeBanci">', '<span id="banciDelete">删除</span>', '</a>',
			].join('');
		};
	}
	$('.paibanguanli').click(function() {
		$(".bancishezhi").slideToggle(200);
		$(".banbieshezhi").slideToggle(200);
	});
//	$('.bancishezhi').click(function() {
//		$(this).addClass('pcheck').siblings('p').removeClass('pcheck');
//		$('.banciShezhi').show().siblings('div').hide();
//		$('.banbieShezhi').hide();
//		$('.addbanbieShezhi').hide();
//		$('.renyuanChakan').hide();
//		loadBanci()
//		// 删除班次操作
//		window.banciEvents = {
//			'click .removeBanci': function(e, value, row, index) {
//				$('.cover').show()
//				layer.open({
//					type: 1,
//					area: '400px',
//					title: ['删除班次设置', 'font-size:18px;'],
//					content: $('.delBanci'),
//					btn: '确定',
//					shade: false
//				});
//				$('.delbanciname').text("“" + row.shiftName + "”");
//				$('.layui-layer-btn0').click(function() {
//					$('.cover').hide();
//					$.post('' + EQD_url + '/SetUp/Delete_Shift.ashx', {
//						"userGuid": row.creater,
//						"companyId": row.companyId,
//						"shiftId": row.Id
//					}, function(data) {
//						var dataDel = JSON.parse(data);
//						if (dataDel.status == 200) {
//							layer.msg('删除成功', {
//								time: 1000,
//							});
//							loadBanci()
//						}
//					});
//				});
//				$('.layui-layer-close').click(function() {
//					$('.cover').hide()
//				});
//			},
//			'click .banci': function(e, value, row, index) {
//				layer.open({
//					type: 1,
//					area: '700px',
//					title: ['编辑班次设置', 'font-size:18px;'],
//					content: $('.editBanci'),
//					btn: '确定',
//					shade: false
//				});
//				panduan()
//				$('.cover').show();
//				$('.tr1 .addDate').click(function() {
//					$('.tr2').show();
//					$(this).hide();
//					$(".tr2").attr('id', 'kejian');
//				});
//				$('.tr2 .addDate').click(function() {
//					$('.tr3').show();
//					$(this).hide();
//					$(".tr3").attr('id', 'kejian');
//					$('.tr3 .addDate').show()
//				});
//				$('.tr3 .addDate').click(function() {
//					$('.tr4').show();
//					$(this).hide();
//					$(".tr4").attr('id', 'kejian');
//				});
//				$('.tr2 .delDate').click(function() {
//					$('.tr2').hide();
//					$('.tr1 .addDate').show();
//					$(".tr2").removeAttr('id');
//				});
//				$('.tr3 .delDate').click(function() {
//					$('.tr3').hide();
//					$('.tr2 .addDate').show();
//					$(".tr3").removeAttr('id');
//				});
//				$('.tr4 .delDate').click(function() {
//					$('.tr4').hide();
//					$('.tr3 .addDate').show();
//					$(".tr4").removeAttr('id');
//				});
//				$('.editName input').val(row.shiftName);
//				//    获取原来班次数据
//				var hour1 = (row.startTime1).substring(0, 2);
//				var min1 = (row.startTime1).substring(3, 5);
//				var hour2 = (row.endTime1).substring(0, 2);
//				var min2 = (row.endTime1).substring(3, 5);
//				var hour3 = (row.startTime2).substring(0, 2);
//				var min3 = (row.startTime2).substring(3, 5);
//				var hour4 = (row.endTime2).substring(0, 2);
//				var min4 = (row.endTime2).substring(3, 5);
//				var hour5 = (row.startTime3).substring(0, 2);
//				var min5 = (row.startTime3).substring(3, 5);
//				var hour6 = (row.endTime3).substring(0, 2);
//				var min6 = (row.endTime3).substring(3, 5);
//				var hour7 = (row.startTime4).substring(0, 2);
//				var min7 = (row.startTime4).substring(3, 5);
//				var hour8 = (row.endTime4).substring(0, 2);
//				var min8 = (row.endTime4).substring(3, 5);
//				$('.editBanci .tr1 .time-wrap1 #hour').val(hour1);
//				$('.editBanci .tr1 .time-wrap1 .minite select').val(min1);
//				$('.editBanci .tr1 .time-wrap2 #hour').val(hour2);
//				$('.editBanci .tr1 .time-wrap2 .minite2 select').val(min2);
//				$('.editBanci .tr2 .time-wrap1 #hour').val(hour3);
//				$('.editBanci .tr2 .time-wrap1 .minite select').val(min3);
//				$('.editBanci .tr2 .time-wrap2 #hour').val(hour4);
//				$('.editBanci .tr2 .time-wrap2 .minite2 select').val(min4);
//				$('.editBanci .tr3 .time-wrap1 #hour').val(hour5);
//				$('.editBanci .tr3 .time-wrap1 .minite select').val(min5);
//				$('.editBanci .tr3 .time-wrap2 #hour').val(hour6);
//				$('.editBanci .tr3 .time-wrap2 .minite2 select').val(min6);
//				$('.editBanci .tr4 .time-wrap1 #hour').val(hour7);
//				$('.editBanci .tr4 .time-wrap1 .minite select').val(min7);
//				$('.editBanci .tr4 .time-wrap2 #hour').val(hour8);
//				$('.editBanci .tr4 .time-wrap2 .minite2 select').val(min8);
//				// 根据数据生成相应的时间段
//				function panduan() {
//					if ((row.endTime4 != "00:00:00" || row.startTime4 != "00:00:00")) {
//						$('form>div').show();
//						$('.addDate').hide();
//					} else if ((row.endTime4 == "00:00:00" && row.startTime4 == "00:00:00") && (row.endTime3 != "00:00:00" ||
//							row.startTime3 != "00:00:00")) {
//						$('.tr2').show();
//						$('.tr3').show();
//						$('.tr4').hide();
//						$('.addDate').hide();
//						$('.tr3 .addDate').show();
//					} else if ((row.endTime4 == "00:00:00" && row.startTime4 == "00:00:00") && (row.endTime3 == "00:00:00" &&
//							row.startTime3 == "00:00:00") && (row.endTime2 != "00:00:00" || row.startTime2 != "00:00:00")) {
//						$('.tr2').show();
//						$('.tr3').hide();
//						$('.tr4').hide();
//						$('.addDate').hide();
//						$('.tr2 .addDate').show();
//					} else if ((row.endTime4 == "00:00:00" && row.startTime4 == "00:00:00") && (row.endTime3 == "00:00:00" &&
//							row.startTime3 == "00:00:00") && (row.endTime2 == "00:00:00" && row.startTime2 == "00:00:00")) {
//						$('.tr2').hide();
//						$('.tr3').hide();
//						$('.tr4').hide();
//						$('.tr1 .addDate').show();
//					}
//				}
//				//点击确定
//				$('.layui-layer-btn0').click(function() {
//					$('.cover').hide();
//					var newTime1 = $('.editBanci .tr1 .time-wrap1 #hour').val() + ":" + $(
//						'.editBanci .tr1 .time-wrap1 .minite select').val();
//					var newTime2 = $('.editBanci .tr1 .time-wrap2 #hour').val() + ":" + $(
//						'.editBanci .tr1 .time-wrap2 .minite2 select').val();
//					// 编辑班次中改变原来的班次
//					if ($(".tr2").css("display") == 'block') {
//						var newTime3 = $('.editBanci .tr2 .time-wrap1 #hour').val() + ":" + $(
//							'.editBanci .tr2 .time-wrap1 .minite select').val();
//						var newTime4 = $('.editBanci .tr2 .time-wrap2 #hour').val() + ":" + $(
//							'.editBanci .tr2 .time-wrap2 .minite2 select').val();
//					} else {
//						newTime3 = "00:00:00";
//						newTime4 = "00:00:00";
//					}
//					if ($(".tr3").css("display") == 'block') {
//						var newTime5 = $('.editBanci .tr3 .time-wrap1 #hour').val() + ":" + $(
//							'.editBanci .tr3 .time-wrap1 .minite select').val();
//						var newTime6 = $('.editBanci .tr3 .time-wrap2 #hour').val() + ":" + $(
//							'.editBanci .tr3 .time-wrap2 .minite2 select').val();
//					} else {
//						newTime5 = "00:00:00";
//						newTime6 = "00:00:00";
//					}
//					if ($(".tr4").css("display") == 'block') {
//						var newTime7 = $('.editBanci .tr4 .time-wrap1 #hour').val() + ":" + $(
//							'.editBanci .tr4 .time-wrap1 .minite select').val();
//						var newTime8 = $('.editBanci .tr4 .time-wrap2 #hour').val() + ":" + $(
//							'.editBanci .tr4 .time-wrap2 .minite2 select').val();
//					} else {
//						newTime7 = "00:00:00";
//						newTime8 = "00:00:00";
//					}
//					if ($('.editName input').val().length > 0) {
//						$.post('' + EQD_url + '/SetUp/Update_Shift.ashx', {
//							"userGuid": row.creater,
//							"companyId": row.companyId,
//							"shiftId": row.Id,
//							"shiftName": $('.editName input').val(),
//							"startTime1": newTime1,
//							"endTime1": newTime2,
//							"startTime2": newTime3,
//							"endTime2": newTime4,
//							"startTime3": newTime5,
//							"endTime3": newTime6,
//							"startTime4": newTime7,
//							"endTime4": newTime8
//						}, function(data) {
//							var dataUp = JSON.parse(data);
//							row.startTime1 = newTime1;
//							row.endTime1 = newTime2;
//							row.startTime2 = newTime3;
//							row.endTime2 = newTime4;
//							row.startTime3 = newTime5;
//							row.endTime3 = newTime6;
//							row.startTime4 = newTime7;
//							row.endTime4 = newTime8;
//							row.shiftName = $('.editName input').val();
//							if (dataUp.status == 200) {
//								loadBanci()
//								panduan()
//								document.getElementById("myForm").reset();
//							}
//						});
//					} else {
//						layer.msg('请输入名字', {
//							time: 1000,
//						});
//					}
//				});
//				$('.layui-layer-close').click(function() {
//					$('.cover').hide()
//				});
//			}
//		}
//	});
	// *******************************************************班别操作**********************************************************
	var dataBanbie;

	function loadBanbie() {
		$.post('' + EQD_url + '/Classban/Get_Classbie.ashx', {
			"companyId": data1.companyId,
			'creater':data1.Guid
		}, function(data) {
			dataBanbie = JSON.parse(data);
			console.log(dataBanbie)
			$('#banbieshezhiTable').bootstrapTable({
				data: dataBanbie.items,
				
				columns: [{
					field: 'ClassName',
					title: '班别名称'
				}, {
					field: 'list_user',
					title: '人员',
					events: renyuanEvents,
					formatter: renyuanFormatter
				}, {
					field: 'WorkDay',
					title: '工作日',
					// events: banciEvents,
					formatter: workdayFormatter
				},{
					field:'list_banci',
					title:'时间',
					formatter: timeFormatter
				}, {
					field: 'banbieOption',
					title: '操作',
					events: banbieEvents,
					formatter: banbieFormatter
				}]
			});

			function renyuanFormatter(value, row, index) {
				return ['<a class="chakan"  title="Chakan">', '<span id="chakan">查看</span>', '</a>  ', ].join('');
			}
			function timeFormatter(value,row,index){
				
//					for(var i=0;i<value.length;i++){
//						if(value.length>=1){
//							var weekTime=value[i].startTime+' '+value[i].endTime
//						}
//					console.log(111)

//					}
				if(value.length!==0){
					if(value.length==1){
						return value[0].startTime+'~'+value[0].endTime
					}else if(value.length==2){
						return value[0].startTime+'~'+value[0].endTime+' '+value[1].startTime+'~'+value[1].endTime
					}else if(value.length==3){
						return value[0].startTime+'~'+value[0].endTime+' '+value[1].startTime+'~'+value[1].endTime+' '+value[2].startTime+'~'+value[2].endTime
					}else if(value.length==4){
						return value[0].startTime+'~'+value[0].endTime+' '+value[1].startTime+'~'+value[1].endTime+' '+value[2].startTime+'~'+value[2].endTime+' '+value[3].startTime+'~'+value[3].endTime
					}else if(value.length==5){
						return value[0].startTime+'~'+value[0].endTime+' '+value[1].startTime+'~'+value[1].endTime+' '+value[2].startTime+'~'+value[2].endTime+' '+value[3].startTime+'~'+value[3].endTime+' '+value[4].startTime+'~'+value[4].endTime
					}else if(value.length==6){
						return value[0].startTime+'~'+value[0].endTime+' '+value[1].startTime+'~'+value[1].endTime+' '+value[2].startTime+'~'+value[2].endTime+' '+value[3].startTime+'~'+value[3].endTime+' '+value[4].startTime+'~'+value[4].endTime+' '+value[5].startTime+'~'+value[5].endTime
					}
					
				}


			}
			function workdayFormatter(value, row, index) {
//				var workDay = row.weeks + " " + row.Holidays;
				return row.WorkDay;
			}

			function banbieFormatter(value, row, index) {
				return ['<a class="banbie"  title="Banbie">', '<span id="banbie">编辑</span>', '</a>  ',
					'<a class="removeBanbie" id="removeBanbie">', '<span id="banbieDelete">删除</span>', '</a>',
				].join('');
			}
			$("#banbieshezhiTable").bootstrapTable('load', dataBanbie.items);
		});
	}
	$('.banbieshezhi').click(function() {
		$(this).addClass('pcheck').siblings('p').removeClass('pcheck');
		$('.banbieShezhi').show().siblings('div').hide();
		$('.banciShezhi').hide();
		$('.addbanbieShezhi').hide();
		$('.renyuanChakan').hide();
		$('.showNumber1 i').text(0)
		loadBanbie();
	});
	// **********************************************************班别操作**********************************************
	
	var dataRenyuan, banCiId,rowid;
	function chakanBanbie(){
		
	}
	window.renyuanEvents = {
		'click .chakan': function(e, value, row, index) {
			$('.renyuanChakan').show();
			$('.addbanbieShezhi').hide();
			$('.banbieShezhi').hide();
			rowid=row.Id
			console.log(row.Id)
			$.post('' + EQD_url + '/Classban/Get_banbie_user.ashx', {
				"companyId": data1.companyId,
				'creater':data1.Guid,
				"banbieId": row.Id
			}, function(data) {
				dataRenyuan = JSON.parse(data);
				console.log(dataRenyuan)
				$('#renyuanchakanTable').bootstrapTable({
					data: dataRenyuan.items,
					onCheckAll:function(rows){
      					$('.renyuanChakan .renyuancaozuo .deleteThis').prop('disabled',false)       
					},
					onUncheckAll:function(rows){
      					$('.renyuanChakan .renyuancaozuo .deleteThis').prop('disabled',true)       
					},
					onCheck:function(row){
				      $('.renyuanChakan .renyuancaozuo .deleteThis').prop('disabled',false)     
				    },
				    onUncheck:function(row){
				      $('.renyuanChakan .renyuancaozuo .deleteThis').prop('disabled',true)         
				    },
					columns: [{
						title:'全选',
						checkbox:true
					},{
						field: 'list_upname',
						title: '名字',
					}, {
						field: 'list_departname',
						title: '部门',
					}, {
						field: 'list_posttname',
						title: '职位',
					},{
						title:'操作',
						events: renyuanEvents1,
						formatter: renyuanFormatter1
					}]
				});
				$("#renyuanchakanTable").bootstrapTable('load', dataRenyuan.items);
				function renyuanFormatter1(value, row, index) {
					return ['<a class="removeBanbie1" id="removeBanbie1">', '<span id="banbieDelete1">删除</span>', '</a>',
					].join('');
				}
				$('.renyuanChakan .renyuancaozuo .deleteThis').click(function(){
					 var rows = $("#renyuanchakanTable").bootstrapTable('getSelections');
					 if(rows.length==0){
					 	layer.msg('请选择要删除的人员')
					 	return;
					 }else{
					 	var userid=''
					 	$(rows).each(function(){
					 		userid+=this.userGuid+';'
					 	})
					 	userid = userid.substring(0,userid.length - 1)
					 	layer.open({
							type: 1,
							area: '400px',
							title: ['删除人员设置', 'font-size:18px;'],
							content: $('.removerenyuanTable'),
							btn: '确定',
							shade: false
						});
						$('.layui-layer-btn0').click(function() {
							$.post('' + EQD_url + '/Classban/Del_Banbie_user.ashx', {
								"companyId": data1.companyId,
								'creater':data1.Guid,
								"banbieId": row.Id,
								'userGuid':userid
							},function(data){
								var dataDelete = JSON.parse(data);
								if (dataDelete.status == 200) {
									$.post('' + EQD_url + '/Classban/Get_banbie_user.ashx', {
										"companyId": data1.companyId,
										'creater':data1.Guid,
										"banbieId": row.Id
									}, function(data) {
										dataRenyuan = JSON.parse(data);
										$('#renyuanchakanTable').bootstrapTable({
											data: dataRenyuan.items,
											columns: [{
												title:'全选',
												checkbox:true
											},{
												field: 'list_upname',
												title: '名字',
											}, {
												field: 'list_departname',
												title: '部门',
											}, {
												field: 'list_posttname',
												title: '职位',
											},{
												title:'操作',
												events: renyuanEvents1,
												formatter: renyuanFormatter1
											}]
										});
										$("#renyuanchakanTable").bootstrapTable('load', dataRenyuan.items);
									})
									layer.msg('删除成功', {
										time: 1000,
									});
								}
							})
							$('.cover').hide();
						});
					 }
						
					})
				$('.renyuanChakan .renyuancaozuo .addThis').click(function(){
					reqRenyuan()
					
						var index = layer.open({
							type: 1,
							area: ['700px', '600px'],
							title: ['添加人员', 'font-size:18px;'],
							content: $('.chooserenyuanDiv'),
							btn: '确定',
							shade: false,
							yes: function(index, layero) {
								$('.cover').hide();
								var arr=$('.xm-select-default').val()
								var strGuid2=arr.replace(/,/g,';')
								console.log(rowid)
								$.post('' + EQD_url + '/Classban/Add_Banbie_user.ashx', {
									"creater": data1.Guid,
									"companyId": data1.companyId,
									"banbieId": rowid,
									"userGuid": strGuid2
								}, function(data) {
									$.post('' + EQD_url + '/Classban/Get_banbie_user.ashx', {
										"companyId": data1.companyId,
										'creater':data1.Guid,
										"banbieId": rowid
									}, function(data) {
										$('.xm-select-default').val('')
										dataRenyuan = JSON.parse(data);
										$('#renyuanchakanTable').bootstrapTable({
											data: dataRenyuan.items,
											columns: [{
												title:'全选',
												checkbox:true
											},{
												field: 'list_upname',
												title: '名字',
											}, {
												field: 'list_departname',
												title: '部门',
											}, {
												field: 'list_posttname',
												title: '职位',
											},{
												title:'操作',
												events: renyuanEvents1,
												formatter: renyuanFormatter1
											}]
										});
										$("#renyuanchakanTable").bootstrapTable('load', dataRenyuan.items);
										layer.msg('添加成功')
									})
								});
								layer.close(index); //如果设定了yes回调，需进行手工关闭
							}
						});
						$('.cover').show();
						$('.layui-layer-close').click(function() {
							$('.cover').hide();
						})
					})
			});
		}
	};
//	window.quanxuanEvents1={
//		 onCheckAll:function(rows){
//    		console.log(rows);
//		 	}
////		'click':function(e, value, row, index){
////			console.log(111)
////		}
//	}
	window.renyuanEvents1={
		'click .removeBanbie1': function(e, value, row, index) {
			layer.open({
				type: 1,
				area: '400px',
				title: ['删除人员设置', 'font-size:18px;'],
				content: $('.removerenyuanTable'),
				btn: '确定',
				shade: false
			});
			console.log(rowid)
			$('.layui-layer-btn0').click(function() {
				$.post('' + EQD_url + '/Classban/Del_Banbie_user.ashx', {
					"companyId": data1.companyId,
					'creater':data1.Guid,
					"banbieId": rowid,
					'userGuid':row.userGuid
				},function(data){
					var dataDelete = JSON.parse(data);
					console.log(dataDelete)
					if (dataDelete.status == 200) {
						layer.msg('删除成功', {
							time: 1000,
						});
						$("#renyuanchakanTable").bootstrapTable('remove', {
							field: 'Id',
							values: [row.Id],
						});
					}
				})
				$('.cover').hide();
			});
		}
	}
	var table = $('.addbanbieShezhi');
	var renyuanTable = $('.chooserenyuanDiv');
	var banbiechooseTable = $('.choosebanbieDiv');
	// ********************************************选择人员**************************************************************
	$('.banzuNumber button').click(function() {
		layer.open({
			type: 1,
			area: ['800px', '600px'],
			title: ['选择人员', 'font-size:18px;'],
			content: $('.chooserenyuanDiv'),
			btn: '确定',
			shade: false
		});
		$('.cover').show();
				$.post('http://47.94.173.253:8008/Com/Get_Com_User.ashx',{
					companyId:data1.companyId,
					ParentId:0
				},function(res){
					var data=JSON.parse(res)
					var departName=[]
					var departNameChild=[]
					for(var i=0;i<data.items.length;i++){
						departName.push({name:data.items[i].departName,value:data.items[i].departId})
						if(data.items[i].UserInfo.length!==0){
							var departNameOnechild=[]
							for(var j=0;j<data.items[i].UserInfo.length;j++){
								departNameOnechild.push({name:data.items[i].UserInfo[j].username,value:data.items[i].UserInfo[j].userGuid})
								departName[i].children=departNameOnechild
							}
						}else if(data.items[i].childs.length!==0){
							for(var j=0;j<data.items[i].childs.length;j++){
								departNameChild.push({name:data.items[i].childs[j].departName,value:data.items[i].childs[j].departId})
								departName[i].children=departNameChild
								if(data.items[i].childs[j].childs.length!==0){
									var departNameChild1=[]
									for(var k=0;k<data.items[i].childs[j].childs.length;k++){
										departNameChild1.push({name:data.items[i].childs[j].childs[k].departName,value:data.items[i].childs[j].childs[k].departId})
										departName[i].children[j].children=departNameChild1
										if(data.items[i].childs[j].childs[k].UserInfo.length!==0){
											var departNameThreechild=[]
											for(var m=0;m<data.items[i].childs[j].childs[k].UserInfo.length;m++){
												departNameThreechild.push({name:data.items[i].childs[j].childs[k].UserInfo[m].username,value:data.items[i].childs[j].childs[k].UserInfo[m].userGuid})
												departName[i].children[j].children[k].children=departNameThreechild
											}
										}else if(data.items[i].childs[j].childs[k].childs.length!==0){
											var departNameChild2=[]
											for(var m=0;m<data.items[i].childs[j].childs[k].childs.length;m++){
												departNameChild2.push({name:data.items[i].childs[j].childs[k].childs[m].departName,value:data.items[i].childs[j].childs[k].childs[m].departId})
												departName[i].children[j].children[k].children=departNameChild2
												if(data.items[i].childs[j].childs[k].childs[m].UserInfo.length!==0){
													var departNameFourchild=[]
													for(var n=0;n<data.items[i].childs[j].childs[k].childs[m].UserInfo.length;n++){
														departNameFourchild.push({name:data.items[i].childs[j].childs[k].childs[m].UserInfo[n].username,value:data.items[i].childs[j].childs[k].childs[m].UserInfo[n].userGuid})
														departName[i].children[j].children[k].children[m].children=departNameFourchild
													}
													
												}else if(data.items[i].childs[j].childs[k].childs[m].childs.length!==0){
													var departNameChild3=[]
													for(var n=0;n<data.items[i].childs[j].childs[k].childs[m].childs.length;n++){
														departNameChild3.push({name:data.items[i].childs[j].childs[k].childs[m].childs[n].departName,value:data.items[i].childs[j].childs[k].childs[m].childs[n].departId})
														departName[i].children[j].children[k].children[m].children=departNameChild3
														if(data.items[i].childs[j].childs[k].childs[m].childs[n].UserInfo.length!==0){
															var departNameFivechild=[]
															for(var z=0;z<data.items[i].childs[j].childs[k].childs[m].childs[n].UserInfo.length;z++){
																departNameFivechild.push({name:data.items[i].childs[j].childs[k].childs[m].childs[n].UserInfo[z].username,value:data.items[i].childs[j].childs[k].childs[m].childs[n].UserInfo[z].userGuid})
																departName[i].children[j].children[k].children[m].children[n].children=departNameFivechild
															}
														}else if(data.items[i].childs[j].childs[k].childs[m].childs[n].childs.length!==0){
															var departNameChild4=[]
															for(var z=0;z<data.items[i].childs[j].childs[k].childs[m].childs[n].childs.length;z++){
																departNameChild4.push({name:data.items[i].childs[j].childs[k].childs[m].childs[n].childs[z].departName,value:data.items[i].childs[j].childs[k].childs[m].childs[n].childs[z].departId})
																departName[i].children[j].children[k].children[m].children[n].children=departNameChild4
																if(data.items[i].childs[j].childs[k].childs[m].childs[n].childs[z].UserInfo.length!==0){
																	var departNameSixchild=[]
																	for(var y=0;y<data.items[i].childs[j].childs[k].childs[m].childs[n].childs[z].UserInfo.length;y++){
																		departNameSixchild.push({name:data.items[i].childs[j].childs[k].childs[m].childs[n].childs[z].UserInfo[y].username,value:data.items[i].childs[j].childs[k].childs[m].childs[n].childs[z].UserInfo[y].userGuid})
																		departName[i].children[j].children[k].children[m].children[n].children[z].children=departNameSixchild
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}else if(data.items[i].childs[j].UserInfo.length!==0){
									var departNameTwochild=[]
									for(var k=0;k<data.items[i].childs[j].UserInfo.length;k++){
										departNameTwochild.push({name:data.items[i].childs[j].UserInfo[k].username,value:data.items[i].childs[j].UserInfo[k].userGuid})
										departName[i].children[j].children=departNameTwochild
									}
								}
							}
							
						}
					}
					layui.form.render();
					var demo1 = xmSelect.render({
							el: '#demo1', 
							autoRow: true,
							filterable: true,
							tree: {
								show: true,
								showFolderIcon: true,
								showLine: true,
								indent: 20,
								expandedKeys: [ -1 ],
								strict: true,
							},
							filterable: true,
							height: 'auto',
							data(){
								return  departName
							}
					})
					demo1.opened();
				})
				$('.layui-layer-btn0').click(function() {
					var arrName = $('.label-content .xm-label-block ').length
					$('.showNumber1 i').text(arrName);
					$('.cover').hide();
					var arr=$('.xm-select-default').val()
					var strGuid=arr.replace(/,/g,';')
					strGuid.slice(strGuid.length)+';'
					console.log(strGuid)
				});
				$('.layui-layer-close').click(function() {
					$('.cover').hide();
				})
	});
	$("#renyuanchooseTable").on('check.bs.table', function(e, row, $element) {
		$('.choosedPerson').append('<p id="' + row.userGuid + '" class="clearfix"><span>' + row.username +
			'</span><span class="glyphicon glyphicon-trash pull-right"></span></p>')
		$('.choosedPerson p span').eq(1).click(function() {
			var removeId2 = $(this).parent("p").attr('id');
			$('.choosedPerson #' + removeId2 + '').remove()
		});
	})
	$("#renyuanchooseTable").on('check-all.bs.table', function(e, row, $element) {
		// console.log( row )
		for (var i = 0; i < row.length; i++) {
			$('.choosedPerson').append('<p id="' + row[i].userGuid + '" class="clearfix"><span>' + row[i].username +
				'</span><span class="glyphicon glyphicon-trash pull-right"></span></p>')
		}
	})
	$("#renyuanchooseTable").on('uncheck.bs.table', function(e, row, $element) {
		var removeId = $('.choosedPerson').children('p').attr('id');
		$('.choosedPerson #' + removeId + '').remove()
	})
	$("#renyuanchooseTable").on('uncheck-all.bs.table', function(e, row, $element) {
		var arr_removeId = [];
		for (var i = 0; i < row.length; i++) {
			arr_removeId.push(row[i].userGuid)
			$('.choosedPerson #' + arr_removeId[i] + '').remove()
		}
	})
	$('.clearChoosed').click(function() {
		$('.choosedPerson p').remove()
	});
	window.banbieEvents = {
		'click .removeBanbie': function(e, value, row, index) {
			layer.open({
				type: 1,
				area: '400px',
				title: ['删除班别设置', 'font-size:18px;'],
				content: $('.removebanbieTable'),
				btn: '确定',
				shade: false
			});
			$('.delbanbiename').text(row.ruleName);
			$('.layui-layer-btn0').click(function() {
				$.post('' + EQD_url + '/Classban/Del_Classbie.ashx', {
					"creater": data1.Guid,
					"banbieId": row.Id,
					"companyId": data1.companyId
				}, function(data) {
					var dataDelete = JSON.parse(data);
					if (dataDelete.status == 200) {
						layer.msg('删除成功', {
							time: 1000,
						});
						$("#banbieshezhiTable").bootstrapTable('remove', {
							field: 'Id',
							values: [row.Id],
						});
					}
				});
				$('.cover').hide();
			});
		},
		'click .banbie': function(e, value, row, index) {
			$('.showNumber1').hide()
			$('.showNumber').show()
			layer.open({
				type: 1,
				area:['1000px','700px'],
				title: ['修改排班规则', 'font-size:18px;'],
				content: $('.changebanbieShezhi'),
				btn: '确定修改',
				// shade: false
			});
			$('.cover').show()
			$('#changebanbie .tr1 .addDate').click(function() {
					$('#changebanbie .tr2').show();
					$(this).hide();
					$("#changebanbie .tr2").attr('id', 'kejian');
				});
				$('#changebanbie .tr2 .addDate').click(function() {
					$('#changebanbie .tr3').show();
					$(this).hide();
					$("#changebanbie .tr3").attr('id', 'kejian');
					$('#changebanbie .tr3 .addDate').show()
				});
				$('#changebanbie .tr3 .addDate').click(function() {
					$('#changebanbie .tr4').show();
					$(this).hide();
					$("#changebanbie .tr4").attr('id', 'kejian');
				});
				$('#changebanbie .tr4 .addDate').click(function() {
					$('#changebanbie .tr5').show();
					$(this).hide();
					$("#changebanbie .tr5").attr('id', 'kejian');
				});
				$('#changebanbie .tr5 .addDate').click(function() {
					$('#changebanbie .tr6').show();
					$(this).hide();
					$("#changebanbie .tr6").attr('id', 'kejian');
				});
				$('#changebanbie .tr2 .delDate').click(function() {
					$('#changebanbie .tr2').hide();
					$('#changebanbie .tr1 .addDate').show();
					$("#changebanbie .tr2").removeAttr('id');
				});
				$('#changebanbie .tr3 .delDate').click(function() {
					$('#changebanbie .tr3').hide();
					$('#changebanbie .tr2 .addDate').show();
					$("#changebanbie .tr3").removeAttr('id');
				});
				$('#changebanbie .tr4 .delDate').click(function() {
					$('#changebanbie .tr4').hide();
					$('#changebanbie .tr3 .addDate').show();
					$("#changebanbie .tr4").removeAttr('id');
				});
				$('#changebanbie .tr5 .delDate').click(function() {
					$('#changebanbie .tr5').hide();
					$('#changebanbie .tr4 .addDate').show();
					$("#changebanbie .tr5").removeAttr('id');
				});
				$('#changebanbie .tr6 .delDate').click(function() {
					$('#changebanbie .tr6').hide();
					$('#changebanbie .tr5 .addDate').show();
					$("#changebanbie .tr6").removeAttr('id');
				});
				var startTime=''
				var endTime=''
				if(row.list_banci.length!==0){
					for(var i=0;i<row.list_banci.length;i++){
						startTime+=row.list_banci[i].startTime+';'
						endTime+=row.list_banci[i].endTime+';'
					}
					startTime = startTime.substr(0, startTime.length - 1)
					endTime = endTime.substr(0, endTime.length - 1)
				}
			$('.banzuName input').val(row.ClassName);
			
				$.post('' + EQD_url + '/Classban/Get_banbie_user.ashx',{
					'creater':data1.Guid,
					'companyId':data1.companyId,
					"banbieId":row.Id
				},function(data){
					var datarenyuanList = JSON.parse(data);
					var namedList = [];
					for (var i = 0; i < datarenyuanList.items.length; i++) {
						datarenyuanList.items[i].usrename;
						namedList[i] = '<p>' + datarenyuanList.items[i].usrename + '</p>';
						$(".showNumber i").text(datarenyuanList.items.length);
					}
				})
			// 修改人员
		
			$('.banzuNumber2 button').off("click").on("click",function(){
				$('.renyuanChakan').show();
				$('.addbanbieShezhi').hide();
				$('.banbieShezhi').hide();
				$('.layui-layer-close').click()
				rowid=row.Id
				$.post('' + EQD_url + '/Classban/Get_banbie_user.ashx', {
					"companyId": data1.companyId,
					'creater':data1.Guid,
					"banbieId": row.Id
				}, function(data) {
					dataRenyuan = JSON.parse(data);
					$('#renyuanchakanTable').bootstrapTable({
						data: dataRenyuan.items,
						onCheckAll:function(rows){
      						$('.renyuanChakan .renyuancaozuo .deleteThis').prop('disabled',false)       
						},
						onUncheckAll:function(rows){
	      					$('.renyuanChakan .renyuancaozuo .deleteThis').prop('disabled',true)       
						},
						onCheck:function(row){
					      $('.renyuanChakan .renyuancaozuo .deleteThis').prop('disabled',false)     
					    },
					    onUncheck:function(row){
					      $('.renyuanChakan .renyuancaozuo .deleteThis').prop('disabled',true)         
					    },
						columns: [{
							title:'全选',
							checkbox:true
						},{
							field: 'list_upname',
							title: '名字',
						}, {
							field: 'list_departname',
							title: '部门',
						}, {
							field: 'list_posttname',
							title: '职位',
						},{
							title:'操作',
							events: renyuanEvents1,
							formatter: renyuanFormatter1
						}]
					});
					$("#renyuanchakanTable").bootstrapTable('load', dataRenyuan.items);
					function renyuanFormatter1(value, row, index) {
						return ['<a class="removeBanbie1" id="removeBanbie1">', '<span id="banbieDelete1">删除</span>', '</a>',
						].join('');
					}
					$('.renyuanChakan .renyuancaozuo .deleteThis').click(function(){
						 var rows = $("#renyuanchakanTable").bootstrapTable('getSelections');
						 if(rows.length==0){
						 	layer.msg('请选择要删除的人员')
						 	return;
						 }else{
						 	var userid=''
						 	$(rows).each(function(){
						 		userid+=this.userGuid+';'
						 	})
						 	userid = userid.substring(0,userid.length - 1)
						 	layer.open({
								type: 1,
								area: '400px',
								title: ['删除人员设置', 'font-size:18px;'],
								content: $('.removerenyuanTable'),
								btn: '确定',
								shade: false
							});
							$('.layui-layer-btn0').click(function() {
								$.post('' + EQD_url + '/Classban/Del_Banbie_user.ashx', {
									"companyId": data1.companyId,
									'creater':data1.Guid,
									"banbieId": row.Id,
									'userGuid':userid
								},function(data){
									var dataDelete = JSON.parse(data);
									console.log(dataDelete)
									if (dataDelete.status == 200) {
										$.post('' + EQD_url + '/Classban/Get_banbie_user.ashx', {
											"companyId": data1.companyId,
											'creater':data1.Guid,
											"banbieId": row.Id
										}, function(data) {
											dataRenyuan = JSON.parse(data);
											console.log(dataRenyuan)
											$('#renyuanchakanTable').bootstrapTable({
												data: dataRenyuan.items,
												columns: [{
													title:'全选',
													checkbox:true
												},{
													field: 'list_upname',
													title: '名字',
												}, {
													field: 'list_departname',
													title: '部门',
												}, {
													field: 'list_posttname',
													title: '职位',
												},{
													title:'操作',
													events: renyuanEvents1,
													formatter: renyuanFormatter1
												}]
											});
											$("#renyuanchakanTable").bootstrapTable('load', dataRenyuan.items);
										})
										layer.msg('删除成功', {
											time: 1000,
										});
									}
								})
								$('.cover').hide();
							});
						 }
						 
						
					})
					$('.renyuanChakan .renyuancaozuo .addThis').click(function(){
						reqRenyuan()
						var index = layer.open({
							type: 1,
							area: ['700px', '600px'],
							title: ['添加人员', 'font-size:18px;'],
							content: $('.chooserenyuanDiv'),
							btn: '确定',
							shade: false,
							yes: function(index, layero) {
								$('.cover').hide();
								var arr=$('.xm-select-default').val()
								var strGuid2=arr.replace(/,/g,';')
								console.log(rowid)
								$.post('' + EQD_url + '/Classban/Add_Banbie_user.ashx', {
									"creater": data1.Guid,
									"companyId": data1.companyId,
									"banbieId": rowid,
									"userGuid": strGuid2
								}, function(data) {
									console.log(data)
									$.post('' + EQD_url + '/Classban/Get_banbie_user.ashx', {
										"companyId": data1.companyId,
										'creater':data1.Guid,
										"banbieId": rowid
									}, function(data) {
										dataRenyuan = JSON.parse(data);
										console.log(dataRenyuan)
										$('#renyuanchakanTable').bootstrapTable({
											data: dataRenyuan.items,
											columns: [{
												title:'全选',
												checkbox:true
											},{
												field: 'list_upname',
												title: '名字',
											}, {
												field: 'list_departname',
												title: '部门',
											}, {
												field: 'list_posttname',
												title: '职位',
											},{
												title:'操作',
												events: renyuanEvents1,
												formatter: renyuanFormatter1
											}]
										});
										$("#renyuanchakanTable").bootstrapTable('load', dataRenyuan.items);
										layer.msg('添加成功')
									})
								});
								layer.close(index); //如果设定了yes回调，需进行手工关闭
							}
						});
						$('.cover').show();
						$('.layui-layer-close').click(function() {
							$('.cover').hide();
						})
					})
				});
			});
			// ************默认选择上班日期***********************
			var arrWeeks = row.WorkDay.split(";");
			var arrJieri = row.WorkDay.split(";");
			for (var i = 0; i < arrWeeks.length; i++) {
				$("input[name='week2'][value='" + arrWeeks[i] + "']").prop("checked", true);
			}
			for (var i = 0; i < arrJieri.length; i++) {
				$("input[name='jieri2'][value='" + arrJieri[i] + "']").prop("checked",true);
			}
			// ***************************************默认选择班次*****************************************
//			$(".choosedbanciName").text(row.shiftName);
//			// 选择班次
//			banCiId = row.ShiftId;
//			$("#banbiechooseTable").on('click-row.bs.table', function(e, row, $element) {
//				$('.choosedbanciName').text(row.shiftName)
//				banCiId = row.Id
//				layer.close(layer.index);
//				$('.cover').hide();
//			})
			$.post('' + EQD_url + '/Classban/Get_Banbie_ci.ashx', {
				"banbieId": row.Id,
				'creater':data1.Guid,
				'companyId':data1.companyId
			},function(data){
				var banciTime=JSON.parse(data).items
				for(var i=0;i<banciTime.length;i++){
					var startTimefir=banciTime[i].startTime.substring(0, 2)
					var startTimeend=banciTime[i].startTime.substring(3,5)
					var endTimefir=banciTime[i].endTime.substring(0,2)
					var endTimeend=banciTime[i].endTime.substring(3,5)
					$('#changebanbie .tr'+(i+1)+' .time-wrap1 #hour').val(startTimefir);
					$('#changebanbie .tr'+(i+1)+' .time-wrap1 .minite select').val(startTimeend);
					$('#changebanbie .tr'+(i+1)+' .time-wrap2 #hour').val(endTimefir);
					$('#changebanbie .tr'+(i+1)+' .time-wrap2 .minite2 select').val(endTimeend);
					if(i!==0){
						$('#changebanbie .tr1 .addDate').hide();
					}
					$('#changebanbie .tr'+(i+1)+'').attr('id','kejian')
					$('#changebanbie .tr'+(i+1)+'').show();
					$('#changebanbie .tr1 .addDate').show();
					$('#changebanbie .tr2 .addDate').show();
					$('#changebanbie .tr3 .addDate').show();
					$('#changebanbie .tr4 .addDate').show();
					$('#changebanbie .tr5 .addDate').show();
					$('#changebanbie .tr6 .addDate').show();
				}
			})
			// ****************************修改班别****************************************
			$('.layui-layer-btn0').click(function() {
				if ($('#changebanbie #bancishuju>div:visible:eq(0) .time-wrap1 select').val() < 10) {
					var shangban1 = $('#changebanbie #bancishuju>div:visible:eq(0) .time-wrap1 select').val();
				} else {
					shangban1 = $('#changebanbie #bancishuju>div:visible:eq(0) .time-wrap1 select').val();
				}
				var shangban11 = shangban1 + ":" + $('#changebanbie #bancishuju>div:visible:eq(0) .minite select').val()
				if ($('#changebanbie #bancishuju>div:visible:eq(0) .time-wrap2 select').val() < 10) {
					var xiaban1 = $('#changebanbie #bancishuju>div:visible:eq(0) .time-wrap2 select').val();
				} else {
					xiaban1 = $('#changebanbie #bancishuju>div:visible:eq(0) .time-wrap2 select').val();
				}
				var xiaban11 = xiaban1 + ":" + $('#changebanbie #bancishuju>div:visible:eq(0) .minite2 select').val()
				if ($('#changebanbie #bancishuju>div:visible:eq(1) .time-wrap1 select').val() < 10) {
					var shangban2 = $('#changebanbie #bancishuju>div:visible:eq(1) .time-wrap1 select').val();
				} else {
					shangban2 = $('#changebanbie #bancishuju>div:visible:eq(1) .time-wrap1 select').val();
				}
				var shangban22 = shangban2 + ":" + $('#changebanbie #bancishuju>div:visible:eq(1) .minite select').val()
				if ($('#changebanbie #bancishuju>div:visible:eq(1) .time-wrap2 select').val() < 10) {
					var xiaban2 = $('#changebanbie #bancishuju>div:visible:eq(1) .time-wrap2 select').val();
				} else {
					xiaban2 = $('#changebanbie #bancishuju>div:visible:eq(1) .time-wrap2 select').val();
				}
				var xiaban22 = xiaban2 + ":" + $('#changebanbie #bancishuju>div:visible:eq(1) .minite2 select').val()
				if ($('#changebanbie #bancishuju>div:visible:eq(2) .time-wrap1 select').val() < 10) {
					var shangban3 = $('#changebanbie #bancishuju>div:visible:eq(2) .time-wrap1 select').val();
				} else {
					shangban3 = $('#changebanbie #bancishuju>div:visible:eq(2) .time-wrap1 select').val();
				}
				var shangban33 = shangban3 + ":" + $('#changebanbie #bancishuju>div:visible:eq(2) .minite select').val()
				if ($('#changebanbie #bancishuju>div:visible:eq(2) .time-wrap2 select').val() < 10) {
					var xiaban3 = $('#changebanbie #bancishuju>div:visible:eq(2) .time-wrap2 select').val();
				} else {
					xiaban3 = $('#changebanbie #bancishuju>div:visible:eq(2) .time-wrap2 select').val();
				}
				var xiaban33 = xiaban3 + ":" + $('#changebanbie #bancishuju>div:visible:eq(2) .minite2 select').val()
				if ($('#changebanbie #bancishuju>div:visible:eq(3) .time-wrap1 select').val() < 10) {
					var shangban4 = $('#changebanbie #bancishuju>div:visible:eq(3) .time-wrap1 select').val();
				} else {
					shangban4 = $('#changebanbie #bancishuju>div:visible:eq(3) .time-wrap1 select').val();
				}
				var shangban44 = shangban4 + ":" + $('#changebanbie #bancishuju>div:visible:eq(3) .minite select').val()
				if ($('#changebanbie #bancishuju>div:visible:eq(3) .time-wrap2 select').val() < 10) {
					var xiaban4 = $('#changebanbie #bancishuju>div:visible:eq(3) .time-wrap2 select').val();
				} else {
					xiaban4 = $('#changebanbie #bancishuju>div:visible:eq(3) .time-wrap2 select').val();
				}
				var xiaban44 = xiaban4 + ":" + $('#changebanbie #bancishuju>div:visible:eq(3) .minite2 select').val()
				//5
				if ($('#changebanbie #bancishuju>div:visible:eq(4) .time-wrap1 select').val() < 10) {
					var shangban5 = $('#changebanbie #bancishuju>div:visible:eq(4) .time-wrap1 select').val();
				} else {
					shangban5 = $('#changebanbie #bancishuju>div:visible:eq(4) .time-wrap1 select').val();
				}
				var shangban55 = shangban5 + ":" + $('#changebanbie #bancishuju>div:visible:eq(4) .minite select').val()
				if ($('#changebanbie #bancishuju>div:visible:eq(4) .time-wrap2 select').val() < 10) {
					var xiaban5 = $('#changebanbie #bancishuju>div:visible:eq(4) .time-wrap2 select').val();
				} else {
					xiaban5 = $('#changebanbie #bancishuju>div:visible:eq(4) .time-wrap2 select').val();
				}
				var xiaban55 = xiaban5 + ":" + $('#changebanbie #bancishuju>div:visible:eq(4) .minite2 select').val()
				//6
				if ($('#changebanbie #bancishuju>div:visible:eq(5) .time-wrap1 select').val() < 10) {
					var shangban6 = $('#changebanbie #bancishuju>div:visible:eq(5) .time-wrap1 select').val();
				} else {
					shangban6 = $('#changebanbie #bancishuju>div:visible:eq(5) .time-wrap1 select').val();
				}
				var shangban66 = shangban6 + ":" + $('#changebanbie #bancishuju>div:visible:eq(5) .minite select').val()
				if ($('#changebanbie #bancishuju>div:visible:eq(5) .time-wrap2 select').val() < 10) {
					var xiaban6 = $('#changebanbie #bancishuju>div:visible:eq(5) .time-wrap2 select').val();
				} else {
					xiaban6 = $('#changebanbie #bancishuju>div:visible:eq(5) .time-wrap2 select').val();
				}
				var xiaban66 = xiaban6 + ":" + $('#changebanbie #bancishuju>div:visible:eq(5) .minite2 select').val()
				
				if (shangban11 == "undefined:undefined" && xiaban11 == "undefined:undefined") {
					shangban11 = "09:00";
					xiaban11 = "18:00";
				}
				if (shangban22 == "undefined:undefined" && xiaban22 == "undefined:undefined") {
					shangban22 = "";
					xiaban22 = "";
				}
				if (shangban33 == "undefined:undefined" && xiaban33 == "undefined:undefined") {
					shangban33 = "";
					xiaban33 = "";
				}
				if (shangban44 == "undefined:undefined" && xiaban44 == "undefined:undefined") {
					shangban44 = "";
					xiaban44 = ""
				}
				if (shangban55 == "undefined:undefined" && xiaban55 == "undefined:undefined") {
					shangban55 = "";
					xiaban55 = ""
				}
				if (shangban66 == "undefined:undefined" && xiaban66 == "undefined:undefined") {
					shangban66 = "";
					xiaban66 = ""
				}
				var shangbanTime=[]
				var xiabanTime=[]
				shangbanTime.push(shangban11,shangban22,shangban33,shangban44,shangban55,shangban66)
				xiabanTime.push(xiaban11,xiaban22,xiaban33,xiaban44,xiaban55,xiaban66)
				var shangbanTime1=''
				var xiabanTime1=''
				for(var i=0;i<shangbanTime.length;i++){
					if(shangbanTime[i]!==''){
						shangbanTime1+=shangbanTime[i]+';'
					}
					if(shangbanTime[i]!==''){
						xiabanTime1+=xiabanTime[i]+';'
					}
				}
				if (shangbanTime1.length > 0&&xiabanTime1.length>0) {
	         		shangbanTime1 = shangbanTime1.substr(0, shangbanTime1.length - 1);
	         		xiabanTime1 = xiabanTime1.substr(0, xiabanTime1.length - 1);
	     		}
				$('.cover').hide()
				objWeek = document.getElementsByName("week2");
				check_week = [];
				for (k in objWeek) {
					if (objWeek[k].checked) check_week.push(objWeek[k].value);
					var strWeek = check_week.join(';');
				}
				objJieri = document.getElementsByName("jieri2");
				check_jieri = [];
				for (k in objJieri) {
					if (objJieri[k].checked) check_jieri.push(objJieri[k].value);
					var strJieri = check_jieri.join(';');
				}
				if(strJieri.length>1){
					var hodliy=strWeek+';'+strJieri
				}else{
					var hodliy=strWeek
				}
				
//				if ($('.banzuNumber2 .showNumber i').text() > 0) {
//					var arr=$('.xm-select-default').val()
//					var strGuid=arr.replace(/,/g,';')
//				} else {
//					strGuid = "";
//				}
				if (($('.banzuName input').val().length == 0) || (strWeek.length < 3)||(shangbanTime1.length<5)||(xiabanTime1.length<5)) {
					layer.msg('请填写完整信息', {
						time: 1000,
					});
				} else {
					var strGuid=''
					$.post('' + EQD_url + '/Classban/Update_Classbie.ashx', {
						"banbieId": row.Id,
						'creater':data1.Guid,
						'companyId':data1.companyId,
						'workday':hodliy,
						'startTime':shangbanTime1,
						'endTime':xiabanTime1,
						'userGuid':strGuid
					}, function(data) {
						var dataBanbie = JSON.parse(data);
						if (dataBanbie.status == 200) {
							$('.banbieShezhi').show();
							$('.addbanbieShezhi').hide();
							$('.renyuanChakan').hide();
							document.getElementById("addbanbie").reset();
							$('.banzuNumber ').show()
							$('.banzuName').show();
							loadBanbie()
							layer.msg('修改成功')
						}
					});
//					$.post('' + EQD_url + '/SetUp/Update_RuleShift.ashx', {
//						"companyId": data1.companyId,
//						"userGuid": data1.Guid,
//						"ruleShiftId": row.Id,
//						"shiftId": banCiId,
//						"weeks": hodliy,
//						"holidays": strJieri
//					}, function(data) {
//						var dataBanbie = JSON.parse(data);
//						if (dataBanbie.status == 200) {
//							$('.banbieShezhi').show();
//							$('.addbanbieShezhi').hide();
//							$('.renyuanChakan').hide();
//							document.getElementById("addbanbie").reset();
//							$('.banzuNumber ').show()
//							$('.banzuName').show();
//							loadBanbie()
//							layer.msg('修改成功')
//						}
//					});
				}
			});
			$('.layui-layer-close').click(function() {
				$('.cover').hide()
				for (var i = 0; i < arrWeeks.length; i++) {
					$("input[name='week2'][value='" + arrWeeks[i] + "']").prop("checked", false);
				}
				for (var i = 0; i < arrJieri.length; i++) {
					$("input[name='jieri2'][value='" + arrJieri[i] + "']").prop("checked",false);
				}
					for(var i=0;i<6;i++){
						$('#changebanbie .tr'+(i+1)+'').hide();
						$('#changebanbie .tr'+(i+1)+'').removeAttr('id')
						$('#changebanbie .tr'+(i+1)+' .time-wrap1 #hour').val('09');
						$('#changebanbie .tr'+(i+1)+' .time-wrap1 .minite select').val('00');
						$('#changebanbie .tr'+(i+1)+' .time-wrap2 #hour').val('18');
						$('#changebanbie .tr'+(i+1)+' .time-wrap2 .minite2 select').val('00');
					}
				});
		}
	};
	function reqRenyuan(){
		$.post('http://47.94.173.253:8008/Com/Get_Com_User.ashx',{
			companyId:data1.companyId,
			ParentId:0
		},function(res){
			var data=JSON.parse(res)
			var departName=[]
			var departNameChild=[]
			for(var i=0;i<data.items.length;i++){
						departName.push({name:data.items[i].departName,value:data.items[i].departId})
						if(data.items[i].UserInfo.length!==0){
							var departNameOnechild=[]
							for(var j=0;j<data.items[i].UserInfo.length;j++){
								departNameOnechild.push({name:data.items[i].UserInfo[j].username,value:data.items[i].UserInfo[j].userGuid})
								departName[i].children=departNameOnechild
							}
						}else if(data.items[i].childs.length!==0){
							for(var j=0;j<data.items[i].childs.length;j++){
								departNameChild.push({name:data.items[i].childs[j].departName,value:data.items[i].childs[j].departId})
								departName[i].children=departNameChild
								if(data.items[i].childs[j].childs.length!==0){
									var departNameChild1=[]
									for(var k=0;k<data.items[i].childs[j].childs.length;k++){
										departNameChild1.push({name:data.items[i].childs[j].childs[k].departName,value:data.items[i].childs[j].childs[k].departId})
										departName[i].children[j].children=departNameChild1
										if(data.items[i].childs[j].childs[k].UserInfo.length!==0){
											var departNameThreechild=[]
											for(var m=0;m<data.items[i].childs[j].childs[k].UserInfo.length;m++){
												departNameThreechild.push({name:data.items[i].childs[j].childs[k].UserInfo[m].username,value:data.items[i].childs[j].childs[k].UserInfo[m].userGuid})
												departName[i].children[j].children[k].children=departNameThreechild
											}
										}else if(data.items[i].childs[j].childs[k].childs.length!==0){
											var departNameChild2=[]
											for(var m=0;m<data.items[i].childs[j].childs[k].childs.length;m++){
												departNameChild2.push({name:data.items[i].childs[j].childs[k].childs[m].departName,value:data.items[i].childs[j].childs[k].childs[m].departId})
												departName[i].children[j].children[k].children=departNameChild2
												if(data.items[i].childs[j].childs[k].childs[m].UserInfo.length!==0){
													var departNameFourchild=[]
													for(var n=0;n<data.items[i].childs[j].childs[k].childs[m].UserInfo.length;n++){
														departNameFourchild.push({name:data.items[i].childs[j].childs[k].childs[m].UserInfo[n].username,value:data.items[i].childs[j].childs[k].childs[m].UserInfo[n].userGuid})
														departName[i].children[j].children[k].children[m].children=departNameFourchild
													}
													
												}else if(data.items[i].childs[j].childs[k].childs[m].childs.length!==0){
													var departNameChild3=[]
													for(var n=0;n<data.items[i].childs[j].childs[k].childs[m].childs.length;n++){
														departNameChild3.push({name:data.items[i].childs[j].childs[k].childs[m].childs[n].departName,value:data.items[i].childs[j].childs[k].childs[m].childs[n].departId})
														departName[i].children[j].children[k].children[m].children=departNameChild3
														if(data.items[i].childs[j].childs[k].childs[m].childs[n].UserInfo.length!==0){
															var departNameFivechild=[]
															for(var z=0;z<data.items[i].childs[j].childs[k].childs[m].childs[n].UserInfo.length;z++){
																departNameFivechild.push({name:data.items[i].childs[j].childs[k].childs[m].childs[n].UserInfo[z].username,value:data.items[i].childs[j].childs[k].childs[m].childs[n].UserInfo[z].userGuid})
																departName[i].children[j].children[k].children[m].children[n].children=departNameFivechild
															}
														}else if(data.items[i].childs[j].childs[k].childs[m].childs[n].childs.length!==0){
															var departNameChild4=[]
															for(var z=0;z<data.items[i].childs[j].childs[k].childs[m].childs[n].childs.length;z++){
																departNameChild4.push({name:data.items[i].childs[j].childs[k].childs[m].childs[n].childs[z].departName,value:data.items[i].childs[j].childs[k].childs[m].childs[n].childs[z].departId})
																departName[i].children[j].children[k].children[m].children[n].children=departNameChild4
																if(data.items[i].childs[j].childs[k].childs[m].childs[n].childs[z].UserInfo.length!==0){
																	var departNameSixchild=[]
																	for(var y=0;y<data.items[i].childs[j].childs[k].childs[m].childs[n].childs[z].UserInfo.length;y++){
																		departNameSixchild.push({name:data.items[i].childs[j].childs[k].childs[m].childs[n].childs[z].UserInfo[y].username,value:data.items[i].childs[j].childs[k].childs[m].childs[n].childs[z].UserInfo[y].userGuid})
																		departName[i].children[j].children[k].children[m].children[n].children[z].children=departNameSixchild
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}else if(data.items[i].childs[j].UserInfo.length!==0){
									var departNameTwochild=[]
									for(var k=0;k<data.items[i].childs[j].UserInfo.length;k++){
										departNameTwochild.push({name:data.items[i].childs[j].UserInfo[k].username,value:data.items[i].childs[j].UserInfo[k].userGuid})
										departName[i].children[j].children=departNameTwochild
									}
								}
							}
							
						}
					}
			layui.form.render();
				var demo1 = xmSelect.render({
					el: '#demo1', 
					autoRow: true,
					filterable: true,
					tree: {
					show: true,
					showFolderIcon: true,
					showLine: true,
					indent: 20,
					expandedKeys: [ 1 ],
					strict: true,
					},
					filterable: true,
					height: 'auto',
					data(){
						return departName
					}
				})
				demo1.opened();
			})
	}
	
	// ************************************************增加班别***********************************************************
	$('.addBanbie').click(function() {
		$('.addbanbieShezhi').show().siblings('div').hide()
		$('.save').show();
		$('.banbieShezhi').hide();
		$('.renyuanChakan').hide();
		$('.addbanbieShezhi').show();
		$('.showNumber1').show()
		$('.showNumber').hide()
		$('.banzuName input').val('')
		$('.choosedbanciName').text('')
		$('#addbanbie .tr1 .addDate').click(function() {
			$('#addbanbie .tr2').show();
			$(this).hide();
			$("#addbanbie .tr2").attr('id', 'kejian');
		});
		$('#addbanbie .tr2 .addDate').click(function() {
			$('#addbanbie .tr3').show();
			$(this).hide();
			$("#addbanbie .tr3").attr('id', 'kejian');
		});
		$('#addbanbie .tr3 .addDate').click(function() {
			$('#addbanbie .tr4').show();
			$(this).hide();
			$("#addbanbie .tr4").attr('id', 'kejian');
		});
		$('#addbanbie .tr4 .addDate').click(function() {
			$('#addbanbie .tr51').show();
			$(this).hide();
			$("#addbanbie .tr51").attr('id', 'kejian');
		});
		$('#addbanbie .tr51 .addDate').click(function() {
			$('#addbanbie .tr6').show();
			$(this).hide();
			$("#addbanbie .tr6").attr('id', 'kejian');
		});
		$('#addbanbie .tr2 .delDate').click(function() {
			$('#addbanbie .tr2').hide();
			$('#addbanbie .tr1 .addDate').show();
			$("#addbanbie .tr2").removeAttr('id');
		});
		$('#addbanbie .tr3 .delDate').click(function() {
			$('#addbanbie .tr3').hide();
			$('#addbanbie .tr2 .addDate').show();
			$("#addbanbie .tr3").removeAttr('id');
		});
		$('#addbanbie .tr4 .delDate').click(function() {
			$('#addbanbie .tr4').hide();
			$('#addbanbie .tr3 .addDate').show();
			$("#addbanbie .tr4").removeAttr('id');
		});
		$('#addbanbie .tr51 .delDate').click(function() {
			$('#addbanbie .tr51').hide();
			$('#addbanbie .tr4 .addDate').show();
			$("#addbanbie .tr51").removeAttr('id');
		});
		$('#addbanbie .tr6 .delDate').click(function() {
			$('#addbanbie .tr6').hide();
			$('#addbanbie .tr51 .addDate').show();
			$("#addbanbie .tr6").removeAttr('id');
		});
		
	});
	// ****************************************班别中选择班次**************************************************
	$(".chooseBanci button").click(function() {
		layer.open({
			type: 1,
			area: '800px',
			title: ['选择班次', 'font-size:18px;'],
			content: $('#choosebanbieDiv'),
			shade: false
		});
		$('.cover').show();
		$('#banbiechooseTable').bootstrapTable({
			data: dataTime.items,
			columns: [{
				field: 'shiftName',
				title: '班次名称'
			}, {
				field: 'startTime1',
				title: '考勤时间',
				formatter: time2Formatter
			}]
		});
		$("#banbiechooseTable").bootstrapTable('load', dataTime.items);

		function time2Formatter(value, row, index) {
			var time1;
			var time2;
			var time3;
			var time4;

			function shifen() {
				var myString1 = dataTime.items[index].startTime1;
				var myString3 = dataTime.items[index].startTime2;
				var myString5 = dataTime.items[index].startTime3;
				var myString7 = dataTime.items[index].startTime4;
				var myString2 = dataTime.items[index].endTime1;
				var myString4 = dataTime.items[index].endTime2;
				var myString6 = dataTime.items[index].endTime3;
				var myString8 = dataTime.items[index].endTime4;
				var a = myString1.substring(0, 5);
				var b = myString3.substring(0, 5);
				var c = myString5.substring(0, 5);
				var d = myString7.substring(0, 5);
				var A = myString2.substring(0, 5);
				var B = myString4.substring(0, 5);
				var C = myString6.substring(0, 5);
				var D = myString8.substring(0, 5);
				time1 = a + "~" + A;
				time2 = b + "~" + B;
				time3 = c + "~" + C;
				time4 = d + "~" + D;
			}
			shifen();
			if (dataTime.items[index].startTime2 == "00:00:00" && dataTime.items[index].endTime2 == "00:00:00") {
				time2 = " ";
			};
			if (dataTime.items[index].startTime3 == "00:00:00" && dataTime.items[index].endTime3 == "00:00:00") {
				time3 = " ";
			};
			if (dataTime.items[index].startTime4 == "00:00:00" && dataTime.items[index].endTime4 == "00:00:00") {
				time4 = " ";
			};
			var timeTotle = time1 + "&nbsp;&nbsp;&nbsp;&nbsp;" + time2 + "&nbsp;&nbsp;&nbsp;&nbsp;" + time3 +
				"&nbsp;&nbsp;&nbsp;&nbsp;" + time4;
			return [
				timeTotle
			].join('');
		};
		$("#banbiechooseTable").on('click-row.bs.table', function(e, row, $element) {
			$('.choosedbanciName').text(row.shiftName)
			banCiId = row.Id
			layer.close(layer.index);
			$('.cover').hide();
		})
		$('.layui-layer-close').click(function() {
			$('.cover').hide();
			
			
		})
	});
	$('.save').click(function() {
		if ($('#addbanbie #bancishuju>div:visible:eq(0) .time-wrap1 select').val() < 10) {
					var shangban1 = $('#addbanbie #bancishuju>div:visible:eq(0) .time-wrap1 select').val();
				} else {
					shangban1 = $('#addbanbie #bancishuju>div:visible:eq(0) .time-wrap1 select').val();
				}
				var shangban11 = shangban1 + ":" + $('#addbanbie #bancishuju>div:visible:eq(0) .minite select').val()
				if ($('#addbanbie #bancishuju>div:visible:eq(0) .time-wrap2 select').val() < 10) {
					var xiaban1 = $('#addbanbie #bancishuju>div:visible:eq(0) .time-wrap2 select').val();
				} else {
					xiaban1 = $('#addbanbie #bancishuju>div:visible:eq(0) .time-wrap2 select').val();
				}
				var xiaban11 = xiaban1 + ":" + $('#addbanbie #bancishuju>div:visible:eq(0) .minite2 select').val()
				if ($('#addbanbie #bancishuju>div:visible:eq(1) .time-wrap1 select').val() < 10) {
					var shangban2 = $('#addbanbie #bancishuju>div:visible:eq(1) .time-wrap1 select').val();
				} else {
					shangban2 = $('#addbanbie #bancishuju>div:visible:eq(1) .time-wrap1 select').val();
				}
				var shangban22 = shangban2 + ":" + $('#addbanbie #bancishuju>div:visible:eq(1) .minite select').val()
				if ($('#addbanbie #bancishuju>div:visible:eq(1) .time-wrap2 select').val() < 10) {
					var xiaban2 = $('#addbanbie #bancishuju>div:visible:eq(1) .time-wrap2 select').val();
				} else {
					xiaban2 = $('#addbanbie #bancishuju>div:visible:eq(1) .time-wrap2 select').val();
				}
				var xiaban22 = xiaban2 + ":" + $('#addbanbie #bancishuju>div:visible:eq(1) .minite2 select').val()
				if ($('#addbanbie #bancishuju>div:visible:eq(2) .time-wrap1 select').val() < 10) {
					var shangban3 = $('#addbanbie #bancishuju>div:visible:eq(2) .time-wrap1 select').val();
				} else {
					shangban3 = $('#addbanbie #bancishuju>div:visible:eq(2) .time-wrap1 select').val();
				}
				var shangban33 = shangban3 + ":" + $('#addbanbie #bancishuju>div:visible:eq(2) .minite select').val()
				if ($('#addbanbie #bancishuju>div:visible:eq(2) .time-wrap2 select').val() < 10) {
					var xiaban3 = $('#addbanbie #bancishuju>div:visible:eq(2) .time-wrap2 select').val();
				} else {
					xiaban3 = $('#addbanbie #bancishuju>div:visible:eq(2) .time-wrap2 select').val();
				}
				var xiaban33 = xiaban3 + ":" + $('#addbanbie #bancishuju>div:visible:eq(2) .minite2 select').val()
				if ($('#addbanbie #bancishuju>div:visible:eq(3) .time-wrap1 select').val() < 10) {
					var shangban4 = $('#addbanbie #bancishuju>div:visible:eq(3) .time-wrap1 select').val();
				} else {
					shangban4 = $('#addbanbie #bancishuju>div:visible:eq(3) .time-wrap1 select').val();
				}
				var shangban44 = shangban4 + ":" + $('#addbanbie #bancishuju>div:visible:eq(3) .minite select').val()
				if ($('#addbanbie #bancishuju>div:visible:eq(3) .time-wrap2 select').val() < 10) {
					var xiaban4 = $('#addbanbie #bancishuju>div:visible:eq(3) .time-wrap2 select').val();
				} else {
					xiaban4 = $('#addbanbie #bancishuju>div:visible:eq(3) .time-wrap2 select').val();
				}
				var xiaban44 = xiaban4 + ":" + $('#addbanbie #bancishuju>div:visible:eq(3) .minite2 select').val()
				//5
				if ($('#addbanbie #bancishuju>div:visible:eq(4) .time-wrap1 select').val() < 10) {
					var shangban5 = $('#addbanbie #bancishuju>div:visible:eq(4) .time-wrap1 select').val();
				} else {
					shangban5 = $('#addbanbie #bancishuju>div:visible:eq(4) .time-wrap1 select').val();
				}
				var shangban55 = shangban5 + ":" + $('#addbanbie #bancishuju>div:visible:eq(4) .minite select').val()
				if ($('#addbanbie #bancishuju>div:visible:eq(4) .time-wrap2 select').val() < 10) {
					var xiaban5 = $('#addbanbie #bancishuju>div:visible:eq(4) .time-wrap2 select').val();
				} else {
					xiaban5 = $('#addbanbie #bancishuju>div:visible:eq(4) .time-wrap2 select').val();
				}
				var xiaban55 = xiaban5 + ":" + $('#addbanbie #bancishuju>div:visible:eq(4) .minite2 select').val()
				//6
				if ($('#addbanbie #bancishuju>div:visible:eq(5) .time-wrap1 select').val() < 10) {
					var shangban6 = $('#addbanbie #bancishuju>div:visible:eq(5) .time-wrap1 select').val();
				} else {
					shangban6 = $('#addbanbie #bancishuju>div:visible:eq(5) .time-wrap1 select').val();
				}
				var shangban66 = shangban6 + ":" + $('#addbanbie #bancishuju>div:visible:eq(5) .minite select').val()
				if ($('#addbanbie #bancishuju>div:visible:eq(5) .time-wrap2 select').val() < 10) {
					var xiaban6 = $('#addbanbie #bancishuju>div:visible:eq(5) .time-wrap2 select').val();
				} else {
					xiaban6 = $('#addbanbie #bancishuju>div:visible:eq(5) .time-wrap2 select').val();
				}
				var xiaban66 = xiaban6 + ":" + $('#addbanbie #bancishuju>div:visible:eq(5) .minite2 select').val()
			
			if (shangban11 == "undefined:undefined" && xiaban11 == "undefined:undefined") {
				shangban11 = "09:00";
				xiaban11 = "18:00";
			}
			if (shangban22 == "undefined:undefined" && xiaban22 == "undefined:undefined") {
				shangban22 = "";
				xiaban22 = "";
			}
			if (shangban33 == "undefined:undefined" && xiaban33 == "undefined:undefined") {
				shangban33 = "";
				xiaban33 = "";
			}
			if (shangban44 == "undefined:undefined" && xiaban44 == "undefined:undefined") {
				shangban44 = "";
				xiaban44 = ""
			}
			if (shangban55 == "undefined:undefined" && xiaban55 == "undefined:undefined") {
				shangban55 = "";
				xiaban55 = ""
			}
			if (shangban66 == "undefined:undefined" && xiaban66 == "undefined:undefined") {
				shangban66 = "";
				xiaban66 = ""
			}
			var shangbanTime=[]
			var xiabanTime=[]
		objWeek = document.getElementsByName("week");
		check_week = [];
		for (k in objWeek) {
			if (objWeek[k].checked) check_week.push(objWeek[k].value);
			var strWeek = check_week.join(';');
		}
		objJieri = document.getElementsByName("jieri");
		check_jieri = [];
		for (k in objJieri) {
			if (objJieri[k].checked) check_jieri.push(objJieri[k].value);
			var strJieri = check_jieri.join(';');
		}
		if(strJieri.length>1){
			var ruleDes = strWeek + ";" + strJieri;
		}else{
			var ruleDes=strWeek
		}
		
		var arrName2 = $(".choosedPerson p").length
		if ($('.showNumber1 i').text() > 0) {
			var arr=$('.xm-select-default').val()
			var strGuid=arr.replace(/,/g,';')
//			var guidList = [];
//			for (var i = 0; i < arrName2; i++) {
//				guidList[i] = $(".choosedPerson p").eq(i).attr('id') + ';'
//			}
//			var strGuid = guidList.join(',');
//			console.log()
//			strGuid = strGuid.replace(/,/g, '');
//			console.log(strGuid)
		} else {
			strGuid = "";
		}
		if (($('.banzuName input').val().length == 0) || (strWeek.length < 3)||(ruleDes.length<2)) {
			layer.msg('请填写完整信息', {
				time: 1000,
			});
		} else {
			shangbanTime.push(shangban11,shangban22,shangban33,shangban44,shangban55,shangban66)
			xiabanTime.push(xiaban11,xiaban22,xiaban33,xiaban44,xiaban55,xiaban66)
			var shangbanTime1=''
			var xiabanTime1=''
			for(var i=0;i<shangbanTime.length;i++){
				if(shangbanTime[i]!==''){
					shangbanTime1+=shangbanTime[i]+';'
				}
				if(shangbanTime[i]!==''){
					xiabanTime1+=xiabanTime[i]+';'
				}
				
			}
			if (shangbanTime1.length > 0&&xiabanTime1.length>0) {
         		shangbanTime1 = shangbanTime1.substr(0, shangbanTime1.length - 1);
         		xiabanTime1 = xiabanTime1.substr(0, xiabanTime1.length - 1);
     		}	
			$.post('' + EQD_url + '/Classban/Add_Classbie.ashx', {
				"classname": $('.banzuName input').val(),
				"workday": ruleDes,
				"companyId": data1.companyId,
				"creater": data1.Guid,
				"startTime": shangbanTime1,
				"endTime": xiabanTime1,
				"userGuid": strGuid
			}, function(data) {
				var dataBanbie = JSON.parse(data);
				console.log(dataBanbie)
				if (dataBanbie.status == 200) {
					layer.msg('添加成功')
					$('.renyuanChakan').hide();
					$('.addbanbieShezhi').hide();
					$('.banbieShezhi').show();
					$('.choosedPerson p').remove()
					loadBanbie()
					$('.addbanbieShezhi .choosedbanciName').text("");
					$('.addbanbieShezhi .week input').removeAttr('checked')
					$('.addbanbieShezhi .holiday input').removeAttr('checked')
					$('.addbanbieShezhi .banzuName input').val("")
				}else if(dataBanbie.status == 500){
					layer.msg('服务器内部错误')
				}
			});
		}
	});
	
	//********************************************添加班次操作***************************************************
	$('.addBanci').click(function() {
		layer.open({
			type: 1,
			area: '700px',
			title: ['新增班次设置', 'font-size:18px;'],
			content: $('.addBancitable'),
			btn: '确定',
			shade: false
		});
		$('.cover').show();
		$('.tr1 .addDate').click(function() {
			$('.tr2').show();
			$(this).hide();
			$(".tr2").attr('id', 'kejian');
		});
		$('.tr2 .addDate').click(function() {
			$('.tr3').show();
			$(this).hide();
			$(".tr3").attr('id', 'kejian');
		});
		$('.tr3 .addDate').click(function() {
			$('.tr4').show();
			$(this).hide();
			$(".tr4").attr('id', 'kejian');
		});
		$('.tr2 .delDate').click(function() {
			$('.tr2').hide();
			$('.tr1 .addDate').show();
			$(".tr2").removeAttr('id');
		});
		$('.tr3 .delDate').click(function() {
			$('.tr3').hide();
			$('.tr2 .addDate').show();
			$(".tr3").removeAttr('id');
		});
		$('.tr4 .delDate').click(function() {
			$('.tr4').hide();
			$('.tr3 .addDate').show();
			$(".tr4").removeAttr('id');
		});
		$('.layui-layer-close').click(function() {
			$('.cover').hide()
		});
		$('.tr4 .addDate').click(function() {
			$('.tr51').show();
			$(this).hide();
			$(".tr51").attr('id', 'kejian');
		});
//		$('.layui-layer-btn0').click(function() {
//			$('.cover').css('display', 'none');
//			if ($('#bancishuju form>div:visible:eq(0) .time-wrap1 select').val() < 10) {
//				var shangban1 = $('#bancishuju>div:visible:eq(0) .time-wrap1 select').val();
//			} else {
//				shangban1 = $('#bancishuju>div:visible:eq(0) .time-wrap1 select').val();
//			}
//			var shangban11 = shangban1 + ":" + $('#bancishuju>div:visible:eq(0) .minite select').val()
//			if ($('#bancishuju>div:visible:eq(0) .time-wrap2 select').val() < 10) {
//				var xiaban1 = $('#bancishuju>div:visible:eq(0) .time-wrap2 select').val();
//			} else {
//				xiaban1 = $('#bancishuju>div:visible:eq(0) .time-wrap2 select').val();
//			}
//			var xiaban11 = xiaban1 + ":" + $('#bancishuju>div:visible:eq(0) .minite2 select').val()
//			if ($('#bancishuju>div:visible:eq(1) .time-wrap1 select').val() < 10) {
//				var shangban2 = $('#bancishuju>div:visible:eq(1) .time-wrap1 select').val();
//			} else {
//				shangban2 = $('#bancishuju>div:visible:eq(1) .time-wrap1 select').val();
//			}
//			var shangban22 = shangban2 + ":" + $('#bancishuju>div:visible:eq(1) .minite select').val()
//			if ($('#bancishuju>div:visible:eq(1) .time-wrap2 select').val() < 10) {
//				var xiaban2 = $('#bancishuju>div:visible:eq(1) .time-wrap2 select').val();
//			} else {
//				xiaban2 = $('#bancishuju>div:visible:eq(1) .time-wrap2 select').val();
//			}
//			var xiaban22 = xiaban2 + ":" + $('#bancishuju>div:visible:eq(1) .minite2 select').val()
//			if ($('#bancishuju>div:visible:eq(2) .time-wrap1 select').val() < 10) {
//				var shangban3 = $('#bancishuju>div:visible:eq(2) .time-wrap1 select').val();
//			} else {
//				shangban3 = $('#bancishuju>div:visible:eq(2) .time-wrap1 select').val();
//			}
//			var shangban33 = shangban3 + ":" + $('#bancishuju>div:visible:eq(2) .minite select').val()
//			if ($('#bancishuju>div:visible:eq(2) .time-wrap2 select').val() < 10) {
//				var xiaban3 = $('#bancishuju>div:visible:eq(2) .time-wrap2 select').val();
//			} else {
//				xiaban3 = $('#bancishuju>div:visible:eq(2) .time-wrap2 select').val();
//			}
//			var xiaban33 = xiaban3 + ":" + $('#bancishuju>div:visible:eq(2) .minite2 select').val()
//			if ($('#bancishuju>div:visible:eq(3) .time-wrap1 select').val() < 10) {
//				var shangban4 = $('#bancishuju>div:visible:eq(3) .time-wrap1 select').val();
//			} else {
//				shangban4 = $('#bancishuju>div:visible:eq(3) .time-wrap1 select').val();
//			}
//			var shangban44 = shangban4 + ":" + $('#bancishuju>div:visible:eq(3) .minite select').val()
//			if ($('#bancishuju>div:visible:eq(3) .time-wrap2 select').val() < 10) {
//				var xiaban4 = $('#bancishuju>div:visible:eq(3) .time-wrap2 select').val();
//			} else {
//				xiaban4 = $('#bancishuju>div:visible:eq(3) .time-wrap2 select').val();
//			}
//			var xiaban44 = xiaban4 + ":" + $('#bancishuju>div:visible:eq(3) .minite2 select').val()
//			//5
//			if ($('#bancishuju>div:visible:eq(4) .time-wrap1 select').val() < 10) {
//				var shangban5 = $('#bancishuju>div:visible:eq(4) .time-wrap1 select').val();
//			} else {
//				shangban5 = $('#bancishuju>div:visible:eq(4) .time-wrap1 select').val();
//			}
//			var shangban55 = shangban5 + ":" + $('#bancishuju>div:visible:eq(4) .minite select').val()
//			if ($('#bancishuju>div:visible:eq(4) .time-wrap2 select').val() < 10) {
//				var xiaban5 = $('#bancishuju>div:visible:eq(4) .time-wrap2 select').val();
//			} else {
//				xiaban5 = $('#bancishuju>div:visible:eq(4) .time-wrap2 select').val();
//			}
//			var xiaban55 = xiaban5 + ":" + $('#bancishuju>div:visible:eq(4) .minite2 select').val()
//			//6
//			if ($('#bancishuju>div:visible:eq(5) .time-wrap1 select').val() < 10) {
//				var shangban6 = $('#bancishuju>div:visible:eq(5) .time-wrap1 select').val();
//			} else {
//				shangban6 = $('#bancishuju>div:visible:eq(5) .time-wrap1 select').val();
//			}
//			var shangban66 = shangban6 + ":" + $('#bancishuju>div:visible:eq(5) .minite select').val()
//			if ($('#bancishuju>div:visible:eq(5) .time-wrap2 select').val() < 10) {
//				var xiaban6 = $('#bancishuju>div:visible:eq(5) .time-wrap2 select').val();
//			} else {
//				xiaban6 = $('#bancishuju>div:visible:eq(5) .time-wrap2 select').val();
//			}
//			var xiaban66 = xiaban6 + ":" + $('#bancishuju>div:visible:eq(5) .minite2 select').val()
//			
//			if (shangban11 == "undefined:undefined" && xiaban11 == "undefined:undefined") {
//				shangban11 = "00:00";
//				xiaban11 = "00:00";
//			}
//			if (shangban22 == "undefined:undefined" && xiaban22 == "undefined:undefined") {
//				shangban22 = "00:00";
//				xiaban22 = "00:00";
//			}
//			if (shangban33 == "undefined:undefined" && xiaban33 == "undefined:undefined") {
//				shangban33 = "00:00";
//				xiaban33 = "00:00";
//			}
//			if (shangban44 == "undefined:undefined" && xiaban44 == "undefined:undefined") {
//				shangban44 = "00:00";
//				xiaban44 = "00:00"
//			}
//			if (shangban55 == "undefined:undefined" && xiaban55 == "undefined:undefined") {
//				shangban55 = "00:00";
//				xiaban55 = "00:00"
//			}
//			if (shangban66 == "undefined:undefined" && xiaban66 == "undefined:undefined") {
//				shangban66 = "00:00";
//				xiaban66 = "00:00"
//			}
//			var shangbanTime=[]
//			var xiabanTime=[]
//			shangbanTime.push(shangban11,shangban22,shangban33,shangban44,shangban55,shangban66)
//			xiabanTime.push(xiaban11,xiaban22,xiaban33,xiaban44,xiaban55,xiaban66)
//			
//			// 判断班次名称
//			if ($('.qiandaoName input').val().length > 0) {
//				$.post('' + EQD_url + '/SetUp/Add_Shift.ashx', {
//					"userGuid": data1.Guid,
//					"companyId": data1.companyId,
//					"shiftName": $('.qiandaoName input').val(),
//					"startTime1": shangban11,
//					"endTime1": xiaban11,
//					"startTime2": shangban22,
//					"endTime2": xiaban22,
//					"startTime3": shangban33,
//					"endTime3": xiaban33,
//					"startTime4": shangban44,
//					"endTime4": xiaban44,
//				}, function(data) {
//					var dataAddbanci = JSON.parse(data);
//					if (dataAddbanci.status == 200) {
//						loadBanci()
//					}
//				});
//			} else {
//				layer.msg('请输入班次名称', {
//					time: 1000,
//				});
//			}
//		});
	});
});
