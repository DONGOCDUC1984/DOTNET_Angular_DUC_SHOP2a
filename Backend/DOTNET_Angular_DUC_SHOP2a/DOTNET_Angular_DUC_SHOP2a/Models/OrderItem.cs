namespace DOTNET_Angular_DUC_SHOP2a.Models
{
    public class OrderItem
    {
        public int Id { get; set; }
        public Order Order { get; set; }
        public Product Product { get; set; }
        public int Quantity { get; set; }

    }
}
