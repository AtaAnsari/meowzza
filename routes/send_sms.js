// const accountSid =
// const authToken =
const client = require('twilio')(accountSid, authToken);
const express = require('express');
const router  = express.Router();
// POST request for text messaging
module.exports = () => {
  router.post("/send", (req, res) => {
    return client.messages
      .create({
        // body: `Someone is interested in ${cat.name} - reply to them at ${user.phone}!`;
        body: 'Someone is interested in your cat!',
        from: '+18564082032',
        to: '+16472342464'
      })
      .then(message => console.log(message.sid));
  })
  return router;
}
