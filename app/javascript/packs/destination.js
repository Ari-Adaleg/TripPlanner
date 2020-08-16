let current_id = 0;
let markers = {};

function newMap(lat, lng) {
  var myLatLng = new google.maps.LatLng(lat, lng);
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: myLatLng
  });
  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
  });   
  markers[current_id] = marker;
  current_id++;
  console.log(current_id);
}

document.addEventListener('DOMContentLoaded', () => {
    let latitude = document.querySelector('#latitude');
    let longitude = document.querySelector('#longitude');
    let user_lat = parseFloat(latitude.value);
    let user_lng = parseFloat(longitude.value);
    let myLatLng;
    
    latitude.value && longitude.value ? 
        myLatLng = new google.maps.LatLng(user_lat, user_lng) : 
        myLatLng = new google.maps.LatLng(43.4934817, -79.5439347);
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 8,
      center: myLatLng
    });
    
    function addMarker(lat, lng){
      let myLatLng;
      isNaN(lat) ? myLatLng = lat : myLatLng = new google.maps.LatLng(lat, lng);
      let marker = new google.maps.Marker({
                  id: current_id,
                  position: myLatLng,
                  map: map,
              });
      markers[current_id] = marker;
      current_id++;
      console.log(current_id);        
    }
    
    removeMarker = (id) => {
      let marker = markers[id];
      marker.setMap(null);
      current_id--;
      console.log(current_id);  
    }

    addMarker(myLatLng);

    var arrivingTo = document.querySelector('#trip_destinations_attributes_0_arriving_to');
    var leavingFrom = document.querySelector('#trip_destinations_attributes_0_leaving_from');
    var lat, lng;
    arrivingTo.onchange = (event) => {
        let name = arrivingTo.value;
        event.preventDefault();
        console.log(name);
        fetch(`/users/get_coordinates/${name}`)
        .then(e=>e.json())
        .then(x => {
            console.log(x)
            console.log(x[0].data.boundingbox[0]);
            console.log(x[0].data.boundingbox[2]);
            lat = parseFloat(x[0].data.boundingbox[0]);
            lng = parseFloat(x[0].data.boundingbox[2]);
            // if(arrivingTo.value){removeMarker(0);}
            leavingFrom.value ? addMarker(lat, lng) : newMap(lat, lng);
        })
    }

    leavingFrom.onchange = (event) => {
      let name = leavingFrom.value;
      event.preventDefault();
      console.log(name);
      fetch(`/users/get_coordinates/${name}`)
      .then(e=>e.json())
      .then(x => {
          console.log(x);
          console.log(x[0].data.boundingbox[0]);
          console.log(x[0].data.boundingbox[2]);
          lat = parseFloat(x[0].data.boundingbox[0]);
          lng = parseFloat(x[0].data.boundingbox[2]);
          // if(leavingFrom.value){removeMarker(1);}
          arrivingTo.value ? addMarker(lat, lng) : newMap(lat, lng);
      })
  }
});

addFields = () => {
  // Set Integer to increment Id
  let group = document.querySelector('#destination_group');
  let group_children = group.querySelectorAll('input');
  let newId = parseInt(group_children[group_children.length-1].name[30]);
  // Clone Existing Form Fields
  let fields = document.querySelector('#destination_fields').cloneNode(true);
  // Reset Labels
  let field_labels = fields.querySelectorAll('label');
  field_labels[0].setAttribute('for', `trip_destinations_attributes_${newId+1}_leaving_from`);
  field_labels[0].style.display = "none";
  field_labels[1].setAttribute('for', `trip_destinations_attributes_${newId+1}_arriving_to`);
  field_labels[1].innerText = `Destination #${2+parseInt(newId)}`;
  field_labels[2].setAttribute('for', `trip_destinations_attributes_${newId+1}_start_date`);
  field_labels[3].setAttribute('for', `trip_destinations_attributes_${newId+1}_end_date`);
  // Reset Inputs
  let field_inputs = fields.querySelectorAll('input');
  field_inputs[0].setAttribute('name', `trip[destinations_attributes][${newId+1}][leaving_from]`);
  field_inputs[0].setAttribute('id', `trip_destinations_attributes_${newId+1}_leaving_from`);
  field_inputs[0].setAttribute('value', group_children[group_children.length-3].value);
  field_inputs[0].hidden = true;
  field_inputs[1].setAttribute('name', `trip[destinations_attributes][${newId+1}][arriving_to]`);
  field_inputs[1].setAttribute('id', `trip_destinations_attributes_${newId+1}_arriving_to`);
  field_inputs[2].setAttribute('name', `trip[destinations_attributes][${newId+1}][start_date]`);
  field_inputs[2].setAttribute('id', `trip_destinations_attributes_${newId+1}_start_date`);
  field_inputs[3].setAttribute('name', `trip[destinations_attributes][${newId+1}][end_date]`);
  field_inputs[3].setAttribute('id', `trip_destinations_attributes_${newId+1}_end_date`);
  
  group.appendChild(fields);
  // Make Sure Cloned Values Are Not Carried Forward
  group_children = group.querySelectorAll('input');
  group_children[group_children.length-3].value = "";
  group_children[group_children.length-2].value = "";
  group_children[group_children.length-1].value = "";
}
