using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DOTNET_Angular_DUC_SHOP2a.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DistrictController : ControllerBase
    {
        private readonly IDistrictRepository _districtRepos;
        public DistrictController(IDistrictRepository districtRepos)
        {
            _districtRepos = districtRepos;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var data = await _districtRepos.GetAll();
            return Ok(data);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var data = await _districtRepos.GetById(id);
            return Ok(data);
        }
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> AddUpdate(DistrictAddUpdateDTO modelDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var result = await _districtRepos.AddUpdate(modelDTO);
            if (result)
            {
                var data = await _districtRepos.GetAll();
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
            var result = await _districtRepos.Delete(id);
            if (result)
            {
                var data = await _districtRepos.GetAll();
                return Ok(data);
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
