using StockNews.DDD.Cache;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace StockNews.Web.Filters {
    public class IsLoginAuthenticationAttribute:ActionFilterAttribute {
        public override void OnActionExecuting(ActionExecutingContext filterContext) {
            base.OnActionExecuting(filterContext);
            if (SessionCache.GetSession("UserInfo") == null) {
                filterContext.Result = new RedirectResult("/Login/Exits");
            }
        }
    }
}