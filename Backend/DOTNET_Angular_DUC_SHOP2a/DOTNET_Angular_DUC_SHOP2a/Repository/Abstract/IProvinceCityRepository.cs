namespace DOTNET_Angular_DUC_SHOP2a.Repository.Abstract
{
    public interface IProvinceCityRepository
    {
        Task<bool> AddUpdate(ProvinceCity provinceCity);
        Task<bool> Delete(int id);
        Task<ProvinceCity> GetById(int id);
        Task<IEnumerable<ProvinceCity>> GetAll();
    }
}
