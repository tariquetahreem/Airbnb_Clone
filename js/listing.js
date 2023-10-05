//Constants
const hotelsList = document.getElementById('hotelsList');
let result = null;
let userLats = 0;
let userLong = 0;
let map;
let mapData;

const today = new Date().toISOString().split('T')[0];       // today's date
const maxDate = new Date();
maxDate.setFullYear(maxDate.getFullYear() + 1);
const maxDateFormatted = maxDate.toISOString().split('T')[0];       // upper limit of 1 year in date inputs

//api details
const baseUrl = 'https://airbnb13.p.rapidapi.com/';
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '780300c33fmsh67348662097b8e5p1b787ejsn03800f5b9f43',
        'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
    }
};


// Retrieve data from URL parameters
let params = new URLSearchParams(window.location.search);
let place = params.get('place');
let checkin = params.get('checkin');
let checkout = params.get('checkout');
let guestCount = params.get('guestCount');

// url params validation
if (!place ||
    !checkin ||
    checkin < today ||
    checkin > maxDateFormatted ||
    !checkout ||
    checkout < checkin ||
    checkout > maxDateFormatted ||
    !guestCount ||
    guestCount <= 0 ||
    guestCount % 1 != 0 ||
    guestCount > 20
) {
    alert('Invalid URL ! Please Try Again');
    window.location.href = 'index.html';
}

// on window load
window.addEventListener("DOMContentLoaded", async (event) => {
    try {
        if (navigator.geolocation) {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });
            // getting user's lat and lng
            userLats = position.coords.latitude;
            userLong = position.coords.longitude;
        } else {
            console.log("Geolocation is not supported by this browser.");
            return alert('Enable Geolocation Permission and Refresh the page to get results !');
        }
        initMap();
        const result = await fetchDataFromAPI();
        addDataOnCards(result);
    } catch (error) {
        console.log(error);
    }
});


// function to fetch api data on load
async function fetchDataFromAPI() {
    try {
        const URL = `${baseUrl}search-location?location=${place}&checkin=${checkin}&checkout=${checkout}&adults=${guestCount}&children=0&infants=0&pets=0&page=1&currency=USD`;
        // const URL = `../sampledata.json`;
        const response = await fetch(URL, options);
        result = await response.json();
        return result.results;
    } catch (error) {
        console.error(error);
    }
}

// function to add fetched data on cards
function addDataOnCards(cards) {
    try {
        cards.forEach(async (card) => {
            let distance;
            distance = fetchHotelDistance(card);
            let data = `
                <div class="hotelCards" onclick="handleRedirectToListingPage('${card.id}')">
                    <img src="${card.images[0]}" alt="${card.name}" class="hotelImg">
                    <div class="hotelDetails">
                        <div class="leftSection">
                            <p class="t-grey">${card.type} ${card.rareFind ? ' | <span class="t-red">Rare Find</span>' : ""}</p>
                            <h3 id="title">${card.name}</h3>
                            <p> Distance from you: ${distance ? distance + ` km` : '--'}</p>
                            <ul id="hotelSummary">
                                <li>${card.bedrooms} bedroom</li>|
                                <li>${card.beds} bed</li>|
                                ${(card.previewAmenities).map(Element => `<li>${Element}</li>|`).join('')}
                                    <li>${card.bathrooms} bathroom</li>
                                    </ul>

                            <ul id="rating">
                                <li>${card.rating}</li>
                                <li><span class=" t-red material-symbols-outlined">
                                        star
                                    </span></li>
                                <li>(${card.reviewsCount > 0 ? `${card.reviewsCount} reviews` : 'No reviews yet'})</li>
                            </ul>
                        </div>
                        <div class="rightSection">
                            <span style="cursor: pointer;" class="t-red material-symbols-outlined">
                                favorite
                            </span>
                            <p><span>$${card.price.rate}</span> /night</p>
                        </div>
                    </div>
                </div`

            hotelsList.innerHTML += data;

            // Create a marker for this card on the map
            addHotelMarkersOnMap(card);
        });
    
    document.getElementById('loading').classList.add('inactive');
    hotelsList.classList.remove('inactive');
    document.getElementById('map').classList.remove('inactive');
        
    } catch (error) {
        console.log(error);
    }
}


//function to redirect user to listingPage with selected cards data
function handleRedirectToListingPage(id) {
    try {
        // store selected cards data on session storage to use on listingPage
        const cardData = (result.results).filter((Element) => Element.id == id);
        sessionStorage.setItem('cardData', JSON.stringify(cardData));

        //redirect to listingPage with id as param
        window.location.href = 'hotelDetail.html?hotelId=' + id + '&' + params;
    } catch (error) {
        console.log(error);
    }
}

// function to initiate map
function initMap() {
    try {

        mapData = L.map("map").setView([userLats, userLats], 10); // Setting initial center and zoom level of the map

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        }).addTo(mapData);

    } catch (error) {
        console.log(error);
    }
}

// function to fetch card hotel distance 
function fetchHotelDistance(card) {

    try {

        // Create two coordinates
        let coord1 = L.latLng(userLats, userLong);
        let coord2 = L.latLng(card.lat, card.lng);

        // Calculate the distance between the two coordinates in meters
        const distanceInMeters = coord1.distanceTo(coord2);

        // Convert the distance from meters to kilometers
        return Math.round(distanceInMeters / 1000);

    } catch (error) {
        console.log(error);
    }
}

// add hotel location markers on Map
function addHotelMarkersOnMap(card) {
    try {
        L.marker([card.lat, card.lng])
            .addTo(mapData)
            .bindPopup(`${card.name}`)
            .openPopup();
    } catch (error) {
        console.log(error);
    }
}
