<div class="cmfaq cmfaq-one-column" id="cmfaq">

    <div class="cmfaq-main">

        <div class="cmfaq-post">

            <?php
            /*
             * Breadcrumb
             */
            CMFAQ_Frontend::the_breadcrumb();
            ?>

            <?php
            /*
             * Tags
             */
            the_terms(0, 'cmfaq_tag', '<div class="cmfaq-post-tags">' . get_option('cmfaq_label_post_tags', 'Tags: '), ', ', '</div>');
            ?>

            <?php echo $content; ?>

            <?php
            /*
             * Post rating
             */
            CMFAQ_Frontend::the_rating();
            ?>

            <?php
            /*
             * Related posts
             */
            CMFAQ_Frontend::related_posts();
            ?>

        </div>

    </div>

</div>