//获取全局变量
var urlStr = "?"+location.href.split("?")[1];
var userGuid = location.href.split("=")[1];
let xcxvArr = [];
let lingyuArr = [];
layui.use('upload', function() {
    var upload = layui.upload;
    //执行实例
    var uploadInst = upload.render({
        elem: '#test1' //绑定元素
            ,
        url: '/upload/' //上传接口
            ,
        done: function(res) {
            //上传完毕回调
        },
        error: function() {
            //请求异常回调
        }
    });
});

// 添加图片
var imgFile;
$(".chooseImg").click(function() {
    $("#headImg").click(); //隐藏了input:file样式后，点击头像就可以本地上传
});
$("#headImg").on("change", function() {
    imgFile = this.files[0];
    ajaxFileUpload(imgFile);
});
//建立一個可存取到該file的url
function getObjectURL(file) {
    var url = null;
    if (window.createObjectURL != undefined) { // basic
        url = window.createObjectURL(file);
    } else if (window.URL != undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
}
// 上传图片
function ajaxFileUpload(file) {
    var imgData = new FormData();
    imgData.append('willcompress', "true");
    imgData.append('file', file);
    $.ajax({
        type: 'post',
        url: 'http://47.94.173.253:8008/Reimburse/Upload_Files.ashx',
        data: imgData,
        cache: false,
        processData: false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
        contentType: false, // 不设置Content-type请求头
        success: function(data) {
            var data = JSON.parse(data);
            if (data.status == 200) {
                layer.msg('上传成功', {
                    time: 1000,
                });
                var szz = data.items.split(";")[0];
                arr_imgHref = 'http://47.94.173.253:8008' + data.items.split(";")[0];
                arr_img = [];
                $(".realImg").attr("src", data.items.split(";")[0]); //表格图片
                $("#showImg").attr("src", arr_imgHref); //弹窗已选图片										
                $('#pics').css({
                    "background": "url('" + arr_imgHref + "') no-repeat center center",
                    "display": "block"
                }).val('');
                $('.list').hide();
            }
        },
    });
};
//Demo
layui.use('form', function() {
    var form = layui.form;
    //监听radio单选
    form.on('radio(test)', function(data) {
        if (data.value == "1") {
            $('#lis_1').show();
            $('#lis_2').hide();
        } else if (data.value == "2") {
            $('#lis_2').show();
            $('#lis_1').hide();
        } else if (data.value == "0") {
            $('#lis_1').show();
            $('#lis_2').show();
        }
    });
    // 监听常住地 change
    form.on('select(xcxv)', function(data) {
        for (let i = 0; i < xcxvArr.length; i++) {
            //获取子集
            if (data.value == xcxvArr[i].name) {
                // 将二级放入select 清除之前的数据
                $("#province").html("")
                let currentData = xcxvArr[i].sub;
                for (let j = 0; j < currentData.length; j++) {
                    $("#province").append(new Option(currentData[j].name, currentData[j].name))
                }
                form.render();
            }
        }
    });
    // 监听领域change时间
    form.on('select(lingyu)', function(data) {
        for (let i = 0; i < lingyuArr.length; i++) {
            //获取子集
            if (data.value == lingyuArr[i].product) {
                // 将二级放入select 清除之前的数据
                $("#xifen").html("")
                let currentData = lingyuArr[i].child;
                for (let j = 0; j < currentData.length; j++) {
                    $("#xifen").append(new Option(currentData[j].product, currentData[j].product))
                }
                form.render();
            }
        }
    });
});
$('.sdds').click(function() {
    alert('平台收取10%的费用')
})
// 获取下拉框数据
$.ajax({
    url: 'http://47.94.173.253:8008/Option_AreasAnd.ashx', //你请求的接口
    type: 'POST', //类型
    data: {
        type: '52'
    }, //数据有则传，没有可以不写
    success: function(data) {
        //请求成功后的返回
        for (let i = 0; i < data.length; i++) {
            $(".city").append(new Option(data[i].industry))
        }
        layui.use('form', function() {
            var form = layui.form;
            form.render();
        })
    }
})
// 获取下拉框数据
$.ajax({
    url: 'http://47.94.173.253:8008/Option_AreasAnd.ashx', //你请求的接口
    type: 'POST', //类型
    data: {
        type: '0',
    }, //数据有则传，没有可以不写
    success: function(data) {
        xcxvArr = data
        //请求成功后的返回
        for (let i = 0; i < data.length; i++) {
            $("#xcxv").append(new Option(data[i].name, data[i].name))
        }
        layui.use('form', function() {
            var form = layui.form;
            form.render();
        })
    }
});
// 获取下拉框数据
$.ajax({
    url: 'http://47.94.173.253:8008/Option_AreasAnd.ashx', //你请求的接口
    type: 'POST', //类型
    data: {
        type: '51',
    }, //数据有则传，没有可以不写
    success: function(data) {
        lingyuArr = data
        //请求成功后的返回
        for (let i = 0; i < data.length; i++) {
            $("#lingyu").append(new Option(data[i].product, data[i].product))
        }
        layui.use('form', function() {
            var form = layui.form;
            form.render();
        })
    }
});
//小计
$('#lxx').keyup(function() {
    var price = parseFloat(0.9);
    var count = $(this).val();
    var SubTotal = parseFloat(price * count).toFixed(2);
    $('#xcc').html(SubTotal);
});
$('#lxxs').keyup(function() {
    var price = parseFloat(0.9);
    var count = $(this).val();
    var SubTotal = parseFloat(price * count).toFixed(2);
    $('#xccs').html(SubTotal);
})
//获取携带值:
function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) { //判断是否含有'?'
        var str = url.substr(1); //从字符中index为1开始抽取
        strs = str.split("&"); //字符串分割成字符串数组
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}
var urlobj = GetRequest();
var idx = urlobj.userGuid;
//  调用	
$('#refer').click(function() {

    var data = {
        "userGuid": idx,
        "A_location": $('#ass').val(),
        "A_industry": $("#ation").val() + ',' + $("#ation_1").val() + ',' + $("#ation_2").val() + ',' + $("#ation_3").val() + ',' + $("#ation_4").val(), //行业
        "A_lingYu": $('#lingyu').val(), //领域
        "A_lingYuDetail": $('#xifen').val(), //领域细分
        "A_province": $('#xcxv').val(), //常驻地区
        "A_city": $('#province').val(), //				
        "A_mode": $('input:radio[name="sex"]:checked').val(), //咨询模式
        "A_costTemp": $('#lxx').val(), //间歇式咨询 费用
        "A_costAll": $('#lxxs').val(), //驻厂区咨询费用 /天
        "A_postType": $('#gangwei').val(), //职位类别
        "A_workBg": $('input:radio[name="sexs"]:checked').val(), //工作背景
        "A_depart": "", //曾担任职务
        "A_profile": "", //咨询师简介
        "A_CRMServer": "", //曾服务过的客户
        "A_other": "", //其他要求
        "A_photo": $(".realImg").attr("src"), //咨询师的头像			
    }
    sessionStorage.setItem("advisers_seesion", JSON.stringify(data));
    window.location.href = "advisoryN.html"+urlStr;
});
$('#refers').click(function() {
    let advisers_seesion = JSON.parse(sessionStorage.getItem('advisers_seesion'));
    if ($('#job').val().length > 0 && $('#briefly').val().length > 0 && $('#serve').val().length > 0 && $('#restd').val().length > 0) {
        $.post('http://47.94.173.253:8008/Advisers/Add_advisters.ashx', {
            "userGuid": advisers_seesion["userGuid"],
            "A_location": advisers_seesion["A_location"],
            "A_industry": advisers_seesion["A_industry"], //行业
            "A_lingYu": advisers_seesion["A_lingYu"], //领域
            "A_lingYuDetail": advisers_seesion["A_lingYuDetail"], //领域细分
            "A_province": advisers_seesion["A_province"], //常驻地区
            "A_city": advisers_seesion["A_city"], //                
            "A_mode": advisers_seesion["A_mode"], //咨询模式
            "A_costTemp": advisers_seesion["A_costTemp"], //间歇式咨询 费用
            "A_costAll": advisers_seesion["A_costAll"], //驻厂区咨询费用 /天
            "A_postType": advisers_seesion["A_postType"], //职位类别
            "A_workBg": advisers_seesion["A_workBg"], //工作背景
            "A_depart": $('#job').val(), //曾担任职务
            "A_profile": $('#briefly').val(), //咨询师简介
            "A_CRMServer": $('#serve').val(), //曾服务过的客户
            "A_other": $('#restd').val(), //其他要求
            "A_photo": advisers_seesion["A_photo"], //咨询师的头像
        }, function(data) {
            var data = JSON.parse(data);
            if (data.status == 200) {
                layer.msg("咨询师认证资料上传成功，请您等待审核", {
                    time: 2000
                });
                setTimeout(function(){
                    window.location.href="http://www.eqidd.com/makerSpace/index.html?userGuid="+userGuid+"&companyId=0"
                },3000);
            } else if (data.status == 210) {
                layer.msg("咨询师资料已上传成功，请您等待审核", {
                    time: 2000
                });
                setTimeout(function(){
                    window.location.href="http://www.eqidd.com/makerSpace/index.html?userGuid="+userGuid+"&companyId=0"
                },3000);
            }else{
                layer.msg("未知错误", {
                    time: 2000
                });
            }
        });
    } else {
        layer.msg("请完善咨询师资料", {
            time: 2000
        })
    }
});