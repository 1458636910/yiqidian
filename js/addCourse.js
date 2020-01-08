$(document).ready(function(){
  // 获取本地数据
      var dataCircle =   localStorage.getItem("GHY_login");
      var dataC = JSON.parse(dataCircle);
 // 创建富文本编辑框
        var E = window.wangEditor
        var editor = new E('#addCourseeditor')
        editor.customConfig.uploadImgShowBase64 = true;
        editor.create();
 // 选择课程类型
      $('.courseChoose').click(function() {
            $.post('https://www.eqid.top:8009/Option_AreasAnd.ashx', {"type": 45}, function(data) {
              console.log( data )
                  layer.open({
                  type: 1,
                  area: ['800px','400px'],
                  title: ['研究领域', 'font-size:18px;text-align: center;'],
                  content: $('.videoLabelTable'),
                  btn:'确定',
                  shade: false
            });
                  if( $('.videoLabelLeft p').length == 0 ){
                      for (var i = 0; i < data.length; i++) {
                           $('.videoLabelLeft').append('<p class="'+i+'">'+data[i].name+'</p>');
                           $('.videoLabelLeft .'+i+''). click(function() {
                            $(this).css('backgroundColor', 'red').siblings('p').css('backgroundColor', '#29e');
                               var m =   $(this).attr('class');
                             $('.videoLabelRight span').remove();
                           });
                           for (var j = 0; j < data[i].sub.length; j++) {
                                  $('.videoLabelRight').append('<span><input type="checkbox" value="'+data[i].sub[j].name+'" name="label">'+ data[i].sub[j].name+'</span>')
                           }
                        }
                  }else{}
                  $("input:checkbox[name='label']").click(function() {
                    if (  $("input:checkbox[name='label']:checked").length >5 ) {
                             layer.msg('最多选择5个', {
                                    time: 1000,
                                  });
                             $(this).removeAttr('checked')
                    }
                  });
                  $('.layui-layer-btn0').click(function() {
                    $('.cover').hide();
                     var teaArea = "";
                  $("input:checkbox[name='label']:checked").each(function() {
                      teaArea += $(this).val() + ",";

                  });
                  var teavherArea = teaArea.substring(0,Number(teaArea.length)-1)
                      $('.courseChoose').val(teavherArea)
                });
                  $('.layui-layer-close').click(function() {
                   $('.cover').hide();
                  });
            });
       });
      //选择培训对象
      var depId;
      $("#matchType").change(function(){
               var mVal =  $(this).val();
               if ( mVal == 1 ) {
                $('.matchObj').show();
                 $('.matchObj').click(function() {
                      $('.cover').show();
                      layer.open({
                        type: 1,
                        area: '200px',
                        title: ['选择部门', 'font-size:18px;text-align: center;'],
                        content: $('.departmentTable'),
                        btn:'确定',
                        shade: false
                  });
                      $.post('https://www.eqid.top:8009/Com_SelectDepartment.ashx', {
                        "CompanyId":dataC.companyId,
                        "ParentId":0
                      }, function(data) {
                        var dataDepart = JSON.parse(data);
                        $('#departmentTable').bootstrapTable({
                                url: dataDepart.items,
                                columns: [
                                            {
                                                check: 'checkbox',
                                                title: '请选择'
                                            },
                                            {
                                                field: 'departName',
                                                title: '部门名称',
                                            }
                                ]
                            });
                            $("#departmentTable").bootstrapTable('load', dataDepart.items);
                      });
                      $('.layui-layer-btn0').click(function(event) {
                        $('.cover').hide();
                        var arr_depname = "";
                        var arr_depid = "";
                        for (var i = 0; i < ($('#departmentTable').bootstrapTable('getAllSelections')).length; i++) {
                        arr_depid +=$('#departmentTable').bootstrapTable('getAllSelections')[i].departId+";";
                        arr_depname += $('#departmentTable').bootstrapTable('getAllSelections')[i].departName+",";
                        }
                        var depName = (arr_depname).substring(0,Number(arr_depname.length)-1);
                         depId = (arr_depid).substring(0,Number(arr_depid.length)-1);
                        $('.matchObjInput').val(depName)
                      });
                      $('.layui-layer-close').click(function() {
                         $('.cover').hide();
                        });
                 });
               }else{
                $('.matchObj').hide();
                 depId = dataC.companyId
               }
      })
      //
      $("#courseForm").change(function(){
          var fVal =  $(this).val();
          if ( fVal == 2 ) {
            $('.uploadFile').show();
          }else{
            $('.uploadFile').hide()
          }
      })
 //  提交表单操作
       $('.submitBtn').click(function() {
        if ( $('.courseChoose').val().length == 0 || $('.courseTheme').val().length == 0 || $('.courseTime').val().length == 0 || $('#LectureIntroduceInput').val() == "" || editor.txt.text().length == 0 || $('#courseForm').val() == "" || $('.objectInput').val().length == 0 || $('#teacherForm').val() == "" || $('#matchType').val() == "" ) {
                  layer.msg('请完善信息', {
                                time: 1000,
                              });
        }else{
          ajaxFileUpload()
        }
       });
        function ajaxFileUpload() {
              var  Pformdata= new FormData();
              var dataFile=$("#file")[0].files;
               Pformdata.append('userGuid',dataC.Guid);
               Pformdata.append('companyId',dataC.companyId);
               Pformdata.append('courseType',$('.courseChoose').val());
               Pformdata.append('courseTheme',$('.courseTheme').val());
               Pformdata.append('courseTimes',$('.courseTime').val());
               Pformdata.append('LectureIntroduce',$('#LectureIntroduceInput').val());
               Pformdata.append('courseOutlint',editor.txt.text());
               Pformdata.append('sourceCourse',$('#courseForm').val());
               Pformdata.append('objecter',$('.objectInput').val());
               Pformdata.append('Sourcelecturer',$('#teacherForm').val());
               Pformdata.append('Lecture',dataC.Guid);
               Pformdata.append('TrainingId',0);
               Pformdata.append('MatchType',$('#matchType').val());
               Pformdata.append('MatchIds',depId);
                for (var i = 0; i < dataFile.length; i++) {
                Pformdata.append('file', dataFile[i]);
             }
             $.ajax({
                           type : 'post',
                           url : 'https://www.eqid.top:8009/Courses/Add_Course.ashx',
                           data : Pformdata,
                           cache : false,
                           processData : false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
                           contentType : false, // 不设置Content-type请求头
                           success : function(data){
                            data2 = JSON.parse(data)
                            if (data2.status ==200) {
                              layer.msg('添加成功', {
                                time: 1000,
                              });
                            }
                           },
                         error:function()
                         {

                         }
                       });
           }
 })
