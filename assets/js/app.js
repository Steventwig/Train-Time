$(document).ready(function(){
    var config = {
        apiKey: "AIzaSyBrDNhkek1LLVF18HRFPakEcCTzAdS1ZHM",
        authDomain: "fullstackday1.firebaseapp.com",
        databaseURL: "https://fullstackday1.firebaseio.com",
        projectId: "fullstackday1",
        storageBucket: "",
        messagingSenderId: "360814355275",
        appId: "1:360814355275:web:a68c45e30c8d3ff4"
      };
    firebase.initializeApp(config);
    var database = firebase.database();
    var trainNumber;
    var destination;
    var firstTrain;
    var interval = 0;

    $("#add-train").on("click", function() {
        event.preventDefault();
        trainNumber = $("#trainNumber").val().trim();
        destination = $("#destination").val().trim();
        firstTrain = $("#firstTrain").val().trim();
        interval = $("#interval").val().trim();


        database.ref().push({
            trainNumber: trainNumber,
            destination: destination,
            firstTrain: firstTrain,
            interval: interval,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
        $("form")[0].reset();
    });

    database.ref().on("child_added", function(rowData) {
        var minTillNext;
        var firstTrainNew = moment(rowData.val().firstTrain, "hh:mm").subtract(1, "years");
        var diffTime = moment().diff(moment(firstTrainNew), "minutes");
        var remainder = diffTime % rowData.val().interval;
        var minTillNext = rowData.val().interval - remainder;
        var nextTrain = moment().add(minTillNext, "minutes");
        nextTrain = moment(nextTrain).format("hh:mm");

        $("#addArea").append("<tr><td>" + rowData.val().trainNumber +
                "</td><td>" + rowData.val().destination +
                "</td><td>" + rowData.val().interval +
                "</td><td>" + nextTrain + 
                "</td><td>" + minTillNext + "</td></tr>");
    });


});