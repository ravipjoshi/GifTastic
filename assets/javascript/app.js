var topic = ["Stranger Things","Animals","Meme","Movies","Music","Science","Sports","Disney","Baby","Iphone","Winter","Cloud","Northern Light","Sunrise","80s","90s","vintage","Mario"];

function renderButton()
{
  // $("#buttonArea").empty();
   debugger;
   
   for(var i=0;i<topic.length;i++){
       var topicButton = $("<button>");
       topicButton.attr("class","topicButton");
       topicButton.attr("id",topic[i]+"Btn");
       topicButton.attr("topic-tag",topic[i]);
       topicButton.text(topic[i]);
       
       $("#buttonArea").append(topicButton); 
        
    }
}
function displaygif()
{  
    var topic = $(this).attr("topic-tag");
    //  var queryURL = "https://www.omdbapi.com/?t=" + topic + "&apikey=trilogy";
    var queryURL1 = "https://api.giphy.com/v1/gifs/search?api_key=lhfFNJDuKIEtHFgjQxSLoA5ZZQl1dihl&q="+topic+"&limit=10&lang=en"
    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
      url: queryURL1,
      method: "GET"
    }).then(function(response) {

      // Creating a div to hold the movie
      var imgDiv = $("<div class='imgDiv'>");
      
      // Storing the rating data
      var rating ;
      var requestData = response.data;


      requestData.forEach(element => {
         // Creating an element to have the rating displayed
             var ratingPtag = $("<p>").text("Rating: " + requestData.rating);
        // Displaying the rating
              imgDiv.append(ratingPtag);
         //Creating ImageTag to display gif and Setting  its Attributes     
              var imgTag = $("<img class='imgTag'>");
              imgTag.attr("src",requestData.images.fixed_height_small_still);
              imgTag.attr("data-still",requestData.fixed_height_small_still);
              imgTag.attr("data-animate",requestData.fixed_height_small);
              imgTag.attr("data-state","still");
         // Displaying the  Image     
              imgDiv.prepend(imgTag);

   

        
      });    

     
   
},

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
  }));

 // $(document).on("click", ".movie-btn", displaygif);
  
 // renderButton();


