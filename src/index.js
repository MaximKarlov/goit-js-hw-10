import './css/styles.css';
import API from './fetchCountries';
import Notiflix from 'notiflix';
import _ from 'lodash';

const DEBOUNCE_DELAY = 300;

const formUrl = document.querySelector('body');
const formInputUrl = document.querySelector('#search-box');
const countryListUrl = document.querySelector('.country-list');
const countryInfoUrl = document.querySelector('.country-info');

formInputUrl.addEventListener('input', _.debounce(onSubmit, DEBOUNCE_DELAY));

function onSubmit(e) {
  e.preventDefault();
  const inputValue = formInputUrl.value.trim();
  const getCountry = API.fetchCountries(inputValue);
  countryListUrl.innerHTML = countryInfoUrl.innerHTML = ' ';
  getCountry
    .then(data => {
      if (data.length < 1) {
        countryListUrl.innerHTML = countryInfoUrl.innerHTML = ' ';
        Notiflix.Notify.failure('Oops, there is no country with that name');
      }
      if (data.length > 10) {
        countryListUrl.innerHTML = countryInfoUrl.innerHTML = ' ';
        Notiflix.Notify.info(
          `Too many matches found. Matches found: ${data.length} . Please enter a more specific name.`
        );
      }
      if (data.length >= 2 && data.length <= 10) {
        countryListUrl.innerHTML = countryInfoUrl.innerHTML = ' ';
        for (const key in data) {
          createSearcher(data[key]);
        }
      } else {
        if (data.length < 2) {
          countryListUrl.innerHTML = countryInfoUrl.innerHTML = ' ';
          const array = data[0];
          createMarkupChoises(array);
        }
      }
    })
    .catch(Errors => onError(Errors));
}

function createMarkupChoises({ name, population, capital, languages, flags }) {
  let lang = [];
  // console.log(languages);
  for (const key in languages) {
    lang.push(languages[key]);
  }
  return (countryInfoUrl.innerHTML = `<div class="country-card">
  <div class="country-card-image"><img src="${flags.svg}" width=80">${name.common}</div> 
        <h2 class="country-card-title" item="cap">Capital:<span> ${capital}</span></h2>
        <h3 class="country-card-population">Population: <span>${population}</span></h3>
        <h3 class="country-card-language">Languages:<span> ${lang}</span></h3>
    </div>`);
}

function createSearcher({ flags, name }) {
  return countryListUrl.insertAdjacentHTML(
    'beforeend',
    `
  <li class="item">
      <img src="${flags.svg}" class="country">${name.official}
      </li> 
`
  );
}

function onError(Error) {
  Notiflix.Notify.failure(Error.message);
  // console.log(Error);
}
