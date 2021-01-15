import React from "react";

import history from "../JS/history";
import Button from "./Button";
import * as proxy from "../JS/proxy";

class AppManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  editImages() {
    history.push("/a ");
  }
  orders() {
    history.push("/ ");
  }

  back() {
    history.goBack();
  }

  render() {
    return (
      <div className="mainDiv">
        <Button
          buttonText={"ראה כל הזמנות לשבוע הקרוב"}
          clicked={() => this.editImages()}
        />
        <Button
          buttonText={"הזמנות לתאריך מסוים"}
          clicked={() => this.orders()}
        />

        <Button buttonText={"back"} clicked={() => this.back()} />
      </div>
    );
  }
}

export default AppManager;
