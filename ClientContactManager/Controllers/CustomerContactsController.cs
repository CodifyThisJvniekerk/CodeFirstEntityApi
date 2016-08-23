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
    public class CustomerContactsController : ApiController
    {
        private CustomerApp db = new CustomerApp();

        // GET: api/CustomerContacts
        [ResponseType(typeof(IQueryable<Customer>))]
        [ActionName("GetCustomerContacts")]
        [Route("api/CustomerContacts/GetCustomerContacts/{customerID}")]
        public IQueryable<CustomerContact> GetCustomerContacts(long customerID)
        {
            db.Configuration.ProxyCreationEnabled = false;
            return db.CustomerContacts.Where(x => x.CustomerID == customerID);
        }

        // GET: api/CustomerContacts/5
        [ResponseType(typeof(CustomerContact))]
        [Route("api/CustomerContacts/GetCustomerContact/{id}")]
        public IHttpActionResult GetCustomerContact(long id)
        {
            CustomerContact customerContact = db.CustomerContacts.Find(id);
            if (customerContact == null)
            {
                return NotFound();
            }

            return Ok(customerContact);
        }

        // PUT: api/CustomerContacts/5
        [System.Web.Http.HttpPut]
        [Route("api/CustomerContacts/UpdateCustomerContact/{id}/{name}/{email}/{contactnum}/{customerID}")]
        public IHttpActionResult UpdateCustomerContact(long id, string name, string email,string contactnum, long customerID)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            CustomerContact custcontact = new CustomerContact();
            custcontact.ID = id;
            custcontact.Name = name;
            custcontact.Email = email;
            custcontact.ContactNumber = contactnum;
            custcontact.CustomerID = customerID;
            db.Entry(custcontact).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerContactExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/CustomerContacts
        [System.Web.Http.HttpPut]
        [Route("api/CustomerContacts/AddCustomerContact/{name}/{email}/{contactnum}/{customerID}")]
        public string AddCustomerContact(string name, string email, string contactnum, long customerID)
        {
            if (!ModelState.IsValid)
            {
                return "failed";
            }
            CustomerContact custcontact = new CustomerContact();
            custcontact.Name = name;
            custcontact.Email = email;
            custcontact.ContactNumber = contactnum;
            custcontact.CustomerID = customerID;
            db.CustomerContacts.Add(custcontact);
            db.SaveChanges();

            return "successfull"; //CreatedAtRoute("DefaultApi", new { id = custcontact.ID }, custcontact);
        }

        // DELETE: api/CustomerContacts/5
        [ResponseType(typeof(CustomerContact))]
        public IHttpActionResult DeleteCustomerContact(long id)
        {
            CustomerContact customerContact = db.CustomerContacts.Find(id);
            if (customerContact == null)
            {
                return NotFound();
            }

            db.CustomerContacts.Remove(customerContact);
            db.SaveChanges();

            return Ok(customerContact);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CustomerContactExists(long id)
        {
            return db.CustomerContacts.Count(e => e.ID == id) > 0;
        }
    }
}