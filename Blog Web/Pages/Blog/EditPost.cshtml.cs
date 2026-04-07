using Blog_Web.Data;
using Blog_Web.Model.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace Blog_Web.Pages.Blog
{
    [Authorize]
    public class EditPostModel : PageModel
    {
        private readonly AppDbContext _context;

        public EditPostModel(AppDbContext context)
        {
            _context = context;
        }

        [BindProperty]
        public required AddPostViewModel EditPostViewModel { get; set; }

        public async Task<IActionResult> OnGetAsync(int id)
        {
            var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (userIdClaim == null || !int.TryParse(userIdClaim, out var userId))
            {
                return RedirectToPage("/Account/Login");
            }

            var post = await _context.BlogPost.FirstOrDefaultAsync(p => p.Id == id && p.UserId == userId);
            if (post == null)
            {
                return NotFound();
            }

            EditPostViewModel = new AddPostViewModel
            {
                Title = post.Title,
                Content = post.Content
            };

            ViewData["PostId"] = id;
            return Page();
        }

        public async Task<IActionResult> OnPostAsync(int id)
        {
            if (!ModelState.IsValid)
            {
                ViewData["PostId"] = id;
                return Page();
            }

            var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (userIdClaim == null || !int.TryParse(userIdClaim, out var userId))
            {
                return RedirectToPage("/Account/Login");
            }

            var post = await _context.BlogPost.FirstOrDefaultAsync(p => p.Id == id && p.UserId == userId);
            if (post == null)
            {
                return NotFound();
            }

            post.Title = EditPostViewModel.Title;
            post.Content = EditPostViewModel.Content;
            post.UpdatedAt = DateTime.Now;

            _context.BlogPost.Update(post);
            await _context.SaveChangesAsync();

            return RedirectToPage("/Blog/Dashboard");
        }
    }
}
