import React from "react";

import logo from "../static/photos/cuts/LOGO.svg";
import watzap from "../static/photos/cuts/Watsapp.svg";

import { Link } from "react-router-dom";



 

 

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }
 

 

  render() {
      return (
      <header>
        {/* <img src={logo} className="App-logo" alt=""></img> */}
        <nav className = "nav sticky">
          <img className ="logo" src={logo}/>
          <div className = "links">
              <Link
                id="connectUs"
                key="connectUs"
                className="navbar-text"
                to="/connectUs"                 
              >
               צור קשר
              </Link>
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
                to="/qa"                 
              >
                שאלות ותשובות
              </Link>
              <Link
                id="blog"
                key="blog"
                className="navbar-text"
                to="/blog"                 
              >
                בלוג
              </Link>
              <Link
                id="aboutUs"
                key="AboutUs"
                className="navbar-text"
                to="/aboutUs"                 
              >
                אודות
              </Link>
              <Link
                id="galeria"
                key="galeria"
                className="navbar-text"
                to="/galeria"                 
              >
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
          <img src={watzap} className="watzap"/>
          <div className = "connectionDetails"><span className="heebo-Bold">זמינה בואצאפ</span><span className ="tel"> קטי 0524550656</span></div>
        
        </nav>
      </header>
    );
  }
}

 
 

export default NavBar;
