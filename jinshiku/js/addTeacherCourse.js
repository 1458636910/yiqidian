$(document).ready(function() {
	var userGuid = location.href.split("?")[1].split("&")[0].split("=")[1];
	var hrefStr = location.href.split("?")[1];
	$.post('' + http_head + '/Com/User_BusinessCard.ashx?rand=' + Math.random(), {
		"userGuid": userGuid
	}, function(data) {
		var data = JSON.parse(data);
		if (data.status == 200) {
			var username = data.items.upname;
			$(".uname").text(username);
		}
	});

	// 创建富文本编辑框
	var E = window.wangEditor;
	var editor = new E('#editor');
	editor.customConfig.menus = ['head', // 标题
		'bold', // 粗体
		'fontSize', // 字号
		'fontName', // 字体
		'italic', // 斜体
		'underline', // 下划线
		'strikeThrough', // 删除线
		'foreColor', // 文字颜色
		'backColor', // 背景颜色
		'list', // 列表
		'justify', // 对齐方式
		'quote', // 引用
		'emoticon', // 表情
		'table', // 表格
		'undo', // 撤销
		'redo' // 重复
	];
	// editor.customConfig.uploadImgShowBase64 = true;
	// **************************************自动上传图片开始*********************************
	//   editor.customConfig.customUploadImg = function (files, insert) {
	//         var  Pformdata= new FormData();
	//         var imgU = files[0];
	//         Pformdata.append('image', imgU);
	//         $.ajax({
	//                      type : 'post',
	//                      url : http_head+'/Articles/CommitImage.ashx',
	//                      data : Pformdata,
	//                      cache : false,
	//                      processData : false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
	//                      contentType : false, // 不设置Content-type请求头
	//                      success : function(data){
	//                       console.log(data)
	//                       var dataimg = JSON.parse(data)
	//                       insert(dataimg.items)
	//                      }
	//                  });
	// };
	// **************************************自动上传图片结束*********************************
	editor.create();
	for (var i = 1; i <= 9; i++) {
		$('.imgList').append('<li class="pull-left li' + i + '"><img id="pic' + i +
			'" src="" alt="点击选择上传图片"><input id="upload' + i +
			'" name="file" accept="image/*" type="file" style="display: none"/></li>')
	}
	$(".addPhoto ul li:even").attr('<br>');
	var str_label2 = "";
	var arr_label2 = [];
	$('.courseType').click(function() {
		$.post('' + http_head + '/Option_AreasAnd.ashx', {
			"type": 45
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
					$('.tableLeft').append('<p class="' + i + '">' + data[i].name + '</p>');
					$('.tableLeft').children('p').eq(0).attr('id', 'firstP');
					document.getElementById('firstP').click();
					$('.tableLeft .' + i + '').click(function() {
						$(this).css('backgroundColor', '#5BB85D').siblings('p').css('backgroundColor', '#29e');
						var m = $(this).attr('class');
						$('.tableRight label').remove();
						for (var j = 0; j < data[m].sub.length; j++) {
							$('.tableRight').append('<label><input type="checkbox" value="' + data[m].sub[j].name +
								'" name="label">' + data[m].sub[j].name + '</label>')
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
			$('.layui-layer-btn0').click(function() {
				for (var i = 0; i < arr_label2.length; i++) {
					str_label2 += arr_label2[i] + ","
				}
				var labelArea = str_label2.substring(0, Number(str_label2.length) - 1)
				$('.courseType').val($('#labelInfo').val());
				arr_label2 = [];
				$('#labelInfo').val("");
				$("input:checkbox[name='label']").removeAttr('checked');
			});
			$('.layui-layer-close').click(function() {
				$("input:checkbox[name='label']").removeAttr('checked');
				arr_label2 = [];
				$('#labelInfo').val("");
			});
		})
	});
	$('.addPhoto ul li:gt(0)').css('display', 'none');
	$('.submit .subBtn').click(function() {
		ajaxFileUpload()
	});
	var userAgent = navigator.userAgent; //用于判断浏览器类型
	var arr_img = [];
	var fileList;
	$(".file").change(function() {
		//获取选择图片的对象
		var docObj = $(this)[0];
		var picDiv = $(this).parents(".picDiv");
		//得到所有的图片文件
		fileList = docObj.files;
		for (var i = 0; i < fileList.length; i++) {
			arr_img.push(fileList[i])
			var picHtml = "<div class='imageDiv' > <img id='img" + fileList[i].name +
				"'  /> <div class='cover'><i class='delbtn'>删除</i></div></div>"
			picDiv.prepend(picHtml);
			var imgObjPreview = document.getElementById("img" + fileList[i].name);
			if (fileList && fileList[i]) {
				//图片属性
				imgObjPreview.style.display = 'block';
				imgObjPreview.style.width = '320px';
				imgObjPreview.style.height = '296px';
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
		_this.parents(".imageDiv").remove();
	});
	var str_label3 = "";
	var arr_label3 = [];
	$("#coursehnagye").on("click", function() {

		$.post('' + http_head + '/Option_AreasAnd.ashx', {
			"type": 52
		}, function(data) {
			for (let i = 0; i < data.length; i++) {
				$(".tableSel").append('<label><input type="checkbox" value="' + data[i].industry +
					'" name="label">' + data[i].industry + '</label>')
			}
			$("input:checkbox[name='label']").click(function() {
				var aaa = $(this).prop("checked");
				if (aaa === true) {
					if (arr_label3.length > 4) {
						layer.msg('最多选择5个', {
							time: 1000,
						});
						$(this).prop("checked", false)
						removeByValue(arr_label3, $(this).val());
					} else {
						arr_label3.push($(this).val());
						$('#labelAd').val(arr_label3);
					}
				} else {
					removeByValue(arr_label3, $(this).val());
					$('#labelAd').val(arr_label3);
				}
			});
			$('.layui-layer-close').click(function() {
				$("tableSel label input").prop('checked', false);
				arr_label3 = [];
				$(".tableSel").replaceWith('<div class="tableSel pull-left"></div>')
				$('#labelAd').val("");
				layer.closeAll()
			});
		})
		layer.open({
			type: 1,
			area: ['800px', '505px'],
			title: ['选择行业', 'font-size:18px;text-align: center;'],
			content: $('.teachAd'),
			btn: '确定',
			shade: [0.3],
			yes: function() {
				$('#coursehnagye').val($('#labelAd').val());
				$('#labelAd').val("");
				$("tableSel label input").prop('checked', false);
				arr_label3 = [];
				$(".tableSel").replaceWith('<div class="tableSel pull-left"></div>')
				layer.closeAll()
			}
		});
	});
	$(".kj").on("click", function() {
		$("#file").click()
	})
	$("#file").change(function(e) {
		$(".kj").text($("#file")[0].files[0].name)
	})

	function ajaxFileUpload() {
		var Iformdata = new FormData();
		var dataFile = $("#file")[0].files;
		Iformdata.append('courseType', $('.courseType').val());
		Iformdata.append('courseTheme', $('.courseTheme').val());
		Iformdata.append('courseTimes', $('.courseTimes').val());
		Iformdata.append('courseOutlint', editor.txt.html());
		Iformdata.append('courseObjecter', $('.courseObjecter').val());
		Iformdata.append('courseMethod', $('.courseMethod').val());
		Iformdata.append('coursePrice', $('.coursePrice').val());
		var hangye;
		var mubiao;
		var beijing;
		if ($('#coursehnagye').val()) {
			hangye = $('#coursehnagye').val()
		} else {
			hangye = ' ';
		};
		if ($('.courseTarget').val()) {
			mubiao = $('.courseTarget').val()
		} else {
			mubiao = ' ';
		};
		if ($('.courseBackground').val()) {
			beijing = $('.courseBackground').val()
		} else {
			beijing = ' ';
		};
		Iformdata.append('courseIndustry', hangye);
		Iformdata.append('courseTarget', mubiao);
		Iformdata.append('courseBackground', beijing);
		$.post('' + http_head + 'Lectures/Get_Lecture_ByCreater.ashx?rand=' + Math.random(), {
			"userGuid": userGuid
		}, function(data) {
			var data = JSON.parse(data);
			Iformdata.append('lectureName', data.items.realname);
		});
		Iformdata.append('coursewares', dataFile);
		Iformdata.append('userGuid', userGuid);
		for (var i = 0; i < arr_img.length; i++) {
			Iformdata.append('files', arr_img[i]);
		}
		$.ajax({
			type: 'POST',
			url: http_head + '/Lectures/course/Add_Lecture_Course.ashx',
			data: Iformdata,
			cache: false,
			processData: false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
			contentType: false, // 不设置Content-type请求头
			success: function(data) {
				console.log(data)
				data2 = JSON.parse(data);
				console.log(data2)
				if (data2.status == 200) {
					layer.msg('添加成功', {
						time: 1000,
					});
					setTimeout(function() {
						location.href = "index.html?" + hrefStr;
					}, 1500)
				} else {
					layer.msg('请填写完善必要信息', {
						time: 1000,
					});
				}
			},
			error: function(msg) {}
		});
	}
	// 删除类别操作
	function removeByValue(arr, val) {
		for (var i = 0; i < arr.length; i++) {
			if (arr[i] == val) {
				arr.splice(i, 1);
				break;
			}
		}
	}
})
