$(document).ready(function(){
    var href = location.href;
    //var dataC=   localStorage.getItem("GHY_login");
    //if (dataC != null) {
    //          console.log( dataC )
    //          var dataInfo = JSON.parse(dataC);
    //          $('#holderName').val(dataInfo.username)
     //         $('#holderDep').val(dataInfo.department)
     //         $('#holderPost').val(dataInfo.post)
     //         $('#holderPhone').val(dataInfo.uname)
      //  }else{
       //       layer.msg('登录后才能发起活动申请，请登录', {
        //                                                     time: 1000,
         //                                              })
         //         setTimeout(function(){
          //  location.href ="../html/innerLogin.html?href="+href+"";
         // },1200)
        //}
 // 创建富文本编辑框
        var E = window.wangEditor
        var editor = new E('#activityDesc')
        // editor.customConfig.uploadImgShowBase64 = true;
 // **************************************自动上传图片开始*********************************
              var  dataImg;
            editor.customConfig.customUploadImg = function (files, insert) {
              var  iformdata= new FormData();
              var imgU = files[0];
              iformdata.append('image', imgU);
              $.ajax({
                           type : 'post',
                           url : ''+EQD_space+'/Articles/CommitImage.ashx',
                           data : iformdata,
                           cache : false,
                           processData : false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
                           contentType : false, // 不设置Content-type请求头
                           success : function(data){
                            dataImg = JSON.parse(data)
                            var imgSrc =  (dataImg.items).substring(25)
                            imgUrl = imgSrc
                            insert(dataImg.items)
                           }
                       });
          };
 // **************************************自动上传图片结束*********************************
 editor.create();
        var F = window.wangEditor
        var editor2 = new F('#activitySchedule')
        // editor.customConfig.uploadImgShowBase64 = true;
 // **************************************自动上传图片开始*********************************
              var  dataImg2;
            editor2.customConfig.customUploadImg = function (files, insert) {
              var  iformdata= new FormData();
              var imgU = files[0];
              iformdata.append('image', imgU);
              $.ajax({
                           type : 'post',
                           url : ''+EQD_space+'/Articles/CommitImage.ashx',
                           data : iformdata,
                           cache : false,
                           processData : false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
                           contentType : false, // 不设置Content-type请求头
                           success : function(data){
                            console.log( data )
                            dataImg2 = JSON.parse(data)
                            var imgSrc =  (dataImg2.items).substring(25)
                            imgUrl = imgSrc
                            insert(dataImg2.items)
                           }
                       });
          };
 // **************************************自动上传图片结束*********************************
 editor2.create();
    var arr = []
    var arr_imgHref
        $("#pic3").click(function () {
          $("#upload3").click(); //隐藏了input:file样式后，点击头像就可以本地上传
    });
          $("#upload3").on("change",function(){
          var objUrl3 = getObjectURL(this.files[0]) ; //获取图片的路径，该路径不是图片在本地的路径
           arr=this.files[0]
           console.log( arr )
           ajaxFileUpload(arr)
          if (objUrl3) {
            $("#pic3Img").show()
            $("#pic3Img").attr("src", objUrl3) ; //将图片路径存入src中，显示出图片
            $("#pic3").val("重新选择")
          }
          });
  // 上传活动封面图片
      function ajaxFileUpload(file) {
             var  Pformdata2= new FormData();
             Pformdata2.append ('willcompress',"true");
             Pformdata2.append('file', file);
             $.ajax({
                           type : 'post',
                           url : ''+EQD_space+'/Reimburse/Upload_Files.ashx',
                           data : Pformdata2,
                           cache : false,
                           processData : false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
                           contentType : false, // 不设置Content-type请求头
                           success : function(data){
                            console.log( data )
                            var data2 = JSON.parse(data)
                            if (data2.status == 200) {
                              layer.msg('上传成功', {
                                                time: 1000,
                                               });
                                arr_imgHref = data2.items.split(";")[0];
                                $("#pic3").show()
                                $('.imageDiv').remove()
                            }
                           },
                         error:function()
                         {

                         }
                       });
          }
    //建立一個可存取到該file的url
    function getObjectURL(file) {
        var url = null ;
        if (window.createObjectURL!=undefined) { // basic
        url = window.createObjectURL(file) ;
        } else if (window.URL!=undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file) ;
        } else if (window.webkitURL!=undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file) ;
        }
        return url ;
    }
    $("#charge").click(function() {
      $('.priceInput').show()
      $('.priceInput input').val("")
    });
    $("#nocharge").click(function() {
      $('.priceInput').hide()
      $('.priceInput input').val(0)
    });
    laydate.render({
      elem: '#beginTime',
      type: 'datetime',
      min : 0
    });
    laydate.render({
      elem: '#endTime',
      type: 'datetime',
      min : 0
    });
    // 活动类型选择
   var  areadata,val2,provice1Val,provice1Name,city1Val,city1Name;
    $.post(''+EQD_space+'/Option_AreasAnd.ashx',{type:"50"} ,function(data) {
          areadata= data;
             for (var i = 0; i < areadata.length; i++) {
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
                  $('#provice1').change(function (btn) {
                      document.all['city1'].options.length = 1;
                       val2 = $('#provice1').select().val();
                      if (val2 != current.provice1) {
                          current.provice1 = val2;
                          btn.disabled = true;
                      }
                      if (val2 != null) {
                          city1.length = 1;
                          var city1Len = areadata[val2]["children"].length;
                          for (var j = 0; j < city1Len; j++) {
                              var city1LenOpt = document.createElement('option');
                              city1LenOpt.innerText = areadata[val2]["children"][j].name;
                              city1LenOpt.value = j;
                              city1.append(city1LenOpt);
                          }
                      }
                    provice1Val = $(this).val()
                    provice1Name = areadata[provice1Val].name
                  });
  });
                  $('#city1').change(function (btn) {
                          city1Val = $(this).val()
                          city1Name = areadata[provice1Val]["children"][city1Val].name
                  });
                  var lanuchType;
                  $('#applyActivityBtn').click(function() {
                    if ( $("#lanucherID input[type='radio']:checked").val() == 0) {
                      lanuchType = 0
                    }else{
                      lanuchType = dataInfo.companyId;
                    }
                    if ( $('#city1').val() =="==请选择==" || $('#activityName').val().length == 0 || $('#activitypeopleNumber').val().length == 0 ||  $('#activitySize').val().length == 0 || $('#beginTime').val().length == 0 || $('#endTime').val().length == 0 || $('#s_county').val() == "市、县级市" || $('#activityObj').val().length == 0 || editor.txt.html().length == 0 || editor2.txt.html().length == 0 || $('#holderName').val().length == 0 || $('#holderDep').val().length == 0 || $('#holderPost').val().length == 0 || $('#holderPhone').val().length == 0 || $('#holderEmail').val().length == 0 ) {
                          var ii = layer.load(2, {
							  shade: [0.2,'#000'] //0.1透明度的白色背景
							});
							setTimeout(function(){
						      layer.close(ii);
						      layer.msg("请完善信息", {
								time: 1000,
							  });
						    }, 1000);
                    }else{
                        upActivityApply()
                    }
                  });
      function upActivityApply(){
            $.post(''+EQD_space+'/Activity/Add_Activity.ashx', {
              "userGuid" : dataInfo.Guid,
              "companyId" : lanuchType,
              "actType" : $("#activityType input[type='radio']:checked").val(),
              "actClassify" : city1Name,
              "actTitle" : $('#activityName').val(),
              "actNum" : $('#activitypeopleNumber').val(),
              "actScale" : $('#activitySize').val(),
              "actStartTime" : $('#beginTime').val(),
              "actEndTime" : $('#endTime').val(),
              "actProvince" : $('#s_province').val(),
              "actCity" : $('#s_city').val(),
              "actAddress" :$('#s_county').val()+$('#detailAddress').val(),
              "ischeck" : $("#checkArea input[type='radio']:checked").val(),
              "actObject" : $('#activityObj').val(),
              "actImg" : arr_imgHref,
              "actDesc" : editor.txt.html(),
              "actSchedule" : editor2.txt.html(),
              "isCharge" : $("#chooseCharge input[type='radio']:checked").val(),
              "price" : $('.priceInput input').val(),
              "name" :  $('#holderName').val(),
              "department" :  $('#holderDep').val(),
              "post" :  $('#holderPost').val(),
              "phone" :  $('#holderPhone').val(),
              "email" : $('#holderEmail').val()
            }, function(data) {
              console.log( data )
            var dataUped = JSON.parse(data)
            if (dataUped.status == 200) {
            	var ii = layer.load(2, {
				  shade: [0.2,'#000'] //0.1透明度的白色背景
				});
				var text=setTimeout(function(){
			      layer.close(ii);
			      layer.msg("活动申请提交完成", {
					time: 1000,
				  });
				}, 1000);
             	 setTimeout(function(){
             	 	clearTimeout(test);
            		location.href =href;
          		 },1500)
            }else{
                layer.msg('提交失败，请重新提交', {
                                                time: 1000,
                                               });
            }
            });
      }
})
