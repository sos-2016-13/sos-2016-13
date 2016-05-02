<script>
    $("body").ready(function(){
    
      $("#button").click(function (){
        
        var method = $("input[type=radio]:checked").attr("id");
        
        var request = $.ajax({
          url: $("#url").val(),
          type: method,
          data: $("#payload").val(),
          contentType : "application/json"
        });
        
        request.done(function (data){
          $("#data").text(JSON.stringify(data));
        });
        
        request.always(function(jqXHR,status){
        if(status=="error"){
          $("#data").text("")
          $("#list").text("")
          $("#status").text(jqXHR.status)
        }else{
          $("#status").text("")
        }
        });
        
      });
    
    });
  </script>