using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection.Metadata;

namespace Productslist.Models
{
    public class DataContext : DbContext
    {
        public DataContext()
        { }
        public DbSet<Product> Products { get; set; } = null!;
        public DbSet<Order> Orders { get; set; } = null!;
        public DbSet<OrderedProduct> OrderedProducts { get; set; } = null!;
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Order>()
                .HasMany(e => e.OrderedProducts)
                .WithOne(e => e.Order)
                .HasForeignKey(e => e.OrderId)
                .HasPrincipalKey(e => e.Id);
        }
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
            Database.EnsureCreated();
        }
    }
    public class Product
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; } = 0;
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; } = 0;
        public string Comment { get; set; } = string.Empty;

    }
    public class Order
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; } = 0;
        public string Name { get; set; } = "Заказ";
        public int Count { get; set; } = 1;
        public DateTime OrderDate { get; set; } = DateTime.Now;
        public string Comment { get; set; } = "Заказ";
        public ICollection<OrderedProduct> OrderedProducts { get; set; } = new List<OrderedProduct>();
    }
    public class OrderedProduct
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; } = 0;
        public int OrderId { get; set; } = 0;
        public int ProductId { get; set; } = 0;
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; } = 0;
        public string Comment { get; set; } = string.Empty;
        public Order Order { get; set; } = null!;
    }
}
