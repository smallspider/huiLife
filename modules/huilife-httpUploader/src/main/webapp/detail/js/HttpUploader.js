/*
	��Ȩ���� 2009-2013 �人���˿Ƽ����޹�˾
	��������Ȩ��
	�ٷ���վ��http://www.ncmem.com/
	��Ʒ��ҳ��http://www.ncmem.com/webplug/http-uploader5/index.asp
	��Ʒ���ܣ�http://www.cnblogs.com/xproer/archive/2012/05/29/2523757.html
	�����ĵ�-ASP��http://www.cnblogs.com/xproer/archive/2012/02/17/2355458.html
	�����ĵ�-PHP��http://www.cnblogs.com/xproer/archive/2012/02/17/2355467.html
	�����ĵ�-JSP��http://www.cnblogs.com/xproer/archive/2012/02/17/2355462.html
	�����ĵ�-ASP.NET��http://www.cnblogs.com/xproer/archive/2012/02/17/2355469.html
	������־��http://www.cnblogs.com/xproer/archive/2012/02/17/2355449.html
	�ĵ����أ�http://yunpan.cn/lk/sVRrBEVQ7w5cw
	���ⷴ����http://www.ncmem.com/bbs/showforum-19.aspx
	VC���п⣺http://www.microsoft.com/download/en/details.aspx?displaylang=en&id=29
	��ϵ���䣺1085617561@qq.com
	��ϵQQ��1085617561
*/

//ɾ��Ԫ��ֵ
Array.prototype.remove = function(val)
{
	for (var i = 0, n = 0; i < this.length; i++)
	{
		if (this[i] != val)
		{
			this[n++] = this[i]
		}
	}
	this.length -= 1
}

//ȫ�ֶ���
var HttpUploaderMgrInstance = null; //�ϴ�������ʵ��

