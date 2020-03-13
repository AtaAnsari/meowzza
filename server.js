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
// *********Please uncomment the code below to use the twilio functionality*********
// const msgRoutes = require("./routes/send_sms");

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
const usersRoutes = require("./routes/users");
const adminRoutes = require("./routes/admin");
// Mount all resource routes
app.use("/users", usersRoutes(databaseHelperFunctions));
app.use("/admin", adminRoutes(databaseHelperFunctions));
// *********Please uncomment the code below to use the twilio functionality*********
// app.use("/send_sms", msgRoutes());


// Home page
app.get("/", (req, res) => {
  res.render("index");
});

// ******Shared routes******
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
