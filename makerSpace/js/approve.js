$(document).ready(function() {
    var mySwiper = new Swiper('.swiper-container', {
        noSwiping: true,
        // 如果需要前进后退按钮
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next',
        autoHeight: true, //高度随内容变化
    });
    var arr2 = ['', '', '', '', '', '', '', ''];
    var src1, src2, src3, src4, src5, src6, src7, src8;
    for (var i = 1; i <= 9; i++) {
        $('.imgList').append('<li class="pull-left li' + i + '"><img id="pic' + i + '" src="" alt="点击选择上传图片"><input id="upload' + i + '" name="file" accept="image/*" type="file" style="display: none"/></li>')
    }
    $(".imgList li img").attr("src", "img/zz.png");
    $("#pic1").click(function() {
        $("#upload1").click(); //隐藏了input:file样式后，点击头像就可以本地上传
        $("#upload1").on("change", function() {
            var objUrl1 = getObjectURL(this.files[0]); //获取图片的路径，该路径不是图片在本地的路径
            var imageUrl = getObjectURL($(this)[0].files[0]);
            convertImgToBase64(imageUrl, function(base64Img) {
                src1 = (base64Img.split(",")[1]);
                $("#pic1").attr("src", src = "data:image/jpg;base64," + src1 + "");
            });
            arr2.splice(0, 1, this.files[0]);
            $('.addPhoto ul li').eq(1).show()
        });
    });
    $("#pic2").click(function() {
        $("#upload2").click(); //隐藏了input:file样式后,点击头像就可以本地上传
        $("#upload2").on("change", function() {
            var objUrl2 = getObjectURL(this.files[0]); //获取图片的路径，该路径不是图片在本地的路径
            var imageUrl = getObjectURL($(this)[0].files[0]);
            convertImgToBase64(imageUrl, function(base64Img) {
                src2 = (base64Img.split(",")[1]);
                $("#pic2").attr("src", src = "data:image/jpg;base64," + src2 + "");
            });
            arr2.splice(1, 1, this.files[0]);
            $('.addPhoto ul li').eq(2).show()
        });
    });
    $("#pic3").click(function() {
        $("#upload3").click(); //隐藏了input:file样式后,点击头像就可以本地上传
        $("#upload3").on("change", function() {
            var objUrl3 = getObjectURL(this.files[0]); //获取图片的路径，该路径不是图片在本地的路径
            var imageUrl = getObjectURL($(this)[0].files[0]);
            convertImgToBase64(imageUrl, function(base64Img) {
                src3 = (base64Img.split(",")[1]);
                $("#pic3").attr("src", src = "data:image/jpg;base64," + src3 + "");
            });
            arr2.splice(1, 1, this.files[0]);
            $('.addPhoto ul li').eq(3).show()
        });
    });
    $("#pic4").click(function() {
        $("#upload4").click(); //隐藏了input:file样式后,点击头像就可以本地上传
        $("#upload4").on("change", function() {
            var objUrl4 = getObjectURL(this.files[0]); //获取图片的路径，该路径不是图片在本地的路径
            var imageUrl = getObjectURL($(this)[0].files[0]);
            convertImgToBase64(imageUrl, function(base64Img) {
                src4 = (base64Img.split(",")[1]);
                $("#pic4").attr("src", src = "data:image/jpg;base64," + src4 + "");
            });
            arr2.splice(1, 1, this.files[0]);
            $('.addPhoto ul li').eq(4).show()
        });
    });
    $("#pic5").click(function() {
        $("#upload5").click(); //隐藏了input:file样式后,点击头像就可以本地上传
        $("#upload5").on("change", function() {
            var objUrl5 = getObjectURL(this.files[0]); //获取图片的路径，该路径不是图片在本地的路径
            var imageUrl = getObjectURL($(this)[0].files[0]);
            convertImgToBase64(imageUrl, function(base64Img) {
                src5 = (base64Img.split(",")[1]);
                $("#pic5").attr("src", src = "data:image/jpg;base64," + src5 + "");
            });
            arr2.splice(1, 1, this.files[0]);
            $('.addPhoto ul li').eq(6).show()
        });
    });
    $("#pic6").click(function() {
        $("#upload6").click(); //隐藏了input:file样式后,点击头像就可以本地上传
        $("#upload6").on("change", function() {
            var objUrl6 = getObjectURL(this.files[0]); //获取图片的路径，该路径不是图片在本地的路径
            var imageUrl = getObjectURL($(this)[0].files[0]);
            convertImgToBase64(imageUrl, function(base64Img) {
                src6 = (base64Img.split(",")[1]);
                $("#pic6").attr("src", src = "data:image/jpg;base64," + src6 + "");
            });
            arr2.splice(1, 1, this.files[0]);
            $('.addPhoto ul li').eq(7).show()
        });
    });
    $("#pic7").click(function() {
        $("#upload7").click(); //隐藏了input:file样式后,点击头像就可以本地上传
        $("#upload7").on("change", function() {
            var objUrl7 = getObjectURL(this.files[0]); //获取图片的路径，该路径不是图片在本地的路径
            var imageUrl = getObjectURL($(this)[0].files[0]);
            convertImgToBase64(imageUrl, function(base64Img) {
                src7 = (base64Img.split(",")[1]);
                $("#pic7").attr("src", src = "data:image/jpg;base64," + src7 + "");
            });
            arr2.splice(1, 1, this.files[0]);
            $('.addPhoto ul li').eq(8).hide()
        });
    });
    $("#pic8").click(function() {
        $("#upload8").click(); //隐藏了input:file样式后,点击头像就可以本地上传
        $("#upload8").on("change", function() {
            var objUrl8 = getObjectURL(this.files[0]); //获取图片的路径，该路径不是图片在本地的路径
            var imageUrl = getObjectURL($(this)[0].files[0]);
            convertImgToBase64(imageUrl, function(base64Img) {
                src8 = (base64Img.split(",")[1]);
                $("#pic4").attr("src", src = "data:image/jpg;base64," + src8 + "");
            });
            arr2.splice(1, 1, this.files[0]);
        });
    });
    $('.addPhoto ul li:gt(0)').css('display', 'none');
    var headImg;
    $("#pic0").click(function() {
        $("#upload0").click(); //隐藏了input:file样式后，点击头像就可以本地上传
        $("#upload0").on("change", function() {
            var objUrl = getObjectURL(this.files[0]); //获取图片的路径，该路径不是图片在本地的路径
            var imageUrl = getObjectURL($(this)[0].files[0]);
            convertImgToBase64(imageUrl, function(base64Img) {
                src1 = (base64Img.split(",")[1]);
                $("#pic0").attr("src", src = "data:image/jpg;base64," + src1 + "");
            });
            headImg = this.files[0]
        });
    });

    function convertImgToBase64(url, callback, outputFormat) {
        var canvas = document.createElement('CANVAS');
        var ctx = canvas.getContext('2d');
        var img = new Image;
        img.crossOrigin = 'Anonymous';
        img.onload = function() {
            var width = img.width;
            var height = img.height;
            // 按比例压缩4倍
            var rate = (width < height ? width / height : height / width) / 2;
            canvas.width = width * rate;
            canvas.height = height * rate;
            ctx.drawImage(img, 0, 0, width, height, 0, 0, width * rate, height * rate);
            var dataURL = canvas.toDataURL(outputFormat || 'image/png');
            callback.call(this, dataURL);
            canvas = null;
        };
        img.src = url;
    };

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
    };
    var str_label2 = "";
    var arr_label2 = [];
    // 删除类别操作
    function removeByValue(arr, val) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == val) {
                arr.splice(i, 1);
                break;
            }
        }
    };
    $('.courseType').click(function() {
        $.post('http://47.94.173.253:8008/Option_AreasAnd.ashx', {
            "type": 45
        }, function(data) {
            layer.open({
                type: 1,
                area: ['800px', '505px'],
                title: ['研究领域', 'font-size:18px;text-align: center;'],
                content: $('.teachAreaTable'),
                btn: '确定',
                shade: false
            });
            if ($('.tableLeft p').length == 0) {
                for (var i = 0; i < data.length; i++) {
                    $('.tableLeft').append('<p class="' + i + '">' + data[i].name + '</p>');
                    $('.tableLeft').children('p').eq(0).attr('id', 'firstP');
                    document.getElementById('firstP').click();
                    $('.tableLeft .' + i + '').click(function() {
                        $(this).css('backgroundColor', '#5BB85D').siblings('p').css('backgroundColor', '#29e');
                        var m = $(this).attr('class');
                        $('.tableRight label').remove();
                        for (var j = 0; j < data[m].sub.length; j++) {
                            $('.tableRight').append('<label><input type="checkbox" value="' + data[m].sub[j].name + '" name="label">' + data[m].sub[j].name + '</label>')
                        }
                        $("input:checkbox[name='label']").click(function() {
                            var aaa = $(this).prop("checked");
                            if (aaa === true) {
                                if (arr_label2.length > 4) {
                                    layer.msg('最多选择5个', {
                                        time: 1000,
                                    });
                                    $(this).removeAttr('checked');
                                    removeByValue(arr_label2, $(this).val());
                                } else {
                                    arr_label2.push($(this).val());
                                    $('#labelInfo').val(arr_label2);
                                }
                            } else {
                                removeByValue(arr_label2, $(this).val());
                                $('#labelInfo').val(arr_label2);
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
                $('.courseType').val($('#labelInfo').val());
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
    $('.submit .subBtn').click(function() {
    console.log(arr2[1])
        if ($('#s_province').val().length == 0 || $('#s_city').val().length == 0 || $('#s_county').val().length == 0 || $('.name').val().length == 0 || $('.TeachStyle').val().length == 0 || $('.selePhone').val().length == 0 || $('.email').val().length == 0 || $('.qq').val().length == 0 || $('.weChat').val().length == 0 || $('.courseType').val().length == 0 || $('.couseMain').val().length == 0 || $('.prices').val().length == 0 || $('#info').val().length == 0 || $('.couseWay').val().length == 0 || $('.post').val().length == 0) {
            layer.msg('请完善信息', {
                time: 1000
            })
        } else {
            ajaxFileUpload()
        }
    });
    let href = window.location.href;
    let userGuid = href.split("?")[1].split("&")[0].split("=")[1];
    let companyId = href.split("?")[1].split("&")[1].split("=")[1];

    function ajaxFileUpload() {
        var Iformdata = new FormData();
        var img1val = arr2[0];
        var img2val = arr2[1];
        var img3val = arr2[2];
        var img4val = arr2[3];
        var img5val = arr2[4];
        var img6val = arr2[5];
        var img7val = arr2[6];
        var img8val = arr2[7];
        var addressNow = $('#s_province').val() + $('#s_city').val();
        var provice = $('#s_province').val();
        var city = $('#s_city').val();
        Iformdata.append('lectureImage', headImg);
        Iformdata.append('realname', $('.name').val());
        Iformdata.append('Assistant', $('.name2').val());
        Iformdata.append('sex', $('input[name="sex"]:checked').val());
        Iformdata.append('phone', $('.selePhone').val());
        Iformdata.append('email', $('.email').val());
        Iformdata.append('AssistantPhone', $('.assistantPhone').val());
        Iformdata.append('QQ', $('.qq').val());
        Iformdata.append('wechat', $('.weChat').val());
        Iformdata.append('CooperativePrices', $('.prices').val());
        Iformdata.append('province', provice);
        Iformdata.append('city', city);
        Iformdata.append('address', addressNow);
        Iformdata.append('LecturerBackground', $('#info').val());
        Iformdata.append('post', $('.post').val());
        Iformdata.append('ResearchField', $('.courseType').val());
        Iformdata.append('courses', $('.couseMain').val());
        Iformdata.append('TeachStyle', $('.TeachStyle').val());
        Iformdata.append('WorkingMethod', $('.couseWay').val());
        Iformdata.append('CustCase', $('.case').val());
        Iformdata.append('ServiceCom', ' ');
        Iformdata.append('workBg', ' ');
        Iformdata.append('userGuid', userGuid);
        Iformdata.append('companyId', companyId);
        Iformdata.append('files', img1val);
        Iformdata.append('files', img2val);
        Iformdata.append('files', img3val);
        Iformdata.append('files', img4val);
        Iformdata.append('files', img5val);
        Iformdata.append('files', img6val);
        Iformdata.append('files', img7val);
        Iformdata.append('files', img8val);
       
        $.ajax({
            type: 'POST',
            url: 'http://47.94.173.253:8008/Lectures/Add_Lecture.ashx',
            data: Iformdata,
            cache: false,
            processData: false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
            contentType: false, // 不设置Content-type请求头
            success: function(data) {
                console.log(data);
                data2 = JSON.parse(data);
                if (data2.status == 200) {
                    layer.msg(data2.msg, {
                        time: 1000,
                    });
                    $('.swiper-slide input').val("");
                    $('.swiper-slide textarea').val("")
                } else {
                    layer.msg(data2.msg, {
                        time: 1000,
                    });
                }
            },
            error: function(msg) {}
        });
    };
    $(".prices").bind("input propertychange", function(event) {
        if ($(".prices").val().length > 0) {
            $(".price").show();
            $(".realPrice").html($(".prices").val() * 0.9)
        } else {
            $(".price").hide()
        }
    });
    $(".whyIcon").on("click", function() {
        layer.open({
            type: 1,
            area: ['250px', '150px'],
            title: ['收益说明','text-align: center'],
            content: $('.priceBox'),
            btn: '确定',
            shade: false
        });
    })
})