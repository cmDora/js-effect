
function getClass(cName){
	var dom = document.getElementsByTagName("*");
	var arr = [];
	var reg = new RegExp("\\b"+cName+"\\b");
	for(var i=0; i<dom.length; i++){
		if(reg.test(dom[i].className)){
			arr.push(dom[i]);
		}
	}
	return arr;
}

var check = getClass("check"),
	checkAll = getClass("check-all check"),
	index = 0;
for(var i=0; i<check.length; i++){
	check[i].onclick = function(){

		if(this.className == "check-all check"){
			for(var i=0; i<check.length; i++){
				if(this.checked){
					index = 4;
				}else{
					index = 0;
				}
				check[i].checked = this.checked;
			}
		}

		if(this.checked == false){
			for(var i=0; i<checkAll.length; i++){
				checkAll[i].checked = false;
			}
		}

		if(this.className == "check-one check"){
			if(this.checked){
				index++;
			}else{
				index--;
			}
		}
		if(index==4){
			for(var i=0; i<checkAll.length; i++){
				checkAll[i].checked = true;
			}
		}

		getTotal();
	}
}


var cartTable = document.getElementById("cartTable"),
	priceTotal = document.getElementById("priceTotal"),
	selectedTotal = document.getElementById("selectedTotal"),
	tr = cartTable.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
function getTotal(){
	var selected = 0,
		price = 0;

	for(var i=0; i<tr.length; i++){
		if(tr[i].getElementsByTagName("input")[0].checked){
			selected += parseInt( tr[i].getElementsByTagName("input")[1].value );
			price += parseFloat( tr[i].getElementsByTagName("td")[4].innerHTML );
		}
	}
	priceTotal.innerHTML = price.toFixed(2);
	selectedTotal.innerHTML = selected;
}

for(var i=0; i<tr.length; i++){
	tr[i].onclick = function(e){
		var e = window.event || e;
		var tar = e.target || e.srcElement;
		var inputs = this.getElementsByTagName("input")[1];
		var span = this.getElementsByTagName("span")[1];
		switch(tar.className){
			case "delete":
				this.parentNode.removeChild(this);
			break;

			case "add":
				inputs.value = parseInt(inputs.value)+1;
				setTotal(this);
			break;

			case "reduce":
				inputs.value = parseInt(inputs.value)-1;
				setTotal(this);
				if(inputs.value<=1){
					inputs.value=1;
				}
			break;
		}
		getTotal();
	}
}

function setTotal(tr){

	var td2 = tr.cells[2];
	var td4 = tr.cells[4];
	var inputs = tr.getElementsByTagName("input")[1].value;
	var span = tr.getElementsByTagName("span")[1];

	td4.innerHTML = (td2.innerHTML*inputs).toFixed(2);

	if(inputs>1){
		span.innerHTML = "-";
	}else{
		span.innerHTML = "";
	}
}