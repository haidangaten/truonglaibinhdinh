<?php get_header(); ?>
<div class="page-banner-area overlay overlay-black overlay-70">
    <div class="container">
        <div class="row">
            <div class="page-banner text-center col-xs-12">
                <h1>
                    <?php

						$category = get_the_category();

						$parent = get_cat_name($category[0]->category_parent);

						if (!empty($parent)) {

							echo $parent;

						} else {

							echo $category[0]->cat_name;

						}

						?>
                </h1>
                <ul>
                    <li><a href="<?php echo home_url(); ?>">home</a></li>
                    <li><span>
                            <?php

								$category = get_the_category();

								$child = get_cat_name($category[0]->category_child);

								if (!empty($child)) {

									echo $child;

								} else {

									echo $category[0]->cat_name;

								}

								?>
                        </span></li>
                </ul>
            </div>
        </div>
    </div>
</div>
<div class="blog-area bg-white pt-90 pb-90">
    <div class="container">
        <div class="row">
            <div class="blog-wrapper row mb-20">
                <div class="post-news">
                    <h1 class="title-news">
                        <?php the_archive_title(); ?>
                    </h1>
                </div>
                <?php if (have_posts()) : ?>
                <?php while (have_posts()) : the_post(); ?>
                <div class="blog-item col-md-4 col-sm-6 col-xs-12">
                    <a href="<?php the_permalink(); ?>">
                        <?php echo get_the_post_thumbnail(get_the_id(), '', array('height' => '210', 'style' => 'height: 210px !important;')); ?>
                        <i class="icofont icofont-link-alt"></i>
                    </a>

                    <h5 class="title"><a href="<?php the_permalink(); ?>">
                            <?php the_title(); ?></a></h5>
                    <div class="description">
                        <?php the_excerpt(); ?>
                    </div>
                </div>
                <?php endwhile; ?>
                <?php endif; ?>
            </div>
        </div>
        <div class="pagination text-center">
            <?php pagination_tdc(); ?>

        </div>
    </div>
</div>
<?php get_footer() ?>