var app = angular.module("HttpApp");

app.service("toDoService", function($http) {
    var baseUrl = "https://mean.codingcamp.us/tanner/todo/"


    this.getTodos = function() {
        return $http.get(baseUrl).then(function(response) {
            response.data.forEach(function(task) {
                task.isBeingEdited = false;
            });
            return response.data;
        })
    }


});