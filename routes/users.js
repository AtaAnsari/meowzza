/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
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
    console.log(req.query);
    databaseHelperFunctions
      .filterBySearch(req.query)
      .then(data => res.json(data))
      .catch(err => res.status(500).send(err));
  });

   // Add cat to favourite cats
  router.post('/addToFavourites', (req, res) => {
    console.log('addToFavs invoked(server)')
    //console.log(req.query);
    console.log(req.body);
    let catId = req.body.catId;
    let userId= req.session.userId;

    console.log('userId, users.js' + req.session.userId);
    databaseHelperFunctions
      .addToFavourites(userId, catId)
      .then(data => res.json(data))
      .catch(err => res.status(500).send(err));
  });

  return router;
};
