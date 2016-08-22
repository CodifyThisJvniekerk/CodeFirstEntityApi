namespace ClientContactManager.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Customer")]
    public class Customer
    {
        List<CustomerContact> CustomerList;
        public Customer()
        {
            CustomerList = new List<CustomerContact>();
        }
        public long ID { get; set; }

        [Required]
        [StringLength(255)]
        public string Name { get; set; }

        public decimal? Latitude { get; set; }

        public decimal? Longitude { get; set; }
        //public virtual CustomerContact CustomerContact { get; set; }

         public virtual ICollection<ClientContactManager.Models.CustomerContact> CustomerContacts { get; set; }
    }
}
