angular.module("PRApp").controller("recipeController", function ($base64, $scope, $timeout, recipeService) {
    $scope.recipe = {
        name: "", description: "", cost: "", time: "", noOfPerson: "",
        ageCategory: { min: "", max: "" }, category: ""
    }
    $scope.ingredient = { name: "", weight: "", unit: "", isRequired: false }
    $scope.ingredients = []
    $scope.categoryList = []
    $scope.steps = []
    $scope.image;
    $scope.step = { description: "", isAlarm: false, time: "", stepImage: "" }
    recipeService.getCategoryName().then((answer) => { console.log(answer.data);$scope.categoryList = answer.data },
        (error) => { })
    $scope.addIngredient = () => {

        $scope.ingredients.push({ unit: $scope.ingredient.unit, name: $scope.ingredient.name, weight: $scope.ingredient.weight, isRequired: $scope.ingredient.isRequired });
        //console.log({name:$scope.ingredient.name,weight:$scope.ingredient.weight,isRequired:$scope.ingredient.isRequired})
        $scope.ingredient = { unit: "", name: "", weight: "", isRequired: false }
    }
    $scope.removeIngredient = (index) => { $scope.ingredients.splice(index, 1) }
    $scope.addStep = () => {
        $scope.steps.push({ stepImage: $scope.image, description: $scope.step.description, isAlarm: $scope.step.isAlarm, time: $scope.step.time })
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

        formData.append("image", $scope.imageRecipe)
        formData.append("name", $scope.recipe.name)
        formData.append("description", $scope.recipe.description)
        formData.append("cost", $scope.recipe.cost)
        formData.append("category", $scope.recipe.category)
        formData.append("ageCategory", $scope.recipe.ageCategory)
        formData.append("time", $scope.recipe.time)
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