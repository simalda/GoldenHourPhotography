import React from "react";

import Button from "./Button";
import Slider from "./Slider";

import history from "../JS/history";

import happyMoments from "../static/photos/cuts/Love capturing happy moments text.svg";
import about from "../static/photos/cuts/about.jpg";
import ketyStone from "../static/photos/cuts/KatyStone.svg";
import locationIcon from "../static/photos/cuts/location icon.svg";
import watzap from "../static/photos/cuts/Watsapp.svg";
import DemoSlider from "./DemoSlider";
import Demo2 from "./Demo2";

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.buttonText = "בחרו מיקום";
    this.buttonTextManager = "ניהול תמונות";
    this.state = { pos: 0 };
  }

  clicked() {
    history.push("/locations");
  }

  clickedAdmin() {
    history.push("/galeryManager");
  }
 
  render() {
    var adminButton = <div></div>;
    if (this.props.admin != "") {
      adminButton = (
        <div><div>Hello, {this.props.user}!!</div>
        <Button
          buttonText={this.buttonTextManager}
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
        <Slider />
        <div className="buttonArea">
          <div className="zilum">
            צילומים בטבע <img className="locationIcon" src={locationIcon} />
          </div>
          <div className="greenText">
            באיזור חיפה והסביבה | צילומי משפחה, ילדים, הריון, תדמית ועוד
          </div>

          <Button buttonText={this.buttonText} clicked={() => this.clicked()} />
          {adminButton}
        </div>

        <div className="about">
          <div className="aboutSection">
            <div className="aboutText">
              <div>
              נעים מאוד קוראים לי קטי
              </div><div>
:) שמחה שהגעתם לפה
</div><br/>
<div>
, אני מתמחה בצילומים בטבע באור הטבעי
</div><div>
,מאמינה ששימוש באור טבעי תורם לצילום אותנטי ומרגש
</div><div>
.ששם אתכם המצולמים במרכז
</div><div>
האתר שלי יעזור לכם לבחור את הלוקשיין המושלם
</div><div>
.לצילומים באזור חיפה והסביבה
</div><div>
.עוסקת גם בעיצוב גרפי ונראות ויזואלית בדיגיטל
</div>
</div>
            <img src={ketyStone} />
            <a href="https://wa.me/+972524550656" target="blank">
              <img src={watzap} className="watzapAbout" />
              <div className="connectionDetails">
                <span className="heebo-Bold">זמינה בואצאפ</span>
                <span className="tel"> קטי 0524550656</span>
              </div>
            </a>
          </div>
          <div className="aboutPhotoDiv">
            <img className="aboutPhoto" src={about} />
          </div>
        </div>
      </div>
    );
  }
}

export default MainPage;
