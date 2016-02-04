var app = angular.module('app', ['ngRoute']);
app.config(['$routeProvider','$httpProvider',
         function($routeProvider,$httpProvider) {
	$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
           $routeProvider
             .when('/home', {
               templateUrl: 'book.html',
               controller: 'viewbooks'
             })
             .when('/add', {
               templateUrl: 'addcategory.html',
               controller: 'addcategoryctrl'
             })
              .when('/add1', {
               templateUrl: 'addbook.html',
               controller: 'addbookctrl'
             })
             .when('/edit/:id',{
            	  templateUrl: 'editbook.html',
               controller: 'editbook'
             })
              .when('/view', {
               templateUrl: 'viewcategory.html',
               controller: 'viewcategories'
             })
             .when('/fine', {
               templateUrl: 'fine.html',
               controller: 'viewfinectrl'
             })
            //  .otherwise({
             // redirectTo: '/view'
            // });
         }]);


app.controller('viewbooks', [ '$scope','$rootScope','$http',  '$routeParams', function($scope, $rootScope, $http, $routeParams) {

	$scope.title = 'List of Courses';

		$http({
			method : 'GET',
			url : '/books',
			/*headers : {
				'Authorization' : 'Basic ' + encodedAuthData
			}*/
		}).then(function(response) {
			$rootScope.books= response.data;
		});

} ])



	
	app.controller('addbookctrl', [ '$scope','$rootScope', '$http', function($scope,$rootScope, $http) {
			$scope.title = 'Add new Task!';
	$rootScope.books= {};
	$scope.savebook=function()
	{
		$http({
			method: 'POST',
			url : '/savecourse',
			
			data : $rootScope.books
			
		}).then(function(response){
			if(response.data.status){
				alert('book Added Successfully!');
				$rootScope.course = {};
			} else {
				alert('book Addition Failed!');
			}
		})
	}
	
	}])
	
	
	
	app.controller('viewcategories', [ '$scope','$rootScope','$http',  '$routeParams', function($scope, $rootScope, $http, $routeParams) {

	$scope.title = 'List of Categories';

		$http({
			method : 'GET',
			url :'/viewcategories',
			/*headers : {
				'Authorization' : 'Basic ' + encodedAuthData
			}*/
		}).then(function(response) {
			$rootScope.categories = response.data;
		});
		
		

} ])





app.controller('addcategoryctrl', [ '$scope','$rootScope','$http',  '$routeParams', function($scope, $rootScope, $http, $routeParams) {

	$rootScope.categories={};
$scope.addcategory=function(){
		$http({
			method : 'GET',
			url : '/addcategory',
			data:$rootScope.categories
			/*headers : {
				'Authorization' : 'Basic ' + encodedAuthData
			}*/
		}).then(function(response) {
			$rootScope.course = response.data;
		});
}
} ])


	
	
	app.controller('viewfinectrl', [ '$scope','$rootScope','$http',  '$routeParams', function($scope, $rootScope, $http, $routeParams) {


$scope.viewfine=function(){
		$http({
			method : 'GET',
			url : '/viewfine',
		
			/*headers : {
				'Authorization' : 'Basic ' + encodedAuthData
			}*/
		}).then(function(response) {
			$rootScope.fine = response.data;
		});
}
} ])

