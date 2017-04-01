/*
Powered by ly200.com		http://www.ly200.com
广州联雅网络科技有限公司		020-83226791
*/

var web_obj={
	musicPlayer:'',
	page_init:function(MusicPath){
		if(MusicPath!=''){
			if(!$('#header').is(':hidden')){
				$('#header li.music').show();
				$('#header li').css({width:100/($('#header li').size()-$('#header li:hidden').size())-0.001+'%'});
			}
			
			web_obj.musicPlayer=global_obj.music_player(MusicPath,$('.music a'),$('.music a'),'on');
		}
		
		$('#header_menu .search').click(function(){
			$('#header_menu').animate({top:-40},300);
		});
		
		$('#search a[name=close]').click(function(){
			$('#header_menu').animate({top:0},300);
		});
		
		$('.share span').click(function(){
			global_obj.share_layer();
			return false;
		});
		
		if(!$('#header').is(':hidden')){
			$('#header li').css({width:100/($('#header li').size()-$('#header li:hidden').size())-0.001+'%'});
		}
		$('#header li.back a').click(function(){
			history.back(-1);
		});
		if($('#global_support').size() && $('#footer_points').size()){
			$('#global_support').css('bottom', $('#footer_points').height());
		}
		if($('#sub_banner .swiper-slide').size()){
			$('#sub_banner').show();
			var swiper= new Swiper('#sub_banner',{loop:true,autoplayDisableOnInteraction:false,autoplay:3500});
		}
		$('#backtotop').hide();
		$('#backtotop').live('click',function(){
			$('body,html').animate({scrollTop:0},200);
			return false;
		});
		$(window).scroll(function(){
			if($(window).scrollTop()>20){
				$('#backtotop').fadeIn(100);
			}else{
				$('#backtotop').fadeOut(100);
			}
		});
		
		$('#footer li').css({width:100/$('#footer li').size()-0.001+'%'}).children('div').data('display', '0').click(function(){
			$('#footer dl').slideUp(100);
			if($(this).data('display')==0){
				$(this).siblings('dl').slideDown(100);
				$('#footer div').data('display', '0');
				$('#footer a, #footer div').removeClass('cur');
				$(this).addClass('cur').data('display', '1');
			}else{
				$('#footer div').data('display', '0');
				$('#footer a, #footer div').removeClass('cur');
			}
		});
		$('#footer a').each(function(){
			$(this).click(function(){
				$('#footer dl').slideUp(100);
				$('#footer div').data('display', '0');
			});
		});
		$('#footer li>a').each(function(){
			$(this).click(function(){
				$('#footer a, #footer div').removeClass('cur');
				$(this).addClass('cur');
			});
		});
	}
}