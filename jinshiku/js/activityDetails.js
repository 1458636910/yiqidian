$(document).ready(function() {
    $(".mainFountion li a").eq(5).unbind('mouseenter').unbind('mouseleave').css({
        "color": "#00a2e8"
    });
    var href = location.href;
    //登陆退出
    var dataC = localStorage.getItem("GHY_login");
    var this_Guid;
    if (dataC != null) {
        var dataInfo = JSON.parse(dataC);
        this_Guid = dataInfo.Guid;
        $('#loginBtn').text(dataInfo.username);
        $("#regBtn").on("click", function() {
            localStorage.removeItem("GHY_login");
            window.location.reload();
        }).text("退出");
        var flag2 = 0;
        $("#loginBtn").on("click", function() {
            if (flag2 == 0) {
                $(".userOption").show("500");
                flag2 = 1;
            } else {
                $(".userOption").hide("500");
                flag2 = 0;
            }
        });
        $(".userOption").on("click", function() {
            window.open("http://www.eqidd.com/createrSpace/html/personInfo.html");
        })
    } else {
        this_Guid = " ";
        $('#loginBtn').click(function() {
            location.href = "./html/innerLogin.html?href=" + href + "";
        }).text("登录");
        $("#regBtn").on("click", function() {
            location.href = "http://www.eqidd.com/html/reg.html?href=" + href + "";
        }).text("注册")
    }
    var s = href.indexOf("?");
    var activityId;
    if (s >= 0) {
        activityId = href.split("=")[1];
        loadAcvitity(activityId)
    } else {
        location.href = "../html/lookActivity.html"
    }
    // 获取活动详情
    function loadAcvitity(activityId) {
        $.post('' + http_head + '/Activity/Get_ActivityById.ashx', {
            "activityId": activityId
        }, function(data) {
            var dataDetails = JSON.parse(data);
            console.log(dataDetails)
            $('.imgArea img').attr('src', dataDetails.items.activeImg);
            $('.title').text(dataDetails.items.activeTitle)
            $('.acType').text(dataDetails.items.activeType)
            $('.acClassity').text(dataDetails.items.activeClassify)
            $('.acObj').text(dataDetails.items.activeObject)
            $('#acSize').text(dataDetails.items.activeScale)
            $('#acNum').text(dataDetails.items.activeNum)
            $('.acAddress').text(dataDetails.items.activeProvince + dataDetails.items.activeCity + dataDetails.items.activeAddress)
            $('.acTime').text(dataDetails.items.activeStartTime)
            $('.acJianjieDiv').html(dataDetails.items.activeDesc)
            $('.acRichengDiv').html(dataDetails.items.activeSchedule)
            sameType(dataDetails.items.activeClassify)
            holderOther(dataDetails.items.creater, dataDetails.items.companyId)
            $(".viewInfor").on("click",function(){
            	if(dataDetails.items.companyId==0){
                    window.open("http://www.eqidd.com/changke/index_start.html?userGuid="+dataDetails.items.creater);
                }else{
                	window.open("http://www.eqidd.com/comSpace/information.html?conpanyId="+dataDetails.items.companyId)
                }
            })
            
        });
    }
    // 报名
    $('.buttonArea button').click(function() {
        console.log(this_Guid, activityId)
        layer.open({
            type: 1,
            area: '300px',
            title: ['报名活动', 'font-size:18px;text-align: center;'],
            content: $('.baomingDiv'),
            btn: '确定',
            yes: function(index, layero) {
                $.post('' + http_head + '/Activity/Add_ActivityReg.ashx', {
                    "userGuid": this_Guid,
                    "activityId": activityId,
                    "username": $('.nameVal').val(),
                    "phone": $('.phoneVal').val(),
                }, function(data) {
                    var dataYes = JSON.parse(data)
                    console.log(data)
                    if (dataYes.status == 200) {
                        layer.close(index);
                        layer.msg(dataYes.msg, {
                            time: 1000,
                        })
                        $('.nameVal').val(" ");
                        $('.phoneVal').val(" ")
                    } else {
                        layer.msg(dataYes.msg, {
                            time: 1000,
                        })
                    }
                });
            }
        });
    });
    // 	// 发布需求
    $("#sendDemand").on("click", function() {
        window.open("http://www.eqidd.com/qiyeSpace/html/addActicity.html")
    })
    // 举报
    $('.jubao').click(function() {
        layer.msg("暂未开发，敬请期待", {
            time: 1000,
        })
    });
    //活动其他信息
    // 1.鼠标移入移出
    $('.acvitityOtherDiv ul li').hover(function() {
        $(this).css('borderBottom', '2px solid #00368a').siblings().css('borderBottom', '1px solid #e7e7e7')
    }, function() {
        $(this).css('borderBottom', '1px solid #e7e7e7')
    });
    // 2.点击
    $('.acvitityOtherDiv ul li').on("click", function() {
        var index = $(this).index();
        $(this).addClass("active").children().addClass("activea"),
            $(this).siblings().removeClass("active").children().removeClass("activea")
        $(".acvitityOtherDiv div").eq(index).show().siblings('div').hide();
        if(index==3){
        	$(".holderInfoDiv").show().siblings("div").hide()
        }
    })
    // 3.报名情况
    var pageNext = 0;

    function signTable(data) {
        $(".signUpTable").bootstrapTable({
            data: data,
            columns: [{
                field: 'username',
                title: "姓名",
                align: 'center',
                valign: 'middle',
            }, {
                field: 'createTime',
                title: "报名时间",
                align: 'center',
                valign: 'middle',
            }]
        })
    };

    function loadFirst(page) {
        setTimeout(function() {
            $.post(http_head + '/Activity/Get_ActiveBaoMing.ashx', {
                "activityId": activityId,
                "page": page,
                "status": 3
            }, function(data) {
                var data = JSON.parse(data);
                if (data.status == 200) {
                    signTable(data.items);
                    $(".signUpTable").bootstrapTable("load", data.items);
                    pageNext = data.page;
                    if (data.items.length >= 10) {
                        $(".typeArea").fadeIn();
                    } else {
                        $(".typeArea").hide();
                    }
                }
            })
        }, 350);
    };

    function loadNext(page) {
        setTimeout(function() {
            $.post(http_head + '/Activity/Get_ActiveBaoMing.ashx', {
                "activityId": activityId,
                "page": page,
                "status": 3
            }, function(data) {
                var data = JSON.parse(data);
                if (data.status == 200) {
                    layer.msg("加载完成", {
                        time: 1200
                    })
                    signTable(data.items);
                    $(".signUpTable").bootstrapTable("append", data.items);
                    pageNext = data.page;
                    if (data.items.length >= 10) {
                        $(".typeArea").fadeIn();
                    } else {
                        $(".typeArea").hide();
                    }
                }
            })
        }, 350);
    };
    loadFirst(pageNext);
    $(".nextpage").on("click", function() {
        loadNext(pageNext)
    })
    // 加载尾部
    setTimeout(function() {
        $('#footer').load("../html/footer2.html");
    }, 500)
    //推荐的讲师
    tuijainTeacher()

    function tuijainTeacher() {
        $.post('' + http_head + '/Lectures/recommend/Get_LectureRecommend.ashx', {
            type: 0
        }, function(data) {
            var dataTuijain = JSON.parse(data);
            for (var itemValue of dataTuijain.items) {
                var imgURLmin = itemValue.lectureImage.replace(/.png/, "min.png")
                var array_label = [];
                var str_label = '';
                str_label = itemValue.lectureType.split(",")
                for (var i = 0; i < str_label.length; i++) {
                    array_label.push('《<span class="">' + str_label[i] + '</span>》')
                }
                var str = '<li class="clearfix" id="' + itemValue.lectureGuid + '" alt="' + itemValue.lectureName + '"><img src="' + imgURLmin + '" alt="" class="pull-left"><div class="pull-left"><p class="lectureName">' + itemValue.lectureName + '</p><p class="lectureLabel">' + array_label + '</p></div></li>';
                $('#mateLecturer').append(str);
            }
            $('#mateLecturer li').click(function() {
            	var this_id = $(this).attr("id");
                window.open("http://www.eqidd.com/changke/index_start.html?userGuid="+this_id)
            });
        })
    }
    // 推荐讲师滚动
    var $this2 = $("#matelecturerDiv");
    var scrollTimer2;
    $this2.hover(function() {
        clearInterval(scrollTimer2);
    }, function() {
        scrollTimer2 = setInterval(function() {
            scrollNews2($this2);
        }, 2000);

        function scrollNews2(obj) {
            var $self = obj.find("ul");
            var lineHeight = $self.find("li:first").height();
            $self.animate({
                "marginTop": -81 + "px"
            }, 600, function() {
                $self.css({
                    marginTop: 0
                }).find("li:first").appendTo($self);
            })
        }
    }).trigger("mouseleave");
    // 同类型活动
    function sameType(type) {
        $.post('' + http_head + '/Activity/getActiveByType.ashx', {
            "activeClass": type,
            "page": 0
        }, function(data) {
            var dataSameType = JSON.parse(data)
            for (var itemValue of dataSameType.items) {
                var str = '<li id="' + itemValue.Id + '"><div class="clearfix"><img src="' + itemValue.activeImg + '" alt="" class="pull-left"><div class="pull-left"><p>' + itemValue.activeTitle + '</p><p>' + itemValue.activeStartTime.split(" ")[0] + '</p></div></div></li>';
                $('#sametype').append(str);
            }
            $('#sametype li').on("click",function(){
            	var this_id = $(this).attr("id");
            	window.open("http://www.jinshiku.com/html/activityDetails.html?id="+this_id)
            })

        });
    }
    var $this3 = $("#sametypeDiv");
    var scrollTimer3;
    $this3.hover(function() {
        clearInterval(scrollTimer3);
    }, function() {
        scrollTimer3 = setInterval(function() {
            scrollNews3($this3);
        }, 2000);

        function scrollNews3(obj) {
            var $self = obj.find("ul");
            var lineHeight = $self.find("li:first").height();
            $self.animate({
                "marginTop": -81 + "px"
            }, 600, function() {
                $self.css({
                    marginTop: 0
                }).find("li:first").appendTo($self);
            })
        }
    }).trigger("mouseleave");
    // 主办方其他活动
    function holderOther(guid, comId) {
        $.post('' + http_head + '/Activity/getActvieByCreater.ashx', {
            "userGuid": guid,
            "companyId": comId,
            "page": 0
        }, function(data) {
            var dataOther = JSON.parse(data);
            for (var itemValue of dataOther.items) {
                var str = '<li id="' + itemValue.Id + '"><div class="clearfix"><img src="' + itemValue.activeImg + '" alt="" class="pull-left"><div class="pull-left"><p>' + itemValue.activeTitle + '</p><p>' + itemValue.activeStartTime.split(" ")[0] + '</p></div></div></li>';
                $('#holderother').append(str);
            };
            $('#holderother li').on("click",function(){
            	var this_id = $(this).attr("id");
            	window.open("http://www.jinshiku.com/html/activityDetails.html?id="+this_id)
            })
        });
    }
    var $this4 = $("#holderotherDiv");
    var scrollTimer4;
    $this4.hover(function() {
        clearInterval(scrollTimer4);
    }, function() {
        scrollTimer4 = setInterval(function() {
            scrollNews4($this4);
        }, 2000);

        function scrollNews4(obj) {
            var $self = obj.find("ul");
            var lineHeight = $self.find("li:first").height();
            $self.animate({
                "marginTop": -81 + "px"
            }, 600, function() {
                $self.css({
                    marginTop: 0
                }).find("li:first").appendTo($self);
            })
        }
    }).trigger("mouseleave");
    // 搜索
    $('#searchBtn').click(function() {
        if ($('#inputSearch').val().length == 0) {
            layer.msg('搜索关键字不能为空', {
                time: 1000,
            });
        } else {
            if ($('#selectType').val() == "1") {
                window.open("teacherIndex.html?searchVal=" + $('#inputSearch').val() + "")
            } else if ($('#selectType').val() == "2") {
                window.open("lookCourseList.html?courseName=" + $('#inputSearch').val() + "")
            } else if ($('#selectType').val() == "3") {
                window.open("lookDemandList.html?demandName=" + $('#inputSearch').val() + "")
            } else if ($('#selectType').val() == "4") {
                window.open("lookCircleList.html?circleName=" + $('#inputSearch').val() + "")
            } else if ($('#selectType').val() == "5") {
                window.open("lookActivity.html?activityName=" + $('#inputSearch').val() + "")
            } else {}
        }
    });
    $('#inputSearch').keydown(function(event) {
        if (event.keyCode === 13) {
            if ($('#inputSearch').val().length == 0) {
                layer.msg('搜索关键字不能为空', {
                    time: 1000,
                });
            } else {
                if ($('#selectType').val() == "1") {
                    window.open("teacherIndex.html?searchVal=" + $('#inputSearch').val() + "")
                } else if ($('#selectType').val() == "2") {
                    window.open("lookCourseList.html?courseName=" + $('#inputSearch').val() + "")
                } else if ($('#selectType').val() == "3") {
                    window.open("lookDemandList.html?demandName=" + $('#inputSearch').val() + "")
                } else if ($('#selectType').val() == "4") {
                    window.open("lookCircleList.html?circleName=" + $('#inputSearch').val() + "")
                } else if ($('#selectType').val() == "5") {
                    window.open("lookActivity.html?activityName=" + $('#inputSearch').val() + "")
                } else {}
            }
        }
    });
})