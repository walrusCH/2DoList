var ToDoList = angular.module('ToDoList',[]);

ToDoList.controller('mainController',function($scope, $http){
	$scope.formData = {};

	$http.get('/todos')
		.success(function(data) {
			$scope.todos = data;
			console.log(data);
		})
	.error(function(data) {
		console.log('Error: ' + data);
	});

	$scope.createTodo = function() {
		$http.post('/todos', $scope.formData)
		.success(function(data) {
			$scope.todos.push(data);
			$scope.formData='';
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		})
	};

	$scope.deleteTodo = function(id) {
		$http.delete('/todos/' + id)
		.success(function(data) {
			$scope.todos = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	};
});





