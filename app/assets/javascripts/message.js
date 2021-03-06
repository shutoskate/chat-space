$(function(){

  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.list:last').data("message-id");
    console.log(last_message_id);
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      //追加するHTMLの入れ物を作る
      var insertHTML = '';
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      //メッセージが入ったHTMLに、入れ物ごと追加
      $('.message').append(insertHTML);
      $('.message').animate({ scrollTop: $('.message')[0].scrollHeight});
    })
    .fail(function() {
      console.log('error');
    });
  };

  function buildHTML(message){
    if (message.image) {
     var html = 
    `<div class="list" data-message-id='${message.id}'>

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

     <img class= "input-box-image" src= '${message.image}' >

     </p>

     </div>`;

    } 
    else {
      var html = 
    `<div class="list" data-message-id='${message.id}'>

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
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});
