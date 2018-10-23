<div class="clear"></div>


<?php
echo do_shortcode('[cminds_free_activation id="cmfaq"]');
?>
<div style="height:25px;"></div>

<div class="cmfaq">


   <h2 class="nav-tab-wrapper">
      <a href="#cmfaq-tab-plugin-upgrade" data-for="plugin-upgrade" class="nav-tab">Upgrade</a>
      <a href="#cmfaq-tab-plugin-options" data-for="plugin-options" class="nav-tab">Plugin Options</a> 
       <a href="#cmfaq-tab-plugin-installation" data-for="plugin-installation" class="nav-tab">Installation Guide</a> 
       <a href="#cmfaq-tab-plugin-shortcode" data-for="plugin-shortcode" class="nav-tab">Shortcodes</a> 
    </h2>


    <form method="post">
          <div data-role="tab" data-tab="plugin-upgrade" style="display: none;">
              <table class="form-table"><tbody>
                        <tr>
                            <td> <?php echo do_shortcode( '[cminds_upgrade_box id="cmfaq"]' ); ?></td>
                        </tr>
                    </tbody></table>
            </div>

        <div data-role="tab" data-tab="plugin-options" style="display: none;">
       <table class="form-table">

        <tr>

           <?php $index_page = get_post(get_option('cmfaq_page_id', -1)); ?>
    <?php if ($index_page): ?>
        <p>
            <strong><?php echo CMFAQ_NAME; ?> page:</strong> <a href="<?php echo esc_attr(get_page_link($index_page->ID)); ?>"><?php echo esc_html(get_page_link($index_page->ID)); ?></a> (<a href="<?php echo esc_attr(admin_url('post.php?post=' . $index_page->ID . '&action=edit')); ?>">edit</a>)
        </p>
    <?php endif; ?>
</tr>
<tr>
    <div id="cmfaq-plugin-reset-show">
        <p>
            <a href="javascript:void(0)" onclick="jQuery('#cmfaq-plugin-reset-show').hide();
                    jQuery('#cmfaq-plugin-reset').show();">Show</a> plugin reset options.
        </p>
    </div>
    <div id="cmfaq-plugin-reset" style="display: none;">
        
        <form method="post">
            <p>
                <?php submit_button('Restore options to defaults', 'secondary', NULL, FALSE, array('onclick' => 'return confirm("Are you sure?\n\nThis action cannot be undone.");')); ?>
            </p>
            <input type="hidden" name="cmfaq_action_restore_defaults" value="1" />
            <input type="hidden" name="nonce" value="<?php echo wp_create_nonce('cmfaq_action_restore_defaults'); ?>" />
        </form>
    </div>  
