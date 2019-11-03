using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MvcAngularJS.Models
{
    public class EmployeeModels
    {
        [Key]
        public int empID
        {
            get;
            set;
        }

        [Required (ErrorMessage="Please Enter Employee Name")]
        [Display (Name=" Employee Name")]
        public string employeeName
        {
            get;
            set;
        }

        public int deptID
        {
            get;
            set;
        }

        [Display(Name = "Employee Designation")]
        public string employeeDesignation
        {
            get;
            set;
        }

        [Display (Name= "Employee Address")]
        public string employeeAddress
        {
            get;
            set;
        }

        [Display(Name = "Created By")]
        public string createdBy
        {
            get;
            set;
        }
    }

}