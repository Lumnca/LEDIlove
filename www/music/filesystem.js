/*
 *
 *
 *内置音乐与本地音乐文件系统
 * 
 * 
 */
console.log("-----------Log-----------------");
// 扩展API加载完毕后调用onPlusReady回调函数 
document.addEventListener("plusready", onPlusReady, false);
// 扩展API加载完毕，现在可以正常调用扩展API
function onPlusReady() {
	plus.io.resolveLocalFileSystemURL("_www/audio", function(entry) {
		var directoryReader = entry.createReader();
		directoryReader.readEntries(function(entries) {
			var i;
			for (i = 0; i < entries.length; i++) {
				mui.toast("内置音乐加载成功！");
				app.applocalmusic.push(entries[i].name);
			}
		}, function(e) {
			mui.toast("打开文件失败: " + e.message);
		});
	}, function(e) {
		console.log(e);
	});
}


var p = null;

function startPlay(url) {
	if ( plus.audio == undefined ) {
		alert( "Device not ready!" );
	}
	p = plus.audio.createPlayer(url);
	
	p.play( function () {
		
		 
	}, function ( e ) {
		alert( "Audio play error: " + e.message ); 
	} ); 
	
	p.addEventListener("canplay",function(){
		console.log("可以正常播放！")
		app.ispaused = 'fa fa-pause';
		app.musicLength.all = Math.floor( p.getDuration());
		setInterval(function(){
			app.musicLength.now = Math.floor( p.getPosition())  ;
			app.musicLength.all = Math.floor( p.getDuration());
		},1000)
	},function(e){
		console.log(e);
	})
}

function stopPlay() {
	if(!p.isPaused()){
		app.ispaused = 'fa fa-play';
		p.pause();
	}
	else{
		app.ispaused = 'fa fa-pause';
		p.resume();
	}
}


