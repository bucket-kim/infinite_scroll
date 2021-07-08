//  unsplash api
const count = 10;
const apiKey = "gn6i-zM4twdbLXuaBWd6UgBQ35gw_x487u_xFBCfcwM";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Get photos from Unsplash API

const getPhotos = async () => {
  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    console.log(data);
  } catch (err) {
    // catch error
    console.log(err);
  }
};

// on load
getPhotos();
