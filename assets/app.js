// Create variables
var topics = ["dog", "cat", "rabbit", "hamster"]



function showButtoninfo() {
    
    var topic = $(this).attr("topic-name").replace(/ /g, "+");

    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=QuQYFZTrQhKIdh8fR4RrF0SwnXCCzElY&limit=10"
    console.log(queryURL);

    $.ajax({ url: queryURL, method: "Get" }).then(function (response) {
        console.log(response)

        //make it so that i don't have to type response.data all the time
        var results = response.data;

        // create a loop for each picture for each result
        for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div class='gif'>");
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);

        var img = $("<img>");
        img.attr("src", results[i].images.fixed_height.url);

        gifDiv.prepend(p);
        gifDiv.prepend(img);

        $("#pictures").prepend(gifDiv)

        }

    });
}

//Create buttons
function makeButtons() {


    // clear current buttons
    $("#buttons").empty();

    //Loop through entire array of topics
    for (var i = 0; i < topics.length; i++) {

        //Generate buttons for all topics in the array
        var button = $("<button>")
        button.addClass("topic");
        //Add a data atrritbute
        button.attr("topic-name", topics[i])
        button.text(topics[i])
        $("#buttons").append(button);


    }
}

//this function handles when they add a button
$("#add-topic").on("click", function(event){
    event.preventDefault();

    var topic = $("#topic-input").val().trim();
    topics.push(topic);
    makeButtons();
})

// function to display the button info
$(document).on("click", ".topic", showButtoninfo);

//call to make the buttons
makeButtons();
