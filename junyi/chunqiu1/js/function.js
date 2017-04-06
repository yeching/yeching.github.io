/*banner*/
$('.ck-slide').ckSlide({
	autoPlay: true,//默认为不自动播放，需要时请以此设置
	dir: 'x',//默认效果淡隐淡出，x为水平移动，y 为垂直滚动
	interval:3000,//默认间隔3000毫秒
	isAnimate:true
});
/*menu*/
(function(){
	var menu1=document.getElementById("menu-1");
	var ul1=document.querySelector("#menu-1>ul");
	var ul1lis=document.querySelectorAll("#menu-1>ul>li");
	var menu2=document.getElementById("menu-2");
	var ul2=document.querySelector("#menu-2>ul");
	var ul2lis=document.querySelectorAll("#menu-2>ul>li");
	var lis=document.querySelectorAll("#g-fix-menu>li");
	var uls=document.querySelectorAll("#g-fix-menu>li>ul");
	ul1.style.top=ul1lis.length*(-40)+"px";
	ul2.style.top=ul2lis.length*(-40)+"px";
	lis[0].onclick=function(){
		ul1.style.display="none";
		ul2.style.display="none";
	}
	lis[2].onclick=function(){
		ul1.style.display="none";
		ul2.style.display="none";
	}	
	menu1.onclick=function(){
		ul2.style.display="none";
		ul1.style.display=(ul1.style.display=="block")?"none":"block";
	}
	menu2.onclick=function(){
		ul2.style.display=(ul2.style.display=="block")?"none":"block";
		ul1.style.display="none";
	}	
})();

/*returnTop*/
$("#returnTop").click(function () {
        var speed=200;//滑动的速度
        $('body,html').animate({ scrollTop: 0 }, speed);
        return false;
 });