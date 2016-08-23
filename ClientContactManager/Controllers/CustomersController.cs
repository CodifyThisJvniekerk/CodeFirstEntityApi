using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using ClientContactManager.Models;

namespace ClientContactManager.Controllers
{
    public class CustomersController : ApiController
    {
        private CustomerApp db = new CustomerApp();

        // GET: api/Customers
        [ResponseType(typeof(IQueryable<Customer>))]
        [ActionName("GetCustomers")]
        [Route("api/customers/GetCustomers")]
        public IQueryable<Customer> GetCustomers()
        {
            db.Configuration.ProxyCreationEnabled = false;
            return db.Customers;
        }
        // GET: api/Customers/SearchForCustomerByName?Name=value6
        [HttpGet]
        [ResponseType(typeof(IQueryable<Customer>))]
        [Route("SearchForCustomerByName/{name}")]
        public IQueryable<Customer> SearchForCustomerByName(string Name)
        {
            return db.Customers.Where(x => x.Name.Contains(Name));
        }
        // GET: api/Customers/GetCustomerByID?ID=value
        [ResponseType(typeof(Customer))]
        [Route("api/customers/GetCustomerByID/{id}")]
        public IHttpActionResult GetCustomerByID(long id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            Customer customer = db.Customers.Find(id);
            if (customer == null)
            {
                return NotFound();
            }

            return Ok(customer);
        }

        // PUT: api/Customers/5
        [System.Web.Http.HttpPut]
        [Route("UpdateCustomer/{id}/{name}/{latitude}/{Longitude}")]
        public string UpdateCustomer(long id, string name, decimal latitude, decimal Longitude)
        {
            if (!ModelState.IsValid)
            {
                return "failed";
            }
            Customer customer = new Customer();
            customer.Name = name;
            customer.Latitude = latitude;
            customer.Longitude = Longitude;
            customer.ID = id;
            
            db.Entry(customer).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExistsByID(id))
                {
                    return "failed";
                }
                else
                {
                    throw;
                }
            }

            return "success";
        }

        // POST: api/Customers
        [System.Web.Http.HttpPut]
        [Route("AddCustomer/{name}/{latitude}/{Longitude}")]
        public string AddCustomer(string name, decimal latitude, decimal Longitude)
        {
            if (!ModelState.IsValid)
            {
                //return BadRequest(ModelState);
            }
            Customer customer = new Customer();
            customer.Name = name;
            customer.Latitude = latitude;
            customer.Longitude = Longitude;
            db.Customers.Add(customer);
            db.SaveChanges();
            return "success";

        }

        // DELETE: api/Customers/5
        [ResponseType(typeof(Customer))]
        public IHttpActionResult DeleteCustomer(long id)
        {
            Customer customer = db.Customers.Find(id);
            if (customer == null)
            {
                return NotFound();
            }

            db.Customers.Remove(customer);
            db.SaveChanges();

            return Ok(customer);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CustomerExistsByID(long id)
        {
            return db.Customers.Count(e => e.ID == id) > 0;
        }

        [ResponseType(typeof(Boolean))]
        [ActionName("CustomerExistsByName")]
        private bool CustomerExistsByName(string Name)
        {
            return db.Customers.Count(e => e.Name == Name) > 0;
        }
    }
}