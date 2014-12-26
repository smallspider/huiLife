<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%><%@ 
	page contentType="text/html;charset=UTF-8"%><%@ 
	page import="org.apache.commons.lang.*" %><%@ 
	page import="Xproer.*" %><%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";

String md5 = request.getParameter("md5");
String uid = request.getParameter("uid");
String fid = request.getParameter("fid");
String callback = request.getParameter("callback");

//返回值。1表示成功
int ret = 0;
if ( !StringUtils.isBlank(uid)
	&& !StringUtils.isBlank(fid)
	&& !StringUtils.isBlank(md5))
{
	HttpUploaderDB db = new HttpUploaderDB(this.getServletContext());
	db.UploadComplete(md5);
	ret = 1;
}
%><%=callback + "(" + ret + ")"%>