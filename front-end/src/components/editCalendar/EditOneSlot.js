import React from "react";

// import history from "../../JS/history";
import TimeUnit from "../../JS/TimeUnit";
import TimeUnitHandler from "../../JS/TimeUnitHandler";
// import moment from "moment";
import * as dateManager from "../../JS/dateManipulations";

class EditOneSlot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slotToUpdate: [],
      timeUnit: this.props.timeUnit,
      isOpen: this.props.isOpen,
      isModalOpen: false,
    };
  }
  // }
  // componentDidMount() {
  //   this.setState({
  //     slotToUpdate: [],
  //     timeUnit: this.props.timeUnit,
  //     isOpen: this.props.isOpen,
  //     isModalOpen: false,
  //     customClass: this.props.isOpen,
  //   });
  // }

  //   sendToUpdate() {
  //     proxy.updateImages(imagesToUpdate);
  //   }

  render() {
    // const ImageTypeOptions = this.createImageTypeOptions();
    // const ImageLocations = this.createImageLocations();
    // const EventTypes = this.createEventTypes();

    return (
      <button
        className={this.props.slot.status + " calendarButton"}
        onClick={() => this.props.onClick(this.props.slot)}
      >
        {this.props.slot.status}
      </button>
    );
  }
}

export default EditOneSlot;
