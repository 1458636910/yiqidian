$(document).ready(function(){
    var videoInfo = sessionStorage.getItem("GHY_video");
    console.log( videoInfo )
    var videoDetails = JSON.parse(videoInfo)
    var href = location.href;
    var urlId = href.split("=")[1];
    var dataC = localStorage.getItem("GHY_login");
   if (dataC != null) {
      var dataInfo = JSON.parse(dataC);
      }else{
        $('.loginBtn').show();
        $('.infoBtn').hide();
        $('.quitOut').hide();
      }
    $('.title').text(videoDetails.videoTitle)
    player = new YKU.Player('youkuplayer',{
            styleid: '0',
            client_id: 'e29c9b1e28715061',
            vid: urlId,
            // autoplay: true
        });
    // 视频资料
    $('.videoName p').eq(0).text(videoDetails.videoTitle)
    $('.videoCreater p').eq(0).text(videoDetails.realName)
    var labels ="";
    labels = (videoDetails.label).split(',')
    for (var i = 0; i < labels.length; i++) {
      $('.videoLabel').append('<span >《'+labels[i]+'》</span>')
    }
      $('.videoDeacribe').append('<span>'+videoDetails.describe+'</span>');
      $('.loginName').text(dataInfo.username)
})
