$(document).ready(function() {
	var dataLogin = localStorage.getItem("GHY_login");
	var dataLogined = JSON.parse(dataLogin)
	console.log("用户数据",dataLogined)
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

	// 活动类型
	var actType;
	var actTypeArr = ["论坛", "大会", "研讨会", "培训", "市场活动", "展览", "聚会", "酒会", "其他"];
	$(".hyitems .selectivity-placeholder").text("请选择活动类型");
	$(".hyitems").selectivity({
		allowClear: true,
		items: actTypeArr,
		placeholder: '请选择活动类型'
	});
	$(".hyitems").on("change", function(e) {
		
		actType = e.value;
		if (actType == null) {
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
	
	// 活动分类
	var arr_label2 = [];
	$('.actSort').click(function() {
		$.post('' + http_head + '/Option_AreasAnd.ashx', {
			"type": 50
		}, function(data) {
			layer.open({
				type: 1,
				area: ['800px', '505px'],
				title: ['研究领域', 'font-size:18px;text-align: center;'],
				content: $('.teachAreaTable'),
				btn: '确定',
				// shade: false
			});
			if ($('.tableLeft p').length == 0) {
				for (var i = 0; i < data.length; i++) {
					$('.tableLeft').append('<p class="' + i + '">' + data[i].name + '</p>');
					$('.tableLeft').children('p').eq(0).attr('id', 'firstP');
					document.getElementById('firstP').click();
					$('.tableLeft .' + i + '').click(function() {
						$(this).css('backgroundColor', '#5BB85D').siblings('p').css('backgroundColor', '#29e');
						var m = $(this).attr('class');
						$('.tableRight label').remove();
						for (var j = 0; j < data[m].children.length; j++) {
							$('.tableRight').append('<label><input type="checkbox" value="' + data[m].children[j].name +
								'" name="label">' +
								data[m].children[j].name + '</label>')
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
									$('.actSort').val(arr_label2)
								}
							} else {
								removeByValue(arr_label2, $(this).val());
								$('.actSort').val(arr_label2)
							}
						});
					});
				}
			}
		})
	});

	function removeByValue(arr, val) {
		for (var i = 0; i < arr.length; i++) {
			if (arr[i] == val) {
				arr.splice(i, 1);
				break;
			}
		}
	};
	// 地址
	$('#distpicker').distpicker({
		autoSelect: false
	});
	$('#reset').click(function() {
		$('#distpicker').distpicker('reset');
		$(".address").val('');
	});
	// layerdate
	laydate.render({
		elem: '.actStartTime',
		type: 'datetime'
	});
	laydate.render({
		elem: '.actEndTime',
		type: 'datetime'
	});
	//活动封面
	// 添加图片
	var arrJsk = [];
	$(".chooseImg").click(function() {
		$("#headImg").click(); //隐藏了input:file样式后，点击头像就可以本地上传
	});
	$("#headImg").on("change", function() {
		arrJsk = []
		arrJsk = this.files[0]
		ajaxFileUpload(arrJsk)
	});

	// 上传图片
	function ajaxFileUpload(file) {
		var imgData = new FormData();
		imgData.append('willcompress', "true");
		imgData.append('file', file);
		$.ajax({
			type: 'post',
			url: '' + http_head + '/Reimburse/Upload_Files.ashx',
			data: imgData,
			cache: false,
			processData: false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
			contentType: false, // 不设置Content-type请求头
			success: function(data) {
				var data2 = JSON.parse(data)
				if (data2.status == 200) {
					layer.msg('上传成功', {
						time: 1000,
					});
					arr_imgHref = http_head + data2.items.split(";")[0];
					$(".chooseImg").show();
					$(".chooseImg").attr("value", "重新上传");
					arr_img = [];
					$('.imageDiv').remove();
					$(".realImg").attr("src", data2.items.split(";")[0]); //表格图片
					$("#showImg").attr("src", arr_imgHref); //弹窗已选图片
				}
			},
		});
	};
	// 活动描述
	// 创建富文本编辑框
	var E = window.wangEditor;
	var editor = new E('#editor');
	editor.customConfig.menus = [
		'head', // 标题
		'bold', // 粗体
		'fontSize', // 字号
		'fontName', // 字体
		'italic', // 斜体
		'underline', // 下划线
		'strikeThrough', // 删除线
		'foreColor', // 文字颜色
		'backColor', // 背景颜色
		'link', // 插入链接
		'list', // 列表
		'justify', // 对齐方式
		'quote', // 引用
		'emoticon', // 表情
		'image', // 插入图片
		'table', // 表格
		// 'video', // 插入视频
		// 'code', // 插入代码
		'undo', // 撤销
		'redo' // 重复
	];
	// **************************************自动上传图片开始*********************************
	var dataImg;
	editor.customConfig.customUploadImg = function(files, insert) {
		var iformdata = new FormData();
		var imgU = files[0];
		iformdata.append('image', imgU);
		$.ajax({
			type: 'post',
			url: '' + http_head + '/Articles/CommitImage.ashx',
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
	editor.create();
	// 活动日程
	var editor2 = new E('#editor2');
	editor2.customConfig.menus = [
		'head', // 标题
		'bold', // 粗体
		'fontSize', // 字号
		'fontName', // 字体
		'italic', // 斜体
		'underline', // 下划线
		'strikeThrough', // 删除线
		'foreColor', // 文字颜色
		'backColor', // 背景颜色
		'link', // 插入链接
		'list', // 列表
		'justify', // 对齐方式
		'quote', // 引用
		'emoticon', // 表情
		'image', // 插入图片
		'table', // 表格
		// 'video', // 插入视频
		// 'code', // 插入代码
		'undo', // 撤销
		'redo' // 重复
	];
	// **************************************自动上传图片开始*********************************
	var dataImg2;
	editor2.customConfig.customUploadImg = function(files, insert) {
		var iformdata = new FormData();
		var imgU = files[0];
		iformdata.append('image', imgU);
		$.ajax({
			type: 'post',
			url: '' + http_head + '/Articles/CommitImage.ashx',
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
	editor2.create();
	$("#charge").click(function() {
      $('.priceInput').fadeIn("500")
      $('.priceInput input').val("")
    });
    $("#nocharge").click(function() {
      $('.priceInput').fadeOut("500")
      $('.priceInput input').val(0)
    });
	$(".sub2").on("click",function(){
		console.log("ceshi")
		$(".selectivity-single-select-input").val()
		console.log($("selectivity-single-selected-item"))
	})
	$(".sub").on("click",function(){
		setTimeout(function(){
			$.post(http_head+'/Activity/Add_Activity.ashx',{
				"userGuid":dataLogined.Guid,
				"companyId":dataLogined.companyId,
				"actTitle":$(".actName").val(),
				"actType":actType,
				"actClassify":$(".actSort").val(),
				"actNum":$(".actNum").val(),
				"actScale":$(".actScale").val(),
				"actStartTime":$(".actStartTime").val(),
				"actEndTime":$(".actEndTime").val(),
				"actProvince":$("#province").val(),
				"actCity":$("#city").val(),
				"actAddress":$(".address").val(),
				"actImg":$("#showImg").attr("src"),
				"actDesc":editor.txt.html(),
				"actSchedule":editor2.txt.html(),
				"ischeck":$("#checkArea input[type='radio']:checked").val(),
				"actObject":$("#actPerson").val(),
				"isCharge":$("#chooseCharge input[type='radio']:checked").val(),
				"price":$(".money").val(),
				"name":$(".actContact").val(),
				"department":$(".actDepart").val(),
				"post":$(".actPost").val(),
				"phone":$(".actPhone").val(),
				"email":$(".actEmail").val()			
			},function(data){
				var data = JSON.parse(data);
				if(data.status==200){
					layer.msg('添加成功', {
						time: 1200,
					});
					$(".actName").val('');
					$(".actEmail").val('');
					$(".actPhone").val('');
					$(".actPost").val('');
					$(".actDepart").val('');
					$(".actContact").val('');
					$(".money").val('');
					$("#actPerson").val('');
					editor2.txt.html('');
					editor.txt.html('');
					$("#showImg").attr("src","../image/upload.png");
					$(".address").val('');
					$("#city").val('');
					$("#province").val('');
					$(".actEndTime").val('');
					$(".actStartTime").val('');
					$(".actScale").val('');
					$(".actNum").val('');
					$(".actSort").val('');
				}		
			})
		},380)			
	})
	
	


})
