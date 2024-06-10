using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace DOTNET_Angular_DUC_SHOP2a.Models.DTO
{
    public class ProductAddUpdateDTO
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        public double Price { get; set; }
        public int CategoryId { get; set; }
        public int ProvinceCityId { get; set; }
        public int DistrictId { get; set; }
        public string ImageUrl { get; set; }
    }
}
