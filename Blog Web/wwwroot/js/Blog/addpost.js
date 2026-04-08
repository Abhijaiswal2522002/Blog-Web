$(document).ready(function () {
    // Auto-save draft functionality
    var autoSaveTimer;
    var hasUnsavedChanges = false;

    function autoSave() {
        var title = $('#AddPostViewModel_Title').val();
        var content = $('#AddPostViewModel_Content').val();

        if (title || content) {
            localStorage.setItem('blogDraft_title', title);
            localStorage.setItem('blogDraft_content', content);
            localStorage.setItem('blogDraft_time', new Date().toISOString());

            $('#autoSaveIndicator').text('Draft saved').fadeIn().delay(2000).fadeOut();
            hasUnsavedChanges = false;
        }
    }

    // Load draft on page load
    var savedTitle = localStorage.getItem('blogDraft_title');
    var savedContent = localStorage.getItem('blogDraft_content');
    var savedTime = localStorage.getItem('blogDraft_time');

    if (savedTitle || savedContent) {
        if (confirm('You have an unsaved draft from ' + new Date(savedTime).toLocaleString() + '. Would you like to load it?')) {
            $('#AddPostViewModel_Title').val(savedTitle);
            $('#AddPostViewModel_Content').val(savedContent);
        } else {
            // Clear the draft
            localStorage.removeItem('blogDraft_title');
            localStorage.removeItem('blogDraft_content');
            localStorage.removeItem('blogDraft_time');
        }
    }

    // Auto-save on input
    $('#AddPostViewModel_Title, #AddPostViewModel_Content').on('input', function () {
        hasUnsavedChanges = true;
        clearTimeout(autoSaveTimer);
        autoSaveTimer = setTimeout(autoSave, 2000);
    });

    // Character counter for title
    $('#AddPostViewModel_Title').on('input', function () {
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
    $('#AddPostViewModel_Content').on('input', function () {
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
    $('#AddPostViewModel_Title').trigger('input');
    $('#AddPostViewModel_Content').trigger('input');

    // Add auto-save indicator
    $('form').prepend('<div id="autoSaveIndicator" class="alert alert-info" style="display: none; position: fixed; top: 20px; right: 20px; z-index: 1000;"></div>');

    // Clear draft on successful submit
    $('form').on('submit', function () {
        hasUnsavedChanges = false;
        localStorage.removeItem('blogDraft_title');
        localStorage.removeItem('blogDraft_content');
        localStorage.removeItem('blogDraft_time');
    });

    // Warn about unsaved changes
    $(window).on('beforeunload', function () {
        if (hasUnsavedChanges) {
            return 'You have unsaved changes. Are you sure you want to leave?';
        }
    });
});