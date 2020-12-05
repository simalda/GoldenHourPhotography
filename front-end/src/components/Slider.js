import React from "react";

import rightArrow from "../static/photos/cuts/rightArrow.png";
import leftArrow from "../static/photos/cuts/leftArrow.png";

import b1 from "../static/photos/galery/Pic_01.jpg";
import b2 from "../static/photos/galery/Pic_02.jpg";
import b3 from "../static/photos/galery/Pic_03.jpg";
import b4 from "../static/photos/galery/Pic_04.jpg";
import b5 from "../static/photos/galery/Pic_05.jpg";
import b6 from "../static/photos/galery/Pic_06.jpg";

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.images = [b1, b2, b3, b4, b5, b6];
  }

  placeImagesOnScreen() {
    var total = 0;
    let i = 0;
    while (total < screen.width && i < this.images.length) {
      total += this.images[i].width;
      i++;
    }
    this.images.slice(0, i);
  }

  render() {
    var imList = this.images.map((path) => (
      <img className="galery" src={path}></img>
    ));
    imList.reduce((x, y) => x + y);
    return (
      <div className="sliderMainDiv">
        <img src={leftArrow} className="arrow" />
        <div className="slider">{imList}</div>
        <img src={rightArrow} className="arrow" />
      </div>
    );
  }
}

export default Slider;
