$(document).ready(function() {
	// 式样
	laydate.render({
		elem: '#testBegin',
		max: 0
	});
	$('#qiye').click(function() {
		$('.titlelist ul li').eq(0).addClass('active').siblings('li').removeClass('active');
		$('.qiyeOption').show();
		$('.maintext').hide();
		$('.shezhiOption').hide();
		$('.yuangongDangan').hide();
		// 获取公司信息
		$.post('' + EQD_url + '/Com_regiInfo.ashx', {
			comId: data1.companyId
		}, function(data) {
			var dataQiye = JSON.parse(data);
			$('.imgLogo img').attr('src', dataQiye.items.logo);
			$('.qiyeName').text(dataQiye.items.name);
			$('.qiyeNum').text(dataQiye.items.idnum);
			$('.simpleName').text(dataQiye.items.simpleName);
			$('.contact').text(dataQiye.items.contact);
			$('.type').text(dataQiye.items.type);
			$('.hangye').text(dataQiye.items.hangye);
			$('.pnum').text(dataQiye.items.staffnum);
			$('.address').text(dataQiye.items.address);
			$(".yyzz").attr("src",dataQiye.items.com_buslicense_photo)
		});
		var hangyedata, hangyeLength;
		$.post('' + EQD_url + '/Option_AreasAnd.ashx', {
			type: "2"
		}, function(data) {
			hangyedata = data;
			hangyeLength = hangyedata.length;
			var len = hangyeLength;
			for (var i = 0; i < len; i++) {
				var hangye1Opt = document.createElement('option');
				hangye1Opt.innerText = hangyedata[i]['name'];
				hangye1Opt.value = i;
				hangye1.append(hangye1Opt);
			}
		});
	});
	$('.qiyeLeft .comInfo').click(function() {
		$(this).addClass('pcheck1').siblings('p').removeClass('pcheck1');
		$('.qiyeInfo').show();
		$('.qiyeConfirm').hide();
		$('.qiyeConfirmed').hide();
		$('.qiyeConfirming').hide();
	});
	$('.qiyeLeft .comCon').click(function() {
		if (Number(make) == 0) {
			$(this).addClass('pcheck1').siblings('p').removeClass('pcheck1');
			$('.qiyeConfirm').show();
			$('.qiyeInfo').hide();
			$('.qiyeConfirmed').hide();
			$('.qiyeConfirming').hide();
		} else {
			$(this).addClass('pcheck1').siblings('p').removeClass('pcheck1');
			$('.qiyeConfirm').hide();
			$('.qiyeInfo').hide();
			$('.qiyeConfirmed').hide();
			$('.qiyeConfirming').show();
		}
	})
	$('.comReg').click(function() {
		window.open("http://www.eqidd.com/makerSpace/rePassword.html?userGuid="+data1.Guid+"&iphone="+data1.uname+"&companyId="+data1.companyId+"&v="+Math.random());
	})
	// 获取行业
	var hangyeShow = $('#mainHangye');
	var btn = document.getElementsByClassName('hangye1');
	var hangye1 = $('#hangye1');
	var hangye2 = $('#hangye2');
	var current = {
		hangye1: '',
		hangye2: ''
	};
	
	$('#hangye1').change(function(btn) {
		document.all['hangye2'].options.length = 1;
		var val = $('#hangye1').select().val();
		if (val != current.hangye1) {
			current.hangye1 = val;
			hangyeShow.val('');
			btn.disabled = true;
		}
		if (val != null) {
			hangye2.length = 1;
			var hangye2Len = hangyedata[val]["children"].length;
			for (var j = 0; j < hangye2Len; j++) {
				var hangye2Opt = document.createElement('option');
				hangye2Opt.innerText = hangyedata[val]["children"][j].name;
				hangye2Opt.value = j;
				hangye2.append(hangye2Opt);
			}
		}
	});
	// var arr = ['','','','','','','']
	// $("#pic1").click(function () {
	//     $("#upload1").click(); //隐藏了input:file样式后，点击头像就可以本地上传
	//     $("#upload1").on("change",function(){
	//     var objUrl1 = getObjectURL(this.files[0]) ; //获取图片的路径，该路径不是图片在本地的路径
	//      arr.splice(0,1,this.files[0]);
	//     if (objUrl1) {
	//       $("#pic1Img").show()
	//       $("#pic1Img").attr("src", objUrl1) ; //将图片路径存入src中，显示出图片
	//       $("#pic1").val("重新选择")
	//     }
	//     });
	// });
	// $("#pic2").click(function () {
	//     $("#upload2").click(); //隐藏了input:file样式后,点击头像就可以本地上传
	//     $("#upload2").on("change",function(){
	//     var objUrl2 = getObjectURL(this.files[0]) ; //获取图片的路径，该路径不是图片在本地的路径
	//      arr.splice(1,1,this.files[0]);
	//     if (objUrl2) {
	//     $("#pic2").attr("src", objUrl2) ; //将图片路径存入src中，显示出图片
	//     }
	//     });
	// });

	// $("#pic3").click(function () {
	//     $("#upload3").click(); //隐藏了input:file样式后，点击头像就可以本地上传
	//     $("#upload3").on("change",function(){
	//     var objUrl3 = getObjectURL(this.files[0]) ; //获取图片的路径，该路径不是图片在本地的路径
	//      arr.splice(2,1,this.files[0]);
	//     if (objUrl3) {
	//     $("#pic3").attr("src", objUrl3) ; //将图片路径存入src中，显示出图片
	//     }
	//     });
	// });

	// $("#pic4").click(function () {
	//     $("#upload4").click(); //隐藏了input:file样式后，点击头像就可以本地上传
	//     $("#upload4").on("change",function(){
	//     var objUrl4 = getObjectURL(this.files[0]) ; //获取图片的路径，该路径不是图片在本地的路径
	//      arr.splice(3,1,this.files[0]);
	//     if (objUrl4) {
	//     $("#pic4").attr("src", objUrl4) ; //将图片路径存入src中，显示出图片
	//     }
	//     });
	// });

	// $("#pic5").click(function () {
	//     $("#upload5").click(); //隐藏了input:file样式后，点击头像就可以本地上传
	//     $("#upload5").on("change",function(){
	//     var objUrl5 = getObjectURL(this.files[0]) ; //获取图片的路径，该路径不是图片在本地的路径
	//      arr.splice(4,1,this.files[0]);
	//     if (objUrl5) {
	//     $("#pic5").attr("src", objUrl5) ; //将图片路径存入src中，显示出图片
	//     }
	//     });
	// });

	// $("#pic6").click(function () {
	//     $("#upload6").click(); //隐藏了input:file样式后，点击头像就可以本地上传
	//     $("#upload6").on("change",function(){
	//     var objUrl6 = getObjectURL(this.files[0]) ; //获取图片的路径，该路径不是图片在本地的路径
	//      arr.splice(5,1,this.files[0]);
	//     if (objUrl6) {
	//     $("#pic6").attr("src", objUrl6) ; //将图片路径存入src中，显示出图片
	//     }
	//     });
	// });

	// $("#pic7").click(function () {
	//     $("#upload7").click(); //隐藏了input:file样式后，点击头像就可以本地上传
	//     $("#upload7").on("change",function(){
	//     var objUrl7 = getObjectURL(this.files[0]) ; //获取图片的路径，该路径不是图片在本地的路径
	//     arr.splice(6,1,this.files[0]);
	//     if (objUrl7) {
	//       $("#pic7Img").show()
	//       $("#pic7Img").attr("src", objUrl7) ; //将图片路径存入src中，显示出图片
	//       $("#pic7").val("重新选择")
	//     }
	//     });
	// });
	//建立一個可存取到該file的url
	// function getObjectURL(file) {
	//     var url = null ;
	//     if (window.createObjectURL!=undefined) { // basic
	//     url = window.createObjectURL(file) ;
	//     } else if (window.URL!=undefined) { // mozilla(firefox)
	//     url = window.URL.createObjectURL(file) ;
	//     } else if (window.webkitURL!=undefined) { // webkit or chrome
	//     url = window.webkitURL.createObjectURL(file) ;
	//     }
	//     return url ;
	// }
	// 上传图片处理
	//     function ajaxFileUpload() {
	//               var  Pformdata= new FormData();
	//               var zuzhival = $('.zuzhi input').val();
	//               var zhizhaoval = $('.zhizhao input').val();
	//               var shengchanval = $('.shengchan input').val();
	//               var kehuval = $('.kehu input').val();
	//               var moneyval = $('.money input').val();
	//               var setDateval = $('.setDate input').val()
	//               var runTimeval = $('.runTime input').val()
	//               var peoNumval = $('.peoNum select option').eq($('.peoNum select').val()).text()
	//               var hangye2val = $('#hangye2  option').eq(Number($('#hangye2').val())+1).text()
	//               var detAddressval = $('#s_province').val()+$('#s_city').val()+$('#s_county').val()+$('.detAddress input').val()
	//               var fanweival = $('.fanwei textarea').val()
	//               var img1val = arr[0];
	//               var img2val = arr[1];
	//               var img3val = arr[2];
	//               var img4val = arr[3];
	//               var img5val = arr[4];
	//               if (arr[4].length != 0) {
	//                   var img5val = arr[4];
	//                Pformdata.append('Files',img5val);
	//               }else if( arr[5].length != 0 ){
	//                 var img6val = arr[5];
	//                Pformdata.append('Files',img6val);
	//               }else{
	//                 var img7val = arr[6];
	//                Pformdata.append('Files',img7val);
	//               }
	//              Pformdata.append('comId',data1.companyId);
	//              Pformdata.append('userGuid',data1.Guid);
	//              Pformdata.append('user',data1.uname);
	//              Pformdata.append('codecertifi',zuzhival);
	//              Pformdata.append('buslicense',zhizhaoval);
	//              Pformdata.append('productcertifi',shengchanval);
	//              Pformdata.append('maincustomer',kehuval);
	//              Pformdata.append('registered',moneyval);
	//              Pformdata.append('busScope',fanweival);
	//              Pformdata.append('busSetdate',setDateval);
	//              Pformdata.append('busterm',runTimeval);
	//              Pformdata.append('mainbus',hangye2val);
	//              Pformdata.append('mainbusadress',detAddressval);
	//              Pformdata.append('staffnum',peoNumval);
	//              Pformdata.append('Files',img1val);
	//              Pformdata.append('Files',img2val);
	//              Pformdata.append('Files',img3val);
	//              Pformdata.append('Files',img4val);
	//              if
	//                 ($('.zuzhi input').val().length ==0 || $('.zhizhao input').val().length ==0 || $('.kehu input').val().length == 0 || $('.money input').val().length == 0 || $('.setDate input').val().length == 0 || $('.runTime input').val().length == 0 || $('.peoNum select option').eq($('.peoNum select').val()).text().length == 0 || $('#hangye2  option').eq(Number($('#hangye2').val())+1).text().length == 1 || $('.detAddress input').val().length == 0 || $('.fanwei textarea').val().length == 0 || img1val.length == 0 || img2val.length == 0 || img3val.length == 0 || img4val.length == 0 || img5val.length == 0) {
	//                                     layer.msg('资料必须填写完整', {
	//                                           time: 1000,
	//                                         });
	//               }else
	//               {
	//                               $.ajax({
	//                                      type : 'POST',
	//                                      url : ''+EQD_url+'/Com_Certification.ashx',
	//                                      data : Pformdata,
	//                                      cache : false,
	//                                      processData : false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
	//                                      contentType : false, // 不设置Content-type请求头
	//                                      success : function(data){
	//                                       var data2 = JSON.parse(data)
	//                                       if (data2.status ==200) {
	//                                     layer.msg('认证成功', {
	//                                           time: 1000,
	//                                         });
	//                                       }
	//                                      },
	//                                    error:function(msg)
	//                                    {
	//                                    }
	//                                  });
	//           }
	//     }
	// $('#makeSure').click(function() {
	//       ajaxFileUpload();
	// });
})
