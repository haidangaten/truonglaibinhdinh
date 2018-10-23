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
		<div class="blog-wrapper row mb-15">


			<?php 
			$paged = ( get_query_var( 'paged' ) ) ? get_query_var( 'paged' ) : 1;
 
			$args = array(
			   'posts_per_page' => 6,
			   'paged' => $paged
			);
			 
			
			while(have_posts()) : 
				the_post();	
			
			?>
			<div class="blog-item col-md-4 col-sm-6 col-xs-12">
				<a href="<?php the_permalink();?>" class="image">

					<?php echo get_the_post_thumbnail(get_the_id(), '', array('height' => '210', 'style' => 'height: 210px !important;')); ?>
					<i class="icofont icofont-link-alt"></i>
				</a>
				<h5 class="title"><a href="<?php the_permalink();?>">
						<?php the_title();?></a></h5>
				<div class="description">
					<?php the_excerpt();?>
				</div>
			</div>
			<?php endwhile;?>
		</div>
	</div>
	<div class="pagination text-center">
		<?php pagination_tdc(); ?>

	</div>


</div>
</div>
</div>

<?php get_footer()?>