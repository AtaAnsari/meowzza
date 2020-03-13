// $(() => {
//   const $catListings = $(`
//     <section class="cats-container">
//     </section>
//   `);

//   window.$catListings = $catListings;
//   window.catListings = {};

//   function addCat(newCat) {
//     $catListings.append(newCat);
//   }

//   function clearCats() {
//     $catListings.empty();
//   }
//   window.catListings.clearCats = clearCats;

//   function addCats(cats) {
//     clearCats();
//     for (const catId in cats) {
//       const cat = cats[catId];
//       const listing = catListing.createListing(property, isReservation);
//       addListing(listing);
//     }
//   }
//   window.catListings.addCats = addCats;

//   const $main = $("main");
//   $main.append($catListings);
// });
