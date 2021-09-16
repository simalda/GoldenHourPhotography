import * as config from "./config";

const backendUrl = config.backendUrl;

export function checkUser(user, password) {
  var userEncoded = encodeURIComponent(user);
  var passwordEncoded = encodeURIComponent(password);
  return fetch(`${backendUrl}/login/${userEncoded}/${passwordEncoded}`).then(
    (response) => {
      console.log(response);
      response.json().then((token) => sessionStorage.setItem("token", token));
      return response;
    }
  );
}

export function addNewImage(image) {
  const imageString = JSON.stringify(image);
  return fetch(`${backendUrl}/images`, {
    method: "POST",
    body: imageString,
    headers: { Authorization: sessionStorage.getItem("token") },
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
  return fetch(`${backendUrl}/images`).then((response) => response.json());
}

export function deleteImage(image) {
  const imageString = JSON.stringify(image);
  return fetch(`${backendUrl}/images`, {
    method: "DELETE",
    body: imageString,
  }).then((response) => {
    if (response.status === 200 || response.status === 204) {
      return true;
    } else {
      return response.json();
    }
  });
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
  return fetch(`${backendUrl}/images`, {
    method: "PUT",
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
  return fetch(`${backendUrl}/time-unit`, {
    method: "DELETE",
    body: timeUnitString,
  }).then((response) => {
    if (response.status === 200 || response.status === 204) {
      return true;
    } else {
      return response.json();
    }
  });
}

export function getTimeSlots() {
  return fetch(`${backendUrl}/time-slots`).then((response) => response.json());
}

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
  return fetch(`${backendUrl}/orders`, {
    method: "POST",
    body: orderString,
  }).then((response) => response.json());
}

export function deleteOrder(orderId) {
  const orderIdString = JSON.stringify(orderId);
  return fetch(`${backendUrl}/orders`, {
    method: "DELETE",
    body: orderIdString,
  }).then((response) => {
    if (response.status === 200 || response.status === 204) {
      return true;
    } else {
      return response.json();
    }
  });
}

export function deleteLocationType(locationType) {
  const locationTypeString = JSON.stringify(locationType);
  return fetch(`${backendUrl}/location-types`, {
    method: "DELETE",
    body: locationTypeString,
  }).then((response) => response.json());
}

export function updateOrder(order) {
  const orderString = JSON.stringify(order);
  return fetch(`${backendUrl}/orders`, {
    method: "PUT",
    body: orderString,
  }).then((response) => response.json());
}
export function getOrders() {
  return fetch(`${backendUrl}/orders`).then((response) => response.json());
}

export function getAllLocationsInfo() {
  return fetch(`${backendUrl}/locations`).then((response) => response.json());
}

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
  return fetch(`${backendUrl}/locations`, {
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
  return fetch(`${backendUrl}/images/${link.origin.id}/links`, {
    method: "PUT",
    body: linkString,
  }).then((response) => response.json());
}

export function getAllLinksToImage(origin) {
  const originString = JSON.stringify(origin);
  const imageName = JSON.stringify(origin.name);
  return fetch(`${backendUrl}/images/${imageName}/links`, {
    method: "GET",
  }).then((response) => response.json());
}

export function deleteLink(link) {
  const linkString = JSON.stringify(link);
  return fetch(`${backendUrl}/images/${link.origin.id}/links`, {
    method: "DELETE",
    body: linkString,
  }).then((response) => response.json());
}
