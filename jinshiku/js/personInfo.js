$(document).ready(function(){
    var dataC = localStorage.getItem("GHY_login");
    var href = location.href;
    if (dataC != null) {
      console.log( dataC )
    var dataInfo = JSON.parse(dataC);
     $('.loginName').text(dataInfo.username)
     $.post('https://www.eqid.top:8009/Lectures/Get_Lecture_ByCreater.ashx', {
        "userGuid" :dataInfo.Guid
     }, function(data) {
       var dataStatus = JSON.parse(data)
       if ( dataStatus.items.status == 0 ) {
          layer.msg('审核中', {
                                time: 2000000,
                                shade:0.5
                         });
       }else if(dataStatus.items.status == 2 ){
          layer.msg('审核不通过', {
                                time: 2000000,
                                shade:0.5
                         });
       }
     });
    }else{
      $('.quitOut').hide()
      layer.msg('请先登录', {
                          time: 1000,
                });
    }
    if(href.indexOf("=") < 0 ){
    // location.href ="../html/myCircle.html"
  }else{
    var thisPart = href.split("=")[1];
    if (thisPart == "course") {
        setTimeout( function(){
                   document.getElementById("course").click();
                }, 1000 );
    }
  }
    var E = window.wangEditor
    var editor = new E('#editor');
    editor.customConfig.menus = [
        'head',  // 标题
        'bold',  // 粗体
        'italic',  // 斜体
        'underline',  // 下划线
        'strikeThrough',  // 删除线
        'foreColor',  // 文字颜色
        'backColor',  // 背景颜色
        'link',  // 插入链接
        'list',  // 列表
        'justify',  // 对齐方式
        'quote',  // 引用
        'emoticon',  // 表情
    ]
        editor.create();
        var F = window.wangEditor
        var editor2 = new F('#editor2');
          editor2.customConfig.menus = [
            'head',
            'bold',
            'foreColor',  // 文字颜色
            'backColor',  // 背景颜色
        ]
        editor2.create();
        var G = window.wangEditor
        var editor3 = new G('#editor3');
        editor3.customConfig.menus = [
            'head',
            'bold',
            'foreColor',  // 文字颜色
            'backColor',  // 背景颜色
        ]
        editor3.create();
         loadAll()
    function loadAll(){
      // 获取讲师详情
          $.post(''+http_head+'/Lectures/Get_Lecture_ByCreater.ashx', {
                    "userGuid":dataInfo.Guid
                    }, function(data) {
                    var dataInfomation = JSON.parse(data);
                    if ( dataInfomation.status != 200  ) {
                        layer.msg('未认证，请认证', {
                                               time: 200000,
                                               shade:0.5
                                            });
                        setTimeout(function(){
                            location.href="../html/conformTeacher.html"
                        },1500)
                    }
            document.getElementById('info').click();
            if (  dataInfomation.items.headimage == "" ) {
              var imgSrc = dataInfo.iphoto
            }else{
                   imgSrc = dataInfomation.items.headimage
            }
            $('.tName').text(dataInfomation.items.realname);
            $('.topT img').attr('src', imgSrc);
            $('.tSex').text(dataInfomation.items.sex);
            $('.phone').val(dataInfomation.items.phone);
            $('.assistantPhone').val(dataInfomation.items.AssistantPhone);
            $('.assistantName').val(dataInfomation.items.Assistant);
            $('.email').val(dataInfomation.items.email);
            $('.qq').val(dataInfomation.items.QQ);
            $('.wechat').val(dataInfomation.items.wechat);
            $('#province').val(dataInfomation.items.province);
            $('#city').val(dataInfomation.items.city);
            $('.TeachStyle').val(dataInfomation.items.TeachStyle);
            $('.ResearchField').val(dataInfomation.items.ResearchField);
            $('.courses').val(dataInfomation.items.courses);
            $('.cooperativePrice').val(dataInfomation.items.CooperativePrice);
            editor.txt.html(dataInfomation.items.LecturerBackground)
            editor2.txt.html(dataInfomation.items.CustCase)
            editor3.txt.html(dataInfomation.items.ServiceCom)
          });
  }
  $('.changePhoto').click(function() {
        layer.open({
                          type: 1,
                          area: '400px',
                          title: ['修改头像', 'font-size:18px;text-align: center;'],
                          content: $('.changephotoTable'),
                          btn:'确定',
                          // shade:false
                    });
        $('.layui-layer-btn0').click(function() {
                    ajaxFileUpload2()
                  });
  });
    $('.info').click(function() {
          $(this).css({
            backgroundColor: '#29e',
            color: '#fff'
          }).siblings('li').css({
            backgroundColor: '#fff',
            color: '#000'
          });
          $('.infoDiv').show().siblings('div').hide();
    });
    // 修改地址
    $('#changeArea').click(function() {
      $('.newArea').show();
      $('.oldArea').hide();
      $(this).hide()
    });
    // 课程
    $('.course').click(function() {
          $(this).css({
            backgroundColor: '#29e',
            color: '#fff'
          }).siblings('li').css({
            backgroundColor: '#fff',
            color: '#000'
          });
          $('.courseDiv').show().siblings('div').hide();
            laodCourse(0)
    });
    // 选择研究领域
    //   var str_label2="";
    //   var arr_label2 = [];
    // $('.ResearchField').click(function() {
    //                             $.post(''+http_head+'/Option_AreasAnd.ashx', {"type": 45}, function(data) {
    //                                 layer.open({
    //                                 type: 1,
    //                                 area: ['800px','400px'],
    //                                 title: ['研究领域', 'font-size:18px;text-align: center;'],
    //                                 content: $('.infoLabelTable'),
    //                                 btn:'确定',
    //                                 shade: false
    //                               });
    //                                 if( $('.infoLabelLeft p').length == 0 ){
    //                                     for (var i = 0; i < data.length; i++) {
    //                                          $('.infoLabelLeft').append('<p class="'+i+'">'+data[i].name+'</p>');
    //                                          $('.infoLabelLeft').children('p').eq(0).attr('id', 'firstP');
    //                                          document.getElementById('firstP').click();
    //                                          $('.infoLabelLeft .'+i+'').click(function() {
    //                                           $(this).css('backgroundColor', 'red').siblings('p').css('backgroundColor', '#29e');
    //                                              var m =   $(this).attr('class');
    //                                            $('.infoLabelRight span').remove();
    //                                          for (var j = 0; j < data[m].sub.length; j++) {
    //                                                 $('.infoLabelRight').append('<span><input type="checkbox" value="'+data[m].sub[j].name+'" name="label">'+data[m].sub[j].name+'</span>')
    //                                          }
    //                                         $("input:checkbox[name='label']").click(function() {
    //                                           var aaa = $(this).prop("checked");
    //                                               if( aaa === true){
    //                                                 if (  arr_label2.length >4 ) {
    //                                                    layer.msg('最多选择5个', {
    //                                                           time: 1000,
    //                                                         });
    //                                                    $(this).removeAttr('checked')
    //                                                    removeByValue(arr_label2, $(this).val() );
    //                                                 }else{
    //                                                 arr_label2.push($(this).val())
    //                                                 $('#labelInfo').val(arr_label2)
    //                                                 }
    //                                                }else{
    //                                                 removeByValue(arr_label2, $(this).val() );
    //                                                 $('#labelInfo').val(arr_label2)
    //                                                }
    //                                         });
    //                                          });
    //                                       }
    //                                 }else{}
    //                                 $('.layui-layer-btn0').click(function() {
    //                                   for (var i = 0; i < arr_label2.length; i++) {
    //                                        str_label2 += arr_label2[i]+","
    //                                   }
    //                                  var labelArea = str_label2.substring(0,Number(str_label2.length)-1)
    //                                     $('.ResearchField').val( $('#labelInfo').val() );
    //                                      arr_label2 = [];
    //                                      $('#labelInfo').val("");
    //                                      $("input:checkbox[name='label']").removeAttr('checked');
    //                               });
    //                                 $('.layui-layer-close').click(function() {
    //                                   $("input:checkbox[name='label']").removeAttr('checked');
    //                                     arr_label2 =[];
    //                                     $('#labelInfo').val("");
    //                                 });
    //                             })
    // });
    $('.teacherInfo').click(function() {
      $(this).css('backgroundColor', '#f00').siblings('button').css('backgroundColor', '#29e');
      $('#infoTable').show().siblings('#courseTable').hide();
    });
    $('.teaCourseInfo').click(function() {
       $(this).css('backgroundColor', '#f00').siblings('button').css('backgroundColor', '#29e');
       $('#courseTable').show().siblings('#infoTable').hide();
    });
    // 文章
    $('.circle').click(function() {
          $(this).css({
            backgroundColor: '#29e',
            color: '#fff'
          }).siblings('li').css({
            backgroundColor: '#fff',
            color: '#000'
          });
          $('.circleDiv').show().siblings('div').hide();
          $("#circleList").bootstrapTable('removeAll')
          loadCircle(0)
    });
    // 相册
    $('.photo').click(function() {
          $(this).css({
            backgroundColor: '#29e',
            color: '#fff'
          }).siblings('li').css({
            backgroundColor: '#fff',
            color: '#000'
          });
          $('.photoDiv').show().siblings('div').hide();
          // loadImg(0)
          $('.imgArea div').children('img').eq(0).attr('id', 'firstImg');
          document.getElementById('firstImg').click();
    });
          loadList(0)
    // 视频
    $('.video').one('click', function(event) {
        $(this).css({
            backgroundColor: '#29e',
            color: '#fff'
          }).siblings('li').css({
            backgroundColor: '#fff',
            color: '#000'
          });
          $('.videoDiv').show().siblings('div').hide();
          arr_video = []
          loadVideos(0)
    });
    $('.video').click(function() {
      $(this).css({
            backgroundColor: '#29e',
            color: '#fff'
          }).siblings('li').css({
            backgroundColor: '#fff',
            color: '#000'
          });
          $('.videoDiv').show().siblings('div').hide();
    });
    // 需求
    $('.need').one('click', function(event) {
        $(this).css({
            backgroundColor: '#29e',
            color: '#fff'
          }).siblings('li').css({
            backgroundColor: '#fff',
            color: '#000'
          });
          $('.videoDiv').show().siblings('div').hide();
          arr_video = []
           needOption(0)
    });
    $('.need').click(function() {
        $(this).css({
            backgroundColor: '#29e',
            color: '#fff'
          }).siblings('li').css({
            backgroundColor: '#fff',
            color: '#000'
          });
          $('.needDiv').show().siblings('div').hide();
    });
    // 文章操作
    var dataCircle;
    var arr_Circle = [];
    function loadCircle(page){
        $.post(''+http_head+'/Lectures/article/Get_Article_ByLecture.ashx', {
          "lectureGuid":dataInfo.Guid,
          "page":page
        }, function(data) {
           dataCircle = JSON.parse(data);
           for (var i = 0; i < dataCircle.items.rows.length; i++) {
            arr_Circle.push( dataCircle.items.rows[i] )
           }
           if ( dataCircle.items.rows.length >9 ) {
                $('.noMoreBtn').hide()
                $('.loadMore').show()
                $('.circleDiv .loadMore').click(function() {
                        loadCircle(dataCircle.items.page)
                    });
           }else{
                $('.noMoreBtn').show()
                $('.loadMore').hide()
           }
          loadCircleTable(arr_Circle)
        });
    }
  function loadCircleTable(data){
      var dataCircle = data
       $('#circleList').bootstrapTable({
                          url: arr_Circle,
                          columns: [
                          {
                            field: 'title',
                            title: '文章标题',
                          },
                          {
                            field: 'Label',
                            title: '文章类别',
                            align: 'left',
                            valign: 'middle',
                            formatter:labelFormatter
                          },
                          {
                            field: 'createTime',
                            title: '发布时间',
                            formatter:timeFormatter
                          },
                          {
                            field: 'option',
                            title: '文章操作',
                            formatter:circleOptionFormatter,
                            events:circleOptionEvents
                          }
                          ]
                      });
                      $("#circleList").bootstrapTable('load', arr_Circle);
                      function labelFormatter(e,value, row, index){
                         var arr_area = [];
                          var str = "";
                          str = ( value.Label ).split(",")
                          for (var i = 0; i < str.length; i++) {
                            arr_area.push('<span class="researchField">《'+str[i]+'》</span>')
                          }
                          for (var i = 0; i < arr_area.length; i++) {
                          return [
                          '<p>',
                          arr_area,
                          '</p>',
                          ].join('');
                          }
                      };
                      function timeFormatter(e,value, row, index){
                         var time = (value.createTime).split("T")[0];
                           return [
                           time
                            ].join('');
                      };
                      function circleOptionFormatter(e,value, row, index){
                           return [
                               '<a class="deleteCircleBtn"  title="删除">',
                               '<span id="deleteCircleBtn">删除</span>',
                               '</a>  ',
                               // '<a class="changeCircle"  title="修改">',
                               // '<span id="changeCircle">修改</span>',
                               // '</a>  ',
                               '<a class="lookCircle"  title="查看详情">',
                               '<span id="lookCircle">查看详情</span>',
                               '</a>  ',
                            ].join('');
                      };
    }
    window.circleOptionEvents = {
                      // 删除文章
                     'click .deleteCircleBtn': function (e, value, row, index) {
                        layer.open({
                            type: 1,
                            area: '300px',
                            title: ['删除文章', 'font-size:18px;text-align: center;'],
                            content: $(".deleteCircle"),
                            btn:'确定',
                          });
                        $('.layui-layer-btn0').click(function() {
                            $.post(''+http_head+'/Lectures/article/Delete_LectureArticle.ashx', {
                              "userGuid":row.userGuid,
                              "articleId":row.Id
                            }, function(data) {
                              var dataDel = JSON.parse(data);
                              if ( dataDel.status == 200 ) {
                                  layer.msg('删除成功', {
                                      time: 1000,
                                    });
                                  $("#circleList").bootstrapTable('removeAll')
                                  loadCircle(0)
                              }
                            });
                        });
                     },
                     'click .lookCircle': function (e, value, row, index) {
                          window.open("../html/circleDetails.html?id="+row.Id+"")
                     }
            }
    // 课程操作
    var dataFouce;
    var arr_course = [];
    function laodCourse(page){
      arr_course = [];
      $.post(''+http_head+'/Lectures/course/Get_MyCourse.ashx', {
                "userGuid":dataInfo.Guid,
                "page":page
                }, function(data) {
                   dataFouce = JSON.parse(data);
                   for (var i = 0; i < dataFouce.items.rows.length; i++) {
                    arr_course.push( dataFouce.items.rows[i] )
                   }
                   if ( dataFouce.items.rows.length >9 ) {
                        $('.noMoreBtn').hide()
                        $('.loadMore').show()
                        $('.courseDiv .loadMore').click(function() {
                                loadCircle(dataFouce.items.page)
                            });
                   }else{
                        $('.noMoreBtn').show()
                        $('.loadMore').hide()
                   }
                   laodCourseTable(arr_course);
       });
    }
    function laodCourseTable(arr_course){
               $('#courseListTable').bootstrapTable({
                          url: arr_course,
                          columns: [
                          {
                              field: 'courseTheme',
                              title: '课程主题',
                          },
                          {
                            field: 'courseType',
                              title: '课程类型',
                              formatter:courseTypeFormatter
                          },
                          {
                            field: 'objecter',
                            title: '课程对象',
                            // formatter:labelFormatter
                          },
                          {
                            field: 'createTime',
                            title: '发布时间',
                            formatter:timeFormatter
                          },
                          {
                            field: 'option',
                            title: '课程操作',
                            formatter:optionFormatter,
                            events:courseOptionEvents
                          }
                          ]
                      });
                      $("#courseListTable").bootstrapTable('load', arr_course);
                      function courseTypeFormatter(e,value, row, index){
                          var arr_area = [];
                          var str = "";
                          str = ( value.courseType ).split(",")
                          for (var i = 0; i < str.length; i++) {
                            arr_area.push('<span class="researchField">《'+str[i]+'》</span>')
                          }
                          for (var i = 0; i < arr_area.length; i++) {
                          return [
                          '<p>',
                          arr_area,
                          '</p>',
                          ].join('');
                          }
                      };
                      function timeFormatter(e,value, row, index){
                         var time = (value.createTime).split("T")[0];
                           return [
                           time
                            ].join('');
                      };
                      function optionFormatter(e,value, row, index){
                           return [
                               '<a class="deleteCourse"  title="删除">',
                               '<span id="deleteCourse">删除</span>',
                               '</a>  ',
                               '<a class="lookCourse"  title="详情">',
                               '<span id="lookCourse">查看详情</span>',
                               '</a>  ',
                               '<a class="addCourseVideo"  title="添加视频">',
                               '<span id="addCourseVideo">添加视频</span>',
                               '</a>  ',
                            ].join('');
                      };
      }
       window.courseOptionEvents = {
                     'click .deleteCourse': function (e, value, row, index) {
                        layer.open({
                            type: 1,
                            area: '300px',
                            title: ['删除视频', 'font-size:18px;text-align: center;'],
                            content: $(".deleteCourseTable"),
                            btn:'确定',
                          });
                        $('.layui-layer-btn0').click(function() {
                            $.post(''+http_head+'/Lectures/course/Delete_LectureCourse.ashx', {
                              "userGuid":row.creater,
                              "courseId":row.Id
                            }, function(data) {
                              var dataDel = JSON.parse(data);
                              if ( dataDel.status ==200 ) {
                                  layer.msg('删除成功', {
                                      time: 1000,
                                    });
                                  $("#courseListTable").bootstrapTable('removeAll')
                                  loadVideos(0)
                              }
                            });
                        });
                     },
                      'click .lookCourse': function (e, value, row, index) {
                          window.open("../html/courseDetails.html?id="+row.Id+"")
                      },
                      // 添加相关视频
                      'click .addCourseVideo': function (e, value, row, index) {
                          var dataAddvideo;
                          layer.open({
                            type: 1,
                            area: ['700px','360px'],
                            title: ['添加相关视频', 'font-size:18px;text-align:center;'],
                            content: $(".addCourseVideoTable"),
                            btn:'确定',
                          });
                          loadAddVideo(0)
                      function loadAddVideo(page){
                          $.post(''+http_head+'/Lectures/Get_LectureVideo_ByLecture.ashx', {
                            "lectureGuid":row.creater,
                            "page":page
                              }, function(data) {
                                var dataAddvideo = JSON.parse(data);
                                if (  dataAddvideo.items.rows.length >9 ) {
                                  $('.loadMoreMin').show();
                                  $('.noMoreMin').hide();
                                  $('.loadMoreMin').click(function() {
                                    loadAddVideo(dataAddvideo.items.page)
                                  });
                                }else{
                                  $('.loadMoreMin').hide();
                                  $('.noMoreMin').show();
                                }
                                $('#addvideoListTable').bootstrapTable({
                                        url: dataAddvideo.items.rows,
                                        columns: [
                                        {
                                          checkbox:'checkbox',
                                          title:'选择',
                                          align: 'center',
                                          valign: 'middle',
                                        },
                                        {
                                            field: 'videoImage',
                                            title: '截图',
                                            align: 'center',
                                            valign: 'middle',
                                            formatter:imgFormatter,
                                            events:videoEvents
                                        },
                                        {
                                            field: 'videoTitle',
                                            title: '名称',
                                            align: 'center',
                                            valign: 'middle'
                                        }
                                        ]
                                    });
                          $("#addvideoListTable").bootstrapTable('load', dataAddvideo.items.rows);
                          function imgFormatter(e,value, row, index){
                               return [
                               '<img src="'+value.videoImage+'" alt="" / title="点击播放视频">'
                                ].join('');
                          };
                          });
                        }
                          var str_addVideo = "";
                          $('.layui-layer-btn0').click(function() {
                              var videoLength = $("#addvideoListTable").bootstrapTable('getSelections').length;
                              for (var i = 0; i < videoLength; i++) {
                                 str_addVideo +=$("#addvideoListTable").bootstrapTable('getSelections')[i].Id+","
                              }
                              var videoIds = str_addVideo.substring(0,Number( str_addVideo.length )-1);
                              $.post(''+http_head+'/Lectures/course/Add_Course_Video.ashx', {
                                "userGuid":row.creater,
                                "courseId":row.Id,
                                "videoIdstr":videoIds
                              }, function(data) {
                                var dataNew = JSON.parse(data)
                                if ( dataNew.status == 200 ) {
                                  layer.msg(dataNew.msg, {
                                      time: 1000,
                                    });
                                }
                              });
                          });
                       }
                   }
      // 视频操作
      var dataVideo;
      var arr_video = [];
    function loadVideos(page){
      // arr_video = []
      $.post(''+http_head+'/Lectures/Get_LectureVideo_ByLecture.ashx', {
        "lectureGuid":dataInfo.Guid,
        "page":page
        }, function(data) {
           dataVideo = JSON.parse(data);
           for (var i = 0; i < dataVideo.items.rows.length; i++) {
             arr_video.push(dataVideo.items.rows[i])
           }
           if ( dataVideo.items.rows.length > 9 ) {
                  $('.noMoreBtn').hide()
                  $('.loadMore').show()
                  $('.videoDiv .loadMore').click(function() {
                      loadVideos(dataVideo.items.page)
                  });
              }else{
                  $('.noMoreBtn').show()
                  $('.loadMore').hide()
              }
              loadVideoTable(arr_video)
      });
    }
          function loadVideoTable(arr_video){
              $('#videoListTable').bootstrapTable({
                          url: arr_video,
                          columns: [
                          {
                              field: 'videoImage',
                              title: '截图',
                              align: 'center',
                              valign: 'middle',
                              formatter:imgFormatter,
                              events:videoEvents
                          },
                          {
                              field: 'videoTitle',
                              title: '名称',
                              align: 'center',
                              valign: 'middle'
                          },
                          {
                            field: 'label',
                            title: '类别',
                            formatter:labelFormatter,
                            align: 'left',
                            valign: 'middle'
                          },
                          {
                            field: 'option',
                            title: '操作',
                            align: 'center',
                            valign: 'middle',
                            formatter:videoOptionFormatter,
                            events:videoOptionEvents
                          }
                          ]
                      });
                      $("#videoListTable").bootstrapTable('load', arr_video);
                      function imgFormatter(e,value, row, index){
                           return [
                           '<img src="'+value.videoImage+'" alt="" / title="点击播放视频">',
                           '<p class="videoPlayTime">'+value.videoTime+'</p>'
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
                        '<p>',
                        arr_area,
                        '</p>',
                        ].join('');
                        }
                      };
                      function videoOptionFormatter(e,value, row, index){
                           return [
                               '<a class="deleteVideo"  title="删除视频">',
                               '<span id="deleteVideo">删除</span>',
                               '</a>  ',
                               '<a class="changeVideo"  title="修改视频">',
                               '<span id="changeVideo">修改</span>',
                               '</a>  ',
                            ].join('');
                      };
            }
      var str_label="";
      var arr_label = [];
       window.videoOptionEvents = {
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
                            title: ['修改课程', 'font-size:18px;text-align: center;'],
                            content: $(".changeVideoTable"),
                            btn:'确定',
                          });
                        $('#inputVideoTitle').val(row.videoTitle)
                        $('#inputVideoLabel').val(row.label)
                        $('#inputVideoDescribe').val(row.describe);
                        // 选择标签
                        $('#inputVideoLabel').click(function() {
                                $.post(''+http_head+'/Option_AreasAnd.ashx', {"type": 45}, function(data) {
                                    layer.open({
                                    type: 1,
                                    area: ['800px','400px'],
                                    title: ['视频类别', 'font-size:18px;text-align: center;'],
                                    content: $('.videoLabelTable'),
                                    btn:'确定',
                                    shade: false
                                  });
                                    if( $('.videoLabelLeft p').length == 0 ){
                                        for (var i = 0; i < data.length; i++) {
                                             $('.videoLabelLeft').append('<p class="'+i+'">'+data[i].name+'</p>');
                                              $('.videoLabelLeft').children('p').eq(0).attr('id', 'firstP2');
                                              document.getElementById('firstP2').click();

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
                                         arr_label = [];
                                         $('#labelA').val("")
                                         $("input:checkbox[name='label']").removeAttr('checked');
                                  });
                                    $('.layui-layer-close').click(function() {
                                      $("input:checkbox[name='label']").removeAttr('checked');
                                      $('#labelA').val("");
                                      arr_label =[];
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
      // 删除类别操作
       function removeByValue(arr, val) {
          for(var i=0; i<arr.length; i++) {
            if(arr[i] == val) {
              arr.splice(i, 1);
              break;
            }
          }
        }
    // 相册操作
    var sourceT;
    var menuId;
  function loadList(page){
      $.post(''+http_head+'/Lectures/Get_LecturePhoto_Menu.ashx', {
        "lectureGuid":dataInfo.Guid,
        "page":page
      }, function(data) {
        var imgList = JSON.parse(data);
        if ( $('.imgArea div').size() == 0 ) {
        for (var i = 0; i < imgList.items.rows.length; i++) {
              $('.imgArea').append('<div id="'+imgList.items.rows[i].Id+'"><img src="'+imgList.items.rows[i].imageUrl+'" alt="暂无" /><p class="oldName">'+imgList.items.rows[i].title+'</p><p class="optionImg" id="'+imgList.items.rows[i].Id+'"><span class="deleteImgList">删除</span><span class="changeImg">编辑</span><span class="addphotoBtn">上传照片</span></p></div>')
        }
        }
        // 删除相册
        $('.deleteImgList').click(function() {
              var imgId = $(this).parent('p').attr('id');
              layer.open({
                        type: 1,
                        area: '400px',
                        title: ['删除相册', 'font-size:18px;text-align: center;'],
                        content: $('.deleteListTable'),
                        btn:'确定',
                  });
              $('.layui-layer-btn0').click(function() {
                    $.post(''+http_head+'/Lectures/Delete_Lecture_ImageMenu.ashx', {
                      "userGuid":dataInfo.Guid,
                      "menuId":imgId
                    }, function(data) {
                      $('.imgArea div').remove()
                      loadList(0)
                    });
          })
        });
        // 修改相册名称
        $('.changeImg').click(function() {
          var imgsId =  $(this).parent('p').attr('id') ;
          var olaName =  $(this).parent('p').siblings('.oldName').text() ;
          layer.open({
                        type: 1,
                        area: '400px',
                        title: ['编辑相册名', 'font-size:18px;text-align: center;'],
                        content: $('.changeListNameTable'),
                        btn:'确定',
                  });
          $('.changeListNameTable input').val( olaName );
          $('.layui-layer-btn0').click(function() {
            $.post(''+http_head+'/Lectures/Update_PhotoMenuName.ashx', {
              "userGuid":dataInfo.Guid,
              "menuId":imgsId,
              "menuName":$('.changeListNameTable input').val()
            }, function(data) {
              var dataChangeSuccess = JSON.parse(data)
              if ( dataChangeSuccess.status == 200 ) {
                  layer.msg('设置成功', {
                            time: 1000,
                          });
                              $('.imgArea div').remove()
                              loadList(0)
              }
            });
          });
        });
        // 上传图片
      $('.addphotoBtn').click(function() {
               menuId = $(this).parent('p').attr('id')
                  layer.open({
                          type: 1,
                          area: '400px',
                          title: ['上传图片', 'font-size:18px;text-align: center;'],
                          content: $('.addphotoTable'),
                          btn:'确定',
                          shade:false
                    });
                  $('.layui-layer-btn0').click(function() {
                    ajaxFileUpload()
                  });
      });
        // 图片操作
        $('.imgArea>div img').click(function() {
            $(this).parent('div').css('backgroundColor', '#ddd').siblings('div').css('backgroundColor', '#fff');
              var guid = dataInfo.Guid;
               sourceT = $(this).parent('div').attr('id')
              sessionStorage.removeItem("GHY_teaInfo")
              sessionStorage.setItem("GHY_teaInfo",guid);
              $('.imgDetails>div').remove()
              loadImg(0)
        });
      });
  }
        function loadImg(page){
            $.post(''+http_head+'/Lectures/Get_LectureMenu_Photo.ashx',{
                  "menuId":sourceT,
                  "page":page
                }, function(data) {
                    var imgList = JSON.parse(data);
                    if ( $('.imgDetails div').size() == 0  ) {
                  for (var i = 0; i < imgList.items.rows.length; i++) {
                    $('.imgDetails').append('<div class="col-lg-3 col-md-3 col-md-4 col-xs-12" id="'+imgList.items.rows[i].Id+'"><img src="'+imgList.items.rows[i].imageUrl+'" alt="" /><p>'+imgList.items.rows[i].imageName+'</p><p class="optionImg" id="'+imgList.items.rows[i].Id+'"><span class="deleteImg">删除</span><span class="setFront">设为封面</span><span class="editImg">编辑</span></p></div>')
            }
            }
            // 图片重命名
            $('.editImg').click(function() {
                  var imgId = $(this).parent('p').attr('id');
                  var oldName =  $(this).parent('p').siblings('p').text()
                  $('.newtitleVal').val( oldName )
                  layer.open({
                          type: 1,
                          area: '400px',
                          title: ['修改相片', 'font-size:18px;text-align: center;'],
                          content: $('.changeListTable'),
                          btn:'确定',
                    });
                  $('.layui-layer-btn0').click(function() {
                      $.post(''+http_head+'/Lectures/Update_LecturePhoto.ashx', {
                        "userGuid":dataInfo.Guid,
                        "lecturePhotoId":imgId,
                        "lecturePhotoTitle":$('.newtitleVal').val()
                      }, function(data) {
                        $('.imgDetails div').remove()
                            loadImg(0)
                      });
                  })
              });
               // 图片删除
              $('.deleteImg').click(function() {
                  var imgId = $(this).parent('p').attr('id');
                  layer.open({
                            type: 1,
                            area: '400px',
                            title: ['修改相册', 'font-size:18px;text-align: center;'],
                            content: $('.deleteImgTable'),
                            btn:'确定',
                      });
                    $('.layui-layer-btn0').click(function() {
                          $.post(''+http_head+'/Lectures/Delete_Lecture_Photo.ashx', {
                            "userGuid":dataInfo.Guid,
                            "lecturePhotoId":imgId,
                            "menuId":sourceT
                          }, function(data) {
                            $('.imgDetails div').remove()
                                loadImg(0)
                          });
                      })
              })
              // 设为封面
              $('.setFront').click(function() {
                   var imgId = $(this).parent('p').attr('id');
                   var imgurl =  $(this).parent('p').siblings('img').attr('src') ;
                   $.post(''+http_head+'/Lectures/Set_HomeImage.ashx', {
                            "userGuid":dataInfo.Guid,
                            "imageId":imgId,
                            "menuId":sourceT
                          }, function(data) {
                            var dataFront = JSON.parse(data)
                            if ( dataFront.status == 200 ) {
                              layer.msg('设置成功', {
                            time: 1000,
                          });
                              $('.imgArea div').remove()
                              loadList(0)
                            }
                          });
              });
              // 查看大图
              $('.imgDetails>div img').click(function() {
                                      layer.photos({
                                          photos: {
                                               "title": "大图",
                                               "id": 4,
                                               "start": 0,
                                               "data": [
                                   {"alt": "原图","pid": 1,
                                   "src": $(this).attr('src'),"thumb": $(this).attr('src')},
                                                           ]
                                                     },
                                                    anim: 5
                                                   });
                                           });
            });
    }
  // 创建新相册
      $('.newphoto').click(function() {
            layer.open({
                    type: 1,
                    area: '400px',
                    title: ['创建新相册', 'font-size:18px;text-align: center;'],
                    content: $('.addListTable'),
                    btn:'确定',
              });
              $('.layui-layer-btn0').click(function() {
                $.post(''+http_head+'/Lectures/Add_LecturePhoto_Menu.ashx', {
                  "userGuid":dataInfo.Guid,
                  "title":$('.titleVal').val()
                }, function(data) {
                  var dataTitle = JSON.parse(data)
                  if ( dataTitle.status == 200 ) {
                      layer.msg('添加成功', {
                                        time: 1000,
                                      });
                      $('.imgArea div').remove()
                      loadList(0)
                  }
                });
              });
      });
      function ajaxFileUpload() {
             var  Pformdata= new FormData();
             var dataimg=$("#file")[0].files;
             Pformdata.append('userGuid',dataInfo.Guid);
             Pformdata.append ('menuId',menuId);
             for (var i = 0; i < dataimg.length; i++) {
                Pformdata.append('file', dataimg[i]);
             }
             $.ajax({
                           type : 'post',
                           url : http_head+'/Lectures/Add_LecturePhoto.ashx',
                           data : Pformdata,
                           cache : false,
                           processData : false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
                           contentType : false, // 不设置Content-type请求头
                           success : function(data){
                            var data2 = JSON.parse(data)
                            if (data2.status == 200) {
                              $('.imgDetails div').remove();
                              $('.imgArea div').remove();
                                 loadList(0)
                                 loadImg(0)
                            }
                           },
                         error:function()
                         {

                         }
                       });
          }
      // 修改头像
      function ajaxFileUpload2() {
             var  Iformdata= new FormData();
             var dataimg=$("#file2")[0].files;
             Iformdata.append('userGuid',dataInfo.Guid);
              for (var i = 0; i < dataimg.length; i++) {
                  Iformdata.append('file', dataimg[i]);
               }
             $.ajax({
                           type : 'post',
                           url : http_head+'/Lectures/Update_LectureImage_ByCreater.ashx',
                           data : Iformdata,
                           cache : false,
                           processData : false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
                           contentType : false, // 不设置Content-type请求头
                           success : function(data){
                            console.log( data )
                            var data3 = JSON.parse(data)
                            if (data3.status ==200) {
                                layer.msg('修改成功', {
                                                time: 1000,
                                               });
                                 loadAll()
                            }else{
                              console.log( data )
                                       layer.msg('修改失败', {
                                                time: 1000,
                                               });
                            }
                           },
                         error:function()
                         {


                         }
                       });
          }
    //  需求操作
    var dataNeed;
    var arr_Need = [];
    function needOption(page){
      $.post(''+http_head+'/Training/Get_trainDems_teacher.ashx', {
        "theCategory":$('.ResearchField').val(),
        "page":page,
      }, function(data) {
        dataNeed = JSON.parse(data);
           for (var i = 0; i < dataNeed.items.length; i++) {
             arr_Need.push(dataNeed.items[i])
           }
           if ( dataNeed.items.length > 9 ) {
                  $('.needDiv .noMoreBtn').hide()
                  $('.needDiv .loadMore').show()
                  $('.needDiv .loadMore').click(function() {
                      needOption(dataNeed.nextpage)
                  });
              }else{
                  $('.needDiv .noMoreBtn').show()
                  $('.needDiv .loadMore').hide()
              }
              loadNeed(arr_Need)
      });
    }
    // 加载需求
    function loadNeed(arr_need){
          $('#needListTable').bootstrapTable({
                                    url: arr_need,
                                    columns: [
                                    {
                                        field: 'theTheme',
                                        title: '主题',
                                        align: 'center',
                                        valign: 'middle',
                                    },
                                    {
                                      field: 'theCategory',
                                      title: '类别',
                                      formatter:labelFormatter2,
                                      align: 'left',
                                      valign: 'middle'
                                    },
                                    {
                                        field: 'time',
                                        title: '时间',
                                        align: 'center',
                                        valign: 'middle',
                                        formatter :timeFormatter2,
                                    },
                                    {
                                        field: 'budgetedExpense',
                                        title: '预算(元)',
                                        align: 'center',
                                        valign: 'middle'
                                    },
                                    {
                                      field: 'option',
                                      title: '操作',
                                      align: 'center',
                                      valign: 'middle',
                                      formatter : lookFormatter,
                                      events: lookEvents
                                    }
                                    ]
                                });
                     $("#needListTable").bootstrapTable('load', arr_need);
                     function labelFormatter2(e,value, row, index){
                        var arr_area2 = [];
                        var str = "";
                        str = ( value.theCategory ).split(",")
                        for (var i = 0; i < str.length; i++) {
                          arr_area2.push('<span class="researchField">《'+str[i]+'》</span>')
                        }
                        for (var i = 0; i < arr_area2.length; i++) {
                        return [
                        '<p>',
                        arr_area2,
                        '</p>',
                        ].join('');
                        }
                      };
                     function timeFormatter2(e,value, row, index){
                        var timeAll;
                        var time1 = (value.thedateStart).split("T")[0];
                        var time2 = (value.thedateEnd).split("T")[0];
                        timeAll = time1 +"~"+time2
                        return [
                        timeAll
                        ].join('');
                      }
                    function lookFormatter(e,value, row, index){
                      return [
                               '<a class="lookNeed"  title="查看详情">',
                               '<span id="lookNeed">查看详情</span>',
                               '</a>  ',
                            ].join('');
                    }
    }
    window.lookEvents = {
                     'click .lookNeed': function (e, value, row, index) {
                      window.open("../html/needDetails.html?id="+row.Id+"")
                     }
                   }
          $(function() {
              var elm = $('.mainTextLeft');
              var startPos = $(elm).offset().top;
              $.event.add(window, "scroll", function() {
                  var p = $(window).scrollTop();
                  $(elm).css('position',((p) > startPos) ? 'fixed' : 'static');
                  $(elm).css('top',((p) > startPos) ? '0px' : '');
                  $('.mainTextRight').css({
                    marginLeft: '209px',
                    marginTop: '-294px'
                  });
              });
          });
})
