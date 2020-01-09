$(document).ready(function() {
    function formateDay(time) {
        var date = new Date(time);
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        var Hours = date.getHours();
        var Minutes = date.getMinutes();
        var Seconds = date.getSeconds();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        if (Hours >= 1 && Hours <= 9) {
            Hours = "0" + Hours;
        }
        if (Minutes >= 0 && Minutes <= 9) {
            Minutes = "0" + Minutes;
        }
        if (Seconds >= 0 && Seconds <= 9) {
            Seconds = "0" + Seconds;
        }
        let formateTime = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + Hours + seperator2 + Minutes + seperator2 + Seconds;
        return formateTime;
    }
    //Demo
    layui.use('form', function() {
        var form = layui.form;
        //监听提交
        form.on('submit(demo1)', function(data) {
            window.location.href = 'index.html'
        })
    });
    layui.use(['form', 'layedit', 'laydate', "jquery"], function() {
        var form = layui.form,
            layer = layui.layer,
            $ = layui.jquery,
            laydate = layui.laydate;
        var nowTime = new Date().valueOf();
        //开始日期
        var time_on = new Date();
        var time_end = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
        auto(time_on, time_end)
        $('#days').val(1)
        var start = laydate.render({
            elem: '#start',
            type: 'datetime',
            min: nowTime,
            trigger: 'click', //解决闪退bug
            value: new Date(),
            done: function(value, date) {
                endMax = end.config.max;
                time_on = value;
                end.config.min = date;
                end.config.min.month = date.month - 1;
                auto(time_on, time_end)
            },
        });
        //结束日期
        var end = laydate.render({
            elem: '#end',
            type: 'datetime',
            trigger: 'click', //解决闪退bug
            min: nowTime,
            value: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
            done: function(value, date) {
                if ($.trim(value) == '') {
                    var curDate = new Date();
                    date = {
                        'date': curDate.getDate(),
                        'month': curDate.getMonth() + 1,
                        'year': curDate.getFullYear()
                    };
                }
                time_end = value;
                start.config.max = date;
                start.config.max.month = date.month - 1;
                auto(time_on, time_end)
            }
        });

        function auto(time_on, time_end) {
            // 转换日期格式
            if (time_on.toString().indexOf("-") < 0) {
                time_on = formateDay(time_on);
            }
            if (time_end.toString().indexOf("-") < 0) {
                time_end = formateDay(time_end);
            }
            let date3 = time_on.replace(/-/g, '/');
            let date4 = time_end.replace(/-/g, '/');
            // 创建日期对象
            var date1 = new Date(date3);
            var date2 = new Date(date4);
            //转换成秒
            var s1 = date1.getTime(),
                s2 = date2.getTime();
            var total = (s2 - s1) / 1000;
            var day = parseInt(Math.ceil(total / (24 * 60 * 60))); //计算整数天数
            //传入请假天数
            $('#days').val(day);
        }
    });
    //分割当前网页链接
    var windowUrl = window.location.href; //获取当前url链接           
    //http://127.0.0.1:8848/shenqing/index.html?userGuid=4f47e8c7e40541d4a2f03c3c72304252&companyId=46
    var arr = windowUrl.split("?", 2); //分割url            
    var arr_1 = arr[1]; //瞎起变量          
    var arr_2 = arr_1.split('&', 2);
    var arr_3 = (arr_2[0].split('=', 2))[1];
    var arr_4 = (arr_2[1].split('=', 2))[1];
    //console.log(arr_4)
    //获取个人信息
    $.ajax({
        url: 'http://47.94.173.253:8008/getUserDetailByuserGuid.ashx', //你请求的接口
        type: 'POST', //类型
        data: {
            'userGuid': arr_3,
        }, //数据有则传，没有可以不写
        success: function(data) {
            data = JSON.parse(data)
            //请求成功后的返回
            //console.log(data)
            $('#upname').text(data.items.realName);
            $('#jobNumber').text(data.items.jovNumber);
            $('#department').text(data.items.depart);
            $('#post').text(data.items.post);
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
            type: '33'
        }, //数据有则传，没有可以不写
        success: function(data) {
            //请求成功后的返回
            //console.log(data)
            for (let i = 0; i < data.length; i++) {
                $(".industry").append(new Option(data[i].name))
            }
            layui.use('form', function() {
                var form = layui.form;
                form.render();
            })
        }
    })
    //获取审批人数据
    $.ajax({
        url: 'http://47.94.173.253:8008/Com/Get_User_Leader.ashx', //你请求的接口
        type: 'POST', //类型
        data: {
            'userGuid': arr_3,
            'companyId': arr_4,
        }, //数据有则传，没有可以不写         
        success: function(data) {
            var data = JSON.parse(data);
            //console.log(data.items)
            $("#verify").text(data.items)
            layui.use('form', function() {
                var form = layui.form;
                form.render();
            })
        }
    })
    //反馈界面的上传文件    
    //input元素
    var fileInput = document.querySelector('.input-file');
    //filelist对象
    var filelist = fileInput.files
    //file对象 
    var file = filelist.item(0);
    var file = filelist[0];
    var fileInput = document.querySelector('.input-file');
    var fileName = document.querySelector('#fileName');
    fileInput.addEventListener('change', function(e) { //监听change事件，选择文件后触发
        if (this.files.length === 1) { //处理文件名
            fileName.textContent = this.files[0].name;
        } else {
            fileName.textContent = '未上传文件';
            //fileName.textContent = '已选择 ' + this.files.length + ' 个文件';
        }
    })
    //添加图片
    var imgFile;
    var url = '';
    $("#headImg").on("change", function() {
        imgFile = this.files[0];
    });
    // 上传图片
    function ajaxFileUpload(file) {
        var imgData = new FormData();
        imgData.append('userGuid', arr_3);
        imgData.append('companyId', arr_4);
        imgData.append('leadvStartTime', $('input:text[name="start"]').val());
        imgData.append('leaveEndTime', $('input:text[name="end"]').val());
        imgData.append('leaveTime', $('#days').val());
        imgData.append('leaveType', $('.industry').val());
        imgData.append('leaveReason', $('#leaveReason').val());
        imgData.append('file', file);
        $.ajax({
            type: 'post',
            url: 'http://47.94.173.253:8008/Leaves/Add_Leave.ashx',
            data: imgData,
            cache: false,
            processData: false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
            contentType: false, // 不设置Content-type请求头
            success: function(data) {
                var data = JSON.parse(data);
                console.log(data.status)
                if (data.status == 200) {
                    layer.msg('上传成功', {
                        time: 1000,
                    });
                }
            },
        });
    };
    $('#refer').click(function() {
        ajaxFileUpload(imgFile);
    });

    function formateDay(time) {
        var date = new Date(time);
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        var Hours = date.getHours();
        var Minutes = date.getMinutes();
        var Seconds = date.getSeconds();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        if (Hours >= 1 && Hours <= 9) {
            Hours = "0" + Hours;
        }
        if (Minutes >= 0 && Minutes <= 9) {
            Minutes = "0" + Minutes;
        }
        if (Seconds >= 0 && Seconds <= 9) {
            Seconds = "0" + Seconds;
        }
        let formateTime = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + Hours + seperator2 + Minutes + seperator2 + Seconds;
        return formateTime;
    }
    //Demo
    layui.use('form', function() {
        var form = layui.form;
        //监听提交
        form.on('submit(demo1)', function(data) {
            window.location.href = 'index.html'
        })
    });
    layui.use(['form', 'layedit', 'laydate', "jquery"], function() {
        var form = layui.form,
            layer = layui.layer,
            $ = layui.jquery,
            laydate = layui.laydate;
        var nowTime = new Date().valueOf();
        //开始日期
        var time_on = new Date();
        var time_end = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
        auto(time_on, time_end)
        $('#days').val(1)
        var start = laydate.render({
            elem: '#start',
            type: 'datetime',
            min: nowTime,
            trigger: 'click', //解决闪退bug
            value: new Date(),
            done: function(value, date) {
                endMax = end.config.max;
                time_on = value;
                end.config.min = date;
                end.config.min.month = date.month - 1;
                auto(time_on, time_end)
            },
        });
        //结束日期
        var end = laydate.render({
            elem: '#end',
            type: 'datetime',
            trigger: 'click', //解决闪退bug
            min: nowTime,
            value: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
            done: function(value, date) {
                if ($.trim(value) == '') {
                    var curDate = new Date();
                    date = {
                        'date': curDate.getDate(),
                        'month': curDate.getMonth() + 1,
                        'year': curDate.getFullYear()
                    };
                }
                time_end = value;
                start.config.max = date;
                start.config.max.month = date.month - 1;
                auto(time_on, time_end)
            }
        });

        function auto(time_on, time_end) {
            // 转换日期格式
            if (time_on.toString().indexOf("-") < 0) {
                time_on = formateDay(time_on);
            }
            if (time_end.toString().indexOf("-") < 0) {
                time_end = formateDay(time_end);
            }
            let date3 = time_on.replace(/-/g, '/');
            let date4 = time_end.replace(/-/g, '/');
            // 创建日期对象
            var date1 = new Date(date3);
            var date2 = new Date(date4);
            //转换成秒
            var s1 = date1.getTime(),
                s2 = date2.getTime();
            var total = (s2 - s1) / 1000;
            var day = parseInt(Math.ceil(total / (24 * 60 * 60))); //计算整数天数
            //传入请假天数
            $('#days').val(day);
        }
    });
    //分割当前网页链接
    var windowUrl = window.location.href; //获取当前url链接           
    //http://127.0.0.1:8848/shenqing/index.html?userGuid=4f47e8c7e40541d4a2f03c3c72304252&companyId=46
    var arr = windowUrl.split("?", 2); //分割url            
    var arr_1 = arr[1]; //瞎起变量          
    var arr_2 = arr_1.split('&', 2);
    var arr_3 = (arr_2[0].split('=', 2))[1];
    var arr_4 = (arr_2[1].split('=', 2))[1];
    //console.log(arr_4)
    //获取个人信息
    $.ajax({
        url: 'http://47.94.173.253:8008/getUserDetailByuserGuid.ashx', //你请求的接口
        type: 'POST', //类型
        data: {
            'userGuid': arr_3,
        }, //数据有则传，没有可以不写
        success: function(data) {
            data = JSON.parse(data)
            //请求成功后的返回
            //console.log(data)
            $('#upname').text(data.items.realName);
            $('#jobNumber').text(data.items.jovNumber);
            $('#department').text(data.items.depart);
            $('#post').text(data.items.post);
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
            type: '33'
        }, //数据有则传，没有可以不写
        success: function(data) {
            //请求成功后的返回
            //console.log(data)
            for (let i = 0; i < data.length; i++) {
                $(".industry").append(new Option(data[i].name))
            }
            layui.use('form', function() {
                var form = layui.form;
                form.render();
            })
        }
    })
    //获取审批人数据
    $.ajax({
        url: 'http://47.94.173.253:8008/Com/Get_User_Leader.ashx', //你请求的接口
        type: 'POST', //类型
        data: {
            'userGuid': arr_3,
            'companyId': arr_4,
        }, //数据有则传，没有可以不写         
        success: function(data) {
            var data = JSON.parse(data);
            //console.log(data.items)
            $("#verify").text(data.items)
            layui.use('form', function() {
                var form = layui.form;
                form.render();
            })
        }
    })
    //反馈界面的上传文件    
    //input元素
    var fileInput = document.querySelector('.input-file');
    //filelist对象
    var filelist = fileInput.files
    //file对象 
    var file = filelist.item(0);
    var file = filelist[0];
    var fileInput = document.querySelector('.input-file');
    var fileName = document.querySelector('#fileName');
    fileInput.addEventListener('change', function(e) { //监听change事件，选择文件后触发
        if (this.files.length === 1) { //处理文件名
            fileName.textContent = this.files[0].name;
        } else {
            fileName.textContent = '未上传文件';
            //fileName.textContent = '已选择 ' + this.files.length + ' 个文件';
        }
    })
    //添加图片
    var imgFile;
    var url = '';
    $("#headImg").on("change", function() {
        imgFile = this.files[0];
    });
    // 上传图片
    function ajaxFileUpload(file) {
        var imgData = new FormData();
        imgData.append('userGuid', arr_3);
        imgData.append('companyId', arr_4);
        imgData.append('leadvStartTime', $('input:text[name="start"]').val());
        imgData.append('leaveEndTime', $('input:text[name="end"]').val());
        imgData.append('leaveTime', $('#days').val());
        imgData.append('leaveType', $('.industry').val());
        imgData.append('leaveReason', $('#leaveReason').val());
        imgData.append('file', file);
        $.ajax({
            type: 'post',
            url: 'http://47.94.173.253:8008/Leaves/Add_Leave.ashx',
            data: imgData,
            cache: false,
            processData: false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
            contentType: false, // 不设置Content-type请求头
            success: function(data) {
                var data = JSON.parse(data);
                console.log(data.status)
                if (data.status == 200) {
                    layer.msg('上传成功', {
                        time: 1000,
                    });
                }
            },
        });
    };
    $('#refer').click(function() {
        ajaxFileUpload(imgFile);
    });
    $(".goback").hover(function() {
        $(this).children("img").attr("src", "img/goback-b.png")
    }, function() {
        $(this).children("img").attr("src", "img/goback.png")
    });
    $(".goback").on("click", function() {
        $("#dataTable").replaceWith('<div id="dataTable"></div>');
        $("#dataTable").load("qjlb.html");
    });
})