 $(document).ready(function(){ 
    topics = ["Sheriff Woody","Buzz Lightyear","Mr. Potatoe Head","Aliens","James Sullivan","Boo","Mr. Incredible","Elastigirl","Edna Mode","Lightning McQueen"];

    function getImages(q){
      var apiKey ="dc6zaTOxFJmzC";
      var limit = 10;
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + q + "&api_key=" + apiKey + "&limit=" + limit;

        $.ajax({
          url: queryURL,
          method: 'GET'
        }).done(function(response) {
           console.log(response);
           for (var i=0; i < limit; i++){
             var imageStill =`<figure><p>Rating: "${response.data[i].rating}"</p>
                              <img src = "${response.data[i].images.fixed_height_still.url}" 
                              data-still = "${response.data[i].images.fixed_height_still.url}"
                              data-animate ="${response.data[i].images.fixed_height.url}" 
                              data-state="still" class="gif">
                              </figure>`

             // var imageStill =`<figure><p>Rating: "${response.data[i].rating}"</p>
             //                  <video poster = "${response.data[i].images.fixed_height_still.url}" 
             //                  src ="${response.data[i].images.fixed_height.mp4}" >
             //                  </figure>`
             $("#imagelist").append(imageStill);
           }

         
        });
    }

    function createButtons(){
      //Create Guess Button Template
      $("#btnlist").empty();
       for (var i=0; i < topics.length; i++){
          var id = `btn${i}`
          var btntemplate =
          `<button class = "btn" id="${id}" value="${topics[i]}">${topics[i]}</button>`
          $("#btnlist").append(btntemplate);
        }
    }
    
  

    createButtons();

    $("#btnlist").on("click", ".btn", function(){
      var item = ($(this).attr("value"));
      $("#imagelist").empty();
      getImages(item);
    })
    //using the video tag and pulling down the mp4
    // $("#imagelist").on("click","video", function(){
    //     if ($(this).get(0).paused) {
    //       $(this).get(0).play();
    //     } else {
    //       $(this).get(0).pause();
    //     }
    // })

    $("#imagelist").on("click",".gif", function() {
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    })

    $("#add-char").on("click",function(event){
       event.preventDefault();
       var char = $("#pixar-char").val().trim();
       topics.push(char);
       createButtons();
    })

  })   


