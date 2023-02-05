import galleryItemsTemplate from '../templates/gallery-items.hbs';

const createGalleryItemsMarkup = galleryItems =>
  galleryItemsTemplate(galleryItems);

export default createGalleryItemsMarkup;
