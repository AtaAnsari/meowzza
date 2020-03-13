window.Meowza.createFeatured = cat => {
  if (cat.is_featured) {
    return $(`
      <div class="carousel-cell">
        <img src="${cat.main_photo_url}" alt=${cat.name}>
      </div>
    `)
  }
};
