namespace DOTNET_Angular_DUC_SHOP2a.Repository.Implementation
{
    public class ProvinceCityRepository : IProvinceCityRepository
    {
        private readonly AppDbContext _ctx;
        public ProvinceCityRepository(AppDbContext ctx)
        {
            _ctx = ctx;
        }
        public async Task<bool> AddUpdate(ProvinceCity provinceCity)
        {
            try
            {   
                // Add
                if (provinceCity.Id == 0)
                    await _ctx.ProvinceCities.AddAsync(provinceCity);
                // Update
                else
                    _ctx.ProvinceCities.Update(provinceCity);
                await _ctx.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public async Task<bool> Delete(int id)
        {
            try
            {
                var data = await GetById(id);
                if (data == null)
                { return false; }

                _ctx.ProvinceCities.Remove(data);
                await _ctx.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<IEnumerable<ProvinceCity>> GetAll()
        {
            var data = await _ctx.ProvinceCities.ToListAsync();
            return data;
        }

        public async Task<ProvinceCity> GetById(int id)
        {
            return await _ctx.ProvinceCities.FindAsync(id);
        }
    }
}
