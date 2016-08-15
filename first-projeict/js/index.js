$(function(){
	$('.li1').mouseover(function(){
		$('.nav_box').css('display','block');
	});
	$('.li1').mouseout(function(){
		$('.nav_box').css('display','none');
	});
	
	
	
	var nav_length=$('.nav_content').length;
	for(var i=0;i<nav_length;i++){
		$('.nav_content')[i].index = i;
	}
	$('.nav_content').bind('mouseover',function(){
		$('.content_box').addClass("hidden");
		$('.content_box').eq(this.index).removeClass("hidden");
		$('.arrows_R,.arrows_R2').eq(this.index).addClass("hidden");
	});
	$('.nav_content').bind('mouseout',function(){
		$('.arrows_R,.arrows_R2').eq(this.index).removeClass("hidden");
	});
	
	
	
	//top banner 实现
	$('#slideBox').slideBox({
        duration : 0.3,//滚动持续时间，单位：秒
        easing : 'linear',//swing,linear//滚动特效
        delay : 5,//滚动延迟时间，单位：秒
        hideClickBar : false,//不自动隐藏点选按键
        clickBarRadius : 10
    });
    //computer banner 实现
     $('#slideBox2').slideBox({
        direction : 'top',//left,top#方向
        duration : 0.3,//滚动持续时间，单位：秒
        easing : 'swing',//swing,linear//滚动特效
        delay : 5,//滚动延迟时间，单位：秒
        startIndex : 1//初始焦点顺序
    });
////	$('#com_Lcontent').slideBox({
//      duration : 0.3,//滚动持续时间，单位：秒
//      easing : 'linear',//swing,linear//滚动特效
//      delay : 5,//滚动延迟时间，单位：秒
//      hideClickBar : false,//不自动隐藏点选按键
//      clickBarRadius : 10
//  });


	$('#save_wance').bind('click',function(){
		alert("收藏成功！");
	})
	
	var userName =sessionStorage.getItem(1);
	 if(userName != null){
	 	$('#top_msg').html("欢迎您"+userName+"<a href='../loginPage/html/login.html'>退出</a>").css('color','red').css('font-size','12px');
	 }
});
