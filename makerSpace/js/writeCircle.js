$(document).ready(function() {
    var userGuid = location.href.split("%")[1].split("&")[0].split("=")[1];
    var companyId = location.href.split("%")[1].split("&")[1].split("=")[1];
    var sourse = location.href.split("%")[0].split("=")[1];
    var hrefStr = location.href.split("?")[1];
    var http_head = "http://47.94.173.253:8008";
    var Wheight = $(window).height();
    var tId, parentID, firstId, dataTitle, dataCircleDetails, str_circle;
    var isDraft = true;
    // 回收站
    $(".gorec").on("click",function(){
       window.open("recycle.html?"+hrefStr)
    });
    // 加载菜单目录
    function loadList() {
        $.post('' + http_head + '/Articles/Get_ArticleMenu.ashx', {
            "userGuid": userGuid
        }, function(data) {
            var dataList = JSON.parse(data).items;
            if (dataList.length == 0) {
                $('.cover').show()
                layer.open({
                    type: 1,
                    area: '600px',
                    title: ['添加文章目录', 'font-size:18px;text-align: center;'],
                    content: $('.addTitle'),
                    btn: '确定',
                    shade: false
                });
                $('.layui-layer-btn0').click(function() {
                    $.post('' + http_head + '/Articles/Add_ArticleMenu.ashx', {
                        "userGuid": userGuid,
                        "menuName": $('.Title').val()
                    }, function(data) {
                        var addData = JSON.parse(data);
                        if (addData.status == 200) {
                            layer.msg('创建成功', {
                                time: 1000,
                            });
                            location.reload();
                        }
                    });
                });
                $('.layui-layer-close').css('display', 'none');
            }
            for (var i = 0; i < dataList.length; i++) {
                $('.list').append('<li id=' + dataList[i].Id + '><span>' + dataList[i].articleName + '</span><span class="glyphicon glyphicon-remove " title="删除文章目录及其文章"></span><span class="glyphicon glyphicon-pencil " title="修改文章目录"></span></li>')
            }
            $('.list li').click(function() {
                $(this).addClass('active').siblings('li').removeClass('active').children('span').hide()
                $(this).children('span').show().siblings('li').children('span').hide();
                tId = $(this).attr('id');
                editor.txt.clear()
                $('.circleT').val("");
                $('.choose').val("")
                str_title = ""
                $('.addCircleTitle').show()
                $('.circleTitle p').remove()
                $.post('' + http_head + '/Articles/Get_Article_ByMenu.ashx', {
                    "userGuid": userGuid,
                    "menuId": tId
                }, function(data) {
                    dataTitle = JSON.parse(data);
                    if (dataTitle.items.length == 0) {
                        document.getElementById("addCircle").click();
                    }
                    if ($('.mainCenter p').length == 0) {
                        for (var i = 0; i < dataTitle.items.length; i++) {
                            $('.circleTitle').append('<p id=' + dataTitle.items[i].id + '><strong>' + dataTitle.items[i].title + '</strong><span class="glyphicon glyphicon-remove " title="删除文章"></span></p>')
                        }
                        setTimeout(function() {
                            document.getElementsByTagName("p")[0].click();
                        }, 100);
                    }
                    $('.circleTitle p').hover(function() {
                        $(this).children('span').show()
                    }, function() {
                        $(this).children('span').hide();
                    });
                    // 获取文章内容
                    $('.circleTitle p').click(function() {
                        $(this).children('span').show();
                        $(this).addClass('active').siblings('p').removeClass('active');
                        thisId = $(this).attr('id')
                        editor.txt.clear()
                        var ghy = localStorage.getItem("EQDR_" + thisId + "");
                        $(".circleT").blur(function() {
                            $('.circleTitle #' + thisId + ' strong').text($('.circleT').val())
                        });
                        if (ghy == null) {
                            $.post('' + http_head + '/Articles/Get_Article_ById.ashx', {
                                "articleId": thisId,
                                "userGuid": userGuid
                            }, function(data) {
                                dataCircleDetails = JSON.parse(data);
                                editor.txt.html(dataCircleDetails.items.content)
                                $('.circleT').val(dataCircleDetails.items.title);
                                $('.choose').val(dataCircleDetails.items.Label);
                                // ********************************************文章题目实时修改**************************
                                isDraft = dataCircleDetails.items.isDraft;
                                var circleDet = {
                                    "label": dataCircleDetails.items.Label,
                                    "title": dataCircleDetails.items.title,
                                    "circle": dataCircleDetails.items.content,
                                    "isDraft": dataCircleDetails.items.isDraft
                                }
                                str_circle = JSON.stringify(circleDet);
                                localStorage.setItem("EQDR_" + thisId + "", str_circle);
                                ghy = localStorage.getItem("EQDR_" + thisId + "")
                                var ghh = JSON.parse(ghy)
                                $('.circleT').val(ghh.title)
                                editor.txt.html(ghh.circle)
                            });
                        } else {
                            var ghh = JSON.parse(ghy)
                            $('.circleT').val(ghh.title)
                            $('.choose').val(ghh.label)
                            editor.txt.html(ghh.circle)
                            $(".circleT").blur(function() {
                                $('.circleTitle #' + thisId + ' strong').text($('.circleT').val())
                            });
                        }
                    });
                    // 删除文章操作
                    $('.circleTitle .glyphicon-remove').click(function() {
                        parentID = $(this).parent("p").attr('id');
                        $('.cover').show();
                        layer.open({
                            type: 1,
                            area: '600px',
                            title: ['删除此文章', 'font-size:18px;text-align: center;'],
                            content: $('.delTitle2'),
                            btn: '确定',
                            shade: false
                        });
                        $('.layui-layer-close').click(function() {
                            $('.cover').hide()
                        });
                        $('.layui-layer-btn0').click(function() {
                            $('.cover').hide();
                            $.post('' + http_head + '/Articles/Delete_Article.ashx', {
                                "userGuid": userGuid,
                                "articleId": parentID
                            }, function(data) {
                                var dataSucced = JSON.parse(data);
                                if (dataSucced.status == 200) {
                                    document.getElementById(tId).click();
                                }
                            });
                        })
                    })
                });
            });
            $('.list li').hover(function() {
                $(this).children('span').show()
            }, function() {
                $(this).children('span').hide();
            });
            $('.list .glyphicon-remove').click(function() {
                var pID = $(this).parent("li").attr('id');
                $('.cover').show();
                layer.open({
                    type: 1,
                    area: '600px',
                    title: ['删除文章目录及其文章', 'font-size:18px;text-align: center;'],
                    content: $('.delTitle'),
                    btn: '确定',
                    shade: false
                });
                $('.layui-layer-close').click(function() {
                    $('.cover').hide()
                });
                $('.layui-layer-btn0').click(function() {
                    $('.cover').hide();
                    $.post('' + http_head + '/Articles/Delete_ArticleMenu.ashx', {
                        "userGuid": userGuid,
                        "articleMenuId": pID
                    }, function(data) {
                        $('#' + pID + '').css('display', 'none');
                        $('.circleTitle p').remove('')
                    });
                });
            });
            $('.list .glyphicon-pencil').click(function() {
                var pID2 = $(this).parent("li").attr('id');
                $('.cover').show();
                $('.newTitle').val($(this).siblings('strong').text())
                layer.open({
                    type: 1,
                    area: '600px',
                    title: ['修改文章目录', 'font-size:18px;text-align: center;'],
                    content: $('.changeTitle'),
                    btn: '确定',
                    shade: false
                });
                $('.layui-layer-close').click(function() {
                    $('.cover').hide()
                });
                $('.layui-layer-btn0').click(function() {
                    $('.cover').hide();
                    $.post('' + http_head + '/Articles/Update_ArticleMenu.ashx', {
                        "userGuid": userGuid,
                        "articleMenuId": pID2,
                        "articleMenuName": $('.newTitle').val()
                    }, function(data) {
                        $('.list #' + pID2 + ' strong').text($('.newTitle').val());
                        $('.newTitle').val("")
                    });
                });
            });
        });
    }
    loadList()
    // *****************************新增目录开始**************************************
    $('.addListBtn').click(function() {
        $('.addTable').toggle(500)
    });
    $('.sureBtn').click(function() {
        if ($('.addTable input').val().length > 0) {
            $.post('' + http_head + '/Articles/Add_ArticleMenu.ashx', {
                "userGuid": userGuid,
                "menuName": $('.addTable input').val()
            }, function(data) {
                var addData = JSON.parse(data);
                if (addData.status == 200) {
                    layer.msg('创建成功', {
                        time: 1000,
                    });
                    $('.addTable').css('display', 'none');
                    $('.addTable input').val("");
                    $('.list li').remove()
                    loadList()
                }
            });
        }
    });
    $('.cancleBtn').click(function() {
        $('.addTable input').val("");
        $('.addTable').css('display', 'none');
    });
    // *****************************新增目录结束**************************************
    // **********************富文本编辑开始*******************************************************
    var str_list = "";
    var arr_list = [];
    var imgUrl;
    var E = window.wangEditor;
    var editor = new E('#div1', '#div2');
    // **************************************自动更新文章开始*********************************
    editor.customConfig.onchange = function() {
        var html = editor.txt.html();
        var json = localStorage.getItem("EQDR_" + thisId + "", str_circle);
        var jsonData = JSON.parse(json);
        var circleDet = {
            "label": $('.choose').val(),
            "title": $('.circleT').val(),
            "circle": editor.txt.html(),
            "isDraft": jsonData == null ? true : jsonData.isDraft
        }
        str_circle = JSON.stringify(circleDet);
        localStorage.setItem("EQDR_" + thisId + "", str_circle);
    }
    // **************************************自动更新文章结束*********************************
    // **************************************自动上传图片开始*********************************
    var data2;
    editor.customConfig.customUploadImg = function(files, insert) {
        var Pformdata = new FormData();
        var imgU = files[0];
        Pformdata.append('image', imgU);
        $.ajax({
            type: 'post',
            url: '' + http_head + '/Articles/CommitImage.ashx',
            data: Pformdata,
            cache: false,
            processData: false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
            contentType: false, // 不设置Content-type请求头
            success: function(data) {
                data2 = JSON.parse(data)
                var imgSrc = (data2.items).substring(25)
                imgUrl = imgSrc
                insert(data2.items)
            }
        });
    };
    // **************************************自动上传图片结束*********************************
    editor.customConfig.zIndex = 100;
    editor.create();
    var WHeight = Wheight - 170;
    $('#div2').css('height', WHeight + 'px');
    $('.mainLeft').css('height', Wheight);
    $('.mainCenter').css('height', Wheight);
    // **************************************富文本编辑设置结束*********************************
    //********************文章分类开始************************************************
    var hangyeLabelDetails;
    $('.commonlyLabelBtn').click(function() {
        layer.open({
            type: 1,
            area: '700px',
            title: ['行业选择', 'font-size:18px;text-align: center;'],
            content: $('.hangyeLabel'),
            btn: '确定',
            shade: false
        });
        $.post('' + http_head + '/Option_AreasAnd.ashx', {
            "type": 44
        }, function(data) {
            $('.hangyeLabel span').remove()
            for (var i = 0; i < data.length; i++) {
                $('.hangyeLabel').append('<span><input type="checkbox" name="label" value="' + data[i].name + '">' + data[i].name + '</span>')
            }
            $("input:checkbox[name='label']").click(function() {
                if ($("input:checkbox[name='label']:checked").length > 3) {
                    layer.msg('最多选择3个', {
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
                hangyeLabelDetails = teaArea.substring(0, Number(teaArea.length) - 1)
                $('.choose').val(hangyeLabelDetails)
            });
        });
    });
    // *******************************************************
    var str_label2 = "";
    var arr_label2 = [];
    $('.lecturerLabelBtn').click(function() {
        $.post('' + http_head + '/Option_AreasAnd.ashx', {
            "type": 45
        }, function(data) {
            layer.open({
                type: 1,
                area: ['800px', '505px'],
                title: ['研究领域', 'font-size:18px;text-align: center;'],
                content: $('.teachAreaTable'),
                btn: '确定',
            });
            if ($('.tableLeft p').length == 0) {
                for (var i = 0; i < data.length; i++) {
                    $('.tableLeft').append('<p class="' + i + '">' + data[i].name + '</p>');
                    $('.tableLeft').children('p').eq(0).attr('id', 'firstP');
                    document.getElementById('firstP').click();
                    $('.tableLeft .' + i + '').click(function() {
                        $(this).css('backgroundColor', 'red').siblings('p').css('backgroundColor', '#29e');
                        var m = $(this).attr('class');
                        $('.tableRight span').remove();
                        for (var j = 0; j < data[m].sub.length; j++) {
                            $('.tableRight').append('<span><input type="checkbox" value="' + data[m].sub[j].name + '" name="label">' + data[m].sub[j].name + '</span>')
                        }
                        $("input:checkbox[name='label']").click(function() {
                            var aaa = $(this).prop("checked");
                            if (aaa === true) {
                                if (arr_label2.length > 4) {
                                    layer.msg('最多选择5个', {
                                        time: 1000,
                                    });
                                    $(this).removeAttr('checked')
                                    removeByValue(arr_label2, $(this).val());
                                } else {
                                    arr_label2.push($(this).val())
                                    $('#labelInfo').val(arr_label2)
                                }
                            } else {
                                removeByValue(arr_label2, $(this).val());
                                $('#labelInfo').val(arr_label2)
                            }
                        });
                    });
                }
            } else {}
            $('.layui-layer-btn0').click(function() {
                for (var i = 0; i < arr_label2.length; i++) {
                    str_label2 += arr_label2[i] + ","
                }
                var labelArea = str_label2.substring(0, Number(str_label2.length) - 1)
                $('.choose').val($('#labelInfo').val());
                arr_label2 = [];
                $('#labelInfo').val("");
                $("input:checkbox[name='label']").removeAttr('checked');
            });
            $('.layui-layer-close').click(function() {
                $("input:checkbox[name='label']").removeAttr('checked');
                arr_label2 = [];
                $('#labelInfo').val("");
            });
        })
    });
    // 删除类别操作
    function removeByValue(arr, val) {  
        for (var i = 0; i < arr.length; i++) {    
            if (arr[i] == val) {      
                arr.splice(i, 1);      
                break;    
            }  
        }
    }
    // ********************文章分类结束************************************************
    // ********************发表文章开始************************************************
    $('.circleSubmit').click(function() {
        var hhh = editor.txt.text();
        var yyy;
        if (editor.txt.text().length > 60) {
            yyy = hhh.substring(0, 60);
        } else {
            yyy = hhh
        }
        if (typeof(imgUrl) == "undefined") {
            var iUrl = " "
        } else {
            iUrl = imgUrl
        }
        if ($('.choose').val().length == 0) {
            var labelCircle = " "
        } else {
            labelCircle = $('.choose').val()
        }
        var dataR = JSON.parse(str_circle)
        if (dataR.isDraft == true) {
            $.post('' + http_head + '/Articles/Add_Article_ByDraft.ashx', {
                "menuId": tId,
                "userGuid": userGuid,
                "title": $('.circleT').val(),
                "homeImage": iUrl,
                "label": labelCircle,
                "source": sourse,
                "companyId": companyId,
                "content": editor.txt.html(),
                "textContent": yyy,
                "draftId": thisId
            }, function(data) {
                var dataCircle = JSON.parse(data);
                if (dataCircle.status == 200) {
                    var localdata = localStorage.getItem("EQDR_" + thisId + "");
                    var localdataJson = JSON.parse(localdata);
                    localdataJson.isDraft = false;
                    localdataJson = JSON.stringify(localdataJson)
                    localStorage.setItem("EQDR_" + thisId + "", localdataJson)
                    layer.msg('发表成功', {
                        time: 3000,
                        shade: 0.5
                    });
                    setTimeout(function() {
                        location.reload();
                    }, 3100)
                }
            });
        } else {
            $.post('' + http_head + '/Articles/Update_Article.ashx', {
                "userGuid": userGuid,
                "articleId": thisId,
                "articleTitle": $('.circleT').val(),
                "articleContent": editor.txt.html(),
                "textContent": yyy
            }, function(data) {
                var dataG = JSON.parse(data);
                if (dataG.status == 200) {
                    localStorage.removeItem("EQDR_" + thisId + "")
                    layer.msg('更新成功', {
                        time: 2000,
                        shade: 0.5
                    });
                    setTimeout(function() {
                        location.reload();
                    }, 2100)
                }
            });
        }
    });
    // ********************发表文章结束************************************************
    $("#line").click(function() {
        editor.cmd.do('insertHTML', '<p style="border-top :1px solid #d9d9d9; padding: 10px 10px 0px 10px "></p>')
    });
    // 新增文章开始**********************************************************
    $('.addCircleTitle button').click(function() {
        $.post('' + http_head + '/Articles/Add_Article_Draft.ashx', {
            "userGuid": userGuid,
            "title": '无标题文章',
            "content": ' ',
            "menuId": tId,
            "textContent": editor.txt.text()
        }, function(data) {
            document.getElementsByTagName("p")[0].click();
            $.post('' + http_head + '/Articles/Get_Article_ByMenu.ashx', {
                "userGuid": userGuid,
                "menuId": tId
            }, function(data) {
                var dataTitle = JSON.parse(data);
                document.getElementById(tId).click();
                document.getElementsByTagName("p")[0].click();
            })
        });
    });
    // 新增文章结束**********************************************************
    // 同步文章开始**********************************************************
    $('.synct').click(function() {
        $.post('' + http_head + '/Articles/Get_Article_ById.ashx', {
            "articleId": thisId,
            "userGuid": userGuid
        }, function(data) {
            var dataCircleDetails2 = JSON.parse(data);
            localStorage.removeItem("EQDR_" + thisId + "")
            editor.txt.html(dataCircleDetails2.items.content)
            $('.circleT').val(dataCircleDetails2.items.title);
            $('.choose').val(dataCircleDetails2.items.Label);
            $('.circleTitle #' + thisId + '').text(dataCircleDetails2.items.title);
        });
    });
    // 同步文章结束**********************************************************
})