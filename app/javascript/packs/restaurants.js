document.addEventListener('DOMContentLoaded', () => {
  let latitude = document.querySelector('#latitude').value;
  let longitude = document.querySelector('#longitude').value;
  
  let markers = [];

  console.log(latitude);
  console.log(longitude);

  myLatLng = new google.maps.LatLng(parseFloat(latitude),parseFloat(longitude));

  map = new google.maps.Map(document.getElementById('rest_map'), {
    zoom: 8,
    center: myLatLng,
  });

  const addMarker = (lat, lng) => {
    if (!!lat && !!lng) {
      markers.push(
        new google.maps.Marker({
          map: map,
          position: new google.maps.LatLng(parseFloat(lat), parseFloat(lng)),
        })
      );
    }
  };

  addMarker(latitude, longitude);

  const request = {
    location: myLatLng,
    radius: '500',
    type: ['restaurant']
  };

  let service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
    //   for (let i = 0; i < results.length; i++) {
    //     createMarker(results[i]);
    //   }
    //   map.setCenter(results[0].geometry.location);
    console.log('---->>', results);

    results.forEach(spot => {
      let rightDiv = document.querySelector('.right-div');
      let div = document.createElement('div');
      div.className = 'content';
      div.innerHTML = `<h5>${spot.name}</h5> <p>Address: ${spot.vicinity}</p><p>Rating: ${spot.rating}/5</p>`;
      rightDiv.appendChild(div);
      var x = document.createElement("input");
      x.setAttribute("type", "button");
      x.setAttribute("class", "select");
      // x.setAttribute("onclick", "form()");
      x.value = "Select";
      div.appendChild(x);
    });
    // document.querySelectorAll(".select").addEventListener("click", myFunction);

    // function form() {
    //   document.getElementById("eatery_name").innerHTML = "YOU CLICKED ME!";
    // }

    }
  });

});