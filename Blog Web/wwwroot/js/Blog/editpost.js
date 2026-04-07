$(document).ready(function () {
    // Character counter for title
    $('#EditPostViewModel_Title').on('input', function () {
        var length = $(this).val().length;
        var maxLength = 200;
        $('#titleCounter').text(length + '/' + maxLength);

        if (length > maxLength * 0.9) {
            $('#titleCounter').removeClass('text-muted').addClass('text-warning');
        } else {
            $('#titleCounter').removeClass('text-warning').addClass('text-muted');
        }
    });

    // Character counter for content
    $('#EditPostViewModel_Content').on('input', function () {
        var length = $(this).val().length;
        var maxLength = 10000;
        $('#contentCounter').text(length + '/' + maxLength);

        if (length > maxLength * 0.9) {
            $('#contentCounter').removeClass('text-muted').addClass('text-warning');
        } else {
            $('#contentCounter').removeClass('text-warning').addClass('text-muted');
        }
    });

    // Initialize counters
    $('#EditPostViewModel_Title').trigger('input');
    $('#EditPostViewModel_Content').trigger('input');

    // Track changes for confirmation
    var originalTitle = $('#EditPostViewModel_Title').val();
    var originalContent = $('#EditPostViewModel_Content').val();
    var hasChanges = false;

    $('#EditPostViewModel_Title, #EditPostViewModel_Content').on('input', function () {
        var currentTitle = $('#EditPostViewModel_Title').val();
        var currentContent = $('#EditPostViewModel_Content').val();
        hasChanges = (currentTitle !== originalTitle) || (currentContent !== originalContent);
    });

    // Warn about unsaved changes
    $(window).on('beforeunload', function () {
        if (hasChanges) {
            return 'You have unsaved changes. Are you sure you want to leave?';
        }
    });

    // Confirm discard changes
    $('.btn-secondary').on('click', function (e) {
        if (hasChanges) {
            if (!confirm('You have unsaved changes. Are you sure you want to discard them?')) {
                e.preventDefault();
            }
        }
    });
});