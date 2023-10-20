import { galleryItems } from "./gallery-items.js";
// Change code below this line
const gallery = document.querySelector(".gallery");

function renderGalleryList() {
  const markup = galleryItems
    .map(({ preview, original, description }) => {
      return `<li class='gallery__item'><a class='gallery__link' href='${original}'>
      <img src='${preview}' alt='${description}' data-source='${original}' class='gallery__image'>
      </a></li>`;
    })
    .join("");
  gallery.innerHTML = markup;
}
renderGalleryList();

gallery.addEventListener("click", openEnlargedImage);

function openEnlargedImage(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  } else {
    const enlargedImageSrc = event.target.dataset.source;
    const instance = basicLightbox.create(`
    <img src='${enlargedImageSrc}' width='800' height='600'>
`);
    instance.show();

    if (basicLightbox.visible()) {
      window.addEventListener("keydown", closeByEsc);
    }
    function closeByEsc({ code }) {
      if (code === "Escape") {
        instance.close();
        window.removeEventListener("keydown", closeByEsc);
      }
    }
  }
}

console.log(galleryItems);