import React from "react";

// import history from "../../JS/history";
import TimeUnit from "../../JS/TimeUnit";
import TimeUnitHandler from "../../JS/TimeUnitHandler";
import moment from "moment";

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

  onClick() {
    let timeHandler = new TimeUnitHandler();
    if (this.state.isOpen === "Close") {
      var answer = window.confirm(
        "Do you want to make this to be available weekly?"
      );
      if (answer) {
        this.setState({
          isOpen: "Open",
        });
        let timeUnit = new TimeUnit(
          this.state.timeUnit.date,
          moment(this.state.timeUnit.date).format("DD.MM.YYYY"),
          this.state.timeUnit.time,
          true,
          null
        );
        timeHandler.addNewTimeUnit(timeUnit);
      } else {
        this.setState({
          isOpen: "Open",
        });
        timeHandler.addNewTimeUnit(this.state.timeUnit);
      }
    } else {
      var answer = window.confirm(
        "Are you sure you want to change this time cell?"
      );
      if (answer) {
        this.setState({
          isOpen: "Close",
        });
        timeHandler.deleteTimeUnit(this.state.timeUnit);
      } else {
        //some code
      }
    }
  }

  //   sendToUpdate() {
  //     proxy.updateImages(imagesToUpdate);
  //   }

  render() {
    // const ImageTypeOptions = this.createImageTypeOptions();
    // const ImageLocations = this.createImageLocations();
    // const EventTypes = this.createEventTypes();

    return <button onClick={() => this.onClick()}>{this.state.isOpen}</button>;
  }
}

export default EditOneSlot;
