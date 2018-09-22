var config = {
    apiKey: "AIzaSyBoSn4-1mfxh1fn-ISMNVumGepsrL84O_0",
    authDomain: "nightout-b309b.firebaseapp.com",
    databaseURL: "https://nightout-b309b.firebaseio.com",
    projectId: "nightout-b309b",
    storageBucket: "nightout-b309b.appspot.com",
    messagingSenderId: "1065543669523"
};

firebase.initializeApp(config);
localStorage.clear();

var dataRef = firebase.database();
var zip;
var isZip = new RegExp(/\d{5}/);
var nightOutDate;

window.onload = $('#nameModal').modal("show");

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
            if (response.zip_codes.length % 2 == 0) {
                zip = response.zip_codes[(response.zip_codes.length / 2)];
            } else {
                zip = response.zip_codes[((response.zip_codes.length - 1) / 2)]
            }
            localStorage.clear();
            localStorage.setItem("zip", zip);
            localStorage.setItem("date", nightOutDate);
            dataRef.ref().push({
                zip: zip
            });
            window.location.href = "results.html";
        });
    }
    else {
        localStorage.clear();
        localStorage.setItem("zip", zip);
        localStorage.setItem("date", nightOutDate);
        dataRef.ref().push({
            zip: zip
        });
        window.location.href = "results.html";
    }
});

$("#noNameSub").on("click", function (event) {
    event.preventDefault();
    var nightOutName = $("#noName").val();
    localStorage.clear();
    localStorage.setItem("nightOutName", nightOutName);
    dataRef.ref("user").set({
        name: nightOutName
    });
    $('#nameModal').modal('hide');
});

$("#noDateSub").on("click", function (event) {
    event.preventDefault();
    nightOutDate = $("#noDate").val();
    localStorage.clear();
    dataRef.ref("user").set({
        date: nightOutDate
    });
    $("#no-date").text("Date: " + nightOutDate);
})