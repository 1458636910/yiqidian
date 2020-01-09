$(document).ready(function(){
    $('.seaBtn').click(function() {
      if ( $('.inputVal').val().length == 0 ) {
        layer.msg("搜索关键字不能为空", {
                                                  time: 1000,
                                                });
      }else{
        loadVideo(0)
      }
    });
      $('.inputVal').keydown(function(event) {
                       if (event.keyCode === 13){
                          if ( $('.inputVal').val().length == 0  ) {
                              layer.msg('搜索关键字不能为空', {
                                                          time: 1000,
                                                        });
                          }else{
                          loadVideo(0)
                          }
                    }
            });
    function loadVideo(page){
      $.post(''+http_head+'/Lectures/Get_LectrueVideo_BySearch.ashx', {
        "para": $('.inputVal').val(),
        "page":0
            }, function(data) {
             var dataReault = JSON.parse(data)
                  $('#showVideoList').bootstrapTable({
                          url: dataReault.items.rows,
                          columns: [
                          {
                              field: 'operate1',
                              formatter:videoFormatter1
                          },
                          {
                              field: 'operate2',
                              formatter:videoFormatter2
                          }
                          ]
                      });
          $("#showVideoList").bootstrapTable('load', dataReault.items.rows);
      });
      function videoFormatter1(e,value, row, index){
        var imgurl =  value.videoImage;
        var title = value.videoTitle
                  return [
                   '<img class="imgHead" src='+imgurl+' alt=""/>'
                   // '<p class="videoTitle"><span>'+title+'</span></p>'
                  ].join('');
          };
          function videoFormatter2(e,value, row, index){
            if ( value.describe.length >80 ) {
              var describe = (value.describe).substring(0,80)
            }else{
             describe = value.describe;
            }
             var title = value.videoTitle;
             var arr = [];
             var str = "";
             arr.push((value.label).split(","))
             for (var i = 0; i < arr[0].length-1; i++) {
                str += "《"+arr[0][i]+"》"+" ";
             }
                  return [
                  '<p class="videoTitle"><span>'+title+'</span></p>',
                  '<p><span>视频类别 :</span><span class="videoLable">'+str+'</span></p>',
                  '<p><span>视频简介 :</span><span>'+describe+'</span></p>'
                  ].join('');
          };
  }
})

