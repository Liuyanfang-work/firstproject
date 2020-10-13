$(function(){
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
        Total();
    });
    $(".add").click(function(){
        
        let num=$(this).siblings("input").val();
        num++;
        $(this).siblings("input").val(num);
        Total();
    });
    // 点击全选,全部选中
    $(".footbox .left span").click(function(){
       
        if( !$(".Box .xuan").is(':checked')){ //全选
            $(".Box .xuan").prop("checked","true");
            $(".footbox .left input").prop("checked","true");  
        }else{//取消全选
            $(".Box .xuan").removeAttr("checked",false);
            $(".footbox .left input").removeAttr("checked",false);   
        }
        Total();
        return false;
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
    
});
