document.addEventListener('DOMContentLoaded', function () {
  const bookings = JSON.parse(localStorage.getItem("Purchased trips")) || []

  const bookingsList = document.getElementById("bookingList");

  function calculateRemainingTime(departureTime) {
    const now = new Date();
    const departure = new Date(departureTime)
    const diffMS = departure - now;

    if (diffMS <= 0 ) {
      return "Le voyage a déjà commencé"
    }

    const diffHrs = Math.floor(diffMS / 3600000 );
    const diffMins = Math.floor(diffMs / 60000);

    return `Il reste ${diffHrs} heures et ${diffMS}minutes avant votre voyage`;

  }

    bookings.forEach(booking => {
      const tripDiv = document.createElement('div');
      tripDiv.className = "booking-item";

      const timeRemaining = calculateRemainingTime(booking.departureTime);

      tripDiv.innerHTML = `
      <p>Departure: ${booking.departureCity} → Arrival: ${booking.arrivalCity}</p>
      <p>Date: ${new Date(booking.departureTime).toLocaleDateString()}</p>
      <p>Price: $${booking.price}</p>
      <p>Time Remaining: ${timeRemaining}</p>
    `;
      
    bookingsList.appendChild(tripDiv)
    });


    if(bookings.length === 0 ) {
      bookings.list.innerHTML = `<p> Vous n'avez pas de voyage </p>`
    }
})