// JavaScript Document
$(document).ready(function() {
	
	var tvShows = ["The X-files", "Orphan Black", "Star Trek: Deep Space Nine", "Buffy the Vampire Slayer", "Supernatural", "Schitt’s Creek", "Arrested Development", "Doctor Who", "Stargate", "The Expanse"];

buildButtons();

	function buildButtons(){
		$("#buttons-here").empty();
		for (var i = 0; i < tvShows.length; i++) {
			var buttonBuild = $("<button>");
			buttonBuild.text(tvShows[i]);
			buttonBuild.attr("data-tvshow", tvShows[i]);
			$("#buttons-here").append(buttonBuild); 		
		}
	}
	
	$(document).on("click", "button", function(event){
		
	 $("#gifs-appear-here").empty();	
		
      var show = $(this).attr("data-tvshow");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        show + "&api_key=mX6Ff48TOfJsnPlC7a0IqGVrMzXb6pIx&limit=10";

      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
		var results = response.data;

        console.log(response);
          
		   for (var i = 0; i < results.length; i++) {

            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
              var gifDiv = $("<div class='item'>");

              var rating = results[i].rating;

              var p = $("<p>").html("Rating: " + "<span class='caps'>" + rating + "</span>");

              var showImage = $("<img>");

              showImage.attr("src", results[i].images.fixed_height.url);
			  showImage.attr("data-animate", results[i].images.fixed_height.url);
			  showImage.attr("data-still", results[i].images.fixed_height_still.url);

              gifDiv.append(p);
              gifDiv.append(showImage);

              $("#gifs-appear-here").prepend(gifDiv);
            	}
        	}
		});
      });
	  
	  	$(document).on("click", "img", function(event){
			var state = $(this).attr("data-state");
				if (state === "still") {
					$(this).attr("src", $(this).attr("data-animate"));
					$(this).attr("data-state", "animate");
				} else {
					$(this).attr("src", $(this).attr("data-still"));
					$(this).attr("data-state", "still");
				}
    	});
	  
	 $("#add-show").on("click", function(event) {
        event.preventDefault();
        var show = $("#show-input").val().trim();
        tvShows.push(show);
        buildButtons();
      });
	
});