$(function(){
    $("#myphone").blur(function(){
        var phone=$(this).val();
        if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone))){ 
            $(this).val("");
            $(this).attr("placeholder","手机号格式不正确");
            $(this).css("border-bottom","1px solid red");
        } 
    });
    $("#myword").blur(function(){
        var password=$(this).val();
        if(!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{3,6}$/.test(password))){ 
            $(this).val("");
            $(this).attr("placeholder","至少3-6个字符,至少1个大写字母，1个小写字母和1个数字，其他可以是任意字符");
            $(this).css("border-bottom","1px solid red");
        } 
    });
    
    $(".loginButton button").click(function(){
        if($("#myphone").val()==""){
            $(this).attr("placeholder","手机号不为空");
            $(this).css("border-bottom","1px solid red");
            return;
        }
        if($("#myword").val()==""){
            $(this).attr("placeholder","至少3-6个字符,至少1个大写字母，1个小写字母和1个数字，其他可以是任意字符");
            $(this).css("border-bottom","1px solid red");
            return;
        }
        $.get("http://jx.xuzhixiang.top/ap/api/reg.php?username="+$("#myphone").val()+"&password="+$("#myword").val())
        .then(data=>{
            console.log(data);
            window.location.href="log.html";  
        });
    });
});