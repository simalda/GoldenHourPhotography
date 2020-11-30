import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import Popup from "./Popup"
 
class MyCalendar  extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          date: new Date(),
          popupTag : false
        };
        
    }
     
     
    onChange = (ev) => {
         console.log(ev);
            this.setState({              
              popupTag : true
            })
    }

    onClick(date){
    console.log(date)
      this.setState({      
        popupTag : false
      });
    }
 
    render(){
        let popup = <div></div>
        if(this.popupTag){
             popup = <Popup onCklick = {this.onCklick}/>
         }
        return (
          <div>
            <Calendar
              onChange={this.onChange}
              value={this.state.date}
            />
             {popup}
          </div>
         
        );}
}
 
export default MyCalendar;