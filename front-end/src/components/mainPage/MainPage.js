import React from "react";

import Slider from "../slider/Slider";
import AboutUs from "../navBar/aboutUs/AboutUs";

import history from "../../JS/history";

import happyMoments from "../../static/photos/cuts/Love capturing happy moments text.svg";
import locationIcon from "../../static/photos/cuts/location icon.svg";
import classes from "./mainPage.module.scss";
class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pos: 0 };
  }

  clicked() {
    history.push("/locations");
  }

  clickedAdmin() {
    history.push("/appManager");
  }

  render() {
    var adminButton = <div></div>;
    const sliderImageList = this.props.imageList.filter(
      (image) => image.imageType === "regular"
    );
    if (this.props.admin) {
      adminButton = (
        <div>
          <div>Hello, {this.props.admin}!!</div>
          <button className="button" onClick={() => this.clickedAdmin()}>
            {this.props.dictionary["manageSite"]}
          </button>
        </div>
      );
    }

    return (
      <div id="container-main">
        <div className={classes.happyMoments}>
          <img className={classes.imHappyMoments} src={happyMoments} />
        </div>
        <Slider pathList={[]} imageList={sliderImageList} />
        <div className={classes.buttonArea}>
          <div className={classes.zilum}>
            {this.props.dictionary["naturePhotos"]}

            <img className={classes.locationIcon} src={locationIcon} />
          </div>
          <div className={classes.greenText}>
            {this.props.dictionary["siteDescription"]}
          </div>
          <button className="button" onClick={() => this.clicked()}>
            {this.props.dictionary["chooseLocation"]}
          </button>

          {adminButton}
        </div>

        <AboutUs />
      </div>
    );
  }
}

export default MainPage;
