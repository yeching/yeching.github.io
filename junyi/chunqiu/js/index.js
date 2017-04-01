/*
Powered by ly200.com		http://www.ly200.com
广州联雅网络科技有限公司		020-83226791
*/

var index_obj={
	index_init:function(){
		
		for(i=0; i<web_skin_data.length; i++){
			var obj=$("#web_skin_index div").filter('[rel=edit-'+web_skin_data[i]['Postion']+']');
			if(web_skin_data[i]['ContentsType']==1){
				var dataImg=eval("("+web_skin_data[i]['ImgPath']+")");
				var dataUrl=eval("("+web_skin_data[i]['Url']+")");
				var dataTitle=eval("("+web_skin_data[i]['Title']+")");
				var _banner='<div class="swiper-container"><div class="swiper-wrapper">';
				
				for(var k=0; k<dataImg.length; k++){
					var s=dataImg[k].indexOf('/api/')!=-1?system_obj.domain('static'):'';
					var r=1;//Math.random();
					if(web_skin_data[i]['NeedLink']==1){
						if(dataUrl[k] && dataUrl[k].indexOf('tel:')==-1 && dataUrl[k].indexOf('javascript:')==-1 && dataUrl[k].indexOf('wxref=mp.weixin.qq.com')==-1 && dataUrl[k].indexOf('#')==-1 && window.location.href.indexOf('api.')==-1 && dataUrl[k].indexOf('#')>-1){
							if(dataUrl[k].charAt(dataUrl[k].length-1)=='/' || dataUrl[k].indexOf('?')==-1){
								dataUrl[k]=dataUrl[k]+'?wxref=mp.weixin.qq.com';
							}else{
								dataUrl[k]=dataUrl[k]+'&wxref=mp.weixin.qq.com';
							}
						}
						_banner=_banner+'<div class="swiper-slide"><a href="'+dataUrl[k]+'"><img src="'+s+dataImg[k]+'?n='+r+'" alt="'+dataTitle[k]+'" /></a></div>';
					}else{
						_banner=_banner+'<div class="swiper-slide"><img src="'+s+dataImg[k]+'?n='+r+'" alt="'+dataTitle[k]+'" /></div>';
					}
				}
				var _banner=_banner+'</div></div>';
				obj.find('.img').html(_banner);
				if(dataImg.length>1){
					var swiper= new Swiper('.swiper-container',{loop:true,autoplayDisableOnInteraction:false,autoplay:3500});
				}
			}else{
				var _Url='', s='';
				if(web_skin_data[i]['NeedLink']==1){
					_Url=web_skin_data[i]['Url']?web_skin_data[i]['Url']:'';
					if(_Url && _Url.indexOf('tel:')==-1 && _Url.indexOf('javascript:')==-1 && _Url.indexOf('wxref=mp.weixin.qq.com')==-1 && _Url.indexOf('#')==-1 && _Url.indexOf('api.')==-1 &&  window.location.href.indexOf('api.')==-1 && _Url.indexOf('ptweixin')>-1){
						if(_Url.charAt(_Url.length-1)=='/' || _Url.indexOf('?')==-1){
							_Url=_Url+'?wxref=mp.weixin.qq.com';
						}else{
							_Url=_Url+'&wxref=mp.weixin.qq.com';
						}
					}
				}
				var s=web_skin_data[i]['ImgPath'].indexOf('/api/')!=-1?system_obj.domain('static'):'';
				var _Img=_Url?'<a href="'+_Url+'"><img src="'+s+web_skin_data[i]['ImgPath']+'" /></a>':'<img src="'+s+web_skin_data[i]['ImgPath']+'" />';
				var _Title=_Url?'<a href="'+_Url+'">'+web_skin_data[i]['Title']+'</a>':web_skin_data[i]['Title'];
				obj.find('.img').html(_Img);
				obj.find('.text').html(_Title);
			}
		}
		
		if(typeof(skin_index_init)!='undefined' && $.isFunction(skin_index_init)){
			skin_index_init();	//风格的首页如果有JS，需全部写入本函数，如果直接写在index.php文件，在后台管理首页广告图片时，会把不必要的JS也执行了
			if($('#header').css('display')=='none' && $('#header li.music').size()){
				$('body').append('<div id="MusicControl" class="on"></div>');
				$('#MusicControl').click(function(){
					$(this).toggleClass("on");
					if($(this).hasClass('on')){
						web_obj.musicPlayer.play();
					}else{
						web_obj.musicPlayer.pause();
					}
					return false;
				});
			}
		}
	}
}