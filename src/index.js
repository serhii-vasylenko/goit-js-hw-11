import 'modern-normalize/modern-normalize.css';
import './css/common.css';
import './css/styles.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';
import { Notify } from 'notiflix';

import createGalleryItemsMarkup from './js/createGalleryItemsMarkup';
import getRefs from './js/getRefs';

let searchQuery = '';
let page = 1;

const refs = getRefs();

const gallery = new SimpleLightbox('.gallery a', {
  captions: false,
  showCounter: false,
});

refs.searchForm.addEventListener('submit', onFormSubmit);
window.addEventListener('scroll', onEndPageScroll);

async function onFormSubmit(event) {
  event.preventDefault();
  
  refs.galleryContainer.innerHTML = '';
  page = 1;

  searchQuery = event.target.elements.searchQuery.value;

  const { totalHits, hits } = await fetchImages(searchQuery);
  page += 1;

  if (totalHits === 0 || !searchQuery) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }

  Notify.success(`Hooray! We found ${totalHits} images.`);
  
  refs.galleryContainer.insertAdjacentHTML(
    'beforeend',
    createGalleryItemsMarkup(hits)
  );
  
  gallery.refresh();
}

async function fetchImages(searchQuery) {
  const BASE_URI = 'https://pixabay.com/api';
  const params = new URLSearchParams({
    key: '32503099-d9dd46ceec4182b992252d5d9',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: limit=40,
    page: page,
  });

  const uri = `${BASE_URI}/?${params}&q=${encodeURIComponent(searchQuery)}`;
  console.log(uri);

  const response = await axios.get(uri);
  return response.data;
}

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

async function onMoreButtonClick() {
  let counterHits = 0;
  const { hits, totalHits } = await fetchImages(searchQuery);

  counterHits = totalHits;

  if (page > Math.ceil(counterHits / limit)) {
    Notify.info(`We're sorry, but you've reached the end of search results.`);
    return;
  }
  refs.galleryContainer.insertAdjacentHTML(
    'beforeend',
    createGalleryItemsMarkup(hits)
  );
  page += 1;

  smoothScroll();
  gallery.refresh();
}

function onEndPageScroll() {
  if (window.innerHeight + window.pageYOffset === document.body.offsetHeight) {
    onMoreButtonClick();
  }
}