function draw_font(data,dom,size,foreground_color) {
	
	var arraydata = data.join('');
	
	var canvas = document.createElement('canvas');
	var ctx2 = canvas.getContext('2d');
	//显示框的点阵方块大小默认96px
	
	canvas.width = 96;
	canvas.height = 96;
	
	//size*size的点阵信息
	for (let i = 0; i < size; i++) {
		for (let j = 0; j < size; j++) {
			if (arraydata[i * 16 + j] == "1") {
				ctx2.beginPath();
				ctx2.arc((j + 0.5) * 6, 6 * (i + 0.5), 3, 0, 2 * Math.PI, true); //显示像素点的位置与大小 半径3 
				ctx2.fillStyle = foreground_color; //填充颜色
				ctx2.fill();
			}
		}
	}
	dom.appendChild(canvas);
}
