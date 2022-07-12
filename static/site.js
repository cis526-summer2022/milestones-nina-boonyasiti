function displayCard(data) {
  console.log('data', data);
  for(let i = 0; i < data.length; i++) {
    const lat = data[i].lat;
    const long = data[i].lng;

    const description = document.createTextNode(data[i].name);
    // console.log("INSIDE SITE.JS");
    const cardContainer = document.getElementById("card-container");
    const card = document.createElement("div");
    const googleMap = document.createElement("img");
    const text = document.createElement("p");
    const anchor = document.createElement("a");
    const endpointUrl = `/boxes/${data[i].id}`;


    // cardContainer.onlick = linkToNewPage;

    const mapURL = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}&zoom=15&size=200x200&markers=size:mid%7Ccolor:purple%7C${lat},${long}&key=AIzaSyCX8V4KyBtUv7RdOXkeZyGa11wrxlTSVx0`;
    
    text.appendChild(description);
    card.appendChild(anchor);
    anchor.appendChild(googleMap);
    anchor.appendChild(text);
    cardContainer.appendChild(card);
    googleMap.src = mapURL;
    anchor.href = endpointUrl;
  }
}

// write a new endpoint to get all of the locations from the database - this should be a get
function useXHR() {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', () => {
    displayCard(JSON.parse(xhr.responseText));
  });
  const url = '/chests';
  xhr.open('GET', url, true);
  xhr.send();
};

window.addEventListener('load', function() {
  useXHR();
});