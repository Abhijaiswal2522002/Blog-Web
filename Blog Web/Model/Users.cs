namespace Blog_Web.Model
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public required string  Email { get; set; }
        public required string PasswordHash { get; set; }

        public List<BlogPost> BlogPosts { get; set; }
    }
}
