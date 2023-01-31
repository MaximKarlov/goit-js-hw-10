import Notiflix from 'notiflix';
import Func from './components/functions';
const ENDPOINT = 'https://restcountries.com/v3.1/name/';

function fetchCountries(query) {
  return fetch(`${ENDPOINT}${query}`).then(res => res.json());
}

function perevirka(data) {
  if (data.length == undefined) {
    Notiflix.Notify.failure('Oops, there is no country with that name');
  }
  if (data.length > 10)
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  else if (data.length >= 2 && data.length <= 10) {
    for (const key in data) {
      Func.createSearcher(data[key]);
    }
  }
  if (data.length === 1) {
    const array = data[0];
    Func.createMarkupChoises(array);
  }
}

export default {
  fetchCountries,
  perevirka,
};
