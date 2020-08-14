document.addEventListener('DOMContentLoaded', () => {
    // The following 3 lines are the select tags of the form 
    var countries = document.querySelector('#user_country');
    var territories = document.querySelector('#user_province');
    var cities = document.querySelector('#user_city');
    // The next 2 lines are used to get @user.province and @user.city from 
    // the edit.html.erb page. I put them in hidden tags at the top of the html page. 
    var territory = document.querySelector('#territory');
    var city = document.querySelector('#city');
    // The next 2 variables hold the values needed to fetch the get_territories 
    // and get_cities methods from the welcome controller 
    // var country;
    var territory_key;
    // Populate the @territories array in the form, and pre-select the user's territory
    fetch(`/users/get_territories/${countries.value}`)
        .then(e=>e.json())
        .then(x => {
            Object.keys(x).forEach (t => {
                var option = new Option(x[t], t);
                if(option.text==territory.value){
                    option.selected = 'selected';
                    territory_key = option.value;
                    get_cities(countries.value, territory_key);
                }
                territories.options.add(option); 
            });
        })
    // Populate the @cities array in the form, and pre-select the user's city
    get_cities = (c, t) => {
        fetch(`/users/get_cities/${c}/${t}`)
            .then(e=>e.json())
            .then(x => {
                Object.keys(x).forEach (c => {
                    var option = new Option(x[c], c);
                    if(option.text==city.value){ option.selected = 'selected'; }
                    cities.options.add(option);
                })
            })
        }
    // The rest of this code is the same as new.html.erb. The drop down menus change
    // based on user selection
    if(countries){
        countries.onchange = () => {
            territories.options.length = 0;
            let country = countries.options[countries.selectedIndex].value;
            fetch(`/users/get_territories/${country}`)
            .then(e=>e.json())
            .then(x => {
                console.log(x);
                Object.keys(x).forEach (t => {
                    var option = new Option(x[t], t);
                    territories.options.add(option); 
                });
                cities.options.length = 0;
                get_cities(country, territories.options[0].value);
            })
        }
    }
    if(territories){
        territories.onchange = () => { 
        cities.options.length = 0;
        let country = countries.options[countries.selectedIndex].value;
        territory = territories.options[territories.selectedIndex].value;
        fetch(`/users/get_cities/${country}/${territory}`)
        .then(e=>e.json())
        .then(x => {
            Object.keys(x).forEach (c => {
                var option = new Option(x[c], c);
                cities.options.add(option);
            })
        })
        }
    }
    document.querySelector('form').onsubmit = () => {
        countries.options[countries.selectedIndex].value = countries.options[countries.selectedIndex].text;
        territories.options[territories.selectedIndex].value = territories.options[territories.selectedIndex].text; 
        cities.options[cities.selectedIndex].value = cities.options[cities.selectedIndex].text;
    }
});