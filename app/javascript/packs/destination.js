function newMap(lat, lng) {
  var myLatLng = {lat, lng};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: myLatLng
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
  });

}

document.addEventListener('DOMContentLoaded', () => {
    newMap(43.4934817,-79.5439347);
    // var destination = document.querySelector('#new_destination');
    var arrivingTo = document.querySelector('#destination_arriving_to');
    var leavingFrom = document.querySelector('#destination_leaving_from');
    var map = document.querySelector('#map');
    var lat, lng;
    arrivingTo.onchange = (event) => {
        let name = location.value;
        event.preventDefault();
        console.log(location.value);
        fetch(`/users/get_coordinates/${name}`)
        .then(e=>e.json())
        .then(x => {
            console.log(x[0].data.boundingbox[0]);
            console.log(x[0].data.boundingbox[2]);
            lat = parseFloat(x[0].data.boundingbox[0]);
            lng = parseFloat(x[0].data.boundingbox[2]);
            newMap(lat, lng);
        })

        // location.value = "";
    }

    leavingFrom.onchange = (event) => {
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

      // location.value = "";
  }
});