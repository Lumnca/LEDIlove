




function drawFont(font,size,color) {
	
		var height = size;
		var width = size;

		var canvas = document.createElement('canvas');

		var ctx = canvas.getContext('2d');

		var txt = font;

		canvas.width = width * txt.length;

		canvas.height = height;

		ctx.font = size+"px arial";
		
		ctx.fillStyle = "red";

		ctx.fillText(txt, 0, 14*size/16);
		
		
		canvas.style.transform="scale("+(1/window.devicePixelRatio)+")";

		
		var datas = ctx.getImageData(0, 0,size*txt.length,size).data;

		console.log(datas);

		//GBAR数据组
		var rgbaData = [];

		for (let i = 0; i < datas.length / 4; i++) {
			rgbaData[i] = new Array();
			let r = datas[i * 4];
			rgbaData[i].push(r);
			let g = datas[i * 4 + 1];
			rgbaData[i].push(g);
			let b = datas[i * 4 + 2];
			rgbaData[i].push(b)
			let a = datas[i * 4 + 3];
			rgbaData[i].push(a);
		}

		var show = document.getElementById("dight");

		var ctx2 = show.getContext('2d');
			
		 ctx2.clearRect(0, 0, show.width, show.height);
		
		for (let i = 0; i < height; i++) {
			for (let j = 0; j < txt.length * width; j++) {

				let r = rgbaData[i * txt.length * width + j][0];
				let g = rgbaData[i * txt.length * width + j][1];
				let b = rgbaData[i * txt.length * width + j][2];
				let a = rgbaData[i * txt.length * width + j][3] > 100? 255 : 0;

				ctx2.beginPath();
				ctx2.arc(3.5 * (j + 1), 3.5 * (i + 1), 1.55, 0, 2 * Math.PI,true);
				ctx2.fillStyle = "rgba(" + r + "," + g + "," + b + "," + a + ")";
			//	console.log("rgba(" + r + "," + g + "," + b + "," + a + ")");
				ctx2.fill();
			}
		}
		
	    /* var oText = document.getElementById("dight");
		 
	     var oContext = oText.getContext("2d");
	           
		//var x = oText.width / 2;
	    // var y = oText.height / 2;
	   
	    oContext.font = size*6 + "px Microsoft JhengHei";            //设置文本大小 + 字体
	    oContext.fillStyle = color;                        //设置文本颜色
	    oContext.fillText(font,0,84);  
		 */
	}
console.log(window.devicePixelRatio);