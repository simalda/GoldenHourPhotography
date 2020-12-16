import React from "react";

import rightArrow from "../static/photos/cuts/Arrow_Right.svg";
import leftArrow from "../static/photos/cuts/Arrow_Left.svg";
import pic1 from "../static/photos/galery/Pic_01.jpg";
import pic2 from "../static/photos/galery/Pic_02.jpg";
import pic6 from "../static/photos/galery/pic_06.jpg";
// import importAll from "../JS/imageManager";

class Demo2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageList: [],
    };
  }
  componentDidMount() {
    this.initDSlired();
  }
  initDSlired() {
    const slider = new Slider();
    slider.init();
  }

  render() {
    let DemoSlider = (
      <div>
        <div className="containerImages">
          <div className="innerDiv">
            <img className="galery  " src={rightArrow} key={1}></img>
            <img className="galery  " src={pic2} key={2}></img>
            <img className="galery  " src={leftArrow} key={3}></img>
            <img className="galery" src={leftArrow} key={4}></img>
            <img className="galery  " src={rightArrow} key={5}></img>
            <img className="galery  " src={pic1} key={6}></img>
            <img className="galery  " src={rightArrow} key={7}></img>
            <img className="galery  " src={rightArrow} key={8}></img>
            <img className="galery" src={pic6} key={9}></img>
            <img className="galery" src={leftArrow} key={10}></img>
            <img className="galery" src={leftArrow} key={11}></img>
          </div>
        </div>
        <div className="text text--bottom-left">Drag to explore</div>
      </div>
    );
    return <div className=" ">{DemoSlider}</div>;
  }
}

class Slider {
  constructor(options = {}) {
    this.bind();

    this.slider = document.querySelector(".containerImages");
    this.sliderInner = document.querySelector(".innerDiv");

    this.sliderWidth = 0;

    this.onX = 0;
    this.offX = 0;

    this.currentX = 0;
    this.lastX = 0;
    this.min = 0;
    this.max = 1000;
  }
  bind() {
    ["setPos", "on", "off", "resize"].forEach(
      (fn) => (this[fn] = this[fn].bind(this))
    );
  }

  setPos(e) {
    if (!this.isDragging) return;
    this.currentX = this.offX + (e.clientX - this.onX);
    // if (this.currentX > this.max) {
    //   this.currentX = 900;
    // } else if (this.currentX < 0) {
    //   this.currentX = 0;
    // }

    this.sliderInner.style.transform = `translate3d(${this.currentX}px, 0, 0)`;
    // this.clamp();
  }
  //   clamp() {
  //     this.currentX = Math.max(Math.min(this.currentX, this.min), this.max);
  //   }
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
    // this.run();

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

export default Demo2;