//�ӽ�Chrome���
function LoadChromeCtl(oid,mime,path)
{
	var acx = '<embed id="objHttpPartitionFF" type="' + mime + '" pluginspage="' + path + '" width="1" height="1"/>';
	$("#" + oid).append(acx);
}
/*
	2009-11-5 �ļ�������
	���ԣ�
		UpFileList
*/
function HttpUploaderMgr()
{
	var _this = this;
	this.Config = {
		"EncodeType"		: "GB2312"
		, "CompanyLicensed"	: "�人���˿Ƽ����޹�˾"
		, "FileFilter"		: "*"//�ļ����͡��������ͣ�*���Զ������ͣ�jpg,bmp,png,gif,rar,zip,7z,doc
		, "FileSizeLimit"	: "0"//�Զ��������ϴ����ļ���С�����ֽ�Ϊ��λ��0��ʾ�����ơ�
		, "FilesLimit"		: 0//�ļ�ѡ�������ơ�0��ʾ������
		, "AllowMultiSelect": 0//��ѡ���ء�1:������ѡ��0:�رն�ѡ
		, "RangeSize"		: 131072//�ļ����С�����ֽ�Ϊ��λ������Ϊ64KB�ı������Ƽ���С��128KB��
		, "Debug"			: false//�Ƿ�򿪵�ʽģʽ��true,false
		, "LogFile"			: "F:\\log.txt"//��־�ļ�·������Ҫ�ȴ򿪵���ģʽ��
		, "AppPath"			: ""//��վ����Ŀ¼���ơ����ļ��� web
		, "CabPath"			: "http://www.ncmem.com/products/http-uploader5/HttpUploader.cab#version=2,7,57,64883"
		, "UrlCreate"		: "http://localhost:8080/HttpUploader5ChrUtf8MySQL/db/ajax_create_fid.jsp"
		, "UrlPost"			: "http://localhost:8080/HttpUploader5ChrUtf8MySQL/db/ajax_post.jsp"
		, "UrlProcess"		: "http://localhost:8080/HttpUploader5ChrUtf8MySQL/db/ajax_process.jsp"
		, "UrlComplete"		: "http://localhost:8080/HttpUploader5ChrUtf8MySQL/db/ajax_complete.jsp"
		, "UrlList"			: "http://localhost:8080/HttpUploader5ChrUtf8MySQL/db/ajax_list.jsp"
		, "UrlDel"			: "http://localhost:8080/HttpUploader5ChrUtf8MySQL/db/ajax_del.jsp"
		, "ClsidDroper"		: "8720771E-E094-40da-A8C6-F3169F1D1CF4"
		, "ClsidUploader"	: "AC982331-5018-4b65-86A7-CA5E312A0FB7"
		, "ClsidPartition"	: "9FCC0A71-B2CF-4012-AA5A-E16E78A24785"
		//64bit
		, "ClsidDroper64"	: "F6C0572E-318D-4b24-B750-1DB17C32E7B5"
		, "ClsidUploader64"	: "2897904C-2691-45d4-8DA3-6A84D54ADEDC"
		, "ClsidPartition64": "0DCDFC19-A725-4d58-B53F-AF3F128CA006"
		, "CabPath64"		: "http://www.ncmem.com/products/http-uploader5/HttpUploader64.cab#version=2,7,53,64884"
		//Firefox
		, "CabPathFirefox"	: "http://files.cnblogs.com/xproer/HttpUploader5.xpi"
		, "MimeType"		: "application/npHttpUploader5"
		//Chrome
		, "CabPathChrome"	: "http://files.cnblogs.com/xproer/HttpUploader5.crx"
		, "MimeTypeChr"		: "application/chrHttpUploader5"
		, "CrxName"			: "chrHttpUploader5"
	};

	this.ActiveX = {
		"Uploader"		: "Xproer.HttpUploader5"
		, "Partition"	: "Xproer.HttpPartition5"
		//64bit
		, "Uploader64"	: "Xproer.HttpUploader5x64"
		, "Partition64"	: "Xproer.HttpPartition5x64"
	};
	
	//���Ӳ���
	this.Fields = {
		"UserName": "test"
		, "UserPass": "test"
		,"uid":0
		,"fid":0
	};
	
	//���汾 Win32/Win64/Firefox/Chrome
	var browserName = navigator.userAgent.toLowerCase();
	this.CheckVersion = function()
	{
		//Win64
		if (window.navigator.platform == "Win64")
		{
			_this.Config["CabPath"] = _this.Config["CabPath64"];

			_this.Config["ClsidDroper"] = _this.Config["ClsidDroper64"];
			_this.Config["ClsidUploader"] = _this.Config["ClsidUploader64"];
			_this.Config["ClsidPartition"] = _this.Config["ClsidPartition64"];

			_this.ActiveX["Uploader"] = _this.ActiveX["Uploader64"];
			_this.ActiveX["Partition"] = _this.ActiveX["Partition64"];
		} //Firefox
		else if ($.browser.mozilla)
		{
			_this.Config["CabPath"] = _this.Config["CabPathFirefox"];
			_this.ActiveX["Uploader"] = _this.ActiveX["UploaderFF"];
		}
		else if (/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName))
		{
			_this.Config["CabPath"] = _this.Config["CabPathChrome"];
			_this.Config["MimeType"] = _this.Config["MimeTypeChr"];
		}
	};
	_this.CheckVersion();
	
	//http://www.ncmem.com/
	_this.Domain = "http://" + document.location.host;

	HttpUploaderMgrInstance = this;
	_this.FileFilter = new Array(); //�ļ�������
	_this.UploaderListCount = 0; 	//�ϴ�������
	_this.PluginCount = 0;			//���������ֻ�ۼ�
	_this.UploaderList = new Object(); //�ϴ����б�
	_this.UploadQueue = new Array();		//�ϴ�����
	_this.UnUploaderIdList = new Array(); //δ�ϴ���ID�б�
	_this.UploadIdList = new Array(); //�����ϴ���ID�б�
	_this.CompleteList = new Array(); //���ϴ����HttpUploader�б�
	
	//��ʼ��·��
	this.InitPath = function()
	{
		this.Config["CabPath"] = this.Domain + this.Config["AppPath"] + this.Config["CabPath"];
		this.Config["PostUrl"] = this.Domain + this.Config["AppPath"] + this.Config["PostUrl"];
	};

	//������HTML����
	this.GetHtmlContainer = function()
	{
		var html = '<div class="combinBox">';
		html += '<ul id="cbHeader" class="cbHeader">';
		html += '<li id="liPnlUploader" class="hover">�ϴ����ļ�</li>';
		html += '<li id="liPnlFiles" >�ļ��б�</li>';
		html += '</ul>';
		html += '<div class="cbBody" id="cbBody">';
		html += '<ul name="cbItem" class="block"><li id="liUploadPanel"></li></ul>';
		html += '<ul name="cbItem" class="cbItem"><li id="liListerPanel"></li></ul>';
		html += '</div>';
		html += '</div>';
		return html;
	};
	
	//�ļ��ϴ���塣
	this.GetHtml = function()
	{
		//������ק�ؼ�
		var acx = "";
		//�Զ���װCAB
		acx += '<div style="display:none">';
		//�ļ��ϴ��ؼ�
		acx += '<object id="objHttpUpLoader" classid="clsid:' + _this.Config["ClsidUploader"] + '"';
		acx += ' codebase="' + _this.Config["CabPath"] + '" width="1" height="1" ></object>';
		//�ļ���ѡ��ؼ�
		acx += '<object id="objHttpUploaderPartition" classid="clsid:' + _this.Config["ClsidPartition"] + '"';
		acx += ' codebase="' + _this.Config["CabPath"] + '" width="1" height="1" ></object>';
		acx += '</div>';
		//
//		acx += '<div id="UploaderTemplate" class="sitem">';
//		acx += '<div name="fileName" class="fileName">HttpUploader5-doc.rar</div>';
//		acx += '<div name="fileSize" class="fileSize">(1.41MB)</div>';
//		acx += '<div class="processbk"><div name="process" class="process"> </div></div>';
//		acx += '<div name="btn" class="btn">ɾ��</div>';
//		acx += '<div name="btnCancel" class="btn hide">ȡ��</div>';
//		acx += '</div>';
		//�ϴ��б���ģ��
		acx += '<div class="UploaderItem" id="UploaderTemplate">';
		acx += '<div class="UploaderItemLeft">';
		acx += '<div class="FileInfo">';
		acx += '<div name="fileName" class="FileName top-space">HttpUploader���򿪷�.pdf</div>';
		acx += '<div name="fileSize" class="FileSize" child="1">100.23MB</div>';
		acx += '</div>';
		acx += '<div class="ProcessBorder top-space"><div name="process" class="Process"></div></div>';
		acx += '<div name="msg" class="PostInf top-space">���ϴ�:15.3MB �ٶ�:20KB/S ʣ��ʱ��:10:02:00</div>';
		acx += '</div>';
		acx += '<div class="UploaderItemRight">';
		acx += '<div class="BtnInfo"><span name="btnCancel" class="Btn">ȡ��</span>&nbsp;<span name="btnDel" class="Btn hide">ɾ��</span></div>';
		acx += '<div name="percent" class="ProcessNum">35%</div>';
		acx += '</div>';
		acx += '</div>';
		return acx;
	};
	
	//���ϴ����
	this.OpenPnlUpload = function()
	{
		$("#liPnlUploader").click();
	};
	//���ļ��б����
	this.OpenPnlFiles = function()
	{
		$("#liPnlFiles").click();
	};
	
	_this.firefox = false;
	_this.ie = false;
	_this.chrome = false;
	//FireFox�������Ϣ�������
	this.BrowserFF = {
		"Check": function()//������Ƿ��Ѱ�װ
		{
			var mimetype = navigator.mimeTypes[_this.Config["MimeType"]];
			if (mimetype)
			{
				return mimetype.enabledPlugin;
			}
			return mimetype;
		}
		, "Setup": function()//��װ���
		{
			var xpi = new Object();
			xpi["Calendar"] = _this.Config["MimeType"];
			InstallTrigger.install(xpi, function(name, result) { });
		}
		, "OpenFileDialog": function()//���ļ�ѡ�񴰿�
		{
			var obj = document.getElementById("objHttpPartitionFF");
			obj.FileFilter = _this.Config["FileFilter"];
			obj.FilesLimit = _this.Config["FilesLimit"];
			obj.AllowMultiSelect = _this.Config["AllowMultiSelect"];

			var files = obj.ShowDialog();
			if (files)
			{
				for (var i = 0, l = files.length; i < l; ++i)
				{
					if (!_this.Exist(files[i]))
					{
						_this.AddFile(files[i]);
					}
				}
				_this.PostFirst();
			}
		}
		, "GetSingleFile": function()//��ȡ�����ļ�
		{
			var obj = document.getElementById("objHttpPartitionFF");
			obj.FileFilter = _this.Config["FileFilter"];
			obj.FilesLimit = _this.Config["FilesLimit"];
			obj.AllowMultiSelect = _this.Config["AllowMultiSelect"];

			var files = obj.ShowDialog();
			if (files)
			{
				return files[0];
			}
			return null;
		}
		, "OpenFolderDialog": function()//���ļ���ѡ�񴰿�
		{
			var obj = document.getElementById("objHttpPartitionFF");
			var list = obj.ShowFolder();
			if (list)
			{
				for (var i = 0, l = list.length; i < l; ++i)
				{
					if (!_this.Exist(list[i]))
					{
						_this.AddFile(list[i]);
					}
				}
				_this.PostFirst();
			}
		}
		, "PasteFiles": function()//�Ӽ������л�ȡ�ļ�
		{
			var obj = document.getElementById("objHttpPartitionFF");
			var list = obj.GetClipboardFiles();
			if (list)
			{
				for (var i = 0, l = list.length; i < l; ++i)
				{
					if (!_this.Exist(list[i]))
					{
						_this.AddFile(list[i]);
					}
				}
				_this.PostFirst();
			}
		}
		, "Init": function()//��ʼ���ؼ�
		{
			var atl = document.getElementById("objHttpPartitionFF");
			atl.FileSizeLimit = _this.Config["FileSizeLimit"];
			atl.RangeSize = _this.Config["RangeSize"];
			atl.PostUrl = _this.Config["UrlPost"];
			atl.EncodeType = _this.Config["EncodeType"];
			atl.Licensed = _this.Config["CompanyLicensed"];
			atl.Debug = _this.Config["Debug"];
			atl.LogFile = _this.Config["LogFile"];
			atl.OnPost = HttpUploader_Process;
			atl.OnStateChanged = HttpUploader_StateChanged;
		}
	};
	//IE�������Ϣ�������
	this.BrowserIE = {
		"Check": function()//������Ƿ��Ѱ�װ
		{
			try
			{
				var com = new ActiveXObject(_this.ActiveX["Uploader"]);
				return true;
			}
			catch (e) { return false; }
		}
		, "OpenFileDialog": function()//���ļ�ѡ�񴰿�
		{
			var obj = new ActiveXObject(_this.ActiveX["Partition"]);
			obj.FileFilter = _this.Config["FileFilter"];
			obj.AllowMultiSelect = _this.Config["AllowMultiSelect"];
			if (!obj.ShowDialog()) return;

			var list = obj.GetSelectedFiles();
			if (list == null) return;
			if (list.lbound(1) == null) return;

			for (var index = list.lbound(1); index <= list.ubound(1); index++)
			{
				if (!_this.Exist(list.getItem(index)))
				{
					_this.AddFile(list.getItem(index));
				}
			}
			_this.PostFirst();
		}
		, "GetSingleFile": function()//��ȡ�����ļ�
		{
			var obj = new ActiveXObject(_this.ActiveX["Partition"]);
			obj.FileFilter = _this.Config["FileFilter"];
			obj.AllowMultiSelect = _this.Config["AllowMultiSelect"];
			if (!obj.ShowDialog()) return null;

			var list = obj.GetSelectedFiles();
			if (list == null) return null;
			if (list.lbound(1) == null) return null;
			return list.getItem(list.lbound(1));
		}
		, "OpenFolderDialog": function()//���ļ���ѡ�񴰿�
		{
			var obj = new ActiveXObject(_this.ActiveX["Partition"]);
			if (!obj.ShowFolder()) return;

			var list = obj.GetSelectedFiles();
			if (list == null) return;
			if (list.lbound(1) == null) return;

			for (var index = list.lbound(1); index <= list.ubound(1); index++)
			{
				if (!_this.Exist(list.getItem(index)))
				{
					_this.AddFile(list.getItem(index));
				}
			}
			_this.PostFirst();
		}
		, "PasteFiles": function()//�Ӽ������л�ȡ�ļ�
		{
			var obj = new ActiveXObject(_this.ActiveX["Partition"]);
			var list = obj.GetClipboardFiles();
			if (list == null) return;
			if (list.lbound(1) == null) return;

			for (var index = list.lbound(1); index <= list.ubound(1); index++)
			{
				if (!_this.Exist(list.getItem(index)))
				{
					_this.AddFile(list.getItem(index));
				}
			}
			_this.PostFirst();
		}
		, "Init": function() { }
	};
	//Chrome�����
	this.BrowserChrome = {
		"Check": function()//������Ƿ��Ѱ�װ
		{
			for (var i = 0, l = navigator.plugins.length; i < l; i++)
			{
				if (navigator.plugins[i].name == _this.Config["CrxName"])
				{
					return true;
				}
			}
			return false;
		}
		, "Setup": function()//��װ���
		{
			document.write('<iframe style="display:none;" src="' + _this.Config["CabPathChrome"] + '"></iframe>');
		}
		, "OpenFileDialog": function()//���ļ�ѡ�񴰿�
		{
			var obj = document.getElementById("objHttpPartitionFF");
			obj.FileFilter = _this.Config["FileFilter"];
			obj.FilesLimit = _this.Config["FilesLimit"];
			obj.AllowMultiSelect = _this.Config["AllowMultiSelect"];

			var files = obj.ShowDialog();
			if (files)
			{
				for (var i = 0, l = files.length; i < l; ++i)
				{
					if (!_this.Exist(files[i]))
					{
						_this.AddFile(files[i]);
					}
				}
				_this.PostFirst();
			}
		}
		, "GetSingleFile": function()//��ȡ�����ļ�
		{
			var obj = document.getElementById("objHttpPartitionFF");
			obj.FileFilter = _this.Config["FileFilter"];
			obj.FilesLimit = _this.Config["FilesLimit"];
			obj.AllowMultiSelect = _this.Config["AllowMultiSelect"];

			var files = obj.ShowDialog();
			if (files)
			{
				return files[0];
			}
			return null;
		}
		, "OpenFolderDialog": function()//���ļ���ѡ�񴰿�
		{
			var obj = document.getElementById("objHttpPartitionFF");
			var list = obj.ShowFolder();
			if (list)
			{
				for (var i = 0, l = list.length; i < l; ++i)
				{
					if (!_this.Exist(list[i]))
					{
						_this.AddFile(list[i]);
					}
				}
				_this.PostFirst();
			}
		}
		, "PasteFiles": function()//�Ӽ������л�ȡ�ļ�
		{
			var obj = document.getElementById("objHttpPartitionFF");
			var list = obj.GetClipboardFiles();
			if (list)
			{
				for (var i = 0, l = list.length; i < l; ++i)
				{
					if (!_this.Exist(list[i]))
					{
						_this.AddFile(list[i]);
					}
				}
				_this.PostFirst();
			}
		}
		, "Init": function()//��ʼ���ؼ�
		{
			var atl = document.getElementById("objHttpPartitionFF");
			atl.FileSizeLimit = _this.Config["FileSizeLimit"];
			atl.RangeSize = _this.Config["RangeSize"];
			atl.PostUrl = _this.Config["UrlPost"];
			atl.EncodeType = _this.Config["EncodeType"];
			atl.Licensed = _this.Config["CompanyLicensed"];
			atl.Debug = _this.Config["Debug"];
			atl.LogFile = _this.Config["LogFile"];
			atl.OnPost = HttpUploader_Process;
			atl.OnStateChanged = HttpUploader_StateChanged;
		}
	};
	
	//������������
	_this.Browser = _this.BrowserIE;
	if ($.browser.msie)
	{
		_this.ie = true;
	}//Firefox
	else if ($.browser.mozilla)
	{
		_this.firefox = true;
		_this.Browser = this.BrowserFF;
		if (!_this.Browser.Check()) { _this.Browser.Setup(); }
	}//Chrome
	else if (/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName))
	{
		_this.chrome = true;
		_this.Browser = this.BrowserChrome;
		if (!_this.Browser.Check()) { _this.Browser.Setup(); }
	}

	//��ȫ��飬���û��ر���ҳʱ�Զ�ֹͣ�����ϴ�����
	this.SafeCheck = function()
	{
		$(window).bind("beforeunload", function()
		{
			if (HttpUploaderMgrInstance.UploadIdList.length > 0)
			{
				event.returnValue = "�����г����������У�ȷ���رգ�";
			}
		});

		$(window).bind("unload", function()
		{ 
			if (HttpUploaderMgrInstance.UploadIdList.length > 0)
			{
				HttpUploaderMgrInstance.StopAll();
			}
		});
	};

	this.Load = function()
	{
		document.write(_this.GetHtml());
		_this.SafeCheck();
	};

	//�ӽ��������ϴ���壬�ļ��б����
	this.LoadTo = function(oid)
	{
		$("#"+oid).html(_this.GetHtml());
		_this.SafeCheck();
		LoadChromeCtl(oid,_this.Config["MimeType"],_this.Config["CabPath"]);
	};
	
	this.Droper = null;
	this.Partition = null;
	
	//��ʼ������
	this.InitContainer = function()
	{
		var cbItemLast = null;
		$("#cbHeader li").each(function(n)
		{
			if (this.className == "hover")
			{
				cbItemLast = this;
			}

			$(this).click(function()
			{
				$("ul[name='cbItem']").each(function(i)
				{
					this.style.display = i == n ? "block" : "none"; /*ȷ����������ʾ��һ������*/
				});
				if (cbItemLast) cbItemLast.className = "";

				if (this.className == "hover")
				{
					this.className = "";
				}
				else
				{
					this.className = "hover";
				}
				cbItemLast = this;
			});
		});
	};
	//��ʼ����һ����window.onload�е���
	this.Init = function()
	{
		_this.UploaderTemplateDiv = document.getElementById("UploaderTemplate");
		_this.FirefoxAtl = document.getElementById("objHttpPartitionFF");
		_this.Browser.Init(); //
	};
	
	//���������ļ�
	this.ClearComplete = function()
	{
		for(var i = 0 ,l=_this.CompleteList.length; i < l; ++i)
		{
			_this.Delete(_this.CompleteList[i].FileID);
		}
		_this.CompleteList.length = 0;
	};

	//�ϴ������Ƿ�����
	this.IsPostQueueFull = function()
	{
		//Ŀǰֻ֧��ͬʱ�ϴ������ļ�
		if (_this.UploadIdList.length > 2)
		{
			return true;
		}
		return false;
	};

	//���һ���ϴ�ID
	this.AppendUploadId = function(fid)
	{
		_this.UploadIdList.push(fid);
	};
	
	//��ӵ��ϴ�����
	this.AppendQueue = function(fid)
	{
		_this.UploadQueue.push(fid);
	};

	//�Ӷ�����ɾ��
	this.RemoveQueue = function(fid)
	{ 
		if (_this.UploadQueue.length < 1) return;
		
		for (var i = 0, l = _this.UploadQueue.length; i < l; ++i)
		{
			if (_this.UploadQueue[i] == fid)
			{
				_this.UploadQueue.remove(fid);
			}
		}
	};
	
	//��ӵ�δ�ϴ�ID�б�(ֹͣ������)
	this.AppendUnUploadIds = function(fid)
	{
		_this.UnUploaderIdList.push(fid);
	};
	
	//��δ�ϴ�ID�б�ɾ����(�ϴ����)
	this.RemoveUnUploadIds = function(fid)
	{ 
		if (_this.UnUploaderIdList.length < 1) return;
		
		for (var i = 0, l = _this.UnUploaderIdList.length; i < l; ++i)
		{
			if (_this.UnUploaderIdList[i] == fid)
			{
				_this.UnUploaderIdList.remove(fid);
			}
		}
	};

	/*
	�ӵ�ǰ�ϴ�ID�б���ɾ��ָ���
	�˺����������¹���һ��Array
	*/
	this.RemoveUploadId = function(fid)
	{
		if (_this.UploadIdList.length < 1) return;
		
		for (var i = 0, l = _this.UploadIdList.length; i < l; ++i)
		{
			if (_this.UploadIdList[i] == fid)
			{
				_this.UploadIdList.remove(fid);
			}
		}
	};

	//ֹͣ�����ϴ���
	this.StopAll = function()
	{
		for (var i = 0, l = _this.UploadIdList.length; i < l; ++i)
		{
			_this.UploaderList[_this.UploadIdList[i]].StopManual();
		}
		_this.UploadIdList.length = 0;
	};

	/*
	��ӵ��ϴ��б�
	����
	fid �ϴ���ID
	uploaderItem �µ��ϴ�����
	*/
	this.AppenToUploaderList = function(fid, uploaderItem)
	{
		_this.UploaderList[fid] = uploaderItem;
		_this.UploaderListCount++;
	};

	/*
	��ӵ��ϴ��б��
	1.��ӵ��ϴ��б��
	2.��ӷָ���
	������
	fid �ϴ���ID
	uploaderDiv �µ��ϴ���Ϣ��
	����ֵ��
		����ӵķָ���
	*/
	this.AppendToUploaderListDiv = function(fid, uploaderDiv)
	{
		//_this.UploaderListDiv.appendChild(uploaderDiv);
		$(_this.UploaderListDiv).append(uploaderDiv);

		var split = "<div class=\"Line\" style=\"display:block;\" id=\"FilePostLine" + fid + "\"></div>";
		//_this.UploaderListDiv.insertAdjacentHTML("beforeEnd", split);
		$(_this.UploaderListDiv).append(split);
		var obj = document.getElementById("FilePostLine" + fid);
		return obj;
	};

	//���͵�ǰ���еĵ�һ���ļ�
	this.PostFirst = function()
	{
		//�ϴ��б�Ϊ��
		if (_this.UploadQueue.length > 0)
		{
			while (_this.UploadQueue.length > 0)
			{
				//�ϴ���������
				if (_this.IsPostQueueFull()) return;
				var index = _this.UploadQueue.shift();
				_this.UploaderList[index].Post();
			}
		}
	};

	/*
	��֤�ļ����Ƿ����
	����:
	[0]:�ļ�����
	*/
	this.Exist = function()
	{
		var fn = arguments[0];

		for (a in _this.UploaderList)
		{
			if (_this.UploaderList[a].LocalFile == fn)
			{
				return true;
			}
		}
		return false;
	};

	/*
	����IDɾ���ϴ�����
	����:
	fid �ϴ���ID��Ψһ��ʶ
	*/
	this.Delete = function(fid)
	{
		var obj = _this.UploaderList[fid];
		if (null == obj) return;

		_this.RemoveQueue(fid); //�Ӷ�����ɾ��
		_this.RemoveUnUploadIds(fid);//��δ�ϴ��б���ɾ��

		//ɾ��div
		_this.UploaderListDiv.removeChild(obj.div);
		//ɾ���ָ���
		_this.UploaderListDiv.removeChild(obj.spliter);
		obj.LocalFile = "";
		obj.Dispose();
	};

	/*
		�����ļ�������
		������
			filter �ļ������ַ�����ʹ�ö��ŷָ�(exe,jpg,gif)
	*/
	this.SetFileFilter = function(filter)
	{
		_this.FileFilter.length = 0;
		_this.FileFilter = filter.split(",");
	};

	/*
	�ж��ļ������Ƿ���Ҫ����
	�����ļ���׺�������жϡ�
	*/
	this.NeedFilter = function(fname)
	{
		if (_this.FileFilter.length == 0) return false;
		var exArr = fname.split(".");
		var len = exArr.length;
		if (len > 0)
		{
			for (var i = 0, l = _this.FileFilter.length; i < l; ++i)
			{
				//���Դ�Сд
				if (_this.FileFilter[i].toLowerCase() == exArr[len - 1].toLowerCase())
				{
					return true;
				}
			}
		}
		return false;
	};
	
	//���ļ�ѡ��Ի���
	this.OpenFileDialog = function()
	{
		_this.Browser.OpenFileDialog();
	};
	
	//���ļ���ѡ��Ի���
	this.OpenFolderDialog = function()
	{
		_this.Browser.OpenFolderDialog();
	};

	//ճ���ļ�
	this.PasteFiles = function()
	{
		_this.Browser.PasteFiles();
	};
	
	//���������С�Ƿ�Ϸ�������Ϊȫ����
	this.IsNumber = function(num)
	{
		var reg = /\D/;
		return reg.test(num);
	};
	
	/*
		���һ�������ļ�
		������
			filePath �����ļ�·��(urlencode����)��D:\\Soft\\QQ2010.exe
			postedLength ���ϴ��ֽڡ��ؼ����Ӵ�λ�ÿ�ʼ��������
			postedPercent ���ϴ��ٷֱȡ�ʾ����20%
			md5 �ļ�MD5ֵ��32���ַ�
			sfid ���������Ӧ��fid������Ψһ
	*/
	this.AddResumeFile = function(filePath, postedLength, postedPercent, md5, sfid)
	{
		//�����ļ����ƴ���
		if (_this.Exist(filePath)) return;

		var fileName = filePath.substr(filePath.lastIndexOf("\\") + 1);
		var fid = _this.UploaderListCount;
		_this.AppendQueue(fid);//��ӵ�����

		var upFile = new HttpUploader(fid, filePath, this);
		var newTable = _this.UploaderTemplateDiv.cloneNode(true);
		var jqItem = $(newTable);
		jqItem.css("display", "block");
		jqItem.attr("id", fid);
		//newTable.style.display = "block";
		//newTable.id = "item" + fid;

		var divLeft = jqItem.children().eq(0);
		var divRight = jqItem.children(1).eq(1);
		var objFileName = divLeft.children().eq(0).children().eq(0);
		$(objFileName).text(fileName);
		$(objFileName).attr("title", fileName);
		var fileSize = divLeft.children().eq(0).children().eq(1);
		fileSize.text(upFile.FileSize);
		upFile.pProcess = divLeft.children().eq(1).children().eq(0);
		upFile.pProcess.css("width", postedPercent);
		upFile.pMsg = divLeft.children().eq(2);
		upFile.pMsg.text("");
		upFile.pButton = divRight.children().eq(0).children().eq(0);
		upFile.pButton.attr("fid", fid);
		upFile.pButton.attr("domid", "item" + fid);
		upFile.pButton.attr("lineid", "FilePostLine" + fid);
		//upFile.pButton.click(BtnControlClick);
		$(upFile.pButton).click(function()
		{
			var obj = $(this);
			var objup = HttpUploaderMgrInstance.UploaderList[obj.attr("fid")];

			switch (obj.text())
			{
				case "��ͣ":
				case "ֹͣ":
					objup.Stop(obj.attr("fid"));
					break;
				case "ȡ��":
					{
						objup.Stop();
						HttpUploaderMgrInstance.Delete(objup.FileID);
					}
					break;
				case "����":
					if (!HttpUploaderMgrInstance.IsPostQueueFull())
					{
						HttpUploaderMgrInstance.AppendUploadId(objup.FileID);
						objup.Upload();
					}
					else
					{
						objup.Ready();
						//��ӵ�����
						HttpUploaderMgrInstance.AppendQueue(objup.FileID);
						objup.pButton.text("ֹͣ");
					}
					break;
				case "����":
					objup.Post();
					break;
			}
		}); //ģ����ư�ť�¼�
		upFile.pPercent = divRight.children().eq(1);
		upFile.pPercent.text(postedPercent);
		upFile.ATL.SetPostedLength(postedLength); //��������λ��
		upFile.ATL.SetMD5(md5);
		upFile.MD5 = md5;
		upFile.fid = sfid;
		upFile.ResetFields(); //����UID,FID�ȸ����ֶ���Ϣ

		//��ӵ��ϴ��б�
		this.AppenToUploaderList(fid, upFile);
		//��ӵ��ϴ��б��
		upFile.spliter = _this.AppendToUploaderListDiv(fid, newTable);
		upFile.div = newTable;
		//upFile.Post(); //��ʼ�ϴ�
		upFile.Ready(); //׼��
	};

	/*
		���һ���ļ����ϴ�����
		����:
			fileName ��������·�����ļ����ơ�D:\\Soft\\QQ.exe
	*/
	this.AddFile = function(filePath)
	{
		//�����ļ����ƴ���
		if (_this.Exist(filePath)) return;
		//������Ϊ��������
		if (_this.NeedFilter(filePath)) return;

		var fileName = filePath.substr(filePath.lastIndexOf("\\") + 1);
		var fid = _this.UploaderListCount;
		_this.AppendQueue(fid);//��ӵ�����

		var upFile = new HttpUploader(fid, filePath, _this);
		var newTable = _this.UploaderTemplateDiv.cloneNode(true);
		var jqItem = $(newTable);
		jqItem.css("display", "block");
		jqItem.attr("id", "item" + fid);

		var divLeft = jqItem.children().eq(0);
		var divRight = jqItem.children().eq(1);
		var objFileName = divLeft.children().eq(0).children().eq(0);
		objFileName.text(fileName);
		objFileName.attr("title", fileName);
		var fileSize = divLeft.children().eq(0).children().eq(1);
		fileSize.text(upFile.FileSize);
		upFile.pProcess = divLeft.children().eq(1).children().eq(0);
		upFile.pMsg = divLeft.children().eq(2);
		upFile.pMsg.text("");
		upFile.pButton = divRight.children().eq(0).children().eq(0);
		upFile.pButton.attr("fid", fid);
		upFile.pButton.attr("domid", "item" + fid);
		upFile.pButton.attr("lineid", "FilePostLine" + fid);
		//upFile.pButton.attachEvent("onclick", BtnControlClick);
		$(upFile.pButton).click(function()
		{
			var obj = $(this);
			var objup = HttpUploaderMgrInstance.UploaderList[obj.attr("fid")];

			switch (obj.text())
			{
				case "��ͣ":
				case "ֹͣ":
					objup.Stop(obj.attr("fid"));
					break;
				case "ȡ��":
					{
						//var lister = HttpUploaderMgrInstance.UploaderListDiv;
						//lister.removeChild(objup.div);
						//lister.removeChild(objup.spliter);
						objup.Stop();
						HttpUploaderMgrInstance.Delete(objup.FileID);
					}
					break;
				case "����":
						if (!HttpUploaderMgrInstance.IsPostQueueFull())
						{
							HttpUploaderMgrInstance.AppendUploadId(objup.FileID);
							objup.Upload();
						}
						else
						{
							objup.Ready();
							//��ӵ�����
							HttpUploaderMgrInstance.AppendQueue(objup.FileID);
							objup.pButton.text("ֹͣ");
						}
					break;
				case "����":
					objup.Post();
					break;
			}
		}); //ģ����ư�ť�¼�
		upFile.pPercent = divRight.children().eq(1);
		upFile.pPercent.text("0%");
		upFile.Manager = _this;

		//��ӵ��ϴ��б�
		this.AppenToUploaderList(fid, upFile);
		//��ӵ��ϴ��б��
		upFile.spliter = this.AppendToUploaderListDiv(fid, newTable);
		upFile.div = newTable;
		//upFile.Post(); //��ʼ�ϴ�
		upFile.Ready(); //׼��
	};
	
	//�ϴ������ļ�
	this.UploadSingleFile = function()
	{
		var path = _this.Browser.GetSingleFile();
		if (null == path) return;

		_this.UploadFile(path, "upPnl");
	};
	
	//�ϴ��ļ�
	this.UploadFile = function(filePath, oid)
	{
		var fileName = filePath.substr(filePath.lastIndexOf("\\") + 1);
		var fid = _this.UploaderListCount;
		_this.AppendQueue(fid); //��ӵ�����

		var upFile = new HttpUploader(fid, filePath, _this);
		var newTable = _this.UploaderTemplateDiv.cloneNode(true);
		var jqItem = $(newTable);
		jqItem.css("display", "block");
		jqItem.attr("id", "item" + fid);

		var objFileName = jqItem.find("div[name='fileName']");
		var fileSize	= jqItem.find("div[name='fileSize']");
		var process		= jqItem.find("div[name='process']");
		var msg			= jqItem.find("div[name='msg']");
		var btnDel		= jqItem.find("span[name='btnDel']");
		var btnCancel	= jqItem.find("span[name='btnCancel']");
		var divPercent	= jqItem.find("div[name='percent']");

		objFileName.text(fileName);
		objFileName.attr("title", fileName);
		fileSize.text( upFile.FileSize );
		upFile.pProcess = process;
		upFile.pMsg = msg;
		upFile.pMsg.text("");
		upFile.pPercent = divPercent;
		upFile.pPercent.text("0%");
		upFile.pButton = btnDel;
		upFile.pButton.attr("fid", fid);
		upFile.pButton.attr("domid", "item" + fid);
		upFile.pButton.attr("lineid", "FilePostLine" + fid);
		upFile.pBtnCancel = btnCancel;
		upFile.pBtnCancel.click(function()
		{
			upFile.Cancel();
		});
		$(upFile.pButton).click(function()
		{
			var obj = $(this);
			var objup = HttpUploaderMgrInstance.UploaderList[obj.attr("fid")];

			switch (obj.text())
			{
				case "��ͣ":
				case "ֹͣ":
					objup.Stop(obj.attr("fid"));
					break;
				case "ȡ��":
					{
						//var lister = HttpUploaderMgrInstance.UploaderListDiv;
						//lister.removeChild(objup.div);
						//lister.removeChild(objup.spliter);
						objup.Stop();
						HttpUploaderMgrInstance.Delete(objup.FileID);
					}
					break;
				case "����":
					objup.Upload();
					break;
				case "����":
					objup.Post();
					break;
			}
		}); //ģ����ư�ť�¼�
		//upFile.pPercent = divRight.children().eq(1);
		//upFile.pPercent = jqItem.find("div[name='percent']");
		//upFile.pPercent.text("0%");
		upFile.Manager = _this;
		//��ӵ��ϴ��б�
		this.AppenToUploaderList(fid, upFile);
		//��ӵ��ϴ��б��
		//upFile.spliter = this.AppendToUploaderListDiv(fid, newTable);
		upFile.div = newTable;
		upFile.Post(); //��ʼ�ϴ�
		//upFile.Ready(); //׼��

		$("#" + oid).append(jqItem);
	};
}

