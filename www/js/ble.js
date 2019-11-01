document.addEventListener('plusready', function(e) {

	var id = window.localStorage.getItem("id");
	var name = window.localStorage.getItem("name");
	var serviceId = window.localStorage.getItem("server");
	console.log(id+name+serviceId);
	
	var w = plus.nativeUI.showWaiting("正在连接...");

	//打开蓝牙
	plus.bluetooth.openBluetoothAdapter({
		success: function(e) {
			
		},
		fail: function(e) {
			//console.log('open failed: ' + JSON.stringify(e));
		}
	});
	

	plus.bluetooth.getConnectedBluetoothDevices({
		success:function(e){
			var devices = e.devices;
			console.log('connected devices success: '+JSON.stringify(e));
			for(var i in devices){
				console.log(i+': '+JSON.stringify(devices[i]));
			}
		},
		fail:function(e){
			console.log('connected devices failed: '+JSON.stringify(e));
		}
	});


	plus.bluetooth.createBLEConnection({
		deviceId: id,
		success: function(e) {
			console.log('create connection success: ' + JSON.stringify(e) + " 设备id:" + id);
			//关闭搜索
			plus.bluetooth.stopBluetoothDevicesDiscovery({
				success: function(e) {
					console.log('stop discovery success: ' + JSON.stringify(e));
					plus.bluetooth.closeBluetoothAdapter({
						success: function(e) {
							console.log('close success: ' + JSON.stringify(e));
						},
						fail: function(e) {
							console.log('close failed: ' + JSON.stringify(e));
						}
					});
				},
				fail: function(e) {
					console.log('stop discovery failed: ' + JSON.stringify(e));
				}
			});

			plus.nativeUI.closeWaiting();
			mui.toast("已连接到"+id);
		},
		fail: function(e) {
			console.log('create connection failed: ' + JSON.stringify(e));
			plus.nativeUI.closeWaiting();
			//mui.toast("连接失败！"+e.message);
		}
	});




	plus.bluetooth.onBluetoothAdapterStateChange(function(e) {
		if (!e.available) {
			window.localStorage.clear();
			mui.toast("蓝牙已断开");
		}
		console.log('state changed: ' + JSON.stringify(e));
		
	});


});




