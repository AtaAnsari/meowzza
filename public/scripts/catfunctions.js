const logOut = () => {
  $.ajax({
    method: "POST",
    url: "/logout",
    success: () => {
      $.ajax({
        url: `/users/`,
        type: "GET",
        dataType: "JSON",
        success: response => {
          Meowza.update(null);
          renderCats(response, null);
        }
      });
    }
  });
};

const loadCats = user => {
  $.ajax({
    url: `/users/`,
    type: "GET",
    dataType: "JSON",
    success: response => {
      renderCats(response, user);
    }
  });
};

window.Meowza.loadCats = loadCats;

const loadFavouriteCats = user => {
  $.ajax({
    url: `/users/favourites`,
    type: "GET",
    dataType: "JSON",
    success: response => {
      renderCats(response, user);
    }
  });
};

const loadMyCats = user => {
  $.ajax({
    url: `/admin/mycats`,
    type: "GET",
    dataType: "JSON",
    success: response => {
      renderCats(response, user);
    }
  });
};

let today = new Date();
let date = today.getFullYear();

const renderCats = (cats, user) => {
  $("main")
    .find(".cats-container")
    // clear container before rendering
    .remove();
  // section to add all cats to
  const $catListings = $(`
  <section class="cats-container">
  </section>
  `);

  window.Meowza.catListings = $catListings;
  window.Meowza.user = user;

  cats.forEach(cat => {
    $catListings.append(Meowza.createListing(cat, user));
    // add featured cats to carousel
    $('.carousel').flickity( 'append', Meowza.createFeatured(cat));
  });
  $("main").append($catListings);
};

// --------------FILTER CATS --------------
const loadFilteredCats = (user) => {
  $.ajax({
    url: `/users/filteredCats`,
    type: "GET",
    data: $(".filters-form").serialize(),
    success: response => {
      renderCats(response, user);
    }
  });
};

// --------------ADD TO FAVOURITES --------------
const addToFavourites = function() {
  const catId = $(this).data("catid");
  $.ajax({
    url: `/users/addToFavourites`,
    type: "POST",
    data: `catId=${catId}`,
    success: response => {
      console.log(response);
    }
  });
};

// ---------CREATE NEW CAT---------
const createNewCat = function(user) {
  $.ajax({
    url: `/admin/newcat`,
    type: "POST",
    data: $(".new-cat-form").serialize(),
    success: () => {
      $.ajax({
        url: `/users/`,
        type: "GET",
        dataType: "JSON",
        success: data => {
          $(".cats-container").empty();
          renderCats(data, user);
        }
      });
    }
  });
};

//--------------DELETE CAT--------------
const deleteCat = function() {
  const catId = $(this).data("catid");
  $.ajax({
    url: `/admin/deleteCat`,
    type: "DELETE",
    data: `catId=${catId}`,
    success: () => {
      $.ajax({
        url: `/users/`,
        type: "GET",
        dataType: "JSON",
        success: data => {
          $(".cats-container").empty();
          renderCats(data, window.Meowza.user);
        }
      });
    }
  });
};

//--------------SHOW MESSAGES--------------
const showMsgList = function () {
  $.ajax({
    url: `/myMessages`,
    type: "GET",
    dataType: "JSON",
    success: data => {
      $(".messages-section").empty();
      window.Meowza.rendermessages(data)
    }
  });
}

//-------------- MARK CAT AS UNAVAILABLE ---------
const markCatSold = function (listing) {
  const catId = listing["0"].dataset.catid;
  listing.toggleClass("cat-adopted");
  $.ajax({
    url: `/admin/updateCat`,
    type: "PUT",
    data: `catId=${catId}`,
    success: () => {
     $.ajax({
       url: `/users/`,
       type: "GET",
       dataType: "JSON",
       success: data => {
         $(".cats-container").empty();
         renderCats(data, window.Meowza.user);
       }
     });
    }
  });
}

//--------------SEND MESSAGES--------------
const sendMsg = function (form) {
  $.ajax({
    url: `/sendMessage`,
    type: "POST",
    data: $(form).serialize(),
    success: () => {
      console.log('SUCCESS');
      Meowza.loadCats(Meowza.user)
    },
    error: (error) => {
      console.log('ERROR', error);
    }
  });
}

//--------------SEND REPLY--------------
const sendReply = function (form) {
  $.ajax({
    url: `/sendMessage`,
    type: "POST",
    data: $(form).serialize(),
    success: () => {
      console.log('SUCCESS');
      $.ajax({
        url: `/myMessages`,
        type: "GET",
        dataType: "JSON",
        success: data => {
          $(".messages-section").empty();
          window.Meowza.rendermessages(data)
        }
      })
    }
  })
}

//--------------SEND SMS--------------
const sendSms = function () {
  $.ajax({
    url: `/send_sms/send`,
    type: "POST",
    success: () => {
      console.log("Sent SMS!");
    }
  });
}

