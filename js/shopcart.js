$(function(){
    // 查询购物车接口中的数据
    if(!getCookie("uid")){
        location.href="log.html"
    }
    let uid=getCookie("uid");
    // 点击注销退出登录
    $(".header button").click(function(){
        removeCookie("uid");
        location.href="shoplist.html";
    });

$.get("http://jx.xuzhixiang.top/ap/api/cart-list.php?id="+uid,res=>{
    // console.log(res.data);
        var str="";
        res.data.forEach(ele => {
            // console.log(ele);
            // console.log(ele.pid);
            var arr=ele.pimg.split(",");
            str+=`
            <div class="Box">
                <input type="checkbox" name="" class="xuan" data-id="${ele.pid}">
                <dl>
                    <dt>
                        <a href="../html/shopdetail.html?id=${ele.pid}"><img src="${arr[0]}"></a>
                    </dt>
                    <dd>
                        <h2>
                            ${ele.pname}
                        </h2>
                        <h3>
                            <strong>￥<span class="price">${ele.pprice}</span></strong>
                            <div class="num-box">
                                <button class="reduce" data-id=${ele.pid}>-</button> 
                                <input type="text" value="${ele.pnum}">
                                <button class="add" data-id=${ele.pid}>+</button>
                            </div>
                        </h3>
                    </dd>
                </dl>
            </div>
            `;
            
        });
        $(".list").append(str);
         
        // 购物车操作
        // 购物车小红点和总共几件商品
        $(".footer ul li:nth-child(4) .circle").empty();
        $(".footer ul li:nth-child(4) .circle").append($(".Box").length);
        $(".top p span").empty();
        $(".top p span").append($(".Box").length);

        // 点击管理变完成出现删除按钮
        $(".handle span:first").click(function(){
            $(this).hide().siblings().show();
            $(".two").show();
            $(".one").hide();
            // 勾选之后点击删除按钮
            $(".xuan").click(
                function(){
                    if($(".Box .xuan:checked").length==$(".Box").length){
                        $(".footbox .left input").prop("checked","true");
                    }else{
                        $(".footbox .left input").removeAttr("checked",false); 
                    }
                    // 点击全选全部选中
                    $(".footbox .left input").click(function(){
                        if($(".footbox .left input").get(0).checked){ //全选
                            $(".Box .xuan").prop("checked","true"); 
                        }else{//取消全选
                            $(".Box .xuan").removeAttr("checked",false);   
                        }
                        Total();
                    });
                    $(".footbox .left span").click(function(){
                        if(!$(".Box .xuan").is(":checked")){ //全选
                            $(".Box .xuan").prop("checked","true"); 
                            $(".footbox .left input").prop("checked","true"); 
                        }else{//取消全选
                            $(".Box .xuan").removeAttr("checked",false); 
                            $(".footbox .left input").removeAttr("checked",false);   
                        }
                        Total();
                    });
                    $(".xuan:checked").each(data=>{
                        var delid=$(this).attr("data-id");
                        $(".two button:last").click(function(){
                            $.get("http://jx.xuzhixiang.top/ap/api/cart-delete.php?uid="+uid+"&pid="+delid);
                            // $(this).parent().remove();
                            // console.log($(this).parent().get());
                            location.reload();
                           });
                    });        
                }
            );
        });
        $(".handle span:last").click(function(){
            $(this).hide().siblings().show();
            $(".two").hide();
            $(".one").show();
        });

        // 获取reduce和add
        $(".reduce").click(function(){
            let num=$(this).siblings("input").val();
            num--;
            if(num<=1){
                num=1;
            }
            $(this).siblings("input").val(num); 
            // 修改购物车数据
            var mypid=$(this).attr("data-id");
            // console.log(mypid);
            $.get("http://jx.xuzhixiang.top/ap/api/cart-update-num.php?uid="+uid+"&pid="+mypid+"&pnum="+$(this).siblings("input").val());
            Total();
        });
        $(".add").click(function(){
            
            let num=$(this).siblings("input").val();
            num++;
            $(this).siblings("input").val(num);
            // 修改购物车数据
            var mypid=$(this).attr("data-id");
            // console.log(mypid);
            $.get("http://jx.xuzhixiang.top/ap/api/cart-update-num.php?uid="+uid+"&pid="+mypid+"&pnum="+$(this).siblings("input").val());
            Total();
        });
        // 点击全选,全部选中
        $(".footbox .left input").click(function(){
            if($(".footbox .left input").get(0).checked){ //全选
                $(".Box .xuan").prop("checked","true"); 
            }else{//取消全选
                $(".Box .xuan").removeAttr("checked",false);   
            }
            Total();
        });
        $(".footbox .left span").click(function(){
            if(!$(".Box .xuan").is(":checked")){ //全选
                $(".Box .xuan").prop("checked","true"); 
                $(".footbox .left input").prop("checked","true"); 
            }else{//取消全选
                $(".Box .xuan").removeAttr("checked",false); 
                $(".footbox .left input").removeAttr("checked",false);   
            }
            Total();
        });
        // 点击首页跳转到列表页
        $(".footer ul li:nth-child(1)").click(function(){
            location.href="shoplist.html";
        });
        // 点击全部单选框会选中全选框
        $(".Box .xuan").click(function(){
            Total();
            if($(".Box .xuan:checked").length==$(".Box").length){
                $(".footbox .left input").prop("checked","true");
            }else{
                $(".footbox .left input").removeAttr("checked",false); 
            }
            
        });
        
        // 计算总价
        function Total(){
            var total=0;
            var num=0;
            // 1. 获取所有的被勾选的条目复选框！循环遍历
            $(".xuan").each(function(){
                var ischecked=$(this).prop("checked");
                if(ischecked == true){ 
                    // arr.push($(this).parent().find(".xuan:checked"));
                    total+= $(this).parent().find(".xuan:checked").siblings().find(".price").text()*$(this).parent().find(".xuan:checked").siblings().find(".num-box input").val();
                    num+=parseInt($(this).parent().find(".xuan:checked").siblings().find(".num-box input").val());
                }
            });
            $(".one button span").empty();
            $(".one button span").append(num);
            $(".one p span i").empty();
            $(".one p span i").append(total);
        }
        // 点击箭头跳转到首页
        $(".header a").click(function(){
            location.href="shoplist.html";
            return false;
        });
        // 点击图片跳转到相应的详情页面
        $(".Box dl dt img").click(function(){
            console.log($(this).attr("data-id"));
        });            
});
});