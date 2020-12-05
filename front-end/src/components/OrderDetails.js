import React from "react";

import Button from "./Button";

import history from "../JS/history";
 


class OrderDetails extends React.Component {
  constructor(props) {
    super(props);
    this.buttonText = "שליחה"
  }

   

   clicked(){
     history.push("/")
   }

  render() {
    return (<div className="orderDetails mainDiv"> 
    <div className="headerDetails">פרטים אישיים</div>
    <div className="divContainsOrderDetails">
        <div className="divPaymentDetails">
            <div>מבצע לימי חורף <span>Sale </span></div>
            <div><span>רק 350 </span></div>
            
        </div>
        <div className="userDetails"><input placeholder="שם" ></input>
      <input placeholder="פלאפון"></input>
      <input placeholder="אימייל"></input>
      <input placeholder="סוג צילומים"></input>
      <input placeholder="הערות"></input>
      <Button buttonText = {this.buttonText} clicked={() => this.clicked()} />    </div>
        <div className="divOrderDetail">
        <div>פארק קישון</div>
            <div>יום  ...</div>
            <div>שעה ....</div>
        </div>
    </div>
      
      </div>
      
    );
  }
} 

export default OrderDetails;