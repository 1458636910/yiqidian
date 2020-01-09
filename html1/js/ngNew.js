//这段代码意思是如果要搜索树形，先展开树形所有节点
$scope.setDepartListShow=function(node){

        for(var i=0;i<node.length;i++){
            if(node[i].children.length!=0){
                node[i].lovTree=true
                $scope.setDepartListShow(node[i].children)
            }
        }
    }
//这段代码意思是如果要搜索树形，然后隐藏跟搜索框不匹配的节点，这样2步就达到了 只展示出了跟搜索字段相匹配的结果
    $scope.setDepartListHide=function(node){

        for(var i=0;i<node.length;i++){
            if(node[i].children.length!=0){
                node[i].lovTree=false
                $scope.setDepartListHide(node[i].children)
            }
        }
    }
//getDepartListshu 获取树形基本的数据，展示出来
    var getDepartListshu=function(){
        $http({
            method:"get",
            url:'http://47.94.173.253:8008/Com_SelectDepartment.ashx'
        }).success(function(data){
            console.log(data+"456")
            if(data.ret=="SUCCESS"){
                $scope.departmentListDate=data.jsonValue
    //只展示出来根节点下一级的节点，其他子节点隐藏
                for(var i=0;i<data.jsonValue.length;i++){
                    if( $scope.departmentListDate[i].children.length!=0){
                        $scope.departmentListDate[i].lovTree=true
                        $scope.moveDepartmentListDate[i].lovTree=true
                    }
                }
    //监控输入框的变化，如果输入框字段发生变化，然后就执行最开始设计的函数setDepartListShow和setDepartListHide
                $scope.$watch('search2.query',function(newValue,oldValue){
                    if(newValue!=oldValue){
                        if(newValue!=""){
                            $scope.setDepartListShow($scope.departmentListDate)
                        }else{
                            $scope.setDepartListHide($scope.departmentListDate)
                            for(var i=0;i<data.jsonValue.length;i++){
                                if( $scope.departmentListDate[i].children.length!=0){
                                    $scope.departmentListDate[i].lovTree=true
                                }
                            }
                        }

                    }
                })
            }else{
                alert(data.jsonValue)
                请输入手机号
            }

        })
    }

    getDepartListshu()
//这是关于树形的点击图标发生相应的变化的代码
    $scope.lastDepartmentChildShow=function(node){
        if(node.children.length!=0){
            if(node.lovTree){
                return false
            }else{
                return true
            }
        }else{
            return false

        }
    }
    $scope.showDepartmentChild=function(node){

        if(node.children.length!=0){
            node.lovTree=!node.lovTree

        }else {
            return

        }

    }
