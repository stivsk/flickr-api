(function(){
	'use strict';

	var app = angular.module('ELearning',['ngRoute','ngMaterial']);
	
	app.controller('homeController', ['$scope', '$http', function($scope, $http){
		
		$scope.results = searchResults;
		$scope.isSearching = false;

		$scope.search = function(){
			$scope.isSearching = true;

			$http({
				method: 'GET',
				url: 'https://api.flickr.com/services/rest',
				params : {
					method: 'flickr.photos.search',
					api_key: 'e800dda35c47d58eaa53cc4a9b91b5ee',
					text: $scope.searchTerm,
					format: 'json',
					nojsoncallback:1
				}
			}).success(function(data){
				$scope.results = data;
				$scope.isSearching = false;
			}).error(function(error){
				console.log(error);
				$scope.isSearching = false;
			});
		};

	}]);

	app.config(function($routeProvider) {
		$routeProvider
			.when('/',{
				templateUrl: 'app/components/home/homeView.html',
				controller : 'homeController'
			})
	});


})();