import React from "react";

import history from "../../JS/history";
import Button from "../Button";

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
    history.push("/editLocations");
  }

  editCalendar() {
    history.push("/editCalendar");
  }

  editLocationTypes() {
    history.push("/editLocationTypes");
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
          clicked={() => this.editEventTypes()}
        />
        <Button
          buttonText={"לערוך סוגי מיקומים"}
          clicked={() => this.editLocationTypes()}
        />
        <Button buttonText={"back"} clicked={() => this.back()} />
      </div>
    );
  }
}

export default AppManager;
