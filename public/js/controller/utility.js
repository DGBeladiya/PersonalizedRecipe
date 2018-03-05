angular.module("PRApp").controller("utilityController", function ($scope, utilityService) {
    $scope.unApproveCount;
    $scope.getUnApproveCountFn=()=>{
       
        utilityService.getUnApproveCount().
        then(
            (answer) => {
           //     console.log(anwser)
                $scope.unApproveCount = answer.data.unApproveCount;
            },
            (error) => {

            });
    }
    $scope.getUnApproveCountFn()
  
}).service("utilityService", function($q, $http) {
    return {
        getUnApproveCount: () => {
           
            var defered = $q.defer();
            $http({ method: "get", url: "/recipe/getUnApproveCount" })
                .success((result) => {
                    defered.resolve(result);
                })
                .error((err) => {
                    defered.reject(err);
                })
            return defered.promise;
        }
    }
});