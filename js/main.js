// add scripts
$(document).on('ready', function() {

  // hide search again form
  $('#search-again').hide();

  // event handler for search form submission
  $('#tag-search').on('submit', function(event){

    // prevent browser default behavior
    event.preventDefault();

    // container for image urls
    var imageURLs = [];
    // grab tag from input
    var $searchString = $('#tag_query').val();

    console.log($searchString);


var searchUrl = "https://api.instagram.com/v1/tags/" + $searchString + "/media/recent";

// ajax request
$.ajax({
  url: searchUrl,
  type: 'GET',
  data: {client_id:'61f8b631abd34732a3bcd8c73d0d73a9'},
  dataType:'jsonp',
  success:function(data){
    // assign returned data to output variable
    var output = data.data;
    // clear image container
    $("#image-container").html('');
    // iterate through the returned data, appending the images to the dom
    for(var i = 0; i < output.length; i++) {
      imageURLs[i] = output[i].images.low_resolution.url;
      $("#image-container").append('<img src="' + imageURLs[i] + '"/>');
    }
    // clear form input
    $('#tag_query').val('');
    // hide the search form
    $('#search').hide();
    // add search term to the dom
    $('#search-term').html($searchString);
    // show the search again form
    $('#search-again').show();
  },
  error:function(data){
    alert("Sorry we're experiencing technical difficulties. Please try again later.");
  }
});

});

});
