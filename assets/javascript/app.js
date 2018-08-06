// Create variables
var topics = ["dog", "cat", "rabbit", "hamster", "pusheen", "dragonball", "deal"]



function showButtoninfo() {

    var topic = $(this).attr("topic-name").replace(/ /g, "+");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=QuQYFZTrQhKIdh8fR4RrF0SwnXCCzElY&limit=10"
    console.log(queryURL);

    $.ajax({ url: queryURL, method: "Get" }).then(function (response) {
        console.log(response)

        //make it so that i don't have to type response.data all the time
        var results = response.data;

        // create a loop for each picture for each result
        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class=\"float\">");
            var rating = results[i].rating;
            var img = $("<img class='gif'>");
            var p = $("<p>").text("Rating: " + rating);
            //classify it with the gif class
            //give it the state of still so i can change it back and forth
            img.attr("state", "still");
            img.attr("src", results[i].images.fixed_height_still.url);
            //add the still and the animated links into the img attributes
            
            img.attr("still", results[i].images.fixed_height_still.url)
            img.attr("animated", results[i].images.fixed_height.url)
            gifDiv.prepend(img);
            gifDiv.prepend(p);

            $("#pictures").prepend(gifDiv)

        }

    });
}

// Animate my gifs when clicking on them
function animate() {

    //define my state
    var state = $(this).attr("state")
    var still = $(this).attr("still")
    var gif =  $(this).attr("animated")
    // check if it's still, if it is update the src to animate and update the state attr to animate

    if(state === "still"){
        $(this).attr("src", gif) // change the src image to the gif link
        $(this).attr("state", "animated") // Change the state to animate
    } else{
        $(this).attr("src", still)
        $(this).attr("state", "still")
    }
};


//Create buttons
function makeButtons() {


    // clear current buttons
    $("#buttons").empty();

    //Loop through entire array of topics
    for (var i = 0; i < topics.length; i++) {

        //Generate buttons for all topics in the array
        var button = $("<button>")
        button.addClass("topic btn btn-primary");
        //Add a data atrritbute
        button.attr("topic-name", topics[i])
        button.text(topics[i])
        $("#buttons").append(button);


    }
}

//this function handles when they add a button
$("#add-topic").on("click", function (event) {
    event.preventDefault();

    var topic = $("#topic-input").val().trim();
    if(topic === ""){
        return // prevent the button from returning blank buttons
    }
    else{
    topics.push(topic);
    makeButtons();
    }
})

// function to display the button info, have it ready always to be clicked on
$(document).on("click", ".topic", showButtoninfo);
$(document).on("click", ".gif", animate)

//call to make the buttons
makeButtons();
