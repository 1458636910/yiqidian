$(document).ready(function() {
    var href = location.href;
    var hrefDetails = decodeURIComponent(href);
    var s = href.indexOf("=");
    if (s >= 0) {
        var videoDetails = hrefDetails.split("=")[1];
        var videoLabel = hrefDetails.split("=")[0];
        var labelVideo = videoLabel.split("?")[1];
        if (labelVideo == "label") {
            accordingLabel(0, videoDetails);
        } else {
            $('#inputSearch').val(videoDetails);
            loadVideo();
        }
    } else {
        loadVideos(0);
    }
    var dataC = localStorage.getItem("GHY_login");
    if (dataC != null) {
        $('.infoBtn').show();
        $('.loginBtn').hide();
        $('.quitOut').show();
        var dataInfo = JSON.parse(dataC);
        $('.loginName').text(dataInfo.username);
        $('.regBtn').hide();
    } else {
        $('.loginBtn').show();
        $('.regBtn').show();
        $('.infoBtn').hide();
        $('.quitOut').hide();
    }
    //登陆退出
    var href = location.href;
    var dataC = localStorage.getItem("GHY_login");
    if (dataC != null) {
        var dataInfo = JSON.parse(dataC);
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
        $('#loginBtn').click(function() {
            location.href = "./innerLogin.html?href=" + href + "";
        }).text("登录");
        $("#regBtn").on("click", function() {
            location.href = "http://www.eqidd.com/html/reg.html?href=" + href + "";
        }).text("注册")
    }
    // 加载尾部
    setTimeout(function() {
        $('#footer').load("../html/footer.html");
    }, 500);
    // 加载文章分类
    $.post('' + http_head + '/Option_AreasAnd.ashx', {
        "type": 45
    }, function(data) {
        if ($('.listLeft p').size() == 1) {
            for (var i = 0; i < data.length; i++) {
                $('.spanList').append('<span id="' + i + '">' + data[i].name + '</span>')
            }
            $('.spanList span').hover(function() {
                var innerId = $(this).attr('id')
                $('.innerspanList').remove()
                $(this).append('<div class="innerspanList"></div>');
                for (var j = 0; j < data[innerId].sub.length; j++) {
                    $('.innerspanList').append('<span>' + data[innerId].sub[j].name + '</span>')
                }
                $('.innerspanList span').click(function() {
                    accordingLabel(0, $(this).text())
                });
                $(this).css('backgroundColor', '#29e').siblings('span').css('backgroundColor', '#fff');
            }, function() {
                $(this).css('backgroundColor', '#fff');
                $('.innerspanList').remove()
            });
        } else {}
    });
    var dataFouce, newPage;

    function loadVideos(page) {
        $.post('' + http_head + '/Articles/Get_Article_ByLecture.ashx', {
            "page": page,
        }, function(data) {
            dataFouce = JSON.parse(data);
            newPage = dataFouce.items.page
            if (newPage <= 1) {
                $('.loadMorePrve').hide()
                if (dataFouce.items.rows.length > 9) {
                    $('.loadMoreNext').show()
                } else {
                    $('.loadMorePrve').hide()
                    $('.loadMoreNext').hide()
                }
            } else {
                if (dataFouce.items.rows.length > 9) {
                    $('.loadMoreNext').show()
                    $('.loadMorePrve').show()
                } else {
                    $('.loadMoreNext').hide()
                    $('.loadMorePrve').show()
                }
            }
            loadTabel(dataFouce.items.rows)
        });
    }
    $('.loadMoreNext').click(function() {
        loadVideos(newPage)
    });
    $('.loadMorePrve').click(function() {
        loadVideos(Number(newPage) - 2)
    });

    function loadTabel(data) {
        $('#videoListTable').bootstrapTable({
            url: data,
            columns: [{
                field: 'videoImage',
                align: 'center',
                valign: 'middle',
                formatter: imgFormatter,
                events: contentDetailsEvents
            }, {
                field: 'videoTitle',
                align: 'left',
                valign: 'middle',
                formatter: labelFormatter,
                events: contentEvents
            }]
        });
        $("#videoListTable").bootstrapTable('load', data);

        function imgFormatter(e, value, row, index) {
            return ['<img src="' + value.image + '"/ alt="暂无封面">'].join('');
        };

        function labelFormatter(e, value, row, index) {
            var arr_area = [];
            var str = "";
            str = (value.lable).split(",");
            if ((value.content).length >= 60) {
                var content = (value.content).substring(0, 60)
            } else {
                content = value.content
            }
            for (var i = 0; i < str.length; i++) {
                arr_area.push('<span class="researchField">《' + str[i] + '》</span>')
            }
            for (var i = 0; i < arr_area.length; i++) {
                return ['<p class="titleArea"><span></span><span class="circleTitle" title="查看文章详情">' + value.title + '</span></p>', '<div class="writerInfo clearfix"><img src="' + value.iphoto + '" alt="" / class="pull-left"><p class="pull-left">' + value.upname + '</p><br /><p class="pull-left">' + value.createTime.split("T")[0] + '</p></div>', '<p class="circleType"><span></span>',
                    arr_area, '</p>', '<p><span></span><span class="circleContent">' + content + '</span><small><span class="circleContentBtn" title="查看文章详情">更多</span></small></p>', '<div class="clearfix">', '<p class="formWhere pull-left" id="' + value.userGuid + '"><span>来自 : </span><span class="formChuang">创客空间</span></p>', '<p class="circleOther pull-left"><a >' + value.browseCount + ' 阅读 </a><a>' + value.commentCount + ' 评论 </a><a>' + value.zanCount + ' 喜欢</a></p>', '</div>'
                ].join('');
            }
        };
        $('.circleType span').click(function() {
            accordingLabel(0, $(this).text())
        });
    }
    window.contentDetailsEvents = {
        'click img': function(e, value, row, index) {
            window.open("../../createrSpace/html/circleDetails.html?id=" + row.Id + "")
        }
    }
    window.contentEvents = {
        // 查看文章详情
        'click .circleContentBtn': function(e, value, row, index) {
            window.open("../../createrSpace/html/circleDetails.html?id=" + row.Id + "")
        },
        'click .circleTitle': function(e, value, row, index) {
            window.open("../../createrSpace/html/circleDetails.html?id=" + row.Id + "")
        },
        'click .formChuang': function(e, value, row, index) {
            sessionStorage.removeItem("GHY_makerGuid");
            sessionStorage.setItem("GHY_makerGuid", row.userGuid);
            window.open("../../createrSpace/html/visitCreaterInfo.html?guid==" + row.userGuid + "&&name=" + row.upname + "&app=易企点")
        },
        'click .writerInfo': function(e, value, row, index) {
            sessionStorage.removeItem("GHY_makerGuid");
            sessionStorage.setItem("GHY_makerGuid", row.userGuid);
            window.open("../../createrSpace/html/visitCreaterInfo.html?guid==" + row.userGuid + "&&name=" + row.upname + "&app=易企点")
        },
    }
    // 搜索文章
    $('#inputSearch').keydown(function(event) {
        if (event.keyCode === 13) {
            if ($('#inputSearch').val().length == 0) {
                layer.msg('搜索关键字不能为空', {
                    time: 1000,
                });
            } else {
                loadVideo()
            }
        } else {}
    });
    $('#searchBtn').click(function() {
        if ($('#inputSearch').val().length == 0) {
            layer.msg('搜索关键字不能为空', {
                time: 1000,
            });
        } else {
            loadVideo()
        }
    });
    var searchPage;

    function loadVideo(page) {
        $.post('' + http_head + '/Articles/Get_Article_BySearch.ashx', {
            "page": page,
            "para": $('#inputSearch').val(),
            "type": "html",
        }, function(data) {
            var dataReault = JSON.parse(data)
            searchPage = dataReault.items.page
            loadTabel(dataReault.items.rows)
            if (searchPage <= 1) {
                $('.loadMoreSearchPrve').hide()
                if (dataReault.items.rows.length > 9) {
                    $('.loadMoreSearchNext').show()
                } else {
                    $('.loadMoreSearchPrve').hide()
                    $('.loadMoreSearchNext').hide()
                }
            } else {
                if (dataReault.items.rows.length > 9) {
                    $('.loadMoreSearchNext').show()
                    $('.loadMoreSearchPrve').show()
                } else {
                    $('.loadMoreSearchNext').hide()
                    $('.loadMoreSearchPrve').show()
                }
            }
        });
    }
    $('.loadMoreSearchNext').click(function() {
        loadVideo(searchPage)
    });
    $('.loadMoreSearchPrve').click(function() {
        loadVideo(Number(searchPage) - 2)
    });
    var labelPage;

    function accordingLabel(page, field) {
        $.post('' + http_head + '/Articles/Get_Article_ByLable.ashx', {
            "page": page,
            "lable": field
        }, function(data) {
            var dataLabelteacher = JSON.parse(data);
            labelPage = dataLabelteacher.items.page;
            if (dataLabelteacher.status == 200) {
                if (dataLabelteacher.items.rows.length > 0) {
                    layer.msg(dataLabelteacher.msg, {
                        time: 500,
                    });
                    loadTabel(dataLabelteacher.items.rows)
                } else {
                    layer.msg('暂无搜索结果,为你加载最新文章', {
                        time: 1500,
                    });
                    $("#videoListTable").bootstrapTable('removeAll');
                    loadVideos(0)
                }
            }
            if (labelPage <= 1) {
                $('.loadMoreLabelPrve').hide()
                if (dataLabelteacher.items.rows.length > 9) {
                    $('.loadMoreLabelNext').show()
                } else {
                    $('.loadMoreLabelPrve').hide()
                    $('.loadMoreLabelNext').hide()
                }
            } else {
                if (dataLabelteacher.items.rows.length > 9) {
                    $('.loadMoreLabelNext').show()
                    $('.loadMoreLabelPrve').show()
                } else {
                    $('.loadMoreLabelNext').hide()
                    $('.loadMoreLabelPrve').show()
                }
            }
        });
    }
})