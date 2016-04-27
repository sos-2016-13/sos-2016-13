
    $(document).ready(function(){
    
    
        
    $.ajax(
    {
      type: "GET",
      url: 'https://sos-2016-13.herokuapp.com/api/v1/consumed?apikey=eea',
      data: "{}",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      cache: false,
      success: function (data) {
        var trHTML = '';

      $.each(data, function (i, item) {
        trHTML += '<thead><tr><td>' + item.country + '</td><td>' + item.year + '</td><td>' + item.population + '</td><td>' + item.access_to_electricity + '</td></tr></thead>';
      });

      $('#location').append(trHTML);
      },
      error: function (msg) {
        alert(msg.responseText);
      }
    });
        
  
    
    });
  