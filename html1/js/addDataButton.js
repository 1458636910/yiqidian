$(document).ready(function(){
function zhiweiType(){
            $.post(''+EQD_url+'/Option_AreasAnd.ashx',{type:"1"} ,function(data) {
               postdata= data;
               listLength = postdata.length;
                     var len = listLength;
                  for (var i = 0; i < len; i++) {
                      var prov2Opt = document.createElement('option');
                      prov2Opt.innerText = postdata[i]['name'];
                      prov2Opt.value = i;
                      prov2.append(prov2Opt);
                  }
            });
            $('#prov2').change(function (btn) {
                    document.all['desc2'].options.length = 1;
                    var val = $('#prov2').select().val();
                    if (val != current.prov2) {
                        current.prov2 = val;
                        addrShow.val ('');
                        btn.disabled = true;
                    }
                    if (val != null) {
                        desc2.length = 1;
                        var desc2Len = postdata[val]["sub"].length;
                        for (var j = 0; j < desc2Len; j++) {
                            var desc2Opt = document.createElement('option');
                            desc2Opt.innerText = postdata[val]["sub"][j].name;
                            desc2Opt.value = j;
                            desc2.append(desc2Opt);
                        }
                    }
            });
             var addrShow = $('#addr-show2');
              var btn = document.getElementsByClassName('prov2');
              var prov2 = $('#prov2');
              var desc2 = $('#desc2');
              var current = {
                  prov2: '',
                  desc2: ''
              };
}
var  postdata,listLength;
   $('#addPost').click(function() {
    if ( G_treeNode == null ) {
      layer.msg('请先点击左侧增加职位的部门名称', {
                                time: 1000,
                              });
    }else{
      $('.cover').show();

    var addPostTitle = "在《"+G_treeNode.departName+"》下增加职位"
            layer.open({
              type: 1,
              area: '700px',
              title: [addPostTitle, 'font-size:18px;'],
              content: $('.changePost2'),
              btn:'确定',
              shade: false
            });
                $('.layui-layer-close').click(function() {
                  $('.cover').hide();
                });
          // console.log( $('#prov2 option').length )
          if ( $('#prov2 option').length == 1 ) {
              zhiweiType()
          }
      $('.layui-layer-btn0').click(function() {
            $('.cover').hide();
             // console.log(postdata);
             var namenew = $("#postname2").val();
             // console.log(namenew);
             // var typenew = postdata[$('#prov2').val()].name;
             // console.log(typenew);
             // var num = $('.postDetail').val();
             // var num2 =Number(num)+Number(1)
             // var descnew = $('.postDetail option').eq(num2).text();
             // console.log(descnew);
             var leaderval;
            if($('#checknew').prop('checked')){
              leaderval ="true";
            }else{
              leaderval = "false";
            }
              // console.log( typenew +"1")
              // console.log( descnew +"1")
                $.post(''+EQD_url+'/Com_CreatePost.ashx', {
                      "name":namenew,
                      "type":" ",
                      "desc":" ",
                      "userGuid":data1.Guid,
                      "departId":G_treeNode.departId,
                      "CompanyId":data1.companyId,
                      "isleader":leaderval
                      }, function(data) {
                      var dataaddPost = JSON.parse(data);
                      if (dataaddPost.status == 200) {
                      layer.msg('添加成功', {
                                      time: 1000,
                                    });
                        document.getElementById("addPostform").reset();
                      }else{
                        layer.msg('添加失败', {
                                      time: 1000,
                                    });
                      }
                      $('.cover').css('display', 'none');
                      uodata();
              });

      });
    }

  });

})
