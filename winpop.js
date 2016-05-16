/**
 * Created by bai on 2016/5/16.
 */
(function(window,jQuery,undefined){
    var htmls={
        ovl:'<div class="winpop-mask" id="winpop-mask"></div><div class="winpop-box" id="winpop-box"><div class="winpop-main"></div><div class="winpop-btns"></div> </div>',
        alert:'<input type="button" class="pop-btn alert-btn" value="确定">',
        confirm:'<input type="button" class="pop-btn confirm-true" value="确定"><input type="button" class="pop-btn confirm-false" value="取消">'
    };
    function Winpop(){
        var config={};
        this.get=function(n)
        {
            return config[n];
        };
        this.set=function(n,v)
        {
            config[n]=v;
        };
        this.init();
    }
    Winpop.prototype={
        init:function(){
            this.createDom();
            this.bindEvent();
        },
        createDom:function(){
            var body=jQuery("body"),ovl=jQuery("#winpop-box");
            if(ovl.length==0)
            {
                body.append(htmls.ovl);
            }
            this.set("ovl",jQuery("#winpop-box"));
            this.set("mask",jQuery("#winpop-mask"));
        },
        bindEvent:function(){
            var _this=this,
                ovl=this.get("ovl"),
                mask=this.get("mask");
            ovl.on("click",".alert-btn",function(e){
                _this.hide();
            });
            ovl.on("click",".confirm-true",function(e){
                var cb=_this.get("confirmBack");
                _this.hide();
                cb&&cb(true);
            });
            ovl.on("click",".confirm-false",function(e){
                var cb=_this.get("confirmBack");
                _this.hide();
                cb&&cb(false);
            });
            mask.on("click",function(e){
                _this.hide();
            })
            jQuery(document).on("keyup",function(e){
                var kc= e.keyCode;
                if(kc==27)
                {
                    _this.hide();
                }
                else if(kc==13)
                {
                    if(_this.get("type")=="confirm")
                    {
                        var cb=_this.get("confirmBack");
                        _this.hide();
                        cb&&cb(true);
                    }
                    else{
                        if(_this.get("type")=="alert")
                        {
                            _this.hide();
                        }
                    }
                }
            });
        },
        alert:function(str,btnstr){
            var str=typeof str==='string'?str:str.toString(),
                ovl=this.get("ovl");
            this.set("type","alert");
            ovl.find(".winpop-main").html(str);
            if(typeof btnstr=='undefined')
            {
                ovl.find(".winpop-btns").html(htmls.alert);
            }
            else
            {
                ovl.find(".winpop-btns").html(btnstr);
            }
            this.show();
        },
        confirm:function(str,callback){
            var str=typeof str==='string'?str:str.toString(),
                ovl=this.get("ovl");
            this.set("type","confirm");
            ovl.find(".winpop-main").html(str);
            ovl.find(".winpop-btns").html(htmls.confirm);
            this.set("confirmBack", (callback || function() {}));
            this.show();
        },
        show:function(){
            this.get("ovl").show();
            this.get("mask").show();
        },
        hide:function(){
            var ovl=this.get("ovl");
            ovl.find(".winpop-main").html("");
            ovl.find(".winpop-btns").html("");
            ovl.hide();
            this.get("mask").hide();
        },
        destory:function(){
            this.get("ovl").remove();
            this.get("mask").remove();
            delete window.alert;
            delete window.confirm;
        }
    };
    var obj=new Winpop();
    window.alert=function(str){
        obj.alert.call(obj,str);
    };
    window.confirm=function(str,cb)
    {
        obj.confirm.call(obj,str,cb);
    }
})(window,jQuery);