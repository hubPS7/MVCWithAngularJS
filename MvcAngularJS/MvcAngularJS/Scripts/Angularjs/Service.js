app.service("angularService", function ($http) {
    //function to all employee
    this.getEmployee = function () {
        var response = $http({
            method: 'POST',
            url: 'http://localhost:55486/' + 'Employee/GetAll'
        });
        return response;
    };

    this.addEmployeeService = function (employee) {
        var response = $http({
            method: 'POST',
            url: 'http://localhost:55486/' + 'Employee/AddEmployee',
            data: employee,
            dataType: "json"
        });
        return response;
    };

    this.editEmployeeService = function (employee) {
        var response = $http({
            method: 'POST',
            url: 'http://localhost:55486/' + 'Employee/EditEmployee',
            data: JSON.stringify(employee),
            dataType: 'json'
        });
        return response;
    };

    this.deleteEmployeeServices = function (employeeID) {
        var response = $http({
            method: 'POST',
            url: 'http://localhost:55486/' + 'Employee/DeleteEmployee',
            params: {
                employeeId: JSON.stringify(employeeID)
            }
        });
        return response;
    }

    this.getByEmpIDServices = function (employeeID) {
        var response = $http({
            method: 'POST',
            url: 'http://localhost:55486/' + 'Employee/GetByEmployeeID',
            params: {
                employeeId: employeeID
            }
        });
        return response;
    }

});