package Xproer;
import java.sql.*;
import java.util.*;

import javax.servlet.ServletContext;


import org.apache.commons.lang.StringUtils;

/*
 *数据库访问操作
 *更新记录：
 *	2012-05-22 创建 
 *	2012-05-24 完善
 */
public class HttpUploaderDB {
	String m_dbDriver	="com.mysql.jdbc.Driver"; 
    String m_dbUrl 		="jdbc:mysql://127.0.0.1:3306/test?user=root&characterEncoding=UTF-8";
	
	/*
	 * 参数：
	 * 		sc = this.getServletContext()
	 * */
	public HttpUploaderDB(ServletContext sc)
	{		
	}
	
	public Connection GetCon()
	{		
		Connection con = null;
		
		try 
		{
			Class.forName(this.m_dbDriver).newInstance();//加载驱动。
			con = DriverManager.getConnection(this.m_dbUrl);
		}
		catch (SQLException e) 
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InstantiationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return con;
	}
	
	/*
	 * 以JSON方式获取文件列表
	 * 格式：
	 * 	[{item1},{item2},{item3},{item4}]
	 * */
	public String GetFilesJsonByUid(String uid)
	{
		ArrayList<String> jsons = new ArrayList<String>();
		Vector<xdb_files> files = this.GetFilesByUid(uid);
		
		Iterator<xdb_files> i = files.iterator();
		while(i.hasNext())
		{
		    xdb_files item = i.next();
		    jsons.add(item.ToJsonItem());		    
		}
		Object[] arrJson = jsons.toArray();

		StringBuilder sb = new StringBuilder();
		sb.append("[");
		sb.append( StringUtils.join(arrJson,",") );
		sb.append("]");
		return sb.toString();
	}
	
	public Vector<xdb_files> GetFilesByUid(String uid)
	{
		return this.GetFilesByUid(Integer.parseInt(uid));
	}
	
