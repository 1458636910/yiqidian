$(document).ready(function(){
    $('.seaBtn').click(function() {
      if ( $('.inputVal').val().length == 0 ) {
        layer.msg("搜索关键字不能为空", {
                                                  time: 1000,
                                                });
      }else{
      function loadTeacher(){
          $.post('https://www.eqid.top:8009/Lectures/Get_Lecture_BySearch.ashx', {"para": $('.inputVal').val()}, function(data) {
           console.log(data)
           var dataReault = JSON.parse(data)
           console.log( dataReault.items.length )
           if (  dataReault.items.length == 0 ) {
              layer.msg("没有您搜索的结果", {
                                                      time: 1000,
                                                    });
           }else{
              $('#teachershowList').bootstrapTable({
                              url: dataReault.items,
                              columns: [
                              {
                                  field: 'realname',
                                  title: '讲师姓名',
                              },
                              {
                                  field: 'ResearchField',
                                  title: '研究领域',
                              },
                              {
                                field: 'courses',
                                  title: '所讲课程',
                              },
                              {
                                field: 'CooperativePrice',
                                  title: '课程费用',
                              },
                              {
                                field: 'AssistantPhone',
                                  title: '助理电话',
                              }
                              ]
                          });
                          $("#teachershowList").bootstrapTable('load', dataReault.items);
           }
      });
      }
    }
})
  })
