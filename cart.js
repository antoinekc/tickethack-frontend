// Fonction pour charger les voyages du panier et les afficher
function loadCart() {
  const cartListDiv = document.getElementById('cartList');
  const emptyMessage = document.getElementById('emptyMessage');
  
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Si le panier est vide, afficher un message et masquer la liste
  if (cart.length === 0) {
    emptyMessage.style.display = 'block';
    cartListDiv.style.display = 'none';
  } else {
    emptyMessage.style.display = 'none';
    cartListDiv.style.display = 'block';

    // Réinitialiser le contenu du panier
    cartListDiv.innerHTML = '';

    // Parcourir chaque voyage dans le panier
    cart.forEach(tripId => {
      fetch(`http://localhost:3000/trips/${tripId}`)
        .then(response => response.json())
        .then(trip => {
          // Créer un élément pour afficher les informations du voyage
          const tripDiv = document.createElement('div');
          tripDiv.className = 'cart-item';
          const tripDate = new Date(trip.date);
          const formattedTime = tripDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          
          tripDiv.innerHTML = `
            <span>${trip.departure} > ${trip.arrival} - ${formattedTime} - ${trip.price}€</span>
            <button class="remove-button" data-trip-id="${trip._id}">Remove</button>
          `;
          
          cartListDiv.appendChild(tripDiv);
          
          // Ajout d'un écouteur pour retirer un voyage du panier
          tripDiv.querySelector('.remove-button').addEventListener('click', function() {
            removeFromCart(trip._id);
          });
        })
        .catch(err => console.error('Error fetching trip details:', err));
    });
  }
}

// Fonction pour retirer un voyage du panier
function removeFromCart(tripId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Retirer le voyage du panier
  cart = cart.filter(id => id !== tripId);
  
  // Mettre à jour le localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Recharger le panier après suppression
  loadCart();
}

// Charger le panier dès que la page est chargée
window.addEventListener('DOMContentLoaded', loadCart);
