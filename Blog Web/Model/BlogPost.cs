namespace Blog_Web.Model
{
    public class BlogPost
    {
        public int Id { get; set; }

        public required string Title { get; set; }
        public required string Content { get; set; }

        public int UserId { get; set; }
        public User? User { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public DateTime? UpdatedAt { get; set; }
    }
}