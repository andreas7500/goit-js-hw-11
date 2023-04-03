import './css/styles.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchImages from './js/fetchImg';
import cardTemplate from './js/templatas/card-template.hbs';
import throttle from 'lodash.throttle';

const THROTTLE_DELAY = 150;

let lightbox = new SimpleLightbox('.photo-card a', {
  captionsData: 'alt',
  captionDelay: 250,
  captions: 'true',
});

let searchQuery = '';
let page = 1;
let loadedHits = 0;

const refs = {
  form: document.querySelector('.search-form'),
  loadMoreBtn: document.querySelector('.load-more'),
  gallery: document.querySelector('.gallery'),
  galleryText: document.querySelector('.gallery-text'),
  galleryImg: document.querySelector('#galleryimg'),
};

function renderCardImage(arr) {
  const markup = arr.map(item => cardTemplate(item)).join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

refs.form.addEventListener('submit', onFormData);

async function onFormData(e) {
  e.preventDefault();

  searchQuery = e.currentTarget.searchQuery.value.trim();
  page = 1;
  refs.gallery.innerHTML = '';

  if (searchQuery === '') {
    Notify.info('This field cannot be empty!');
    return;
  }

  refs.loadMoreBtn.classList.add('is-hidden');
  refs.galleryText.classList.add('is-hidden');

  try {
    const response = await fetchImages(searchQuery, page);
    loadedHits = response.hits.length;

    if (response.totalHits > 0) {
      Notify.success(`Hooray! We found ${response.totalHits} images.`);
      refs.gallery.innerHTML = '';
      renderCardImage(response.hits);
      lightbox.refresh();
      refs.galleryText.classList.add('is-hidden');
    }

    if (response.totalHits === 0) {
      refs.gallery.innerHTML = '';
      document.querySelector('input').value = '';

      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );

      refs.loadMoreBtn.classList.add('is-hidden');
      refs.galleryText.classList.add('is-hidden');
    }
  } catch (error) {
    Notify.failure('Ooops...Something goes wrong');

    console.log(error);
  }
}

window.addEventListener('scroll', throttle(onScrollWindow, THROTTLE_DELAY));
window.addEventListener('resize', throttle(onScrollWindow, THROTTLE_DELAY));

async function onScrollWindow() {
  const height = document.body.offsetHeight;
  const screenHeight = window.innerHeight;

  const scrolled = window.scrollY;

  const threshold = height - screenHeight / 4;

  const position = scrolled + screenHeight;

  if (position >= threshold) {
    page += 1;

    try {
      const response = await fetchImages(searchQuery, page);

      renderCardImage(response.hits);
      lightbox.refresh();
      loadedHits += response.hits.length;

      if (loadedHits === response.totalHits) {
        refs.galleryText.classList.remove('is-hidden');
      }
    } catch (error) {
      Notify.failure('Ooops...Something goes wrong');
      console.log(error);
      refs.galleryText.classList.add('is-hidden');
    }
  }
}

// hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
// window.addEventListener('scroll', throttle(onScrollWindow, THROTTLE_DELAY));

// async function onScrollWindow() {
//   const documentRect = document.documentElement.getBoundingClientRect();
//   const heightBeforeLoading = 300;
//   if (
//     documentRect.bottom <
//     document.documentElement.clientHeight + heightBeforeLoading
//   ) {
//     page += 1;

//     try {
//       const response = await fetchImages(searchQuery, page);
//       renderCardImage(response.hits);
//       lightbox.refresh();
//       loadedHits += response.hits.length;

//       if (loadedHits === response.totalHits) {
//         refs.galleryText.classList.remove('is-hidden');
//       }
//     } catch (error) {
//       Notify.failure('Ooops...Something goes wrong');
//       console.log(error);
//       refs.galleryText.classList.add('is-hidden');
//     }
//   }
// }
// ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
