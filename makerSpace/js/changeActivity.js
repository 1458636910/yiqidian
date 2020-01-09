$(document).ready(function(){
    var href = location.href;
    var dataC=   localStorage.getItem("GHY_login");
    if (dataC != null) {
              console.log( dataC )
              var dataInfo = JSON.parse(dataC);
              // $('#holderName').val(dataInfo.username)
              // $('#holderDep').val(dataInfo.department)
              // $('#holderPost').val(dataInfo.post)
              // $('#holderPhone').val(dataInfo.uname)
        }else{
              layer.msg('不能直接访问', {
                                                             time: 1000,
                                                       })
          //         setTimeout(function(){
          //   location.href ="../html/innerLogin.html?href="+href+"";
          // },1200)

        }
        var dataActityDetails
        if(href.indexOf("=") < 0 ){
              window.close()
            }else{
                  var acticityId = href.split("=")[1];
            $.post(''+EQD_space+'/Activity/Get_ActivityById.ashx', {"activityId": acticityId }, function(data) {
                   dataActityDetails = JSON.parse(data);
                  for (var i = 1; i <= $("#activityType input").length; i++) {
                        if ( $("#radio"+i+"").val() == dataActityDetails.items.activeType) {
                             $("#radio"+i+"").attr('checked', 'true');
                        }
                  }
                  if ( dataActityDetails.items.companyId == 0  ) {
                    $('#person').attr('checked', 'true');
                    $('.company').hide()
                  }else{
                    $('#company').attr('checked', 'true');
                    $('.person').hide()
                  }
                  if ( dataActityDetails.items.isCharge === false ) {
                    $('#noCheck').attr('checked', 'true');
                  }else{
                    $('#check').attr('checked', 'true');
                  }
                   if ( dataActityDetails.items.price == 0 ) {
                    $('#nocharge').attr('checked', 'true');
                  }else{
                    $('#charge').attr('checked', 'true');
                    $('.priceInput').show()
                    $('.priceInput input').val( dataActityDetails.items.price )
                  }
                  $('#activityName').val( dataActityDetails.items.activeTitle )
                  $('#activitySize').val( dataActityDetails.items.activeScale )
                  $('#activitypeopleNumber').val( dataActityDetails.items.activeNum )
                  $('#oldAddress').val( dataActityDetails.items.activeProvince+dataActityDetails.items.activeCity+dataActityDetails.items.activeAddress )
                  $('#beginTime').val( dataActityDetails.items.activeStartTime )
                  $('#endTime').val( dataActityDetails.items.activeEndTime )
                  $('#activityObj').val( dataActityDetails.items.activeObject )
                  $('.oldClassifyInput').val( dataActityDetails.items.activeClassify )
                  $('#holderEmail').val( dataActityDetails.items.email )
                  $('#holderName').val(dataInfo.username)
                  $('#holderDep').val(dataInfo.department)
                  $('#holderPost').val(dataInfo.post)
                  $('#holderPhone').val(dataInfo.uname)
                  $('#pic3Img').attr('src', dataActityDetails.items.activeImg)
                  editor.txt.html( dataActityDetails.items.activeDesc )
                  editor2.txt.html( dataActityDetails.items.activeSchedule )
            });
            }
            $('#changeAddressBtn').click(function() {
              $('#newAddress').show()
            });
            $('#changeClassifyBtn').click(function() {
              $('#newClassify').show()
            });
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
    });
    $("#nocharge").click(function() {
      $('.priceInput').hide()
      $('.priceInput input').val(0)
    });
    laydate.render({
      elem: '#beginTime',
      min : 0
    });
    laydate.render({
      elem: '#endTime',
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
                  var lanuchType,provinceVal,cityVal,AddressVal,imgVal,classifyVal;
                  $('#applyActivityBtn').click(function() {
                        upActivityApply()
                  });
      function upActivityApply(){
            if ( $('#upload3').val() == "" ) {
                      imgVal = dataActityDetails.items.activeImg.substring(25)
                    }else{
                       imgVal = arr_imgHref
                    }
                    if (  $('#s_county').val() == "市、县级市" ) {
                      provinceVal = dataActityDetails.items.activeProvince
                      cityVal = dataActityDetails.items.activeCity
                      AddressVal = dataActityDetails.items.activeAddress
                    }else{
                      provinceVal = $('#s_province').val()
                      cityVal = $('#s_city').val()
                      AddressVal = $('#s_county').val()+$('#detailAddress').val()
                    }
                    if ( $("#lanucherID input[type='radio']:checked").val() == 0) {
                      lanuchType = 0
                    }else{
                      lanuchType = dataInfo.companyId;
                    }
                    if ( $('#city1').val() =="==请选择==" ) {
                      classifyVal = $('.oldClassifyInput').val()
                    }else{
                      classifyVal = city1Name
                    }
            $.post(''+EQD_space+'/Activity/Update_Activity.ashx', {
              "userGuid" : dataInfo.Guid,
              "activityId" : acticityId,
              "para" : "activeType='"+$("#activityType input[type='radio']:checked").val()+"',"+"activeClassify='"+classifyVal+"',"+"activeTitle='"+$('#activityName').val()+"',"+"activeNum='"+$('#activitypeopleNumber').val()+"',"+"activeScale='"+$('#activitySize').val()+"',"+"activeStartTime='"+$('#beginTime').val()+"',"+"activeEndTime='"+$('#endTime').val()+"',"+"ischeck='"+$("#checkArea input[type='radio']:checked").val()+"',"+"activeObject='"+$('#activityObj').val()+"',"+"activeImg='"+imgVal+"',"+"activeDesc='"+editor.txt.html()+"',"+"activeSchedule='"+editor2.txt.html()+"',"+"isCharge='"+$("#chooseCharge input[type='radio']:checked").val()+"',"+"price='"+$('.priceInput input').val()+"',"+"name='"+$('#holderName').val()+"',"+"department='"+$('#holderDep').val()+"',"+"post='"+$('#holderPost').val()+"',"+"phone='"+$('#holderPhone').val()+"',"+"email='"+$('#holderEmail').val()+"',"+"activeProvince='"+provinceVal+"',"+"activeCity='"+cityVal+"',"+"activeAddress='"+AddressVal+"'"
            }, function(data) {
              console.log( data )
            var dataUped = JSON.parse(data)
            if (dataUped.status == 200) {
              layer.msg('成功', {
                                                time: 1000,
                                               });
              setTimeout(function(){
            location.href =href;
          },1200)
            }else{
                layer.msg('修改失败，请重新修改', {
                                                time: 1000,
                                               });
            }
            });
      }
})
