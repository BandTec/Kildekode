function carregarLatLng(target) {
  $.ajax({
    cache: false,
    method: "get",
    url: "/latLong",
    success: function (data) {
      geolocalizacao(data, target);
    },

    error: function (e) {

    }
  });
}

document.addEventListener('DOMContentLoaded', function () {

  var target = document.querySelector('#map');
  carregarLatLng(target);

});

function geolocalizacao(data2, target){
  navigator.geolocation.getCurrentPosition(function (position) {

    var latitude = []; 
    var longitude = [];

    latitude.push(position.coords.latitude);
    longitude.push(position.coords.longitude);

    for(var i = 0; i < 5; i++){
      latitude.push(-data2[i].lat);
      longitude.push(-data2[i].lng);
    }

    var coordenadas = [];

    for(var i = 0; i < 6 ; i++) {
      coordenadas[i] = new google.maps.LatLng(latitude[i], longitude[i]);
    }

    var optionsMap = {
      center: coordenadas[0],
      zoom: 11,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(target, optionsMap);

    var configMarker = {
      position: coordenadas[0],
      map: map,
      title: "A máquina está aqui!",
      icon: '/img/checked.png'
    };

    var configMarker2 = {
      position: coordenadas[1],
      map: map,
      title: "Máquina não encontrada",
      icon: '/img/checked.png'
    };

    var configMarker3 = {
      position: coordenadas[2],
      map: map,
      title: "A máquina está aqui!",
      icon: '/img/checked.png'
    };

    var configMarker4 = {
      position: coordenadas[3],
      map: map,
      title: "A máquina está aqui!",
      icon: '/img/cancel.png'
    };

    var configMarker5 = {
      position: coordenadas[4],
      map: map,
      title: "A máquina está aqui!",
      icon: '/img/checked.png'
    };

    var configMarker6 = {
      position: coordenadas[5],
      map: map,
      title: "A máquina está aqui!",
      icon: '/img/checked.png'
    };

    var marker = new google.maps.Marker(configMarker);
    var marker2 = new google.maps.Marker(configMarker2);
    var marker3 = new google.maps.Marker(configMarker3);
    var marker4 = new google.maps.Marker(configMarker4);
    var marker5 = new google.maps.Marker(configMarker5);
    var marker6 = new google.maps.Marker(configMarker6);

  });

}