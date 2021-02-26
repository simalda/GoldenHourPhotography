import React from "react";

import insta from "../static/photos/cuts/instagram.svg";
import facebook from "../static/photos/cuts/facebook.svg";

const sticky = {
  position: "fixed",
  bottom: 0,
  width: "100%",
  zIndex: 100,
};

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // if (this.props.footerPositionClass === "fixed") {
    //   return (
    //     <div className="footer" style={sticky}>
    //       <img className="icon" src={insta} />
    //       <img className="icon" src={facebook} />
    //     </div>
    //   );
    // } else {
    return (
      <div className="footer">
        <img className="icon" src={insta} />
        <img className="icon" src={facebook} />
      </div>
    );
  }
}

export default Footer;
