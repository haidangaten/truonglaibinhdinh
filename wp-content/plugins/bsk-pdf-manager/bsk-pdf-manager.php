<?php

/*
Plugin Name: BSK PDF Manager
Description: Help you manage your PDF documents. PDF documents can be filter by category. Support short code to show special PDF documents or all PDF documents under  category. Widget supported.
Version: 1.8.2
Author: bannersky
Author URI: http://www.bannersky.com/

------------------------------------------------------------------------

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, 
or any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA

*/
if ( !defined( 'ABSPATH' ) ) {
	exit;
}

class BSKPDFManager {
	
    private static $instance;
    
	public $_bsk_pdf_manager_plugin_version = '1.8.2';
	public $_bsk_pdf_manager_upload_folder = 'wp-content/uploads/bsk-pdf-manager/';
	public $_bsk_pdf_manager_upload_path = ABSPATH;
	public $_bsk_pdf_manager_admin_notice_message = array();

	public $_bsk_pdf_manager_cats_tbl_name = 'bsk_pdf_manager_cats';
	public $_bsk_pdf_manager_pdfs_tbl_name = 'bsk_pdf_manager_pdfs';
	
	public $_bsk_pdf_manager_pages = array( 'category' => 'bsk-pdf-manager', 
                                                                 'pdf' => 'bsk-pdf-manager-pdfs', 
                                                                 'setting' => 'bsk-pdf-manager-settings-support', 
                                                                 'support' => 'bsk-pdf-manager-settings-support'
                                                              );
	
	//objects
	public $_bsk_pdf_manager_OBJ_dashboard = NULL;
	
	public $_default_pdf_icon_url = '';
	
