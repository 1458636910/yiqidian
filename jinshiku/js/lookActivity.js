$(document).ready(function() {
    //登陆退出
    var href = location.href;
    var dataC = localStorage.getItem("GHY_login");
    if (dataC != null) {
        var dataInfo = JSON.parse(dataC);
        $('#loginBtn').text(dataInfo.username);
        $("#regBtn").on("click", function() {
            localStorage.removeItem("GHY_login");
            window.location.reload();
        }).text("退出")
    } else {
        $('#loginBtn').click(function() {
            location.href = "./innerLogin.html?href=" + href + "";
        }).text("登录");
        $("#regBtn").on("click", function() {
            location.href = "http://www.eqidd.com/html/reg.html?href=" + href + "";
        }).text("注册")
    };
    $('#writeCircleBtn button').click(function() {
        window.open("../html/writeCircle.html")
    });
    $(".mainFountion li a").eq(5).unbind('mouseenter').unbind('mouseleave');
    ////////////////////////////////////////////////////////////////////
    var typeVal = '';
    var addressVal = "";
    var statusVal = 0
    var chargeVal = 2
    var acLeibie = "";
    var paraVal = " ";
    var acPage = 0;
    var days = 365;
    // 搜索函数 
    var schUrlPara;
    if (href.indexOf("?") > 0 && href.indexOf("activityName") > 0) {
        // 首页搜索
        schUrlPara = decodeURI(href.split("=")[1], "UTF-8");
        searchAcvitity(schUrlPara, 0, days, chargeVal, typeVal, addressVal, acLeibie, statusVal)
    } else {
        searchAcvitity(paraVal, acPage, days, chargeVal, typeVal, addressVal, acLeibie, statusVal)
    };
    // 数据表格
    function loadTable(data) {
        $('#activityListTable').bootstrapTable({
            onPostBody: function(name, args) {
                $("img.lazyac").lazyload({
                    effect: "fadeIn",
                });
            },
            data: data,
            columns: [{
                field: 'activity',
                formatter: optionFormatter,
                events: optionEvents
            }]
        });

        function optionFormatter(e, value, row, index) {
            var yourtime = value.activeEndTime;
            var addSpan;
            yourtime = yourtime.replace("-", "/"); //替换字符，变成标准格式
            var d2 = new Date(); //取今天的日期
            var d1 = new Date(Date.parse(yourtime));
            if (d1 < d2) {
                addSpan = '报名结束'
            } else {
                addSpan = '报名中'
            };
            var actImg;
            if (value.activeImg.indexOf(".png") > 0 || value.activeImg.indexOf(".jpg") > 0 || value.activeImg.indexOf(".jpeg") > 0) {
                if (value.activeImg.indexOf(".png") > 0) {
                    actImg = value.activeImg.split(".png")[0] + "min.png";
                } else if (value.activeImg.indexOf(".jpg") > 0) {
                    actImg = value.activeImg.split(".jpg")[0] + "min.jpg";
                } else if (value.activeImg.indexOf(".jpeg") > 0) {
                    actImg = value.activeImg.split(".jpeg")[0] + "min.jpeg";
                }
            } else {
                actImg = "../image/a10null.jpg"
            };
            return '<div class="clearfix activityDiv">   <div id="imgDiv"><img class="lazyac" data-original=" ' + actImg + '" alt="" /> </div>   <div class="userInfor"><p><span><label>' + value.activeTitle + '</label></span> </p><p><img src="../image/flocation.png" /> <span>' + value.activeCity + '</span> <img src="../image/time2.png" /> <span>' + value.activeStartTime.split(" ")[0] + '</span> </p> <div class="information">  <p>阅读量：' + value.pageView + ' </p> <p>报名人数：' + value.regCount + '</p> <p>负责人：' + value.activer + '</p>  </div> </div> <p class="authen">' + addSpan + '</p>   </div>'
        }
    };
    window.optionEvents = {
        'click .activityDiv': function(e, value, row, index) {
            window.open("http://www.eqidd.com/changke/html/activityDetails.html?id=" + row.Id + "")
        }
    };

    function searchAcvitity(paraVal, page, days, chargeVal, typeVal, addressVal, acLeibie, statusVal) {
        $.post('' + http_head + '/Activity/Get_ActivityBySearch.ashx', {
            "para": paraVal,
            "page": page,
            "isCharge": chargeVal,
            "activeType": typeVal,
            "province": addressVal,
            "activeClassify": acLeibie,
            "typeTime": statusVal,
            "days": days
        }, function(data) {
            var datasearchAcvitity = JSON.parse(data);
			console.log(datasearchAcvitity)
            loadTable(datasearchAcvitity.items);
            if (datasearchAcvitity.status == 200) {
                if (datasearchAcvitity.items.length == 0) {
                    layer.msg('暂无搜索结果', {
                        time: 1000,
                    });
                } else {
                    layer.msg('搜索成功', {
                        time: 1000,
                    });
                }
            };
            $("#activityListTable").bootstrapTable('load', datasearchAcvitity.items);
            acPage = datasearchAcvitity.page;
            if (datasearchAcvitity.items.length > 9) {
                $('.loadAcvitityNext').show()
            } else {
                $('.loadAcvitityNext').hide()
            }
        });
    };

    function searchAcvitityNext(paraVal, page, days, chargeVal, typeVal, addressVal, acLeibie, statusVal) {
        $.post('' + http_head + '/Activity/Get_ActivityBySearch.ashx', {
            "para": paraVal,
            "page": page,
            "isCharge": chargeVal,
            "activeType": acLeibie,
            "province": addressVal,
            "activeClassify": typeVal ,
            "typeTime": statusVal,
            "days": days
        }, function(data) {
            var datasearchAcvitity = JSON.parse(data);
            if (datasearchAcvitity.status == 200) {
                if (datasearchAcvitity.items.length == 0) {
                    layer.msg('暂无搜索结果', {
                        time: 1000,
                    });
                } else {
                    layer.msg('搜索成功', {
                        time: 1000,
                    });
                    $("#activityListTable").bootstrapTable('append', datasearchAcvitity.items);
                }
            }
            acPage = datasearchAcvitity.page;
            if (datasearchAcvitity.items.length > 9) {
                $('.loadAcvitityNext').show()
            } else {
                $('.loadAcvitityNext').hide()
            }
        });
    };
    $('.loadAcvitityNext').click(function() {
        if ($('#inputSearch').val().length != 0) {
            paraVal = $('#inputSearch').val()
        }
        searchAcvitityNext(paraVal, acPage, days, chargeVal, typeVal, addressVal, acLeibie, statusVal);
    });
    // 输入框搜索
    $('#inputSearch').keydown(function(event) {
        if (event.keyCode === 13) {
            if ($('#inputSearch').val().length == 0) {
                layer.msg('搜索关键字不能为空', {
                    time: 1000,
                });
            } else {
                searchAcvitity($('#inputSearch').val(), 0, days, chargeVal, typeVal, addressVal, acLeibie, statusVal);
            }
        } else {}
    });
    $('#searchBtn').click(function() {
        if ($('#inputSearch').val().length == 0) {
            layer.msg('搜索关键字不能为空', {
                time: 1000,
            });
        } else {
            searchAcvitity($('#inputSearch').val(), 0, days, chargeVal, typeVal, addressVal, acLeibie, statusVal);
        }
    });
    $('#searchBtn').click(function() {
        if ($('#inputSearch').val().length == 0) {
            layer.msg('搜索关键字不能为空', {
                time: 1000,
            });
        } else {
            if ($('#selectType').val() == "1") {
                window.open("./teacherIndex.html?searchVal=" + $('#inputSearch').val() + "");
            } else if ($('#selectType').val() == "2") {
                window.open("./advisory.html?advName=" + $('#inputSearch').val() + "")
            } else if ($('#selectType').val() == "3") {
                window.open("./lookDemandList.html?demandName=" + $('#inputSearch').val() + "")
            } else if ($('#selectType').val() == "4") {
                window.open("http://www.eqidd.com/yqy/search.html?searchKey=" + $('#inputSearch').val() + "")
            } else if($('#selectType').val() == "6"){
    			window.open("./organization.html?orgName=" + $('#inputSearch').val() + "")
    		}else if($('#selectType').val() == "7"){
    			window.open("./lookCourseList.html?couName=" + $('#inputSearch').val() + "")
    		}
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
                    window.open("./teacherIndex.html?searchVal=" + $('#inputSearch').val() + "");
                } else if ($('#selectType').val() == "2") {
                     window.open("./advisory.html?advName=" + $('#inputSearch').val() + "")
                } else if ($('#selectType').val() == "3") {
                    window.open("./lookDemandList.html?demandName=" + $('#inputSearch').val() + "")
                } else if ($('#selectType').val() == "4") {
                     window.open("http://www.eqidd.com/yqy/search.html?searchKey=" + $('#inputSearch').val() + "")
                } else if($('#selectType').val() == "6"){
    				window.open("./organization.html?orgName=" + $('#inputSearch').val() + "")
    			} else if($('#selectType').val() == "7"){
    				window.open("./lookCourseList.html?couName=" + $('#inputSearch').val() + "")
    			}
            }
        }
    });
	var schUrlPara;
	if (href.indexOf("?") > 0 && href.indexOf("activityName") > 0) {
		schUrlPara = decodeURI(href.split("=")[1], "UTF-8");
		searchAcvitity(schUrlPara, 0, days, chargeVal, typeVal, addressVal, acLeibie, statusVal);
	};
    function loadteacherType() {
        $.post('' + http_head + '/Option_AreasAnd.ashx', {
            "type": 50
        }, function(data) {
            for (var i = 0; i < data.length; i++) {
                $('#select1').append('<dd id="' + i + '"><a>' + data[i].name + '</a></dd>')
            }
            $("#select1 dd").eq(0).click(function() {
                if ($('#inputSearch').val().length != 0) {
                    paraVal = $('#inputSearch').val().trim()
                } else {
                    paraVal = " "
                }
                acLeibie = "";
                searchAcvitity(paraVal, 0, days, chargeVal, typeVal, addressVal, acLeibie, statusVal);
                $(this).addClass("selected").siblings().removeClass("selected");
                $("#selectA").remove();
                $('#secondType').hide()
            })
            $("#select1 dd:gt(0)").click(function() {
                $('#secondType').show();
                $(this).addClass("selected").siblings().removeClass("selected");
                $('#select1Min dd').remove();
                for (var j = 0; j < data[$(this).attr('id')].children.length; j++) {
                    $('#select1Min').append('<dd><a>' + data[$(this).attr('id')].children[j].name + '</a></dd>');
                };
                $("#select1Min dd").click(function() {
                    acLeibie = $(this).text();
                    searchAcvitity(paraVal, 0, days, chargeVal, typeVal, addressVal, acLeibie, statusVal);
                    $(this).addClass("selected").siblings().removeClass("selected");
                    if ($(this).hasClass("select-all")) {
                        $("#selectA").remove();
                    } else {
                        var copyThisA = $(this).clone();
                        if ($("#selectA").length > 0) {
                            $("#selectA a").html($(this).text());
                        } else {
                            $(".select-result dl").append(copyThisA.attr("id", "selectA"));
                        }
                    }
                });
            })
        });
    };
    loadteacherType();
    $("#select5 dd").click(function() {
        var index = $(this).index();
        $(this).addClass("selected").siblings().removeClass("selected");
        if(index==1){
            typeVal = ' ';
        }else{
            typeVal =$(this).text().trim();
        }
        
        if ($('#inputSearch').val().length != 0) {
            paraVal = $('#inputSearch').val()
        } else {
            paraVal = " "
        }

        searchAcvitity(paraVal, 0, days, chargeVal, typeVal, addressVal, acLeibie, statusVal);
        if ($(this).hasClass("select-all")) {
            $("#selectE").remove();
        } else {
            var copyThisE = $(this).clone();
            if ($("#selectE").length > 0) {
                $("#selectE a").html($(this).text());
            } else {
                $(".select-result dl").append(copyThisE.attr("id", "selectE"));
            }
        }
    });
    $("#select2 dd").click(function() {
        $(this).addClass("selected").siblings().removeClass("selected");
        var index = $(this).index();
        if(index==1){
            addressVal = ''
        }else{
            addressVal = $(this).text().trim()
        };
        if ($('#inputSearch').val().length != 0) {
            paraVal = $('#inputSearch').val()
        } else {
            paraVal = " "
        };
        searchAcvitity(paraVal, 0, days, chargeVal, typeVal, addressVal, acLeibie, statusVal);
        if ($(this).hasClass("select-all")) {
            $("#selectB").remove();
        } else {
            var copyThisB = $(this).clone();
            if ($("#selectB").length > 0) {
                $("#selectB a").html($(this).text());
            } else {
                $(".select-result dl").append(copyThisB.attr("id", "selectB"));
            }
        }
    });
    $("#select3 dd").click(function() {
        var index = $(this).index();
        $(this).addClass("selected").siblings().removeClass("selected");
        if(index == 1){
            statusVal = 0
        }else if(index == 2){
            statusVal = -1;
        }else if(index == 3){
            statusVal = 1
        };
        if ($('#inputSearch').val().length != 0) {
            paraVal = $('#inputSearch').val()
        } else {
            paraVal = " "
        }
        searchAcvitity(paraVal, 0, days, chargeVal, typeVal, addressVal, acLeibie, statusVal);
        if ($(this).hasClass("select-all")) {
            $("#selectC").remove();
        } else {
            var copyThisC = $(this).clone();
            if ($("#selectC").length > 0) {
                $("#selectC a").html($(this).text());
            } else {
                $(".select-result dl").append(copyThisC.attr("id", "selectC"));
            }
        }
    });
    $("#select4 dd").click(function() {
        $(this).addClass("selected").siblings().removeClass("selected");
        var index = $(this).index();
        if( index == 1){
            chargeVal = 2;
        }else if( index == 2){
            chargeVal = 0;
        }else if(index ==3){
            chargeVal = 1;
        }
        
        if ($('#inputSearch').val().length != 0) {
            paraVal = $('#inputSearch').val()
        } else {
            paraVal = " "
        }
        searchAcvitity(paraVal, 0, days, chargeVal, typeVal, addressVal, acLeibie, statusVal);
        if ($(this).hasClass("select-all")) {
            $("#selectD").remove();
        } else {
            var copyThisD = $(this).clone();
            if ($("#selectD").length > 0) {
                $("#selectD a").html($(this).text());
            } else {
                $(".select-result dl").append(copyThisD.attr("id", "selectD"));
            }
        }
    });
    //////////////////////////////////////////////////////////////////////////////////////////
    var timeVal = ["1天", "3天", "7天", "15天", "30天", "60天", "3个月", "半年", "1年前"];
    var timeList = ["1", "3", "7", "15", "30", "60", "90", "180", "365", ];
    for (var i = 0; i < timeVal.length; i++) {
        $("#select6 ").append("<dd><a >" + timeVal[i] + "</a></dd>")
    }
    $("#select6 dd").click(function() {
        var index = $(this).index();
        coursePage = 0;
        if (index >= 2) {
            days = timeList[index - 2];
        } else {
            days = 365
        }
        if ($('#inputSearch').val().length != 0) {
            paraVal = $('#inputSearch').val()
        } else {
            paraVal = " "
        }
        searchAcvitity(paraVal, 0, days, chargeVal, typeVal, addressVal, acLeibie, statusVal);
        $(this).addClass("selected").siblings().removeClass("selected");
        if ($(this).hasClass("select-all")) {
            $("#selectF").remove();
        } else {
            var copyThisF = $(this).clone();
            if ($("#selectF").length > 0) {
                $("#selectF a").html($(this).text());
            } else {
                $(".select-result dl").append(copyThisF.attr("id", "selectF"));
            }
        }
    });
    ///////////////////////////////////////////////////////////////////////////////////////////
    $(document).on("click", "#selectA", function() {
        acLeibie = ""
        $(this).remove();
        $('#secondType').hide();
        $("#select1 .select-all").addClass("selected").siblings().removeClass("selected");
        $("#select1Min dd").addClass("selected").siblings().removeClass("selected");
        if ($('#inputSearch').val().length != 0) {
            paraVal = $('#inputSearch').val()
        } else {
            paraVal = " "
        }
        searchAcvitity(paraVal, 0, days, chargeVal, typeVal, addressVal, acLeibie, statusVal);
    });
    $(document).on("click", "#selectB", function() {
        addressVal = ""
        $(this).remove();
        if ($('#inputSearch').val().length != 0) {
            paraVal = $('#inputSearch').val()
        } else {
            paraVal = " "
        }
        searchAcvitity(paraVal, 0, days, chargeVal, typeVal, addressVal, acLeibie, statusVal);
        $("#select2 .select-all").addClass("selected").siblings().removeClass("selected");
    });
    $(document).on("click", "#selectC", function() {
        statusVal = 0
        $(this).remove();
        if ($('#inputSearch').val().length != 0) {
            paraVal = $('#inputSearch').val()
        } else {
            paraVal = " "
        }
        searchAcvitity(paraVal, 0, days, chargeVal, typeVal, addressVal, acLeibie, statusVal);
        $("#select3 .select-all").addClass("selected").siblings().removeClass("selected");
    });
    $(document).on("click", "#selectD", function() {
        chargeVal = 2;
        $(this).remove();
        if ($('#inputSearch').val().length != 0) {
            paraVal = $('#inputSearch').val()
        } else {
            paraVal = " "
        }
        searchAcvitity(paraVal, 0, days, chargeVal, typeVal, addressVal, acLeibie, statusVal);
        $("#select4 .select-all").addClass("selected").siblings().removeClass("selected");
    });
    $(document).on("click", "#selectE", function() {
        typeVal = "";
        $(this).remove();
        if ($('#inputSearch').val().length != 0) {
            paraVal = $('#inputSearch').val()
        } else {
            paraVal = " "
        }
        searchAcvitity(paraVal, 0, days, chargeVal, typeVal, addressVal, acLeibie, statusVal);
        $("#select5 .select-all").addClass("selected").siblings().removeClass("selected");
    });
    $(document).on("click", "#selectF", function() {
        $(this).remove();
        if ($('#inputSearch').val().length != 0) {
            days = $('#inputSearch').val()
        } else {
            days = 365
        }
        if ($('#inputSearch').val().length != 0) {
            paraVal = $('#inputSearch').val()
        } else {
            paraVal = " "
        }
        searchAcvitity(paraVal, 0, days, chargeVal, typeVal, addressVal, acLeibie, statusVal);
        $("#select6 .select-all").addClass("selected").siblings().removeClass("selected");
    });
    $(document).on("click", ".select dd", function() {
        if ($(".select-result dd").length > 1) {
            $(".select-no").hide();
        } else {
            $(".select-no").show();
        }
    });
    // 排序方式
    $('#sortType li').click(function() {
        $(this).addClass('liactive').siblings('li').removeClass('liactive')
    });
    // 最新的活动
    loadNewActicity(0, "");

    function loadNewActicity(page, city) {
        $.post('' + http_head + '/Activity/Get_ActivityByTime.ashx', {
            "page": page,
            "city": city
        }, function(data) {
            var dataNewActicity = JSON.parse(data);
            if (dataNewActicity.status == 200) {
                var actImg;
                for (var itemValue of dataNewActicity.items) {
                    if (itemValue.activeImg.indexOf(".png") > 0 || itemValue.activeImg.indexOf(".jpg") > 0 || itemValue.activeImg.indexOf(".jpeg") > 0) {
                        if (itemValue.activeImg.indexOf(".png") > 0) {
                            actImg = itemValue.activeImg.split(".png")[0] + "min.png";
                        } else if (itemValue.activeImg.indexOf(".jpg") > 0) {
                            actImg = itemValue.activeImg.split(".jpg")[0] + "min.jpg";
                        } else if (itemValue.activeImg.indexOf(".jpeg") > 0) {
                            actImg = itemValue.activeImg.split(".jpeg")[0] + "min.jpeg";
                        }
                    } else {
                        actImg = "../image/a10null.jpg"
                    };
                    var str = '<li id="' + itemValue.Id + '" style="height: 60px!important;"><div class="pull-left"><p style="overflow: hidden;text-overflow: ellipsis;">' + itemValue.activeTitle + '</p></div></li>';
                    $('.newAcvitityArea').append(str);
                };
                $(".newAcvitityArea li").on("click", function() {
                    var this_guid = $(this).attr("id");
                    window.open("http://www.eqidd.com/changke/html/activityDetails.html?id=" + this_guid + "")
                });
               
            };
        });
    };
    var $thisDemand = $(".newAcvitity");
    var scrollTimerDemand;
    $thisDemand.hover(function() {
        clearInterval(scrollTimerDemand);
    }, function() {
        scrollTimerDemand = setInterval(function() {
            scrollNewsDemand($thisDemand);
        }, 2000);

        function scrollNewsDemand(obj) {
            var $self = obj.find("ul");
            var lineHeight = $self.find("li:first").height();
            $self.animate({
                "marginTop": -60 + "px"
            }, 400, function() {
                $self.css({
                    marginTop: 0
                }).find("li:first").appendTo($self);
            })
        }
    }).trigger("mouseleave");
    // 浏览最多的活动
    loadMostActicity(0, "");

    function loadMostActicity(page, city) {
        $.post('' + http_head + '/Activity/Get_ActivityByPageView.ashx', {
            "page": page,
            "city": city
        }, function(data) {
            var dataMostActicity = JSON.parse(data);
            var actImg;
            for (var itemValue of dataMostActicity.items) {
                if (itemValue.activeImg.indexOf(".png") > 0 || itemValue.activeImg.indexOf(".jpg") > 0 || itemValue.activeImg.indexOf(".jpeg") > 0) {
                    if (itemValue.activeImg.indexOf(".png") > 0) {
                        actImg = itemValue.activeImg.split(".png")[0] + "min.png";
                    } else if (itemValue.activeImg.indexOf(".jpg") > 0) {
                        actImg = itemValue.activeImg.split(".jpg")[0] + "min.jpg";
                    } else if (itemValue.activeImg.indexOf(".jpeg") > 0) {
                        actImg = itemValue.activeImg.split(".jpeg")[0] + "min.jpeg";
                    }
                } else {
                    actImg = "../image/a10null.jpg"
                };
                var str = '<li id="' + itemValue.Id + '" style="height: 60px!important;"><div class="clearfix"><div class="pull-left"><p>' + itemValue.activeTitle + '</p></div></div></li>';
                $('.visitMostArea').append(str);
            };
            $(".visitMostArea li").on("click", function() {
                var this_guid = $(this).attr("id");
                window.open("http://www.eqidd.com/changke/html/activityDetails.html?id=" + this_guid + "");
            });
            
        });
    };
    var $this1 = $(".visitMost");
    var scrollTimer1;
    $this1.hover(function() {
        clearInterval(scrollTimer1);
    }, function() {
        scrollTimer1 = setInterval(function() {
            scrollNews1($this1);
        }, 2000);

        function scrollNews1(obj) {
            var $self = obj.find("ul");
            var lineHeight = $self.find("li:first").height();
            $self.animate({
                "marginTop": -60 + "px"
            }, 800, function() {
                $self.css({
                    marginTop: 0
                }).find("li:first").appendTo($self);
            })
        }
    }).trigger("mouseleave");
    // 报名最多的活动
    loadAttendActicity(0, "");

    function loadAttendActicity(page, city) {
        $.post('' + http_head + '/Activity/Get_ActivityByRegCount.ashx', {
            "page": page,
            "city": city
        }, function(data) {
            var dataAttendActicity = JSON.parse(data);
            var actImg;
            for (var itemValue of dataAttendActicity.items) {
                if (itemValue.activeImg.indexOf(".png") > 0 || itemValue.activeImg.indexOf(".jpg") > 0 || itemValue.activeImg.indexOf(".jpeg") > 0) {
                    if (itemValue.activeImg.indexOf(".png") > 0) {
                        actImg = itemValue.activeImg.split(".png")[0] + "min.png";
                    } else if (itemValue.activeImg.indexOf(".jpg") > 0) {
                        actImg = itemValue.activeImg.split(".jpg")[0] + "min.jpg";
                    } else if (itemValue.activeImg.indexOf(".jpeg") > 0) {
                        actImg = itemValue.activeImg.split(".jpeg")[0] + "min.jpeg";
                    }
                } else {
                    actImg = "../image/a10null.jpg"
                };
                var str = '<li id="' + itemValue.Id + '" style="height: 60px!important;"><div class="pull-left"><p>' + itemValue.activeTitle + '</p></div></li>';
                $('.signUPMostArea').append(str);
            };
            
            $(".signUPMostArea li").on("click", function() {
                var this_guid = $(this).attr("id");
                window.open("http://www.eqidd.com/changke/html/activityDetails.html?id=" + this_guid + "");
            });
        });
    };
    var $this2 = $(".signUPMost");
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
                "marginTop": -60 + "px"
            }, 600, function() {
                $self.css({
                    marginTop: 0
                }).find("li:first").appendTo($self);
            })
        }
    }).trigger("mouseleave");
    // 加载尾部
    setTimeout(function() {
        $('#footer').load("../html/footer2.html");
    }, 500);
    var flag = 0;
    $("#showMore").on("click", function() {
        if (flag == 0) {
            $("#pick").animate({
                height: "474px"
            }, "slow", "swing", function() {
                $("#showMore a").text("收起>>")
            });
            flag = 1;
        } else {
            $("#pick").animate({
                height: "310px"
            }, "slow", "swing", function() {
                $("#showMore a").text("更多选项>>")
            });
            flag = 0
        }
    })
})