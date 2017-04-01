/*
Powered by ly200.com		http://www.ly200.com
广州联雅网络科技有限公司		020-83226791
*/

var global_obj={
	page_init:function(){
		var str=window.location.toString();
		$('a').each(function(){
			var url=$(this).attr('href');
			if(url && url.charAt(0)!='#' && url.indexOf('tel:')==-1 && url.indexOf('javascript:')==-1 && url.indexOf('mailto:')==-1 && url.indexOf('baidu')==-1 && url.indexOf('wxref=mp.weixin.qq.com')==-1 && window.location.href.indexOf('api.')==-1){
				/*if(url.charAt(url.length-1)=='/' || url.indexOf('?')==-1){
					$(this).attr('href', url+'?wxref=mp.weixin.qq.com');
				}else{
					$(this).attr('href', url+'&wxref=mp.weixin.qq.com');
				}*/
			}
		});
		(typeof(window.PG.share)!='undefined' || typeof(window.PG.title)!='undefined') && (document.title=window.PG.title?window.PG.title:window.PG.share.title);
		
		if(window.PG.js_sdk){
			var jsApiList=['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'startRecord', 'stopRecord', 'onVoiceRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice', 'onVoicePlayEnd', 'uploadVoice', 'downloadVoice', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'translateVoice', 'getNetworkType', 'openLocation', 'getLocation', 'hideOptionMenu', 'showOptionMenu', 'hideMenuItems', 'showMenuItems', 'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem', 'closeWindow', 'scanQRCode' ,'addCard'];
			/*if(window.PG.url_pre_module.indexOf('red_pack')!=-1){
				jsApiList=['onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'startRecord', 'stopRecord', 'onVoiceRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice', 'onVoicePlayEnd', 'uploadVoice', 'downloadVoice', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'translateVoice', 'getNetworkType', 'openLocation', 'getLocation', 'hideOptionMenu', 'showOptionMenu', 'hideMenuItems', 'showMenuItems', 'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem', 'closeWindow', 'scanQRCode'];
			}*/
			$(window).load(function(){
				wx.config({
					//debug: window.PG.member_id==19508?true:false,
					appId:window.PG.js_sdk.appId,
					timestamp:window.PG.js_sdk.timestamp,
					nonceStr:window.PG.js_sdk.nonceStr,
					signature:window.PG.js_sdk.signature,
					jsApiList:jsApiList
				});
				wx.ready(function(){
					typeof(window.PG.share)!='undefined' && global_obj.share_init(window.PG.share);	
				});
			});
		}
	},
	
	share_init:function(share){
		
		if(typeof(share.img_url)=='undefined' || !share.img_url){
			if(window.PG.cover){
				share.img_url=window.PG.cover;
			}else{
				share.img_url=system_obj.domain('static')+'/api/images/global/share/'+window.PG.page[1]+'.jpg';
			}
		}
		(typeof(share.link)=='undefined' || !share.link) && (share.link=window.location.href);
		(typeof(share.title)=='undefined' || !share.title) && (share.title=document.title);
		(typeof(share.desc)=='undefined' || !share.desc) && (share.desc=share.title);
		(typeof(share.trans)=='undefined' || !share.trans) && (share.trans=1);
			
		var share_res=function(share_to){
			share.share_to=share_to;
			share.do_action='action.share';
			$.post('./', share);
			if(str.indexOf('7231634c2a') != -1){
				alert('分享成功');
			}
		}
		var url_filter=function(url){
			if(url.indexOf('?')!=-1){
				var aParams=url.substr(url.indexOf('?')+1).split('&');
				var url=url.substr(0, url.indexOf('?'));
				var reqstr='';
				var argumentslen=arguments.length;
				var argumentstr='&';
				if(argumentslen>1){
					for(var i=1; i<argumentslen; i++){
						argumentstr+=arguments[i].toString()+'&';
					}
				}
				for(i=0; i<aParams.length; i++){
					var aParam=aParams[i].split('=');
					if(aParam[0]!='' && argumentstr.indexOf('&'+aParam[0]+'&')<0){
						reqstr+=aParam[0]+'='+aParam[1]+'&';
					}
				}
				url=url+'?';
				url=reqstr.lastIndexOf('&')>0?url+reqstr.substring(0, reqstr.length-1):url;
				url=url+'&Share=1';
				return url;
			}else{
				return url+'?Share=1';
			}
		}
		
		share.link=url_filter(share.link, 'OpenId', 'Share','state');
		var appmessage_share={
			imgUrl:share.img_url,
			link:share.link,
			title:share.title,
			desc:share.desc,
			success:function(){share_res(0);}
		}
		var timeline_share={
			imgUrl:share.img_url,
			link:share.link,
			title:share.trans?share.desc:share.title,
			desc:share.trans?share.title:share.desc,
			success:function(){share_res(1);}
		}
		wx.onMenuShareTimeline(timeline_share);
		wx.onMenuShareAppMessage(appmessage_share);
	},
	
	share_layer:function(remove){
		if(!window.PG.devices) return;
		if(remove==1){
			$('#global_share_layer').remove();
			return;
		}
		$('body').prepend('<div id="global_share_layer"><div></div></div>');
		$('#global_share_layer').css({
			width:'100%',
			height:'100%',
			overflow:'hidden',
			position:'fixed',
			top:0,
			left:0,
			background:'#000',
			opacity:1,
			'z-index':100000
		}).children('div').css({
			width:'100%',
			height:'100%',
			background:'url('+system_obj.domain('static')+'/api/images/global/share/layer.png) left top no-repeat',
			'background-size':'100% auto',
			position:'relative',
			left:0,
			top:0
		});
		$('#global_share_layer').click(function(){
			$('#global_share_layer').remove();
		});
	},
	
	attention_layer:function(remove,keyword){//提示用户关注我们
		if(window.PG.devices != 1){
			return;
		}
		var jump=window.location.href.toString();
		if(keyword.indexOf('|')>-1){
			var re = new RegExp("|","g");
			var arr = keyword.match(re);
			for(var i=0;i<arr.length;i++){
				keyword=keyword.replace('|','&nbsp;');
			}
		}
		if(remove==1){
			$('#global_share_layer').remove();
			return;
		}
		$('body').prepend('<div id="global_share_layer"><div></div></div>');
        var qrcode = system_obj.domain('static')+'/api/images/global/share/light.png';
		$('#global_share_layer').css({
			width:'100%',
			height:'100%',
			overflow:'hidden',
			position:'fixed',
			top:0,
			left:0,
			background:'#000',
			opacity:0.8,
			'z-index':100000
		}).children('div').css({
			width:'100%',
			height:'100%',
			background:'url('+qrcode+') center 15% no-repeat',
			'background-size':'40% auto',
			position:'relative',
			left:0,
            'text-align' : 'center',
			color:'#fff',
			top:0
		});

		var str = '';
		str += '<div style="position:absolute;width:100%;text-align:center;font-size:20px;top:40%;">粉丝专享</div>';
		str += '<div style="position:absolute;width:90%;left:50%;margin-left:-45%;text-align:left;line-height:22px;top:46%;">*请在微信“通讯录”里，“公众号”分类里点击右上角添加按钮，搜索微信号（长按可复制微信号）</div>';
		str += '<div style="position:absolute;width:90%;left:50%;margin-left:-45%;text-align:center;line-height:22px;top:55%;"><span style="display:inline-block;padding:5px;background:#fff;color:#000;font-weight:bold; border-radius:5px;">'+window.PG.wechat_name+'</span></div>';
		if(window.PG.subscribe_link){
			str += '<div style="position:absolute;width:90%;left:50%;margin-left:-45%;text-align:left;line-height:22px;top:63%;">*点击按钮"点击这里"查看公众号信息</div>';
			str += '<div style="position:absolute;width:100%;text-align:center;top:67%;"><a href="'+(window.PG.subscribe_link?window.PG.subscribe_link:'#')+'" style="display:inline-block; width:25%;"><img src="'+system_obj.domain('static')+'/api/images/global/share/link_btn.png" width="100%"></a></div>';
		}
		str += '<div style="position:absolute;width:100%;text-align:center;top:82%;font-size:16px;">粉丝发送关键字“<span style="color:#f00;">'+keyword+'</span>”<br>即可进入活动</div>';	
		$('#global_share_layer div').html(str);
		
		$('#global_share_layer').click(function(){
			$('#global_share_layer').remove();
		});
	},
	
	win_alert:function(tips, handle){
		$('body').prepend('<div id="global_win_alert"><div>'+tips+'</div><h1>好</h1></div>');
		$('#global_win_alert').css({
			position:'fixed',
			left:$(window).width()/2-125,
			top:'30%',
			background:'#fff',
			border:'1px solid #ccc',
			opacity:0.95,
			width:250,
			'z-index':100000,
			'border-radius':'8px'
		}).children('div').css({
			'text-align':'center',
			padding:'30px 10px',
			'font-size':16
		}).siblings('h1').css({
			height:40,
			'line-height':'40px',
			'text-align':'center',
			'border-top':'1px solid #ddd',
			'font-weight':'bold',
			'font-size':20
		});
		$('#global_win_alert h1').click(function(){
			$('#global_win_alert').remove();
		});
		if($.isFunction(handle)){
			$('#global_win_alert h1').click(handle);
		}
	},
	
	win_confirm:function(tips, handle, breakdo){
		if(!$.isFunction(handle)) return;
		var func=handle;
		if(typeof(breakdo)=='undefined' || breakdo==0){
			$('body').prepend('<div id="global_win_alert"><div>'+tips+'</div><h2><b>确定</b><b>取消</b></h2></div>');
			$('#global_win_alert').css({
				position:'fixed',
				left:$(window).width()/2-125,
				top:'30%',
				background:'#fff',
				border:'1px solid #ccc',
				opacity:0.95,
				width:250,
				'z-index':100000,
				'border-radius':'8px'
			}).children('div').css({
				'text-align':'center',
				padding:'30px 10px',
				'font-size':16
			}).siblings('h2').css({
				height:40,
				'line-height':'40px',
				'text-align':'center',
				'border-top':'1px solid #ddd',
				'font-size':20
			}).children('b').css({
				'width':'50%',
				'display':'inline-block'
			});
			$('#global_win_alert h2 b').click(function(){
				$('#global_win_alert').remove();
			});
			if($.isFunction(handle)){
				$('#global_win_alert h2 b:eq(0)').click(handle);
			}
		}else{
			func();
		}
	},
	
	message:function(data){
		if($("#message").size()){$("#message").remove();}
		var msg=data.msg;
		var url=data.url?data.url:'';
		var time=data.time?data.time:300;
		var bgcolor=data.bgcolor?data.bgcolor:'#5fbda7';
		var color=data.color?data.color:'#fff';
		var callback=data.callback?data.callback:'';
		var timer='';
		clearTimeout(timer);
		$('body').append('<div id="message">'+msg+'</div>');
		$('#message').css({'background-color':bgcolor,'width':'220px','padding':'20px 10px','position':'fixed','top':'0','left':(($(window).width()-240)/2),'color':color,'min-height':'10px','text-align':'center','text-shadow':'none','border-radius':'5px','zIndex':'100003'});
		$('#message').animate({top:150},time,function(){
			timer=setTimeout(function(){$("#message").remove()},3000);
			if(typeof(callback) =='function') callback();
			if(typeof(url) !='undefined' && url) window.location=url;
		});
	},
	loading:function(){
		if($('#loading').size()){
			$('#loading').remove();		
		}else{
			$('body').append('<div id="loading">加载中...</div>');
			$('#loading').css({'height':50,'line-height':'50px','text-align':'center'});
		}
	},
	get_sms:function(obj, do_action, phone_obj, tips){
		obj.off().click(function(){
			phone_obj.removeAttr('style');
			if(!phone_obj.val()){
				phone_obj.css('border', '1px solid red');
				phone_obj.focus();
				return false;
			}
			if(!system_obj.check_form('', $('*[format]'))){
				var self=$(this)
				self.attr('disabled', true);
				$.get('./?do_action='+do_action+'&MobilePhone='+phone_obj.val(),function(data){
					if(data.ret==1){
						var timer=setInterval('time_obj()', 1000);
						var value=obj.val();
						var time=0;
						time_obj=function(){
							if(time>=60){
								obj.val(value).attr('disabled', false);
								time=0;
								clearInterval(timer);
							}else{
								obj.val(tips+'('+(60-time)+')');
								time++;
							}
						}	
					}else{
						global_obj.win_alert(data.msg);
						self.attr('disabled', false);
					}
				},'json');
			}
		});
	},
	music_player:function(music_path,trigger,box,class_name){
			if(music_path=='') return;
			audio_player = document.createElement('audio');
			audio_player.loop = true;
			audio_player.controls = false;
			audio_player.id = 'audio';
			audio_player.src = music_path;
			audio_player.style.display='none';
			audio_player.autoplay = true;
			audio_player.isLoadedmetadata = false;
			audio_player.touchstart = true;
			audio_player.audio = true;
			box=(typeof(box)=='object')?box:$('body');
			box.append(audio_player);

			var inplay=0; 
			var player=function(){
				if(inplay==0){
					audio_player.play();
					inplay=1;
				}else{
					audio_player.pause();
					inplay=0;
				}
			}
			if(typeof(trigger)=='object'){
				trigger.click(function(){
					player();
					if(class_name){
						if(inplay){
							$(this).addClass(class_name);
						}else{
							$(this).removeClass(class_name);
						}
					}
				});	
			}
			
			document.addEventListener("WeixinJSBridgeReady", function(){
				WeixinJSBridge.invoke('getNetworkType', {}, function (e){player();});
			}, false);
		return 	audio_player;
	},
	upload_images:function(obj,onSuccess){
		var i=0,m=0,localIds='';
		var imageCount=function(){
			if(i>files_count){
				$(obj+' [name=add]').hide();
				return;
			}else{ $(obj+' [name=add]').show();}	
		}
		var uploadImage=function(){
			if(localIds.length<=0){
				alert('你还没有上传图片');
				return;
			}
			wx.uploadImage({localId:localIds[m],success:function(res){
				if($.isFunction(onSuccess)){
					res.localIds=localIds[m];
					onSuccess(res);	
				}else{
					$('<div class="items del" name="del"><span></span><img src="'+localIds[m]+'" /><input type="hidden" name="ServerId[]" value="'+res.serverId+'"/></div>').insertBefore(obj+' [name=add]');
					$(obj+' [name=del]').off('click').on('click',function(){
						$(this).remove();
						i--;
						imageCount();
					});
					i++;
					m++;
					imageCount();
					if(m<localIds.length && i<=files_count){uploadImage();}
				}
			}});
		}
		var chooseImage=function(){
			wx.ready(function(){
				wx.chooseImage({
					success: function(res){
						m=0;
						localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
						uploadImage();
					}
				});
			});	
		}
		$(obj+' [name=add]').click(function(){
			chooseImage();
		});
		files_count=$(obj).find('input[name=ImgsQty]').val()-1;
	},
	mobiscroll_opt:{
		theme: 'jqm', //皮肤样式
		display: 'modal', //显示方式 
		mode: 'scroller', //日期选择模式
		dateFormat: 'yy-mm-dd', // 日期格式
		setText: '确定', //确认按钮名称
		cancelText: '取消',//取消按钮名籍我
		dateOrder: 'yymmdd', //面板中日期排列格式
		secText: '秒',
		dayText: '日', monthText: '月', yearText: '年',hourText:'时',minuteText:'分', //面板中年月日文字
		startYear:new Date().getFullYear(), //结束年份
		endYear:new Date().getFullYear()+1, //结束年份
		startHour:new Date().getHours(), //结束年份
		endHour:new Date().getHours()+9, //结束年份
		timeFormat:'HH:ii',
		timeWheels: 'HHii'
	},
	get_location:function(CallBack){
		navigator.geolocation.getCurrentPosition(function(){
			var geolocation=new BMap.Geolocation();
			geolocation.getCurrentPosition(function(pos){
				if(this.getStatus()==BMAP_STATUS_SUCCESS){
					CallBack(pos);
				}
			});
		}, function(err){global_obj.geolocation_err_tips(err)}, {enableHighAcuracy:true, maximumAge:0, timeout:5000});	
	},
	waiting:function(){
		system_obj.div_mask();
		if($('#global_waiting').size()){
			$('#global_waiting').remove();
		}else{
			var html='<ul id="global_waiting"><li></li><li></li><li></li><li></li><li></li><li></li></ul>';
			$('body').append(html);
			left=($(window).width()-45)/2;
			$('#global_waiting').css({'left':left+'px','top':'150px'});
			
		}
		
	},
	payment_init:function(){
		payment_update();
		$('#payment .pay').click(function(){
			if($(this).hasClass('notpay')){
				global_obj.win_alert('余额不足，清选择其他支付方式');
				return;	
			}
			$('#payment .pay .btn').removeClass('select');
			$(this).children('.btn').addClass('select');
			payment_update();
		});
		function payment_update(){
			var cur = $('#payment .pay .select');
			$('#payment input[name=PaymentMethod]').val(cur.prev().find('label').text());
			if(cur.nextAll('.info').size()){
				$('#payment .pay .info').show();
			}else{
				$('#payment .pay .info').hide();
			}
		}
		$('#payment_form .footer input[name=submit]').click(function(){
			$(this).attr('disabled', true);
			$.post('./', $('#payment_form').serialize(), function(data){
				if(data.ret==1){
					window.location=data.msg;
				}else{
					global_obj.win_alert(data.msg);
				}
			},'json');
		});
	},
    set_stores:function(data,do_action){ //生成门店列表
        if(!data || !do_action){
            return
        }
        var stores_json = JSON.parse(data);
        var oDiv=document.createElement('div');
        var oContent=document.createElement('div');
        var html='<div style="width: 94%;border-bottom: 1px dotted #ccc;height: 30px;line-height: 30px; -webkit-box-sizing: border-box; margin: 0 auto;"><strong>门店选择</strong></div>';

        for(k in stores_json){
            html += '<div class="store_name" SId="'+k+'" style="width: 94%; border-bottom: 1px dotted #ccc; height: 30px; line-height: 30px; -webkit-box-sizing: border-box; padding-left: 5%; margin: 0 auto;">'+stores_json[k]+'</div>';
        }
        html += '<div class="store_close" style="width: 94%;  height: 30px; border-bottom: 1px dotted #ccc; line-height: 30px; -webkit-box-sizing: border-box; margin: 0 auto; padding-left: 5%;">关闭门店选择</div>';
        $(oContent).css({width:'60%',height:'260',background:'#fff','position':'absolute','left':'50%','margin-left':'-30%','top':'30%','border-radius':'5px','overflow-y':'auto'});
        $(oDiv).css({'left':0,'top':0,'bottom':0,'right':0,'position':'fixed','z-index':9999,'background':'rgba(0,0,0,0.6)'});
        $(oContent).append(html);
        $(oDiv).append(oContent);
        $('body').append(oDiv);
        $('.store_close').click(function(){
            $(oDiv).remove();
        });
        $('.store_name').click(function(){
            var SId=$(this).attr('SId');
            $.post('./',{
                'do_action' : do_action,
                'SId'       : SId
            },function(data){
                if(data.ret==1){
                    $(oDiv).remove();
                }
            },'json');
        });
    },
	waterfall:function(obj,config){
		var defaults = [];
		defaults['container'] = '.container';	//容器
		defaults['spacing']	  = 10;				//间距
			
		if(config){
			$.each(config,function(name,value){
				defaults[name]=value;
			});
		}
		var get_min_col_index = function(col_min_height){
			for(var i=0;i<col_height.length;i++){
				if(col_height[i]==col_min_height) return i;
			}
		}
		var get_col_num = function(){
			var col_num = Math.floor(obj.width()/box_width);
			
			var col_spa_num = Math.floor(obj.width()/container.width());
			return (container.width()+spacing)*col_spa_num-spacing > obj.width() ? col_num : col_spa_num;
		}
		var obj = $(obj);
		var container = obj.find(defaults['container']);
		var spacing = defaults['spacing'];
		var reg = new RegExp('%');
		if(reg.test(spacing)) spacing = obj.width()*spacing.substring(0,spacing.length-1)/100;
		var box_width = container.width()+spacing;
		var col_number = get_col_num();
		var col_height = [];
		container.each(function(i){
			var box_height = $(this).height()+spacing;
			var col_min_height = i < col_number ? 0 : Math.min.apply(null,col_height);
			var col_min_index = i < col_number ? i : get_min_col_index(col_min_height);
			$(this).css({'position':'absolute','left':col_min_index*box_width,'top':col_height[col_min_index],'margin':0,'padding':0,'float':'none'});
			col_height[col_min_index] = col_height[col_min_index] ? col_height[col_min_index] + box_height : box_height;
		});
		col_max_height = Math.max.apply(null,col_height);
		obj.height(col_max_height);
	},
	images_view:function(url){
		system_obj.div_mask();
		$('body').append('<div class="global_images_view"><img src="'+url+'" /><span></span></div>');
		$('.global_images_view').css({'width':$(window).width(),'height':$(window).height(),'position':'fixed','top':0,'left':0,'z-index':'10001','text-align':'center'});
		$('.global_images_view img').css({'max-width':'100%','max-height':'100%','vertical-align':'middle'});
		$('.global_images_view span').css({'display':'inline-block','height':'100%','vertical-align':'middle'});
		$('.global_images_view').off('click').on('click',function(){
			$(this).remove();
			system_obj.div_mask();
		});
	}
}