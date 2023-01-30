import API from './fetchCountries';

const formUrl = document.querySelector('body');
const formInputUrl = document.querySelector('#search-box');
const countryListUrl = document.querySelector('.country-list')
const countryInfoUrl = document.querySelector('.country-info');

formInputUrl.addEventListener('change', onSubmit);
// formInputUrl.setAttribute('name', 'input-country');


function onSubmit(e) {
  e.preventDefault();
  const inputValue =formInputUrl.value;
  const getCountry = API.fetchCountries(inputValue);
  console.log(getCountry);
  getCountry
    .then(data => {
      console.log(data.length);
      if (data.length > 0) {
        for (const key in data) {
          console.log(data[key]);
          createSearcher(data[key]);
        }
      } else {
        const array = data[0];
        createMarkupChoises(array);
      }
        

    })
    .catch(onError)
    // .finally(() => form.reset());
}

function createMarkupChoises({ population, capital, languages, flags }) {
  let lang = [];
  console.log(languages);
  for (const key in languages) {
    lang.push(languages[key]);
  }
  return (countryInfoUrl.innerHTML = `<div class="article-card">
  <div class="article-card-image"><img src="${flags.svg}" width=80></div> 
        <h2 class="article-title">Capital: ${capital}</h2>
        <h3 class="article-author">Population: ${population}</h3>
        <p class="article-description">Languege: ${lang}</p>
    </div>`);
}

function createSearcher({flags,name }) { 
    return countryListUrl.insertAdjacentHTML("beforeend",`
  <li class="item">
      <img src="${flags.svg}" height=80> ${name.official}
      </li> 
`);
  }


function onError(err) {
  console.error(err);
  updateNewsList('<p>Articles not found</p>');
}
