angular.module("PRApp").service("ingredientService", function ($http, $q) {

    return {
        create: (formData) => {
            var defferd = $q.defer()
            if (true) {
                $http({
                    method: "post", data: formData, url: "/ingredient",
                    headers: { "Content-Type": undefined }
                }).success((data) => {
                    defferd.resolve(data);
                }).error((error) => {

                    defferd.reject(error);
                });
            }
            return defferd.promise
        },
        test: function () { alert("Hiii") },
        getList: () => {
            var defferd = $q.defer()
            if (true) {
                $http({
                    method: "get", url: "/ingredient",
                    headers: { "Content-Type": undefined }
                }).success((data) => {
                    defferd.resolve(data);
                }).error((error) => {

                    defferd.reject(error);
                });
            }
            return defferd.promise
        },
        removeIngredient: (xData) => {
            var defferd = $q.defer()
            if (true) {
                $http({
                    method: "delete", url: "/ingredient", data: xData,
                    headers: { "Content-Type": "application/json" }
                }).success((data) => {
                    defferd.resolve(data);
                }).error((error) => {

                    defferd.reject(error);
                });
            }
            return defferd.promise
        }
    }
});