import React from "react";

import history from "../../JS/history";
import LocationHandler from "../../JS/LocationHandler";

class EditLocationTypes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newType: "",
    };
  }
  createLocationTypesList() {
    return this.props.locationTypes.map((locationType, index) => (
      <div key={index}>
        <h1>{locationType}</h1>
        <button className="button" onClick={() => this.delete(locationType)}>
          {this.props.dictionary["delete"]}
        </button>
      </div>
    ));
  }

  delete(locationType) {
    const locHandler = new LocationHandler();
    locHandler.deleteLocationType(locationType);
    this.props.reloadApp();
  }

  changeLocationType(event) {
    this.setState({ newType: event.target.value });
  }

  addLocationType() {
    const locHandler = new LocationHandler();
    locHandler.addLocationType(this.state.newType);
    this.props.reloadApp();
  }

  render() {
    const typesList = this.createLocationTypesList();
    return (
      <div>
        {typesList}
        <h1>הוספה של מיקום חדש </h1>
        <input
          type="text"
          id="input"
          multiple
          onChange={(event) => this.changeLocationType(event)}
        ></input>
        <button className="button" onClick={() => this.addLocationType()}>
          {this.props.dictionary["add"]}
        </button>
        <button className="button" onClick={() => history.goBack()}>
          {this.props.dictionary["back"]}
        </button>
      </div>
    );
  }
}

export default EditLocationTypes;
