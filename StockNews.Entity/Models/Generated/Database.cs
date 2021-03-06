
// This file was automatically generated by the PetaPoco T4 Template
// Do not make changes directly to this file - edit the template instead
// 
// The following connection settings were used to generate this file
// 
//     Connection String Name: `strConnectionString`
//     Provider:               `System.Data.SqlClient`
//     Connection String:      `Data Source=210.51.17.100;Initial Catalog=StockNews;MultipleActiveResultSets=True;user id=tladmin;password=**zapped**;`
//     Schema:                 ``
//     Include Views:          `False`

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PetaPoco;

namespace StockNews.Entity.Model
{
	public partial class StockNewsDB : Database
	{
		public StockNewsDB() 
			: base("strConnectionString")
		{
			CommonConstruct();
		}

		public StockNewsDB(string connectionStringName) 
			: base(connectionStringName)
		{
			CommonConstruct();
		}
		
		partial void CommonConstruct();
		
		public interface IFactory
		{
			StockNewsDB GetInstance();
		}
		
		public static IFactory Factory { get; set; }
        public static StockNewsDB GetInstance()
        {
			if (_instance!=null)
				return _instance;
				
			if (Factory!=null)
				return Factory.GetInstance();
			else
				return new StockNewsDB();
        }

		[ThreadStatic] static StockNewsDB _instance;
		
		public override void OnBeginTransaction()
		{
			if (_instance==null)
				_instance=this;
		}
		
		public override void OnEndTransaction()
		{
			if (_instance==this)
				_instance=null;
		}
        
		public class Record<T> where T:new()
		{
			public static StockNewsDB repo { get { return StockNewsDB.GetInstance(); } }
			public bool IsNew() { return repo.IsNew(this); }
			public object Insert() { return repo.Insert(this); }
			public int Update(IEnumerable<string> columns) { return repo.Update(this, columns); }
			public static int Update(string sql, params object[] args) { return repo.Update<T>(sql, args); }
			public static int Update(Sql sql) { return repo.Update<T>(sql); }
			public int Delete() { return repo.Delete(this); }
			public static int Delete(string sql, params object[] args) { return repo.Delete<T>(sql, args); }
			public static int Delete(Sql sql) { return repo.Delete<T>(sql); }
			public static int Delete(object primaryKey) { return repo.Delete<T>(primaryKey); }
			public static bool Exists(object primaryKey) { return repo.Exists<T>(primaryKey); }
			public static T SingleOrDefault(object primaryKey) { return repo.SingleOrDefault<T>(primaryKey); }
			public static T SingleOrDefault(string sql, params object[] args) { return repo.SingleOrDefault<T>(sql, args); }
			public static T SingleOrDefault(Sql sql) { return repo.SingleOrDefault<T>(sql); }
			public static T FirstOrDefault(string sql, params object[] args) { return repo.FirstOrDefault<T>(sql, args); }
			public static T FirstOrDefault(Sql sql) { return repo.FirstOrDefault<T>(sql); }
			public static T Single(object primaryKey) { return repo.Single<T>(primaryKey); }
			public static T Single(string sql, params object[] args) { return repo.Single<T>(sql, args); }
			public static T Single(Sql sql) { return repo.Single<T>(sql); }
			public static T First(string sql, params object[] args) { return repo.First<T>(sql, args); }
			public static T First(Sql sql) { return repo.First<T>(sql); }
			public static List<T> Fetch(string sql, params object[] args) { return repo.Fetch<T>(sql, args); }
			public static List<T> Fetch(Sql sql) { return repo.Fetch<T>(sql); }
			public static List<T> Fetch(long page, long itemsPerPage, string sql, params object[] args) { return repo.Fetch<T>(page, itemsPerPage, sql, args); }
			public static List<T> Fetch(long page, long itemsPerPage, Sql sql) { return repo.Fetch<T>(page, itemsPerPage, sql); }
			public static List<T> SkipTake(long skip, long take, string sql, params object[] args) { return repo.SkipTake<T>(skip, take, sql, args); }
			public static List<T> SkipTake(long skip, long take, Sql sql) { return repo.SkipTake<T>(skip, take, sql); }
			public static Page<T> Page(long page, long itemsPerPage, string sql, params object[] args) { return repo.Page<T>(page, itemsPerPage, sql, args); }
			public static Page<T> Page(long page, long itemsPerPage, Sql sql) { return repo.Page<T>(page, itemsPerPage, sql); }
			public static IEnumerable<T> Query(string sql, params object[] args) { return repo.Query<T>(sql, args); }
			public static IEnumerable<T> Query(Sql sql) { return repo.Query<T>(sql); }
			
