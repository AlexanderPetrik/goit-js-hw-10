import './css/styles.css';
import { fetchCatByBreed, fetchImageByBreed, fetchBreeds } from './api/cat-api';
import Notiflix from 'notiflix';

// Получить рефс +
// Получить список пород +
// При загрузке вывести список пород в селект +
// При выборе из силекта получить полную ин-фу о породе +
// Вывисти ин-фу на страницу +
// Очистка +
// При загрузке показывать загрузку -
// Добавить обработку ошибок -
// Добавить оформление стилей на страницу:
    // селект -
    // loader -
    // Error -

const refs = {
  breedCats: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
}

// console.log(refs);

fetchBreeds().then(response => {
  console.log(response);
  const options = response.map((cat) => {
    const option = document.createElement(`option`);
    option.value = cat.id;
    option.textContent = cat.name;
    return option
  })
  refs.breedCats.append(...options);
});

refs.breedCats.addEventListener('change', (event) => {
  refs.catInfo.innerHTML = '';

  fetchCatByBreed(event.target.value).then(response => {
    const catName = document.createElement(`h2`);
    catName.textContent = response.name;
    const catDescription = document.createElement(`p`);
    catDescription.textContent = response.description;
    const catTemp = document.createElement('p');
    catTemp.textContent = `<strong>Temperament: </strong>${response.temperament}`;
    refs.catInfo.append(catName, catDescription, catTemp);
  });

  fetchImageByBreed(event.target.value).then(response => {
    const catPicture = document.createElement(`img`);
    catPicture.src = response[0]?.url;
    catPicture.width = 480;
    refs.catInfo.prepend(catPicture);
  });

})





