$(document).ready(function(){
        console.log( data1 )
        var arr_img = [];
        var arr_imgUrl = [];
          var imgUrl,data3Leader;
    //
      var userAgent = navigator.userAgent;//用于判断浏览器类型
      var fileList;
      $(".file1").change(function () {
          //获取选择图片的对象
            ajaxFileUpload2()
          var docObj =$(this)[0];
          var picDiv=$(this).parents(".picDiv");
          //得到所有的图片文件
           fileList = docObj.files;
          for (var i = 0; i < fileList.length; i++) {
              arr_img.push(fileList[i])
              var picHtml="<div class='imageDiv form-inline'><img id='img" + fileList[i].name + "'  /><p><span>姓名</span><input type='text' / class='form-control' id='leaderName'></p><p><span>职务</span><input type='text' / class='form-control' id='leaderPost'></p> <div class='cover1'><i class='delbtn'>删除</i></div></div>"
              picDiv.prepend(picHtml);
              var imgObjPreview = document.getElementById("img"+fileList[i].name);
              if (fileList && fileList[i]) {
                  //图片属性
                  imgObjPreview.style.display = 'block';
                  imgObjPreview.style.width = '320px';
                  imgObjPreview.style.height = '296px';
                  //imgObjPreview.src = docObj.files[0].getAsDataURL();
                  //火狐7以上版本不能用上面的getAsDataURL()方式获取，需要以下方式
                  if(userAgent.indexOf('MSIE') == -1){//IE以外浏览器
                      imgObjPreview.src = window.URL.createObjectURL(docObj.files[i]);   //获取上传图片文件的物理路径
                  }else{//IE浏览器
                      if(docObj.value.indexOf(",")!=-1){
                          var srcArr=docObj.value.split(",");
                          imgObjPreview.src = srcArr[i];
                      }else{
                          imgObjPreview.src = docObj.value;
                      }
                  }
              }
          }
          console.log( arr_img )
          $('.addImages').hide()
      });
    /*删除功能*/
    $(document).on("click",".delbtn",function () {
         var arr_img2 = [];
         var s =  arr_img.indexOf(fileList[0]);
         var arrLength = Number(arr_img.length)
         arr_img2 =  arr_img.splice( Number(arr_img.length)-s,1)
         console.log( arr_img )
         var _this=$(this);
         _this.parents(".imageDiv").remove();
    });
  $('.qiyedream').click(function() {
      $(this).addClass('pcheck').siblings('p').removeClass('pcheck');
      $('.qiyeDream').show().siblings('div').hide();
      loadComCulture()
});

     $('.choosetemple ul li').hover(function() {
       $(this).children('ul').show().siblings('li').children('ul').hide()
        $(this).children('ul').css('zIndex', '2000');
     }, function() {
       $(this).children('ul').hide()
     });
    //  标题加内容
    $('.choosetemple ul li').eq(1).click(function() {
        layer.open({
                          type: 1,
                          area: ['800px','500px'],
                          title: ['添加模板', 'font-size:18px;'],
                          content: $('.addtempleTable'),
                          btn :"确定",
                          yes: function(index, layero){
                              console.log( index )
                              if ( $('.titleVal').val().length >0 && $('.contentAdd').val().length >0 ) {
                              $.post(''+EQD_url+'/Com/ComCulture/Add_ComCulture.ashx', {
                                "userGuid" :data1.Guid,
                                "comid" :data1.companyId,
                                "type" :1,
                                "title" : $('.titleVal').val(),
                                "upperItemId" : 0,
                                "picture" :" ",
                                "content" : $('.contentAdd').val()
                              }, function(data) {
                                console.log( data )
                                loadComCulture()
                                $('.titleVal').val("")
                                $('.contentAdd').val("")
                              });
                              layer.close(layer.index);
                          }else{
                            layer.msg('请把信息完善', {
                                time: 1000,
                              });
                          }

                          }
                       });
                    $('.layui-layer-close').click(function() {
                          $('.titleVal').val("")
                          $('.contentAdd').val("")
                    });
  });

  // 标题模板
    $('.choosetemple ul li').eq(2).click(function() {
        layer.open({
                          type: 1,
                          area: ['800px','500px'],
                          title: ['添加模板', 'font-size:18px;'],
                          content: $('.addtempleTable3'),
                          btn :"确定",
                          yes: function(index, layero){
                              console.log( index )
                              if ( $('.titleVal3').val().length > 0 ) {
                                      $.post(''+EQD_url+'/Com/ComCulture/Add_ComCulture.ashx', {
                                        "userGuid" :data1.Guid,
                                        "comid" :data1.companyId,
                                        "type" :1,
                                        "title" : $('.titleVal3').val(),
                                        "upperItemId" : 0,
                                        "picture" :" ",
                                        "content" : " "
                                      }, function(data) {
                                        console.log( data )
                                        loadComCulture()
                                      });
                                      layer.close(layer.index);
                            }else{
                              layer.msg('请把信息完善', {
                                time: 1000,
                              });
                            }
                          }
                       });
                  $('.layui-layer-close').click(function() {
                                    $('.titleVal3').val("")
                              });
    });


  // logo模板
  $('.choosetemple ul li').eq(0).click(function() {
       layer.open({
                          type: 1,
                          area: ['800px','500px'],
                          title: ['添加模板', 'font-size:18px;'],
                          content: $('.addtempleTable2'),
                          btn :"确定",
                          yes: function(index, layero){
                              console.log( imgUrl )
                              console.log( $('.titleVal2').val() )
                              console.log( $('.contentAdd2').val() )
                              if ( $('.titleVal2').val().length > 0 && $('.contentAdd2').val().length >0 && imgUrl != "") {
                              $.post(''+EQD_url+'/Com/ComCulture/Add_ComCulture.ashx', {
                                "userGuid" :data1.Guid,
                                "comid" :data1.companyId,
                                "type" :2,
                                "title" : $('.titleVal2').val(),
                                "upperItemId" : 0,
                                "picture" :imgUrl,
                                "content" : $('.contentAdd2').val()
                              }, function(data) {
                                console.log( data )
                                loadComCulture()
                              });
                              layer.close(layer.index);
                            }else{
                              layer.msg('请把信息完善', {
                                time: 1000,
                              });
                            }
                          }
                       });
                    $('#fileCulture').change(function() {
                            ajaxFileUpload()
                          });
                    $('.layui-layer-close').click(function() {
                                    $('.titleVal2').val("")
                                    $('.contentAdd2').val("")
                                    $('#fileCulture').val("")
                              });
  });
  // 领导头像模板

  $('.choosetemple ul li').eq(3).click(function() {
          arr_imgUrl = []
          $('.addImages').show()
          layer.open({
                          type: 1,
                          area: ['550px','630px'],
                          title: ['添加模板', 'font-size:18px;'],
                          content: $('.addtempleTable4'),
                          btn :"确定",
                          yes: function(index, layero){
                              console.log( arr_imgUrl[0] )
                              console.log( $('#leaderName').val() )
                              console.log( $('#leaderPost').val() )
                              $.post(''+EQD_url+'/Com/ComCulture/Add_ComCulture.ashx', {
                                "userGuid" :data1.Guid,
                                "comid" :data1.companyId,
                                "type" :4,
                                "title" : $('#leaderName').val(),
                                "upperItemId" : 0,
                                "picture" :arr_imgUrl[0],
                                "content" : $('#leaderPost').val()
                              }, function(data) {
                                console.log( data )
                                loadComCulture()
                                $('.imageDiv').hide();
                                $('#leaderName').val("")
                                $('#leaderPost').val("")
                              });
                              layer.close(layer.index);
                          }
                  })
                $('.layui-layer-close').click(function() {
                  arr_img = [];
                  $('.picDiv .imageDiv').remove()
                });
  })
function ajaxFileUpload() {
            var  Pformdata= new FormData();
            var dataimg=$("#fileCulture")[0].files[0];
             Pformdata.append('image',dataimg);
             $.ajax({
                           type : 'post',
                           url : ''+EQD_url+'/Articles/CommitImage.ashx',
                           data : Pformdata,
                           cache : false,
                           processData : false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
                           contentType : false, // 不设置Content-type请求头
                           success : function(data){
                            var data2 = JSON.parse(data)
                            // console.log( data2.items )
                            if (data2.status ==200) {
                              imgUrl = data2.items.substring(25)
                            }
                           },
                         error:function()
                         {

                         }
                       });
}
function ajaxFileUpload2() {
            var  Iformdata= new FormData();
            var dataimg2=$("#fileInput")[0].files[0];
            console.log( dataimg2 )
             Iformdata.append('willcompress',false);
             Iformdata.append('Files',dataimg2);
             $.ajax({
                           type : 'post',
                           url : ''+EQD_url+'/Reimburse/Upload_Files.ashx',
                           data : Iformdata,
                           cache : false,
                           processData : false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
                           contentType : false, // 不设置Content-type请求头
                           success : function(data){
                            console.log( data )
                             var data3 = JSON.parse(data)
                            data3Leader = data3.status
                            if (data3.status ==200) {
                              arr_imgUrl.push( data3.items.substring(0,Number(data3.items.length)-1)  )
                            }
                           },
                         error:function()
                         {

                         }
                       });
}
  function loadComCulture(){
      $.post(''+EQD_url+'/Com/ComCulture/Get_ComCulture.ashx', {
          "userGuid" : data1.Guid
      }, function(data) {
         var dataCulture = JSON.parse(data);
         $('.templeDetsils>div').remove()
            for (var i = 0; i < dataCulture.items.length; i++) {
               if ( dataCulture.items[i].type == 1 ) {
            $('.templeDetsils').append('<div id="'+dataCulture.items[i].Id+'" class="form-inline" name="1"><p>'+dataCulture.items[i].title+'</p><div class="test_box" >'+dataCulture.items[i].content+'</div><input type="button" / value="删除" class="form-control" id="deleteTemple"><input type="button" / value="编辑" class="form-control" id="changeTemple"><input type="button" / value="添加子模板" class="form-control" id="addchildTemple"></div>')
            // 只有标题模板 去掉内容操作
              if ( dataCulture.items[i].content == " " ) {
                var noContent = dataCulture.items[i].Id ;
                $('#'+noContent+' textarea').remove()
              }
              // 有子模板操作
              if ( dataCulture.items[i].sonItems.length != 0){
                var hasChild = dataCulture.items[i].Id
            for (var j = 0; j < dataCulture.items[i].sonItems.length; j++) {
              $('#'+hasChild+'').append('<div id="'+dataCulture.items[i].sonItems[j].Id+'"><p>'+dataCulture.items[i].sonItems[j].title+'</p><div class="test_box2">'+dataCulture.items[i].sonItems[j].content+'</div><input type="button" / value="删除" class="form-control" id="deleteTemple2"><input type="button" / value="编辑" class="form-control" id="changeTemple2"></div>')
            }
              }
              // type类型有图片的操作
            }else if (dataCulture.items[i].type == 2){
              $('.templeDetsils').append('<div id="'+dataCulture.items[i].Id+'" class="form-inline" name="2"><p>'+dataCulture.items[i].title+'</p><div class="clearfix"><img src="'+dataCulture.items[i].picture+'" alt="" / class="imgLogo pull-left"><div class="test_box pull-left" id="imgDiv">'+dataCulture.items[i].content+'</div></div><input type="button" / value="删除" class="form-control" id="deleteTemple"><input type="button" / value="编辑" class="form-control" id="changeTemple"></div>')
            }else if( dataCulture.items[i].type == 4 ){
              $('.templeDetsils').append('<div id="'+dataCulture.items[i].Id+'" class="leaderDiv pull-left" name="4"><img src="'+dataCulture.items[i].picture+'" alt="" /><p><span>姓名</span><span>'+dataCulture.items[i].title+'</span></p><p><span>职位</span><span>'+dataCulture.items[i].content+'</span></p><input type="button" / value="删除" class="" id="deleteTemple"></div>')
            }
            }
            $('.templeDetsils>div').hover(function() {
             $(this).children('input').show().siblings('div').children('input').hide()
            }, function() {
              $(this).children('input').hide()
            });
            $('.templeDetsils>div>div').hover(function() {
             $(this).children('input').show().siblings('div').children('input').hide()
            }, function() {
              $(this).children('input').hide()
            });
            // 刪除子模板
            $('.templeDetsils #deleteTemple2').click(function() {
                  var delId = $(this).parent('div').attr('id')
                   layer.open({
                                            type: 1,
                                            area: '400px',
                                            title: ['删除课程', 'font-size:18px;'],
                                            content: $('.clutureDeletedTable'),
                                            btn :"确定",
                                            yes: function(index, layero){
                                              $.post(''+EQD_url+'/Com/ComCulture/Del_ComCulture.ashx', {
                                                "userGuid" : data1.Guid,
                                                "comid" : data1.companyId,
                                                "itemIds" :delId
                                                }, function(data) {
                                                  var dataDelCulture = JSON.parse(data)
                                                  if ( dataDelCulture.status == 200 ) {
                                                    loadComCulture()
                                                  }
                                                });
                                              layer.close(layer.index);
                                            }
                                      });
            });
           // 删除模板
          $('.templeDetsils #deleteTemple').click(function() {
                var delId = $(this).parent('div').attr('id')
                     layer.open({
                                              type: 1,
                                              area: '400px',
                                              title: ['删除课程', 'font-size:18px;'],
                                              content: $('.clutureDeletedTable'),
                                              btn :"确定",
                                              yes: function(index, layero){
                                                $.post(''+EQD_url+'/Com/ComCulture/Del_ComCulture.ashx', {
                                                  "userGuid" : data1.Guid,
                                                  "comid" : data1.companyId,
                                                  "itemIds" :delId
                                                  }, function(data) {
                                                    var dataDelCulture = JSON.parse(data)
                                                    if ( dataDelCulture.status == 200 ) {
                                                      loadComCulture()
                                                    }
                                                  });
                                                layer.close(layer.index);
                                              }
                                        });
              });
          // 编辑模板
          var changeImg;
          $('.templeDetsils #changeTemple').click(function() {
                var pDivId = $(this).parent('div').attr('id')
                var pDivName = $(this).parent('div').attr('name')
                $('.titleVal2').val( $(this).siblings('p').text() )
                $('.contentAdd2').val( $(this).siblings('div').text() )
                if ( pDivName != 2  ) {
                    $('.addtempleTable2 form label').eq(1).hide()
                     if ( $(this).siblings('test_box').text() =="" ) {
                    $('.addtempleTable2 form label').eq(2).hide();
                    $('.addtempleTable2 form label').eq(2).children('.contentAdd2').val("");
                  }
                }else{
                   $('.addtempleTable2 form label').eq(1).show()
                   $('.addtempleTable2 form label').eq(2).show()
                  $('#fileCulture').change(function() {
                            ajaxFileUpload()
                          });
                }

                layer.open({
                          type: 1,
                          area: ['800px','500px'],
                          title: ['修改内容', 'font-size:18px;'],
                          content: $('.addtempleTable2'),
                          btn :"确定",
                          yes: function(index, layero){
                              if ( pDivName == 2 ) {
                                changeImg = imgUrl
                              }else{
                                changeImg = " "
                              }
                              $.post(''+EQD_url+'/Com/ComCulture/Update_CultureItem.ashx', {
                                "userGuid" :data1.Guid,
                                "comid" :data1.companyId,
                                "itemId" : pDivId,
                                "title" : $('.titleVal2').val(),
                                "picture" :changeImg,
                                "content" : $('.contentAdd2').val()
                              }, function(data) {
                                loadComCulture()
                                $('.titleVal2').val("")
                                $('.contentAdd2').val("")
                              });
                              layer.close(layer.index);
                          }
                       });
          });
          // 编辑子模板
          $('.templeDetsils #changeTemple2').click(function(event) {
              $('.titleVal').val( $(this).siblings('p').text() )
              $('.contentAdd').val( $(this).siblings('div').text() )
              var cdivID = $(this).parent('div').attr('id')
              layer.open({
                          type: 1,
                          area: ['800px','500px'],
                          title: ['修改内容', 'font-size:18px;'],
                          content: $('.addtempleTable'),
                          btn :"确定",
                          yes: function(index, layero){
                              $.post(''+EQD_url+'/Com/ComCulture/Update_CultureItem.ashx', {
                                "userGuid" :data1.Guid,
                                "comid" :data1.companyId,
                                "itemId" : cdivID,
                                "title" : $('.titleVal').val(),
                                "content" : $('.contentAdd').val()
                              }, function(data) {
                                loadComCulture()
                                $('.titleVal').val("")
                                $('.contentAdd').val("")
                              });
                              layer.close(layer.index);
                          }
                       });
          });
          // 增加子模板
          $('.templeDetsils #addchildTemple').click(function(event) {
                var addId2 = $(this).parent('div').attr('id')
                $('.titleVal').val("")
                $('.contentAdd').val("")
                layer.open({
                              type: 1,
                              area: ['800px','500px'],
                              title: ['添加模板', 'font-size:18px;'],
                              content: $('.addtempleTable'),
                              btn :"确定",
                              yes: function(index, layero){
                                  if ( $('.titleVal').val().length >0 && $('.contentAdd').val().length >0 ) {
                                        $.post(''+EQD_url+'/Com/ComCulture/Add_ComCulture.ashx', {
                                          "userGuid" :data1.Guid,
                                          "comid" :data1.companyId,
                                          "type" :1,
                                          "title" : $('.titleVal').val(),
                                          "upperItemId" : addId2,
                                          "picture" :" ",
                                          "content" : $('.contentAdd').val()
                                        }, function(data) {
                                          loadComCulture()
                                          $('.titleVal').val("");
                                          $('.contentAdd').val("")
                                        });
                                        layer.close(layer.index);
                                  }else{
                                    layer.msg('请把信息完善', {
                                          time: 1000,
                                        });
                                  }
                              }
                           });
                          $('.layui-layer-close').click(function() {
                              $('.titleVal').val("")
                              $('.contentAdd').val("")
                            });
          });
      });
  }
})
