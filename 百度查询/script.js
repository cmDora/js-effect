var texts = [
{name:"中国知网"},
{name:"中信银行"},
{name:"中国银行"},
{name:"中国联通"},
{name:"中国联通网上营业厅"},
{name:"中国好声音"},
{name:"中国好歌曲"},
{name:"中国好声音第三期"}
]
function BaiDu(obj){
    this.obj = obj;
    this.init();
    this.bindEvent();
}
BaiDu.prototype = {
    constructor:BaiDu,
    init:function(){
        this.inps = document.getElementsByTagName('input')[0];
        this.uls = document.getElementsByTagName('ul')[0];
        this.num=-1;
    },
    bindEvent:function(){
        this.keyup();

    },
    keyup:function(){
        var that = this;
        this.inps.onkeyup = function(){
            var str = that.inps.value;
            that.uls.innerHTML = '';
            for(var i=0;i<that.obj.arr.length;i++){
                if(that.obj.arr[i].name.indexOf(str) != -1){
                    var oLi = document.createElement('li');
                    oLi.innerHTML = that.obj.arr[i].name;
                    that.uls.appendChild(oLi);

                }
                if(str == ''){
                    that.uls.innerHTML = '';
                }
            }

            that.num=-1;
            that.lis = that.uls.getElementsByTagName('li');
            that.mouseover();
            that.fangxiang();
        }


    },
    change:function(val){
        for(var i=0;i<this.lis.length;i++){
            this.lis[i].style.background = '';
        }
        this.lis[val].style.background = '#ccc';
    },
    mouseover:function(){
        var that = this;
        for(var i=0;i<this.lis.length;i++){
            this.lis[i].index = i;
            this.lis[i].onmouseover = function(){
                that.change(this.index);
                that.num = this.index;
            }
            this.lis[i].onclick = function(){
                that.inps.value = that.lis[this.index].innerHTML;
                that.uls.innerHTML = '';
                that.num = this.index;
            }
        }
    },
    fangxiang:function(){
        var that = this;
        document.onkeyup = function(e){
            var e = window.event || e;
            switch(e.keyCode){
                case 38 :
                    that.inps.blur();

                    that.num--;
                    if(that.num<0)
                    that.num=that.lis.length-1;
                    that.change(that.num);

                    break;
                case 40 :
                    that.inps.blur();
                    that.num++;
                    that.change(that.num);
                    that.lis = that.uls.getElementsByTagName('li');
                    if(that.num==that.lis.length-1)
                    that.num=-1;

                    break;
                case 13 :
                    that.inps.value = that.lis[that.num].innerHTML;
                    that.uls.innerHTML = '';
                    that.num = this.index;
            }
        }
    }
}