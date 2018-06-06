var oA = document.getElementsByTagName('a');
var all = getClass('all');
var arr = [];

//一进页面"全部"被选中
for(var i=0;i<all.length;i++){
	all[i].className += ' current';
}

//展开收起事件
$('btn').onclick = function(){
	var str = this.innerHTML;
	if(str == '点击收起'){
		$('box').style.display = 'none';
		this.innerHTML = '点击展开';
	}else{
		$('box').style.display = 'block';
		this.innerHTML = '点击收起';
	}
}

//一行只能点一个
for(var i=0;i<oA.length;i++){
	oA[i].onclick = function(){
		var brr = this.id;
		var idx = this.getAttribute('index');

		for(var i=0;i<count(this);i++){
			if(i != brr[1]){
				this.parentNode.getElementsByTagName('span')[0].className= '';
				document.getElementById(brr[0]+i).className = '';
			}
		}
		this.className = 'current';
		fn(this.innerHTML,idx,brr);
	}
}


//不重复放入选择中(操作数组)
function fn(value,idx,ids){	
	var str = '已选条件：';

	//点击删除
	if(value == ''){
		document.getElementById(ids).className = '';
		$(ids).parentNode.getElementsByTagName('span')[0].className = 'current';
	}

	//arr[idx] = "<a href='#' class='add' onclick=\"fn(\'\',"+idx+",\'"+ids+"\')\">"+value+"</a>"
	arr[idx] = `<a href='#' class='add' onclick="fn('','${idx}','${ids}')">${value}</a>`
	for(var i=0;i<arr.length;i++){
		if(arr[i] == undefined){
			arr[i] = '';
		}
		str += arr[i];
	}

	$('choose').innerHTML = str;

	//滑过变色
	var add = getClass('add');
	for(var i=0;i<add.length;i++){
		add[i].onmouseover = function(){
			this.className += ' color';
		}
		add[i].onmouseout = function(){
			this.className = '';
		}
	}
}


//删除全部事件
$('remove').onclick = function(){
	$('choose').innerHTML = '已选条件：';
	arr = [];
	for(var i=0;i<oA.length;i++){
		oA[i].className = '';
	}
	for(var i=0;i<all.length;i++){
		all[i].className = 'current';
	}
}


function $(dom){
	return document.getElementById(dom);
}

function count(dom){
	var count = dom.parentNode.getElementsByTagName('a').length;
	return count;
}

function getClass(cName){
	var arr = [],
		dom = document.getElementsByTagName('*');

	for(var i=0;i<dom.length;i++){
		if(dom[i].className == cName){
			arr.push(dom[i]);
		}
	}
	return arr;
}