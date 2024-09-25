const emptyCartMessage= document.getElementById('emptyCartMessage');
const cartContent= document.getElementById('cartContent');
const cartItemsDiv= document.getElementById('cartItems');
const totalPriceDiv= document.getElementById('totalPrice');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartDisplay(){
    //On veut vérifier si le panier est vide
    if(cart.length === 0) {
        emptyCartMessage.style.display = 'block';
        cartContent.style.display = 'none';
    } else {
        emptyCartMessage.style.display = 'none';
        cartContent.style.display = 'block';

        cartItemsDiv.innerHTML = '';
        let totalPrice= 0;

        // maintenant on affiche chaque trajet réservé

        cart.forEach((train, index) => {
            const trainItemDiv = document.createElement('div');
            trainItemDiv.className = "train-item"
            trainItemDiv.innerHTML = `
            <p>${train.departure}>${train.arrival} (${train.price} €)</p>
            <button class="delete-button" data-index="${index}"> X </button>
            `;

            cartItemsDiv.appendChild(trainItemDiv);
            totalPrice += train.price;

            // maintenant on veut que le prix total s'affiche

            totalPriceDiv.textContent = totalPrice;

            // nous avons le total et nos ajouts de trjats, il faut config X

            document.querySelectorAll('.delete-button').forEach(button => {
                button.addEventListener('click',(event) => {
                    const trainIndex= event.target.getAttribute('data-index');
                    removeItemFromCart(trainIndex);
                });
            });
        })
    }

// maintenance il faut config "removeItemFromCart"

function removeItemFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify([]));
    upadateCartDisplay();
}
};

updateCartDisplay();