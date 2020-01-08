$(document).ready(function(){
  var dataL=   localStorage.getItem("GHY_login");
  console.log(dataL)
  var dataInfo = JSON.parse(dataL);
  function lookDelete(){
        $.post('https://www.eqid.top:8009/Articles/Get_Article_Recycle.ashx', {
          "userGuid":dataInfo.Guid
        }, function(data) {
          var datacomCon = JSON.parse(data);
        $('#recycleTable').bootstrapTable({
                          url: datacomCon.items,
                          pagination: true,
                          pageSize: 8,
                          columns: [
                                      {
                                          field: 'createTime',
                                          title: '发布时间',
                                          formatter:createFormatter
                                      },
                                      {
                                          field: 'deleteTime',
                                          title: '删除时间',
                                           formatter:deleteFormatter
                                      },
                                      {
                                          field: 'title',
                                          title: '文章标题'
                                      },
                                      {
                                          field: 'option',
                                          title: '更多操作',
                                          formatter:optionFormatter,
                                          events:optionEvents
                                      }
                          ]
                      });
                      $("#recycleTable").bootstrapTable('load', datacomCon.items);
                     function createFormatter(e,value, row, index){
                                var timeDay = (value.createTime).split("T")[0];
                                var timeDay2 = (value.createTime).split("T")[1];
                                var timeSec = timeDay2.substring(0,5)
                                   return [
                                              timeDay+"/"+timeSec
                                    ].join('');
                      };
                      function deleteFormatter(e,value, row, index){
                                var timeDay = (value.deleteTime).split("T")[0];
                                var timeDay2 = (value.deleteTime).split("T")[1];
                                var timeSec = timeDay2.substring(0,5)
                                   return [
                                              timeDay+"/"+timeSec
                                    ].join('');
                      };
                      function optionFormatter(e,value, row, index){
                             return [
                               '<a class="delete"  title="彻底删除">',
                               '<span id="delete">彻底删除</span>',
                               '</a>  ',
                               '<a class="recovery"  title="恢复文章">',
                               '<span id="recovery">恢复文章</span>',
                               '</a>  ',
                               '<a class="more"  title="查看详情">',
                               '<span id="more">查看详情</span>',
                               '</a>  ',
                              ].join('');
                        };
                          });
  }

     lookDelete()
     var E = window.wangEditor;
            var editor = new E('.circleDetails');

            editor.create();
  window.optionEvents = {
                     'click .delete': function (e, value, row, index) {
                              console.log(row)
                                  layer.open({
                                    type: 1,
                                    area: '600px',
                                    title: ['彻底删除', 'font-size:18px;text-align: center;'],
                                    content: $(".deleteTable"),
                                    btn:'确定',
                                    shade: false
                                  });
                                  $('.layui-layer-btn0').click(function() {
                                      $.post('https://www.eqid.top:8009/Articles/Delete_ArticleRecycle.ashx', {
                                        "userGuid":dataInfo.Guid,
                                        "articleId":row.Id
                                      }, function(data) {
                                        console.log(data);
                                        var dataD = JSON.parse(data);
                                        if ( dataD.status == 200 ) {
                                          layer.msg('删除成功', {
                                        time: 1000,
                                      });
                                        lookDelete()
                                        }
                                      });
                                  });
                     },
                     'click .recovery': function (e, value, row, index) {
                            console.log(row)
                                layer.open({
                                  type: 1,
                                  area: '600px',
                                  title: ['撤回文章', 'font-size:18px;text-align: center;'],
                                  content: $(".recoveryTable"),
                                  btn:'确定',
                                  shade: false
                                });
                                $('.layui-layer-btn0').click(function() {
                                    $.post('https://www.eqid.top:8009/Articles/Article_Recovery.ashx   ', {
                                      "userGuid":dataInfo.Guid,
                                      "articleId":row.Id
                                    }, function(data) {
                                      console.log(data);
                                      var dataR = JSON.parse(data);
                                      if ( dataR.status == 200 ) {
                                        layer.msg('恢复成功', {
                                      time: 1000,
                                    });
                                      lookDelete()
                                      }
                                    });
                                });
                     },
                     'click .more': function (e, value, row, index) {
                      console.log(row)
                          layer.open({
                            type: 1,
                            area:[ '1200px','500px'],
                            title: ['文章详情', 'font-size:18px;text-align: center;'],
                            content: $(".circleDetails"),
                            shade: false
                          });
                           editor.txt.html(row.content);
                           editor.$textElem.attr('contenteditable', false)
                     }
                   }
})
