
document.getElementById('searchForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const departure = document.getElementById('departure').value;
  const arrival = document.getElementById('arrival').value;
  const date = document.getElementById('date').value;

  try {
    const response = await fetch(`http://localhost:3000/trips/search?departure=${departure}&arrival=${arrival}&date=${date}`);
    const result = await response.json();

    const trainListDiv = document.getElementById('trainList');
    trainListDiv.innerHTML = ""; // Réinitialiser la liste des trains

    if (response.ok) {
      result.foundTrips.forEach(trip => {
        const tripDiv = document.createElement('div');
        tripDiv.className = "train-item"; // Utiliser "train-item"

        const tripDate = new Date(trip.date);
        const formattedTime = tripDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        tripDiv.innerHTML = `
          <span>${trip.departure} > ${trip.arrival}</span>
          <div class="train-time-price">
            <span>${formattedTime}</span>
            <span>${trip.price} €</span>
          </div>
          <button class="book-button" data-trip-id="${trip._id}">Book</button>
        `;

        trainListDiv.appendChild(tripDiv);
      });

      // Ajouter des écouteurs d'événements aux boutons "Book"
      document.querySelectorAll('.book-button').forEach(button => {
        button.addEventListener('click', function () {
          const tripId = this.getAttribute('data-trip-id');
          addToCart(tripId);
        });
      });
    } else {
      trainListDiv.innerHTML = `<p>${result.message}</p>`;
    }
  } catch (error) {
    console.error('Error fetching trips:', error);
    document.getElementById('trainList').innerHTML = `<p>Server error. Please try again later.</p>`;
  }
});


// Ajout du trajet au panier (localStorage)
function addToCart(tripId) {
  // Rechercher le trajet correspondant via l'ID
  fetch(`http://localhost:3000/trips/${tripId}`)
    .then(response => response.json())
    .then(trip => {
      // Vérifier si le panier existe dans le localStorage
      let cart = JSON.parse(localStorage.getItem('cart')) || [];

      // Ajouter le trajet sélectionné dans le panier
      cart.push({
        id: trip._id,
        departure: trip.departure,
        arrival: trip.arrival,
        price: trip.price,
        date: trip.date
      });

      // Sauvegarder le panier mis à jour dans le localStorage
      localStorage.setItem('cart', JSON.stringify(cart));

      // Message de confirmation (optionnel)
      alert(`Trip from ${trip.departure} to ${trip.arrival} has been added to your cart.`);
    })
    .catch(error => {
      console.error('Error adding to cart:', error);
    });
}
