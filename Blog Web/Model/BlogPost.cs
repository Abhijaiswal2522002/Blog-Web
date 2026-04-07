namespace Blog_Web.Model
{
    public class BlogPost
    {
        public int Id { get; set; }

        public string Title { get; set; }
        public  string Content { get; set; }

        public int UserId { get; set; }
        public required User User { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public DateTime? UpdatedAt { get; set; }
    }
}