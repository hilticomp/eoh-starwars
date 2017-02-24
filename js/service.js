var App = angular.module('starwars.controllers', ['ngCordova']);

App.service('WebService', function($http) {

  this.pages = [];
  this.getPeople = page => {
    page = page || 1;
    if(!this.pages[page]) { 
      $http.get(`http://swapi.co/api/people/?page=${page}`)
      .then(res => {
        if(!this.count) {
          this.count = res.data.count;
          this.totalPages = Math.ceil(this.count / 10);
          this.pageNumbers = Array(this.totalPages).fill(1).map(function(item, index) {
            return index + 1;
          });
        }
    
        this.pages[page] = res.data.results;
        
          
      }, err => {
        console.error('WebService error:', err);
      });
    }
  };

//TODO
 this.getSearch = (page,searchTerm) => {
    page = page || 1;
    searchTerm = 'luk'; //searchTerm;
    if(!this.pages[page]) { 
      $http.get(`http://swapi.co/api/people/?page=${page}&search=${searchTerm}`)
      .then(res => {
        if(!this.count) {
          this.count = res.data.count;
          this.totalPages = Math.ceil(this.count / 10);
          this.pageNumbers = Array(this.totalPages).fill(1).map(function(item, index) {
            return index + 1;
          });
        }
    
        this.pages[page] = res.data.results;
          
      }, err => {
        console.error('WebService error:', err);
      });
    }
  };
    
  this.getPerson = personUrl => {
         
      $http.get(`${personUrl}`)
      .then(res => {
    
        this.person = res.data;
       
        $http.get(`${this.person.species[0]}`).then(res => {
    
        this.person.species = res.data;
 
        }, err => {
            console.error('WebService error:', err);
        }); 
          
        $http.get(`${this.person.homeworld}`).then(res => {
    
        this.person.homeworld = res.data;
 
        }, err => {
            console.error('WebService error:', err);
        });  
              
      }, err => {
        console.error('WebService error:', err);
      });
    
  };
    
  this.getHomeworld = homeworldUrl => {
         
      $http.get(`${homeworldUrl}`)
      .then(res => {
    
         this.homeworld = res.data; 
            
              
      }, err => {
        console.error('WebService error:', err);
      });
    
  };
    
      
});
