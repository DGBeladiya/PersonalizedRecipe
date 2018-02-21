var app = angular.module("LoginApp", []);
app.controller("LoginController", function($scope, loginService,$window,$location)  {
    $scope.user = { email: "", password: "" }
    $scope.error;
    $scope.checkLogin = function() {
        loginService.checkLogin($scope.user).then((result)=>{
            $window.location="/";
        },(error)=>{
         
            $scope.error=error.message
        })
    }
}).service("loginService", function($http, $q) {
    return {
        checkLogin: (xData) => {
            var defferd = $q.defer()
            $http({
                url: "/user/checkLogin",
                data: xData,
                method: "post",
                headers: { "Content-Type": "application/json" }
            }).success((data) => {
                defferd.resolve(data)
            }

            ).error((err) => {
                defferd.reject(err)
            })
            return defferd.promise
        }
    }
});