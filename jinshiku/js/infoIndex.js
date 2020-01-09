$(document).ready(function(){
      var dataC = sessionStorage.getItem("GHY_teaInfo");
      if (dataC == null) {
           location.href ="../html/teacherIndex.html"
      }
      var dataC2 = localStorage.getItem("GHY_login");
       if (dataC2 != null) {
          var dataInfo2 = JSON.parse(dataC2);
          $('.loginName').text(dataInfo2.username)
          }else{
            $('.loginBtn').show();
            $('.infoBtn').hide();
            $('.quitOut').hide();
          }
      var dataInfo;
      $.post(''+http_head+'/Lectures/Get_Lecture_ByCreater.ashx', {
            "userGuid":dataC
            }, function(data) {
                   dataInfo = JSON.parse(data);
                  $('.info img').attr('src', dataInfo.items.headimage);
                  $('.name').text(dataInfo.items.realname)
                     var arr = [];
                     var str = "";
                     arr.push((dataInfo.items.ResearchField).split(","))
                     for (var i = 0; i < arr[0].length; i++) {
                        str += "《"+arr[0][i]+"》"+" ";
                     }
                   $('.researchField').text(str);
                   loadList1(0)
      });
      // 讲师详情
      $('.mainInfo').click(function(){
              $(this).css('backgroundColor', '#f00').siblings('li').css('backgroundColor', '#29e');
              $('.mainInfoDiv').show().siblings('div').hide()
              $('.tName').text(dataInfo.items.realname)
              $('.tSex').text(dataInfo.items.sex)
              $('.courses').text(dataInfo.items.courses);
              $('.CooperativePrice').text(dataInfo.items.CooperativePrice);
              $('.addressDet').text(dataInfo.items.address);
              $('.WorkingMethod').text(dataInfo.items.TeachStyle);
              $('#editor').html(dataInfo.items.LecturerBackground);
              $('#editor2').html(dataInfo.items.CustCase);
              $('#editor3').html(dataInfo.items.ServiceCom);
      });
      // 查看讲师联系方式
      $('.phoneNumber').click(function() {
                    layer.open({
                        type: 1,
                        area: '400px',
                        title: ['讲师联系方式', 'font-size:18px;text-align: center;'],
                        content: $('.teacherContent'),
                    });
                    $.post(''+http_head+'/Lectures/Get_Lecture_Tel.ashx', {
                      "lectureGuid":dataInfo.items.userGuid
                    }, function(data) {
                      var teaContent = JSON.parse(data);
                      $('.phone').text(teaContent.items.phone)
                      $('.AssistantPhone').text(teaContent.items.AssistantPhone)
                      $('.wechat').text(teaContent.items.wechat)
                      $('.QQ').text(teaContent.items.QQ)
                      $('.email').text(teaContent.items.email)
                    });
      });
      // 课程列表
      $('.course').click(function() {
            $(this).css('backgroundColor', '#f00').siblings('li').css('backgroundColor', '#29e');
            $('.coursesDiv').show().siblings('div').hide();
            if ( $('#showList tr').length <= 1  ) {
                arr_course.splice(0,arr_course.length)
                loadCourse(0);
            }
      });
      // 视频列表
      $('.video').click(function() {
            $(this).css('backgroundColor', '#f00').siblings('li').css('backgroundColor', '#29e');
            $('.videoDiv').show().siblings('div').hide();
            if ( $('#videoListTable tr').length <= 1  ) {
                arr_video.splice(0,arr_video.length)
                loadVideos(0)
            }
      });
      // 相册列表
      $('.photoes').click(function() {
            $(this).css('backgroundColor', '#f00').siblings('li').css('backgroundColor', '#29e');
            $('.photoesDiv').show().siblings('div').hide();
            arr_photo.splice(0,arr_photo.length);
            $('.imgAreaLeft>div').children('img').eq(0).attr('id', 'firstImg');
            document.getElementById('firstImg').click();
      });
      // 文章列表
      $('.circle').click(function() {
            $(this).css('backgroundColor', '#f00').siblings('li').css('backgroundColor', '#29e');
            $('.circleDiv').show().siblings('div').hide();
            if ( $('#circleList tr').length <= 1 ) {
              arr_circle.splice(0,arr_circle.length)
              loadCircle(0)
            }
      });
      // 加载课程函数
      var arr_course = [];
      function loadCourse(page){
            $.post(''+http_head+'/Lectures/course/Get_MyCourse.ashx', {
              "userGuid":dataInfo.items.userGuid,
              "page":page
            }, function(data) {
              var dataCourse = JSON.parse(data)
              for (var i = 0; i < dataCourse.items.rows.length; i++) {
                arr_course.push(dataCourse.items.rows[i])
              }
              if ( dataCourse.items.rows.length >9 ) {
                      $('.coursesDiv .noMoreBtn').hide()
                      $('.coursesDiv .loadMore').show()
                         $('.coursesDiv .loadMore').click(function() {
                           loadCourse(dataCourse.items.page)
                         });
               }else{
                    $('.coursesDiv .noMoreBtn').show()
                    $('.coursesDiv .loadMore').hide()
               }

                  $('#showList').bootstrapTable({
                          url: arr_course,
                          columns: [
                          {
                             field: "operate1",
                             title: "序号",
                             valign: 'middle',
                             align:'center',
                             formatter: function (value, row, index) {
                                      return index + 1;
                                  }
                           },
                          {
                              field: 'courseTheme',
                              align: 'center',
                              valign: 'middle',

                          },
                          {
                              field: 'operate2',
                              formatter:teacherFormatter2,
                              align: 'left',
                              valign: 'middle',
                              events:lookMoreEvents,
                          },
                          {
                              field: 'operate3',
                              formatter:teacherFormatter3,
                              align: 'center',
                              valign: 'middle'
                          },
                          ]
                      });
                    $("#showList").bootstrapTable('load', arr_course);
            });
            function teacherFormatter2(e,value, row, index){
                    var arr_area = [];
                    var str = "";
                    str = ( value.courseType ).split(",")
                    for (var i = 0; i < str.length; i++) {
                      arr_area.push('<span class="researchField">《'+str[i]+'》</span>')
                    }
                    for (var i = 0; i < arr_area.length; i++) {
                    return [
                    '<p><span>研究领域 : </span>',
                    arr_area,
                    '</p>',
                    '<p><span>课程时长 : </span><span>'+value.courseTimes+'</span></p>',
                    '<p><span>课程对象 : </span><span>'+value.objecter+'</span></p>',
                    '<p><span>课程内容 : </span><span class="lookDetails" title="点击查看文章详情" >查看详情</span></p>',
                    ].join('');
                    }
            };
            function teacherFormatter3(e,value, row, index){
                    return [
                    '<a  class="moreOption">',
                    '<button class="joinCourse">加入课程</button>',
                    '<button class="buyCourse">订购课程</button>',
                    '</a>',
                    ].join('');
            };
            window.lookMoreEvents = {
                     'click .lookDetails': function (e, value, row, index) {
                      window.open("../html/courseDetails.html?id="+row.Id+"")
                     }
                   }
      }
      // 加载视频函数
      var arr_video = [];
      function loadVideos(page){
            $.post(''+http_head+'/Lectures/Get_LectureVideo_ByLecture.ashx', {
              "lectureGuid":dataInfo.items.userGuid,
              "page":page
              }, function(data) {
                var  dataFouce = JSON.parse(data);
                 for (var i = 0; i < dataFouce.items.rows.length; i++) {
                      arr_video.push(dataFouce.items.rows[i])
                    }
                    if ( dataFouce.items.rows.length >9 ) {
                            $('.videoDiv .noMoreBtn').hide()
                            $('.videoDiv .loadMore').show()
                            $('.videoDiv .loadMore').click(function() {
                              loadVideos(dataFouce.items.page)
                            });
                     }else{
                          $('.videoDiv .noMoreBtn').show()
                          $('.videoDiv .loadMore').hide()
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
                              '<p class="VideoName" title="点击播放视频"><span>视频标题 : </span>'+value.videoTitle+'</p>',
                              '<p><span>视频分类 : </span>',
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
            window.videoPlayEvents = {
              'click .VideoName': function (e, value, row, index) {
                       var str = JSON.stringify(row); // 将对象转换为字符串
                       sessionStorage.setItem("GHY_video",str);
                      var urlFront = (row.videoUrl).split("id")[1];
                      var urlBack = urlFront.split("==")[0];
                      var urlId = urlBack.substring(1)
                      window.open("../html/videoPlay.html?id="+urlId+"")
              }
            }
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
    }
    // 加载相册函数
    var arr_photo = [];
    function loadList(page){
          $.post(''+http_head+'/Lectures/Get_LecturePhoto_Menu.ashx', {
            "lectureGuid":dataInfo.items.userGuid,
            "page":page
            }, function(data) {
              var imgList = JSON.parse(data);
               for (var i = 0; i < imgList.items.rows.length; i++) {
                        arr_photo.push(imgList.items.rows[i])
                      }
                      if ( imgList.items.rows.length >9 ) {
                              $('.noMoreBtn').hide()
                              $('.loadMore').show()
                              $('.loadMore').click(function() {
                                      loadList(imgList.items.page)
                                  });
                       }else{
                            $('.noMoreBtn').show();
                            $('.loadMore').hide();
                       }
              $('#imgListTable').bootstrapTable({
                                url: arr_photo,
                                columns: [
                                {
                                  field: "number",
                                  title: "序号",
                                  valign: 'middle',
                                  align:'center',
                                  formatter: function (value, row, index) {
                                      return index + 1;
                                  },
                                },
                                {
                                    field: 'imageUrl',
                                    title: '相册封面',
                                    align: 'center',
                                    valign: 'middle',
                                    formatter:imgFormatter,
                                },
                                {
                                    field: 'title',
                                    title: '相册名称',
                                    align: 'center',
                                    valign: 'middle'
                                },
                                {
                                  field: 'option',
                                  title: '查看相册',
                                  formatter:lookPhotoFormatter,
                                  align: 'center',
                                  valign: 'middle',
                                  events:lookPhotoEvents
                                }
                                ]
                            });
                            $("#imgListTable").bootstrapTable('load', arr_photo);
          })
          function imgFormatter(e,value, row, index){
                                 return [
                                 '<img src="'+value.imageUrl+'" alt="" />'
                                  ].join('');
                            };
          function lookPhotoFormatter(e,value, row, index){
                                 return [
                                     '<a class="lookPhoto"  title="查看相册">',
                                     '<span id="lookPhoto">查看相册</span>',
                                     '</a>  ',
                                  ].join('');
                            };
          window.lookPhotoEvents = {
                     'click .lookPhoto': function (e, value, row, index) {
                      window.open("../html/imgDetails.html?id="+row.Id+"")
                     }
                   }
    }
    function loadList1(page){
      $('.imgAreaLeft div').remove()
          $.post(''+http_head+'/Lectures/Get_LecturePhoto_Menu.ashx', {
                "lectureGuid":dataInfo.items.userGuid,
                "page":page
                }, function(data) {
                   var imgList = JSON.parse(data);
                   for (var i = 0; i < imgList.items.rows.length; i++) {
                      $('.imgAreaLeft').append('<div class="" id="'+imgList.items.rows[i].Id+'"><img src="'+imgList.items.rows[i].imageUrl+'" alt="暂无" /><p>'+imgList.items.rows[i].title+'</p></div>')
                }
                $('.imgArea>div img').click(function() {
                   $(this).parent('div').css('backgroundColor', '#ddd').siblings('div').css('backgroundColor', '#fff')
                    var guid = $(this).parent('div').attr('id')
                    $('.imgAreaRight div').remove()
                    $.post(''+http_head+'/Lectures/Get_LectureMenu_Photo.ashx',{
                            "menuId":guid,
                            "page":page
                          }, function(data) {
                            var imgList = JSON.parse(data);
                            for (var i = 0; i < imgList.items.rows.length; i++) {
                                  $('.imgAreaRight').append('<div id="'+imgList.items.rows[i].Id+'" class="pull-left"><img src="'+imgList.items.rows[i].imageUrl+'" alt="" /><p>'+imgList.items.rows[i].imageName+'</p></div>')
                            }
                            $('.imgAreaRight>div img').click(function() {
                                                         layer.photos({
                                                              photos: {
                                                                  "title": "大图",
                                                                  "id": 4,
                                                                  "start": 0,
                                                                  "data": [
                                    {"alt": "原图","pid": 1,"src": $(this).attr('src'),"thumb": $(this).attr('src')},
                                                                            ]
                                                              },
                                                              anim: 5
                                                            });
                                                       });
                    });
                })
           })
     }
    // 加载文章函数
    var arr_circle = [];
    function loadCircle(page){
      $.post(''+http_head+'/Lectures/article/Get_Article_ByLecture.ashx', {
        "lectureGuid":dataInfo.items.userGuid,
        "page":page
      }, function(data) {
         var dataCircle = JSON.parse(data);
          for (var i = 0; i < dataCircle.items.rows.length; i++) {
                      arr_circle.push(dataCircle.items.rows[i])
                    }
                    if ( dataCircle.items.rows.length >9 ) {
                            $('.circleDiv .noMoreBtn').hide()
                            $('.circleDiv .loadMore').show()
                            $('.circleDiv .loadMore').click(function(event) {
                              loadCircle(dataCircle.items.page)
                            });
                     }else{
                          $('.circleDiv .noMoreBtn').show();
                          $('.circleDiv .loadMore').hide();
                     }
                      $('#circleList').bootstrapTable({
                          url: arr_circle,
                          columns: [
                           {
                             field: "operate1",
                             title: "序号",
                             valign: 'middle',
                             align:'center',
                             formatter: function (value, row, index) {
                                      return index + 1;
                                  }
                           },
                          {
                            field: 'image',
                            title: '文章标题',
                            valign: 'middle',
                            align:'center',
                            formatter:imgFormatter,
                            events:optionImgEvents
                          },
                          {
                            field: 'Label',
                            valign: 'middle',
                            align:'left',
                            formatter:labelFormatter,
                            events:optionEvents
                          }
                          ]
                      });
                      $("#circleList").bootstrapTable('load', arr_circle);
                      function imgFormatter(e,value, row, index){
                           return [
                            '<img src="'+value.image+'" alt="" />'
                            ].join('');
                      };
                      function labelFormatter(e,value, row, index){
                        var time = (value.createTime).split("T")[0];
                         var arr_area = [];
                        var str = "";
                        str = ( value.Label ).split(",")
                        for (var i = 0; i < str.length; i++) {
                          arr_area.push('<span class="researchField">《'+str[i]+'》</span>')
                        }
                        for (var i = 0; i < arr_area.length; i++) {
                        return [
                        '<p class="circleTitle" title="查看文章详情"><span>文章标题 : </span>'+value.title+'</p>',
                        '<p><span>文章分类 : </span>',
                        arr_area,
                        '</p>',
                        '<p><span>发布时间 : </span>'+time+'</p>',
                        '<p id="'+value.Id+'"><span>文章内容 : </span><a class="circleContent" title="点击查看文章详情">'+value.textContent+'</a></p>'
                        ].join('');
                        }
                      };
      });
  }
    window.optionImgEvents = {
      'click img': function (e, value, row, index) {
        window.open("../html/circleDetails.html?id="+row.Id+"")
      }
    }
    window.optionEvents = {
                     'click .circleContent': function (e, value, row, index) {
                          window.open("../html/circleDetails.html?id="+row.Id+"")
                     },
                     'click .circleTitle': function (e, value, row, index) {
                          window.open("../html/circleDetails.html?id="+row.Id+"")
                     }
            }

})
