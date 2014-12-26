package Xproer;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.io.File;

import javax.servlet.ServletContext;

/**
 * 
 */

/**
 * 配置文件，主要设置文件上传路径。
 *
 */
public class HttpUploaderCfg {

	public String m_uploadPath;		//上传路径。d:\\www\\upload\\201204\\09\\
	public String m_uploadFolder;	//上传文件夹。d:\\www\\upload\\
	public String m_relatPath;		//相对路径。/upload/201204/09/
	public String m_domain;			//网站域名。
	public String m_curFile;		//
	public String m_curFolder;		//当前路径 D:\\Tomcat 6.0\\webapps\\HttpUploader3\\	
		
	/*
	 * 构造函数
	 * 在JSP页面中传入 this.getServletContext()
	*/
	public HttpUploaderCfg(ServletContext sc)
	{
		this.m_curFolder = sc.getRealPath("/");
		//F:\\www\\upload\\
		this.m_uploadFolder = this.m_curFolder + ("upload\\");
	}

	// 创建上传路径
	// d:\\www\\upload\\2012\\04\\10	
	public void CreateUploadPath()
	{
		SimpleDateFormat fmtDD = new SimpleDateFormat("dd");
		SimpleDateFormat fmtMM = new SimpleDateFormat("MM");
		SimpleDateFormat fmtYY = new SimpleDateFormat("yyyy");
		
		Date date = new Date();
		String strDD = fmtDD.format(date);
		String strMM = fmtMM.format(date);
		String strYY = fmtYY.format(date);

		//DateTime timeCur = DateTime.Now;
		String timeStr = strYY+"\\"+strMM+"\\"+strDD;
		this.m_relatPath = strYY + "/" + strMM + "/" + strDD + "//";
		this.m_uploadPath = this.m_uploadFolder + timeStr + "\\";
		
		File folder = new File(this.m_uploadPath);
		if(!folder.exists()) folder.mkdirs();
	}

	/*
	 * 获取上传路径
	 * 返回值：
	 * 	d:\\www\\upload\\201204\\10\\
	*/
	public String GetUploadPath()
	{
		return this.m_uploadPath;
	}

	// 获取相对路径
	// 返回值：
	//	/upload/201204/10/
	public String GetRelatPath()
	{
		return this.m_relatPath;
	}
}
