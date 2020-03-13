

const rendermessages = function(messages) {
  console.log('rendermessages');
    for (const message of messages) {
      let $message = window.Meowza.createMessage(message);
      $(".messages-section").prepend($message);
    }
};

window.Meowza.rendermessages = rendermessages

// const showMessages = function () {
//   toggle.click(function() {
//     messagesSection.slideToggle()
// })
// }

// window.Meowza.showMessages = showMessages

const createMessage = function(message) {
  const markup = `
    <article class= "message-card">
      <div class = "message-content">
          <div class= "message-header">
            <h3 class= "sender">From:${message.sender_name}</h3>
            <h3 class= "reciever">To:${message.receiver_name}</h3>
          </div>
          <div class= "message-body">
            Message: ${message.message}
          </div>
          <div class= "reply-form">
          <form action="/sendMessage" method="POST" class= "message-reply">
          <input name="catId" value="${message.cat_id}" hidden="">
          <input name="ownerId" value="${message.sender_id}" hidden="">
          <textarea name="message" placeholder="Your reply goes here :)"></textarea>
          <button class=" mdc-button mdc-button--raised reply-button" type="submit">
          <div class="mdc-button__ripple"></div>Reply</button>
          </form>
          </div>
      </div>
    </article>
    `;
  return markup;
};
window.Meowza.createMessage = createMessage

const messagesSection = `
<section class="messages-section">
</section>
`;

window.Meowza.messagesSection = messagesSection






