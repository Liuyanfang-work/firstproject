// banner轮播
var timer=null;
var index=0;

function next(){// 下一张
    index++;
    if(index>5){
        $(".banner-img").animate({left:-(index)*750},500); 
            index = 0;
        $(".banner-img").animate({left:0},0);
    }
    $(".banner-img").animate({left:-index*750},500);
    iconHover(index);
}

function autoplay(){// 自动播放
    timer = setInterval(function(){ 
        next();
    },2000) 
}

function iconHover(index){// 小圆点跟随
    $(".banner-btn li").eq(index).addClass("banner-active").siblings().removeClass("banner-active");
}

$(".banner-btn li").click(function(){ // 鼠标碰触圆点图标实现图片左右轮播，清除自动播放的定时器
    var index = $(this).index();
    $(".banner-img").animate({left:-index*750},300);
    iconHover(index);
})

$(".banner").click(function(){ //鼠标移入 定时器取消
    clearInterval(timer);
})
autoplay();
// 调json-server接口，将商品列表展示到页面上
// $.get("http://localhost:3000/products",function(data){
//     console.log(data);
// });