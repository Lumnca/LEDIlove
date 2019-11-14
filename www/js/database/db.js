// 打开数据库
function openNewDB(dbName, dbPath) {
	plus.sqlite.openDatabase({
		name: dbName,
		path: dbPath,
		success: function(e) {
			console.log('openDatabase success!');
		},
		fail: function(e) {
			console.log('openDatabase failed: ' + JSON.stringify(e));
		}
	});
}

// 关闭数据库
function closeDB(dbName) {
	plus.sqlite.closeDatabase({
		name: dbName,
		success: function(e) {
			console.log('closeDatabase success!');
		},
		fail: function(e) {
			console.log('closeDatabase failed: ' + JSON.stringify(e));
		}
	});
}

// 执行事务
function transactionDB(dbName, dbOperation) {
	plus.sqlite.transaction({
		name: dbName,
		operation: dbOperation,
		success: function(e) {
			console.log('transaction success!');
		},
		fail: function(e) {
			console.log('transaction failed: ' + JSON.stringify(e));
		}
	});
}

// 执行SQL语句
function executeSQL(dbName, dbSql) {
	plus.sqlite.executeSql({
		name: dbName,
		sql: dbSql,
		success: function(e) {
			console.log('executeSql success!'+ JSON.stringify(e));
		},
		fail: function(e) {
			console.log('executeSql failed: ' + JSON.stringify(e));
		}
	});
}


// 查询SQL语句
function selectSQL(dbName, dbSql) {
	plus.sqlite.selectSql({
		name: dbName,
		sql: dbSql,
		success: function(data) {
			console.log('selectSql success: ' + JSON.stringify(data));
			for (var i in data) {
				console.log(data[i]);
			}
			return data;
		},
		fail: function(e) {
			console.log('selectSql failed: ' + JSON.stringify(e));
			return null;
		}
	});
}
