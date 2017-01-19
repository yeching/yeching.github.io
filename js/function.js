/* 
function.js
添加各种功能的脚本
*/


//回到顶部
function backtop(){
window.scrollBy(0,-10);
var scrolldelay=setTimeout('backtop()',5);
if(document.documentElement.scrollTop==0)clearTimeout(scrolldelay);
}

//加入收藏

function AddFavorite(sURL, sTitle)//第一个参数表示收藏的URL，第二个表示标题
{
    sURL = encodeURI(sURL);
    try
    {  
        window.external.addFavorite(sURL, sTitle);//IE支持的api  
    }
    catch (e)
    {  
        try
        {      
            window.sidebar.addPanel(sTitle, sURL, "");//ff支持的api      
        }
        catch (e)
        {
            //如果不支持以上两种方案，采用提示性收藏
            alert("加入收藏失败，请使用Ctrl+D进行添加,或手动在浏览器里进行设置.");          
        }      
    }

}

//设为首页

function SetHome(url)
{
    if (document.all)
    {
        document.body.style.behavior = 'url(#default#homepage)';        
        document.body.setHomePage(url);
    }
    else
    {
        alert("您好,您的浏览器不支持自动设置页面为首页功能,请您手动在浏览器里设置该页面为首页!");   
    }
}

//切换背景

lis=document.querySelectorAll("#prefer>ul>li");
lis.forEach(function(item,index){
	item.addEventListener("click",function(event){
		if(index == 0){
			document.querySelector("body").style.cssText = 'background:rgba(108,59,48,0.4);';
			document.querySelector("#descriple").style.cssText = 'background:rgba(0,0,0,.3);'+'color:#fff;';
		}
		if(index == 1){
			document.querySelector("body").style.cssText = 'background-color: #fff;';
			document.querySelector("#descriple").style.cssText = 'background-color: rgba(0,0,0,.3);'+'color:#fff;';
			
		}
		if(index == 2){
			document.querySelector("body").style.cssText = 'background-color: #000;';
			document.querySelector("#descriple").style.cssText = 'background-color: #fff;'+'color:#000;';
		}
		if(index == 3){
			document.querySelector("body").style.cssText = 'background-color: #D69393;';
			document.querySelector("#descriple").style.cssText = 'background-color: #F5F5D5;'+'color:#000;';
		}
	},false)
})