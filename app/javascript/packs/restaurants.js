
function newMap(x, y) {
    map = new google.maps.Map(document.getElementById("map"), {
      center: {lat: x, lng: y},
      zoom: 8
    });
  }

  function getNearbyRestaurants(lat, lng) {
    fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=restaurant&key=AIzaSyD6Gq4YMYy_misKKqujLLV7BOKQLWFAk0Y`)
    .then(e=>e.json())
    .then(x => {
        console.log(x);
    })
  }

document.addEventListener('DOMContentLoaded', () => {
    var form = document.querySelector('form');
    var location = document.querySelector('#name');
    var map = document.querySelector('#map');
    var lat, lng;
    form.onsubmit = (event) => {
        let name = location.value;
        event.preventDefault();
        console.log(location.value);
        fetch(`/destination/get_coordinates/${name}`)
        .then(e=>e.json())
        .then(x => {
            console.log(x[0].data.boundingbox[0]);
            console.log(x[0].data.boundingbox[2]);
            lat = parseFloat(x[0].data.boundingbox[0]);
            lng = parseFloat(x[0].data.boundingbox[2]);
            newMap(lat, lng);
            getNearbyRestaurants(lat, lng);
        })

        location.value = "";
    }
})