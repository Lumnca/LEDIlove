function openDB() {
	document.addEventListener("plusready", function() {

		let isopendb = plus.sqlite.isOpenDatabase({
			name: 'main',
			path: '_doc/imgData/demo.db'
		});

		plus.sqlite.closeDatabase({
			name: 'main',
			success: function(e) {
				//console.log('closeDatabase success!');
			
				sqliteInfo.databaseIsOpen = false;
			},
			fail: function(e) {
				//console.log('closeDatabase failed: ' + JSON.stringify(e));
			}
		});

		plus.sqlite.openDatabase({
			name: 'main',
			path: '_doc/imgData/imgdata.db',
			success: function(e) {
				//console.log('openDatabase success!');
				sqliteInfo.databaseName = 'main';
				sqliteInfo.databaseIsOpen = true;
			},
			fail: function(e) {
				//console.log('openDatabase failed: ' + JSON.stringify(e));
			}
		});
		
		plus.sqlite.executeSql({
				name: 'main',
				sql: 'create table if not exists imgdata(id int primary key not null, data text not null,title text not null)',
				success: function(e){
					//console.log('初始化数据库成功');
					sqliteInfo.msg = '初始化数据库成功！';
				},
				fail: function(e){
					//console.log('executeSql failed: '+JSON.stringify(e));
					sqliteInfo.msg = '初始化数据库失败！';
				}
		});
		
		plus.sqlite.selectSql({
				name: 'main',
				sql: 'select * from imgData',
				success: function(data){
					
					let maxIndex = 0;
					//console.log('selectSql success: ');
					//console.log("已存数据:"+JSON.stringify(data));
					
					for (var i = 0; i < data.length; i++) {
						app.img.push(data[i]);
						maxIndex = data[i].id;
					}
					
					window.localStorage.setItem("dataMaxIndex",maxIndex+1);
					//console.log("图片最后一位索引："+window.localStorage.getItem('dataMaxIndex'));
					sqliteInfo.database.data = data;
				},
				fail: function(e){
					//console.log('selectSql failed: '+JSON.stringify(e));
					sqliteInfo.msg = '加载数据失败 ： '+JSON.stringify(e);
				}
		});
		
	}, false);

}
