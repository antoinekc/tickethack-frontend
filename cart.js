function addToCart(tripId, tripInfo) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(tripInfo);
  localStorage.setItem("cart", JSON.stringify([...cart, tripId]));
  alert(`Voyage ${tripId} ajouté au panier`)
  }


function displayCart(){
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsDiv = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  cartItemsDiv.innerHTML = "";

  let total = 0;

  cart.forEach( (trip, index) => {
    total += trip.price;
    const tripDiv = document.createElement("div");
    tripDiv.innerHTML = `
    <p>${trip.departure} à ${trip.arrival} le ${new Date(trip.date).toLocaleDateString()} - $${trip.price}</p>
    <button onclick="removeFromCart(${index})">Supprimer</button>
  `;
  cartItemsDiv.appendChild(tripDiv);
  });
    
  cartTotalSpan.innerText = total.toFixed(2)
}

