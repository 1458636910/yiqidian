$(document).ready(function(){
    var dataCode,hCode,rCode,newRow,newRow2;
    var depId = 0 ;
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
        $('#test5').val(jintian);
          redPoint()
          // 打印表格
          function print(name){
              var printData = $(''+name+'').html();
              window.document.body.innerHTML = printData;
              // 开始打印
              window.print();
              window.location.reload(true);
          }
          // function print2(){
          //     var printData = $('#zaizhirenyuanTable').parent().html();
          //     window.document.body.innerHTML = printData;
          //     // 开始打印
          //     window.print();
          //     window.location.reload(true);
          // }
          function printIDcard(){
              var printData = $('.tableDet').html();
              window.document.body.innerHTML = printData;
              document.getElementsByTagName('')
              // 开始打印
              window.print();
              window.location.reload(true);
          }
          $('.printInfo').click(function() {
            printIDcard()
          });
          window.personmoreEvents={
                    'click .personMore': function (e, value, row, index) {
                                                      console.log( row )
                                                      layer.open({
                                                            type: 1,
                                                            area: ['1000px', '600px'],
                                                            title: ['员工详细资料', 'font-size:18px;'],
                                                            content: $('.personDetail'),
                                                      });
                                                      $('.comName').text(row.companyName)
                                                      $('.workerCode').text(row.JobNumber)
                                                      $('.perName').text(row.uname);
                                                      if (row.usex == 1) {
                                                        row.usex ="女";
                                                      }else{row.usex = "男"}
                                                      $('.perSex').text(row.usex);
                                                      $('.departName').text(row.departName);
                                                      $('.umarry').text(row.umarry);
                                                      $('.postName').text(row.postName);
                                                      var str2 = row.udate.substring(0,10)
                                                      $('.udate').text(str2);
                                                      $('.idRight').text(row.uidnum);
                                                      $('.userPhone').text(row.userPhone);
                                                      $('.uhouseadress').text(row.uhouseadress);
                                                      $('.uhousetype').text(row.uhousetype);
                                                      $('.upoliticstate').text(row.upoliticstate);
                                                      $('.uedu').text(row.uedu);
                                                      $('.umajor').text(row.upskill);
                                                      $('.upskill').text(row.umajor);
                                                      $('.ucontactname').text(row.ucontactname);
                                                      $('.uscontactrelat').text(row.uscontactrelat);
                                                      $('.uscontact').text(row.uscontact);
                                                      $('.unation').text(row.unation);
                                                      $('.ublood').text(row.ublood);
                                                      $('.uheigh').text(row.uheigh);
                                                      $('.uweigh').text(row.uweigh);
                                                      $('.ubelief').text(row.ubelief);
                                                      $('.upadress').text(row.upadress);
                                                      $('.uwchat').text(row.uwchat);
                                                      $('.umail').text(row.umail);
                                                      $('.ugrad').text(row.ugrad);
                                                      $('.uinterest').text(row.uinterest);
                                                      $('.uforeignclass').text(row.uforeignclass);
                                                      $('.usocialsecuritynum').text(row.usocialsecuritynum);
                                     },
                    'click .personInfo': function (e, value, row, index) {
                          newRow = row;
                          layer.open({
                                   type: 1,
                                   area: ['1000px', '600px'],
                                   title: ['员工身份证', 'font-size:18px;'],
                                   shadeClose: true, //点击遮罩关闭
                                   content: $('.peosonID'),
                            });
                            $('.idcardImg .font img').attr('src', row.uidumfrontphoto);
                            $('.idcardImg .back img').attr('src', row.uidumbackphoto);
                            $('.idcardImg .withHand img').attr('src', row.uwithidumphoto);
                            $('.layui-layer-close').click(function() {
                                  $('.idcardImg .font img').removeAttr('src');
                                  $('.idcardImg .back img').removeAttr('src');
                                  $('.idcardImg .withHand img').removeAttr('src');
                              });
                    }
                  }
          var arrZaizhi = [];
          var dataZaizhi ;
          function zaizhi(){
                  $.post(''+EQD_url+'/Com/Com_Staff.ashx', {
                         "companyId":data1.companyId,
                         "page":0,
                         "userGuid" :data1.Guid
                         }, function(data) {
                               dataZaizhi = JSON.parse(data);
                              if (dataZaizhi.status ==200) {
                                arrZaizhi = dataZaizhi.items.listModel;
                                loadzaizhi(arrZaizhi)
                                if ( dataZaizhi.items.listModel.length <10 ) {
                                  $('.loadAll').show();
                                  $('.loadMore').hide();
                                }else{
                                  $('.loadAll').hide();
                                  $('.loadMore').show();
                                }
                              }
                  });
            }
                  $('.loadMore').click(function() {
                        $.post(''+EQD_url+'/Com/Com_Staff.ashx', {
                                "companyId":data1.companyId,
                                "page":dataZaizhi.items.page
                                }, function(data) {
                                   dataZaizhi = JSON.parse(data);
                                  for (var i = 0; i < dataZaizhi.items.listModel.length; i++) {
                                    arrZaizhi.push(dataZaizhi.items.listModel[i])
                                  }
                                   loadzaizhi(arrZaizhi)
                                  if ( dataZaizhi.items.listModel.length <10 ) {
                                    $('.loadAll').show();
                                    $('.loadMore').hide();
                                      }else{
                                        $('.loadAll').hide();
                                        $('.loadMore').show();
                                  }
                          });
                  });
                      function loadzaizhi(data){
                            var arrZaizhiload = data
                            $('#zaizhirenyuanTable').bootstrapTable({
                                  url: arrZaizhiload,
                                  columns: [
                                          {
                                              field: 'JobNumber',
                                              title: '工号',
                                          },
                                          {
                                              field: 'uname',
                                              title: '姓名',
                                          },
                                          {
                                              field: 'usex',
                                              title: '性别',
                                              formatter:sexFormatter
                                          },
                                          {
                                              field: 'unation',
                                              title: '民族',
                                          },
                                          {
                                              field: 'udate',
                                              title: '出生日期',
                                              formatter:birthFormatter
                                          },
                                          {
                                              field: 'urdate',
                                              title: '生日',
                                          },
                                          {
                                              field: 'uidnum',
                                              title: '身份证号码',
                                          },
                                          {
                                              field: 'uhousetype',
                                              title: '户口性质',
                                          },
                                          {
                                              field: 'uhouseadress',
                                              title: '户籍地址',
                                          },
                                          {
                                              field: 'upadress',
                                              title: '现住址',
                                          },
                                          {
                                              field: 'umarry',
                                              title: '婚否',
                                          },
                                          {
                                              field: 'uheigh',
                                              title: '身高',
                                          },
                                          {
                                              field: 'uweigh',
                                              title: '体重',
                                          },
                                          {
                                              field: 'ublood',
                                              title: '血型',
                                          },
                                          {
                                              field: 'upoliticstate',
                                              title: '政治面貌',
                                          },
                                          {
                                              field: 'uinterest',
                                              title: '兴趣爱好',
                                          },
                                          {
                                              field: 'userPhone',
                                              title: '手机号码',
                                          },
                                          {
                                              field: 'uqq',
                                              title: 'QQ',
                                          },
                                          {
                                              field: 'uwchat',
                                              title: '微信',
                                          },
                                          {
                                              field: 'umail',
                                              title: '邮箱',
                                          },
                                          {
                                              field: 'ucontactname',
                                              title: '紧急联系人',
                                          },
                                          {
                                              field: 'uscontactrelat',
                                              title: '与之关系',
                                          },
                                          {
                                              field: 'uscontact',
                                              title: '紧急联系人电话',
                                          },
                                          {
                                              field: 'ugrad',
                                              title: '毕业院校',
                                          },
                                          {
                                              field: 'umajor',
                                              title: '专业',
                                          },
                                          {
                                              field: 'uedu',
                                              title: '文化程度',
                                          },
                                          {
                                              field: 'upskill',
                                              title: '职业资格',
                                          },
                                          {
                                              field: 'uforeignclass',
                                              title: '外语等级',
                                          },
                                          {
                                              field: 'signEntryTime',
                                              title: '入职日期',
                                              formatter:ruzhiTimeFormatter
                                          },
                                          {
                                              field: 'signEntryTime',
                                              title: '劳动合同',
                                              formatter:signTimeFormatter
                                          },
                                          {
                                              field: 'departName',
                                              title: '部门',
                                          },
                                          {
                                              field: 'postName',
                                              title: '岗位',
                                          },

                                            {
                                              field: 'more',
                                              title: '查看更多',
                                              events:personmoreEvents,
                                              formatter:zaizhirenyuanFormatter
                                          }
                                      ]
                            });
                            $("#zaizhirenyuanTable").bootstrapTable('load',arrZaizhiload);
                            function ruzhiTimeFormatter(e,value, row, index){
                                       var ruzhiTimeShow;
                                              ruzhiTimeShow = (value.InviteTime).split("T")[0];
                                             return [
                                              ruzhiTimeShow
                                              ].join('');
                              }
                              function signTimeFormatter(e,value, row, index){
                                       var signTimeShow;
                                       if (value.signEntryTime == null || value.signEntryTime == "2100-01-01T00:00:00") {
                                              signTimeShow = "未签订劳动合同"
                                       }else{
                                              signTimeShow = (value.signEntryTime).split("T")[0];
                                       }
                                             return [
                                              signTimeShow
                                              ].join('');
                              }
                              function sexFormatter(e,value, row, index){
                                       var sexZaizhi;
                                       if (value.usex == 1) {
                                              sexZaizhi = "女"
                                       }else{
                                              sexZaizhi = "男"
                                       }
                                             return [
                                              sexZaizhi
                                              ].join('');
                              }
                              function birthFormatter(e,value, row, index){
                                       var birthDay;
                                       birthDay = value.udate.split("T")[0];
                                             return [
                                              birthDay
                                              ].join('');
                              }
                              function zaizhirenyuanFormatter(e,value, row, index){
                                       return [
                                          '<a class="personInfo"  title="身份证信息">',
                                          '<span id="personInfo">身份证信息</span>',
                                          '</a>  ',
                                          '<a class="personMore"  title="查看个人详情">',
                                          '<span id="personMore">查看</span>',
                                          '</a>  ',
                                        ].join('');
                              }
                              $('.peosonID .idcardImg img').click(function() {
                                                               layer.photos({
                                                                    photos: {
                                                                        "title": "大图",
                                                                        "id": 1,
                                                                        "start": 0,
                                                                        "data": [
                                          {"alt": "身份证正面照","pid": 1,"src": newRow.uidumfrontphoto,"thumb": newRow.uidumfrontphoto},
                                          {"alt": "身份证反面照","pid": 3,"src": newRow.uidumbackphoto,"thumb": newRow.uidumbackphoto},
                                          {"alt": "手持身份证照","pid": 4,"src": newRow.uwithidumphoto,"thumb": newRow.uwithidumphoto}
                                                                                  ]
                                                                    },
                                                                    anim: 5
                                                                  });
                                                             });
                          }
    $('.yuangongZhuangkuang').click(function() {
      $('.zaizhirenyuan').slideToggle(200);
      $('.lizhirenyuan').slideToggle(200);
    });
    $('.zaizhirenyuan').click(function() {
                $(this).addClass('pcheck').siblings('p').removeClass('pcheck');
                $('.zaizhiRenyuan').show().siblings('div').hide();
                zaizhi()
      });
	  
      function redPoint(){
              $.post(''+EQD_url+'/userashx/GetCount_MsgCode.ashx', {
                   "userGuid":data1.Guid
              }, function(data) {
                dataCode = JSON.parse(data);
                // 合同小红点值
                for (var i = 0; i < dataCode.items.length; i++) {
                  if ( dataCode.items[i].code == 161 ) {
                hCode = dataCode.items[i].count
                  }
                  // 入职审批小红点值
                  if ( dataCode.items[i].code == 151 ) {
                rCode = dataCode.items[i].count
                  }
                }
                 $("#hetongCode").text(hCode);
                 $("#hetongCodeAll").text(hCode);
                 $(".ruzhiCode").text(rCode);
                 $('#danganCodeAll').text( ( Number($("#hetongCode").text())+ Number($(".ruzhiCode").text()) )  );
                 if ( $('#danganCodeAll').text() == 0 ) {
                  $('#danganCodeAll').css('display', 'none');
                 }
              });
            }
            setInterval(function(){ redPoint() }, 3000);
      $("#dangan").click(function() {
              $(".zaizhirenyuan").addClass('pcheck').siblings('p').removeClass('pcheck');
              $('.titlelist ul li').eq(3).addClass('active').siblings('li').removeClass('active');
              $('.yuangongDangan').show();
              $('.maintext').hide();
              $('.qiyeOption').hide();
              $('.shezhiOption').hide();
              zaizhi()
              })
              redPoint()
              laydate.render({
               elem: '#test4',
               max:0,
              });
             laydate.render({
               elem: '#test5',
               max:0,
              });
     $('.chooseDepart input').click(function() {
      $(".cover").show();
            layer.open({
              type: 1,
              area: ['250px','500px'],
              title: ['选择部门', 'font-size:18px;'],
              content: $('.choosedepartTable'),
              shade: false
        });
            $('span[id^=treeDemoChoose2]').click(function() {
                $('.chooseDepart input').val(G_treeNode.departName);
                if ( $('.chooseDepart input').val() == G_treeNode.departName) {
                  depId = G_treeNode.departId;
                }
                layer.closeAll();
                $(".cover").hide();
            });
           $('.layui-layer-setwin').click(function() {
                    $(".cover").hide();
            });
  });
     $('.zaizhisearchBtn').click(function() {
       $.post(''+EQD_url+'/Com/Get_Staff_BySearch.ashx', {
        "userGuid":data1.Guid,
        "companyId":data1.companyId,
        // "departmentId":depId,
        "joinStartTime":$('#test4').val(),
        "joinEndTime":$('#test5').val(),
       }, function(data) {
         var dataSearch = JSON.parse(data);
$("#zaizhirenyuanTable").bootstrapTable('load',dataSearch.items);
       });
     });
     // 搜索在职员工
        $('#searchOnWorkVal').keydown(function() {
                       if (event.keyCode === 13){
                        if ( $('#searchOnWorkVal').val().length == 0 ) {
                            layer.msg('请输入搜索内容', {
                                                          time: 1000,
                                                        });
                        }else{
                                loadsearchOnwork($('#searchOnWorkVal').val())
                        }
                    }
            });
        $('.zaizhisearchBtn2').click(function() {
          if ( $('#searchOnWorkVal').val().length == 0 ) {
                            layer.msg('请输入搜索内容', {
                                                          time: 1000,
                                                        });
                        }else{
                                loadsearchOnwork($('#searchOnWorkVal').val())
                        }
        });
        // 搜索在职员工函数
        function loadsearchOnwork(searchVal){
          $.post(''+EQD_url+'/Com/User_Search.ashx', {
                              "userGuid" :data1.Guid,
                              "companyId" :data1.companyId,
                              "para" : searchVal
                              }, function(data) {
                                var dataSearchVal = JSON.parse(data);
                                if ( dataSearchVal.status == 200 ) {
                                  $("#zaizhirenyuanTable").bootstrapTable('load',dataSearchVal.items);
                                }
                              });
        }
        $('#dangan').click(function(){
        	 zaizhi();
        })
         $('.zaizhiRenyuan').show().siblings('div').hide();
      // *****************************在职人员***************************************************
      // *****************************离职人员***************************************************
        var arrLizhi = [];
        var datalizhi;
        $('.lizhirenyuan').click(function() {
            $(this).addClass('pcheck').siblings('p').removeClass('pcheck');
            $('.lizhiRenyuan').show().siblings('div').hide();
              loadlizhiFirst(0)
        });
          function loadlizhiFirst(page){
            $.post(''+EQD_url+'/Com/Com_Staff_Quit.ashx', {
                            "companyId":data1.companyId,
                            "page":page,
                            "userGuid" :data1.Guid,
                  }, function(data) {
                     datalizhi = JSON.parse(data);
                      arrLizhi = datalizhi.items.listModel;
                    if ( datalizhi.items.listModel.length <10 ) {
                      $('.loadAll2').show();
                      $('.loadMore2').hide();
                    }else{
                      $('.loadAll2').hide();
                      $('.loadMore2').show();
                    }
                        loadliZhi(arrLizhi);
                        $('.loadMore2').click(function() {
                            $.post(''+EQD_url+'/Com/Com_Staff_Quit.ashx', {
                              "companyId":data1.companyId,
                              "page":datalizhi.items.page
                            }, function(data) {
                              datalizhi = JSON.parse(data)
                              for (var i = 0; i < datalizhi.items.listModel.length; i++) {
                                arrLizhi.push(datalizhi.items.listModel[i])
                              }
                              if ( datalizhi.items.listModel.length <10 ) {
                                $('.loadAll2').show();
                                $('.loadMore2').hide();
                              }else{
                                $('.loadAll2').hide();
                                $('.loadMore2').show();
                              }
                            });
                        })
                     });
          }
        function loadliZhi(data){
                var arrLizhiload = data;
                $('#lizhirenyuanTable').bootstrapTable({
                      url:arrLizhiload,
                      columns: [
                                          {
                                              field: 'uname',
                                              title: '姓名',
                                          },
                                          {
                                              field: 'usex',
                                              title: '性别',
                                              formatter:sexFormatter2
                                          },
                                          {
                                              field: 'unation',
                                              title: '民族',
                                          },
                                          {
                                              field: 'udate',
                                              title: '出生日期',
                                              formatter:birthFormatter2
                                          },
                                          {
                                              field: 'urdate',
                                              title: '生日',
                                          },
                                          {
                                              field: 'uidnum',
                                              title: '身份证号码',
                                          },
                                          {
                                              field: 'uhousetype',
                                              title: '户口性质',
                                          },
                                          {
                                              field: 'uhouseadress',
                                              title: '户籍地址',
                                          },
                                          {
                                              field: 'upadress',
                                              title: '现住址',
                                          },
                                          {
                                              field: 'umarry',
                                              title: '婚否',
                                          },
                                          {
                                              field: 'uheigh',
                                              title: '身高',
                                          },
                                          {
                                              field: 'uweigh',
                                              title: '体重',
                                          },
                                          {
                                              field: 'ublood',
                                              title: '血型',
                                          },
                                          {
                                              field: 'upoliticstate',
                                              title: '政治面貌',
                                          },
                                          {
                                              field: 'uinterest',
                                              title: '兴趣爱好',
                                          },
                                          {
                                              field: 'userPhone',
                                              title: '手机号码',
                                          },
                                          {
                                              field: 'uqq',
                                              title: 'QQ',
                                          },
                                          {
                                              field: 'uwchat',
                                              title: '微信',
                                          },
                                          {
                                              field: 'umail',
                                              title: '邮箱',
                                          },
                                          {
                                              field: 'ucontactname',
                                              title: '紧急联系人',
                                          },
                                          {
                                              field: 'uscontactrelat',
                                              title: '与之关系',
                                          },
                                          {
                                              field: 'uscontact',
                                              title: '紧急联系人电话',
                                          },
                                          {
                                              field: 'ugrad',
                                              title: '毕业院校',
                                          },
                                          {
                                              field: 'umajor',
                                              title: '专业',
                                          },
                                          {
                                              field: 'uedu',
                                              title: '文化程度',
                                          },
                                          {
                                              field: 'upskill',
                                              title: '职业资格',
                                          },
                                          {
                                              field: 'uforeignclass',
                                              title: '外语等级',
                                          },
                                          {
                                              field: 'quitTime',
                                              title: '离职日期',
                                              formatter:lizhiTimeFormatter
                                          },
                                          {
                                              field: 'departName',
                                              title: '部门',
                                          },
                                          {
                                              field: 'postName',
                                              title: '岗位',
                                          },
                                          {
                                            field: 'more2',
                                            title: '查看更多',
                                            events:lizhimoreEvents,
                                            formatter:lizhirenyuanFormatter
                                        }
                  ]
                 });
                $('#lizhirenyuanTable').bootstrapTable('load', arrLizhiload);
                function lizhirenyuanFormatter(e,value, row, index){
                         return [
                            '<a class="personInfo2"  title="身份证信息">',
                            '<span id="personInfo2">查看身份证</span>',
                            '</a>  ',
                            '<a class="personMore"  title="personMore">',
                            '<span id="personMore">查看</span>',
                            '</a>  ',
                          ].join('');
                }
                function lizhiTimeFormatter(e,value, row, index){
                                       var lizhiTimeShow;
                                              lizhiTimeShow = (value.quitTime).split(" ")[0];
                                             return [
                                              lizhiTimeShow
                                              ].join('');
                              }
                function sexFormatter2(e,value, row, index){
                                       var sexZaizhi;
                                       if (value.usex == 1) {
                                              sexZaizhi = "女"
                                       }else{
                                              sexZaizhi = "男"
                                       }
                                             return [
                                              sexZaizhi
                                              ].join('');
                              }
                function birthFormatter2(e,value, row, index){
                          var birthDay;
                          birthDay = value.udate.split("T")[0];
                                return [
                                 birthDay
                                 ].join('');
                }
                $('.peosonID2 .idcardImg img').click(function() {
                                                               layer.photos({
                                                                    photos: {
                                                                        "title": "大图",
                                                                        "id": 4,
                                                                        "start": 0,
                                                                        "data": [
                                          {"alt": "身份证正面照","pid": 1,"src": newRow2.uidumfrontphoto,"thumb": newRow2.uidumfrontphoto},
                                          {"alt": "身份证反面照","pid": 3,"src": newRow2.uidumbackphoto,"thumb": newRow2.uidumbackphoto},
                                          {"alt": "手持身份证照","pid": 4,"src": newRow2.uwithidumphoto,"thumb": newRow2.uwithidumphoto}
                                                                                  ]
                                                                    },
                                                                    anim: 5
                                                                  });
                                                             });
        }

window.lizhimoreEvents = {
                               'click .personMore': function (e, value, row, index) {
                                  layer.open({
                                        type: 1,
                                        area: ['1000px', '600px'],
                                        title: ['离职人员详细资料', 'font-size:18px;'],
                                        shadeClose: true, //点击遮罩关闭
                                        content: $('.personDetail2'),
                                  });
                                    $('.idcardImg .font img').attr('src', row.uidumfrontphoto);
                                    $('.idcardImg .back img').attr('src', row.uidumbackphoto);
                                    $('.idcardImg .withHand img').attr('src', row.uwithidumphoto);
                                    $('.perName').text(row.uname);
                                    if (row.usex == 1) {
                                      row.usex ="女";
                                    }else{row.usex = "男"}
                                                      $('.comName').text(row.companyName)
                                                      $('.perSex').text(row.usex);
                                                      $('.departName').text(row.departName);
                                                      $('.umarry').text(row.umarry);
                                                      $('.postName').text(row.postName);
                                                      var str2 = row.udate.substring(0,10)
                                                      $('.udate').text(str2);
                                                      $('.idRight').text(row.uidnum);
                                                      $('.userPhone').text(row.userPhone);
                                                      $('.uhouseadress').text(row.uhouseadress);
                                                      $('.uhousetype').text(row.uhousetype);
                                                      $('.upoliticstate').text(row.upoliticstate);
                                                      $('.uedu').text(row.uedu);
                                                      $('.umajor').text(row.upskill);
                                                      $('.upskill').text(row.umajor);
                                                      $('.ucontactname').text(row.ucontactname);
                                                      $('.uscontactrelat').text(row.uscontactrelat);
                                                      $('.uscontact').text(row.uscontact);
                                                      $('.unation').text(row.unation);
                                                      $('.ublood').text(row.ublood);
                                                      $('.uheigh').text(row.uheigh);
                                                      $('.uweigh').text(row.uweigh);
                                                      $('.ubelief').text(row.ubelief);
                                                      $('.upadress').text(row.upadress);
                                                      $('.uwchat').text(row.uwchat);
                                                      $('.umail').text(row.umail);
                                                      $('.ugrad').text(row.ugrad);
                                                      $('.uinterest').text(row.uinterest);
                                                      $('.uforeignclass').text(row.uforeignclass);
                                                      $('.usocialsecuritynum').text(row.usocialsecuritynum);
                                                      $('.layui-layer-close').click(function() {
                                                            $('.idcardImg .font img').removeAttr('src');
                                                            $('.idcardImg .back img').removeAttr('src');
                                                            $('.idcardImg .withHand img').removeAttr('src');
                                                                        });
                              },
                              'click .personInfo2': function (e, value, row, index) {
                                newRow2 = row;
                                layer.open({
                                        type: 1,
                                        area: ['1000px', '600px'],
                                        title: ['离职人员身份证信息', 'font-size:18px;'],
                                        content: $('.peosonID2'),
                                  });
                                $('.peosonID2 .idcardImg .font img').attr('src', row.uidumfrontphoto);
                                $('.peosonID2 .idcardImg .back img').attr('src', row.uidumbackphoto);
                                $('.peosonID2 .idcardImg .withHand img').attr('src', row.uwithidumphoto);
                                $('.layui-layer-close').click(function() {
                                      $('.peosonID2 .idcardImg .font img').removeAttr('src');
                                      $('.peosonID2 .idcardImg .back img').removeAttr('src');
                                      $('.peosonID2 .idcardImg .withHand img').removeAttr('src');
                                  });
                              }
                        }

// 入住邀请************************************************************************
    $('.ruzhuyaoqing').click(function() {
//          $(this).addClass('pcheck').siblings('p').removeClass('pcheck');
            $('.ruzhuYaoqing').show().siblings('div').hide();
            $.post(''+EQD_url+'/User_getcompost.ashx', {
              "comid":data1.companyId,
              "userGuid":data1.Guid
            }, function(data) {
              var dataRuzhu = JSON.parse(data);
                  $('#ruzhuTable').bootstrapTable({
                    url: dataRuzhu.items,
                    columns: [
                    {
                        field: 'name',
                        title: '职位名称'
                    },
                    {
                        field: 'dename',
                        title: '部门名称',
                    },
                      {
                        field: 'yaoqing',
                        title: '操作',
                        events:yaoqingEvents,
                        formatter:yaoqingFormatter
                    }
                    ]
                });
                $("#ruzhuTable").bootstrapTable('load', dataRuzhu.items);
                function yaoqingFormatter(e,value, row, index){
                     return [
                        '<a class="yaoQing"  title="yaoQing" href="../html/invitePost.html?v='+Math.random()+'" target="_blank">',
                        '<span id="yaoQing">邀请人员</span>',
                        '</a>  ',
                      ].join('');
                };
              });
                window.yaoqingEvents = {
                          'click .yaoQing': function (e, value, row, index) {
                                var strYaoqing = JSON.stringify(row); // 将对象转换为字符串
                                sessionStorage.setItem("GHY_Yao",strYaoqing);
                          }
                };
});
// *******************************************************邀请记录**********************************
    $('.yaoqingRecord').click(function(event) {
//        $(this).addClass('pcheck').siblings('p').removeClass('pcheck');
          $('.yaoqingRecordDiv').show().siblings('div').hide();
          loadRecord(0)
          $("#page").Page({
              totalPages: 100,//total Pages
              liNums: 5,//the li numbers(advice use odd)
              activeClass: 'activP', //active class style
              prv: '<',//prev button name
              next: '>',//next button name
              hasPrv: true,//whether has prev button
              hasNext: true,//whether has next button
              callBack : function(page){
                  loadRecord(page-1)
              }
          });
    });
    function loadRecord(page){
        $.post(''+EQD_url+'/Com/Get_AdminInvitation.ashx', {
              "userGuid":data1.Guid,
              "companyId":data1.companyId,
              "page":page
              }, function(data) {
                var dataRecord = JSON.parse(data);
                $('#yaoqingRecordTable').bootstrapTable({
                    url: dataRecord.items,
                    columns: [
                    {
                        field: 'department',
                        title: '部门名称'
                    },
                    {
                        field: 'post',
                        title: '职位名称',
                    },
                    {
                        field: 'userPhone',
                        title: '手机号',
                    },
                    {
                        field: 'createTime',
                        title: '邀请时间',
                    },
                    {
                        field: 'status',
                        title: '状态',
                        formatter:statusFormatter
                    },
                    ]
                });
                $("#yaoqingRecordTable").bootstrapTable('load', dataRecord.items);
                function statusFormatter(e,value, row, index){
                  if ( value.status == 0 ) {
                    var statusShow = "等待用户确认"
                  }else if( value.status == 1 ){
                          statusShow = "等待管理员再次确认"
                  }else if( value.status == 2 ){
                          statusShow = "已成功加入"
                  }else if( value.status == 3 ){
                          statusShow = "管理员拒绝"
                  }else{
                          statusShow = "离职"
                  }
                    return [
                             statusShow
                              ].join('');

                }
              });
      }
//  *******************************************************入职审批***********************************
    var dataRuzhu,ruzhuDetail;
    $('.ruzhishenpi').click(function() {
      rCode = "";
//          $(this).addClass('pcheck').siblings('p').removeClass('pcheck');
            $('.ruzhiShenpi').show().siblings('div').hide();
            $.post(''+EQD_url+'/userashx/ResetCount_MsgCode.ashx', {
              "userGuid":data1.Guid,
              "code":151
            }, function(data) {
            });
            $(".ruzhiCode").text("")
            $('#danganCodeAll').text(  Number($("#hetongCode").text())  );
            if ( $('#danganCodeAll').text() == 0 ) {
                  $('#danganCodeAll').css('display', 'none');
                 }
                 loadRuzhi()
    });
          function loadRuzhi(){
            $.post(''+EQD_url+'/User_GetBeInviter.ashx', {
              "userGuid":data1.Guid,
               }, function(data) {
                   dataRuzhu = JSON.parse(data);
                   ruzhuDetail = dataRuzhu.items;
                            $('#ruzhishenpiTable').bootstrapTable({
                                  url: dataRuzhu.items,
                                  columns: [
                                          // {
                                          //     field: 'uiphoto',
                                          //     title: '头像',
                                          //     formatter: ruzhishenpiFormatter
                                          // },
                                          {
                                              field: 'uname',
                                              title: '姓名',
                                          },
                                          {
                                              field: 'departName',
                                              title: '部门',
                                          },
                                          {
                                              field: 'postName',
                                              title: '职位',
                                          },
                                           {
                                              field: 'userPhone',
                                              title: '手机号',
                                          },
                                            {
                                              field: 'more',
                                              title: '详细信息',
                                              events:ruzhioptionEvents,
                                              formatter:ruzhioptionFormatter
                                          }
                                  ]
                            });
                            $("#ruzhishenpiTable").bootstrapTable('load',dataRuzhu.items);
            });
                    // function ruzhishenpiFormatter(e,value, row, index){
                    //          var  photourl =value.uiphoto;
                    //                return [
                    //                 '<img src=',
                    //                 photourl,
                    //                 ' alt="暂无"/>',
                    //                 ].join('');
                    // }
                    function ruzhioptionFormatter(e,value, row, index){
                             return [
                                '<a class="ruzhiMore"  title="ruzhiMore">',
                                '<span id="ruzhiMore">查看</span>',
                                '</a>  ',
                              ].join('');
                    }
        }
    window.ruzhioptionEvents={
                                                 'click .ruzhiMore': function (e, value, row, index) {
                                                      layer.open({
                                                            type: 1,
                                                            area: ['1000px', '600px'],
                                                            title: ['入职人员详细资料', 'font-size:18px;'],
                                                            // shadeClose: true, //点击遮罩关闭
                                                            content: $('.ruzhishenpiDet'),
                                                      });
                                                        $('.ruzhuPics div').click(function() {
                                                         layer.photos({
                                                              photos: {
                                                                  "title": "大图",
                                                                  "id": 3,
                                                                  "start": 0,
                                                                  "data": [
                                                                            {"alt": "身份证正面照","pid": 1,"src": row.uidumfrontphoto,"thumb": row.uidumfrontphoto},
                                                                            {"alt": "身份证反面照","pid": 3,"src": row.uidumbackphoto,"thumb": row.uidumbackphoto},
                                                                            {"alt": "手持身份证照","pid": 4,"src": row.uwithidumphoto,"thumb": row.uwithidumphoto}
                                                                            ]
                                                              },
                                                              anim: 5
                                                            });
                                                        });
                                                      var ruzhuDate  = row.udate.substring(0,10);
                                                      if ( row.usex  == "0") {
                                                          var sexT = "男";
                                                        }else{
                                                              sexT = "女";
                                                        }
                                                      $('.picFont img').attr('src', row.uidumfrontphoto);
                                                      $('.picBack img').attr('src', row.uidumbackphoto);
                                                      $('.picWith img').attr('src', row.uwithidumphoto);
                                                      $('.ruzhunameVal').text(row.uname);
                                                      $('.ruzhuSex').text(sexT);
                                                      $('.ruzhuEduval').text(row.uedu);
                                                      $('.ruzhuDepval').text(row.departName);
                                                      $('.ruzhuPostval').text(row.postName);
                                                      $('.ruzhuMarryval').text(row.umarry);
                                                      $('.ruzhuNationval').text(row.unation);
                                                      $('.ruzhuData').text(ruzhuDate);
                                                      $('.ruzhuIDnum').text(row.uidnum);
                                                      $('.ruzhuMajor').text(row.umajor);
                                                      $('.ruzhuHousetype').text(row.uhousetype);
                                                      $('.ruzhuHouseaddress').text(row.uhouseadress);
                                                      $('.ruzhuPoliticstate').text(row.upoliticstate);
                                                      $('.ruzhuTel').text(row.userPhone);
                                                      $('.refuse').click(function() {
                                                        if ( $('#refouseReason').val().length == 0 ) {
                                                            layer.msg("请填写拒绝原因", {
                                                                             time: 1000,
                                                                                   });
                                                        }else{
                                                            $.post(''+EQD_url+'/User_InvertRefuse.ashx', {
                                                              "userGuid":row.Inviter,
                                                              "entryId":row.entryId,
                                                              "userPhone":row.userPhone,
                                                              "message" :$('#refouseReason').val()
                                                            }, function(data) {
                                                              var dataRefused =JSON.parse(data)
                                                              if (dataRefused.status == 200) {
                                                                    layer.closeAll();
                                                                    loadRuzhi()
                                                              }
                                                            });
                                                          }
                                                     });
                                                      $('.accept').click(function() {
                                                            $.post(''+EQD_url+'/User_InvertAgree.ashx',{
                                                              "userGuid":row.Inviter,
                                                              "entryId":row.entryId,
                                                              "userPhone":row.userPhone,
                                                            }, function(data) {
                                                              var  dataAgree = JSON.parse(data)
                                                              if (dataAgree.status == 200) {
                                                                layer.closeAll();
                                                                 loadRuzhi()
                                                              }
                                                            });
                                                     });
                                                      $('.layui-layer-close').click(function() {
                                                          $('.picFont img').removeAttr('src');
                                                          $('.picBack img').removeAttr('src');
                                                          $('.picWith img').removeAttr('src');
                                                      });
                                                   }
                                              }
                                              $('.printRUzhi').click(function() {
                                                print('.ruzhudetails')
                                              });
// 劳动合同***********************************************************************
 var personData;
function lookAgreePerson(dataP){
                      $('#personChooseTable').bootstrapTable({
                                  url:dataP,
                                  columns: [
                                          {
                                             field: 'photo',
                                              title: '头像',
                                              formatter: personFormatter
                                          },
                                          {
                                              field: 'username',
                                              title: '姓名',
                                          },
                                          {
                                              field: 'department',
                                              title: '部门',
                                          },
                                  ]
          });
          $('#personChooseTable').bootstrapTable('load', dataP);
              function personFormatter(e,value, row, index){
                       var  imgurl2 =value.photo;
                             return [
                              '<img src=',
                              imgurl2,
                              ' alt="暂无"/>',
                              ].join('');
            }
            $("#personChooseTable").on('click-row.bs.table',function( e,row, $element){
                personData = row;
                $('.qiandingPerson').val(  row.username)
                $('.qiandingDep').val(  row.department)
                $('.qiandingPost').val(  row.post);
                layer.closeAll();
                $(".cover").hide();
            })
          }
function agreeMentList(dataLook){
              $('#agreementListTable').bootstrapTable({
                                  url:dataLook,
                                  columns: [
                                          {
                                              field: 'creater',
                                              title: '发起人',
                                          },
                                          {
                                             field: 'signatory',
                                              title: '签订人',
                                          },
                                          {
                                              field: 'createTime',
                                              title: '时间',
                                              formatter: timeFormatter
                                          },
                                          {
                                              field: 'agreeOption',
                                              title: '操作',
                                              formatter: agreeFormatter,
                                              events:window.agreeEvents = {
                                                              'click .agreeMore': function (e,value, row, index) {
                                                                $('.cover').show();
                                                                layer.open({
                                                                         type: 1,
                                                                         area: '800px',
                                                                         title: ['合同详情', 'font-size:18px;'],
                                                                         shadeClose: true, //点击遮罩关闭
                                                                         content: $('.agreementDetails'),
                                                                         shade:false
                                                                  });
                                                                $('.layui-layer-close').click(function() {
                                                                  $('.cover').hide();
                                                                });
                                                                $('.layui-layer-btn0').click(function() {
                                                                  $('.cover').hide();
                                                                });
                                                                $.post(''+EQD_url+'/Contracts/Get_Contract_ById.ashx', {"contractId": row.id}, function(data) {
                                                                        var agreeDetails = JSON.parse(data).items;
                                                                        var timeRuzhi = (agreeDetails.signEntryTime).split("T")[0];
                                                                        var timeBegin = (agreeDetails.contractStartTime).split("T")[0];
                                                                        var timetheEnd = (agreeDetails.contractEndTime).split("T")[0];
                                                                        $('.hetongCode').text(agreeDetails.contractCode);
                                                                        $('.workTime').text(timeRuzhi);
                                                                        $('.hetongStart').text(timeBegin);
                                                                        $('.hetongEndtime').text(timetheEnd);
                                                                        $('.signName').text(agreeDetails.signatoryName);
                                                                        $('.signDep').text(agreeDetails.department);
                                                                        $('.hetongType').text(agreeDetails.contractType);
                                                                        $('.signPost').text(agreeDetails.post);
                                                                        $('.hetongCishu').text(agreeDetails.signedNumber);
                                                                        $('.hetongXingzhi').text(agreeDetails.contractNature);
                                                                        $('.laodongXingshi').text(agreeDetails.contractForm);
                                                                        $('.shixiPay').text(agreeDetails.ProbationSalary);
                                                                        $('.creater').text(agreeDetails.createrName);
                                                                        $('.shiyongTime').text(agreeDetails.probation);
                                                                        $('.hetongEnd').text(agreeDetails.lastReason);
                                                                        $('.bank').text(agreeDetails.bank);
                                                                        $('.bankNumber').text(agreeDetails.bankCard);
                                                                        $('.bankAddress').text(agreeDetails.openBank);
                                                                        $('.HRName').text(agreeDetails.createrName);
                                                                        $('.leaderName').text(agreeDetails.checkerName);
                                                                });
                                                                $('.HrNo').click(function() {
                                                                  if ( $('#guandian').val().length == 0 ) {
                                                                    layer.msg("备注请填写", {
                                                                             time: 1000,
                                                                                   });
                                                                  }else{
                                                                    $.post(''+EQD_url+'/Contracts/Set_Contract_ByCreater.ashx', {
                                                                      "contractId":row.id,
                                                                      "userGuid":data1.Guid,
                                                                      "message":$('#guandian').val(),
                                                                      "type":2
                                                                    }, function(data) {
                                                                      var HRS = JSON.parse(data);
                                                                      if (HRS.status == 200) {
                                                                        layer.closeAll();
                                                                        $('.cover').hide();
                                                                      }else{
                                                                        layer.msg(HRS.msg, {
                                                                             time: 1000,
                                                                                   });
                                                                      }
                                                                    });
                                                                    }
                                                                  });
                                                                $('.HrAgree').click(function() {
                                                                  if ( $('#guandian').val().length == 0 ) {
                                                                    layer.msg("备注请填写", {
                                                                             time: 1000,
                                                                                   });
                                                                  }else{
                                                                    $.post(''+EQD_url+'/Contracts/Set_Contract_ByCreater.ashx', {
                                                                      "contractId":row.id,
                                                                      "userGuid":data1.Guid,
                                                                      "message":$('#guandian').val(),
                                                                      "type":1
                                                                    }, function(data) {
                                                                      var HRY = JSON.parse(data);
                                                                      if (HRY.status == 200) {
                                                                        layer.closeAll();
                                                                        $('.cover').hide();
                                                                      }else{
                                                                        layer.msg(HRY.msg, {
                                                                             time: 1000,
                                                                                   });
                                                                      }
                                                                    });
                                                                  }
                                                                  });
                                                              }
                                                            }
                                          },
                                  ]
          });
              $('#agreementListTable').bootstrapTable('load', dataLook);
              function agreeFormatter(e,value, row, index){
                             return [
                              '<a class="agreeMore"  title="agreeMore">',
                                '<span id="agreeMore">查看更多</span>',
                                '</a>  ',
                              ].join('');
            }
            function timeFormatter(e,value, row, index){
              var time1 = (value.createTime).split("T")[0];
              var time2 = (value.createTime).split("T")[1];
              var time3 = time2.split(".")[0];
              var timeAll = time1+" "+time3;
                             return [
                              timeAll
                              ].join('');
            }
}
          // 查看劳动合同列表
          function agreeSended(){
            $.post(''+EQD_url+'/Contracts/Get_Contract_ByCreater.ashx', {
              "companyId":data1.companyId,
              "userGuid":data1.Guid,
              "type":2,
              "page":0
            }, function(data) {
              var dataSended = JSON.parse(data);
              layer.msg(dataSended.msg, {
                               time: 1000,
                                                          });
              var dataSJ = dataSended.items.list;
                    agreeMentList(dataSJ)
            });
          }
      $('.checkAgreement').click(function() {
            hCode = "";
            $(this).addClass('pcheck').siblings('p').removeClass('pcheck');
            $('.laodongheTong').show().siblings('div').hide();
            $(".sendedAgreement").attr('id', 'clicked').siblings('button').removeAttr('id');
            $('.signinfo').css('display', 'none');
            $('.HRgress').css('display', 'none');
            $('.agreeAll').css('display', 'none');
            $.post(''+EQD_url+'/userashx/ResetCount_MsgCode.ashx', {
                  "userGuid":data1.Guid,
                  "code":161
                  }, function(data) {
              });
                $("#hetongCode").text("")
                $("#hetongCodeAll").text("");
                $('#danganCodeAll').text(  Number($(".ruzhiCode").text())  );
              if ( $('#danganCodeAll').text() == 0 ) {
                  $('#danganCodeAll').css('display', 'none');
                 }
            agreeSended();
             })
      $('.sendedAgreement').click(function() {
        $(this).attr('id', 'clicked').siblings('button').removeAttr('id');
        $('.signinfo').css('display', 'none');
        $('.HRgress').css('display', 'none');
        $('.agreeAll').css('display', 'none');
        agreeSended();
      });
      $('.loadAgreement').click(function() {
        $(this).attr('id', 'clicked').siblings('button').removeAttr('id');
        $('.signinfo').css('display', 'block');
        $('.agreeAll').css('display', 'none');
        $('.HRgress').css('display', 'block');
        $.post(''+EQD_url+'/Contracts/Get_Contract_ByCreater.ashx', {
              "companyId":data1.companyId,
              "userGuid":data1.Guid,
              "type":0,
              "page":0
            }, function(data) {
              var dataLoad = JSON.parse(data);
              layer.msg(dataLoad.msg, {
                               time: 1000,
                                                          });
              var dataLJ = dataLoad.items.list;
                    agreeMentList(dataLJ)
            });
      });
      $('.agreeAgreement').click(function() {
            $(this).attr('id', 'clicked').siblings('button').removeAttr('id');
            $('.signinfo').css('display', 'block');
            $('.agreeAll').css('display', 'block');
            $('.HRgress').css('display', 'none');
            $.post(''+EQD_url+'/Contracts/Get_Contract_ByCreater.ashx', {
                  "companyId":data1.companyId,
                  "userGuid":data1.Guid,
                  "type":1,
                  "page":0
                  }, function(data) {
                    var dataSuccess = JSON.parse(data);
                    layer.msg(dataSuccess.msg, {
                                     time: 1000,
                          });
                    var dataSuJ = dataSuccess.items.list;
                          agreeMentList(dataSuJ)
                });
      });
            // 发起劳动合同
            $('.laodonghetong').click(function() {
                $('.agreement').slideToggle(200);
                $('.checkAgreement').slideToggle(200);
            });
            $('.agreement').click(function() {
                 $(this).addClass('pcheck').siblings('p').removeClass('pcheck');
                 $('.agreementTable').show().siblings('div').hide();
            });
                  $('.qiandingPerson').click(function() {
                            $('.cover').show();
                            layer.open({
                                   type: 1,
                                   area: ['800px', '500px'],
                                   title: ['选择劳动发起人', 'font-size:18px;'],
                                   shadeClose: true, //点击遮罩关闭
                                   content: $('.agreementpersonChoose'),
                                   shade:false
                            });
                            $('.layui-layer-close').click(function() {
                                         $('.cover').hide();
                                    });
                            $('.layui-layer-btn0').click(function() {
                                       $('.cover').hide();
                                 });
                            loadChooseperson(0)
                            function loadChooseperson(page){
                                  $.post(''+EQD_url+'/Com/Com_User_ByCompany.ashx', {
                                    "companyId":data1.companyId,
                                    "page":page
                                    }, function(data) {
                                      var dataAgree = JSON.parse(data);
                                      lookAgreePerson(dataAgree.items.BusinessCardList);
                                    });
                            }
                            //   前端分页
                            // $("#page").Page({
                            //     totalPages: 100,//total Pages
                            //     liNums: 5,//the li numbers(advice use odd)
                            //     activeClass: 'activP', //active class style
                            //     prv: '<<',//prev button name
                            //     next: '>>',//next button name
                            //     hasPrv: true,//whether has prev button
                            //     hasNext: true,//whether has next button
                            //     callBack : function(page){
                            //         var newPage = Number(page)-1;
                            //         loadChooseperson(newPage)
                            //     }
                            // });
                            //   搜索函数
                                  function searchPerson(){
                                        $.post(''+EQD_url+'/Com/User_Search_Info.ashx', {
                                          "companyId":data1.companyId,
                                          "para":$('.agreePara').val()
                                        }, function(data) {
                                          var dataSe = JSON.parse(data);
                                          if (dataSe.status == 200) {
                                          lookAgreePerson(dataSe.items);
                                          }else{
                                              layer.msg(dataSe.msg, {
                                                                            time: 1000,
                                                                          });
                                          }
                                        });
                                    }
                                    // 搜索
                              $('.agreementSearch').click(function() {
                                searchPerson()
                              });
                              $('.agreePara').keydown(function(event) {
                                           if (event.keyCode === 13){
                                          searchPerson()
                                        }
                                });
                  });
                  $('#agreementStyle').click(function() {
                          if ( $('#agreementStyle').val() == "劳动合同" ) {
                                $('.hetongxingShi').css('display', 'block');
                                $('.shiyongQi').css('display', 'block');
                          }else{
                              $('.hetongxingShi').css('display', 'none');
                              $('#agreementModality').val('');
                              $('.shiyongQi').css('display', 'none');
                              $('.agreementFreash').val('');
                         }
                  });
                  $('#agreementNumber').click(function() {
                        if (  $('#agreementNumber').val() =="第三次签" || $('#agreementNumber').val() =="第二次签") {
                              $('.lizhiReason').css('display', 'block');
                        }else{
                              $('.lizhiReason').css('display', 'none');
                              $('#reasonDetails').val("")
                        }
                  });
                  $('#agreementQuality').click(function() {
                    if ( $('#agreementQuality').val() =="续签" || $('#agreementQuality').val() =="变更" ) {
                      $('.hetongCS').css('display', 'block');
                    }else{
                      $('.hetongCS').css('display', 'none');
                      $('#agreementNumber').val("");
                    }
                  });
                  laydate.render({
                   elem: '#test6',
                  });
                  laydate.render({
                   elem: '#test7',
                  });
                  laydate.render({
                   elem: '#test8',
                  });
                  $('.agreementFreash').hover(function() {
                               $('.tipsMin').css('display', 'block');
                        }, function() {
                                $('.tipsMin').css('display', 'none');
                  });
                  // 加载银行
                  var bankName;
                  $('#dangan').click(function(){
                  	$.post(''+EQD_url+'/Option_AreasAnd.ashx', {
                        "type":35
                    }, function(data) {
                      bankName = data;
                      if ( $('#bankChoose').val() =="" ) {
                      for (var i = 0; i < data.length; i++) {
                        $('#bankChoose').append('<option value="'+data[i].code+'">'+data[i].name+'</option>')
                      }
                      }
                    });
                  })
                    $('.agreeSubmit').click(function() {
                            var bankSort = Number($('#bankChoose').val()) -1;
                            var bankname;
                            if (bankSort == -1) {
                              bankname = $('.bankVal').val();
                            }else{
                              bankname = bankName[bankSort].name;
                            }
                            if ( $('.qiandingTime').val().length == 0 || $('.money2').val().length == 0 || personData.userGuid =="undefined" || $('#agreementStyle').val().length == 0 || $('#agreementQuality').val().length == 0 || $('.agreementStart').val().length == 0 || $('.agreementEnd').val().length == 0 ) {
                                layer.msg('请完善合同信息', {
                                                       time: 1000,
                                                             });
                            }else{
                                  $.post(''+EQD_url+'/Contracts/Add_Contract.ashx', {
                                          "userGuid":data1.Guid,
                                          "companyId":data1.companyId,
                                          "signatory":personData.userGuid,
                                          "signDepartId":personData.departmentId,
                                          "signPostId":personData.postId,
                                          "signEntryTime":$('.qiandingTime').val(),
                                          "contractType":$('#agreementStyle').val(),
                                          "contractNature":$('#agreementQuality').val(),
                                          "signedNumber":$('#agreementNumber').val(),
                                          "lastReason":$('#reasonDetails').val(),
                                          "contractForm":$('#agreementModality').val(),
                                          "contractStartTime":$('.agreementStart').val(),
                                          "contractEndTime":$('.agreementEnd').val(),
                                          "probation":$('.agreementFreash').val(),
                                          "ProbationSalary":$('.money2').val(),
                                          "bank":bankname
                                          }, function(data) {
                                            var dataed = JSON.parse(data);
                                              layer.msg(dataed.msg, {
                                                             time: 1000,
                                                                   });
                                            if ( dataed.status == 200 ) {
                                              $('.agreementUp input').val('')
                                              $('.agreementUp select').val('')
                                              $('.agreementUp textarea').val('')
                                            }
                                  });
                          }
                    });
})
