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

    trainStart = moment(trainStart, "hh:mm")
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