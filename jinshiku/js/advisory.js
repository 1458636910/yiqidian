$(document).ready(function() {
    var pageType = 0; //页码
    var para = ''; //搜索关键字
    var industry = ''; //行业
    var fieldSort = '';
    var field = ''; //咨询师领域
    var area = ""; //常住地
    var m1 = -1;
    var m2 = 100000; //师资费
    var mode = 0; //咨询模式
    var sex = -1; //性别
    var a1 = 0;
    var a2 = 200; //年龄
    var workBg = ""; //工作背景
    var jobOld = ""; //曾担任职位
    var isAuthen = 1; //是否认证
    searchAdvisory(pageType, para, fieldSort, field, industry, area, sex, mode, isAuthen, workBg, jobOld, m1, m2, a1, a2);
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
    // 加载尾部
    setTimeout(function() {
        $('#footer').load("../html/footer2.html");
    }, 500);
    $(".mainFountion li a").eq(2).unbind('mouseenter').unbind('mouseleave');
    //////////////////////////////////////////////////////////////////////
    // 搜索结果显示表
    var guid_arr = [];
    var data_arr = [];

    function advisoryTable(data) {
        $('#advisoryTable').bootstrapTable({
            onPostBody: function(name, args) {
                $("img.lazyadv").lazyload({
                    effect:"fadeIn",
                });
            },
            columns: [{
                align: 'center',
                valign: 'middle',
                formatter: searchFormatter,
                events: viewDetails
            }],
            data: data
        });

        function searchFormatter(row, value, index) {
            if (value.A_photo) {
                imgSrc = http_head + "/" + value.A_photo;
            } else {
                imgSrc = "../image/touxiang.png";
            }
            var authen;
            if (value.authen == 1) {
                authen = "已认证";
            } else if (value.authen == -1) {
                authen = "未认证";
            }
            var mode;
            if (value.A_mode == 1) {
                mode = "定期驻场"
            } else if (value.A_mode == 2) {
                mode = "全程驻厂"
            } else if (value.A_mode == 0) {
                mode = "（定期/全程）驻厂 "
            }
            return '<div class="clearfix" id="singleDetails" viewId="' + value.userGuid + '" alt="' + value.name + '">   <div id="imgDiv"><img class="lazyadv" data-original="' + imgSrc + '" alt="" /> </div>   <div class="userInfor"><p><span><label>' + value.name + '</label></span><span> 工作背景：' + value.A_workBg + '</span>  </p><p>  <span>曾任职：' + value.A_depart + '</span> </p><p><span>擅长领域：' + value.A_lingYuDetail + '</span></p> <div class="information"><p><img src="../image/location.png">' + value.A_city + ' </p> <p><img src="../image/mode.png">' + mode + '</p>  <p><img src="../image/see.png">' + value.A_browses + '</p><p> <img src="../image/complete.png">' + value.A_volume + '</p>   </div> </div>   </div>'
        }
    };
    window.viewDetails = {
        'click #singleDetails': function(e, value, row, index) {
            window.open("http://www.eqidd.com/changke/index_start.html?userGuid=" + row.userGuid + "&piece=1");
        }
    };
    // /////////////////////////////////////////////////////////////////////////////////////////////////
    // 根据类别搜索咨询师
    function searchAdvisory(page, para, fieldSort, field, industry, area, sex, mode, isAuthen, workBg, jobOld, m1, m2, a1, a2) {
        // 搜索函数
        $('.searchArea').hide()
        $('.typeArea').show()
        $.post('' + http_head + '/Advisers/getAdvistersBySearch.ashx', {
            "page": page,
            "A_industry": industry,
            "A_location": area,
            "A_lingYu": fieldSort,
            "A_lingYuDetail": field,
            "A_mode": mode,
            "sex": sex,
            "isAuthen": isAuthen,
            "ageMin": a1,
            "ageMax": a2,
            "costMin": m1,
            "costMax": m2,
            "A_workBg": workBg,
            "A_depart": jobOld,
            "name": para
        }, function(data) {
            var datasearchAdvisory = JSON.parse(data)
			if(datasearchAdvisory.status==200){
				console.log("first",datasearchAdvisory)
				advisoryTable(datasearchAdvisory.items);
				$('#advisoryTable').bootstrapTable("load",datasearchAdvisory.items);
				if (datasearchAdvisory.items.length > 0) {
				    layer.msg('搜索成功', {
				        time: 1000,
				    });
				} else {
				    layer.msg('暂无搜索结果', {
				        time: 1000,
				    });
				}
				pageType = datasearchAdvisory.page;
				if (datasearchAdvisory.items.length >= 10) {
				    $('.nextpageBtn').show()
				} else {
				    $('.nextpageBtn').hide()
				}
			}
            
        });
    };

    function searchAdvisoryNext(page, para, fieldSort, field, industry, area, sex, mode, isAuthen, workBg, jobOld, m1, m2, a1, a2) {
        // 搜索函数
        $('.searchArea').hide()
        $('.typeArea').show()
        $.post('' + http_head + '/Advisers/getAdvistersBySearch.ashx', {
            "page": page,
            "A_industry": industry,
            "A_location": area,
            "A_lingYu": fieldSort,
            "A_lingYuDetail": field,
            "A_mode": mode,
            "sex": sex,
            "isAuthen": isAuthen,
            "ageMin": a1,
            "ageMax": a2,
            "costMin": m1,
            "costMax": m2,
            "A_workBg": workBg,
            "A_depart": jobOld,
            "name": para
        }, function(data) {
            var datasearchAdvisory = JSON.parse(data);
			if(datasearchAdvisory.status==200){
				console.log("next",datasearchAdvisory)
				if (datasearchAdvisory.items.length > 0) {
				    layer.msg('搜索成功', {
				        time: 1000,
				    });
				   
				} else {
				    layer.msg('暂无搜索结果', {
				        time: 1000,
				    });
				}
				advisoryTable(datasearchAdvisory.items);
				$("#advisoryTable").bootstrapTable('append', datasearchAdvisory.items);
				pageType = datasearchAdvisory.page;
				if (datasearchAdvisory.items.length >= 10) {
				    $('.nextpageBtn').show()
				} else {
				    $('.nextpageBtn').hide()
				}
			}
            
        });
    };
    $('.nextpageBtn').click(function() {
        searchAdvisoryNext(pageType, para, fieldSort, field, industry, area, sex, mode, isAuthen, workBg, jobOld, m1, m2, a1, a2);
    });
    // //////////////////////////////////////////////////////////////////////////////
    //领域
    $.post('' + http_head + '/Option_AreasAnd.ashx', {
        "type": 51
    }, function(data) {
        for (var i = 0; i < data.length; i++) {
            // 领域分类
            $('#select1').append('<dd id="' + i + '"><a>' + data[i].product + '</a></dd>')
        }
        $("#select1 dd").eq(0).click(function() {
            $(this).addClass("selected").siblings().removeClass("selected");
            $("#selectA").remove();
            $('#secondType').hide()
            // 全部
            field = "";
            pageType = 0;
            searchAdvisory(pageType, para, fieldSort, field, industry, area, sex, mode, isAuthen, workBg, jobOld, m1, m2, a1, a2);
        })
        $("#select1 dd:gt(0)").click(function() {
            $('#secondType').show()
            $(this).addClass("selected").siblings().removeClass("selected");
            $('#select1Min dd').remove()
            for (var j = 0; j < data[$(this).attr('id')].child.length; j++) {
                // items项
                $('#select1Min').append('<dd><a>' + data[$(this).attr('id')].child[j].product + '</a></dd>')
            }
            $("#select1Min dd").click(function() {
                var index = $(this).index();
                field = $(this).text().trim();
                pageType = 0;
                searchAdvisory(pageType, para, fieldSort, field, industry, area, sex, mode, isAuthen, workBg, jobOld, m1, m2, a1, a2);
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
    //////////////////////////////////////////////////////////////////////////
    // 地址
    var chinaObj = JSON.parse(chinaArea);
    //获取所有省份的数组
    var province = chinaObj.china.province;
    // 城市变量
    var cities;
    for (var i = 0; i < province.length; i++) {
        // 循环显示省份
        $("#select2").append("<dd><a value='" + province[i]["-code"] + "'>" + province[i]["-name"] + "</a></dd>")
    };
    $("#select2 dd").on("click", function() {
        var index = $(this).index();
        if (index == 1) {
        	$("#city").replaceWith("<dl id='city'></dl>");
        	area = "";
        	if ($('#inputSearch').val().length != 0) {
        		para = $('#inputSearch').val()
        	}
        } else {
        	// $("#city").replaceWith("<dl id='city'><dt>市区：</dt></dl>");
        	area = $(this).text().trim()
        }
        $(this).addClass("selected").siblings().removeClass("selected");
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
        pageType = 0;
		searchAdvisory(pageType, para, fieldSort, field, industry, area, sex, mode, isAuthen, workBg, jobOld, m1, m2, a1, a2);
        // 每次点击省清空城市列表
        // $("#selectB").remove();
        // for (var i = 0; i < province.length; i++) {
        //     if (province[i]["-code"] == $(this).children("a").attr("value")) {
        //         cities = province[i].city;
        //         for (var j = 0; j < cities.length; j++) {
        //             // 循环显示城市
        //             if (i == 0 || i == 1 || i == 8 || i == 21) {
        //                 var county = cities[j].county;
        //                 for (var n = 0; n < county.length; n++) {
        //                     $("#city").append("<dd><a >" + county[n]["-name"] + "</a></dd>")
        //                 }
        //             } else if (i != 0 & i != 1 & i != 8 & i != 21) {
        //                 $("#city").append("<dd><a >" + cities[j]["-name"] + "</a></dd>")
        //             }
        //         }
        //     }
        // }
        // $("#city dd").on("click", function() {
        //     // 城市点击事件
        //     // 搜索						
        //     area = $(this).text().trim();
        //     pageType = 0;
        //     searchAdvisory(pageType, para, fieldSort, field, industry, area, sex, mode, isAuthen, workBg, jobOld, m1, m2, a1, a2);
        //     $(this).addClass("selected").siblings().removeClass("selected");
        //     // 复制标签
        //     var copyThisB = $(this).clone();
        //     if ($("#selectB").length > 0) {
        //         // 填充标签
        //         $("#selectB a").html($(this).text());
        //     } else {
        //         $(".select-result dl").append(copyThisB.attr("id", "selectB"));
        //     }
        // })
    });
    //行业
    var industryList = ["机械设备、通用零部件", "旅游、餐饮、住宿、娱乐、休闲、购物", "生活服务", "纺织 皮革 服装 鞋帽", "家具 生活用品 食品", "通信 邮政 计算机 网络", "医疗保健 社会福利", "电子电器 仪器仪表", "金融 保险 证券 投资", "交通物流 运输设备", "城建 房产 建材 装潢", "石油/化工/煤炭/橡胶塑料", "钟表眼镜/工艺品/礼品", "造纸/纸品/印刷/包装", "新闻/出版/科研/教育", "农/林/牧/渔", "广告/会展/商务办公 咨询培训业", "冶金冶炼/金属及非金属制品", "贸易/批发/市场","党政机关/社会团体/非盈利机构"];
    for (var i = 0; i < industryList.length; i++) {
        $("#select9 ").append("<dd><a >" + industryList[i] + "</a></dd>")
    };
    $("#select9 dd").on("click", function() {
		var index = $(this).index();
		if(index==1){
			industry = "";
		}else{
			industry = $(this).text().trim();
		}
   
        searchAdvisory(pageType, para, fieldSort, field, industry, area, sex, mode, isAuthen, workBg, jobOld, m1, m2, a1, a2);
        $(this).addClass("selected").siblings().removeClass("selected");
        if ($(this).hasClass("select-all")) {
            $("#selectI").remove();
        } else {
            var copyThisI = $(this).clone();
            if ($("#selectI").length > 0) {
                $("#selectI a").html($(this).text());
            } else {
                $(".select-result dl").append(copyThisI.attr("id", "selectI"));
            }
        }
    });
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // 咨询模式
    var modeArr = [1, 2];
    $("#select10 dd").on("click", function() {
        var index = $(this).index();
        pageType = 0;
        if (index >= 2) {
            mode = modeArr[index - 2];
            searchAdvisory(pageType, para, fieldSort, field, industry, area, sex, mode, isAuthen, workBg, jobOld, m1, m2, a1, a2);
        } else {
            mode = 0;
            searchAdvisory(pageType, para, fieldSort, field, industry, area, sex, mode, isAuthen, workBg, jobOld, m1, m2, a1, a2);
        }
        $(this).addClass("selected").siblings().removeClass("selected");
        if ($(this).hasClass("select-all")) {
            $("#selectK").remove();
        } else {
            var copyThisK = $(this).clone();
            if ($("#selectK").length > 0) {
                $("#selectK a").html($(this).text());
            } else {
                $(".select-result dl").append(copyThisK.attr("id", "selectK"));
            }
        }
    });
    //////////////////////////////////////////////////////////////////////////////////////////////
    // 师资费
    var statusList = ["0.5K以下", "0.5K-1K", "1K-1.5K", "1.5K-2K", "2K-3K", "3K-4K", "4K-5K", "5K-6K", "6K-7K", "7K-8K", "8K-10K", "10K-12K", "12K-15K", "15K-20K", "20K-30K", "30K-50K", "50K以上"];
    var moneyList = ["0-500", "500-1000", "1000-1500", "1500-2000", "2000-3000", "3000-4000", "4000-5000", "5000-6000", "6000-7000", "7000-8000", "8000-10000", "10000-12000", "12000-15000", "15000-20000", "20000-30000", "30000-50000", "50000-1000000"];
    for (var i = 0; i < statusList.length; i++) {
        $("#select3 ").append("<dd><a >" + statusList[i] + "</a></dd>")
    };
    $("#select3 dd").click(function() {
        var index = $(this).index();
        if (index >= 2) {
            var moneystr = moneyList[index - 3];
            m1 = moneystr.split("-")[0];
            m2 = moneystr.split("-")[1];
        } else {
            m1 = 0;
            m2 = 50001;          
        }
		pageType = 0;     
		searchAdvisory(pageType, para, fieldSort, field, industry, area, sex, mode, isAuthen, workBg, jobOld, m1, m2, a1, a2);
        $(this).addClass("selected").siblings().removeClass("selected");
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
    ////////////////////////////////////////////////////////////////////////
    // 性别
    $("#select4 dd").on("click", function() {
        var index = $(this).index();
        pageType = 0;
        if (index == 1) {
            sex = -1;
        } else if(index==2) {
            sex = 0;
        }else if(index==3){
			sex = 1
		}
        searchAdvisory(pageType, para, fieldSort, field, industry, area, sex, mode, isAuthen, workBg, jobOld, m1, m2, a1, a2);
        $(this).addClass("selected").siblings().removeClass("selected");
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
    // 已选条件
    $(document).on("click", "#selectA", function() {
        $(this).remove();
        $('#secondType').hide();
        $("#select1 .select-all").addClass("selected").siblings().removeClass("selected");
        $("#select1Min dd").addClass("selected").siblings().removeClass("selected");
        field = "";
        pageType = 0;
        searchAdvisory(pageType, para, fieldSort, field, industry, area, sex, mode, isAuthen, workBg, jobOld, m1, m2, a1, a2);
    });
    $(document).on("click", "#selectB", function() {
        $(this).remove();
        $("#city").replaceWith("<dl id='city'></dl>");
        $("#select2 .select-all").addClass("selected").siblings().removeClass("selected");
        $("#city dd").removeClass("selected")
        area = "";
        pageType = 0;
        searchAdvisory(pageType, para, fieldSort, field, industry, area, sex, mode, isAuthen, workBg, jobOld, m1, m2, a1, a2);
    });
    $(document).on("click", "#selectC", function() {
        $(this).remove();
        $("#select3 .select-all").addClass("selected").siblings().removeClass("selected");
        m1 = 0,
            m2 = 1000000;
        pageType = 0;
        searchAdvisory(pageType, para, fieldSort, field, industry, area, sex, mode, isAuthen, workBg, jobOld, m1, m2, a1, a2);
    });
    $(document).on("click", "#selectD", function() {
        $(this).remove();
        $("#select4 .select-all").addClass("selected").siblings().removeClass("selected");
        sex = "";
        pageType = 0;
        searchAdvisory(pageType, para, fieldSort, field, industry, area, sex, mode, isAuthen, workBg, jobOld, m1, m2, a1, a2);
    });
    $(document).on("click", "#selectE", function() {
        $(this).remove();
        $("#select5 .select-all").addClass("selected").siblings().removeClass("selected");
        a1 = 0,
            a2 = 200;
        pageType = 0
        searchAdvisory(pageType, para, fieldSort, field, industry, area, sex, mode, isAuthen, workBg, jobOld, m1, m2, a1, a2);
    });
    $(document).on("click", "#selectF", function() {
        $(this).remove();
        $("#select6 .select-all").addClass("selected").siblings().removeClass("selected");
        workBg = "";
        pageType = 0;
        searchAdvisory(pageType, para, fieldSort, field, industry, area, sex, mode, isAuthen, workBg, jobOld, m1, m2, a1, a2);
    });
    $(document).on("click", "#selectG", function() {
        $(this).remove();
        $("#select7 .select-all").addClass("selected").siblings().removeClass("selected");
        jobOld = "";
        pageType = 0;
        searchAdvisory(pageType, para, fieldSort, field, industry, area, sex, mode, isAuthen, workBg, jobOld, m1, m2, a1, a2);
    });
    $(document).on("click", "#selectH", function() {
        $(this).remove();
        $("#select8 .select-all").addClass("selected").siblings().removeClass("selected");
        isAuthen = -1;
        pageType = 0;
        searchAdvisory(pageType, para, fieldSort, field, industry, area, sex, mode, isAuthen, workBg, jobOld, m1, m2, a1, a2);
    });
    $(document).on("click", "#selectI", function() {
        $(this).remove();
        $("#select9 .select-all").addClass("selected").siblings().removeClass("selected");
        industry = "";
        pageType = 0;
        searchAdvisory(pageType, para, fieldSort, field, industry, area, sex, mode, isAuthen, workBg, jobOld, m1, m2, a1, a2);
    });
    $(document).on("click", "#selectK", function() {
        $(this).remove();
        $("#select10 .select-all").addClass("selected").siblings().removeClass("selected");
        mode = "";
        pageType = 0;
        searchAdvisory(pageType, para, fieldSort, field, industry, area, sex, mode, isAuthen, workBg, jobOld, m1, m2, a1, a2);
    });
    $(document).on("click", ".select dd", function() {
        if ($(".select-result dd").length > 1) {
            $(".select-no").hide();
        } else {
            $(".select-no").show();
        }
    });
    // 年龄
    var ageList = ["20以下", "20-25", "25-30", "30-35", "35-40", "40-50", "50-60"];
    var ageList2 = ["0-20", "20-25", "25-30", "30-35", "35-40", "40-50", "50-60"];
    for (var i = 0; i < ageList.length; i++) {
        $("#select5 ").append("<dd><a >" + ageList[i] + "</a></dd>")
    };
    $("#select5 dd").click(function() {
        var index = $(this).index();
        pageType = 0;
        if (index >= 2) {
            var agestr = ageList2[index - 2];
            a1 = agestr.split("-")[0];
            a2 = agestr.split("-")[1];
        } else {
            a1 = 0;
            a2 = 200;
        }
        searchAdvisory(pageType, para, fieldSort, field, industry, area, sex, mode, isAuthen, workBg, jobOld, m1, m2, a1, a2);
        $(this).addClass("selected").siblings().removeClass("selected");
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
    //////////////////////////////////////////////////////////////////////////////////////////
    // 工作背景
    var jobList = ["世界500强", "中国500强", "大型国企", "大型民企", "知名日韩企业", "港澳台企业", "欧美外企", "其他"];
    for (var i = 0; i < jobList.length; i++) {
        $("#select6 ").append("<dd><a >" + jobList[i] + "</a></dd>")
    };
    $("#select6 dd").click(function() {
        pageType = 0;
        var index = $(this).index();
        if (index >= 2) {
            workBg = $(this).text().trim();
        } else {
            workBg = '';
        }
		console.log(workBg)
        searchAdvisory(pageType, para, fieldSort, field, industry, area, sex, mode, isAuthen, workBg, jobOld, m1, m2, a1, a2);
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
    // 曾担任职位
    var jobOldList = ["总经理", "副总", "总监", "部门经理/主管", "高级工程师", "一般管理人员", "其他"];
    for (var i = 0; i < jobOldList.length; i++) {
        $("#select7").append("<dd><a >" + jobOldList[i] + "</a></dd>")
    };
    $("#select7 dd").click(function() {
        var index = $(this).index();
        pageType = 0;
        if (index >= 2) {
            jobOld = $(this).text().trim();
        } else {
            jobOld = '';
        }
        searchAdvisory(pageType, para, fieldSort, field, industry, area, sex, mode, isAuthen, workBg, jobOld, m1, m2, a1, a2);
        $(this).addClass("selected").siblings().removeClass("selected");
        if ($(this).hasClass("select-all")) {
            $("#selectG").remove();
        } else {
            var copyThisG = $(this).clone();
            if ($("#selectG").length > 0) {
                $("#selectG a").html($(this).text());
            } else {
                $(".select-result dl").append(copyThisG.attr("id", "selectG"));
            }
        }
    });
    //////////////////////////////////////////////////////////////////////////////////////////
    // 实名认证
    $("#select8 dd").click(function() {
        var index = $(this).index();
        pageType = 0;
        if (index == 1) {
            isAuthen = 1;
        } else if(index == 2) {
            isAuthen = 1;
        } else if(index == 3){
			isAuthen = 0
		}
        searchAdvisory(pageType, para, fieldSort, field, industry, area, sex, mode, isAuthen, workBg, jobOld, m1, m2, a1, a2);
        $(this).addClass("selected").siblings().removeClass("selected");
        if ($(this).hasClass("select-all")) {
            $("#selectH").remove();
        } else {
            var copyThisH = $(this).clone();
            if ($("#selectH").length > 0) {
                $("#selectH a").html($(this).text());
            } else {
                $(".select-result dl").append(copyThisH.attr("id", "selectH"));
            }
        }
    });
    //////////////////////////////////////////////////////////////////////////////////////////
    // 搜索框
    $('#searchBtn').click(function() {
        if ($('#inputSearch').val().length == 0) {
            layer.msg('搜索关键字不能为空', {
                time: 1000,
            });
        } else {
            para2 = $('#inputSearch').val();
            pageType = 0;
            searchAdvisory(pageType, para2, fieldSort, field, industry, area, sex, mode, isAuthen, workBg, jobOld, m1, m2, a1, a2);
        }
    });
    $('#inputSearch').keydown(function(event) {
        if (event.keyCode === 13) {
            if ($('#inputSearch').val().length == 0) {
                layer.msg('搜索关键字不能为空', {
                    time: 1000,
                });
            } else {
                para2 = $('#inputSearch').val();
                pageType = 0;
                searchAdvisory(pageType, para2, fieldSort, field, industry, area, sex, mode, isAuthen, workBg, jobOld, m1, m2, a1, a2);
            }
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
	        } else if ($('#selectType').val() == "3") {
	            window.open("./lookDemandList.html?demandName=" + $('#inputSearch').val() + "")
	        } else if ($('#selectType').val() == "4") {
	            window.open("http://www.eqidd.com/yqy/search.html?searchKey=" + $('#inputSearch').val() + "")
	        } else if ($('#selectType').val() == "5") {
	            window.open("./lookActivity.html?activityName=" + $('#inputSearch').val() + "")
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
	            } else if ($('#selectType').val() == "3") {
	                window.open("./lookDemandList.html?demandName=" + $('#inputSearch').val() + "")
	            } else if ($('#selectType').val() == "4") {
	                 window.open("http://www.eqidd.com/yqy/search.html?searchKey=" + $('#inputSearch').val() + "")
	            } else if ($('#selectType').val() == "5") {
	                window.open("./lookActivity.html?activityName=" + $('#inputSearch').val() + "")
	            } else if($('#selectType').val() == "6"){
					window.open("./organization.html?orgName=" + $('#inputSearch').val() + "")
				}else if($('#selectType').val() == "7"){
					window.open("./lookCourseList.html?couName=" + $('#inputSearch').val() + "")
				}
	        }
	    }
	});
	var schUrlPara;
	if (href.indexOf("?") > 0 && href.indexOf("advName") > 0) {
		schUrlPara = decodeURI(href.split("=")[1], "UTF-8");
		searchAdvisory(pageType, schUrlPara, fieldSort, field, industry, area, sex, mode, isAuthen, workBg, jobOld, m1, m2, a1, a2);
	};
    // 推荐讲师
    setTimeout(function() {
        tuijainTeacher()
    }, 200);
    // 推荐讲师滚动
    var $this2 = $("#tuijianTeacherDiv");
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

    function tuijainTeacher() {
        $.post('' + http_head + '/Admin/Home/advisers_get.ashx', {
            type: 0
        }, function(data) {
            var dataTuijain = JSON.parse(data);
			console.log("tj",dataTuijain)
            var imgURLmin;
            var array_label = [];
            var str_label = '';
            for (var itemValue of dataTuijain.items) {
                if(itemValue.userImage){
                    imgURLmin = itemValue.userImage.replace(/.png/, "min.png")
                }else{
                    imgURLmin = "../image/touxiang.png"
                };             
               
           
                str = '<li class="clearfix" id="' + itemValue.lectureGuid + '" alt="' + itemValue.userName + '"><img class="lazytj" data-original="' + imgURLmin + '" alt="" class="pull-left"><div class="pull-left"><p class="lectureName">' + itemValue.userName + '</p><p class="lectureLabel">' + itemValue.A_lingYu + '</p></div></li>';
                $('#tuijianTeacher').append(str);
            };
            $("img.lazytj").lazyload({
                effect:"fadeIn",      
            });
            $('#tuijianTeacher li').click(function() {
                var this_guid = $(this).attr("id");
                window.open("http://www.eqidd.com/changke/index_start.html?userGuid=" + this_guid + "&piece=1");
            });
        })
    };
   
    // 活跃讲师
    setTimeout(function() {
        activeTeacher()
    }, 200);
    // 活跃讲师滚动
    var $this4 = $("#activeTeacherDiv");
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

    function activeTeacher() {
        $.post('' + http_head + '/Makerspacey/MakerArticle/Get_ActiveMaker.ashx', {
            page: 0
        }, function(data) {
            var dataTuijain = JSON.parse(data);
            var imgURLmin;
            var array_label = [];
            var str_label = '';
            for (var itemValue of dataTuijain.items) {

                if(itemValue.headimage){
                    imgURLmin = itemValue.headimage
                }else{
                    imgURLmin = "../image/touxiang.png"
                };  
                str_label = itemValue.ResearchField.split(",")
                for (var i = 0; i < str_label.length; i++) {
                    array_label.push('《<span class="">' + str_label[i] + '</span>》')
                };
                str = '<li class="clearfix" id="' + itemValue.userGuid + '" alt="' + itemValue.realname + '"><img class="lazyac" data-original="' + imgURLmin + '" alt="" class="pull-left"><div class="pull-left"><p class="lectureName">' + itemValue.realname + '</p><p class="lectureLabel">' + array_label + '</p></div></li>';
                $('#activeTeacher').append(str);
            };
            $("img.lazyac").lazyload({
                event:"scroll",
                effect:"fadeIn",
                threshold:180
            });
            $('#activeTeacher li').click(function() {
                var this_guid = $(this).attr("id");
                window.open("http://www.eqidd.com/changke/index_start.html?userGuid=" + this_guid + "&piece=1");
            });
        })
    };
    var flag = 0;
    $("#showMore").on("click", function() {
        if (flag == 0) {
            $("#pick").animate({
                height: "200px"
            }, "slow", "swing", function() {
                $("#showMore a").text("收起>>")
            }).show();
            flag = 1;
        } else {
            $("#pick").animate({
                height: 0
            }, "slow", "swing", function() {
                $("#showMore a").text("更多选项>>")
            });
            flag = 0
        }
    });
    $(".promotion").on("click", function() {
        window.open("http://www.eqidd.com/tuiguang.html")
    });
})