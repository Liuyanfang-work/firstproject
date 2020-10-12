// 出现导航栏
$(".nav1").hover(function(){
    $(this).addClass("mycolor");
    $(".nav-list1").show();
},function(){
    $(this).removeClass("mycolor");
    $(".nav-list1").hide();
})
$(".nav2").hover(function(){
    $(this).addClass("mycolor");
    $(".nav-list2").show();
},function(){
    $(this).removeClass("mycolor");
    $(".nav-list2").hide();
})
// banner轮播
var timer1=null;
var index1=0;

function banner_next(){// 下一张
    index1++;
    if(index1>3){
        $(".banner-img").animate({left:-(index1)*1920},500); 
        index1 = 0;
        $(".banner-img").animate({left:0},0);
    }
    $(".banner-img").animate({left:-index1*1920},500);
    banner_iconHover(index1);
}

function banner_autoplay(){// 自动播放
    timer1 = setInterval(function(){ 
        banner_next();
    },2000) 
}

function banner_iconHover(index){// 小圆点跟随
    $(".banner-btn li").eq(index).addClass("banner-active").siblings().removeClass("banner-active");
}

$(".banner-btn li").click(function(){ // 鼠标碰触圆点图标实现图片左右轮播，清除自动播放的定时器
    var index = $(this).index();
    $(".banner-img").animate({left:-index*1920},300);
    banner_iconHover(index);
})

$(".banner").click(function(){ //鼠标移入 定时器取消
    clearInterval(timer1);
})

banner_autoplay();

// swipe轮播：
var timer=null;
var index=0;

function next(){// 下一张
    index++;
    if(index>2){
        $(".swipeimg").animate({left:-(index)*1190},500); 
            index = 0;
        $(".swipeimg").animate({left:0},0);
    }
    $(".swipeimg").animate({left:-index*1190},500);
    iconHover(index);
}

function autoplay(){// 自动播放
    timer = setInterval(function(){ 
        next();
    },2000) 
}

function iconHover(index){// 小圆点跟随
    $(".swipebutton li").eq(index).addClass("auto").siblings().removeClass("auto");
}

$(".swipebutton li").click(function(){ // 鼠标碰触圆点图标实现图片左右轮播，清除自动播放的定时器
    var index = $(this).index();
    $(".swipeimg").animate({left:-index*1190},300);
    iconHover(index);
})

$(".swipe").click(function(){ //鼠标移入 定时器取消
    clearInterval(timer);
})
autoplay();
// brand的tab切换
$(".brand-list dl dt span").on("mouseover",function(){
    var i = $(".brand-list dl dt span").index($(this));
    $(this).addClass("select-brand").parents("a").siblings("a").find("span").removeClass("select-brand");
    $(".brand-list-bg ul").attr("class","brandbg-"+i);
});
