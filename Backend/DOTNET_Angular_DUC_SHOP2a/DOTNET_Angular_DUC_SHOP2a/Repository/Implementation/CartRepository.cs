
namespace DOTNET_Angular_DUC_SHOP2a.Repository.Implementation
{
    public class CartRepository: ICartRepository
    {
        private readonly AppDbContext _ctx;
        public CartRepository(AppDbContext ctx)
        {
            _ctx = ctx;
        }
        public async Task<Cart> GetCartByUserId(string UserId)
        {
            var cart = await _ctx.Carts
                .Include(x => x.CartItems)
                .ThenInclude(x => x.Product)
                .Where(x => x.ApplicationUser.Id == UserId)
                .FirstOrDefaultAsync();
            return cart;
        }
        public async Task<int> GetCartLen(string UserId)
        {
            var cart = await GetCartByUserId(UserId);
            if (cart == null)
            {
                return 0;
            }
            return cart.CartItems.Count;
        }
        public async Task<double> GetTotalCost(string UserId)
        {
            var cart = await GetCartByUserId(UserId);
            if (cart == null)
            {
                return 0;
            }
            double totalCost = 0.0;
            foreach (var item in cart?.CartItems)
            {
                totalCost += item.Product.Price * item.Quantity;
            }
            return totalCost;
        }
        public async Task<bool> AddCartItem(string UserId, int ProductId)
        {
            try
            {
                var cart = await GetCartByUserId(UserId);
                // If a cart is empty
                if (cart == null)
                {
                    cart = new Cart()
                    {
                        ApplicationUser = await _ctx.ApplicationUsers.FindAsync(UserId),
                    };
                    await _ctx.Carts.AddAsync(cart);
                    await _ctx.SaveChangesAsync();

                    var newCartItem1 = new CartItem()
                    {
                        Cart = await _ctx.Carts.FindAsync(cart.Id),
                        Product = await _ctx.Products.FindAsync(ProductId),
                        Quantity = 1,
                    };
                    await _ctx.CartItems.AddAsync(newCartItem1);
                    await _ctx.SaveChangesAsync();
                }
                // If a cart is not empty 
                else
                {
                    var cartItem = await _ctx.CartItems.Where(x => x.Cart.Id == cart.Id
                         && x.Product.Id == ProductId)
                        .FirstOrDefaultAsync();
                    // if a cartItem is not null
                    if (cartItem != null)
                    {
                        cartItem.Quantity += 1;
                    }
                    else
                    {
                        // if a cartItem is null
                        var newCartItem2 = new CartItem()
                        {
                            Cart = await _ctx.Carts.FindAsync(cart.Id),
                            Product = await _ctx.Products.FindAsync(ProductId),
                            Quantity = 1,
                        };
                        await _ctx.CartItems.AddAsync(newCartItem2);

                    }
                    await _ctx.SaveChangesAsync();
                }

                return true;
            }
            catch (Exception)
            {

                return false;
            }
        }

        public async Task<bool> DecreaseCartItem(string UserId, int ProductId)
        {
            try
            {
                var cart = await GetCartByUserId(UserId);
                // If a cart is empty
                if (cart == null)
                {
                    throw new Exception("Cart does not exist");
                }
                else
                {
                    // If a cart is not empty 
                    var cartItem = await _ctx.CartItems.Where(x => x.Cart.Id == cart.Id
                         && x.Product.Id == ProductId)
                        .FirstOrDefaultAsync();
                    // if a cartItem is not null
                    if (cartItem != null)
                    {
                        if (cartItem.Quantity > 1)
                        {
                            cartItem.Quantity -= 1;
                        }
                        else
                        {
                            _ctx.CartItems.Remove(cartItem);
                            await _ctx.SaveChangesAsync();
                        }
                    }
                    else
                    {
                        // if a cartItem is null
                        throw new Exception("CartItem does not exist");

                    }
                    await _ctx.SaveChangesAsync();
                }

                return true;
            }
            catch (Exception)
            {

                return false;
            }
        }
        public async Task<bool> RemoveCartItem(string UserId, int ProductId)
        {
            try
            {
                var cart = await GetCartByUserId(UserId);
                // If a cart is empty
                if (cart == null)
                {
                    throw new Exception("Cart does not exist");
                }
                else
                {
                    // If a cart is not empty 
                    var cartItem = await _ctx.CartItems.Where(x => x.Cart.Id == cart.Id
                         && x.Product.Id == ProductId)
                        .FirstOrDefaultAsync();
                    // if a cartItem is not null
                    if (cartItem != null)
                    {
                        _ctx.CartItems.Remove(cartItem);
                        await _ctx.SaveChangesAsync();
                    }
                    else
                    {
                        // if a cartItem is null
                        throw new Exception("CartItem does not exist");
                    }
                }

                return true;
            }
            catch (Exception)
            {

                return false;
            }
        }
    }
}
