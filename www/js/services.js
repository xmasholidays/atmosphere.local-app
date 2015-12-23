angular.module('starter.services', ['angular-storage'])

  .service('toaster', function() {

    this.configure = function(options) {
      toastr.options = {
        "positionClass": options.positionClass,
      };
    }

    this.success = function (data) {
      toastr.success(data);
    };

    this.error = function (data) {
      toastr.error(data);
    };

  })

  .factory('debounce', ['$timeout','$q', function($timeout, $q) {
    return function debounce(func, wait, immediate) {
      var timeout;
      var deferred = $q.defer();
      return function() {
        var context = this;
        var args = arguments;
        var later = function() {
          timeout = null;
          if(!immediate) {
            deferred.resolve(func.apply(context, args));
            deferred = $q.defer();
          }
        };
        var callNow = immediate && !timeout;
        if ( timeout ) {
          $timeout.cancel(timeout);
        }
        timeout = $timeout(later, wait);
        if (callNow) {
          deferred.resolve(func.apply(context, args));
          deferred = $q.defer();
        }
        return deferred.promise;
      };
    };
  }])

  .provider('atmlocalclient', function() {

    var urlBase = 'http://localhost:8000/api/v1';

    this.setBaseUrl = function (baseUrl) {
      urlBase = baseUrl;
    }

    this.$get = function($http, $q, store) {
      return new AtmlocalClient($http, $q, store);
    };

    function AtmlocalClient($http, $q, store) {

      this.getAudios = function (next, search) {
        var completeUrl = urlBase + '/audios/';
        return $http.get(
          completeUrl
        );
      };

      this.sendRequest = function (id) {

      };
    }

  });
