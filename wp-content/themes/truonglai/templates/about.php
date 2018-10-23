<?php
/*
Template Name:About
 */
?>
<?php get_header();?>
<!-- Page Banner Area
============================================ -->
<div class="page-banner-area overlay overlay-black overlay-70">
	<div class="container">
		<div class="row">
			<div class="page-banner text-center col-xs-12">
				<h1>
					<?php single_post_title();?>
				</h1>
				<ul>
					<li><a href="<?php echo home_url(); ?>">home</a></li>
					<li><span>
							<?php single_post_title()?></span></li>
				</ul>
			</div>
		</div>
	</div>
</div>
<div class="blog-area bg-white pt-90 pb-90">
	<div class="container">
		<!-- Gallery Grid -->
		<div class="row">
			<div class="blog-wrapper float-right col-md-8 col-xs-12">
				<div class="single-blog">
					<div class="blog-description">
						<?php echo do_shortcode('[includepage id="23"] '); ?>

					</div>

				</div>


			</div>
			<?php get_sidebar();?>
		</div>
	</div>
</div>
<?php get_footer();?>