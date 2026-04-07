using Blog_Web.Data;
using Blog_Web.Model;
using Blog_Web.Model.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;

namespace Blog_Web.Pages.Account
{
    public class RegisterModel : PageModel
    {
        private readonly AppDbContext _context;

        public RegisterModel(AppDbContext context)
        {
            _context = context;
        }

        [BindProperty]
        public required RegisterViewModel RegisterViewModel { get; set; }

        public void OnGet()
        {
        }

        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            // Check if user already exists
            var existingUser = _context.Users.FirstOrDefault(u => u.Email == RegisterViewModel.Email || u.Username == RegisterViewModel.Username);
            if (existingUser != null)
            {
                ModelState.AddModelError("", "User with this email or username already exists.");
                return Page();
            }

            // Hash the password
            var passwordHash = BCrypt.Net.BCrypt.HashPassword(RegisterViewModel.Password);

            // Create new user
            var user = new User
            {
                Username = RegisterViewModel.Username,
                Email = RegisterViewModel.Email,
                PasswordHash = passwordHash
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Redirect to login page
            return RedirectToPage("/Account/Login");
        }

        public async Task<IActionResult> OnPostCheckUsernameAsync(string username)
        {
            if (string.IsNullOrEmpty(username))
            {
                return new JsonResult(new { available = false });
            }

            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
            return new JsonResult(new { available = existingUser == null });
        }

        public async Task<IActionResult> OnPostCheckEmailAsync(string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                return new JsonResult(new { available = false });
            }

            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            return new JsonResult(new { available = existingUser == null });
        }
    }
}
