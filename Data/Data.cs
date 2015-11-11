using System;
using System.Configuration;
using System.Data;
using System.Data.OleDb;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Reflection;
using System.Web;
using Redsz;
using System.Management;

namespace Redsz.DAO{
	public class Data{
		///SQL-SERVER数据库连接
		public static SqlConnection GetSqlConnection(string conn_type)
		{
			return new SqlConnection(ConfigurationManager.ConnectionStrings[conn_type].ConnectionString);
		}
		///ACCESS数据库连接
		public static OleDbConnection GetAccessConnection(string conn_type)
    	{
      		return new OleDbConnection(ConfigurationManager.ConnectionStrings[conn_type].ConnectionString + System.Web.HttpContext.Current.Server.MapPath(ConfigurationManager.ConnectionStrings[conn_type].ProviderName));
    	}

    	///返回一个SqlParameter实例
    	/// </summary>
    	/// <param name="ParamName">字段名</param>
    	/// <param name="stype">字段类型</param>
	    /// <param name="size">范围</param>
    	/// <param name="Value">赋值</param>
    	/// <returns>返回一个SqlParameter实例</returns>
    	public static SqlParameter MakeParm(string ParamName,System.Data.SqlDbType stype,int size,Object Value)
    	{
    		SqlParameter para=new SqlParameter(ParamName,Value);
    		para.SqlDbType=stype;
    		para.Size=size;
    		return para;
    	}
    	/// 获得SqlParameter实例
    	/// </summary>
   	 	/// <param name="ParamName">字段名</param>
    	/// <param name="Value">赋值</param>
   	 	/// <returns>返回一个SqlParameter实例</returns>
   	 	public static SqlParameter MakeParam(string ParamName, string Value)
   	 	{
   	    	return new SqlParameter(ParamName, Value);
   	 	}
   	 	/// 获得SqlParameter实例
    	/// </summary>
    	/// <param name="ParamName">字段名</param>
    	/// <param name="Value">赋值</param>
    	/// <returns>返回一个SqlParameter实例</returns>
    	public static OleDbParameter MakeOleParam(string ParamName, string Value)
    	{
        	return new OleDbParameter(ParamName, Value);
    	}

        ///获取DateSet实例（获取TopList记录）
        public static DataTable TopList(string sql)
        {
            return TopList(sql,"MSSQL");
        }

        public static DataTable TopList(string sql, string conn_type)
        { 
            string DataType=ConfigurationManager.ConnectionStrings[conn_type].ConnectionString;
            DataTable dt=new DataTable();
            if(conn_type.IndexOf("MSSQL")>-1)
            {
            	SqlConnection conn=GetSqlConnection(conn_type);
            	try
            	{
            		conn.Open();
            		SqlDataAdapter da=new SqlDataAdapter(sql,conn);
            		conn.Close();
            		DataSet ds=new DataSet();
            		da.Fill(ds,"12news1234567890");
            		dt=ds.Tables[0];
            	}
            	catch
            	{
            		conn.Close();
            		throw;
            	}
            }
            else if (conn_type.IndexOf("ACCESS") > -1)
        	{
            	OleDbConnection conn = getAccessConnection(conn_type);
            	 try
             	{
                 	conn.Open();
                 	OleDbDataAdapter adapter = new OleDbDataAdapter(sql, conn);
                	conn.Close();
                 	DataSet ds = new DataSet();
                 	adapter.Fill(ds, "12news1234567890");
                 	adapter.Dispose();
                 	dt = ds.Tables[0];
             	}
             	catch
             	{
                 	conn.Close();
                 	throw;
             	}
        	}

        	return dt;
        }

    	//根据SQL获取DataTable
    	public static DataTable GetDataTable(string sql)
    	{
    		return TopList(sql);
    	}

    	public static DataTable GetDataTable(string sql,string conn_type)
    	{
    		return TopList(sql,conn_type);
    	}

		//执行各种SQL语句的实现方法
		public static int ExecuteNonQuery(CommandType cmdType,string cmdText,Hashtable ht)
		{
			return ExecuteNonQuery(cmdType,cmdText,ht,"MSSQL");
		}

		public static int ExecuteNonQuery(CommandType cmdType,string cmdText,Hashtable ht,string conn_type)
		{
			string DataType=ConfigurationManager.ConnectionStrings[conn_type].ConnectionStrings;
			int val=0;
			if(conn_type.IndexOf("MSSQL")>-1)//查找索引位置，没有找到返回-1
			{
				SqlCommand cmd=new SqlCommand();
				SqlConnection conn=GetSqlConnection(conn_type);

				try{
					conn.Open();
					cmd.Connection=conn;
					cmd.CommandText=cmdText;
					if(ht!=null)
					{
						IDictionaryEnumerator ide=ht.GetEnumerator();
						SqlParameter[] cmdParms=new SqlParameter[ht.Count];
						int i=0;
						while(ide.MoveNext())
						{
							SqlParameter sp=Data.MakeParm("@"+ide.key.ToString(),ide.Value.ToString());
							cmdParms[i]=sp;
							cmd.Parameters.Add(sp);
							i++;
						}
					}
					val=cmd.ExecuteNonQuery();
					cmd.Parameters.Clear();
					conn.Close();
				}
				catch
				{
					conn.Close();
					throwl;
				}
			}
			else if (conn_type.IndexOf("ACCESS") > -1)
        	{

        	}

        	return val;
		}	

		///直接执行SQL语句
		public static void RunSql(string szSql)
		{
			Data.ExecuteNonQuery(CommandType.Text,szSql,null);//60R
		}

		///直接执行SQL语句
		public static void RunSql(string str_Sql,string conn_type)
		{
			Data.ExecuteNonQuery(CommandType.Text,str_Sql,null,conn_type);//65R
		}

		///获取某个表将要新增记录的id标识
		public static int GetTableNextId(string tablename)
		{
			//select IDENT_CURRENT('koudai_product')+1 nextid
			DataTable table=GetDataTable("select IDENT_CURRENT('"+tablename+"')+1 nextid");
			return int.Parse(table.Rows[0][0].ToString());
		}

		///获取某个表最后一条记录的id标识
		public static int GetTableOverId(string tablename)
		{
			DataTable table=GetDataTable("select top 1 id from "+tablename +" order by id desc ");
			return int.Parse(table.Rows[0][0].ToString());
		}

		///新增记录
		public static void Insert(string TableName,Hashtable ht)
		{
			Insert(TableName,ht,"MSSQL");
		}

		public static void Insert(string TableName,Hashtable ht,string conn_type)		
		{
			//insert into iuser([nickname],[mobile]) values(@nickname,@mobile)
			string cmd_set="";
			string cmd_val="";
			IDictionaryEnumerator ide=ht.GetEnumerator();
			while(ide.MoveNext())
			{
				cmd_set+="["+ide.Key.ToString()+"],";
				cmd_val+="@"+ide.key.ToString()+",";
			}
			cmd_set="("+cmd_set+")";
			cmd_set=cmd_set.Replace(",)",")");

			cmd_val=" values("+cmd_val+")";
			cmd_val=cmd_val.Replace(",)",")");		
			
			string cmd_sql="insert into ["+TableName+"] "+cmd_set+cmd_val;	
			Data.ExecuteNonQuery(CommandText.Text,cmd_sql,ht,conn_type);
		}

		///新增多条记录
		public static void InsertList(HttpRequest req,string tableName,string fieldKey,Hashtable nexus,string class_name)
		{
			Type myType=Type.GetType(class_name);//获得“类”类型
			Object o_Instance=System.Activator.CreateInstance(myType);//实例化类
			PropertyInfo[]
		}
	}
}