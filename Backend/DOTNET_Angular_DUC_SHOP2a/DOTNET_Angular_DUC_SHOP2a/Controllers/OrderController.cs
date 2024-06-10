using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DOTNET_Angular_DUC_SHOP2a.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderRepository _orderRepos;
        public OrderController(IOrderRepository orderRepos)
        {
            _orderRepos = orderRepos;
        }
        [Authorize]
        [HttpGet("Add")]
        public async Task<IActionResult> Add(string UserId,
            string UserTel, string UserAddress, double totalCost)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var result = await _orderRepos.Add(UserId, UserTel,UserAddress, totalCost);
            if (result)
            {
                var data = await GetAll();
                return Ok(data);
            }
            else
            {
                return BadRequest();
            }
        }
        // [Authorize(Roles = "Admin")]
        // The following line is equivalent to the above line
        [Authorize(Roles = UserRoles.Admin)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var result = await _orderRepos.Delete(id);
            if (result)
            {
                var data = await GetAll();
                return Ok(data);
            }
            else
            {
                return BadRequest();
            }
        }
        
        [Authorize(Roles = "Admin")]
        [HttpGet("GetAllOrders")]
        public async Task<IActionResult> GetAll()
        {
            var data = await _orderRepos.GetAllOrders();
            return Ok(data);
        }
        [HttpGet("{UserId}")]
        [Authorize]
        public async Task<IActionResult> GetOrdersByUserId(string UserId)
        {
            var data = await _orderRepos.GetOrdersByUserId(UserId);
            return Ok(data);
        }
    }
}
