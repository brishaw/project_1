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
var eventDate;



var x = "";
var y = "";
var eventsArr = []; // create array to store event data
var isZip = new RegExp(/\d{5}/);
var zip;
var eventLat = []; // stores events lat
var eventLon = []; // stores events lon
var eventsName = [];
var cities;

$(".zip-search").on("click", function (event) {
    event.preventDefault();
    zip = $(".zip-input").val().trim();
    if (isZip.test(zip) != true) {
        zip = zip.split(",");
        var city = zip[0].trim();
        var state = zip[1].trim();
        $.ajax({
            url: "https://cors-anywhere.herokuapp.com/https://www.zipcodeapi.com/rest/xY2EHIrstcd4PQe38SB7Y3My71OxCQMPUL6QWwwp3A39hYhI6xUWL82aTwb3R21c/city-zips.json/" + city + "/" + state,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            if (response.zip_codes.length % 2 == 0) {
                zip = response.zip_codes[(response.zip_codes.length / 2)];
            } else {
                zip = response.zip_codes[((response.zip_codes.length - 1) / 2)]
            }
            console.log(zip);
            localStorage.setItem("zip", zip);
            dataRef.ref().push({
                zip: zip
            });
            $(".zip-input").val("");
            getEvents();
        });
    } else{
    localStorage.setItem("zip", zip);
    $(".zip-input").val("");
    getEvents();
    dataRef.ref().push({
        zip: zip
    });
    $(".zip-input").val("");
    }

});

// /d{5} 

// dataRef.ref().on("child_added", function (childSnapshot) {

//     // Log everything that's coming out of snapshot
//     console.log("child snapshot of zip: " + childSnapshot.val().zip);
//     var theZip = childSnapshot.val().zip;
//     console.log("theZip: " + theZip);

function getEvents() {
    zip = localStorage.getItem("zip");
    eventDate = localStorage.getItem("date");
    if(eventDate != "undefined"){
        queryURL = "https://api.seatgeek.com/2/events?geoip=" + zip + "&datetime_utc=" + eventDate + "&range=20mi&client_id=MTMxMDU5Mzh8MTUzNjYyMjg1Mi4yOA";
    } else {
        queryURL = "https://api.seatgeek.com/2/events?geoip=" + zip + "&range=5mi&client_id=MTMxMDU5Mzh8MTUzNjYyMjg1Mi4yOA";
    }
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log("Response: " + response);
        console.log("queryURL: " + queryURL);
        eventsArr = [];
        eventLat = [];
        eventLon = [];
        for (i = 0; i < response.events.length; i++) {
            var event = {};
            event.title = response.events[i].short_title;
            eventsName.push(event.title);
            event.datetime = response.events[i].datetime_local;
            event.venueName = response.events[i].venue.name;
            event.venueAddr = response.events[i].venue.address;
            event.venueCity = response.events[i].venue.city;
            event.venueSt = response.events[i].venue.state;
            event.venueZip = response.events[i].venue.postal_code;
            event.venueLat = response.events[i].venue.location.lat;
            eventLat.push(event.venueLat);
            event.venueLon = response.events[i].venue.location.lon;
            eventLon.push(event.venueLon);

            eventsArr.push(event);

            console.log(event.venueLat, event.venueLon);

        }

        var venLat = event.venueLat;
        $(".events-menu").empty();
        for (j = 0; (j < eventsArr.length) && (j < 5); j++) {
            var li = $("<li>");
            li.html($("<a>").text(eventsArr[j].title).attr({
                'data-x': eventsArr[j].venueLat,
                'data-y': eventsArr[j].venueLon,
                'data-name': eventsName[j],
                class: "event-item",
            }));
            $(".events-menu").append(li);
        }
    });

    $(".zip_result").text(zip);
    if(eventDate != "undefined"){
        $(".date_result").text("For the date " + localStorage.getItem("date"));
    }
}


//     // Handle the errors
// }, function (errorObject) {
//     console.log("Errors handled: " + errorObject.code);
// });


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}


function showPosition(position) {
    x = eventLat[1];
    y = eventLon[1];
    console.log("lat: " + x);

    // console.log("Latitude: " + position.coords.latitude);
    // console.log("longitude: " + position.coords.longitude);


    cities = L.layerGroup();

    var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

    var grayscale = L.tileLayer(mbUrl, { id: 'mapbox.light', attribution: mbAttr }),
        streets = L.tileLayer(mbUrl, { id: 'mapbox.streets', attribution: mbAttr });

    var map = L.map('map', {
        center: [x, y],
        zoom: 11,
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

    function createPopUps() {

        for (var i = 0; i< 5; i++) {

            var thisLat = eventLat[i];
            var thisLon = eventLon[i];
            L.marker([thisLat, thisLon]).bindPopup(eventsName[i]).addTo(cities);
            console.log("i");

        }
    }
    createPopUps();
}

    $(document).on("click", ".event-item", function () {

        getFood($(this).attr("data-x"), $(this).attr("data-y"), $(this).attr("data-name"));


    })

    function getFood(x, y, name) {
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
            // cities.clearLayers();
            for (var i = 0; i < results.length; i++) {
                // console.log(results[i].name + " | Rating: " + results[i].rating + " | Distance (m): " + results[i].distance + " | Type: " +results[i].categories[0].title);
                var foodList = $("<li>");
                foodList.html("<a href=" + results[i].url + " data-latitude=" + results[i].coordinates.latitude + " data-longitude=" + results[i].coordinates.longitude + " target='_blank'><strong> " + results[i].name + "</strong> | Rating: " + results[i].rating + " | Distance (m): " + Math.floor(results[i].distance) + " | Type: " + results[i].categories[0].title + "</a>");

                $(".results-menu").append(foodList);

                L.marker([x, y]).bindPopup(name).addTo(cities);
                var enwLat = results[i].coordinates.latitude;
                var edwLon = results[i].coordinates.longitude;
                L.marker([enwLat, edwLon]).bindPopup(results[i].name).addTo(cities);
            }
            });

}


getEvents();
getLocation();