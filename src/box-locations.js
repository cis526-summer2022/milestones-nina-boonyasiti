function boxLocation(boxID, title, lat, lng) {
    console.log("Inside box-location.js");

    const cardContainer = document.getElementById("card-container");
    const card = document.createElement("div");
    const googleMap = document.createElement("img");
    const text = document.createElement("p");
    const mapURL = `https://maps.googleapis.com/maps/api/staticmap?censer=${lat},${long}&zoom=15&size=200x200&markers=size:mid%7Ccolor:purple%7C${lat},${long}&key=AIzaSyCX8V4KyBtUv7RdOXkeZyGa11wrxlTSVx0`;

    text.appendChild(description);
    card.appendChild(googleMap);
    card.appendChild(text);
    cardContainer.appendChild(card);
    googleMap.src = mapURL;
    
}

module.exports = boxLocation;
