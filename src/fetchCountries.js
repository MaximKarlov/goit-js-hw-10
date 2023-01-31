// const ENDPOINT = 'https://restcountries.com/v3.1/name/';

// function fetchCountries(query) {
//   return fetch(`${ENDPOINT}${query}`).then(res => res.json());
// }

// export default { fetchCountries };

// -=============Variant 2===============

const ENDPOINT = 'https://restcountries.com/v3.1/name/';

function fetchCountries(query) {
  return fetch(
    `${ENDPOINT}${query}?fields=name,population,capital,languages,flags`
  ).then(res => res.json());
  // .then(data => console.log(data));
}

export default { fetchCountries };
