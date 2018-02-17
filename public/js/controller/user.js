angular.module("PRApp").controller("userController", function ($scope,
    DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder,
    userService, $timeout) {
    $scope.vm = {};
    $scope.vm.dtInstance = {};
    $scope.vm.dtColumnDefs = [DTColumnDefBuilder.newColumnDef(2).notSortable()];
    $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
        .withOption('paging', true)
        .withOption('searching', true)
        .withOption('info', true)
        .withOption('dom', 'Bfrtip')
        .withButtons([
            {
                extend: 'copy',
                text: '<button class="btn btn-info">Copy</button>',
                titleAttr: 'Copy'
            },
            {
                extend: 'excel',
                text: '<button class="btn btn-info">Excel</button>',
                titleAttr: 'Excel'
            },
            {
                extend: 'print',
                text: '<button class="btn btn-info">Print</button>',
                titleAttr: 'Print'
            },
            {
                extend: 'pdf',
                text: '<button class="btn btn-info">PDF</button>',
                titleAttr: 'Pdf'
            }
        ]);
    var errorMsg = false;
    var successMsg = false;
    $scope.mode = false;
    $scope.language;
    $scope.keywords = [];
    $scope.user = {
        name: "", password: "", email: "", role: "Normal", gender: "Male", language: [], mobileNumber: "",
        address: { city: "", state: "" }
    }
    $scope.userList = [];
    $scope.errors = { name: "", password: "", email: "", role: "", gender: "", mobileNumber: "", address: { city: "", state: "" } }
    $scope.addLanguage = () => { $scope.user.language.push($scope.language); $scope.language = ""; };
    $scope.removeLanguage = (index) => { $scope.user.language.splice(index) };
    $scope.getData = () => {
        userService.getList().then(
            (result) => {
                $scope.userList = result.data
            },
            (error) => {

            })
    };
    $scope.getData();
    $scope.createUser = () => {
        userService.create($scope.user)
            .then(
                (answer) => {
                    $scope.errorMsg = false;
                    $scope.successMsg = true;
                    $scope.user = {
                        name: "", password: "", email: "", role: "Normal", gender: "Male", language: [], mobileNumber: "",
                        address: { city: "", state: "" }
                    }
                    $scope.errors = {};
                    $scope.userList = [];
                    $timeout(() => { $scope.getData() }, 1000);
                },
                (error) => {
                    $scope.errorMsg = true;
                    $scope.successMsg = false;
                    $scope.errors = error.errors
                });
    }
    $scope.removeUser = (ingredient) => {
        userService.removeUser({ "_id": ingredient._id });
        $scope.userList = [];
        $timeout(() => { $scope.getData() }, 1000);
    }
    $scope.loadUpdateData = (user) => {
        console.log(user)
        $scope.mode = true;
        $scope.user = user
        $scope.user.password="";
    }
    $scope.updateUser = () => {
       
        var _id = $scope.user._id;
        var requestPayload = {
            query: { "_id": _id }, newValue: 
               $scope.user
            
        }

        userService.updateUser(requestPayload).then(
            (answer) => {
                $scope.errorMsg = false;
                $scope.successMsg = true;
                $scope.user = {
                    name: "", password: "", email: "", role: "Normal", gender: "Male", language: [], mobileNumber: "",
                    address: { city: "", state: "" }
                }
                $scope.errors = {};
                $scope.ingredientList = [];
                $scope.mode = false;
                $timeout(() => { $scope.getData() }, 1000);
            },
            (error) => {
                $scope.errorMsg = true;
                $scope.successMsg = false;
                $scope.errors = error.errors
            });
    }
});