var map = null; // holder for the actual map
let markers = [];  //stores all the pin points without checking the repeating ones
document.addEventListener('DOMContentLoaded', () => {
  // getting initial preset values of leaving from (lat and long)
  let latitude = document.querySelector('#latitude');
  let longitude = document.querySelector('#longitude');
  let myLatLng;
  // checking the validity of the values
  if (!!latitude.value && !!longitude.value) {
    // generating google position object from the values
    myLatLng = new google.maps.LatLng(parseFloat(latitude.value),parseFloat(longitude.value));
  } else {
    myLatLng = new google.maps.LatLng(43.4934817, -79.5439347);
  }
  // initializing the google map
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: myLatLng,
  });
  // adding the generated postion marker in the map
  addMarker(latitude.value, longitude.value);
  // code for getting the 1st destination
  let destination1 = document.querySelector('#trip_destinations_attributes_0_arriving_to');
  // attaching event listener for the 1st destination field
  destination1.addEventListener('change', (e) => destinationChange(e));
});
// method implementation for adding the marker
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
// method to fetch co-ordinated for each location on destination on change
// FYI use google geolocation for this.
const destinationChange = (e) => {
  fetch(`/users/get_coordinates/${e.target.value}`)
    .then((e) => e.json())
    .then((x) => {
      addMarker(x[0].data.boundingbox[0], x[0].data.boundingbox[2]);
    });
};
addFields = () => {
  // Set Integer to increment Id
  let group = document.querySelector('#destination_group');
  let group_children = group.querySelectorAll('input');
  let newId = parseInt(group_children[group_children.length - 1].name[30]);
  // Create the new divs, labels and inputs to populate the form fields
  let destination_fields = document.querySelector('#destination_fields');
  let div1 = document.createElement('div');
  let div2 = document.createElement('div');
  let div3 = document.createElement('div');
  let div4 = document.createElement('div');
  div1.className = 'field1';
  div2.className = 'field1';
  div3.className = 'field1';
  div4.className = 'field1';
  let label1 = document.createElement('label');
  let label2 = document.createElement('label');
  let label3 = document.createElement('label');
  let label4 = document.createElement('label');
  let input1 = document.createElement('input');
  let input2 = document.createElement('input');
  let input3 = document.createElement('input');
  let input4 = document.createElement('input');
  label1.setAttribute(
    'for',
    `trip_destinations_attributes_${newId + 1}_leaving_from`
  );
  label1.innerText = 'Leaving from: ';
  label1.className = 'form_label1';
  // label1.style.display = "none";
  input1.setAttribute(
    'name',
    `trip[destinations_attributes][${newId + 1}][leaving_from]`
  );
  input1.setAttribute(
    'id',
    `trip_destinations_attributes_${newId + 1}_leaving_from`
  );
  input1.setAttribute('value', group_children[group_children.length - 3].value);
  input1.setAttribute('type', 'text');
  input1.className = 'form_input1';
  // input1.hidden = true;
  div1.appendChild(label1);
  div1.appendChild(input1);
  label2.setAttribute(
    'for',
    `trip_destinations_attributes_${newId + 1}_arriving_to`
  );
  label2.innerText = `Destination #${2 + parseInt(newId)}`;
  label2.className = 'form_label1';
  input2.setAttribute(
    'name',
    `trip[destinations_attributes][${newId + 1}][arriving_to]`
  );
  input2.setAttribute(
    'id',
    `trip_destinations_attributes_${newId + 1}_arriving_to`
  );
  input2.setAttribute('type', 'text');
  input2.className = 'form_input1';
  // dynamically attaching ochange listener to destination field generated
  input2.onchange = destinationChange;
  div2.appendChild(label2);
  div2.appendChild(input2);
  label3.setAttribute(
    'for',
    `trip_destinations_attributes_${newId + 1}_start_date`
  );
  label3.innerText = 'Start Date: ';
  label3.className = 'form_label1';
  input3.setAttribute(
    'name',
    `trip[destinations_attributes][${newId + 1}][start_date]`
  );
  input3.setAttribute(
    'id',
    `trip_destinations_attributes_${newId + 1}_start_date`
  );
  input3.setAttribute('value', group_children[group_children.length - 1].value);
  input3.setAttribute('type', 'date');
  input3.className = 'form_input1';
  div3.appendChild(label3);
  div3.appendChild(input3);
  label4.setAttribute(
    'for',
    `trip_destinations_attributes_${newId + 1}_end_date`
  );
  label4.innerText = 'End Date: ';
  label4.className = 'form_label1';
  input4.setAttribute(
    'name',
    `trip[destinations_attributes][${newId + 1}][end_date]`
  );
  input4.setAttribute(
    'id',
    `trip_destinations_attributes_${newId + 1}_end_date`
  );
  input4.setAttribute('type', 'date');
  input4.className = 'form_input1';
  div4.appendChild(label4);
  div4.appendChild(input4);
  destination_fields.appendChild(div1);
  destination_fields.appendChild(div2);
  destination_fields.appendChild(div3);
  destination_fields.appendChild(div4);
};