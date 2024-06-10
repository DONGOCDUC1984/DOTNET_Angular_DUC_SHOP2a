using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DOTNET_Angular_DUC_SHOP2a.Models
{
    public class District
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public ProvinceCity ProvinceCity { get; set; }

       
    }
}
