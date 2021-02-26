export function checkUser(user, password) {
  var userEncoded = encodeURIComponent(user);
  var passwordEncoded = encodeURIComponent(password);
  return fetch(
    `http://127.0.0.1:5000/login/${userEncoded}/${passwordEncoded}`
  ).then((response) => {
    console.log(response);
    return response.json();
  });
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

export function addNewTimeUnit(timeUnit) {
  const timeUnitString = JSON.stringify(timeUnit);
  return fetch("http://127.0.0.1:5000/addTimeUnit", {
    method: "POST",
    body: timeUnitString,
  }).then((response) => response.json());
}

export function deleteTimeUnit(timeUnit) {
  const timeUnitString = JSON.stringify(timeUnit);
  return fetch("http://127.0.0.1:5000/deleteTimeUnit", {
    method: "POST",
    body: timeUnitString,
  }).then((response) => response.json());
}

export function getTimeSlots() {
  return fetch(`http://127.0.0.1:5000/getTimeSlots`).then((response) =>
    response.json()
  );
}

// fetch().then( x =>  7).then(a =>b)
// fetch().then( x =>  Promise.resolve(7)).then(a =>b)

export function getOpenSlots() {
  return fetch(`http://127.0.0.1:5000/getOpenSlots`).then((response) =>
    response.json()
  );
}

export function getTimeSlotsWeekly() {
  return fetch(`http://127.0.0.1:5000/getWeeklyOpenSlots`).then((response) =>
    response.json()
  );
}

export function getSingleTimeSlots() {
  return fetch(`http://127.0.0.1:5000/getSingleOpenSlots`).then((response) =>
    response.json()
  );
}

export function addOrder(order) {
  const orderString = JSON.stringify(order);
  return fetch(`http://127.0.0.1:5000/addorder`, {
    method: "POST",
    body: orderString,
  }).then((response) => response.json());
}

export function getOrders() {
  return fetch(`http://127.0.0.1:5000/getOrders`).then((response) =>
    response.json()
  );
}

export function getCalendarDataAndOrders() {}

export function getAllLocationsInfo() {
  return fetch(`http://127.0.0.1:5000/getLocationsInfo`).then((response) =>
    response.json()
  );
}
