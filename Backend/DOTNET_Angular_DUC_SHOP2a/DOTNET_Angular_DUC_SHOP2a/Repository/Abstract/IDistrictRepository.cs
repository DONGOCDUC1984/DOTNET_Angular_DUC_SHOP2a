using DOTNET_Angular_DUC_SHOP2a.Models.DTO;

namespace DOTNET_Angular_DUC_SHOP2a.Repository.Abstract
{
    public interface IDistrictRepository
    {
        Task<bool> AddUpdate(DistrictAddUpdateDTO modelDTO);
        Task<bool> Delete(int id);
        Task<District> GetById(int id);
        Task<IEnumerable<District>> GetAll();
    }
}
