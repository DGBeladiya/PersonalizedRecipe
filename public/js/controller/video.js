angular.module("PRApp").controller("videoController", function ($scope,
    DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder,recipeService,
    videoService, $timeout) {
    $scope.categoryList = []
    $scope.vm = {};
    $scope.vm.dtInstance = {};
    $scope.vm.dtColumnDefs = [DTColumnDefBuilder.newColumnDef(2).notSortable()];
    $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
        .withOption('paging', true)
        .withOption('searching', true)
        .withOption('info', true)
        .withOption('dom', 'Bfrtip')
        .withButtons([
            {
                extend: 'copy',
                text: '<button class="btn btn-info">Copy</button>',
                titleAttr: 'Copy'
            },
            {
                extend: 'excel',
                text: '<button class="btn btn-info">Excel</button>',
                titleAttr: 'Excel'
            },
            {
                extend: 'print',
                text: '<button class="btn btn-info">Print</button>',
                titleAttr: 'Print'
            },
            {
                extend: 'pdf',
                text: '<button class="btn btn-info">PDF</button>',
                titleAttr: 'Pdf'
            }
        ]);



    var errorMsg = false;
    var successMsg = false;
    $scope.mode = false;

    $scope.image;
    $scope.video = { title: "", link: "", category: "" }
    $scope.videoList = [];
    $scope.errors = { title: "", link: "", image: "", category: "" }
    recipeService.getCategoryName().then((answer) => { console.log(answer.data); $scope.categoryList = answer.data },
    (error) => { })
    $scope.getData = () => {
        videoService.getList().then(
            (result) => {
                $scope.videoList = result.data
            },
            (error) => {

            })
    };
    $scope.getData();
    $scope.createVideo = () => {


        var formData = new FormData();
        formData.append("image", $scope.image);
        formData.append("title", $scope.video.title);
        formData.append("link", $scope.video.link);
        formData.append("category", $scope.video.category.name)
        videoService.create(formData)
            .then(
                (answer) => {
                    $scope.errorMsg = false;
                    $scope.successMsg = true;
                    $scope.video = { title: "", link: "", category: "" }
                    $scope.video = { title: "", link: "", category: "" }
                    $scope.errors = {};
                    $scope.videoList = [];
                    $timeout(() => { $scope.getData() }, 1000);
                },
                (error) => {
                    $scope.errorMsg = true;
                    $scope.successMsg = false;
                    $scope.errors = error.errors
                });
    }
    $scope.removeVideo = (video) => {
        videoService.removeVideo({ "_id": video._id });
        $scope.videoList = [];
        $timeout(() => { $scope.getData() }, 1000);
    }
    $scope.loadUpdateData = (video) => {
        $scope.mode = true;
        $scope.video.title = video.title;
        $scope.video.link = video.link;
        $scope.video.category = video.category;
        $scope.video._id = video._id;
    }
    $scope.updateVideo = () => {
        var _id = $scope.video._id;

        var updatedVideo = $scope.video;
        var requestPayload = {
            query: { "_id": _id }, newValue: {
                title: updatedVideo.title,
                link: updatedVideo.link,
                category: updatedVideo.category.name,
            }
        }

        videoService.updateVideo(requestPayload).then(
            (answer) => {
                $scope.errorMsg = false;
                $scope.successMsg = true;
                $scope.video = { title: "", link: "", category: "" }

                $scope.errors = {};
                $scope.videoList = [];
                $scope.mode = false;
                $timeout(() => { $scope.getData() }, 1000);
            },
            (error) => {
                $scope.errorMsg = true;
                $scope.successMsg = false;
                $scope.errors = error.errors
            });
    }
});