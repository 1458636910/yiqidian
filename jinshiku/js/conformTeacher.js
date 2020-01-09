$(document).ready(function(){
    var href = location.href;
    var dataCircle =   localStorage.getItem("GHY_login");
    if (dataCircle != null) {
    var dataC = JSON.parse(dataCircle);
    // $('.name').val(dataC.username);
    // $('.selePhone').val(dataC.uname);
    }else{
      layer.msg('请先登录', {
                          time: 1000,
                          shade: [0.5, '#000']
                });
      setTimeout(function(){
            location.href="../html/innerLogin.html?href="+href+""
      },1500)
    }
    var E = window.wangEditor
    var editor = new E('#editor');
     // **************************************自动上传讲师简介图片开始*********************************
            editor.customConfig.customUploadImg = function (files, insert) {
              var  Pformdata= new FormData();
              var imgU = files[0];
              Pformdata.append('image', imgU);
              $.ajax({
                           type : 'post',
                           url : ''+http_head+'/Articles/CommitImage.ashx',
                           data : Pformdata,
                           cache : false,
                           processData : false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
                           contentType : false, // 不设置Content-type请求头
                           success : function(data){
                            var dataimg = JSON.parse(data)
                            insert(dataimg.items)
                           }
                       });
          };
 // **************************************自动上传讲师简介图片结束*********************************
        editor.create();
        var F = window.wangEditor
        var editor2 = new F('#editor2');
             // **************************************自动上传客户案例图片开始*********************************
            editor2.customConfig.customUploadImg = function (files, insert) {
              var  Pformdata= new FormData();
              var imgU = files[0];
              Pformdata.append('image', imgU);
              $.ajax({
                           type : 'post',
                           url : ''+http_head+'/Articles/CommitImage.ashx',
                           data : Pformdata,
                           cache : false,
                           processData : false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
                           contentType : false, // 不设置Content-type请求头
                           success : function(data){
                            var dataimg = JSON.parse(data)
                            insert(dataimg.items)
                           }
                       });
          };
 // **************************************自动上传客户案例图片结束*********************************
        editor2.create();
        editor2.txt.html("必须要添加图片才能通过审核，填写时请把该句话删掉")
        var G = window.wangEditor
        var editor3 = new G('#editor3');
             // **************************************自动上传曾服务过的企业图片开始*********************************
            editor3.customConfig.customUploadImg = function (files, insert) {
              var  Pformdata= new FormData();
              var imgU = files[0];
              Pformdata.append('image', imgU);
              $.ajax({
                           type : 'post',
                           url : http_head+'/Articles/CommitImage.ashx',
                           data : Pformdata,
                           cache : false,
                           processData : false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
                           contentType : false, // 不设置Content-type请求头
                           success : function(data){
                            var dataimg = JSON.parse(data)
                            insert(dataimg.items)
                           }
                       });
          };
 // **************************************自动上传曾服务过的企业图片结束*********************************
        editor3.create();
    for (var i = 1; i <= 9; i++) {
    $('.imgList').append('<li class="pull-left li'+i+'"><img id="pic'+i+'" src="" alt="点击选择上传图片"><p class="deleteImg">删除该照片</p><input id="upload'+i+'" name="file" accept="image/*" type="file" style="display: none"/></li>')
    }
    if ( $('.imgList li img').attr('src') =="" ) {
      $('.imgList li img').attr('src', '../image/111.jpg');
    }
    $('.deleteImg').click(function() {
      var file =  document.getElementsByTagName('file')
      file.value = '';
    });
  $(".addPhoto ul li:even").attr('<br>');
  // 选择研究领域
      var str_label2="";
      var arr_label2 = [];
      $('.teachArea').click(function() {
             $.post(''+http_head+'/Option_AreasAnd.ashx', {"type": 45}, function(data) {
                                    layer.open({
                                    type: 1,
                                    area: ['800px','505px'],
                                    title: ['研究领域', 'font-size:18px;text-align: center;'],
                                    content: $('.teachAreaTable'),
                                    btn:'确定',
                                    // shade: false
                                  });
                                    if( $('.tableLeft p').length == 0 ){
                                        for (var i = 0; i < data.length; i++) {
                                             $('.tableLeft').append('<p class="'+i+'">'+data[i].name+'</p>');
                                             $('.tableLeft').children('p').eq(0).attr('id', 'firstP');
                                             document.getElementById('firstP').click();
                                             $('.tableLeft .'+i+'').click(function() {
                                              $(this).css('backgroundColor', 'red').siblings('p').css('backgroundColor', '#29e');
                                                 var m =   $(this).attr('class');
                                               $('.tableRight span').remove();
                                             for (var j = 0; j < data[m].sub.length; j++) {
                                                    $('.tableRight').append('<span><input type="checkbox" value="'+data[m].sub[j].name+'" name="label">'+data[m].sub[j].name+'</span>')
                                             }
                                            $("input:checkbox[name='label']").click(function() {
                                              var aaa = $(this).prop("checked");
                                                  if( aaa === true){
                                                    if (  arr_label2.length >4 ) {
                                                       layer.msg('最多选择5个', {
                                                              time: 1000,
                                                            });
                                                       $(this).removeAttr('checked')
                                                       removeByValue(arr_label2, $(this).val() );
                                                    }else{
                                                    arr_label2.push($(this).val())
                                                    $('#labelInfo').val(arr_label2)
                                                    }
                                                   }else{
                                                    removeByValue(arr_label2, $(this).val() );
                                                    $('#labelInfo').val(arr_label2)
                                                   }
                                            });
                                             });
                                          }
                                    }else{}
                                    $('.layui-layer-btn0').click(function() {
                                      for (var i = 0; i < arr_label2.length; i++) {
                                           str_label2 += arr_label2[i]+","
                                      }
                                     var labelArea = str_label2.substring(0,Number(str_label2.length)-1)
                                        $('.teachArea').val( $('#labelInfo').val() );
                                         arr_label2 = [];
                                         $('#labelInfo').val("");
                                         $("input:checkbox[name='label']").removeAttr('checked');
                                  });
                                    $('.layui-layer-close').click(function() {
                                      $("input:checkbox[name='label']").removeAttr('checked');
                                        arr_label2 =[];
                                        $('#labelInfo').val("");
                                    });
                                })
      });
  $('.addPhoto ul li:gt(0)').css('display', 'none');
  $('.submit .subBtn').click(function() {
    if ( $('#s_province').val().length == 0 || $('#s_city').val().length == 0 || $('#s_county').val().length == 0 || $('.teachArea').val().length == 0 || $('.selePhone').val().length == 0 || $('.email').val().length == 0 || $('.assistantPhone').val().length == 0 || $('.couseMain').val().length == 0 || $('.prices').val().length == 0 || $('.detailAddress').val().length == 0) {
      layer.msg('请完善信息',{
        time:1000
      })
    }else{
    ajaxFileUpload()
    }
  });
  var userAgent = navigator.userAgent;//用于判断浏览器类型
   var arr_img = [];
   var fileList;
    $(".file").change(function () {
        //获取选择图片的对象
        var docObj =$(this)[0];
        var picDiv=$(this).parents(".picDiv");
        //得到所有的图片文件
         fileList = docObj.files;
        for (var i = 0; i < fileList.length; i++) {
            arr_img.push(fileList[i])
            var picHtml="<div class='imageDiv' > <img id='img" + fileList[i].name + "'  /> <div class='cover'><i class='delbtn'>删除</i></div></div>"
            picDiv.prepend(picHtml);
            var imgObjPreview = document.getElementById("img"+fileList[i].name);
            if (fileList && fileList[i]) {
                //图片属性
                imgObjPreview.style.display = 'block';
                imgObjPreview.style.width = '320px';
                imgObjPreview.style.height = '296px';
                //imgObjPreview.src = docObj.files[0].getAsDataURL();
                //火狐7以上版本不能用上面的getAsDataURL()方式获取，需要以下方式
                if(userAgent.indexOf('MSIE') == -1){//IE以外浏览器
                    imgObjPreview.src = window.URL.createObjectURL(docObj.files[i]);   //获取上传图片文件的物理路径
                }else{//IE浏览器
                    if(docObj.value.indexOf(",")!=-1){
                        var srcArr=docObj.value.split(",");
                        imgObjPreview.src = srcArr[i];
                    }else{
                        imgObjPreview.src = docObj.value;
                    }
                }
            }
        }
    });
    /*删除功能*/
    $(document).on("click",".delbtn",function () {
        var arr_img2 = [];
         var s =  arr_img.indexOf(fileList[0]);
         var arrLength = Number(arr_img.length)
          arr_img2 =  arr_img.splice( Number(arr_img.length)-s,1);
        var _this=$(this);
        _this.parents(".imageDiv").remove();
    });
  function ajaxFileUpload() {
      var  Iformdata= new FormData();
      var addressNow = $('#s_province').val()+$('#s_city').val()+$('#s_county').val()+$('.detailAddress').val();
      var nameTea = $('.name').val();
      var teaArea = $('.teachArea').val();
      var sex = $('input[name="sex"]:checked').val();
      var selePhone =  $('.selePhone').val();
      var email =  $('.email').val();
      var assistantPhone = $('.assistantPhone').val();
      var qQ =  $('.qq').val();
      var weChat = $('.weChat').val();
      var couseMain = $('.couseMain').val();
      var prices =  $('.prices').val();
      var info = editor.txt.html()
      var provice =  $('#s_province').val();
      var city = $('#s_city').val();
      Iformdata.append('realname',nameTea);
      Iformdata.append('ResearchField',teaArea);
      Iformdata.append('sex',sex);
      Iformdata.append('phone',selePhone);
      Iformdata.append('email',email);
      Iformdata.append('AssistantPhone',assistantPhone);
      Iformdata.append('Assistant',$('.assistantName').val());
      Iformdata.append('QQ',qQ);
      Iformdata.append('wechat',weChat);
      Iformdata.append('address',addressNow);
      Iformdata.append('courses',couseMain);
      Iformdata.append('WorkingMethod','');
      Iformdata.append('CooperativePrices',prices);
      Iformdata.append('LecturerBackground',info);
      Iformdata.append('province',provice);
      Iformdata.append('city',city);
      Iformdata.append('TeachStyle',$('.TeachStyle').val());
      Iformdata.append('CustCase',editor2.txt.html());
      Iformdata.append('ServiceCom',editor3.txt.html());
      Iformdata.append('lectureImage',$("#file")[0].files[0]);
      Iformdata.append('userGuid',dataC.Guid);
      Iformdata.append('companyId',dataC.companyId);
      for (var i = 0; i < arr_img.length; i++) {
                Iformdata.append('file', arr_img[i]);
             }
      $.ajax({
                                 type : 'POST',
                                 url : http_head+'/Lectures/Add_Lecture.ashx',
                                 data : Iformdata,
                                 cache : false,
                                 processData : false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
                                 contentType : false, // 不设置Content-type请求头
                                 success : function(data){
                                  data2 = JSON.parse(data);
                                  if (data2.status ==200) {
                                layer.msg(data2.msg, {
                                      time: 1000,
                                    });
                                setTimeout(function(){
                                      location.href="../html/personInfo.html"
                                },1500)
                                  }else{
                                    layer.msg(data2.msg, {
                                      time: 1000,
                                    });
                                  }
                                 },
                               error:function(msg)
                               {

                               }
                             });
  }
    // 删除类别操作
       function removeByValue(arr, val) {
          for(var i=0; i<arr.length; i++) {
            if(arr[i] == val) {
              arr.splice(i, 1);
              break;
            }
          }
        }
})
