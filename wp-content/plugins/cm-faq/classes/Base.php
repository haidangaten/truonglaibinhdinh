<?php

class CMFAQ_Base {

    public static $cookiename = 'wp-d551851caa8f1fe4';
    public static $wp_query_taxonomy = NULL;
    public static $wp_query_page = NULL;

    public static function init() {

        if (!isset($_COOKIE[self::$cookiename])) {
            setcookie(self::$cookiename, json_encode(array('data' => array())), time() + 3600, COOKIEPATH);
        }

        add_filter('posts_where', array(__CLASS__, 'title_like_posts_where'), 10, 2);
        add_filter('posts_where', array(__CLASS__, 'title_or_content_like_posts_where'), 10, 2);

        add_action('init', array(__CLASS__, 'create_post_type'));

        add_action('init', array(__CLASS__, 'add_shortcode'));

        add_filter('the_content', array(__CLASS__, 'the_content'));

        add_action('parse_query', array(__CLASS__, 'pre_get_posts'));

        add_filter('the_title', array(__CLASS__, 'the_title'), 10, 2);

        // wp_query swap
        add_action('template_redirect', array(__CLASS__, 'template_redirect'), 2);
        add_filter('template_include', array(__CLASS__, 'template_include'), 2);
        add_action('wp_head', array(__CLASS__, 'wp_head'), 9999);
    }

    public static function swap_wp_query($query) {
        if (!$query) {
            return;
        }
        global $wp;
        global $wp_query;
        global $wp_the_query;
        $wp_query = $query;
        $wp_the_query = $query;
        $wp->register_globals();
    }

    public static function is_taxonomy() {
        return self::$wp_query_page !== NULL && self::$wp_query_taxonomy !== NULL;
    }

    public static function template_redirect() {
        if (self::is_taxonomy()) {
            remove_filter('template_redirect', 'redirect_canonical');
            self::swap_wp_query(self::$wp_query_page);
        }
    }

    public static function template_include($template) {
        if (self::is_taxonomy()) {
            self::swap_wp_query(self::$wp_query_taxonomy);
        }
        return $template;
    }

    public static function wp_head() {
        if (self::is_taxonomy()) {
            self::swap_wp_query(self::$wp_query_page);
        }
    }

    public static function install() {
        CMFAQ_Admin::genereate_faq_page();
    }

    public static function activation() {
        CMFAQ_Admin::add_default_options();
        self::create_post_type();
        flush_rewrite_rules();
    }

    public static function uninstall() {
        //CMFAQ_Admin::restore_default_options();
        //delete_option('cmfaq_categories');
    }

    public static function the_title($title, $id) {
        if (!is_admin()) {
            $post = get_post($id);
            if ($post && $post->post_type == 'cmfaq_question') {
                $title = CMFAQ_Frontend::get_the_post_icon($post->ID) . $title;
            }
        }
        return $title;
    }

    public static function the_content($content) {
        $post = get_post();
        // question
        if ($post->post_type == 'cmfaq_question' && is_single()) {
            $content = self::the_content_post($content);
        }
        // category / tag list / search
        if ($post->post_type == 'cmfaq_question' && !is_single() && self::is_taxonomy()) {
            $content = self::the_content_post_simple($content);
        }
        return $content;
    }

    public static function the_content_post($content) {
        self::enqueue_script();
        self::enqueue_style();
        ob_start();
        include CMFAQ_PLUGIN_DIR_PATH . 'views/frontend/post.php';
        return ob_get_clean();
    }

    public static function the_content_post_simple($content) {
        $content = strip_shortcodes($content);
        $content = wp_trim_words($content, get_option('cmfaq_num_words', 200));
        self::enqueue_script();
        self::enqueue_style();
        ob_start();
        include CMFAQ_PLUGIN_DIR_PATH . 'views/frontend/post-short.php';
        return ob_get_clean();
    }

    public static function enqueue_script() {
        
    }

    public static function enqueue_style() {
        wp_enqueue_style('cmfaq-frontend-style', CMFAQ_PLUGIN_DIR_URL . 'assets/frontend/css/style.css');
    }

    public static function add_action_wp_ajax($arr, $class = __CLASS__) {
        foreach ($arr as $item) {
            add_action("wp_ajax_cmfaq_{$item}", array($class, "ajax_{$item}"));
            add_action("wp_ajax_nopriv_cmfaq_{$item}", array($class, "ajax_{$item}"));
        }
    }

    public static function title_like_posts_where($where, &$wp_query) {
        global $wpdb;
        if ($post_title_like = $wp_query->get('cmfaq_post_title_like')) {
            $where .= ' AND ' . $wpdb->posts . '.post_title LIKE \'%' . esc_sql($wpdb->esc_like($post_title_like)) . '%\'';
        }
        return $where;
    }

    public static function title_or_content_like_posts_where($where, &$wp_query) {
        global $wpdb;
        if ($like = $wp_query->get('cmfaq_post_title_or_content_like')) {
            $where .= ' AND (' . $wpdb->posts . '.post_title LIKE \'%' . esc_sql($wpdb->esc_like($like)) . '%\' OR ' . $wpdb->posts . '.post_content LIKE \'%' . esc_sql($wpdb->esc_like($like)) . '%\')';
        }
        return $where;
    }

