function Drag(){
    this.init();
    this.bindEvent();
}
Drag.prototype = {
    constructor:Drag,
    init:function(){
        this.son = document.getElementById('son');
    },
    bindEvent:function(){
        this.binddown();
        this.bindup();
    },
    binddown : function(){
        var that = this;
        this.son.onmousedown = function(e){
            var e = window.event || e;
            that.left = e.clientX - that.son.offsetLeft;
            that.top = e.clientY - that.son.offsetTop;
            that.mousemove();
        }
    },
    mousemove:function(){
        var that = this;
        document.onmousemove = function(e){
            var e = window.event ||ｅ;
            var l = e.clientX - that.left;
            var t = e.clientY - that.top;
            var width = document.documentElement.clientWidth || document.body.clientWidth;
            var height = document.documentElement.clientHeight || document.body.clientHeight;
            l = Math.max(0,Math.min(l,width-that.son.offsetWidth));
            t = Math.max(0,Math.min(t,height-that.son.offsetHeight));
            that.son.style.left = l+'px';
            that.son.style.top = t+'px';
        }
    },
    bindup:function(){
        this.son.onmouseup = function(){
            document.onmousemove = null;
        }
    }
}

function AdvDrag(){
    Drag.call(this);
    this.box = document.getElementById('box');
    this.key();
}
function A(){

}
A.prototype = Drag.prototype;
AdvDrag.prototype = new A();
AdvDrag.prototype.constructor = AdvDrag;
AdvDrag.prototype.mousemove = function(){
    var that = this;
    document.onmousemove = function(e){
        var e = window.event ||ｅ;
        var l = e.clientX - that.left;
        var t = e.clientY - that.top;
        var width = document.documentElement.clientWidth || document.body.clientWidth;
        var height = document.documentElement.clientHeight || document.body.clientHeight;
        l = Math.max(0,Math.min(l,that.box.offsetWidth-that.son.offsetWidth));
        t = Math.max(0,Math.min(t,that.box.offsetHeight-that.son.offsetHeight));
        that.son.style.left = l+'px';
        that.son.style.top = t+'px';
    }
}
AdvDrag.prototype.key = function(){
    var that = this;
    document.onkeydown = function(e){
        var e = window.event || e;
        switch(e.keyCode){
            case 37:
            if(that.son.offsetLeft>0)
            that.son.style.left = that.son.offsetLeft-1+'px';
            break;
            case 38:
            if(that.son.offsetTop>0)
            that.son.style.top = that.son.offsetTop-1+'px';
            break;
            case 39:
            if(that.son.offsetLeft<that.box.offsetWidth - that.son.offsetWidth)
            that.son.style.left = that.son.offsetLeft+1+'px';
            break;
            case 40:
            if(that.son.offsetTop<that.box.offsetHeight - that.son.offsetHeight)
            that.son.style.top = that.son.offsetTop+1+'px';
            break;
        }
    }

}



