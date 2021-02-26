import React from "react";
class TimeButton extends React.Component {
  constructor(props) {
    super(props);
  }

  readClickeTime(time) {
    this.props.readTime(time);
  }
  render() {
    return (
      <button
        className="timeslot"
        onClick={() => this.readClickeTime(this.props.time)}
      >
        {this.props.time}
      </button>
    );
  }
}

export default TimeButton;
