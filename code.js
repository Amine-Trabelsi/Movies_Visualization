// Global variable to store all movies loaded from the JSON file
let allMovies = [];

document.addEventListener('DOMContentLoaded', () => {
  // Load the JSON file (films.json)
  fetch('films.json')
    .then(response => response.json())
    .then(data => {
      allMovies = data;
      applyFilters();
    })
    .catch(error => console.error('Error loading JSON:', error));

  // Event listeners for filtering and sorting
  document.getElementById('filterInput').addEventListener('input', applyFilters);
  document.getElementById('sortSelect').addEventListener('change', applyFilters);
});

function displayMovies(movies) {
  const container = document.getElementById('movies-container');
  container.innerHTML = ""; // Clear any existing content

  movies.forEach(movie => {
    // Create the movie card element
    const card = document.createElement('div');
    card.className = 'movie-card';

    // Base section: displays image, title, and year
    const base = document.createElement('div');
    base.className = 'movie-base';

    // Include an image tag if an image is available
    let imageHTML = "";
    if (movie.image) {
      imageHTML = `<img src="${movie.image}" alt="${movie.title}">`;
    }
    base.innerHTML = `
      ${imageHTML}
      <h2>${movie.title}</h2>
      <p>${movie.release_year}</p>
    `;
    
    // Overlay section: displays additional details (shown on hover)
    const overlay = document.createElement('div');
    overlay.className = 'movie-overlay';
    overlay.innerHTML = `
      <p><strong>Director:</strong> ${movie.director}</p>
      <p><strong>Box Office:</strong> ${movie.box_office}</p>
      <p><strong>Country:</strong> ${movie.country}</p>
    `;
    
    // Append the base and overlay to the card
    card.appendChild(base);
    card.appendChild(overlay);
    container.appendChild(card);
  });
}

function applyFilters() {
  const filterValue = document.getElementById('filterInput').value.trim().toLowerCase();
  const sortBy = document.getElementById('sortSelect').value;

  // Filter movies by title or director based on the input
  let filteredMovies = allMovies.filter(movie => {
    return movie.title.toLowerCase().includes(filterValue) ||
           movie.director.toLowerCase().includes(filterValue);
  });

  // Sort the filtered movies based on the selected sort option
  if (sortBy === "title") {
    filteredMovies.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortBy === "release_year") {
    filteredMovies.sort((a, b) => (a.release_year || 0) - (b.release_year || 0));
  } else if (sortBy === "director") {
    filteredMovies.sort((a, b) => a.director.localeCompare(b.director));
  }

  displayMovies(filteredMovies);
}
