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

	function addInfoWindow(marker, message) {
            var info = message;

            var infoWindow = new google.maps.InfoWindow({
                content: message
            });

            google.maps.event.addListener(marker, 'click', function () {
                infoWindow.open($scope.map, marker);
            });
        }

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
        var contentString = "<div><a ng-click='clickTest()'>Corporativo Telmex Parque Vía #190</a></div>";
        var compiled = $compile(contentString)($scope);

        var infowindow = new google.maps.InfoWindow({
          content: compiled[0]
        });

        var marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          icon: 'img/tmxIcon.png',
          title: 'Telmex'
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
          var myLocation = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
          var fielderMarker = new google.maps.Marker({
	          position: myLocation,
	          map: $scope.map,
	          icon: 'img/identity.png',
	          title: 'Fielder Telmex'
	        });
          $scope.loading = $ionicLoading.hide();
          $scope.lat = pos.coords.latitude;
          $scope.lng = pos.coords.longitude;
        }, function(error) {
          alert('No fue posible obtener la ubicación: ' + error.message);
        });
      };

      $scope.getPoints = function(){

      	if(!$scope.map) {
          return;
        }

        $scope.loading = $ionicLoading.show({
          content: 'Obteniendo locación...',
          showBackdrop: false
        });


      	navigator.geolocation.getCurrentPosition(function(pos) {
          $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));

          var lat = pos.coords.latitude;
          var lng = pos.coords.longitude;

          //alert(lat +" "+ lng);

          var request = $http({
        	method: "get",
        	url: "http://172.16.1.125:4567/getPoints?latitud="+lat+"&longitud="+lng
        	//url: "http://restcountries.eu/rest/v1"
        	});
          request.success(function(data){
        		//alert(data[0].nombre);
        		for(i = 0;i<data.length;i++){
					//Marker + infowindow + angularjs compiled ng-click
					var contentString = "<div><p>Nombre: "+data[i].nombre+"</p>"+
										"<p>Teléfono: "+data[i].telefono+"</p>"+
										"<p>Área: "+data[i].area+"</p>"+
										"<p>División: "+data[i].division+"</p>"+
										"<p>NPS: "+data[i].nps+"</p>"+
										"<p>Tenencia: "+data[i].paquete+"</p>"+
										"<button class='button icon ion-location button-balanced'>Respuesta Cliente</button></div>";

					//var compiled = $compile(contentString)($scope);
					//var compiled = contentString;
					var customareLocation = new google.maps.LatLng(data[i].latitud, data[i].longitud);
					var infowindow = new google.maps.InfoWindow({
						content: contentString
					});


					cMarker = new google.maps.Marker({
						position: customareLocation,
						map: $scope.map,
						title: 'Cliente '+i,
						icon: 'img/view-media-artist.png'
					});

					addInfoWindow(cMarker,contentString);
				}
        		$scope.loading = $ionicLoading.hide();

        	});

          request.error(function(data){
        	alert("Error");
        	$scope.loading = $ionicLoading.hide();
        	});
          
        }, function(error) {
        	alert('No fue posible obtener la ubicación: ' + error.message);
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
