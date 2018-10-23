<?php

/*
 * Plugin Name: CM FAQ
 * Description: Build frequently answered question (FAQ) knowledge base.
 * Version: 1.1.2
 * Author: CreativeMindsSolutions
 * Author URI: https://www.cminds.com/
 */

if (!defined('ABSPATH')) {
    return;
}

if (version_compare('5.3', PHP_VERSION, '>')) {
    die(sprintf('We are sorry, but you need to have at least PHP 5.3 to run this plugin (currently installed version: %s)'
                    . ' - please upgrade or contact your system administrator.', PHP_VERSION));
}

if (class_exists('CMFAQ_Base')) {
    die('Plugin is already activated.');
}

if (!defined('CMFAQ_NAME')) {
    define('CMFAQ_NAME', 'CM FAQ');
}

if (!defined('CMFAQ_SLUG_NAME')) {
    define('CMFAQ_SLUG_NAME', 'cm-faq');
}

if (!defined('CMFAQ_FILE')) {
    define('CMFAQ_FILE', __FILE__);
}

if (!defined('CMFAQ_PLUGIN_DIR_PATH')) {
    define('CMFAQ_PLUGIN_DIR_PATH', plugin_dir_path(__FILE__));
}

if (!defined('CMFAQ_PLUGIN_DIR_URL')) {
    define('CMFAQ_PLUGIN_DIR_URL', plugin_dir_url(__FILE__));
}

/*
 * External URLs
 */
if (!defined('CMFAQ_RELEASE_NOTES_URL')) {
    define('CMFAQ_RELEASE_NOTES_URL', 'https://www.cminds.com/store/');
}

/*
 * Base plugin class
 */
include_once plugin_dir_path(__FILE__) . 'classes/Base.php';

/*
 * Render methods for frontend
 */
include_once plugin_dir_path(__FILE__) . 'classes/Frontend.php';

/*
 * Backend class
 */
include_once plugin_dir_path(__FILE__) . 'classes/Admin.php';


include_once plugin_dir_path(__FILE__) . 'bundle/package/cminds-free.php';

register_activation_hook(__FILE__, array('CMFAQ_Base', 'install'));
register_activation_hook(__FILE__, array('CMFAQ_Base', 'activation'));
register_uninstall_hook(__FILE__, array('CMFAQ_Base', 'uninstall'));

CMFAQ_Base::init();
CMFAQ_Admin::init();
