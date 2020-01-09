$(document).ready(function(){
    var href = location.href;
  var dataC = localStorage.getItem("GHY_login");
  if (dataC != null) {
  var dataInfo = JSON.parse(dataC);
  $('.loginName').text(dataInfo.username)
  $('.regBtn').hide()
  }else{
    $('.regBtn').show()
  }
  // 获取文章ID
  if(href.indexOf("=") < 0 ){
    location.href ="../html/myCircle.html"
  }else if( href.indexOf("#") < 0 ){
    var thisID= href.split("=")[1];
  }else{
    var hrefShare = href.split("#")[0];
    thisID = hrefShare.split("=")[1]
  }
  $.post(''+http_head+'/Lectures/article/Get_LectureArticle_ById.ashx', {
    "lectureArticleId":thisID
  }, function(data) {
    console.log( data )
    var dataCircle = JSON.parse(data);
    $('.circleTitle').text(dataCircle.items.title);
    $(".circleD").html(dataCircle.items.content)
    var str_label ;
    str_label = (dataCircle.items.Label).split(",");
    for (var i = 0; i < str_label.length; i++) {
      $('.clabel').append('<span>《'+str_label[i]+'》</span>')
    }
  });

})
