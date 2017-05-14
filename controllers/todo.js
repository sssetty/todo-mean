var todo=angular.module('todoApplication',[]);

todo.controller('todoController',function($scope,$http){
$scope.getTasks = function(){
  $http({
 method:'GET',
 url : '/todoList'
}).then(function success(response){
  console.log("response received");
  console.log(response['data']);
 $scope.List= response['data'];
 $scope.addTaskButton =false;
 $scope.updateTaskButton =true;
},function error(response){
console.log(response.status);
console.log("There was an error");
});
};

$scope.getTasks();

$scope.addTask=function(){
  console.log($scope.todo);
  $http({
    method : 'POST',
    url : '/todoList',
    data : $scope.todo
  }).then(function success(response){
    console.log("Posted data");
    $scope.todo= {};
    $scope.List={};
    $scope.getTasks();
  }).catch(function error(response){
    console.log(response.status);
  });
  };

$scope.deleteTask=function(taskID){
  console.log(taskID);
  $http({
   method : 'DELETE',
   url : '/todoList/'+taskID ,
 }).then(function success(){
   console.log("Deleted");
   $scope.List={};
   $scope.getTasks();
 }).catch(function error(response){
   console.log(response.status);
 });

};
$scope.editTask=function(id){
  $http({
 method:'GET',
 url : '/todoList/'+id
}).then(function success(response){
  console.log("response received");
  console.log(response['data']);
 $scope.todo= response['data'][0];
},function error(response){
console.log(response.status);
console.log("There was an error");
});
};

$scope.updateTask=function(id){
  $http({
    method : "PUT",
    url :'/todoList/'+id,
    data : $scope.todo
  }).then(function success(response){
    console.log("Updated");
    $scope.List={};
    $scope.todo= {};

    $scope.getTasks();
    }).catch(function error(response){
    console.log(response.status);

  });
};

$scope.disableButton=function(){
  $scope.addTaskButton =true;
  $scope.updateTaskButton =false;

};
});
