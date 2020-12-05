import React from "react";

import Button from "./Button";
import Slider from "./Slider"
import D3images from './D3images'

import history from "../JS/history";
 


class Location extends React.Component {
  constructor(props) {
    super(props);
    this.buttonText = "שירינו לי מקום"
  }

   

   clicked(){
     history.push("/location/calendar")
   }

  render() {
    return (<div className="mainDiv"> 
      <div className="locationName">פארק קישון</div>
      <div className ='3d' style={{"height": "40hv"}}>
      <D3images/>
      </div>
      <div className="photosFromThere" ><div className="diagonaled">Photos from there</div></div>
      <Slider/>
      <div>
      <Button buttonText = {this.buttonText} clicked={() => this.clicked()} />     
      </div> 
      </div>
      
    );
  }
} 

export default Location;
