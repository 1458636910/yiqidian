$(document).ready(function(){
    $('.qiyeOption').hide();
    $('.shezhiOption').hide();
    $('.yuangongDangan').hide();
    $("#zuzhi").click(function() {
          $('.titlelist ul li').eq(1).addClass('active').siblings('li').removeClass('active');
          $('.maintext').show();
          $('.qiyeOption').hide();
          $('.shezhiOption').hide();
          $('.yuangongDangan').hide();
    });



})

