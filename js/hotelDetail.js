const today = new Date().toISOString().split('T')[0];       // today's date
const maxDate = new Date();
maxDate.setFullYear(maxDate.getFullYear() + 1);
const maxDateFormatted = maxDate.toISOString().split('T')[0];       // upper limit of 1 year in date inputs

let svgSuperhost = `<svg width="15" height="25" viewBox="0 0 46 80" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M43.3899 3.72882C43.3899 2.79274 42.631 2.03391 41.695 2.03391H3.72885C2.79277 2.03391 2.03394 2.79274 2.03394 3.72882V33.0858C2.03394 33.5995 2.26692 34.0855 2.66741 34.4072L21.6505 49.6558C22.2705 50.1539 23.1533 50.1539 23.7733 49.6558L42.7564 34.4072C43.1569 34.0855 43.3899 33.5995 43.3899 33.0858V3.72882Z"
                                    fill="white" />
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M3.72881 0H41.6949C43.7543 0 45.4237 1.66945 45.4237 3.72881V33.0858C45.4237 34.2159 44.9112 35.2851 44.0301 35.9928L25.047 51.2415C23.683 52.3372 21.7407 52.3372 20.3767 51.2415L1.39364 35.9928C0.512555 35.2851 0 34.2159 0 33.0858V3.72881C0 1.66945 1.66945 0 3.72881 0ZM41.6949 2.0339C42.631 2.0339 43.3898 2.79274 43.3898 3.72881V33.0858C43.3898 33.5995 43.1569 34.0854 42.7564 34.4072L23.7733 49.6558C23.1533 50.1539 22.2704 50.1539 21.6504 49.6558L2.66737 34.4072C2.26688 34.0854 2.0339 33.5995 2.0339 33.0858V3.72881C2.0339 2.79274 2.79274 2.0339 3.72881 2.0339H41.6949Z"
                                    fill="black" />
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M4.06829 32.9288L41.0862 4.40678V32.9288H41.0856L22.5767 47.7966L4.06772 32.9288H4.06829Z"
                                    fill="#F5BF41" />
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M41.0858 32.9288L4.06787 4.40678V32.9288H4.06836L22.5773 47.7966L41.0862 32.9288H41.0858Z"
                                    fill="#DE3151" />
                                <path
                                    d="M32.8813 67.7966C32.8813 73.4131 28.3283 77.9661 22.7118 77.9661C17.0954 77.9661 12.5424 73.4131 12.5424 67.7966C12.5424 62.1802 17.0954 57.6271 22.7118 57.6271C28.3283 57.6271 32.8813 62.1802 32.8813 67.7966Z"
                                    fill="white" />
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M34.9152 67.7966C34.9152 74.5364 29.4516 80 22.7118 80C15.9721 80 10.5084 74.5364 10.5084 67.7966C10.5084 61.0569 15.9721 55.5932 22.7118 55.5932C29.4516 55.5932 34.9152 61.0569 34.9152 67.7966ZM22.7118 77.9661C28.3283 77.9661 32.8813 73.4131 32.8813 67.7966C32.8813 62.1802 28.3283 57.6271 22.7118 57.6271C17.0954 57.6271 12.5423 62.1802 12.5423 67.7966C12.5423 73.4131 17.0954 77.9661 22.7118 77.9661Z"
                                    fill="black" />
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M18.0435 60.7226C15.75 62.2392 14.2372 64.8412 14.2372 67.7966C14.2372 72.477 18.0314 76.2712 22.7118 76.2712C26.4038 76.2712 29.5444 73.9103 30.7062 70.6158L18.0435 60.7226Z"
                                    fill="#F5BF41" />
                            </svg>`;

// Constants                      
const hotelIntroSection = document.getElementById('hotelIntroSection');
const facility = document.getElementById('facility');
const priceBox = document.getElementById('priceBox');

// Retrieve data from URL parameters
let params = new URLSearchParams(window.location.search);
let hotelId = params.get('hotelId');
let place = params.get('place');
let checkin = params.get('checkin');
let checkout = params.get('checkout');
let guestCount = params.get('guestCount');

const hotelData = JSON.parse(sessionStorage.getItem('cardData'));
const dataWithMatchingId = hotelData.find((element) => element.id == hotelId);

