/*
 *点击index.html中的图片
 * 例如孕前准备。
 * 往#iscroll_r盒子中添加数据
 * 数据来源（data.js中）
 * 数据必须对应
 * 例如点产前准备，出现的是产前准备的title(标题)即可
 * 
 * */
 
 /*var home = document.getElementById("home"),
 	 a = home.getElementsByTagName("a");

 var iscroll = document.getElementById("iscroll_r");
 for(var i=0; i<a.length; i++){
 	a[i].onclick = function(){
 		for(var i=0; i<data[this.id].fenlei.length; i++){
 				iscroll.innerHTML += `<a href=""><dl><dt>
 				<img src="img/tu/${data[this.id].fenlei[i].img}"></dt>
				<dd><p>${data[this.id].fenlei[i].title}</p></dd></dl></a>`;
 		}
 	}
 }*/

 var home = document.getElementById("home"),
 	 oA = home.getElementsByTagName("a"),
 	 iscroll = document.getElementById("iscroll_r");

 for(var i=0; i<oA.length; i++){

	oA[i].onclick = function(){
		for(var i=0; i<data[this.id].fenlei.length; i++){
			iscroll.innerHTML += `<a href=""><dl><dt> 
			<img src="img/tu/${data[this.id].fenlei[i].img}">数据img</dt>
		<dd><p>${data[this.id].fenlei[i].title}</p></dd></dl></a>`;
		}
		
	}
 }