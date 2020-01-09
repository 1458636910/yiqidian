$(document).ready(function(){
      var dataCircle =   localStorage.getItem("GHY_login");
      var dataC = JSON.parse(dataCircle);
      // *********************************优酷视频解析*********************************
      var videoData;
      $('#sureBtn').click(function() {
        if (  $('.videoUrl').val().length == 0) {
            layer.msg('请输入有效网址', {
                                            time: 1000,
                                     });
        }else{
             $.post(''+http_head+'/Lectures/video/Parsingvideo.ashx', {
                "videoUrl": $('.videoUrl').val()
             }, function(data) {
                videoData = JSON.parse(data);
               if ( videoData.status == 200 ) {
                $('.videoTitleLabel').show();
                $('.videoImgLabel').show();
                $('.videoLabel1').show();
                $('.describe').show();
                $('.videoTitleLabel input').val(videoData.items.title);
                 $('.videoImgLabel img').attr('src', videoData.items.thumbnail);
                 $('#videoDescribe').val(videoData.items.description);
               }else{
                layer.msg('请输入正确的优酷网址', {
                                            time: 1000,
                                     });
               }
             });
          }
      });
      // *********************************优酷视频解析结束*********************************
      // ********************************选择视频类别**********************************
      var str_label2="";
      var arr_label2 = [];
      $('.videoLabel').click(function() {
             $('.cover').show()
             $.post(''+http_head+'/Option_AreasAnd.ashx', {"type": 45}, function(data) {
                                    layer.open({
                                    type: 1,
                                    area: ['800px','400px'],
                                    title: ['研究领域', 'font-size:18px;text-align: center;'],
                                    content: $('.videoLabelTable'),
                                    btn:'确定',
                                    // shade: false
                                  });
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
                                        $('.videoLabel').val( $('#labelInfo').val() );
                                         arr_label2 = [];
                                         $('#labelInfo').val("");
                                         $("input:checkbox[name='label']").removeAttr('checked');
                                  });
                                    $('.cover').hide()
                                    $('.layui-layer-close').click(function() {
                                      $('.cover').hide()
                                      $("input:checkbox[name='label']").removeAttr('checked');
                                        arr_label2 =[];
                                        $('#labelInfo').val("");
                                    });
                                })
      });
      // ********************************选择视频类别结束**********************************
      // ************************************提交表单************************************
      $('.submitBtn').click(function() {
        if( $('.videoLabel').val().length >0 ){
                $.post(''+http_head+'/Lectures/Add_LectureVideos.ashx', {
                        "userGuid":dataC.Guid,
                        "videoUrl":$('.videoUrl').val(),
                        "lable":$('.videoLabel').val(),
                        "describe":$('#videoDescribe').val(),
                        "player":videoData.items.link,
                        "id":videoData.items.id,
                        "title":$('#videoName').val(),
                        "bigThumbnail":videoData.items.thumbnail,
                        "videoTime":videoData.items.duration
                        }, function(data) {
                            var dataVideo = JSON.parse(data)
                            if ( dataVideo.status == 200 ) {
                              layer.msg('上传成功', {
                                                  time: 1000,
                                                });
                              setTimeout(function(){
                                location.href="../html/updataVideo.html"
                              },1500)
                            }else{
                              layer.msg(dataVideo.msg, {
                                                  time: 1000,
                                                });
                            }
                });
            }else{
              layer.msg('请选择视频类别', {
                                            time: 1000,
                                     });
            }
      });
       // ************************************提交表单结束************************************
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

