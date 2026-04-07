$(document).ready(function () {
    // Auto-focus on email field
    $('#LoginViewModel_Email').focus();

    // Remember me checkbox handling
    var rememberMe = localStorage.getItem('rememberMe');
    if (rememberMe === 'true') {
        $('#rememberMe').prop('checked', true);
        var savedEmail = localStorage.getItem('savedEmail');
        if (savedEmail) {
            $('#LoginViewModel_Email').val(savedEmail);
            $('#LoginViewModel_Password').focus();
        }
    }

    $('#rememberMe').on('change', function () {
        var isChecked = $(this).is(':checked');
        localStorage.setItem('rememberMe', isChecked);

        if (isChecked) {
            var email = $('#LoginViewModel_Email').val();
            if (email) {
                localStorage.setItem('savedEmail', email);
            }
        } else {
            localStorage.removeItem('savedEmail');
        }
    });

    // Save email on input if remember me is checked
    $('#LoginViewModel_Email').on('input', function () {
        var email = $(this).val();
        if ($('#rememberMe').is(':checked') && email) {
            localStorage.setItem('savedEmail', email);
        }
    });

    // Form submission with loading state
    $('form').on('submit', function (e) {
        var submitBtn = $(this).find('button[type="submit"]');
        var originalText = submitBtn.text();

        submitBtn.prop('disabled', true).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Signing in...');

        // Re-enable button after 10 seconds in case of error
        setTimeout(function () {
            submitBtn.prop('disabled', false).text(originalText);
        }, 10000);
    });

    // Enter key handling
    $('#LoginViewModel_Password').on('keypress', function (e) {
        if (e.which === 13) { // Enter key
            $('form').submit();
        }
    });

    // Show/hide password toggle
    var passwordField = $('#LoginViewModel_Password');
    var toggleBtn = $('<button type="button" class="btn btn-outline-secondary btn-sm position-absolute" style="right: 10px; top: 50%; transform: translateY(-50%); z-index: 10;">Show</button>');
    passwordField.parent().css('position', 'relative').append(toggleBtn);

    toggleBtn.on('click', function () {
        var type = passwordField.attr('type') === 'password' ? 'text' : 'password';
        passwordField.attr('type', type);
        $(this).text(type === 'password' ? 'Show' : 'Hide');
    });
});