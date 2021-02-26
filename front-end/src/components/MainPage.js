import React from "react";

import Button from "./Button";
import Slider from "./slider//Slider";
import AboutUs from "./navBar/AboutUs";

import history from "../JS/history";

import happyMoments from "../static/photos/cuts/Love capturing happy moments text.svg";
import locationIcon from "../static/photos/cuts/location icon.svg";

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
    // if (this.props.admin != "") {
    if (this.props.admin) {
      adminButton = (
        <div>
          <div>Hello, {this.props.admin}!!</div>
          <Button
            buttonText={"ניהול  אתר"}
            clicked={() => this.clickedAdmin()}
          />
        </div>
      );
    }

    return (
      <div id="container-main">
        <div className="happyMoments">
          <img className="imHappyMoments" src={happyMoments} />
        </div>
        <Slider pathList={[]} />
        <div className="buttonArea">
          <div className="zilum">
            צילומים בטבע <img className="locationIcon" src={locationIcon} />
          </div>
          <div className="greenText">
            באיזור חיפה והסביבה | צילומי משפחה, ילדים, הריון, תדמית ועוד
          </div>

          <Button buttonText={"בחרו מיקום"} clicked={() => this.clicked()} />
          {adminButton}
        </div>

        <AboutUs />
      </div>
    );
  }
}

export default MainPage;
