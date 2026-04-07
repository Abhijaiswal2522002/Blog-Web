using Blog_Web.Model;
using Microsoft.EntityFrameworkCore;

namespace Blog_Web.Data
{
    public class AppDbContext : DbContext
    {

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }


        public DbSet<BlogPost> BlogPost { get; set; }

        public DbSet<User> Users { get; set; }

    }
}
