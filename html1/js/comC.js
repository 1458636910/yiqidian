$(document).ready(function(){
    var href = location.href;
    var dataC = localStorage.getItem("GHY_login");
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
     // 退出操作
        $('.quitOut').click(function() {
          localStorage.removeItem("GHY_login");
          location.href ="../html/comC.html"
        });
        // 登录操作
        $('#loginBtn').click(function() {
           location.href ="../html/innerLogin.html?href="+href+"";
        });
  $('#writeCircleBtn button').click(function() {
    window.open("../html/writeCircle.html?source=0")
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
  var dataX;
     $.post('https://www.eqid.top:8009/Articles/Get_ArticleByCompany.ashx', {"page":0}, function(data) {
        dataX = JSON.parse(data).items;
                  var dataW = dataX.rows;
                  if (  dataX.rows.length <10 ) {
                    $('.loadMore').hide();
                    $('.noMoreBtn').show();
                  }else{
                    $('.loadMore').show();
                    $('.noMoreBtn').hide();
                  }
             for (var i = 0; i < dataX.rows.length; i++) {
                    if ( dataW[i].image.length == 0 ) {
                        imgNo(0,dataW[i])
                    }else{
                        img(0,dataW[i])
                    }
                 }
                 $('.loadMore').click(function() {
                            $.post('https://www.eqid.top:8009/Articles/Get_Article.ashx', {"page":dataX.page}, function(data) {
                                    dataX = JSON.parse(data).items;
                                    var dataW = dataX.rows;
                                    if (  dataX.rows.length <10 ) {
                                      $('.loadMore').hide();
                                      $('.noMoreBtn').show();
                                    }else{
                                      $('.loadMore').show();
                                      $('.noMoreBtn').hide();
                                    }
                                   for (var i = 0; i < dataX.rows.length; i++) {
                                          if ( dataW[i].image.length == 0 ) {
                                              imgNo(dataX.page,dataW[i])
                                          }else{
                                              img(dataX.page,dataW[i])
                                          }
                                       }
                              });
                  });
                      })
                  if ( $(window).width() >= 800 ) {
                         $('#circleListHot>div').children('.circleDetails').children('img').css('width', '20%')
                         }else{
                           $('#circleListHot>div').children('.circleDetails').children('img').css('width', '100%')
                       }
      function imgNo(page,model){
              var dataD = model;
              var day1 = (dataD.createTime).split("T")[0];
              var time1 = (dataD.createTime).split("T")[1];
              var time2 = time1.substring(0,5);
              var dayTime = day1+" "+time2;
              var dayT = diaplayTime(dayTime);
             var  arr_G =  (dataD.lable).split(",")
                         $('#circleListHot').append('<div id='+dataD.Id+'><div class="writetInfo clearfix"><img src="'+dataD.iphoto+'" alt="" class="pull-left"> <p class="pull-left"><span class="nicheng">'+dataD.upname+'</span><br><span class="Ltime">'+dayT+'</span></p></div><div class="circleDetails clearfix" id="C'+dataD.Id+'"><div class="cirDet2 pull-left"><p class="cirDetTitle">'+dataD.title+'</p><p class="cirDetMain">'+dataD.content+'</p></div></div><div id="label"></div><div class="circleMeta clearfix"><p class="circleForm pull-left">来自:创客空间</p><p class="circleOther pull-right"><a href="">'+dataD.browseCount+ ' 阅读 </a><a href=""></span>'+dataD.commentCount+' 评论 </a><a href=""></span>'+dataD.zanCount+' 喜欢</a></p></div> </div>')
                         if ( arr_G.length == 1 && arr_G[0] !="" ) {
                          $('#'+dataD.Id+' #label').append('<span>'+dataD.lable+'</span>');
                        }else if( arr_G.length > 1 ){
                         for (var m = 0; m < arr_G.length; m++) {
                                 $('#'+dataD.Id+' #label').append('<span>'+arr_G[m]+'</span>');
                        }
              }
              $('#'+dataD.Id+'').children('.circleDetails').click(function() {
                 var thisId = $(this).parent("div").attr('id');
                 window.open("../html/circleDetails.html?id="+thisId+"")
              });
      }
      function img(page,model){
              var dataD = model;
              var day1 = (dataD.createTime).split("T")[0];
              var time1 = (dataD.createTime).split("T")[1];
              var time2 = time1.substring(0,5);
              var dayTime = day1+" "+time2;
              var dayT = diaplayTime(dayTime);
              var  arr_G =  (dataD.lable).split(",")
              // console.log( arr_L[0].length )
                $('#circleListHot').append('<div id='+dataD.Id+'><div class="writetInfo clearfix"><img src="'+dataD.iphoto+'" alt="" class="pull-left"> <p class="pull-left"><span class="nicheng">'+dataD.upname+'</span><br><span class="Ltime">'+dayT+'</span></p></div><div class="circleDetails clearfix" id="C'+dataD.Id+'"><img src="'+dataD.image+'" alt="" class="pull-left"><div class="cirDet pull-left"><p class="cirDetTitle">'+dataD.title+'</p><p class="cirDetMain">'+dataD.content+'</p></div></div><div id="label"></div> <div class="circleMeta clearfix"><p class="circleForm pull-left">来自:创客空间</p><p class="circleOther pull-right"><a href="">'+dataD.browseCount+' 阅读 </a><a href="">'+dataD.commentCount+' 评论 </a><a href="">'+dataD.zanCount+' 喜欢</a></p></div> </div>')
                if ( arr_G.length == 1 && arr_G[0] !="" ) {
                          $('#'+dataD.Id+' #label').append('<span>'+dataD.lable+'</span>');
                        }else if( arr_G.length > 1 ){
                         for (var m = 0; m < arr_G.length; m++) {
                                  $('#'+dataD.Id+' #label').append('<span>'+arr_G[m]+'</span>');
                        }
              }
              $('#'+dataD.Id+'').children('.circleDetails').click(function() {
                 var thisId = $(this).parent("div").attr('id');
                          window.open("../html/circleDetails.html?id="+thisId+"")
              });
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
})
