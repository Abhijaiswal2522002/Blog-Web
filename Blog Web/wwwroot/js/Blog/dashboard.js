$(document).ready(function () {
    // Search functionality
    $('#searchInput').on('input', function () {
        var searchTerm = $(this).val().toLowerCase();
        $('.card').each(function () {
            var title = $(this).find('.card-title').text().toLowerCase();
            var content = $(this).find('.card-text').first().text().toLowerCase();

            if (title.includes(searchTerm) || content.includes(searchTerm)) {
                $(this).closest('.col-md-6').show();
            } else {
                $(this).closest('.col-md-6').hide();
            }
        });
    });

    // Sort functionality
    $('#sortSelect').on('change', function () {
        var sortBy = $(this).val();
        var posts = $('.col-md-6').get();

        posts.sort(function (a, b) {
            var aDate, bDate;

            if (sortBy === 'newest') {
                aDate = new Date($(a).find('.card-text small').text().replace('Created: ', ''));
                bDate = new Date($(b).find('.card-text small').text().replace('Created: ', ''));
                return bDate - aDate;
            } else if (sortBy === 'oldest') {
                aDate = new Date($(a).find('.card-text small').text().replace('Created: ', ''));
                bDate = new Date($(b).find('.card-text small').text().replace('Created: ', ''));
                return aDate - bDate;
            } else if (sortBy === 'title') {
                var aTitle = $(a).find('.card-title').text().toLowerCase();
                var bTitle = $(b).find('.card-title').text().toLowerCase();
                return aTitle.localeCompare(bTitle);
            }

            return 0;
        });

        $('.row').html(posts);
    });

    // Add search and sort controls to the dashboard
    if ($('.card').length > 0) {
        var controls = `
            <div class="row mb-4">
                <div class="col-md-6">
                    <input type="text" id="searchInput" class="form-control" placeholder="Search posts...">
                </div>
                <div class="col-md-6">
                    <select id="sortSelect" class="form-control">
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="title">By Title</option>
                    </select>
                </div>
            </div>
        `;
        $('.row').first().before(controls);
    }

    // Confirm delete with post title
    $('form[asp-page-handler="Delete"]').on('submit', function (e) {
        var postTitle = $(this).closest('.card').find('.card-title').text();
        if (!confirm('Are you sure you want to delete "' + postTitle + '"?')) {
            e.preventDefault();
        }
    });

    // Add loading state to delete buttons
    $('form[asp-page-handler="Delete"]').on('submit', function () {
        var btn = $(this).find('button');
        btn.prop('disabled', true).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Deleting...');
    });
});