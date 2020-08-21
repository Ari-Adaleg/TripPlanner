let current_id = 0;
let markers = {};

function newMap(lat, lng, id) {
  var myLatLng = new google.maps.LatLng(lat, lng);
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: myLatLng
  });
  let marker = new google.maps.Marker({
    id: id,
    position: myLatLng,
    map: map
});
markers[id] = marker;
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
    let map = new google.maps.Map(document.getElementById('map'), {
      zoom: 8,
      center: myLatLng
    });

    function addMarker(lat, lng, id){
      let myLatLng, marker;
      if(isNaN(lat)){myLatLng = lat; id=lng;}
      else{myLatLng = new google.maps.LatLng(lat, lng);}

      if (markers[id]) {moveMarker(lat, lng, id)}
      else{marker = new google.maps.Marker({
                  id: id,
                  position: myLatLng,
                  map: map
              });
      markers[id] = marker;
      }      
    }
    
    moveMarker = (lat, lng, id) => {
      var myLatLng = new google.maps.LatLng(lat, lng);
      let marker = markers[id];
      marker.setPosition(myLatLng);
    }

    adjustMap = () => {
      let bounds = new google.maps.LatLngBounds();
      Object.values(markers).forEach(marker => {
        bounds.extend(marker.position);
        console.log(marker.position);
        })
      map.fitBounds(bounds);
    }

    addMarker(myLatLng, 0);
    // console.log(markers[0]);
    var arrivingTo = document.querySelector('#trip_destinations_attributes_0_arriving_to');
    var leavingFrom = document.querySelector('#trip_destinations_attributes_0_leaving_from');
    var lat, lng, id;

    arrivingTo.onchange = () => {
        let name = arrivingTo.value;
        console.log(name);
        fetch(`/users/get_coordinates/${name}`)
        .then(e=>e.json())
        .then(x => {
            console.log(x[0].data.boundingbox[0]);
            console.log(x[0].data.boundingbox[2]);
            lat = parseFloat(x[0].data.boundingbox[0]);
            lng = parseFloat(x[0].data.boundingbox[2]);
            id = 1;
            addMarker(lat, lng, id);
            adjustMap();
        })
    }

    leavingFrom.onchange = () => {
      let name = leavingFrom.value;
      console.log(name);
      fetch(`/users/get_coordinates/${name}`)
      .then(e=>e.json())
      .then(x => {
          console.log(x[0].data.boundingbox[0]);
          console.log(x[0].data.boundingbox[2]);
          lat = parseFloat(x[0].data.boundingbox[0]);
          lng = parseFloat(x[0].data.boundingbox[2]);
          id = 0;
          arrivingTo.value ? addMarker(lat, lng, id) : newMap(lat, lng, id);
          // addMarker(lat, lng, id);
          adjustMap();
      })
  }
});

