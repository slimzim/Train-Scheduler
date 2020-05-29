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

$("#add-train-btn").on("click", function(event){
    event.preventDefault();
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainStart = $("#start-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();

    trainStart = moment(trainStart, "HH:mm")
    var trainStartUnixTime = trainStart.format("X")
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

    database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val())

    var train = childSnapshot.val();
    var trainName = train.name;
    var trainDestination = train.destination;
    var trainFrequency = train.frequency;
    var trainStart = train.start;
    
    var trainStartUnix = moment.unix(trainStart);
    var trainStartPretty = trainStartUnix.format('LT')
    
    var trainStartConverted = moment(trainStartPretty, "HH:mm").subtract(1, "years");
    var diffTime = moment().diff(moment(trainStartConverted), "minutes");
    var tRemainder = diffTime % trainFrequency;
    var tMinutesTillTrain = trainFrequency - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes")
    var nextTrainPretty = moment(nextTrain).format("LT")
    
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
    td5.html(tMinutesTillTrain);
    newTR.append(td1, td2, td3, td4, td5);
    $("#schedule-table").append(newTR)

   })

  