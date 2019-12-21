/*
 *
 * 
 * 扫描设备
 * 
 */
document.addEventListener('plusready', function(e) {

	// 返回上次页面
	function goBack() {
		embed.back(); //返回1
	}
	// 前进到上次页面
	function goForward() {
		embed.forward();
	}

	// H5 plus事件处理
	function plusReady() {
		// 监听键按下事件
		plus.key.addEventListener("keydown", function(e) {
			plus.nativeUI.confirm("确认退出?", function(e){
			
					if(e.index==0){
						plus.runtime.quit(); //返回上一页 点击手机返回键即可返回到上一页 返回到首页后退出系统
					}
			});
			
		}, false);
	}
	if (window.plus) {
		plusReady();
	} else {
		document.addEventListener("plusready", plusReady, false); //执行返回
	}

	//打开蓝牙
	plus.bluetooth.openBluetoothAdapter({
		success: function(e) {
			//console.log('open success: ' + JSON.stringify(e));
			mui.toast("开始搜索设备！");
		},
		fail: function(e) {
			//console.log('open failed: ' + JSON.stringify(e));
			mui.toast("请打开蓝牙后向下拉刷新界面！");
		}
	});

	plus.bluetooth.openBluetoothAdapter({
		success: function(e) {
			plus.bluetooth.startBluetoothDevicesDiscovery({
				success: function(e) {
					console.log("成功搜索");
				},
				fail: function(e) {
					console.log('start discovery failed: ' + JSON.stringify(e));
				}
			});
		},

		fail: function(e) {
			console.log('open failed: ' + JSON.stringify(e));
		}
	});




	//搜寻设备实时渲染
	plus.bluetooth.onBluetoothDeviceFound(function(e) {

		var devices = e.devices;

		var repDev = false

		for (let item of app.devList) {
			if (item[0].deviceId === devices[0].deviceId) {
				repDev = true
			}
		}

		if (!repDev) {
			app.devList.push(devices)
		}


		for (var i in devices) {
			console.log(i + ': ' + JSON.stringify(devices[i]));
		}
	});
});

/*
 *
 *返回键处理
 *
 */
var embed = null;


/**
 * 
 * 
 * 
 * 
 * 
 */
// 连接蓝牙设备
function createConnection(deviceId){
	plus.bluetooth.createBLEConnection({
		deviceId:deviceId,
		success:function(e){
			console.log('create connection success: '+JSON.stringify(e));
			return true;
		},
		fail:function(e){
			console.log('create connection failed: '+JSON.stringify(e));
			return false;
		}
	});
}



// 结束搜索蓝牙
function stopBluetoothDiscovery(){
	plus.bluetooth.stopBluetoothDevicesDiscovery({
		success:function(e){
			console.log('stop discovery success: '+JSON.stringify(e));
			plus.bluetooth.closeBluetoothAdapter({
				success:function(e){
					console.log('close success: '+JSON.stringify(e));
				},
				fail:function(e){
					console.log('close failed: '+JSON.stringify(e));
				}
			});
		},
		fail:function(e){
			console.log('stop discovery failed: '+JSON.stringify(e));
		}
	});
}