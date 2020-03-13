/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (databaseHelperFunctions) => {

  // All cats are displayed when the user arrives on main page
  router.get("/", (req, res) => {
    console.log('IT WORKS');
    databaseHelperFunctions.getAllCats()
    .then(data => res.json(data))
    .catch(err => res.status(500).send(err))
  });

  // Only favourite cats are displayed when the 'show favourites' button is clicked
  router.get("/favourites", (req, res) => {
    console.log('IT WORKS');
    userid =  req.session.userId
    databaseHelperFunctions.getFavourites(userid)
    .then(data => res.json(data))
    .catch(err => res.status(500).send(err))
  });

  // Only filtered cats are displayed
  router.get('/filteredCats', (req, res) => {
    databaseHelperFunctions.filterBySearch(req.query)
    .then(data => res.json(data))
    .catch(err => res.status(500).send(err))
  });

  // Only renders Admin's own cats

  router.get('/mycats', (req, res) => {
    userid =  req.session.userId
    databaseHelperFunctions.getMyCats(userid)
    .then(data => res.json(data))
    .catch(err => res.status(500).send(err))
  });

  //create new cat
  router.post("/newcat", (req, res) => {
    console.log("cat WORKS");
    userid = req.session.userId;
    const newcat = req.body;
    databaseHelperFunctions
      .createNewCat(newcat, userid)
      .then(data => res.json(data))
      .catch(err => res.status(500).send(err));
  });

  //delete cat
  router.delete("/deleteCat", (req, res) => {
  catId = req.body.catId
  databaseHelperFunctions.deleteCat(catId)
  .then(data => res.json(data))
  .catch(err => res.status(500).send(err))
});

  // route to handle email posts
  router.post('/send', (req, res) => {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }

    const { to, subject, text } = req.body;
    databaseHelperFunctions.sendEmail(to, subject, text);
  });


   // route to mark cats as sold

  router.put("/updateCat", (req, res) => {
    catId = req.body.catId;
    console.log('route /updatecat');
    console.log(`${catId} is cat id`);
    databaseHelperFunctions
      .markCatUnavailable(catId)
      .then(data => res.json(data))
      .catch(err => res.status(500).send(err));
  });

  return router;
};




