import React from "react";

class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let buttonText = <div></div>;
    if (this.props.buttonText === "בחרו מיקום") {
      buttonText = "בחרו מיקוםּ";
    } else if (this.props.buttonText === "שליחה") {
      buttonText = "שליחה";
    } else if (this.props.buttonText === "ניהול תמונות") {
      buttonText = "ניהול תמונות";
    } else if (this.props.buttonText === "שירינו לי מקום") {
      buttonText = (
        <div>
          <div>שירינו לי מקום</div>
          <div className="diagonaled" style={{ paddingTop: "0vh" }}>
            {" "}
            I like it
          </div>
        </div>
      );
    }
    return (
      <button
        className="button"
        key="button"
        id="Button"
        onClick={() => this.props.clicked()}
      >
        {buttonText}
      </button>
    );
  }
}

export default Button;
