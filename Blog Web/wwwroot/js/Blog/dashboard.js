$(document).ready(function () {
    // Handle Delete Modal Population
    $('.delete-post-btn').on('click', function () {
        var postId = $(this).data('post-id');
        var postTitle = $(this).data('post-title');

        $('#deletePostId').val(postId);
        $('#deletePostTitle').text(postTitle);
    });

    // Add loading state to delete button in modal
    $('#deletePostForm').on('submit', function () {
        var btn = $(this).find('button[type="submit"]');
        btn.prop('disabled', true).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Deleting...');
    });
});