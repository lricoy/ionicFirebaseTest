// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'firebase'])

.factory('Items', ['$firebaseArray', function($firebaseArray){
  var itemsRef = new Firebase('https://coy-test.firebaseio.com/items');
  return $firebaseArray(itemsRef);
}])

.controller('ListCtrl', function($scope, $ionicListDelegate, $ionicLoading, Items) {

  $ionicLoading.show();

  $scope.items = Items;
  $scope.items.$loaded()
    .then(function(x){
      $ionicLoading.hide();
    });

  $scope.addItem = function() {
    var name = prompt('What do you need to buy?');
    if(name) {
      $scope.items.$add({
        'name': name
      });
    }
  };

  $scope.deleteItem = function(item) {
    var itemRef = new Firebase('https://coy-test.firebaseio.com/items/'+
        item.$id);
    itemRef.remove();
    $ionicListDelegate.closeOptionButtons();
  };

  $scope.purchaseItem = function(item) {
    var itemRef = new Firebase('https://coy-test.firebaseio.com/items/'+
        item.$id);
    itemRef.child('status').set('purchased');
    $ionicListDelegate.closeOptionButtons();
  };

  $scope.fbLogin = function() {
    var ref = new Firebase('https://coy-test.firebaseio.com/items');
    ref.authWithOAuthPopup("facebook", function(error, authData) {
      if (error) {
        alert("Login Failed!", error);
      } else {
        alert("Authenticated successfully with payload:", authData);
      }
    });
  };

})
