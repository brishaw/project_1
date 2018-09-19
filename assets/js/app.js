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

//var is_root = "/Users/brianshaw/Documents/UNCBootCamp/code/project_1/index.html";
var is_root = "/project_1/index.html";
var is_root_b = "/project_1/";
var x = "";
var y = "";
var eventsArr = []; // create array to store event data


$(".zip-search").on("click", function (event) {

    // console.log(window.location.pathname);
    // window.location.href = "results.html";

    if (window.location.pathname == is_root || window.location.pathname == is_root_b) {
        alert("root!");
        window.location.href = "results.html";
    } else {
        alert("not root");
    }


    event.preventDefault();

    var zip = $(".zip-input").val();
    
    var newZip = {
        zip: zip
    }

    dataRef.ref().push(newZip);

    $(".zip-input").val("");

    

});

dataRef.ref().on("child_added", function (childSnapshot) {

    // Log everything that's coming out of snapshot
    console.log("child snapshot of zip: " + childSnapshot.val().zip);
    var theZip = childSnapshot.val().zip;
    console.log("theZip: " + theZip);


    queryURL = "https://api.seatgeek.com/2/events?geoip=" + theZip + "&range=5mi&client_id=MTMxMDU5Mzh8MTUzNjYyMjg1Mi4yOA";
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

            console.log("FRICKEN SHOW ME SOMETHING 1:" + eventsArr[i].title);
            console.log(event.venueLat, event.venueLon);
        }
       
        //console.log("SHOW ME THE MONEY: " + eventsArr[0].title); 
        var venLat = event.venueLat;

        $(".events-menu").empty();

        for (j = 0; j < 5; j++) {

            var li = $("<li>");

            li.html($("<a>").text(eventsArr[j].title).attr({
                'data-x':  eventsArr[j].venueLat,
                'data-y': eventsArr[j].venueLon,
                class: "event-item",
                
            }));
            

            $(".events-menu").append(li);
        }
    });

    $(".zip_result").text(childSnapshot.val().zip);

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});


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

    L.marker([34.0834, -118.367]).bindPopup('Hollywood Improv \n<br>\nMarcella Arguello').addTo(cities),
    L.marker([34.0908, -118.388]).bindPopup('The Roxy Theatre\n<br>\nAmber Mark').addTo(cities),
    L.marker([34.1013, -118.328]).bindPopup('The Study Hollywood\n<br>\nBreaking Sound').addTo(cities);
    //L.marker([x, y]).bindPopup('This is Golden, CO.').addTo(cities);


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

    //getEvents();

}

$(document).on("click", ".event-item", function() {
    // alert("Clicked");

    getFood($(this).attr("data-x"), $(this).attr("data-y"));

});


function getFood(x, y){
    // alert("in get Food");
    // var longitude = "-78.795737";
    // var latitude = "35.728742";

    $.ajax({
        url: "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?latitude=" + x + "&longitude=" + y + "&limit=10&sort_by=distance",
        method: "GET",
        headers: {
        "Authorization": "Bearer JfYwM44JdGrfKEHI_CLv183CeDyCNj1wTCKRyyAdt5z0Kox9VckvQd1RLWEcAbVdYdbVLyilCNPxMhV9h5-g1X7qUamUZZPuNZj_riGY2f3X3HGBuFQ6G6vvvuaeW3Yx",
        },
        dataType: 'json'
        }).then(function (response) {
            $(".results-menu").empty();

            console.log(response);
            var results = response.businesses

            for (var i=0; i < results.length; i++) {
                // console.log(results[i].name + " | Rating: " + results[i].rating + " | Distance (m): " + results[i].distance + " | Type: " +results[i].categories[0].title);
                
                var foodList = $("<li>");
                foodList.html("<a href=" + results[i].url + " data-latitude=" + results[i].coordinates.latitude + " data-longitude=" + results[i].coordinates.longitude + "><strong> " + results[i].name + "</strong> | Rating: " + results[i].rating + " | Distance (m): " + Math.floor(results[i].distance) + " | Type: " + results[i].categories[0].title + "</a>");

                $(".results-menu").append(foodList);


            }
            });

}

getLocation();


