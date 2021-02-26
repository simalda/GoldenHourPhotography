import React from "react";
import about from "../../static/photos/cuts/about.jpg";
import ketyStone from "../../static/photos/cuts/KatyStone.svg";
import watzap from "../../static/photos/cuts/Watsapp.svg";

export default function AboutUs() {
  return (
    <div className="about">
      <div className="aboutSection">
        <div className="aboutText">
          <div>נעים מאוד קוראים לי קטי</div>
          <div>:&#41; שמחה שהגעתם לפה</div>
          <br />
          <div>
            , אני מתמחה בצילומים בטבע באור הטבעי ,מאמינה ששימוש באור טבעי תורם
            לצילום אותנטי ומרגש .ששם אתכם המצולמים במרכז האתר שלי יעזור לכם
            לבחור את הלוקשיין המושלם .לצילומים באזור חיפה והסביבה .עוסקת גם
            בעיצוב גרפי ונראות ויזואלית בדיגיטל
          </div>
        </div>
        <img src={ketyStone} className="stamp" />
        <a
          href="https://wa.me/+972524550656"
          target="blank"
          className="watzapWrapper"
        >
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
  );
}
