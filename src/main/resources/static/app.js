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

	.when('/viewprofile', {
		templateUrl: 'viewprofile.html',
		controller: 'viewprofilectrl'
	})
	
	.when('/editprofile', {
		templateUrl: 'editprofile.html',
		controller: 'editprofilectrl'
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
	.when('/viewhistory/:id',{
		templateUrl:'viewhistory.html',
		controller:'viewhistoryctrl'
	})
	
	.when('/issuebook', {
		templateUrl: 'issuebook.html',
		controller: 'issuebookctrl'
	})
	.when('/track', {
		templateUrl: 'track.html',
		controller: 'trackctrl'
	})
	.when('/accesshistory', {
		templateUrl: 'accesshistory.html',
		controller: 'accesshistoryctrl'
	})
	.when('/viewbook/:categoryId', {
		templateUrl: 'viewbookbycategory.html',
		controller: 'viewbookctrl'
	})
	.when('/returnbook', {
		templateUrl: 'return.html',
		controller: 'returnbookctrl'
	})
	.when('/editcategory/:categoryId', {
		templateUrl: 'editcategory.html',
		controller: 'editcategoryctrl'
	})
	.when('/viewcopy/:bookid', {
		templateUrl: 'viewBook.html',
		controller: 'viewcopyctrl'
	})
	.when('/mybooks', {
		templateUrl: 'mybooks.html',
		controller: 'viewmybooksctrl'
	})

	.when('/index', {
		templateUrl: 'index.html',
		controller: 'animationctrl'
	})

	.otherwise({
	 redirectTo: '/view'
	 });
}]);


app.controller('viewbooks', [ '$scope','$rootScope','$http',  '$routeParams', function($scope, $rootScope, $http, $routeParams) {

	$scope.title = 'List of Books';

	$http({
		method : 'GET',
		url : '/books',
		/*
		 * headers : { 'Authorization' : 'Basic ' + encodedAuthData }
		 */
	}).then(function(response) {
		$rootScope.books= response.data;
	});

} ])


app.controller('viewmybooksctrl', [ '$scope','$rootScope','$http',  '$routeParams', function($scope, $rootScope, $http, $routeParams) {

	$scope.title = 'My Books';

	$http({
		method : 'GET',
		url : '/viewmybooks',
		/*
		 * headers : { 'Authorization' : 'Basic ' + encodedAuthData }
		 */
	}).then(function(response) {
		$rootScope.mybooks= response.data;
	});
	
	/*
	 * $http({ method : 'GET', url : '/bookdetails', headers : { 'Authorization' :
	 * 'Basic ' + encodedAuthData } }).then(function(response) {
	 * $rootScope.mybookdetails= response.data; });
	 */
} ])



app.controller('addbookctrl', [ '$scope','$rootScope', '$http', function($scope,$rootScope, $http) {
	$scope.title = 'Add new Book!';
	$rootScope.books= {};
	$http({
		method : 'GET',
		url :'/categories',
	}).then(function(response) {
		$rootScope.categories = response.data;
	})
	
	$scope.savebook=function()
	{
		$http({
			method: 'POST',
			url : '/addBook',
			data : $rootScope.books
		}).then(function(response){
			if(response.data.status){
				alert('book Added Successfully!');
				$rootScope.books= {};
				} else {
				alert('book Addition Failed!');
			}
		})
	}

}])


app.controller('animationctrl', [ '$scope','$rootScope', '$http', function($scope,$rootScope, $http) {
		$scope.title = 'hai welcome to LBS!';
	
		
		
		}])
       //controller to view a member's profile and notifications
		app.controller('viewprofilectrl', [ '$scope','$rootScope', '$http', function($scope,$rootScope, $http) {
		$scope.title = 'hai welcome to profile!';
	
		
		
		}])
		//controller to edit a member's profile
		app.controller('editprofilectrl', [ '$scope','$rootScope', '$http', function($scope,$rootScope, $http) {
		$scope.title = 'Edit your profile!';
	
		
		
		}])
		
		app.controller('returnbookctrl', [ '$scope','$rootScope', '$http', function($scope,$rootScope, $http) {
		$scope.title = 'clerk can return book here!';
		$http({
			method : 'GET',
			url : '/bookdetails',
			/*
			 * headers : { 'Authorization' : 'Basic ' + encodedAuthData }
			 */
		}).then(function(response) {
			$rootScope.bookdetails= response.data;
		});

		
		
		}])

