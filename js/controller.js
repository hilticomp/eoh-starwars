var App = angular.module('starwars');

App.controller('peopleCtrl', function($scope,$http, $ionicModal,$rootScope,$window, $location,$timeout,$state,WebService,$ionicLoading,$ionicPopup) {

      var page = parseInt($state.params.page) || 1;

      WebService.getPeople(page);

      $scope.$watch(function() {

        return WebService.pages[page];
      }, function(currentPeople, prevPeople) {

        $scope.people = currentPeople;
      });

      $scope.$watch(function() {
        return WebService.pageNumbers;
      }, function(pageNumbers) {
        $scope.pageNumbers = pageNumbers;
      });


});

App.controller('searchCtrl', function($scope,$http, $ionicModal,$rootScope,$window, $location,$timeout,$state,WebService,$ionicLoading,$ionicPopup) {

      var page = parseInt($state.params.page) || 1;
      var searchTerm = $state.params.searchTerm;

      WebService.getSearch(page,searchTerm);

      $scope.$watch(function() {

        return WebService.pages[page];
      }, function(currentPeople, prevPeople) {

        $scope.people = prevPeople;
      });

      $scope.$watch(function() {
        return WebService.pageNumbers;
      }, function(pageNumbers) {
        $scope.pageNumbers = pageNumbers;
      });


});

App.controller('personCtrl', function($scope,$http, $ionicModal,$rootScope,$window, $location,$timeout,$state,WebService,$ionicLoading,$ionicPopup) {
  
      var url = $state.params.personUrl;
    
      WebService.getPerson(url);
    
      $scope.$watch(function() {
        return WebService.person;
      }, function(person) {
        $scope.person = person;
        console.log($scope.person);
      });

      $scope.goBack = function(){
        $ionicHistory.goBack();
      }    
  
});


App.controller('homeworldCtrl', function($scope,$http, $ionicModal,$rootScope,$window, $location,$timeout,$state,WebService,$ionicLoading,$ionicPopup) {
  
      var url = $state.params.homeworldUrl;
    
      WebService.getHomeworld(url);
    
      $scope.$watch(function() {
        return WebService.homeworld;
      }, function(homeworld) {
        $scope.homeworld = homeworld;
        console.log($scope.homeworld);
      });

      $scope.goBack = function(){
        $ionicHistory.goBack();
      }    
  
});

App.controller('nearmeCtrl', function($scope,$http, $ionicModal,$rootScope,$window, $location,$timeout,$state,WebService,$ionicLoading,$ionicPopup) {
  
        $scope.markers = [];
    
        navigator.geolocation.getCurrentPosition(function (position) {
      
         var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            
         var mapOptions = {
              center: latLng,
              zoom: 12,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            };
 
        $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
      
            //Wait until the map is loaded
            google.maps.event.addListenerOnce($scope.map, 'idle', function(){
                    
          //TO DO add this to a config file
          var nearbysearchapiEndPoint ='https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=';

          $scope.API = nearbysearchapiEndPoint + position.coords.latitude + "," + position.coords.longitude + "&radius=10000&type=comic store&key=AIzaSyD8Or6tO3h801EW-QtIDI_VG-93B5OnoIM"; //TODO add the key to the config file
                
          $http.get($scope.API).success(function (response) {

                        $scope.locations = response.results;

                        $.each($scope.locations, function (index, value) {
                            
                        var latLng = new google.maps.LatLng($scope.locations[index].geometry.location.lat, $scope.locations[index].geometry.location.lng);
                            
                         var marker =  new google.maps.Marker({
                            map: $scope.map,
                            animation: google.maps.Animation.DROP,
                            position: latLng,
                            title: $scope.locations[index].name
                          });  
                            
                        var direction = 'http://maps.google.com/maps?saddr=' + position.coords.latitude + "," + position.coords.longitude + "&daddr=" + $scope.locations[index].geometry.location.lat + "," + $scope.locations[index].geometry.location.lng;
                            
                        var infoWindow = new google.maps.InfoWindow({
                            content: $scope.locations[index].name + "<br><a class=\"button get-directions\" data-marker=\"{{ infoWindow.id }}\" href="+ direction+ ">Get Directions</a>"
                        });
                            
                          google.maps.event.addListener(marker, 'click', function () {
                            infoWindow.open($scope.map, marker);
                        });
                            
                        });

          });

        });


         }, function (error) {

                    alert({
                        message: 'Please enable you GPS and try again.!',
                        modifier: 'material'
                    });


        }, {
                    maximumAge: Infinity,
                    timeout: 60000,
                    enableHighAccuracy: true
        });

});

App.run(function(WebService) {

  WebService.getPeople();

});