// url params validation
if (!hotelId ||
    !place ||
    !checkin ||
    checkin < today ||
    checkin > maxDateFormatted ||
    !checkout ||
    checkout < checkin ||
    checkout > maxDateFormatted ||
    !guestCount ||
    guestCount <= 0 ||
    guestCount % 1 != 0 ||
    guestCount > 20 ||
    !hotelData ||
    !dataWithMatchingId
) {
    alert('Invalid URL ! Please Try Again');
    window.location.href = 'index.html';
}

addhotelIntroSectionDataOnUI(dataWithMatchingId);

addHotelDetailSectionDataOnUI(dataWithMatchingId);

addPriceBoxDataOnUI(dataWithMatchingId);

addHotelLocationOnMap(dataWithMatchingId);

addSuperHostDetails(dataWithMatchingId);

//function to add hotel Intro Section Data
function addhotelIntroSectionDataOnUI(hotelData) {

    try {
        let data = `
    <h1>${hotelData.name}</h1>
            <div class="hotelDetails">
                <ul class="hotelDetails">
                    <li><span class="t-red material-symbols-outlined">
                            star
                        </span>${hotelData.rating}</li>|
                    <li><u>${hotelData.reviewsCount} reviews</u></li>|
                    ${hotelData.isSuperhost ? '<li><span class="t-red material-symbols-outlined">workspace_premium</span > Superhost</li >| ' : ''}
                    <li>${hotelData.address}</li>
                </ul>

                <ul>
                    <li><span class="t-red material-symbols-outlined">
                            share
                        </span> Share</li>
                    <li><span class="t-red material-symbols-outlined">
                            favorite
                        </span> Save</li>
                </ul>
            </div>

            <div class="galleryGrid">
                <div class="grid-item grid-item-1"><img width="100%" height"100%" src="${hotelData.images[0]}" alt="gallary"></div>
                <div class="grid-item"><img width="100%" height"100%" src="${hotelData.images[2]}" alt="gallary"></div>
                <div class="grid-item"><img width="100%" height"100%" src="${hotelData.images[3]}" alt="gallary"></div>
                <div class="grid-item"><img width="100%" height"100%" src="${hotelData.images[1]}" alt="gallary"></div>
                <div class="grid-item"><img width="100%" height"100%" src="${hotelData.images[4]}" alt="gallary"></div>
            </div>`;

        hotelIntroSection.innerHTML += data;
    } catch (error) {
        console.log(error);
    }
}

//function to add hotel Detail Section Data
function addHotelDetailSectionDataOnUI(hotelData) {
    try {
        let data = `
    <div class="host">
                    <div class="hostDetails">
                        <h2>Entire rental unit hosted by Aman</h2>
                        <ul>
                            <li>${hotelData.persons} guests</li>|
                            <li>${hotelData.bedrooms} bedroom</li>|
                            <li>${hotelData.beds} bed</li>|
                            <li>${hotelData.bathrooms} bath</li>
                        </ul>
                    </div>
                    <div class="hostProfile">
                        <img src="${hotelData.hostThumbnail}" class="profileImg" alt="host profile">
                        <div class="superHostTag">
                            ${hotelData.isSuperhost ? svgSuperhost : ''}
                        </div>
                    </div>
                </div>

                <div class="facilityListing">
                    <div class="facilityPoints">
                        <div class="facilityDetail">
                        ${hotelData.previewAmenities.map((element) => `<p class="title">${element}</p><br>`).join("")}
                        </div>
                    </div>
                    <div class="facilityPoints">
                        Come and stay in this superb duplex T2, in the heart of the historic center of Bordeaux.
                        Spacious and bright, in a real Bordeaux building in exposed stone, you will enjoy all the charms
                        of the city thanks to
                        its ideal location. Close to many shops, bars and restaurants, you can access the apartment by
                        tram A and C and bus
                        routes 27 and 44.<br>
                        ...
                    </div>
                    <u style="cursor: pointer;">Show More</u>
                </div>
                <div class="placePhotos">
                    <h2>Where you'll sleep</h2>
                    <div class="cardSection">
                        <div class="card">
                            <img src="${hotelData.images[0]}" alt="room images">
                            <p>Bedroom</p>
                            <p class="t-grey">1 queen bed</p>
                        </div>
                    </div>
                </div>`;

        facility.innerHTML = data;
    } catch (error) {
        console.log(error);
    }
}

