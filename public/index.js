
const app = function(){
  const url    = "https://restcountries.eu/rest/v2/all"
  const select = document.getElementById('country-select');
  makeRequest(url,requestComplete)
}

const makeRequest = function (url, callback) {
 const request    = new XMLHttpRequest();
 request.open("GET", url);
 request.addEventListener("load", callback);
 request.send(); //sending request to the server

}

const requestComplete = function () {
 if(this.status !== 200) return;  //404 cant find it, 500 server error, 200 everything ok and carries on. this.status same as saying request.status
 const jsonString = this.responseText;
 const countries  = JSON.parse(jsonString);
 populateList(countries);
}

const populateList = function(countries){
  const select     = document.getElementById("country-select")

  countries.forEach(function(country, index){
    const option     = document.createElement("option");
    option.innerText = country.name;
    option.value     = index
    select.appendChild(option);
  })

  const getCountrySelectClicked = function(){
    const selectedCountry = countries[this.value]

    const countryName = document.getElementById('country-name')
    countryName.innerText = selectedCountry.name

    const countryPopulation = document.getElementById('country-population')
    countryPopulation.innerText = selectedCountry.population

    const countryCapital = document.getElementById('country-capital')
    countryCapital.innerText = selectedCountry.capital

    save(selectedCountry);
  }
  select.addEventListener('change', getCountrySelectClicked);
}

const save = function (selectedCountry) {
  const oldCountry = localStorage.getItem('country-info') || "[]"
  const savedArray = JSON.parse(oldCountry)
  savedArray.push(selectedCountry)
  const newCountry = JSON.stringify(savedArray);
  localStorage.setItem('country-info', newCountry);
}


document.addEventListener("DOMContentLoaded", app);
