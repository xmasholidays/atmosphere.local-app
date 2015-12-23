angular.module('starter.directives',[])
  .directive('focusMe', function ($timeout) {
    return {
      link: function(scope, element, attrs) {
        scope.$watch(attrs.focusMe, function(value) {
          if(value === true) {
            $timeout(function() {
              element[0].focus();
            });
          }
        });
      }
    };
  })
  .directive('fallbackSrc', function () {
    return {
      link: function postLink(scope, element, attrs) {
        element.bind('error', function () {
          angular.element(this).attr("src", attrs.fallbackSrc);
        });
      }
    }
  });