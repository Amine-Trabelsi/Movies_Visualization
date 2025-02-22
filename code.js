document.addEventListener('DOMContentLoaded', () => {
    // Load the JSON file
    fetch('films.json')
      .then(response => response.json())
      .then(data => displayMovies(data))
      .catch(error => console.error('Error loading JSON:', error));
});
  
function displayMovies(movies) {
const container = document.getElementById('movies-container');

movies.forEach(movie => {
    // Create a card for each movie
    const card = document.createElement('div');
    card.className = 'movie-card';
    
    // Use template literals to create the inner HTML
    card.innerHTML = `
    <h2>${movie.title}</h2>
    <p><strong>Year:</strong> ${movie.release_year}</p>
    <p><strong>Director:</strong> ${movie.director}</p>
    <p><strong>Box Office:</strong> ${movie.box_office}</p>
    <p><strong>Country:</strong> ${movie.country}</p>
    `;
    
    container.appendChild(card);
});
}
