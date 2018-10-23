<?php

$cminds_plugin_config = array(
	'plugin-is-pro'				 => FALSE,
	'plugin-has-addons'			 => FALSE,
	'plugin-version'			 => '1.1.1',
	'plugin-abbrev'				 => 'cmfaq',
	'plugin-short-slug'			 => 'cmfaq',
	'plugin-parent-short-slug'	 => '',
    'plugin-affiliate'               => '',
    'plugin-redirect-after-install'  => admin_url( 'admin.php?page=cm-faq-options' ),
        'plugin-show-guide'                 => TRUE,
     'plugin-guide-text'                 => '    <div style="display:block">
        <ol>
         <li>From the plugin admin menu select <strong>"Categories"</strong> and define your initial categories</li>
         <li>From the plugin admin menu select <strong>Add New Question </strong> to add your first question</li>
            <li>Make sure to select your question <strong>Categories</strong> and also the <strong>Main Category</strong></li>
            <li>From the plugin <strong>Options</strong> click on <strong>CM FAQ Pro page</strong> link.</li>
             <li><strong>Troubleshooting:</strong> Make sure that you are using Post name permalink structure in the WP Admin Settings -> Permalinks.</li>
            <li><strong>Troubleshooting:</strong> If post type archive does not show up or displays 404 then install Rewrite Rules Inspector plugin and use the Flush rules button.</li>
            <li><strong>Troubleshooting:</strong> Questions which appears under Uncategorized in the FAQ index page require that they will assigned to a category..</li>        
        </ol>
    </div>',
     'plugin-guide-video-height'         => 240,
     'plugin-guide-videos'               => array(
          array( 'title' => 'Installation tutorial', 'video_id' => '160219571' ),
     ),
         'plugin-upgrade-text'           => 'Good Reasons to Upgrade to Pro',
    'plugin-upgrade-text-list'      => array(
        array( 'title' => 'Introduction to the faq manager', 'video_time' => '0:00' ),
        array( 'title' => 'Search and filter main faq list', 'video_time' => '0:34' ),
        array( 'title' => 'Search floating widget', 'video_time' => '0:42' ),
        array( 'title' => 'Vote using thumbs up or down', 'video_time' => '0:51' ),
        array( 'title' => 'Advanced edition options', 'video_time' => '0:57' ),
        array( 'title' => 'Categories support', 'video_time' => '1:26' ),
        array( 'title' => 'Tags support', 'video_time' => '1:43' ),
        array( 'title' => 'Advanced setting options', 'video_time' => '1:49' ),
        array( 'title' => 'Labels and apperance setting options', 'video_time' => '2:00' ),
    ),
    'plugin-upgrade-video-height'   => 240,
    'plugin-upgrade-videos'         => array(
        array( 'title' => 'FAQ Plugin Premium Features', 'video_id' => '147647330' ),
    ),


	'plugin-file'				 => CMFAQ_FILE,
	'plugin-dir-path'			 => plugin_dir_path( CMFAQ_FILE ),
	'plugin-dir-url'			 => plugin_dir_url( CMFAQ_FILE ),
	'plugin-basename'			 => plugin_basename( CMFAQ_FILE ),
	'plugin-icon'				 => '',
	'plugin-name'				 => CMFAQ_NAME,
	'plugin-license-name'		 => CMFAQ_NAME,
	'plugin-slug'				 => '',
	'plugin-menu-item'			 => CMFAQ_SLUG_NAME,
	'plugin-textdomain'			 => CMFAQ_SLUG_NAME,
	'plugin-userguide-key'		 => '595-cm-faq-cmf',
	'plugin-store-url'			 => 'https://www.cminds.com/wordpress-plugins-library/faq-plugin-for-wordpress-by-creativeminds/',
	'plugin-review-url'			 => 'https://wordpress.org/support/view/plugin-reviews/cm-faq',
	'plugin-support-url'		 => 'https://wordpress.org/support/plugin/cm-faq',
	'plugin-changelog-url'		 => CMFAQ_RELEASE_NOTES_URL,
	'plugin-licensing-aliases'	 => array( ),
	'plugin-compare-table'	 => '
            <div class="pricing-table" id="pricing-table"><h2 style="padding-left:10px;">Upgrade The FAQ Plugin:</h2>
                <ul>
                    <li class="heading" style="background-color:red;">Current Edition</li>
                    <li class="price">FREE<br /></li>
                   <li style="text-align:left;"><span class="dashicons dashicons-yes"></span>Unlimited questions</li>
                   <li style="text-align:left;"><span class="dashicons dashicons-yes"></span>Show all question on an index page</li>
                  <li style="text-align:left;"><span class="dashicons dashicons-yes"></span>Create a post for each question and answer</li>
                   <hr>
                    Other CreativeMinds Offerings
                    <hr>
                 <a href="https://www.cminds.com/wordpress-plugins-library/seo-keyword-hound-wordpress/" target="blank"><img src="' . plugin_dir_url( __FILE__ ). 'views/Hound2.png"  width="220"></a><br><br><br>
                <a href="https://www.cminds.com/store/cm-wordpress-plugins-yearly-membership/" target="blank"><img src="' . plugin_dir_url( __FILE__ ). 'views/banner_yearly-membership_220px.png"  width="220"></a><br>
                  </ul>

                <ul>
                   <li class="heading">Pro<a href="https://www.cminds.com/wordpress-plugins-library/faq-plugin-for-wordpress-by-creativeminds/" style="float:right;font-size:11px;color:white;" target="_blank">More</a></li>
                    <li class="price">$39.00<br /> <span style="font-size:14px;">(For one Year / Site)<br />Additional pricing options available <a href="https://www.cminds.com/wordpress-plugins-library/faq-plugin-for-wordpress-by-creativeminds/" target="_blank"> >>> </a></span> <br /></li>
                    <li class="action"><a href="https://www.cminds.com/?edd_action=add_to_cart&download_id=65190&wp_referrer=https://www.cminds.com/checkout/&edd_options[price_id]=1" style="font-size:18px;" target="_blank">Upgrade Now</a></li>
                     <li style="text-align:left;"><span class="dashicons dashicons-yes"></span>All Free Version Features <span class="dashicons dashicons-admin-comments cminds-package-show-tooltip" style="color:green" title="All free features are supported in the pro"></span></li>
<li style="text-align:left;"><span class="dashicons dashicons-yes"></span>Multiple Lists<span class="dashicons dashicons-admin-comments cminds-package-show-tooltip" style="color:green" title="Support multiple lists of FAQ. Each list have a unique index page with all questions and answers grouped into categories."></span></li>
<li style="text-align:left;"><span class="dashicons dashicons-yes"></span>Search Widget<span class="dashicons dashicons-admin-comments cminds-package-show-tooltip" style="color:green" title="Add floating search widget on pre-selected post types and style widget according to your needs and language. Widget supports Ajax search and voting functionality. Search widget is searching across all lists defined in plugin"></span></li>
<li style="text-align:left;"><span class="dashicons dashicons-yes"></span>Search Bar<span class="dashicons dashicons-admin-comments cminds-package-show-tooltip" style="color:green" title="Index page includes a search bar showing all relevant questions once typing a keyword.  Search bar shows only questions grouped into a specific list."></span></li>
<li style="text-align:left;"><span class="dashicons dashicons-yes"></span>Category Icon and color<span class="dashicons dashicons-admin-comments cminds-package-show-tooltip" style="color:green" title="Add an icon to each category and set a background color which will be show on the index page."></span></li>
<li style="text-align:left;"><span class="dashicons dashicons-yes"></span>Customize labels<span class="dashicons dashicons-admin-comments cminds-package-show-tooltip" style="color:green" title="Customize the plugin labels according to your requirements and language."></span></li>
<li style="text-align:left;"><span class="dashicons dashicons-yes"></span>Customize Index page Look &amp; Feel<span class="dashicons dashicons-admin-comments cminds-package-show-tooltip" style="color:green" title="Customize index page look &amp; feel including colors and font size. You can also select which categories would appear on the front page"></span></li>
<li style="text-align:left;"><span class="dashicons dashicons-yes"></span>Voting<span class="dashicons dashicons-admin-comments cminds-package-show-tooltip" style="color:green" title="Support voting (vote up and down) for each frequently asked question. Search results show most voted questions first for more efficient results."></span></li>
<li style="text-align:left;"><span class="dashicons dashicons-yes"></span>Related Questions Widget<span class="dashicons dashicons-admin-comments cminds-package-show-tooltip" style="color:green" title="Show all related questions at the bottom of each question page."></span></li>
<li style="text-align:left;"><span class="dashicons dashicons-yes"></span>Reports and Statistics<span class="dashicons dashicons-admin-comments cminds-package-show-tooltip" style="color:green" title="Generate a report showing how many times each question was viewed and how many times it was voted ."></span></li>
<li style="text-align:left;"><span class="dashicons dashicons-yes"></span>Sort Question in Category<span class="dashicons dashicons-admin-comments cminds-package-show-tooltip" style="color:green" title="Sorting of questions in category can be defined in the plugin settings. Options are by publish date, voting and title in ascending or descending order."></span></li>
<li style="text-align:left;"><span class="dashicons dashicons-yes"></span>Shortcode support<span class="dashicons dashicons-admin-comments cminds-package-show-tooltip" style="color:green" title="Shortcodes to support showing all questions in one or multiple categories. "></span></li>
                  <li class="support" style="background-color:lightgreen; text-align:left; font-size:14px;"><span class="dashicons dashicons-yes"></span> One year of expert support <span class="dashicons dashicons-admin-comments cminds-package-show-tooltip" style="color:grey" title="You receive 365 days of WordPress expert support. We will answer questions you have and also support any issue related to the plugin. We will also provide on-site support."></span><br />
                         <span class="dashicons dashicons-yes"></span> Unlimited product updates <span class="dashicons dashicons-admin-comments cminds-package-show-tooltip" style="color:grey" title="During the license period, you can update the plugin as many times as needed and receive any version release and security update"></span><br />
                        <span class="dashicons dashicons-yes"></span> Plugin can be used forever <span class="dashicons dashicons-admin-comments cminds-package-show-tooltip" style="color:grey" title="Once license expires, If you choose not to renew the plugin license, you can still continue to use it as long as you want."></span><br />
                        <span class="dashicons dashicons-yes"></span> Save 40% once renewing license <span class="dashicons dashicons-admin-comments cminds-package-show-tooltip" style="color:grey" title="Once license expires, If you choose to renew the plugin license you can do this anytime you choose. The renewal cost will be 35% off the product cost."></span></li>
                </ul>

            </div>',
);
