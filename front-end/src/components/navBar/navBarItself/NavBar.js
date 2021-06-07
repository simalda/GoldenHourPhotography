import React from "react";

import logo from "../../../static/photos/cuts/LOGO.svg";
import watzap from "../../../static/photos/cuts/Watsapp.svg";
import group from "../../../static/photos/cuts/Group 3.svg";

import { Link } from "react-router-dom";

import classes from "./navBar.module.scss";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header>
        {/* <img src={logo} className="App-logo" alt=""></img> */}
        <nav className={`${classes.nav}  ${classes.sticky}`}>
          <Link to="/">
            <img className={classes.logo} src={logo} />
          </Link>
          <img className={classes.group} src={group} />
          <div className={classes.links}>
            {/* <Link
              id="contactUs"
              key="contactUs"
              className="navbar-text"
              to="/contactUs"
            >
              צור קשר
            </Link> */}
            <Link
              id="recomendations"
              key="recomendations"
              className={classes.navbar_text}
              to="/recomendations"
            >
              המלצות
            </Link>
            <Link
              id="qa"
              key="qa"
              className={classes.navbar_text}
              to="/questionsAnswers"
            >
              שאלות ותשובות
            </Link>
            {/* <Link id="blog" key="blog" className="navbar-text" to="/blog">
              בלוג
            </Link> */}
            <Link
              id="aboutUs"
              key="AboutUs"
              className={classes.navbar_text}
              to="/aboutUs"
            >
              אודות
            </Link>
            <Link
              id="galery"
              key="galery"
              className={classes.navbar_text}
              to="/galery"
            >
              גלריה
            </Link>
            <Link
              id="locations"
              key="locations"
              className={classes.navbar_text}
              to="/locations"
            >
              לוקישנים
            </Link>
          </div>
          <a
            href="https://wa.me/+972524550656"
            target="blank"
            className={classes.connectionDetailsNav}
          >
            <span>
              <img src={watzap} className="watzap" />
            </span>

            <div className="connectionDetails">
              <span className="aboutus_font ">זמינה בואצאפ</span>
              <span className="tel"> קטי 0524550656</span>
            </div>
          </a>
        </nav>
      </header>
    );
  }
}

export default NavBar;
