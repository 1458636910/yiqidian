$(document).ready(function(){
      var href = location.href;
      var dataC = localStorage.getItem("GHY_login");
      if (dataC != null) {
        $('.infoBtn').show();
        $('.loginBtn').hide();
      var dataInfo = JSON.parse(dataC);
      $('.infoBtn img').attr('src',dataInfo.iphoto );
      $('#writeCircleBtn').show()
      }else{
        $('#writeCircleBtn').hide()
        $('.loginBtn').show();
        $('.infoBtn').hide();
        layer.msg('请先登录', {
                        time: 1000,
              });
      }
      $('#writeCircleBtn button').click(function() {
        window.open("../html/writeCircle.html?source=0")
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
      $('.news').hover(function() {
        $(this).children('ul').show();
      }, function() {
       $(this).children('ul').hide();
      });
      $('.fouceBtn').hover(function() {
        $(this).children('ul').show();
      }, function() {
       $(this).children('ul').hide();
      });
      $('.infoBtn').hover(function() {
        $(this).children('ul').show();
      }, function() {
       $(this).children('ul').hide();
      });
      loadVideos(0)
      var dataFouce;
      var arr_video = [];
    function loadVideos(page){
      $.post(''+http_head+'/Lectures/Get_LectureVideo_ByLecture.ashx', {
        "lectureGuid":dataInfo.Guid,
        "page":page
        }, function(data) {
           dataFouce = JSON.parse(data);
           for (var i = 0; i < dataFouce.items.rows.length; i++) {
             arr_video.push(dataFouce.items.rows[i])
           }
           if ( dataFouce.items.rows.length > 9 ) {
                  $('.noMoreBtn').hide()
                  $('.loadMore').show()
                  $('.loadMore').click(function() {
                      loadVideos(dataFouce.items.page)
                  });
              }else{
                  $('.noMoreBtn').show()
                  $('.loadMore').hide()
              }
              $('#videoListTable').bootstrapTable({
                          url: arr_video,
                          columns: [
                          {
                              field: 'videoImage',
                              title: '视频截图',
                              align: 'center',
                              valign: 'middle',
                              formatter:imgFormatter,
                              events:videoEvents
                          },
                          {
                              field: 'videoTitle',
                              title: '视频名称',
                              align: 'center',
                              valign: 'middle'
                          },
                          {
                            field: 'label',
                            title: '视频类别',
                            formatter:labelFormatter,
                            align: 'left',
                            valign: 'middle'
                          },
                          {
                            field: 'option',
                            title: '视频操作',
                            align: 'center',
                            valign: 'middle',
                            formatter:optionFormatter,
                            events:optionEvents
                          }
                          ]
                      });
                      $("#videoListTable").bootstrapTable('load', arr_video);
                      function imgFormatter(e,value, row, index){
                           return [
                           '<img src="'+value.videoImage+'" alt="" / title="点击播放视频">'
                            ].join('');
                      };
                      function labelFormatter(e,value, row, index){
                        var arr_area = [];
                        var str = "";
                        str = ( value.label ).split(",")
                        for (var i = 0; i < str.length; i++) {
                          arr_area.push('<span class="researchField">《'+str[i]+'》</span>')
                        }
                        for (var i = 0; i < arr_area.length; i++) {
                        return [
                        '<p><span>研究领域 : </span>',
                        arr_area,
                        '</p>',
                        ].join('');
                        }
                      };
                      function optionFormatter(e,value, row, index){
                           return [
                               '<a class="deleteVideo"  title="删除视频">',
                               '<span id="deleteVideo">删除视频</span>',
                               '</a>  ',
                               '<a class="changeVideo"  title="修改视频">',
                               '<span id="changeVideo">修改视频</span>',
                               '</a>  ',
                            ].join('');
                      };
      });
    }
      var str_label="";
      var arr_label = [];
       window.optionEvents = {
                     'click .deleteVideo': function (e, value, row, index) {
                        layer.open({
                            type: 1,
                            area: '300px',
                            title: ['删除视频', 'font-size:18px;text-align: center;'],
                            content: $(".deleteVideoTable"),
                            btn:'确定',
                          });
                        $('.layui-layer-btn0').click(function() {
                            $.post(''+http_head+'/Lectures/Delete_LectureVideo.ashx', {
                              "userGuid":row.creater,
                              "lectureVideoId":row.Id
                            }, function(data) {
                              var dataDel = JSON.parse(data);
                              if ( dataDel.status ==200 ) {
                                  layer.msg('删除成功', {
                                      time: 1000,
                                    });
                                  $("#videoListTable").bootstrapTable('removeAll')
                                  loadVideos(0)
                              }
                            });
                        });
                     },
                      'click .changeVideo': function (e, value, row, index) {
                        layer.open({
                            type: 1,
                            area: ['600px'],
                            title: ['删除视频', 'font-size:18px;text-align: center;'],
                            content: $(".changeVideoTable"),
                            btn:'确定',
                          });
                        $('#inputVideoTitle').val(row.videoTitle)
                        $('#inputVideoLabel').val(row.label)
                        $('#inputVideoDescribe').val(row.describe);
                        // 选择标签

                        $('#inputVideoLabel').click(function() {
                          $('#labelA').val( $(this).val() )
                                $.post(''+http_head+'/Option_AreasAnd.ashx', {"type": 45}, function(data) {
                                    layer.open({
                                    type: 1,
                                    area: ['800px','400px'],
                                    title: ['研究领域', 'font-size:18px;text-align: center;'],
                                    content: $('.videoLabelTable'),
                                    btn:'确定',
                                    shade: false
                                  });

                                    if( $('.videoLabelLeft p').length == 0 ){
                                        for (var i = 0; i < data.length; i++) {
                                             $('.videoLabelLeft').append('<p class="'+i+'">'+data[i].name+'</p>');
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
                                                    if (  arr_label.length >4 ) {
                                                       layer.msg('最多选择5个', {
                                                              time: 1000,
                                                            });
                                                       $(this).removeAttr('checked')
                                                       removeByValue(arr_label, $(this).val() );
                                                    }else{

                                                    arr_label.push($(this).val())
                                                    $('#labelA').val(arr_label)
                                                    }
                                                   }else{
                                                    removeByValue(arr_label, $(this).val() );
                                                    $('#labelA').val(arr_label)
                                                   }

                                            });
                                             });
                                          }
                                    }else{}
                                    $('.layui-layer-btn0').click(function() {
                                      for (var i = 0; i < arr_label.length; i++) {
                                           str_label += arr_label[i]+","
                                      }
                                     var labelArea = str_label.substring(0,Number(str_label.length)-1)
                                        $('#inputVideoLabel').val( $('#labelA').val() );
                                         $('#labelA').val("")
                                  });
                              });
                         });
                        // 修改视频
                        $('.layui-layer-btn0').click(function() {
                                $.post(''+http_head+'/Lectures/Update_LectureVideo.ashx', {
                                  "userGuid":row.creater,
                                  "lectureVideoId":row.Id,
                                  "lectureVideoTitle":$('#inputVideoTitle').val(),
                                  "label":$('#inputVideoLabel').val(),
                                  "describe":$('#inputVideoDescribe').val()
                                }, function(data) {
                                  var dataChanged = JSON.parse(data)
                                  if ( dataChanged.status == 200 ) {
                                    $("#videoListTable").bootstrapTable('removeAll')
                                     loadVideos(0)
                                  }
                                });
                        });
                     }
                   }
       // 播放视频
       window.videoEvents = {
                     'click img': function (e, value, row, index) {
                      var str = JSON.stringify(row); // 将对象转换为字符串
                       sessionStorage.setItem("GHY_video",str);
                      var urlFront = (row.videoUrl).split("id")[1];
                      var urlBack = urlFront.split("==")[0];
                      var urlId = urlBack.substring(1)
                      window.open("../html/videoPlay.html?id="+urlId+"")
                     }
                   }
                   // 数组删除指定Label
                   function removeByValue(arr, val) {
                                                              for(var i=0; i<arr.length; i++) {
                                                                if(arr[i] == val) {
                                                                  arr.splice(i, 1);
                                                                  break;
                                                                }
                                                              }
                                                            }
    $('.searchArea  input').keydown(function(event) {
                       if (event.keyCode === 13){
                              if ( $('.searchArea input').val().length == 0 ){
                                  layer.msg('搜索关键字不能为空', {
                                                              time: 1000,
                                       });
                                   }else{
                                    SiteSearch()
                                    window.open("../html/teacherIndex.html?searchVal="+$('.searchArea input').val()+"");
                                  }
                    }else{}
            });
    // 搜索
    $('.searchArea').hover(function() {
      $('#lssslb').show()
    }, function() {
     $('#lssslb').hide()
    });
    //取值写入页面
    function SiteSearch(){
        var sszd = $(".searchArea input").val();
        setHistoryItems(sszd);
    };
    $(function(){
      var str=localStorage.historyItems;
        var s = '';
        if(str==undefined){
            s='<div class="rmssts">暂无搜索记录...</div>';
            $("#lssslb").append(s);
        }else{
            var strs= new Array();
            strs=str.split("|");
            for(var i=0;i<strs.length;i++){
                s+= "<p><a href='../html/teacherIndex.html?searchVal="+strs[i]+"' target=black>"+strs[i]+"</a></p>";
            }
            $("#lssslb").append(s+'<input type="button" class="scls" onclick="clearHistory();" value="清除历史记录">');
        }
    });
    //存值方法,新的值添加在首位
    function setHistoryItems(keyword) {
        let { historyItems } = localStorage;
        if (historyItems === undefined) {
            localStorage.historyItems = keyword;
        } else {
            historyItems = keyword + '|' + historyItems.split('|').filter(e => e != keyword).join('|');
            localStorage.historyItems = historyItems;
        }
    };
    //清除值
    function clearHistory() {
        localStorage.removeItem('historyItems');
        var div = document.getElementById("lssslb");
        while(div.hasChildNodes()) //当div下还存在子节点时 循环继续
        {
            div.removeChild(div.firstChild);
        }
        $("#lssslb").append('<div class="rmssts">暂无搜索记录...</div>');
    }
})
