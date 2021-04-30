import React from "react";

import EditOneImage from "../editImage/EditOneImage";

class EditOneLocation extends React.Component {
  createPhotoSphereList() {
    let photoSphereViews = this.props.location.sphereImageList.map(
      (image, index) => (
        <div key={index}>
          <EditOneImage
            key={index}
            path={"/static/" + image.name}
            index={index}
            image={image}
            imageTypes={this.props.imageTypes}
            imageLocations={this.props.imageLocations}
            eventTypes={this.props.eventTypes}
            locationTypes={this.props.locationTypes}
            diffLocations={this.props.diffLocations}
            editImages={() => this.editImages()}
            editOneImage={(image) => this.editOneImage(image)}
            reloadApp={() => this.props.reloadApp()}
            dictionary={this.props.dictionary}
          />
          <button
            className="button"
            onClick={(image) => this.addConnection(image)}
          >
            {this.props.dictionary["addConnection"]}
          </button>
        </div>
      )
    );
    return photoSphereViews;
  }
  createRegularPhotoList() {
    let regularPhotoViews = this.props.location.regularImageList.map(
      (image, index) => (
        <div key={index}>
          <EditOneImage
            key={index}
            path={"/static/" + image.name}
            index={index}
            image={image}
            imageTypes={this.props.imageTypes}
            imageLocations={this.props.imageLocations}
            eventTypes={this.props.eventTypes}
            locationTypes={this.props.locationTypes}
            diffLocations={this.props.diffLocations}
            editImages={() => this.editImages()}
            editOneImage={(image) => this.editOneImage(image)}
            reloadApp={() => this.props.reloadApp()}
            dictionary={this.props.dictionary}
          />
        </div>
      )
    );
    return regularPhotoViews;
  }
  back() {
    history.goBack();
  }

  render() {
    let photoSphereList = this.createPhotoSphereList();
    let regularPhotoList = this.createRegularPhotoList();
    return (
      <div className="mainDiv">
        <h1>{this.props.location.name}</h1>
        <div className="editImageDiv">{photoSphereList}</div>
        <div className="editImageDiv">{regularPhotoList}</div>

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

export default EditOneLocation;
