import React from "react";
import * as imageManager from "../../../JS/imageManager";
import classes from "./galery.module.scss";

export default function Galery() {
  const pathList = imageManager.importAll();

  const images = pathList.map((imagepath, index) => (
    <img
      src={imagepath}
      key={index}
      className={classes.galeryView}
      id="photos"
    />
  ));

  return <div className={classes.gallery_wrapper}> {images}</div>;
}
