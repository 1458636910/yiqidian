$(document).ready(function(){
      var href = location.href;
      var canshu = href.split("?")[1];
      var postid = canshu.split("=")[1];
      console.log(postid);
      var dataPost;
      var arr_post= [];
      $.post(''+EQD_url+'/Extended/Get_EQDRecruitDetail.ashx', {"recruitId":postid}, function(data) {
        dataPost = (JSON.parse(data)).items;
        $('.postName').text(dataPost.positionName);
        $('.postrequire').text(dataPost.theDescription);
        $('.skills').text(dataPost.theDemand);
      });
})
