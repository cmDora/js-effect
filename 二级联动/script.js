function LianDong(obj,big,small){
    this.obj = obj;
    this.big = big;
    this.small = small;
    this.init();

    this.bindEvent();
}
LianDong.prototype = {
    constructor:LianDong,
    init:function(){

        this.area = document.getElementById(this.big);
        this.street = document.getElementById(this.small);
    },
    bindEvent:function(){
        this.addArea();
        this.addStreet();
    },
    addArea:function(){
        for(var k in this.obj){
            if(k=='localArea'){
                for(var i=0;i<this.obj[k].length;i++){
                    this.area.add(new Option(this.obj[k][i].name));
                }
            }
        }
    },
    addStreet:function(){
        var that = this;
        this.area.onchange = function(){
            that.index = this.selectedIndex;
            that.street.innerHTML = '';
            for(i=0;i<that.obj['localArea'][that.index].option.length;i++){
                that.street.add(new Option(that.obj['localArea'][that.index].option[i].name))
            }
        }
    }
}