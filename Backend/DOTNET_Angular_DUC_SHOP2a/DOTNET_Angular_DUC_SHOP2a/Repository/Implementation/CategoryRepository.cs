namespace DOTNET_Angular_DUC_SHOP2a.Repository.Implementation
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly AppDbContext _ctx;
        public CategoryRepository(AppDbContext ctx)
        {
            this._ctx = ctx;
        }
        public bool AddUpdate(Category category)
        {
            try
            {   // Add
                if (category.Id == 0)
                    _ctx.Categories.Add(category);
                //Update
                else
                    _ctx.Categories.Update(category);
                _ctx.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public bool Delete(int id)
        {
            try
            {
                var record = GetById(id);
                if (record == null)
                    return false;
                _ctx.Categories.Remove(record);
                _ctx.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
               return false;
            }
        }

        public IEnumerable<Category> GetAll()
        {
            return _ctx.Categories.ToList();
        }

        public Category GetById(int id)
        {
            return _ctx.Categories.Find(id);
        }
    }
}
