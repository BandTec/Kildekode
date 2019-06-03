document.addEventListener('DOMContentLoaded', function(){

    var target = document.querySelector('#map');
    
    navigator.geolocation.getCurrentPosition(function(position) {
  
        var latitude   = position.coords.latitude;
        var longitude  = position.coords.longitude;
        
        var coordinate = new google.maps.LatLng(latitude, longitude);
        var latitude2 = -23.5595;
        var longitude2 = -46.4053;
        var coordenadas = new google.maps.LatLng(latitude2, longitude2);
  
        console.log(latitude);
        console.log(latitude2);
  
        var optionsMap = {
                    center : coordinate,
                    zoom: 16,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
        };
  
        var map = new google.maps.Map(target, optionsMap);
  
        var configMarker = {
                             position : coordinate,
                             map : map,
                             title: "A máquina está aqui!",
                             icon: '/img/checked.png' 
                            };
  
        var configMarker2 = {
          position : coordenadas,
          map : map,
          title: "Máquina não encontrada",
          icon: '/img/cancel.png' 
        };
  
        var marker = new google.maps.Marker(configMarker);
        var marker2 = new google.maps.Marker(configMarker2);
  
    });
  });