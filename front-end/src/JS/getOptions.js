import React from "react";

export function getOptions(types) {
  return types.map((type, index) => (
    <option value={type} selected key={index}>
      {type}
    </option>
  ));
}

export function getOptionsWithCurrent(options, currentOption) {
  if (options.includes(currentOption)) {
    options.push("");
  }
  return options.map((type, index) => {
    if (type === currentOption) {
      return (
        <option value={type} selected key={index}>
          {type}
        </option>
      );
    } else {
      return (
        <option value={type} key={index}>
          {type}
        </option>
      );
    }
  });
}
