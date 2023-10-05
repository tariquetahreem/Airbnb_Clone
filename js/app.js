//Constants
const searchForm = document.getElementById('searchBar');
const today = new Date().toISOString().split('T')[0];       // today's date

const maxDate = new Date();
maxDate.setFullYear(maxDate.getFullYear() + 1);
const maxDateFormatted = maxDate.toISOString().split('T')[0];       // upper limit of 1 year in date inputs

// searchForm submit event
searchForm.addEventListener('submit', (event) => handleFormSubmit(event));

// function to prevent User from inputting irrelevent dates
(() => {
    const dateInput = document.querySelectorAll('#dateInput');
    dateInput.forEach(element => {
        element.setAttribute('min', today);
        element.setAttribute('max', maxDateFormatted);
    })
})()


// form submit event handler function
function handleFormSubmit(event) {

    event.preventDefault();

    // Get form input values
    let place = searchForm.location.value;
    let checkInDate = searchForm.checkInDate.value;
    let checkOutDate = searchForm.checkOutDate.value;
    let guestCount = searchForm.guestCount.value;

    // form validation
    if (!place ||
        !place.trim() ||
        !checkInDate ||
        checkInDate < today ||
        checkInDate > maxDateFormatted ||
        !checkOutDate ||
        checkOutDate < checkInDate ||
        checkOutDate > maxDateFormatted ||
        !guestCount ||
        guestCount <= 0 ||
        guestCount % 1 != 0 ||
        guestCount > 20
    ) {
        return alert('Invalid Input ! Please Try Again');
    }

    // Redirecting user to another page with form data as parameters in the URL
    window.location.href = 'listing.html?place=' + place.trim() + '&checkin=' + checkInDate + '&checkout=' + checkOutDate + '&guestCount=' + guestCount;
}