    public static function instance() {
        if ( ! isset( self::$instance ) && ! ( self::$instance instanceof BSKPDFManager ) ) {
            global $wpdb;
            
			self::$instance = new BSKPDFManager;
            
            // Plugin Folder Path.
            if ( ! defined( 'BSK_PDF_MANAGER_PLUGIN_DIR' ) ) {
                define( 'BSK_PDF_MANAGER_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
            }
            
            if ( ! defined( 'BSK_PDF_MANAGER_PLUGIN_URL' ) ) {
                define( 'BSK_PDF_MANAGER_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
            }
            
            self::$instance->_bsk_pdf_manager_cats_tbl_name = $wpdb->prefix.self::$instance->_bsk_pdf_manager_cats_tbl_name;
            self::$instance->_bsk_pdf_manager_pdfs_tbl_name = $wpdb->prefix.self::$instance->_bsk_pdf_manager_pdfs_tbl_name;
            self::$instance->_bsk_pdf_manager_upload_path = str_replace("\\", "/", self::$instance->_bsk_pdf_manager_upload_path);

            self::$instance->_default_pdf_icon_url = BSK_PDF_MANAGER_PLUGIN_DIR.'images/default_PDF_icon.png';
            
            //hooks
            register_activation_hook( __FILE__, array( self::$instance, 'bsk_pdf_manager_activate' ) );
            register_deactivation_hook( __FILE__, array( self::$instance, 'bsk_pdf_manager_deactivate' ) );
            register_uninstall_hook( __FILE__, 'BSKPDFManager::bsk_pdf_manager_uninstall' );

            //include others class
		    require_once( BSK_PDF_MANAGER_PLUGIN_DIR.'inc/bsk-pdf-dashboard.php' );

            $init_arg = array();
            $init_arg['upload_folder'] = self::$instance->_bsk_pdf_manager_upload_folder;
            $init_arg['upload_path'] = self::$instance->_bsk_pdf_manager_upload_path;
            $init_arg['cat_tbl_name'] = self::$instance->_bsk_pdf_manager_cats_tbl_name;
            $init_arg['pdf_tbl_name'] = self::$instance->_bsk_pdf_manager_pdfs_tbl_name;
            $init_arg['pages_name_A'] = self::$instance->_bsk_pdf_manager_pages;
            $init_arg['plugin_version'] = self::$instance->_bsk_pdf_manager_plugin_version;
            $init_arg['default_pdf_icon'] = self::$instance->_default_pdf_icon_url;

            self::$instance->_bsk_pdf_manager_OBJ_dashboard = new BSKPDFManagerDashboard( $init_arg );
            
            add_action( 'admin_notices', array(self::$instance, 'bsk_pdf_manager_admin_notice') );
            add_action( 'admin_enqueue_scripts', array(self::$instance, 'bsk_pdf_manager_enqueue_scripts_css') );
            add_action( 'wp_enqueue_scripts', array(self::$instance, 'bsk_pdf_manager_enqueue_scripts_css') );
            
            require_once( BSK_PDF_MANAGER_PLUGIN_DIR.'inc/bsk-pdf-manager-widget.php' );
            require_once( BSK_PDF_MANAGER_PLUGIN_DIR.'inc/bsk-pdf-manager-widget-category.php' );
            
            add_action( 'widgets_init', create_function( '', 'register_widget( "BSKPDFManagerWidget" );' ) );
		    add_action( 'widgets_init', create_function( '', 'register_widget( "BSKPDFManagerWidgetCategory" );' ) );
            
            add_action( 'init', array(self::$instance, 'bsk_pdf_manager_post_action') );
            
            self::$instance->bsk_pdf_create_upload_folder_and_set_secure();
		}
        
		return self::$instance;
	}
	
	function bsk_pdf_manager_activate(){
		//create or update table
		self::$instance->bsk_pdf_manager_create_table();
		
	}
	
	function bsk_pdf_manager_deactivate(){
        
	}
	
	function bsk_pdf_manager_uninstall(){
		//check if pro version installed
		$plugin_root_path = str_replace( "\\", "/", ABSPATH );
		if ( file_exists( $plugin_root_path.'wp-content/plugins/bsk-pdf-manager-pro/bsk-pdf-manager-pro.php' ) ){
			return;
		}

		BSKPDFManager::bsk_pdf_manager_remove_table();
	}
	
	function bsk_pdf_manager_enqueue_scripts_css(){
		wp_enqueue_script('jquery');
		if( is_admin() ){
			wp_enqueue_script( 'jquery-ui-datepicker' );
			wp_enqueue_style( 'jquery-ui', 'https://code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css' );
			wp_enqueue_script( 'bsk-pdf-manager-admin', 
                                          BSK_PDF_MANAGER_PLUGIN_URL.'js/bsk_pdf_manager_admin.js', 
                                          array('jquery'), 
                                          self::$instance->_bsk_pdf_manager_plugin_version 
                                       );
			wp_enqueue_style( 'bsk-pdf-manager-admin', 
                                        BSK_PDF_MANAGER_PLUGIN_URL.'css/bsk-pdf-manager-admin.css', 
                                        array(), 
                                        self::$instance->_bsk_pdf_manager_plugin_version );
		}else{
			wp_enqueue_script( 'bsk-pdf-manager', 
                                          BSK_PDF_MANAGER_PLUGIN_URL.'js/bsk_pdf_manager.js', 
                                          array('jquery'), 
                                          self::$instance->_bsk_pdf_manager_plugin_version );
		}
	}
	
	function bsk_pdf_manager_admin_notice(){
		$warning_message = array();
		$error_message = array();
		
		//admin message
		if (count(self::$instance->_bsk_pdf_manager_admin_notice_message) > 0){
			foreach(self::$instance->_bsk_pdf_manager_admin_notice_message as $msg){
				if($msg['type'] == 'ERROR'){
					$error_message[] = $msg['message'];
				}
				if($msg['type'] == 'WARNING'){
					$warning_message[] = $msg['message'];
				}
			}
		}
		
		//show error message
		if(count($warning_message) > 0){
			echo '<div class="update-nag">';
			foreach($warning_message as $msg_to_show){
				echo '<p>'.$msg_to_show.'</p>';
			}
			echo '</div>';
		}
		
		//show error message
		if(count($error_message) > 0){
			echo '<div class="error">';
			foreach($error_message as $msg_to_show){
				echo '<p>'.$msg_to_show.'</p>';
			}
			echo '</div>';
		}
	}

	function bsk_pdf_manager_create_table(){
		global $wpdb;
		
		require_once(ABSPATH . '/wp-admin/includes/upgrade.php');
		
		
		if (!empty ($wpdb->charset)){
			$charset_collate = "DEFAULT CHARACTER SET {$wpdb->charset}";
		}
		if (!empty ($wpdb->collate)){
			$charset_collate .= " COLLATE {$wpdb->collate}";
		}
		
		$table_name = self::$instance->_bsk_pdf_manager_cats_tbl_name;
		$sql = "CREATE TABLE IF NOT EXISTS " . $table_name . " (
				      `id` int(11) NOT NULL AUTO_INCREMENT,
					  `cat_title` varchar(512) NOT NULL,
					  `last_date` datetime DEFAULT NULL,
					  PRIMARY KEY (`id`)
				) $charset_collate;";
		dbDelta($sql);
		
		$table_name = self::$instance->_bsk_pdf_manager_pdfs_tbl_name;
		$sql = "CREATE TABLE IF NOT EXISTS " . $table_name . " (
				     `id` int(11) NOT NULL AUTO_INCREMENT,
					  `cat_id` int(11) NOT NULL,
					  `title` varchar(512) DEFAULT NULL,
					  `file_name` varchar(512) NOT NULL,
					  `last_date` datetime DEFAULT NULL,
					  PRIMARY KEY (`id`)
				) $charset_collate;";
		dbDelta($sql);
	}
	
