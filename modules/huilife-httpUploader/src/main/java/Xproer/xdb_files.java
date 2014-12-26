package Xproer;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.sql.*;
import java.text.SimpleDateFormat;
import java.util.Date;

/*
 * 原型
*/
public class xdb_files {

	public xdb_files()
	{
		this._postedtime = new Date();
	}
	
	/*
	 * 自动从ResultSet中读取数据
	 * */
	public xdb_files(ResultSet rst)
	{
		this.Read(rst);
	}
	
	public void Read(ResultSet rst)
	{
		try {
			this._fid				= rst.getInt(1);
			this._uid 				= rst.getInt(2);
			this._filenamelocal 	= rst.getString(3);
			this._filenameremote 	= rst.getString(4);
			this._filepathlocal		= rst.getString(5);
			this._filepathremote	= rst.getString(6);
			this._filepathrelative	= rst.getString(7);
			this._filemd5			= rst.getString(8);
			this._filelength		= Long.parseLong(rst.getString(9));
			this._filesize			= rst.getString(10);
			this._filepos			= Long.parseLong( rst.getString(11) );
			this._postedlength		= Long.parseLong(rst.getString(12));
			this._postedpercent		= rst.getString(13);
			this._postcomplete		= rst.getBoolean(14);
			this._postedtime		= rst.getDate(15);
			this._isdeleted			= rst.getBoolean(16);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}		
	}
	
