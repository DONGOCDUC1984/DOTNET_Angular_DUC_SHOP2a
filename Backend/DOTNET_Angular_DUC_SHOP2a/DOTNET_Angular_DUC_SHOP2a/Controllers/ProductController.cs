using DOTNET_Angular_DUC_SHOP2a.Models.Authen_Autho;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace DOTNET_Angular_DUC_SHOP2a.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _productRepos;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public ProductController(IProductRepository productRepos,
            IWebHostEnvironment webHostEnvironment)
        {
            _productRepos = productRepos;
            _webHostEnvironment = webHostEnvironment;
        }

        [HttpGet]
        // In the following line, there should be "string? searchStr" not "string searchStr".
        // Otherwise, there will be an error.
        public async Task<IActionResult> GetAll(string? searchStr = "",
            int categoryId = 0,
            int provinceCityId = 0, int districtId = 0,
            double minPrice = 0.0, double maxPrice = 0.0)
        {
            var data = await _productRepos.GetAll(searchStr, categoryId,
                provinceCityId, districtId, minPrice, maxPrice);
            return Ok(data);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var data = await _productRepos.GetById(id);
            return Ok(data);
        }
        [Authorize(Roles = UserRoles.Admin)]
        [HttpPost]
        public async Task<IActionResult> AddUpdate(ProductAddUpdateDTO modelDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            // Update
            if (modelDTO.Id > 0)
            {
                var product = await _productRepos.GetOnlyProductById(modelDTO.Id);
                // delete the old image
                string RootPath = _webHostEnvironment.ContentRootPath;
                string oldImagePath =
                    Path.Combine(RootPath, product.ImageUrl.TrimStart('\\'));

                if (System.IO.File.Exists(oldImagePath))
                {
                    System.IO.File.Delete(oldImagePath);
                }
            }
            var result = await _productRepos.AddUpdate(modelDTO);
            if (result)
            {
                var data = await _productRepos.GetAll("", 0, 0, 0, 0.0, 0.0);
                return Ok(data);
            }
            else
            {
                return BadRequest();
            }
        }


        [HttpDelete("{id}")]
        [Authorize(Roles = UserRoles.Admin)]
        public async Task<IActionResult> Delete(int id)
        {
            var product = await _productRepos.GetById(id);
            // The old image should be deleted before the product.Otherwise,product will be null,
            // product.ImageUrl will be null and the old image will not be deleted .

            // delete the old image
            string RootPath = _webHostEnvironment.ContentRootPath;
            string oldImagePath =
                Path.Combine(RootPath, product.ImageUrl.TrimStart('\\'));

            if (System.IO.File.Exists(oldImagePath))
            {
                System.IO.File.Delete(oldImagePath);
            }
            // Delete Product
            var result = await _productRepos.Delete(id);
            if (result)
            {
                var data = await _productRepos.GetAll("", 0, 0, 0, 0.0, 0.0);
                return Ok(data);
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
