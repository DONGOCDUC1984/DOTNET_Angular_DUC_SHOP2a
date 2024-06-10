namespace DOTNET_Angular_DUC_SHOP2a.Repository.Abstract
{
    public interface IOrderRepository
    {
        Task<IEnumerable<Order>> GetAllOrders();
        Task<IEnumerable<Order>> GetOrdersByUserId(string UserId);
        Task<Order> GetById(int id);
        Task<bool> Add(string UserId, string UserTel,
            string UserAddress, double totalCost);
        Task<bool> Delete(int id);
    }
}
