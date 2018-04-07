angular.module("PRApp").service("videoService", function ($http, $q) {

    return {
        create: (formData) => {
            var defferd = $q.defer()
            if (true) {
                $http({
                    method: "post", data: formData, url: "/video",
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
                    method: "get", url: "/video",
                    headers: { "Content-Type": undefined }
                }).success((data) => {
                    defferd.resolve(data);
                }).error((error) => {

                    defferd.reject(error);
                });
            }
            return defferd.promise
        },
        removeVideo: (xData) => {
            var defferd = $q.defer()
            if (true) {
                $http({
                    method: "delete", url: "/video", data: xData,
                    headers: { "Content-Type": "application/json" }
                }).success((data) => {
                    defferd.resolve(data);
                }).error((error) => {

                    defferd.reject(error);
                });
            }
            return defferd.promise
        },
        updateVideo: (xData) => {
            var defferd = $q.defer()
            if (true) {
                $http({
                    method: "put", url: "/video", data: xData,
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