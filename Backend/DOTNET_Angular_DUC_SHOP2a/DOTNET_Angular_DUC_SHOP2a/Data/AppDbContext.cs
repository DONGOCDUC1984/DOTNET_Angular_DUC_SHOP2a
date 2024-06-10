using DOTNET_Angular_DUC_SHOP2a.Models.Authen_Autho;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DOTNET_Angular_DUC_SHOP2a.Data
{
    public class AppDbContext : IdentityDbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProvinceCity> ProvinceCities { get; set; }
        public DbSet<District> Districts { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<CartItem> CartItems { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Category>().HasData(
                new Category { Id = 1, Name = "Fruit and vegetable" },
                new Category { Id = 2, Name = "Bread and cake" },
                new Category { Id = 3, Name = "Milk" }
            );
            
            modelBuilder.Entity<ProvinceCity>().HasData(
              new ProvinceCity { Id = 1, Name = "Ha Noi" },
              new ProvinceCity { Id = 2, Name = "Sai Gon" },
              new ProvinceCity { Id = 3, Name = "Hai Phong" }
            );

            

           
        }
    }
}
