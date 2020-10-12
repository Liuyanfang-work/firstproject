$(function () {

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