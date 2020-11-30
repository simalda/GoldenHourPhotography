import React from "react";

class Button extends React.Component {
    constructor(props) {
        super(props);         
      }


  render() {
    return (
      <button
        className='button'
        key="button"
        id="Button"
        onClick={() => this.props.clicked()}
      >
      {this.props.buttonText} 
      </button>
    );
  }
}

export default Button;