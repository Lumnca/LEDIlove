/*
*点阵长宽
*
*请按照屏幕分辨率设置，单位px
*
*提供可选项
*网页可见区域宽：document.body.clientWidth 
*网页可见区域高：document.body.clientHeight 默认为html中指定的1000px可修改
*网页可见区域宽：document.body.offsetWidth (包括边线的宽) 
*网页可见区域高：document.body.offsetHeight (包括边线的宽) 
*网页正文全文宽：document.body.scrollWidth 
*网页正文全文高：document.body.scrollHeight 
*网页被卷去的高：document.body.scrollTop 
*网页被卷去的左：document.body.scrollLeft 
*网页正文部分上：window.screenTop 
*网页正文部分左：window.screenLeft 
*屏幕分辨率的高：window.screen.height 
*屏幕分辨率的宽：window.screen.width 
*屏幕可用工作区高度：window.screen.availHeight 
*屏幕可用工作区宽度：window.screen.availWidth 
*
*/

 
var WINDOW_WIDTH = document.body.clientWidth;
var WINDOW_HEIGHT= document.body.clientWidth;

console.log(WINDOW_WIDTH+":"+ WINDOW_HEIGHT);
/*
*
*点阵像素点的长宽，单位px,使用偶数精确度更高。取值10左右
*/
var latticePointSize = WINDOW_WIDTH/32;

/*
*点阵行列
*
*latticeRowNumbe 行数
*
*latticeColNumber 列数
*
*可以自定义，也可以通过像素点长宽实现全布局
*
* var latticeRowNumber = Math.floor(WINDOW_HEIGHT/latticePointSize);
*var latticeColNumber = Math.floor(WINDOW_WIDTH/latticePointSize);
*/
var latticeRowNumber = Math.floor(WINDOW_HEIGHT/latticePointSize);
var latticeColNumber = Math.floor(WINDOW_WIDTH/latticePointSize);



//二维点阵数组
var digit = new Array();

//初始化二维点阵
for(var i=0;i<latticeRowNumber;i++){       
	digit[i] = new Array();
    for(var j=0;j<latticeColNumber;j++){    
        digit[i][j] = 0;
    }
}


window.onload=function(){
	//画图点阵
	var canvas=document.getElementById('canvas');
	var context=canvas.getContext('2d');

	canvas.width=WINDOW_WIDTH;
	canvas.height=WINDOW_HEIGHT;

	setInterval(
		function(){
		render(context);
	},10);
}

/*
*
*移动端事件
*
*/
canvas.onclick = function(event){
	var e = event || window.event;
	event.preventDefault();
	    
	var screenX = WINDOW_WIDTH;
	var screenY = WINDOW_HEIGHT;
	    
	var x = event.clientX;
	var y = event.clientY;
	
	 console.log((y/screenY)*latticeRowNumber+"-"+(x/screenX)*latticeColNumber)
	 
	var row = Math.floor((y/screenY)*latticeRowNumber);
	var col = Math.floor((x/screenX)*latticeColNumber);
	digit[row][col] = 1;
}

canvas.ontouchmove = function(event){
        var e = event || window.event;
        event.preventDefault();
    
        var screenX = WINDOW_WIDTH;
        var screenY = WINDOW_HEIGHT;
    
        var x = event.changedTouches[0].clientX;
        var y = event.changedTouches[0].clientY;
        
         console.log((y/screenY)*latticeRowNumber+"-"+(x/screenX)*latticeColNumber)
         
        var row = Math.floor((y/screenY)*latticeRowNumber);
        var col = Math.floor((x/screenX)*latticeColNumber);
        digit[row][col] = 1;
}



//重新加载点阵
function render(cxt){
	cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
	renderDigit(cxt);
}

//填充点阵
function renderDigit(cxt){
	for(var i=0;i<digit.length;i++){
		for(var j=0;j<digit[i].length;j++){
			if(digit[i][j]!=1)
			{
				cxt.fillStyle="rgb(100,102,100)";
				cxt.beginPath();
				cxt.fillStyle="green";
				/*
				cxt.fillRect(latticePointSize*(j),(i)*latticePointSize,latticePointSize,latticePointSize);
				
				cxt.closePath();
				cxt.fill();*/
				cxt.arc(latticePointSize*(j)+latticePointSize/2,(i)*latticePointSize+latticePointSize/2,latticePointSize/2,0,2*Math.PI);
				cxt.stroke();
				cxt.strokeStyle = "red";
				cxt.fill();
			}
		}
	}
}



