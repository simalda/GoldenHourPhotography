import React from "react";
import * as imageManager from "../../JS/imageManager";
import "./galery.css";

export default function Galery() {
  const pathList = imageManager.importAll();

  const images = pathList.map((imagepath, index) => (
    <img src={imagepath} key={index} className="galeryView" id="photos" />
  ));

  return <div className="gallery-wrapper"> {images}</div>;
}
