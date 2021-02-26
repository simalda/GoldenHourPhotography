import React from "react";

import * as imageManager from "../../JS/imageManager";

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePathList: [],
    };
    this.sliderRef = React.createRef();
  }

  componentDidMount() {
    if (!this.props.pathList.length) {
      this.loadImages();
    } else {
      this.setState({
        imagePathList: this.props.pathList,
      });
    }
  }
  // componentWillUnmount(){
  //   slider.removeEvents()
  // }
  componentDidUpdate() {
    const slider = new SliderMoves(this.sliderRef, this.state.imagePathList);
    slider.init();
  }

  loadImages() {
    const pathList = imageManager.importAll();
    this.setState({
      imagePathList: pathList,
    });
  }

  render() {
    return <div ref={this.sliderRef} />;
  }
}

class SliderMoves {
  constructor(sliderRef, pathForImagesList) {
    this.bind();
    this.node = sliderRef.current;
    this.pathForImagesList = pathForImagesList;

    this.onX = 0;
    this.offX = 0;
    this.currentX = 0;
    this.min = 0;

    this.onMobileX = 0;
  }
  bind() {
    ["setPos", "on", "off", "resize"].forEach(
      (fn) => (this[fn] = this[fn].bind(this))
    );
  }

  createSlider() {
    let imageFromPath = (path, index) => {
      let img = document.createElement("IMG");
      img.src = path;
      img.setAttribute("class", "galery");
      img.setAttribute("key", index);
      return img;
    };

    let imgToAddIntoDiv = this.pathForImagesList
      .map(imageFromPath)
      .concat(this.pathForImagesList.map(imageFromPath))
      .concat(this.pathForImagesList.map(imageFromPath));
    let containerDiv = document.createElement("DIV");
    containerDiv.setAttribute("class", "containerImages");
    let innerDiv = document.createElement("DIV");
    innerDiv.setAttribute("class", "innerDiv");
    for (let i = 0; i < imgToAddIntoDiv.length; i++) {
      imgToAddIntoDiv[i].setAttribute("id", i);
      innerDiv.appendChild(imgToAddIntoDiv[i]);
    }
    containerDiv.appendChild(innerDiv);
    // this.node.appendChild(containerDiv);
    this.node.innerHTML = containerDiv.outerHTML;
    this.slider = document.querySelector(".containerImages");
    this.sliderInner = document.querySelector(".innerDiv");
  }

  setFirstPosition() {
    this.currentX = -this.sliderInner.getBoundingClientRect().width / 3;
    this.offX = this.currentX;
    this.sliderInner.style.transform = `translate3d(${this.currentX}px, 0, 0)`;
  }

  setPos(e) {
    if (!this.isDragging) return;

    this.currentX = this.offX + (e.clientX - this.onX);
    if (window.innerWidth < 600) {
      this.currentX =
        this.offX + (e.changedTouches[0].clientX - this.onMobileX);
    }
    if (
      this.currentX > 0 ||
      this.currentX < (-2 * this.sliderInner.getBoundingClientRect().width) / 3
    ) {
      this.currentX = -this.sliderInner.getBoundingClientRect().width / 3;
      this.offX = this.currentX;
    } else if (
      this.currentX <
      -(this.sliderInner.getBoundingClientRect().width - window.innerWidth)
    ) {
      this.currentX = -(
        this.sliderInner.getBoundingClientRect().width - window.innerWidth
      );
      this.offX = this.currentX;
    }
    this.sliderInner.style.transform = `translate3d(${this.currentX}px, 0, 0)`;
  }

  on(e) {
    this.isDragging = true;
    this.onX = e.clientX;
    if (window.innerWidth < 600) {
      this.onMobileX = e.changedTouches[0].clientX;
    }
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
    this.slider.addEventListener("mouseleave", this.off, false);

    window.addEventListener("resize", this.resize, false);

    /* mobile*/
    this.slider.addEventListener("touchmove", this.setPos, false);
    this.slider.addEventListener("touchstart", this.on, false);
    this.slider.addEventListener("touchend", this.off, false);
  }

  removeEvents() {
    this.cancelAnimationFrame(this.rAF);

    this.slider.removeEventListener("mousemove", this.setPos, {
      passive: true,
    });
    this.slider.removeEventListener("mousedown", this.on, false);
    this.slider.removeEventListener("mouseup", this.off, false);

    /*for mobile*/
    // this.slider.removeEventListener("touchemove", this.setPos, {
    //   passive: true,
    // });
    // this.slider.removeEventListener("touchstart", this.on, false);
    // this.slider.removeEventListener("touchend", this.off, false);
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
    this.createSlider();
    this.addEvents();
    // this.setFirstPosition();
  }
}

export default Slider;
