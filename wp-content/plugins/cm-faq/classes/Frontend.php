<?php

class CMFAQ_Frontend {

    public static function the_breadcrumb() {
        $post = get_post();
        $items = array();
        // Home link
        if (get_option('cmfaq_page_id', 0) && $item = get_post(get_option('cmfaq_page_id', 0))) {
            $items[] = '<a class="cmfaq-breadcrumb-link" href="' . esc_attr(get_permalink($item)) . '">' . get_option('cmfaq_label_breadcrumb_home', 'Home') . '</a>';
        }
        // Post category link
        $term_id = intval(get_post_meta($post->ID, 'cmfaq_main_category_id', TRUE));
        if ($term_id) {
            if ($item = get_term_by('term_id', $term_id, 'cmfaq_category')) {
                $items[] = '<a class="cmfaq-breadcrumb-link" href="' . esc_attr(get_term_link($item)) . '">' . $item->name . '</a>';
            }
        } else {
            $terms = wp_get_post_terms($post->ID, 'cmfaq_category', array('orderby' => 'term_id'));
            if ($terms) {
                $items[] = '<a class="cmfaq-breadcrumb-link" href="' . esc_attr(get_term_link($terms[0])) . '">' . $terms[0]->name . '</a>';
            }
        }
        // Post link
        $items[] = '<a class="cmfaq-breadcrumb-link" href="' . esc_attr(get_permalink()) . '">' . $post->post_title . '</a>';
        self::the_breadcrumb_items($items);
    }

    public static function the_taxonomy_breadcrumb() {
        $items = array();
        // Home link
        if (get_option('cmfaq_page_id', 0) && $item = get_post(get_option('cmfaq_page_id', 0))) {
            $items[] = '<a class="cmfaq-breadcrumb-link" href="' . esc_attr(get_permalink($item)) . '">' . get_option('cmfaq_label_breadcrumb_home', 'Home') . '</a>';
        }
        // Taxonomy link
        if (CMFAQ_Base::is_taxonomy() && CMFAQ_Base::$wp_query_taxonomy->queried_object) {
            $items[] = '<a class="cmfaq-breadcrumb-link" href="' .
                    esc_attr(get_term_link(CMFAQ_Base::$wp_query_taxonomy->queried_object->term_id, CMFAQ_Base::$wp_query_taxonomy->queried_object->taxonomy))
                    . '">' . CMFAQ_Base::$wp_query_taxonomy->queried_object->name . '</a>';
        }
        // Search results
        if (CMFAQ_Base::is_taxonomy() && isset(CMFAQ_Base::$wp_query_taxonomy->query['s'])) {
            $items[] = '<a class="cmfaq-breadcrumb-link" href="">Search results</a>';
        }
        self::the_breadcrumb_items($items);
    }

    public static function the_breadcrumb_items($items = array()) {
        if (!count($items)) {
            return;
        }
        echo '<div class="cmfaq-breadcrumb">';
        echo implode(' » ', $items);
        echo '</div>';
    }

    public static function the_rating($post_id = NULL) {
        
    }

    public static function get_the_post_icon($post_id) {
        
    }

    public static function the_post_icon($id) {
        
    }

    public static function get_the_icon($term_id) {
        
    }

    public static function the_icon($term_id) {
        
    }

    public static function related_posts($post_id = 0) {
        
    }

    public static function the_tiles() {
        include CMFAQ_PLUGIN_DIR_PATH . 'views/frontend/parts/tiles.php';
    }

    public static function the_search() {
        
    }

    public static function categories() {
        $html = wp_list_categories(array(
            'hide_empty' => TRUE,
            'hierarchical' => TRUE,
            'title_li' => NULL,
            'show_option_none' => NULL,
            'taxonomy' => 'cmfaq_category',
            'walker' => new CMFAQ_CategoryWalker(),
            'echo' => FALSE
        ));
        if ($html):
            echo '<div class="cmfaq-categories">';
            $label = get_option('cmfaq_label_side_categories', 'Categories');
            if (strlen($label)) :
                echo '<h2 class="cmfaq-categories-title">' . $label . '</h2>';
            endif;
            echo '<ul class="cmfaq-categories-list">';
            echo $html;
            echo '</ul>';
            echo '</div>';
        endif;
    }

    public static function tag_cloud() {
        $tag_cloud = wp_tag_cloud(array('taxonomy' => 'cmfaq_tag', 'echo' => FALSE));
        if (!$tag_cloud) {
            return;
        }
        echo '<div class="cmfaq-tags">';
        $label = get_option('cmfaq_label_side_tags', 'Tags');
        if (strlen($label)):
            echo '<h2 class="cmfaq-tags-title">' . $label . '</h2>';
        endif;
        echo $tag_cloud;
        echo'</div>';
    }

    public static function format_rating($rating) {
        
    }

}

class CMFAQ_CategoryWalker extends Walker_Category {

    public function start_lvl(&$output, $depth = 0, $args = array()) {
        $output .= "<ul class='cmfaq-categories-list children'>";
    }

    public function end_lvl(&$output, $depth = 0, $args = array()) {
        $output .= "</ul>";
    }

    public function start_el(&$output, $category, $depth = 0, $args = array(), $id = 0) {
        $output .= '<li class="cmfaq-categories-list-entry">';
        $output .= '<a class="cmfaq-categories-list-entry-link" href="' . esc_attr(get_category_link($category)) . '">' . ($category->name) . '</a>';
    }

    public function end_el(&$output, $page, $depth = 0, $args = array()) {
        $output .= "</li>";
    }

}
