$(document).ready(function() {
    let http_head = "http://47.94.173.253:8008/";
    let href = window.location.href;
    let userGuid = href.split("&")[1].split("%")[0].split("=")[1];
    let companyId = href.split("%")[1].split("=")[1];
    let imgId = href.split("&")[0].split("?")[1].split("=")[1];
    setTimeout(function() {
        $.post('' + http_head + 'Makerspacey/Get_MakerMenuCount.ashx?rand=' + Math.random(), {
            "userGuid": userGuid
        }, function(result) {
            result = JSON.parse(result);
            if (result.status == 200) {
                var cpcount = result.items.cpcount;
                var fkcount = result.items.fkcount;
                var lycount = result.items.lycount;
                var rzcount = result.items.rzcount;
                $('.rzcount').text(rzcount);
                $('.fkcount').text(fkcount);
                $('.lycount').text(lycount);
                $('.cpcount').text(cpcount);
            }
        });
    }, 200);
    setTimeout(function() {
        $.post('' + http_head + 'Lectures/Get_Lecture_ByCreater.ashx?rand=' + Math.random(), {
            "userGuid": userGuid
        }, function(data) {
            var data = JSON.parse(data);
            var username = data.items.realname;
            var headImg;
            if (data.items.headimage) {
                headImg = data.items.headimage;
            } else {
                headImg = 'img/touxiang.png'
            }
            $(".uName").text(username);
            $(".headImg").attr("src", headImg);
        })
    }, 250);
   
   
})