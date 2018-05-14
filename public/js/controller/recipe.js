angular.module("PRApp").controller("recipeController", function (ingredientService, $base64, $scope, $timeout, recipeService) {
    $scope.recipe = {
        name: "", description: "", cost: "", time: "", noOfPerson: "",
        ageCategory: { min: "", max: "" }, category: ""
    }
    $scope.ingredient = { name: "", weight: "", unit: "", isRequired: false }
    $scope.ingredients = []
    $scope.categoryList = []
    $scope.steps = []
    $scope.image;
    $scope.ingredientList = [];
    ingredientService.getList().then((result) => {
        var data=result.data;
        for(var i=0;i<data.length;i++)
        {

            var name=data[i].name+" - "+data[i].keywords.join();
            var code=data[i].name;
            $scope.ingredientList.push({name:name,code:code});
        }
    }, (error) => {

    });


    $scope.step = { description: "", isAlarm: false, time: "", stepImage: "" }
    recipeService.getCategoryName().then((answer) => { console.log(answer.data); $scope.categoryList = answer.data },
        (error) => { })
    $scope.addIngredient = () => {

        $scope.ingredients.push({ unit: $scope.ingredient.unit, name: $scope.selectedIngredient.originalObject.code, weight: $scope.ingredient.weight, isRequired: $scope.ingredient.isRequired });
        //console.log({name:$scope.ingredient.name,weight:$scope.ingredient.weight,isRequired:$scope.ingredient.isRequired})
        $scope.ingredient = { unit: "", name: "", weight: "", isRequired: false }
    }
    $scope.removeIngredient = (index) => { $scope.ingredients.splice(index, 1) }
    $scope.addStep = () => {
        var timeInMinutes = $scope.step.time.split(":")
        var inSeconds = 0;
        if (timeInMinutes[0]) {
            inSeconds += parseInt(timeInMinutes[0]) * 60;

        }
        if (timeInMinutes[1]) {
            inSeconds += parseInt(timeInMinutes[1])
        }
        $scope.steps.push({ stepImage: $scope.image, description: $scope.step.description, isAlarm: $scope.step.isAlarm, time: inSeconds })
        $scope.step = { description: "", isAlarm: false, time: "", stepImage: "" }
        // var imageData=$base64.encode($scope.stepImage);

    }
    $scope.removeStep = (index) => {
        $scope.steps.splice(index, 1)
    }
    $scope.getData = () => {
        recipeService.getData()
    }
    $scope.createRecipe = () => {
        var formData = new FormData();
        var timeInMinutes = $scope.recipe.time.split(":")
        var inSeconds = 0;
        if (timeInMinutes[0]) {
            inSeconds += parseInt(timeInMinutes[0]) * 60;

        }
        if (timeInMinutes[1]) {
            inSeconds += parseInt(timeInMinutes[1])
        }

        formData.append("image", $scope.imageRecipe)
        formData.append("name", $scope.recipe.name)
        formData.append("description", $scope.recipe.description)
        formData.append("cost", $scope.recipe.cost)
        formData.append("category", $scope.recipe.category.name)
        formData.append("ageCategory", $scope.recipe.ageCategory)
        formData.append("time", inSeconds)
        formData.append("noOfPerson", $scope.recipe.noOfPerson)
        formData.append("ingredient", JSON.stringify($scope.ingredients))
        formData.append("step", JSON.stringify($scope.steps))
        recipeService.createRecipe(formData).then(
            (result) => {
                $scope.errorMsg = false;
                $scope.successMsg = true;
                $scope.recipe = {
                    name: "", description: "", cost: "", time: "", noOfPerson: "",
                    ageCategory: { min: "", max: "" }, category: ""
                }
                $scope.errors = {};
                $scope.ingredients = [];
                $scope.steps = [];
                $timeout(() => { $scope.getData() }, 1000);
            },
            (error) => {
                $scope.errorMsg = true;
                $scope.successMsg = false;
                $scope.errors = error.errors
            })


    }
});