	function bsk_pdf_manager_remove_table(){
		global $wpdb;
		
        $table_cats = $wpdb->prefix."bsk_pdf_manager_cats";
		$table_pdfs = $wpdb->prefix."bsk_pdf_manager_pdfs";
		
		$wpdb->query("DROP TABLE IF EXISTS $table_cats");
		$wpdb->query("DROP TABLE IF EXISTS $table_pdfs");		
	}
	
	function bsk_pdf_manager_post_action(){
		if( isset( $_POST['bsk_pdf_manager_action'] ) && strlen($_POST['bsk_pdf_manager_action']) >0 ) {
			do_action( 'bsk_pdf_manager_' . $_POST['bsk_pdf_manager_action'], $_POST );
		}
	}
	
	function bsk_pdf_create_upload_folder_and_set_secure(){
		//create folder to upload 
		$_upload_folder_path = self::$instance->_bsk_pdf_manager_upload_path.self::$instance->_bsk_pdf_manager_upload_folder;
		if ( !is_dir($_upload_folder_path) ) {
			if ( !wp_mkdir_p( $_upload_folder_path ) ) {
                $msg = 'Directory <strong>' . $_bsk_pdf_manager_upload_folder . '</strong> can not be created. Please create it first yourself.';
				self::$instance->_bsk_pdf_manager_admin_notice_message['upload_folder_missing']  = array( 'message' => $msg,
                                                                                                                                                     'type' => 'ERROR' );
			}
		}
		
		if ( !is_writeable( $_upload_folder_path ) ) {
			$msg  = 'Directory <strong>' . self::$instance->_bsk_pdf_manager_upload_folder_path . '</strong> is not writeable ! ';
			$msg .= 'Check <a href="http://codex.wordpress.org/Changing_File_Permissions">http://codex.wordpress.org/Changing_File_Permissions</a> for how to set the permission.';

			self::$instance->_bsk_pdf_manager_admin_notice_message['upload_folder_not_writeable']  = array( 'message' => $msg,
			                                                                                      '                                                      type' => 'ERROR');
		}

		//copy file to upload foloder
		if( !file_exists($_upload_folder_path.'/index.php') ){
			copy( dirname(__FILE__).'/assets/index.php', $_upload_folder_path.'/index.php' );
		}
	}
}

BSKPDFManager::instance();