	/*
	 * 根据UID获取文件列表
	 * 参数：
	 * 	uid 用户ID
	 * */
	public Vector<xdb_files> GetFilesByUid(int uid)
	{
		Vector<xdb_files> tb = new Vector<xdb_files>();
		String sql = "select * from xdb_files where uid=? and IsDeleted=0;";
		Connection con = this.GetCon();	    
	    PreparedStatement stmt;
	    
		try {
			stmt = con.prepareStatement(sql);
			stmt.setInt(1, uid);
		    ResultSet rst = stmt.executeQuery();
		    
		    while(rst.next())
		    {
		    	xdb_files file = new xdb_files(rst);
		    	tb.add(file);
		    }
		    rst.close();
		    stmt.close();
		    con.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	    return tb;
	}

	/*
	 * 根据文件ID获取文件信息
	 * 返回值：
	 * 	null
	 * */
	public xdb_files GetFileInfByFid(int fid)
	{
		xdb_files file = null;
		Connection con = this.GetCon();
		String sql = "select * from xdb_files where fid=? limit 0,1";
		PreparedStatement stmt;
		
		try {
			stmt = con.prepareStatement(sql);
			stmt.setInt(1, fid);
			ResultSet rst = stmt.executeQuery();
			file = new xdb_files();
			
			if (rst.next())
			{
				file.Read(rst);
				
			}
			rst.close();
			stmt.close();
			con.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return file;
	}
	
	/*
	 * 根据文件MD5获取文件信息
	 * 参数：
	 * 	md5 文件MD5
	 * 返回值：
	 * 	null
	 * */
	public xdb_files GetFileInfByMd5(String md5)
	{
		xdb_files inf = null;		
		Connection con = this.GetCon();		
		String sql = "select * from xdb_files where FileMD5=? order by PostedPercent DESC limit 0,1";
		
		try {
			PreparedStatement stmt = con.prepareStatement(sql);
			stmt.setString(1, md5);
			ResultSet r = stmt.executeQuery();
						
			if(r.next())
			{
				inf = new xdb_files();
				inf.Read(r);			
			}
			r.close();
			stmt.close();
			con.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return inf;
	}

	// 增加一条数据，并返回新增数据的ID
	// 在ajax_create_fid.aspx中调用
	// 文件名称，本地路径，远程路径，相对路径都使用原始字符串。
	// d:\soft\QQ2012.exe	
	public int Add(xdb_files model)
	{
		int fid = 0;
		StringBuilder strSql = new StringBuilder();
		strSql.append("insert into xdb_files(");
		strSql.append("FileSize,FilePos,PostedLength,PostedPercent,PostComplete,IsDeleted,uid,FileNameLocal,FileNameRemote,FilePathLocal,FilePathRemote,FilePathRelative,FileMD5,FileLength");
		strSql.append(") values (");
		strSql.append("?,?,?,?,?,?,?,?,?,?,?,?,?,?");
		strSql.append(") ");
		Connection con = this.GetCon();
		PreparedStatement stmt;
		
		try
		{
			stmt = con.prepareStatement(strSql.toString());
			stmt.setString(1, model.getFileSize());
			stmt.setString(2, model.getFilePosStr());
			stmt.setString(3, model.getFileLengthStr());
			stmt.setString(4, model.getPostedPercent());			
			stmt.setBoolean(5, model.getPostComplete());
			stmt.setBoolean(6, model.getIsDeleted());
			stmt.setInt(7, model.getUid());
			stmt.setString(8, model.getFileNameLocal());
			stmt.setString(9, model.getFileNameRemote());
			stmt.setString(10, model.getFilePathLocal());
			stmt.setString(11, model.getFilePathRemote());
			stmt.setString(12, model.getFilePathRelative());
			stmt.setString(13, model.getFileMD5());
			stmt.setString(14, model.getFileLengthStr());
			
			stmt.execute();
			stmt.close();
			
			String sql = "select fid from xdb_files order by fid desc limit 0,1";
			stmt = con.prepareStatement(sql);
			ResultSet rs = stmt.executeQuery();
			if(rs.next())
			{
				fid = rs.getInt(1);
			}
			rs.close();
			stmt.close();
			con.close();
		}
		catch(SQLException e)
		{
			e.printStackTrace();
		}
		return fid;
	}

	// 更新上传进度
	//<param name="uid">用户ID</param>
	//<param name="fid">文件ID</param>
	//<param name="filePos">文件位置，大小可能超过2G，所以需要使用long保存</param>
	//<param name="postedLength">已上传长度，文件大小可能超过2G，所以需要使用long保存</param>
	//<param name="postedPercent">已上传百分比</param>
	public boolean UpdateProgress(int uid,int fid,long filePos,long postedLength,String postedPercent)
	{
		String sql = "update xdb_files set FilePos=?,PostedLength=?,PostedPercent=? where uid=? and fid=?";
		
		try
		{
			Connection con = this.GetCon();
			PreparedStatement stmt = con.prepareStatement(sql);
			stmt.setString(1, Long.toString(filePos));
			stmt.setString(2, Long.toString(postedLength));
			stmt.setString(3, postedPercent);
			stmt.setInt(4, uid);
			stmt.setInt(5, fid);
			stmt.execute();
			stmt.close();
			con.close();
			
		}
		catch(SQLException e)
		{
			e.printStackTrace();
		}
		return true;
	}

	// 上传完成。将所有相同MD5文件进度都设为100%
	public void UploadComplete(String md5)
	{
		String sql = "update xdb_files set PostedLength=FileLength,PostedPercent='100%',PostComplete=1 where FileMD5=?";
		
		try
		{
			Connection con = this.GetCon();
			PreparedStatement stmt = con.prepareStatement(sql);
			stmt.setString(1, md5);
			stmt.execute();
			stmt.close();
			con.close();
		}
		catch(SQLException e)
		{
			e.printStackTrace();
		}
	}

	/*
	删除一条数据，并不真正删除，只更新删除标识。
	参数：
		uid 用户ID
		fid 文件ID
	 * 
	 */
	public void Delete(int uid,int fid)
	{
		String sql = "update xdb_files set IsDeleted=1 where uid=? and fid=?";
		try
		{
			Connection con = this.GetCon();
			PreparedStatement stmt = con.prepareStatement(sql);
			stmt.setInt(1, uid);
			stmt.setInt(2, fid);
			stmt.execute();
			stmt.close();
			con.close();			
		}
		catch(SQLException e)
		{
			e.printStackTrace();
		}
	}
	
	public void Delete(String uid,String fid)
	{
		this.Delete(Integer.parseInt(uid), Integer.parseInt(fid));
	}
}
