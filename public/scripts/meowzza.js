window.Meowza = {};

$(document).ready(() => {
  Meowza.update(Meowza.user);
  loadCats();
  $(document).on("submit", ".login-form", e => {
    e.preventDefault();
    getUser();
  });
});

const getUser = () => {
  $.ajax({
    url: `/login`,
    type: "POST",
    data: $(".login-form").serialize(),
    success: response => {
      //updates user object when login
      window.Meowza.user = response;
      // renders the page for authorized user
      Meowza.update(Meowza.user);
      Meowza.addNewCatForm(Meowza.user);
      Meowza.loadCats(Meowza.user);

      //EVENT HANDLERS
      //returns favourites
      $("header").on("click", ".favourites-button", function() {
        window.Meowza.catListings.empty();
        loadFavouriteCats(Meowza.user);
      });

      //filter cats
      $(".filters-form").submit(e => {
        e.preventDefault();
        window.Meowza.catListings.empty();
        loadFilteredCats(Meowza.user);
      });

      //go back to home page
      $("header").on("click", ".home-button", function() {
        window.Meowza.catListings.empty();
        loadCats(Meowza.user);
      });

      //to admins cats
      $("header").on("click", ".owner-button", function() {
        window.Meowza.catListings.empty();
        loadMyCats(Meowza.user);
      });

      //toggle newcat form
      $("header").on("click", ".create-button", function() {
        $(".new-cat-form").slideToggle();
      });

      //shows users messages
      $("header").on("click", ".message-link", function() {
        showMsgList()
        $(".messages-section").slideToggle();
      });

      //add cat to favs
      $(document).on("click", ".add-to-favourites", addToFavourites);

      //sends message
      $(document).on('submit', ".sending-message", function(e) {
        e.preventDefault()
        sendMsg(this);
      })

      //send reply
      $(document).on('submit', '.message-reply', function(e) {
        e.preventDefault()
        sendReply(this)
      })

      //submits new cat form
      $(document).on("submit", "#new-cat-form", e => {
        e.preventDefault();
        createNewCat(Meowza.user);
      });

      $(document).on("click", ".logout-button", logOut);
      $(document).on("click", "#delete-btn", deleteCat);

      //mark cats as sold
      $(document).on("click", "#sold-btn", e => {
        const card = $(e.target).closest(".cats-listing");
        markCatSold(card);
        e.preventDefault;
      });
      $(document).on("click", ".send-sms", sendSms);
    }
  });
  return Meowza.user;
};

$(".filters-form").submit(e => {
  e.preventDefault();
  window.Meowza.catListings.empty();
  loadFilteredCats();
});
