angular.module("PRApp").controller("categoryController", function ($scope,
    DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder,
    categoryService, $timeout) {
    $scope.data = [{ name: "Hello" }]
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
    $scope.image;
    $scope.category = { name: "" }
    $scope.categoryList = [];
    $scope.errors = { name: "" }
    $scope.getData = () => {
        categoryService.getList().then(
            (result) => {
                $scope.categoryList = result.data
            },
            (error) => {

            })
    };
    $scope.getData();
    $scope.createCategory = () => {


        var formData = new FormData();
        formData.append("image", $scope.image);
        formData.append("name", $scope.category.name);
        categoryService.create(formData)
            .then(
                (answer) => {
                    $scope.errorMsg = false;
                    $scope.successMsg = true;
                    $scope.category = { name: "" }

                    $scope.errors = {};
                    $scope.categoryList = [];
                    $timeout(() => { $scope.getData() }, 1000);
                },
                (error) => {
                    $scope.errorMsg = true;
                    $scope.successMsg = false;
                    $scope.errors = error.errors
                });
    }
    $scope.removeCategory = (category) => {
        categoryService.removeCategory({ "_id": category._id });
        $scope.categoryList = [];
        $timeout(() => { $scope.getData() }, 1000);
    }
    $scope.loadUpdateData = (category) => {
        $scope.mode = true;
        $scope.category.name = category.name;

        $scope.category._id = category._id;
    }
    $scope.updateCategory = () => {
        var _id = $scope.category._id;

        var updatedCategory = $scope.category;
        var requestPayload = {
            query: { "_id": _id }, newValue: {
                name: updatedCategory.name,


            }
        }

        categoryService.updateCategory(requestPayload).then(
            (answer) => {
                $scope.errorMsg = false;
                $scope.successMsg = true;
                $scope.category = { name: "" }

                $scope.errors = {};
                $scope.categoryList = [];
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