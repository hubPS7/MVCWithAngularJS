//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace MvcAngularJS
{
    using System;
    using System.Collections.Generic;
    
    public partial class EmployeeTable
    {
        public long EmpID { get; set; }
        public string EmpName { get; set; }
        public string EmpDesignation { get; set; }
        public string EmpAddress { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<int> DepartmentID { get; set; }
    
        public virtual Department Department { get; set; }
    }
}
