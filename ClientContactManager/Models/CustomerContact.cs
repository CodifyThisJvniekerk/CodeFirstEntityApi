namespace ClientContactManager.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("CustomerContact")]
    public class CustomerContact
    {
        List<Customer> CustomerList;
        public CustomerContact()
        {
            CustomerList = new List<Customer>();
        }
        public long ID { get; set; }

        [Required]
        [StringLength(255)]
        public string Name { get; set; }

        [StringLength(255)]
        public string Email { get; set; }

        [Required]
        [StringLength(20)]
        public string ContactNumber { get; set; }

        public long CustomerID { get; set; }
        public virtual Customer Customers { get; set; }
        
    }
}
