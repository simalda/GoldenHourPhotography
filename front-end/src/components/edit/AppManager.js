import React from "react";

import history from "../../JS/history";
import Button from "../Button";
// import * as proxy from "../JS/proxy";

class AppManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  editImages() {
    history.push("/appManager/editImage");
  }
  orders() {
    history.push("/orders");
  }

  editLocation() {
    history.push("/locationsEditor");
  }

  editCalendar() {
    history.push("/editCalendar");
  }

  back() {
    history.goBack();
  }

  render() {
    return (
      <div className="mainDiv">
        <Button
          buttonText={"טיפול בתמונות"}
          clicked={() => this.editImages()}
        />
        {/* <Button buttonText={"טיפול בהזמנות"} clicked={() => this.orders()} /> */}
        <Button
          buttonText={"טיפול ביומן, הזמנות"}
          clicked={() => this.editCalendar()}
        />
        <Button
          buttonText={"טיפול במיקום"}
          clicked={() => this.editLocation()}
        />
        <Button
          buttonText={"לערוך סוגי אירועים"}
          clicked={() => this.clickedAdmin()}
        />
        <Button buttonText={"back"} clicked={() => this.back()} />
      </div>
    );
  }
}

export default AppManager;
