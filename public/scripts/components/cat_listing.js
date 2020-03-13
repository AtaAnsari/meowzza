window.Meowza.createListing = (cat, user) => {

  let avalClass = "";
  if (!cat.is_available) {
    avalClass = "cat-adopted";
  }
  if (user) {
    if (user.id === cat.owner_id) {
      return `

      <article data-catId="${
        cat.id
      }" class="cats-listing carousel-cell mdc-card--outline ${avalClass}">

        <div class="cat-details-container">
          <div class="cats-listing__preview-image">
            <img src="${cat.main_photo_url}" alt="cat's photo">
          </div>
          <div class="cat_listing__interaction">
            <div class="mdc-card__actions">
              <button data-catId="${
                cat.id
              } "class="mdc-icon-button mdc-button--touch
                mdc-card__action mdc-card__action--icon cat_listing__interaction-button add-to-favourites"
                aria-pressed="false"
                aria-label="Add to favorites"
                title="Add to favorites">
                <i class="material-icons mdc-icon-button__icon mdc-icon-button__icon--on">favorite</i>
                <i class="material-icons mdc-icon-button__icon">favorite_border</i>
                <div class="mdc-button__touch"></div>
              </button>
              <button class="mdc-icon-button mdc-button--touch
                mdc-card__action mdc-card__action--icon
                aria-pressed="false"
                aria-label="Share to Facebook"
                title="Share to Facebook">
                <i class="material-icons mdc-icon-button__icon mdc-icon-button__icon--on"></i>
                <i class="fab fa-facebook material-icons mdc-icon-button__icon"></i>
                <div class="mdc-button__touch"></div>
              </button>
              <button class="mdc-icon-button mdc-button--touch
                mdc-card__action mdc-card__action--icon
                aria-pressed="false"
                aria-label="Share to Instagram"
                title="Share to Instagram">
                <i class="material-icons mdc-icon-button__icon mdc-icon-button__icon--on"></i>
                <i class="fab fa-instagram material-icons mdc-icon-button__icon"></i>
                <div class="mdc-button__touch"></div>
              </button>
              <button class="mdc-icon-button mdc-button--touch
                mdc-card__action mdc-card__action--icon
                aria-pressed="false"
                aria-label="Share to Twitter"
                title="Share to Twitter">
                <i class="material-icons mdc-icon-button__icon mdc-icon-button__icon--on"></i>
                <i class="fab fa-twitter material-icons mdc-icon-button__icon"></i>
                <div class="mdc-button__touch"></div>
              </button>
            </div>
          </div>
          <ul class="cat-listing__details">
            <li>Age: ${date - Number(cat.birthdate.slice(0, 4))} years</li>
            <li>Region: ${cat.region}</li>
            <li>Species: ${cat.species}</li>
            <li>Size: ${cat.size}</li>
            <li class="cat-listing__price">Adoption fee: $${cat.fee}</li>
          </ul>
        </div>

        <section class="cat-listing__details">
          <h3 class="cat-listing__name">${cat.name}</h3>

          <p>${cat.description}</p>

          <form action="/sendMessage" method="POST" class= "sending-message message-form">
          <input name="catId" value="${cat.id}" hidden="">
          <input name="ownerId" value="${cat.owner_id}" hidden="">
            <textarea name="message" placeholder="Interested? Leave a message directly for the owner!"></textarea>
            <label for="users-mail">Or get contacted by SMS:</label>
            <div class="email-button-container">
            <input type="number" class="users-mail phone" id="users-mail" placeholder="Your cell number">
            <button
              class="send-sms mdc-icon-button mdc-button--touch
              mdc-card__action mdc-card__action--icon
              aria-pressed="false"
              aria-label="Send SMS"
              title="Send SMS">
              <i class="material-icons mdc-icon-button__icon mdc-icon-button__icon--on"></i>
              <i class="fas fa-mobile-alt material-icons mdc-icon-button__icon"></i>
              <div class="mdc-button__touch"></div>
            </button>
              <button type="submit" class=" mdc-button message-form mdc-button--raised">
                <div class="mdc-button__ripple"></div>
                Message
              </button>
            </div>
          </form>
        </section>

       <button data-catId="${cat.id}" data-ownerId="${cat.owner_id}"

              class=" mdc-button--touch
              mdc-card__action mdc-card__action--icon x-delete-button"
              aria-pressed="false"
              aria-label="Remove cat"
              title="Remove cat"
              id="delete-btn"
            >
              <i class="material-icons mdc-icon-button__icon mdc-icon-button__icon--on"></i>
              <i class="far fa-trash-alt material-icons mdc-icon-button__icon"></i>
              <div class="mdc-button__touch"></div>
            </button>

            <button data-catId="${cat.id}" data-ownerId="${cat.owner_id}"
              class=" mdc-button--touch
              mdc-card__action mdc-card__action--icon sold-button"
              aria-pressed="false"
              aria-label="cat is unavailable"
              title="cat is unavailable"
              id="sold-btn"
            >

              <i class="material-icons mdc-icon-button__icon mdc-icon-button__icon--on"></i>
              <i class="far fa-pause-circle material-icons mdc-icon-button__icon"></i>
              <div class="mdc-button__touch"></div>
            </button>

      </article>`;
    } else {
      return `
    <article class="cats-listing mdc-card--outline ${avalClass}">
      <div class="cat-details-container">
        <div class="cats-listing__preview-image">
          <img src="${cat.main_photo_url}" alt="cat's photo">
        </div>
        <div class="cat_listing__interaction">
          <div class="mdc-card__actions">
            <button data-catId="${
              cat.id
            } "class="mdc-icon-button mdc-button--touch
              mdc-card__action mdc-card__action--icon cat_listing__interaction-button add-to-favourites"
              aria-pressed="false"
              aria-label="Add to favorites"
              title="Add to favorites">
              <i class="material-icons mdc-icon-button__icon mdc-icon-button__icon--on">favorite</i>
              <i class="material-icons mdc-icon-button__icon">favorite_border</i>
              <div class="mdc-button__touch"></div>
            </button>
            <button class="mdc-icon-button mdc-button--touch
              mdc-card__action mdc-card__action--icon
              aria-pressed="false"
              aria-label="Share to Facebook"
              title="Share to Facebook">
              <i class="material-icons mdc-icon-button__icon mdc-icon-button__icon--on"></i>
              <i class="fab fa-facebook material-icons mdc-icon-button__icon"></i>
              <div class="mdc-button__touch"></div>
            </button>
            <button class="mdc-icon-button mdc-button--touch
              mdc-card__action mdc-card__action--icon
              aria-pressed="false"
              aria-label="Share to Instagram"
              title="Share to Instagram">
              <i class="material-icons mdc-icon-button__icon mdc-icon-button__icon--on"></i>
              <i class="fab fa-instagram material-icons mdc-icon-button__icon"></i>
              <div class="mdc-button__touch"></div>
            </button>
            <button class="mdc-icon-button mdc-button--touch
              mdc-card__action mdc-card__action--icon
              aria-pressed="false"
              aria-label="Share to Twitter"
              title="Share to Twitter">
              <i class="material-icons mdc-icon-button__icon mdc-icon-button__icon--on"></i>
              <i class="fab fa-twitter material-icons mdc-icon-button__icon"></i>
              <div class="mdc-button__touch"></div>
            </button>
          </div>
        </div>
        <ul class="cat-listing__details">
          <li>Age: ${date - Number(cat.birthdate.slice(0, 4))} years</li>
          <li>Region: ${cat.region}</li>
          <li>Species: ${cat.species}</li>
          <li>Size: ${cat.size}</li>
          <li class="cat-listing__price">Adoption fee: $${cat.fee}</li>
        </ul>
      </div>

      <section class="cat-listing__details">
        <h3 class="cat-listing__name">${cat.name}</h3>

        <p>${cat.description}</p>
        <form action="/sendMessage" method="POST" class= "sending-message message-form">
        <input name="catId" value="${cat.id}" hidden="">
        <input name="ownerId" value="${cat.owner_id}" hidden="">
          <textarea name="message" placeholder="Interested? Leave a message directly for the owner!"></textarea>
          <label for="users-mail">Or get contacted by SMS:</label>
          <div class="email-button-container">
          <input type="number" class="users-mail phone" id="users-mail" placeholder="Your cell number">
            <button
              class="send-sms mdc-icon-button mdc-button--touch
              mdc-card__action mdc-card__action--icon
              aria-pressed="false"
              aria-label="Send SMS"
              title="Send SMS">
              <i class="material-icons mdc-icon-button__icon mdc-icon-button__icon--on"></i>
              <i class="fas fa-mobile-alt material-icons mdc-icon-button__icon"></i>
              <div class="mdc-button__touch"></div>
            </button>
            <button type="submit" class=" mdc-button message-form mdc-button--raised">
              <div class="mdc-button__ripple"></div>
              Message
            </button>
          </div>
        </form>
      </section>
    </article>
    `;
    }
  } else {
    return `
    <article class="cats-listing mdc-card--outline ${avalClass}">
      <div class="cat-details-container">
        <div class="cats-listing__preview-image">
          <img src="${cat.main_photo_url}" alt="cat's photo">
        </div>
        <div class="cat_listing__interaction">
          <div class="mdc-card__actions">
            <button data-catId="${
              cat.id
            } "class="mdc-icon-button mdc-button--touch
              mdc-card__action mdc-card__action--icon cat_listing__interaction-button add-to-favourites"
              aria-pressed="false"
              aria-label="Add to favorites"
              title="Add to favorites">
              <i class="material-icons mdc-icon-button__icon mdc-icon-button__icon--on">favorite</i>
              <i class="material-icons mdc-icon-button__icon">favorite_border</i>
              <div class="mdc-button__touch"></div>
            </button>
            <button class="mdc-icon-button mdc-button--touch
              mdc-card__action mdc-card__action--icon
              aria-pressed="false"
              aria-label="Share to Facebook"
              title="Share to Facebook">
              <i class="material-icons mdc-icon-button__icon mdc-icon-button__icon--on"></i>
              <i class="fab fa-facebook material-icons mdc-icon-button__icon"></i>
              <div class="mdc-button__touch"></div>
            </button>
            <button class="mdc-icon-button mdc-button--touch
              mdc-card__action mdc-card__action--icon
              aria-pressed="false"
              aria-label="Share to Instagram"
              title="Share to Instagram">
              <i class="material-icons mdc-icon-button__icon mdc-icon-button__icon--on"></i>
              <i class="fab fa-instagram material-icons mdc-icon-button__icon"></i>
              <div class="mdc-button__touch"></div>
            </button>
            <button class="mdc-icon-button mdc-button--touch
              mdc-card__action mdc-card__action--icon
              aria-pressed="false"
              aria-label="Share to Twitter"
              title="Share to Twitter">
              <i class="material-icons mdc-icon-button__icon mdc-icon-button__icon--on"></i>
              <i class="fab fa-twitter material-icons mdc-icon-button__icon"></i>
              <div class="mdc-button__touch"></div>
            </button>
          </div>
        </div>
        <ul class="cat-listing__details">
          <li>Age: ${date - Number(cat.birthdate.slice(0, 4))} years</li>
          <li>Region: ${cat.region}</li>
          <li>Species: ${cat.species}</li>
          <li>Size: ${cat.size}</li>
          <li class="cat-listing__price">Adoption fee: $${cat.fee}</li>
        </ul>
      </div>

      <section class="cat-listing__details">
        <h3 class="cat-listing__name">${cat.name}</h3>

        <p>${cat.description}</p>
        <form>
          <textarea class="message" placeholder="Interested? Leave a message directly for the owner!"></textarea>
          <div class="email-button-container">
            <button type="submit" class="mdc-button mdc-button--raised">
              <div class="mdc-button__ripple"></div>
              Message
            </button>
          </div>
        </form>
      </section>
    </article>
    `;
  }
};
