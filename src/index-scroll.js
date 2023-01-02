import 'modern-normalize/modern-normalize.css';
import './css/common.css';
import './css/styles.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';
import { Notify } from 'notiflix';

// const axios = require('axios').default;

let searchQuery = '';
let page = 1;
const limit = 40;
const bodyOffset = document.body.offsetHeight;

const refs = {
  searchForm: document.querySelector('.search-form'),
  galleryContainer: document.querySelector('.gallery'),
  fetchButton: document.querySelector('[data-fetch]'),
};

refs.searchForm.addEventListener('submit', onFormSubmit);
// refs.fetchButton.addEventListener('click', onMoreButtonClick);

window.addEventListener('scroll', function () {
  if (window.innerHeight + window.pageYOffset === document.body.offsetHeight) {
    onMoreButtonClick();
  }
});

async function onFormSubmit(event) {
  event.preventDefault();
  
  refs.galleryContainer.innerHTML = '';
  // refs.fetchButton.classList.add('button--hidden');
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

  // refs.fetchButton.classList.remove('button--hidden');
  refs.galleryContainer.insertAdjacentHTML(
    'beforeend',
    createGalleryItemsMarkup(hits)
  );

  // document.body.offsetHeight = bodyOffset;
  console.log(document.body.offsetHeight + " search click");
  console.log(window.pageYOffset + ' wo sc');

  const gallery = new SimpleLightbox('.gallery a', {
    captions: false,
    showCounter: false,
  });
  gallery.refresh();
}

async function fetchImages(searchQuery) {
  const BASE_URI = 'https://pixabay.com/api';
  const params = new URLSearchParams({
    key: '32503099-d9dd46ceec4182b992252d5d9',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: limit,
    page: page,
  });

  const uri = `${BASE_URI}/?${params}&q=${encodeURIComponent(searchQuery)}`;
  console.log(uri);

  const response = await axios.get(uri);
  return response.data;
}

function createGalleryItemsMarkup(galleryItems) {
  return [...galleryItems]
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <div class="photo-card">      
        <a class="gallery__item" href="${largeImageURL}">
          <img src="${webformatURL}" data-source="${largeImageURL}" alt="${tags}" loading="lazy" />
        </a>
        <div class="info">
          <p class="info-item">
            <b>Likes</b><span>${likes}</span>
          </p>
          <p class="info-item">
            <b>Views</b><span></span>${views}
          </p>
          <p class="info-item">
            <b>Comments</b><span>${comments}</span>
          </p>
          <p class="info-item">
            <b>Downloads</b><span>${downloads}</span> 
          </p>
        </div>
      </div>
    `
    )
    .join('');
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
    // refs.fetchButton.classList.add('button--hidden');
    Notify.info(`We're sorry, but you've reached the end of search results.`);
    return;
  }
  refs.galleryContainer.insertAdjacentHTML(
    'beforeend',
    createGalleryItemsMarkup(hits)
  );
  page += 1;

  smoothScroll();
}