var HttpUploaderErrorCode = {
	"0": "���ӷ���������"
	, "1": "�������ݴ���"
	, "2": "�������ݴ���"
	, "3": "δ���ñ����ļ�"
	, "4": "�����ļ�������"
	, "5": "�򿪱����ļ�����"
	, "6": "���ܶ�ȡ�����ļ�"
	, "7": "��˾δ��Ȩ"
	, "8": "δ����IP"
	, "9": "����δ��Ȩ"
	, "10": "�ļ���С��������"//Ĭ��Ϊ2G
	//md5
	, "200": "�޴���ļ�"
	, "201": "�ļ���СΪ0"
};

var HttpUploaderState = {
	Ready: 0,
	Posting: 1,
	Stop: 2,
	Error: 3,
	GetNewID: 4,
	Complete: 5,
	WaitContinueUpload: 6,
	None: 7,
	Waiting: 8
	,MD5Working:9
};

//�ļ��ϴ�����
function HttpUploader(fileID, filePath, mgr)
{
	//this.pMsg;
	//this.pProcess;
	//this.pPercent;
	//this.pButton
	//this.div
	//this.split
	//this.FileID
	this.ie = mgr.ie;
	this.firefox = mgr.firefox;
	this.chrome = mgr.chrome;
	this.FirefoxAtl = mgr.FirefoxAtl;
	this.Manager = mgr; //�ϴ�������ָ��
	this.Config = mgr.Config;
	this.Fields = mgr.Fields;
	this.ActiveX = mgr.ActiveX;
	this.State = HttpUploaderState.None;
	this.MD5 = "";
	var ref = this;
	
	//��ʼ���ؼ�
	this.ATL = {
		"Create": function()
		{
			this.Atl = new ActiveXObject(ref.ActiveX["Uploader"]);
			this.Atl.Debug = ref.Config["Debug"];
			this.Atl.LogFile = ref.Config["LogFile"];
		}
		, "SetObject": function(obj) { this.Atl.Object = obj; }
		, "SetPostUrl": function(url) { this.Atl.PostUrl = url; }
		, "SetEncodeType": function(encode) { this.Atl.EncodeType = encode; }
		, "SetLocalFile": function(filePath) { this.Atl.LocalFile = filePath; }
		, "SetPostedLength": function(len) { this.Atl.PostedLength = len; }
		, "SetFileSizeLimit": function(limit) { this.Atl.FileSizeLimit = limit; }
		, "SetRangeSize": function(size) { this.Atl.RangeSize = size; }
		, "SetLicensed": function(license) { this.Atl.CompanyLicensed = license; }
		, "SetMD5": function(md5) { this.Atl.MD5 = md5; }
		, "SetOnPost": function() { this.Atl.OnPost = HttpUploader_Process; }
		, "SetOnStateChanged": function() { this.Atl.OnStateChanged = HttpUploader_StateChanged; }
		//get
		, "GetFileSize": function() { return this.Atl.FileSize; }
		, "GetFileLength": function() { return this.Atl.FileLength; }
		, "GetResponse": function() { return this.Atl.Response; }
		, "GetMD5": function() { return this.Atl.MD5; }
		, "GetMd5Percent": function() { return this.Atl.Md5Percent; }
		, "GetPostedLength": function() { return this.Atl.PostedLength; }
		, "GetErrorCode": function() { return this.Atl.ErrorCode; }
		//methods
		, "CheckFile": function() { this.Atl.CheckFile(); }
		, "Post": function() { this.Atl.Post(); }
		, "Stop": function() { this.Atl.Stop(); }
		, "ClearFields": function() { this.Atl.ClearFields(); }
		, "AddField": function(fn, fv) { this.Atl.AddField(fn, fv); }
		, "Dispose": function() { delete this.Atl; }
		, "IsPosting": function() { return this.Atl.IsPosting(); }
		//property
		, "Atl": null
		, "FileID": 0//�ɿؼ������
	};
	//Firefox ���
	this.ATLFF = {
		"Create": function() { }
		, "SetLocalFile": function(filePath) { this.FileID = this.Atl.AddFile(filePath); }
		, "SetObject": function(obj) { this.Atl.SetObject(this.FileID, obj); }
		, "SetPostUrl": function(url) { }
		, "SetEncodeType": function(encode) { }
		, "SetPostedLength": function(len) { this.Atl.SetPostedLength(this.FileID, len); }
		, "SetFileSizeLimit": function(limit) { }
		, "SetRangeSize": function(size) { }
		, "SetLicensed": function(licensed) { }
		, "SetMD5": function(md5) { this.Atl.SetMD5(this.FileID, md5); }
		, "SetOnPost": function() { }
		, "SetOnStateChanged": function() { }
		//get
		, "GetFileSize": function() { return this.Atl.GetFileSize(this.FileID); }
		, "GetFileLength": function() { return this.Atl.GetFileLength(this.FileID); }
		, "GetResponse": function() { return this.Atl.GetResponse(this.FileID); }
		, "GetMD5": function() { return this.Atl.GetMD5(this.FileID); }
		, "GetMd5Percent": function() { return this.Atl.GetMd5Percent(this.FileID); }
		, "GetPostedLength": function() { return this.Atl.GetPostedLength(this.FileID); }
		, "GetErrorCode": function() { return this.Atl.GetErrorCode(this.FileID); }
		//methods
		, "CheckFile": function() { this.Atl.CheckFile(this.FileID); }
		, "Post": function() { this.Atl.Post(this.FileID); }
		, "Stop": function() { this.Atl.Stop(this.FileID); }
		, "ClearFields": function() { this.Atl.ClearFields(this.FileID); }
		, "AddField": function(fn, fv) { this.Atl.AddField(this.FileID, fn, fv); }
		, "Dispose": function() { this.Atl.Remove(this.FileID); }
		, "IsPosting": function() { return this.Atl.IsPosting(this.FileID); }
		//property
		, "Atl": ref.FirefoxAtl
		, "FileID": 0//�ɿؼ�����ı�ʶ����ȫ��Ψһ��
	};
	//��Firefox��Chrome�����
	if (this.firefox||this.chrome){this.ATL = this.ATLFF;}
	this.ATL.Create();
	
	this.ATL.SetLocalFile(filePath);
	this.ATL.SetObject(this);
	this.ATL.SetPostUrl(this.Config["UrlPost"]);
	this.ATL.SetEncodeType(this.Config["EncodeType"]);
	this.ATL.SetOnPost();
	this.ATL.SetOnStateChanged();
	this.ATL.SetPostedLength("0"); //����λ�á�
	this.ATL.SetFileSizeLimit(this.Config["FileSizeLimit"]);
	this.ATL.SetRangeSize(this.Config["RangeSize"]);
	this.ATL.SetLicensed(this.Config["CompanyLicensed"]);
	//this.ATL.FileID = fileID;
	this.FileName = filePath.substr(filePath.lastIndexOf("\\") + 1);
	this.LocalFile = filePath;
	//this.FileID = this.ATL.FileID;
	this.FileID = fileID;
	this.FileSize = this.ATL.GetFileSize(); //��ʽ������ļ���С 50MB
	this.FileLength = this.ATL.GetFileLength();//���ֽ�Ϊ��λ���ַ���
	this.PathLocal = encodeURIComponent(filePath); //URL�����ı���·��
	this.PathRelat = ""; //�ļ��ڷ������е���Ե�ַ��ʾ����http://www.ncmem.con/upload/201204/03/QQ2012.exe
	this.fid = 0; //����������ݿ��Ӧ��fid
	this.uid = this.Fields["uid"];
	
	//���ø�����Ϣ
	this.ResetFields = function()
	{
		//��Ӹ�����Ϣ
		this.ATL.ClearFields(); //��ո����ֶ�
//		$.each(upRef.Fields, function(name, val)
//		{
//			upRef.ATL.AddField(name, val);
//		});
		for (var field in this.Fields)
		{
			this.ATL.AddField(field, this.Fields[field]);
		}
		this.ATL.AddField("fid", this.fid);
		this.ATL.AddField("uid", this.uid);
	};
	
	//׼��
	this.Ready = function()
	{
		//this.pButton.style.display = "none";
		//this.pMsg.text("�����ϴ������еȴ�...");
		this.State = HttpUploaderState.Ready;
	};

	this.Post = function()
	{
		this.Manager.AppendUploadId(this.FileID);
		if (this.MD5.length > 0)
		{
			this.Upload();
		}
		else
		{
			//alert(this.ATL.FileID);
			this.CheckFile();
		}
	};
	
	//�ϴ�
	this.Upload = function()
	{
		//�����ϴ�
		if (this.ATL.IsPosting())
		{
			this.Manager.RemoveUploadId(this.FileID);
		}
		else
		{
			this.pButton.css("display", "");
			this.pButton.text("ֹͣ");
			this.pMsg.innerText = "�������ӷ�����....";
			this.State = HttpUploaderState.Posting;

			this.ATL.Post();
		}
	};
	
	//����ļ�
	this.CheckFile = function()
	{
		this.State = HttpUploaderState.MD5Working;
		this.ATL.CheckFile();
	};

	//������һ������
	this.PostNext = function()
	{
		if (this.Manager.IsPostQueueFull()) return; //�ϴ���������

		if (this.Manager.UploadQueue.length > 0)
		{
			var index = this.Manager.UploadQueue.shift();
			var obj = this.Manager.UploaderList[index];

			//����״̬
			if (HttpUploaderState.Ready == obj.State)
			{
				obj.Post();
			}
		} //ȫ���ϴ����
		else
		{
			if (this.Manager.UnUploaderIdList.join("").length < 1)
			{
				//alert("�����ļ��ϴ���ϡ�");
			}
		}
	};
	
	//�ֶ�ֹͣ��һ����StopAll�е���
	this.StopManual = function()
	{
		if (HttpUploaderState.Posting == this.State)
		{
			this.pButton.text("����");
			this.pMsg.text("������ֹͣ....");
			this.ATL.Stop();
			this.State = HttpUploaderState.Stop;
		}
	};
	
	//ֹͣ���䣬һ�����û����ֹͣ��ťʱ����
	this.Stop = function()
	{
		if (HttpUploaderState.Ready == this.State)
		{
			this.pButton.text("����");
			this.pMsg.text("������ֹͣ....");
			this.State = HttpUploaderState.Stop;
			//this.Manager.RemoveQueue(this.FileID);
			//this.Manager.AppendUnUploadIds(this.FileID);//��ӵ�δ�ϴ��б�
			//this.PostNext();
			return;
		}
		
		this.pButton.text("����");
		this.pMsg.text("������ֹͣ....");
		this.ATL.Stop();
		this.State = HttpUploaderState.Stop;

		//���ϴ��б���ɾ��
		this.Manager.RemoveUploadId(this.FileID);
		//��ӵ�δ�ϴ��б�
		//this.Manager.AppendUnUploadIds(this.FileID);
		//������һ��
		//this.PostNext();
	};
	
	//ȡ����һ�����ϴ�������ִ��
	this.Cancel = function()
	{
		this.Stop();
		$(this.div).empty();
	};

	//�ͷ��ڴ�
	this.Dispose = function()
	{
		this.ATL.Dispose();
	};
	
	//�����ϴ���ɣ�
	this.QuickComplete = function()
	{
		this.pButton.hide();
		this.pBtnCancel.hide();
		this.pProcess.css("width","100%");
		this.pPercent.text("100%");
		this.pMsg.text("������������ͬ�ļ��������ϴ��ɹ���");
		this.Manager.CompleteList.push(this);
		this.State = HttpUploaderState.Complete;
		//���ϴ��б���ɾ��
		this.Manager.RemoveUploadId(this.FileID);
		//��δ�ϴ��б���ɾ��
		//this.Manager.RemoveUnUploadIds(this.FileID);
		this.Dispose();
		//��ӵ��ļ��б�
		//this.PostNext();
	};
}

