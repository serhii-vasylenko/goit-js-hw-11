function e(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},o={},a=n.parcelRequired7c6;null==a&&((a=function(e){if(e in t)return t[e].exports;if(e in o){var n=o[e];delete o[e];var a={id:e,exports:{}};return t[e]=a,n.call(a.exports,a,a.exports),a.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,n){o[e]=n},n.parcelRequired7c6=a);var r=a("fZKcF"),i=a("2shzp"),s=a("eWCmQ");let l="",c=1;const d={searchForm:document.querySelector(".search-form"),galleryContainer:document.querySelector(".gallery"),fetchButton:document.querySelector("[data-fetch]")},f=new(e(r))(".gallery a",{captions:!1,showCounter:!1});async function u(e){const n=`https://pixabay.com/api/?${new URLSearchParams({key:"32503099-d9dd46ceec4182b992252d5d9",image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:40,page:c})}&q=${encodeURIComponent(e)}`;console.log(n);return(await i.default.get(n)).data}function p(e){return[...e].map((({webformatURL:e,largeImageURL:n,tags:t,likes:o,views:a,comments:r,downloads:i})=>`\n      <div class="photo-card">      \n        <a class="gallery__item" href="${n}">\n          <img src="${e}" data-source="${n}" alt="${t}" loading="lazy" />\n        </a>\n        <div class="info">\n          <p class="info-item">\n            <b>Likes</b><span>${o}</span>\n          </p>\n          <p class="info-item">\n            <b>Views</b><span></span>${a}\n          </p>\n          <p class="info-item">\n            <b>Comments</b><span>${r}</span>\n          </p>\n          <p class="info-item">\n            <b>Downloads</b><span>${i}</span> \n          </p>\n        </div>\n      </div>\n    `)).join("")}d.searchForm.addEventListener("submit",(async function(e){e.preventDefault(),d.galleryContainer.innerHTML="",c=1,l=e.target.elements.searchQuery.value;const{totalHits:n,hits:t}=await u(l);if(c+=1,0===n||!l)return void s.Notify.failure("Sorry, there are no images matching your search query. Please try again.");s.Notify.success(`Hooray! We found ${n} images.`),d.galleryContainer.insertAdjacentHTML("beforeend",p(t)),f.refresh()})),window.addEventListener("scroll",(function(){window.innerHeight+window.pageYOffset===document.body.offsetHeight&&async function(){let e=0;const{hits:n,totalHits:t}=await u(l);if(e=t,c>Math.ceil(e/40))return void s.Notify.info("We're sorry, but you've reached the end of search results.");d.galleryContainer.insertAdjacentHTML("beforeend",p(n)),c+=1,function(){const{height:e}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:2*e,behavior:"smooth"})}(),f.refresh()}()}));
//# sourceMappingURL=index.e953c53a.js.map