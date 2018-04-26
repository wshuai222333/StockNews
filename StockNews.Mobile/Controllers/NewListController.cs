using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace StockNews.Mobile.Controllers
{
    public class NewListController : Controller
    {
        // GET: NewList
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult List() {
            return View();
        }
        public ActionResult Detail() {
            return View();
        }
    }
}