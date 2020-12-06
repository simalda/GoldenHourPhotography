import React from "react";

import Button from "./Button";

import history from "../JS/history";

class OrderDetails extends React.Component {
  constructor(props) {
    super(props);
    this.buttonText = "שליחה";
  }

  clicked() {
    history.push("/endPage");
  }

  render() {
    return (
      <div className="orderDetails mainDiv">
        <div className="headerDetails">פרטים אישיים</div>
        <div className="divContainsOrderDetails">
          <div className="divPaymentDescription">
            <div>
              <span className="sale">Sale </span> מבצע לימי חורף
            </div>
            <div>
              <div className="saleAmount">₪ רק 350 </div>
              <span className="basePrice"> ₪ 599 </span>
            </div>
            <div className="preSaleDescription">
              <div> ₪תשלום מקדמה בסך 50 </div>
              <div>ניתן לשלם בהעברה בביט או העברה בנקאית</div>
            </div>
          </div>
          <div className="userDetails">
            <input placeholder="שם"></input>
            <input placeholder="פלאפון"></input>
            <input placeholder="אימייל"></input>
            <input placeholder="סוג צילומים"></input>
            <input placeholder="הערות"></input>
            <Button
              buttonText={this.buttonText}
              clicked={() => this.clicked()}
            />
          </div>
          <div className="divOrderDetail">
            <div>פארק קישון</div>
            <div> יום ... </div>
            <div>שעה ... </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderDetails;
