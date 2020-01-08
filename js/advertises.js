$(document).ready(function(){
      var zhaopinPlace ="全部";
     var zhaopinType;
     var zhaopinLeibie ="全部";
function postLoad(page,place,type,category){
   $.post(''+EQD_url+'/Extended/Get_EQDRecruit.ashx', {
          "page":page,
          "workPlace":place,
          "recruitType":type,
          "positionCategory":category
        }, function(data) {
          console.log(data);
          var dataPost = JSON.parse(data);
          $('#postDetailsTable').bootstrapTable({
                url: dataPost.items,
                columns: [
                {
                    field: 'positionName',
                    title: '职位'
                },
                {
                    field: 'positionCategory',
                    title: '职位类别'
                },
                {
                    field: 'recruitType',
                    title: '职位类型'
                },
                 {
                    field: 'workPlace',
                    title: '工作地点',
                },
                {
                    field: 'createTime',
                    title: '发布时间',
                    formatter: postTFormatter
                      }]
      });
             $("#postDetailsTable").bootstrapTable('load', dataPost.items);
        });
        function postTFormatter(value, row,index){
                   var postT = (row.createTime).split("T")[0];
            return[
                    postT
             ].join('');
      }
}
  $("#postDetailsTable").on('click-row.bs.table',function( e,field,value, row, $element){
    console.log(field);
      location.href ="../html/postDetails.html?id="+field.Id;
  })
    postLoad(0);
     $('.typePost a').click(function(){
         $(this).parent('li').each(function () {//移除其余非点中状态
                $('.typePost a').css('color', '#666');
          });
          $(this).css('color', '#29e');//给所点中的增加样式
          zhaopinType = $(this).text();
          console.log(zhaopinType);//输出所点的a的内容
          postLoad(0,zhaopinPlace,zhaopinType,zhaopinLeibie);
          if (zhaopinLeibie =="全部" &&  zhaopinPlace == "全部"  ) {
           postLoad(0,"",zhaopinType);
        }else if( zhaopinLeibie =="全部" ){
           postLoad(0,zhaopinPlace,zhaopinType);
        }else if( zhaopinPlace == "全部" ){
             postLoad(0,"",zhaopinType,zhaopinLeibie);
        }else{}

    })
     $('.placePost a').click(function(){
         $(this).parent('li').each(function () {//移除其余非点中状态
                $('.placePost a').css('color', '#666');
          });
          $(this).css('color', '#29e');//给所点中的增加样式
          zhaopinPlace = $(this).text()
          console.log(zhaopinLeibie);//输出所点的a的内容
          if (zhaopinLeibie =="全部" &&  zhaopinPlace == "全部"  ) {
           postLoad(0,"",zhaopinType);
        }else if( zhaopinLeibie =="全部" ){
           postLoad(0,zhaopinPlace,zhaopinType);
        }else if( zhaopinPlace == "全部" ){
             postLoad(0,"",zhaopinType,zhaopinLeibie);
        }
    })
     $('.leibiePost a').click(function(){
         $(this).parent('li').each(function () {//移除其余非点中状态
                $('.leibiePost a').css('color', '#666');
          });
          $(this).css('color', '#29e');//给所点中的增加样式
          zhaopinLeibie = $(this).text();
          console.log(zhaopinPlace)
          console.log( zhaopinPlace == "全部" )
           if (zhaopinLeibie =="全部" &&  zhaopinPlace == "全部"  ) {
           postLoad(0,"",zhaopinType);
        }else if( zhaopinLeibie =="全部" ){
           postLoad(0,zhaopinPlace,zhaopinType);
        }else if( zhaopinPlace == "全部" ){
             postLoad(0,"",zhaopinType,zhaopinLeibie);
        }
    })
})
