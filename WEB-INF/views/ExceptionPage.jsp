<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" import="java.util.*,java.util.Map.Entry"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
String path = request.getContextPath();
String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>育镜测评</title>
	<style>
		body,div,img { margin: 0; padding: 0;}
		body { background: #fafafa;}
		#logo { margin-bottom: 20px; height: 80px; background: url("http://res.yujingceping.com/res/resources/front/imgs/Logo.png") #fff no-repeat 4% center;}
		#notice { height: 100%; background: url("<%=path %>/resources/front/imgs/500.jpg") #fff no-repeat center;}
	</style>
</head>
<body>
	<div id="logo"></div>
	<div id="notice">
	<% Exception ex = (Exception)request.getAttribute("exception"); %> 
	<H2>Exception: <%= ex.getMessage()%></H2> 
	<P/> 
	<% ex.printStackTrace(new java.io.PrintWriter(out)); %> 
	</div>
	<script>
		var docH = document.documentElement.clientHeight || document.body.clientHeight;
		var notice = document.getElementById('notice');

		notice.style.height = (docH - 100) + 'px';
	</script>
</body>
</html>