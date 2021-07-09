// image container
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArr = [];

//  unsplash api
const count = 30;
const apiKey = "gn6i-zM4twdbLXuaBWd6UgBQ35gw_x487u_xFBCfcwM";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// helper function to set attributes on dom elements
const setAttributes = (ele, att) => {
  for (let key in att) {
    ele.setAttribute(key, att[key]);
  }
};

// check if all images were loaded
const imageLoad = () => {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
};

// displaying photos from unsplash
const displayPhotos = () => {
  imagesLoaded = 0;
  totalImages = photosArr.length;
  photosArr.forEach((photo) => {
    // create <a> to link to Unsplash
    const item = document.createElement("a");
    // item.setAttribute("href", photo.links.html);
    // item.setAttribute("target", "_blank");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    // create <img> for photo
    const img = document.createElement("img");
    // img.setAttribute("src", photo.urls.regular);
    // img.setAttribute("alt", photo.alt_description);
    // img.setAttribute("title", photo.alt_description);
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // event listener, check when each is finished loading
    img.addEventListener("load", imageLoad);
    // put <img> inside <a>, then put both inside image container element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
};

// Get photos from Unsplash API

const getPhotos = async () => {
  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    photosArr = data;

    displayPhotos();
  } catch (err) {
    // catch error
    console.log(err);
  }
};

// check to see if scrolling near bottom of page, load more photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// on load
getPhotos();
