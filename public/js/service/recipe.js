angular.module("PRApp").service("recipeService", function ($q, $http) {
    return {
        createRecipe: (formData) => {
            var defered = $q.defer();

            $http({
                method: "post", url: "/recipe", data: formData, headers: { "Content-Type": undefined }
            }).success((data) => {
                defered.resolve(data)
            }).error((error) => {
                defered.reject(error)
            })
            return defered.promise

        },
        getData: () => {
            var defered = $q.defer();

            $http({
                method: "post", url: "/recipe", data: formData, headers: { "Content-Type": undefined }
            }).success((data) => {
                defered.resolve(data)
            }).error((error) => {
                defered.reject(error)
            })
            return defered.promise
        }
    }
});