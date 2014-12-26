<%@ page language="java" import="java.util.*" pageEncoding="GB2312"%><%@ 
	page contentType="text/html;charset=GB2312"%><%@ 
	page import = "Xproer.*" %><%@ 
	page import="org.apache.commons.lang.StringUtils" %><%@ 
	page import="org.apache.commons.fileupload.*" %><%@ 
	page import="org.apache.commons.fileupload.disk.*" %><%@ 
	page import="org.apache.commons.fileupload.servlet.*" %><%
/*
	ֻ����ƴ���ļ��顣
	��ҳ��һ���ɿؼ��������
	������
		uid
		fid
		md5
		fileSize
		rangePos
	���¼�¼��
		2012-04-12 �����ļ���С�������ͣ����Ӷ�2G�����ļ���֧�֡�
		2012-04-18 ȡ�������ļ��ϴ�������Ϣ�߼���
		2012-10-25 ���ϸ����ļ�������Ϣ���ܡ����ٿͻ��˵�AJAX���á�
*/
//String path = request.getContextPath();
//String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";

String struid = "";// 		= request.getParameter("uid");
String strfid = "";// 		= request.getParameter("fid");
String md5 = "";// 			= request.getParameter("md5");
String strFileSize = "";// 	= request.getParameter("FileSize");
String strRangePos = "";// 	= request.getParameter("RangePos");
 
// Check that we have a file upload request
boolean isMultipart = ServletFileUpload.isMultipartContent(request);
FileItemFactory factory = new DiskFileItemFactory();   
ServletFileUpload upload = new ServletFileUpload(factory);
//upload.setSizeMax(262144);//256KB
List files = null;
try 
{
	files = upload.parseRequest(request);
} 
catch (FileUploadException e) 
{  
    out.println("�ļ��ϴ��쳣:" + e.toString());
    return;   
}

FileItem rangeFile = null;
// �õ������ϴ����ļ�
Iterator fileItr = files.iterator();
// ѭ�����������ļ�
while (fileItr.hasNext()) 
{
	// �õ���ǰ�ļ�
	rangeFile = (FileItem) fileItr.next();
	// ���Լ�form�ֶζ������ϴ�����ļ���(<input type="text" />��)
	if(rangeFile.isFormField())
	{
		String fn = rangeFile.getFieldName();
		String fv = rangeFile.getString(); 
		if(fn.equals("uid")) struid = fv;
		if(fn.equals("fid")) strfid = fv;
		if(fn.equals("md5")) md5 = fv;
		if(fn.equals("FileSize")) strFileSize = fv;
		if(fn.equals("RangePos")) strRangePos = fv;
	}
	else 
	{
		break;
	}
}

//����Ϊ��
if ( StringUtils.isBlank( strFileSize )
	|| StringUtils.isBlank( struid )
	|| StringUtils.isBlank( strfid )
	|| StringUtils.isBlank( md5 )
	|| StringUtils.isBlank( strRangePos ) )
{
	XDebug.Output("fileSize", strFileSize);
	XDebug.Output("uid", struid);
	XDebug.Output("fid", strfid);
	XDebug.Output("md5", md5);
	XDebug.Output("param is null");
	return;
}

if (strFileSize.length() > 0
	&& struid.length() > 0
	&& strfid.length() > 0
	&& md5.length() > 0
	&& strRangePos.length() > 0)
{
	long fileSize 	= Long.parseLong(strFileSize);
	long rangePos 	= Long.parseLong(strRangePos);
	int uid 		= Integer.parseInt(struid);
	int fid 		= Integer.parseInt(strfid);

	HttpUploaderDB db = new HttpUploaderDB(this.getServletContext());
	xdb_files inf = db.GetFileInfByFid(fid);
	
	long rangeSize = rangeFile.getSize();//�ؼ��ϴ����ļ����С
	
	if (null!= inf)
	{
		//���ϴ���С = �ļ������� + ��ʱ�ļ����С
		long postedLength = rangePos + rangeSize;
		//�ϴ��ٷֱ� = ���ϴ���С / �ļ��ܴ�С
		double per = ((double)postedLength / (double)fileSize) * 100;
		double perd = Math.round(per);
		String postedPercent = Double.toString(perd) + "%";

		XDebug.Output("per", per);
		XDebug.Output("fileSize", fileSize);
		XDebug.Output("postedPercent", postedPercent);
		XDebug.Output("uid", struid);
		XDebug.Output("fid", strfid);
		XDebug.Output("rangePos", rangePos);
		XDebug.Output("postedLength", postedLength);
		XDebug.Output("postedPercent", postedPercent);
		
		//�����ļ�������
		FileResumerPart res = new FileResumerPart(this.getServletContext(),request);
		res.m_RangePos = rangePos;
		res.m_FileSize = fileSize;
		res.SaveFileRange(rangeFile, inf.getFilePathRemote());
		
		//�����ļ�������Ϣ
		db.UpdateProgress(uid,fid,rangePos,postedLength,postedPercent);
	}
	out.write("ok");
}
%>