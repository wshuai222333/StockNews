using PetaPoco;
using StockNews.Entity.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace StockNews.Service {
    /// <summary>
    /// 新闻文章仓储
    /// </summary>
    public class NewArticleService {
        /// <summary>
        /// 获取新闻文章
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        public NewArticle GetNewArticleInfo(int Id) {
            string sql = string.Format(@"
                 SELECT * FROM dbo.NewArticle WHERE NewArticleId = @0
            ");

            return StockNewsDB.GetInstance().SingleOrDefault<NewArticle>(sql,
                Id);
        }
        /// <summary>
        /// 查询新闻文章
        /// </summary>
        /// <returns></returns>
        public List<NewArticle> GetNewArticleList() {
            string sql = string.Empty;
            sql = string.Format(@"
SELECT  *
FROM    dbo.NewArticle
WHERE 1=1
ORDER BY ReleaseTime DESC");

            return StockNewsDB.GetInstance()
                            .Query<NewArticle>(sql)
                            .ToList();
        }
        /// <summary>
        /// 查询新闻文章(分页)
        /// </summary>
        /// <returns></returns>
        public Page<NewArticle> GetNewArticleListByPage(int pageindex, int pagesize, DateTime? BeginTime, DateTime? EndTime) {
            string sql = string.Empty;
            string wherestr = string.Empty;
            if (BeginTime!=null) {
                wherestr += "and ReleaseTime >='" + BeginTime + "'";
            }
            if (EndTime!=null) {
                wherestr += "and ReleaseTime <='" + EndTime + "'";
            }
            sql = string.Format(@"
SELECT  *
FROM    dbo.NewArticle
WHERE 1=1 {0}
ORDER BY ReleaseTime DESC", wherestr);
            return StockNewsDB.GetInstance().Page<NewArticle>(pageindex, pagesize, sql, BeginTime,EndTime?.AddDays(1));
        }

        /// <summary>
        /// 删除新闻文章
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        public int Delete(int NewArticleId) {
            var sql = Sql.Builder;
            sql.Append(" DELETE FROM dbo.NewArticle ");
            sql.Where(" NewArticleId = @id ", new { id = NewArticleId });

            return StockNewsDB.GetInstance().Execute(sql);
        }


        /// <summary>
        /// 修改新闻文章
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int Edit(NewArticle model) {
            var sql = string.Format(@" 
UPDATE  dbo.NewArticle
SET    
        Title = @1 ,
        ReleaseTime = @2 ,
        Body = @3,
        UpdateTime = @4
WHERE   NewArticleId = @0
");
            return StockNewsDB.GetInstance().Execute(sql,
                model.NewArticleId,
                model.Title,
                model.ReleaseTime,
                model.Body,
                model.UpdateTime
                );
        }


        /// <summary>
        /// 添加新闻文章
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        public long InsertNewArticle(NewArticle item) {
            var items = StockNewsDB.GetInstance().Insert(item);
            return item.NewArticleId;
        }
    }
}
