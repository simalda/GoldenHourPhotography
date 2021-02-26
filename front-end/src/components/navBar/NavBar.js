import React from "react";

import logo from "../../static/photos/cuts/LOGO.svg";
import watzap from "../../static/photos/cuts/Watsapp.svg";
import group from "../../static/photos/cuts/Group 3.svg";

import { Link } from "react-router-dom";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header>
        {/* <img src={logo} className="App-logo" alt=""></img> */}
        <nav className="nav sticky">
          <Link to="/">
            <img className="logo" src={logo} />
          </Link>
          <img className="group" src={group} />
          <div className="links">
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
              className="navbar-text"
              to="/recomendations"
            >
              המלצות
            </Link>
            <Link
              id="qa"
              key="qa"
              className="navbar-text"
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
              className="navbar-text"
              to="/aboutUs"
            >
              אודות
            </Link>
            <Link id="galery" key="galery" className="navbar-text" to="/galery">
              גלריה
            </Link>
            <Link
              id="locations"
              key="locations"
              className="navbar-text"
              to="/locations"
            >
              לוקישנים
            </Link>
          </div>
          <a
            href="https://wa.me/+972524550656"
            target="blank"
            className="connectionDetailsNav"
          >
            <span>
              <img src={watzap} className="watzap" />
            </span>

            <div className="connectionDetails">
              <span className="heebo-Bold">זמינה בואצאפ</span>
              <span className="tel"> קטי 0524550656</span>
            </div>
          </a>
        </nav>
      </header>
    );
  }
}

export default NavBar;
