 



 $(document).ready(function (){
        console.log("JQuery ready");
      
          var request = $.ajax({
              type: "GET",
              url:'https://sos-2016-13.herokuapp.com/api/v1/population?apikey=eea',
              data: "{}",
              contentType: "application/json",
              dataType: "json",
              cache: false,
              success: (data) => {
              var trHTML = '';
              $.each(data, function (i, item) {
              
                  trHTML += '<tr><td>' + data[i].country + '</td><td>' + data[i].year + '</td><td>'+ data[i].population + '</td><td>' + data[i].access_to_electricity + '</td><td>';
              });

              $('#location').append(trHTML);
              console.log(trHTML);
              }
            });
            request.done((data)=>{
              console.log("data received");
              console.log(data);
            
            });
            request.always((jqXHR,status)=>{
                if(status=="error")
                console.log("Status: "+ jqXHR.status);
            });
       
    });