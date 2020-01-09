$(function() {
	//Demo
	layui.use('form', function() {
		var form = layui.form;
		//监听提交
		form.on('submit(formDemo)', function(data) {
			return false;
		});
	});


	// 获取公司性质下拉框数据
	$.ajax({
		url: 'http://47.94.173.253:8008/Option_AreasAnd.ashx', //你请求的接口
		type: 'POST', //类型
		data: {
			type: '6'
		}, //数据有则传，没有可以不写
		success: function(data) {
			//请求成功后的返回
			for (let i = 0; i < data.length; i++) {
				$("#nature").append(new Option(data[i].name))
			}
			layui.use('form', function() {
				var form = layui.form;
				form.render();
			})
		}
	})




	// 获取员工人数下拉框数据
	$.ajax({
		url: 'http://47.94.173.253:8008/Option_AreasAnd.ashx', //你请求的接口
		type: 'POST', //类型
		data: {
			type: '4'
		}, //数据有则传，没有可以不写
		success: function(data) {
			//请求成功后的返回
			for (let i = 0; i < data.length; i++) {
				$("#staffnum").append(new Option(data[i].name))
			}
			layui.use('form', function() {
				var form = layui.form;
				form.render();
			})
		}
	})

	/**
	 * 通过数组id获取地址列表数组
	 *
	 * @param {Number} id
	 * @return {Array} 
	 */
	function getAddrsArrayById(id) {
		var results = [];
		if (addr_arr[id] != undefined)
			addr_arr[id].forEach(function(subArr) {
				results.push({
					key: subArr[0],
					val: subArr[1]
				});
			});
		else {
			return;
		}
		return results;
	}
	/**
	 * 通过开始的key获取开始时应该选中开始数组中哪个元素
	 *
	 * @param {Array} StartArr
	 * @param {Number|String} key
	 * @return {Number} 
	 */
	function getStartIndexByKeyFromStartArr(startArr, key) {
		var result = 0;
		if (startArr != undefined)
			startArr.forEach(function(obj, index) {
				if (obj.key == key) {
					result = index;
					return false;
				}
			});
		return result;
	}

	$("#myAddrs").click(function() {
		var PROVINCES = [],
			startCities = [],
			startDists = [];
		//Province data，shall never change.
		addr_arr[0].forEach(function(prov) {
			PROVINCES.push({
				key: prov[0],
				val: prov[1]
			});
		});
		//init other data.
		var $input = $(this),
			dataKey = $input.attr("data-key"),
			provKey = 1, //default province 北京
			cityKey = 36, //default city 北京
			distKey = 37, //default district 北京东城区
			distStartIndex = 0, //default 0
			cityStartIndex = 0, //default 0
			provStartIndex = 0; //default 0

		if (dataKey != "" && dataKey != undefined) {
			var sArr = dataKey.split("-");
			if (sArr.length == 3) {
				provKey = sArr[0];
				cityKey = sArr[1];
				distKey = sArr[2];

			} else if (sArr.length == 2) { //such as 台湾，香港 and the like.
				provKey = sArr[0];
				cityKey = sArr[1];
			}
			startCities = getAddrsArrayById(provKey);
			startDists = getAddrsArrayById(cityKey);
			provStartIndex = getStartIndexByKeyFromStartArr(PROVINCES, provKey);
			cityStartIndex = getStartIndexByKeyFromStartArr(startCities, cityKey);
			distStartIndex = getStartIndexByKeyFromStartArr(startDists, distKey);
		}
		var navArr = [{ //3 scrollers, and the title and id will be as follows:
			title: "省",
			id: "scs_items_prov"
		}, {
			title: "市",
			id: "scs_items_city"
		}, {
			title: "区",
			id: "scs_items_dist"
		}];
		SCS.init({
			navArr: navArr,
			onOk: function(selectedKey, selectedValue) {
				$input.val(selectedValue).attr("data-key", selectedKey);
			}
		});
		var distScroller = new SCS.scrollCascadeSelect({
			el: "#" + navArr[2].id,
			dataArr: startDists,
			startIndex: distStartIndex
		});
		var cityScroller = new SCS.scrollCascadeSelect({
			el: "#" + navArr[1].id,
			dataArr: startCities,
			startIndex: cityStartIndex,
			onChange: function(selectedItem, selectedIndex) {
				distScroller.render(getAddrsArrayById(selectedItem.key), 0); //re-render distScroller when cityScroller change
			}
		});
		var provScroller = new SCS.scrollCascadeSelect({
			el: "#" + navArr[0].id,
			dataArr: PROVINCES,
			startIndex: provStartIndex,
			onChange: function(selectedItem, selectedIndex) { //re-render both cityScroller and distScroller when provScroller change
				cityScroller.render(getAddrsArrayById(selectedItem.key), 0);
				distScroller.render(getAddrsArrayById(cityScroller.getSelectedItem().key), 0);
			}
		});
	});


	// 添加图片
	var imgFile;
	$(".chooseImg").click(function() {
		$("#headImg").click(); //隐藏了input:file样式后，点击头像就可以本地上传
	});
	$("#headImg").on("change", function() {
		imgFile = this.files[0];
		ajaxFileUpload(imgFile);
	});

	// 上传图片
	function ajaxFileUpload(file) {
		var imgData = new FormData();
		imgData.append('willcompress', "true");
		imgData.append('file', file);
		$.ajax({
			type: 'post',
			url: 'http://47.94.173.253:8008/Reimburse/Upload_Files.ashx',
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
					var szz = data.items.split(";")[0];
					arr_imgHref = 'http://47.94.173.253:8008' + data.items.split(";")[0];
					arr_img = [];
					$("#showImg").attr("src", arr_imgHref); //弹窗已选图片
					$('#pics').val('重新上传')
				}
			},
		});
	};




	var quhao;
	var hycode = Math.floor(Math.random() * 10000);
	$('#refer').click(function() {
		// 获取区号
		var promise = new Promise(function(resolve, reject) {
			$.ajax({
				url: 'http://47.94.173.253:8008/Option_AreasAnd.ashx', //你请求的接口
				type: 'POST', //类型
				data: {
					type: '0'
				}, //数据有则传，没有可以不写
				success: function(data) {
					//请求成功后的返回
					for (var i = 0; i < data.length; i++) {
						if (data[i].name == $('#myAddrs').val().split(' ')[0]) {
							for (var j = 0; j < data[i].sub.length; j++) {
								if (data[i].sub[j].name == $('#myAddrs').val().split(' ')[1]) {
									quhao = data[i].sub[j].code
								}
							}
						}
					}
					resolve(quhao)
				}
			})
		});
		promise.then(function(value) {
			$.post('http://47.94.173.253:8008/comtemp/setComAuthen.ashx', {
					"quhao": value,
					"hangyehao": hycode,
					"staffnum": $('#staffnum').val(), //员工人数
					"user": $('#phone').val(), //手机号
					"buslicense": $("#showImg").attr("src"), //营业执照
					"name": $('#name').val(), //企业全称
					"type": $('#nature').val(), //企业类型
					"hangye": $('#hangye').val(), //企业所属行业
					"address": $('#address').val(), //详细地址
					"province": $('#myAddrs').val().split(' ')[0], // /省份
					"city": $('#myAddrs').val().split(' ')[1], //城市
					"area": $('#myAddrs').val().split(' ')[2], //区域
					"mainProduct": $('#mainProduct').val(), //主打产品
				},
				function(data) {
					data = JSON.parse(data)
					console.log(data)
					if (data.status == 200) {
						layer.msg('企业注册信息已经提交到易企点平台，我们会在1-3天内尽快处理，请耐心等待……</br>提示：请保持手机畅通，我们后台审核人员会通过手机或邮箱通知您有关', {
							time: 1000,
						});
					} else {
						layer.msg(data.msg, {
							time: 1000,
						});
					}
				})
		})
	});





});
