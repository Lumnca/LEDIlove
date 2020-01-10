var WINDOW_WIDTH = 450;
var WINDOW_HEIGHT= 450;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var r = 6;
var m = 13;

ctx.clearRect(0, 0, WINDOW_HEIGHT, WINDOW_WIDTH);
render([]);
//重新加载点阵
function render(data){
	var canvas = document.getElementById('canvas');
	var context=canvas.getContext('2d');
	context.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
	renderDigit(context,data);
}

//填充点阵
function renderDigit(cxt,data){
	for (var i = 0; i < 32; i++) {
		for (var j = 0; j < 32; j++) {
			if (data[i * 32 + j] == 252) {
				ctx.beginPath();
				ctx.arc((j + 0.5) * m, m * (i + 0.5), r, 0, 2 * Math.PI, true); //显示像素点的位置与大小 半径3 
				ctx.fillStyle = 'yellow'; //填充颜色
				ctx.fill();
			} else if (data[i * 32 + j] == 224) {
				ctx.beginPath();
				ctx.arc((j + 0.5) * m, m * (i + 0.5), r, 0, 2 * Math.PI, true); //显示像素点的位置与大小 半径3 
				ctx.fillStyle = 'red'; //填充颜色
				ctx.fill();
			} else if (data[i * 32 + j] == 3) {
				ctx.beginPath();
				ctx.arc((j + 0.5) * m, m * (i + 0.5), r, 0, 2 * Math.PI, true); //显示像素点的位置与大小 半径3 
				ctx.fillStyle = 'blue'; //填充颜色
				ctx.fill();
			} else if (data[i * 32 + j] == 115) {
				ctx.beginPath();
				ctx.arc((j + 0.5) * m, m * (i + 0.5), r, 0, 2 * Math.PI, true); //显示像素点的位置与大小 半径3 
				ctx.fillStyle = '#FF00FF'; //填充颜色
				ctx.fill();
			} 
			else if (data[i * 32 + j] == 28) {
				ctx.beginPath();
				ctx.arc((j + 0.5) * m, m * (i + 0.5), r, 0, 2 * Math.PI, true); //显示像素点的位置与大小 半径3 
				ctx.fillStyle = '#00FF00'; //填充颜色
				ctx.fill();
			}else if (data[i * 32 + j] == 31) {
				ctx.beginPath();
				ctx.arc((j + 0.5) * m, m * (i + 0.5), r, 0, 2 * Math.PI, true); //显示像素点的位置与大小 半径3 
				ctx.fillStyle = '#00FFFF'; //填充颜色
				ctx.fill();
			} else if (data[i * 32 + j] == 255) {
				ctx.beginPath();
				ctx.arc((j + 0.5) * m, m * (i + 0.5), r, 0, 2 * Math.PI, true); //显示像素点的位置与大小 半径3 
				ctx.fillStyle = 'white'; //填充颜色
				ctx.fill();
			} else {
				ctx.beginPath();
				ctx.arc((j + 0.5) * m, m * (i + 0.5), r, 0, 2 * Math.PI, true); //显示像素点的位置与大小 半径3 
				ctx.fillStyle = 'black'; //填充颜色
				ctx.fill();
			}
		}
	}
}
