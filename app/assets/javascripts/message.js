$(function(){
  function buildHTML(message){
    if (message.image.url) {// 「もしメッセージに画像が含まれていたら」という条件式
      console.log(message)
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
     </div>`;//メッセージに画像が含まれる場合のHTMLを作る
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
     </div>`;//メッセージに画像が含まれない場合のHTMLを作る
    }
    return html
  }
  $("#new_message").on("submit", function(e){
    //console.log(1)
    e.preventDefault(); //デフォルトの処理止
    var formData = new FormData(this); 
    var url = $(this).attr('action')
    $.ajax({
      url: url,  //同期通信でいう『パス』
      type: 'POST',  //同期通信でいう『HTTPメソッド』
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.message').append(html); //HTMLの構築
      $('.message').animate({ scrollTop: $('.message')[0].scrollHeight});//自動スクロール機能実施
      $('.new_message')[0].reset(); //フォーム全体に指定クラスかidのどちらかを持ってく、.クラス #id 
      $('.send').prop('disabled', false);//タイプ場所でタイプを連続押しを禁止させている disabledの解除
    })
    .fail(function() {
      //console.log("failr")
      alert("メッセージ送信に失敗しました");
    });    
  })
})