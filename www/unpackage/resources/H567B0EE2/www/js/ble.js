var id = window.localStorage.getItem("id");
var name = window.localStorage.getItem("name");
var serviceId = window.localStorage.getItem("server");
var connectNumber = 0;
document.addEventListener('plusready', function(e) {



	//打开蓝牙
	openBluetoothAdapter();
	
	getConnectedDevices();
	if (isConnectedDevices()) {
		//获取连接
		console.log("获取连接中");
		getConnectedDevices();
	} else {
		//连接
		console.log("连接中");
		createConnection(id);
	}

	getServices(id);

	getCharacteristics(id, serviceId);
	//监听
	listenerStateChange();
	listenerConnection()
});


// 打开蓝牙模块
function openBluetoothAdapter() {
	plus.bluetooth.openBluetoothAdapter({
		success: function(e) {
			console.log('open success: ' + JSON.stringify(e));
		},
		fail: function(e) {
			console.log('open failed: ' + JSON.stringify(e));
		}
	});
}


// 结束搜索蓝牙
function stopBluetoothDiscovery() {
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
}

// 连接蓝牙设备
function createConnection(deviceId) {
	var w = plus.nativeUI.showWaiting("正在连接...");
	plus.bluetooth.createBLEConnection({
		deviceId: deviceId,
		success: function(e) {
			plus.nativeUI.closeWaiting();
			//超时
			if (e.code == 10012) {
				mui.toast("连接超时！");
			} else {
				mui.toast("已连接到" + deviceId);
			}

			console.log('create connection success: ' + JSON.stringify(e));
		},
		fail: function(e) {
			plus.nativeUI.closeWaiting();
			if (e.code != -1) {
				mui.toast(e.message);
			}
			console.log('create connection failed: ' + JSON.stringify(e));
		}
	});
}

// 监听状态变化
function listenerStateChange() {
	plus.bluetooth.onBluetoothAdapterStateChange(function(e) {
		if (!e.available) {
			window.localStorage.clear();
			mui.toast("蓝牙已断开");
		}
		console.log('state changed: ' + JSON.stringify(e));
	});
}

// 监听蓝牙设备连接状态
function listenerConnection() {
	plus.bluetooth.onBLEConnectionStateChange(function(e) {
		if (!e.connected) {
			mui.toast("连接已断开");
			app.devname = '无连接';
			connectNumber++;
			if(connectNumber<=1){
				keepConnect(id);
			}
		} else {
			app.devname = name;
			connectNumber = 0;
			mui.toast("已连接");
		}
		console.log('connection state changed: ' + JSON.stringify(e));
	});
}


// 获取已连接的蓝牙设备
function getConnectedDevices() {
	plus.bluetooth.getConnectedBluetoothDevices({
		success: function(e) {
			var devices = e.devices;
			//console.log('connected devices success: ' + JSON.stringify(e));
			for (var i in devices) {
				console.log(i + ': ' + JSON.stringify(devices[i]));
			}
		},
		fail: function(e) {
			console.log('connected devices failed: ' + JSON.stringify(e));
		}
	});
}

// 获取蓝牙设备的所有服务
function getServices(deviceId) {
	plus.bluetooth.getBLEDeviceServices({
		deviceId: deviceId,
		success: function(e) {
			var services = e.services;
			console.log('get services success: ' + services.length);
			for (var i in services) {
				console.log(i + ': ' + JSON.stringify(services[i]));
				getCharacteristics(id, services[i].uuid);
			}
		},
		fail: function(e) {
			console.log('get services failed: ' + JSON.stringify(e));
		}
	})
}


function isConnectedDevices() {
	var isCD = false;
	plus.bluetooth.getConnectedBluetoothDevices({
		success: function(e) {
			var devices = e.devices;
			for (var i in devices) {
				if (devices[i].deviceId == window.localStorage.getItem("id")) {
					isCD = true;
				}
			}
		},
		fail: function(e) {
			console.log('connected devices failed: ' + JSON.stringify(e));
		}
	});
	return isCD;
}


