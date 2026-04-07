$(document).ready(function () {
    // Password strength indicator
    $('#RegisterViewModel_Password').on('input', function () {
        var password = $(this).val();
        var strength = 0;
        var feedback = [];

        if (password.length >= 6) strength++;
        else feedback.push("At least 6 characters");

        if (/[a-z]/.test(password)) strength++;
        else feedback.push("Lowercase letter");

        if (/[A-Z]/.test(password)) strength++;
        else feedback.push("Uppercase letter");

        if (/[0-9]/.test(password)) strength++;
        else feedback.push("Number");

        if (/[^A-Za-z0-9]/.test(password)) strength++;
        else feedback.push("Special character");

        var strengthText = '';
        var strengthClass = '';
        if (strength < 2) {
            strengthText = 'Weak';
            strengthClass = 'text-danger';
        } else if (strength < 4) {
            strengthText = 'Medium';
            strengthClass = 'text-warning';
        } else {
            strengthText = 'Strong';
            strengthClass = 'text-success';
        }

        $('#password-strength').removeClass('text-danger text-warning text-success').addClass(strengthClass).text(strengthText);
        $('#password-feedback').html(feedback.join('<br>'));
    });

    // Confirm password matching
    $('#RegisterViewModel_ConfirmPassword').on('input', function () {
        var password = $('#RegisterViewModel_Password').val();
        var confirmPassword = $(this).val();

        if (password === confirmPassword) {
            $('#confirm-password-match').removeClass('text-danger').addClass('text-success').text('Passwords match');
        } else {
            $('#confirm-password-match').removeClass('text-success').addClass('text-danger').text('Passwords do not match');
        }
    });

    // Username availability check
    var usernameTimeout;
    $('#RegisterViewModel_Username').on('input', function () {
        clearTimeout(usernameTimeout);
        var username = $(this).val();

        if (username.length >= 3) {
            usernameTimeout = setTimeout(function () {
                $.ajax({
                    url: '/Account/CheckUsername',
                    type: 'POST',
                    data: { username: username },
                    success: function (response) {
                        if (response.available) {
                            $('#username-availability').removeClass('text-danger').addClass('text-success').text('Username available');
                        } else {
                            $('#username-availability').removeClass('text-success').addClass('text-danger').text('Username taken');
                        }
                    },
                    error: function () {
                        $('#username-availability').removeClass('text-success text-danger').text('');
                    }
                });
            }, 500);
        } else {
            $('#username-availability').removeClass('text-success text-danger').text('');
        }
    });

    // Email availability check
    var emailTimeout;
    $('#RegisterViewModel_Email').on('input', function () {
        clearTimeout(emailTimeout);
        var email = $(this).val();

        if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            emailTimeout = setTimeout(function () {
                $.ajax({
                    url: '/Account/CheckEmail',
                    type: 'POST',
                    data: { email: email },
                    success: function (response) {
                        if (response.available) {
                            $('#email-availability').removeClass('text-danger').addClass('text-success').text('Email available');
                        } else {
                            $('#email-availability').removeClass('text-success').addClass('text-danger').text('Email already registered');
                        }
                    },
                    error: function () {
                        $('#email-availability').removeClass('text-success text-danger').text('');
                    }
                });
            }, 500);
        } else {
            $('#email-availability').removeClass('text-success text-danger').text('');
        }
    });

    // Form submission with loading state
    $('form').on('submit', function () {
        var submitBtn = $(this).find('button[type="submit"]');
        submitBtn.prop('disabled', true).text('Registering...');
    });
});