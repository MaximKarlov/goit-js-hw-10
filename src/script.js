import API from './fetchCountries';

const formUrl = document.querySelector('#form');
const countryInfoUrl = document.querySelector('#country_Info');
form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  const inputValue = form.elements.news.value;
  const getCountry = API.fetchCountries(inputValue);
  console.log(getCountry);
  getCountry
    .then(data => {
      const array = data[0];
      createMarkup(array);
    })
    .then(updateNewsList())
    .catch(onError)
    .finally(() => form.reset());
}

function createMarkup({ population, capital, languages, flags }) {
  let lang = [];
  console.log(languages);
  for (const key in languages) {
    lang.push(languages[key]);
  }
  return (countryInfoUrl.innerHTML = `<div class="article-card">
  <div class="article-card-image"><img src="${flags.png}" width=80></div> 
        <h2 class="article-title">Capital: ${capital}</h2>
        <h3 class="article-author">Population: ${population}</h3>
        <p class="article-description">Languege: ${lang}</p>
    </div>`);
}

function updateNewsList(markup) {}

function onError(err) {
  console.error(err);
  updateNewsList('<p>Articles not found</p>');
}
