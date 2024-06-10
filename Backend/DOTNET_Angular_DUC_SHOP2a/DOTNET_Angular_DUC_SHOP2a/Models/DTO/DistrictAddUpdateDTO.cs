using System.ComponentModel.DataAnnotations;

namespace DOTNET_Angular_DUC_SHOP2a.Models.DTO
{
    public class DistrictAddUpdateDTO
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public int ProvinceCityId { get; set; }
    }
}
