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
          layer.msg('请登陆', {
                                      time: 1000,
                                    });
        }
        $('#writeCircleBtn button').click(function() {
          window.open("../html/writeCircle.html?source=0")
        });
        // 退出操作
        $('.quitOut').click(function() {
          localStorage.removeItem("GHY_login");
          location.href ="../html/collectionCircle.html"
        });
        // 登录操作
        $('#loginBtn').click(function() {
           location.href ="../html/innerLogin.html?href="+href+"";
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
      // 搜索框操作
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
      loadTable(0)
      var arr_collection = [];
      var dataFouce;
      function loadTable(page){
            $.post('https://www.eqid.top:8009/Collection/Get_collectionsByType.ashx', {
              "owner":dataInfo.Guid,
              "page":page,
              "type":10
            }, function(data) {
               dataFouce = JSON.parse(data);
               var dataCollection = JSON.parse(data).items
               for (var i = 0; i < dataCollection.length; i++) {
                           arr_collection.push(dataFouce.items[i])
               }
              if (  dataFouce.items.length <20 ) {
                            $('.loadMore').hide();
                            $('.noMoreBtn').show();
                          }else{
                            $('.loadMore').show();
                            $('.noMoreBtn').hide();
                          }
              $('#foucedTable').bootstrapTable({
                          url: arr_collection,
                          columns: [
                          {
                              field: 'title',
                              title: '文章标题',
                          },
                          {
                              field: 'nickname',
                              title: '作者昵称',
                          },
                          {
                            field: 'option',
                              title: '操作',
                               formatter:cancleFormatter,
                          }
                          ]
                      });
                      $("#foucedTable").bootstrapTable('load', arr_collection);
                      function cancleFormatter(e,value, row, index){
                           return [
                           '<a class="cancleFouce"  title="查看文章详情" href="'+value.articleurl+'" target="_blank">',
                               '<span id="cancleFouce">查看文章详情</span>',
                               '</a>  ',
                            ].join('');
                      };
           });
                    $('.loadMore').click(function() {
                            $.post('https://www.eqid.top:8009/Collection/Get_collectionsByType.ashx', {
                              "owner":dataInfo.Guid,
                              "page":dataFouce.nextpage,
                              "type":10
                            }, function(data) {
                              // console.log(data)
                                    dataFouce = JSON.parse(data);
                                    var dataCollection = JSON.parse(data).items;
                                    if (  dataFouce.items.length < 20 ) {
                                      $('.loadMore').hide();
                                      $('.noMoreBtn').show();
                                    }else{
                                      $('.loadMore').show();
                                      $('.noMoreBtn').hide();
                                    }
                              });
                                    loadTable(dataFouce.nextpage)
                  });
      }
})
