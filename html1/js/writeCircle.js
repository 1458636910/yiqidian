$(document).ready(function(){
  var href = location.href;
  console.log(href)
  // 获取本地信息
  var dataL=   localStorage.getItem("GHY_login");
  var Wheight = $(window).height();
  if ( dataL ==null) {
    location.href ="../html/innerLogin.html?href="+href+""
  }
  var dataInfo = JSON.parse(dataL);
                    if ( dataL  ==null) {
                          var guidU = ""
                         }else{
                          guidU= dataInfo.Guid
                         }
      var s =  href.indexOf("?");
      if ( s >= 0 ) {
      var canshu = href.split("?")[1];
      var sourceT = canshu.split("=")[1];
    }else{
        location.href ="../html/EQR.html";
    }
    var tId,parentID,firstId,dataTitle,dataCircleDetails,str_circle;
    var isDraft = true;
    // 加载菜单目录
function loadList(){
  $.post('https://www.eqid.top:8009/Articles/Get_ArticleMenu.ashx', {
            "userGuid":dataInfo.Guid
          }, function(data) {
                      var dataList = JSON.parse(data).items;
                      console.log( dataList.length )
                      if ( dataList.length == 0 ) {
                        $('.cover').show()
                        layer.open({
                          type: 1,
                          area: '600px',
                          title: ['添加文章目录', 'font-size:18px;text-align: center;'],
                          content: $('.addTitle'),
                          btn:'确定',
                          shade: false
                    });
                    $('.layui-layer-btn0').click(function() {
                              $.post('https://www.eqid.top:8009/Articles/Add_ArticleMenu.ashx', {
                                "userGuid":dataInfo.Guid,
                                "menuName":$('.Title').val()
                              }, function(data) {
                                // console.log(data);
                                var addData = JSON.parse(data);
                                if ( addData.status == 200 ) {
                                  layer.msg('创建成功', {
                                              time: 1000,
                                            });
                                    location.reload();
                                }
                              });
                    });
                    $('.layui-layer-close').css('display', 'none');
                      }
                      for (var i = 0; i < dataList.length; i++) {
                        $('.list').append('<li id='+dataList[i].Id+'><strong>'+dataList[i].articleName+'</strong><span class="glyphicon glyphicon-remove " title="删除文章目录及其文章"></span><span class="glyphicon glyphicon-pencil " title="修改文章目录"></span></li>')
                      }
                    $('.list li').click(function() {
                           $(this).addClass('active').siblings('li').removeClass('active').children('span').hide()
                           $(this).children('span').show().siblings('li').children('span').hide();
                           tId = $(this).attr('id');
                           editor.txt.clear()
                           $('.circleT').val("");
                           $('.choose').val("")
                           str_title = ""
                           $('.addCircleTitle').show()
                           $('.circleTitle p').remove()
                       $.post('https://www.eqid.top:8009/Articles/Get_Article_ByMenu.ashx', {
                        "userGuid":dataInfo.Guid,
                        "menuId":tId
                      }, function(data) {
                          dataTitle = JSON.parse(data);
                         if (  dataTitle.items.length == 0 ) {
                              document.getElementById("addCircle").click();
                         }
                         if ( $('.mainCenter p').length == 0 ) {
                         for (var i = 0; i < dataTitle.items.length; i++) {
                          $('.circleTitle').append('<p id='+dataTitle.items[i].id+'><strong>'+dataTitle.items[i].title+'</strong><span class="glyphicon glyphicon-remove " title="删除文章"></span></p>')
                         }
                          setTimeout( function(){
                              document.getElementsByTagName("p")[0].click();
                          }, 100 );
                         }
                       $('.circleTitle p').hover(function() {
                      $(this).children('span').show()
                    }, function() {
                       $(this).children('span').hide();
                    });
                       // 获取文章内容
                    $('.circleTitle p').click(function() {
                            $(this).children('span').show();
                            $(this).addClass('active').siblings('p').removeClass('active');
                            thisId = $(this).attr('id')
                           // console.log(thisId);
                            editor.txt.clear()
                             var ghy = localStorage.getItem("EQDR_"+thisId+"");
                             // console.log(ghy)
                             $(".circleT").blur(function(){
                                  console.log( thisId )
                                  $('.circleTitle #'+thisId+' strong').text( $('.circleT').val() )
                                });
                               if(ghy ==null){
                                $.post('https://www.eqid.top:8009/Articles/Get_Article_ById.ashx', {
                                "articleId":thisId,
                                "userGuid":guidU
                              }, function(data) {
                                console.log(data)
                                   dataCircleDetails = JSON.parse(data);
                                   editor.txt.html( dataCircleDetails.items.content )
                                    $('.circleT').val( dataCircleDetails.items.title );
                                    $('.choose').val( dataCircleDetails.items.Label );
                                    // ********************************************文章题目实时修改**************************
                                    isDraft = dataCircleDetails.items.isDraft;
                                     var circleDet = {
                                                          "label":dataCircleDetails.items.Label,
                                                          "title":dataCircleDetails.items.title,
                                                          "circle":dataCircleDetails.items.content,
                                                          "isDraft":dataCircleDetails.items.isDraft
                                                          }
                                     str_circle = JSON.stringify(circleDet);
                                     localStorage.setItem("EQDR_"+thisId+"",str_circle);
                                     ghy = localStorage.getItem("EQDR_"+thisId+"")
                                      var ghh = JSON.parse(ghy)
                                      $('.circleT').val(ghh.title)
                                      editor.txt.html( ghh.circle )
                              });
                               }else{
                             var ghh = JSON.parse(ghy)
                             $('.circleT').val(ghh.title)
                             $('.choose').val(ghh.label)
                               editor.txt.html( ghh.circle )
                               $(".circleT").blur(function(){
                                    console.log( thisId )
                                    $('.circleTitle #'+thisId+' strong').text( $('.circleT').val() )
                                  });
                               }
                       });
                    // 删除文章操作
                    $('.circleTitle .glyphicon-remove').click(function() {
                      console.log( tId )
                           parentID = $(this).parent("p").attr('id');
                      console.log( parentID )
                           $('.cover').show();
                           layer.open({
                                type: 1,
                                area: '600px',
                                title: ['删除此文章', 'font-size:18px;text-align: center;'],
                                content: $('.delTitle2'),
                                btn:'确定',
                                shade: false
                            });
                           $('.layui-layer-close').click(function() {
                              $('.cover').hide()
                            });
                            $('.layui-layer-btn0').click(function() {
                              console.log( tId )
                                  $('.cover').hide();
                                  $.post('https://www.eqid.top:8009/Articles/Delete_Article.ashx', {
                                    "userGuid":dataInfo.Guid,
                                    "articleId":parentID
                                  }, function(data) {
                                    var dataSucced = JSON.parse(data);
                                    if ( dataSucced.status == 200 ) {
                                          document.getElementById(tId).click();
                                    }
                                  });
                            })
                    })
                       });
                    });
                    $('.list li').hover(function() {
                      $(this).children('span').show()
                    }, function() {
                       $(this).children('span').hide();
                    });
                    $('.list .glyphicon-remove').click(function() {
                      var pID = $(this).parent("li").attr('id');
                     $('.cover').show();
                     layer.open({
                          type: 1,
                          area: '600px',
                          title: ['删除文章目录及其文章', 'font-size:18px;text-align: center;'],
                          content: $('.delTitle'),
                          btn:'确定',
                          shade: false
                    });
                     $('.layui-layer-close').click(function() {
                      $('.cover').hide()
                    });
                     $('.layui-layer-btn0').click(function() {
                      $('.cover').hide();
                     $.post('https://www.eqid.top:8009/Articles/Delete_ArticleMenu.ashx', {
                        "userGuid":dataInfo.Guid,
                        "articleMenuId":pID
                     }, function(data) {
                       $('#'+pID+'').css('display', 'none');
                       $('.circleTitle p').remove('')
                     });
                     });
                    });
                    $('.list .glyphicon-pencil').click(function() {
                      var pID2 = $(this).parent("li").attr('id');
                     $('.cover').show();
                     $('.newTitle').val( $(this).siblings('strong').text() )
                     layer.open({
                          type: 1,
                          area: '600px',
                          title: ['修改文章目录', 'font-size:18px;text-align: center;'],
                          content: $('.changeTitle'),
                          btn:'确定',
                          shade: false
                    });
                     $('.layui-layer-close').click(function() {
                      $('.cover').hide()
                    });
                      $('.layui-layer-btn0').click(function() {
                        $('.cover').hide();
                     $.post('https://www.eqid.top:8009/Articles/Update_ArticleMenu.ashx', {
                        "userGuid":dataInfo.Guid,
                        "articleMenuId":pID2,
                        "articleMenuName":$('.newTitle').val()
                     }, function(data) {
                       $('.list #'+pID2+' strong').text($('.newTitle').val());
                       $('.newTitle').val("")
                     });
                     });
                    });
  });
}
loadList()
// *****************************新增目录开始**************************************
        $('.addListBtn').click(function() {
              $('.addTable').toggle(500)
        });
        $('.sureBtn').click(function() {
              if ( $('.addTable input').val().length > 0 ) {
                $.post('https://www.eqid.top:8009/Articles/Add_ArticleMenu.ashx', {
                  "userGuid":dataInfo.Guid,
                  "menuName":$('.addTable input').val()
                }, function(data) {
                  console.log(data);
                  var addData = JSON.parse(data);
                  if ( addData.status == 200 ) {
                    layer.msg('创建成功', {
                                time: 1000,
                              });
                    $('.addTable').css('display', 'none');
                    $('.addTable input').val("");
                    $('.list li').remove()
                    loadList()
                  }
                });
              }
        });
        $('.cancleBtn').click(function() {
              $('.addTable input').val("");
              $('.addTable').css('display', 'none');
        });
        // *****************************新增目录结束**************************************
        // **********************富文本编辑开始*******************************************************
        var str_list ="";
        var arr_list =[];
        var imgUrl;
        var E = window.wangEditor;
            var editor = new E('#div1', '#div2');
            // **************************************自动更新文章开始*********************************
            editor.customConfig.onchange = function () {
              var html = editor.txt.html();
              var json=localStorage.getItem("EQDR_"+thisId+"",str_circle);
              var jsonData = JSON.parse(json);
                var circleDet = {
                  "label":$('.choose').val(),
                  "title":$('.circleT').val(),
                  "circle":editor.txt.html(),
                  "isDraft":jsonData ==null?true:jsonData.isDraft
              }
               str_circle = JSON.stringify(circleDet);
              // console.log(str_circle)
              localStorage.setItem("EQDR_"+thisId+"",str_circle);
            }
 // **************************************自动更新文章结束*********************************
 // **************************************自动上传图片开始*********************************
              var  data2;
            editor.customConfig.customUploadImg = function (files, insert) {
              var  Pformdata= new FormData();
              var imgU = files[0];
              console.log(imgU)
              Pformdata.append('image', imgU);
              $.ajax({
                           type : 'post',
                           url : 'https://www.eqid.top:8009/Articles/CommitImage.ashx',
                           data : Pformdata,
                           cache : false,
                           processData : false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
                           contentType : false, // 不设置Content-type请求头
                           success : function(data){
                            console.log(data)
                            data2 = JSON.parse(data)
                            var imgSrc =  (data2.items).substring(25)
                            imgUrl = imgSrc
                            insert(data2.items)
                           }
                       });
          };
 // **************************************自动上传图片结束*********************************
            editor.customConfig.zIndex = 100;
            editor.create();
            var WHeight = Wheight-170;
              $('#div2').css('height', WHeight+'px');
              $('.mainLeft').css('height',Wheight );
              $('.mainCenter').css('height',Wheight );
 // **************************************富文本编辑设置结束*********************************
//********************文章分类开始************************************************
                    var hangyeLabelDetails;
                    $('.choose').click(function() {
                          layer.open({
                                        type: 1,
                                        area: '700px',
                                        title: ['行业选择', 'font-size:18px;text-align: center;'],
                                        content: $('.hangyeLabel'),
                                        btn:'确定',
                                        shade: false
                                  });
                          $.post('https://www.eqid.top:8009/Option_AreasAnd.ashx', {"type":44}, function(data) {
                              if ( $('.hangyeLabel span').length == 0 ) {
                            for (var i = 0; i < data.length; i++) {
                                  $('.hangyeLabel').append('<span><input type="checkbox" name="label" value="'+data[i].name+'">'+data[i].name+'</span>')
                              }
                            }
                           $("input:checkbox[name='label']").click(function() {
                            if (  $("input:checkbox[name='label']:checked").length >3 ) {
                                     layer.msg('最多选择3个', {
                                            time: 1000,
                                          });
                                     $(this).removeAttr('checked')
                            }
                          });
                          $('.layui-layer-btn0').click(function() {
                            $('.cover').hide();
                             var teaArea = "";
                          $("input:checkbox[name='label']:checked").each(function() {
                              teaArea += $(this).val() + ",";
                          });
                          hangyeLabelDetails = teaArea.substring(0,Number(teaArea.length)-1)
                              $('.choose').val(hangyeLabelDetails)
                        });
                          });
                      });
      // ********************文章分类结束************************************************
      // ********************发表文章开始************************************************
      $('.circleSubmit').click(function() {
                var hhh = editor.txt.text();
                var yyy;
                if ( editor.txt.text().length >60 ) {
                      yyy = hhh.substring(0,60);
                    }else{
                      yyy = hhh
                    }
                if ( typeof(imgUrl)  == "undefined") {
                  var iUrl = " "
                }else{
                    iUrl = imgUrl
                }
                if ( $('.choose').val().length == 0  ) {
                  var labelCircle = " "
                }else{
                    labelCircle = $('.choose').val()
                }
                 // console.log(str_circle)
                 var dataR = JSON.parse(str_circle)
                 // var dataR = str_circle
                if ( dataR.isDraft == true ) {
                      $.post('https://www.eqid.top:8009/Articles/Add_Article_ByDraft.ashx', {
                      "menuId":tId,
                      "userGuid":dataInfo.Guid,
                      "title":$('.circleT').val(),
                      "homeImage":iUrl,
                      "label":labelCircle,
                      "source":sourceT,
                      "companyId":dataInfo.companyId,
                      "content":editor.txt.html(),
                      "textContent":yyy,
                      "draftId":thisId
                    }, function(data) {
                        console.log(data)
                        var dataCircle = JSON.parse(data);
                        if ( dataCircle.status == 200 ) {
                         var  localdata = localStorage.getItem("EQDR_"+thisId+"");
                          var    localdataJson = JSON.parse(localdata);
                          localdataJson.isDraft = false;
                          localdataJson = JSON.stringify(localdataJson)
                          localStorage.setItem("EQDR_"+thisId+"",localdataJson)
                            layer.msg('发表成功', {
                                            time: 1000,
                                          });
                        }
                    });
                }else{
                        $.post('https://www.eqid.top:8009/Articles/Update_Article.ashx', {
                        "userGuid":dataInfo.Guid,
                        "articleId":thisId,
                        "articleTitle":$('.circleT').val(),
                        "articleContent":editor.txt.html(),
                        "textContent":editor.txt.text()
                      }, function(data) {
                      console.log(data)
                      var dataG =JSON.parse(data);
                      if ( dataG.status == 200 ) {
                        // localStorage.removeItem("EQDR_"+thisId+"")
                              layer.msg('更新成功', {
                                              time: 1000,
                                            });
                          }
                   });
              }
      });
      // ********************发表文章结束************************************************
      $("#line").click(function() {
             editor.cmd.do('insertHTML', '<p style="border-top :1px solid #d9d9d9; padding: 10px 10px 0px 10px "></p>')
      });
      // 新增文章开始**********************************************************
      $('.addCircleTitle button').click(function() {
              $.post('https://www.eqid.top:8009/Articles/Add_Article_Draft.ashx', {
                  "userGuid":dataInfo.Guid,
                  "title":'无标题文章',
                  "content":' ',
                  "menuId":tId,
                  "textContent":editor.txt.text()
                }, function(data) {
                  console.log(data)
                  document.getElementsByTagName("p")[0].click();
                  $.post('https://www.eqid.top:8009/Articles/Get_Article_ByMenu.ashx', {
                        "userGuid":dataInfo.Guid,
                        "menuId":tId
                      }, function(data) {
                         // console.log(data);
                         var dataTitle = JSON.parse(data);
                         console.log( $('.mainCenter p').length )
                         document.getElementById(tId).click();
                         document.getElementsByTagName("p")[0].click();
                       })
              });
      });
       // 新增文章结束**********************************************************
       // 同步文章开始**********************************************************
       $('.synct').click(function() {
             $.post('https://www.eqid.top:8009/Articles/Get_Article_ById.ashx', {
              "articleId":thisId,
              "userGuid":guidU
             }, function(data) {
                console.log(data);
                var dataCircleDetails2 = JSON.parse(data);
                localStorage.removeItem("EQDR_"+thisId+"")
                                 editor.txt.html( dataCircleDetails2.items.content )
                                $('.circleT').val( dataCircleDetails2.items.title );
                                $('.choose').val( dataCircleDetails2.items.Label );
                                $('.circleTitle #'+thisId+'').text( dataCircleDetails2.items.title );
             });
       });
       // 同步文章结束**********************************************************
    })
