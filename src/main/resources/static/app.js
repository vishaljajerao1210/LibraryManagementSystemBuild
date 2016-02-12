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

	.when('/new', {
		templateUrl: 'newbook.html',
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
	.when('/issuebook', {
		templateUrl: 'issuebook.html',
		controller: 'issuebookctrl'
	})
	.when('/track', {
		templateUrl: 'track.html',
		controller: 'trackctrl'
	})
	.when('/history', {
		templateUrl: 'History.html',
		controller: 'chistoryctrl'
	})
	.when('/viewbook/:categoryId', {
		templateUrl: 'viewbook.html',
		controller: 'viewbookctrl'
	})

	// .otherwise({
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
	$scope.title = 'Add new Book!';
	$rootScope.books= {};

	
	$http({
		method : 'GET',
		url :'/categories',
	}).then(function(response) {
		$rootScope.categories = response.data;
	});

	
	$scope.savebook=function()
	{
		$http({
			method: 'POST',
			url : '/addBook',
			data : $rootScope.books
		}).then(function(response){
			if(response.data.status){
				alert('book Added Successfully!');
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
		url :'/categories',
	}).then(function(response) {
		$rootScope.categories = response.data;
	});



} ])

app.controller('addcategoryctrl', [ '$scope','$rootScope','$http',  '$routeParams', function($scope, $rootScope, $http, $routeParams) {


	$rootScope.categories={};
	$scope.addcategory=function(){
		$http({
			method : 'POST',
			url : '/addCategory',
			data : $rootScope.categories
		}).then(function(response) {
			if(response.data.status){
				alert('Category Added Successfully!');
			}
			else {
				alert('Category Addition Failed!');
			}
		});
	}
} ])



app.controller('viewfinectrl', [ '$scope','$rootScope','$http',  '$routeParams', function($scope, $rootScope, $http, $routeParams) {



	$http({
		method : 'GET',
		url : '/viewfine',

	}).then(function(response) {
		$rootScope.finesview = response.data;
	});

} ])

app.controller('trackctrl', [ '$scope','$rootScope','$http', function($scope, $rootScope, $http) {



	$http({
		method : 'GET',
		url : '/track',


	}).then(function(response) {
		$rootScope.track = response.data;
	});

} ])

app.controller('issuebookctrl', [ '$scope','$rootScope','$http', function($scope, $rootScope, $http) {

	$rootScope.bookdetail={};
	$scope.addcategory=function(){
		$http({
			method : 'POST',
			url : '/issuebook',
			data:$rootScope.bookdetail


		}).then(function(response) {
			$rootScope.issue = response.data;
		});
	}
} ]);

app.controller('chistoryctrl', [ '$scope','$rootScope','$http', function($scope, $rootScope, $http) {



	$http({
		method : 'GET',
		url : '/member',

	}).then(function(response) {
		$rootScope.history = response.data;
	});

} ])

app.controller('viewbookctrl', [ '$scope','$rootScope','$http',  '$routeParams', function($scope, $rootScope, $http, $routeParams) {

	$scope.title = 'List of Books..!';

	$http({
		method : 'GET',
		url :'/categories',
	}).then(function(response) {
		$rootScope.categories = response.data;
	});

	$scope.index=$rootScope.categories[$routeParams.categoryId];

} ])

