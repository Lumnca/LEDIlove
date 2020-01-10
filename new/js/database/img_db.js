var src_data;
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
				},
				fail: function(e){
					//console.log('executeSql failed: '+JSON.stringify(e));
				}
		});
		
		plus.sqlite.selectSql({
				name: 'main',
				sql: 'select * from imgData where id = '+window.localStorage.getItem('img_id'),
				success: function(data){	
					for (var i = 0; i < data.length; i++) {	
					    src_data = data[i].data;
						app.img.id = data[i].id;
						app.img.data = JSON.parse(src_data);
						app.img.name = data[i].title;
						render(app.img.data);
						app.img_data = JSON.parse(src_data);
						mui.toast('数据加载成功！共'+app.img.data.length+'字节'); 
					}
					if(data.length==0){
						mui.toast('没有找到该数据！'); 
					}
				},
				fail: function(e){
					mui.toast('数据加载失败'); 
				}
		});
		
	}, false);
}

function add(img){
	plus.sqlite.executeSql({
			name: 'main',
			sql: "  insert into imgData values("+img.id+",'"+JSON.stringify(img.data)+"' , '"+img.name+" ' )",
			success: function(e){
				//this.result = '执行命令成功!';
				console.log('执行成功');	
			},
			fail: function(e){
				//this.result = '执行失败: '+JSON.stringify(e);
				console.log('executeSql failed: '+JSON.stringify(e));
				
			}
	});
}