function displayCard(data) {
  let name = "";
  let lat = "";
  let long = "";
  var map = document.createElement("img");

  for(let i = 0; i < data.length; i++) {
    name = data[i].name;
    lat = data[i].lat;
    long = data[i].lng;
    console.log("Data: ", i, name, lat, long);
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