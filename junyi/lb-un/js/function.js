window.onload=function(){
var mySwiper = new Swiper ('.swiper-container', {
	// Optional parameters
	autoplay : 5000,
	// If we need pagination
	pagination: '.swiper-pagination',
	
	effect : 'fade',
  }) 
/**
var oAs=document.querySelectorAll("#g-fix-menu>a");  
var oImgs=document.querySelectorAll("#g-fix-menu img"); 
var oSpans=document.querySelectorAll("#g-fix-menu span"); 
oImgs.forEach(function(item,index,array){
	item.addEventListener("click",function(){
		for(var i=0,len=array.length;i<len;i++){
			oImgs[i].src="img/icon/img_"+i+"jpg";
			oSpans[i].style.color="#8a8a8a";
		}
		oImgs[index].src="img/icon/img0_"+i+"jpg";
		oSpans[index].style.fontSize="#1afa29";
	},false)
})
**/
var oS=document.querySelectorAll("#sort-list>span");
var oP=document.querySelectorAll("#product-lists>div");
oS.forEach(function(item,index,array){
	item.addEventListener("click",function(){
		for(var i=0,len=array.length;i<len;i++){
			oS[i].classList.remove("sort-active");
			oP[i].style.display="";
		}
		oS[index].classList.add("sort-active");
		oP[index].style.display="flex";
	},false)
})
}	