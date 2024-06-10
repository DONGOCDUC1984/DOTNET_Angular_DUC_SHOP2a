using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DOTNET_Angular_DUC_SHOP2a.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProvinceCityController : ControllerBase
    {
        private readonly IProvinceCityRepository _provinceCityRepos;
        public ProvinceCityController(IProvinceCityRepository provinceCityRepos)
        {
            _provinceCityRepos = provinceCityRepos;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var data = await _provinceCityRepos.GetAll();
            return Ok(data);
        }
       
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var data = await _provinceCityRepos.GetById(id);
            return Ok(data);
        }
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> AddUpdate(ProvinceCity model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            
            var result = await _provinceCityRepos.AddUpdate(model);
            if (result)
            {
                var data = await _provinceCityRepos.GetAll();
                return Ok(data);
            }
            else
            {
                return BadRequest();
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _provinceCityRepos.Delete(id);
            if (result)
            {
                var data = await _provinceCityRepos.GetAll();
                return Ok(data);
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
