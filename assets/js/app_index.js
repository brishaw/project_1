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


window.onload = $('#nameModal').modal("show");


$(".zip-search").on("click", function (event) {
    event.preventDefault();
    var zip = $(".zip-input").val();
    localStorage.clear();
    localStorage.setItem("zip", zip);
    dataRef.ref("user").set({
        zip: zip
    });
    window.location.href = "results.html";
});

/**************************/

// Click Button changes what is stored in firebase
// $("#click-name").on("click", function (event) {
//     // Prevent the page from refreshing
//     event.preventDefault();

//     // Get inputs
//     var yourName = $("#your-name").val().trim();


//     // Change what is saved in firebase
//     var newName = {
//         name: yourName
//     };

//     dataRef.ref().push(newName);

//     // Clears all of the text-boxes
//     $("#your-name").val("");

//     console.log(yourName);
// }); // end click-button function

// When Firebase changes occurs it will print them to console and html
// dataRef.ref().on("child_added", function (childSnapshot) {

//     // Print the initial data to the console.
//     console.log("childSnapshot value: " + childSnapshot.val());

//     var yourName = childSnapshot.val().yourName;

//     // Log the value of the various properties
//     console.log("childSnapshot yourName: " + yourName);


    // *****************************
    // Create the new row
    // var newRow = $("<tr>").append(

    //     $("<td scope='row'>").text(trainName),

    //     $("<td>").text(trainDest),

    //     $("<td>").text(frequency),

    //     $("<td>").text(nextTrain.format("HH:mm")),

    //     $("<td>").text(minNextTrain)
    // );

    // Append the new row to the table
    // $("#train-schedule > tbody").prepend(newRow);

    // colorIZE my tables
    // if (minNextTrain <= 10) {
    //     $(newRow).addClass("table-warning");
    // } else if (minNextTrain >= 6) {
    //     $(newRow).removeClass("table-warning");
    // }
    // if (minNextTrain <= 5) {
    //     $(newRow).addClass("table-danger");
    // } else if (minNextTrain > 5) {
    //     $(newRow).removeClass("table-danger");
    // }

// }, function (errorObject) {

//     console.log("The read failed: " + errorObject.code);

// });

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
});