angular.module("PRApp").controller("ingredientController", function ($scope,
    DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder,
    ingredientService, $timeout) {

    $scope.data = [{ name: "Hello" }]

    $scope.vm = {};
    $scope.vm.dtInstance = {};
    $scope.vm.dtColumnDefs = [DTColumnDefBuilder.newColumnDef(2).notSortable()];
    $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
        .withOption('paging', true)
        .withOption('searching', false)
        .withOption('info', false)
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
    $scope.keywords = [];
    $scope.image;
    $scope.ingredient = { name: "", weight: "", priceLocation: "", price: "" }
    $scope.ingredientList = [];
    $scope.errors = { name: "", weight: "", image: "", priceLocation: "" }
    $scope.addKeyword = () => { $scope.keywords.push($scope.keyword); $scope.keyword = ""; };
    $scope.removeKeyword = (index) => { $scope.keywords.splice(index) };
    $scope.getData = () => {
        ingredientService.getList().then(
            (result) => {
                $scope.ingredientList = result.data
            },
            (error) => {

            })
    };
    $scope.getData();
    $scope.createIngredient = () => {


        var formData = new FormData();
        formData.append("image", $scope.image);
        formData.append("name", $scope.ingredient.name);
        formData.append("weight", $scope.ingredient.weight);
        formData.append("keywords", $scope.keywords);

        formData.append("price", $scope.ingredient.price);
        formData.append("priceLocation", $scope.ingredient.priceLocation);
        ingredientService.create(formData)
            .then(
            (answer) => {
                $scope.errorMsg = false;
                $scope.successMsg = true;
                $scope.ingredient = { name: "", weight: "", priceLocation: "", price: "" }
                $scope.keywords = [];
                $scope.errors = {};
                $scope.ingredientList = [];
                $timeout(() => { $scope.getData() }, 1000);
            },
            (error) => {
                $scope.errorMsg = true;
                $scope.successMsg = false;
                $scope.errors = error.errors
            });
    }
    $scope.removeIngredient = (ingredient) => {
        ingredientService.removeIngredient({ "_id": ingredient._id });
        $scope.ingredientList = [];
        $timeout(() => { $scope.getData() }, 1000);
    }
    $scope.updateDataLoad(ingredient)
    {
        $scope.mode = true;
        $scope.ingredient.name = ingredient.name;
        $scope.keywords = ingredient.keywords;
        $scope.ingredient.weight = ingredient.weight;

    }
});