import React, { useState } from 'react';
 
 
class TimeSlotButton  extends React.Component {
    constructor(props) {
        super(props)
         this.time = "15:00 - 16:00";
    }
   
    render(){
        return (
             <button className="timeslot" onClick = {this.props.onClick}>{this.time}</button>          
        );}
}
 
export default TimeSlotButton;