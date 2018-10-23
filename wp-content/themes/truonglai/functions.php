<?php

/**
  @ Thiết lập các chức năng sẽ được theme hỗ trợ
  **/
  if ( ! function_exists( 'truonglai_theme_setup' ) ) {
    /*
     * Nếu chưa có hàm thachpham_theme_setup() thì sẽ tạo mới hàm đó
     */
    function truonglai_theme_setup() {
            /*
                * Thêm chức năng post format
                */
                add_theme_support( 'post-formats',
                array(
                'image',
                'video',
                'gallery',
                'quote',
                'link'
                )
                );

                //featured image post
                add_theme_support('post-thumbnails');
                add_theme_support('title-tag');
                register_nav_menu('header-menu', __('Menu chính'));
                 /*
                * Thêm chức năng custom background
                */
                $default_background = array(
                    'default-color' => '#e8e8e8',
                );
                add_theme_support('custom-background', $default_background);
                $sidebar1=array(
                    'name' => 'Main Sidebar',
                    'before_widget' => '<aside id="%1$s" class="widget %2$s">',
                    'after_widget' => '</aside>',
                    'before_title' => '<h3>',
                    'after_title' => '</h3>',
                );
                register_sidebar( $sidebar1 );
                $sidebar2=array(
                    'name' => 'Footer Sidebar 1',
                    'id' => 'footer-sidebar-1',
                    'description' => 'Appears in the footer area',
                    'before_widget' => '<aside id="%1$s" class="widget %2$s">',
                    'after_widget' => '</aside>',
                    'before_title' => '<h3 class="widget-title">',
                    'after_title' => '</h3>',
                );
                register_sidebar($sidebar2);

    }
    add_action ( 'init', 'truonglai_theme_setup' );

}
/**
@ Thiết lập hàm hiển thị menu
@ thachpham_menu( $slug )
**/
if ( ! function_exists( 'truonglai_menu' ) ) {
    function truonglai_menu( $slug ) {
      $menu = array(
        'theme_location' => $slug,
        'container' => 'nav',
        'container_class' => $slug,
      );
      wp_nav_menu( $menu );
    }
  }


add_filter( 'show_admin_bar', '__return_true', PHP_INT_MAX );




//sidebar
if (function_exists('register_sidebar')) {
    register_sidebar(array(
        'name' => 'Footer Sidebar 2',
        'id' => 'footer-sidebar-2',
        'description' => 'Appears in the footer area',
        'before_widget' => '<aside id="%1$s" class="widget %2$s">',
        'after_widget' => '</aside>',
        'before_title' => '<h3 class="widget-title">',
        'after_title' => '</h3>',
    ));
    register_sidebar(array(
        'name' => 'Footer Sidebar 3',
        'id' => 'footer-sidebar-3',
        'description' => 'Appears in the footer area',
        'before_widget' => '<aside id="%1$s" class="widget %2$s">',
        'after_widget' => '</aside>',
        'before_title' => '<h3 class="widget-title">',
        'after_title' => '</h3>',
    ));
    register_sidebar(array(
        'name' => 'sidebar-left',
        'id' => 'sidebar-left-1',
        'before_widget' => '<div class="category-sidebar">',
        'after_widget' => '</div>',
        'before_title' => '<h5 class="sidebar-title">',
        'after_title' => '</h5>'
        ));
        register_sidebar(array(
            'name' => 'sidebar-right',
            'id' => 'sidebar-right-1',
            'before_widget' => '<div class="category-sidebar">',
            'after_widget' => '</div>',
            'before_title' => '<h5 class="sidebar-title">',
            'after_title' => '</h5>'
            ));
    

}

function new_excerpt_more($more)
{
    global $post;
    return '...<br /><br /><a href="' . get_permalink($post->ID) . '" class="read_more">xem thêm →</a>';
}
add_filter('excerpt_more', 'new_excerpt_more');

// add_action('after_setup_theme', 'wpdocs_theme_setup');
// function wpdocs_theme_setup()
// {
//     add_image_size('home-thumb', 270, 250);
//     add_image_size('cat-thumb', 300, 150);
// }

// // regular size
// add_image_size('regular', 400, 350, true);

// // medium size
// add_image_size('medium', 650, 500, true);

// // large thumbnails
// add_image_size('large', 960, '');

