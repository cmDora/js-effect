var settings = {userArray : [
    {"name" : "小张","avatar":"imgs/1.jpg"},
    {"name" : "小李","avatar":"imgs/2.jpg"},
    {"name" : "小王","avatar":"imgs/3.jpg"},
    {"name" : "小美","avatar":"imgs/4.jpg"},
    {"name" : "小苏","avatar":"imgs/5.jpg"},
    {"name" : "大大","avatar":"imgs/6.jpg"}
    ]}

    function Choose(obj){
        this.obj = obj;
        this.init();
        this.bind();
    }
    Choose.prototype = {
        constructor:Choose,
        init:function(){
            this.btn_play = document.getElementById('btn_play');
            this.tv_wen = document.getElementById('tv_wen');
            this.btn_stop = document.getElementById('btn_stop');
            this.drawnBox = document.getElementById('drawnBox');
            this.timer = null;
        },
        bind:function(){
            var that = this;
            this.btn_play.onclick = function(){
                that.btn_stop.style.display = 'block';
                that.btn_play.style.display = 'none';
                clearInterval(that.timer);
                that.timer = setInterval(function(){
                        that.tv_wen.innerHTML = that.obj.userArray[that.getRandom()].name;
                },1000)
            }
            this.btn_stop.onclick = function(){
                that.btn_stop.style.display = 'none';
                that.btn_play.style.display = 'block';
                clearInterval(that.timer);
                var str = that.tv_wen.innerHTML;
                for(var i=0;i<that.obj.userArray.length;i++){
                    if(that.obj.userArray[i].name == str){
                        that.drawnBox.innerHTML = '';
                        that.drawnBox.style.display = 'block';
                        that.drawnBox.innerHTML = `<img src=${that.obj.userArray[i].avatar}><p>恭喜:${str}同学</p><b>&times</b>`;
                        var x = document.querySelectorAll('#drawnBox b')[0];
                        x.onclick = function(){
                            that.drawnBox.style.display = 'none';
                        }
                        that.obj.userArray.splice(i,1);
                    }
                }
                setTimeout(function(){
                    that.drawnBox.style.display = 'none';
                    that.tv_wen.innerHTML = '中奖姓名';
                },3000)
            }
        },
        getRandom:function(){
            var num = Math.floor(Math.random()*this.obj.userArray.length);
            return num;
        }
    }
    new Choose(settings);