$(document).ready(function(){
    var href = location.href;
    var hrefDetails = decodeURIComponent(href);
    var videoName = hrefDetails.split("=")[1];
    $('#searchVal').val(videoName)
  var dataCircle =   localStorage.getItem("GHY_login");
      var dataC = JSON.parse(dataCircle);
  search()
  // 加载视频分类
  $.post(''+http_head+'/Option_AreasAnd.ashx', {"type": 45}, function(data) {
    if ( $('.listLeft p').size() ==1 ) {
      for (var i = 0; i < data.length; i++) {
          $('.listLeft').append('<span>'+data[i].name+'</span>')
      }
      $('.listLeft span').hover(function() {
        $(this).css('backgroundColor', '#29e').siblings('span').css('backgroundColor', '#fff');
      }, function() {
        $(this).css('backgroundColor', '#fff')
      });
    }else{

      }
    });
  // 加载课程函数
  var arr_course = [];
      function loadCourse(page){
            $.post(''+http_head+'/Lectures/course/Get_MyCourse.ashx', {
              "userGuid":dataC.Guid,
              "page":page
            }, function(data) {
              var dataCourse = JSON.parse(data);
              for (var i = 0; i < dataCourse.items.rows.length; i++) {
                arr_course.push(dataCourse.items.rows[i])
              }
              loadTable(arr_course)
              if ( dataCourse.items.rows.length > 9 ) {
                  $('.noMoreBtn').hide()
                  $('.loadMore').show()
                  $('.loadMore').click(function() {
                      loadCourse(dataCourse.items.page)
                  });
              }else{
                  $('.noMoreBtn').show()
                  $('.loadMore').hide()
              }
               });

      }
      // 加载表格
          function loadTable(dataCourse){
               $('#coursesList').bootstrapTable({
                          url: arr_course,
                          columns: [
                          {
                              field: 'courseTheme',
                              title:'课程题目'
                          },
                          {
                              field: 'courseType',
                              title:'课程类别'
                          },
                          {
                              field: 'objecter',
                              title:'受众对象'
                          },
                          {
                              field: 'createTime',
                              title:'创建时间',
                              formatter:createTimeFormatter3
                          },
                            {
                              field: 'option',
                              title:'查看详情',
                              formatter:moreFormatter3,
                              events:moreEvents
                          }
                          ]
                      });
                      $("#coursesList").bootstrapTable('load', arr_course);
                      function createTimeFormatter3(e,value, row, index){
                            var time1 = (value.createTime).split("T")[0];
                              return [
                              time1
                              ].join('');
                      };
                      function moreFormatter3(e,value, row, index){
                              return [
                                  '<a class="delete"  title="删除"  target="black">',
                                  '<span id="delete">删除</span>',
                                  '</a>',
                                  '<a class="more"  title="查看详情"  target="black">',
                                  '<span id="more">查看详情</span>',
                                  '</a>',
                                   '<a class="change"  title="修改"  target="black">',
                                  '<span id="change">修改</span>',
                                  '</a>',
                              ].join('');
                      };
             }
                  window.moreEvents = {
                           'click .more': function (e, value, row, index) {
                            window.open("../html/courseDetails.html?id="+row.Id+"")
                           },
                            'click .delete': function (e, value, row, index) {
                               layer.open({
                                        type: 1,
                                        area: '400px',
                                        title: ['研究领域', 'font-size:18px;text-align: center;'],
                                        content: $('.deleteCourse'),
                                        btn:'确定',
                                  });
                               $('.layui-layer-btn0').click(function() {
                                     $.post(''+http_head+'/Lectures/course/Delete_LectureCourse.ashx', {
                                          "userGuid":dataC.Guid,
                                          "courseId":row.Id
                                     }, function(data) {
                                      $("#coursesList").bootstrapTable('removeAll')
                                       loadCourse(0)
                                     });
                               });
                            },
                            'click .change': function (e, value, row, index) {

                            },
                         }
  // 搜索课程
  $('.input-group-addon').click(function() {
       if ( $('#searchVal').val().length == 0  ) {
                                  layer.msg('搜索关键字不能为空', {
                                                              time: 1000,
                                                            });
                              }else{
                              search()
                              }
  });
  $('#searchVal').keydown(function(event) {
                       if (event.keyCode === 13){
                          if ( $('#searchVal').val().length == 0  ) {
                              layer.msg('搜索关键字不能为空', {
                                                          time: 1000,
                                                        });
                          }else{
                          search()
                          }
                    }
            });
  function search(){
         $.post(''+http_head+'/Lectures/course/Get_LectureCourse_BySearch.ashx', {
          "para":$('#searchVal').val(),
          "page":0,
          "type":"html"
          }, function(data) {
            var dataSearch = JSON.parse(data);
             arr_course.splice(0,arr_course.length)
             for (var i = 0; i < dataSearch.items.rows.length; i++) {
               arr_course.push(dataSearch.items.rows[i])
             }
             if ( dataSearch.items.rows.length >9 ) {
                                            $('.noMoreBtn').hide()
                                            $('.loadMore').show()
                                            $('.loadMore').click(function() {
                                                    loadTable(dataSearch.items.page)
                                                });
                                       }else{
                                            $('.noMoreBtn').show()
                                            $('.loadMore').hide()
                                       }
            loadTable(arr_course)
          });
  }
})
