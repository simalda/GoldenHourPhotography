export function checkUser(user, password) {
  var userEncoded = encodeURIComponent(user);
  var passwordEncoded = encodeURIComponent(password);
  return fetch(
    `http://127.0.0.1:5000/login/${userEncoded}/${passwordEncoded}`
  ).then((response) => response.json());
}

export function addNewImage(
  name,
  imageType,
  imageLocation,
  imageViewType,
  bannerApearence
) {
  var nameEncoded = encodeURIComponent(name);
  var imageTypeEncoded = encodeURIComponent(imageType);
  var imageLocationEncoded = encodeURIComponent(imageLocation);
  var imageViewTypeEncoded = encodeURIComponent(imageViewType);
  var bannerApearenceEncoded = encodeURIComponent(bannerApearence);
  return fetch(
    `http://127.0.0.1:5000/addImage/${nameEncoded}/${imageTypeEncoded}/${imageLocationEncoded}/${imageViewTypeEncoded}/${bannerApearenceEncoded}`
  ).then((response) => response.json());
}
