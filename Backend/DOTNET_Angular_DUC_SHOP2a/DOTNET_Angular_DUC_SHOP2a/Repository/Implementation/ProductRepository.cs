
namespace DOTNET_Angular_DUC_SHOP2a.Repository.Implementation
{
    public class ProductRepository : IProductRepository
    {
        private readonly AppDbContext _ctx;
        public ProductRepository(AppDbContext ctx)
        {
            _ctx = ctx;
        }
        public async Task<bool> AddUpdate(ProductAddUpdateDTO modelDTO)
        {
            try
            {   
                var category = await _ctx.Categories.FindAsync(modelDTO.CategoryId);
                var district = await _ctx.Districts.FindAsync(modelDTO.DistrictId);
                // Add
                if (modelDTO.Id == 0)
                {
                    // Find a new Id .Without newId, there will be an error.
                    var listId = (from x in _ctx.Products
                                  select x.Id).ToList();
                    int newId = listId.Max() + 1;
                    // Create a new product
                    var product = new Product()
                    {
                        Id = newId,
                        Name = modelDTO.Name,
                        Description=modelDTO.Description,
                        Price=modelDTO.Price,
                        Category = category,
                        District=district,
                        ImageUrl=modelDTO.ImageUrl
                    };
                    await _ctx.Products.AddAsync(product);
                    
                }
                // Update
                else
                {
                    var product = new Product()
                    {
                        Id = modelDTO.Id,
                        Name = modelDTO.Name,
                        Description = modelDTO.Description,
                        Price = modelDTO.Price,
                        Category = category,
                        District = district,
                        ImageUrl = modelDTO.ImageUrl
                    };
                    _ctx.Products.Update(product);
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
                var record = await GetById(id);
                if (record == null)
                { return false; }

                _ctx.Products.Remove(record);
                await _ctx.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<IEnumerable<Product>> GetAll(string searchStr = "",
            int categoryId = 0, int provinceCityId = 0, int districtId = 0,
             double minPrice = 0.0, double maxPrice = 0.0)
        {
            searchStr = searchStr?.ToLower();
            var data = await (from product in _ctx.Products
                              where string.IsNullOrEmpty(searchStr)
                                      || product.Name.ToLower().Contains(searchStr)
                                      || product.Description.ToLower().Contains(searchStr)
                              select product)
                                     .Include(x => x.Category)
                                     .Include(x => x.District)
                                     .ThenInclude(x => x.ProvinceCity)
                                     .OrderBy(x => x.Id)
                                     .ToListAsync();
            if (categoryId > 0)
            {
                data = data.Where(x => x.Category.Id == categoryId).ToList();
            }
            if (provinceCityId > 0)
            {
                data = data.Where(x => x.District.ProvinceCity.Id == provinceCityId).ToList();
            }
            if (districtId > 0)
            {
                data = data.Where(x => x.District.Id == districtId).ToList();
            }
            if (minPrice != 0)
            {
                data = data.Where(x => x.Price >= minPrice).ToList();
            }
            if (maxPrice != 0)
            {
                data = data.Where(x => x.Price <= maxPrice).ToList();
            }
            return data;
        }

        public async Task<Product> GetById(int id)
        {
            var list = await GetAll("", 0, 0, 0, 0.0 , 0.0);
            var data = list.FirstOrDefault(x => x.Id == id);
            return data;
        }
        public async Task<Product> GetOnlyProductById(int id)
        {
            // In the following line, there shoud be AsNoTracking(),Otherwise,there will be an error
            //  when we utilize this method to delete the image of the old product in Controller
            var data = await _ctx.Products.AsNoTracking()
                      .FirstOrDefaultAsync(x => x.Id == id);
            return data;
        }
    }
}
