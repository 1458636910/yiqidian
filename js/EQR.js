$(document).ready(function(){
  var href = location.href;
  $('#myCarousel').carousel({
                        interval: 1500
                      });
  var dataC = localStorage.getItem("GHY_login");
  console.log(dataC)
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
  }
  $('#writeCircleBtn button').click(function() {
    window.open("../html/writeCircle.html?source=0")
  });
  // 退出操作
  $('.quitOut').click(function() {
          localStorage.removeItem("GHY_login");
          location.href ="../html/EQR.html"
        });
  // 登陆操作
  $('#loginBtn').click(function() {
     location.href ="../html/innerLogin.html?href="+href+"";
  });
  // 获取轮播图
  $.post('https://www.eqid.top:8009/yiqixue/Get_Yiqixue_Slide.ashx', {}, function(data) {
    console.log( data )
    var dataImg = JSON.parse(data);
    $('#img1').attr('src',dataImg.items[1].imageUrl );
    $('#img2').attr('src',dataImg.items[2].imageUrl );
  });
  var Lh;
  $.post('https://www.eqid.top:8009/Option_AreasAnd.ashx', {type: 44}, function(data) {
            var data2;
            for (var i = 0; i < data.length; i++) {
                $('.mainLeft').append('<p id="'+i+'">'+data[i].name+'</p>')
            }
             Lh = $('.mainLeft').height();
              $('.mainRight').css('height', Lh);
            $('.mainLeft p').hover(function() {
                  var tId = $(this).attr('id');
                  $('#'+tId+'').css({
                    backgroundColor: 'lightBlue',
                    color: '#000'
                  }).siblings('p').css({
                      backgroundColor: '#d4d4d4',
                      color: '#000'
                    });

            }, function() {
            });
             $('.mainLeft p').click(function() {
               console.log( $(this).text() )
               window.open("../html/searchCircle.html?label="+$(this).text()+"")
             });
            $('.main').hover(function() {
            }, function() {
              $('.list').hide();
              $('.mainLeft p').css({
                      backgroundColor: '#d4d4d4',
                      color: '#000'
                    });
            });
            $('.img').hover(function() {
              $('.list').hide();
            }, function() {
            });
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
  if ( $(window).width() < 800 ) {
    $('.nav ul').attr('class', 'clearfix');
    $('.nav ul li').attr('class', 'pull-left');
  }
  $('#hotC').click(function() {
        $(this).addClass('acTive').siblings('li').removeClass('acTive');
        $('#circleListHot').show().siblings('div').hide();
        $('#circleListHot').children('div').remove();
        $.post('https://www.eqid.top:8009/Articles/Get_Article.ashx', {"page":0}, function(data) {
          // console.log(data)
              dataX = JSON.parse(data).items;
                        var dataW = dataX.rows;
                   for (var i = 0; i < dataX.rows.length; i++) {
                          if ( dataW[i].image.length == 0 ) {
                              imgNo(0,dataW[i],'circleListHot')
                          }else{
                              img(0,dataW[i],'circleListHot')
                          }
                       }
                       $('#circleListHot').children('div').children('.circleDetails').click(function() {
                          var thisId = $(this).parent("div").attr('id');
                          window.open("../html/circleDetails.html?id="+thisId+"")
                        });
                       $('#circleListHot').children('div').children('#label').children('span').click(function() {
                          window.open("../html/searchCircle.html?label="+$(this).text()+"")
                       });
                       //头像名片操作
                       if (dataC != null) {
                        loadTips('circleListHot');
                        // 查看作者详情
                        $('#circleListHot').children('div').children('.writetInfo ').children('img').click(function() {
                          var userguid = $(this).attr('id');
                          sessionStorage.removeItem("GHY_Writer_Guid");
                          sessionStorage.setItem("GHY_Writer_Guid",userguid);
                          window.open("../html/writerInfo.html")
                        });
                        }else{
                        }
                       // 加载更多
                       $('#circleListHot').append('<div class="loadMore"><a href='+"../html/hotCircle.html"+' target="_blank">阅读更多</a></div>')
                     })
  });
  $('#goodC').click(function() {
        $(this).addClass('acTive').siblings('li').removeClass('acTive');
        $('#circleListGood').show().siblings('div').hide();
        $('#circleListGood').children('div').remove();
        $.post('https://www.eqid.top:8009/Articles/Get_Article_ByBoutique.ashx', {"page":0}, function(data) {
          // console.log(data)
              dataY = JSON.parse(data).items;
                        var dataW = dataY.rows;
                   for (var i = 0; i < dataY.rows.length; i++) {
                          if ( dataW[i].image.length == 0 ) {
                              imgNo(0,dataW[i],'circleListGood')
                          }else{
                              img(0,dataW[i],'circleListGood')
                          }
                       }
                       $('#circleListGood').children('div').children('.circleDetails').click(function() {
                          var thisId = $(this).parent("div").attr('id');
                          window.open("../html/circleDetails.html?id="+thisId+"")
                        });
                       $('#circleListGood').children('div').children('#label').children('span').click(function() {
                          window.open("../html/searchCircle.html?label="+$(this).text()+"")
                       });
                       // 加载名片
                       if (dataC != null) {
                        loadTips('circleListGood');
                        // 查看作者详情
                        $('#circleListGood').children('div').children('.writetInfo ').children('img ').click(function() {
                          var userguid = $(this).attr('id');
                          sessionStorage.removeItem("GHY_Writer_Guid");
                          sessionStorage.setItem("GHY_Writer_Guid",userguid);
                          window.open("../html/writerInfo.html")
                        });
                        }else{
                        }
                       $('#circleListGood').append('<div class="loadMore"><a href='+"../html/doogC.html"+' target="_blank">阅读更多</a></div>')
                     })
  });
  $('#newC').click(function() {
        $(this).addClass('acTive').siblings('li').removeClass('acTive');
        $('#circleListNew').show().siblings('div').hide();
        $('#circleListNew').children('div').remove()
        $.post('https://www.eqid.top:8009/Articles/Get_Article_ByTime.ashx', {
          "page":0,
          "time":15
        }, function(data) {
          // console.log(data)
              dataX = JSON.parse(data).items;
                        var dataW = dataX.rows;
                   for (var i = 0; i < dataX.rows.length; i++) {
                          if ( dataW[i].image.length == 0 ) {
                              imgNo(0,dataW[i],'circleListNew')
                          }else{
                              img(0,dataW[i],'circleListNew')
                          }
                       }
                  $('#circleListNew').children('div').children('.circleDetails').click(function() {
                          var thisId = $(this).parent("div").attr('id');
                          window.open("../html/circleDetails.html?id="+thisId+"")
                        });
                  $('#circleListNew').children('div').children('#label').children('span').click(function() {
                          window.open("../html/searchCircle.html?label="+$(this).text()+"")
                       });
                  // 加载名片
                  if (dataC != null) {
                      loadTips('circleListNew');
                    // 查看作者详情
                        $('#circleListNew').children('div').children('.writetInfo ').children('img').click(function() {
                          var userguid = $(this).attr('id');
                          sessionStorage.removeItem("GHY_Writer_Guid");
                          sessionStorage.setItem("GHY_Writer_Guid",userguid);
                          window.open("../html/writerInfo.html")
                        });
                        }else{
                        }
                   $('#circleListNew').append('<div class="loadMore"><a href='+"../html/newC.html"+' target="_blank">阅读更多</a></div>')
                 })
  });
  $('#comC').click(function() {
        $(this).addClass('acTive').siblings('li').removeClass('acTive');
        $('#circleListCom').show().siblings('div').hide();
        $('#circleListCom').children('div').remove()
            $.post('https://www.eqid.top:8009/Articles/Get_ArticleByCompany.ashx ', {"page":0}, function(data) {
                  dataZ = JSON.parse(data).items;
                            var dataW = dataZ.rows;
                       for (var i = 0; i < dataZ.rows.length; i++) {
                              if ( dataW[i].image.length == 0 ) {
                                  imgNo(0,dataW[i],'circleListCom')
                              }else{
                                  img(0,dataW[i],'circleListCom')
                              }
                           }
                           $('#circleListCom').children('div').children('.circleDetails').click(function() {
                              var thisId = $(this).parent("div").attr('id');
                              window.open("../html/circleDetails.html?id="+thisId+"")
                            });
                           $('#circleListCom').children('div').children('#label').children('span').click(function() {
                              window.open("../html/searchCircle.html?label="+$(this).text()+"")
                           })
                           // 加载名片
                          // loadTips('circleListCom');
                           $('#circleListCom').append('<div class="loadMore"><a href='+"../html/comC.html"+' target="_blank">阅读更多</a></div>')
               })
  });
  $('#ourC').click(function() {
        $(this).addClass('acTive').siblings('li').removeClass('acTive');
        $('#circleListOur').show().siblings('div').hide();
        $('#circleListOur').children('div').remove()
              $.post('https://www.eqid.top:8009/Articles/Get_Article_ByEQD.ashx', {"page":0}, function(data) {
                    dataX = JSON.parse(data).items;
                              var dataW = dataX.rows;
                         for (var i = 0; i < dataX.rows.length; i++) {
                                if ( dataW[i].image.length == 0 ) {
                                    imgNo(0,dataW[i],'circleListOur')
                                }else{
                                    img(0,dataW[i],'circleListOur')
                                }
                             }
                             $('#circleListOur').children('div').children('.circleDetails').click(function() {
                                var thisId = $(this).parent("div").attr('id');
                                window.open("../html/circleDetails.html?id="+thisId+"")
                              });
                             $('#circleListOur').children('div').children('#label').children('span').click(function() {
                                window.open("../html/searchCircle.html?label="+$(this).text()+"")
                             })
                             // 加载名片
                            // loadTips('circleListOur');
                             $('#circleListOur').append('<div class="loadMore"><a href='+"../html/hotCircle.html"+' target="_blank">阅读更多</a></div>')
               })
  });
  $('.searchBtn').click(function() {
          if ( $('.searchArea input').val().length == 0 ) {
                                    layer.msg('搜索关键字不能为空', {
                                                                time: 1000,
                                                              });
                                }else{
                                  window.open("../html/searchCircle.html?wd="+$('.searchArea input').val()+"");
                                  SiteSearch()
                                  }
  });
    $('.searchArea  input').keydown(function(event) {
                       if (event.keyCode === 13){
                              if ( $('.searchArea input').val().length == 0 ){
                                  layer.msg('搜索关键字不能为空', {
                                                              time: 1000,
                                       });
                                   }else{
                                    SiteSearch()
                                    window.open("../html/searchCircle.html?wd="+$('.searchArea input').val()+"");
                                  }
                    }else{}
            });
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
                s+= "<p><a href='../html/searchCircle.html?wd="+strs[i]+"' target=_blank>"+strs[i]+"</a></p>";
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
  function diaplayTime(data) {
        var str = data;
        //将字符串转换成时间格式
        var timePublish = new Date(str);
        var timeNow = new Date();
        var minute = 1000 * 60;
        var hour = minute * 60;
        var day = hour * 24;
        var month = day * 30;
        var diffValue = timeNow - timePublish;
        var diffMonth = diffValue / month;
        var diffWeek = diffValue / (7 * day);
        var diffDay = diffValue / day;
        var diffHour = diffValue / hour;
        var diffMinute = diffValue / minute;

        if (diffValue < 0) {
            alert("错误时间");
        }
        else if (diffMonth > 3) {
            result = timePublish.getFullYear() + "-";
            result += timePublish.getMonth() + "-";
            result += timePublish.getDate();
        }
        else if (diffWeek > 1) {

            result = timePublish.getMonth() + "月";
            result += timePublish.getDate() + "日 ";
            result += timePublish.getHours() + ":";
            if (timePublish.getMinutes() > 9) {
                result += timePublish.getMinutes();
            } else {
                result += "0" + timePublish.getMinutes();
            }


        }
        else if (diffDay > 1) {
            result = parseInt(diffDay) + "天前";
        }
        else if (diffHour > 1) {
            result = parseInt(diffHour) + "小时前";
        }
        else if (diffMinute > 1) {
            result = parseInt(diffMinute) + "分钟前";
        }
        else {
            result = "刚刚发表";
        }
        return result;
}
    function imgNo(page,model,divName){
              var dataD = model;
              var day1 = (dataD.createTime).split("T")[0];
              var time1 = (dataD.createTime).split("T")[1];
              var time2 = time1.substring(0,5);
              var dayTime = day1+" "+time2;
              var dayT = diaplayTime(dayTime);
             var  arr_G =  (dataD.lable).split(",")
                         $('#'+divName+'').append('<div id='+dataD.Id+'><div class="writetInfo clearfix"><img src="'+dataD.iphoto+'" alt="" class="pull-left" id="'+dataD.userGuid+'"><p class="pull-left"><span class="nicheng">'+dataD.upname+'</span><br><span class="Ltime">'+dayT+'</span></p><div class="writerInfo'+dataD.Id+'"></div></div><div class="circleDetails clearfix" id="C'+dataD.Id+'"><div class="cirDet2 pull-left"><p class="cirDetTitle">'+dataD.title+'</p><p class="cirDetMain">'+dataD.content+'</p></div></div><div id="label"></div><div class="circleMeta clearfix"><p class="circleForm pull-left">来自:创客空间</p><p class="circleOther pull-right"><a href="">'+dataD.browseCount+ ' 阅读 </a><a href=""></span>'+dataD.commentCount+' 评论 </a><a href=""></span>'+dataD.zanCount+' 喜欢</a></p></div> </div>')
                         if ( arr_G.length == 1 && arr_G[0] !="" ) {
                              $('#'+dataD.Id+' #label').append('<span>'+dataD.lable+'</span>');
                            }else if( arr_G.length > 1 ){
                             for (var m = 0; m < arr_G.length; m++) {
                                     $('#'+dataD.Id+' #label').append('<span>'+arr_G[m]+'</span>');
                            }
                      }
                        $("div[class^=writerInfo]").hide();
      }
      function img(page,model,divName){
              var dataD = model;
              var day1 = (dataD.createTime).split("T")[0];
              var time1 = (dataD.createTime).split("T")[1];
              var time2 = time1.substring(0,5);
              var dayTime = day1+" "+time2;
              var dayT = diaplayTime(dayTime);
              var  arr_G =  (dataD.lable).split(",")
              // console.log( arr_L[0].length )
                $('#'+divName+'').append('<div id='+dataD.Id+'><div class="writetInfo clearfix"><img src="'+dataD.iphoto+'" alt="" class="pull-left" id="'+dataD.userGuid+'"><p class="pull-left"><span class="nicheng">'+dataD.upname+'</span><br><span class="Ltime">'+dayT+'</span></p><div class="writerInfo'+dataD.Id+'"></div></div><div class="circleDetails clearfix" id="C'+dataD.Id+'"><img src="'+dataD.image+'" alt="" class="pull-left"><div class="cirDet pull-left"><p class="cirDetTitle">'+dataD.title+'</p><p class="cirDetMain">'+dataD.content+'</p></div></div><div id="label"></div> <div class="circleMeta clearfix"><p class="circleForm pull-left">来自:创客空间</p><p class="circleOther pull-right"><a href="">'+dataD.browseCount+' 阅读 </a><a href="">'+dataD.commentCount+' 评论 </a><a href="">'+dataD.zanCount+' 喜欢</a></p></div> </div>')
                if ( arr_G.length == 1 && arr_G[0] !="" ) {
                          $('#'+dataD.Id+' #label').append('<span>'+dataD.lable+'</span>');
                        }else if( arr_G.length > 1 ){
                         for (var m = 0; m < arr_G.length; m++) {
                                  $('#'+dataD.Id+' #label').append('<span>'+arr_G[m]+'</span>');
                        }
              }
               $("div[class^=writerInfo]").hide()
      }
      function loadTips(tipsName){
                     var pHotId;
                     var dataWriter;
                       $('#'+tipsName+'').children('div').children('.writetInfo').hover(function() {
                         var ower =  $(this).children('img').attr('id');
                          pHotId = $(this).parent('div').attr('id');
                         $('.writerInfo'+pHotId+'').show().css({
                           padding: '15px 0',
                           textAlign: 'center'
                         });
                         $.post('https://www.eqid.top:8009/Articles/Get_AuthorInfo.ashx', {
                          "authorGuid":ower,
                          "userGuid":dataInfo.Guid
                         }, function(data) {
                           // console.log(data)
                            dataWriter = JSON.parse(data).items;
                           console.log( $('.writerInfo'+pHotId+'>div').length )
                           if ( $('.writerInfo'+pHotId+'>div').length == 0 ) {
                          $('.writerInfo'+pHotId+'').append('<div><img src="'+dataWriter.headimage+'" alt="" /><p class="writerName">'+dataWriter.upname+'</p><p class="writerDetails"><a class="circleTips">文章<span></span></a><a class="foucedTips">关注<span></span></a><a class="fansTips">粉丝<span></span></a></p><p class="isAttention"><button class ="fouced">已关注</button></p><p class="noAttention"><button class="foucing">+ 关注</button></p></div>')
                                $('.writerInfo'+pHotId+' img').click(function() {
                                    var userguid = dataWriter.userGuid
                                     sessionStorage.removeItem("GHY_Writer_Guid");
                                     sessionStorage.setItem("GHY_Writer_Guid",userguid);
                                    window.open("../html/writerInfo.html")
                                  });
                               $('.foucedTips span').text(dataWriter.attentionCount);
                               $('.circleTips span').text(dataWriter.articleCount);
                               $('.fansTips span').text(dataWriter.fansCount);
                               // 判断是否关注作者，如果没有加关注
                               if (dataWriter.isAttent === true) {
                                $('.noAttention').hide()
                               }else{
                                $('.isAttention').hide();
                                $('.noAttention button').click(function() {
                                  $.post('https://www.eqid.top:8009/Articles/Add_Article_Attention.ashx', {
                                    "attention":dataWriter.userGuid,
                                    "userGuid":dataInfo.Guid
                                  }, function(data) {
                                    // console.log(data);
                                    var dataFouced = JSON.parse(data)
                                    if (dataFouced.status == 200) {
                                      layer.msg('关注成功', {
                                                                time: 1000,
                                                              });
                                      $('.isAttention').show();
                                      $('.noAttention').hide();
                                    }
                                  });
                                });
                               }
                               // 关注模块结束
                               // 查看作者粉丝
                               $('.fansTips').css('cursor', 'pointer');
                               $('.foucedTips').css('cursor', 'pointer');
                               $('.fansTips').click(function() {
                                      var userguid = dataWriter.userGuid
                                     sessionStorage.removeItem("GHY_Writer_Guid");
                                     sessionStorage.setItem("GHY_Writer_Guid",userguid);
                                    window.open("../html/writerFans.html")
                               });
                               // 查看作者的关注
                               $('.foucedTips').click(function() {
                                      var userguid = dataWriter.userGuid
                                     sessionStorage.removeItem("GHY_Writer_Guid");
                                     sessionStorage.setItem("GHY_Writer_Guid",userguid);
                                    window.open("../html/writerFouced.html")
                               });
                               }
                         });
                       }, function() {
                          $('.writerInfo'+pHotId+'').css('display', 'none');
                          $('.writerInfo'+pHotId+'>div').remove()
                       });
      }
})

