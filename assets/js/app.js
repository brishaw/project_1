var x = "";
var y = "";

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    x = position.coords.latitude;
    y = position.coords.longitude;
    console.log("lat: " + x);

    console.log("Latitude: " + position.coords.latitude);
    console.log("longitude: " + position.coords.longitude);


    var cities = L.layerGroup();

    // L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.').addTo(cities),
    //     L.marker([39.74, -104.99]).bindPopup('This is Denver, CO.').addTo(cities),
    //     L.marker([39.73, -104.8]).bindPopup('This is Aurora, CO.').addTo(cities),
    //     L.marker([39.77, -105.23]).bindPopup('This is Golden, CO.').addTo(cities);


    var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

    var grayscale = L.tileLayer(mbUrl, { id: 'mapbox.light', attribution: mbAttr }),
        streets = L.tileLayer(mbUrl, { id: 'mapbox.streets', attribution: mbAttr });

    var map = L.map('map', {
        // center: [39.73, -104.99],
        center: [x, y],
        zoom: 15,
        layers: [grayscale, cities]
    });

    var baseLayers = {
        "Grayscale": grayscale,
        "Streets": streets
    };

    var overlays = {
        "Cities": cities
    };

    L.control.layers(baseLayers, overlays).addTo(map);



}

getLocation();