(function ($) {
    "use strict";

    $(function () {

        $('#cmfaq_icon_remove_button').on('click', function (e) {
            e.preventDefault();
            $('#term_meta_cmfaq_icon').val('');
            $('#cmfaq_icon_div_change').hide();
            $('#cmfaq_icon_div_select').show();
            return false;
        });

        if ($('.select_cmfaq_icon').length > 0) {
            if (typeof wp !== 'undefined' && wp.media && wp.media.editor) {
                $('.wrap').on('click', '.select_cmfaq_icon', function (e) {
                    e.preventDefault();

                    var custom_uploader = wp.media({
                        title: 'Select Icon',
                        button: {
                            text: 'Select'
                        },
                        multiple: false
                    }).on('select', function () {
                        var attachment = custom_uploader.state().get('selection').first().toJSON();
                        $('#term_meta_cmfaq_icon').val(attachment.id);
                        if (attachment.width && attachment.height) {
                            $('#cmfaq_icon_image').attr('src', attachment.url);
                            $('#cmfaq_icon_div_change').show();
                            $('#cmfaq_icon_div_select').hide();
                        }
                    }).open();
                    return false;
                });
            }
        }

    });

})(jQuery);
