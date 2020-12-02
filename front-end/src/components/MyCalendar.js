import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

 

import PopupTime from "./PopupTime"
 
class MyCalendar  extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          date: new Date(),
          popupTag : false,
          culture:'fr'
        };
        
    }
     
     
  hebrewDate(){
    var today = new Date ( );
    var dateText
    var days = new Array ( );
    days[days.length] = "יום ראשון";
    days[days.length] = "יום שני";
    days[days.length] = "יום שלישי";
    days[days.length] = "יום רביעי";
    days[days.length] = "יום חמישי";
    days[days.length] = "יום שישי";
    days[days.length] = "יום שבת";
    
    var months = new Array ( );
    months[months.length] = "ינואר";
    months[months.length] = "פברואר";
    months[months.length] = "מרץ";
    months[months.length] = "אפריל";
    months[months.length] = "מאי";
    months[months.length] = "יוני";
    months[months.length] = "יולי";
    months[months.length] = "אוגוסט";
    months[months.length] = "ספטמבר";
    months[months.length] = "אוקטובר";
    months[months.length] = "נובמבר";
    months[months.length] = "דצמבר";
    
    dateText = days[today.getDay()]+", "+  today.getDate() +" ל"+ months[today.getMonth()] 

    
    return dateText
  }
    onChange(ev){
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

    onClickOK(date){
      history.push("/orderDetails")
    }
 
    render(){
        let popup = <div></div>
        if(this.state.popupTag){
             popup = <PopupTime onCklick = {(date) => this.onCklick(date)}/>
         }
        return (
          <div className ="calendar popup mainDiv">
            <div className="calendarWrap">
              <div className="calendarHeader">
              <div className="calendarHeaderYear">{this.state.date.getFullYear()}</div>
              <div className="calendarHeaderDate">{this.hebrewDate()}</div>
              </div>
            <Calendar
            tileClassName="react-calendar__tile--active2"
            calendarType="Hebrew"
            locale="HE"
              onChange={(ev)=>this.onChange(ev)}
              value={this.state.date}
            />
            
            <div className="calendarFooter">
              <button className="miniButton1"> יציאה</button> <button className="miniButton2" onClick={this.onClickOK}>OK</button>
            </div>
            </div>
             {popup}
          </div>
         
        );}
}
 
export default MyCalendar;