const URL = 'https://api.thecatapi.com/v1';
const headers = {
  headers: {
      'x-api-key' : 'api_key=live_tzUAV1WarGXq6gMm0liTGEEZrUB73EAL2S74HlhzvxKlrY4zPEga8ttGvvkkhmxG'
    }
}

function throwError() {
  throw new Error('Oops! Something went wrong! Try reloading the page!');
}

export function fetchImageByBreed(breedId) {
  return fetch(`${URL}/images/search?breed_ids=${breedId}`, headers)
    .then(response => {
      if (!response.ok) {
        throwError();
      }
      return response.json();
    }).catch(throwError);
}

export function fetchCatByBreed(breedId) {
  return fetch(`${URL}/breeds/${breedId}`, headers)
    .then(response => {
      if (!response.ok) {
        throwError();
      }
      return response.json();
    }).catch(throwError);
}

export function fetchBreeds() {
  return fetch(`${URL}/breeds`, headers)
    .then(response => {
      if (!response.ok) {
        throwError();
      }
      return response.json();
    }).catch(throwError);
}

