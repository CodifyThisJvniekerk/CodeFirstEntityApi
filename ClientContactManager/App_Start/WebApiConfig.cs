using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace ClientContactManager
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
            config.Routes.MapHttpRoute(
                name: "getcustomersbyName",
                routeTemplate: "api/{controller}/{action}/{Name}",
                defaults: new { id = RouteParameter.Optional } 
                );
            config.Routes.MapHttpRoute(
                name: "GetCustomerByID",
                routeTemplate: "api/{controller}/{action}/{id}",
                defaults: new { id = RouteParameter.Optional }
                );
            config.Routes.MapHttpRoute(
                name: "GetAll",
                routeTemplate: "api/{controller}/{action}"
            );
        }
    }
}
