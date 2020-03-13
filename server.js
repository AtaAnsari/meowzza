// load .env data into process.env
require('dotenv').config();

// loading the database functions

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');
const cookieSession = require('cookie-session');
// email functionality
// const nodemailer = require('nodemailer');
// async function sendEmail() {
//   // Generate test SMTP service account from ethereal.email
//   // create reusable transporter object for host configuration
//   let transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: 'stevencschoi87@gmail.com', // generated ethereal user
//       pass: '' // generated ethereal password
//     }
//   });

//   // send mail with defined transport object
//   let info = await transporter.sendMail({
//     from: '"Meowzza 👻" <stevencschoi87@gmail.com>', // sender address
//     to: "stevenspamlol@gmail.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<p>This is a test!</p>" // html body
//   });

//   console.log("Message sent: %s", info.messageId);
//   // Preview only available when sending through an Ethereal account
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
// }
// main().catch(console.error);

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

const databaseHelperFunctions = require('./routes/database')(db);

// Using cookies to maintain logged in state

app.use(cookieSession({
  name: 'session',
  keys: ['key1']
}));

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const adminRoutes = require("./routes/admin");
// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/users", usersRoutes(databaseHelperFunctions));
app.use("/admin", adminRoutes(databaseHelperFunctions));
// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.render("index");
});


// Allows users to login and Logout

app.post('/logout', (req, res) => {
  console.log('hitting logout route');
  req.session= null;
  res.send({});
});

app.post('/login', (req, res) => {
  const {userId} = req.body;
  databaseHelperFunctions.login(userId)
  .then(user => {console.log(user[0].id)
  req.session.userId = user[0].id;
  res.json(user[0])
  })
  .catch(e => res.send(e));
});

// returns message history for each user
app.get("/myMessages", (req, res) => {
  userid = req.session.userId;
  databaseHelperFunctions
    .getMessages(userid)
    .then(data => res.json(data))
    .catch(err => res.status(500).send(err));
});

// Allows Admin to post messages

app.post("/sendMessage", (req, res) => {
  console.log("msq sent");
  catid = req.body.catId;
  ownerid = req.body.ownerId;
  userid = req.session.userId;
  newMsg =req.body.message;
  databaseHelperFunctions
    .createMsgPost(newMsg, userid, catid, ownerid)
    .then(data => res.json(data))
    .catch(err => res.status(500).send(err));;
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
