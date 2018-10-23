<?php

//$categories = get_terms('cmfaq_category', array('include' => get_option('cmfaq_front_categories', array())));
$categories = get_terms('cmfaq_category');

$i = 0;

$posts_per_page = intval(get_option('cmfaq_front_num_questions', 5));

foreach ($categories as $category):

    $posts = get_posts(array(
        'post_status' => 'publish',
        'post_type' => 'cmfaq_question',
        'posts_per_page' => ($posts_per_page + 1),
        'meta_key' => 'cmfaq_rating',
        'orderby' => 'title',
        'order' => 'ASC',
        'tax_query' => array(
            array(
                'taxonomy' => 'cmfaq_category',
                'field' => 'term_id',
                'terms' => $category->term_id
            )
        ))
    );

    $is_more = count($posts) > $posts_per_page;

    if ($is_more):

        $posts = array_slice($posts, 0, $posts_per_page);

    endif;

    echo '<div class="cmfaq-tile">';

    echo '<h4 class="cmfaq-tile-title"><a class="cmfaq-tile-title-link" href="' . esc_attr(get_category_link($category)) . '">' . CMFAQ_Frontend::get_the_icon($category->term_id) . $category->name . '</a></h4>';

    echo '<div class="cmfaq-tile-posts">';

    foreach ($posts as $post):

        echo '<div class="cmfaq-tile-post">';

        echo '<a class="cmfaq-tile-post-link" href="' . esc_attr(get_permalink($post)) . '">' . $post->post_title . '</a>';

        echo '</div>';

    endforeach;

    if ($is_more):

        echo '<div class="cmfaq-tile-more">';

        echo '<a class="cmfaq-tile-more-link" href="' . esc_attr(get_category_link($category)) . '">' . get_option('cmfaq_label_tiles_show_more', 'Show more »') . '</a>';

        echo '</div>';

    endif;

    echo '</div>';

    echo '</div>';

    $i++;

    if ($i % 2 == 0):

        echo '<br class="cmfaq-clear" />';

    endif;

endforeach;



// UNKNOWN BEGIN
$posts = get_posts(array(
    'post_status' => 'publish',
    'post_type' => 'cmfaq_question',
    'posts_per_page' => $posts_per_page,
    'meta_key' => 'cmfaq_rating',
    'orderby' => 'title',
    'order' => 'ASC',
    'tax_query' => array(
        'relation' => 'OR',
        array(
            'taxonomy' => 'cmfaq_category',
            'field' => 'term_id',
            'operator' => 'NOT EXISTS'
        ),
        array(
            'taxonomy' => 'cmfaq_category',
            'field' => 'term_id',
            'terms' => ''
        ),
        array(
            'taxonomy' => 'cmfaq_category',
            'field' => 'term_id',
            'terms' => '0'
        )
    ))
);

if ($posts):

    echo '<div class="cmfaq-tile">';

    echo '<h4 class="cmfaq-tile-title"><a class="cmfaq-tile-title-link">Unknown</a></h4>';

    echo '<div class="cmfaq-tile-posts">';

    foreach ($posts as $post):

        echo '<div class="cmfaq-tile-post">';

        echo '<a class="cmfaq-tile-post-link" href="' . esc_attr(get_permalink($post)) . '">' . $post->post_title . '</a>';

        echo '</div>';

    endforeach;

    echo '</div>';

    echo '</div>';

endif;
// UNKNOWN END



if ($i % 2):

    echo '<br class="cmfaq-clear" />';

endif;