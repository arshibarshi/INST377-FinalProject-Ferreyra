let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}

async function loadFavorites(){
  const response = await fetch('/api/favorites');
  const favorites = await response.json();

  const favoritesList = document.getElementById('favorites-list');
  favoritesList.innerHTML = '';

  if (favorites.length === 0) {
    favoritesList.innerHTML = '<p>No favorite items found.</p>';
    return;
  }

  favorites.forEach(pokemon => {
    const card = document.createElement('div');
    card.classList.add('favorite-card');
    card.innerHTML = `
      <img src="${pokemon.image_url}" alt="${pokemon.pokemon_name}">
      <p>${pokemon.pokemon_name}</p>
      <p>${pokemon.pokemon_type}</p>
    `;
    favoritesList.appendChild(card);
  })
}

loadFavorites();