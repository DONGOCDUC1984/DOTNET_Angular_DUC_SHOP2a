using DOTNET_Angular_DUC_SHOP2a.Models.Authen_Autho;

namespace DOTNET_Angular_DUC_SHOP2a.Models
{
    public class Cart
    {
        public int Id { get; set; }
        public ApplicationUser ApplicationUser { get; set; }
        public List<CartItem> CartItems { get; set; }
    }
}
