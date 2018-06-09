/*
 * jQuery roller plugin
 * Version 1.0.1 (7/17/2014)
 * Content:滚轮效果
 * Author:zhaoming@xinnet.com
 *style{.banner_roller{width: 100%; overflow: hidden;height: 40px;}
 *      .banner_roller ul li{width: 100%; height: 38px;}
 *}
 */
 (function($){
 	$.fn.extend({
            roller:function(opt,callback){
                    if(!opt) var opt={};
                    var _btnUp = $("#"+ opt.up);
                    var _btnDown = $("#"+ opt.down);
                    var timerID;
                    var _this=this.eq(0).find("ul:first");
                    var lineH=_this.find("li:first").height(),
                        line=opt.line?parseInt(opt.line,10):parseInt(this.height()/lineH,10),
                        speed=opt.speed?parseInt(opt.speed,10):500;
                        timer=opt.timer,
                        hovers=opt.hovers;
                    if(line==0) line=1;
                    var upHeight=0-line*lineH;
                    var rollerUp=function(){
                            _btnUp.unbind("click",rollerUp);
                            _this.animate({
                                    marginTop:upHeight
                            },speed,function(){
                                    for(i=1;i<=line;i++){
                                            _this.find("li:first").appendTo(_this);
                                    }
                                    _this.css({marginTop:0});
                                    _btnUp.bind("click",rollerUp);
                            });
                    }
                    var rollerDown=function(){
                            _btnDown.unbind("click",rollerDown);
                            for(i=1;i<=line;i++){
                                    _this.find("li:last").show().prependTo(_this);
                            }
                            _this.css({marginTop:upHeight});
                            _this.animate({
                                    marginTop:0
                            },speed,function(){
                                    _btnDown.bind("click",rollerDown);
                            });
                    }
                    var autoPlay = function(){
                            if(timer)timerID = window.setInterval(rollerUp,timer);
                    };
                    var autoStop = function(){
                            if(timer)window.clearInterval(timerID);
                    };
                    if(hovers==true){
                        _this.hover(autoStop,autoPlay).mouseout();
                    }else{
                        autoPlay();
                    }
                    
                    _btnUp.css("cursor","pointer").click( rollerUp ).hover(autoStop,autoPlay);
                    _btnDown.css("cursor","pointer").click( rollerDown ).hover(autoStop,autoPlay);
            }      
        });
 })(jQuery);

 /*
 * jQuery hover delay(setTimeout/clearTimeout) plugin
 * Version 1.0.1 (22/05/2015)
 *
 * Author:zhaoming
 *USAGE:
 *  
 */
(function($) {
    $.fn.hoverDelay = function(options) {
        var defaults = {
            hoverDuring : 200, /*经过延迟时间*/
            outDuring : 200,  /*移出延迟时间*/
            hoverEvent : function() {   /*经过延时后的回调函数*/
                $.noop();
            },
            outEvent : function() {     /*移出延时后的回调函数*/
                $.noop();
            }
        };
        var sets = $.extend(defaults, options || {});
        var hoverTimer, outTimer,that,e;
        return $(this).each(function() {
            $(this).hover(function(event) {
                clearTimeout(outTimer);
                that = this;
                e = event;
                hoverTimer = setTimeout(function() {
                    sets.hoverEvent.call(null,that,e)
                }, sets.hoverDuring);
            }, function(event) {
                clearTimeout(hoverTimer);
                that = this;
                e = event;
                outTimer = setTimeout(function() {
                    sets.outEvent.call(null,that,e)
                }, sets.outDuring);
            });
        });
    }
})(jQuery);