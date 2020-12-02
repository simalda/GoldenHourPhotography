import React from "react";

import Button from "./Button";
import Slider from "./Slider"

import history from "../JS/history";

import happyMoments from "../static/photos/cuts/Love capturing happy moments text.svg"
import about from "../static/photos/cuts/about.jpg"
import ketyStone from "../static/photos/cuts/KatyStone.svg";
import locationIcon from "../static/photos/cuts/location icon.svg";
import watzap from "../static/photos/cuts/Watsapp.svg";


class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.buttonText ='בחרו מיקום'
  }

   clicked(){
    history.push("/map")
   }

   clicked2(){
     history.push("/location")
   }

  render() {
    return (

      <div id="container-main"> 
      <div className ="happyMomemts"><img src = {happyMoments}/></div>
      <Slider/>
      <div className="buttonArea">
      <div className="zilum">צילומים בטבע <img className="" src={locationIcon}/> </div>
      <div className="greenText">באיזור חיפה והסביבה | צילומי משפחה, ילדים, הריון, תדמית ועוד</div>
      <Button buttonText = {this.buttonText} clicked={() => this.clicked()} />
      <Button buttonText = "location" clicked={() => this.clicked2()} />
      </div>

     
     <div className = "about">
       <div className="aboutText">
         <div>text</div>
         <img src={ketyStone}/>
         <div>
         <img src={watzap} className="watzapAbout"/>
       <div className = "connectionDetails"><span className="heebo-Bold">זמינה בואצאפ</span><span className ="tel"> קטי 0524550656</span></div>
       </div>
       </div>
       <img className="aboutPhoto" src={about}/>
     </div>
      </div>
      
    );
  }
} 

export default MainPage;
