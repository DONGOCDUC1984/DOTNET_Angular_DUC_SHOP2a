namespace DOTNET_Angular_DUC_SHOP2a.Repository.Implementation
{
    public class OrderRepository : IOrderRepository
    {
        private readonly AppDbContext _ctx;
        public OrderRepository(AppDbContext ctx)
        {
            _ctx = ctx;
        }
        public async Task<bool> Add(string UserId,
            string UserTel, string UserAddress, double totalCost)
        {
            using var transaction = _ctx.Database.BeginTransaction();
            try
            {
                var cart = await _ctx.Carts
                          .Include(x => x.CartItems)
                          .ThenInclude(x => x.Product)
                          .Where(x => x.ApplicationUser.Id == UserId)
                          .FirstOrDefaultAsync();
                if (cart == null)
                {
                    throw new Exception("Cart does not exist");
                }
                if (cart.CartItems.Count == 0)
                {
                    throw new Exception("Cart is empty");
                }
                var newOrder = new Order()
                {
                    ApplicationUser = await _ctx.ApplicationUsers
                                 .FindAsync(UserId),
                    UserTel = UserTel,
                    UserAddress = UserAddress,
                    totalCost = totalCost,
                };
                await _ctx.Orders.AddAsync(newOrder);
                await _ctx.SaveChangesAsync();

                foreach (var item in cart.CartItems)
                {
                    var newOrderItem = new OrderItem()
                    {
                        Order = newOrder,
                        Product = item.Product,
                        Quantity = item.Quantity,
                    };
                    await _ctx.OrderItems.AddAsync(newOrderItem);
                    await _ctx.SaveChangesAsync();
                }
                _ctx.CartItems.RemoveRange(cart.CartItems);
                await _ctx.SaveChangesAsync();
                _ctx.Carts.Remove(cart);
                await _ctx.SaveChangesAsync();

                transaction.Commit();
                return true;

            }
            catch (Exception)
            {
                return false; ;
            }
        }

        public async Task<bool> Delete(int id)
        {
            try
            {
                var data = await GetById(id);
                if (data == null)
                { return false; }

                _ctx.Orders.Remove(data);
                await _ctx.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<IEnumerable<Order>> GetAllOrders()
        {
            var data = await _ctx.Orders
                .Include(x => x.OrderItems)
                .ThenInclude(x => x.Product)
                .ToListAsync();
            return data;
        }

        public async Task<Order> GetById(int id)
        {
            return await _ctx.Orders.FindAsync(id);
        }

        public async Task<IEnumerable<Order>> GetOrdersByUserId(string UserId)
        {
            var data = await _ctx.Orders
                .Include(x => x.OrderItems)
                .ThenInclude(x => x.Product)
                .Where(x => x.ApplicationUser.Id == UserId)
                .ToListAsync();
            return data;
        }
    }
}
