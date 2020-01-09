
    $(document).ready(function() {
        var userStr = localStorage.getItem("GHY_login");
        var userData = JSON.parse(userStr);
        var pageNext = 0;
        // 表格
        function loadMsgTable(data) {
            $("#msgList").bootstrapTable({
                classes: " table-no-bordered",
                columns: [{
                    formatter: msgList,
                    events: viewVisitor,
                }],
                data: data
            });

            function msgList(e, value, row, index) {
                var time = value.createTime.split("T")[0];
                var headImg = value.iphoto;
                var headKongImg = "img/head2.png";
                var callBackMsg = value.childList;
                var cbkmsg;
                if (value.iphoto) {
                    if (callBackMsg.length > 0) {
                        $(" .callBack ").css({
                            "display": "block"
                        })
                        for (var i = 0; i < callBackMsg.length; i++) {
                            cbkmsg = callBackMsg[i].Message;
                        }
                        return '<div class="msgBox"> <div class="msgImg"> <img src="' + headImg +
                            '"/></div>   <div class="contBox"> <div class="msgContent"> <div><p>' + value.upname + '</p><p>' + time +
                            '</p></div>  <div> <p>' + value.Message +
                            '</p></div></div>     <div class="callBack2"><p class="cbkmsg"><span>楼主回复：</span>' + cbkmsg +
                            '</p></div></div> </div>'
                    } else {
                        return '<div class="msgBox"> <div class="msgImg"> <img src="' + headImg +
                            '"/></div>   <div class="contBox"> <div class="msgContent"> <div><p>' + value.upname + '</p><p>' + time +
                            '</p></div>  <div> <p>' + value.Message + '</p></div></div>     <div class="callBack2"></div></div> </div>'
                    }
                } else {
                    if (callBackMsg.length > 0) {
                        $(" .callBack ").css({
                            "display": "block"
                        })
                        for (var i = 0; i < callBackMsg.length; i++) {
                            cbkmsg = callBackMsg[i].Message;
                        }
                        return '<div class="msgBox"> <div class="msgImg"> <img src="' + headKongImg +
                            '"/></div>   <div class="contBox">   <div class="msgContent"> <div><p>' + value.upname + '</p><p>' + time +
                            '</p></div>  <div> <p>' + value.Message +
                            '</p></div></div>     <div class="callBack2"><p class="cbkmsg"><span>楼主回复：</span>' + cbkmsg +
                            '</p></div></div> </div>'
                    } else {
                        return '<div class="msgBox"> <div class="msgImg"> <img src="' + headKongImg +
                            '"/></div>  <div class="contBox">   <div class="msgContent"> <div><p>' + value.upname + '</p><p>' + time +
                            '</p></div>  <div> <p>' + value.Message + '</p></div></div>     <div class="callBack2"></div></div> </div>'
                    }
                }
            };
        };
        window.viewVisitor = {
            'click .msgBox': function(e, value, row, index) {
                window.open("http://www.eqidd.com/chuangke/index_start.html?userGuid=" + row.MakerGuid)
            }
        };
        // 第一页
        function msgData(page) {
            setTimeout(function() {
                $.post('' + http_head + 'Makerspacey/MakerLeaveMsg/Get_MakerLeaveMsg.ashx', {
                    "page": page,
                    "makerGuid": userGuid
                }, function(data) {
                    var data = JSON.parse(data);
                    loadMsgTable(data.items);
                    $("#msgList").bootstrapTable("load", data.items);
                    pageNext = data.page;
                    if (data.items.length >= 6) {
                        $('.nextpageBtn').show()
                    } else {
                        $('.nextpageBtn').hide()
                    }
                })
            }, 350);
        };
        msgData(0);
        // 下一页
        function msgNext(page) {
            setTimeout(function() {
                $.post('' + http_head + 'Makerspacey/MakerLeaveMsg/Get_MakerLeaveMsg.ashx', {
                    "page": page,
                    "makerGuid": userGuid
                }, function(data) {
                    var data = JSON.parse(data);
                    if (data.items.length > 0) {
                        layer.msg("加载成功", {
                            time: 1200
                        })
                    } else {
                        layer.msg("没有更多了", {
                            time: 1200
                        })
                    }
                    loadMsgTable(data.items);
                    $("#msgList").bootstrapTable("append", data.items);
                    pageNext = data.page;
                    if (data.items.length >= 6) {
                        $('.nextpageBtn').show()
                    } else {
                        $('.nextpageBtn').hide()
                    }
                })
            }, 450);
        };
        $('.nextpageBtn').click(function() {
            msgNext(pageNext);
        });
        // 留言
        $(".submit").on("click", function() {
            if (userStr == null) {
                layer.msg("请先登录", {
                    time: 1500
                });
            } else {
                var message = $(".textarea").val();
                if (message == "") {
                    layer.msg("留言不能为空", {
                        time: 1500
                    })
                } else {
                    setTimeout(function() {
                        $.post('' + http_head + 'Makerspacey/MakerLeaveMsg/Add_MakerLeaveMsg.ashx', {
                            // 数据参数
                            userGuid: userData.Guid,
                            userCompanyId: userData.companyId,
                            parentUserGuid: "",
                            message: message,
                            parentId: 0,
                            makerGuid: userGuid,
                            // companyId: 0,
                            firstCommentId: 0
                        }, function(data) {
                            var data = JSON.parse(data);
                            console.log(data)
                            if (data.status == 200) {
                                layer.msg("留言成功", {
                                    time: 1500
                                });
                            }
                            message = $(".textarea").val('');
                            msgData(0);
                        })
                    }, 200)
                }
            }
        });
    })