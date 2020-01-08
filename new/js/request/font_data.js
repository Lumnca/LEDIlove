function draw_font(data, dom, size, foreground_color) {

	var arraydata = data.join('');

	var canvas = document.createElement('canvas');
	var ctx2 = canvas.getContext('2d');
	//显示框的点阵方块大小默认96px

	canvas.width = 96;
	canvas.height = 96;

	//size*size的点阵信息
	for (let i = 0; i < size; i++) {
		for (let j = 0; j < size; j++) {
			if (arraydata[i * size + j] == "1") {
				ctx2.beginPath();
				ctx2.arc((j + 0.5) * 6 * (16/size), 6 * (i + 0.5) * (16/size), 3*(16/size), 0, 2 * Math.PI, true); //显示像素点的位置与大小 半径3 
				ctx2.fillStyle = foreground_color; //填充颜色
				ctx2.fill();
			}
		}
	}
	dom.appendChild(canvas);
}


function data_deal(src_data,font_size,colors) {
	var meta_data = [];
	//数据处理方式由8位2进制转10进制
	src_data.forEach((item, index) => {

		let data = new Array();
		
		for (var i = 0; i < item.data.length; i++) {
			//反转数据格式
			let rtl = item.data[i].split("").reverse().join("");
			
			let dec = parseInt(rtl, 2);

			data.push(dec);

		}
		console.log(JSON.stringify(data));
		//应对硬件数据格式处理
		if (font_size == 16) {

			for (let i in data) {
				if (i % 2 == 0) {
					meta_data.push(data[i]);
				}
			}

			for (let i in data) {
				if (i % 2 == 1) {
					meta_data.push(data[i]);
				}
			}
		} 
		else {
			for (let i in data) {
				if (i % 4 == 0) {
					meta_data.push(data[i]);
				}
			}

			for (let i in data) {
				if (i % 4 == 1) {
					meta_data.push(data[i]);
				}
			}
			for (let i in data) {
				if (i % 4 == 2) {
					meta_data.push(data[i]);
				}
			}
			for (let i in data) {
				if (i % 4 == 3) {
					meta_data.push(data[i]);
				}
			}
		}

	});
	var sendmeta_data = [];
	//将数据封装成16字节每段的数据
	var meta = [];
	if (font_size == 16) {
		for (var i = 0; i < meta_data.length; i++) {
			if (i % 32 == 0) {
				meta_data[i] = colors[i/32]["value"];// app.colors[i / 32]["value"];
				//console.log("Color:" + meta_data[i] + " " + app.colors[i / 32]["rgba"]);
			}
			meta.push(meta_data[i]);
			if ((i + 1) % 16 == 0) {
				sendmeta_data.push(meta);
				meta = [];
			}
		}
	} else {
		for (var i = 0; i < meta_data.length; i++) {
			if (i % 128 == 0) {
				meta_data[i] =  colors[i/128]["value"] ;//app.colors[i / 128]["value"];
			}
			meta.push(meta_data[i]);
			if ((i + 1) % 16 == 0) {
				sendmeta_data.push(meta);
				meta = [];
			}
		}
	}
	console.log(JSON.stringify(sendmeta_data));
	return sendmeta_data;
}

