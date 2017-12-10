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
             var imageStill =`<figure><p>Rating: "${response.data[i].rating}"</p><video poster = "${response.data[i].images.fixed_height_still.url}" 
                 source src ="${response.data[i].images.fixed_height.mp4}"></video></figure>`
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

    $("#imagelist").on("click","video", function(){
        if ($(this).get(0).paused) {
          $(this).get(0).play();
        } else {
          $(this).get(0).pause();
        }
    })

    $("#add-char").on("click",function(event){
       event.preventDefault();
       var char = $("#pixar-char").val().trim();
       topics.push(char);
       createButtons();
    })

  })   


