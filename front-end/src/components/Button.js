import React from "react";

class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let buttonText = <div></div>;
    if (this.props.buttonText === "שירינו לי מקום") {
      buttonText = (
        <div>
          <div>שירינו לי מקום</div>
          <div className="diagonaled" style={{ paddingTop: "0vh" }}>
            {" "}
            I like it
          </div>
        </div>
      );
    } else {
      buttonText = <span>{this.props.buttonText}</span>;
    }
    return (
      <button
        className="button"
        key="button"
        id="Button"
        type={this.props.type}
        onClick={() => this.props.clicked()}
      >
        {buttonText}
      </button>
    );
  }
}

export default Button;