addFields = () => {
  // Set Integer to increment Id
  let group = document.querySelector('#destination_group');
  let group_children = group.querySelectorAll('input');
  let newId = parseInt(group_children[group_children.length-1].name[30]);
  // Create the new divs, labels and inputs to populate the form fields
  let destination_fields = document.querySelector('#destination_fields');
  let div1 = document.createElement('div');
  let div2 = document.createElement('div');
  let div3 = document.createElement('div');
  let div4 = document.createElement('div');
  div1.className = "field1";
  div2.className = "field1";
  div3.className = "field1";
  div4.className = "field1";
  let label1 = document.createElement('label');
  let label2 = document.createElement('label');
  let label3 = document.createElement('label');
  let label4 = document.createElement('label');
  let input1 = document.createElement('input');
  let input2 = document.createElement('input');
  let input3 = document.createElement('input');
  let input4 = document.createElement('input');
  
  label1.setAttribute('for', `trip_destinations_attributes_${newId+1}_leaving_from`);
  label1.innerText = "Leaving from: "
  label1.className = "form_label1";
  // label1.style.display = "none";
  input1.setAttribute('name', `trip[destinations_attributes][${newId+1}][leaving_from]`);
  input1.setAttribute('id', `trip_destinations_attributes_${newId+1}_leaving_from`);
  input1.setAttribute('value', group_children[group_children.length-3].value);
  input1.setAttribute('type', 'text');
  input1.className = "form_input1";
  // input1.hidden = true;
  div1.appendChild(label1);
  div1.appendChild(input1);
  label2.setAttribute('for', `trip_destinations_attributes_${newId+1}_arriving_to`);
  label2.innerText = `Destination #${2+parseInt(newId)}`;
  label2.className = "form_label1";
  input2.setAttribute('name', `trip[destinations_attributes][${newId+1}][arriving_to]`);
  input2.setAttribute('id', `trip_destinations_attributes_${newId+1}_arriving_to`);
  input2.setAttribute('type', 'text');
  input2.className = "form_input1";
  div2.appendChild(label2);
  div2.appendChild(input2);
  label3.setAttribute('for', `trip_destinations_attributes_${newId+1}_start_date`);
  label3.innerText = "Start Date: ";
  label3.className = "form_label1";
  input3.setAttribute('name', `trip[destinations_attributes][${newId+1}][start_date]`);
  input3.setAttribute('id', `trip_destinations_attributes_${newId+1}_start_date`);
  input3.setAttribute('value', group_children[group_children.length-1].value);
  input3.setAttribute('type', 'date');
  input3.className = "form_input1";
  div3.appendChild(label3);
  div3.appendChild(input3);
  label4.setAttribute('for', `trip_destinations_attributes_${newId+1}_end_date`);
  label4.innerText = "End Date: ";
  label4.className = "form_label1";
  input4.setAttribute('name', `trip[destinations_attributes][${newId+1}][end_date]`);
  input4.setAttribute('id', `trip_destinations_attributes_${newId+1}_end_date`);
  input4.setAttribute('type', 'date');
  input4.className = "form_input1";
  div4.appendChild(label4);
  div4.appendChild(input4);
  destination_fields.appendChild(div1);
  destination_fields.appendChild(div2);
  destination_fields.appendChild(div3);
  destination_fields.appendChild(div4);
  // let fields = document.querySelector('#new_fields');
  // fields.reset();
  // Reset Labels
  // let field_labels = fields.querySelectorAll('label');
  // field_labels[0].setAttribute('for', `trip_destinations_attributes_${newId+1}_leaving_from`);
  // field_labels[0].style.display = "none";
  // field_labels[1].setAttribute('for', `trip_destinations_attributes_${newId+1}_arriving_to`);
  // field_labels[1].innerText = `Destination #${2+parseInt(newId)}`;
  // field_labels[2].setAttribute('for', `trip_destinations_attributes_${newId+1}_start_date`);
  // field_labels[3].setAttribute('for', `trip_destinations_attributes_${newId+1}_end_date`);
  // Reset Inputs
  // let field_inputs = fields.querySelectorAll('input');
  // field_inputs[0].setAttribute('name', `trip[destinations_attributes][${newId+1}][leaving_from]`);
  // field_inputs[0].setAttribute('id', `trip_destinations_attributes_${newId+1}_leaving_from`);
  // field_inputs[0].setAttribute('value', group_children[group_children.length-3].value);
  // field_inputs[0].hidden = true;
  // field_inputs[1].setAttribute('name', `trip[destinations_attributes][${newId+1}][arriving_to]`);
  // field_inputs[1].setAttribute('id', `trip_destinations_attributes_${newId+1}_arriving_to`);
  // field_inputs[2].setAttribute('name', `trip[destinations_attributes][${newId+1}][start_date]`);
  // field_inputs[2].setAttribute('id', `trip_destinations_attributes_${newId+1}_start_date`);
  // field_inputs[3].setAttribute('name', `trip[destinations_attributes][${newId+1}][end_date]`);
  // field_inputs[3].setAttribute('id', `trip_destinations_attributes_${newId+1}_end_date`);
  
  // Make Sure Cloned Values Are Not Carried Forward
  // group_children = group.querySelectorAll('input');
  // group_children[group_children.length-3].value = "";
  // group_children[group_children.length-2].value = "";
  // group_children[group_children.length-1].value = "";
  // old_fields.appendChild(fields);
  // return group;
  // let checkbox = document.createElement('input');
  // checkbox.setAttribute('type', 'checkbox');
  // div1.appendChild(checkbox);
}
