import 'slim-select/dist/slimselect.css';
import './css/loader.css';
import './css/styles.css';
import { fetchCatByBreed, fetchImageByBreed, fetchBreeds } from './api/cat-api';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';


// Получить рефс +
// Получить список пород +
// При загрузке вывести список пород в селект +
// При выборе из силекта получить полную ин-фу о породе +
// Вывисти ин-фу на страницу +
// Очистка +
// При загрузке показывать загрузку +
// Добавить обработку ошибок +
// Добавить оформление стилей на страницу:
    // селект +
    // loader +
    // Error +

const refs = {
  breedCats: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.lds-roller'),
  error: document.querySelector('.error'),
}

const toggleLoader = (show) => {
  if (show) {
    refs.loader.classList.remove('hidden-js');
    return
  }
  refs.loader.classList.add('hidden-js');
};

const showError = () => {
  Notiflix.Notify.failure(
    "Oops! Something went wrong! Try reloading the page!",
    {
      timeout: 6000,
    },
  );
};

const drawInfo = response => {
  const catName = document.createElement(`h2`);
  catName.textContent = response.name;
  const catDescription = document.createElement(`p`);
  catDescription.textContent = response.description;
  const catTemp = document.createElement('p');
  catTemp.innerHTML = `<strong>Temperament: </strong>${response.temperament}`;
  refs.catInfo.append(catName, catDescription, catTemp);
};

const drawImage = response => {
  const catPicture = document.createElement(`img`);
  catPicture.src = response[0]?.url;
  catPicture.width = 480;
  refs.catInfo.prepend(catPicture);
};



fetchBreeds()
  .then(response => {
    const options = response.map((cat) => {
      const option = document.createElement(`option`);
      option.value = cat.id;
      option.textContent = cat.name;
      return option
    })
    refs.breedCats.append(...options);
    new SlimSelect({
      select: '.breed-select'
    })
  })
  .catch(showError)
  .finally(() => {
    toggleLoader(false);
  });



refs.breedCats.addEventListener('change', (event) => {

  refs.catInfo.innerHTML = '';
  toggleLoader(true);
  Promise
    .all([
      fetchCatByBreed(event.target.value),
      fetchImageByBreed(event.target.value),
    ])
    .then(response => {
      drawInfo(response[0]);
      drawImage(response[1]);
    })
    .catch(showError)
    .finally(() => {
      toggleLoader(false);
    })
});





