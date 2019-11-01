document.addEventListener('plusready', function(e) {

	var id = window.localStorage.getItem("id");
	var name = window.localStorage.getItem("name");
	var serviceId = window.localStorage.getItem("server");
	
	//打开蓝牙
	openBluetoothAdapter();
	//创建连接
	createConnection(id);
	//获取连接
	getConnectedDevices();

});

// 打开蓝牙模块
function openBluetoothAdapter(){
	plus.bluetooth.openBluetoothAdapter({
		success:function(e){
			console.log('open success: '+JSON.stringify(e));
		},
		fail:function(e){
			console.log('open failed: '+JSON.stringify(e));
		}
	});
}

// 获取已搜索到的蓝牙设备
function getBluetoothDevices(){
	plus.bluetooth.getBluetoothDevices({
		success:function(e){
			var devices = e.devices;
			console.log('get devices success: '+e.length);
			for(var i in devices){
				console.log(i+': '+JSON.stringify(devices[i]));
			}
		},
		fail:function(e){
			console.log('get devices failed: '+JSON.stringify(e));
		}
	});
}


// 获取已连接的蓝牙设备
function getConnectedDevices(){
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


// 蓝牙设备id，可通过onBluetoothDeviceFound方法获取

// 连接蓝牙设备
function createConnection(deviceId ){
	plus.bluetooth.createBLEConnection({
		deviceId:deviceId,
		success:function(e){
			console.log('create connection success: '+JSON.stringify(e));
		},
		fail:function(e){
			console.log('create connection failed: '+JSON.stringify(e));
		}
	});
}


// 获取蓝牙设备的所有服务
function getServices(deviceId ){
	plus.bluetooth.getBLEDeviceServices({
		deviceId:deviceId,
		success:function(e){
			var services = e.services;
			console.log('get services success: '+services.length);
			for(var i in services){
				console.log(i+': '+JSON.stringify(services[i]));
			}
		},
		fail:function(e){
			console.log('get services failed: '+JSON.stringify(e));
		}
	});
}


// 获取蓝牙设备指定服务中所有特征值
function getCharacteristics(deviceId,serviceId ){
	plus.bluetooth.getBLEDeviceCharacteristics({
		deviceId:deviceId,
		serviceId:serviceId,
		success:function(e){
			var characteristics = e.characteristics;
			console.log('get characteristics success: '+characteristics.length);
			for(var i in characteristics){
				console.log(i+': '+JSON.stringify(characteristics[i]));
			}
		},
		fail:function(e){
			console.log('get characteristics failed: '+JSON.stringify(e));
		}
	});
}
	