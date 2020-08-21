
function newMap(x, y) {
    map = new google.maps.Map(document.getElementById("map"), {
      center: {lat: x, lng: y},
      zoom: 8
    });
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
        })

        location.value = "";
    }
})