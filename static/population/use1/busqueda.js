function handleAPILoaded() {
  $('#search-button').attr('disabled', false);
  $('#search-button').attr('class', "waves-effect waves-light btn");
}

// Search for a specified string.
function search() {
  var q = $('#query').val();
  var request = gapi.client.youtube.search.list({
    q: q,
    part: 'snippet'
  });

  request.execute(function(response) {
    $("#search-container").remove();
    recived= response.result;
    var length =  recived.items.length;
    console.log(recived);
    console.log("Length of videos: "+length);

    mycontainer = $('<div id="search-container"></div>');
    
    for(i=0;i<length;i++){
      $('<div class="row" id="videos"><div class="col s12 m7"><div class="card"><div class="card-image"><img src='+recived.items[i].snippet.thumbnails.medium.url+'></div><div class="card-content"><p>'+recived.items[i].snippet.title+'</p></div><div class="card-action"><a href="https://www.youtube.com/watch?v='+recived.items[i].id.videoId+'">Link</a></div></div></div></div>').appendTo(mycontainer);
    }
    mycontainer.appendTo("#results");
  
  });
}