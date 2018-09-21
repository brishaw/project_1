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
var zip;
var isZip = new RegExp(/\d{5}/);

window.onload = $('#nameModal').modal("show");

$(".zip-search").on("click", function (event) {
    event.preventDefault();
    zip = $(".zip-input").val().trim();
    if (isZip.test(zip) != true) {
        zip = zip.split(",");
        var city = zip[0].trim();
        var state = zip[1].trim();
        $.ajax({
            url: "https://cors-anywhere.herokuapp.com/https://www.zipcodeapi.com/rest/D2TblXN7Wgz5Ik9j5mgTBJPWR2VVLC3ZCc2wr8t5e53ktlUi3sI39ZZt7O096rGu/city-zips.json/" + city + "/" + state,
            method: "GET"
        }).then(function (response) {
            if (response.zip_codes.length % 2 == 0) {
                zip = response.zip_codes[(response.zip_codes.length / 2)];
            } else {
                zip = response.zip_codes[((response.zip_codes.length - 1) / 2)]
            }
            localStorage.clear();
            localStorage.setItem("zip", zip);
            dataRef.ref().push({
                zip: zip
            });
            window.location.href = "results.html";
        });
    }
    else {
        localStorage.clear();
        localStorage.setItem("zip", zip);
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
    var nightOutDate = $("#noDate").val();
    localStorage.clear();
    localStorage.setItem("nightOutDate", nightOutDate);
    dataRef.ref("user").set({
        date: nightOutDate
    });
    window.location.href = "results.html";
})