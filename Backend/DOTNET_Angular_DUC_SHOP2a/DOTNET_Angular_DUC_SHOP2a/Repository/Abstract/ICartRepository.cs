namespace DOTNET_Angular_DUC_SHOP2a.Repository.Abstract
{
    public interface ICartRepository
    {
        Task<Cart> GetCartByUserId(string UserId);
        Task<int> GetCartLen(string UserId);
        Task<double> GetTotalCost(string UserId);
        Task<bool> AddCartItem(string UserId, int ProductId);
        Task<bool> RemoveCartItem(string UserId, int ProductId);
        Task<bool> DecreaseCartItem(string UserId, int ProductId);
    }
}
