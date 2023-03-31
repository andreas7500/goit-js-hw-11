import './css/styles.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchImages from './js/fetchImg';
import cardTemplate from './js/templatas/card-template.hbs';
// import throttle from 'lodash.throttle';

// const THROTTLE_DELAY = 250;

let lightbox = new SimpleLightbox('.photo-card a', {
  captionsData: 'alt',
  captionDelay: 250,
  captions: 'true',
});

let searchQuery = '';
let page = 1;
let loadedHits = 0;

fetchImages().then(console.log);
const refs = {
  form: document.querySelector('.search-form'),
  loadMoreBtn: document.querySelector('.load-more'),
  gallery: document.querySelector('.gallery'),
  galleryText: document.querySelector('.gallery__text'),
};

function renderCardImage(arr) {
  const markup = arr.map(item => cardTemplate(item)).join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

refs.form.addEventListener('submit', onFormData);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtn);

async function onFormData(e) {
  e.preventDefault();
  page = 1;
  searchQuery = e.currentTarget.searchQuery.value.trim();
  // console.log(searchQuery);
  if (searchQuery === '') {
    Notify.info('This field cannot be empty!');
    return;
  }

  refs.loadMoreBtn.classList.add('is-hidden');
  refs.galleryText.classList.add('is-hidden');

  try {
    const response = await fetchImages(searchQuery, page);
    loadedHits = response.hits.length;

    if (response.totalHits > 40) {
      refs.loadMoreBtn.classList.remove('is-hidden');
    } else {
      refs.loadMoreBtn.classList.add('is-hidden');
    }

    if (response.totalHits > 0) {
      Notify.success(`Hooray! We found ${response.totalHits} images.`);
      refs.gallery.innerHTML = '';
      renderCardImage(response.hits);
      lightbox.refresh();
      refs.galleryText.classList.add('is-hidden');

      onScroll();
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
    document.querySelector('input').value = '';
    console.log(error);
  }
}

async function onLoadMoreBtn() {
  page += 1;

  try {
    const response = await fetchImages(searchQuery, page);
    renderCardImage(response.hits);
    lightbox.refresh();
    loadedHits += response.hits.length;

    if (loadedHits === response.totalHits) {
      refs.loadMoreBtn.classList.add('is-hidden');
      refs.galleryText.classList.remove('is-hidden');
    }
    onScrollMore();
  } catch (error) {
    Notify.failure('Ooops...Something goes wrong');
    document.querySelector('input').value = '';
  }
}

function onScroll() {
  window.scrollBy({
    top: 0,
    behavior: 'smooth',
  });
}

function onScrollMore() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 3,
    behavior: 'smooth',
  });
}
