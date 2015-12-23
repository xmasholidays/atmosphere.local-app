angular.module('starter.controllers', ['starter.services', 'starter.directives'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, atmlocalclient, toaster) {

  toaster.configure({
    positionClass: "toast-bottom-right"
  });

})

.controller('AudiosCtrl', function($scope, atmlocalclient, debounce, toaster) {

  $scope.audios = [];

  $scope.toasted = false;
  atmlocalclient.getAudios()
  .success(function (data) {
    console.log($scope.audios);
    $scope.audios = data;
  })
  .error(function (error) {
    if($scope.toasted == false){
      toaster.error("Unable to load audios. Retry.");
      $scope.toasted = true;
    }
  });

});
