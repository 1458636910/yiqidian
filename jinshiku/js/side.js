$(document).ready(function(){
	$(".downLoad").hover(function(){
		layer.tips("点我进入APP下载页",".downLoad",{tips:[4,"black"]})
	},function(){
		layer.closeAll("tips")
	});
	
	$(".callBack").hover(function(){
		layer.tips("点我进行反馈",".callBack",{tips:[4,"black"]})
	},function(){
		layer.closeAll("tips")
	});
	
	$(".publicNum").hover(function(){
		layer.tips('<img src="img/downQRcode.jpg" alt="" id="weChatImg"><p id="fouceWechat">关注公众号</p>',".publicNum",{tips:[4,"black"], area: ['110px','115px'],})
	},function(){
		layer.closeAll("tips")
	});
	
	$(".leaveMsg").hover(function(){
		layer.tips("QQ727024586",".leaveMsg",{tips:[4,"black"]})
	},function(){
		layer.closeAll("tips")
	});
	$(".contact").hover(function(){
		layer.tips("手机13849110116",".contact",{tips:[4,"black"]})
	},function(){
		layer.closeAll("tips")
	});
	
	$('.goTop').hover(function() {
		layer.tips('回到顶部', '.goTop',{tips:[4,'black']});
	}, function() {
		layer.closeAll('tips')
	});
// 	$(window).scroll(function(){
// 		if($(window).scrollTop()>0){
// 			$('.goTop').show()
// 		}else{
// 			$('.goTop').hide()
// 		}
// 	})
	$(".goTop").on("click",function(){
			$('body,html').animate({scrollTop:0},500);
// 			if($(window).scrollTop()==0){
// 				layer.msg("一到顶部")
// 			}
	});
	
})