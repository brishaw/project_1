// INIT FIREBASE

var config = {
apiKey: "AIzaSyBd9NjylSfH2ktRDWf-tGfo_VqESZ0TWMw",
authDomain: "infoholder-778ea.firebaseapp.com",
databaseURL: "https://infoholder-778ea.firebaseio.com",
projectId: "infoholder-778ea",
storageBucket: "infoholder-778ea.appspot.com",
messagingSenderId: "939153873212"
};

firebase.initializeApp(config);

var database = firebase.database();

// Click Button changes what is stored in firebase
$("#click-name").on("click", function (event) {
    // Prevent the page from refreshing
    event.preventDefault();

    // Get inputs
    var yourName = $("#your-name").val().trim();


    // Change what is saved in firebase
    var newName = {
        name: yourName
    };

    database.ref().push(newName);

    // Clears all of the text-boxes
    $("#your-name").val("");

console.log(yourName);
}); // end click-button function

// When Firebase changes occurs it will print them to console and html
database.ref().on("child_added", function (childSnapshot) {

    // Print the initial data to the console.
    console.log("childSnapshot value: " + childSnapshot.val());

    var yourName = childSnapshot.val().yourName;

    // Log the value of the various properties
    console.log("childSnapshot yourName: " + childSnapshot.val().yourName);


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

}, function (errorObject) {

    console.log("The read failed: " + errorObject.code);

});