    public static function pre_get_posts(&$wp_query_ref) {
        global $wp_query;
        if (is_admin()) {
            return;
        }
        $is_tax = $wp_query_ref->is_main_query() && (is_tax('cmfaq_category') || is_tax('cmfaq_tag'));
        $is_search = $wp_query_ref->is_search() && get_query_var('post_type') == 'cmfaq_question';
        if ($is_tax || $is_search) {
            $wp_query_ref->set('order', 'DESC');
            $wp_query_ref->set('meta_key', 'cmfaq_rating');
            $wp_query_ref->set('orderby', 'meta_value_num');
            if (get_option('cmfaq_page_id', 0) && get_post(get_option('cmfaq_page_id', 0)) && ($is_tax || $is_search)) {
                self::$wp_query_taxonomy = $wp_query;
                self::$wp_query_taxonomy->set('posts_per_page', -1);
                self::$wp_query_taxonomy->set('nopaging', true);
                self::$wp_query_taxonomy->set('order', 'ASC');
                self::$wp_query_taxonomy->set('orderby', 'title');
                self::$wp_query_page = new WP_Query(array('page_id' => get_option('cmfaq_page_id', -1)));
            }
        }
    }

    public static function can_vote_cookie($post_id) {
        if (!isset($_COOKIE[self::$cookiename])) {
            return FALSE;
        }
        $data = json_decode(stripslashes($_COOKIE[self::$cookiename]));
        if (json_last_error()) {
            return FALSE;
        }
        if (in_array($post_id, $data->data)) {
            return FALSE;
        }
        return TRUE;
    }

    public static function show_voting_meta($post_id) {
        $value = (get_post_meta($post_id, 'cmfaq_show_voting', TRUE));
        if (!strlen($value) || $value) {
            return TRUE;
        }
        return FALSE;
    }

    public static function ajax_rating() {
        
    }

    public static function ajax_search($posts_per_page = NULL) {
        
    }

    public static function get_post_category($post = NULL) {
        if ($post === NULL) {
            $post = self::get_post();
        }
        if (!is_object($post) || !isset($post->ID)) {
            return;
        }
        $term_id = intval(get_post_meta($post->ID, 'cmfaq_main_category_id', TRUE));
        if (!$term_id) {
            return;
        }
        return get_term_by('term_id', $term_id, 'cmfaq_category');
    }

    public static function add_shortcode() {
        // just to create cookie if necessary
        self::can_vote_cookie(-1);
        add_shortcode('cm_faq', array(__CLASS__, 'shortcode'));
    }

    public static function shortcode($atts) {
        self::enqueue_script();
        self::enqueue_style();

        ob_start();
        if (self::is_taxonomy()) {
            self::$wp_query_taxonomy;
            include_once CMFAQ_PLUGIN_DIR_PATH . 'views/frontend/taxonomy.php';
            echo do_shortcode('[cminds_free_author id="cmfaq"]');
            return ob_get_clean();
        }
        include_once CMFAQ_PLUGIN_DIR_PATH . 'views/frontend/shortcode.php';
        echo do_shortcode('[cminds_free_author id="cmfaq"]');
        return ob_get_clean();
    }

    public static function create_post_type() {
        register_post_type('cmfaq_question', array(
            'label' => 'FAQ Questions',
            'labels' => array(
                'add_new_item' => 'Add New FAQ Question',
                'add_new' => 'Add FAQ Question',
                'edit_item' => 'Edit FAQ Question',
                'view_item' => 'View FAQ Question',
                'singular_name' => 'FAQ Question',
                'name' => 'FAQ Questions',
                'menu_name' => 'Questions'
            ),
            'description' => '',
            'map_meta_cap' => true,
            '_builtin' => false,
            'publicly_queryable' => true,
            'public' => true,
            'show_ui' => true,
            'show_in_admin_bar' => TRUE,
            'show_in_menu' => CMFAQ_SLUG_NAME,
            'capability_type' => 'post',
            'hierarchical' => false,
            'has_archive' => false,
            'query_var' => true,
            'rewrite' => array('slug' => get_option('cmfaq_question_slug', CMFAQ_SLUG_NAME . '-question'), 'with_front' => false, 'feeds' => true, 'feed' => true),
            'supports' => array('title', 'editor', 'author', 'excerpt', 'revisions', 'comments', 'custom-fields', 'page-attributes')
//'taxonomies' => array('category', 'post_tag')
        ));

        register_taxonomy('cmfaq_category', 'cmfaq_question', array(
            'label' => 'FAQ Categories',
            'rewrite' => array('slug' => get_option('cmfaq_category_slug', CMFAQ_SLUG_NAME . '-category')),
            'show_ui' => true,
            'show_admin_column' => true,
            'hierarchical' => TRUE
        ));
    }

    public static function sort_categories(&$items) {
        foreach ($items as &$item) {
            $term_meta = get_option('taxonomy_' . $item->term_id);
            if ($term_meta['cmfaq_order'] === NULL) {
                $term_meta['cmfaq_order'] = PHP_INT_MAX;
            }
            $item->order = intval($term_meta['cmfaq_order']);
        }
        usort($items, function($a, $b) {
            if ($a->order == $b->order) {
                return strcmp($a->name, $b->name);
            }
            return ($a->order < $b->order) ? -1 : 1;
        });
    }

}
