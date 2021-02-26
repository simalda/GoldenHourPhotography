import React from "react";

import history from "../../JS/history";
// import * as importImages from "../../JS/imageManager";
// import EditOneImage from "./EditOneImage";
import Button from "../Button";
import Image from "../../JS/Image";
import * as proxy from "../../JS/proxy";

class EditImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationList: [],
      setLocationsToUpdate: new Set(),
    };
  }

  componentDidMount() {
    this.loadImages();
  }

  addLocation() {
    history.push("/appManager/addLocation");
  }
  editImages() {
    proxy.updateLocations(this.state.setLocationsToUpdate);
  }
  editOneLocation(image) {
    const setFromForLoop = (x) => {
      const y = new Set();
      for (const item of x) y.add(item);
      return y;
    };
    const newSet = setFromForLoop(this.state.setLocationsToUpdate);

    newSet.add(image);
    this.setState({
      setLocationsToUpdate: newSet,
    });
  }

  loadImages() {
    // let pathList = importImages.importAll();
    let newImageList = [];
    for (let i = 0; i < this.props.locationList.length; i++) {
      const image = new Image(
        this.props.locationList[i].name,
        this.props.locationList[i].imageType,
        this.props.locationList[i].eventType,
        this.props.locationList[i].location
      );
      // if(pathList.includes('http://localhost:3000/static/'+this.props.imageList[i]["name"])){
      newImageList.push(
        <EditOneLocation
          key={i}
          path={"/static/" + image.name}
          index={i}
          image={image}
          imageTypes={this.props.imageTypes}
          imageLocations={this.props.imageLocations}
          eventTypes={this.props.eventTypes}
          editImages={() => this.editImages()}
          editOneImage={(image) => this.editOneImage(image)}
        />
      );
    }

    this.setState({
      imageList: newImageList,
    });
  }
  back() {
    history.goBack();
  }

  render() {
    return (
      <div className="mainDiv">
        <div className="editImageDiv">
          <div>image 360 -1</div>
          <div>image 360 -2</div>
          <div>image 360 -3</div>
          <div>name</div>
          {/* <div>image type</div>
          <div>type of event</div>
          <div>image location</div> */}
          <div>list of images from this location</div>
          <div></div>
        </div>
        {this.state.locationList}

        <Button buttonText={"הוספה"} clicked={() => this.addLocation()} />
        <Button buttonText={"שמירה"} clicked={() => this.editLocations()} />
        <Button buttonText={"back"} clicked={() => this.back()} />
      </div>
    );
  }
}

export default EditImage;
