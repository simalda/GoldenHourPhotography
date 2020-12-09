import React from "react";

import history from "../JS/history";
import * as managerManagerManager from "./../JS/managerManagerManager";
import Button from "./Button";

class AdminLogin extends React.Component {
  constructor(props) {
    super(props);
    this.buttonText = "שליחה";
    this.state = { user: "", psw: "" };
  }

  mySubmitHandler(event) {
    this.props.handleAdminLogin(this.state.user, this.state.psw);

    event.preventDefault();
  }

  returnToLogin() {
    this.setState({
      loginSucssess: 0,
    });
  }

  handleChangeUser(event) {
    this.setState({ user: event.target.value });
  }

  handleChangePsw(event) {
    this.setState({ psw: event.target.value });
  }

  render() {
    var whatToRender;
    if (this.props.loginSucssess === -1) {
      whatToRender = (
        <div className="popup">
          Login denied
          <button onClick={this.returnToLogin}>Close</button>
        </div>
      );
    }
    whatToRender = (
      <form id="adminLogin" onSubmit={(event) => this.mySubmitHandler(event)}>
        <label>Username</label>
        <input
          type="text"
          id="fname"
          name="fname"
          value={this.state.user}
          onChange={(event) => this.handleChangeUser(event)}
        />

        <label>Password</label>
        <input
          type="text"
          id="lname"
          name="lname"
          value={this.state.value}
          onChange={(event) => this.handleChangePsw(event)}
        />

        <Button
          buttonText={this.buttonText}
          clicked={() =>
            this.props.handleAdminLogin(this.state.user, this.state.psw)
          }
        />
      </form>
    );
    return (
      <div>
        {whatToRender}
        <button
          style={{ height: "200px", width: "100px", paddingTop: "7vh" }}
          onClick={() => this.props.test(1, 2)}
        >
          {this.props.testNumber}
        </button>
      </div>
    );
  }
}

export default AdminLogin;
