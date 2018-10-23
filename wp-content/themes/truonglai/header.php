<!doctype html>
<html class="no-js" <?php language_attributes(); ?>>

<head>
	<?php wp_head();?>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta http-equiv="x-ua-compatible" content="ie=edge">
	<title>
		<?php echo get_bloginfo('name'); ?>
	</title>
	<meta name="description" content="<?php echo get_bloginfo('description'); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
	<!-- Favicon -->
	<link rel="shortcut icon" type="image/x-icon" href="<?php echo get_stylesheet_directory_uri(); ?>/img/favicon.ico">
	<!-- Fonts -->
	<link href="<?php bloginfo('template_directory')?>/fonts/lato/lato.css" rel="stylesheet">
	<!-- CSS -->

	<!-- Icon Font CSS
	============================================ -->
	<!-- Plugins CSS
	============================================ -->
	<!-- ShortCodes CSS
	============================================ -->
	<!-- Style CSS
	============================================ -->
	<link rel="stylesheet" href="<?php bloginfo('template_directory')?>/style.css">
	<!-- Responsive CSS
	============================================ -->

	<!-- Style customizer (Remove these two lines please) -->
	<!-- <link rel="stylesheet" href="<?php bloginfo('template_directory')?>/css/slider.css"> -->

	<!-- Modernizer JS
	============================================ -->

</head>

<body class="main-bg-2">
	<div class="header-area header-absolute header-transparent" style="background-color:;  ">
		<div class="header-bottom sticky">
			<div class="container">
				<div class="row">
					<!-- Header Bottom -->
					<div class="navbar-header">
						<a href="<?php bloginfo('url');?>" class="logo navbar-brand"><img src="<?php echo esc_url(get_template_directory_uri()); ?>/img/logo/logo.png"
							 alt="Trường Cao Đằng Điện - Xây Dựng Nông Lâm Trung Bộ" /></a>
					</div>
					<div class="main-menu mean-menu float-right">
						<nav>
							<?php truonglai_menu( 'header-menu' ); ?>
						</nav>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- Body main wrapper start -->

	<!-- Header 1
============================================ -->

	</div>