angular.module("PRApp").service("userService", function ($http, $q) {

    return {
        create: (formData) => {
            var defferd = $q.defer()
            if (true) {
                $http({
                    method: "post", data: formData, url: "/user",
                    headers: { "Content-Type": "application/json" }
                }).success((data) => {
                    defferd.resolve(data);
                }).error((error) => {
                    console.log(error)
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
                    method: "get", url: "/user",
                    headers: { "Content-Type": undefined }
                }).success((data) => {
                    defferd.resolve(data);
                }).error((error) => {

                    defferd.reject(error);
                });
            }
            return defferd.promise
        },
        removeUser: (xData) => {
            var defferd = $q.defer()
            if (true) {
                $http({
                    method: "delete", url: "/user", data: xData,
                    headers: { "Content-Type": "application/json" }
                }).success((data) => {
                    defferd.resolve(data);
                }).error((error) => {

                    defferd.reject(error);
                });
            }
            return defferd.promise
        },
        updateUser: (xData) => {
            var defferd = $q.defer()
            if (true) {
                $http({
                    method: "put", url: "/user", data: xData,
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