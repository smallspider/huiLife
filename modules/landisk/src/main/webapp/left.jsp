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

	<!-- NAVIGATION : This navigation is also responsive

			To make this navigation dynamic please make sure to link the node
			(the reference to the nav > ul) after page load. Or the navigation
			will not initialize.
			-->
	<nav>
		<!-- 
				NOTE: Notice the gaps after each icon usage <i></i>..
				Please note that these links work a bit different than
				traditional href="" links. See documentation for details.
				-->

		<ul>
			<li class=""><a href="ajax/dashboard.html" title="Dashboard"><i
					class="fa fa-lg fa-fw fa-home"></i> <span class="menu-item-parent">Dashboard</span></a>
			</li>
			<li><a href="ajax/inbox.html"><i
					class="fa fa-lg fa-fw fa-inbox"></i> <span class="menu-item-parent">Inbox</span><span
					class="badge pull-right inbox-badge">14</span></a></li>
			<li><a href="html/inbox.html"><i
					class="fa fa-lg fa-fw fa-inbox"></i> <span class="menu-item-parent">网盘</span><span
					class="badge pull-right inbox-badge">14</span></a></li>
			<li><a href="#"><i class="fa fa-lg fa-fw fa-bar-chart-o"></i>
					<span class="menu-item-parent">Graphs</span></a>
				<ul>
					<li><a href="ajax/flot.html">Flot Chart</a></li>
					<li><a href="ajax/morris.html">Morris Charts</a></li>
					<li><a href="ajax/inline-charts.html">Inline Charts</a></li>
					<li><a href="ajax/dygraphs.html">Dygraphs <span
							class="badge pull-right inbox-badge bg-color-yellow">new</span></a></li>
				</ul></li>
			<li><a href="#"><i class="fa fa-lg fa-fw fa-table"></i> <span
					class="menu-item-parent">Tables</span></a>
				<ul>
					<li><a href="ajax/table.html">Normal Tables</a></li>
					<li><a href="ajax/datatables.html">Data Tables <span
							class="badge inbox-badge bg-color-greenLight">v1.10</span></a></li>
					<li><a href="ajax/jqgrid.html">Jquery Grid</a></li>
				</ul></li>
			<li><a href="#"><i class="fa fa-lg fa-fw fa-pencil-square-o"></i>
					<span class="menu-item-parent">Forms</span></a>
				<ul>
					<li><a href="ajax/form-elements.html">Smart Form Elements</a>
					</li>
					<li><a href="ajax/form-templates.html">Smart Form Layouts</a>
					</li>
					<li><a href="ajax/validation.html">Smart Form Validation</a></li>
					<li><a href="ajax/bootstrap-forms.html">Bootstrap Form
							Elements</a></li>
					<li><a href="ajax/plugins.html">Form Plugins</a></li>
					<li><a href="ajax/wizard.html">Wizards</a></li>
					<li><a href="ajax/other-editors.html">Bootstrap Editors</a></li>
					<li><a href="ajax/dropzone.html">Dropzone</a></li>
					<li><a href="ajax/image-editor.html">Image Cropping <span
							class="badge pull-right inbox-badge bg-color-yellow">new</span></a></li>
				</ul></li>
			<li><a href="#"><i class="fa fa-lg fa-fw fa-desktop"></i> <span
					class="menu-item-parent">UI Elements</span></a>
				<ul>
					<li><a href="ajax/general-elements.html">General Elements</a>
					</li>
					<li><a href="ajax/buttons.html">Buttons</a></li>
					<li><a href="#">Icons</a>
						<ul>
							<li><a href="ajax/fa.html"><i class="fa fa-plane"></i>
									Font Awesome</a></li>
							<li><a href="ajax/glyph.html"><i
									class="glyphicon glyphicon-plane"></i> Glyph Icons</a></li>
							<li><a href="ajax/flags.html"><i class="fa fa-flag"></i>
									Flags</a></li>
						</ul></li>
					<li><a href="ajax/grid.html">Grid</a></li>
					<li><a href="ajax/treeview.html">Tree View</a></li>
					<li><a href="ajax/nestable-list.html">Nestable Lists</a></li>
					<li><a href="ajax/jqui.html">JQuery UI</a></li>
					<li><a href="ajax/typography.html">Typography</a></li>
					<li><a href="#">Six Level Menu</a>
						<ul>
							<li><a href="#"><i class="fa fa-fw fa-folder-open"></i>
									Item #2</a>
								<ul>
									<li><a href="#"><i class="fa fa-fw fa-folder-open"></i>
											Sub #2.1 </a>
										<ul>
											<li><a href="#"><i class="fa fa-fw fa-file-text"></i>
													Item #2.1.1</a></li>
											<li><a href="#"><i class="fa fa-fw fa-plus"></i>
													Expand</a>
												<ul>
													<li><a href="#"><i class="fa fa-fw fa-file-text"></i>
															File</a></li>
													<li><a href="#"><i class="fa fa-fw fa-trash-o"></i>
															Delete</a></li>
												</ul></li>
										</ul></li>
								</ul></li>
							<li><a href="#"><i class="fa fa-fw fa-folder-open"></i>
									Item #3</a>

								<ul>
									<li><a href="#"><i class="fa fa-fw fa-folder-open"></i>
											3ed Level </a>
										<ul>
											<li><a href="#"><i class="fa fa-fw fa-file-text"></i>
													File</a></li>
											<li><a href="#"><i class="fa fa-fw fa-file-text"></i>
													File</a></li>
										</ul></li>
								</ul></li>
						</ul></li>
				</ul></li>
			<li><a href="ajax/calendar.html"><i
					class="fa fa-lg fa-fw fa-calendar"><em>3</em></i> <span
					class="menu-item-parent">Calendar</span></a></li>
			<li><a href="ajax/widgets.html"><i
					class="fa fa-lg fa-fw fa-list-alt"></i> <span
					class="menu-item-parent">Widgets</span></a></li>
			<li><a href="ajax/gallery.html"><i
					class="fa fa-lg fa-fw fa-picture-o"></i> <span
					class="menu-item-parent">Gallery</span></a></li>
			<li><a href="ajax/gmap-xml.html"><i
					class="fa fa-lg fa-fw fa-map-marker"></i> <span
					class="menu-item-parent">GMap Skins</span><span
					class="badge bg-color-greenLight pull-right inbox-badge">9</span></a></li>
			<li><a href="#"><i class="fa fa-lg fa-fw fa-windows"></i> <span
					class="menu-item-parent">Miscellaneous</span></a>
				<ul>
					<li><a href="#"><i class="fa fa-file"></i> Other Pages</a>
						<ul>
							<li><a href="ajax/forum.html">Forum Layout</a></li>
							<li><a href="ajax/profile.html">Profile</a></li>
							<li><a href="ajax/timeline.html">Timeline</a></li>
						</ul></li>
					<li><a href="ajax/pricing-table.html">Pricing Tables</a></li>
					<li><a href="ajax/invoice.html">Invoice</a></li>
					<li><a href="login.html" target="_top">Login</a></li>
					<li><a href="register.html" target="_top">Register</a></li>
					<li><a href="lock.html" target="_top">Locked Screen</a></li>
					<li><a href="ajax/error404.html">Error 404</a></li>
					<li><a href="ajax/error500.html">Error 500</a></li>
					<li><a href="ajax/blank_.html">Blank Page</a></li>
					<li><a href="ajax/email-template.html">Email Template</a></li>
					<li><a href="ajax/search.html">Search Page</a></li>
					<li><a href="ajax/ckeditor.html">CK Editor</a></li>
				</ul></li>
			<li class="top-menu-hidden"><a href="#"><i
					class="fa fa-lg fa-fw fa-cube txt-color-blue"></i> <span
					class="menu-item-parent">SmartAdmin Intel</span></a>
				<ul>
					<li><a href="ajax/difver.html"><i
							class="fa fa-stack-overflow"></i> Different Versions</a></li>
					<li><a href="ajax/applayout.html"><i class="fa fa-cube"></i>
							App Settings</a></li>
					<li><a
						href="http://bootstraphunter.com/smartadmin/BUGTRACK/track_/documentation/index.html"
						target="_blank"><i class="fa fa-book"></i> Documentation</a></li>
					<li><a
						href="http://bootstraphunter.com/smartadmin/BUGTRACK/track_/"
						target="_blank"><i class="fa fa-bug"></i> Bug Tracker</a></li>
				</ul></li>
		</ul>
		<div class="air air-bottom inbox-space">
	
			3.5GB of <strong>10GB</strong><a href="javascript:void(0);" rel="tooltip" title="" data-placement="top" data-original-title="Empty Spam" class="pull-right txt-color-darken"><i class="fa fa-trash-o fa-lg"></i></a>
	
			<div class="progress progress-micro">
				<div class="progress-bar progress-primary" style="width: 34%;"></div>
			</div>
		</div>
	</nav>
	<span class="minifyme" data-action="minifyMenu"> <i
		class="fa fa-arrow-circle-left hit"></i>
	</span>

</aside>