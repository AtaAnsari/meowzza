window.header = {};

const $pageHeader = $("header");
const $newListing = $(".new-listing");

function updateHeader(user) {
  $(".focus-span").focus();
  $pageHeader.find(".user-nav").remove();
  $(".new-cat-form-section")
    .find(".new-cat-form")
    .remove();
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
    $(".user-links").append(usersLinks);
  }
  updateUserLinks(user);
}

  window.Meowza.update = updateHeader;

