using Newtonsoft.Json;
using StockNews.DDD.Cache;
using StockNews.DDD.Utils;
using StockNews.Entity.Model;
using StockNews.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace StockNews.Web.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Index()
        {
            return View();
        }
        /// <summary>
        /// 登录
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public JsonResult LoginAuth(string UserName, string UserPwd, string UserCode) {
            try {
                if (UserCode.ToUpper() == Session["VerificationCode"].ToString().ToUpper()) {
                    var usermodel = new UserAccount() {
                        UserName = UserName,
                        UserPwd = UserPwd,
                        State = 1
                    };
                    var userdata = new UserAccountService().GetUserInfo(usermodel);
                    if (userdata != null) {
                       SessionCache.AddSession("UserInfo", JsonConvert.SerializeObject(userdata));
                       return Json(new {
                            IsSuccess = true,
                            Massage = "成功！",
                            ErrorCode = "0000"
                        });
                    }
                    else {
                        return Json(new {
                            IsSuccess = false,
                            Massage = "帐号或密码不存在！",
                            ErrorCode = "0001"
                        });
                    }
                }
                else {
                    return Json(new {
                        IsSuccess = false,
                        Massage = "验证码错误！",
                        ErrorCode = "0002"
                    });
                }
            }
            catch (Exception ex) {
                return Json(new {
                    IsSuccess = false,
                    Massage = ex.Message,
                    ErrorCode = "0003"
                });
            }
        }

        // GET: Login/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Login/Create
        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: Login/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        /// <summary>
        /// 获取验证码
        /// </summary>
        /// <returns></returns>
        public ActionResult Verification() {
            Session["VerificationCode"] = null;
            string randomStr = VerificationUtils.GetRandString(4, 6);
            VerificationUtils.GenerateVerification(randomStr);
            Session["VerificationCode"] = randomStr;
            return Content(randomStr);
        }

        [HttpPost]
        public JsonResult Exit() {
            try {
                SessionCache.AddSession("UserInfo", null);
                return Json(new {
                    IsSuccess = true,
                    Massage = "退出成功！",
                    ErrorCode = "0001"
                });
            }
            catch (Exception ex) {
                SessionCache.AddSession("UserInfo", null);
                return Json(new {
                    IsSuccess = false,
                    Massage = ex.Message,
                    ErrorCode = "0002"
                });
            }
        }

        /// <summary>
        /// 退出
        /// </summary>
        /// <returns></returns>
        public ActionResult Exits() {
            return View();
        }
    }
}
