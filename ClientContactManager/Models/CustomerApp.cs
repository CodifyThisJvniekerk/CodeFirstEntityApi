namespace ClientContactManager.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class CustomerApp : DbContext
    {
        public CustomerApp()
            : base("name=CustomerApp")
        {
        }

        public virtual DbSet<Customer> Customers { get; set; }
        public virtual DbSet<CustomerContact> CustomerContacts { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Customer>()
                .Property(e => e.Latitude)
                .HasPrecision(18, 0);

            modelBuilder.Entity<Customer>()
                .Property(e => e.Longitude)
                .HasPrecision(18, 0);
        }
    }
}
