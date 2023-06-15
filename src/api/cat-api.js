const URL = 'https://api.thecatapi.com/v1';
const headers = {
  headers: {
      'x-api-key' : 'api_key=live_tzUAV1WarGXq6gMm0liTGEEZrUB73EAL2S74HlhzvxKlrY4zPEga8ttGvvkkhmxG'
    }
}


export function fetchCatByBreed(breedId) {
  return fetch(`${URL}/images/search?breed_ids=${breedId}`, headers)
    .then(response => {
      return response.json();
    })
}

export function fetchBreeds() {
  return fetch(`${URL}/breeds`, headers)
    .then(response => {
      return response.json();
    })
}