			private Dictionary<string,bool> ModifiedColumns;
			private void OnLoaded()
			{
				ModifiedColumns = new Dictionary<string,bool>();
			}
			protected void MarkColumnModified(string column_name)
			{
				if (ModifiedColumns!=null)
					ModifiedColumns[column_name]=true;
			}
			public int Update() 
			{ 
				if (ModifiedColumns==null)
					return repo.Update(this); 

				int retv = repo.Update(this, ModifiedColumns.Keys);
				ModifiedColumns.Clear();
				return retv;
			}
			public void Save() 
			{ 
				if (repo.IsNew(this))
					repo.Insert(this);
				else
					Update();
			}
		}
	}
	

    
	[TableName("NewArticle")]
	[PrimaryKey("NewArticleId")]
	[ExplicitColumns]
    public partial class NewArticle : StockNewsDB.Record<NewArticle>  
    {
        [Column] 
		public int NewArticleId 
		{ 
			get
			{
				return _NewArticleId;
			}
			set
			{
				_NewArticleId = value;
				MarkColumnModified("NewArticleId");
			}
		}
		int _NewArticleId;

        [Column] 
		public DateTime? CreateTime 
		{ 
			get
			{
				return _CreateTime;
			}
			set
			{
				_CreateTime = value;
				MarkColumnModified("CreateTime");
			}
		}
		DateTime? _CreateTime;

        [Column] 
		public string Title 
		{ 
			get
			{
				return _Title;
			}
			set
			{
				_Title = value;
				MarkColumnModified("Title");
			}
		}
		string _Title;

        [Column] 
		public DateTime? ReleaseTime 
		{ 
			get
			{
				return _ReleaseTime;
			}
			set
			{
				_ReleaseTime = value;
				MarkColumnModified("ReleaseTime");
			}
		}
		DateTime? _ReleaseTime;

        [Column] 
		public string CreateName 
		{ 
			get
			{
				return _CreateName;
			}
			set
			{
				_CreateName = value;
				MarkColumnModified("CreateName");
			}
		}
		string _CreateName;

        [Column] 
		public string Body 
		{ 
			get
			{
				return _Body;
			}
			set
			{
				_Body = value;
				MarkColumnModified("Body");
			}
		}
		string _Body;

        [Column] 
		public DateTime? UpdateTime 
		{ 
			get
			{
				return _UpdateTime;
			}
			set
			{
				_UpdateTime = value;
				MarkColumnModified("UpdateTime");
			}
		}
		DateTime? _UpdateTime;

	}
    
	[TableName("UserAccount")]
	[PrimaryKey("UserAccountId")]
	[ExplicitColumns]
    public partial class UserAccount : StockNewsDB.Record<UserAccount>  
    {
        [Column] 
		public int UserAccountId 
		{ 
			get
			{
				return _UserAccountId;
			}
			set
			{
				_UserAccountId = value;
				MarkColumnModified("UserAccountId");
			}
		}
		int _UserAccountId;

        [Column] 
		public string UserName 
		{ 
			get
			{
				return _UserName;
			}
			set
			{
				_UserName = value;
				MarkColumnModified("UserName");
			}
		}
		string _UserName;

        [Column] 
		public string UserPwd 
		{ 
			get
			{
				return _UserPwd;
			}
			set
			{
				_UserPwd = value;
				MarkColumnModified("UserPwd");
			}
		}
		string _UserPwd;

        [Column] 
		public DateTime? CreateTime 
		{ 
			get
			{
				return _CreateTime;
			}
			set
			{
				_CreateTime = value;
				MarkColumnModified("CreateTime");
			}
		}
		DateTime? _CreateTime;

        [Column] 
		public DateTime? UpdateTime 
		{ 
			get
			{
				return _UpdateTime;
			}
			set
			{
				_UpdateTime = value;
				MarkColumnModified("UpdateTime");
			}
		}
		DateTime? _UpdateTime;

        [Column] 
		public int? State 
		{ 
			get
			{
				return _State;
			}
			set
			{
				_State = value;
				MarkColumnModified("State");
			}
		}
		int? _State;

	}
}


