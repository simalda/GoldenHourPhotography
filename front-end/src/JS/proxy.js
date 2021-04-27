import * as config from "./config";

const backendUrl = config.backendUrl;

export function checkUser(user, password) {
  var userEncoded = encodeURIComponent(user);
  var passwordEncoded = encodeURIComponent(password);
  return fetch(`${backendUrl}/login/${userEncoded}/${passwordEncoded}`).then(
    (response) => {
      console.log(response);
      return response.json();
    }
  );
}

export function addNewImage(image) {
  const imageString = JSON.stringify(image);
  return fetch(`${backendUrl}/addImage`, {
    method: "POST",
    body: imageString,
    credentials: "same-origin",
  }).then((response) => response.json());
}

export function getAllImageTypes() {
  return fetch(`${backendUrl}/getAllImageTypes`).then((response) =>
    response.json()
  );
}

export function getAllEventTypes() {
  return fetch(`${backendUrl}/getAllEventTypes`).then((response) =>
    response.json()
  );
}

export function getAllImages() {
  return fetch(`${backendUrl}/getAllImages`).then((response) =>
    response.json()
  );
}

export function deleteImage(image) {
  const imageString = JSON.stringify(image);
  return fetch(`${backendUrl}/delete`, {
    method: "POST",
    body: imageString,
  }).then((response) => response.json());
}

export function updateImages(imageSet) {
  const imArray = [...imageSet];
  if (imArray.length) {
    const imageString = JSON.stringify(imArray);
    return fetch(`${backendUrl}/update`, {
      method: "POST",
      body: imageString,
    }).then((response) => response.json());
  }
}

export function addNewTimeUnit(timeUnit) {
  const timeUnitString = JSON.stringify(timeUnit);
  return fetch("${backendUrl}/addTimeUnit", {
    method: "POST",
    body: timeUnitString,
  }).then((response) => response.json());
}

export function deleteTimeUnit(timeUnit) {
  const timeUnitString = JSON.stringify(timeUnit);
  return fetch("${backendUrl}/deleteTimeUnit", {
    method: "POST",
    body: timeUnitString,
  }).then((response) => response.json());
}

export function getTimeSlots() {
  return fetch(`${backendUrl}/getTimeSlots`).then((response) =>
    response.json()
  );
}

export function getOpenSlots() {
  return fetch(`${backendUrl}/getOpenSlots`).then((response) =>
    response.json()
  );
}

export function getTimeSlotsWeekly() {
  return fetch(`${backendUrl}/getWeeklyOpenSlots`).then((response) =>
    response.json()
  );
}

export function getSingleTimeSlots() {
  return fetch(`${backendUrl}/getSingleOpenSlots`).then((response) =>
    response.json()
  );
}

export function addOrder(order) {
  const orderString = JSON.stringify(order);
  return fetch(`${backendUrl}/addorder`, {
    method: "POST",
    body: orderString,
  }).then((response) => response.json());
}

export function deleteOrder(orderId) {
  const orderIdString = JSON.stringify(orderId);
  return fetch("${backendUrl}/deleteOrder", {
    method: "POST",
    body: orderIdString,
  }).then((response) => response.json());
}

export function updateOrder(order) {
  const orderString = JSON.stringify(order);
  return fetch("${backendUrl}/updateOrder", {
    method: "POST",
    body: orderString,
  }).then((response) => response.json());
}
export function getOrders() {
  return fetch(`${backendUrl}/getOrders`).then((response) => response.json());
}

export function getCalendarDataAndOrders() {}

export function getAllLocationsInfo() {
  return fetch(`${backendUrl}/getLocationsInfo`).then((response) =>
    response.json()
  );
}

export function getAllLocations() {
  return fetch(`${backendUrl}/getLocations`).then((response) =>
    response.json()
  );
}
export function sendMail(order) {
  const orderString = JSON.stringify(order);
  return fetch(`${backendUrl}/sendMail`, {
    method: "POST",
    body: orderString,
  }).then((response) => response.json());
}
