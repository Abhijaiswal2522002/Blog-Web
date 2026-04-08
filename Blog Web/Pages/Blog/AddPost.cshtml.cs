using Blog_Web.Data;
using Blog_Web.Model;
using Blog_Web.Model.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Blog_Web.Pages.Blog
{
    [Authorize]
    public class AddPostModel : PageModel
    {
        private readonly AppDbContext _context;

        public AddPostModel(AppDbContext context)
        {
            _context = context;
        }

        [BindProperty]
        public required AddPostViewModel AddPostViewModel { get; set; }

        public void OnGet()
        {
        }

        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (userIdClaim == null || !int.TryParse(userIdClaim, out var userId))
            {
                return RedirectToPage("/Account/Login");
            }

            var post = new BlogPost
            {
                Title = AddPostViewModel.Title,
                Content = AddPostViewModel.Content,
                UserId = userId,
                CreatedAt = DateTime.Now
            };

            _context.BlogPost.Add(post);
            await _context.SaveChangesAsync();

            TempData["SuccessMessage"] = "Your post has been created successfully!";

            return RedirectToPage("/Blog/Dashboard");
        }
    }
}
