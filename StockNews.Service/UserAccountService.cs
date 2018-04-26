using StockNews.Entity.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace StockNews.Service {
    public class UserAccountService {
        /// <summary>
        /// 查询用户信息
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public UserAccount GetUserInfo(UserAccount model) {
            string sql = string.Empty;
            string wherestr = string.Empty;
            if (model.UserAccountId > 0) {
                wherestr += " AND UserAccountId = @0";
            }
            if (!string.IsNullOrWhiteSpace(model.UserName)) {
                wherestr += " AND UserName = @1";
            }
            if (!string.IsNullOrWhiteSpace(model.UserPwd)) {
                wherestr += " AND UserPwd = @2";
            }
            if (model.State > -1) {
                wherestr += " AND State = @3";
            }

            sql = string.Format(@"
 SELECT *
 FROM   dbo.[UserAccount]
 WHERE  1 = 1 {0}", wherestr);

            return StockNewsDB.GetInstance().SingleOrDefault<UserAccount>(sql,
                model.UserAccountId,
                model.UserName,
                model.UserPwd,
                model.State);
        }
    }
}
