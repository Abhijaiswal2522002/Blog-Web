using System.ComponentModel.DataAnnotations;

namespace Blog_Web.Model.ViewModels
{
    public class AddPostViewModel
    {
        [Required]
        [StringLength(200, MinimumLength = 1)]
        public required string Title { get; set; }

        [Required]
        [StringLength(10000, MinimumLength = 1)]
        public required string Content { get; set; }
    }
}
