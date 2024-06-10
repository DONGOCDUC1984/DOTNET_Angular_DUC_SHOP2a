using System.ComponentModel.DataAnnotations;

namespace DOTNET_Angular_DUC_SHOP2a.Models
{
    public class Category
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        
    }

}
