$(document).ready(function(){
   var userAgent = navigator.userAgent;//用于判断浏览器类型
   var arr_img = [];
   var fileList;
    $(".file").change(function () {
        //获取选择图片的对象
        var docObj =$(this)[0];
        console.log( docObj )
        var picDiv=$(this).parents(".picDiv");
        //得到所有的图片文件
         fileList = docObj.files;
        for (var i = 0; i < fileList.length; i++) {
            arr_img.push(fileList[i])
            var picHtml="<div class='imageDiv' > <img id='img" + fileList[i].name + "'  /> <div class='cover'><i class='delbtn'>删除</i></div></div>"
            picDiv.prepend(picHtml);
            var imgObjPreview = document.getElementById("img"+fileList[i].name);
            if (fileList && fileList[i]) {
                //图片属性
                imgObjPreview.style.display = 'block';
                imgObjPreview.style.width = '320px';
                imgObjPreview.style.height = '296px';
                //imgObjPreview.src = docObj.files[0].getAsDataURL();
                //火狐7以上版本不能用上面的getAsDataURL()方式获取，需要以下方式
                if(userAgent.indexOf('MSIE') == -1){//IE以外浏览器
                    imgObjPreview.src = window.URL.createObjectURL(docObj.files[i]);   //获取上传图片文件的物理路径
                    console.log( imgObjPreview.src )
                }else{//IE浏览器
                    if(docObj.value.indexOf(",")!=-1){
                        var srcArr=docObj.value.split(",");
                        imgObjPreview.src = srcArr[i];
                    }else{
                        imgObjPreview.src = docObj.value;
                    }
                }
            }
        }
    });
    /*删除功能*/
    $(document).on("click",".delbtn",function () {
        var arr_img2 = [];
         var s =  arr_img.indexOf(fileList[0]);
         var arrLength = Number(arr_img.length)
          arr_img2 =  arr_img.splice( Number(arr_img.length)-s,1)
          console.log( arr_img )
        var _this=$(this);
        _this.parents(".imageDiv").remove();
    });
})
