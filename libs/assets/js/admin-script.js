//console.log(metform_form_url.siteurl);
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

            $.get(window.metform_form_url.siteurl + 'forms/get/' + id, function (data) {
                MetForm_Template_Editor(data);
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
            MetForm_Template_Editor(data);
            modal.removeClass('loading');
        }

        modal.find('form').attr('data-mf-id', id);
    });

    $('.mf-template-modalinput-type').on('change', function () {
        var type = $(this).val();
        var inputs = $('.mf-template-form-option-container');

        if (type == 'section') {
            inputs.hide();
        } else {
            inputs.show();
        }
    });


    $('.mf-template-modalinput-condition_a').on('change', function () {
        var condition_a = $(this).val();
        var inputs = $('.mf-template-modalinput-condition_singular-container');

        if (condition_a == 'singular') {
            inputs.show();
        } else {
            inputs.hide();
        }
    });

    $('.mf-template-modalinput-condition_singular').on('change', function () {
        var condition_singular = $(this).val();
        var inputs = $('.mf-template-modalinput-condition_singular_id-container');

        if (condition_singular == 'selective') {
            inputs.show();
        } else {
            inputs.hide();
        }
    });


    $('.metform-template-save-btn-editor').on('click', function () {
        var form = $('#metform-template-modalinput-form');
        form.attr('data-open-editor', '1');
        form.trigger('submit');
    });

    $('#metform-template-modalinput-form').on('submit', function (e) {
        e.preventDefault();
        var modal = $('#metform-form-modal');
        modal.addClass('loading');

        var form_data = $(this).serialize();
        var id = $(this).attr('data-mf-id');
        var open_editor = $(this).attr('data-open-editor');
        var admin_url = $(this).attr('data-editor-url');

        console.log(form_data);

        $.get(window.metform_form_url.siteurl + 'forms/update/' + id, form_data, function (output) {
            console.log(output);
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

    // $('.mf-template-modalinput-condition_singular_id').select2({
    //     ajax: {
    //         url: window.metform_form_url.siteurl + 'ajaxselect2/singular_list',
    //         dataType: 'json',
    //         data: function (params) {
    //             var query = {
    //                 s: params.term,
    //             }
    //             return query;
    //         }
    //     },
    //     cache: true,
    //     placeholder: "--",
    //     dropdownParent: $('#metform-form-modal_body')
    //     //minimumInputLength: 2,
    // });

    function MetForm_Template_Editor(data) {
        console.log(data);
        // set the form data
        $('.mf-template-modalinput-title').val(data.title);
        $('.mf-template-modalinput-condition_a').val(data.condition_a);
        $('.mf-template-modalinput-condition_singular').val(data.condition_singular);
        $('.mf-template-modalinput-condition_singular_id').val(data.condition_singular_id);
        $('.mf-template-modalinput-type').val(data.type);

        var activation_input = $('.mf-template-modalinput-activition');
        if (data.activation == 'yes') {
            activation_input.attr('checked', true);
        } else {
            activation_input.removeAttr('checked');
        }

        $('.mf-template-modalinput-activition, .mf-template-modalinput-type, .mf-template-modalinput-condition_a, .mf-template-modalinput-condition_singular')
            .trigger('change');

        var el = $('.mf-template-modalinput-condition_singular_id');
//         $.ajax({
//             url: metform_form_url.siteurl + 'ajaxselect2/singular_list',
//             dataType: 'json',
//             data: {
//                 ids: String(data.condition_singular_id)
//             }
//         }).then(function (data) {
// console.log(data);
//             if (data !== null && data.results.length > 0) {
//                 el.html(' ');
//                 $.each(data.results, function (i, v) {
//                     var option = new Option(v.text, v.id, true, true);
//                     el.append(option).trigger('change');
//                 });
//                 el.trigger({
//                     type: 'select2:select',
//                     params: {
//                         data: data
//                     }
//                 });
//             }
//         });
    }






    function mf_url_replace_param(url, paramName, paramValue){
        if (paramValue == null) {
            paramValue = '';
        }
        var pattern = new RegExp('\\b('+paramName+'=).*?(&|#|$)');
        if (url.search(pattern)>=0) {
            return url.replace(pattern,'$1' + paramValue + '$2');
        }
        url = url.replace(/[?#]$/,'');
        return url + (url.indexOf('?')>0 ? '&' : '?') + paramName + '=' + paramValue;
    }

	// var tab_container = $('.wp-header-end');
	// var tabs = '';
	// var xs_types = {
	// 	'all': 'All',
	// 	'header': 'Header',
	// 	'footer': 'Footer',
	// 	'section': 'Section',
	// };
	// var url = new URL(window.location.href);
	// var s = url.searchParams.get("metform_type_filter");
	// s = (s == null) ? 'all' : s;

	// $.each(xs_types, function(k, v){
	// 	var url = mf_url_replace_param(window.location.href, 'metform_type_filter', k);
    //     var klass = (s == k) ? 'metform_type_filter_active nav-tab-active' : ' ';
    //     tabs += `
    //         <a href="${url}" class="${klass} metform_type_filter_tab_item nav-tab">${v}</a>
    //     `;
    //     tabs += "\n";
	// });
	// tab_container.after('<div class="metform_type_filter_tab_container nav-tab-wrapper">'+ tabs +'</div><br/>');
});