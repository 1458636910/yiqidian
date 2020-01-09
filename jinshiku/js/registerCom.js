$(document).ready(function() {
	setTimeout(function() {
		$('#distpicker').distpicker({
			autoSelect: false,
			province: '= 所在省 =',
			city: '= 所在市 =',
			district: '= 所在区 ='
		});
	}, 300);
	//登陆退出
	var href = location.href;
	var back = href.split("href=")[1];
	var dataC = localStorage.getItem("GHY_login");
	if (dataC != null) {
		var dataInfo = JSON.parse(dataC);
		$('#loginBtn').text(dataInfo.username);
		$("#regBtn").on("click", function() {
			localStorage.removeItem("GHY_login");
			window.location.reload();
		}).text("退出");
		var flag2 = 0;
		$("#loginBtn").on("click", function() {
			if (flag2 == 0) {
				$(".userOption").show("500");
				flag2 = 1;
			} else {
				$(".userOption").hide("500");
				flag2 = 0;
			}
		});
		$(".userOption").on("click", function() {
			window.open("http://www.eqidd.com/createrSpace/html/personInfo.html");
		})
	} else {
		$('#loginBtn').click(function() {
			location.href = "innerLogin.html?href=" + href + "";
		}).text("登录");
		$("#regBtn").on("click", function() {
			location.href = "http://www.eqidd.com/html/reg.html?href=" + href + "";
		}).text("注册")
	};
	
	var data_session;
	var http_head = "http://47.94.173.253:8008";
	$('.verify').click(function(e){
		e.preventDefault()
		var phone=$('.contact').val()
		console.log(phone)
		$.post(http_head+'/tool/getUserInfo.ashx',{phone:phone},function(res){
			var res=JSON.parse(res)
			console.log(res)
			if(res.status==200){
				layer.msg('用户已注册')
				$('.passwordDiv').hide()
			}else{
				layer.msg('用户未注册')
				$('.passwordDiv').show()
			}
		})
	})
	setTimeout(function() {
		$.post(http_head + '/Option_AreasAnd.ashx', {
			type: "2"
		}, function(data) {
			data_session = data;
			$('.typeInput').typeahead({
				source: data,
				items: 15,
			});
		});
	}, 300);
	// 企业行业
	var hyArr = []
	setTimeout(function() {
		$.post(http_head + '/Option_AreasAnd.ashx', {
			type: 52
		}, function(data) {
			for (let i = 0; i < data.length; i++) {
				$(".comHy").append('<option value="' + data[i].industry + '" >' + data[i].industry + ' </option>')
			}
		})
	}, 500);
	// 添加图片
	var imgFile;
	$(".chooseImg").click(function() {
		$("#headImg").click(); //隐藏了input:file样式后，点击头像就可以本地上传
	});
	$("#headImg").on("change", function() {
		imgFile = this.files[0];
		ajaxFileUpload(imgFile);
	});
	//建立一個可存取到該file的url
	function getObjectURL(file) {
		var url = null;
		if (window.createObjectURL != undefined) { // basic
			url = window.createObjectURL(file);
		} else if (window.URL != undefined) { // mozilla(firefox)
			url = window.URL.createObjectURL(file);
		} else if (window.webkitURL != undefined) { // webkit or chrome
			url = window.webkitURL.createObjectURL(file);
		}
		return url;
	}
	// 上传图片
	function ajaxFileUpload(file) {
		var imgData = new FormData();
		imgData.append('willcompress', "true");
		imgData.append('file', file);
		$.ajax({
			type: 'post',
			url: http_head + '/Reimburse/Upload_Files.ashx',
			data: imgData,
			cache: false,
			processData: false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
			contentType: false, // 不设置Content-type请求头
			success: function(data) {
				var data = JSON.parse(data);
				if (data.status == 200) {
					layer.msg('上传成功', {
						time: 1000,
					});
					arr_imgHref = http_head + data.items.split(";")[0];
					$(".chooseImg").show();
					$(".chooseImg").attr("value", "重新上传");
					arr_img = [];
					$(".realImg").attr("src", data.items.split(";")[0]); //表格图片
					$("#showImg").attr("src", arr_imgHref); //弹窗已选图片
				}
			},
		});
	};
	var areaName; //地区城市名
	var myreg = /^(13[0-9]|14[5|7|9]|15[0|1|2|3|5|6|7|8|9]|16[6]|17[0|1|2|3|5|6|7|8]|18[0-9]|19[8|9])\d{8}$/; //手机正则
	var regFormData = new FormData();
	var img;
	$(".reging").on("click", function() {
		// var hyCodeNum; //行业号(X)
		// for (let i = 0; i < data_session.length; i++) {
		// 	var tdata = data_session[i];
		// 	if (tdata["name"] == $(".typeInput").val()) {
		// 		hyCodeNum = tdata["code"];
		// 		break;
		// 	}
		// };
		// 随机行业号
		
		var hycode = Math.floor(Math.random() * 10000);
		areaName = $("#city").val();
		img = "/image" + $("#showImg").attr("src").split("image")[1];
		regFormData.append("name", $(".comName").val());
		regFormData.append("mainProduct", $(".mainProduct").val());
		regFormData.append("type", $(".comType").val());
		regFormData.append("hangye", $(".comHy").val());
		regFormData.append("staffnum", $(".comNum").val());
		regFormData.append("user", $(".contact").val());
		if($('.password').val()!=''){
			var password1= $('.password').val()+'EQD'
			var passwordReg = hex_sha1(password1)
			regFormData.append("password",passwordReg);
		}
		regFormData.append("hangyehao", hycode);
		regFormData.append("province", $("#province").val());
		regFormData.append("city", $("#city").val());
		if($("#district").val().length>0){
			regFormData.append("area", $("#district").val());
		}else{
			regFormData.append("area", ' ');
		}
		regFormData.append("address", $(".address").val());
		regFormData.append("buslicense", img);
		regFormData.append("quhao", area_code[areaName]);
		if ($(".comName").val().length > 0 && $(".mainProduct").val().length > 0 && $(".comType").val().length > 0 &&
			$(".comNum").val().length > 0 && $(".contact").val().length > 0 && $("#province").val().length > 0 && $("#city")
			.val().length > 0  &&
			$(".address").val().length > 0 && $("#showImg").attr("src").indexOf("http") != -1) {
			if (!myreg.test($(".contact").val())) {
				layer.msg("请输入正确手机号格式", {
					time: 1200,
				});
			} else {
				var li = layer.load(2, {
				  shade: [0.2,'#000'] //0.1透明度的白色背景
				});
				$.ajax({
					type: 'POST',
					url: 'http://47.94.173.253:8008/comtemp/setComAuthen.ashx',
					data: regFormData,
					cache: false,
					processData: false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
					contentType: false, // 不设置Content-type请求头
					success: function(data) {
						console.log(data)
						var data = JSON.parse(data);
						layer.close(li)
						if (data.status == 200) {
							$(".reging").attr("disabled", true);
							
							layer.open({
								type: 1,
								area: ['500px', '300px'],
								title: ['温馨提示', 'font-size:18px;text-align: center;'],
								content: $('.showts'),
								btn: ['确认'],
								yes: function(index, layero) {
									layer.closeAll();
									// setTimeout(function() {
									// 	location.href = back;
									// }, 10000)
								}
							})
						} else {
							layer.close(li)
							setTimeout(function() {
								location.reload();
							}, 4000);
							layer.msg(data.msg, {
								time: 3000,
							});
						}
					},
					error: function(msg) {
						layer.close(li)
					}
				});
			}
		} else {
			layer.msg("请补全企业信息", {
				time: 1200,
			});
		}
	});
});
