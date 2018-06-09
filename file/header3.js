$(function(){
	var hv=false;
	$('.header3-nav li').hoverDelay({
		outDuring :70,
	    hoverEvent: function(that){
			var ind=$(that).index();
			$('.header3-navcontent').hide();
			$('.header3-navcontent').eq(ind).stop(true,true).slideDown(300);
			// if(ind>=0 && ind<6){
			// 	$('.header3-navcontent').hide();
			// 	hv=false;
			// 	$('.header3-navcontent').eq(ind).stop(true,true).slideDown(300);
			// }else{
			// 	$('.header3-navcontent').hide();
			// 	if(ind==7){
			// 		hv=false;
			// 		$('.header3-navcontent').eq(ind-1).stop(true,true).slideDown(300);
			// 	}
			// }	
	},
	    outEvent:function(that,e){
			var ind=$(that).index();
			// if(ind>=0 && ind<6){
			// 	if(!hv){
	  //   			$('.header3-navcontent').eq(ind).hide();
			// 	}
			// }
	    }
	});
	$('.header3-navcontent').hover(function(){
		hv=true;
		$(this).show();
		var index = $(this).index();
		$('.header3 .header3-nav li a').eq(index-1).addClass("on_hover01").siblings().removeClass("on_hover01");
	},function(){
		$(this).hide();
		$('.header3 .header3-nav li a').removeClass("on_hover01");
	});
	// $('.header3-navcontent').bind("mouseenter", function(){
	// 	var index = $(this).index();
	// 	$('.header3 .header3-nav li a').addClass("on_hover01").siblings().removeClass("on_hover01");
	// });
	// $('.header3-navcontent').bind("mouseout", function(){
	// 	var index = $(this).index();
	// 	$('.header3 .header3-nav li a').removeClass("on_hover01");
	// })
	// 滚动新闻
	try{
        $(".news-list").roller({line:1,speed:500,timer:2000,up:"",down:"",hovers:true});
    }catch(e){};
})
//页签
$(function(){

	$(".header3-navcontent .tabHead_div li").bind("mouseenter", function () {
            var index = $(this).index();
			var divs = $(this).parents(".header3-navcontent").find(".tabHead_con").children();
			$(this).addClass("on").siblings().removeClass("on");
        	divs.eq(index).show().siblings().hide();
        });
	// 云服务hover
    $(".header3-navcontent .content5 .list_tabs_02 li").bind("mouseenter", function() {
        var index2 = $(this).index();
        var yfw_divs = $(".header3-navcontent .content5 .yfw_contents > div");
        $(this).addClass("on_hover").siblings().removeClass("on_hover");
        yfw_divs.eq(index2).show().siblings().hide();
    });

    
})
// 悬浮广告 begin
$(function(){
	$('.x-tool .x-top').click(function(){
        $("html,body").animate({scrollTop:0});
    })
    $(".x-tool .x-newhd-a").hover(function(){
    	$(".x-tool .x_newHdBar").fadeIn(400);
    },function(){})
    $(".x-tool .x_newHdBar_close").click(function(){
    	$(".x-tool .x_newHdBar").fadeOut(400);
    })
})
// 悬浮广告 end

// 发展之路 begin
$(function(){
	// $('.main1-conent1').mouseover(function(){
	// 		$('.main1-on').css({"display":"block"});
	// 		$('.main1-ons').css({"display":"none"});
	// 	    $(">div",this).eq(0).css({"display":"none"});
	// 		$(">div",this).eq(1).css({"display":"block", "opacity": "0"}).animate({"opacity":"1"}, 600);
	// 		// $(">div",this).eq(1).css({"display":"block"});
	// }).mouseout(function(){
	// 		$(">div",this).eq(0).css({"display":"block"});
	// 		// $(">div",this).eq(1).css({"display":"none"});
	// 		$(">div",this).eq(1).css({"display":"none","opacity": "0"}).animate({"opacity":"1"}, 600);
	// 		$('.main1-ons').css({"display":"block"});
	// 		$('.main1-on').css({"display":"none"});
	// })
	$('.main1-conent1').hover(function(e){
			$('.main1-on').css({"display":"block"});
			$('.main1-ons').css({"display":"none"});
		    $(">div",this).eq(0).css({"display":"none"});
			$(">div",this).eq(1).css({"display":"block"}).find(".dh_div").css({"top":"300px","opacity":"0"}).stop().animate({"top":"215px","opacity": "1"}, 600);
	},function(){
			$(">div",this).eq(0).css({"display":"block"});
			$(">div",this).eq(1).css({"display":"none"});
			$('.main1-ons').css({"display":"block"}).find(".dh_div").stop().css({"top":"215px","opacity": "1"});
			$('.main1-on').css({"display":"none"});
		});
})

// 发展之路 end
// 解决方案 end
// 登录之后 begin
$(function(){
	$('.username,.userCenter').mouseover(function(){
			$('.userCenter').show();
	}).mouseout(function(){
		$('.userCenter').hide();
	})
})

// 登录之后 en








