var app = angular.module("PRApp", ["ngRoute", 'datatables', 'datatables.buttons', 'monospaced.elastic']);
app.controller("profileController", function ($scope, fetchUser, $window, $location) {
	$scope.user = {};
	fetchUser.getUser().then((result) => {

		$scope.user = result.data;

	}, (err) => {

	});
	$scope.logout = () => {
		fetchUser.logout().then(
			(success) => {
				alert("logout");
				$window.location = "/";
			},
			(error) => {

			});
	}

})
app.service("fetchUser", function ($http, $q) {
	return {
		getUser: () => {
			var defered = $q.defer();
			$http({ method: "post", url: "/user/getUser" }).success((data) => {
				defered.resolve(data)
			}).error((error) => {
				defered.reject(error)
			});
			return defered.promise
		},
		logout: () => {
			var defered = $q.defer();
			$http({ method: "get", url: "/user/logout" }).success((data) => {
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
		.when("/", { templateUrl: "pages/uitility/dashboardUtility.html" })
		.when("/1", { templateUrl: "pages/1.html" })
		.when("/2", { templateUrl: "pages/2.html" })
		.when("/dashboard", { templateUrl: "pages/uitility/dashboardUtility.html" })
		.when("/AUIngredients", { templateUrl: "pages/Ingredients/AUIngredients.html" })
		.when("/User", { templateUrl: "pages/User/User.html" })
		.when("/Recipe", { templateUrl: "pages/Recipe/Recipe.html" });
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