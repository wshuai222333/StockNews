using Newtonsoft.Json;
using StockNews.DDD.Cache;
using StockNews.Entity.Model;
using StockNews.Service;
using StockNews.Web.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace StockNews.Web.Controllers {
    [IsLoginAuthentication]
    public class NewArticleController : Controller {
        // GET: NewArticle
        public ActionResult Index() {
            return View();
        }
        public ActionResult Add(int Id) {
            ViewBag.Id = Id;
            return View();
        }
        /// <summary>
        /// 获取新闻信息
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        public JsonResult NewArticleInfo(int Id) {
            try {
                var data = new NewArticleService().GetNewArticleInfo(Id);
                return Json(new {
                    IsSuccess = true,
                    Data = data,
                    Massage = "成功",
                    ErrorCode = "0000"
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex) {
                return Json(new {
                    IsSuccess = false,
                    Data = "",
                    Massage = ex.Message,
                    ErrorCode = "9999"
                }, JsonRequestBehavior.AllowGet);
            }
        }
        /// <summary>
        /// 添加新闻
        /// </summary>
        /// <returns></returns>
        public ActionResult AddNewArticle(string Title, DateTime ReleaseTime, string Body,int NewArticleId) {
            try {
                var userinfo = JsonConvert.DeserializeObject<UserAccount>((String)SessionCache.GetSession("UserInfo"));
                var newArticle = new NewArticle() {
                    Body = Server.UrlDecode(Body),
                    Title = Title,
                    CreateTime = DateTime.Now,
                    ReleaseTime = ReleaseTime,
                    CreateName = userinfo.UserName,
                    UpdateTime = DateTime.Now,
                     NewArticleId = NewArticleId
                };
                object data;
                if (NewArticleId > 0) {
                    
                    data = new NewArticleService().Edit(newArticle);
                }
                else {
                    data = new NewArticleService().InsertNewArticle(newArticle);
                }
               

                return Json(new {
                    IsSuccess = true,
                    Data = data,
                    Massage = "成功",
                    ErrorCode = "0000"
                });
            }
            catch(Exception ex) {
                return Json(new {
                    IsSuccess = false,
                    Data = "",
                    Massage = ex.Message,
                    ErrorCode = "9999"
                });
            }
        }
        /// <summary>
        /// 新闻列表
        /// </summary>
        /// <param name="pageindex"></param>
        /// <param name="pagesize"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult GetNewArticleList(DateTime? BeginTime, DateTime? EndTime,  int pageindex, int pagesize) {
            try {
                var data = new NewArticleService().GetNewArticleListByPage(pageindex,pagesize, BeginTime, EndTime);
                return Json(new {
                    IsSuccess = true,
                    Data = data,
                    Massage = "成功",
                    ErrorCode = "0000"
                });

            }
            catch (Exception ex) {
                return Json(new {
                    IsSuccess = false,
                    Data = "",
                    Massage = ex.Message,
                    ErrorCode = "9999"
                });
            }
        }
        /// <summary>
        /// 删除新闻
        /// </summary>
        /// <param name="NewArticleId"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult DeleteNewArticl(int NewArticleId) {
            try {
                var data = new NewArticleService().Delete(NewArticleId);
                return Json(new {
                    IsSuccess = true,
                    Data = data,
                    Massage = "成功",
                    ErrorCode = "0000"
                });
            }
            catch (Exception ex) {
                return Json(new {
                    IsSuccess = false,
                    Data = "",
                    Massage = ex.Message,
                    ErrorCode = "9999"
                });
            }
        }

    }
}