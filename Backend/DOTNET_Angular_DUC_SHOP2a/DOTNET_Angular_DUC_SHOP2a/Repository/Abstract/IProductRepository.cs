using DOTNET_Angular_DUC_SHOP2a.Models;

namespace DOTNET_Angular_DUC_SHOP2a.Repository.Abstract
{
    public interface IProductRepository
    {
        Task<bool> AddUpdate(ProductAddUpdateDTO modelDTO);
        Task<bool> Delete(int id);
        Task<Product> GetById(int id);
        Task<Product> GetOnlyProductById(int id);
        Task<IEnumerable<Product>> GetAll(string searchStr = "",
            int categoryId = 0, int provinceCityId = 0, int districtId = 0,
            double minPrice = 0.0, double maxPrice = 0.0
            );
    }
}
