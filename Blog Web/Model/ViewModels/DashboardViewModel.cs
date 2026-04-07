namespace Blog_Web.Model.ViewModels
{
    public class DashboardViewModel
    {
        public required string Username { get; set; }
        public required List<BlogPost> Posts { get; set; }
    }
}
