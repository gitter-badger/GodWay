using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
 
namespace RemoveDupRowDemo
{
    class Program
    {
        static void Main(string[] args)
        {
            DataTable _dt = new DataTable();
            _dt.Columns.Add("id", typeof(int));
            _dt.Columns.Add("name", typeof(string));
            _dt.Columns.Add("address", typeof(string));
 
            DataRow _dr = _dt.NewRow();
            _dr["id"] = 1;
            _dr["name"] = "lipeng";
            _dr["address"] = "DongXiaoKou";
            _dt.Rows.Add(_dr);
            _dt.Rows.Add(_dr.ItemArray);
            _dt.Rows.Add(_dr.ItemArray);
            _dr = _dt.NewRow();
            _dr["id"] = 2;
            _dr["name"] = "xiaoNa";
            _dr["address"] = "DongXiaoKou";
            _dt.Rows.Add(_dr);
            _dr = _dt.NewRow();
            _dr["id"] = 3;
            _dr["name"] = "BingLi";
            _dr["address"] = "TianTongYuan";
            _dt.Rows.Add(_dr);
            _dt.Rows.Add(_dr.ItemArray);
            Console.WriteLine("--------------------原来有重复数据的Table----------------------");
            _dt.AsEnumerable().ToList().ForEach(
                x =>
                {
                    Console.WriteLine(x["id"].ToString() + "    " + x["name"].ToString() + "   " + x["address"].ToString());
                });
 
 
            Console.WriteLine();
 
            Console.WriteLine("--------------------用Linq去重复后的Table----------------------");
 
            var _comPresult = _dt.AsEnumerable().Distinct(new DataTableRowCompare());
            DataTable _resultDt = _comPresult.CopyToDataTable();
 
            _resultDt.AsEnumerable().ToList().ForEach(
               x =>
               {
                   Console.WriteLine(x["id"].ToString() + "    " + x["name"].ToString() + "   " + x["address"].ToString());
               });
 
            Console.WriteLine();
 
            Console.WriteLine("--------------------用DefaultView去重复后的Table----------------------");
            DataTable _dtDefalut = _dt.DefaultView.ToTable(true, "id", "name", "address");
 
 
            _dtDefalut.AsEnumerable().ToList().ForEach(
              x =>
              {
                  Console.WriteLine(x["id"].ToString() + "    " + x["name"].ToString() + "   " + x["address"].ToString());
              });
 
            Console.ReadLine();
        }
    }
 
    public class DataTableRowCompare : IEqualityComparer<DataRow>
    {
 
        #region IEqualityComparer<DataRow> 成员
 
        public bool Equals(DataRow x, DataRow y)
        {
            return (x.Field<int>("id") == y.Field<int>("id"));
        }
 
        public int GetHashCode(DataRow obj)
        {
            return obj.ToString().GetHashCode();
        }
 
        #endregion
    }
}