//�ϴ�����
function HttpUploader_Error(obj)
{
	obj.pMsg.text(HttpUploaderErrorCode[obj.ATL.GetErrorCode()]);
	//�ļ���С��������,�ļ���СΪ0
	if (10 == obj.ATL.GetErrorCode()
		|| 201 == obj.ATL.GetErrorCode())
	{
		obj.pButton.text("ȡ��");
	}
	else
	{
		obj.pButton.text("����");
	}
	obj.State = HttpUploaderState.Error;
	//���ϴ��б���ɾ��
	obj.Manager.RemoveUploadId(obj.FileID);
	//��ӵ�δ�ϴ��б�
	//obj.Manager.AppendUnUploadIds(obj.FileID);
	//obj.PostNext();
}

//�ϴ���ɣ��������������Ϣ
function HttpUploader_Complete(obj)
{
	//obj.pButton.css("display", "none");
	obj.pButton.hide();
	obj.pBtnCancel.hide();
	obj.pProcess.css("width","100%");
	obj.pPercent.text("100%");
	obj.pMsg.text("�ϴ����");
	obj.pProcess.attr("title","�ϴ����");
	obj.Manager.CompleteList.push(obj);
	obj.State = HttpUploaderState.Complete;
	//���ϴ��б���ɾ��
	obj.Manager.RemoveUploadId(obj.FileID);
	//��δ�ϴ��б���ɾ��
	//obj.Manager.RemoveUnUploadIds(obj.FileID);
	//obj.Dispose();

	$.ajax({
		type: "POST"
		, url: obj.Config["UrlComplete"]
		, data: { md5: obj.MD5, uid: obj.Fields["uid"], fid: obj.fid, time: Date() }
		, success:
		function(msg)
		{
			//��ӵ��ļ��б�
			//obj.PostNext();
		}
        , error: function() { alert("�����������Complete��Ϣ����"); }
        , complete: function(req, sta) { req = null; }
	});
}

