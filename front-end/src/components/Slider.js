import React from "react";

import rightArrow from "../static/photos/cuts/Arrow_Right.svg";
import leftArrow from "../static/photos/cuts/Arrow_Left.svg";
import importAll from "../JS/imageManager";

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageList: [],
    };
  }

  componentDidMount() {
    this.loadImages();
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

  loadImages() {
    const pathList = importAll();
    var imList = pathList.map((path, index) => (
      <img className="galery" src={path} key={index}></img>
    ));
    this.createSlider(imList);
  }

  createSlider(imList) {
    this.setState({
      imageList: imList,
    });
    imList.reduce((x, y) => x + y);
  }

  leftClicked() {
    let localList = this.state.imageList;
    var shifledList = localList.slice(4).concat(localList.slice(0, 4));
    this.createSlider(shifledList);
  }

  rightClicked() {
    let localList = this.state.imageList;
    var shifledList = localList.slice(-4).concat(localList.slice(0, -4));
    this.createSlider(shifledList);
  }
  render() {
    return (
      <div className="sliderMainDiv">
        <img
          src={leftArrow}
          className="arrow"
          onClick={() => this.leftClicked()}
        />
        <div className="slider">{this.state.imageList}</div>
        <img
          src={rightArrow}
          className="arrow"
          onClick={() => this.rightClicked()}
        />
      </div>
    );
  }
}

export default Slider;
