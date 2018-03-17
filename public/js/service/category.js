angular.module("PRApp").service("categoryService", function ($http, $q) {

    return {
        create: (formData) => {
            var defferd = $q.defer()
            if (true) {
                $http({
                    method: "post", data: formData, url: "/category",
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
                    method: "get", url: "/category",
                    headers: { "Content-Type": undefined }
                }).success((data) => {
                    defferd.resolve(data);
                }).error((error) => {

                    defferd.reject(error);
                });
            }
            return defferd.promise
        },
        removeCategory: (xData) => {
            var defferd = $q.defer()
            if (true) {
                $http({
                    method: "delete", url: "/category", data: xData,
                    headers: { "Content-Type": "application/json" }
                }).success((data) => {
                    defferd.resolve(data);
                }).error((error) => {

                    defferd.reject(error);
                });
            }
            return defferd.promise
        },
        updateCategory: (xData) => {
            var defferd = $q.defer()
            if (true) {
                $http({
                    method: "put", url: "/category", data: xData,
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