import Notiflix from 'notiflix';

function createMarkupChoises({ name, population, capital, languages, flags }) {
  let lang = [];
  console.log(languages);
  for (const key in languages) {
    lang.push(languages[key]);
  }
  return (countryInfoUrl.innerHTML = `<div class="article-card">
  <div class="article-card-image"><img src="${flags.svg}" width=80>${name.common}</div> 
        <h2 class="article-title">Capital: ${capital}</h2>
        <h3 class="article-author">Population: ${population}</h3>
        <p class="article-description">Languege: ${lang}</p>
    </div>`);
}

function createSearcher({ flags, name }) {
  if (name == '404') {
    console.log('Not Found');
    return Notiflix.Notify.failure(Error);
  } else
    return countryListUrl.insertAdjacentHTML(
      'beforeend',
      `
  <li class="item">
      <img src="${flags.svg}" height=20 class="country">${name.official}
      </li> 
`
    );
}

function onError(Error) {
  Notiflix.Notify.failure(Error);
  console.log(Error);
}

export default { createMarkupChoises, createSearcher, onError };
