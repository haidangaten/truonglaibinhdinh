<?php


define('WP_HOME', 'http://localhost/demo');
define('WP_SITEURL', 'http://localhost/demo');
/**
 * Cấu hình cơ bản cho WordPress
 *
 * Trong quá trình cài đặt, file "wp-config.php" sẽ được tạo dựa trên nội dung 
 * mẫu của file này. Bạn không bắt buộc phải sử dụng giao diện web để cài đặt, 
 * chỉ cần lưu file này lại với tên "wp-config.php" và điền các thông tin cần thiết.
 *
 * File này chứa các thiết lập sau:
 *
 * * Thiết lập MySQL
 * * Các khóa bí mật
 * * Tiền tố cho các bảng database
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** Thiết lập MySQL - Bạn có thể lấy các thông tin này từ host/server ** //
/** Tên database MySQL */
define('DB_NAME', 'truonglaixetrungbo');

/** Username của database */
define('DB_USER', 'root');

/** Mật khẩu của database */
define('DB_PASSWORD', '');

/** Hostname của database */
define('DB_HOST', 'localhost');

/** Database charset sử dụng để tạo bảng database. */
define('DB_CHARSET', 'utf8mb4');

/** Kiểu database collate. Đừng thay đổi nếu không hiểu rõ. */
define('DB_COLLATE', '');

/**#@+
 * Khóa xác thực và salt.
 *
 * Thay đổi các giá trị dưới đây thành các khóa không trùng nhau!
 * Bạn có thể tạo ra các khóa này bằng công cụ
 * {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * Bạn có thể thay đổi chúng bất cứ lúc nào để vô hiệu hóa tất cả
 * các cookie hiện có. Điều này sẽ buộc tất cả người dùng phải đăng nhập lại.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'XLkm/Gx9L=f[IKuZ>Z@jpb50<m69ibvRnXDSe55_@3ttW*B(4B([X>Gw]`Q4A}oN');
define('SECURE_AUTH_KEY',  'w7Mw)m1j.zL$oSw2BAw`T$&O1#FAi0Cq-.|JY+/WhF`s@m|]qMZ`P;.J]mO3G9qH');
define('LOGGED_IN_KEY',    'C:@C>H*6/fas|@nTvtB*N=>KC,co9n=v3U%*65~Uf#+9Q4jBA&eOTb+PQJfF9uqq');
define('NONCE_KEY',        '|H9d^O!}lVPW(o-rZEEdaU:}nJJW}%.EI:yOA6y|`,%fbm.y3DBko&zJ`w2d%+Iv');
define('AUTH_SALT',        '8s9`qp4r9v1?Djg;8s!Zs1{g:_;/THrv^WA/-eaV2^Dg9sg_uzCL@8&Is0;Iw.Bt');
define('SECURE_AUTH_SALT', 'q>YDFPUc=5#xTH^i;@lSi+_Q_^8^Nd3^74z(3h,bIZdf5mAGX!cob_`U}u+8{]Ce');
define('LOGGED_IN_SALT',   '._V~]gRHsCK/n(GpYUa6|4On+U2 Je&81<d-[FSGyq93eAZxuyE 0NM$y)YnjA+a');
define('NONCE_SALT',       'U14/6[Q+ALkHnTSk}0a%KMUI>ggtU;S^I@9iAwTBCVb1C0/W^:qn,us[q@M.YwKy');

/**#@-*/

/**
 * Tiền tố cho bảng database.
 *
 * Đặt tiền tố cho bảng giúp bạn có thể cài nhiều site WordPress vào cùng một database.
 * Chỉ sử dụng số, ký tự và dấu gạch dưới!
 */
$table_prefix  = 'jyydj_';

/**
 * Dành cho developer: Chế độ debug.
 *
 * Thay đổi hằng số này thành true sẽ làm hiện lên các thông báo trong quá trình phát triển.
 * Chúng tôi khuyến cáo các developer sử dụng WP_DEBUG trong quá trình phát triển plugin và theme.
 *
 * Để có thông tin về các hằng số khác có thể sử dụng khi debug, hãy xem tại Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
// error_reporting(E_ALL);
// ini_set('display_errors', 1);
define('WP_DEBUG', false);
define('WP_MEMORY_LIMIT', '256M');
define('FS_METHOD', 'direct');

/* Đó là tất cả thiết lập, ngưng sửa từ phần này trở xuống. Chúc bạn viết blog vui vẻ. */

/** Đường dẫn tuyệt đối đến thư mục cài đặt WordPress. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Thiết lập biến và include file. */
require_once(ABSPATH . 'wp-settings.php');