//Dynamic Copyright Date
function wpb_copyright()
{
    global $wpdb;
    $copyright_dates = $wpdb->get_results("
    SELECT
    YEAR(min(post_date_gmt)) AS firstdate,
    YEAR(max(post_date_gmt)) AS lastdate
    FROM
    $wpdb->posts
    WHERE
    post_status = 'publish'
    ");
    $output = '';
    if ($copyright_dates) {
        $copyright = "© " . $copyright_dates[0]->firstdate;
        if ($copyright_dates[0]->firstdate != $copyright_dates[0]->lastdate) {
            $copyright .= '-' . $copyright_dates[0]->lastdate;
        }
        $output = $copyright;
    }
    return $output;
}
// giới hạn tóm tắt bài viết
function custom_excerpt_length( $length ) {
    return 15;
}
add_filter( 'excerpt_length', 'custom_excerpt_length', 999 );

function my_wpdiscuz_shortcode() {
    if(file_exists(ABSPATH . 'wp-content/plugins/wpdiscuz/templates/comment/comment-form.php')){
       include_once ABSPATH . 'wp-content/plugins/wpdiscuz/templates/comment/comment-form.php';
    }
 }
 add_shortcode( 'wpdiscuz_comments', 'my_wpdiscuz_shortcode' );
//---------Lấy content từ 1 trang bất kỳ-----------//
 function cn_include_content($pid) {
	$thepageinquestion = get_post($pid);
	$content = $thepageinquestion->post_content;
	$content = apply_filters('the_content', $content);
	echo $content;
}
function cn_include_page( $atts, $content = null ) {
	extract(shortcode_atts(array( // a few default values
	   'id' => '')
	   , $atts));
	   cn_include_content($id);
}
add_shortcode('includepage', 'cn_include_page');

define( 'WPCF7_UPLOADS_TMP_DIR', '/your/file/path' );

add_action('wp_default_scripts', function ($scripts) {
    if (!empty($scripts->registered['jquery'])) {
        $scripts->registered['jquery']->deps = array_diff($scripts->registered['jquery']->deps, ['jquery-migrate']);
    }
});

//------------custom login------------------
function my_custom_login() {
    echo '<link rel="stylesheet" type="text/css" href="' . get_bloginfo('stylesheet_directory') . '/login/custom-login.css" />';
    }
    add_action('login_head', 'my_custom_login');
function my_login_logo_url() {
return get_bloginfo( 'url' );
}
add_filter( 'login_headerurl', 'my_login_logo_url' );
function login_checked_remember_me() {
    add_filter( 'login_footer', 'rememberme_checked' );
    }
    add_action( 'init', 'login_checked_remember_me' );
    
    function rememberme_checked() {
    echo "<script>document.getElementById('rememberme').checked = true;</script>";
    }
    function login_error_override()
    {
        return 'Tên người dùng hoặc mật khẩu không đúng';
    }
    add_filter('login_errors', 'login_error_override');
    function my_login_head() {
        remove_action('login_head', 'wp_shake_js', 12);
        }
        add_action('login_head', 'my_login_head');
//-------------------------------------------------------------------------------------

function wpb_adding_styles() {
    wp_register_style('bootstrap', get_template_directory_uri() . '/css/bootstrap.min.css', true);
    wp_enqueue_style('bootstrap');
    wp_register_style('icofont', get_template_directory_uri() . '/css/icofont.css', true);
    wp_enqueue_style('icofont');
    wp_register_style('plugin', get_template_directory_uri() . '/css/plugins.css', true);
    wp_enqueue_style('plugin');
    wp_register_style('shortcodes', get_template_directory_uri() . '/css/shortcode/shortcodes.css', true);
    wp_enqueue_style('shortcodes');
    wp_register_style('responsive', get_template_directory_uri() . '/css/responsive.css', true);
    wp_enqueue_style('responsive');
    wp_register_style('style-customizer', get_template_directory_uri() . '/css/style-customizer.css', true);
    wp_enqueue_style('style-customizer');
    wp_register_style('style', get_template_directory_uri() . '/style.css', true);
    wp_enqueue_style('style');
    wp_register_style('color-1', get_template_directory_uri() . '/css/color/color-1.css', true);
    wp_enqueue_style('color-1');
    }
    add_action( 'wp_enqueue_scripts', 'wpb_adding_styles' );

 function wpb_adding_scripts() {
    wp_register_script('modernizr', get_template_directory_uri() . '/js/vendor/modernizr-2.8.3.min.js', true);
    wp_enqueue_script('modernizr');
    wp_register_script('jquery', get_template_directory_uri() . '/js/vendor/jquery-1.12.0.min.js',array('jquery'),'1.12.0', true);
    wp_enqueue_script('jquery');
    wp_register_script('bootstrap', get_template_directory_uri() . '/js/bootstrap.min.js', true);
    wp_enqueue_script('bootstrap');
    wp_register_script('ajax-mail', get_template_directory_uri() . '/js/ajax-mail.js', true);
    wp_enqueue_script('ajax-mail');  
    wp_register_script('plugin', get_template_directory_uri() . '/js/plugins.js', true);
    wp_enqueue_script('plugin');  
    wp_register_script('wow', get_template_directory_uri() . '/js/wow.min.js', true);
    wp_enqueue_script('wow');  
    wp_enqueue_script('parsley', 'https://cdnjs.cloudflare.com/ajax/libs/parsley.js/2.6.5/parsley.min.js', ['jquery'], null, true); 
 }
          
add_action( 'wp_enqueue_scripts', 'wpb_adding_scripts' );

// numbered pagination

function pagination_tdc() {
    if( is_singular() )
    return;
    global $wp_query;
    /** Ngừng thực thi nếu có ít hơn hoặc chỉ có 1 bài viết */
    if( $wp_query->max_num_pages <= 1 )
    return;
    $paged = get_query_var( 'paged' ) ? absint( get_query_var( 'paged' ) ) : 1;
    $max = intval( $wp_query->max_num_pages );
 
    /** Thêm page đang được lựa chọn vào mảng*/
    if ( $paged >= 1 )
    $links[] = $paged;
    /** Thêm những trang khác xung quanh page được chọn vào mảng */
    if ( $paged >= 3 ) {
           $links[] = $paged - 1;
           $links[] = $paged - 2;
     }
 
     if ( ( $paged + 2 ) <= $max ) {
           $links[] = $paged + 2;
           $links[] = $paged + 1;
      }
 
 /** Hiển thị thẻ đầu tiên \n để xuống dòng code */
  echo '<div class="pagination text-center">' . "\n";
  echo '<ul>'."\n";
  /** Hiển thị link về trang trước */
  if ( get_previous_posts_link() )
  printf( '<li>%s</li>' . "\n", get_previous_posts_link('<i class="icofont icofont-simple-left"></i>') );
 
  /** Nếu đang ở trang 1 thì nó sẽ hiển thị đoạn này */
  if ( ! in_array( 1, $links ) ) {
  $class = 1 == $paged ? ' class="active"' : '';
  printf( '<li %s><a rel="nofollow" class="page larger" href="%s">%s</a></li>' . "\n", $class, esc_url( get_pagenum_link( 1 ) ), '1' );
  if ( ! in_array( 2, $links ) )
  echo '<li>…</li>';
  }
 
  /** Hiển thị khi đang ở một trang nào đó đang được lựa chọn */
  sort( $links );
  foreach ( (array) $links as $link ) {
  $class = $paged == $link ? ' class="active"' : '';
  printf( '<li%s><a rel="nofollow" class="page larger" href="%s">%s</a></li>' . "\n", $class, esc_url( get_pagenum_link( $link ) ), $link );
  }
 
  /** Hiển thị khi đang ở trang cuối cùng */
  if ( ! in_array( $max, $links ) ) {
  if ( ! in_array( $max - 1, $links ) )
  echo '<li>…</li>' . "\n";
  $class = $paged == $max ? ' class="active"' : '';
  printf( '<li%s><a rel="nofollow" class="page larger" href="%s">%s</a></li>' . "\n", $class, esc_url( get_pagenum_link( $max ) ), $max );
  }
 
  /** Hiển thị link về trang sau */
  if ( get_next_posts_link() )
  printf( '<li>%s</li>' . "\n", get_next_posts_link('<i class="icofont icofont-simple-right"></i>') );
  echo '</ul>' . "\n";
 }



/**
 @ Thiết lập $content_width để khai báo kích thước chiều rộng của nội dung
 **/
if ( ! isset( $content_width ) ) {
    /*
     * Nếu biến $content_width chưa có dữ liệu thì gán giá trị cho nó
     */
    $content_width = 620;
}


/**
@ Hàm hiển thị tag của post
@ thachpham_entry_tag()
**/
if ( ! function_exists( 'truonglai_entry_tag' ) ) {
    function truonglai_entry_tag() {
      if ( has_tag() ) :
        echo '<div class="blog-tags float-left">';
        printf( get_the_tag_list( '', '/ ' ) );
        echo '</div>';
      endif;
    }
  }

  remove_action( 'wp_head', 'wp_generator' );

function get_breadcrumb() {
    echo '<a href="'.home_url().'" rel="nofollow">HOME</a>';
    if (is_category() || is_single()) {
        echo "&nbsp;&nbsp;&#47;&nbsp;&nbsp;";
        the_category(' &bull; ');
            
    } elseif ( is_page()) {
        echo "&nbsp;&nbsp;&#47;&nbsp;&nbsp;";
        echo the_title();
    } elseif(is_tag()){
        echo "&nbsp;&nbsp;&#47;&nbsp;&nbsp;";
        echo single_tag_title();
    }
    elseif (is_search()) {
        echo "&nbsp;&nbsp;&#47;&nbsp;&nbsp;Kết quả tìm kiếm cho... ";
        echo '"<em>';
        echo the_search_query();
        echo '</em>"';
    }
}

add_filter( 'wpcf7_load_js', '__return_false' );
add_filter( 'wpcf7_load_css', '__return_false' );
add_action( 'the_content', 'load_cf7_assets' );
function load_cf7_assets($content){
	global $post;
	$post_content = $post->post_content;
	if ( has_shortcode( $post_content, 'contact-form-7' ) ) {
		// ThuThuat.VIP Load CF7 Javascript
		if ( function_exists( 'wpcf7_enqueue_scripts' ) ) {
			wpcf7_enqueue_scripts();
		}
		// ThuThuat.VIP Load CF7 CSS
		if ( function_exists( 'wpcf7_enqueue_styles' ) ) {
			wpcf7_enqueue_styles();
		}
	}
	return $content;
}
add_filter('rest_authentication_errors','disable_rest_api');
function disable_rest_api(){
   if(!is_user_logged_in()){
      return new WP_Error('Error!', __('Unauthorized access is denied!','rest-api-error'), array('status' => rest_authorization_required_code()));
   }
}
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');
?>