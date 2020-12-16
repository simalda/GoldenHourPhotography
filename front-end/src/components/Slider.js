import React from "react";

import importAll from "../JS/imageManager";

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageList: [],
      isDragging: false,
      divPos: 0,
      lastX: 0,
    };
  }

  componentDidMount() {
    this.loadImages();
    const slider = new SliderMoves();
    slider.init();
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

    var imList = pathList.map((path, index) => {
      return <img className="galery " src={path} key={index}></img>;
    });
    this.createSlider(imList);
  }

  createSlider(imList) {
    this.setState({
      imageList: imList,
    });
    imList.reduce((x, y) => x + y);
  }

  // leftClicked() {
  //   let localList = this.state.imageList;
  //   var shifledList = localList.slice(4).concat(localList.slice(0, 4));
  //   this.createSlider(shifledList);
  // }

  // rightClicked() {
  //   let localList = this.state.imageList;
  //   var shifledList = localList.slice(-4).concat(localList.slice(0, -4));
  //   this.createSlider(shifledList);
  // }
  on(e) {
    this.setState({
      ...this.state,
      isDragging: true,
      divPos: this.state.divPos + this.state.lastX - e.clientX,
      lastX: e.clientX,
    });
  }

  off(e) {
    this.setState({
      ...this.state,
      isDragging: false,
    });
  }
  render() {
    return (
      <div className="containerImages">
        <div className="innerDiv">{this.state.imageList}</div>
      </div>
    );
  }
}

class SliderMoves {
  constructor(options = {}) {
    this.bind();

    this.slider = document.querySelector(".containerImages");
    this.sliderInner = document.querySelector(".innerDiv");

    this.onX = 0;
    this.offX = 0;

    this.currentX = 0;

    this.min = 0;
  }
  bind() {
    ["setPos", "on", "off", "resize"].forEach(
      (fn) => (this[fn] = this[fn].bind(this))
    );
  }

  setPos(e) {
    if (!this.isDragging) return;
    this.currentX = this.offX + (e.clientX - this.onX);
    if (this.currentX > 0) {
      this.currentX = 0;
    } else if (
      this.currentX <
      -(this.sliderInner.getBoundingClientRect().width - window.innerWidth)
    ) {
      this.currentX = -(
        this.sliderInner.getBoundingClientRect().width - window.innerWidth
      );
    }

    this.sliderInner.style.transform = `translate3d(${this.currentX}px, 0, 0)`;
  }

  on(e) {
    this.isDragging = true;
    this.onX = e.clientX;
    this.slider.classList.add("is-grabbing");
  }

  off(e) {
    this.isDragging = false;
    this.offX = this.currentX;
    this.slider.classList.remove("is-grabbing");
  }

  addEvents() {
    this.slider.addEventListener("mousemove", this.setPos, { passive: true });
    this.slider.addEventListener("mousedown", this.on, false);
    this.slider.addEventListener("mouseup", this.off, false);

    window.addEventListener("resize", this.resize, false);
  }

  removeEvents() {
    this.cancelAnimationFrame(this.rAF);

    this.slider.removeEventListener("mousemove", this.setPos, {
      passive: true,
    });
    this.slider.removeEventListener("mousedown", this.on, false);
    this.slider.removeEventListener("mouseup", this.off, false);
  }

  resize() {
    //   this.setBounds();
    return true;
  }

  destroy() {
    this.removeEvents();

    this.opts = {};
  }

  init() {
    this.addEvents();
  }
}

export default Slider;
