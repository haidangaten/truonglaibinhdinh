<div class="cmfaq cmfaq-one-column" id="cmfaq">

    <?php
    /*
     * Searchbox
     */
    CMFAQ_Frontend::the_search();
    ?>

    <div class="cmfaq-main">

        <?php if (CMFAQ_Base::$wp_query_taxonomy->have_posts()) : ?>

            <div class="cmfaq-tax">

                <?php
                /*
                 * Breadcrumb
                 */
                CMFAQ_Frontend::the_taxonomy_breadcrumb();
                ?>

                <?php while (CMFAQ_Base::$wp_query_taxonomy->have_posts()) : CMFAQ_Base::$wp_query_taxonomy->the_post(); ?>

                    <div class="cmfaq-tax-post">

                        <h3 class="cmfaq-tax-post-title"><a class="cmfaq-tax-post-title-link" href="<?php esc_attr(the_permalink()); ?>"><?php the_title(); ?></a></h3>

                        <div class="cmfaq-tax-post-content">

                            <?php the_content(); ?>

                        </div>

                    </div>

                <?php endwhile; ?>

            </div>

            <?php wp_reset_query(); ?>

        <?php else: ?>

            <div class="cmfaq-tax-no-posts">

                <?php echo get_option('cmfaq_label_search_no_results', 'Sorry, but nothing found.'); ?>

            </div>

        <?php endif; ?>

    </div>

</div>