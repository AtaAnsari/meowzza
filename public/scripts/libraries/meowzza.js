window.Meowza = {};

$(document).ready(() => {
  Meowza.update(Meowza.user);
  loadCats();
  $(document).on("submit", ".login-form", e => {
    e.preventDefault();
    getUser();
  });
  //$("body").scrollTop(0);
});


const getUser = () => {
  $.ajax({
    url: `/login`,
    type: "POST",
    data: $(".login-form").serialize(),
    success: response => {
      window.Meowza.user = response;
      console.log(`user at login ${JSON.stringify(Meowza.user)}`);
      Meowza.update(Meowza.user);
      Meowza.addNewCatForm(Meowza.user);
      Meowza.loadCats(Meowza.user);
      $("header").on("click", ".favourites-button", function() {
        window.Meowza.catListings.empty();
        loadFavouriteCats(Meowza.user);
      });
      $(".filters-form").submit(e => {
        e.preventDefault();
        window.Meowza.catListings.empty();
        loadFilteredCats(Meowza.user);
      });

      $("header").on("click", ".home-button", function() {
        window.Meowza.catListings.empty();
        loadCats(Meowza.user);
      });

      $("header").on("click", ".owner-button", function() {
        window.Meowza.catListings.empty();
        loadMyCats(Meowza.user);
      });

      $("header").on("click", ".create-button", function() {
        $(".new-cat-form").slideToggle();
      });

      $("header").on("click", ".message-link", function() {
        showMsgList()
        $(".messages-section").slideToggle();
      });

      $(document).on("click", ".add-to-favourites", addToFavourites);

      $(document).on('submit', ".sending-message", function(e) {
        console.log('invoking sendMsg')
        e.preventDefault()
        sendMsg(this);
      })

      $(document).on('submit', '.message-reply', function(e) {
        e.preventDefault()
        sendReply(this)
      })

      $(document).on("submit", "#new-cat-form", e => {
        e.preventDefault();
        console.log("form submitted");
        createNewCat(Meowza.user);
      });

      $(document).on("click", ".logout-button", logOut);
      $(document).on("click", "#delete-btn", deleteCat);

      $(document).on("click", "#sold-btn", e => {
        console.log(e.target);
        const card = $(e.target).closest(".cats-listing");
        console.log(card);
        markCatSold(card);
        e.preventDefault;

      });
    }
  });
  return Meowza.user;
};

const logOut = () => {
  $.ajax({
    method: "POST",
    url: "/logout",
    // data:
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
    //dataType: "JSON",
    data: $(".filters-form").serialize(),
    success: response => {
      //console.log(response);
      renderCats(response, user);
    }
  });
};

$(".filters-form").submit(e => {
  //console.log(e);
  e.preventDefault();
  //console.log("filtered");
  window.Meowza.catListings.empty();
  loadFilteredCats();
});

// --------------ADD TO FAVOURITES --------------
const addToFavourites = function() {
  // console.log("addToFAvs invoked");
  // console.log(this);
  const catId = $(this).data("catid");
  // console.log(catId);
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
      //console.log("data submitted to db succ");
      $.ajax({
        url: `/users/`,
        type: "GET",
        dataType: "JSON",
        success: data => {
          //console.log("data recieved from server");
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
          //console.log(`user at deleteCat ${JSON.stringify(window.Meowza.user)}`);
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
  //console.log(this);
  //console.log(listing["0"].dataset.catid)
  const catId = listing["0"].dataset.catid;
  //console.log(catId);
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
         //console.log("data recieved from server");
         $(".cats-container").empty();
         renderCats(data, window.Meowza.user);
       }
     });
    }
  });
}

//--------------SEND MESSAGES--------------


const sendMsg = function (form) {
  console.log('getting info from user');

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
  console.log('Reply initiated');

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

