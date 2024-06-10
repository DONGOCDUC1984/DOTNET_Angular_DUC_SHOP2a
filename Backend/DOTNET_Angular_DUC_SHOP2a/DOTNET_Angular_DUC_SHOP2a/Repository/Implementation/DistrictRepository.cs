using DOTNET_Angular_DUC_SHOP2a.Models.DTO;

namespace DOTNET_Angular_DUC_SHOP2a.Repository.Implementation
{
    public class DistrictRepository : IDistrictRepository
    {
        private readonly AppDbContext _ctx;
        public DistrictRepository(AppDbContext ctx)
        {
            _ctx = ctx;
        }
        public async Task<bool> AddUpdate(DistrictAddUpdateDTO modelDTO)
        {
            try
            {
                var provinceCity=await _ctx.ProvinceCities.FindAsync(modelDTO.ProvinceCityId);
                // Add
                if (modelDTO.Id == 0)
                {
                    // Find a new Id .Without newId, there will be an error.
                    var listId = (from x in _ctx.Districts
                                  select x.Id).ToList();
                    int newId = listId.Max()+1;
                    // Create a new district
                    var district = new District()
                    {
                        Id= newId,
                        Name = modelDTO.Name,
                        ProvinceCity = provinceCity,
                    };
                    await _ctx.Districts.AddAsync(district);
                }
                // Update
                else
                {
                    var district = new District()
                    {
                        Id=modelDTO.Id,    
                        Name = modelDTO.Name,
                        ProvinceCity = provinceCity
                    };
                    _ctx.Districts.Update(district);
                }
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

                _ctx.Districts.Remove(data);
                await _ctx.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<IEnumerable<District>> GetAll()
        {
            var data = await _ctx.Districts
                .Include(x=>x.ProvinceCity)
                .ToListAsync();
            return data;
        }

        public async Task<District> GetById(int id)
        {
            return await _ctx.Districts.FindAsync(id);
        }
    }
}
