
angular.module('starwars', ['ionic', 'starwars.controllers','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $compileProvider) {

  $stateProvider.state('people', {
    url: '/people/:page',
    templateUrl: 'templates/people.html',
    controller: 'peopleCtrl'
  }).state('person', {
    url: '/person/:personUrl',
    templateUrl: 'templates/person.html',
    controller: 'personCtrl'
  }).state('homeworld', {
    url: '/homeworld/:homeworldUrl',
    templateUrl: 'templates/homeworld.html',
    controller: 'homeworldCtrl'
  }).state('search', {
    url: '/search/:keyword',
    templateUrl: 'templates/search.html',
    controller: 'searchCtrl'
  }).state('nearme', {
    url: '/nearme',
    templateUrl: 'templates/nearme.html',
    controller: 'nearmeCtrl'
  });
    
  $urlRouterProvider.otherwise('/people/');
});

