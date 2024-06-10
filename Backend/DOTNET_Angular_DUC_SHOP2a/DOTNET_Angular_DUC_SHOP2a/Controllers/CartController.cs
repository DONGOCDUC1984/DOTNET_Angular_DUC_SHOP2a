using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DOTNET_Angular_DUC_SHOP2a.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CartController : ControllerBase
    {
        private readonly ICartRepository _cartRepos;
        public CartController(ICartRepository cartRepos)
        {
            _cartRepos = cartRepos;
        }

        [HttpGet("{UserId}")]
        public async Task<IActionResult> GetCartByUserId(string UserId)
        {
            var cart = await _cartRepos.GetCartByUserId(UserId);
            var length = await _cartRepos.GetCartLen(UserId);
            var totalCost = await _cartRepos.GetTotalCost(UserId);
            return Ok(new { cart = cart, length = length, totalCost = totalCost });
        }

        [HttpGet("AddCartItem")]
        public async Task<IActionResult> AddCartItem(string UserId, int ProductId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            await _cartRepos.AddCartItem(UserId, ProductId);
            var cart = await _cartRepos.GetCartByUserId(UserId);
            var length = await _cartRepos.GetCartLen(UserId);
            var totalCost = await _cartRepos.GetTotalCost(UserId);
            return Ok(new { cart = cart, length = length, totalCost = totalCost });
        }
        [HttpGet("DecreaseCartItem")]
        public async Task<IActionResult> DecreaseCartItem(string UserId, int ProductId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            await _cartRepos.DecreaseCartItem(UserId, ProductId);
            var cart = await _cartRepos.GetCartByUserId(UserId);
            var length = await _cartRepos.GetCartLen(UserId);
            var totalCost = await _cartRepos.GetTotalCost(UserId);
            return Ok(new { cart = cart, length = length, totalCost = totalCost });
        }
        [HttpDelete("RemoveCartItem")]
        public async Task<IActionResult> RemoveCartItem(string UserId, int ProductId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            await _cartRepos.RemoveCartItem(UserId, ProductId);
            var cart = await _cartRepos.GetCartByUserId(UserId);
            var length = await _cartRepos.GetCartLen(UserId);
            var totalCost = await _cartRepos.GetTotalCost(UserId);
            return Ok(new { cart = cart, length = length, totalCost = totalCost });
        }
    }
}
