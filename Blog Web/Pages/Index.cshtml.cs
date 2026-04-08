using Blog_Web.Data;
using Blog_Web.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace Blog_Web.Pages
{
    public class IndexModel : PageModel
    {
        private readonly AppDbContext _context;

        public IndexModel(AppDbContext context)
        {
            _context = context;
        }

        public IList<BlogPost> Posts { get; set; } = new List<BlogPost>();

        [BindProperty(SupportsGet = true)]
        public string? SearchTerm { get; set; }

        public async Task OnGetAsync()
        {
            var query = _context.BlogPost.Include(p => p.User).AsQueryable();

            if (!string.IsNullOrEmpty(SearchTerm))
            {
                query = query.Where(p => p.Title.Contains(SearchTerm) || p.Content.Contains(SearchTerm));
            }

            Posts = await query.OrderByDescending(p => p.CreatedAt).ToListAsync();
        }
    }
}
