$(document).ready(function(){
  // 获取本地数据
      var dataCircle =   localStorage.getItem("GHY_login");
      var dataC = JSON.parse(dataCircle);
 // 创建富文本编辑框
        var E = window.wangEditor
        var editor = new E('#editor')
        // editor.customConfig.uploadImgShowBase64 = true;
 // **************************************自动上传图片开始*********************************
              var  dataImg;
            editor.customConfig.customUploadImg = function (files, insert) {
              var  iformdata= new FormData();
              var imgU = files[0];
              iformdata.append('image', imgU);
              $.ajax({
                           type : 'post',
                           url : http_head+'/Articles/CommitImage.ashx',
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
 // 选择课程类型
      var str_label2="";
      var arr_label2 = [];
      $('.courseChoose').click(function() {
                                    layer.open({
                                        type: 1,
                                        area: ['800px','400px'],
                                        title: ['研究领域', 'font-size:18px;text-align: center;'],
                                        content: $('.videoLabelTable'),
                                        btn:'确定',
                                  });
             $.post(''+http_head+'/Option_AreasAnd.ashx', {"type": 45}, function(data) {
                                    if( $('.videoLabelLeft p').length == 0 ){
                                        for (var i = 0; i < data.length; i++) {
                                             $('.videoLabelLeft').append('<p class="'+i+'">'+data[i].name+'</p>');
                                             $('.videoLabelLeft').children('p').eq(0).attr('id', 'firstP');
                                             document.getElementById('firstP').click();
                                             $('.videoLabelLeft .'+i+'').click(function() {
                                              $(this).css('backgroundColor', 'red').siblings('p').css('backgroundColor', '#29e');
                                                 var m =   $(this).attr('class');
                                               $('.videoLabelRight span').remove();
                                             for (var j = 0; j < data[m].sub.length; j++) {
                                                    $('.videoLabelRight').append('<span><input type="checkbox" value="'+data[m].sub[j].name+'" name="label">'+data[m].sub[j].name+'</span>')
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
                                            $('.courseChoose').val( $('#labelInfo').val() );
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
 //  提交表单操作
       $('.submitBtn').click(function() {
        if ( $('.courseChoose').val().length == 0 || $('.courseTheme').val().length == 0 || editor.txt.text().length == 0  ) {
                  layer.msg('请完善信息', {
                                time: 1000,
                              });
        }else{
          ajaxFileUpload()
        }
       });
        function ajaxFileUpload() {
              var  Pformdata= new FormData();
               var textVal = editor.txt.text();
                var textMin;
                if ( textVal.length > 60 ) {
                      textMin = textVal.substring(0,60)+'...';
                    }else{
                      textMin = textVal
                    }
                    if ( typeof(dataImg) =="undefined" ) {
                      var imgUrl = ""
                    }else{
                      imgUrl = (dataImg.items).substring(25)
                    }
               Pformdata.append('userGuid',dataC.Guid);
               Pformdata.append('companyId',dataC.companyId);
               Pformdata.append('label',$('.courseChoose').val());
               Pformdata.append('title',$('.courseTheme').val());
               Pformdata.append('content',editor.txt.html());
               Pformdata.append('textContent',textMin);
               Pformdata.append('homeImage',imgUrl);
             $.ajax({
                           type : 'post',
                           url : http_head+'/Lectures/article/Add_LectureArticle.ashx',
                           data : Pformdata,
                           cache : false,
                           processData : false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
                           contentType : false, // 不设置Content-type请求头
                           success : function(data){
                            console.log( data )
                            data2 = JSON.parse(data)
                            if (data2.status ==200) {
                              layer.msg('添加成功', {
                                time: 1000,
                              });
                              setTimeout(function(){
                              location.href ="../html/addCircle.html"
                              },1500)
                            }else{
                              layer.msg(data2.msg, {
                                time: 1000,
                              });
                            }
                           },
                         error:function()
                         {

                         }
                       });
           }

 })
