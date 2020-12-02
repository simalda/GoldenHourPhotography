import React, { useState } from 'react';

import TimeSlotButton from "./TimeSlotButton"
 
 
class PopupTime  extends React.Component {
    constructor(props) {
        super(props)
         
    }
   
    render(){
        return (
          <div className="popup timeslot">
            <TimeSlotButton/>
          </div>
        );}
}
 
export default PopupTime;