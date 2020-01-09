$(document).ready(function() {
    let http_head = "http://47.94.173.253:8008/";
    let href = window.location.href;
    let userGuid = href.split("&")[1].split("%")[0].split("=")[1];
    let companyId = href.split("%")[1].split("=")[1];
    let imgId = href.split("&")[0].split("?")[1].split("=")[1];
    setTimeout(function() {
        $.post('' + http_head + 'Makerspacey/Get_MakerMenuCount.ashx?rand=' + Math.random(), {
            "userGuid": userGuid
        }, function(result) {
            result = JSON.parse(result);
            if (result.status == 200) {
                var cpcount = result.items.cpcount;
                var fkcount = result.items.fkcount;
                var lycount = result.items.lycount;
                var rzcount = result.items.rzcount;
                $('.rzcount').text(rzcount);
                $('.fkcount').text(fkcount);
                $('.lycount').text(lycount);
                $('.cpcount').text(cpcount);
            }
        });
    }, 200);
    setTimeout(function() {
    	$.post('' + http_head + 'Com/User_BusinessCard.ashx?rand=' + Math.random(), {
    		"userGuid": userGuid
    	}, function(data) {
    		
    		var data = JSON.parse(data);
    		var localObj = JSON.stringify(data.items);
    		localStorage.setItem("GHY_login",localObj)
    		console.log("用户", data)
    		var username = data.items.upname;
    		var headImg;
    		userPhone = data.items.uname;
    		if (data.items.photo.indexOf(".jpg") > 0 || data.items.photo.indexOf(".png") > 0 || data.items.photo.indexOf(
    				".jpeg") > 0) {
    			// headImg ="http://47.94.173.253:8008"+data.items.photo.split("http://47.94.173.253:8008")[2];
    			headImg = data.items.photo;
    
    		} else {
    			headImg = 'img/touxiang.png'
    		}
    		$(".uName").text(username);
    		$(".yourName").val(username);
    		$(".headImg").attr("src", headImg);
    	})
    }, 200);
    var imgPage

    function loadImg(page) {
        setTimeout(function() {
            $.post(http_head + 'Lectures/Get_LectureMenu_Photo.ashx', {
                "menuId": imgId,
                "page": page
            }, function(data) {
                var dataImg = JSON.parse(data);
                imgPage = dataImg.items.page
                if (imgPage <= 1) {
                    $('.imgListPrve').hide()
                    if (dataImg.items.rows.length >= 20) {
                        $('.imgListNext').show()
                    } else {
                        $('.imgListPrve').hide()
                        $('.imgListNext').hide()
                    }
                } else {
                    if (dataImg.items.rows.length >= 20) {
                        $('.imgListNext').show()
                        $('.imgListPrve').show()
                    } else {
                        $('.imgListNext').hide()
                        $('.imgListPrve').show()
                    }
                }
                $('#showImglist li').remove()
                for (var i = 0; i < dataImg.items.rows.length; i++) {
                   $('#showImglist').append('<li class="" id="' + dataImg.items.rows[i].Id + '"><div><div class="clearfix"><ul class="form-inline " id="optionImg"><li class="form-control" id="' + dataImg.items.rows[i].Id + '">编辑</li><br /><li  id="' + dataImg.items.rows[i].Id + '" class="form-control">删除</li><br /><li  id="' + dataImg.items.rows[i].Id + '" class="form-control">设为封面</li></ul></div><img src="' + dataImg.items.rows[i].imageUrl + '" alt="" layer-src="' + dataImg.items.rows[i].imageUrl + '"></div></li>')
                    //编辑
                    $('#showImglist').children('#' + dataImg.items.rows[i].Id + '').children('div').children('div').children('ul').children('li').eq(0).click(function() {
                        var menuId = $(this).attr('id')
                        $('.nameInput').val($(this).parent('ul').parent('div').parent('div').siblings('p').text())
                        layer.open({
                            type: 1,
                            area: ['600px', '280px'],
                            title: ['修改图片信息', 'font-size:18px;text-align: center;'],
                            content: $(".changeImgNameDiv"),
                            btn: '确定',
                            yes: function(index, layero) {
                                $.post(http_head + 'Lectures/Update_LecturePhoto.ashx', {
                                    "userGuid": dataInfo.Guid,
                                    "lecturePhotoId": menuId,
                                    "lecturePhotoTitle": $('.nameInput').val()
                                }, function(data) {
                                    var dataChangeSuccess = JSON.parse(data)
                                    if (dataChangeSuccess.status == 200) {
                                        layer.msg('设置成功', {
                                            time: 1000,
                                        });
                                        $('.nameInput').val("")
                                        loadImg((imgPage) - 1)
                                    }
                                });
                                layer.close(index)
                            }
                        })
                    });
                    //删除
                    $('#showImglist').children('#' + dataImg.items.rows[i].Id + '').children('div').children('div').children('ul').children('li').eq(1).click(function() {
                        var menuId = $(this).attr('id');
                        layer.open({
                            type: 1,
                            area: ['300px', '180px'],
                            title: ['删除图片', 'font-size:18px;text-align: center;'],
                            content: $(".deleteImgDiv"),
                            btn: '确定',
                            yes: function(index, layero) {
                                $.post(http_head + 'Lectures/Delete_Lecture_Photo.ashx', {
                                    "userGuid": userGuid,
                                    "menuId": imgId,
                                    "lecturePhotoId": menuId
                                }, function(data) {
                                    loadImg((imgPage) - 1)
                                });
                                layer.close(index)
                            }
                        })
                    });
                    //设为封面
                    $('#showImglist').children('#' + dataImg.items.rows[i].Id + '').children('div').children('div').children('ul').children('li').eq(2).click(function() {
                        var menuId = $(this).attr('id');
                        setTimeout(function() {
                            $.post(http_head + 'Lectures/Set_HomeImage.ashx', {
                                "userGuid": userGuid,
                                "menuId": imgId,
                                "imageId": menuId
                            }, function(data) {
                                var dataSet = JSON.parse(data);
                                if (dataSet.status == 200) {
                                    layer.msg('设置成功', {
                                        time: 1000,
                                    });
                                    loadImg((imgPage) - 1)
                                }
                            });
                        }, 300)
                    });
                    //
                    $('#showImglist').children('#' + dataImg.items.rows[i].Id + '').click(function() {
                        layer.photos({
                            photos: '.layer-photos-demo',
                            anim: 5
                        })
                    });
					
					
                }
                $('#showImglist li').hover(function() {
                    $(this).children('div').children('div').show()
                }, function() {
                    $(this).children('div').children('div').hide()
                });
            });
        }, 350);
    };
    $('.imgListNext').click(function() {
        loadImg(imgPage)
    });
    $('.imgListPrve').click(function() {
        loadImg(Number(imgPage) - 2)
    });
    loadImg(0)
    // 上传图片
    $('#uploadImg').click(function() {
        layer.open({
            type: 1,
            area: ['1300px', '600px'],
            title: ['上传照片', 'font-size:18px;text-align: center;'],
            content: $(".uploadImgDiv"),
            btn: '确定',
            yes: function(index, layero) {
                ajaxFileUpload()
            }
        })
    });
    var userAgent = navigator.userAgent; //用于判断浏览器类型
    var arr_img = [];
    var fileList;
    $(".file").change(function() {
        //获取选择图片的对象
        var docObj = $(this)[0];
        var picDiv = $(this).parents(".uploadImgDiv");
        //得到所有的图片文件
        fileList = docObj.files;
        for (var i = 0; i < fileList.length; i++) {
            arr_img.push(fileList[i])
            var picHtml = "<div class='imageDiv' > <img id='img" + fileList[i].name + "'  /> <div class='cover'><i class='delbtn'>删除</i></div></div>"
            picDiv.prepend(picHtml);
            var imgObjPreview = document.getElementById("img" + fileList[i].name);
            if (fileList && fileList[i]) {
                //图片属性
                imgObjPreview.style.display = 'block';
                imgObjPreview.style.width = '320px';
                imgObjPreview.style.height = '296px';
                //imgObjPreview.src = docObj.files[0].getAsDataURL();
                //火狐7以上版本不能用上面的getAsDataURL()方式获取，需要以下方式
                if (userAgent.indexOf('MSIE') == -1) { //IE以外浏览器
                    imgObjPreview.src = window.URL.createObjectURL(docObj.files[i]); //获取上传图片文件的物理路径
                } else { //IE浏览器
                    if (docObj.value.indexOf(",") != -1) {
                        var srcArr = docObj.value.split(",");
                        imgObjPreview.src = srcArr[i];
                    } else {
                        imgObjPreview.src = docObj.value;
                    }
                }
            }
        }
    });
    /*删除功能*/
    $(document).on("click", ".delbtn", function() {
        var arr_img2 = [];
        var s = arr_img.indexOf(fileList[0]);
        var arrLength = Number(arr_img.length)
        arr_img2 = arr_img.splice(Number(arr_img.length) - s, 1)
        var _this = $(this);
        _this.parents(".imageDiv").remove();
    });
    // 上传
    function ajaxFileUpload() {
        var Pformdata = new FormData();
        var dataimg = $("#fileInput")[0].files;
        Pformdata.append('userGuid', userGuid);
        Pformdata.append('menuId', imgId);
        for (var i = 0; i < arr_img.length; i++) {
            Pformdata.append('file', arr_img[i]);
            console.log(arr_img[i])
        }
        $.ajax({
            type: 'post',
            url: http_head + 'Lectures/Add_LecturePhoto.ashx',
            data: Pformdata,
            cache: false,
            processData: false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
            contentType: false, // 不设置Content-type请求头
            success: function(data) {
                var data2 = JSON.parse(data);
              
                if (data2.status == 200) {
                    layer.msg('上传成功', {
                        time: 1000,
                    });
                    loadImg((imgPage) - 1)
                    arr_img = [];
                    $('.imageDiv').remove()
                    layer.closeAll()
                }else if(data2.status == 202){
                    layer.msg("您不是讲师",{
                        time:1200
                    });
                }
            },
            error: function() {}
        });
    }
   
})