// 获取蓝牙设备指定服务中所有特征值
function getCharacteristics(deviceId, serviceId) {
	plus.bluetooth.getBLEDeviceCharacteristics({
		deviceId: deviceId,
		serviceId: serviceId,
		success: function(e) {
			var characteristics = e.characteristics;
			//console.log('get characteristics success: ' + characteristics.length);

			for (var i in characteristics) {
				console.log(i + ': ' + JSON.stringify(characteristics[i]));

				if (characteristics[i].uuid == "00002A03-0000-1000-8000-00805F9B34FB") {
					readCharacteristics(id, serviceId, characteristics[i].uuid);
					writeCharacteristics(id, serviceId, characteristics[i].uuid);
					startCharacteristicsNotify(id, serviceId, characteristics[i].uuid);
				}


			}
		},
		fail: function(e) {
			console.log('get characteristics failed: ' + JSON.stringify(e));
		}
	});
}

// 读取低功耗蓝牙设备的特征值
function readCharacteristics(deviceId, serviceId, characteristicId) {
	plus.bluetooth.readBLECharacteristicValue({
		deviceId: deviceId,
		serviceId: serviceId,
		characteristicId: characteristicId,
		success: function(e) {
			console.log('read ' + characteristicId + ' success: ' + JSON.stringify(e));
		},
		fail: function(e) {
			console.log('read characteristics failed: ' + JSON.stringify(e));
		}
	});
}



var value = new ArrayBuffer(8);
var iv = new Int32Array(value);
iv[0] = 120, iv[2] = 100;
// 写入低功耗蓝牙设备的特征值
function writeCharacteristics(deviceId, serviceId, characteristicId) {
	plus.bluetooth.writeBLECharacteristicValue({
		deviceId: deviceId,
		serviceId: serviceId,
		characteristicId: characteristicId,
		value: value,
		success: function(e) {
			console.log('write characteristics success: ' + JSON.stringify(e));
		},
		fail: function(e) {
			console.log('write characteristics failed: ' + JSON.stringify(e));
		}
	});
}


// 启用低功耗蓝牙设备特征值变化时的notify功能
function startCharacteristicsNotify(deviceId, serviceId, characteristicId) {
	// 监听低功耗蓝牙设备的特征值变化 
	plus.bluetooth.onBLECharacteristicValueChange(function(e) {
		console.log('onBLECharacteristicValueChange: ' + JSON.stringify(e));
		var value = buf2hex(e.value);
		console.log('value(hex) = ' + value);
		if (characteristicId == e.characteristicId) {
			// 更新到页面显示
			alert('特征值变化: ' + value);
		}
	});
	// 启用notify功能
	plus.bluetooth.notifyBLECharacteristicValueChange({
		deviceId: deviceId,
		serviceId: serviceId,
		characteristicId: characteristicId,
		success: function(e) {
			var characteristics = e.characteristics;
			console.log('get characteristics success: ' + JSON.stringify(e));
			for (var i in characteristics) {
				console.log(i + ': ' + JSON.stringify(characteristics[i]));
			}
		},
		fail: function(e) {
			console.log('get characteristics failed: ' + JSON.stringify(e));
		}
	});
}


function buf2hex(buffer) { // buffer is an ArrayBuffer
	// create a byte array (Uint8Array) that we can use to read the array buffer
	const byteArray = new Uint8Array(buffer);

	// for each element, we want to get its two-digit hexadecimal representation
	const hexParts = [];
	for (let i = 0; i < byteArray.length; i++) {
		// convert value to hexadecimal
		const hex = byteArray[i].toString(16);

		// pad with zeros to length 2
		const paddedHex = ('0x' + hex);

		// push to array
		hexParts.push(paddedHex);
	}

	// join all the hex values of the elements into a single string
	return hexParts.join(' ');
}


function keepConnect(id){
	createConnection(id);
}