</tr>

           <tr>
                <th scope="row"><label for="cmfaq_page_id"><?php echo CMFAQ_NAME ?> page</label></th>
                <td>
                    <?php wp_dropdown_pages(array('name' => 'cmfaq_page_id', 'selected' => (int) get_option('cmfaq_page_id', 0), 'show_option_none' => '-None-', 'option_none_value' => '0', 'class' => 'regular-text')) ?>
                    <!--
                    <br />
                    <input id="cmfaq_new_page" type="checkbox" name="cmfaq_new_page" value="1" /><label for="cmfaq_new_page">Generate page for <?php echo CMFAQ_NAME; ?></label>
                    -->
                </td>
            </tr>
            <tr>
                <th scope="row"><label for="cmfaq_question_slug"><?php echo CMFAQ_NAME ?> questions slug *</label></th>
                <td>
                    <input name="cmfaq_question_slug" type="text" id="cmfaq_question_slug" value="<?php echo esc_attr(get_option('cmfaq_question_slug', CMFAQ_SLUG_NAME . '-question')); ?>" class="regular-text" required="required" onkeyup="jQuery('.cmfaq-question-slug').text(jQuery(this).val())">
                    <p class="description">Make your links prettier (<?php echo site_url('<strong><span class="cmfaq-question-slug">' . get_option('cmfaq_question_slug', CMFAQ_SLUG_NAME . '-question') . '</span></strong>/what-are-prime-numbers/') ?>).</p>
                </td>
            </tr>
            <tr>
                <th scope="row"><label for="cmfaq_category_slug"><?php echo CMFAQ_NAME ?> categories slug *</label></th>
                <td>
                    <input name="cmfaq_category_slug" type="text" id="cmfaq_category_slug" value="<?php echo esc_attr(get_option('cmfaq_category_slug', CMFAQ_SLUG_NAME . '-category')); ?>" class="regular-text" required="required">
                </td>
            </tr>
            <tr>
                <th scope="row"><label for="cmfaq_tag_slug"><?php echo CMFAQ_NAME ?> tags slug *</label></th>
                <td>
                    <input name="cmfaq_tag_slug" type="text" id="cmfaq_tag_slug" value="<?php echo esc_attr(get_option('cmfaq_tag_slug', CMFAQ_SLUG_NAME . '-tag')); ?>" class="regular-text" required="required">
                </td>
            </tr>
            <tr>
                <th scope="row"><label for="cmfaq_front_num_questions">Front questions limit *</label></th>
                <td>
                    <input name="cmfaq_front_num_questions" type="number" min="1" max="25" id="cmfaq_front_num_questions" value="<?php echo esc_attr(get_option('cmfaq_front_num_questions', 5)); ?>" class="regular-text" required="required">
                    <p class="description">Limit number of questions displayed under categories on front page of <?php echo CMFAQ_NAME ?> plugin.</p>
                </td>
            </tr>
            <tr>
                <th scope="row"><label for="cmfaq_num_words">Answer word limit *</label></th>
                <td>
                    <input name="cmfaq_num_words" type="number" min="5" max="1000" id="cmfaq_num_words" value="<?php echo esc_attr(get_option('cmfaq_num_words', 200)); ?>" class="regular-text" required="required">
                    <p class="description">Answer content word limit on pages with questions list.</p>
                </td>
            </tr>
            <tr>
                <th scope="row"><label for="cmfaq_label_breadcrumb_home">Breadcrumb home label *</label></th>
                <td>
                    <input name="cmfaq_label_breadcrumb_home" type="text" id="cmfaq_label_breadcrumb_home" value="<?php echo esc_attr(get_option('cmfaq_label_breadcrumb_home', 'Home')); ?>" class="regular-text" required="required">
                </td>
            </tr>
        </table>
        </div>

        

          <div data-role="tab" data-tab="plugin-installation" style="display: none;">
              <table class="form-table"><tbody>
                        <tr>
                            <td><?php echo do_shortcode( '[cminds_free_guide id="cmfaq"]' ); ?></td>
                        </tr>
                    </tbody></table>
            </div>


          <div data-role="tab" data-tab="plugin-shortcode" style="display: none;">
              <table class="form-table"><tbody>
                         <tr>

        <p>
        <strong>Shortcode:</strong> <code>[cm_faq]</code>
    </p>
 
    </tr>
                    </tbody></table>
            </div>

        <input type="hidden" name="cmfaq_action_update" value="1" />
        <input type="hidden" name="nonce" value="<?php echo wp_create_nonce('cmfaq_action_update'); ?>" />
        <?php submit_button(); ?>
        <small>* - required fields</small>
        <br />
        <br />
        <small>This plugin use icons from <a href="https://fortawesome.github.io/Font-Awesome/" target="_blank">Font Awesome</a>.</small>
    </form>
</div>
<script type="text/javascript">
    (function ($) {
        "use strict";
        $('.cmfaq .nav-tab').on('click', function () {
            $('.cmfaq .nav-tab').removeClass('nav-tab-active');
            $(this).addClass('nav-tab-active');
            $('.cmfaq *[data-role="tab"]').hide();
            $('.cmfaq *[data-role="tab"][data-tab="' + $(this).data('for') + '"]').show();
        });
        if ($('.cmfaq a[href="' + window.location.hash + '"]').click().length != 1) {
            $('.cmfaq a.nav-tab').first().click();
        }
        $('.cmfaq input[type="submit"]').on('click', function () {
            if ($('.cmfaq form').find(':invalid')) {
                var tab = $('.cmfaq form').find(':invalid').first().parents('*[data-role="tab"]').data('tab');
                $('.cmfaq').find('a[data-for="' + tab + '"]').click();
            }
        });
    })(jQuery);
</script>
<style type="text/css">
    .cmfaq input[type="color"]{
        width: auto;
        min-width: 50px;
    }
</style>