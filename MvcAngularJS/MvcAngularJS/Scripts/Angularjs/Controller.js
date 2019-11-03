app.controller("empCtrl", function ($scope, angularService) {
    $scope.hideSuccess = true;
    $scope.hideWarning = true;

    $scope.showAutoComplete = true;
    $scope.showDeptAutoComplete = true;

    $scope.hideEmp = false;
    $scope.clr = false;
    getAll();
    clearValue();
    dept();

    function getAll() {
        var getData = angularService.getEmployee();
        getData.then(function (emp) {
            $scope.employees = emp.data;
            $scope.distinctemployees = emp.data;
            $scope.distinctDepartment = emp.data;

            var d = null;
            for (var i = 0; i < $scope.distinctDepartment.length; i++) {
                var val = $scope.distinctDepartment[i]["DepartmentName"].trim();
                d += "," + val;

            }
            d = d.replace('null,', '').trim();

            $scope.listData = d.split(',');
            

            $scope.resultLenght = emp.data.length;
            //start sorting
            $scope.currentPage = 0;
            $scope.pageSize = 5;
            $scope.numberOfPages = function () {
                return Math.ceil($scope.resultLenght / $scope.pageSize);
            }
            //end sorting
        }, function () {
            $scope.hideWarning = false;
            $scope.warningMessage = 'Error in getting records';
            $interval(callAtInterval, 1000);
        });
    };

    $scope.HideShowContent = function () {
        $scope.hideEmp = !$scope.hideEmp;
        $scope.hideUpdate = false;
        $scope.hideSave = true;
        $scope.clr = !$scope.clr;
        clearValue();
    };

    $scope.ClearAll = function () {
        $scope.hideUpdate = false;
        $scope.hideSave = true;
        clearValue();
    };

    $scope.addEmp = function () {
        var EmployeeModels = {
            employeeName: $scope.empName,
            employeeDesignation: $scope.empDesignation,
            employeeAddress: $scope.empAddress,
            createdBy: $scope.empCreatedBy,
            deptID: $scope.dept
        }
        var addData = angularService.addEmployeeService(EmployeeModels);
        addData.then(function (msg) {
            if (msg.data == "Successfull") {
                getAll();
                clearValue();
                $scope.hideEmp = false;
                $scope.clr = false;

                $scope.hideSuccess = false;
                $scope.successMessage = 'Record added successfully';
                $interval(callAtInterval, 1000);
            }
            else {
                $scope.hideWarning = false;
                $scope.warningMessage = 'Data is not in correct format';
                $interval(callAtInterval, 1000);
            }
        }, function () {
            $scope.hideWarning = false;
            $scope.warningMessage = 'Error in adding record';
            $interval(callAtInterval, 1000);
        });
    };

    $scope.editEmp = function (employee) {
        $scope.hideEmp = true;
        $scope.empID = employee.EmpID;
        $scope.empName = employee.EmpName;
        $scope.empDesignation = employee.EmpDesignation;
        $scope.empAddress = employee.EmpAddress;
        $scope.empCreatedBy = employee.CreatedBy;
        $scope.hideUpdate = true;
        $scope.hideSave = false;
        $scope.clr = true;
    };

    $scope.rptBtn = function (employee) {
        $scope.UpdateEmp('RptBtn', employee);
    };

    $scope.txtbxBtn = function () {
        $scope.UpdateEmp('', '');
    };

    $scope.UpdateEmp = function (flag, employee) {
        if (flag == 'RptBtn') {
            var EmployeeModels = {
                empID: employee.EmpID,
                employeeName: employee.EmpName,
                employeeDesignation: employee.EmpDesignation,
                employeeAddress: employee.EmpAddress,
                createdBy: employee.CreatedBy
            }
        }
        else {
            var EmployeeModels = {
                empID: $scope.empID,
                employeeName: $scope.empName,
                employeeDesignation: $scope.empDesignation,
                employeeAddress: $scope.empAddress,
                createdBy: $scope.empCreatedBy
            }
        }


        var editData = angularService.editEmployeeService(EmployeeModels);
        editData.then(function (msg) {
            if (msg.data == "Successfull") {
                getAll();
                clearValue();
                $scope.hideEmp = false;
                $scope.clr = false;
                $scope.hideSuccess = false;
                $scope.successMessage = 'Updation completed successfully';
                $interval(callAtInterval, 1000);
            }
            else {
                $scope.hideWarning = false;
                $scope.warningMessage = 'Data is not in correct format';
                $interval(callAtInterval, 1000);
            }

        }, function () {
            $scope.hideWarning = false;
            $scope.warningMessage = 'Error while updating record';
            $interval(callAtInterval, 1000);
        });
    }

    $scope.deleteEmp = function (employee) {
        var deleteData = angularService.deleteEmployeeServices(employee.EmpID);
        deleteData.then(function (msg) {
            getAll();
            clearValue();
            $scope.hideSuccess = false;
            $scope.successMessage = 'Deleted successfully';
            $interval(callAtInterval, 1000);
        }, function () {
            $scope.hideWarning = false;
            $scope.warningMessage = 'Error in deleting record';
            $interval(callAtInterval, 1000);
        });
    }

    function clearValue() {
        $scope.empID = "";
        $scope.empName = "";
        $scope.empAddress = "";
        $scope.empDesignation = "";
        $scope.empCreatedBy = "";
    }

    $scope.SelectEmp = function (empid) {
        if (empid == 'SelectAll' || empid == '') {
            getAll();
        }
        else {
            var showGrid = angularService.getByEmpIDServices(empid);
            showGrid.then(function (emp) {
                $scope.employees = emp.data;
            }, function () {
                $scope.hideWarning = false;
                $scope.warningMessage = 'Error in fetching record';
                $interval(callAtInterval, 1000);
            });
        }
    }


    $scope.hideAutocomplete = function () {
        if ($scope.searchText != '') {
            $scope.showAutoComplete = false;
        }
        else {
            $scope.showAutoComplete = true;
        }
    }



    function callAtInterval() {
        $scope.hideWarning = true;
        $scope.hideSuccess = true;
    }

    $scope.dropText = 'Drop files here...'

    // init event handlers
    function dragEnterLeave(evt) {
        evt.stopPropagation()
        evt.preventDefault()
        $scope.$apply(function () {
            $scope.dropText = 'Drop files here...'
            $scope.dropClass = ''
        })
    }
    dropbox.addEventListener("dragenter", dragEnterLeave, false)
    dropbox.addEventListener("dragleave", dragEnterLeave, false)
    dropbox.addEventListener("dragover", function (evt) {
        evt.stopPropagation()
        evt.preventDefault()
        var clazz = 'not-available'
        //var ok = evt.dataTransfer && evt.dataTransfer.types && evt.dataTransfer.types.indexOf('Files') >= 0
        //$scope.$apply(function () {
        //    $scope.dropText = ok ? 'Drop files here...' : 'Only files are allowed!'
        //    $scope.dropClass = ok ? 'over' : 'not-available'
        //})
    }, false)
    dropbox.addEventListener("drop", function (evt) {
        console.log('drop evt:', JSON.parse(JSON.stringify(evt.dataTransfer)))
        evt.stopPropagation()
        evt.preventDefault()
        $scope.$apply(function () {
            $scope.dropText = 'Drop files here...'
            $scope.dropClass = ''
        })
        var files = evt.dataTransfer.files
        if (files.length > 0) {
            $scope.$apply(function () {
                $scope.files = []
                for (var i = 0; i < files.length; i++) {
                    $scope.files.push(files[i])
                }
            })
        }
    }, false)
    //============== DRAG & DROP =============

    $scope.setFiles = function (element) {
        $scope.$apply(function ($scope) {
            console.log('files:', element.files);
            // Turn the FileList object into an Array
            $scope.files = []
            for (var i = 0; i < element.files.length; i++) {
                $scope.files.push(element.files[i])
            }
            $scope.progressVisible = false
        });
    };

    $scope.uploadFile = function () {
        var fd = new FormData()
        var url = 'http://localhost:55486/' + 'Employee/UploadFile'
        for (var i in $scope.files) {
            fd.append("uploadedFile", $scope.files[i])
        }
        var xhr = new XMLHttpRequest()
        xhr.upload.addEventListener("progress", uploadProgress, false)
        xhr.addEventListener("load", uploadComplete, false)
        xhr.addEventListener("error", uploadFailed, false)
        xhr.addEventListener("abort", uploadCanceled, false)
        xhr.open("POST", url)
        xhr.send(fd)
    }

    function uploadProgress(evt) {
        $scope.$apply(function () {
            if (evt.lengthComputable) {
                $scope.progress = Math.round(evt.loaded * 100 / evt.total)
            } else {
                $scope.progress = 'unable to compute'
            }
        })
    }

    function uploadComplete(evt) {
        /* This event is raised when the server send back a response */
        alert(evt.target.responseText)
    }

    function uploadFailed(evt) {
        alert("There was an error attempting to upload the file.")
    }

    function uploadCanceled(evt) {
        $scope.$apply(function () {
            $scope.progressVisible = false
        })
        alert("The upload has been canceled by the user or the browser dropped the connection.")
    }

    function dept() {
        $scope.items = ['Anthony', 'Angel', 'Anna', 'Aurelio'];
        var datalist = document.getElementById('department');
        var inputText = document.getElementById('dept');

        inputText.addEventListener('keyup', function (evt) {
            evt.stopPropagation();
            evt.preventDefault();
            if (this.value.length === 0) {
                return;
            }

            //Dont delete below code, that is for getting ID and value of selected value from DataList
            //var opt = $('#browsers [value="' + value + '"]');
            //alert(opt.attr('id'));
            //alert($('#browsers [value="' + value + '"]').data('value'));


            // Send Ajax request and loop of its result
            datalist.textContent = '';

            for (var i = 0; i < $scope.listData.length; i++) {
                 if ($scope.distinctDepartment[i]["DepartmentName"].trim().indexOf(this.value) !== 0) {
                    continue;
                }
                var option = document.createElement('option');
               option.value = $scope.distinctDepartment[i]["DepartmentName"];
                option.id = $scope.distinctDepartment[i]["ID"];
                datalist.appendChild(option);
            }
        });

    };
});



