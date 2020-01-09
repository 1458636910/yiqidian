$(document).ready(function() {
	var dataLogin = localStorage.getItem("GHY_login");
	var dataLogined = JSON.parse(dataLogin)
	// 判断是否有权力发需求
	if (dataLogined.isAdmin != 1 && dataLogined.isAdmin != 2) {
		layer.msg('你没有发需求的权限', {
			time: 3000,
			shade: 0.5
		});
		setTimeout(function() {
			window.close()
		}, 3100)
	};
	var http_head = "http://47.94.173.253:8008";
	// 参数
	var p = $("#province1 option:selected").val();
	var c = $("#city1 option:selected").val();
	var d = $("#district1 option:selected").val();
	var addressDetail = $(".Badress").val();

	var address = p + c + d + addressDetail; //项目地址
	var industryDetail = ''; //领域细分
	var Adepart = dataLogined.department; //所在部门
	var Apost = dataLogined.post; //岗位
	var Bsort; //需求类型
	var Bpost; //所属行业
	var Bfield; //需求领域
	var BfieldDetail; //需求领域详情
	var Bmode; //项目咨询模式
	var mode = $('.mode option:selected').val();
	if (mode == "不限") {
		Bmode = 0
	} else if (mode == "间歇式") {
		Bmode = 1
	} else if (mode == "驻厂式") {
		(Bmode = 2)
	}
	var Cpost; //咨询师行业
	var CworkBg; //咨询师背景
	var CpostOld; //咨询师曾任职
	var Cauthen; //是否认证
	var authen = $('.rz option:selected').val();
	if (authen == "不限") {
		Cauthen = 0
	} else if (authen == "已认证") {
		Cauthen = 1
	} else if (authen == "未认证") {
		(Cauthen = -1)
	}
	
	var Csex; //性别
	var sex = $('.sex option:selected').val();
	if (sex == "不限") {
		Csex = 2
	} else if (sex == "男") {
		Csex = 0
	} else if (sex == "女") {
		(Csex = 1)
	}
	// 提交
	$(".Adepart").val(Adepart);
	$(".Apost").val(Apost);

	// 搜索插件
	// 需求类型
	var AdsortArr = ["战略与商业模式咨询", "人力资源管理咨询", "猎头服务", "业务流程咨询", "供应链管理咨询", "市场营销咨询", "生产制造咨询", "会计与税务咨询",
		"风险投资咨询", "风险与危机管理", "市场调查咨询", "投资咨询", "认证咨询", "IT咨询", "工程咨询", "法律咨询", "房地产咨询", "出口及报关咨询", "广告策划咨询", "心理健康咨询",
		"旅游咨询", "保险咨询", "节能咨询", "环境评估咨询", "翻译服务", "其它咨询"
	];
	$(".hyitems .selectivity-placeholder").text("请选择需求类型");
	$(".hyitems").selectivity({
		allowClear: true,
		items: AdsortArr,
		placeholder: '请选择分类'
	});
	$(".hyitems").on("change", function(e) {
		Bsort = e.value;

		if (Bsort == null) {
			$(".fa-sort-desc").css({
				"borderTopColor": "black"
			});
			$("#selectI").remove();
			$("#select9 dd").addClass("selected");
		} else {
			$(".fa-sort-desc").css({
				"borderTopColor": "white"
			})
		}

	});
	$(".hyitems").on("selectivity-open", function(e) {
		if (Bsort == "" || Bsort == null) {
			$(".fa-sort-desc").css({
				borderTop: "none",
				borderBottom: "4px solid black"
			})
		} else {
			$(".fa-sort-desc").css({
				borderTop: "none",
				borderBottom: "4px solid white"
			})
		}
	})
	$(".hyitems").on("selectivity-close", function(e) {
		if (Bsort == '' || Bsort == null) {
			$(".fa-sort-desc").css({
				borderBottom: "none",
				borderTop: "4px solid black"
			})
		} else {
			$(".fa-sort-desc").css({
				borderBottom: "none",
				borderTop: "4px solid white"
			})
		}
	});

	
	// 需求所属行业
	var industArr = ["农林牧渔", "油/气/矿物开采", "生产制造", "水/电/燃气供应", "建筑/装饰", "交通/物流/运输", "互联网/IT", "批发/零售/连锁", "餐饮/住宿/旅游/酒店",
		"金融", "房地产/物业管理", "商务服务/租赁", "科研/技术服务", "水利/环保/公共管理", "家政/居民服务（美容美发保键）", "教育/培训", "医疗卫生/养老服务", "文化/体育/娱乐/出版",
		"政符/社会组织"
	];
	$(".hyitems2 .selectivity-placeholder").text("请选择所属行业");
	$(".hyitems2").selectivity({
		allowClear: true,
		items: industArr,
		placeholder: '请选择分类'
	});
	$(".hyitems2").on("change", function(e) {
		Bpost = e.value;	
		if (Bpost == null) {
			$(".fa-sort-desc").css({
				"borderTopColor": "black"
			});
			$("#selectI").remove();
			$("#select9 dd").addClass("selected");
		} else {
			$(".fa-sort-desc").css({
				"borderTopColor": "white"
			})
		}
	
	});
	$(".hyitems2").on("selectivity-open", function(e) {
		if (Bpost == "" || Bpost == null) {
			$(".fa-sort-desc").css({
				borderTop: "none",
				borderBottom: "4px solid black"
			})
		} else {
			$(".fa-sort-desc").css({
				borderTop: "none",
				borderBottom: "4px solid white"
			})
		}
	})
	$(".hyitems2").on("selectivity-close", function(e) {
		if (Bpost == '' || Bpost == null) {
			$(".fa-sort-desc").css({
				borderBottom: "none",
				borderTop: "4px solid black"
			})
		} else {
			$(".fa-sort-desc").css({
				borderBottom: "none",
				borderTop: "4px solid white"
			})
		}
	});
	
	// layerdate
	laydate.render({
		elem: '.BstartTime',
		type: 'date'
	});
	laydate.render({
		elem: '.BendTime',
		type: 'date'
	});
	laydate.render({
		elem: '.BendTimeLong',
		type: 'date'
	});

	$('#distpicker').distpicker({
		autoSelect: false
	});
	$('#reset').click(function() {
		$('#distpicker').distpicker('reset');
		$(".Badress").val('');
	});
	// 领域
	var str_label2 = "";
	var arr_label2 = [];
	$('.courseType').click(function() {
		$.post('' + http_head + '/Option_AreasAnd.ashx', {
			"type": 51
		}, function(data) {
			layer.open({
				type: 1,
				area: ['800px', '505px'],
				title: ['研究领域', 'font-size:18px;text-align: center;'],
				content: $('.teachAreaTable'),
				btn: '确定',
			});
			if ($('.tableLeft p').length == 0) {
				for (var i = 0; i < data.length; i++) {
					$('.tableLeft').append('<p class="' + i + '">' + data[i].product + '</p>');
					$('.tableLeft').children('p').eq(0).attr('id', 'firstP');
					document.getElementById('firstP').click();
					Bfield = "战略与商业模式咨询";
					$('.tableLeft .' + i + '').click(function() {
						Bfield = $(this).text();
					
						$(this).css('backgroundColor', '#5BB85D').siblings('p').css('backgroundColor', '#29e');
						var m = $(this).attr('class');
						$('.tableRight label').remove();
						for (var j = 0; j < data[m].child.length; j++) {
							$('.tableRight').append('<label><input type="radio" value="' + data[m].child[j].product +
								'" product="label" name="1" />' +
								data[m].child[j].product + '</label>')
						};
						$(".tableRight label").click(function() {
						    BfieldDetail = $(this).text();
							$('.courseType').attr("value", BfieldDetail);
						});
					});
				}
			} else {}
			$(".tableRight label input").on("click", function(event) {
				event.stopPropagation(); //阻止其继续冒泡
			});
		})
	});

	function removeByValue(arr, val) {
		for (var i = 0; i < arr.length; i++) {
			if (arr[i] == val) {
				arr.splice(i, 1);
				break;
			}
		}
	}
	// 咨询师行业
	
	$.post(http_head + "/Option_AreasAnd.ashx", {
		"type": 2
	}, function(data) {
		// console.log("行业",data);
		var CpostArr = [];
		for (let i = 0; i < data.length; i++) {
			CpostArr.push(data[i].name);
		}
		$(".hyitems3").selectivity({
			allowClear: true,
			items:CpostArr,
			placeholder: '请选择分类'
		});
		$(".hyitems3").on("change", function(e) {
			Cpost = e.value;	
			if (Cpost == null) {
				$(".fa-sort-desc").css({
					"borderTopColor": "black"
				});
				$("#selectI").remove();
				$("#select9 dd").addClass("selected");
			} else {
				$(".fa-sort-desc").css({
					"borderTopColor": "white"
				})
			}
		
		});
		$(".hyitems3").on("selectivity-open", function(e) {
			if (Cpost == "" || Cpost == null) {
				$(".fa-sort-desc").css({
					borderTop: "none",
					borderBottom: "4px solid black"
				})
			} else {
				$(".fa-sort-desc").css({
					borderTop: "none",
					borderBottom: "4px solid white"
				})
			}
		})
		$(".hyitems3").on("selectivity-close", function(e) {
			if (Cpost == '' || Cpost == null) {
				$(".fa-sort-desc").css({
					borderBottom: "none",
					borderTop: "4px solid black"
				})
			} else {
				$(".fa-sort-desc").css({
					borderBottom: "none",
					borderTop: "4px solid white"
				})
			}
		});
	})
	// 咨询师背景
	var jobArr = ["世界500强", "中国500强", "大型国企", "大型民企", "知名日韩企业", "港澳台企业", "欧美外企", "其他"];
	$(".hyitems4").selectivity({
		allowClear: true,
		items: jobArr,
		placeholder: '请选择分类'
	});
	$(".hyitems4").on("change", function(e) {
		CworkBg = e.value;	
		if (CworkBg == null) {
			$(".fa-sort-desc").css({
				"borderTopColor": "black"
			});
			$("#selectI").remove();
			$("#select9 dd").addClass("selected");
		} else {
			$(".fa-sort-desc").css({
				"borderTopColor": "white"
			})
		}
	});
	$(".hyitems4").on("selectivity-open", function(e) {
		if (CworkBg == "" || CworkBg == null) {
			$(".fa-sort-desc").css({
				borderTop: "none",
				borderBottom: "4px solid black"
			})
		} else {
			$(".fa-sort-desc").css({
				borderTop: "none",
				borderBottom: "4px solid white"
			})
		}
	})
	$(".hyitems4").on("selectivity-close", function(e) {
		if (CworkBg == '' || CworkBg == null) {
			$(".fa-sort-desc").css({
				borderBottom: "none",
				borderTop: "4px solid black"
			})
		} else {
			$(".fa-sort-desc").css({
				borderBottom: "none",
				borderTop: "4px solid white"
			})
		}
	});

	$(".hyitems4 .selectivity-placeholder").text("请选择背景");
	// 曾任职
	var jobOldArr = ["总经理", "副总", "总监", "部门经理/主管", "高级工程师", "一般管理人员", "其他"];

	$(".hyitems5").selectivity({
		allowClear: true,
		items: jobOldArr,
		placeholder: '请选择分类'
	});
	$(".hyitems5").on("change", function(e) {
		CpostOld = e.value;	
		if (CpostOld == null) {
			$(".fa-sort-desc").css({
				"borderTopColor": "black"
			});
			$("#selectI").remove();
			$("#select9 dd").addClass("selected");
		} else {
			$(".fa-sort-desc").css({
				"borderTopColor": "white"
			})
		}
	});
	$(".hyitems5").on("selectivity-open", function(e) {
		if (CpostOld == "" || CpostOld == null) {
			$(".fa-sort-desc").css({
				borderTop: "none",
				borderBottom: "4px solid black"
			})
		} else {
			$(".fa-sort-desc").css({
				borderTop: "none",
				borderBottom: "4px solid white"
			})
		}
	})
	$(".hyitems5").on("selectivity-close", function(e) {
		if (CpostOld == '' || CpostOld == null) {
			$(".fa-sort-desc").css({
				borderBottom: "none",
				borderTop: "4px solid black"
			})
		} else {
			$(".fa-sort-desc").css({
				borderBottom: "none",
				borderTop: "4px solid white"
			})
		}
	});
	$(".hyitems5 .selectivity-placeholder").text("请选择曾任职");
	// 咨询师城市
	$('#distpicker2').distpicker({
		autoSelect: false
	});
	$('#reset').click(function() {
		$('#distpicker2').distpicker('Creset');

	});
	// 提交
	$(".sub").on("click", function() {
		// console.log( dataLogined.Guid,dataLogined.companyId, Acontact, dataLogined.department,Apost, Aphone,Bthem, Bsort, Bpost,industryDetail,Bfield,BfieldDetail,BstartTime,BendTime,BdateLong,Canimal,address,Bjob,Bnum,Bnum,Bother,Bmode,Bmoney,BadMoney,BexpireDate, Cpost, Csex,minAge, maxAge,Canimal,CanimalNo,Cprovince,Ccity,Cedu,Cmajor,CjobName,Cforeign,CworkBg,CpostOld,Cother,Cauthen)
	    console.log(p,c,d)
		$.post(http_head + "/Advisers/NeedOfAdvisers/add_needOfAdvisers.ashx", {
			"userGuid": dataLogined.Guid,
			"companyId": dataLogined.companyId,
			"A_contact": $(".Acontact").val(),
			"A_depart": dataLogined.department,
			"A_post": dataLogined.post,
			"A_phone": $(".Aphone").val(),
			"B_theme": $(".Bthem").val(),
			"B_type": Bsort,
			"B_industry": Bpost,
			"B_industryDetail": industryDetail,
			"B_lingyu": Bfield,
			"B_lingyuDetail": BfieldDetail,
			"B_startTime":  $(".BstartTime").val(),
			"B_endTime": $(".BendTime").val(),
			"B_timeCycle": $(".BtimeLong").val(),
			"B_area": address,
			"B_post":$(".Bpost").val(),
			"B_num": $(".Bnum").val(),
			"B_Other": $("#BothersRequest").val(),
			"B_mode": Bmode,
			"B_cost": $(".Bcost").val(),
			"B_costForAdviser": $(".Badcost").val(),
			"B_endTimeForNeed": $(".BendTimeLong").val(),
			"C_hangYe": Cpost,
			"C_sex": Csex,
			"C_ageMin": $(".minAge").val(),
			"C_ageMax": $(".maxAge").val(),
			"C_shuXiang": $('#usertype1 option:selected').val(),
			"C_shuXiangNo": $('#usertype2 option:selected').val(),
			"C_province": $("#Cprovince").val(),
			"C_city":  $("#Ccity").val(),
			"C_edu": $('.wh option:selected').val(),
			"C_zhuanYe": $(".Czy").val(),
			"C_depart":  $(".Czc").val(),
			"C_english": $('.wy option:selected').val(),
			"C_workBg": CworkBg,
			"C_post": CpostOld,
			"C_authen": Cauthen,
			"C_other": $("#CothersRequest").val()
		}, function(data) {
			console.log("提交数据", data)
		})
	})



})
