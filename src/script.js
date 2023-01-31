import './css/styles.css';
import Func from './components/functions';
import API from './fetchCountries';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const formUrl = document.querySelector('body');
const formInputUrl = document.querySelector('#search-box');
const countryListUrl = document.querySelector('.country-list');
const countryInfoUrl = document.querySelector('.country-info');

formInputUrl.addEventListener('input', onSubmit);
// formInputUrl.setAttribute('name', 'input-country');

function onSubmit(e) {
  e.preventDefault();
  const inputValue = formInputUrl.value;
  const getCountry = API.fetchCountries(inputValue);
  getCountry
    .then(data => {
      API.perevirka(data);
    })
    .catch(Errors => Func.onError(Errors));
  // .finally(() => formUrl.reset());
}
