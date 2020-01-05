/**
 * 自定义日志输出
 */

window.log = {
	system : null,
	bluetooth : null,
	database : null,
	debug : null
};

function system_log(){
	console.log(JSON.stringify(window.log.system));
}

function bluetooth_log(){
	console.log(JSON.stringify(window.log.bluetooth));
}

function database_log(){
	console.log(JSON.stringify(window.log.database));
}

function debug_log(){
	console.log(JSON.stringify(window.log.debug));
}