import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './js/fetchCountries';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const ul = document.querySelector('.country-list');

input.addEventListener('input',debounce(() => {motherFunction()
}, DEBOUNCE_DELAY));
  
function motherFunction() {
  if (input.value !== '')
  {
    fetchCountries(input.value.trim()).then((country) => {
  if (country.length > 10) { Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');ul.innerHTML='' }
        else if (country.length > 1) { renderCountryList(country) }
        else { renderOneCountry(country) }
    })
        .catch((error) => { console.log(error), Notiflix.Notify.failure('Oops, there is no country with that name'), ul.innerHTML = '' })    
}
else { ul.innerHTML = '' }  
}       

function renderCountryList(country) {const markup = country
    .map((country) => {
        return `<li><p><img src='${country.flags.svg}'alt='flag' width ='25px'>  ${country.name.common}</p></li>`;
    }).join("");
  ul.innerHTML = markup;}

function renderOneCountry(country) {
     const markup = country
    .map((country) => {
      return `<li>
          <p><img src='${country.flags.svg}'alt='flag' width ='25px'>  ${country.name.common}</p>
          <p><b>Capital</b>: ${country.capital}</p>
          <p><b>Population</b>: ${country.population}</p>          
          <p><b>Language</b>: ${Object.values(country.languages)}</p>
        </li>`;
    }).join("");
  ul.innerHTML = markup;
}