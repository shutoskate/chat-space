$(function(){
  function buildHTML(message){
    if (message.image.url) {
     var html = 
    `<div class="list">

     <div class="upper">

     <p class="name">

     ${message.user_name}

     </p>

     <p class="text">  

     ${message.created_at}

     </p>

     </div>

     <p class="post">

     ${message.content}

     <img class= "input-box-image" src= '${message.image.url}' >

     </p>

     </div>`;

    } 
    else {
      var html = 
    `<div class="list">

     <div class="upper">

     <p class="name"> 

     ${message.user_name}

     </p>

     <p class="text">

     ${message.created_at}

     </p>

     </div>

     <p class="post">

     ${message.content}

     </p>

     </div>`;
     
    }
    return html
  }
  $("#new_message").on("submit", function(e){
    e.preventDefault(); 
    var formData = new FormData(this); 
    var url = $(this).attr('action')
    $.ajax({
      url: url,  
      type: 'POST',  
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.message').append(html); 
      $('.message').animate({ scrollTop: $('.message')[0].scrollHeight});
      $('.new_message')[0].reset(); 
      $('.send').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  })
})