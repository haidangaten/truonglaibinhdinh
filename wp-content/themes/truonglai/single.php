<?php get_header();?>
<div class="page-banner-area overlay overlay-black overlay-70">
	<div class="container">
		<div class="row">
			<div class="page-banner text-center col-xs-12">
				<?php get_breadcrumb(); ?>
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
					<?php if (has_post_thumbnail( $post->ID ) ): ?>
					<?php $image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'single-post-thumbnail' ); ?>
					<div class="blog-image">
						<img src="<?php echo $image[0]; ?>" alt="" />

					</div>
					<?php endif; ?>
					<?php if (have_posts()): ?>
					<?php while (have_posts()): the_post();?>
					<h4 class="blog-title">
						<?php the_title();?>
					</h4>
					<div class="blog-description">
						<?php the_content();?>
						<?php endwhile;?>
						<?php endif;?>
					</div>
					<div class="blog-tag-share fix">
						<div class="blog-tags float-left">
							<p>TAGS :</p>

							<?php ( is_single() ? truonglai_entry_tag() : '' ); ?>
						</div>
					</div>
				</div>
				<!-- Comments -->
				<div class="comments-wrapper pt-90">
					<?php
					// if ( comments_open() || '0' != get_comments_number() ) {
					// comments_template();
					// }
					if ( comments_open() || '0' != get_comments_number() ) {
						comments_template();
					}
					?>

				</div>
			</div>
			<?php get_sidebar();?>
		</div>
	</div>
</div>

<?php get_footer();?>