window.header = {};

const $pageHeader = $("header");
const $newListing = $(".new-listing");

function updateHeader(user) {
  $(".focus-span").focus();
  $pageHeader.find(".user-nav").remove();
  $(".new-cat-form-section")
    .find(".new-cat-form")
    .remove();
  // Meowza.addNewCatForm(user);
  let userNav;
  userNav = `
  <nav class="user-nav">
    <ul>
      <li class="hover user-link home-button">
        <a href="#">Home page</a>
      </li>
      <li class="hover user-link favourites-button">
        <a href="#">Favourites</a>
      </li>
    </ul>
    <ul class="user-links">
    </ul>
  </nav>`;
  $pageHeader.prepend(userNav);

  function updateUserLinks(user) {
    //console.log("test");

    let usersLinks;
    if (!user) {
      usersLinks = `
        <form class="login-form" action="/users/login" method="POST">
          <input class="login-input margin-right" name="userId" id="login" type="text" placeholder="Enter your account"></input>
          <button class="padding-left mdc-button mdc-button--raised" type="submit" id="login-btn">
            <div class="mdc-button__ripple"></div>
            Log in
          </button>
        </form>`;
    } else {
      if (!user.is_admin) {
        usersLinks = `
          <li class="hover padding-left padding-right message-link">Inbox</li>
          <li class="padding-left padding-right">Hi, ${user.name}!</li>
          <button class="logout-button mdc-button mdc-button--raised">
            <div class="mdc-button__ripple"></div>
            Log out
          </button>
        `;
      } else {
        usersLinks = `
          <li class="hover padding-left padding-right message-link">Inbox</li>
          <li class="hover user-link owner-button">
            <a>My cats</a>
          </li>
          <button class="user-link translucent create-button mdc-button mdc-button--raised">
            <div class="mdc-button__ripple"></div>
            Add cat
          </button>
          <li class="padding-left padding-right">Hi, ${user.name}!</li>
          <button class="logout-button mdc-button mdc-button--raised">
            <div class="mdc-button__ripple"></div>
            Log out
          </button>`
      }
    }
    //console.log(usersLinks)
    $(".user-links").append(usersLinks);
    //Meowza.addNewCatForm(user);
  }
  updateUserLinks(user);

}

  window.Meowza.update = updateHeader;
  //window.Meowza.updateLinks = updateUserLinks;

  //updateHeader(user1);


  // getMyDetails().then(function(json) {
  //   updateHeader(json.user);
  // });

  //  $("header").on("click", ".favourites-button", function() {
  //    window.Meowza.catListings.empty();
  //    loadFavouriteCats();
  //  })

  //  $("header").on("click", ".home-button", function() {
  //    window.Meowza.catListings.empty();
  //    loadCats();
  //  });

  //  $("header").on("click", ".owner-button", function() {
  //    window.Meowza.catListings.empty();
  //    loadMyCats();
  //  });

  //  $("header").on("click", ".create-button", function() {
  //    $(".new-cat-form").toggle();
  //   //  $("header").on("click", ".create-button", function() {
  //   //    $(".new-cat-form").hide();
  //   //  });
  //  });


  //   getAllReservations()
  //     .then(function(json) {
  //       propertyListings.addProperties(json.reservations, true);
  //       views_manager.show("listings");
  //     })
  //     .catch(error => console.error(error));
  // });
  // $("header").on("click", ".my_listing_button", function() {
  //   propertyListings.clearListings();
  //   getAllListings(`owner_id=${currentUser.id}`).then(function(json) {
  //     propertyListings.addProperties(json.properties);
  //     views_manager.show("listings");
  //   });
  // });

  // $("header").on("click", ".home", function() {
  //   propertyListings.clearListings();
  //   getAllListings().then(function(json) {
  //     propertyListings.addProperties(json.properties);
  //     views_manager.show("listings");
  //   });
  // });

  // $("header").on("click", ".search_button", function() {
  //   views_manager.show("searchProperty");
  // });

  // $("header").on("click", ".login_button", () => {
  //   views_manager.show("logIn");
  // });
  // $("header").on("click", ".sign-up_button", () => {
  //   views_manager.show("signUp");
  // });
  // $("header").on("click", ".logout_button", () => {
  //   logOut().then(() => {
  //     header.update(null);
  //   });
  // });

  // $("header").on("click", ".create_listing_button", function() {
  //   views_manager.show("newProperty");
  // });

