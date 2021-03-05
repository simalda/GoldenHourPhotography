import React from "react";

import history from "../../../JS/history";
import EditOneImage from "./EditOneImage";
import Button from "../../Button";
import Image from "../../../JS/Image";
import ImageHandler from "../../../JS/ImageHandler";
import * as proxy from "../../../JS/proxy";

class EditImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageList: [],
      setImagesToUpdate: new Set(),
    };
  }

  componentDidMount() {
    this.loadImages();
  }

  addImage() {
    history.push("/appManager/addImage");
  }
  editImages() {
    const imHandler = new ImageHandler();
    imHandler.updateImages(this.state.setImagesToUpdate);
    this.props.reloadApp();
  }
  editOneImage(image) {
    const setFromForLoop = (x) => {
      const y = new Set();
      for (const item of x) y.add(item);
      return y;
    };
    const newSet = setFromForLoop(this.state.setImagesToUpdate);

    newSet.add(image);
    this.setState({
      setImagesToUpdate: newSet,
    });
  }

  loadImages() {
    // let pathList = importImages.importAll();
    let newImageList = [];
    for (let i = 0; i < this.props.imageList.length; i++) {
      const image = new Image(
        this.props.imageList[i].name,
        this.props.imageList[i].imageType,
        this.props.imageList[i].eventType,
        this.props.imageList[i].location
      );
      // if(pathList.includes('http://localhost:3000/static/'+this.props.imageList[i]["name"])){
      newImageList.push(
        <EditOneImage
          key={i}
          path={"/static/" + image.name}
          index={i}
          image={image}
          imageTypes={this.props.imageTypes}
          imageLocations={this.props.imageLocations}
          eventTypes={this.props.eventTypes}
          locationList={this.props.locationList}
          editImages={() => this.editImages()}
          editOneImage={(image) => this.editOneImage(image)}
          reloadApp={() => this.props.reloadApp()}
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
          <div>image</div>
          <div>name</div>
          <div>image type</div>
          <div>type of event</div>
          <div>image location</div>
          <div></div>
          <div></div>
        </div>
        {this.state.imageList}

        <Button buttonText={"הוספה"} clicked={() => this.addImage()} />
        <Button buttonText={"שמירה"} clicked={() => this.editImages()} />
        <Button buttonText={"back"} clicked={() => this.back()} />
      </div>
    );
  }
}

export default EditImage;
