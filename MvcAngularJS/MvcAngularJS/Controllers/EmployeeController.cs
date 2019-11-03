using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MvcAngularJS.Models;
using System.Data;
using System.Data.SqlClient;
using MvcAngularJS.Filters;

namespace MvcAngularJS.Controllers
{
    public class EmployeeController : Controller
    {
        KPITEntities db = new KPITEntities();
        public ActionResult Index()
        {
            return View("EmployeeForm");
        }

        [JsonRequestBehavior]
        public JsonResult GetAll()
        {
            var employeeData = from a in db.EmployeeTables join b in db.Departments on a.DepartmentID equals b.ID          
                               select new {a.EmpID, a.EmpName, a.EmpDesignation, a.EmpAddress, a.CreatedBy, b.DepartmentName, b.ID};
            return Json(employeeData.ToList());
        }

        [JsonRequestBehavior]
        public JsonResult GetByName(string empName)
        {
            var employeeByNameData = from a in db.EmployeeTables.Where(a => a.EmpName.StartsWith(empName)) select new { a.EmpName };

            return Json(employeeByNameData.ToList());
        }

        public string AddEmployee(EmployeeModels emp)
        {
            if (ModelState.IsValid)
            {

                if (emp != null)
                {
                    var emptable = new EmployeeTable
                    {
                        EmpName = emp.employeeName,
                        EmpDesignation = emp.employeeDesignation,
                        EmpAddress = emp.employeeAddress,
                        CreatedBy = emp.createdBy,
                        DepartmentID= emp.deptID,
                    };
                    db.EmployeeTables.Add(emptable);
                    db.SaveChanges();

                    return "Successfull";

                }
                else
                {
                    return "error while adding employee";
                }

            }
            else
            {
                return "Please insert data in correct format";
            }
        }

        public string EditEmployee(EmployeeModels emp)
        {
            if (ModelState.IsValid)
            {
                if (emp != null)
                {
                    var empStatus = db.EmployeeTables.Where(a => a.EmpID == emp.empID);
                    if (empStatus != null)
                    {
                        EmployeeTable employee = db.EmployeeTables.Where(a => a.EmpID == emp.empID).FirstOrDefault();
                        employee.EmpID = emp.empID;
                        employee.EmpName = emp.employeeName;
                        employee.EmpAddress = emp.employeeAddress;
                        employee.EmpDesignation = emp.employeeDesignation;
                        employee.CreatedBy = emp.createdBy;
                        db.SaveChanges();
                        return "Successfull";
                    }
                    else
                    {
                        return "No record found";
                    }
                }
                else
                {
                    return "error while updating employee";
                }
            }
            else
            {
                return "Please insert data in correct format";
            }
        }

        public string DeleteEmployee(string employeeId)
        {
            if (ModelState.IsValid)
            {
                if (!String.IsNullOrEmpty(employeeId))
                {
                    var empID = Convert.ToInt32(employeeId);
                    var empStatus = db.EmployeeTables.Where(a => a.EmpID == empID);
                    if (empStatus != null)
                    {
                        EmployeeTable employee = db.EmployeeTables.Where(a => a.EmpID == empID).FirstOrDefault();
                        db.EmployeeTables.Remove(employee);
                        db.SaveChanges();
                        return "Employee Deleted";

                    }
                    else
                    {
                        return "Employee Not Found";
                    }
                }
                else
                {
                    return "error while deleting employee";
                }
            }
            else
            {
                return "Data is not in correct format";
            }
        }

         [JsonRequestBehavior]
        public JsonResult GetByEmployeeID(string employeeId)
        {
            if (ModelState.IsValid)
            {
                if (!String.IsNullOrEmpty(employeeId))
                {
                    var empID = Convert.ToInt32(employeeId);
                    var getDataID = from a in db.EmployeeTables.Where(a => a.EmpID == empID) select new { a.EmpID, a.EmpName, a.EmpDesignation, a.EmpAddress, a.CreatedBy };
                    return Json(getDataID.ToList());
                }
                else
                { return Json("Record Not Found".ToList()); }
            }
            else
            { return Json("No Data".ToList()); }
        }

         [HttpPost]
         public string UploadFile()
         {
             var returnValue = string.Empty;
             try
             {

                 for (int i = 0; i < Request.Files.Count; i++)
                 {
                     HttpPostedFileBase file = Request.Files[i]; //Uploaded file value
                     //Use the following properties to get file's name, size and MIMEType  Request.Files.AllKeys[0]
                     int fileSize = file.ContentLength;
                     string fileName = Path.GetFileName(file.FileName);
                     string mimeType = file.ContentType;
                     System.IO.Stream fileContent = file.InputStream;
                     //To save file, use SaveAs method
                     var path = Path.Combine(Server.MapPath("~/Uploads/"), fileName);
                     file.SaveAs(path); //File will be saved in application root
                 }
                 returnValue = "File Saved SuccessFully";
             }
             catch(Exception e)
             {
                 returnValue = "Error :" + e.ToString(); 
             }
             return returnValue;
         }
    }
}