// function to add price box data
function addPriceBoxDataOnUI(hotelData) {
    // console.log(hotelData);
    try {
        let data = `
    <div class="top">
                    <div class="rate">
                        <span>$${hotelData.price.rate}</span> / night
                    </div>
                    <ul class="rate">
                        <li><span class="t-red material-symbols-outlined">
                                star
                            </span>${hotelData.rating}</li>|
                        <li><u>${hotelData.reviewsCount} reviews</u></li>
                    </ul>
                </div>
                <div class="summaryBox">
                    <div class="topBox">
                        <div class="checkIn">
                            <p>CHECK-IN</p>
                            <p class="t-grey">${checkin}</p>
                        </div>
                        <div class="checkIn">
                            <p>CHECKOUT</p>
                            <p class="t-grey">${checkout}</p>
                        </div>
                    </div>
                    <div class="bottomBox">
                        <div class="guests">
                            <p>Guests</p>
                            <p class="t-grey">${guestCount} Guests</p>
                        </div>
                        <span class="t-red material-symbols-outlined">
                            expand_more
                        </span>
                    </div>
                </div>
                <button class="red">Reserve</button>
                <p class="t-grey">You won't be charged yet</p>
                <table class="chargeTable">
                    <thead></thead>
                    <tbody>
                        ${hotelData.price.priceItems.map((element) => `<tr>
                            <td>${element.title}</td>
                            <td>$${element.amount}</td>
                        </tr>`).join('')}
                        <tr>
                            <td>Total</td>
                            <td>$${hotelData.price.total}</td>
                        </tr>
                    </tbody>
                </table>
                    <p class="t-grey" style="cursor: pointer;"> <span style="font-size: 1rem;"
                        class="material-symbols-outlined">
                        flag
                    </span> <u>Report this listing</u></p>`;

        priceBox.innerHTML = data;
    } catch (error) {
        console.log(error);
    }
}

//  function adding hotel location on map
function addHotelLocationOnMap(hotelData) {
    try {
        let mapData = `<iframe src = "https://maps.google.com/maps?q=${hotelData.lat},${hotelData.lng}&output=embed" width = "100%" height = "100%" frameborder = "0" style = "border:0" ></iframe>`;
        let data = `
    <div class="mapIframe" id="mapIframe">${mapData}</div>
            <h3>${hotelData.name}</h3>
            <!-- <p>Very dynamic and appreciated district by the people of Bordeaux thanks to rue St James and place Fernand
                Lafargue. Home
                to many historical monuments such as the Grosse Cloche, the Porte de Bourgogne and the Porte Cailhau,
                and cultural sites
                such as the Aquitaine Museum.</p> -->
            <p style="cursor: pointer;"><u>Show More ></u></p>`;

        document.getElementById('mapSection').innerHTML = data;
    } catch (error) {
        console.log(error);
    }
}

// function adding hotel location on map
function addSuperHostDetails(hotelData) {
    try {
        let data = `
    <div class="hostSummary">
                <div class="hostProfile">
                    <img src="${hotelData.hostThumbnail}" class="profileImg" alt="host profile">
                    <div class="superHostTag">
                            ${hotelData.isSuperhost ? svgSuperhost : ''}
                    </div>
                </div>
                <div class="hostDetails">
                    <h2>Hosted By Aman</h2>
                    <ul class="hotelDetails">
                        <li><span class="t-red material-symbols-outlined">
                                star
                            </span><u>${hotelData.rating} reviews</u></li>|
                        <li><span class="t-red material-symbols-outlined">
                                verified_user
                            </span> Indentity Verified</li>
                            ${hotelData.isSuperhost ? '| <li> <span class="t-red material-symbols-outlined">workspace_premium</span> Superhost</li> ' : ''}
                    </ul>
                </div>
            </div>
            <div class="superHostDetails">
                            ${hotelData.isSuperhost ? `<h3>${"AMAN"} is a Superhost</h3><p class="t-grey">Superhosts are experienced, highly rated hosts who are committed to providing great
                    stays for guests.</p>` : '<br>'}
                <p class="t-grey">Response rate: 100%</p>
                <p class="t-grey">Response time: within an hour</p>
                <button style="border: 2px solid var(--color-black);">Contact Host</button>
            </div>`;

        document.getElementById('hostSummarySection').innerHTML = data;
    } catch (error) {
        console.log(error);
    }
}
