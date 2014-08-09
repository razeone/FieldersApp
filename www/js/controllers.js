angular.module('starter.controllers', [])

.controller('MainCtrl', function($scope) {
	$scope.banner = 'img/offer.jpg'
})

.controller('TasksCtrl', function($scope, Tasks) {
  $scope.tasks = Tasks.all();
})

.controller('TaskDetailCtrl', function($scope, $stateParams, Tasks) {
  $scope.task = Tasks.get($stateParams.taskId);
})

.controller('MapCtrl', function($scope, $ionicLoading, $compile, $http) {
      function initialize() {

        var myLatlng = new google.maps.LatLng(19.435219, -99.166574);
        
        var mapOptions = {
          center: myLatlng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"),
            mapOptions);
        
        //Marker + infowindow + angularjs compiled ng-click
        var contentString = "<div><a ng-click='clickTest()'>Aquí está usted</a></div>";
        var compiled = $compile(contentString)($scope);

        var infowindow = new google.maps.InfoWindow({
          content: compiled[0]
        });

        var marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          title: 'Uluru (Ayers Rock)'
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map,marker);
        });

        $scope.map = map;
      }
      google.maps.event.addDomListener(window, 'load', initialize);
      
      $scope.centerOnMe = function() {
        if(!$scope.map) {
          return;
        }

        $scope.loading = $ionicLoading.show({
          content: 'Obteniendo locación...',
          showBackdrop: false
        });

        navigator.geolocation.getCurrentPosition(function(pos) {
          $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
          $scope.loading = $ionicLoading.hide();
          $scope.lat = pos.coords.latitude
          $scope.lng = pos.coords.longitude
        }, function(error) {
          alert('No fue posible obtener la ubicación: ' + error.message);
        });
      };

      $scope.getPoints = function(){
        $scope.centerOnMe();

        var request = $http({
        	method: "get",
        	url: "http://10.105.116.56:4567/getDistance",
        	data: {
        		latitud: $scope.lat,
        		longitud: $scope.lng
        	}
        });

        request.success(function(data){
        		
        	});

        request.error(function(data){

        });

      }

      initialize();
      
    })

.controller('ConfigCtrl', function($scope) {
	// onSuccess Callback
// This method accepts a Position object, which contains the
// current GPS coordinates
//
var onSuccess = function(position) {
    alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');
};

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

navigator.geolocation.getCurrentPosition(onSuccess, onError);
});
