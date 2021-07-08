// image container
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArr = [];

//  unsplash api
const count = 10;
const apiKey = "gn6i-zM4twdbLXuaBWd6UgBQ35gw_x487u_xFBCfcwM";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// helper function to set attributes on dom elements
const setAttributes = (ele, att) => {
  for (let key in att) {
    ele.setAttribute(key, att[key]);
  }
};

// displaying photos from unsplash
const displayPhotos = () => {
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

// on load
getPhotos();
