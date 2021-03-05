import React from "react";

export function createImageTypeOptions(imageTypes, currrentItemType) {
  const options = [];
  this.props.imageTypes.map((type, index) => {
    if (type === this.props.currrentItemType) {
      options.push(
        <option value={type} selected key={index}>
          {type}{" "}
        </option>
      );
    } else {
      options.push(
        <option value={type} key={index}>
          {type}
        </option>
      );
    }
  });
  return options;
}

export function getImageTypeOptions(imageTypes) {
  const options = [];
  imageTypes.map((type, index) => {
    options.push(
      <option value={type} key={index}>
        {type}{" "}
      </option>
    );
  });
  return options;
}

export function getImageLocationsOptions(imageLocations) {
  const options = [];
  imageLocations.map((location, index) => {
    options.push(
      <option value={location.name} selected key={index}>
        {location.name}
      </option>
    );
  });
  return options;
}

export function getEventTypesOptions(eventTypes) {
  const options = [];
  eventTypes.map((type, index) => {
    options.push(
      <option value={type} selected key={index}>
        {type}{" "}
      </option>
    );
  });
  return options;
}
