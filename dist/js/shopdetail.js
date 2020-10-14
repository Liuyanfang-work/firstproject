$(function () {
// 请求数据
var productId=location.search.split("=")[1];
    
var str="";
$.get("http://jx.xuzhixiang.top/ap/api/detail.php?id="+productId,function(res){
    // console.log(res.data);
    var arr=res.data.pimg.split(",");
    $(".header h2").append(res.data.pname);
    $(".price h3").append(res.data.pname);
    $(".price h2 p i").append(res.data.pdesc);
    $(".myprice").append(res.data.pprice);
    $(".banner ul").attr("width",750*(arr.length))
    
    arr.forEach(ele => {
        str+=`
            <li><img src="${ele}" alt=""></li>
        `;
    });
    str+=`
            <li><img src="${arr[0]}" alt=""></li>
        `;
    $(".banner-img").append(str);
    $(".count span:last").append(arr.length);
    // 轮播
    var timer=null;
    var index=0;
    var count=1;
    // if(arr.length==1){
    //     clearInterval(timer);
    //     console.log("ok");
    // }
    function next(num){// 下一张
        index++;
        iconbtn(count);
        count++;
        $(".banner-img").animate({left:-index*750},500);
        // num=长度-1
        if(index>num){
            index = 0;
            $(".banner-img").animate({left:0},0);
        }
        if(count>num){
            count=1;
        }
    }
    function iconbtn(i){
        $(".count span:first").empty();
        $(".count span:first").append(i);
    }
    function autoplay(num){// 自动播放
        timer = setInterval(function(){ 
            next(num);
            iconbtn(count);
        },2000) 
    }
    // 定时器取消
    if(arr.length>1){
        autoplay(arr.length);
    }
    
}); 
// 公共轮播
var timer1=null;
var index1=0;

function banner_next(){// 下一张
    index1++;
    if(index1>1){
        $(".publicswiper").animate({left:-(index1)*750},500); 
        index1 = 0;
        $(".publicswiper").animate({left:0},0);
    }
    $(".publicswiper").animate({left:-index1*750},500);
    banner_iconHover(index1);
}

function banner_autoplay(){// 自动播放
    timer1 = setInterval(function(){ 
        banner_next();
    },2000) 
}

function banner_iconHover(index){// 小圆点跟随
    $(".publicbtn li").eq(index).addClass("active").siblings().removeClass("active");
}

$(".publicbtn li").click(function(){ // 鼠标碰触圆点图标实现图片左右轮播，清除自动播放的定时器
    var index = $(this).index();
    $(".publicswiper").animate({left:-index*750},300);
    banner_iconHover(index);
})

$(".public").click(function(){ //鼠标移入 定时器取消
    clearInterval(timer1);
})

banner_autoplay();
// 加入购物车
var flag = true;
$(window).scroll(function () {
    if (flag) {
        var st = $(this).scrollTop();
        if (st > 1) {
            $(".hidden").show();
            $("#totop").show();
            $("#totop").click(function(){
                st=0;
            });
            $(".hidden li").click(
                function(){
                    flag = false;
                    var index = $(this).index();
                    $("html,body").stop().animate({
                        "scrollTop": 1200*index
                    }, 500, function () {
                        flag = true;
                    });
                    $(this).find("span").addClass("select").parent().siblings().find("span").removeClass("select");
                }
            );
        } else {
            $(".hidden").hide();
            $("#totop").hide();
        }
    }
    return false;
})
$("#totop").click(function () {
    flag = false;
    $("html,body").stop().animate({
        "scrollTop": 0
    }, 200, function () {
        flag = true;
    });
})
$("#saoma").click(function(){
    if(($("#saoma img").css("display")=="none")){
        $("#saoma img").show();
        target=false;
    }else{
        $("#saoma img").hide();  
    }
    return false;
});
$(".isOnlyjf").click(function(){
    $(".shopcart").show();
    $("body").css("overflow","hidden");
    $(".cart").show(); 
    $(".jifen-btn button:first").click(function(){
        $("body").css("overflow","");
        $(".cart").hide();
        $(".shopcart").hide();
        $(".point").show(
            setTimeout(function(){
                $(".point").hide();
            },2000)  
        );
        $.get("http://jx.xuzhixiang.top/ap/api/add-product.php?uid=43422&pid="+productId+"&pnum="+$(".slider-group input").val(),data=>{
            console.log(data);
        });
    });
    
});
$(".close").click(function(){
    $("body").css("overflow","");
    $(".cart").hide();
    $(".shopcart").hide();
});
// 点击加号，件数增加
var num=$(".slider-group input").val();
$(".slider-group button:last").click(function(){
    num++;
    $(".slider-group input").val(num);
});
// 点击减号，件数增加
$(".slider-group button:first").click(function(){
    num--;
    if($(".slider-group input").val()=="1"){
       num=1;
    }
    $(".slider-group input").val(num);
});
})