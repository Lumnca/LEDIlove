
//二维点阵数组
var digit = new Array();

//初始化二维点阵
for(var i=0;i<32;i++){       
	digit[i] = new Array();
    for(var j=0;j<32;j++){    
        digit[i][j] = 0;
    }
}

digit[2][4]=1;
digit[2][5]=1;
digit[2][6]=1;
digit[2][7]=1;
digit[2][8]=1;
digit[2][9]=1;


//填充点阵
function renderDigit(cxt){
	for(var i=0;i<32;i++){
		for(var j=0;j<32;j++){
			if(digit[i][j]!=1)
			{
				cxt.fillStyle="rgb(100,102,100)";
				cxt.beginPath();
				cxt.fillStyle="#757575";
				/*
				cxt.fillRect(latticePointSize*(j),(i)*latticePointSize,latticePointSize,latticePointSize);
				
				cxt.closePath();
				cxt.fill();*/
				cxt.arc(i*(j),(i)*j,1,0,2*Math.PI);
				cxt.stroke();
				
				cxt.fill();
			}
			else{
				cxt.beginPath();
				cxt.fillStyle="red";
				/*
				cxt.fillRect(latticePointSize*(j),(i)*latticePointSize,latticePointSize,latticePointSize);
				
				cxt.closePath();
				cxt.fill();*/
				cxt.arc(i*(j),(i)*j,1,0,2*Math.PI);
				cxt.stroke();
				
				cxt.fill();
			}
		}
	}
}