var app = angular.module("HttpApp", []);

app.controller("MainController", ["$scope", "toDoService", "$http", function($scope, toDoService, $http) {

  $scope.toDoList = [];
  $scope.newTodo = {};
  var baseUrl = "http://mean.codingcamp.us/tanner/todo/"

  $scope.getTodos = function() {
    toDoService.getTodos().then(function(data) {
      $scope.toDoList = data;
    })
    console.log($scope.toDoList);
  }


  $scope.addToDo = function() {
    console.log($scope.newTodo);
    var newToDo = $scope.newTodo;
    $http.post(baseUrl, newToDo).then(function(result) {
      $scope.newTodo = {};
      var newTask = result.data;
      console.log(1, newTask);
      newTask.isBeingEdited = false;
      console.log(2, newTask);
      $scope.toDoList.push(newTask);
    })
  }

  $scope.updateTodo = function(task, index) {
    $http.put("http://mean.codingcamp.us/tanner/todo/" + task._id, task).then(function(result) {
      var updatedTodo = result.data;
      updatedTodo.isBeingEdited = false;
      $scope.toDoList[index] = updatedTodo;
    })
  }

  $scope.deleteToDo = function(taskId, index) {
    $http.delete(baseUrl + taskId)
      .then(function() {
        $scope.toDoList.splice(index, 1);
      })
  }

  // get todo list on page load
  $scope.getTodos();


}])