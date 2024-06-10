using DOTNET_Angular_DUC_SHOP2a.Models.Authen_Autho;
using System.ComponentModel.DataAnnotations;

namespace DOTNET_Angular_DUC_SHOP2a.Models
{
    public class Order
    {
        public int Id { get; set; }
        public ApplicationUser ApplicationUser { get; set; }
        public List<OrderItem> OrderItems { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        [Required]
        public string UserTel { get; set; }
        [Required]
        public string UserAddress { get; set; }
        public double totalCost { get; set; }
    }
}
