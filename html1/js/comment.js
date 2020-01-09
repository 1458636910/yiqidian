$(document).ready(function(){
  var Pdata1 = sessionStorage.getItem("P_comment")
  var dataCircle =   localStorage.getItem("GHY_login");
  var dataC = JSON.parse(dataCircle);
    console.log(dataC)
      if (dataC ==null) {
        var guid =" ";
      }else{
        guid = dataC.Guid;
      }
  var Pdata = JSON.parse(Pdata1);
  $('.divP img').attr('src', Pdata.iphoto);
  $('.upname').text(Pdata.upname)
   var time1 = (Pdata.createTime).split("T")[0];
   var time2 = ((Pdata.createTime).split("T")[1]).substring(0,5);
   var time3 = time1+" "+time2;
   var time4 = diaplayTime(time3);
  $('.Ctime').text(time4);
  $('.Pcontent').text( Pdata.content )
  if ( Pdata.isZan === false ) {

  }else{
        $('.Pdianzan span').css('color', '#f00');
      }
      var dataPage;
    function load(page){
      $.post('https://www.eqid.top:8009/Articles/Get_ChildComment.ashx', {
        "userGuid":guid,
        "articleId":Pdata.articleId,
        "firstCommentId":Pdata.Id,
        "page":page
      }, function(data) {
        // console.log(data);
        var dataChild = JSON.parse(data);
        dataPage = dataChild.items.page;
        console.log(dataChild.items.rows.length)
        if ( dataChild.items.rows.length >=10 ) {
          $('.loadMoreBtn').show();
          $('.noMoreBtn').hide();
        }else{
          $('.loadMoreBtn').hide();
          $('.noMoreBtn').show();
        }
        for (var i = 0; i < dataChild.items.rows.length; i++) {
            loadChild(dataChild.items.rows[i])
        }
      });
    }
      $('.loadMoreBtn').click(function() {
        load(dataPage)
        console.log(dataPage)
      });
     load(0)
    function loadChild(model){
        var Cmodel = model;
        var comtime1 = (Pdata.createTime).split("T")[0];
        var comtime2 = ((Pdata.createTime).split("T")[1]).substring(0,5);
        var comtime3 = comtime1+" "+comtime2;
        var comtime4 = diaplayTime(comtime3);
            $('.divC').append('<div id="'+Cmodel.Id+'"><p id="huifu2"><span class="huifuzhe">'+Cmodel.upname+'</span>: 回复<span class="pinglunzhe">'+Cmodel.parentUPname+'</span> : <span class="cContent"> '+Cmodel.content+' </span></p><p id="huifu3"><a class="huifuTime"><span>'+comtime4+'</span></a><a class="cDianzan"><span class="glyphicon glyphicon-thumbs-up"></span> 点赞</a><a class="huifuPinglun"><span class="glyphicon glyphicon-comment"></span> 回复</a><a class="delcDis"><span class="glyphicon glyphicon-trash"></span>删除</a></p></div>')
            // ************************************************点赞开始************************************
            if ( Cmodel.isZan === false ) {
                 $('#'+Cmodel.Id+' .cDianzan').click(function() {
                    var pId =  $(this).parent('p').parent('div').attr('id');
                    $.post('https://www.eqid.top:8009/Articles/Add_ArticleComment_Zan.ashx', {
                      "userGuid":dataC.Guid,
                      "articleCommentId":pId
                    }, function(data) {
                      console.log(data);
                      var dataZ = JSON.parse(data);
                      if ( dataZ.status == 200 ) {
                       $('#'+Cmodel.Id+' .cDianzan span').css('color', '#f00');
                      }
                    });
                 });
            }else{
              $('#'+Cmodel.Id+' .cDianzan span').css('color', '#f00');
            }
            // ************************************************点赞结束************************************
            // ************************************************回复开始************************************
              $('#'+Cmodel.Id+' .huifuPinglun').click(function() {
                 var airId =  $(this).parent('p').parent('div').attr('id');
                 $(this).parent('p').children('div').remove();
                 $(this).parent('p').append('<div class="sendComment"><textarea placeholder="写下你的评论..." class="form-control" id="WriterCommentChild"></textarea><div class="lanuchBtnList2 clearfix"><button class="sendBtn pull-right">发送</button><button class="canBtn pull-right">取消</button></div></div>')
                               $('.sendBtn').click(function() {
                                          $.post('https://www.eqid.top:8009/Articles/Add_ArtcielComment.ashx', {
                                            "userGuid":dataC.Guid,
                                            "articleId":Pdata.articleId,
                                            "parentid":Cmodel.Id,
                                            "content":$('#WriterCommentChild').val(),
                                            "parentUserGuid":Cmodel.userGuid,
                                            "firstCommentId":Cmodel.firstCommentId
                                          }, function(data) {
                                            console.log(data);
                                            $('.divC').children('div').remove();
                                            load(0)
                                            $('.sendComment').hide();
                                            $('#WriterCommentChild').val("");
                                             $('#'+Cmodel.Id+' .loadMoreBtn').hide();
                                          });
                                  });
                                  $('.canBtn').click(function() {
                                        $('.sendComment').hide();
                                        $('#WriterCommentChild').val("")
                                  });
                          });
            // ************************************************回复结束************************************
            // ************************************************删除开始************************************
            // if ( dataC.Guid == Cmodel.userGuid ) {
            //   $('.delcDis').show();
            // }else{
            //   $('.delcDis').hide();
            // }
                    $('#'+Cmodel.Id+' .delcDis').click(function() {
                        var airId =  $(this).parent('p').parent('div').attr('id');
                          layer.open({
                                 type: 1,
                                 area: '450px',
                                 title: ['删除评论', 'font-size:18px;text-align: center;'],
                                 content: $(".delDisTable3"),
                                 btn:'确定',
                                 shade: false
                              });
                        $('.layui-layer-btn0').click(function() {
                                              $.post('https://www.eqid.top:8009/Articles/Delete_ArticleComment.ashx', {
                                                "userGuid":dataC.Guid,
                                                "articleCommentId":airId,
                                                "articleId":Pdata.articleId,
                                                "type":2
                                              }, function(data) {
                                                console.log(data);
                                                var dataDis3 = JSON.parse(data)
                                                if ( dataDis3.status == 200 ) {
                                                  $('#'+airId+'').css('display', 'none');
                                                }else{
                                                    layer.msg(dataDis3.msg, {
                                                              time: 1000,
                                                            });
                                                }
                                              });
                                        });
              });
            // ************************************************删除结束************************************
            // ************************************************hover内容开始************************************
              $('#'+Cmodel.Id+' .cContent').hover(function() {
                $(this).attr('title', Cmodel.firstComment );
              }, function() {
                  $(this).removeAttr('title');
              });
            // ************************************************hover内容结束************************************
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
})
