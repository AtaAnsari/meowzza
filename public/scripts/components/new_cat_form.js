function addNewCatForm(user) {
  $(".new-cat-form-section").find(".new-cat-form").remove();
  const $catFormSection = $(".new-cat-form-section");
  let $newCatForm = `<form action="/admin/newcat" method="POST" id="new-cat-form" class="new-cat-form">
      <h3><i class="fas fa-paw"></i> Create your cat listing</h3>

      <div.add-form-container>
        <fieldset class="new-cat-form__field-wrapper">
          <label for="new-name-form__name">Your cat's name:</label>
          <input type="text" class="my-cat-name" name="cat_name" placeholder="Fluffy" id="new-cat-form__name">
        </fieldset>

        <fieldset>
          <textarea placeholder="Add your description here" name="description" id="cat-form__description" cols="30" rows="4"></textarea>
        </fieldset>

        <div class="new-cat-form__field-wrapper">
          <label for="new-cat-form__cover">Cat's Image URL</label>
          <input class="my-cat-image" placeholder="Image URL" type="text" name="cover_photo_url" id="new-cat-form__cover">
        </div>

        <div class="new-cat-form__field-wrapper">
          <label for="new-cat-form__birth-date">Date of birth:</label>
          <input class="my-cat-dob" placeholder="2018-12-31" type="date" name="birth-date" id="new-cat-form__birth-date">
        </div>

        <div class="new-cat-form__field-wrapper">
          <label for="new-cat-form__species">Species:</label>
          <input class="my-cat-species" placeholder="Puma" type="text" name="species" id="new-cat-form__species">
        </div>

        <div class="new-cat-form__field-wrapper">
          <label for="new-cat-form__size">Size:</label>
          <select class="my-cat-size" id="new-cat-form__size" name="size">
            <option name="size" value="s">S</option>
            <option name="size" value="m">M</option>
            <option name="size" value="l">L</option>
          </select>
        </div>
      </div>

        <div class="new-cat-form__field-wrapper">
          <label for="new-cat-form__region">Region:</label>
          <select class="my-cat-region" id="new-cat-form__region" name="region">
            <option name="region" value="northAmerica">North America</option>
            <option name="region" value="southAmerica">South America</option>
            <option name="region" value="europe">Europe</option>
            <option name="region" value="asia">Asia</option>
            <option name="region" value="africa">Africa</option>
            <option name="region" value="antarctica">Antarctica</option>
            <option name="region" value="oceania">Oceania</option>
            <option name="region" value="australia">Australia</option>
          </select>
        </div>

        <div class="new-cat-form__field-wrapper">
          <label for="new-cat-form__fee">Adoption fee ($USD):</label>
          <input class="my-cat-fee" placeholder="5000" type="number" name="adoption_fee" id="new-cat-form__fee">
        </div>

      </div>

      <div class="form-buttons">
        <button class="mdc-button mdc-button--raised" type="submit">
          <div class="mdc-button__ripple"></div>
          Create
        </button>
        <button class="mdc-button mdc-button--raised" type="reset">
          <div class="mdc-button__ripple"></div>
          Reset
        </button>
      </div>

    </form>`;
    window.Meowza.newCatForm = $newCatForm
    if (user.is_admin) {
    $catFormSection.append($newCatForm);
  }
}

window.Meowza.addNewCatForm = addNewCatForm;

