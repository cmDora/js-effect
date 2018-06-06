;window.onload = function(){
    var box = document.getElementById("box"),
        imgs = box.getElementsByTagName("img"),
        left = document.getElementById("left"),
        right = document.getElementById("right"),
        p = document.getElementById("p"),
        em = p.getElementsByTagName("em"),
        main = document.getElementById("main");


    var count = 0;//指的是图片的下标
    var timer = null;
    left.onclick = function(){
        changeCount(true);
    }
    right.onclick = function(){
        changeCount(false);
    }

    timer = setInterval(changeCount,1000);

    main.onmouseover = function(){
        clearInterval(timer);
    }
    main.onmouseout = function(){
        timer = setInterval(changeCount,1000);
    }

    for(let i = 0;i < em.length;i++){
        em[i].onmouseover = function(){
            count = i;
            changeImg();
        }
    }

    function changeCount(flag){
        if(flag){
            count--;
            if(count < 0) count = imgs.length - 1;
            changeImg();
        }else{
            count++;
            if(count >= imgs.length) count = 0;
            changeImg();
        }
    }

    function changeImg(){
        for(var i = 0;i < imgs.length;i++){
            imgs[i].style.display = "none";
            em[i].className = "";
        }
        imgs[count].style.display = "block";
        em[count].className = "active";
    }

}