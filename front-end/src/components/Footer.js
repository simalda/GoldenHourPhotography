import React from "react";

import insta from "../static/photos/cuts/instagram.svg";
import facebook from "../static/photos/cuts/facebook.svg";

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="footer">
        <img className="icon" src={insta} />
        <img className="icon" src={facebook} />
      </div>
    );
  }
}

export default Footer;
