// INIT FIREBASE


var config = {
    apiKey: "AIzaSyBoSn4-1mfxh1fn-ISMNVumGepsrL84O_0",
    authDomain: "nightout-b309b.firebaseapp.com",
    databaseURL: "https://nightout-b309b.firebaseio.com",
    projectId: "nightout-b309b",
    storageBucket: "nightout-b309b.appspot.com",
    messagingSenderId: "1065543669523"
};

firebase.initializeApp(config);


var dataRef = firebase.database();

var is_root = "/Users/brianshaw/Documents/UNCBootCamp/code/project_1/index.html";
var x = "";
var y = "";
var zip;
var eventsArr = []; // create array to store event data
var mealsArr = []; // array to store restaurants

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
    L.marker([x, y]).bindPopup('This is Golden, CO.').addTo(cities);


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
        layers: [grayscale, cities],
        scrollWheelZoom: false
    });

    console.log(map);

    var baseLayers = {
        "Grayscale": grayscale,
        "Streets": streets
    };

    var overlays = {
        "Cities": cities
    };

    L.control.layers(baseLayers, overlays).addTo(map);

    getEvents();

}

getLocation();

function getEvents() {
    queryURL = "https://api.seatgeek.com/2/events?geoip=" + zip + "&range=5mi&client_id=MTMxMDU5Mzh8MTUzNjYyMjg1Mi4yOA";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log("Response: " + response);
        console.log("queryURL: " + queryURL);
        eventsArr = [];

        for (i = 0; i < response.events.length; i++) {
            var event = {};
            event.title = response.events[i].short_title;
            event.datetime = response.events[i].datetime_local;
            event.venueName = response.events[i].venue.name;
            event.venueAddr = response.events[i].venue.address;
            event.venueCity = response.events[i].venue.city;
            event.venueSt = response.events[i].venue.state;
            event.venueZip = response.events[i].venue.postal_code;
            event.venueLat = response.events[i].venue.location.lat;
            event.venueLon = response.events[i].venue.location.lon;

            eventsArr.push(event);
        }
    });
}

$(".zip-search").on("click", function (event) {

    // console.log(window.location.pathname);
    // window.location.href = "results.html";

    if (window.location.pathname == is_root) {
        alert("root!");
        window.location.href = "results.html";
    } else {
        alert("not root");
    }


    event.preventDefault();





    zip = $(".zip-input").val();

    $(".zip-input").val("");

    // Code for the push
    dataRef.ref().push({

        zip: zip

    })

    getEvents();

    setTimeout(setEventsHtml, 500);

});

dataRef.ref().on("child_added", function (childSnapshot) {

    // Log everything that's coming out of snapshot
    console.log("child snapshot of zip: " + childSnapshot.val().zip);
    var theZip = childSnapshot.val().zip;
    console.log("theZip: " + theZip);


    $(".zip_result").text(childSnapshot.val().zip);

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

function setEventsHtml() {

    $(".events-menu").empty();

    for (i = 0; i < 5; i++) {

        var li = $("<li>");

        li.html($("<a>").text(eventsArr[i].title));

        $(".events-menu").append(li);
    }
}

