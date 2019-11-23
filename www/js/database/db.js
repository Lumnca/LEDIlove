window.sqliteInfo = {
	databaseName : '',
	databaseIsOpen : false,
	database : {
		tables : []
	},
	msg : ''
}

function sqlInit(){
	console.log("数据库信息: "+ JSON.stringify(sqliteInfo));
}
/*
setInterval(function(){
	sqlInit();
},5000);
*/
// 打开数据库
function openNewDB(dbName, dbPath) {
	plus.sqlite.openDatabase({
		name: dbName,
		path: dbPath,
		success: function(e) {
			//console.log('openDatabase success!');
			sqliteInfo.databaseName = dbName;
			sqliteInfo.databaseIsOpen = true;
			sqliteInfo.msg = "打开数据库成功!";
		},
		fail: function(e) {
			//console.log('openDatabase failed: ' + JSON.stringify(e));
			sqliteInfo.msg = '打开数据库失败 错误信息: ' + JSON.stringify(e);
		}
	});
}

// 关闭数据库
function closeDB(dbName) {
	plus.sqlite.closeDatabase({
		name: dbName,
		success: function(e) {
			sqliteInfo.databaseIsOpen = false;
			sqliteInfo.msg = "关闭数据库成功!";
			//console.log('closeDatabase success!');
		},
		fail: function(e) {
			//console.log('closeDatabase failed: ' + JSON.stringify(e));
			sqliteInfo.msg ='关闭数据库失败 错误信息: ' + JSON.stringify(e);
		}
	});
}

// 执行事务（未用）
function transactionDB(dbName, dbOperation) {
	plus.sqlite.transaction({
		name: dbName,
		operation: dbOperation,
		success: function(e) {
			//console.log('transaction success!');
		},
		fail: function(e) {
			//console.log('transaction failed: ' + JSON.stringify(e));
		}
	});
}

// 执行SQL语句
function executeSQL(dbName, dbSql) {
	plus.sqlite.executeSql({
		name: dbName,
		sql: dbSql,
		success: function(e) {
			//console.log('executeSql success!'+ JSON.stringify(e));
			
			sqliteInfo.msg  = '执行命令成功！ ';
		},
		fail: function(e) {
			//console.log('executeSql failed: ' + JSON.stringify(e));
			
			sqliteInfo.msg = '执行命令失败！' + JSON.stringify(e);
		}
	});
}


// 查询SQL语句
function selectSQL(dbName, dbSql) {
	plus.sqlite.selectSql({
		name: dbName,
		sql: dbSql,
		success: function(data) {
			//console.log('selectSql success: ' + JSON.stringify(data));
			sqliteInfo.msg = '查询SQL语句成功！ ' ;
			for (var i in data) {
				console.log(data[i]);
			}
			sqliteInfo.database.data = data;
			return data;
		},
		fail: function(e) {
			sqliteInfo.msg = '查询SQL语句失败： ' + JSON.stringify(e);
			//console.log('selectSql failed: ' + JSON.stringify(e));
			return null;
		}
	});
}
