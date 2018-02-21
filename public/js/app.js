var app = angular.module("PRApp", ["ngRoute", 'datatables', 'datatables.buttons']);
app.controller("profileController", function ($scope, fetchUser) {
	$scope.user = {};
	fetchUser.getUser().then((result)=>{
		console.log(result)
		$scope.user=result.data;
		
	},(err)=>{

	});
})
app.service("fetchUser", function ($http, $q) {
	return {
		getUser: () => {
			var defered = $q.defer();
			$http({ method: "post",url:"/user/getUser" }).success((data) => {
				defered.resolve(data)
			}).error((error) => {
				defered.reject(error)
			});
			return defered.promise
		}
	}
});
app.config(function ($routeProvider) {
	$routeProvider
		.when("/", {})
		.when("/1", { templateUrl: "pages/1.html" })
		.when("/2", { templateUrl: "pages/2.html" })
		.when("/dashboard", { templateUrl: "ind1ex.html" })
		.when("/AUIngredients", { templateUrl: "pages/Ingredients/AUIngredients.html" })
		.when("/User", { templateUrl: "pages/User/User.html" });
});
app.directive('fileModel', ['$parse', function ($parse) {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			var model = $parse(attrs.fileModel);
			var modelSetter = model.assign;

			element.bind('change', function () {
				scope.$apply(function () {
					modelSetter(scope, element[0].files[0]);
				});
			});
		}
	};
}]);