<?php

class CMFAQ_Admin {

    private static $valid_options = array(
        'cmfaq_page_id',
        'cmfaq_question_slug',
        'cmfaq_category_slug',
        'cmfaq_tag_slug',
        'cmfaq_front_categories',
        'cmfaq_front_num_questions',
        'cmfaq_num_words',
        'cmfaq_show_related',
        'cmfaq_as_show_content',
        'cmfaq_sw_show_on_homepage',
        'cmfaq_sw_show_on_cmfaq_page',
        'cmfaq_sw_show_on_post_types',
        'cmfaq_sw_title_closed',
        'cmfaq_sw_title_open',
        'cmfaq_sw_label_search_no_results',
        'cmfaq_sw_label_search_placeholder',
        'cmfaq_sw_color1',
        'cmfaq_sw_placement',
        'cmfaq_sw_show_content',
        'cmfaq_label_breadcrumb_home'
    );
    private static $messages = array();

    public static function init() {

        add_action('admin_menu', array(__CLASS__, 'admin_menu'));
        if (isset($_GET['taxonomy']) && ($_GET['taxonomy'] == 'cmfaq_category' || $_GET['taxonomy'] == 'cmfaq_tag')) {
            add_filter('parent_file', array(__CLASS__, 'parent_file'));
        }

        add_action('admin_init', array(__CLASS__, 'admin_init'));

        // order important
        add_action('save_post', array(__CLASS__, 'init_post_meta'));
        add_action('save_post', array(__CLASS__, 'save_post_meta'));

        add_action('before_delete_post', array(__CLASS__, 'before_delete_post'));

        add_action('admin_enqueue_scripts', array(__CLASS__, 'admin_enqueue_scripts'));

        add_action('add_meta_boxes', array(__CLASS__, 'add_meta_boxes'));

        add_action('cmfaq_category_add_form_fields', array(__CLASS__, 'cmfaq_category_add_form_fields'));
        add_action('cmfaq_category_edit_form_fields', array(__CLASS__, 'cmfaq_category_edit_form_fields'));

        add_action('create_cmfaq_category', array(__CLASS__, 'save_cmfaq_category_custom_meta'));
        add_action('edited_cmfaq_category', array(__CLASS__, 'save_cmfaq_category_custom_meta'));
        add_action('delete_cmfaq_category', array(__CLASS__, 'delete_cmfaq_category_custom_meta'));

        add_action('admin_notices', array(__CLASS__, 'admin_notices'));
    }

    public static function admin_init() {
        if (isset($_POST['cmfaq_action_update']) && isset($_POST['nonce']) && is_admin()) {
            if (wp_verify_nonce($_POST['nonce'], 'cmfaq_action_update')) {
                self::update_options();
            }
        }
        if (isset($_POST['cmfaq_action_restore_defaults']) && isset($_POST['nonce']) && is_admin()) {
            if (wp_verify_nonce($_POST['nonce'], 'cmfaq_action_restore_defaults')) {
                self::restore_default_options(TRUE);
            }
        }
    }

    public static function genereate_faq_page() {
        $page_id = get_option('cmfaq_page_id', FALSE);
        if ($page_id && get_post($page_id)) {
            return;
        }
        $id = wp_insert_post(array(
            'post_author' => get_current_user_id(),
            'post_status' => 'publish',
            'post_title' => 'FAQ',
            'post_type' => 'page',
            'post_content' => '[cm_faq]'
        ));

        if (is_numeric($id)) {
            update_option('cmfaq_page_id', $id);
        }
    }

    public static function admin_notices() {
        foreach (self::$messages as $item) {
            echo '<div class="' . $item['class'] . '"><p>' . $item['message'] . '</p></div>';
        }
    }

    public static function admin_enqueue_scripts() {
        if (is_admin() && get_current_screen()->taxonomy == 'cmfaq_category') {
            wp_enqueue_media();
            wp_enqueue_script('cmfaq-backend', CMFAQ_PLUGIN_DIR_URL . 'assets/backend/js/backend.js', array('jquery'));
        }
    }

