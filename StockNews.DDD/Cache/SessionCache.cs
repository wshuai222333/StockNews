using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

namespace StockNews.DDD.Cache {
    /// <summary>
    /// session帮助类
    /// </summary>
    public class SessionCache {
        /// <summary>
        /// 获取session
        /// </summary>
        /// <param name="sessionName"></param>
        /// <returns></returns>
        public static object GetSession(string sessionName) {
            return HttpContext.Current.Session[sessionName];
        }

        /// <summary>
        /// 移除session
        /// </summary>
        /// <param name="sessionName"></param>
        public static void RemoveSession(string sessionName) {
            HttpContext.Current.Session.Remove(sessionName);
        }

        /// <summary>
        /// 添加session
        /// </summary>
        /// <param name="sessionName"></param>
        /// <param name="val"></param>
        public static void AddSession(string sessionName, string val) {
            if (!string.IsNullOrWhiteSpace(val) && GetSession(sessionName) != null) {
                //移除
                RemoveSession(sessionName);

                //添加
                HttpContext.Current.Session.Add(sessionName, val);
            }
            else {
                HttpContext.Current.Session.Add(sessionName, val);
            }
        }

        /// <summary>
        /// 删除所有session
        /// </summary>
        public static void RemoveAllSession() {
            HttpContext.Current.Session.RemoveAll();
        }


    }
}
