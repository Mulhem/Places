'use strict';

angular.module('myApp.view1', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view1', {
      templateUrl: 'view1/view1.html',
      controller: 'View1Ctrl'
    });
  }])

  .controller('View1Ctrl', Ctrl);

function Ctrl($scope, $timeout) {
  $scope.service = new google.maps.places.PlacesService($('#service-helper').get(0));
  var center = new google.maps.LatLng(56.1304, 106.3468);

  var placesInCanada = function (place) {
    return place.formatted_address.indexOf("Canada") > 0;
  };

  var mapPlaces = function (place) {
    return {
      name: place.name,
      formatted_address: place.formatted_address
    };
  };

  function renderResults(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      $timeout(function () {
        $scope.results = results.map(mapPlaces).filter(placesInCanada);
      });

      if (results.length < 1) {
        alert("No results.");
      }
    } else {
      alert("No results.");
    }
  }

  var drequest = {
    placeId: 'ChIJFTbbfkCuEmsRRU49dFa6cAI'
  };
  $scope.service.getDetails(drequest, callback1);

  function callback1(place, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      console.log(place);
    }
  }

  $scope.search = function () {
    var request = {
      // location: center,
      // radius: 50000,
      query: $scope.searchText + " in Canada",
      name: $scope.searchText
    };

    $scope.service.textSearch(request, renderResults);
  };
};