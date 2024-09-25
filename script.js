// Fonction pour ajouter un trajet au panier
/*function addToCart(tripId) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  localStorage.setItem("cart", JSON.stringify([...cart, tripId]));
  alert(`Voyage ${tripId} ajouté au panier`)
  }

  document.getElementById('searchForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const departure = document.getElementById('departure').value;
    const arrival = document.getElementById('arrival').value;
    const date = document.getElementById('date').value;
  
    try {
      const response = await fetch(`http://localhost:3000/trips/search?departure=${departure}&arrival=${arrival}&date=${date}`);
      const result = await response.json();
  
      const resultsDiv = document.getElementById('results');
      resultsDiv.innerHTML = "";
  
      if (response.ok) {
        result.foundTrips.forEach(trip => {
          const tripDiv = document.createElement('div');
          tripDiv.className = "trip";
          tripDiv.innerHTML = `
            <p>${trip.departure} to ${trip.arrival} on ${new Date(trip.date).toLocaleDateString()} - $${trip.price}</p>
            <button class="add-to-cart-btn" data-trip-id="${trip._id}">Add to Cart</button>
          `;
          resultsDiv.appendChild(tripDiv);
        });
  
        // Ajouter des écouteurs d'événements aux boutons "Add to Cart"
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
          button.addEventListener('click', function () {
            const tripId = this.getAttribute('data-trip-id');
            addToCart(tripId);
          });
        });
      } else {
        resultsDiv.innerHTML = `<p>${result.message}</p>`;
      }
    } catch (error) {
      console.error('Error fetching trips:', error);
      document.getElementById('results').innerHTML = `<p>Server error. Please try again later.</p>`;
    }
  });


document.querySelectorAll('.add-to-cart-btn').forEach( button => {
  button.addEventListener('click', function () {
    const tripId = this.getAttribute('data-trip-id');
    addToCart(tripId)
  })
})*/

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