export function checkUser(user, password) {
  var userEncoded = encodeURIComponent(user);
  var passwordEncoded = encodeURIComponent(password);
  return fetch(
    `http://127.0.0.1:5000/login/${userEncoded}/${passwordEncoded}`
  ).then((response) => response.json());
}

export function addNewImage(image) {
  const imageString = JSON.stringify(image);
  return fetch(`http://127.0.0.1:5000/addImage`, {
    method: "POST",
    body: imageString,
  }).then((response) => response.json());
}

export function getAllImageTypes() {
  return fetch(`http://127.0.0.1:5000/getAllImageTypes`).then((response) =>
    response.json()
  );
}

export function getAllEventTypes() {
  return fetch(`http://127.0.0.1:5000/getAllEventTypes`).then((response) =>
    response.json()
  );
}

export function getAllImages() {
  return fetch(`http://127.0.0.1:5000/getAllImages`).then((response) =>
    response.json()
  );
}

export function deleteImage(image) {
  const imageString = JSON.stringify(image);
  return fetch(`http://127.0.0.1:5000/delete`, {
    method: "POST",
    body: imageString,
  }).then((response) => response.json());
}

export function updateImages(imageSet) {
  const imArray = [...imageSet];
  const imageString = JSON.stringify(imArray);
  return fetch(`http://127.0.0.1:5000/update`, {
    method: "POST",
    body: imageString,
  }).then((response) => response.json());
}
