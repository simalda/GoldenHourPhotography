import * as config from "./config";

const backendUrl = config.backendUrl;

export function checkUser(user, password) {
  var userEncoded = encodeURIComponent(user);
  var passwordEncoded = encodeURIComponent(password);
  return fetch(`${backendUrl}/login/${userEncoded}/${passwordEncoded}`).then(
    (response) => {
      console.log(response);
      return response;
    }
  );
}

export function addNewImage(image) {
  const imageString = JSON.stringify(image);
  return fetch(`${backendUrl}/image`, {
    method: "POST",
    body: imageString,
  }).then((response) => {
    console.log(response);
    if (response.status !== 200) {
      return Promise.reject(response);
    } else if (response.status === 200) {
      return response.json();
    }
  });
}

export function saveFile(file) {
  return fetch(`${backendUrl}/image-file`, {
    method: "POST",
    body: file,
  }).then((response) => {
    console.log(response);
    if (response.status !== 200) {
      return Promise.reject(response);
    } else if (response.status === 200) {
      return response.json();
    }
  });
}
export function getAllImageTypes() {
  return fetch(`${backendUrl}/image-types`).then((response) => response.json());
}

export function getAllEventTypes() {
  return fetch(`${backendUrl}/event-types`).then((response) => response.json());
}

export function getAllImages() {
  return fetch(`${backendUrl}/image`).then((response) => response.json());
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

export function updateImage(image) {
  const imageString = JSON.stringify(image);
  return fetch(`${backendUrl}/update-image`, {
    method: "POST",
    body: imageString,
  }).then((response) => response.json());
}
export function addNewTimeUnit(timeUnit) {
  const timeUnitString = JSON.stringify(timeUnit);
  return fetch("${backendUrl}/time-unit", {
    method: "POST",
    body: timeUnitString,
  }).then((response) => response.json());
}

export function deleteTimeUnit(timeUnit) {
  const timeUnitString = JSON.stringify(timeUnit);
  return fetch(`${backendUrl}/delete-time-unit`, {
    method: "POST",
    body: timeUnitString,
  }).then((response) => response.json());
}

export function getTimeSlots() {
  return fetch(`${backendUrl}/time-slots`).then((response) => response.json());
}

// export function getOpenSlots() {
//   return fetch(`${backendUrl}/getOpenSlots`).then((response) =>
//     response.json()
//   );
// }

export function getTimeSlotsWeekly() {
  return fetch(`${backendUrl}/weekly-open-slots`).then((response) =>
    response.json()
  );
}

export function getSingleTimeSlots() {
  return fetch(`${backendUrl}/single-open-slots`).then((response) =>
    response.json()
  );
}

export function addOrder(order) {
  const orderString = JSON.stringify(order);
  return fetch(`${backendUrl}/order`, {
    method: "POST",
    body: orderString,
  }).then((response) => response.json());
}

export function deleteOrder(orderId) {
  const orderIdString = JSON.stringify(orderId);
  return fetch(`${backendUrl}/delete-order`, {
    method: "POST",
    body: orderIdString,
  }).then((response) => response.json());
}

export function deleteLocationType(locationType) {
  const locationTypeString = JSON.stringify(locationType);
  return fetch(`${backendUrl}/delete-location-type`, {
    method: "POST",
    body: locationTypeString,
  }).then((response) => response.json());
}

export function updateOrder(order) {
  const orderString = JSON.stringify(order);
  return fetch(`${backendUrl}/update-order`, {
    method: "POST",
    body: orderString,
  }).then((response) => response.json());
}
export function getOrders() {
  return fetch(`${backendUrl}/orders`).then((response) => response.json());
}

export function getAllLocationsInfo() {
  return fetch(`${backendUrl}/locations`).then((response) => response.json());
}

// export function getAllLocations() {
//   return fetch(`${backendUrl}/getLocations`).then((response) =>
//     response.json()
//   );
// }

export function getLocationsName() {
  return fetch(`${backendUrl}/locations-names`).then((response) =>
    response.json()
  );
}

export function getLocationTypes() {
  return fetch(`${backendUrl}/location-types`).then((response) =>
    response.json()
  );
}

export function addNewLocation(location) {
  const locationString = JSON.stringify(location);
  return fetch(`${backendUrl}/location`, {
    method: "POST",
    body: locationString,
  }).then((response) => response.json());
}

export function addNewLocationType(locationType) {
  const locationString = JSON.stringify(locationType);
  return fetch(`${backendUrl}/location-types`, {
    method: "POST",
    body: locationString,
  }).then((response) => response.json());
}

export function sendMail(order) {
  const orderString = JSON.stringify(order);
  return fetch(`${backendUrl}/send-mail`, {
    method: "POST",
    body: orderString,
  }).then((response) => response.json());
}

export function upsertLink(link) {
  const linkString = JSON.stringify(link);
  return fetch(`${backendUrl}/upsert-link`, {
    method: "POST",
    body: linkString,
  }).then((response) => response.json());
}

export function getAllLinksToImage(origin) {
  const originString = JSON.stringify(origin);
  return fetch(`${backendUrl}/links-to-image`, {
    method: "POST",
    body: originString,
  }).then((response) => response.json());
}

export function deleteLink(link) {
  const linkString = JSON.stringify(link);
  return fetch(`${backendUrl}/delete-link`, {
    method: "POST",
    body: linkString,
  }).then((response) => response.json());
}
