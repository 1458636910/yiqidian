$(document).ready(function(){
        var href = location.href;
       var dataC = localStorage.getItem("GHY_login");
          if (dataC != null) {
            $('.infoBtn').show();
            $('.loginBtn').hide();
          var dataInfo = JSON.parse(dataC);
          $('.infoBtn img').attr('src',dataInfo.iphoto );
           $('#writeCircleBtn').show()
           loadTable(0)
          }else{
            $('#writeCircleBtn').hide()
            $('.loginBtn').show();
            $('.infoBtn').hide();
            layer.msg('请登陆', {
                                          time: 1000,
                                        });
          }
     // 退出操作
        $('.quitOut').click(function() {
          localStorage.removeItem("GHY_login");
          location.href ="../html/doogC.html"
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
      var dataFouce;
      var arr_circleList = [];
      function loadTable(page){
            $.post('https://www.eqid.top:8009/Articles/Get_MyArticle.ashx', {
              "userGuid":dataInfo.Guid,
              "page":page
            }, function(data) {
               dataFouce = JSON.parse(data);
               if (  dataFouce.items.rows.length <10 ) {
                            $('.loadMore').hide();
                            $('.noMoreBtn').show();
                          }else{
                            $('.loadMore').show();
                            $('.noMoreBtn').hide();
                          }
               for (var i = 0; i < dataFouce.items.rows.length; i++) {
                 arr_circleList.push(dataFouce.items.rows[i])
               }
               console.log( arr_circleList )
              $('#foucedTable').bootstrapTable({
                          url: arr_circleList,
                          columns: [
                          {
                              field: 'title',
                              title: '标题',
                          },
                          {
                              field: 'lable',
                              title: '类别',
                          },
                          {
                            field: 'option',
                              title: '操作',
                               formatter:cancleFormatter,
                               events:cancleEvents

                          }
                          ]
                      });
                      $("#foucedTable").bootstrapTable('load', arr_circleList);
                      function imgFormatter(e,value, row, index){
                           return [
                           '<img src="'+value.iphoto+'" alt="" />'
                            ].join('');
                      };
                      function cancleFormatter(e,value, row, index){
                           return [
                           '<a class="cancleFouce"  title="申精">',
                               '<span id="cancleFouce">申精</span>',
                               '</a>  ',
                            ].join('');
                      };
           });
            window.cancleEvents = {
                     'click .cancleFouce': function (e, value, row, index) {
                      console.log( row )
                      layer.open({
                            type: 1,
                            area: '400px',
                            title: ['申精', 'font-size:18px;text-align: center;'],
                            content: $(".cancleTable"),
                            btn:'确定',
                            shade: false
                          });
                      $('.layui-layer-btn0').click(function() {
                        if ( $('.reason').val().length >0  ) {
                          $.post('https://www.eqid.top:8009/Articles/Add_Bourique_Apply.ashx', {
                            "userGuid":row.userGuid,
                            "articleId":row.Id,
                            "reason":$('.reason').val()
                          }, function(data) {
                            console.log(data)
                            var dataCancle = JSON.parse(data)
                            if ( dataCancle.status == 200 ) {
                              layer.msg('申请成功', {
                                      time: 1000,
                                    });
                            }
                          });
                        }else{
                          layer.msg('请填写申请理由', {
                                      time: 1000,
                                    });
                        }
                        });
                     }
                   }
      }
      $('.loadMore').click(function() {
        console.log( dataFouce.items.page )
         loadTable(dataFouce.items.page)
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
})
