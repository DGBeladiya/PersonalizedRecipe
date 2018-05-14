var app = angular.module("PRApp", ["angucomplete","ngRoute", "base64",'datatables', 'datatables.buttons', 'monospaced.elastic']);
app.directive('imgUpload', ['$rootScope',function (rootScope) {
	return {
	  restrict: 'A',
	  link: function (scope, elem, attrs) {
		var canvas = document.createElement("canvas");
		var extensions = 'jpeg ,jpg, png, gif';
		elem.on('change', function () {
		reader.readAsDataURL(elem[0].files[0]);
		var filename = elem[0].files[0].name;
  
		  var extensionlist = filename.split('.');
		  var extension =extensionlist[extensionlist.length - 1];
			  if(extensions.indexOf(extension) == -1){
				  alert("File extension , Only 'jpeg', 'jpg', 'png', 'gif', 'bmp' are allowed.");       
  
			  }else{
					  scope.file = elem[0].files[0];
					  scope.imageName = filename;
				  }
		});
  
			  var reader = new FileReader();
			  reader.onload = function (e) {
  
				scope.image = e.target.result;
				scope.$apply();
  
			  }
		  }
	  }
  }]);
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
		.when("/Recipe", { templateUrl: "pages/Recipe/Recipe.html" })
		.when("/Category", { templateUrl: "pages/Category/category.html" })
		.when("/Video", { templateUrl: "pages/video/Video.html" });
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