$(document).ready(function() {
    //分割当前网页链接
    var windowUrl = window.location.href; //获取当前url链接       
    //http://127.0.0.1:8848/shenqing/index.html?userGuid=4f47e8c7e40541d4a2f03c3c72304252&companyId=46
    var arr = windowUrl.split("?", 2); //分割url      
    var arr_1 = arr[1]; //瞎起变量      
    var arr_2 = arr_1.split('&', 2);
    var arr_3 = (arr_2[0].split('=', 2))[1];
    var arr_4 = (arr_2[1].split('=', 2))[1];
    //console.log(arr_4)       
    var page = 0;
    var type = 2;
    var leaveId = '';
    //字符串分割时间段 2019-03-31 09:00 ~ 2019-03-31 12:00
    function consts(e, value, index, row) {
        var leaveStartTime = value.leaveStartTime.split(':')[0] + ':' + value.leaveStartTime.split(':')[1];
        var leaveEndTime = value.leaveEndTime.split(':')[0] + ':' + value.leaveEndTime.split(':')[1];
        var time = leaveStartTime + ' ~ ' + leaveEndTime;
        return '<div class=w133> ' + time + ' </div>'
    }
    //字符串分割申请时间
    function constd(e, value, index, row) {
        var ar = value.createTime;
        var ar_1 = ar.split("T")[0];
        var ar_3 = ar.split("T")[1].split(':')[0] + ':' + ar.split("T")[1].split(':')[1];
        var ar_4 = ar_1 + ' ' + ar_3;
        // console.log(ar_4)
        return ar_4
    }
    //给请假原因固定宽
    function constf(e, value, index, row) {
        return '<div class=w200>' + value.leaveReason + '</div>'
    }
    //判断后台返回status
    function progress(e, value, index, row) {
        //console.log(value.status)
        if (value.status == 0) {
            status = '待审批'
        } else {
            status = '已审批'
        }
        return ['<div class="hhhh">' + status + '</div>'].join('')
    }
    window.operateEvents = {
        'click .hhhh': function(e, value, row, index) {
            $.post('' + http_head + 'Leaves/Get_Leave_Check.ashx', {
                leaveId: row.id
            }, function(data) {
                var data = JSON.parse(data);
                console.log(data)
                $("#latter").bootstrapTable({
                    data: data.items,
                    columns: [{
                        formatter: latter,
                    }],
                })

                function latter(e, value, index, row) {
                    console.log(value.status)
                    var status = value.status;
                    if (value.status == -1) {
                        status = '待审批'
                    } else if (value.status == 1) {
                        status = '拒绝'
                    } else {
                        status = '同意'
                    };
                    if (value.createTime != null) {
                        ar = value.createTime;
                        ar_1 = ar.split("T")[0];
                        ar_3 = ar.split("T")[1].split(':')[0] + ':' + ar.split("T")[1].split(':')[1];
                        ar_4 = ar_1 + ' ' + ar_3;
                    } else {
                        ar_4 = null
                    }
                    return '<div class="layui-timeline"><div class="layui-timeline-item"><i class="layui-icon layui-timeline-axis">&#xe63f;</i><div class="layui-timeline-content layui-text"><h3 class="layui-timeline-title">' + status + '</h3><p class="name_1">' + value.uname + '<span class="cxk">' + ar_4 + '</span></p><p>' + value.message + '</p></div></div></div>'
                }
            })
            $('#abb').modal()
            console.log()
        }
    }
    $('#abb').on('hidden.bs.modal', function() {
        let latter = document.createElement("table");
        latter.id = 'latter'
        $(".modal-body").html("");
        $(".modal-body").append(latter)
    })
    // /Leaves/Get_Leave_Check.ashx                     
    $("#table").bootstrapTable({
        url: '' + http_head + 'Leaves/Get_Leave_ByCreater.ashx', //在这里请求接口才能使用它带刷新的功能，不然的话你就再点击刷新的时候再调用这个方法
        search: true,
        //showRefresh: true, // 是否显示刷新按钮
        method: 'post',
        contentType: "application/x-www-form-urlencoded", //post请求的话就加上这个句话             
        queryParams: function(params) { //自定义参数             
            params.userGuid = arr_3;
            params.companyId = arr_4;
            params.page = 0;
            params.type = type;
            return params
        },
        responseHandler: function(res) {
            page = 1;
            return res.items.list
        },
        columns: [{
            field: 'leaveCode',
            title: '编号'
        }, {
            field: 'leaveType',
            title: '类型'
        }, {
            field: 'time',
            title: '时间段',
            formatter: consts
        }, {
            field: 'leaveTimes',
            title: '天数 (天)'
        }, {
            field: 'leaveReason',
            title: '原因',
            formatter: constf
        }, {
            field: 'createTime',
            title: '申请时间',
            formatter: constd
        }, {
            field: 'status',
            title: '申请进度',
            events: window.operateEvents,
            formatter: progress
        }]
    });
    //下一步点击事件
    $("#pageBtn").on("click", function() {
        nextPage();
    })

    function nextPage() {
        $.post("" + http_head + "Leaves/Get_Leave_ByCreater.ashx", {
            userGuid: arr_3,
            companyId: arr_4,
            page: page,
            type: type
        }, function(data) {
            var data = JSON.parse(data);
            if (data.items.list.length > 0) {
                page = data.items.page;
            }
            if (data.items.list == '') {
                $('#pageBtn').html('没有更多数据了')
            } else {
                $("#table").bootstrapTable({
                    columns: [{
                        formatter: table,
                    }]
                })
                $("#table").bootstrapTable("append", data.items.list);
            }
        })
    };
    var Totals = $('.totals ul li');
    Totals.each(function() {
        $(this).mouseover(function() {
            $(this).addClass('on')
        });
        $(this).mouseout(function() {
            $(this).removeClass('on')
        });
    });
    //全部
    $('#own').click(function() {
        type = 2;
        page = 0;
        $('#selectedText').html("全部");
        $('#pageBtn').html('下一页')
        nextSerach();
    })
    //已审核           
    $('#examined').click(function() {
        type = 1;
        page = 0;
        $('#selectedText').html("已审核")
        $('#pageBtn').html('下一页');
        nextSerach();
    })
    //未审核
    $('#Noexamined').click(function() {
        type = 0
        page = 0
        $('#selectedText').html("未审核")
        $('#pageBtn').html('下一页')
        nextSerach()
    })

    function nextSerach() {
        $.post("" + http_head + "Leaves/Get_Leave_ByCreater.ashx", {
            userGuid: arr_3,
            companyId: arr_4,
            page: page,
            type: type
        }, function(data) {
            var data = JSON.parse(data);
            //console.log(data)     
            if (data.items.list.length > 0) {
                page = data.items.page;
            }
            $("#table").bootstrapTable({
                columns: [{
                    formatter: table,
                }]
            })
            $("#table").bootstrapTable("load", data.items.list);
        })
    };
    $(".goback").hover(function() {
        $(this).children("img").attr("src", "img/goback-b.png")
    }, function() {
        $(this).children("img").attr("src", "img/goback.png")
    });
    $(".goback").on("click", function() {
        $("#dataTable").replaceWith('<div id="dataTable"></div>');
        $("#dataTable").load("msq.html");
    });
    $("#leave").on("click",function(){
    	$("#dataTable").replaceWith('<div id="dataTable"></div>');
        $("#dataTable").load("qjsq.html");
    })
});