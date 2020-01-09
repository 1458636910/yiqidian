$(document).ready(function(){
      var href = location.href;
      var hrefDetails = decodeURIComponent(href);
      var s =  href.indexOf("?");
      if ( s >= 0 ) {
      var videoDetails = hrefDetails.split("?")[1];
      var typeD = videoDetails.split("=")[0];
      var label = videoDetails.split("=")[1];
      if ( typeD == "label" ) {
        accordingLabel(0,label)
      }else{
        $('.inputVal').val(videoDetails)
         loadVideo()
      }
    }else{
        loadVideos(0);
    }
      var dataC = localStorage.getItem("GHY_login");
      if (dataC != null) {
        $('.infoBtn').show();
        $('.loginBtn').hide();
      var dataInfo = JSON.parse(dataC);
      $('.loginName').text(dataInfo.username)
      }else{
        $('.loginBtn').show();
        $('.infoBtn').hide();
        $('.quitOut').hide();
      }

      $('#writeCircleBtn button').click(function() {
        window.open("../html/writeCircle.html")
      });
      // 退出操作
      $('.quitOut').click(function() {
              localStorage.removeItem("GHY_login");
              window.location.reload()
            });
      // 登陆操作
      $('#loginBtn').click(function() {
         location.href ="../html/innerLogin.html?href="+href+"";
      });

        // 加载视频分类
  $.post(''+http_head+'/Option_AreasAnd.ashx', {"type": 45}, function(data) {
        if ( $('.listLeft p').size() ==1 ) {
          for (var i = 0; i < data.length; i++) {
              $('.spanList').append('<span id="'+i+'">'+data[i].name+'</span>')
          }
          $('.spanList span').hover(function() {
            var innerId = $(this).attr('id')
            $('.innerspanList').remove()
              $(this).append('<div class="innerspanList"></div>')
            for (var j = 0; j < data[innerId].sub.length; j++) {
              $('.innerspanList').append('<span>'+data[innerId].sub[j].name+'</span>')
            }
            $('.innerspanList span').click(function() {
              accordingLabel(0,$(this).text());
            });
            $(this).css('backgroundColor', '#29e').siblings('span').css('backgroundColor', '#fff');
          }, function() {
            $(this).css('backgroundColor', '#fff');
             $('.innerspanList').remove();
          });
        }else{
          }
        });
      var dataFouce;
      var arr_video = [];
    function loadVideos(page){
      $.post(''+http_head+'/Lectures/video/Get_LectureVideo_ByTime.ashx', {
        "page":page
        }, function(data) {
           dataFouce = JSON.parse(data);
           for (var i = 0; i < dataFouce.items.rows.length; i++) {
             arr_video.push(dataFouce.items.rows[i])
           }
           if ( dataFouce.items.rows.length > 9 ) {
                  $('.noMoreBtn').hide()
                  $('.loadMore').show()

              }else{
                  $('.noMoreBtn').show()
                  $('.loadMore').hide()
              }
              loadTabel(arr_video)
      });
    }
    $('.loadMore').click(function() {
      loadVideos(dataFouce.items.page)
    });
        function loadTabel(arr_video){
              $('#videoListTable').bootstrapTable({
                          url: arr_video,
                          columns: [
                          {
                              field: 'videoImage',
                              align: 'center',
                              valign: 'middle',
                              formatter:imgFormatter,
                              events:videoEvents
                          },
                          {
                              field: 'videoTitle',
                              align: 'left',
                              valign: 'middle',
                              formatter:labelFormatter,
                              events:videoPlayEvents
                          }
                          ]
                      });
                      $("#videoListTable").bootstrapTable('load', arr_video);
                      function imgFormatter(e,value, row, index){
                           return [
                           '<img src="'+value.videoImage+'" alt="" / title="点击播放视频" class="videoImg">',
                           '<p class="videoPlayTime">'+value.videoTime+'</p>'
                            ].join('');
                      };
                      function labelFormatter(e,value, row, index){
                        var arr_area = [];
                        var str = "";
                        str = ( value.label ).split(",")
                        for (var i = 0; i < str.length; i++) {
                          arr_area.push('《<span class="researchField">'+str[i]+'</span>》')
                        }
                        for (var i = 0; i < arr_area.length; i++) {
                        return [
                        '<p><span></span><span class="videoTitle2">'+value.videoTitle+'</span></p>',
                        '<p class="videoType"><span></span>',
                        arr_area,
                        '</p>',
                        ].join('');
                        }
                      };
                      $('.videoType span').click(function() {
                        accordingLabel(0,$(this).text())
                      });
            }
       // 播放视频
       window.videoEvents = {
                     'click img': function (e, value, row, index) {
                      var str = JSON.stringify(row); // 将对象转换为字符串
                       sessionStorage.removeItem("GHY_video");
                       sessionStorage.setItem("GHY_video",str);
                      var urlFront = (row.videoUrl).split("id")[1];
                      var urlBack = urlFront.split("==")[0];
                      var urlId = urlBack.substring(1)
                      window.open("../html/videoPlay.html?id="+urlId+"")
                     }
                   }
       window.videoPlayEvents = {
                     'click .videoTitle2': function (e, value, row, index) {
                        var str = JSON.stringify(row); // 将对象转换为字符串
                       sessionStorage.removeItem("GHY_video");
                       sessionStorage.setItem("GHY_video",str);
                      var urlFront = (row.videoUrl).split("id")[1];
                      var urlBack = urlFront.split("==")[0];
                      var urlId = urlBack.substring(1)
                      window.open("../html/videoPlay.html?id="+urlId+"")
                     }
                   }
      // 搜索视频
    $('.inputVal').keydown(function(event) {
                       if (event.keyCode === 13){
                              if ( $('.inputVal').val().length == 0 ){
                                  layer.msg('搜索关键字不能为空', {
                                                              time: 1000,
                                       });
                                   }else{
                                    loadVideo()
                                  }
                    }else{}
            });
    $('.seaBtn').click(function() {
        if ( $('.inputVal').val().length == 0 ){
                                  layer.msg('搜索关键字不能为空', {
                                                              time: 1000,
                                       });
                                   }else{
                                    loadVideo()
                                  }
    });
    function loadVideo(page){
      arr_video=[];
      $.post(''+http_head+'/Lectures/Get_LectrueVideo_BySearch.ashx', {
        "para": $('.inputVal').val(),
        "page":0
            }, function(data) {
             var dataReault = JSON.parse(data)
             for (var i = 0; i < dataReault.items.rows.length; i++) {
             arr_video.push(dataReault.items.rows[i])
           }
           loadTabel(arr_video)
      });
  }
  // 按照类别找讲师视频
      function accordingLabel(page,field){
            $.post(''+http_head+'/Lectures/video/Get_LectureVideo_ByType.ashx', {
                        "page":page,
                        "type":field
                      }, function(data) {
                        var dataLabelteacher = JSON.parse(data);
                        if ( dataLabelteacher.status == 200 ) {
                          if ( dataLabelteacher.items.rows.length >0 ) {
                              layer.msg(dataLabelteacher.msg, {
                                                                      time: 500,
                                                                    });
                              if ( dataLabelteacher.items.rows.length >9 ) {
                                  $('.noMoreBtn').hide()
                                  $('.loadMore').show()
                              }else{
                                $('.noMoreBtn').show()
                                  $('.loadMore').hide()
                              }
                            loadTabel(dataLabelteacher.items.rows)
                          }else{
                            layer.msg('暂无搜索结果,为你加载最新视频', {
                                                                      time: 1500,
                                                                    });
                            $("#videoListTable").bootstrapTable('removeAll');
                             loadVideos(0)
                          }
                        }
                      });
      }

})
