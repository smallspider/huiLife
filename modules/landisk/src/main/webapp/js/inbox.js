/*
		 * CONVERT DIALOG TITLE TO HTML
		 * REF: http://stackoverflow.com/questions/14488774/using-html-in-a-dialogs-title-in-jquery-ui-1-10
		 */
		$.widget("ui.dialog", $.extend({}, $.ui.dialog.prototype, {
			_title : function(title) {
				if (!this.options.title) {
					title.html("&#160;");
				} else {
					title.html(this.options.title);
				}
			}
		}));
	
		/*
		* DIALOG SIMPLE
		*/
	
		// Dialog click
		/* $('#dialog_link').click(function() {
			$('#dialog_simple').dialog('open');
			return false;
	
		}); */
	
		var upload_dialog = $('#dialog_simple').dialog({
			autoOpen : false,
			width : 600,
			resizable : false,
			modal : false,
			title : "<div class='widget-header'><h4><i class='fa fa-warning'></i> Empty the recycle bin?</h4></div>",
			buttons : [{
				html : "<i class='fa fa-trash-o'></i>&nbsp; Delete all items",
				"class" : "btn btn-danger",
				click : function() {
					$(this).dialog("close");
				}
			}, {
				html : "<i class='fa fa-times'></i>&nbsp; Cancel",
				"class" : "btn btn-default",
				click : function() {
					$(this).dialog("close");
				}
			}],
			/*close:function(event, ui){
				alert(1+" "+_t);
				event.cancelable = false;

				_t.cancel();
				return false;
			},*/
			beforeClose:function(event, ui){
				//取消关闭
				event.cancelable = false;
				_t.cancel();
				return false;
			},
			resize:function(){
				$(this).position({left:$(document.body).width() - 600,top:$(document.body).height() - 417});
			},
			position: [$(document.body).width() - 600,$(document.body).height() - 417]
		});
	
		/*
		 * Remove focus from buttons
		 */
		$('.ui-dialog :button').blur();
		
		var config = {
				browseFileId : "upload_file", /** 选择文件的ID, 默认: i_select_files */
				browseFileBtn : "上传文件", /** 显示选择文件的样式, 默认: `<div>请选择文件</div>` */
				//dragAndDropArea: "i_select_files", /** 拖拽上传区域，Id（字符类型"i_select_files"）或者DOM对象, 默认: `i_select_files` */
				//dragAndDropTips: "<span>把文件(文件夹)拖拽到这里</span>", /** 拖拽提示, 默认: `<span>把文件(文件夹)拖拽到这里</span>` */
				filesQueueId : "dialog_simple", /** 文件上传容器的ID, 默认: i_stream_files_queue */
				filesQueueHeight : 200, /** 文件上传容器的高度（px）, 默认: 450 */
				messagerId : "i_stream_message_container", /** 消息显示容器的ID, 默认: i_stream_message_container */
				multipleFiles: true /** 多个文件一起上传, 默认: false */
//				autoUploading: false, /** 选择文件后是否自动上传, 默认: true */
//				autoRemoveCompleted : true, /** 是否自动删除容器中已上传完毕的文件, 默认: false */
//				maxSize: 104857600//, /** 单个文件的最大大小，默认:2G */
//				retryCount : 5, /** HTML5上传失败的重试次数 */
//				postVarsPerFile : { /** 上传文件时传入的参数，默认: {} */
//					param1: "val1",
//					param2: "val2"
//				},
//				swfURL : "/swf/FlashUploader.swf", /** SWF文件的位置 */
//				tokenURL : "/tk", /** 根据文件名、大小等信息获取Token的URI（用于生成断点续传、跨域的令牌） */
//				frmUploadURL : "/fd;", /** Flash上传的URI */
//				uploadURL : "/upload", /** HTML5上传的URI */
//				simLimit: 200, /** 单次最大上传文件个数 */
//				extFilters: [".txt", ".rpm", ".rmvb", ".gz", ".rar", ".zip", ".avi", ".mkv", ".mp3"], /** 允许的文件扩展名, 默认: [] */
				,onSelect: function(list) {
					$('#dialog_simple').dialog('open');
				}, /** 选择文件后的响应事件 */
//				onMaxSizeExceed: function(size, limited, name) {alert('onMaxSizeExceed')}, /** 文件大小超出的响应事件 */
//				onFileCountExceed: function(selected, limit) {alert('onFileCountExceed')}, /** 文件数量超出的响应事件 */
//				onExtNameMismatch: function(name, filters) {alert('onExtNameMismatch')}, /** 文件的扩展名不匹配的响应事件 */
//				onCancel : function(file) {alert('Canceled:  ' + file.name)}, /** 取消上传文件的响应事件 */
//				onComplete: function(file) {alert('onComplete')}, /** 单个文件上传完毕的响应事件 */
//				onQueueComplete: function() {alert('onQueueComplete')}, /** 所以文件上传完毕的响应事件 */
//				onUploadError: function(status, msg) {alert('onUploadError')} /** 文件上传出错的响应事件 */
//				onDestroy: function() {alert('onDestroy')} /** 文件上传出错的响应事件 */
			};
			var _t = new Stream(config);