	/*
	 * 返回JSON字符串列表中的一项
	 * 格式：
	 * 	{s:0,FileNameLocal:"abcd"}
	 * */
	public String ToJsonItem()
	{
		//本地文件完整路径。D:\\Soft\\QQ2012.exe
		String fploc = this._filepathlocal;
		try {
			fploc = URLEncoder.encode(this._filepathlocal,"UTF-8");
			fploc = fploc.replaceAll("\\+", "%20");
		} catch (UnsupportedEncodingException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		
		//相对路径。/2012/05/24/QQ2012.exe
		String fprel = this._filepathrelative;
		try {
			fprel = URLEncoder.encode(this._filepathrelative,"UTF-8");
			fprel = fprel.replaceAll("\\+", "%20");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		//文件在服务器中的路径。D:\\webapps\\upload\\2012\\05\\24\\md5.exe
		String fpremote = this._filepathremote;
		try{
			fpremote = URLEncoder.encode(this._filepathremote,"UTF-8");
			fpremote = fpremote.replaceAll("\\+", "%20");
		}catch(Exception e){
			e.printStackTrace();
		}
		
		StringBuilder sb = new StringBuilder();
		sb.append("{");
		sb.append("fid:\""); sb.append(this._fid); sb.append("\"");
		sb.append(",uid:\""); sb.append(this._uid); sb.append("\"");
		sb.append(",FileNameLocal:\""); sb.append(this._filenamelocal); sb.append("\"");
		sb.append(",FileNameRemote:\""); sb.append(this._filenameremote); sb.append("\"");
		sb.append(",FilePathLocal:\""); sb.append(fploc); sb.append("\"");
		sb.append(",FilePathRelative:\""); sb.append(fprel); sb.append("\"");
		sb.append(",FilePathRemote:\""); sb.append(fpremote); sb.append("\"");
		sb.append(",FileMD5:\""); sb.append(this._filemd5); sb.append("\"");
		sb.append(",FileLength:\""); sb.append(this._filelength); sb.append("\"");
		sb.append(",FileSize:\""); sb.append(this._filesize); sb.append("\"");
		sb.append(",FilePos:\""); sb.append(this._filepos); sb.append("\"");
		sb.append(",PostedLength:\""); sb.append(this._postedlength); sb.append("\"");
		sb.append(",PostedPercent:\""); sb.append(this._postedpercent); sb.append("\"");
		sb.append(",PostComplete:\""); sb.append(this._postcomplete?"True":"False"); sb.append("\"");
		sb.append(",PostedTime:\""); sb.append(this._postedtime); sb.append("\"");
		sb.append("}");
		return sb.toString();
	}
	
	/// 返回JSON字符串 [{fid:"0",uid:"1",fileNameLocal:"urlencode()"}]
	/// FilePathLocal进行UrlEncode编码
	/// FilePathRelative进行UrlEncode编码
	public String ToJson()
	{
		String fploc = this._filepathlocal;
		try {
			fploc = URLEncoder.encode(this._filepathlocal,"UTF-8");
		} catch (UnsupportedEncodingException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		
		String fprel = this._filepathrelative;
		try {
			fprel = URLEncoder.encode(this._filepathrelative,"UTF-8");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		StringBuilder sb = new StringBuilder();
		sb.append("[{");
		sb.append("fid:\""); sb.append(this._fid); sb.append("\"");
		sb.append(",uid:\""); sb.append(this._uid); sb.append("\"");
		sb.append(",FileNameLocal:\""); sb.append(this._filenamelocal); sb.append("\"");
		sb.append(",FileNameRemote:\""); sb.append(this._filenameremote); sb.append("\"");
		sb.append(",FilePathLocal:\""); sb.append(fploc); sb.append("\"");
		sb.append(",FilePathRemote:\""); sb.append(fprel); sb.append("\"");
		sb.append(",FileMD5:\""); sb.append(this._filemd5); sb.append("\"");
		sb.append(",FileLength:\""); sb.append(this._filelength); sb.append("\"");
		sb.append(",FileSize:\""); sb.append(this._filesize); sb.append("\"");
		sb.append(",FilePos:\""); sb.append(this._filepos); sb.append("\"");
		sb.append(",PostedLength:\""); sb.append(this._postedlength); sb.append("\"");
		sb.append(",PostedPercent:\""); sb.append(this._postedpercent); sb.append("\"");
		sb.append(",PostComplete:\""); sb.append(this._postcomplete?"True":"False"); sb.append("\"");
		sb.append(",PostedTime:\""); sb.append(this._postedtime); sb.append("\"");
		sb.append("}]");
		return sb.toString();
	}

	/// <summary>
	/// fid
	/// </summary>		
	private int _fid = 0;
	public int getFid()	{return _fid;}
	public void setFid(int fid){this._fid = fid;}
	
	/// <summary>
	/// 用户ID。与第三方系统整合使用。
	/// </summary>		
	private int _uid = 0;
	public int getUid()	{return this._uid;}
	public void setUid(int uid){this._uid = uid;}
	
	/// <summary>
	/// 文件在本地电脑中的名称。
	/// </summary>		
	private String _filenamelocal = "";
	public String getFileNameLocal(){return this._filenamelocal;}
	public void setFileNameLocal(String name){this._filenamelocal = name;}
	
	/// <summary>
	/// 文件在服务器中的名称。
	/// </summary>		
	private String _filenameremote = "";
	public String getFileNameRemote(){return this._filenameremote;}
	public void setFileNameRemote(String name){this._filenameremote = name;}

	/// <summary>
	/// 文件在本地电脑中的完整路径。示例：D:\Soft\QQ2012.exe
	/// </summary>		
	private String _filepathlocal="";
	public String getFilePathLocal(){return this._filepathlocal;}
	public void setFilePathLocal(String path){this._filepathlocal = path;}
	
	/// <summary>
	/// 文件在服务器中的完整路径。示例：F:\\ftp\\uer\\md5.exe
	/// </summary>		
	private String _filepathremote="";
	public String getFilePathRemote(){return this._filepathremote;}
	public void setFilePathRemote(String path){this._filepathremote = path;}
	
	/// <summary>
	/// 文件在服务器中的相对路径。示例：/www/web/upload/md5.exe
	/// </summary>		
	private String _filepathrelative="";
	public String getFilePathRelative(){return this._filepathrelative;}
	public void setFilePathRelative(String path){this._filepathrelative = path;}
	
	/// <summary>
	/// 文件MD5
	/// </summary>		
	private String _filemd5="";
	public String getFileMD5(){return this._filemd5;}
	public void setFileMD5(String md5){this._filemd5 = md5;}
	
	/// <summary>
	/// 文件总大小。以字节为单位
	/// 文件大小可能超过2G，所以使用long
	/// </summary>		
	private long _filelength=0;
	public long getFileLength(){return this._filelength;}
	public String getFileLengthStr(){return Long.toString(this._filelength);}
	public void setFileLength(long len){this._filelength = len;}
	public void setFileLength(String len){this._filelength = Long.parseLong(len);}
	
	/// <summary>
	/// 格式化的文件尺寸。示例：10.03MB
	/// </summary>		
	private String _filesize="";
	public String getFileSize(){return this._filesize;}
	public void setFileSize(String size){this._filesize = size;}
	
	/// <summary>
	/// 文件续传位置。
	/// 文件大小可能超过2G，所以使用long
	/// </summary>		
	private long _filepos = 0;
	public long getFilePos(){return this._filepos;}
	public String getFilePosStr(){return Long.toString(this._filepos);}
	public void setFilePos(long pos){this._filepos = pos;}
	
	/// <summary>
	/// 已上传大小。以字节为单位
	/// 文件大小可能超过2G，所以使用long
	/// </summary>		
	private long _postedlength = 0;
	public long getPostedLength(){return this._postedlength;}
	public void setPostedLength(long len){this._postedlength = len;}
	
	/// <summary>
	/// 已上传百分比。示例：10%
	/// </summary>		
	private String _postedpercent = "0%";
	public String getPostedPercent(){return this._postedpercent;}
	public void setPostedPercent(String per){this._postedpercent = per;}
	
	/// <summary>
	/// PostComplete
	/// </summary>		
	private boolean _postcomplete = false;
	public boolean getPostComplete(){return this._postcomplete;}
	public void setPostComplete(boolean b){this._postcomplete = b;}
	
	/// <summary>
	/// PostedTime
	/// </summary>		
	private Date _postedtime;
	public Date getPostedTime(){return this._postedtime;}
	public String getPostedTimeStr()
	{
		SimpleDateFormat fmt = new SimpleDateFormat("yyyy-MM-DD HH:mm:ss");
		
		String str = fmt.format(this._postedtime);
		return str;
	}
	public void setPostedTime(Date time){this._postedtime = time;}
	
	/// <summary>
	/// IsDeleted
	/// </summary>		
	private boolean _isdeleted = false;
	public boolean getIsDeleted(){return this._isdeleted;}
	public void setIsDeleted(boolean b){this._isdeleted = b;}
	
}