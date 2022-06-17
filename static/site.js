function displayCard(data) {
  let name = "";
  let lat = "";
  let long = "";
  var map = document.createElement("img");
  let url = "https://maps.googleapis.com/maps/api/staticmap";
  let mapUrl = "";

  for(let i = 0; i < data.length; i++) {
    name = data[i].name;
    lat = data[i].lat;
    long = data[i].lng;
    console.log("Data: ", i, name, lat, long);
    mapUrl = `url(${url}?center=${lat},${long}&zoom=15&size=200x200&markers=size:mid%7Ccolor:purple%7C${lat},${long}&key=AIzaSyCX8V4KyBtUv7RdOXkeZyGa11wrxlTSVx0
)`;
  console.log("mapURL: ", mapUrl);
  }


}

function useXHR() {
  const xhr = new XMLHttpRequest();
  const url = './box-locations.json';
  xhr.addEventListener('load', () => {
    displayCard(JSON.parse(xhr.responseText));
  });
  xhr.open("GET", url);
  xhr.send();
};

window.addEventListener('load', function() {
  useXHR();
});