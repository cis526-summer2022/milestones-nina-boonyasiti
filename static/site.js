let map;

function initMap() {
  const flint = { lat: 39.176576, lng: -96.55997 };
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: flint,
  });
}

window.initMap = initMap;