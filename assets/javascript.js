// INITIALIZE FIREBASE ===========================================================================

var config = {
  apiKey: "AIzaSyBwH_e4goY6waHQUpnhX-xEoxvqtIhZ_rc",
  authDomain: "train-scheduler-b75fe.firebaseapp.com",
  databaseURL: "https://train-scheduler-b75fe.firebaseio.com",
  projectId: "train-scheduler-b75fe",
  storageBucket: "train-scheduler-b75fe.appspot.com",
  messagingSenderId: "528249068977",
  appId: "1:528249068977:web:da84c75614fabcc943f190",
  measurementId: "G-RSK59PVE63"
}

firebase.initializeApp(config);
var database = firebase.database()

// ADD TRAIN ONCLICK FUNCTION ====================================================================

$("#add-train-btn").on("click", function(event){
    event.preventDefault();
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainStart = $("#start-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();

    trainStart = moment(trainStart, "HH:mm")
    var trainStartUnixTime = parseInt(trainStart.format("x"))

    var newTrain = {
      name: trainName,
      destination: trainDestination,
      start: trainStartUnixTime,
      frequency: trainFrequency
    };
    database.ref().push(newTrain);
    console.log(newTrain)
    alert("Train added!")
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#frequency-input").val("");
   });

// ON CHILD ADDED EVENT LISTENER ===============================================================

    database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val())

    var train = childSnapshot.val();
    var trainName = train.name;
    var trainDestination = train.destination;
    var trainFrequency = train.frequency;
    var trainStart = parseInt(train.start);
  
    var now = parseInt(moment().format("x"));
  
    if (now < trainStart){
        console.log("trainStart is later than now")
        console.log(moment(trainStart).format('LT'))
        var nextTrainPretty = moment(trainStart).format('LT')
        var tMinutesTillTrain = moment().diff(moment(trainStart), "minutes");
    }

    else if (now > trainStart) {
        console.log("trainStart is earlier than now")
        console.log(moment(trainStart).format('LT'))
        var diffTime = moment().diff(moment(trainStart), "minutes");
        var tRemainder = diffTime % trainFrequency;
        var tMinutesTillTrain = trainFrequency - tRemainder;
        var nextTrain = moment().add(tMinutesTillTrain, "minutes")
        var nextTrainPretty = moment(nextTrain).format("LT")
    }

    var newTR = $("<tr>");
    var td1 = $("<td>");
    td1.html(trainName);
    var td2 = $("<td>");
    td2.html(trainDestination);
    var td3 = $("<td>");
    td3.html(trainFrequency);
    var td4 = $("<td>");
    td4.html(nextTrainPretty);
    var td5 = $("<td>");
    td5.html(Math.abs(tMinutesTillTrain));
 
    newTR.append(td1, td2, td3, td4, td5, td6);
    $("#schedule-table").append(newTR)

   })