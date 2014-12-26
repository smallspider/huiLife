package Xproer;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.RandomAccessFile;
import java.nio.channels.FileChannel;
import java.nio.channels.FileLock;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.concurrent.locks.ReentrantReadWriteLock;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemFactory;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

/**
 *文件续传类，负责将文件块写入硬盘中
 */
public class FileResumerPart {
	public long			m_RangeSize;	//当前文件块大小。由SaveFileRange()负责赋值
	public long 		m_RangePos;		//文件块起始位置。一般在ajax_post.jsp中赋值
	public long			m_FileSize;		//文件实际大小。2G。一般在外部赋值。
	public String 		m_FileMD5;		//
	public String		m_fileRemote;	//远程文件路径。D:\\webapps\\upload\\2012\\05\\24\\QQ2012.exe
	HttpServletRequest 	m_hsr;
	ServletContext		m_sc;
	
	/*
	 * 参数：
	 * 	sc	this.getServletContext()
	 * 	hsr	request
	 * */
	public FileResumerPart(ServletContext sc,HttpServletRequest hsr)
	{
		this.m_sc = sc;
		this.m_hsr = hsr;
	}

	//创建文件
	public void CreateFile()
	{
		try 
		{
		    RandomAccessFile raf = new RandomAccessFile(this.m_fileRemote, "rw");
		    raf.setLength(this.m_FileSize);//
		    raf.close();

		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}		
	}
	
	/*
	 * 创建文件，一般在 ajax_create_fid.jsp 中调用。
	 * 这样做是为了避免多个用户同时上传相同文件时，频繁创建文件的问题。
	 * 参数：
	 * 	path	远程文件完整路径。例：d:\soft\qq.exe
	 *  strLen	远程文件大小，以字节为单位。1201254
	 * */
	public void CreateFile(String path,String strLen)
	{
		try 
		{
			ReentrantReadWriteLock.WriteLock wrtLock = null;  
			try
			{
				//wrtLock = m_wrtLock.writeLock();
				//wrtLock.lock();  
	
			    RandomAccessFile raf = new RandomAccessFile(path, "rw");
			    raf.setLength(Long.parseLong(strLen));//
			    raf.close();
			}
			finally
			{
				//wrtLock.unlock();
			}

		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	/*
	 * 创建临时文件名称。
	 * 逻辑：
	 * 	临时文件名称 = 远程文件名称 + tmp + 当前时间毫秒数
	 * 说明：
	 * 	加当前时间毫秒是为了防止多个用户同时上传相同文件时，创建临时文件会产生冲突的问题。
	 * 返回值：
	 * 	D:\\webapps\\upload\\2012\\05\\24\\QQ2012.exe.tmp201205241990
	 * */
	public String CreateTmpFileName()
	{
		SimpleDateFormat fmtDD = new SimpleDateFormat("dd");
		SimpleDateFormat fmtMM = new SimpleDateFormat("MM");
		SimpleDateFormat fmtYY = new SimpleDateFormat("yyyy");
		SimpleDateFormat fmtSS = new SimpleDateFormat("SSSS");
		
		Date date = new Date();
		String strDD = fmtDD.format(date);
		String strMM = fmtMM.format(date);
		String strYY = fmtYY.format(date);
		String strSS = fmtSS.format(date);
		
		String name = this.m_fileRemote + ".tmp" + strYY+strMM+strDD+strSS;
		return name;
		
	}
	
	/*
	 * 写入文件块数据
	 * 多线程参考：
	 * 	http://bbs.csdn.net/topics/80382727
	 * 
	 * */
	public synchronized void WriteRangeData(FileItem rangeFile)
	{
		String tmpName = this.CreateTmpFileName();		
		
		//根据索引将文件块数据写入到在服务端文件中
		try {
			//rangeFile.saveAs(tmpName);

			InputStream stream = rangeFile.getInputStream();			
			byte[] data = new byte[(int)this.m_RangeSize];//128k
			int readLen = stream.read(data);//实际读取的大小
			stream.close();
			XDebug.Output("实际读取的大小",readLen);
			
			//bug:在部分服务器中会出现错误：(另一个程序正在使用此文件，进程无法访问。)
			RandomAccessFile raf = new RandomAccessFile(this.m_fileRemote,"rw");
			//定位文件位置
			raf.seek(this.m_RangePos);
			raf.write(data);

			raf.close();
			XDebug.Output("文件块保存完毕",readLen);
			//file.delete();//删除临时文件		
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	/*
	 * 保存文件块
	 * 参数：
	 * 	rangeFile 	文件块
	 *	fileRemote	远程文件路径。d:\\webapps\\httpuploader3\\upload\\QQ2012.exe
	 * */
	public void SaveFileRange(FileItem rangeFile,String fileRemote)
	{
		this.m_fileRemote = fileRemote;
		this.m_RangeSize = rangeFile.getSize();
		try
		{
			File f = new File(fileRemote);
			
			//文件不存在则创建
			if(!f.exists()) this.CreateFile();

			//文件块大小不为空
			if (rangeFile.getSize() > 0)
			{
				this.WriteRangeData(rangeFile);
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
	}
		
	/*
	 * 保存文件块。
	 * 参数：
	 * 		rangeFile	文件块。
	 * 		md5			文件MD5
	 * 		fileSize	文件总大小
	 * */
	public void SaveFileRange(FileItem rangeFile,String uploadPath,String md5,long fileSize)
	{
		this.m_RangeSize = rangeFile.getSize();
		
		String fname = rangeFile.getName();
		int i = fname.lastIndexOf('.');
		String ext = fname.substring(i+1);
		this.m_fileRemote = uploadPath + md5 + "." + ext;

		this.CreateFile();
		
		try
		{
			File f = new File(this.m_fileRemote);
			
			//文件不存在则创建
			if(!f.exists()) this.CreateFile();

			//文件块大小不为空
			if (rangeFile.getSize() > 0)
			{
				this.WriteRangeData(rangeFile);
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
	}
}
