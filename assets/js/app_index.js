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

$(".zip-search").on("click", function (event) {
    event.preventDefault();
    var zip = $(".zip-input").val();
    localStorage.clear();
    localStorage.setItem("zip", zip);
    dataRef.ref().push({
        zip: zip
    });
    window.location.href = "results.html";
});