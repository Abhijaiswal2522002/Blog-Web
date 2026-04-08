using Blog_Web.Data;
using Blog_Web.Model;
using Blog_Web.Model.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace Blog_Web.Pages.Blog
{
    [Authorize]
    public class DashboardModel : PageModel
    {
        private readonly AppDbContext _context;

        public DashboardModel(AppDbContext context)
        {
            _context = context;
        }

        [BindProperty(SupportsGet = true)]
        public string? SearchTerm { get; set; }

        public required DashboardViewModel DashboardViewModel { get; set; }

        public async Task<IActionResult> OnGetAsync()
        {
            var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (userIdClaim == null || !int.TryParse(userIdClaim, out var userId))
            {
                return RedirectToPage("/Account/Login");
            }

            var query = _context.BlogPost.Where(p => p.UserId == userId);

            if (!string.IsNullOrEmpty(SearchTerm))
            {
                query = query.Where(p => p.Title.Contains(SearchTerm) || p.Content.Contains(SearchTerm));
            }

            var posts = await query.OrderByDescending(p => p.CreatedAt).ToListAsync();

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if (user == null)
            {
                return RedirectToPage("/Account/Login");
            }

            DashboardViewModel = new DashboardViewModel
            {
                Username = user.Username,
                Posts = posts
            };

            return Page();
        }

        public async Task<IActionResult> OnPostDeleteAsync(int id)
        {
            var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (userIdClaim == null || !int.TryParse(userIdClaim, out var userId))
            {
                return RedirectToPage("/Account/Login");
            }

            var post = await _context.BlogPost.FirstOrDefaultAsync(p => p.Id == id && p.UserId == userId);
            if (post != null)
            {
                _context.BlogPost.Remove(post);
                await _context.SaveChangesAsync();
            }

            return RedirectToPage();
        }
    }
}