    public static function add_meta_boxes($post_type) {
        if ($post_type == 'cmfaq_question') {
            add_meta_box('cmfaq_main_category_iddiv', 'Main category', array(__CLASS__, 'render_meta_box_post_main_category_id'), $post_type, 'side', 'default');
        }
    }

    public static function init_post_meta($post_id) {
        $post = get_post($post_id);
        if ($post && $post->post_type == 'cmfaq_question') {
            add_post_meta($post->ID, 'cmfaq_rating', 0, TRUE);
            add_post_meta($post->ID, 'cmfaq_main_category_id', FALSE, TRUE);
        }
    }

    public static function before_delete_post($post_id) {
        $post = get_post($post_id);
        if ($post && $post->post_type == 'cmfaq_question') {
            delete_post_meta($post->ID, 'cmfaq_main_category_id');
        }
    }

    public static function save_post_meta($post_id) {
        $post = get_post($post_id);
        if (!$post || $post->post_type != 'cmfaq_question') {
            return $post_id;
        }
        if (!wp_verify_nonce(filter_input(INPUT_POST, 'cmfaq_main_category_id_nonce'), 'cmfaq_main_category_id')) {
            return $post_id;
        }
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return $post_id;
        }
        update_post_meta($post->ID, 'cmfaq_main_category_id', $_POST['cmfaq_main_category_id']);
    }

    public static function save_cmfaq_category_custom_meta($term_id) {
        if (isset($_POST['term_meta'])) {
            $t_id = $term_id;
            $term_meta = get_option("taxonomy_$t_id");
            $cat_keys = array_keys($_POST['term_meta']);
            foreach ($cat_keys as $key) {
                if (isset($_POST['term_meta'][$key])) {
                    $term_meta[$key] = $_POST['term_meta'][$key];
                }
            }
            update_option("taxonomy_$t_id", $term_meta);
        }
    }

    public static function delete_cmfaq_category_custom_meta($term_id) {
        delete_option("taxonomy_{$term_id}");
    }

    public static function admin_menu() {
        add_menu_page(CMFAQ_NAME, CMFAQ_NAME, 'level_1', CMFAQ_SLUG_NAME, 'edit.php?post_type=cmfaq_question', CMFAQ_PLUGIN_DIR_URL . 'assets/backend/img/icon-16x16.png');
        add_submenu_page(CMFAQ_SLUG_NAME, 'Add New Question', 'Add New Question', 'level_1', 'post-new.php?post_type=cmfaq_question');
        add_submenu_page(CMFAQ_SLUG_NAME, 'Categories', 'Categories', 'level_1', 'edit-tags.php?taxonomy=cmfaq_category');
        //add_submenu_page(CMFAQ_SLUG_NAME, 'Tags', 'Tags', 'level_1', 'edit-tags.php?taxonomy=cmfaq_tag');
        add_submenu_page(CMFAQ_SLUG_NAME, 'Options', 'Options', 'level_1', CMFAQ_SLUG_NAME . '-options', array(__CLASS__, 'page_options'));
    }

    public static function parent_file() {
        return CMFAQ_SLUG_NAME;
    }

    public static function nav() {
        global $self, $parent_file, $submenu_file, $plugin_page, $typenow, $submenu;
        ob_start();
        $submenus = array();

        $menuItem = CMFAQ_SLUG_NAME;

        if (isset($submenu[$menuItem])) {
            $thisMenu = $submenu[$menuItem];

            foreach ($thisMenu as $sub_item) {
                $slug = $sub_item[2];

                // Handle current for post_type=post|page|foo pages, which won't match $self.
                $self_type = !empty($typenow) ? $self . '?post_type=' . $typenow : 'nothing';

                $isCurrent = FALSE;
                $subpageUrl = get_admin_url('', 'admin.php?page=' . $slug);

                if ((!isset($plugin_page) && $self == $slug) || (isset($plugin_page) && $plugin_page == $slug && ($menuItem == $self_type || $menuItem == $self || file_exists($menuItem) === false))) {
                    $isCurrent = TRUE;
                }

                $url = (strpos($slug, '.php') !== false || strpos($slug, 'http') !== false) ? $slug : $subpageUrl;
                $isExternalPage = strpos($slug, 'http') !== FALSE;
                $submenus[] = array(
                    'link' => $url,
                    'title' => $sub_item[0],
                    'current' => $isCurrent,
                    'target' => $isExternalPage ? '_blank' : ''
                );
            }
            include CMFAQ_PLUGIN_DIR_PATH . 'views/backend/nav.php';
        }
        $nav = ob_get_clean();
        return $nav;
    }

    public static function display_page($content) {
        $nav = self::nav();
        include CMFAQ_PLUGIN_DIR_PATH . 'views/backend/template.php';
    }

    public static function page() {
        ob_start();
        switch ($_GET['page']) {
            case CMFAQ_SLUG_NAME . '-about' : {
                    include CMFAQ_PLUGIN_DIR_PATH . 'views/backend/about.php';
                    break;
                }
            case CMFAQ_SLUG_NAME . '-user-guide' : {
                    include CMFAQ_PLUGIN_DIR_PATH . 'views/backend/user_guide.php';
                    break;
                }
        }
        self::display_page(ob_get_clean());
    }

    public static function page_options() {
        ob_start();
        include CMFAQ_PLUGIN_DIR_PATH . 'views/backend/options.php';
        self::display_page(ob_get_clean());
    }

    public static function update_options() {
        $is_flush_rewrite_rules_requres = FALSE;
        foreach ($_POST as $k => $v) {
            if (in_array($k, self::$valid_options)) {
                if (in_array($k, array('cmfaq_question_slug',
                            'cmfaq_category_slug',
                            'cmfaq_tag_slug')) && get_option($k) != $v) {
                    $is_flush_rewrite_rules_requres = TRUE;
                }
                update_option($k, $v);
            }
        }
        if ($is_flush_rewrite_rules_requres) {
            CMFAQ_Base::create_post_type();
            flush_rewrite_rules();
        }
    }

    public static function add_default_options() {
        self::set_default_options(FALSE);
    }

    public static function restore_default_options() {
        self::set_default_options(TRUE);
        self::$messages['restore_default_options'] = array('class' => 'updated', 'message' => 'Plugin options are restored to defaults.');
    }

    public static function set_default_options($overwrite = FALSE) {
        if ($overwrite) {
            foreach (self::$valid_options as $option) {
                delete_option($option);
            }
        }
        add_option('cmfaq_categories', array());
    }

    public static function cmfaq_category_add_form_fields() {
        
    }

    public static function cmfaq_category_edit_form_fields($term) {
        
    }

    public static function render_meta_box_post_main_category_id($post) {
        wp_nonce_field('cmfaq_main_category_id', 'cmfaq_main_category_id_nonce');

        $value = get_post_meta($post->ID, 'cmfaq_main_category_id', TRUE);

        echo '<label for="cmfaq_main_category_id">';
        echo 'Select main category';
        echo '</label><br />';
        echo '<select id="cmfaq_main_category_id" name="cmfaq_main_category_id">';
        echo '<option value=""></option>';
        foreach (get_terms('cmfaq_category', array('hide_empty' => FALSE)) as $item) {
            $selected = $item->term_id == $value ? 'selected="selected"' : '';
            echo '<option ' . $selected . ' value="' . esc_attr($item->term_id) . '">' . $item->name . '</option>';
        }
        echo '</select>';
    }

    private static function get_template_path($filename) {
        return CMFAQ_PLUGIN_DIR_PATH . 'views/backend/' . $filename;
    }

}
