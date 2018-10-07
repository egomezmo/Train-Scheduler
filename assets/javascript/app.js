var config = {                                                  // Initialize Firebase
    apiKey: "AIzaSyDdZsN2Aoel4D2Ghr31MJfJubm4irs0k9w",          // *******************
    authDomain: "fir-db01-6e3a4.firebaseapp.com",               // *******************
    databaseURL: "https://fir-db01-6e3a4.firebaseio.com",       // *******************  
    projectId: "fir-db01-6e3a4",                                // ******************* 
    storageBucket: "fir-db01-6e3a4.appspot.com",                // ******************* 
    messagingSenderId: "23283901726"                            // *******************
  };                                                            // *******************
  firebase.initializeApp(config);                               // ******************* 
  var database = firebase.database();                           // Initialize Firebase 

$("#submit").on("click", function(event) {                      //*** listener to button
    event.preventDefault();                                     //prevent error form

var tName = $("#tName").val().trim();                           // graba los valores del form
var tDestination = $("#tDestination").val().trim(); 
var tFirstTime = $("#tFirstTime").val().trim();
var tFrecuency = $("#tFrecuency").val().trim();

var newTrain = {                                                // object creation
    name: tName,
    destination: tDestination,
    firstTime: tFirstTime,
    frecuency: tFrecuency
};                                                              //*** listener to button
  
database.ref().push(newTrain);                                  // Uploads new data to Db

$("#tName").val("");                                            // Clears all Form
$("#tDestination").val("");
$("#tFirstTime").val("");
$("#tFrecuency").val("");
});

database.ref().on("child_added", function(childSnapshot) {      //READ FROM DB

  
var tName = childSnapshot.val().name;                           // STORE INTO VARIABLES
var tDestination = childSnapshot.val().destination;
var tFrecuency = childSnapshot.val().frecuency;
var tFirstTime = childSnapshot.val().firstTime;

var tFrequency = tFrecuency;                                    // Assumptions
var firstTime = tFirstTime;                                     // time
var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years"); // First Time (pushed back 1 year to make sure it comes before current time)
var currentTime = moment(); // Current Time
$("#currenTime").text(moment(currentTime).format("MMMM Do YYYY, h:mm a"));      //SHOW CURRENT TIME IN HTML
var diffTime = moment().diff(moment(firstTimeConverted), "minutes"); // Difference between the times
var tRemainder = diffTime % tFrequency; // Time apart (remainder)
var tMinutesTillTrain = tFrequency - tRemainder;  // Minute Until Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes"); // Next Trains


var newRow = ("<tr>" + "<td>" + tName + "<td>" + tDestination +
"<td>"+ tFrecuency + " MIN" + "<td>"+ moment(nextTrain).format("hh:mm a") + "<td>" + tMinutesTillTrain);


$("#inserta").append(newRow);                       // Append the new row to the table

    console.log(tName + " - " + "first time train" + tFirstTime);
  
setTimeout(function(){                                     // reload every 60 seconds
 window.location.reload(1);
}, 60000);

});