import React from "react";
import about from "../../../static/photos/cuts/about.jpg";
import ketyStone from "../../../static/photos/cuts/KatyStone.svg";
import watzap from "../../../static/photos/cuts/Watsapp.svg";

import classes from "./aboutUs.module.scss";
export default function AboutUs() {
  return (
    <div className={classes.about}>
      <div className={classes.aboutSection}>
        <div className={classes.aboutText}>
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
        <img src={ketyStone} className={classes.stamp} />
        <a
          href="https://wa.me/+972524550656"
          target="blank"
          className={classes.watzapWrapper}
        >
          <img src={watzap} className={classes.watzapAbout} />
          <div className={classes.connectionDetails}>
            <span className={classes.aboutus_font}>זמינה בואצאפ</span>
            <span className={classes.tel}> קטי 0524550656</span>
          </div>
        </a>
      </div>
      <div className={classes.aboutPhotoDiv}>
        <img className={classes.aboutPhoto} src={about} />
      </div>
    </div>
  );
}
