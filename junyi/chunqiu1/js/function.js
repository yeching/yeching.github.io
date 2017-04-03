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
	var menu2=document.getElementById("menu-2");
	var ul2=document.querySelector("#menu-2>ul");	
	menu1.onclick=function(){
		ul1.style.display=(ul1.style.display=="block")?"none":"block";
		ul2.style.display="none";
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