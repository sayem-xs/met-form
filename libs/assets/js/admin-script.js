jQuery(document).ready(function ($) {
    "use strict"; 

    $('.row-actions .edit a, .page-title-action').on('click', function (e) {
        e.preventDefault();
        var id = 0;
        var modal = $('#metform_form_modal');
        var parent = $(this).parents('.column-title');

        modal.addClass('loading');
        modal.modal('show');
        if (parent.length > 0) {
            id = parent.find('.hidden').attr('id').split('_')[1];

            $.get(window.metform_api.resturl + 'metform/v1/forms/list/' + id, function (data) {
                //console.log('Response : '+data['limit_total_entries']);
                MetForm_Form_Editor(data);
                modal.removeClass('loading');
            });
        } else {
            var data = {
                title: '',
                type: 'header',
                condition_a: 'entire_site',
                condition_singular: 'all',
                activation: '',
            };
            MetForm_Form_Editor(data);
            modal.removeClass('loading');
        }

        modal.find('form').attr('data-mf-id', id);
    });

    $('.metform-form-general-save-btn-editor').on('click', function () {
        var form = $('#metform-form-modalinput-form');
        form.attr('data-open-editor', '1');
        form.trigger('submit');
    });

    $('#metform-form-modalinput-general').on('submit', function (e) {
        e.preventDefault();
        var modal = $('#metform-form-modal');
        modal.addClass('loading');

        var form_data = $(this).serialize();
        var id = $(this).attr('data-mf-id');
        var open_editor = $(this).attr('data-open-editor');
        var admin_url = $(this).attr('data-editor-url');

        $.post(window.metform_api.resturl + 'metform/v1/forms/update_general/' + id, form_data, function (output) {
            console.log("response : "+output);
            modal.removeClass('loading');

            // set list table data
            var row = $('#post-' + output.data.id);
            console.log(row.length);

            if(row.length > 0){
                row.find('.column-type')
                    .html(output.data.type_html);

                row.find('.column-condition')
                    .html(output.data.cond_text);

                row.find('.row-title')
                    .html(output.data.title)
                    .attr('aria-label', output.data.title);

                console.log(output.data.title);
            }

            if (open_editor == '1') {
                window.location.href = admin_url + '?post=' + output.data.id + '&action=elementor';
            }else if(id == '0'){
                location.reload();
            }
        });

    });

    $('.metform-form-save-btn-editor').on('click', function () {
        var form = $('#metform-form-modalinput-form');
        form.attr('data-open-editor', '1');
        form.trigger('submit');
    });

    $('#metform-form-modalinput-user-notification').on('submit', function (e) {
        e.preventDefault();
        var modal = $('#metform-form-modal');
        modal.addClass('loading');

        var form_data = $(this).serialize();
        console.log("user input data : "+form_data);
        var id = $(this).attr('data-mf-id');
        console.log("user input id : "+id);
        var open_editor = $(this).attr('data-open-editor');
        var admin_url = $(this).attr('data-editor-url');


        $.post(window.metform_api.resturl + 'metform/v1/forms/update_user_notification/' + id, form_data, function (output) {
            console.log("response : "+output.data.id);
            modal.removeClass('loading');

            // set list table data
            var row = $('#post-' + output.data.id);
            console.log(row.length);

            if(row.length > 0){
                row.find('.column-type')
                    .html(output.data.type_html);

                row.find('.column-condition')
                    .html(output.data.cond_text);

                row.find('.row-title')
                    .html(output.data.title)
                    .attr('aria-label', output.data.title);

                console.log(output.data.title);
            }

            if (open_editor == '1') {
                window.location.href = admin_url + '?post=' + output.data.id + '&action=elementor';
            }else if(id == '0'){
                location.reload();
            }

        });

    });

    $('#metform-form-modalinput-admin-notification').on('submit', function (e) {
        e.preventDefault();
        var modal = $('#metform-form-modal');
        modal.addClass('loading');

        var form_data = $(this).serialize();
        //var id = $(this).attr('data-mf-id');
        var id = 64;
        var open_editor = $(this).attr('data-open-editor');
        var admin_url = $(this).attr('data-editor-url');

        //console.log(form_data);

        $.post(window.metform_api.resturl + 'metform/v1/forms/update_admin_notification/' + id, form_data, function (output) {
            console.log(output);
            modal.removeClass('loading');

        });

    });


    function MetForm_Form_Editor(data) {
        console.log(data);
        
        $('.mf-form-modalinput-title').val(data.title);
        $('.mf-form-modalinput-success_message').val(data.success_message);
        $('.mf-form-modalinput-redirect_to').val(data.redirect_to);
        $('.mf-form-modalinput-limit_total_entries').val(data.limit_total_entries);
        $('.mf-form-modalinput-type').val(data.type);

        var capture_entries = $('.mf-form-modalinput-capture_entries');
        if (data.capture_entries == '1') {
            capture_entries.attr('checked', true);
        } else {
            capture_entries.removeAttr('checked');
        }
        var hide_form_after_submission = $('.mf-form-modalinput-hide_form_after_submission');
        if (data.hide_form_after_submission == '1') {
            hide_form_after_submission.attr('checked', true);
        } else {
            hide_form_after_submission.removeAttr('checked');
        }
        var require_login = $('.mf-form-modalinput-require_login');
        if (data.require_login == '1') {
            require_login.attr('checked', true);
        } else {
            require_login.removeAttr('checked');
        }
        var multiple_submission = $('.mf-form-modalinput-multiple_submission');
        if (data.multiple_submission == '1') {
            multiple_submission.attr('checked', true);
        } else {
            multiple_submission.removeAttr('checked');
        }
        var enable_recaptcha = $('.mf-form-modalinput-enable_recaptcha');
        if (data.enable_recaptcha == '1') {
            enable_recaptcha.attr('checked', true);
        } else {
            enable_recaptcha.removeAttr('checked');
        }
        var capture_user_browser_data = $('.mf-form-modalinput-capture_user_browser_data');
        if (data.capture_user_browser_data == '1') {
            capture_user_browser_data.attr('checked', true);
        } else {
            capture_user_browser_data.removeAttr('checked');
        }


        $('.mf-form-user-email-subject').val(data.user_notification_email_subject);
        $('.mf-form-user-email-from').val(data.user_notification_email_from);
        $('.mf-form-user-reply-to').val(data.user_notification_email_reply_to);
        $('.mf-form-user-email-body').val(data.user_notification_email_body);

        console.log("notification : "+data.enable_user_notification);

        var enable_user_notification = $('.mf-form-user-enable')
        if(data.enable_user_notification == '1'){
            enable_user_notification.attr('checked', true);
        }
        else{
            enable_user_notification.removeAttr('checked');
        }

        var user_submission_copy = $('.mf-form-user-submission-copy')
        if(data.user_notification_email_attach_submission_copy == '1'){
            user_submission_copy.attr('checked', true);
        }
        else{
            user_submission_copy.removeAttr('checked');
        }

        $('.mf-form-modalinput-activition, .mf-form-modalinput-type, .mf-form-modalinput-condition_a, .mf-form-modalinput-condition_singular')
            .trigger('change');

    }

});