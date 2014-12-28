<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<aside id="left-panel">

	<!-- User info -->
	<div class="login-info">
		<span> <!-- User image size is adjusted inside CSS, it should stay as is -->

			<a href="javascript:void(0);" id="show-shortcut"
			data-action="toggleShortcut"> <img src="img/avatars/sunny.png"
				alt="me" class="online" /> <span> john.doe </span> <i
				class="fa fa-angle-down"></i>
		</a>

		</span>
	</div>
	<!-- end user info -->
	<nav>

		<ul>
			<li class=""><a href="ajax/dashboard.html" title="Dashboard"><i
					class="fa fa-lg fa-fw fa-home"></i> <span class="menu-item-parent">Dashboard</span></a>
			</li>
			<li><a href="html/inbox.html"><i
					class="fa fa-lg fa-fw fa-inbox"></i> <span class="menu-item-parent">网盘</span><span
					class="badge pull-right inbox-badge">14</span></a></li>
		</ul>
	</nav>
	<span class="minifyme" data-action="minifyMenu"> <i
		class="fa fa-arrow-circle-left hit"></i>
	</span>

</aside>