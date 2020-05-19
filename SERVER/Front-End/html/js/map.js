function initMap() {


    
    var uluru = {lat: 45.84973, lng: 60};
    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 4, center: uluru});
    var marker = new google.maps.Marker({position: uluru, map: map});




  }