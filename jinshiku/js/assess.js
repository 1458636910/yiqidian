$(document).ready(function(){
      var href = location.href;
    //   var s =  href.indexOf("=");
    //   if ( s < 0 ) {
    //     location.href = "../html/personInfo.html"
    // }else{
    //   var videoDetails = href.split("=")[1];
    // }
      var dataC = localStorage.getItem("GHY_login");
      console.log( dataC )
      if (dataC != null) {
        $('.infoBtn').show();
        $('.loginBtn').hide();
      var dataInfo = JSON.parse(dataC);
      $('.loginName').text(dataInfo.username);
      }else{
        $('.loginBtn').show();
        $('.infoBtn').hide();
        $('.quitOut').hide();
      }
      $('#writeCircleBtn button').click(function() {
        window.open("../html/writeCircle.html")
      });
      // 退出操作
      $('.quitOut').click(function() {
              localStorage.removeItem("GHY_login");
              window.location.reload()
            });
      // 登陆操作
      $('#loginBtn').click(function() {
         location.href ="../html/innerLogin.html?href="+href+"";
      });
      $('.tabelDetails tr:gt(1)').children('td').children('span').click(function() {
        $(this).children('div').css('backgroundColor', '#f00');
        $(this).siblings('span').children('div').css('backgroundColor', '#fff');
        $(this).parent('td').siblings('.math').text( $(this).attr('class') );
        var allMath = Number($('#math1').text())+Number($('#math2').text())+Number($('#math3').text())+Number($('#math4').text())+Number($('#math5').text())+Number($('#math6').text())+Number($('#math7').text())+Number($('#math8').text())+Number($('#math9').text())+Number($('#math0').text());
              $('.mathAll').text( allMath )
      });
      // 提交评价
      var trainId,teacherGuid;
      var arr_time = [];
      $.post('https://www.eqid.top:8009/Training/Get_trainInfo_appraise.ashx', {
            "userGuid":"33c6bdfc281c48c3871d85a2718620e9",
            "courseId":74
            }, function(data) {
              console.log( data )
                var dataTrain = JSON.parse(data);
                for (var i = 0; i < dataTrain.items[0].trainTimes.length; i++) {
                   $('.assessTime').append('<p>'+dataTrain.items[0].trainTimes[i]+'</p>')
                }
                trainId = dataTrain.items[0].Id;
                teacherGuid = dataTrain.items[0].teacherGuid;
                $('.className').text( dataTrain.items[0].theTheme );
                $('.departName').text( dataTrain.items[0].hostdepName );
                $('.dutyPerson').text( dataTrain.items[0].respoPersonName );
                $('.teacher').text( dataTrain.items[0].teacherName );
      });
      $('.submitBtn').click(function() {
        if (  $('#math1').text() != '' && $('#math2').text() != '' && $('#math3').text() != '' && $('#math4').text() != '' && $('#math5').text() != '' && $('#math6').text() != '' && $('#math7').text() != '' && $('#math8').text() != '' && $('#math9').text() != '' && $('#math0').text() != '' && $('#harvest').val() != '' && $('#advise').val() != '') {
            $.post('https://www.eqid.top:8009/Training/Add_CourseTrainScore.ashx', {
              "userGuid":dataInfo.Guid,
              "trainingId":trainId,
              "teacherGuid":teacherGuid,
              "valKTTPoint":$('#math1').text(),
              "valFullContents":$('#math2').text(),
              "valPrepare":$('#math3').text(),
              "valInteract":$('#math4').text(),
              "valConToExpect":$('#math5').text(),
              "valCaseInspire":$('#math6').text(),
              "valDoubtAnswer":$('#math7').text(),
              "valNewKnowledge":$('#math8').text(),
              "valBroadenThinking":$('#math9').text(),
              "valWorthyRecom":$('#math0').text(),
              "gainsAndTaste":$('#harvest').val(),
              "suggestions":$('#advise').val(),
            }, function(data) {
              console.log( data )
              var dataR = JSON.parse(data);
              if ( dataR.status == 200 ) {
                layer.msg('评论成功', {
                                time: 1000,
                         });
                document.location.reload();
              }else{
                layer.msg(dataR.msg, {
                                time: 1000,
                         });
              }
            });
        }else{
          layer.msg('请完善评论或得分', {
                                time: 1000,
                         });
        }
      });
})
