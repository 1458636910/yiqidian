$(document).ready(function() {
	// 获取本地信息
	var dataLogin = localStorage.getItem("GHY_login");
	var dataLogined = JSON.parse(dataLogin);
	$(".uname").append(dataLogined.upname);
	// 判断是否有权力发需求
	if (dataLogined.isAdmin != 1 && dataLogined.isAdmin != 2) {
		layer.msg('你没有发需求的权限', {
			time: 3000,
			shade: 0.5
		});
		setTimeout(function() {
			window.close()
		}, 3100)
	}
	laydate.render({
		elem: '#timeBegin',
		type: 'datetime'
	});
	laydate.render({
		elem: '#timeEnd',
		type: 'datetime'
	});
	// 提交
	var addressChanpin, addressChanpin2, allAddress, applyId, betrainedPostId, perGuid;
	var applyId = 0;
	var betrainedPostId = 0;
	var like = "";
	var unlike = "";
	$('.subArea button').click(function() {
		allAddress = addressChanpin + $('.detailsAddress').val();
		if ($('#usertype2').val() != null) {
			for (var i = 0; i < $('#usertype2').val().length; i++) {
				like += $('#usertype2').val()[i] + ','
			}
			like = like.substring(0, Number(like.length) - 1)
		} else {
			like = "不限"
		}
		if ($('#usertype1').val() != null) {
			for (var i = 0; i < $('#usertype1').val().length; i++) {
				unlike += $('#usertype1').val()[i] + ','
			}
			unlike = unlike.substring(0, Number(unlike.length) - 1)
		} else {
			unlike = "不限"
		}
		$.post('' + http_head + '/Training/Add_trainingDemand.ashx', {
			"userGuid": dataLogined.Guid,
			"comid": dataLogined.companyId,
			"theCategory": $('.peixunLebel').val(),
			"theTheme": $('.peixuntheme').val(),
			"keywords": $('.peixunGuanjianzi').val(),
			"trainees": $('.peixunObj').val(),
			"thedateStart": $('#timeBegin').val(),
			"thedateEnd": $('#timeEnd').val(),
			"theplace": allAddress,
			"comName": $('.comName').val(),
			"contacts": perGuid,
			"contactsName": $('.comContentman').val(),
			"phone": $('.comPhone').val(),
			"handset": $('.comCellphone').val(),
			"qq": $('.comQQ').val(),
			"otherDemand": $('#othersRequest').val(),
			"budgetedExpense": $('.peixunExpend').val(),
			"applyId": applyId,
			"betrainedPostId": betrainedPostId,
			"lecturerIndustry": $('.hangyeRequire').val(),
			"lecturerSex": $('#sex').val(),
			"lecturerMinAge": $('.minAge').val(),
			"lecturerMaxAge": $('.maxAge').val(),
			"lecturerShuXiang": like,
			"lecturerJinJIShuXiang": unlike,
			"lecturerAddress": addressChanpin2,
			"lecturerEducation": $('.eduRequire').val(),
			"lecturerMagor": $('.skills').val(),
			"lecturerZhiCheng": $('.zhichengRequire').val(),
			"lecturerLanguages": $('.fornigeRequire').val(),
			"lecturerWorkBackground": $('.workRequire').val(),
			"lecturerPost": $('.zhiwuRequire').val()
		}, function(data) {
			console.log(data)
			var dataAdd = JSON.parse(data)
			if (dataAdd.status == 200) {
				layer.msg('添加成功', {
					time: 1000,
				});
				setTimeout(function() {
					location.href = "../html/addDemand.html"
				}, 1500)
			}
		});
	});
	// 选取培训申请
	$('.peixuntheme').dblclick(function() {
		loadApply(0)
		layer.open({
			type: 1,
			area: ['700px', '600px'],
			title: ['选择培训申请', 'font-size:18px;text-align: center;'],
			content: $(".chooseApplyDiv"),
			btn: '确定',
			yes: function(index, layero) {}
		})


	});
	// 获取培训申请
	function loadApply(page) {
		$.post('' + http_head + '/Training/Get_trainingApply_byHR.ashx', {
			"userGuid": dataLogined.Guid,
			"type": 1,
			"comid": dataLogined.companyId,
			"page": page
		}, function(data) {
			var dataApply = JSON.parse(data);
			loadApplyTable(dataApply.items)
		});
	}
	// 培训申请表格
	function loadApplyTable(data) {
		$('#applyTable').bootstrapTable({
			url: data,
			columns: [{
					field: 'theTheme',
					title: '主题',
					align: 'center',
					valign: 'middle',
				},
				{
					field: 'budgetedExpense',
					title: '预算',
					align: 'center',
					valign: 'middle'
				},
				{
					field: 'theCategory',
					title: '分类',
					align: 'center',
					valign: 'middle',
				}
			]
		});
		$("#applyTable").bootstrapTable('load', data);
	}
	$("#applyTable").on('click-row.bs.table', function(e, row, $element) {
		$('.peixuntheme').val(row.theTheme)
		$('.peixunExpend').val(row.budgetedExpense)
		$('.peixunLebel').val(row.theCategory)
		applyId = row.id,
			betrainedPostId = row.betrainedPostId;
		layer.closeAll()
	})
	// 选取培训对象
	var depId, depName;
	$('.peixunObj').click(function() {
		loadObj()
		var arr_depname = "";
		var arr_depid = "";
		layer.open({
			type: 1,
			area: ['700px', '600px'],
			title: ['选择培训对象', 'font-size:18px;text-align: center;'],
			content: $(".choosePostDiv"),
			btn: '确定',
			yes: function(index, layero) {
				for (var i = 0; i < ($('#postTable').bootstrapTable('getAllSelections')).length; i++) {
					arr_depid += $('#postTable').bootstrapTable('getAllSelections')[i].id + ",";
					arr_depname += $('#postTable').bootstrapTable('getAllSelections')[i].name + ",";
				}
				depName = (arr_depname).substring(0, Number(arr_depname.length) - 1);
				depId = (arr_depid).substring(0, Number(arr_depid.length) - 1);
				$('.peixunObj').val(depName)
				layer.close(index)
			}
		})


	});
	// 获取培训对象
	function loadObj() {
		$.post('' + http_head + '/User_getcompost.ashx', {
			"userGuid": dataLogined.Guid,
			"comid": dataLogined.companyId,
		}, function(data) {
			var dataObj = JSON.parse(data)
			loadObjTable(dataObj.items)
		});
	}

	function loadObjTable(data) {
		$('#postTable').bootstrapTable({
			url: data,
			columns: [{
					field: 'checkbox',
					title: '请选择',
					align: 'center',
					valign: 'middle',
				},
				{
					field: 'name',
					title: '职位',
					align: 'center',
					valign: 'middle',
				},
				{
					field: 'dename',
					title: '部门',
					align: 'center',
					valign: 'middle'
				}
			]
		});
		$("#postTable").bootstrapTable('load', data);
	}
	// 选择公司人员
	$('.comContentman').click(function() {
		renyuanLook()
		layer.open({
			type: 1,
			area: ['700px', '600px'],
			title: ['选择人员', 'font-size:18px;text-align: center;'],
			content: $(".editNotice"),
		})
	});
	//
	function renyuanLook() {
		$.post('' + http_head + '/Com/Com_Staff.ashx', {
			"companyId": dataLogined.companyId,
			"page": "0"
		}, function(data) {
			var dataNotice = JSON.parse(data);
			var dataLook = dataNotice.items.listModel;
			HRS(dataLook)
		})
	}
	$("#noticeTable").on('click-row.bs.table', function(e, row, $element) {
		$('.comContentman').val(row.uname)
		perGuid = row.u1
		$('.comName').val(row.companyName)
		$('.comCellphone').val(row.uptel)
		$('.comQQ').val(row.uqq)
		layer.closeAll()
	})
	//获取人员
	function HRS(dataSet) {
		$('#noticeTable').bootstrapTable({
			url: dataSet,
			columns: [{
					field: 'uname',
					title: '姓名',
					align: 'center',
					valign: 'middle',
				},
				{
					field: 'userPhone',
					title: '电话',
					align: 'center',
					valign: 'middle',
				}
			]
		});
		$("#noticeTable").bootstrapTable('load', dataSet);
	}
	// 搜索
	function HRsearch() {
		$.post('' + http_head + '/Com/User_Search.ashx', {
			"companyId": dataLogined.companyId,
			"userGuid": dataLogined.Guid,
			"para": $('.setLeaderDiv input').val()
		}, function(data) {
			var dataHrs = JSON.parse(data);
			var dataHRsea = dataHrs.items
			HRS(dataHRsea)
		});
	}
	$('.setLeaderDiv  input').keydown(function(event) {
		if (event.keyCode === 13) {
			HRsearch()
		}
	});
	$('.setLeaderDiv  button').click(function() {
		HRsearch()
	});
	var areadata, areaLength, val2, provice1Val, provice1Name, city1Val, city1Name, county1Val, county1Name;
	$.post('' + http_head + '/Option_AreasAnd.ashx', {
		type: "0"
	}, function(data) {
		areadata = data;
		areaLength = areadata.length;
		var len = areaLength;
		for (var i = 0; i < len; i++) {
			var provice1Opt = document.createElement('option');
			provice1Opt.innerText = areadata[i]['name'];
			provice1Opt.value = i;
			provice1.append(provice1Opt);
		}
	});
	$('#provice1').click(function() {
		var btn = document.getElementsByClassName('hangye1');
		var provice1 = $('#provice1');
		var city1 = $('#city1');
		var current = {
			provice1: '',
			city1: ''
		};
		$('#provice1').change(function(btn) {
			document.all['city1'].options.length = 1;
			val2 = $('#provice1').select().val();
			if (val2 != current.provice1) {
				current.provice1 = val2;
				btn.disabled = true;
			}
			if (val2 != null) {
				city1.length = 1;
				var city1Len = areadata[val2]["sub"].length;
				for (var j = 0; j < city1Len; j++) {
					var city1LenOpt = document.createElement('option');
					city1LenOpt.innerText = areadata[val2]["sub"][j].name;
					city1LenOpt.value = j;
					city1.append(city1LenOpt);
				}
			}
			provice1Val = $(this).val()
			provice1Name = areadata[provice1Val].name
		});
		$('#city1').change(function(btn) {
			document.all['county1'].options.length = 1;
			var val3 = $('#city1').select().val();
			if (val3 != current.hangye2) {
				current.city1 = val2;
				btn.disabled = true;
			}
			if (val3 != null) {
				county1.length = 1;
				var county1Len = areadata[val2]["sub"][val3]["sub"].length;
				for (var m = 0; m < county1Len; m++) {
					var county1Opt = document.createElement('option');
					county1Opt.innerText = areadata[val2]["sub"][val3]["sub"][m].name;
					county1Opt.value = m;
					county1.append(county1Opt);
				}
			}
			city1Val = $(this).val()
			city1Name = areadata[provice1Val]["sub"][city1Val].name
		});
	});
	$('#county1').change(function(btn) {
		county1Val = $(this).val()
		county1Name = areadata[provice1Val]["sub"][city1Val]["sub"][county1Val].name;
		addressChanpin = provice1Name + city1Name + county1Name;
	})
	var areadata, areaLength, val2, provice2Val, provice2Name, city2Val, city2Name, county2Val, county2Name;
	$.post('' + http_head + '/Option_AreasAnd.ashx', {
		type: "0"
	}, function(data) {
		areadata = data;
		areaLength = areadata.length;
		var len = areaLength;
		for (var i = 0; i < len; i++) {
			var provice2Opt = document.createElement('option');
			provice2Opt.innerText = areadata[i]['name'];
			provice2Opt.value = i;
			provice2.append(provice2Opt);
		}
	});
	$('#provice2').click(function() {
		var btn = document.getElementsByClassName('hangye1');
		var provice2 = $('#provice2');
		var city2 = $('#city2');
		var current = {
			provice2: '',
			city2: ''
		};
		$('#provice2').change(function(btn) {
			document.all['city2'].options.length = 1;
			val2 = $('#provice2').select().val();
			if (val2 != current.provice2) {
				current.provice2 = val2;
				btn.disabled = true;
			}
			if (val2 != null) {
				city2.length = 1;
				var city2Len = areadata[val2]["sub"].length;
				for (var j = 0; j < city2Len; j++) {
					var city2LenOpt = document.createElement('option');
					city2LenOpt.innerText = areadata[val2]["sub"][j].name;
					city2LenOpt.value = j;
					city2.append(city2LenOpt);
				}
			}
			provice2Val = $(this).val()
			provice2Name = areadata[provice2Val].name
		});
		$('#city2').change(function(btn) {
			document.all['county2'].options.length = 1;
			var val3 = $('#city2').select().val();
			if (val3 != current.hangye2) {
				current.city2 = val2;
				btn.disabled = true;
			}
			if (val3 != null) {
				county2.length = 1;
				var county2Len = areadata[val2]["sub"][val3]["sub"].length;
				for (var m = 0; m < county2Len; m++) {
					var county2Opt = document.createElement('option');
					county2Opt.innerText = areadata[val2]["sub"][val3]["sub"][m].name;
					county2Opt.value = m;
					county2.append(county2Opt);
				}
			}
			city2Val = $(this).val()
			city2Name = areadata[provice2Val]["sub"][city2Val].name
		});
	});
	$('#county2').change(function(btn) {
		county2Val = $(this).val()
		county2Name = areadata[provice2Val]["sub"][city2Val]["sub"][county2Val].name;
		addressChanpin2 = provice2Name + city2Name + county2Name;
	})
})
