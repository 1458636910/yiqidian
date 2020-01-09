var http_head = "http://47.94.173.253:8008";
   $(function(){
                  $(window).scroll(function(){
                      if( $(window).scrollTop() > 100 ){
                        $(".backTop").show()
                      }else{
                         $(".backTop").hide()
                      }
                  });
          });
   //当点击跳转链接后，回到页面顶部位置
           $('.backTop').hover(function() {
              layer.tips('点我回到顶部', '.backTop');
            }, function() {
             layer.closeAll('tips')
            });
            $(".backTop").click(function(){
                $('body,html').animate({scrollTop:0},500);
            });
  //
  $('.collection2 span').hover(function() {
              layer.tips('点我反馈信息', '.collection2 span');
            }, function() {
             layer.closeAll('tips')
            });
    $('.collection2').click(function() {
         window.open("../../71guangwang/html/feedback.html")
    });
    //      联系客服
            $('.message span').hover(function() {
              layer.tips('加QQ727024586', '.message span');
            }, function() {
             layer.closeAll('tips')
            });
            // $('.message').click(function(event) {
            //   window.open("http://wpa.qq.com/msgrd?v=3&uin=1605932791&site=qq&menu=yes")
            //   window.open("tencent://message/?uin=1677358794&Menu=yes")
            // });
    //      关注微信
            $('.weChat span').hover(function() {
              layer.tips('<img src="../image/downQRcode.jpg" alt="" id="weChatImg"><p id="fouceWechat">扫码关注微信</p>', '.weChat span');
            }, function() {
             layer.closeAll('tips')
            });
