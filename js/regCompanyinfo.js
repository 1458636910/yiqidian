$(document).ready(function(){
    var dataAll=   localStorage.getItem("GHY_login");
  var dataG = JSON.parse(dataAll)
    $.post(''+EQD_url+'/Option_AreasAnd.ashx',{type:"2"} ,function(data) {
      $('#typeInput').typeahead({
                      source : data,
                      items : 15,
                    });
     });
  // 照片上传
    var arr = ['','','','','','','']
    $("#pic1").click(function () {
          $("#upload1").click(); //隐藏了input:file样式后，点击头像就可以本地上传
          $("#upload1").on("change",function(){
          var objUrl1 = getObjectURL(this.files[0]) ; //获取图片的路径，该路径不是图片在本地的路径
           arr.splice(0,1,this.files[0]);
          if (objUrl1) {
            $("#pic1Img").show()
            $("#pic1Img").attr("src", objUrl1) ; //将图片路径存入src中，显示出图片
            $("#pic1").val("重新选择")
          }
          });
    });

    $("#pic2").click(function () {
          $("#upload2").click(); //隐藏了input:file样式后，点击头像就可以本地上传
          $("#upload2").on("change",function(){
          var objUrl2 = getObjectURL(this.files[0]) ; //获取图片的路径，该路径不是图片在本地的路径
           arr.splice(1,1,this.files[0]);
          if (objUrl2) {
            $("#pic2Img").show()
            $("#pic2Img").attr("src", objUrl2) ; //将图片路径存入src中，显示出图片
            $("#pic2").val("重新选择")
          }
          });
    });

    $("#pic3").click(function () {
          $("#upload3").click(); //隐藏了input:file样式后，点击头像就可以本地上传
          $("#upload3").on("change",function(){
          var objUrl3 = getObjectURL(this.files[0]) ; //获取图片的路径，该路径不是图片在本地的路径
           arr.splice(2,1,this.files[0]);
          if (objUrl3) {
            $("#pic3Img").show()
            $("#pic3Img").attr("src", objUrl3) ; //将图片路径存入src中，显示出图片
            $("#pic3").val("重新选择")
          }
          });
    });

    $("#pic4").click(function () {
          $("#upload4").click(); //隐藏了input:file样式后，点击头像就可以本地上传
          $("#upload4").on("change",function(){
          var objUrl4 = getObjectURL(this.files[0]) ; //获取图片的路径，该路径不是图片在本地的路径
           arr.splice(3,1,this.files[0]);
          if (objUrl4) {
            $("#pic4Img").show()
            $("#pic4Img").attr("src", objUrl4) ; //将图片路径存入src中，显示出图片
            $("#pic4").val("重新选择")
          }
          });
    });
    $("#pic5").click(function () {
          $("#upload5").click(); //隐藏了input:file样式后，点击头像就可以本地上传
          $("#upload5").on("change",function(){
          var objUrl5 = getObjectURL(this.files[0]) ; //获取图片的路径，该路径不是图片在本地的路径
           arr.splice(4,1,this.files[0]);
          if (objUrl5) {
            $("#pic5Img").show()
            $("#pic5Img").attr("src", objUrl5) ; //将图片路径存入src中，显示出图片
            $("#pic5").val("重新选择")
          }
          });
    });
    $("#pic6").click(function () {
          $("#upload6").click(); //隐藏了input:file样式后，点击头像就可以本地上传
          $("#upload6").on("change",function(){
          var objUrl6 = getObjectURL(this.files[0]) ; //获取图片的路径，该路径不是图片在本地的路径
           arr.splice(5,1,this.files[0]);
          if (objUrl6) {
            $("#pic6Img").show()
            $("#pic6Img").attr("src", objUrl6) ; //将图片路径存入src中，显示出图片
            $("#pic6").val("重新选择")
          }
          });
    });

    $("#pic7").click(function () {
        $("#upload7").click(); //隐藏了input:file样式后，点击头像就可以本地上传
        $("#upload7").on("change",function(){
              var objUrl7 = getObjectURL(this.files[0]) ; //获取图片的路径，该路径不是图片在本地的路径
               arr.splice(6,1,this.files[0]);
              if (objUrl7) {
                $("#pic7Img").show()
                $("#pic7Img").attr("src", objUrl7) ; //将图片路径存入src中，显示出图片
                $("#pic7").val("重新选择")
          }
    });
    });
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
                  $('.regBtn').click(function() {
                  ajaxFileUpload();
                  });
// 上传图片处理
function ajaxFileUpload() {
           if ( $('.quhaoval').val().length >1 && $('.comNameval').val().length >0 &&  $('.comDutymanval').val().length > 0 && $('.comdutyIDnumval').val().length >0 && $('.comDutytelval').val().length > 0 && $('.comemailval').val().length > 0 && $('#staffnum').val() != 0 && arr[0] != '' && arr[1] != '' && arr[2] != '' && arr[3] != '' ){
                  var addressAll = $('#s_province').val()+$('#s_city').val()+$('#s_county').val()+$('.buchong').val()
                  var tell = $('.quhaoval').val()+$('.comcontactval').val()
                  if ( $('.quhaoval').val().length == 0 || $('.comcontactval').val().length == 0 ) {
                    tell = ' ';
                  }
                    var index = layer.load(1, {
                      shade: [0.3,'#000'] //0.3透明度的黑色背景
                    });
                var  Pformdata= new FormData();
                var img1val = arr[0];
                var img2val = arr[1];
                var img3val = arr[2];
                var img4val = arr[3];
                var staffnum = $('#staffnum').val();
                var area = $('#s_county').val()
                if (arr[4].length != 0) {
                    var img5val = arr[4];
                     Pformdata.append('codecertifi',img5val);
                }else if( arr[5].length != 0 ){
                  var img6val = arr[5];
                   Pformdata.append('productcertifi',img6val);
                }else{
                  var img7val = arr[6];
                   Pformdata.append('tax',img7val);
                }
                   Pformdata.append('quhao',$('.quhaoval').val());
                   Pformdata.append('hangyehao',codeNum);
                   Pformdata.append('name',$('.comNameval').val());
                   Pformdata.append('dutyman',$('.comDutymanval').val());
                   Pformdata.append('dutyIDnum',$('.comdutyIDnumval').val());
                   Pformdata.append('dutytel',$('.comDutytelval').val());
                   Pformdata.append('type',$('.comtypeval').val());
                   Pformdata.append('hangye',$('#typeInput').val());
                   Pformdata.append('address',addressAll);
                   Pformdata.append('contact',tell);
                   Pformdata.append('email',$('.comemailval').val());
                   Pformdata.append('userGuid',dataG.Guid);
                   Pformdata.append('province',$('#s_province').val());
                   Pformdata.append('city',$('#s_city').val());
                   Pformdata.append('area',area);
                   Pformdata.append('staffnum',staffnum);
                   Pformdata.append('user',dataG.uname);
                   Pformdata.append('IDnumfront',img1val);
                   Pformdata.append('IDnumback',img2val);
                   Pformdata.append('IDnumhand',img3val);
                   Pformdata.append('buslicense',img4val);
                        $.ajax({
                                       type : 'POST',
                                       url : 'http://47.94.173.253:8008/Com_register.ashx',
                                       data : Pformdata,
                                       cache : false,
                                       processData : false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
                                       contentType : false, // 不设置Content-type请求头
                                       success : function(data){
                                        var data2 = JSON.parse(data)
                                        layer.closeAll('loading');
                                        if (data2.status ==200) {
                                      layer.msg('企业注册信息已经提交到易企点平台，我们会在1-3天内尽快处理，请耐心等待……</br>提示：请保持手机畅通，我们后台审核人员会通过手机或邮箱通知您有关企业的审核结果。谢谢合作</br>请关闭本页面', {
                                            time: 1000000,
                                            shade:0.5
                                          });
                                        }else{
                                          layer.msg(data2.msg, {
                                            time: 3000,
                                          });
                                        }
                                       },
                                     error:function(msg)
                                     {
                                     }
                                   });

                  }else{
                    layer.msg('请填写完整资料', {
                                      time: 1000,
                                    });
                  }
        }
})