app.controller('editcategoryctrl', [ '$scope','$rootScope','$http',  '$routeParams', function($scope, $rootScope, $http, $routeParams) {

	
	$http({
		method : 'GET',
		url :'/categories',
	}).then(function(response) {
		$rootScope.categories = angular.copy(response.data);
	});

$scope.editCategory=function(){
	$http({
		method : 'POST',
		url : '/editCategory/',
		data : $rootScope.categories
	}).then(function(response) {
		if(response.data.status){
			alert('Category edited Successfully!');
		}
		else {
			alert('Category editing Failed!');
		}
	});
}

} ])
app.controller('viewhistoryctrl', [ '$scope','$rootScope','$http',  '$routeParams', function($scope, $rootScope, $http, $routeParams) {

	
	$http({
		method : 'GET',
		url :'/member/'+ $routeParams.memid,
	}).then(function(response) {
		$rootScope.track = response.data;
	});



} ])



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


//controller for viewing fines and adding a new fine rule
app.controller('viewfinectrl', [ '$scope','$rootScope','$http',  '$routeParams', function($scope, $rootScope, $http, $routeParams) {


//get all fine rules from fines table
	$http({
		method : 'GET',
		url : '/viewfine',

	}).then(function(response) {
		$rootScope.finesview = response.data;
	});
	
	//post a  fine rules to fines table
	$scope.addfinerule=function(){
		$http({
			method : 'POST',
			url : '/addfinerule',
			data : $rootScope.finesview
		}).then(function(response) {
			if(response.data.status){
				alert('finerule Added Successfully!');
			}
			else {
				alert('finerule Addition Failed!');
			}
		});
	}

} ])

//no idea
app.controller('trackctrl', [ '$scope','$rootScope','$http', function($scope, $rootScope, $http) {

	$http({
		
		method : 'GET',
		url : '/track',


	}).then(function(response) {
		$rootScope.track = response.data;
	});

} ])

//modal for edit a fine rule
app.controller('editfinectrl', [ '$scope','$rootScope','$http',  '$routeParams', function($scope, $rootScope, $http, $routeParams) {

	
	$http({
		method : 'GET',
		url :'/viewfine',
	}).then(function(response) {
		$rootScope.fines = angular.copy(response.data);
	});

$scope.editCategory=function(){
	$http({
		method : 'POST',
		url : '/editfine',
		data : $rootScope.categories
	}).then(function(response) {
		if(response.data.status){
			alert('Category edited Successfully!');
		}
		else {
			alert('Category editing Failed!');
		}
	});
}

} ])


//controller to issue a book
app.controller('issuebookctrl', [ '$scope','$rootScope','$http', function($scope, $rootScope, $http) {
$scope.state={};
	
	$http({
		method : 'GET',
		url : '/books',
		/*
		 * headers : { 'Authorization' : 'Basic ' + encodedAuthData }
		 */
	}).then(function(response) {
		$rootScope.books= response.data;
	});
	$scope.fetchbytitle=function()
	{
		
	// var status=$scope.state.title;
		$http({
			method : 'GET',
			url : '/searchbytitle/'+$scope.state.title,
			/*
			 * headers : { 'Authorization' : 'Basic ' + encodedAuthData }
			 */
		}).then(function(response) {
			$rootScope.books= response.data;
		});
	}
	
	$rootScope.bookdetail={};
	$scope.issueBook=function(){
		$http({
			method : 'POST',
			url : '/abc',
			data:$rootScope.bookdetail


		}).then(function(response) {
			if(response.data.status){
				alert('issued Successfully!');
				$rootScope.bookdetail={};
				$rootScope.books={};
			}
			else {
				alert('issuing Failed!');
			}
		});
	}
} ]);

//controller to search a member to access history
app.controller('accesshistoryctrl', [ '$scope','$rootScope','$http', function($scope, $rootScope, $http) {

	$http({
		method : 'GET',
		url : '/members',

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



/*controller to view each book and copies,add a copy*/
app.controller('viewcopyctrl', [ '$scope','$rootScope','$http',  '$routeParams', function($scope, $rootScope, $http, $routeParams) {

	$scope.title = 'Copies of book';

	$http({
		method : 'GET',
		url :'/book/'+ $routeParams.bookid,
	}).then(function(response) {
		$rootScope.x = response.data;
	});

	
	$scope.delete=function(quantity)
	{
		$rootScope.x.quantity.splice(indexOf(quantity),1);
		  $http.delete('/deletecopy'+quantity.accountid)
          .success(function (data, status, headers) {
              alert("deleted successfully");
          })
          .error(function (data, status, header, config) {
              alert("deleted failed");
          });
	}

} ])
