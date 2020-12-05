import React from "react";

import * as proxy from "../JS/proxy";
import history from "../JS/history";

class AdminLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: "", psw: "" };
  }

  mySubmitHandler(event) {
    proxy.checkUser(this.state.user, this.state.psw).then((loginResponse) => {
      if (loginResponse) {
        try {
          history.push("/");
        } catch (error) {
          console.error(error);
          console.log(error);
        }

        this.setState({ admin: this.state.user, loginSucssess: 1 });
      } else {
        this.setState({
          loginSucssess: -1,
        });
      }
    });
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
    if (this.props.data.loginSucssess === -1) {
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

        <input type="submit" value="Submit" />
      </form>
    );
    return whatToRender;
  }
}

export default AdminLogin;
