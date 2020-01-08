$(document).ready(function(){
          var href = location.href;
          var hrefDetails = decodeURIComponent(href);
         var dataL = localStorage.getItem("GHY_Mlogin");
          var data1 = JSON.parse(dataL)
          if(hrefDetails.indexOf("=") < 0 ){
              location.href ="../html/M_index.html"
            }else{
                var modelName = hrefDetails.split("=")[1];
            }
            var dataModel,money,payType;
            $.post(''+EQD_url+'/Admin/ComSpace/Get_ComSpaceModularInfo.ashx', {
              "ModularName" : modelName,
              "companyId" : data1.companyId,
               }, function(data) {
                    dataModel = JSON.parse(data)
                    $('.goodName').text( dataModel.items.ModularName )
                    $('.goodDesc').text( dataModel.items.ModularDescribe )
                    money = dataModel.items.VipPrice
                    $('#moneyVal').text( money )
                  $('#chooseTime').change(function() {
                       money =  $(this).val()*dataModel.items.VipPrice
                      $('#moneyVal').text( money )
                    });
                      if ( dataModel.items.powerEndTime == null) {
                                   var myDate = new Date();
                                   var yuefen = Number(myDate.getMonth())+1;
                                   var tianshu2 = myDate.getDate();
                                   if (yuefen <10) {
                                       var yueFen = "0"+yuefen;
                                   }else{
                                    yueFen = yuefen;
                                   }
                                   if (tianshu2 <10) {
                                    var tianshuNew2 = "0"+tianshu2;
                                   }else{
                                    tianshuNew2 = tianshu2;
                                   }
                                  var jintian = (myDate.getFullYear()+"-"+yueFen+"-"+tianshuNew2);
                                  $('#testB').val(jintian);
                      }else{
                            var dataDay = dataModel.items.powerEndTime.split(" ")[0]
                                dataDay = dataDay.replace(/\//g, "-")
                                $('#testB').val( dataDay );
                                $('#testB').siblings('span').text("续费日期")
                                $('#testB').attr('disabled', 'true');
                                $('#chooseTime').siblings('span').text("续费年限")
                      }
                    if ( dataModel.items.ModularName =="日志" ) {
                            payType = "2";
                    }else if( dataModel.items.ModularName =="留言" ){
                            payType = "3";
                    }
                    // 支付宝
                    $('.aliPay').click(function(event) {
                      if ( $('#testB').val().length == 0 ) {
                        layer.msg('请完善信息', {
                                        time: 1000,
                                       });
                      }else{
                             $.get(''+EQD_url+'/Alipay/WebAlipay.aspx',{
                                      "Body" : " ",
                                      "Subject" : dataModel.items.ModularName,
                                      "OrderType" : "企业空间",
                                      "companyId" : data1.companyId,
                                      "userGuid" : data1.Guid,
                                      "funcType" : payType,
                                      "statrTime" : $('#testB').val(),
                                      "years" : $('#chooseTime').val(),
                                      "returnUrl" : "https://www.eqidd.com/html/zhifubaoPayed.html"
                                      }, function(data) {
                                        document.write( data );
                       });
                      }
            });
          $('.top span').text( data1.company )
          laydate.render({
              elem: '#testB'
              ,type: 'date'
          });
          });
          // 微信
          var timer1;
          $('.weChat').click(function() {
              if ( $('#testB').val().length == 0 ) {
                        layer.msg('请完善信息', {
                                        time: 1000,
                                       });
                      }else{
                        $('.weixinPayDiv>div>img').remove()
                          $.post(''+EQD_url+'/WeChatPay/WeChatPay.ashx', {
                            "body" : " ",
                            "attach" : dataModel.items.ModularName,
                            "OrderType" : "企业空间",
                            "companyId" : data1.companyId,
                            "userGuid" : data1.Guid,
                            "funcType" : payType,
                            "statrTime" : $('#testB').val(),
                            "years" : $('#chooseTime').val(),
                          }, function(data) {
                               var dataWechatPay = JSON.parse(data)
                               if ( dataWechatPay.status == 200 ) {
                                  var ghy = decodeUnicode(dataWechatPay.items)
                                new QRCode(document.getElementById("qrcode"), ""+ghy+"");
                                        layer.open({
                                           type: 1,
                                           area: ['400px','400px'],
                                           title: ['微信扫码支付', 'font-size:18px;text-align: center;'],
                                           content: $(".weixinPayDiv"),
                                        });
                                        $('.payVal').text( $('#moneyVal').text() )
                                            timer1 = setInterval(function(){ checkPayStatus(dataWechatPay.OrderCode) }, 1000);
                                        }else{
                                          layer.msg(dataWechatPay.msg, {
                                            time: 1000,
                                           });
                                        }
                          });
                      }
          });
function decodeUnicode(str) {
    str = str.replace(/\\/g, "%");
    return unescape(str);
}
// 查询支付状态
function checkPayStatus(num){
  $.post(''+EQD_url+'/WeChatPay/Get_WeChatPyStatus.ashx', {"OrderCode" : num}, function(data) {
    var dataPayed = JSON.parse(data)
    if ( dataPayed.status == 200 ) {
      window.clearTimeout(timer1);
      layer.closeAll();
      layer.msg('支付完成', {
                          time: 5000,
                     });
      setTimeout(function load(){
        window.close();
      },6000)
    }
  });
}
          // 线下付款
          $('.payFace').click(function() {
                          layer.msg('联系电话 : 13849110116',{
                time: 10000
              })
          });

})
