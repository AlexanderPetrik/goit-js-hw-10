const URL = 'https://api.thecatapi.com/v1/images/search';

export function fetchCatByBreed(breedId) {
  return fetch(
    `${URL}/${breedId}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error('Oops! Something went wrong! Try reloading the page!');
    }
    return response.json();
  });
}