//������ȡ�Ƶ��Ϊÿ�����һ��
function HttpUploader_Process(obj, speed, postedLength, percent, times)
{
	obj.pPercent.text(percent);
	obj.pProcess.css("width",percent);
	var str = "���ϴ�:" + postedLength + " �ٶ�:" + speed + "/S ʣ��ʱ��:" + times;
	obj.pMsg.text(str);
	obj.pProcess.attr("title", str);
}

//���������ӳɹ�
function HttpUploader_Connected(obj)
{
	obj.pMsg.text("���������ӳɹ�");
	obj.pProcess.attr("title", "���������ӳɹ�");
}

//MD5������
function HttpUploader_MD5_Working(obj)
{
	var msg = "����ɨ�豾���ļ�������ɣ�" + obj.ATL.GetMd5Percent() + "%";
	obj.pMsg.text(msg);
	obj.pProcess.attr("title",msg);
}

//MD5�������
function HttpUploader_MD5_Complete(obj)
{
	obj.MD5 = obj.ATL.GetMD5();
	//�ڴ˴����ӷ�������֤���롣
	obj.pMsg.text("MD5������ϣ���ʼ���ӷ�����...");

	$.ajax({
		type: "POST"
		, url: obj.Config["UrlCreate"]
		, data: { md5: obj.MD5, uid: obj.Fields["uid"], fileLength: obj.FileLength, fileSize: obj.FileSize, pathLocal: obj.PathLocal, time: Date() }
		, success:
		function(msg)
		{
			var json = eval(msg)
			json = json[0];
			obj.fid = json.fid;
			obj.ResetFields();
			//�������Ѵ�����ͬ�ļ��������ϴ����
			if ("True" == json.PostComplete)
			{
				obj.QuickComplete();
			} //�������ļ�û���ϴ����
			else
			{
				obj.ATL.SetPostedLength(json.PostedLength);
				obj.pProcess.css("width", json.PostedPercent);
				obj.pProcess.attr("title",json.PostedPercent);
				obj.Upload();
			}
		}
        , error: function() { alert("�����������MD5��Ϣ����"); }
        , complete: function(req, sta) { req = null; }

	});
}

/*
	HUS_Leisure			=0	//����
	,HUS_Uploading		=1	//�ϴ��� 
	,HUS_Stop  			=2	//ֹͣ 
	,HUS_UploadComplete	=3	//������� 
	,HUS_Error 			=4	//���� 
	,HUS_Connected 		=5	//������������
	,HUS_Md5Working		=6	//MD5������
	,HUS_Md5Complete	=7	//MD5�������
*/
function HttpUploader_StateChanged(obj,state)
{
	switch(state)
	{
		case 0:
			break;
		case 1:
			break;
		case 2:
			break;
		case 3:
			HttpUploader_Complete(obj);
			break;
		case 4:
			HttpUploader_Error(obj);
			break;
		case 5:
			HttpUploader_Connected(obj);
			break;
		case 6:
			HttpUploader_MD5_Working(obj);
			break;
		case 7:
			HttpUploader_MD5_Complete(obj);
			break;
	}
}