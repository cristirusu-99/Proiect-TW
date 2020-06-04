const judete = {
    AB: 'ALBA',
    AR: 'ARAD',
    AG: 'ARGES',
    BC: 'BACAU',
    BH: 'BIHOR',
    BN: 'BISTRITA-NASAUD',
    BT: 'BOTOSANI',
    BR: 'BRAILA',
    BV: 'BRASOV',
    'Municipiul București': 'BUCURESTI',
    BZ: 'BUZAU',
    CL: 'CALARASI',
    CS: 'CARAS-SEVERIN',
    CJ: 'CLUJ',
    CT: 'CONSTANTA',
    CV: 'COVASNA',
    DB: 'DAMBOVITA',
    DJ: 'DOLJ',
    GL: 'GALATI',
    GR: 'GIURGIU',
    GJ: 'GORJ',
    HR: 'HARGHITA',
    HD: 'HUNEDOARA',
    IL: 'IALOMITA',
    IS: 'IASI',
    IF: 'ILFOV',
    MM: 'MARAMURES',
    MH: 'MEHEDINTI',
    MS: 'MURES',
    NT: 'NEAMT',
    OT: 'OLT',
    PH: 'PRAHOVA',
    SJ: 'SALAJ',
    SM: 'SATU MARE',
    SB: 'SIBIU',
    SV: 'SUCEAVA',
    TR: 'TELEORMAN',
    TM: 'TIMIS',
    TL: 'TULCEA',
    VL: 'VALCEA',
    VS: 'VASLUI',
    VN: 'VRANCEA'
}

function initMap() {

    var markers = [];
    var options = {
        center: { lat: 47.174004, lng: 27.575056 },
        zoom: 15
    };
    var marker = new google.maps.Marker({
        position: options.center,
        title: "FII UAIC"
    });

    // To add the marker to the map, call setMap();
    var input = document.getElementById('search');
    var searchBox = new google.maps.places.SearchBox(input);
    var map = new google.maps.Map(document.getElementById('map'), options);

    marker.setMap(map);
    markers.push(marker);

    setInitialPoint();
    addMarkers();



    function setInitialPoint() {
        var infoWindow = new google.maps.InfoWindow;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (p) {
                var position = {
                    lat: p.coords.latitude,
                    lng: p.coords.longitude
                };

                infoWindow.setPosition(position);
                //
                geocode("latlng=" + position.lat + "," + position.lng);
                //
                infoWindow.setContent('Your location!');
                infoWindow.open(map);
                map.setCenter(position);
            }, function () {
                handleLocationError('Geolocation service failed', map.getCenter());
            });
        } else {
            handleLocationError('No geolocation available.', map.getCenter());
        }

        function handleLocationError(content, position) {
            infoWindow.setPosition(position);
            infoWindow.setContent(content);
            infoWindow.open(map);
        }
    }


    function geocode(params) {
        var judetAuto;
        fetch('https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDuvL-me_Hdt94Gep1REYrZ9QuVVtfP-sM&' + params).then(rez => {
            rez.json().then(data => {
                data.results[0].address_components.forEach(val => {
                    if (val.types[0] == "administrative_area_level_1")
                        judetAuto = val.short_name;
                });

                fetch('http://127.0.0.1:3000/api/v1/cars/count?Judet=' + judete[judetAuto], { method: 'GET' }).then(data => {
                    data.json().then(rez => {
                        console.log(rez);
                        //cod pentru bianca

                    })
                })
            })
        })
    }// geocode

    function addMarkers() {
        map.addListener('bounds_changed', function () {
            searchBox.setBounds(map.getBounds());
        });

        searchBox.addListener('places_changed', function () {

            var places = searchBox.getPlaces({ type: ["car_dealer"] });

            if (places.length == 0)
                return;

            markers.forEach(function (m) { m.setMap(null); });
            markers = [];

            var bounds = new google.maps.LatLngBounds();

            geocode("latlng=" + places[0].geometry.location.lat() + "," + places[0].geometry.location.lng());

            places.forEach(function (place) {
                console.log(place);
                if (!place.geometry)
                    return;
                var icon = {
                    url: place.icon,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(25, 25)
                };

                var infoWindow = new google.maps.InfoWindow({
                    content: createContent(place) 
                });

                let marker = new google.maps.Marker({
                    map: map,
                    //      icon: icon,
                    title: place.name,
                    position: place.geometry.location
                });

                marker.addListener('click', function () {
                    infoWindow.open(map, marker);
                });

                markers.push(marker);


                if (place.geometry.viewport)
                    bounds.union(place.geometry.viewport);
                else
                    bounds.extend(place.geometry.location);
            });

            map.fitBounds(bounds);
        });


        function createContent(place){
            var s = [];
            s.push("Adresa : " + place.formatted_address );
            s.push("Nume :" + place.name);
            if(place.rating) {
                s.push(  "Rating : " + place.rating + "");
            }
            return "<h1> <div> " + s.join("</div> <div>") + "</div> </h1>";
        }
    }
}

