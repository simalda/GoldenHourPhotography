import React from "react";

class EditLocations extends React.Component {
  constructor(props) {
    super(props);
  }

  addLocation() {
    history.push("/addLocationFromMap");
  }

  createLocationList() {
    let locationsViews = this.props.locationsInfo.map((location, index) => (
      <div key={index}>
        {location.name}
        <button
          className="button"
          onClick={() => this.props.editSpecificLocation(location)}
        >
          {this.props.dictionary["edit"]}
        </button>
      </div>
    ));
    return locationsViews;
  }

  back() {
    history.goBack();
  }

  render() {
    let locationList = this.createLocationList();
    return (
      <div className="mainDiv">
        <div className="editImageDiv">{locationList}</div>

        <button className="button" onClick={() => this.addLocation()}>
          {this.props.dictionary["add"]}
        </button>
        <button className="button" onClick={() => this.back()}>
          {this.props.dictionary["back"]}
        </button>
      </div>
    );
  }
}

export default EditLocations;
