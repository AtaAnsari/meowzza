const nodemailer = require('nodemailer');
module.exports = (db) => {
// *********** HELPER FUNCTIONS FOR USER ROUTES & ADMIN ROUTES ************
  const getAllCats = function () {
    return db
      .query(`SELECT * FROM cats ORDER BY is_available DESC;`)
      .then(res => res.rows)
      .catch(err => console.error("query error", err.stack));
  }
  const getAllUsers = function () {
    return db.query(`SELECT * FROM users;`)
    .then(res => res.rows[0] )
    // .catch(err => console.error('query error', err.stack));
  }
  const getFavourites = function (userId) {
    return db
    .query(    `
    SELECT * FROM cats
    JOIN favourites ON cats.id = cat_id
    WHERE favourites.user_id = $1
    ORDER BY is_available DESC
    `,
    [userId]
    )
    .then(res => res.rows);
  }

  const filterBySearch = function(options) {
    const queryParams = [];
    const whereClauses = [];
    let queryString = `
    SELECT *
    FROM cats
    `;
  if (options.minimum_fee && options.maximum_fee) {
    queryParams.push(`${options.minimum_fee}`);
    queryParams.push(`${options.maximum_fee}`);
    whereClauses.push(`fee >= $${queryParams.length - 1} AND fee <= $${queryParams.length} `);
  } else if (options.minimum_fee) {
    queryParams.push(`${options.minimum_fee}`);
    whereClauses.push(`fee >= $${queryParams.length}`);
  } else if (options.maximum_fee) {
    queryParams.push(`${options.maximum_fee}`);
    whereClauses.push(`fee <= $${queryParams.length} `);
  }
  if (options.region) {
    queryParams.push(`${options.region}`);
    whereClauses.push(`region IN ($${queryParams.length}) `);
  }
  if (options.size) {
    queryParams.push(options.size);
    whereClauses.push(`size IN ($${queryParams.length}) `);
  }
  if (whereClauses.length) {
    queryString += `WHERE ${whereClauses.join(' AND ')}`;
  }
    queryString += `
    ORDER BY fee
    LIMIT 10;
    `;
    return db.query(queryString, queryParams)
    .then(res => res.rows);
  }

  const createMsgPost = function (message, userId, catId, ownerId) {
    return db.query(`
    INSERT INTO messages (receiver_id, cat_id, sender_id, message)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `, [ownerId, catId, userId, message])
    .then(res => res.rows)
    .catch(err => console.log(err));
  }

  const createNewCat = function(newcat, userId) {
    return db
      .query(
        `
      INSERT INTO cats (owner_id, name, description, main_photo_url, fee, birthdate, region, size, species, is_available)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *;
    `,
        [
          userId,
          newcat.cat_name,
          newcat.description,
          newcat.cover_photo_url,
          Number(newcat.adoption_fee),
          newcat["birth-date"],
          newcat.region,
          newcat.size,
          newcat.species,
          true
        ]
      )
      .then(res => res.rows[0])
      .catch(err => console.log(err));
  };

  const login =  function(userId) {
    return db.query(`
    SELECT * FROM users
    WHERE id = $1
    `, [userId])
    .then(res => res.rows)
  }

  const getMessages = function(userId) {
    return db
      .query(
        `
      SELECT users.name as sender_name, allMsgsNames.* from
      (SELECT users.name as receiver_name, allMsgs.* from
      (SELECT messages.* FROM messages
      WHERE receiver_id = $1 OR sender_id = $1
      ORDER BY cat_id, id) AS allMsgs
      left outer JOIN users ON allMsgs.receiver_id=users.id) AS allMsgsNames
      left outer JOIN users ON allMsgsNames.sender_id=users.id
      order by allMsgsNames.id;
      `,
        [userId]
      )
      .then(res => res.rows);
  };

  const addToFavourites = function (userId, catId) {
    return db
      .query(
        `
    INSERT INTO favourites (user_id, cat_id)
    VALUES ($1, $2)
    RETURNING *;
    `,
        [userId, catId]
      )
      .then(res => {
        res.rows})
      .catch(err => {
        // if combination exists in favourites, delete from favourites db
        if (err.code === '23505') {
          return db
            .query(
            `
              DELETE FROM favourites
              WHERE
              user_id = $1 AND cat_id = $2
              RETURNING *;
            `,
            [userId, catId]
          );
        }
      })
  }
// *********** HELPER FUNCTIONS FOR ADMIN ROUTES ONLY************
  const getMyCats = function (userId) {
    return db
      .query(
        `
    SELECT * FROM cats
    WHERE owner_id = $1
    ORDER BY is_available DESC
    `,
        [userId]
      )
      .then(res => res.rows);
}

const deleteCat = function(catId) {
  return db
    .query(
      `
  DELETE FROM cats
  WHERE cats.id = $1;
    `,
      [catId]
    )
    .then(res => res.rows)
    .catch(err => console.log(err));
};

const markCatUnavailable = function(catId) {
  return db
    .query(
      `
  UPDATE cats
  SET is_available = false
  WHERE cats.id = $1;
    `,
      [catId]
    )
    .then(res => res.rows)
    .catch(err => console.log(err));

};

  return {
    getAllCats,
    getAllUsers,
    filterBySearch,
    getMessages,
    getMyCats,
    getFavourites,
    createMsgPost,
    createNewCat,
    login,
    addToFavourites,
    deleteCat,
    markCatUnavailable
  };
};

