// Fonction pour ajouter un trajet au panier

document.getElementById('searchForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const departure = document.getElementById('departure').value;
  const arrival = document.getElementById('arrival').value;
  const date = document.getElementById('date').value;

  try {
    const response = await fetch(`http://localhost:3000/trips/search?departure=${departure}&arrival=${arrival}&date=${date}`);
    
    // Vérifiez si la réponse est correcte
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    console.log('Fetched trips:', result); // Log des résultats de l'API

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = "";

    // Vérifiez si `foundTrips` existe et contient des données
    if (result.foundTrips && result.foundTrips.length > 0) {
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
      resultsDiv.innerHTML = `<p>Aucun trajet trouvé.</p>`;
    }
  } catch (error) {
    console.error('Error fetching trips:', error);
    document.getElementById('results').innerHTML = `<p>Erreur serveur. Veuillez réessayer plus tard.</p>`;
  }
});



// document.getElementById('searchButton').addEventListener('click', function() {
// fetch(`http://localhost:3000/trips/search?departure=${departure}&arrival=${arrival}&date=${date}`)
//   .then(response => response.json())
//   .then(data => {
//     const trainList = document.getElementById('trainList');
//     trainList.innerHTML = '';

//     data.forEach(train => {
//       const trainItem = document.createElement('div');
//       trainItem.className = 'train-item';

//       trainItem.innerHTML = `
//         <span>${train.depart} > ${train.arrivee}</span>
//         <span>${train.heure}</span>
//         <span>${train.prix}€</span>
//         <button class="book-button">Book</button>
//       `;

//       trainList.appendChild(trainItem);
//     });

//     trainList.style.display = 'block'; // Show the list
//   })
//   .catch(error => {
//     console.error('Error fetching train data:', error);
//   });
// });
