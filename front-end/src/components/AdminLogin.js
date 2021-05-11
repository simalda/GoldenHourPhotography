import React from "react";

class AdminLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: "", psw: "" };
  }

  mySubmitHandler(event) {
    console.log("mySubmitHandler");
    this.props.handleAdminLogin(this.state.user, this.state.psw);
    event.preventDefault();
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
          <button className="button" onClick={() => this.props.returnToLogin()}>
            {this.props.dictionary["back"]}
          </button>
        </div>
      );
    } else {
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
            type="password"
            id="lname"
            name="lname"
            value={this.state.value}
            onChange={(event) => this.handleChangePsw(event)}
          />
          <button className="button" type="submit">
            {this.props.dictionary["send"]}
          </button>
        </form>
      );
    }
    return <div>{whatToRender}</div>;
  }
}

export default AdminLogin;
