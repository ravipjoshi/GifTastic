

var topic = ["Stranger Things","Animals","Meme","Movies","Music","Science","Sports","Disney","Baby","Iphone","Winter","Cloud","Northern Light","Sunrise","80s","90s","vintage","Mario"];


function displaygif(){
 //debugger; 
  
  var topic = $(this).attr("topic-tag");
  //  var queryURL = "https://www.omdbapi.com/?t=" + topic + "&apikey=trilogy";
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=lhfFNJDuKIEtHFgjQxSLoA5ZZQl1dihl&q="+topic+"&limit=10&lang=en";

  $.ajax({
        url: queryURL,
        method : "GET"
  }).then(function(response) {

   // console.log(response);
    var requestData = response.data;

   // console.log("rating is :"+requestData[0].rating);
   // console.log("Url is : "+requestData[0].images.fixed_height_small_still.url); 
    

    requestData.forEach(element => {
       // debugger;
        var imageDiv = $("<div class='imgDiv  col-lg-4 col-sm-6 '>");
        var ratingPtag = $("<p>").text("Rating: " + element.rating);
        
       // console.log(element.rating);
        var imgTag = $("<img class='imgTag'>");
        
        imgTag.attr("src",element.images.fixed_height_small_still.url);
        imgTag.attr("data-still",element.images.fixed_height_small_still.url);
        imgTag.attr("data-animate",element.images.fixed_height_small.url);
        imgTag.attr("data-state","still");
        // Displaying the  Image     
        imageDiv.append(ratingPtag);
        
        imageDiv.append(imgTag);
        
        // console.log(element.images.fixed_height_small_still.url);
        // console.log(element.images.fixed_height_small.url);
        $("#gifGrid").prepend(imageDiv);
      
    });

  });

  

}

function renderButton()
{
  $("#buttonArea").empty();
   //debugger;
   
   for(var i=0;i<topic.length;i++){
       var topicButton = $("<button>");
       topicButton.attr("class","topicButton");
       topicButton.attr("id",topic[i]+"Btn");
       topicButton.attr("topic-tag",topic[i]);
       topicButton.text(topic[i]);
       
       $("#buttonArea").append(topicButton); 
        
    }
}

function changeAnimStat()
{
 // debugger;
  var state = $(this).attr("data-state");

  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value

  if (state === "still") {
   // console.log("still is state");
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
   // console.log("still is state");
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
}




$("#addTopic").on("click", function(event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // This line will grab the text from the input box
    var topicText = $("#topicTxt").val().trim();
    // The movie from the textbox is then added to our array
    topic.push(topicText);

    // calling renderButtons which handles the processing of our movie array
    renderButton();
  });
  $(document).on("click", ".topicButton", displaygif);
  $(document).on("click",".imgTag",changeAnimStat);

  

  
  
 renderButton();

